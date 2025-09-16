#!/bin/bash

# Homemade Food Web Deployment Script

echo "🍽️ Building Homemade Food Web App..."

# Set environment to production
export NODE_ENV=production

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf .expo/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run build
echo "🔨 Building for web..."
npm run build:web

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Copy additional files
    echo "📋 Copying additional files..."
    cp web/manifest.json dist/ 2>/dev/null || true
    cp web/sw.js dist/ 2>/dev/null || true
    cp web/index.html dist/ 2>/dev/null || true
    
    # Create _headers file for Netlify (if needed)
    cat > dist/_headers << EOF
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=31536000, immutable

/sw.js
  Cache-Control: public, max-age=0, must-revalidate

/manifest.json
  Cache-Control: public, max-age=31536000, immutable
EOF

    # Create _redirects file for SPA routing
    cat > dist/_redirects << EOF
/*    /index.html   200
EOF
    
    echo "📊 Build summary:"
    echo "   📁 Output directory: dist/"
    echo "   📦 Total size: $(du -sh dist/ | cut -f1)"
    echo "   📄 Files: $(find dist/ -type f | wc -l)"
    
    echo ""
    echo "🚀 Ready to deploy!"
    echo ""
    echo "📋 Deployment options:"
    echo "   1. Netlify: Drag & drop the 'dist' folder to netlify.com/drop"
    echo "   2. Vercel: Run 'npx vercel --prod dist/'"
    echo "   3. GitHub Pages: Push dist/ to gh-pages branch"
    echo "   4. Custom server: Upload dist/ contents to your web server"
    echo ""
    echo "🔗 Don't forget to:"
    echo "   - Update your Supabase project settings with the new domain"
    echo "   - Add the domain to your Supabase Auth redirect URLs"
    echo "   - Test all functionality after deployment"
    
else
    echo "❌ Build failed!"
    exit 1
fi