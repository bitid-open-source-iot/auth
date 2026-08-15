#!/usr/bin/env bash
# Idempotent repository bootstrap for the auth service.
# Installs MongoDB if missing, installs Node dependencies, and generates a
# local development .env if one is not present.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

log() { printf '\n[install] %s\n' "$*"; }

# MongoDB (auth shares the same local MongoDB instance as the other services).
# Normally captured in the environment snapshot/base image; guarded so the
# script is safe to re-run and usable on a bare Ubuntu 24.04 host.
if ! command -v mongod >/dev/null 2>&1; then
    log "Installing MongoDB 8.0"
    curl -fsSL https://pgp.mongodb.com/server-8.0.asc \
        | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor --yes
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" \
        | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
    sudo apt-get update -y
    sudo apt-get install -y mongodb-org
else
    log "MongoDB already installed ($(mongod --version | head -1))"
fi

log "Installing Node dependencies (npm install)"
npm install

if [ ! -f "$REPO_ROOT/.env" ]; then
    log "Generating local development .env"
    cat > "$REPO_ROOT/.env" <<'ENV'
NODE_ENV="development"
mongodb={"url":"mongodb://127.0.0.1:27017/xxx","database":"xxx"}
clientAuth="http://127.0.0.1:9000"
clientDrive="http://127.0.0.1:13000"
hostTelemetry="http://127.0.0.1:8000"
BITID_EMAIL="dev@local.test"
BITID_USER_ID="000000000000000000000000"
BITID_TOKEN={"Bearer":"dev-local","scopes":["*"],"expiry":0,"tokenAddOn":{}}
smtp={"host":"127.0.0.1","port":25,"secure":false,"tls":{"rejectUnauthorized":false},"connectionTimeout":10000,"from":"dev@local.test"}
branding={"address":{"vat":"","reg":"","street":"","suburb":"","cityTown":"","postalCode":""},"auth":"http://127.0.0.1:9000","logo":"","company":"OpenThings Dev","support":"dev@local.test","registration":""}
ENV
else
    log ".env already present, leaving it untouched"
fi

mkdir -p "$REPO_ROOT/logs"

log "Install complete"
