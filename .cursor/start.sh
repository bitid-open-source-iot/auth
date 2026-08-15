#!/usr/bin/env bash
# Per-boot startup for the auth service's dependencies.
# Ensures MongoDB is running, then seeds (idempotently) the base collections,
# the OpenThings application, and the pre-verified developer login.
# The auth Node process itself is launched from the "terminals" entry.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATA_DIR="$HOME/dev-data"
MONGO_DIR="$DATA_DIR/mongo"
LOG_DIR="$DATA_DIR/log"
mkdir -p "$MONGO_DIR" "$LOG_DIR"

log() { printf '\n[start] %s\n' "$*"; }

if mongosh --quiet --eval 'db.runCommand({ping:1})' >/dev/null 2>&1; then
    log "MongoDB already running"
else
    log "Starting MongoDB on 127.0.0.1:27017"
    mongod --dbpath "$MONGO_DIR" --bind_ip 127.0.0.1 --port 27017 \
        --fork --logpath "$LOG_DIR/mongod.log"
fi

for i in $(seq 1 30); do
    mongosh --quiet --eval 'db.runCommand({ping:1})' >/dev/null 2>&1 && break
    [ "$i" -eq 30 ] && { echo "[start] MongoDB did not become ready" >&2; exit 1; }
    sleep 1
done
log "MongoDB is ready"

# Base collections/indexes (idempotent: initialize.js only inserts when empty).
log "Seeding base collections (initialize.js)"
mongosh --quiet "mongodb://127.0.0.1:27017/auth" "$REPO_ROOT/db/scripts/initialize.js" >/dev/null

# Scopes + OpenThings app + pre-verified developer login (idempotent upserts).
log "Seeding OpenThings app + dev login (seed-dev-user.js)"
node "$REPO_ROOT/.cursor/seed-dev-user.js"

log "Auth dependencies ready"
