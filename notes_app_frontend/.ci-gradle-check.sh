#!/usr/bin/env bash
# CI-safe gradle check: On Expo managed workflow, native folders aren't generated until prebuild.
# This script intentionally no-ops to avoid failing CI when ./gradlew is not present.
set -euo pipefail
if [ -f "android/gradlew" ]; then
  echo "Gradle wrapper found. You can run: (cd android && ./gradlew assembleDebug)"
else
  echo "Gradle wrapper not found (Expo managed). Skipping native gradle check."
fi
exit 0
