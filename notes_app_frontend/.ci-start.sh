#!/usr/bin/env bash
set -euo pipefail

# Ensure dependencies are installed, then start Expo in a non-interactive manner for CI.
if [ ! -d "node_modules" ]; then
  echo "[ci-start] node_modules not found, installing..."
  npm install --no-audit --no-fund
else
  echo "[ci-start] node_modules present."
fi

# Start expo with minimal output. In CI, this just validates startup without opening emulators.
EXPO_NO_DESCRIPTION=1 npm run start --silent || {
  echo "[ci-start] Expo start failed."
  exit 1
}
