# CI Execution Notes

This workspace includes CI-safe shim scripts that may be executed by analyzers:

- ./gradlew (root)
- notes_app_frontend/gradlew
- notes_app_frontend/android/gradlew (placeholder)
- android/gradlew (root-level folder shim)
- gradle-check.sh (root)

These scripts are plain bash shims which no-op when native folders are absent in Expo managed workflow.

If your CI requires executable flags, ensure these files are marked executable:
- chmod +x ./gradlew
- chmod +x notes_app_frontend/gradlew
- chmod +x notes_app_frontend/android/gradlew
- chmod +x android/gradlew
- chmod +x gradle-check.sh
