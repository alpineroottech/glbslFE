

Reports:
List: GET /api/reports
Single: GET /api/reports/:id or GET /api/reports?filters[slug][$eq]=:slug
Create (admin): POST /api/reports
Update (admin): PUT /api/reports/:id
Delete (admin): DELETE /api/reports/:id
Report Categories:
List: GET /api/report-categories
Single: GET /api/report-categories/:id or GET /api/report-categories?filters[slug][$eq]=:slug
Notices:
List: GET /api/notices
Single: GET /api/notices/:id or GET /api/notices?filters[slug][$eq]=:slug
Create/Update/Delete via /api/notices
If the project uses Strapi GraphQL or custom controllers, endpoints may differ — tell me if you use GraphQL.

Common query parameters (REST)
Pagination: ?pagination[page]=1&pagination[pageSize]=10
Sorting: ?sort=publishDate:desc (or any field)
Filters: ?filters[isActive][$eq]=true&filters[noticeType][$eq]=urgent
Populate relations/media: ?populate=*, or more selective ?populate=category,noticeImage
Use ?populate=* for quick prototyping; for production prefer enumerating fields to reduce payload.

Report (api::report.report) — data contract
Location: schema.json

Primary fields

id (integer) — Strapi auto id
title (string, required, localized) — maxLength 200
slug (uid, required, localized) — targetField: title
description (text, localized) — maxLength 1000
reportType (enum, required, localized) — one of:
"quarterly", "annual", "agm", "base-rate", "staff-training", "governance", "other"
category (relation manyToOne to Report Category) — populated object with its fields when requested
publishDate (date, required, localized) — e.g., "2025-09-20"
fiscalYear (string, localized) — e.g., "2024/2025"
quarter (enum, localized) — one of "Q1","Q2","Q3","Q4"
file_Id (string, required, localized) — storage/file id (custom field)
fileName (string, required, localized)
featured (boolean, default false)
isActive (boolean, default true)
order (integer, default 0)
tags (json, localized) — free-form array/object for tags
seoTitle (string, localized)
seoDescription (text, localized)
createdAt, updatedAt, publishedAt, locale (from Strapi)
Frontend shape example (GET /api/reports?populate=category): { id: 12, title: "Annual Report 2024", slug: "annual-report-2024", description: "Short summary...", reportType: "annual", category: { id: 3, Name: "Financial", slug: "financial", ... }, publishDate: "2024-08-31", fiscalYear: "2023/2024", quarter: null, file_Id: "abcdef123456", fileName: "annual-report-2024.pdf", featured: false, isActive: true, order: 1, tags: ["finance","annual"], seoTitle: "Annual Report 2024", seoDescription: "SEO summary...", createdAt: "...", updatedAt: "...", }

Important notes for frontend

Use ?populate=category or ?populate=* to include the category relation.
Files here are in custom fields (file_Id, fileName) not Strapi media type — to serve files, check how uploads are stored (there may be a mapping to uploads or external storage). If you want direct media endpoints, we may need to examine how files are uploaded and referenced.
Filtering:
Show only active reports: ?filters[isActive][$eq]=true
Show featured first: ?sort=featured:desc,order:asc,publishDate:desc
Report Category (api::report-category.report-category) — data contract
Location: schema.json

Fields

id
Name (string, required, localized)
slug (uid, required, localized)
Description (text, localized)
order (integer, default 0)
isActive (boolean, default true)
icon (string, maxLength 50) — likely a CSS class or icon name
color (string, maxLength 7) — hex color (e.g., "#FF0000")
reports (oneToMany relation to report) — reverse relation (populate as reports)
Frontend usage

List categories for filters or navigation: GET /api/report-categories?filters[isActive][$eq]=true&sort=order:asc
To get reports in a category: GET /api/report-categories/:id?populate=reports or query reports with category filter: GET /api/reports?filters[category][id][$eq]=:categoryId
Example response (GET /api/report-categories?populate=reports): { id: 3, Name: "Financial", slug: "financial", Description: "Reports related to financials", order: 1, isActive: true, icon: "fas fa-chart-line", color: "#1E90FF", reports: [ { id: 12, title: "...", slug: "...", ... }, ... ] }

Notice (api::notice.notice) — data contract
Location: schema.json

Primary fields

