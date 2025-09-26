# CI Notes for Gradle Checks

This workspace uses Expo managed workflow. Native Android folders are not present until you run `expo prebuild`.

Some CI analyzers attempt to run a "gradle check" or call `./gradlew` by default. To avoid failures in this environment:

- Use the root script:
  npm run gradle-check

This will no-op when native folders are absent. If you need a native build:

- In notes_app_frontend:
  npm install
  npm run build-native-android
