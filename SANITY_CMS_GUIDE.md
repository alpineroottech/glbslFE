## Sanity CMS Guide (GLBSL) — English & Nepali

This guide explains how the client can use the **Sanity Studio** for the GLBSL website (production CMS). The Sanity Studio is available here:

- https://glbsl.com.np/studio

It covers adding people (English/Nepali), managing reports, notices, hero images, financial products, services, and the site’s “About” content.

> Note on screenshots: I can’t directly access your logged-in Sanity UI to capture real screenshots. Below, I’ve placed clear “Screenshot here” markers showing exactly what the client should screenshot while following the steps.

---

## 1) What this CMS controls

The Sanity Studio (hosted at `/studio`) uses schemas configured in `glbslCMS/` and is responsible for:
- Website hero carousel images (`heroImage`)
- People and committees (`person`, `committee`)
- Financial products (`loanProduct`, `savingsProduct`)
- Services (`serviceCategory`, `memberWelfareService`, `remittanceService`)
- Reports (`report`)
- Notices (`notice`) including career notices
- Testimonials (`testimonial`)
- “About Us” and “Organization Structure” singletons (`aboutUsSetting`, `organizationStructure`)

It also supports **English + Nepali translations** using Sanity’s internationalization plugin.

---

## 2) Open Sanity Studio (Production)

1. Open your browser.
2. Go to: https://glbsl.com.np/studio
3. Sign in when prompted.

> This Studio is already hosted online and connected to the **production** dataset. Changes will update the website after a short delay (usually a few minutes).

For the client, you should not need to run `sanity dev` or use `localhost`.

### Screenshot here
- Screenshot the Studio home page (left sidebar visible).

---

## 3) How English/Nepali translations work (important)

In Sanity Studio, most document types are translated using:
- Supported languages: `en` (English) and `ne` (Nepali)
- The schema includes a hidden, read-only `language` field

### Recommended workflow
When you create or edit a document:
1. Always fill **English** first (if that’s your starting language).
2. Add/edit the **Nepali translation** using the language switch controls in the editor UI.
3. Keep structure consistent:
   - Same logical person/report/product record
   - Nepali translation is the translation of the same document (not a separate unrelated document)

### What “not showing” usually means
If content doesn’t appear on the frontend, it is commonly one of these:
- Missing Nepali translation when Nepali language is selected by the user
- Wrong category selection (ex: report `reportType` doesn’t match the section being viewed)
- `isActive` is false
- File source mismatch (set to Google Drive but no Drive file id, or set to Upload but no file uploaded)

### Screenshot here
- Screenshot the editor header showing the language selector.

---

## 4) Sidebar navigation (what the client will use daily)

In the left sidebar you’ll see **Content** with these main sections:

1. **Site Settings**
   - About Us (singleton)
   - Organization Structure (singleton)
2. **Hero Images**
3. **People & Committees**
   - People
   - Committees
4. **Financial Products**
   - Loan Products
   - Savings Products
5. **Services**
   - Service Categories
   - Member Welfare Service (singleton)
   - Remittance Service (singleton)
6. **Reports**
   - All Reports
   - Annual Reports / Quarterly Reports / AGM Minutes / Base Rate Reports / Staff Training / Governance / Other
7. **Notices**
   - All Notices
   - Career Notices
8. **Testimonials**

### Screenshot here
- Screenshot the sidebar “Content” menu expanded.

---

## 5) Adding People (English + Nepali)

### Where
- **Content → People & Committees → People**

### Add a new Person
1. Click **People → Create new**
2. Fill these fields:
   - **Name** (required)
   - **Position** (required)
   - **Person Type** (required)
     - Examples: Board Member, Management Team, Corporate Team, Committee Member, Monitoring & Supervision, Information Officer, Compliance Officer, Complaint Officer
   - **Department** (optional)
   - **Bio** (rich text blocks)
   - **Email** (optional; recommended to keep empty if unknown)
   - **Phone** (optional)
   - **Image** (required for good UI)
   - **Order** (number; used to control list ordering)

### English vs Nepali
1. Create/fill the document in **English**
2. Switch language to **Nepali** and fill Nepali values too.

### Screenshot here
- Screenshot the “Create Person” form with fields visible.

---

## 6) Adding Committees

### Where
- **Content → People & Committees → Committees**

### Create a committee
1. Click **Committees → Create new**
2. Fill:
   - **Name** (required)
   - **Description** (array of blocks)
   - **Members** (array of committeeMember objects)

### Adding Members to a committee
For each committee member entry:
- **Person** (reference dropdown to an existing `person`)
- **Committee Position** (required)
- **Role Description** (optional)
- **Order** (number)

### English vs Nepali
Committees are i18n-enabled, so add translations if needed.

### Screenshot here
- Screenshot the committee “Members” editor array.

---

## 7) Hero Images (Homepage carousel)

### Where
- **Content → Hero Images**

### Create or update hero images
Each `heroImage` document includes:
- **Title** (required)
- **Image** (required)
- **Alt Text** (recommended)
- **Caption** (optional)
- **Order** (number; affects carousel sequence)
- **isActive** (toggle)

Important:
- `heroImage` is **not translated** (no English/Nepali versions).

### Screenshot here
- Screenshot the hero image list showing `isActive` and `Order`.

---

## 8) Financial Products

### Loan Products
**Content → Financial Products → Loan Products**
Fields:
- **Name** (required)
- **Volume** (optional)
- **Rate** (optional)
- **Service Charge** (optional)
- **Term** (optional)
- **Order** (number)

