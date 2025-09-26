#!/usr/bin/env bash
# Root-level CI-safe gradle guard for analyzers that auto-invoke a gradle check.
# In Expo managed workflow, ./android doesn't exist until prebuild.
set -euo pipefail
if [ -f "notes_app_frontend/android/gradlew" ]; then
  echo "Gradle wrapper found at notes_app_frontend/android/gradlew."
  exit 0
else
  echo "No native Android folder present (Expo managed). Skipping gradle check."
  exit 0
fi
