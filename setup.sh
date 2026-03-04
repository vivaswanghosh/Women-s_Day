#!/bin/bash

# CraftLens AI Setup Script
# This script automates the setup process for both backend and frontend

echo "🎨 CraftLens AI - Smart Visual Pricing Marketplace"
echo "=================================================="
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file - Please update with your configuration"
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend
npm install
echo "✅ Frontend dependencies installed"

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start developing:"
echo ""
echo "1. Terminal 1 - Start Backend:"
echo "   cd backend && npm run dev"
echo ""
echo "2. Terminal 2 - Start Frontend:"
echo "   cd frontend && npm start"
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Happy coding! 🚀"
