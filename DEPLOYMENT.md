# 🌐 Web Deployment Guide

This guide explains how to build and deploy the Homemade Food app to various web hosting platforms.

## 🔧 Build Commands

### Quick Build
```bash
npm run build:web
```

### Build with Preview
```bash
npm run preview
```

### Full Deployment Script
```bash
# Windows
npm run deploy:script

# Linux/Mac
chmod +x scripts/deploy-web.sh
./scripts/deploy-web.sh
```

## 🚀 Deployment Options

### 1. Netlify (Recommended)

#### Option A: Drag & Drop
1. Run `npm run build:web`
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag the `dist` folder to the page
4. Your site will be live instantly!

#### Option B: Netlify CLI
```bash
npm install -g netlify-cli
npm run deploy:netlify
```

#### Option C: Git Integration
1. Push your code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build:web`
4. Set publish directory: `dist`
5. Auto-deploy on every push!

### 2. Vercel

#### Quick Deploy
```bash
npm install -g vercel
npm run deploy:vercel
```

#### Git Integration
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Vercel auto-detects Expo settings
4. Deploy automatically!

### 3. GitHub Pages

```bash
# Build the app
npm run build:web

# Install gh-pages
npm install -g gh-pages

# Deploy to GitHub Pages
npx gh-pages -d dist

# Or add to package.json:
# "deploy:github": "npm run build:web && gh-pages -d dist"
```

### 4. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and init
firebase login
firebase init hosting

# Set public directory to: dist
# Configure as SPA: Yes
# Build command: npm run build:web

# Deploy
npm run build:web
firebase deploy
```

### 5. AWS S3 + CloudFront

```bash
# Build
npm run build:web

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## ⚙️ Configuration for Production

### Environment Variables
Create `.env.production` file:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
EXPO_PUBLIC_APP_NAME=Homemade Food
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### Supabase Configuration
1. **Add your domain to Supabase Auth:**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your domain to "Site URL" and "Redirect URLs"
   - Example: `https://your-app.netlify.app`

2. **Update CORS settings:**
   - Add your domain to allowed origins
   - Enable credentials if needed

### Domain Setup
1. **Custom Domain (Netlify):**
   - Go to Domain settings in Netlify
   - Add custom domain
   - Configure DNS records

2. **Custom Domain (Vercel):**
   - Go to Project settings
   - Add custom domain
   - Configure DNS records

## 🔍 Testing Deployment

### Local Testing
```bash
# Test production build locally
npm run preview

# Test specific port
npx serve dist -p 3000
```

### Production Testing Checklist
- [ ] Authentication works (sign up/sign in)
- [ ] Language switching works
- [ ] RTL layout works for Arabic
- [ ] All routes accessible
- [ ] API calls work with production Supabase
- [ ] PWA features work (offline, install prompt)
- [ ] Mobile responsive design
- [ ] Performance is acceptable

## 🚨 Troubleshooting

### Common Issues

1. **404 on Refresh**
   - Solution: Ensure `_redirects` file exists in `dist/`
   - Content: `/*    /index.html   200`

2. **Auth Redirect Issues**
   - Check Supabase redirect URLs include your domain
   - Verify environment variables are correct

3. **Assets Not Loading**
   - Check if assets are in `dist/assets/` folder
   - Verify asset paths are relative

4. **Build Fails**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Clear Expo cache: `expo r -c`

### Performance Optimization

1. **Enable Gzip Compression**
   ```bash
   # Netlify (automatic)
   # Vercel (automatic)
   # Custom server: enable gzip in server config
   ```

2. **Add Caching Headers**
   - Files are already configured with proper cache headers
   - Static assets cached for 1 year
   - HTML and SW files not cached

3. **Bundle Analysis**
   ```bash
   # Analyze bundle size
   npx expo export -p web --dev
   # Check dist/ folder sizes
   ```

## 📊 Monitoring

### Analytics Setup
Add to your deployed app:
- Google Analytics
- Plausible Analytics
- Vercel Analytics (if using Vercel)

### Error Monitoring
- Sentry for error tracking
- LogRocket for session replay
- Custom error reporting to your backend

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build:web
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 🎉 Success!

Your Homemade Food app is now live on the web! 

**Next Steps:**
1. Share the URL with beta testers
2. Monitor performance and errors
3. Collect user feedback
4. Iterate and improve

**Need Help?**
- Check the troubleshooting section above
- Review hosting platform documentation
- Test locally first with `npm run preview`