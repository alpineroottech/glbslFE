# Frontend Migration Guide: Strapi → Sanity

This document is for the frontend developer/agent to replace all Strapi REST API calls with Sanity GROQ queries.

---

## 1. Project Configuration

**Sanity Project ID:** `v41axjo7`
**Dataset:** `production`
**API Version:** `2026-03-08`

### Install dependencies

```bash
npm install @sanity/client @sanity/image-url @portabletext/react
```

### Create Sanity client

```ts
// lib/sanity.ts  (or wherever your API clients live)
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'v41axjo7',
  dataset: 'production',
  apiVersion: '2026-03-08',
  useCdn: true, // use false when writing / previewing drafts
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
```

---

## 2. Fetching Data

Replace all `fetch('/api/...')` or `axios.get(strapiUrl + '/api/...')` calls with:

```ts
// Generic helper
export async function sanityFetch<T>(query: string, params?: Record<string, any>): Promise<T> {
  return client.fetch<T>(query, params)
}

// Example call
const products = await sanityFetch(SAVINGS_PRODUCTS_QUERY, { lang: 'en' })
```

---

## 3. i18n / Locale Filtering

Every document has a `language` field (`"en"` or `"ne"`).
Always pass `lang` as a parameter and filter with `language == $lang`.

---

## 4. Image URLs

Sanity images are **objects**, not plain URLs. Use the `urlFor` helper:

```tsx
import { urlFor } from '@/lib/sanity'

// Basic
<img src={urlFor(person.image).width(400).url()} />

// With auto format + quality
<img src={urlFor(person.image).width(400).auto('format').quality(80).url()} />
```

For file downloads (reports, notices) — the asset URL comes from dereferencing:

```groq
// In your query, always dereference file assets like this:
uploadedFile { asset->{ url } }
```

```ts
// Then in code:
const fileUrl = report.uploadedFile?.asset?.url
```

---

## 5. Rich Text (Portable Text)

Fields that were Strapi "blocks" (rich text) are now **Portable Text arrays**.
These include: `content`, `description`, `mission`, `vision`, `goal`, `aboutUsDescription`, `bio`.

```tsx
import { PortableText } from '@portabletext/react'

// Replace any dangerouslySetInnerHTML or custom block renderers with:
<PortableText value={document.content} />

// With custom components (optional):
<PortableText
  value={document.content}
  components={{
    block: {
      h2: ({children}) => <h2 className="text-2xl font-bold">{children}</h2>,
      normal: ({children}) => <p className="mb-4">{children}</p>,
    },
  }}
/>
```

---

## 6. Slug Fields

Strapi returned `slug` as a plain string.
Sanity returns `slug` as `{ current: "the-slug-value" }`.

In your GROQ queries, always project it as a string:
```groq
"slug": slug.current
```

---

## 7. GROQ Queries — Complete Reference

### Savings Products
**Was:** `GET /api/savings-products?locale=en`
```groq
*[_type == "savingsProduct" && language == $lang] | order(order asc) {
  _id,
  name,
  interestRate,
  order
}
```

---

### Loan Products
**Was:** `GET /api/loan-products?locale=en`
```groq
*[_type == "loanProduct" && language == $lang] | order(order asc) {
  _id,
  name,
  volume,
  rate,
  serviceCharge,
  term,
  order
}
```

---

### Notices (list)
**Was:** `GET /api/notices?locale=en&populate=*`
```groq
*[_type == "notice" && language == $lang && isActive == true] | order(publishDate desc) {
  _id,
  title,
  "slug": slug.current,
  noticeType,
  publishDate,
  expiryDate,
  isUrgent,
  priority,
  noticeImage,
  fileSource,
  uploadedFile { asset->{ url } },
  attachmentFileId,
  attachmentFileName,
  attachmentFileSize,
  displayPopup,
  tags,
  seoTitle,
  seoDescription
}
```

