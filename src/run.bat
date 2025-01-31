@echo off
title Selector de Modo

:menu
rem cls
echo Selecciona el modo:
echo.
echo 1. Modo Dev (npm run dev)
echo 2. Modo Prod (npm run start)
echo 3. Modo Test (npx mocha ./test/** -- exit)
echo.
echo 0. Salir
echo.
echo.

set /p opcion=Introduce el numero de opcion: 

if %opcion%==0 goto salir
if %opcion%==1 goto dev
if %opcion%==2 goto prod
if %opcion%==3 goto test

echo Opcion no valida. Intentalo de nuevo.
pause
goto menu

:dev
cls
echo Iniciando Modo Dev...
npm run dev
if errorlevel 1 (
    echo Error al ejecutar npm run dev.
    pause
)
goto menu

:prod
cls
echo Iniciando Modo Prod...
npm run start
if errorlevel 1 (
    echo Error al ejecutar npm run start.
    pause
)
goto menu

:test
rem cls
echo Iniciando Modo Test...
echo npx mocha ./test/** -- exit
npm test
if errorlevel 1 (
    echo Error al ejecutar npx mocha ./test/** -- exit
)
goto salir

:salir
echo cls
echo Saliendo...
exit