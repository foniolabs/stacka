#!/bin/bash
# STACKA Static Build Script for File Manager Upload

set -e

echo "🚀 Building STACKA Static Site"
echo "==============================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the stacka directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building static site..."
npm run build

echo ""
if [ -d "out" ]; then
    echo "✅ Build complete! Static files are in the 'out' folder"
    echo ""
    echo "📊 Build contents:"
    ls -lh out/ | head -20
    echo ""
    echo "📦 Total size:"
    du -sh out/
    echo ""
    echo "📤 To upload to your hosting:"
    echo "   1. Zip the out folder: zip -r stacka-static.zip out/"
    echo "   2. Upload stacka-static.zip to your hosting file manager"
    echo "   3. Extract in your public_html or web root directory"
    echo ""
    echo "   Or upload the 'out' folder contents directly to your web root"
else
    echo "❌ Error: 'out' folder not created. Build may have failed."
    exit 1
fi