### Single Notice by Slug
**Was:** `GET /api/notices?filters[slug][$eq]=:slug&locale=en&populate=*`
```groq
*[_type == "notice" && language == $lang && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  content,
  noticeType,
  publishDate,
  expiryDate,
  isUrgent,
  priority,
  noticeImage,
  fileSource,
  uploadedFile { asset->{ url } },
  attachmentFileId,
  attachmentFileName,
  attachmentFileSize,
  viewCount,
  tags,
  displayPopup,
  seoTitle,
  seoDescription
}
```

---

### Reports (list)
**Was:** `GET /api/reports?locale=en&populate=*`
```groq
*[_type == "report" && language == $lang && isActive == true] | order(publishDate desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  reportType,
  publishDate,
  fiscalYear,
  quarter,
  fileSource,
  uploadedFile { asset->{ url } },
  fileId,
  fileName,
  featured,
  tags,
  seoTitle,
  seoDescription
}
```

### Reports filtered by type
```groq
*[_type == "report" && language == $lang && isActive == true && reportType == $reportType] | order(publishDate desc) {
  _id,
  title,
  "slug": slug.current,
  reportType,
  publishDate,
  fiscalYear,
  quarter,
  fileSource,
  uploadedFile { asset->{ url } },
  fileId,
  fileName
}
// reportType values: "quarterly" | "annual" | "agm" | "base-rate" | "staff-training" | "governance" | "other"
```

---

### People (by type)
**Was:** `GET /api/people?locale=en&populate=*&filters[personType][$eq]=boardMember`
```groq
*[_type == "person" && language == $lang && personType == $personType] | order(order asc) {
  _id,
  name,
  position,
  department,
  bio,
  email,
  phone,
  image,
  order,
  personType
}
```

**personType values:**
- `"boardMember"` — Board of Directors
- `"managementTeam"` — Management Team
- `"corporateTeam"` — Corporate Team
- `"committeeMember"` — Committee Member
- `"monitoringSupervision"` — Monitoring & Supervision
- `"informationOfficer"` — Information Officer
- `"complianceOfficer"` — Compliance Officer
- `"complaintOfficer"` — Complaint Officer

### All People (all types)
```groq
*[_type == "person" && language == $lang] | order(order asc) {
  _id,
  name,
  position,
  department,
  image,
  email,
  phone,
  order,
  personType
}
```

---

### Committees (with nested person data)
**Was:** `GET /api/committees?locale=en&populate[members][populate][person][populate]=*`
```groq
*[_type == "committee" && language == $lang] {
  _id,
  name,
  description,
  members[] {
    _key,
    committeePosition,
    roleDescription,
    order,
    person-> {
      _id,
      name,
      position,
      department,
      image,
      email,
      phone
    }
  }
}
```

---

### About Us (singleton)
**Was:** `GET /api/about-us-setting?locale=en&populate=*`
```groq
*[_type == "aboutUsSetting" && language == $lang][0] {
  mission,
  vision,
  goal,
  aboutUsDescription,
  aboutUsImage
}
```

---

### Organization Structure (singleton)
**Was:** `GET /api/organization-structure?locale=en&populate=*`
```groq
*[_type == "organizationStructure" && language == $lang][0] {
  title,
  description,
  structureImage
}
```

---

### Member Welfare Service (singleton)
**Was:** `GET /api/member-welfare-servicee?locale=en&populate=*`
```groq
*[_type == "memberWelfareService" && language == $lang][0] {
  title,
  description,
  welfareServices[] {
    _key,
    title,
    description,
    icon
  }
}
```

---

### Remittance Service (singleton)
**Was:** `GET /api/remittance-service?locale=en&populate=*`
```groq
*[_type == "remittanceService" && language == $lang][0] {
  title,
  description,
  images,
  features[] {
    _key,
    title,
    description,
    icon
  }
}
```

---

### Service Categories
**Was:** `GET /api/service-categories?locale=en&populate=*`
```groq
*[_type == "serviceCategory" && language == $lang] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  icon,
  order
}
```

---

### Report Categories
**Was:** `GET /api/report-categories?locale=en`
```groq
*[_type == "reportCategory" && language == $lang && isActive == true] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  icon,
  color,
  order
}
```

