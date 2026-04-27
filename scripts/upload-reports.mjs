/**
 * Bulk report uploader for GLBSL Sanity CMS
 *
 * Uploads PDF reports from reports_to_upload/ to Sanity,
 * assigns correct reportType, fiscalYear, quarter, and publishDate.
 * Latest reports appear first on the website (ordered by publishDate desc).
 *
 * Usage: node scripts/upload-reports.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const client = createClient({
  projectId: 'v41axjo7',
  dataset: 'production',
  apiVersion: '2026-04-26',
  token: 'skOPvrY3YnsXXDhkGZzTqTO87uShwaomkoezxFC0hkDK3kKGqFvZm5u8vb2Og6xSTrWDPlhisw7euN2oKOJsjjFjacBX2GAJCHnOeOBOSC0OKMWwPTlRXxosd6nUS0CdUxbOufXB7WEZDUzzlhnehM1QYDgxHtni1PgMiHiryk4BWihAHlxE',
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Report manifest — one entry per PDF to upload.
// publishDate uses Gregorian quarter-end dates derived from Nepali fiscal year:
//   Q1 ends mid-Oct  → use -10-15
//   Q2 ends mid-Jan  → use -01-15 (next calendar year)
//   Q3 ends mid-Apr  → use -04-15
//   Q4 ends mid-Jul  → use -07-15
//
// NOTE: FY 2082/083 Q2 is already uploaded — SKIPPED.
// ---------------------------------------------------------------------------
const REPORTS = [
  // ── QUARTERLY ─────────────────────────────────────────────────────────────

  // FY 2073/074 (Q1 missing from folder)
  { file: 'Quarterly Reports/F.Y 2073.074/2nd Quarterly Report.pdf',      type: 'quarterly', fy: '2073/074', quarter: 'Q2', date: '2017-01-15' },
  { file: 'Quarterly Reports/F.Y 2073.074/3rd Quarterly Report.pdf',      type: 'quarterly', fy: '2073/074', quarter: 'Q3', date: '2017-04-15' },
  { file: 'Quarterly Reports/F.Y 2073.074/4th Quarterly Report.pdf',      type: 'quarterly', fy: '2073/074', quarter: 'Q4', date: '2017-07-15' },

  // FY 2074/075
  { file: 'Quarterly Reports/F.Y 2074.075/1st Quarterly Report.pdf',      type: 'quarterly', fy: '2074/075', quarter: 'Q1', date: '2017-10-15' },
  { file: 'Quarterly Reports/F.Y 2074.075/2nd Quarterly Report.pdf',      type: 'quarterly', fy: '2074/075', quarter: 'Q2', date: '2018-01-15' },
  { file: 'Quarterly Reports/F.Y 2074.075/3rd  Quarterly Report.pdf',     type: 'quarterly', fy: '2074/075', quarter: 'Q3', date: '2018-04-15' },
  { file: 'Quarterly Reports/F.Y 2074.075/4th Quarterly Report.pdf',      type: 'quarterly', fy: '2074/075', quarter: 'Q4', date: '2018-07-15' },

  // FY 2075/076
  { file: 'Quarterly Reports/F.Y 2075.076/1st Quarterly Report.pdf',      type: 'quarterly', fy: '2075/076', quarter: 'Q1', date: '2018-10-15' },
  { file: 'Quarterly Reports/F.Y 2075.076/2nd Quarterly Report.pdf',      type: 'quarterly', fy: '2075/076', quarter: 'Q2', date: '2019-01-15' },
  { file: 'Quarterly Reports/F.Y 2075.076/3rd Quarterly Report.pdf',      type: 'quarterly', fy: '2075/076', quarter: 'Q3', date: '2019-04-15' },
  { file: 'Quarterly Reports/F.Y 2075.076/4th Quarterly Report.pdf',      type: 'quarterly', fy: '2075/076', quarter: 'Q4', date: '2019-07-15' },

  // FY 2076/077
  { file: 'Quarterly Reports/F.Y 2076.077/1st Quarterly Report 2076.pdf', type: 'quarterly', fy: '2076/077', quarter: 'Q1', date: '2019-10-15' },
  { file: 'Quarterly Reports/F.Y 2076.077/2nd Quarterly Report 2076.pdf', type: 'quarterly', fy: '2076/077', quarter: 'Q2', date: '2020-01-15' },
  { file: 'Quarterly Reports/F.Y 2076.077/3rd Quarterly Report 2076.pdf', type: 'quarterly', fy: '2076/077', quarter: 'Q3', date: '2020-04-15' },
  { file: 'Quarterly Reports/F.Y 2076.077/4th Quarterly Report.pdf',      type: 'quarterly', fy: '2076/077', quarter: 'Q4', date: '2020-07-15' },

  // FY 2077/078
  { file: 'Quarterly Reports/F.Y 2077.078/1st Quarterly Report 2077.pdf', type: 'quarterly', fy: '2077/078', quarter: 'Q1', date: '2020-10-15' },
  { file: 'Quarterly Reports/F.Y 2077.078/2nd Quarterly Report 2077.pdf', type: 'quarterly', fy: '2077/078', quarter: 'Q2', date: '2021-01-15' },
  { file: 'Quarterly Reports/F.Y 2077.078/3rd Quarterly Report 2077.pdf', type: 'quarterly', fy: '2077/078', quarter: 'Q3', date: '2021-04-15' },
  { file: 'Quarterly Reports/F.Y 2077.078/4th Quarterly Report 2077-78.pdf', type: 'quarterly', fy: '2077/078', quarter: 'Q4', date: '2021-07-15' },

  // FY 2078/079
  { file: 'Quarterly Reports/F.Y 2078.079/1st Quarterly Report 2078.079.pdf', type: 'quarterly', fy: '2078/079', quarter: 'Q1', date: '2021-10-15' },
  { file: 'Quarterly Reports/F.Y 2078.079/2nd Quarterly Report 2078.079.pdf', type: 'quarterly', fy: '2078/079', quarter: 'Q2', date: '2022-01-15' },
  { file: 'Quarterly Reports/F.Y 2078.079/3rd Quarterly Report 2078.079.pdf', type: 'quarterly', fy: '2078/079', quarter: 'Q3', date: '2022-04-15' },
  { file: 'Quarterly Reports/F.Y 2078.079/4th Quarterly Report 2078.079.pdf', type: 'quarterly', fy: '2078/079', quarter: 'Q4', date: '2022-07-15' },

  // FY 2079/080
  { file: 'Quarterly Reports/F.Y 2079.080/1st Quarterly Report 2079.080.pdf', type: 'quarterly', fy: '2079/080', quarter: 'Q1', date: '2022-10-15' },
  { file: 'Quarterly Reports/F.Y 2079.080/2nd Quarterly Report 2079.080.pdf', type: 'quarterly', fy: '2079/080', quarter: 'Q2', date: '2023-01-15' },
  { file: 'Quarterly Reports/F.Y 2079.080/3rd Quarterly Report 2079.080.pdf', type: 'quarterly', fy: '2079/080', quarter: 'Q3', date: '2023-04-15' },
  { file: 'Quarterly Reports/F.Y 2079.080/4th Quarterly Report 2079.080.pdf', type: 'quarterly', fy: '2079/080', quarter: 'Q4', date: '2023-07-15' },

  // FY 2080/081
  { file: 'Quarterly Reports/F.Y 2080.081/1st Quarterly Report 2080.081.pdf', type: 'quarterly', fy: '2080/081', quarter: 'Q1', date: '2023-10-15' },
  { file: 'Quarterly Reports/F.Y 2080.081/2nd Quarterly Report 2080.081.pdf', type: 'quarterly', fy: '2080/081', quarter: 'Q2', date: '2024-01-15' },
  { file: 'Quarterly Reports/F.Y 2080.081/3rd Quarterly Report 2080.081.pdf', type: 'quarterly', fy: '2080/081', quarter: 'Q3', date: '2024-04-15' },
  { file: 'Quarterly Reports/F.Y 2080.081/4th Quarterly Report 2080.081.pdf', type: 'quarterly', fy: '2080/081', quarter: 'Q4', date: '2024-07-15' },

  // FY 2081/082
  { file: 'Quarterly Reports/F.Y. 2081.082/1st Quarterly Report 2081.82/1st Quarterly Report 2081.82.pdf',   type: 'quarterly', fy: '2081/082', quarter: 'Q1', date: '2024-10-15' },
  { file: 'Quarterly Reports/F.Y. 2081.082/2nd Quarterly Report 2081.82/2nd Quarterly Report 2081.082.pdf',  type: 'quarterly', fy: '2081/082', quarter: 'Q2', date: '2025-01-15' },
  { file: 'Quarterly Reports/F.Y. 2081.082/3rd Quarterly Report 2081.082/3rd Quarterly Report 2081.82.pdf',  type: 'quarterly', fy: '2081/082', quarter: 'Q3', date: '2025-04-15' },
  { file: 'Quarterly Reports/F.Y. 2081.082/4th Quarterly Report 2081.082/4th Quarterly Report 2081.082.pdf', type: 'quarterly', fy: '2081/082', quarter: 'Q4', date: '2025-07-15' },

  // FY 2082/083 — Q1 only (Q2 already uploaded by user)
  { file: 'Quarterly Reports/F.Y. 2082.083/1st Quarterly Report 2082.083/1st Quarterly Report 2082.083.pdf', type: 'quarterly', fy: '2082/083', quarter: 'Q1', date: '2025-10-15' },

  // ── GOVERNANCE ────────────────────────────────────────────────────────────
  { file: 'Governance Report/Sansthagat Susasan Report 2080-81.pdf', type: 'governance', fy: '2080/081', quarter: null, date: '2024-07-15' },
  { file: 'Governance Report/Sansthagat Susasan Report 2081-82.PDF', type: 'governance', fy: '2081/082', quarter: null, date: '2025-07-15' },

  // ── STAFF TRAINING ────────────────────────────────────────────────────────
  { file: 'Training & Development/Staff Training Details FY 2079.080.pdf',            type: 'staff-training', fy: '2079/080', quarter: null, date: '2023-07-15' },
  { file: 'Training & Development/Staff Trainini Details FY  2080.81 Up To Poush.pdf', type: 'staff-training', fy: '2080/081', quarter: null, date: '2024-01-15' },
  { file: 'Training & Development/Staff Training Reports 2080.81 Up to Asar.pdf',     type: 'staff-training', fy: '2080/081', quarter: null, date: '2024-07-15' },

  // ── BASE RATE (Interest Rate Notice Q1 FY 2082/083) ──────────────────────
  { file: 'Interest Rate Notice/1. 1st Qtr FY 2082.083/Interest Rate Notice 2082-03-32/Interest Rate Notice.PDF', type: 'base-rate', fy: '2082/083', quarter: 'Q1', date: '2025-10-15' },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeTitle(entry) {
  const { type, fy, quarter } = entry
  const typeLabel = {
    'quarterly':     'Quarterly Report',
    'annual':        'Annual Report',
    'agm':           'AGM Minutes',
    'base-rate':     'Interest Rate Notice',
    'staff-training':'Staff Training Report',
    'governance':    'Governance Report',
    'other':         'Report',
  }[type] ?? 'Report'

  const parts = [typeLabel]
  if (quarter) parts.push(quarter)
  if (fy)      parts.push(`FY ${fy}`)
  return parts.join(' — ')
}

function makeSlug(entry) {
  return makeTitle(entry)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

// ---------------------------------------------------------------------------
// Check for duplicates already in Sanity
// ---------------------------------------------------------------------------
async function fetchExistingSlugs() {
  const docs = await client.fetch(`*[_type == "report"]{ "slug": slug.current }`)
  return new Set(docs.map((d) => d.slug))
}

// ---------------------------------------------------------------------------
// Upload one report
// ---------------------------------------------------------------------------
async function uploadReport(entry, existingSlugs, index, total) {
  const absPath = path.join(ROOT, 'reports_to_upload', entry.file)
  const slug = makeSlug(entry)
  const title = makeTitle(entry)

  const label = `[${index + 1}/${total}] ${title}`

  if (!fs.existsSync(absPath)) {
    console.warn(`  ⚠  SKIP (file not found): ${absPath}`)
    return { status: 'skipped', reason: 'file not found', title }
  }

  if (existingSlugs.has(slug)) {
    console.log(`  ✓  SKIP (already in Sanity): ${title}`)
    return { status: 'skipped', reason: 'duplicate', title }
  }

  console.log(`  ↑  Uploading asset … ${label}`)
  const fileBuffer = fs.readFileSync(absPath)
  const filename = path.basename(absPath)

  let asset
  try {
    asset = await client.assets.upload('file', fileBuffer, {
      filename,
      contentType: 'application/pdf',
    })
  } catch (err) {
    console.error(`  ✗  ASSET UPLOAD FAILED: ${title}\n     ${err.message}`)
    return { status: 'error', reason: err.message, title }
  }

  console.log(`  ✎  Creating document … ${label}`)
  const doc = {
    _type: 'report',
    language: 'en',
    title,
    slug: { _type: 'slug', current: slug },
    reportType: entry.type,
    publishDate: entry.date,
    fiscalYear: entry.fy ?? undefined,
    quarter: entry.quarter ?? undefined,
    fileSource: 'Upload',
    uploadedFile: {
      _type: 'file',
      asset: { _type: 'reference', _ref: asset._id },
    },
    isActive: true,
    featured: false,
    order: 0,
  }

  // Remove undefined fields to keep documents clean
  Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k])

  try {
    const created = await client.create(doc)
    console.log(`  ✅  DONE: ${title} (${created._id})`)
    return { status: 'ok', title, id: created._id }
  } catch (err) {
    console.error(`  ✗  DOCUMENT CREATE FAILED: ${title}\n     ${err.message}`)
    return { status: 'error', reason: err.message, title }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('\n🚀  GLBSL Sanity Report Uploader')
  console.log(`    Project : v41axjo7  |  Dataset : production`)
  console.log(`    Reports to process : ${REPORTS.length}\n`)

  const existingSlugs = await fetchExistingSlugs()
  console.log(`    Existing report slugs in Sanity: ${existingSlugs.size}\n`)

  const results = []

  for (let i = 0; i < REPORTS.length; i++) {
    const result = await uploadReport(REPORTS[i], existingSlugs, i, REPORTS.length)
    results.push(result)
    // Small delay to avoid rate-limiting
    await delay(300)
  }

  // Summary
  const ok      = results.filter((r) => r.status === 'ok')
  const skipped = results.filter((r) => r.status === 'skipped')
  const errors  = results.filter((r) => r.status === 'error')

  console.log('\n─────────────────────────────────────')
  console.log(`✅  Uploaded : ${ok.length}`)
  console.log(`⏭   Skipped  : ${skipped.length}`)
  console.log(`❌  Errors   : ${errors.length}`)

  if (errors.length > 0) {
    console.log('\nFailed entries:')
    errors.forEach((e) => console.log(`  • ${e.title} — ${e.reason}`))
  }

  console.log('\nDone.\n')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
