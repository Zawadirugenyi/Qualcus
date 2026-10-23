#!/usr/bin/env bash
# ============================================================
#  Qualcus — deploy from your computer to the server.
#
#  npm run deploy -- root@203.0.113.10      (Hostinger VPS)
#  npm run deploy -- ubuntu@203.0.113.10    (Oracle Cloud free VM)
#
#  1. builds the website and the CMS
#  2. copies the project to the server
#  3. runs scripts/deploy-server.sh on the server (via sudo if not root)
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

# Root (Hostinger VPS) writes directly. Any other user (e.g. Oracle's
# "ubuntu") stages the files in /tmp and moves them with sudo.
REMOTE_USER="${TARGET%%@*}"
[ "$REMOTE_USER" = "$TARGET" ] && REMOTE_USER="root"
if [ "$REMOTE_USER" = "root" ]; then
  SUDO=""
else
  SUDO="sudo "
fi

remote() {
  ssh -o StrictHostKeyChecking=accept-new "$TARGET" "$@"
}

EXCLUDES=(
  --exclude node_modules
  --exclude .next
  --exclude dist
  --exclude backups
  --exclude .env
  --exclude '*.tsbuildinfo'
  --exclude cms/media
  --exclude cms/qualcus.db
)

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
if [ -z "$SUDO" ]; then
  rsync -az --delete "${EXCLUDES[@]}" ./ "$TARGET:$APP_DIR/"
else
  STAGE="/tmp/qualcus-stage-$$"
  rsync -az --delete "${EXCLUDES[@]}" ./ "$TARGET:$STAGE/"
  remote "${SUDO}mkdir -p $APP_DIR"
  remote "${SUDO}rsync -a --delete --exclude node_modules --exclude .next --exclude cms/media --exclude cms/qualcus.db $STAGE/ $APP_DIR/"
  remote "rm -rf $STAGE"
fi

if [ -z "$SUDO" ]; then
  rsync -az --delete "$ROOT/dist/" "$TARGET:$WEB_DIR/"
else
  WEB_STAGE="/tmp/qualcus-web-$$"
  rsync -az --delete "$ROOT/dist/" "$TARGET:$WEB_STAGE/"
  remote "${SUDO}mkdir -p $WEB_DIR"
  remote "${SUDO}rsync -a --delete $WEB_STAGE/ $WEB_DIR/"
  remote "rm -rf $WEB_STAGE"
fi

# ------------------------------------------------------------
# SQLite: the app files are synced above but the database and the uploads are
# deliberately excluded. Copy the database once (first deploy) so the CMS does
# not start empty, and merge media without ever deleting files uploaded in
# production through the admin.
if [ -f "$ROOT/cms/qualcus.db" ]; then
  if remote "${SUDO}test -s $APP_DIR/cms/qualcus.db" 2>/dev/null; then
    log "Keeping the production database"
  else
    log "Copying the database (first deploy)"
    remote "${SUDO}mkdir -p $APP_DIR/cms"
    if [ -z "$SUDO" ]; then
      rsync -az "$ROOT/cms/qualcus.db" "$TARGET:$APP_DIR/cms/qualcus.db"
    else
      DB_STAGE="/tmp/qualcus-db-$$"
      rsync -az "$ROOT/cms/qualcus.db" "$TARGET:$DB_STAGE"
      remote "${SUDO}cp $DB_STAGE $APP_DIR/cms/qualcus.db"
      remote "rm -f $DB_STAGE"
    fi
  fi
fi

if [ -d "$ROOT/cms/media" ]; then
  log "Copying media (existing server files are kept)"
  if [ -z "$SUDO" ]; then
    rsync -az --ignore-existing "$ROOT/cms/media/" "$TARGET:$APP_DIR/cms/media/"
  else
    MEDIA_STAGE="/tmp/qualcus-media-$$"
    rsync -az --ignore-existing "$ROOT/cms/media/" "$TARGET:$MEDIA_STAGE/"
    remote "${SUDO}mkdir -p $APP_DIR/cms/media"
    remote "${SUDO}rsync -a --ignore-existing $MEDIA_STAGE/ $APP_DIR/cms/media/"
    remote "rm -rf $MEDIA_STAGE"
  fi
fi

log "Setting up the server"
HOST="${TARGET#*@}"
[ "$HOST" = "$TARGET" ] && HOST="$TARGET"
remote "${SUDO}PUBLIC_HOST=$HOST bash $APP_DIR/scripts/deploy-server.sh"

# ------------------------------------------------------------
log "Checking"
for path in "/" "/api/projects?limit=1" "/admin"; do
  code="$(curl -s -o /dev/null -w '%{http_code}' -m 20 "http://$HOST$path" || echo 000)"
  printf '  %-26s %s\n' "$path" "$code"
done
echo ""
echo "  Once DNS points at $HOST:  certbot --nginx -d qualcus.com -d www.qualcus.com"
