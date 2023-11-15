@echo off
setlocal

:: Obtient le chemin du répertoire du script
set "script_dir=%~dp0"

:: Se déplace dans le répertoire du script
cd "%script_dir%"

echo Exécution de npm run build...
call npm run build

echo Exécution de npx cap copy...
call npx cap copy

echo Exécution de npx cap copy android...
call npx cap copy android

echo Exécution de npx cap open android...
call npx cap open android

endlocal
