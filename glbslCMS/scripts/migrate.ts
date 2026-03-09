/**
 * Strapi → Sanity Migration Script
 *
 * Fetches all published content from Strapi (EN + NE locales),
 * uploads media assets to Sanity CDN, and creates/replaces Sanity documents.
 *
 * Usage:  npm run migrate
 *
 * Migration order (respects dependencies):
 *   heroImage → savingsProduct → loanProduct → reportCategory →
 *   serviceCategory → testimonial → notice → report →
 *   person → committee →
 *   (singletons) aboutUsSetting → organizationStructure →
 *                memberWelfareService → remittanceService
 */

import 'dotenv/config'
import { createClient, type SanityClient } from '@sanity/client'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import type { Readable } from 'stream'

// ─── Config ───────────────────────────────────────────────────────────────────

const STRAPI_URL = (process.env.STRAPI_URL || '').replace(/\/$/, '')
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || ''
const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || 'v41axjo7'
const DATASET = process.env.SANITY_STUDIO_DATASET || 'production'
const SANITY_TOKEN = process.env.SANITY_API_TOKEN || ''

const DO_SPACES_KEY = process.env.DO_SPACES_KEY || ''
const DO_SPACES_SECRET = process.env.DO_SPACES_SECRET || ''
const DO_SPACES_BUCKET = process.env.DO_SPACES_BUCKET || 'gurans-cms-media'
const DO_SPACES_REGION = process.env.DO_SPACES_REGION || 'blr1'

if (!STRAPI_URL) { console.error('STRAPI_URL not set in .env'); process.exit(1) }
if (!STRAPI_TOKEN) { console.error('STRAPI_TOKEN not set in .env'); process.exit(1) }
if (!SANITY_TOKEN) { console.error('SANITY_API_TOKEN not set in .env'); process.exit(1) }

const LOCALES = ['en', 'ne']
const DEFAULT_LOCALE = 'en'

// ─── Sanity Write Client ──────────────────────────────────────────────────────

const sanity: SanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2026-03-08',
  token: SANITY_TOKEN,
  useCdn: false,
})

// ─── DO Spaces S3 Client ─────────────────────────────────────────────────────

const s3 = new S3Client({
  endpoint: `https://${DO_SPACES_REGION}.digitaloceanspaces.com`,
  region: DO_SPACES_REGION,
  credentials: { accessKeyId: DO_SPACES_KEY, secretAccessKey: DO_SPACES_SECRET },
  forcePathStyle: false,
})

async function fetchFromSpaces(key: string): Promise<Buffer | null> {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: DO_SPACES_BUCKET, Key: key }))
    const chunks: Buffer[] = []
    for await (const chunk of res.Body as Readable) chunks.push(Buffer.from(chunk))
    return Buffer.concat(chunks)
  } catch (e) {
    console.warn(`    ⚠ DO Spaces [${key}]:`, (e as Error).message)
    return null
  }
}

// ─── Utilities ────────────────────────────────────────────────────────────────

const assetCache = new Map<string, string>() // strapiUrl → sanity assetId
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function strapiGet(path: string): Promise<any> {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
  })
  if (!res.ok) throw new Error(`Strapi ${path} → ${res.status} ${res.statusText}`)
  return res.json()
}

// Build a query string with literal brackets (Strapi v5 rejects percent-encoded brackets
// when combined with locale + populate in the same request)
function buildQuery(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&')
}

async function fetchAllPages(endpoint: string, extra: Record<string, string> = {}): Promise<any[]> {
  const all: any[] = []
  let page = 1
  while (true) {
    const q = buildQuery({
      'pagination[page]': String(page),
      'pagination[pageSize]': '100',
      ...extra,
    })
    const resp = await strapiGet(`${endpoint}?${q}`)
    const items = Array.isArray(resp.data) ? resp.data : resp.data ? [resp.data] : []
    all.push(...items)
    if (!resp.meta?.pagination || page >= resp.meta.pagination.pageCount) break
    page++
    await sleep(300)
  }
  return all
}

