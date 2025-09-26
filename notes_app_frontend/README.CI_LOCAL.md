# Local and CI Startup Notes

This Expo-managed React Native app requires dependencies to be installed before starting.

Quick start:
1) Install dependencies
   npm install --no-audit --no-fund

2) Start the dev server
   npm run start

3) Optional: open platforms
   npm run android
   npm run ios
   npm run web

Recommended version alignment (for Expo SDK 53):
Expo may suggest aligning package versions for best compatibility. If needed, run:

npm i @expo/metro-runtime@~5.0.5 \
      expo@~53.0.23 \
      react-native-gesture-handler@~2.24.0 \
      react-native-reanimated@~3.17.4 \
      react-native-safe-area-context@5.4.0 \
      react-native-screens@~4.11.1

CI tips:
- After `npm install` generates package-lock.json, CI can use `npm ci` for deterministic installs.
- Use the provided Gradle shims. Native Android folders are generated only after `expo prebuild`.
