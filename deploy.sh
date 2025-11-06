#!/bin/bash

# Stacka Frontend Deployment Script
# This script builds and packages the frontend for Hostinger deployment

set -e  # Exit on any error

echo "🚀 Starting Stacka Frontend Deployment"
echo "======================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/home/emmanuel/Documents/work_projects/stacka-project/stacka"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DEPLOY_DIR="$PROJECT_DIR/deploy"
ZIP_FILE="stacka-frontend-${TIMESTAMP}.zip"

# Check if production API URL is set
if [ ! -f "$PROJECT_DIR/.env.production" ]; then
    echo -e "${RED}❌ Error: .env.production file not found!${NC}"
    echo "Please create .env.production with NEXT_PUBLIC_API_URL"
    echo ""
    echo "Example:"
    echo "  echo 'NEXT_PUBLIC_API_URL=https://your-backend.onrender.com' > .env.production"
    exit 1
fi

echo -e "${YELLOW}📋 Production environment:${NC}"
cat "$PROJECT_DIR/.env.production"
echo ""

# Navigate to project directory
cd "$PROJECT_DIR"

# Clean previous builds
echo -e "${YELLOW}🧹 Cleaning previous builds...${NC}"
rm -rf .next
rm -rf deploy
mkdir -p deploy

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Build the application
echo -e "${YELLOW}🔨 Building Next.js application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# Create deployment package
echo -e "${YELLOW}📦 Creating deployment package...${NC}"

# Copy necessary files to deploy directory
cp -r .next deploy/
cp -r public deploy/ 2>/dev/null || echo "No public folder"
cp package.json deploy/
cp package-lock.json deploy/ 2>/dev/null || echo "No package-lock.json"
cp next.config.ts deploy/
cp .env.production deploy/

# Create a startup script for Hostinger
cat > deploy/start.sh << 'EOF'
#!/bin/bash
# Stacka Frontend Startup Script

# Install production dependencies only
npm install --production

# Start the Next.js server
PORT=3000 npm start
EOF

chmod +x deploy/start.sh

# Create README for deployment
cat > deploy/README.md << 'EOF'
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
EOF

# Create zip file
echo -e "${YELLOW}🗜️  Creating zip file...${NC}"
cd deploy
zip -r "../${ZIP_FILE}" . -x "*.git*" -x "*node_modules*"
cd ..

# Get file size
FILE_SIZE=$(du -h "${ZIP_FILE}" | cut -f1)

echo ""
echo -e "${GREEN}✅ Deployment package created successfully!${NC}"
echo ""
echo "📦 Package details:"
echo "  - Zip file: ${ZIP_FILE}"
echo "  - Size: ${FILE_SIZE}"
echo "  - Location: ${PROJECT_DIR}/${ZIP_FILE}"
echo ""
echo "📁 Unzipped files also available in: ${PROJECT_DIR}/deploy"
echo ""
echo -e "${YELLOW}📤 Next steps:${NC}"
echo "  1. Upload ${ZIP_FILE} to Hostinger File Manager"
echo "  2. Extract in your domain's public_html directory"
echo "  3. Set up Node.js application in Hostinger panel"
echo "  4. Run 'npm install --production'"
echo "  5. Start the application"
echo ""
echo -e "${GREEN}🎉 Ready for deployment!${NC}"
