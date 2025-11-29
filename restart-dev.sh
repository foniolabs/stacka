#!/bin/bash

echo "🔧 Fixing Next.js Turbopack Font Loading Issue..."
echo ""

# Kill existing dev server on port 3000
echo "1. Stopping existing dev server..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 2

# Navigate to frontend directory
cd /home/emmanuel/Documents/work_projects/stacka-project/stacka

# Start dev server without Turbopack
echo "2. Starting dev server (without Turbopack)..."
echo "   This may take 10-15 seconds on first load..."
echo ""
npm run dev &

# Wait a bit
sleep 5

echo ""
echo "✅ Dev server restarted!"
echo ""
echo "📝 What was fixed:"
echo "   - Disabled Turbopack in dev mode"
echo "   - Using stable Webpack bundler instead"
echo "   - Google Fonts (Outfit) should now load correctly"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend:  http://localhost:4000"
echo ""
echo "💡 Tip: If you still see the error:"
echo "   1. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)"
echo "   2. Clear browser cache"
echo "   3. Check browser console for any remaining errors"
echo ""
