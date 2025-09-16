# Homemade Food Web Deployment Script for Windows

Write-Host "🍽️ Building Homemade Food Web App..." -ForegroundColor Green

# Set environment to production
$env:NODE_ENV = "production"

# Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
if (Test-Path "dist") { Remove-Item -Recurse -Force dist }
if (Test-Path ".expo") { Remove-Item -Recurse -Force .expo }

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}

# Run build
Write-Host "🔨 Building for web..." -ForegroundColor Yellow
npm run build:web

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    
    # Copy additional files
    Write-Host "📋 Copying additional files..." -ForegroundColor Yellow
    
    if (Test-Path "web\manifest.json") {
        Copy-Item "web\manifest.json" "dist\" -ErrorAction SilentlyContinue
    }
    
    if (Test-Path "web\sw.js") {
        Copy-Item "web\sw.js" "dist\" -ErrorAction SilentlyContinue
    }
    
    if (Test-Path "web\index.html") {
        Copy-Item "web\index.html" "dist\" -ErrorAction SilentlyContinue
    }
    
    # Create _headers file for Netlify
    $headers = @"
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
"@
    
    $headers | Out-File -FilePath "dist\_headers" -Encoding UTF8
    
    # Create _redirects file for SPA routing
    "/*    /index.html   200" | Out-File -FilePath "dist\_redirects" -Encoding UTF8
    
    # Build summary
    $distSize = if (Test-Path "dist") { 
        $size = (Get-ChildItem -Recurse "dist" | Measure-Object -Property Length -Sum).Sum
        [math]::Round($size / 1MB, 2)
    } else { 0 }
    
    $fileCount = if (Test-Path "dist") { 
        (Get-ChildItem -Recurse "dist" -File).Count 
    } else { 0 }
    
    Write-Host ""
    Write-Host "📊 Build summary:" -ForegroundColor Cyan
    Write-Host "   📁 Output directory: dist\" -ForegroundColor White
    Write-Host "   📦 Total size: $distSize MB" -ForegroundColor White
    Write-Host "   📄 Files: $fileCount" -ForegroundColor White
    
    Write-Host ""
    Write-Host "🚀 Ready to deploy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Deployment options:" -ForegroundColor Cyan
    Write-Host "   1. Netlify: Drag & drop the 'dist' folder to netlify.com/drop" -ForegroundColor White
    Write-Host "   2. Vercel: Run 'npx vercel --prod dist\'" -ForegroundColor White
    Write-Host "   3. GitHub Pages: Push dist\ to gh-pages branch" -ForegroundColor White
    Write-Host "   4. Custom server: Upload dist\ contents to your web server" -ForegroundColor White
    Write-Host ""
    Write-Host "🔗 Don't forget to:" -ForegroundColor Yellow
    Write-Host "   - Update your Supabase project settings with the new domain" -ForegroundColor White
    Write-Host "   - Add the domain to your Supabase Auth redirect URLs" -ForegroundColor White
    Write-Host "   - Test all functionality after deployment" -ForegroundColor White
    
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}