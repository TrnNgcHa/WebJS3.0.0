@echo off
echo 🔐 Setting up Authentication System...
echo.

echo 📦 Setting up backend...
cd server

echo Creating .env file from template...
if not exist .env (
  copy .env.example .env
  echo ✅ .env file created. Please update JWT_SECRET and database credentials.
) else (
  echo ⚠️  .env file already exists, skipping.
)

echo.
echo 🗄️  Ready to run migrations...
echo Please run: node src/migrations/run.js
echo.

echo ✅ Authentication system setup complete!
echo.
echo 📋 Next steps:
echo 1. Update server\.env with your JWT_SECRET and database credentials
echo 2. Run: cd server ^&^& npm install ^&^& npm run dev
echo 3. In another terminal: cd web ^&^& npm install ^&^& npm run dev
echo.
echo 🔗 API Endpoints:
echo    POST   /api/auth/register
echo    POST   /api/auth/login
echo    GET    /api/auth/profile (protected)
echo    POST   /api/auth/logout
echo.
echo 📖 See AUTH_SETUP.md for detailed documentation
echo.
pause
