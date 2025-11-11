#!/bin/bash
# STACKA Production Build Script

set -e  # Exit on any error

echo "🚀 Building STACKA for Production"
echo "=================================="

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Error: Node.js 20+ is required. Current version: $(node --version)"
    echo ""
    echo "Please upgrade Node.js first:"
    echo "  nvm install 20 && nvm use 20"
    echo "  OR"
    echo "  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
    echo "  sudo apt-get install -y nodejs"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building Next.js application..."
npm run build

# Copy build to deploy folder
echo "📋 Copying build to deploy folder..."
rm -rf deploy/.next
cp -r .next deploy/.next

# Copy necessary files
echo "📄 Copying configuration files..."
cp next.config.ts deploy/
cp package.json deploy/
cp package-lock.json deploy/
cp -r public deploy/ 2>/dev/null || true

# Copy environment file if it exists
if [ -f .env.production ]; then
    cp .env.production deploy/
    echo "✅ Environment file copied"
fi

echo ""
echo "✅ Production build complete!"
echo ""
echo "📦 Deployment files are in: ./deploy"
echo ""
echo "To start production server:"
echo "  cd deploy"
echo "  ./start.sh"
echo ""
echo "Or deploy the 'deploy' folder to your hosting platform."
