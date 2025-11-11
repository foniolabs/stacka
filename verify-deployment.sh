#!/bin/bash
# Verify STACKA deployment on stacka.xyz

echo "🔍 Verifying STACKA Deployment"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_url() {
    local url=$1
    local description=$2
    local expected=$3

    echo -n "Checking $description... "

    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")

    if [ "$status" = "$expected" ]; then
        echo -e "${GREEN}✓ $status${NC}"
        return 0
    else
        echo -e "${RED}✗ $status (expected $expected)${NC}"
        return 1
    fi
}

# Check critical pages
echo "📄 Checking HTML files:"
check_url "https://stacka.xyz/" "Homepage" "200"
check_url "https://stacka.xyz/about.html" "About page" "200"
check_url "https://stacka.xyz/features.html" "Features page" "200"
check_url "https://stacka.xyz/whitepaper.html" "Whitepaper" "200"
check_url "https://stacka.xyz/how-it-works.html" "How it works" "200"

echo ""
echo "🔧 Checking client-side routing:"
check_url "https://stacka.xyz/about" "About (clean URL)" "301"
check_url "https://stacka.xyz/features" "Features (clean URL)" "301"
check_url "https://stacka.xyz/whitepaper" "Whitepaper (clean URL)" "301"

echo ""
echo "📦 Checking static assets:"
check_url "https://stacka.xyz/_next/static/chunks/3a22926206fea3f4.js" "Next.js chunks" "200"
check_url "https://stacka.xyz/stacka-logo.svg" "Logo SVG" "200"
check_url "https://stacka.xyz/favicon.ico" "Favicon" "200"

echo ""
echo "================================"
echo ""

# Check if whitepaper.html exists
echo "🎯 Key Issue Check:"
status=$(curl -s -o /dev/null -w "%{http_code}" "https://stacka.xyz/whitepaper.html")

if [ "$status" = "200" ]; then
    echo -e "${GREEN}✅ whitepaper.html is uploaded and accessible!${NC}"
    echo ""
    echo "Your site should work at:"
    echo "  - https://stacka.xyz/whitepaper.html (direct)"
    echo "  - https://stacka.xyz/whitepaper (if .htaccess is working)"
else
    echo -e "${RED}❌ whitepaper.html is NOT on the server (status: $status)${NC}"
    echo ""
    echo "Solution:"
    echo "  1. Upload stacka-upload-20251111_125800.zip to your hosting"
    echo "  2. Extract it in public_html (replace all files)"
    echo "  3. Run this script again to verify"
fi

echo ""
