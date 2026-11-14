# StudySync Launcher PowerShell Script
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Starting StudySync Full-Stack Tracker (localhost) " -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

Start-Process "http://localhost:3000"
Write-Host "Starting Node.js Backend Server at http://localhost:3000..." -ForegroundColor Yellow
node server.js
