# Web3Forms Setup Guide for STACKA Waitlist

## Quick Setup (5 minutes)

### Step 1: Get Your Free Access Key

1. Go to https://web3forms.com
2. Click "Get Started Free"
3. Enter your email address: **admin@stacka.xyz**
4. Click "Create Access Key"
5. Check your email for the access key (looks like: `a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6`)

### Step 2: Add Access Key to Your Code

Open `stacka/app/waitlist/page.tsx` and find line 26:

```typescript
access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
```

Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key:

```typescript
access_key: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
```

### Step 3: Rebuild

```bash
cd stacka
./build-with-docker.sh
```

### Step 4: Test

1. Upload the new build to stacka.xyz
2. Visit https://stacka.xyz/waitlist
3. Submit a test email
4. Check your inbox (admin@stacka.xyz) for the waitlist signup notification

## How It Works

- When someone joins the waitlist, Web3Forms sends the email to **admin@stacka.xyz**
- You receive emails instantly
- All submissions are stored in your Web3Forms dashboard
- You can export to CSV anytime from the dashboard

## Features (Free Tier)

- ✅ 250 submissions/month
- ✅ Email notifications
- ✅ CSV export
- ✅ No backend required
- ✅ Spam protection included
- ✅ GDPR compliant

## Viewing Submissions

1. Login to https://web3forms.com
2. Go to your dashboard
3. View all waitlist signups
4. Export to CSV for import into email tools

## Email Format You'll Receive

```
From: STACKA Waitlist
Subject: New STACKA Waitlist Signup

Email: user@example.com
```

## Need More Submissions?

If you exceed 250/month:
- Upgrade to Pro ($5/month) for 1,000 submissions
- Or create multiple free access keys for different forms

## Troubleshooting

**Still getting 400 error?**
- Make sure you copied the full access key (no spaces)
- Check that you rebuilt after adding the key
- Verify the key is valid in your Web3Forms dashboard

**Not receiving emails?**
- Check spam folder
- Verify admin@stacka.xyz is the email registered with Web3Forms
- Login to Web3Forms dashboard to see if submissions are logged there
