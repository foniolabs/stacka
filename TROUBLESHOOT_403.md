# Fix 403 Forbidden Error on Your Hosting

You're getting "403 Forbidden" because your server needs the `.htaccess` file to properly route requests.

## 🔍 The Problem

The `.htaccess` file is **hidden** (starts with `.`) and most file managers **don't upload hidden files by default**.

## ✅ Solution 1: Upload .htaccess Manually (RECOMMENDED)

### Step 1: Find the .htaccess file
The file is already in your `out` folder:
```
out/.htaccess
```

### Step 2: Upload it to your hosting

**Option A: File Manager**
1. Open your hosting's File Manager
2. Navigate to `public_html` (where you uploaded the files)
3. Look for an option to "Show Hidden Files" (usually in Settings/Preferences)
4. Upload the `.htaccess` file from your computer's `out/.htaccess`
5. Make sure it's named `.htaccess` (with the dot at the start)

**Option B: Create .htaccess directly in File Manager**
1. In File Manager, go to `public_html`
2. Click "New File"
3. Name it `.htaccess` (with the dot!)
4. Edit the file and paste this content:

```apache
# STACKA .htaccess for static hosting

# Enable rewrite engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite files or directories that exist
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l

  # Rewrite everything else to index.html for client-side routing
  RewriteRule . /index.html [L]
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-XSS-Protection "1; mode=block"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Disable directory browsing
Options -Indexes

# Custom error pages
ErrorDocument 404 /index.html
```

5. Save the file

### Step 3: Check file permissions
1. Right-click `.htaccess` in File Manager
2. Set permissions to `644` (rw-r--r--)

## ✅ Solution 2: Check File Permissions

If you uploaded everything but still get 403:

### Check HTML files permissions
All your HTML files should have permissions `644`:
- `index.html`
- `about.html`
- `features.html`
- `whitepaper.html`
- etc.

### Check directory permissions
All folders should have permissions `755`:
- `public_html`
- `_next`
- etc.

### How to fix permissions:
1. In File Manager, select all files
2. Right-click → Change Permissions
3. Set files to `644` and folders to `755`

## ✅ Solution 3: Upload via FTP with Hidden Files

If File Manager doesn't work:

```bash
# Using FTP client (FileZilla recommended)
# 1. Connect to your hosting FTP
# 2. In FileZilla: Server → Force showing hidden files
# 3. Upload the entire 'out' folder contents including .htaccess
```

## 🔍 Verify Upload Checklist

After uploading, check that these files exist in `public_html`:

```
✓ .htaccess          (MUST HAVE!)
✓ index.html
✓ about.html
✓ features.html
✓ whitepaper.html
✓ favicon.ico
✓ _next/             (folder with all JS/CSS)
✓ Stacka-cover.png
✓ stacka-logo.svg
```

## 🎯 Quick Test

After uploading `.htaccess`:

1. Visit: `https://stacka.xyz/`
   - Should show homepage ✓

2. Visit: `https://stacka.xyz/whitepaper`
   - Should show whitepaper (no 403) ✓

3. Visit: `https://stacka.xyz/about`
   - Should show about page ✓

## ⚠️ Still Getting 403?

If the error persists after uploading `.htaccess`:

### Check Apache mod_rewrite
Your hosting must have `mod_rewrite` enabled. Contact your hosting support:

> "Hi, I'm getting 403 errors. Can you please enable mod_rewrite for my account? I have a .htaccess file that needs it."

### Check .htaccess is being read
Create a simple test `.htaccess`:

```apache
# Test file
RewriteEngine On
```

If you get a 500 error instead of 403, your `.htaccess` is being read but has syntax issues.

If you still get 403, your server might not allow `.htaccess` files. Ask your hosting:

> "Hi, my .htaccess file isn't being read. Can you check if AllowOverride is enabled?"

## 📧 Contact Support Template

If nothing works, contact your hosting with this:

```
Subject: 403 Forbidden Error - Need mod_rewrite and AllowOverride

Hi,

I'm hosting a Next.js static site at stacka.xyz and getting "403 Forbidden" errors.

I need:
1. mod_rewrite module enabled
2. AllowOverride All enabled in my virtual host config
3. .htaccess files allowed in public_html

Can you help enable these?

Thanks!
```

---

## 📝 Notes

- **The .htaccess file is CRITICAL** - Without it, client-side routing won't work
- **Hidden files** starting with `.` need special handling when uploading
- **Most hosting providers** support .htaccess by default
- **If using Nginx** instead of Apache, you need a different config (see main docs)
