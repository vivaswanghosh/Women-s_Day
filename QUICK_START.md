# CraftLens AI - Quick Start Guide

## 🚀 Super Fast Setup (5 minutes)

### Prerequisites
- Node.js 16+ installed
- MongoDB running locally (or MongoDB Atlas account)

### Option 1: Using npm (Windows/Mac/Linux)

```bash
# 1. Install all dependencies
npm run install:all

# 2. Setup environment variables
cd backend
cp .env.example .env
# Edit .env and add your config

# 3. Start backend
npm run dev

# In another terminal:
# 4. Start frontend
cd frontend
npm start

# Done! Open http://localhost:3000
```

### Option 2: Using Docker (Recommended)

```bash
# 1. Start everything
npm run docker:up

# Wait 30 seconds for services to start

# 2. Check logs
npm run docker:logs

# Done! Open http://localhost:3000
```

### Option 3: Running Setup Script

```bash
# Windows
setup.bat

# Mac/Linux
bash setup.sh

# Follow the prompts
```

---

## 📝 First Steps After Setup

1. **Create an Account**
   - Go to http://localhost:3000/register
   - Fill in your details
   - Click "Create Account"

2. **Upload Your First Product**
   - Click "Dashboard"
   - Upload a product image
   - Fill in product details
   - Get instant pricing!

3. **View Your Products**
   - Click "Products" to see all uploads
   - Edit prices anytime
   - View detailed analytics

4. **Check Analytics**
   - Click "Analytics"
   - See profit margins
   - Track pricing trends

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
# Local: mongod
# Atlas: Update MONGODB_URI in .env
```

### Dependency Issues
```bash
# Clear node_modules and reinstall
rm -rf backend/node_modules frontend/node_modules
npm run install:all
```

### CORS Errors
```bash
# Backend .env has wrong frontend URL
# Update FRONTEND_URL in backend/.env
```

---

## 📁 Project Structure

```
CraftLens AI/
├── backend/          # Node.js + Express API
├── frontend/         # React + Tailwind UI
├── docker-compose.yml
├── setup.sh / setup.bat
└── README.md
```

---

## 🔗 Useful Commands

```bash
# Development
npm run dev:backend         # Start backend dev server
npm run dev:frontend        # Start frontend dev server

# Production
npm run build:backend       # Build backend
npm run build:frontend      # Build frontend
npm run start:backend       # Start backend production
npm run start:frontend      # Start frontend production

# Docker
npm run docker:up          # Start all services
npm run docker:down        # Stop all services
npm run docker:logs        # View service logs
```

---

## 🔑 Key Features Ready to Use

✅ User Authentication (Register/Login)
✅ Product Upload with Images
✅ AI-Powered Pricing Suggestions
✅ Price Analytics Dashboard
✅ Product Management
✅ Profit Calculator
✅ Price Fairness Assessment

---

## 📚 Documentation to Read

1. [README.md](README.md) - Project overview
2. [USER_GUIDE.md](USER_GUIDE.md) - How to use the app
3. [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API endpoints
4. [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
5. [DEPLOYMENT.md](DEPLOYMENT.md) - How to deploy
6. [PITCH_GUIDE.md](PITCH_GUIDE.md) - For presentations

---

## 🚀 Next Steps

1. **Test the MVP**
   - Upload 5-10 products
   - Test pricing suggestions
   - Check analytics

2. **Customize**
   - Update branding (colors, logo)
   - Modify pricing algorithm
   - Add your features

3. **Deploy**
   - Choose deployment option
   - Follow DEPLOYMENT.md
   - Go live!

---

## 💬 Ask Questions

- Check the docs first
- Start with README.md
- Read ARCHITECTURE.md for technical details
- See USER_GUIDE.md for usage questions

---

**Happy coding! 🎨**
