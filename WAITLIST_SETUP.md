# STACKA Waitlist Setup Guide

## Quick Setup (5 Minutes)

Your waitlist is ready! I've created:
1. ✅ Waitlist page at `/waitlist`
2. ✅ Waitlist section on homepage
3. ✅ Integration ready for email collection

## Choose Your Email Provider

### Option 1: Web3Forms (RECOMMENDED - FREE & SIMPLE)

**Why Web3Forms?**
- ✅ Completely FREE
- ✅ No backend code needed
- ✅ Emails sent to your inbox
- ✅ Export to CSV/Excel
- ✅ Setup in 2 minutes

**Setup Steps:**

1. **Get Your Access Key**
   - Go to https://web3forms.com
   - Click "Get Started Free"
   - Enter your email (admin@stacka.xyz)
   - Copy your Access Key

2. **Add Access Key to Your Code**
   - Open `app/waitlist/page.tsx`
   - Find line 20: `access_key: "YOUR_WEB3FORMS_ACCESS_KEY"`
   - Replace with your actual key: `access_key: "abc123xyz..."`

3. **Test It!**
   - Build and deploy your site
   - Go to `/waitlist`
   - Submit a test email
   - Check your inbox (admin@stacka.xyz)

4. **View All Submissions**
   - Login to web3forms.com
   - See all waitlist signups
   - Export to CSV anytime

**Example:**
```typescript
// app/waitlist/page.tsx - Line 20
access_key: "d1234567-89ab-cdef-0123-456789abcdef", // Your actual key
```

---

### Option 2: Tally.so (VISUAL FORM BUILDER)

**Why Tally?**
- ✅ FREE plan available
- ✅ Visual form builder
- ✅ Connects to Google Sheets
- ✅ Email notifications
- ✅ Analytics dashboard

**Setup Steps:**

1. **Create Account**
   - Go to https://tally.so
   - Sign up with admin@stacka.xyz
   - Create new form

2. **Build Form**
   - Add "Email" field
   - Customize thank you message
   - Copy the form URL

3. **Update Code**
   Replace the form submit code in `app/waitlist/page.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Redirect to Tally form
  window.location.href = `https://tally.so/r/YOUR-FORM-ID?email=${email}`;
};
```

---

### Option 3: Google Forms + Apps Script (FREE)

**Setup Steps:**

1. **Create Google Form**
   - Go to https://forms.google.com
   - Create new form with Email field
   - Get form URL

2. **Connect to Sheets**
   - Responses → Create Spreadsheet
   - All emails saved automatically

3. **Update Code**
   Similar to Tally, redirect to Google Form URL

---

### Option 4: EmailOctopus (EMAIL MARKETING)

**Why EmailOctopus?**
- ✅ 2,500 subscribers FREE
- ✅ Email campaign tools
- ✅ API access
- ✅ Landing page builder

**Setup Steps:**

1. Go to https://emailoctopus.com
2. Create free account
3. Create new list
4. Get API key from Settings
5. Use their API in `app/waitlist/page.tsx`

---

## Recommended: Web3Forms

I've already integrated **Web3Forms** in your code because it's:
- Simplest to set up
- No monthly fees
- Works immediately
- Perfect for waitlists

## After Setup

### Test Your Waitlist

1. **Build the project:**
   ```bash
   ./build-with-docker.sh
   ```

2. **Create upload package:**
   ```bash
   ./create-upload-package.sh
   ```

3. **Upload to hosting**
   - Upload the new ZIP
   - Extract in public_html

4. **Test:**
   - Visit https://stacka.xyz/waitlist
   - Enter test email
   - Check your inbox

### View Submissions

**Web3Forms Dashboard:**
- Login to https://web3forms.com
- View all submissions
- Export to CSV
- See submission timestamps

### Email Notification Setup

Web3Forms will send you an email for each signup automatically to admin@stacka.xyz

### Export Emails

When ready to email your waitlist:
1. Login to Web3Forms
2. Export submissions as CSV
3. Import to your email tool (Mailchimp, SendGrid, etc.)

---

## Alternative: Custom Backend (Advanced)

If you want more control, you can:
1. Create API endpoint in your backend
2. Store emails in your database
3. Send confirmation emails
4. More complex but more flexible

Let me know if you want this option!

---

## Current Code Location

All waitlist code is in:
- `/app/waitlist/page.tsx` - Standalone waitlist page
- `/app/page.tsx` - Waitlist section on homepage (line 197-247)

---

## Quick Start (TL;DR)

1. Go to https://web3forms.com
2. Get your free Access Key
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `app/waitlist/page.tsx` (line 20)
4. Build and deploy
5. Done! 🎉

---

## Support

If you need help:
- Web3Forms Docs: https://docs.web3forms.com
- Tally Docs: https://tally.so/help
- EmailOctopus Docs: https://emailoctopus.com/api-documentation

---

**Your waitlist is ready to collect emails!** Just add your Web3Forms key and deploy.
