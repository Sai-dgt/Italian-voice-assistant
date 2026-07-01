@echo off
set /p msg="Commit message: "

echo.
echo === Committing to master ===
git add -A
git commit -m "%msg%"
if errorlevel 1 (echo Commit failed & pause & exit /b 1)

git push origin master
if errorlevel 1 (echo Push to GitHub failed & pause & exit /b 1)

echo.
echo === Deploying to HF ===
git branch -D space-deploy 2>nul
git checkout --orphan space-deploy
git add -A
git commit -m "Deploy snapshot"
git push space space-deploy:main --force
if errorlevel 1 (echo Push to HF failed & pause & exit /b 1)

git checkout master
git branch -D space-deploy

echo.
echo === Done ===
pause
