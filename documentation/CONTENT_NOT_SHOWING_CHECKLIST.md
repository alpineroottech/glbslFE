# Content Not Showing Up? — Troubleshooting Checklist

When you add new content in Sanity Studio but it doesn't appear on the website, check these items:

## ✅ 1. CDN Cache (FIXED)
**Status**: ✅ **RESOLVED** — `useCdn: false` is now set in `src/lib/sanity.ts`  
Previously, the CDN cached responses for 1-5 minutes. This is now disabled for immediate updates.

---

## ⚠️ 2. Language Field
**Most common issue** — Sanity uses document-level internationalization.

### Check in Studio:
1. Open the document you just created
2. Look for the **Language** field (usually at the top or bottom)
3. Make sure it's set to either:
   - `English` (en)
   - `Nepali (नेपाली)` (ne)

### What happens if language is wrong:
- If you're viewing the site in **English** but the document language is **Nepali**, it won't show up
- The query filters by `language == $lang` where `$lang` comes from `localStorage.getItem('language')`

### How to fix:
- **Option A**: Set the document language to match your viewing language
- **Option B**: Toggle the language in the website navbar (top-right EN/NE) to match the document

---

## ⚠️ 3. `isActive` Field
All reports, notices, and some other content types have an `isActive` field.

### Check in Studio:
1. Open your document
2. Find the **Is Active** toggle/checkbox
3. Make sure it's checked/enabled

### What happens if `isActive` is false:
The query includes `&& isActive == true`, so disabled documents are completely hidden from the frontend.

---

## ⚠️ 4. `reportType` Field (Reports Only)
For reports (Quarterly, Annual, AGM, etc.), the `reportType` field must match exactly.

### Valid values:
- `quarterly` (lowercase)
- `annual` (lowercase)
- `agm` (lowercase)
- `baseRate`
- `staffTraining`
- `governance`

### Common mistake:
Using `Quarterly` (capitalized) instead of `quarterly` — the filter is case-sensitive.

### Check in Studio:
1. Open the report document
2. Find **Report Type** dropdown
3. Verify it matches the page you're viewing

---

## ⚠️ 5. Hard Refresh Browser Cache
After fixing the above issues, the browser might still show old cached data.

### How to hard refresh:
- **Windows/Linux**: `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`

---

## ⚠️ 6. Vercel Environment Variables
If content works on `localhost` but not on the deployed site:

1. Go to Vercel dashboard → **Settings** → **Environment Variables**
2. Verify these are set for **Production**:
   - `VITE_SANITY_PROJECT_ID=v41axjo7`
   - `VITE_SANITY_DATASET=production`
3. After adding/changing env vars, **Redeploy** (don't use cached build)

---

## 🔍 Quick Debug Steps

1. **Check language**: Toggle EN/NE in navbar — does content appear?
2. **Check console**: Open browser DevTools → Console tab — any errors?
3. **Check Sanity dataset**: Are you editing `production` dataset in Studio (not `development`)?
4. **Check document published**: Some content types might require explicit "Publish" (look for green dot in Studio sidebar)
5. **Check GROQ query**: If still not working, test the query directly in Sanity Vision:
   ```groq
   *[_type == "report" && language == "en" && isActive == true && reportType == "quarterly"] | order(publishDate desc)
   ```

---

## 🚀 After Fixing

Once you fix the issue:
- **Local dev**: Changes appear immediately (hot reload)
- **Production**: Push code → Vercel auto-deploys → changes live in 1-2 minutes

If you changed **content** (not code), just hard refresh your browser — no redeploy needed with `useCdn: false`.
