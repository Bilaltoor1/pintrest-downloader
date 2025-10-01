#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

echo "[deploy] Building images..."
docker compose build --pull

echo "[deploy] Starting services..."
docker compose up -d --remove-orphans

echo "[deploy] Cleaning unused images..."
docker image prune -f >/dev/null || true

echo "[deploy] Deployment completed successfully."
