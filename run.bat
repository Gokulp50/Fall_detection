@echo off
echo ========================================================
echo Cleaning up existing servers and background processes...
echo ========================================================

REM Kill process on port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    if not "%%a"=="0" (
        echo Killing PID %%a running on port 3000...
        taskkill /F /PID %%a 2>nul
    )
)

echo.
echo ========================================================
echo Starting the Next.js application...
echo ========================================================

cd edgecare-response

REM Open the website after a short delay to let the server start
start cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:3000"

call npm run dev

pause
