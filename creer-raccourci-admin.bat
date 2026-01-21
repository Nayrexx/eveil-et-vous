@echo off
echo.
echo ========================================
echo   CREATION DU RACCOURCI ADMIN
echo ========================================
echo.

set "targetPath=%~dp0admin.html"
set "desktopPath=%USERPROFILE%\Desktop"
set "shortcutName=Administration Eveil et Vous.url"

echo [InternetShortcut] > "%desktopPath%\%shortcutName%"
echo URL=file:///%targetPath:\=/% >> "%desktopPath%\%shortcutName%"
echo IconIndex=0 >> "%desktopPath%\%shortcutName%"

echo.
echo ========================================
echo   SUCCES !
echo ========================================
echo.
echo Un raccourci a ete cree sur le Bureau :
echo "%shortcutName%"
echo.
echo Votre cliente peut maintenant double-cliquer
echo sur ce raccourci pour acceder a l'admin.
echo.
pause
