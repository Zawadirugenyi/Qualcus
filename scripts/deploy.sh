#!/usr/bin/env bash
# ============================================================
#  Qualcus — deploy from your computer to the VPS.
#
#  npm run deploy -- root@203.0.113.10
#
#  1. builds the website and the CMS
#  2. copies the project to the server
#  3. runs scripts/deploy-server.sh on the server
#  4. checks that the site, the API and the CMS answer
# ============================================================
set -euo pipefail

TARGET="${1:-${DEPLOY_HOST:-root@qualcus-vps}}"
APP_DIR="/home/qualcus/app"
WEB_DIR="/var/www/qualcus"

log() { echo -e "\n\033[1;36m==> $1\033[0m"; }
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

for f in "$ROOT/.env.production" "$ROOT/cms/.env.production"; do
  if [ ! -f "$f" ]; then
    echo "Missing $f — run first:"
    echo '   npm run deploy:prepare -- --sqlite'
    echo '   (or --db "postgresql://..." for a managed database)'
    exit 1
  fi
done

# ------------------------------------------------------------
log "Building the website"
cd "$ROOT"
npm run sync:logo
npm run build:prod

log "Building the CMS"
cd "$ROOT/cms"
npm run build

# ------------------------------------------------------------
log "Copying to $TARGET"
cd "$ROOT"
rsync -az --delete \
  --exclude 'node_modules' --exclude '.next' --exclude 'dist' \
  --exclude 'backups' --exclude '.env' --exclude '*.tsbuildinfo' \
  --exclude 'cms/media' --exclude 'cms/qualcus.db' \
  ./ "$TARGET:$APP_DIR/"

rsync -az --delete "$ROOT/dist/" "$TARGET:$WEB_DIR/"

# ------------------------------------------------------------
# SQLite: the app files are synced above but the database and the uploads are
# deliberately excluded. Copy the database once (first deploy) so the CMS does
# not start empty, and merge media without ever deleting files uploaded in
# production through the admin.
if [ -f "$ROOT/cms/qualcus.db" ]; then
  if ssh "$TARGET" "test -s $APP_DIR/cms/qualcus.db"; then
    log "Keeping the production database"
  else
    log "Copying the database (first deploy)"
    ssh "$TARGET" "mkdir -p $APP_DIR/cms"
    rsync -az "$ROOT/cms/qualcus.db" "$TARGET:$APP_DIR/cms/qualcus.db"
  fi
fi

if [ -d "$ROOT/cms/media" ]; then
  log "Copying media (existing server files are kept)"
  rsync -az --ignore-existing "$ROOT/cms/media/" "$TARGET:$APP_DIR/cms/media/"
fi

log "Setting up the server"
ssh -o StrictHostKeyChecking=accept-new "$TARGET" "bash $APP_DIR/scripts/deploy-server.sh"

# ------------------------------------------------------------
log "Checking"
IP="$(ssh "$TARGET" 'hostname -I' | awk '{print $1}')"
for path in "/" "/api/projects?limit=1" "/admin"; do
  code="$(curl -s -o /dev/null -w '%{http_code}' -m 20 "http://$IP$path" || echo 000)"
  printf '  %-26s %s\n' "$path" "$code"
done
echo ""
echo "  Once DNS points at $IP:  certbot --nginx -d qualcus.com -d www.qualcus.com"
