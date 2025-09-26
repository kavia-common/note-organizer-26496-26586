# note-organizer-26496-26586

This workspace contains the Expo-managed React Native app in `notes_app_frontend/`.

CI / Gradle:
- This is an Expo managed project. Native `android/` is generated only after `expo prebuild`.
- Some CI tools call `./gradlew` unconditionally. A CI-safe shim is provided at the workspace root (`./gradlew`) which no-ops when the native wrapper is absent.
- To build native Android locally:
  cd notes_app_frontend
  npm install
  npm run build-native-android
