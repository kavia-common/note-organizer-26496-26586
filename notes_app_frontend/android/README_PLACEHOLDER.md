This folder contains a CI-safe placeholder for the Gradle wrapper so that CI systems that unconditionally execute `./gradlew` do not fail in Expo managed projects.

- When you run `npm run build-native-android`, `expo prebuild` will generate the real native project here and overwrite these placeholder files.
- Local development with `npm start` does not require any native folders.
