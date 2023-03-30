@echo off
setlocal

set basePathOld=http://localhost
set basePathNew=https://localhost:44301

for /r %%i in (*.ts) do (
    call :processFile "%%i"
)

goto :eof

:processFile
setlocal
set file=%1
echo Processing file: %file%

:: Replace the old base path with the new one and set encoding to UTF8
powershell -Command "(gc \"%file%\") -replace '%basePathOld%', '%basePathNew%' | Set-Content -Encoding UTF8 \"%file%\""

goto :eof