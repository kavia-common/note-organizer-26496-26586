#!/usr/bin/env bash
# Root-level CI-safe Gradle wrapper shim (exact ./gradlew path).
# Some analyzers unconditionally run ./gradlew from the workspace root.
# In an Expo managed project, native folders are absent until `expo prebuild`.
set -euo pipefail

# Delegate to any existing real wrapper if present
if [ -f "notes_app_frontend/android/gradlew" ]; then
  exec bash "notes_app_frontend/android/gradlew" "$@"
fi
if [ -f "android/gradlew" ]; then
  exec bash "android/gradlew" "$@"
fi

echo "CI-safe shim: No Gradle wrapper found. Expo managed workflow detected. Skipping native gradle execution."
echo "To generate native projects, run from notes_app_frontend/: npm run build-native-android"
exit 0
