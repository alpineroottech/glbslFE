# Debug Sanity Content Issues

## How to Use Sanity Vision

1. Go to `http://localhost:3000/studio` (or your deployed studio URL)
2. Click **Vision** in the left sidebar (bottom icon with eye symbol 👁️)
3. Copy-paste these queries to diagnose issues

---

## 🔍 Query 1: See ALL Quarterly Reports (No Filters)

```groq
*[_type == "report" && reportType == "quarterly"] {
  _id,
  title,
  language,
  reportType,
  isActive,
  publishDate,
  fiscalYear,
  quarter,
  fileSource,
  "hasFile": defined(uploadedFile) || defined(fileId),
  _updatedAt
} | order(publishDate desc)
```

**What to check:**
- Is your new report in this list?
- What is the `language` value? (should be `"en"` or `"ne"`)
- What is the `isActive` value? (should be `true`)
- Is `reportType` exactly `"quarterly"` (lowercase)?

---

## 🔍 Query 2: Simulate Frontend Query (English)

```groq
*[_type == "report" && language == "en" && isActive == true && reportType == "quarterly"] {
  _id,
  title,
  publishDate,
  fiscalYear,
  quarter
} | order(publishDate desc)
```

**Expected result:** This should match what shows on your website (English version)

---

## 🔍 Query 3: Simulate Frontend Query (Nepali)

```groq
*[_type == "report" && language == "ne" && isActive == true && reportType == "quarterly"] {
  _id,
  title,
  publishDate,
  fiscalYear,
  quarter
} | order(publishDate desc)
```

**Expected result:** This should match what shows on your website (Nepali version)

---

## 🔍 Query 4: Check Your Specific Report by Title

Replace `"Your Report Title"` with your actual report title:

```groq
*[_type == "report" && title match "Your Report Title*"] {
  _id,
  title,
  language,
  reportType,
  isActive,
  publishDate,
  "documentStatus": select(
    !defined(language) => "❌ Missing language field",
    language != "en" && language != "ne" => "❌ Invalid language: " + language,
    !isActive => "❌ Document is disabled (isActive = false)",
    reportType != "quarterly" => "❌ Wrong reportType: " + reportType,
    "✅ Document should be visible"
  )
}
```

This will tell you **exactly** what's wrong with your document.

---

## 🔍 Query 5: Count Reports by Type & Language

```groq
{
  "quarterlyEN": count(*[_type == "report" && reportType == "quarterly" && language == "en" && isActive == true]),
  "quarterlyNE": count(*[_type == "report" && reportType == "quarterly" && language == "ne" && isActive == true]),
  "annualEN": count(*[_type == "report" && reportType == "annual" && language == "en" && isActive == true]),
  "annualNE": count(*[_type == "report" && reportType == "annual" && language == "ne" && isActive == true]),
  "totalReports": count(*[_type == "report"]),
  "totalActive": count(*[_type == "report" && isActive == true])
}
```

---

## 🐛 Common Issues & Solutions

### Issue: Report not in Query 1 results
**Solution:** The document doesn't exist or `_type` is wrong. Re-create it in Studio.

### Issue: Report in Query 1 but `language` is `null` or missing
**Problem:** The i18n plugin didn't set the language field.

**Solution:**
1. In Studio, open the report
2. Look for a language selector (usually top-right or in a dropdown)
3. Select **English** or **Nepali (नेपाली)**
4. Save the document

### Issue: Report in Query 1 but `language` is wrong (e.g., `"en"` when viewing Nepali site)
**Solution:** Either:
- Change the document language in Studio, OR
- Toggle the language in your website navbar (top-right EN/NE button)

### Issue: Report in Query 1 but `isActive` is `false`
**Solution:**
1. In Studio, open the report
2. Find the **Is Active** toggle/checkbox
3. Enable it (check the box)
4. Publish the document

### Issue: Report in Query 1 but `reportType` is wrong
**Solution:**
1. In Studio, open the report
2. Find **Report Type** dropdown
3. Select **Quarterly** (for quarterly reports page)
4. Make sure it saves as `"quarterly"` (lowercase)

### Issue: Report in Query 2/3 but still not showing on website
**Solutions:**
1. **Hard refresh browser**: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Wait for CDN**: If you just published, wait 3-5 minutes for the CDN cache
3. **Check console**: Open browser DevTools → Console → look for errors
4. **Rebuild Vercel**: If deployed, trigger a redeploy from Vercel dashboard

### Issue: `hasFile` is `false`
**Problem:** The report has no file attached.

**Solution:**
1. Open the report in Studio
2. Select **File Source**: Upload or Google Drive
3. If Upload: attach a PDF file
4. If Google Drive: enter the File ID (from the Drive URL)
5. Publish

---

## 🚀 After Fixing

1. **Local dev**: Changes appear in 1-2 seconds (hot reload)
2. **Production with CDN**: Wait 3-5 minutes, then hard refresh
3. Use Query 2 or 3 to verify the document now appears in the filtered results
