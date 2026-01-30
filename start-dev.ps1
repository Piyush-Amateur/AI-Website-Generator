# Smart Genesis - Development Startup Script

Write-Host "🚀 Starting Smart Genesis..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js version: $(node --version)" -ForegroundColor Green
Write-Host ""

# Start backend server
Write-Host "📦 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\AI Website Builder OpenAI\server'; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend server
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\AI Website Builder OpenAI'; npm run dev"

Write-Host ""
Write-Host "✨ Smart Genesis is starting up!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "📍 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window (servers will keep running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
