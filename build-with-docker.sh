#!/bin/bash
# Build STACKA using Docker (works with any Node version on your machine)

set -e

echo "🚀 Building STACKA with Docker"
echo "================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed."
    echo ""
    echo "Please install Docker first:"
    echo "  sudo apt-get update"
    echo "  sudo apt-get install docker.io"
    echo "  sudo systemctl start docker"
    echo "  sudo usermod -aG docker $USER"
    echo ""
    echo "Then log out and log back in."
    exit 1
fi

echo "📦 Building with Docker (this may take a few minutes)..."
docker build -f Dockerfile.build -t stacka-builder .

echo ""
echo "📤 Extracting build files..."
# Create a temporary container and copy the out folder
CONTAINER_ID=$(docker create stacka-builder)
docker cp $CONTAINER_ID:/app/out ./out
docker rm $CONTAINER_ID

echo ""
echo "✅ Build complete! Static files are in the 'out' folder"
echo ""
echo "📊 Build contents:"
ls -lh out/ | head -20
echo ""
echo "📦 Total size:"
du -sh out/
echo ""
echo "🎉 Ready to upload!"
echo ""
echo "📤 To upload to your hosting:"
echo "   Option 1 - Upload as ZIP:"
echo "     zip -r stacka-static.zip out/"
echo "     Upload stacka-static.zip to your file manager"
echo ""
echo "   Option 2 - Upload folder directly:"
echo "     Upload all files from the 'out' folder to your web root"
