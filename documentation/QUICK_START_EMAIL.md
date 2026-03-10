# Quick Start: Email Integration

## Immediate Setup (5 minutes)

### 1. Get Resend API Key
```bash
# Visit: https://resend.com/signup
# 1. Sign up with your email
# 2. Verify email
# 3. Go to API Keys → Create API Key
# 4. Copy the key (starts with "re_")
```

### 2. Add to Local Development
```bash
# Create .env file in project root
echo "VITE_RESEND_API_KEY=re_your_api_key_here" >> .env
echo "VITE_STRAPI_API_URL=http://localhost:1337" >> .env
```

### 3. Test Locally

**IMPORTANT:** Regular `npm run dev` won't work for serverless functions!

```bash
# Option A: Use Vercel CLI (Recommended)
npm install -g vercel
vercel login
vercel dev

# Option B: Deploy to preview and test
vercel

# Then visit the preview URL to test forms
```

**Why?** Serverless functions (`/api/send-email`) only work with Vercel infrastructure.

For more details, see `LOCAL_TESTING_GUIDE.md`

### 4. Deploy to Vercel
```bash
# Option A: From command line
vercel --prod

# Option B: Push to Git (if connected to Vercel)
git add .
git commit -m "Add email integration"
git push origin main

# IMPORTANT: Add environment variable in Vercel dashboard
# Settings → Environment Variables
# Name: VITE_RESEND_API_KEY
# Value: re_your_api_key_here
# Scope: Production, Preview, Development
```

## Current Recipient Emails

Update these in `api/send-email.ts` if needed:

- **Contact Form** → `info@example.com` (line 178)
- **Loan Application** → `hr@example.com` (line 188)
- **Complaint** → `mail@swornimpangeni.com.np` (line 183)

## Testing Commands

```bash
# Install dependencies (already done)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## What Happens When a Form is Submitted?

1. ✅ User fills out form
2. ⏳ Loading modal appears ("Sending...")
3. 📧 Email sent via Resend API
4. ✅ Success message + form reset
   OR
5. ❌ Error message + form preserved for retry

## Email Content Preview

### Contact Form Email:
```
Subject: New Contact Form Submission - John Doe

Body:
- Name: John Doe
- Email: john@example.com
- Phone: 9841234567
- Subject: General Inquiry
- Message: I would like to know more about your services...
- Submitted: 11/12/2025, 3:45:00 PM (Nepal Time)
- Language: English
```

### Loan Application Email:
```
Subject: New Loan Application - Jane Smith (रु 500,000)

Body:
[Highlighted] Loan Amount Requested: रु 500,000
- Full Name: Jane Smith
- Email: jane@example.com
- Mobile: 9801234567
- Branch: Kathmandu Branch
- Province: Bagmati Pradesh
- District: Kathmandu
- Local Body: Kathmandu Municipality
- Ward Number: 15
- Special Notes: Need loan for business expansion...
```

### Complaint Email:
```
Subject: New Complaint Registration - Ram Bahadur

Body:
[Warning Box] ⚠️ Action Required: A new complaint has been registered

- Full Name: Ram Bahadur
- Mobile: 9851234567
- Branch Office: Pokhara Branch
- Complaint: Long waiting time at branch...
```

## Troubleshooting

**Form doesn't submit:**
```bash
# Check console for errors
# Open browser DevTools → Console tab
```

**Email not received:**
```bash
# 1. Check Resend dashboard → Logs
# 2. Check spam folder
# 3. Verify API key is correct
# 4. Check Vercel function logs (for production)
```

**Loading state stuck:**
```bash
# Check Network tab in DevTools
# Verify API endpoint is responding
```

## Next Steps (Optional)

### For Production:
1. **Verify domain in Resend** (removes "via resend.dev" banner)
2. **Add custom sender email** (e.g., noreply@guranslaghubitta.com.np)
3. **Implement rate limiting** (prevent spam)
4. **Add email confirmation** (send copy to user)

### Customization:
- Change email templates in `api/send-email.ts`
- Add more fields to forms
- Customize success/error messages in `src/utils/translations.ts`
- Change recipient emails in `api/send-email.ts`

## Files You Might Want to Customize

```
api/send-email.ts          # Email logic, templates, recipients
src/utils/translations.ts  # Success/error messages
.env                       # API keys (never commit!)
```

## Need Help?

See full documentation in:
- `EMAIL_INTEGRATION_SETUP.md` - Complete setup guide
- `RESEND_IMPLEMENTATION_SUMMARY.md` - Technical details

## Done! 🎉

Your forms are now sending real emails. Test them locally, then deploy to Vercel.