id
title (string, required, localized)
slug (uid, required, localized)
content (blocks, localized) — rich/content blocks (structured content)
noticeType (enum) — default "general"; values:
"general","regulatory","urgent","public","internal","event"
publishDate (date, required, localized)
expiryDate (datetime, localized)
isUrgent (boolean, default false)
priority (integer, default 0)
isActive (boolean, default true)
attatchmentFile_Id (string) — custom file id (note spelling: "attatchment")
attatchmentFileName (string)
attatchmentFileSize (string)
viewCount (integer, default 0)
tags (json, localized)
seoTitle, seoDescription
noticeImage (media, single, allowedTypes images/files/videos) — media field, requires ?populate=noticeImage to include object with url and properties
Frontend shape example (GET /api/notices?populate=noticeImage): { id: 21, title: "Office Closure", slug: "office-closure-april", content: [ ... blocks ... ], noticeType: "general", publishDate: "2025-04-10", expiryDate: "2025-04-15T00:00:00.000Z", isUrgent: true, priority: 10, isActive: true, attatchmentFile_Id: "file_abc", attatchmentFileName: "closure.pdf", attatchmentFileSize: "12345", viewCount: 120, tags: ["holiday","closure"], noticeImage: { id: 55, name: "img.jpg", url: "/uploads/img.jpg", ... }, createdAt: "...", updatedAt: "..." }

Important notes for frontend

content is a Blocks field (Strapi rich content). Frontend should be able to render Strapi blocks or request HTML via a renderer/converter. If the frontend can't render blocks natively, you may ask the backend to provide serialized HTML or store content as sanitized HTML.
noticeImage uses Strapi media type: use ?populate=noticeImage and then access data.attributes.url or similar depending on Strapi version (for Strapi v4+ typical response structure is {...data: {id, attributes:{ url }}} when using /api route; but the project may be Strapi v5 — inspect exact runtime shape if needed).
Note spelling: several notice fields use "attatchment" (misspelt). Frontend must use the exact field names (attatchmentFileName, etc.) or fix them in the CMS (breaking change).
Use filters to exclude expired or inactive notices:
Exclude expired: ?filters[expiryDate][$gt]=:now or filters[isActive][$eq]=true
Only published: ?filters[publishedAt][$notNull]=true (or rely on Strapi publish status)
Recommended frontend queries and examples
Latest active notices, urgent first, paginated: GET /api/notices?filters[isActive][$eq]=true&sort[0]=isUrgent:desc&sort[1]=priority:desc&sort[2]=publishDate:desc&pagination[page]=1&pagination[pageSize]=10&populate=noticeImage

Notice detail by slug: GET /api/notices?filters[slug][$eq]=office-closure-april&populate=noticeImage,content

Reports in a category: GET /api/reports?filters[category][slug][$eq]=financial&sort=publishDate:desc&populate=category

Featured reports: GET /api/reports?filters[featured][$eq]=true&sort[0]=order:asc&sort[1]=publishDate:desc&populate=category

Notes about response structure

Strapi REST responses typically wrap data: { data: [ { id, attributes: { ... } } ], meta: { pagination: {...}} } in v4/v5. The frontend should handle the "data" and "attributes" nesting.
Confirm whether the project exposes flat responses via a custom controller or plugin; if so adjust expectations.
Edge cases & gotchas (to tell frontend agent)
Spelling: "attatchment" is misspelt; fields must be referenced exactly or corrected in CMS.
Files: Report uses custom file fields (file_Id, fileName) not Strapi media; check how files are served and whether you should use Strapi Media endoints or a custom storage URL.
Blocks rendering: content is Blocks — ensure frontend supports block types used (images, text, embeds) or request HTML.
Localization: many fields are localized (i18n enabled); frontend must request the locale via query param ?locale=en or handle translations from attributes when populated.
Published vs draft: use publishedAt or Strapi's draft/publish filters to show only published content.
Final checklist for the frontend agent (copy/paste)
Reports list: GET /api/reports?filters[isActive][$eq]=true&populate=category
Show: title, slug, publishDate, category.Name, fileName, featured
Report detail: GET /api/reports?filters[slug][$eq]=:slug&populate=category
Show: title, description, fileName, download link (resolve via file_Id), seoTitle, seoDescription
Report categories: GET /api/report-categories?filters[isActive][$eq]=true&sort=order:asc
Show: Name, slug, icon, color
Notices list: GET /api/notices?filters[isActive][$eq]=true&sort=isUrgent:desc,priority:desc,publishDate:desc&populate=noticeImage
Show: title, slug, publishDate, isUrgent, priority, noticeImage.url, snippet of content
Notice detail: GET /api/notices?filters[slug][$eq]=:slug&populate=noticeImage,content
Show: title, content (render blocks), noticeImage, attachment info