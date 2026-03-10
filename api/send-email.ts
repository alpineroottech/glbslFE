import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Escape HTML special characters to prevent HTML injection in email templates
const escapeHtml = (str: string): string => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Safe field helper: escape and preserve newlines as <br>
const safeField = (value: any): string => {
  if (value === undefined || value === null || value === '') return 'N/A';
  return escapeHtml(String(value)).replace(/\n/g, '<br>');
};

const resend = new Resend(process.env.RESEND_API_KEY);

// Email template generators
const getContactEmailHtml = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Lora', Georgia, serif; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: white; }
    .header { background: #1a3a1a; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; }
    .content { padding: 30px 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 12px; border-bottom: 1px solid #eee; vertical-align: top; }
    .info-table td:first-child { font-weight: 600; color: #1a3a1a; width: 40%; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    .accent { color: #DAA520; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <p style="margin-bottom: 20px; color: #555;">You have received a new contact form submission from the Gurans Bank website:</p>
      <table class="info-table">
        <tr><td>Name:</td><td>${safeField(data.name)}</td></tr>
        <tr><td>Email:</td><td>${safeField(data.email)}</td></tr>
        <tr><td>Phone:</td><td>${safeField(data.phone)}</td></tr>
        <tr><td>Subject:</td><td>${safeField(data.subject)}</td></tr>
        <tr><td>Message:</td><td>${safeField(data.message)}</td></tr>
        <tr><td>Submitted:</td><td>${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</td></tr>
        <tr><td>Language:</td><td>${data.language === 'ne' ? 'Nepali (नेपाली)' : 'English'}</td></tr>
      </table>
    </div>
    <div class="footer">
      <p>This email was sent from <span class="accent">Gurans Laghubitta Bittiya Sanstha Ltd.</span> website</p>
      <p style="margin-top: 5px; font-size: 12px; color: #999;">www.guranslaghubitta.com.np</p>
    </div>
  </div>
</body>
</html>
`;

const getComplaintEmailHtml = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Lora', Georgia, serif; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: white; }
    .header { background: #1a3a1a; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; }
    .content { padding: 30px 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 12px; border-bottom: 1px solid #eee; vertical-align: top; }
    .info-table td:first-child { font-weight: 600; color: #1a3a1a; width: 40%; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    .accent { color: #DAA520; font-weight: 600; }
    .urgent { background: #fff3cd; padding: 15px; border-left: 4px solid #DAA520; margin: 20px 0; border-radius: 4px; }
    .urgent strong { color: #856404; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚠️ New Complaint Registration</h1>
    </div>
    <div class="content">
      <div class="urgent">
        <strong>⚠️ Action Required:</strong> A new complaint has been registered and requires attention.
      </div>
      <table class="info-table">
        <tr><td>Full Name:</td><td>${safeField(data.fullName)}</td></tr>
        <tr><td>Mobile Number:</td><td>${safeField(data.mobileNumber)}</td></tr>
        <tr><td>Branch Office:</td><td>${safeField(data.branchOffice)}</td></tr>
        <tr><td>Complaint Details:</td><td>${safeField(data.complaint)}</td></tr>
        <tr><td>Submitted:</td><td>${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</td></tr>
        <tr><td>Language:</td><td>${data.language === 'ne' ? 'Nepali (नेपाली)' : 'English'}</td></tr>
      </table>
    </div>
    <div class="footer">
      <p>This complaint was submitted via <span class="accent">Gurans Laghubitta</span> website</p>
      <p style="margin-top: 5px; font-size: 12px; color: #999;">Please respond to the complainant promptly</p>
    </div>
  </div>
</body>
</html>
`;

const getLoanEmailHtml = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Lora', Georgia, serif; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: white; }
    .header { background: #1a3a1a; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; }
    .content { padding: 30px 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 12px; border-bottom: 1px solid #eee; vertical-align: top; }
    .info-table td:first-child { font-weight: 600; color: #1a3a1a; width: 40%; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    .accent { color: #DAA520; font-weight: 600; }
    .highlight { background: #f0f8ff; padding: 15px; border-radius: 4px; margin: 20px 0; text-align: center; }
    .highlight strong { color: #1a3a1a; font-size: 18px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💰 New Loan Application</h1>
    </div>
    <div class="content">
      <div class="highlight">
        <strong>Loan Amount Requested:</strong> <span class="accent">रु ${data.loanAmount ? Number(data.loanAmount).toLocaleString('en-NP') : 'N/A'}</span>
      </div>
      <table class="info-table">
        <tr><td>Full Name:</td><td>${safeField(data.fullName)}</td></tr>
        <tr><td>Email:</td><td>${safeField(data.email)}</td></tr>
        <tr><td>Mobile Number:</td><td>${safeField(data.mobileNumber)}</td></tr>
        <tr><td>Branch Office:</td><td>${safeField(data.branchOffice)}</td></tr>
        <tr><td>Province:</td><td>${safeField(data.province)}</td></tr>
        <tr><td>District:</td><td>${safeField(data.district)}</td></tr>
        <tr><td>Local Body:</td><td>${safeField(data.localBody)}</td></tr>
        <tr><td>Ward Number:</td><td>${safeField(data.wardNumber)}</td></tr>
        <tr><td>Loan Amount:</td><td>रु ${data.loanAmount ? Number(data.loanAmount).toLocaleString('en-NP') : 'N/A'}</td></tr>
        <tr><td>Special Notes:</td><td>${safeField(data.specialNote)}</td></tr>
        <tr><td>Submitted:</td><td>${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</td></tr>
        <tr><td>Language:</td><td>${data.language === 'ne' ? 'Nepali (नेपाली)' : 'English'}</td></tr>
      </table>
    </div>
    <div class="footer">
      <p>This application was submitted via <span class="accent">Gurans Laghubitta</span> website</p>
      <p style="margin-top: 5px; font-size: 12px; color: #999;">Please contact the applicant to proceed with the loan process</p>
    </div>
  </div>
</body>
</html>
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS - restrict to known origins
  const allowedOrigins = [
    'https://guranslaghubitta.com.np',
    'https://www.guranslaghubitta.com.np',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter(Boolean);
  const origin = req.headers.origin || '';
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : (allowedOrigins[0] || '*');
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formType, data } = req.body;

    if (!formType || !data) {
      return res.status(400).json({ error: 'Missing formType or data' });
    }

    // Determine recipient and email content
    let recipientEmail: string;
    let subject: string;
    let htmlContent: string;

    switch (formType) {
      case 'contact':
        recipientEmail = 'info@rootalpine.com';
        subject = `New Contact Form Submission - ${data.name || 'Unknown'}`;
        htmlContent = getContactEmailHtml(data);
        break;

      case 'complaint':
        recipientEmail = 'info@rootalpine.com';
        subject = `New Complaint Registration - ${data.fullName || 'Unknown'}`;
        htmlContent = getComplaintEmailHtml(data);
        break;

      case 'loan':
        recipientEmail = 'info@rootalpine.com';
        subject = `New Loan Application - ${data.fullName || 'Unknown'} (रु ${data.loanAmount ? Number(data.loanAmount).toLocaleString('en-NP') : 'N/A'})`;
        htmlContent = getLoanEmailHtml(data);
        break;

      default:
        return res.status(400).json({ error: 'Invalid formType' });
    }

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: 'Gurans Bank Website <noreply@glbsl.com.np>',
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
    });

    if (!emailResponse.data?.id) {
      throw new Error('Email send failed');
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully'
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email'
    });
  }
}
