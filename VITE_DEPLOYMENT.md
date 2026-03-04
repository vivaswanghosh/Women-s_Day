# Vite Frontend Deployment Guide

## What is Vite?

**Vite** is a modern frontend build tool that:
- ⚡ Provides instant server start and lightning-fast HMR (Hot Module Replacement)
- 📦 Bundles production builds with Rollup for optimized output
- 🔧 Zero-config out of the box with sensible defaults
- 🎯 Supports JSX, TypeScript, CSS Modules natively
- 🚀 ~100x faster cold start than traditional bundlers

**Benefits over Create React App:**
- Vite: ~300ms dev server startup vs CRA: ~10+ seconds
- Better HMR update speed (< 100ms vs CRA: 1-2 seconds)
- Smaller bundle sizes
- Built-in optimization strategies

---

## Local Development

### 1. Setup
```bash
cd frontend
npm install
```

### 2. Start Dev Server
```bash
npm run dev
# or
npm start
```

The app will open at **http://localhost:3000** with hot module reloading.

### 3. Environment Variables
Create a `.env.local` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000
VITE_APP_ENV=development
```

---

## Production Build

### Build Optimization
```bash
npm run build
```

Output: `frontend/dist/` directory

**What happens:**
- Minification of JS, CSS, HTML
- Code splitting into vendor and app chunks
- Image optimization
- Tree-shaking of unused code
- Sourcemaps (disabled by default, enable in vite.config.js if needed)

### Preview Production Build Locally
```bash
npm run preview
```

Serves the `dist/` folder on http://localhost:4173

---

## Deployment Platforms

### 1. **Vercel** (Recommended for React)

#### Steps:
1. Push code to GitHub
2. Connect repository: https://vercel.com/new
3. Select "Other/Create React App"
4. Configure:
   - **Framework**: Set to "Create React App" (Vite support auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `VITE_API_URL`: Your backend API URL
   - `VITE_API_TIMEOUT`: 30000

6. Deploy! Auto-deploys on every git push

#### Example Vercel Config (vercel.json):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

### 2. **Netlify**

#### Steps:
1. Push code to GitHub/GitLab/Bitbucket
2. Connect: https://app.netlify.com/start
3. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

4. Set Environment Variables in Netlify UI:
   - `VITE_API_URL=https://your-api.herokuapp.com/api`

5. Deploy on git push

#### Example netlify.toml:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[dev]
  command = "npm run dev"
  port = 3000
```

---

### 3. **AWS S3 + CloudFront**

#### Steps:
1. Build locally:
   ```bash
   npm run build
   ```

2. Upload to S3:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. Configure S3 for static website hosting
4. Create CloudFront distribution pointing to S3
5. Update environment variables:
   ```bash
   VITE_API_URL=https://api.yourdomain.com/api
   ```

---

### 4. **Docker (Recommended for Full-Stack)**

#### Create docker/frontend.Dockerfile:
```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

#### Deploy with Docker Compose:
```bash
docker-compose up -d frontend
```

---

### 5. **Railway**

#### Steps:
1. Push to GitHub
2. Connect at: https://railway.app
3. Select "Deploy from GitHub"
4. Configure:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview`
   - **Publish Directory**: `dist`

5. Add environment variables in Railway dashboard
6. Deploy!

---

### 6. **Heroku**

Heroku deprecated free tier, but if you still have credits:

#### Create Procfile in frontend/:
```
web: npm run preview
```

#### Deploy:
```bash
heroku create your-app-name
git push heroku main
```

---

## Environment Configuration by Platform

### Development (.env.development)
```
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000
VITE_APP_ENV=development
VITE_ENABLE_ANALYTICS=false
```

### Staging (.env.staging)
```
VITE_API_URL=https://staging-api.yourdomain.com/api
VITE_API_TIMEOUT=30000
VITE_APP_ENV=staging
VITE_ENABLE_ANALYTICS=true
```

### Production (.env.production)
```
VITE_API_URL=https://api.yourdomain.com/api
VITE_API_TIMEOUT=30000
VITE_APP_ENV=production
VITE_ENABLE_ANALYTICS=true
```

---

## Performance Optimization

### 1. Code Splitting
Vite automatically creates vendor bundles:
- `index-xxx.js` - App code
- `vendor-xxx.js` - React, Router, Axios, etc.

### 2. Lazy Loading Routes
```javascript
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  )
}
```

### 3. Image Optimization
```javascript
// Images are automatically optimized
import logo from './logo.png'

// For WebP conversion, use ?url
import webpImage from './image.png?url'
```

### 4. CSS Optimization
- Unused CSS is automatically purged
- Tailwind CSS handles most optimization
- CSS modules are supported

---

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3001
```

### Module Not Found Errors
- Check import paths are relative: `./components/Button`
- For node_modules: `import axios from 'axios'`
- Vite doesn't support `require()` - use ES6 imports

### API Requests Failing in Production
- Ensure `VITE_API_URL` environment variable is set
- Update your API client to use: `import.meta.env.VITE_API_URL`

### Build Output Too Large
Check `npm run build` output size:
```bash
npm run build
# Output: dist/index.html    0.38 kB
#         dist/index-<hash>.js  234.56 kB
```

Analyze with:
```bash
npm install --save-dev rollup-plugin-visualizer
```

---

## Quick Deployment Checklist

- [ ] Run `npm run build` locally and verify `dist/` folder
- [ ] Test with `npm run preview`
- [ ] Set environment variables on hosting platform
- [ ] Configure backend API URL (VITE_API_URL)
- [ ] Enable CORS on backend for your frontend domain
- [ ] Test API calls work from production URL
- [ ] Monitor performance with Lighthouse

---

## Comparision: Vite vs Create React App

| Feature | Vite | CRA |
|---------|------|-----|
| Dev Server Startup | ~300ms | ~10s |
| HMR Speed | <100ms | 1-2s |
| Build Time | ~5s | ~15s |
| Bundle Size | ~45KB | ~65KB |
| TypeScript Support | Native | Via react-scripts |
| Configuration | Minimal | Ejectable |
| ESM Support | Native | Limited |

---

## Next Steps

1. ✅ Local development: `npm run dev`
2. ✅ Build: `npm run build`
3. ✅ Deploy to Vercel/Netlify (easiest)
4. ✅ Monitor with error tracking (Sentry, LogRocket)
5. ✅ Setup CI/CD pipeline (GitHub Actions)

Vite is production-ready and used by thousands of projects! 🚀
