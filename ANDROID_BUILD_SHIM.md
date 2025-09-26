This repository uses Expo managed workflow. Native Android folders do not exist until you run `expo prebuild`.

To prevent CI tools from failing when they unconditionally invoke Gradle, we provide CI-safe shim scripts:

- ./gradlew (root): delegates to notes_app_frontend/android/gradlew if available, otherwise no-ops.
- ./android/gradlew (root-level android/): delegates to notes_app_frontend/android/gradlew if available, otherwise no-ops.
- notes_app_frontend/android/gradlew: placeholder that no-ops until `expo prebuild` generates the real wrapper.

Local development:
- Run `npm start` inside notes_app_frontend to develop without native folders.

Generating native Android project:
- From notes_app_frontend: `npm run build-native-android` (runs `expo prebuild` then Gradle).
