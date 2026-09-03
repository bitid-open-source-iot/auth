#!/usr/bin/env bash
# Reproducible runner for the auth mocha suite against the local Cloud Agent
# stack (auth :9000). Writes a local test/config.json (gitignored) using the
# seeded OpenThings app and admin share target.
#
# The suite registers a new user and expects SMTP to accept mail so register
# returns a verification code. Without that, /auth/register fails and a later
# /auth/validate can crash the auth process. Not part of the default
# telemetry/.cursor/e2e-all.sh run. Prefer the login smoke in
# telemetry/.cursor/e2e-login.sh.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

log() { printf '\n[auth-test] %s\n' "$*"; }
listening() { curl -fsS -m 2 -o /dev/null "http://127.0.0.1:$1/" 2>/dev/null; }

if ! listening 9000; then
    echo "[auth-test] auth is not listening on :9000. Run: bash ../telemetry/.cursor/dev-all.sh" >&2
    exit 1
fi

mkdir -p "$REPO_ROOT/test"
cat > "$REPO_ROOT/test/config.json" <<'JSON'
{
    "auth": "http://127.0.0.1:9000",
    "email": "e2e@local.test",
    "appId": "000000000000000000000002",
    "secret": "xxx",
    "shareId": "0000000000000000000000ad",
    "appName": "OpenThings",
    "password": "OpenThings1!",
    "authenticate": true
}
JSON

log "Running mocha test/test.js"
exec ./node_modules/.bin/mocha test/test.js --timeout 15000 --exit "$@"
