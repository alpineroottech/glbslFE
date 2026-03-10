# Email Integration Setup Guide

## Overview
This guide explains how to set up the Resend email integration for the three forms in the GLBSL frontend application:
1. **Contact Form** - Sends to `info@example.com`
2. **Apply for Loan Form** - Sends to `hr@example.com`
3. **Register Complaint Form** - Sends to `mail@swornimpangeni.com.np`

## Prerequisites
- Vercel account (for deployment)
- Resend account (for email service)

## Setup Instructions

### Step 1: Create Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get API Key
1. Log in to your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "GLBSL Website Forms")
5. Copy the API key (it starts with `re_`)

### Step 3: Configure Environment Variables

#### For Local Development
1. Create a `.env` file in the project root (if it doesn't exist)
2. Add the following:
```env
VITE_RESEND_API_KEY=re_your_actual_api_key_here
VITE_STRAPI_API_URL=http://localhost:1337
```

#### For Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `VITE_RESEND_API_KEY`
   - **Value**: Your Resend API key
   - **Scope**: Production, Preview, Development (select all)
4. Click **Save**

### Step 4: Update Sender Email (Production)

By default, the forms use Resend's test domain (`onboarding@resend.dev`). For production:

1. **Verify Your Domain in Resend**:
   - Go to Resend dashboard → **Domains**
   - Click **Add Domain**
   - Enter your domain (e.g., `guranslaghubitta.com.np`)
   - Add the provided DNS records to your domain registrar
   - Wait for verification (usually takes a few minutes)

2. **Update the Sender Email**:
   - Open `api/send-email.ts`
   - Find this line (around line 202):
     ```typescript
     from: 'Gurans Bank Website <onboarding@resend.dev>',
     ```
   - Replace with your verified domain:
     ```typescript
     from: 'Gurans Bank Website <noreply@guranslaghubitta.com.np>',
     ```

### Step 5: Test the Forms

#### Local Testing
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Navigate to each form:
   - Contact: `/contact`
   - Apply for Loan: `/online/apply-for-loan`
   - Register Complaint: `/gunaso/register`
3. Fill out and submit each form
4. Check your email inbox for the received emails

#### Production Testing
1. Deploy to Vercel:
   ```bash
   vercel --prod
   ```
   Or push to your connected Git repository
2. Test each form on the live site
3. Verify emails are received at the correct addresses

## Form Details

### Contact Form
- **Location**: `src/Pages/InnerPage/Contact.tsx`
- **Recipient**: `info@example.com`
- **Fields**: name, email, phone, subject, message
- **Email Subject**: "New Contact Form Submission - {name}"

### Apply for Loan Form
- **Location**: `src/Pages/InnerPage/Online/ApplyForLoanPage.tsx`
- **Recipient**: `hr@example.com`
- **Fields**: fullName, email, mobileNumber, branchOffice, province, district, localBody, wardNumber, loanAmount, specialNote
- **Email Subject**: "New Loan Application - {fullName} (रु {loanAmount})"

### Register Complaint Form
- **Location**: `src/Pages/InnerPage/Gunaso/RegisterComplaintPage.tsx`
- **Recipient**: `mail@swornimpangeni.com.np`
- **Fields**: fullName, mobileNumber, branchOffice, complaint
- **Email Subject**: "New Complaint Registration - {fullName}"

## API Endpoint

### Serverless Function
- **File**: `api/send-email.ts`
- **Endpoint**: `/api/send-email`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "formType": "contact" | "complaint" | "loan",
    "data": {
      // form fields
      "language": "en" | "ne"
    }
  }
  ```
- **Response**:
  - Success: `{ "success": true, "message": "Email sent successfully" }`
  - Error: `{ "error": "Error message", "details": "..." }`

## Troubleshooting

### Email Not Received
1. **Check API Key**: Ensure `VITE_RESEND_API_KEY` is correctly set in Vercel environment variables
2. **Check Resend Dashboard**: Go to Resend → Logs to see if the email was sent
3. **Check Spam Folder**: Emails might be filtered as spam
4. **Verify Recipient Email**: Ensure the recipient email addresses are correct in `api/send-email.ts`

### Form Submission Fails
1. **Check Browser Console**: Look for error messages
2. **Check Network Tab**: See if the API request is being made
3. **Verify Environment Variables**: Make sure they're loaded (restart dev server after adding)
4. **Check Vercel Logs**: For production issues, check Vercel function logs

### Styling Issues
- Emails use inline CSS for compatibility
- Test emails in multiple email clients (Gmail, Outlook, etc.)
- Colors are from project theme: khaki (#DAA520), lightBlack (#1a3a1a)

## Translation Keys

All form messages support both English and Nepali. Translation keys are in `src/utils/translations.ts`:

### Contact Form
- `contact.success` / `contact.successMessage`
- `contact.error` / `contact.errorMessage`
- `contact.sending`

### Complaint Form
- `complaint.success` / `complaint.successMessage`
- `complaint.error` / `complaint.errorMessage`
- `complaint.sending`

### Loan Form
- `loan.success` / `loan.successMessage`
- `loan.error` / `loan.errorMessage`
- `loan.sending`

## Rate Limiting

Consider implementing rate limiting to prevent spam:
- Option 1: Use Vercel Edge Config
- Option 2: Use a third-party service like Upstash
- Option 3: Implement IP-based throttling in the serverless function

## Security Best Practices

1. **Never commit** your `.env` file (it's in `.gitignore`)
2. **Rotate API keys** periodically
3. **Use environment-specific keys** for development and production
4. **Sanitize user inputs** (basic sanitization is included)
5. **Monitor usage** in Resend dashboard to detect abuse

## Support

- **Resend Documentation**: [https://resend.com/docs](https://resend.com/docs)
- **Resend API Reference**: [https://resend.com/docs/api-reference](https://resend.com/docs/api-reference)
- **Vercel Serverless Functions**: [https://vercel.com/docs/functions](https://vercel.com/docs/functions)

## License

This implementation is part of the GLBSL Frontend project.
