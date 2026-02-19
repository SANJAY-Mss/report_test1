@echo off
setlocal
title ReportGuard Setup
echo ===========================================
echo   ReportGuard Setup and Run Script
echo ===========================================
echo.

:: 1. Check if Node.js is available via WHERE command
where node >nul 2>nul
if %errorlevel% equ 0 goto :node_found

:: 2. Check Paths directly without code blocks to avoid parenthesis errors
if exist "C:\Program Files\nodejs\node.exe" goto :found_pf
if exist "C:\Program Files (x86)\nodejs\node.exe" goto :found_x86

:: If nothing works
color 4f
echo [ERROR] Node.js is NOT found!
echo Please install or reinstall from nodejs.org
pause
exit /b

:found_pf
echo [OK] Found Node.js at: C:\Program Files\nodejs
set "PATH=%PATH%;C:\Program Files\nodejs"
goto :node_found

:found_x86
echo [OK] Found Node.js at: C:\Program Files (x86)\nodejs
set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
goto :node_found

:node_found
echo [OK] Node.js version detected:
node -v
echo.

:: ----------------------------------
:: Install Dependencies
:: ----------------------------------
echo [1/3] Installing dependencies...
call npm install
if %errorlevel% neq 0 goto :install_error

:: ----------------------------------
:: Generate Database Client
:: ----------------------------------
echo [2/3] Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 goto :prisma_error

:: ----------------------------------
:: Start Server
:: ----------------------------------
echo [3/3] Starting ReportGuard Server...
echo.
echo ===========================================
echo   Open your browser to: http://localhost:3000
echo ===========================================
echo.
call npm run dev
pause
exit /b

:install_error
color 4f
echo [ERROR] npm install failed.
echo Please check your internet connection and try again.
pause
exit /b

:prisma_error
color 4f
echo [ERROR] Prisma generation failed.
pause
exit /b