### Savings Products
**Content → Financial Products → Savings Products**
Fields:
- **Name** (required)
- **Interest Rate** (optional)
- **Order** (number)

### English vs Nepali
Both are i18n-enabled. Create English first, then add Nepali translation.

### Screenshot here
- Screenshot “Loan Products” editor with fields.

---

## 9) Services

### A) Service Categories
**Content → Services → Service Categories**
Fields:
- **Title** (required)
- **Slug** (auto from title)
- **Description** (rich text blocks array)
- **Icon** (image)
- **Order** (number)

### B) Member Welfare Service (singleton)
**Content → Services → Member Welfare Service**
Fields:
- **Title** (required)
- **Description** (blocks)
- **Welfare Services** (array of `serviceFeature`)

`serviceFeature` fields:
- **Title** (required)
- **Description** (text)
- **Icon** (image)

### C) Remittance Service (singleton)
**Content → Services → Remittance Service**
Fields:
- **Title** (required)
- **Description** (blocks)
- **Images** (array of images)
- **Features** (array of `serviceFeature`)

### English vs Nepali
Member Welfare and Remittance are i18n-enabled and should have both languages.

### Screenshot here
- Screenshot a singleton service editor (Member Welfare / Remittance).

---

## 10) Adding Reports (and ordering)

### Where
- **Content → Reports**
  - Use the submenu that matches `reportType`:
    - **Annual Reports** (`reportType = annual`)
    - **Quarterly Reports** (`reportType = quarterly`)
    - **AGM Minutes** (`reportType = agm`)
    - **Base Rate Reports** (`reportType = base-rate`)
    - **Staff Training Reports** (`reportType = staff-training`)
    - **Governance Reports** (`reportType = governance`)
    - **Other Reports** (`reportType = other`)
  - “All Reports” shows everything.

### Create a new report
1. Click the correct submenu (example: “Quarterly Reports”)
2. Create a new `report` document
3. Fill:
   - **Title** (required)
   - **Description** (optional)
   - **Report Type** (required; must match the section you want)
   - **Publish Date** (required; controls newest-first ordering on frontend)
   - **Fiscal Year** (optional)
   - **Quarter** (optional dropdown: Q1–Q4)
   - **File Source** (required)
     - `Upload` or `Google Drive`

#### Upload mode
Set **File Source = Upload** and provide:
- **Uploaded File**

#### Google Drive mode
Set **File Source = Google Drive** and provide:
- **Google Drive File ID**
- **File Name**

### Featured / Active
- **featured**: boolean
- **isActive**: boolean (if false, it may not show on the frontend)
- **order**: number (manual ordering support)

### English vs Nepali
`report` is i18n-enabled:
- Create English translation of the report
- Add Nepali translation for the same logical report

### Screenshot here
- Screenshot the report create form with “File Source” visible.

### Removing reports
To remove from the website:
- Prefer setting `isActive = false`
- Or delete the document if removal is final

---

## 11) Notices (General + Career Notices)

### Where
- **Content → Notices**
  - **All Notices**
  - **Career Notices** (`noticeType = career`)

### Create a new notice
Fields:
- **Title** (required)
- **Content** (rich text blocks array)
- **Notice Type** (required)
  - Set to **Career** to appear under Career Notices
- **Publish Date** (required)
- **Expiry Date** (optional)
- **Is Urgent** (boolean)
- **Priority** (number)
- **Is Active** (boolean)
- **Notice Image** (image)

#### Attachments
- **File Source**: `Upload` or `Google Drive`

Upload mode:
- **Uploaded File**

Google Drive mode:
- **Google Drive File ID**
- **Attachment File Name**

### English vs Nepali
`notice` is i18n-enabled: add translations so both languages show content.

### Screenshot here
- Screenshot the notice form showing “Notice Type” and “File Source”.

---

## 12) Testimonials

### Where
- **Content → Testimonials**

Fields:
- **Name** (required)
- **Position** (optional)
- **Organization** (string)
- **Image** (image)
- **Testimonial** (required text)
- **Order** (number)
- **Is Active** (boolean)

### English vs Nepali
`testimonial` is i18n-enabled.

### Screenshot here
- Screenshot a testimonial create form.

---

## 13) About Us (Singleton)

### Where
- **Content → Site Settings → About Us**

This is a singleton (only one record exists):
- You cannot create multiple “About Us Setting” documents

Fields:
- **Mission** (blocks)
- **Vision** (blocks)
- **Goal** (blocks)
- **About Us Description** (blocks)
- **About Us Image** (image)

### English vs Nepali
Add translations in the editor UI.

### Screenshot here
- Screenshot the About Us singleton editor.

---

## 14) Organization Structure (Singleton)

### Where
- **Content → Site Settings → Organization Structure**

Singleton fields:
- **Title** (required)
- **Description** (blocks)
- **Structure Image** (image)

### English vs Nepali
Add translations.

### Screenshot here
- Screenshot the Organization Structure editor.

---

## 15) Safety checklist before “Approved”

For any new/updated content, verify:
1. Correct language translation exists (English + Nepali)
2. Correct category field is set (example: report `reportType`, notice `noticeType`)
3. `isActive` is true where applicable
4. `publishDate` is correct for reports/notices ordering
5. For files:
   - `File Source = Upload` → uploaded file is present
   - `File Source = Google Drive` → Drive File ID + File Name are set

### Screenshot here
- Screenshot the final “Preview” panel after saving.

---

## 16) Want “real screenshots” instead of placeholders?

If you can send me 3–6 screenshots of your Sanity Studio (sidebar + create/edit forms + language switch),
I’ll revise this guide to include the actual screenshots and annotate the important buttons/fields.