async function uploadAsset(
  url: string | undefined | null,
  type: 'image' | 'file',
  name?: string,
): Promise<string | null> {
  if (!url) return null
  const fullUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`
  if (assetCache.has(fullUrl)) return assetCache.get(fullUrl)!

  const filename = name || url.split('/').pop()?.split('?')[0] || 'asset'
  let buf: Buffer | null = null

  // Strapi stores uploads in /uploads/ — always on DO Spaces in this project
  // Try S3 first, fall back to Strapi direct URL
  if (DO_SPACES_KEY && /^\/?uploads\//.test(url)) {
    const key = url.replace(/^\/?uploads\//, '') // strip leading /uploads/ → filename.jpg
    buf = await fetchFromSpaces(key)
  }
  if (!buf) {
    try {
      const res = await fetch(fullUrl, { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } })
      if (!res.ok) { console.warn(`    ⚠ ${fullUrl}: ${res.status}`); return null }
      buf = Buffer.from(await res.arrayBuffer())
    } catch (e) {
      console.warn(`    ⚠ fetch failed ${fullUrl}:`, e)
      return null
    }
  }
  if (!buf) return null

  try {
    const asset = await sanity.assets.upload(type, buf, { filename })
    assetCache.set(fullUrl, asset._id)
    console.log(`    ↑ ${type}: ${filename}`)
    return asset._id
  } catch (e) {
    console.warn(`    ⚠ upload failed ${filename}:`, e)
    return null
  }
}

// Reference builders
const imgRef = (id: string) => ({ _type: 'image' as const, asset: { _type: 'reference' as const, _ref: id } })
const fileRef = (id: string) => ({ _type: 'file' as const, asset: { _type: 'reference' as const, _ref: id } })
const docRef = (id: string) => ({ _type: 'reference' as const, _ref: id })
const slugVal = (v?: string | null) => v ? { _type: 'slug' as const, current: v } : undefined

// Build Sanity document ID from Strapi documentId + locale
const sanityDocId = (type: string, baseId: string, locale: string) =>
  locale === DEFAULT_LOCALE
    ? `${type}-${baseId.replace(/[^a-zA-Z0-9_-]/g, '-')}`
    : `${type}-${baseId.replace(/[^a-zA-Z0-9_-]/g, '-')}__i18n_${locale}`

// ─── Strapi Blocks → Sanity Portable Text ────────────────────────────────────

function toPortableText(blocks: any[] | null | undefined): any[] {
  if (!Array.isArray(blocks) || blocks.length === 0) return []

  const mapSpans = (children: any[], prefix: string) =>
    (children ?? []).map((c: any, j: number) => ({
      _type: 'span',
      _key: `${prefix}_s${j}`,
      text: c.text ?? c.children?.map((x: any) => x.text ?? '').join('') ?? '',
      marks: [
        ...(c.bold ? ['strong'] : []),
        ...(c.italic ? ['em'] : []),
        ...(c.underline ? ['underline'] : []),
        ...(c.strikethrough ? ['strike-through'] : []),
        ...(c.code ? ['code'] : []),
      ],
    }))

  const result: any[] = []
  blocks.forEach((block: any, i: number) => {
    if (!block?.type) return
    switch (block.type) {
      case 'paragraph':
        result.push({ _type: 'block', _key: `b${i}`, style: 'normal', markDefs: [], children: mapSpans(block.children, `b${i}`) })
        break
      case 'heading':
        result.push({ _type: 'block', _key: `b${i}`, style: `h${block.level ?? 2}`, markDefs: [], children: mapSpans(block.children, `b${i}`) })
        break
      case 'quote':
        result.push({ _type: 'block', _key: `b${i}`, style: 'blockquote', markDefs: [], children: mapSpans(block.children, `b${i}`) })
        break
      case 'list':
        const listItem = block.format === 'ordered' ? 'number' : 'bullet';
        (block.children ?? []).forEach((item: any, j: number) => {
          result.push({ _type: 'block', _key: `b${i}_${j}`, style: 'normal', listItem, level: 1, markDefs: [], children: mapSpans(item.children, `b${i}_${j}`) })
        })
        break
      case 'code':
        result.push({ _type: 'block', _key: `b${i}`, style: 'normal', markDefs: [], children: [{ _type: 'span', _key: `b${i}_s0`, text: block.children?.[0]?.text ?? '', marks: ['code'] }] })
        break
    }
  })
  return result
}

// ─── i18n Migration Helpers ───────────────────────────────────────────────────

async function migrateCollection(
  endpoint: string,
  type: string,
  populate: Record<string, string>,
  transform: (item: any, locale: string) => Promise<Record<string, any>>,
) {
  console.log(`\n── ${type} ──`)
  const translationMap = new Map<string, Array<{ locale: string; id: string }>>()

  for (const locale of LOCALES) {
    let items: any[]
    try {
      items = await fetchAllPages(endpoint, { locale, ...populate })
    } catch (e) {
      console.warn(`  ⚠ [${locale}] fetch failed:`, (e as Error).message)
      continue
    }
    console.log(`  [${locale}] ${items.length} item(s)`)

    for (const item of items) {
      const base = item.documentId || String(item.id)
      const id = sanityDocId(type, base, locale)
      try {
        const fields = await transform(item, locale)
        await sanity.createOrReplace({ _id: id, _type: type, language: locale, ...fields })
        console.log(`  ✓ ${id}`)
        if (!translationMap.has(base)) translationMap.set(base, [])
        translationMap.get(base)!.push({ locale, id })
      } catch (e) {
        console.error(`  ✗ ${id}:`, e)
      }
      await sleep(200)
    }
  }

  // Create i18n metadata docs linking EN + NE versions
  for (const [base, docs] of translationMap) {
    if (docs.length < 2) continue
    await sanity.createOrReplace({
      _id: `i18n.${type}-${base.replace(/[^a-zA-Z0-9_-]/g, '-')}`,
      _type: 'translation.metadata',
      schemaTypes: [type],
      translations: docs.map(({ locale, id }) => ({ _key: locale, value: docRef(id) })),
    })
  }
}

async function migrateSingleton(
  endpoint: string,
  type: string,
  populate: Record<string, string>,
  transform: (item: any, locale: string) => Promise<Record<string, any>>,
) {
  console.log(`\n── ${type} (singleton) ──`)
  const docs: Array<{ locale: string; id: string }> = []

  for (const locale of LOCALES) {
    try {
      const q = buildQuery({ locale, ...populate })
      const { data: item } = await strapiGet(`${endpoint}?${q}`)
      if (!item) { console.log(`  [${locale}] no data`); continue }
      // Singletons use the schema type name as their Sanity ID (matches desk structure)
      const id = locale === DEFAULT_LOCALE ? type : `${type}__i18n_${locale}`
      const fields = await transform(item, locale)
      await sanity.createOrReplace({ _id: id, _type: type, language: locale, ...fields })
      console.log(`  ✓ [${locale}] ${id}`)
      docs.push({ locale, id })
    } catch (e) {
      console.warn(`  ⚠ [${locale}]`, (e as Error).message)
    }
    await sleep(300)
  }

  if (docs.length >= 2) {
    await sanity.createOrReplace({
      _id: `i18n.${type}`,
      _type: 'translation.metadata',
      schemaTypes: [type],
      translations: docs.map(({ locale, id }) => ({ _key: locale, value: docRef(id) })),
    })
  }
}

// ─── Content Type Transformers ────────────────────────────────────────────────

async function txHeroImage(item: any) {
  const imageId = await uploadAsset(item.image?.url, 'image', item.image?.name)
  return {
    title: item.title ?? '',
    image: imageId ? imgRef(imageId) : undefined,
    altText: item.altText ?? '',
    caption: item.caption ?? '',
    order: item.order ?? 0,
    isActive: item.isActive ?? true,
  }
}

async function txAboutUs(item: any) {
  const imageId = await uploadAsset(item.AboutUsImage?.url, 'image', item.AboutUsImage?.name)
  return {
    mission: toPortableText(item.Mission),
    vision: toPortableText(item.Vision),
    goal: toPortableText(item.Goal),
    aboutUsDescription: toPortableText(item.AboutUsDescription),
    aboutUsImage: imageId ? imgRef(imageId) : undefined,
  }
}

async function txOrgStructure(item: any) {
  const imageId = await uploadAsset(item.structureImage?.url, 'image', item.structureImage?.name)
  return {
    title: item.title ?? '',
    description: toPortableText(item.description),
    structureImage: imageId ? imgRef(imageId) : undefined,
  }
}

async function txMemberWelfare(item: any) {
  const welfareServices = await Promise.all(
    (item.welfareServices ?? []).map(async (f: any, i: number) => {
      const iconId = await uploadAsset(f.icon?.url, 'image', f.icon?.name)
      return {
        _type: 'serviceFeature',
        _key: `wf${i}`,
        title: f.title ?? '',
        description: f.description ?? '',
        icon: iconId ? imgRef(iconId) : undefined,
      }
    }),
  )
  return {
    title: item.title ?? '',
    description: toPortableText(item.description),
    welfareServices,
  }
}

async function txRemittance(item: any) {
  const images = (
    await Promise.all(
      (item.images ?? []).map(async (img: any) => {
        const id = await uploadAsset(img.url, 'image', img.name)
        return id ? { ...imgRef(id), _key: `img${img.id ?? img.documentId}` } : null
      }),
    )
  ).filter(Boolean)

  const features = await Promise.all(
    (item.features ?? []).map(async (f: any, i: number) => {
      const iconId = await uploadAsset(f.icon?.url, 'image', f.icon?.name)
      return {
        _type: 'serviceFeature',
        _key: `f${i}`,
        title: f.title ?? '',
        description: f.description ?? '',
        icon: iconId ? imgRef(iconId) : undefined,
      }
    }),
  )

  return {
    title: item.title ?? '',
    description: toPortableText(item.description),
    images,
    features,
  }
}

async function txPerson(item: any) {
  const imageId = await uploadAsset(item.image?.url, 'image', item.image?.name)
  return {
    name: item.name ?? '',
    position: item.position ?? '',
    department: item.department ?? '',
    bio: toPortableText(item.bio),
    email: item.email ?? '',
    phone: item.phone ?? '',
    image: imageId ? imgRef(imageId) : undefined,
    order: item.order ?? 0,
    personType: item.personType ?? 'managementTeam',
  }
}

async function txCommittee(item: any, locale: string = DEFAULT_LOCALE) {
  const members = (item.members ?? []).map((m: any, i: number) => ({
    _type: 'committeeMember',
    _key: `m${i}`,
    // Reference the person in the same locale as the committee
    person: m.person?.documentId
      ? docRef(sanityDocId('person', m.person.documentId, locale))
      : undefined,
    committeePosition: m.committeePosition ?? '',
    roleDescription: m.roleDescription ?? '',
    order: m.order ?? 0,
  }))
  return {
    name: item.name ?? '',
    description: toPortableText(item.description),
    members,
  }
}

async function txLoanProduct(item: any) {
  return {
    name: item.name ?? '',
    volume: item.volume ?? '',
    rate: item.rate ?? '',
    serviceCharge: item.serviceCharge ?? '',
    term: item.term ?? '',
    order: item.order ?? 0,
  }
}

async function txSavingsProduct(item: any) {
  return {
    name: item.name ?? '',
    interestRate: item.interestRate ?? '',
    order: item.order ?? 0,
  }
}

async function txServiceCategory(item: any) {
  const iconId = await uploadAsset(item.icon?.url, 'image', item.icon?.name)
  return {
    title: item.title ?? '',
    slug: slugVal(item.slug),
    description: toPortableText(item.description),
    icon: iconId ? imgRef(iconId) : undefined,
    order: item.order ?? 0,
  }
}

async function txReportCategory(item: any) {
  return {
    name: item.Name ?? item.name ?? '',
    slug: slugVal(item.slug),
    description: item.Description ?? item.description ?? '',
    order: item.order ?? 0,
    isActive: item.isActive ?? true,
    icon: item.icon ?? '',
    color: item.color ?? '',
  }
}

async function txTestimonial(item: any) {
  const imageId = await uploadAsset(item.Image?.url, 'image', item.Image?.name)
  return {
    name: item.Name ?? '',
    position: item.Position ?? '',
    organization: item.Organization ?? '',
    image: imageId ? imgRef(imageId) : undefined,
    testimonial: item.Testimonial ?? '',
    order: item.Order ?? 0,
    isActive: item.isActive ?? true,
  }
}

async function txNotice(item: any) {
  const [noticeImageId, uploadedFileId] = await Promise.all([
    uploadAsset(item.noticeImage?.url, 'image', item.noticeImage?.name),
    uploadAsset(item.UploadedFile?.url, 'file', item.UploadedFile?.name),
  ])
  return {
    title: item.title ?? '',
    slug: slugVal(item.slug),
    content: toPortableText(item.content),
    noticeType: item.noticeType ?? 'general',
    publishDate: item.publishDate ?? null,
    expiryDate: item.expiryDate ?? null,
    isUrgent: item.isUrgent ?? false,
    priority: item.priority ?? 0,
    isActive: item.isActive ?? true,
    noticeImage: noticeImageId ? imgRef(noticeImageId) : undefined,
    fileSource: item.FileSource ?? 'Upload',
    uploadedFile: uploadedFileId ? fileRef(uploadedFileId) : undefined,
    attachmentFileId: item.attatchmentFile_Id ?? '',
    attachmentFileName: item.attatchmentFileName ?? '',
    attachmentFileSize: item.attatchmentFileSize ?? '',
    viewCount: item.viewCount ?? 0,
    tags: Array.isArray(item.tags) ? item.tags : [],
    displayPopup: item.DisplayPopup ?? false,
    seoTitle: item.seoTitle ?? '',
    seoDescription: item.seoDescription ?? '',
  }
}

async function txReport(item: any) {
  const fileId = await uploadAsset(item.Uploaded_File?.url, 'file', item.Uploaded_File?.name)
  return {
    title: item.title ?? '',
    slug: slugVal(item.slug),
    description: item.description ?? '',
    reportType: item.reportType ?? 'other',
    publishDate: item.publishDate ?? null,
    fiscalYear: item.fiscalYear ?? '',
    quarter: item.quarter ?? null,
    fileSource: item.File_Source ?? 'Upload',
    uploadedFile: fileId ? fileRef(fileId) : undefined,
    fileId: item.file_Id ?? '',
    fileName: item.fileName ?? '',
    featured: item.featured ?? false,
    isActive: item.isActive ?? true,
    order: item.order ?? 0,
    tags: Array.isArray(item.tags) ? item.tags : [],
    seoTitle: item.seoTitle ?? '',
    seoDescription: item.seoDescription ?? '',
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('══════════════════════════════════════════════')
  console.log('  Strapi  →  Sanity  Migration')
  console.log(`  Strapi : ${STRAPI_URL}`)
  console.log(`  Sanity : ${PROJECT_ID} / ${DATASET}`)
  console.log('══════════════════════════════════════════════\n')

  // Verify Strapi is reachable before starting
  console.log('Verifying Strapi connectivity...')
  try {
    await strapiGet('/api/notices?pagination[pageSize]=1')
    console.log('✓ Strapi reachable\n')
  } catch (e) {
    console.error('✗ Cannot reach Strapi:', (e as Error).message)
    console.error('  Make sure the DigitalOcean deployment is live before running this script.')
    process.exit(1)
  }

  // ── Collections (no external relations) ───────────────────────────────────

  // Hero Images — no i18n
  console.log('\n── heroImage (no i18n) ──')
  let heroes: any[] = []
  try {
    heroes = await fetchAllPages('/api/hero-images', { 'populate': '*' })
  } catch (e) {
    console.warn(`  ⚠ Skipped — hero-images API returned 404.`)
    console.warn(`  → To fix: Strapi Admin → Settings → Roles → find your API token role → enable hero-image find/findOne → Save`)
  }
  console.log(`  ${heroes.length} item(s)`)
  for (const item of heroes) {
    const id = `heroImage-${(item.documentId || item.id).replace(/[^a-zA-Z0-9_-]/g, '-')}`
    const fields = await txHeroImage(item)
    await sanity.createOrReplace({ _id: id, _type: 'heroImage', ...fields })
    console.log(`  ✓ ${id}`)
    await sleep(200)
  }

  await migrateCollection('/api/savings-products', 'savingsProduct', {}, txSavingsProduct)
  await migrateCollection('/api/loan-products', 'loanProduct', {}, txLoanProduct)
  await migrateCollection('/api/report-categories', 'reportCategory', {}, txReportCategory)
  await migrateCollection(
    '/api/service-categories',
    'serviceCategory',
    { 'populate': '*' },
    txServiceCategory,
  )
  await migrateCollection(
    '/api/testimonials',
    'testimonial',
    { 'populate': '*' },
    txTestimonial,
  )
  await migrateCollection(
    '/api/notices',
    'notice',
    { 'populate': '*' },
    txNotice,
  )
  await migrateCollection(
    '/api/reports',
    'report',
    { 'populate': '*' },
    txReport,
  )

  // Person must be created before Committee (committee members reference persons)
  await migrateCollection(
    '/api/people',
    'person',
    { 'populate': '*' },
    txPerson,
  )
  await migrateCollection(
    '/api/committees',
    'committee',
    { 'populate[members][populate][person][populate]': '*' },
    txCommittee,
  )

  // ── Singletons ─────────────────────────────────────────────────────────────

  await migrateSingleton(
    '/api/about-us-setting',
    'aboutUsSetting',
    { 'populate': '*' },
    txAboutUs,
  )
  await migrateSingleton(
    '/api/organization-structure',
    'organizationStructure',
    { 'populate': '*' },
    txOrgStructure,
  )
  await migrateSingleton(
    '/api/member-welfare-servicee',
    'memberWelfareService',
    { 'populate[welfareServices][populate]': '*' },
    txMemberWelfare,
  )
  await migrateSingleton(
    '/api/remittance-service',
    'remittanceService',
    { 'populate': '*' },
    txRemittance,
  )

  console.log('\n══════════════════════════════════════════════')
  console.log('  ✓ Migration complete!')
  console.log(`  ↑ ${assetCache.size} unique asset(s) uploaded to Sanity CDN`)
  console.log('══════════════════════════════════════════════')
}

main().catch((e) => {
  console.error('\nFatal:', e)
  process.exit(1)
})
