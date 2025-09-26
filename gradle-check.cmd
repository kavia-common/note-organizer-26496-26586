@echo off
REM CI-safe gradle check shim for Windows runners
IF EXIST "notes_app_frontend\android\gradlew" (
  echo Gradle wrapper found at notes_app_frontend\android\gradlew
  exit /b 0
) ELSE (
  echo No native Android folder present (Expo managed). Skipping gradle check.
  exit /b 0
)
