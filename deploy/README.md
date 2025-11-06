# Stacka Frontend Deployment Package

## Hostinger Node.js Deployment

### Option 1: Upload via File Manager

1. **Login to Hostinger Control Panel**
2. **Go to**: Advanced → Node.js Application Manager
3. **Create New Application**:
   - Application mode: Production
   - Node.js version: 18.x or higher
   - Application root: `/domains/yourdomain.com/public_html`
   - Application URL: Your domain
   - Application startup file: `.next/standalone/server.js` OR use `start.sh`

4. **Upload Files**:
   - Go to File Manager
   - Navigate to your domain's directory
   - Upload ALL files from this deploy folder
   - Or upload the zip file and extract it

5. **Install Dependencies**:
   - In Node.js App Manager, click "Run npm install"
   - Or SSH: `npm install --production`

6. **Start Application**:
   - Click "Start Application" or run `./start.sh`
   - Application will be available at your domain

### Option 2: FTP Upload

```bash
# Install lftp
sudo apt-get install lftp

# Upload using FTP
lftp -u username,password ftp.yourdomain.com
cd public_html
mirror -R deploy/ ./
quit
```

### Option 3: SSH Deployment (if available)

```bash
# SSH into Hostinger
ssh username@yourdomain.com

# Navigate to your web directory
cd public_html

# Extract the uploaded zip file
unzip stacka-frontend-*.zip

# Install dependencies
npm install --production

# Start the application
npm start
```

## Environment Variables

Make sure to set these in Hostinger's Node.js App settings:

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NODE_ENV=production
PORT=3000
```

## Troubleshooting

- **Port conflicts**: Change PORT in environment variables
- **Build errors**: Check Node.js version (requires 18+)
- **Connection issues**: Verify NEXT_PUBLIC_API_URL is correct
- **Missing dependencies**: Run `npm install` again

## Support

For issues, check:
- Hostinger Node.js documentation
- Next.js deployment guide
- Application logs in Hostinger panel
