# STACKA Production Deployment Guide

## Prerequisites

### 1. Upgrade Node.js to 20+

Your current Node.js version is 18.20.8, but Next.js 16 requires Node.js 20.9.0 or higher.

#### Option A: Using nvm (Recommended)
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.bashrc

# Install Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version  # Should show v20.x.x
```

#### Option B: Using apt (Ubuntu/Debian)
```bash
# Remove old Node.js
sudo apt-get remove nodejs

# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js 20
sudo apt-get install -y nodejs

# Verify
node --version  # Should show v20.x.x
```

## Building for Production

### Quick Build (Automated)

We've created a build script for you:

```bash
cd /home/emmanuel/Documents/work_projects/stacka-project/stacka

# Run the build script
./build-production.sh
```

This script will:
- Check Node.js version
- Install dependencies
- Build the Next.js app
- Copy everything to the `deploy` folder
- Prepare for production deployment

### Manual Build (Step by Step)

If you prefer to build manually:

```bash
cd /home/emmanuel/Documents/work_projects/stacka-project/stacka

# 1. Install dependencies
npm install

# 2. Build the application
npm run build

# 3. Copy build to deploy folder
rm -rf deploy/.next
cp -r .next deploy/.next

# 4. Copy necessary files
cp next.config.ts deploy/
cp package.json deploy/
cp package-lock.json deploy/
cp -r public deploy/
cp .env.production deploy/ 2>/dev/null || true
```

## Running in Production

### Local Production Test

Test your production build locally before deploying:

```bash
cd deploy

# Install production dependencies
npm install --production

# Start the production server
PORT=3000 npm start

# Or use the start script
./start.sh
```

Visit http://localhost:3000 to test your production build.

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

Vercel is the easiest way to deploy Next.js apps:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd /home/emmanuel/Documents/work_projects/stacka-project/stacka
   vercel --prod
   ```

3. **Set Environment Variables:**
   - Go to Vercel dashboard
   - Add `NEXT_PUBLIC_API_URL` with your backend URL

### Option 2: Render

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Production ready build"
   git push origin main
   ```

2. **Create New Web Service on Render:**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** stacka-web
     - **Environment:** Node
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`
     - **Node Version:** 20

3. **Add Environment Variables:**
   - `NEXT_PUBLIC_API_URL` = Your backend URL
   - `NODE_VERSION` = 20

### Option 3: Self-Hosted (VPS/Server)

1. **Upload the `deploy` folder to your server**

2. **On your server:**
   ```bash
   # Install Node.js 20
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2 for process management
   sudo npm install -g pm2

   # Navigate to your app
   cd /path/to/deploy

   # Install dependencies
   npm install --production

   # Start with PM2
   pm2 start npm --name "stacka-web" -- start
   pm2 save
   pm2 startup
   ```

3. **Setup Nginx (Optional but recommended):**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 4: Docker

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:20-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm ci --production

   COPY .next ./.next
   COPY public ./public
   COPY next.config.ts ./

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. **Build and run:**
   ```bash
   docker build -t stacka-web .
   docker run -p 3000:3000 stacka-web
   ```

## Environment Variables

Make sure these are set in production:

```env
# Required
NEXT_PUBLIC_API_URL=https://your-backend-url.com

# Optional (if using analytics, etc.)
NEXT_PUBLIC_GOOGLE_ANALYTICS=GA-XXXXXXXXX
```

## Post-Deployment Checklist

- [ ] Node.js 20+ installed
- [ ] Production build completed successfully
- [ ] Environment variables configured
- [ ] Backend API URL is correct
- [ ] Test all pages load correctly
- [ ] Test authentication flow
- [ ] Test API connections
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate (if applicable)
- [ ] Setup monitoring/error tracking

## Troubleshooting

### Build fails with Node.js version error
```bash
# Upgrade Node.js to 20+
nvm install 20 && nvm use 20
```

### "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Pages not updating after deployment
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

### API connection fails
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify backend is running and accessible
- Check CORS settings on backend

## Continuous Deployment

For automatic deployments on git push:

### Using Render
- Render automatically deploys on push to main branch
- Configure in Render dashboard

### Using GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Support

If you encounter issues:
1. Check the logs: `pm2 logs stacka-web` (if using PM2)
2. Verify environment variables are set correctly
3. Check that backend API is accessible
4. Review browser console for client-side errors

## Next Steps

1. **Upgrade Node.js** to version 20+
2. **Run build script**: `./build-production.sh`
3. **Test locally**: `cd deploy && ./start.sh`
4. **Deploy** to your chosen platform
5. **Monitor** your production application

---

Your STACKA web app is now ready for production! 🚀
