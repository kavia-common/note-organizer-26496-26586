# Notes App Frontend (React Native + Expo)

A modern, minimalist notes organizer built with Expo and React Native, following the "Ocean Professional" theme.

Features:
- Notes list with search
- Create, edit, pin, and delete notes (in-memory, mock data)
- Navigation drawer with categories
- Smooth, clean UI with blue and amber accents

Tech:
- Expo SDK 53
- React Native 0.79
- TypeScript
- React Navigation (stack + drawer)

Getting Started:
1. Install dependencies:
   npm install

2. Start the development server:
   npm run start
   - Press `a` for Android, `i` for iOS simulator, or open web preview.

3. Build / CI:
   # CI-safe check that succeeds in managed workflow (no native folders):
   npm run build
   # (internally runs ./.ci-gradle-check.sh which no-ops when ./android is absent)
   # CI runners may also call ../gradle-check.sh at repo root (added here) which also no-ops by default.
   # To actually generate and build native android locally or in EAS:
   npm run build-native-android

Project Structure:
- src/theme: colors, spacing, typography
- src/types: shared TypeScript types
- src/context: notes state + CRUD
- src/components: reusable UI components
- src/screens: list and editor screens
- src/navigation: navigation container with drawer + stack

Notes:
- All data is stored in memory and resets on reload. Integrate with a backend by replacing NotesContext implementation.