---

### Hero Images *(no data — schema exists for future use)*
```groq
*[_type == "heroImage" && isActive == true] | order(order asc) {
  _id,
  title,
  image,
  altText,
  caption,
  order
}
```

---

### Testimonials *(no data — schema exists for future use)*
```groq
*[_type == "testimonial" && language == $lang && isActive == true] | order(order asc) {
  _id,
  name,
  position,
  organization,
  image,
  testimonial,
  order
}
```

---

## 8. Field Name Changes (Strapi → Sanity)

| Strapi field path | Sanity field | Notes |
|---|---|---|
| `data.attributes.slug` | `slug.current` | Project as `"slug": slug.current` |
| `data.attributes.image.data.attributes.url` | `image` | Use `urlFor(image).url()` |
| `data.attributes.UploadedFile.data.attributes.url` | `uploadedFile.asset.url` | Query with `asset->{ url }` |
| `data.attributes.Uploaded_File` | `uploadedFile` | Same |
| `data.attributes.AboutUsImage` | `aboutUsImage` | |
| `data.attributes.AboutUsDescription` | `aboutUsDescription` | Portable Text |
| `data.attributes.Mission` | `mission` | Portable Text |
| `data.attributes.Vision` | `vision` | Portable Text |
| `data.attributes.Goal` | `goal` | Portable Text |
| `data.attributes.File_Source` | `fileSource` | Values unchanged |
| `data.attributes.attatchmentFile_Id` | `attachmentFileId` | Typo fixed |
| `data.attributes.attatchmentFileName` | `attachmentFileName` | Typo fixed |
| `data.attributes.attatchmentFileSize` | `attachmentFileSize` | Typo fixed |
| `data.attributes.Name` (testimonial) | `name` | Lowercase now |
| `data.attributes.Position` (testimonial) | `position` | Lowercase now |
| `data.attributes.Organization` | `organization` | Lowercase now |
| `data.attributes.Testimonial` | `testimonial` | Lowercase now |
| `data.attributes.Image` (testimonial) | `image` | Lowercase now |
| `data.attributes.structureImage` | `structureImage` | Same |
| Strapi blocks (rich text) | Portable Text array | Use `<PortableText>` |
| `data.meta.pagination.total` | Use GROQ `count()` | `count(*[_type == "notice"])` |

---

## 9. Pagination

Strapi had `?pagination[page]=1&pagination[pageSize]=10`.
In GROQ, use array slicing:

```groq
// Page 1, 10 per page:
*[_type == "notice" && language == $lang && isActive == true] | order(publishDate desc) [0..9] { ... }

// Page 2:
*[...] [10..19] { ... }

// Dynamic (pass $start and $end as params):
*[_type == "notice" && language == $lang] | order(publishDate desc) [$start..$end] { ... }
// where start = (page - 1) * pageSize, end = start + pageSize - 1

// Total count (for pagination UI):
count(*[_type == "notice" && language == $lang && isActive == true])
```

---

## 10. Environment Variables

Add to your frontend `.env`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=v41axjo7
NEXT_PUBLIC_SANITY_DATASET=production
```

Remove (no longer needed):
```env
# STRAPI_URL=...
# STRAPI_TOKEN=...
```

---

## 11. Data Currently Available in Sanity

| Content Type | EN | NE |
|---|---|---|
| savingsProduct | 9 | 9 |
| loanProduct | 12 | 12 |
| notice | 3 | 0 |
| report | 6 | 0 |
| person | 36 | 31 |
| committee | 4 | 4 |
| aboutUsSetting | ✓ | ✓ |
| memberWelfareService | ✓ EN only | — |
| organizationStructure | — | — |
| remittanceService | — | — |
| heroImage | 0 | — |
| testimonial | 0 | 0 |
| serviceCategory | 0 | 0 |
| reportCategory | 0 | 0 |

All person photos and notice images are uploaded to Sanity CDN (24 assets).
