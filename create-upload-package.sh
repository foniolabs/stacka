#!/bin/bash
# Create a complete upload package including .htaccess

set -e

echo "📦 Creating upload package for hosting..."
echo ""

# Check if out folder exists
if [ ! -d "out" ]; then
    echo "❌ Error: 'out' folder not found. Please build first:"
    echo "   ./build-with-docker.sh"
    echo "   or"
    echo "   ./build-static.sh"
    exit 1
fi

# Check if .htaccess exists in out
if [ ! -f "out/.htaccess" ]; then
    echo "⚠️  Warning: .htaccess not found in out folder"
    echo "   Copying from public/.htaccess..."
    cp public/.htaccess out/.htaccess
fi

# Create timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ZIP_NAME="stacka-upload-${TIMESTAMP}.zip"

echo "📦 Creating ZIP package..."
cd out

# Create zip with all files INCLUDING hidden files
zip -r "../${ZIP_NAME}" . -x "*.DS_Store"

cd ..

echo ""
echo "✅ Upload package created: ${ZIP_NAME}"
echo ""
echo "📊 Package contents:"
unzip -l "${ZIP_NAME}" | head -30
echo ""
echo "📦 Package size:"
ls -lh "${ZIP_NAME}"
echo ""
echo "🔍 Verifying .htaccess is included:"
if unzip -l "${ZIP_NAME}" | grep -q ".htaccess"; then
    echo "   ✅ .htaccess found in package"
else
    echo "   ❌ WARNING: .htaccess NOT in package!"
fi
echo ""
echo "📤 Upload Instructions:"
echo "   1. Upload ${ZIP_NAME} to your hosting File Manager"
echo "   2. Navigate to public_html (or www/htdocs)"
echo "   3. Extract the ZIP file"
echo "   4. Make sure .htaccess is visible (enable 'Show Hidden Files')"
echo "   5. Visit https://stacka.xyz to test"
echo ""
echo "⚠️  IMPORTANT: Make sure to extract in the web root, not in a subfolder!"
echo ""
