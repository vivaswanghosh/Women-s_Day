@echo off
REM CraftLens AI Setup Script for Windows
REM This script automates the setup process for both backend and frontend

echo.
echo ================================================
echo 🎨 CraftLens AI - Smart Visual Pricing Marketplace
echo ================================================
echo.

REM Check Node.js installation
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js version: %NODE_VERSION%
echo ✅ npm version: %NPM_VERSION%
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend
call npm install
echo ✅ Backend dependencies installed

REM Create .env file if it doesn't exist
if not exist .env (
    echo.
    echo Copying .env.example to .env...
    copy .env.example .env
    echo ✅ Created .env file - Please update with your configuration
)

cd ..

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd frontend
call npm install
echo ✅ Frontend dependencies installed

cd ..

echo.
echo 🎉 Setup complete!
echo.
echo To start developing:
echo.
echo 1. Terminal 1 - Start Backend:
echo    cd backend ^&^& npm run dev
echo.
echo 2. Terminal 2 - Start Frontend:
echo    cd frontend ^&^ npm start
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Happy coding! 🚀
echo.
pause
