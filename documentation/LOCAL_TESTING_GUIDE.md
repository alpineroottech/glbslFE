# Local Development Testing Guide

## ⚠️ Important: Serverless Functions in Local Development

The email integration uses **Vercel Serverless Functions** which don't run with `npm run dev`. You need to use **Vercel CLI** for local testing.

## Option 1: Test with Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Link Your Project
```bash
vercel link
```

### Step 4: Run with Vercel Dev
```bash
vercel dev
```

This will:
- Start your frontend on `localhost:3000`
- Start serverless functions on `/api/*`
- Load environment variables from `.env`

### Step 5: Test the Forms
Visit:
- `http://localhost:3000/contact`
- `http://localhost:3000/online/apply-for-loan`
- `http://localhost:3000/gunaso/register`

## Option 2: Quick Test on Vercel (Easiest)

### Deploy to Preview
```bash
vercel
```

This creates a preview deployment where everything works, including serverless functions.

### Get Preview URL
```bash
# Vercel will output a URL like:
# https://glbsl-frontend-abc123.vercel.app

# Test forms on that URL
```

## Option 3: Mock API for Local Development

If you just want to test the frontend without real emails, create a mock API:

### Create `public/mock-api.js`
```javascript
// This is just for local testing UI
window.mockEmailAPI = async (formData) => {
  console.log('Mock email would send:', formData);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
  return { success: true };
};
```

### Update forms temporarily (NOT FOR PRODUCTION)
In each form, change:
```typescript
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ formType: 'contact', data: {...} })
});
```

To:
```typescript
const response = { ok: true }; // Mock for local testing
console.log('Would send email:', { formType: 'contact', data: {...} });
```

## Current Issue: Why Forms Fail Locally

When running with `npm run dev`:
- ✅ Frontend runs on `localhost:3000` or `localhost:3002`
- ❌ Serverless functions (`/api/*`) don't exist
- ❌ Fetch to `/api/send-email` returns 404 or CORS error

### Solution Summary

**For Real Email Testing:**
```bash
# Use Vercel CLI
vercel dev

# OR deploy to preview
vercel
```

**For UI Testing Only:**
```bash
# Use regular dev server
npm run dev

# But mock the API calls (see Option 3)
```

## Environment Variables for Local Testing

Make sure you have `.env` file (not just `.env.example`):

```bash
# .env
VITE_RESEND_API_KEY=re_your_actual_key
VITE_STRAPI_API_URL=http://localhost:1337
```

## Vercel Dev vs NPM Dev

| Feature | `npm run dev` | `vercel dev` |
|---------|---------------|--------------|
| Frontend | ✅ Works | ✅ Works |
| Serverless Functions | ❌ 404 | ✅ Works |
| Environment Variables | ⚠️ Limited | ✅ Full Support |
| Hot Reload | ✅ Fast | ⚠️ Slower |
| Real Emails | ❌ No | ✅ Yes |

## Recommended Workflow

### 1. UI Development (Fast)
```bash
npm run dev
# Use mock API or skip email testing
```

### 2. Email Testing (When Needed)
```bash
vercel dev
# Test real email sending
```

### 3. Pre-Deployment Testing
```bash
vercel --prod
# Test on actual Vercel infrastructure
```

## Troubleshooting Local Development

### Error: "Failed to send email" or 404
**Cause:** Running with `npm run dev` instead of `vercel dev`

**Fix:**
```bash
# Stop npm dev server (Ctrl+C)
vercel dev
```

### Error: "API key not found"
**Cause:** Missing `.env` file or wrong variable name

**Fix:**
```bash
# Check .env exists
ls -la .env

# Check contents
cat .env

# Should show:
# VITE_RESEND_API_KEY=re_...
```

### Vercel Dev Command Not Found
**Fix:**
```bash
npm install -g vercel
vercel login
```

## Quick Start Commands

```bash
# For email functionality testing
vercel dev

# For quick UI testing only
npm run dev

# For production-like testing
vercel --prod
```

## Next Steps

1. **Stop your current dev server** (Ctrl+C)
2. **Run `vercel dev`** instead
3. **Test the complaint form** at `http://localhost:3000/gunaso/register`
4. **Check email** in your inbox

The form will work perfectly! 🎉
