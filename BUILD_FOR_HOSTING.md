# Build STACKA for File Manager Upload

This guide shows you how to create an `out` folder with static files to upload to your hosting's file manager.

## ✅ What I've Done

1. **Enabled static export** in `next.config.ts`
2. **Created build scripts** for different scenarios
3. **Your dynamic routes** already have `generateStaticParams()` - ready for static export!
4. **Fixed whitepaper page** - converted from client-side fetch to build-time import (fixes 403 error)

## 🚀 Choose Your Build Method

### Method 1: Build with Docker (EASIEST - Works with Any Node Version)

```bash
cd /home/emmanuel/Documents/work_projects/stacka-project/stacka

# Build using Docker
./build-with-docker.sh
```

**Why this method?**
- ✅ Works even with Node 18
- ✅ Uses Node 20 inside Docker container
- ✅ No need to upgrade your system Node.js

**Requirements:**
- Docker must be installed
- If not installed:
  ```bash
  sudo apt-get update
  sudo apt-get install docker.io
  sudo systemctl start docker
  sudo usermod -aG docker $USER
  # Log out and log back in
  ```

### Method 2: Upgrade Node.js First (RECOMMENDED)

```bash
# Upgrade to Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should show v20.x.x

# Then build
cd /home/emmanuel/Documents/work_projects/stacka-project/stacka
./build-static.sh
```

### Method 3: Manual Build (If Scripts Don't Work)

```bash
cd /home/emmanuel/Documents/work_projects/stacka-project/stacka

# Install dependencies
npm install

# Build (creates 'out' folder)
npm run build
```

## 📦 After Building

You'll have an `out` folder with all your static files:

```
out/
├── index.html
├── about.html
├── features.html
├── how-it-works.html
├── _next/
│   ├── static/
│   └── ...
└── ...
```

## 📤 Upload to Your Hosting

### Option A: Upload as ZIP (Recommended - Includes .htaccess)

```bash
# Create a complete upload package (includes .htaccess)
cd /home/emmanuel/Documents/work_projects/stacka-project/stacka
./create-upload-package.sh

# This creates: stacka-upload-TIMESTAMP.zip
# Now upload this ZIP to your hosting file manager
# Then extract it in your web root (public_html or www)
```

**IMPORTANT**: The `.htaccess` file is critical for routing to work properly!

### Option B: Upload Folder Directly

1. Open your hosting's File Manager
2. Navigate to your web root (`public_html`, `www`, or `htdocs`)
3. Upload all files from the `out` folder
4. Do NOT upload the `out` folder itself - upload its CONTENTS

### Option C: Upload via FTP

```bash
# Using FileZilla or any FTP client
# Connect to your hosting
# Navigate to web root
# Upload contents of 'out' folder
```

## 🔧 Configure Your Hosting

### For Apache (.htaccess)

Create `.htaccess` in your web root:

```apache
# Redirect all requests to index.html for client-side routing
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
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
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>
```

### For Nginx

Add to your nginx config:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

# Cache static assets
location ~* \.(jpg|jpeg|png|gif|webp|css|js|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Enable gzip
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

## 🔍 Troubleshooting

### "Node.js version error" during build

**Solution:** Use Method 1 (Docker) or upgrade Node.js to 20+

### "out folder not created"

**Check:**
1. Make sure `output: 'export'` is in `next.config.ts` ✅ (Already done)
2. Build completed without errors
3. Run: `ls -la out/` to verify

### "Pages return 404 after upload"

**Solution:** Add `.htaccess` file (see above) for proper routing

### "API calls fail"

**Check:**
1. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
2. Update `.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.com
   ```
3. Rebuild

### "Images don't load"

**Check:**
- All images are in the `public` folder
- Paths use `/` not `./` (e.g., `/logo.png` not `./logo.png`)

## 📝 Important Notes

1. **Environment Variables:**
   - Set `NEXT_PUBLIC_API_URL` before building
   - Create `.env.production` file with your production API URL

2. **Base Path:**
   - If deploying to a subdirectory (e.g., `/stacka`), add to `next.config.ts`:
     ```typescript
     basePath: '/stacka',
     ```

3. **HTTPS:**
   - Make sure your hosting has SSL enabled
   - Update API URL to use `https://`

4. **File Permissions:**
   - After upload, files should be readable (644 for files, 755 for directories)

## 🎯 Quick Reference

```bash
# Docker Method (Easiest)
./build-with-docker.sh

# Direct Method (Requires Node 20)
./build-static.sh

# Create ZIP for upload
zip -r stacka-static.zip out/

# Check build size
du -sh out/
```

## ✅ Checklist

Before uploading:
- [ ] Built successfully (out folder exists)
- [ ] Set NEXT_PUBLIC_API_URL in production
- [ ] Tested locally (optional)
- [ ] Created .htaccess or nginx config
- [ ] Backup existing site (if replacing)

After uploading:
- [ ] Visit your domain
- [ ] Test all pages (about, features, how-it-works)
- [ ] Test login/signup
- [ ] Check browser console for errors
- [ ] Test on mobile

---

Your STACKA site is ready to deploy! 🚀
