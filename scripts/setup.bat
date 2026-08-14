@echo off
echo ========================================================
echo   EcoVision AI Workspace Bootstrap & Environment Setup
echo ========================================================

echo Setting up root dependencies...
call npm install

echo Creating directory structure placeholders...
if not exist frontend mkdir frontend
if not exist backend mkdir backend
if not exist ai-service mkdir ai-service
if not exist database mkdir database
if not exist docker mkdir docker
if not exist docs mkdir docs
if not exist shared mkdir shared
if not exist scripts mkdir scripts

echo Setup completed successfully!
