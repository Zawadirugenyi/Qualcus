#!/usr/bin/env bash
# ============================================================
#  Qualcus — server setup for a Hostinger VPS (Ubuntu 24.04)
#  Run as root, from the app folder that was rsynced over:
#      bash /home/qualcus/app/scripts/deploy-server.sh
#  Safe to run again — every step checks before it acts.
# ============================================================
set -euo pipefail

APP_DIR="/home/qualcus/app"
WEB_DIR="/var/www/qualcus"
CMS_USER="qualcus"
CMS_PORT="3001"

log() { echo -e "\n\033[1;36m==> $1\033[0m"; }

# ------------------------------------------------------------
log "System packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq nginx curl ca-certificates rsync tar certbot python3-certbot-nginx >/dev/null

if ! command -v node >/dev/null 2>&1; then
  log "Node.js 22"
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - >/dev/null
  apt-get install -y -qq nodejs >/dev/null
fi
node -v

# ------------------------------------------------------------
log "Service user + folders"
if ! id -u "$CMS_USER" >/dev/null 2>&1; then
  adduser --system --group --home "/home/$CMS_USER" --no-create-home "$CMS_USER"
fi
mkdir -p "$APP_DIR" "$WEB_DIR" "$APP_DIR/cms/media"
chown -R "$CMS_USER:$CMS_USER" "/home/$CMS_USER"

# ------------------------------------------------------------
log "Environment file"
if [ ! -f "$APP_DIR/cms/.env.production" ]; then
  echo "ERROR: $APP_DIR/cms/.env.production is missing."
  echo "       On your computer run:  npm run deploy:prepare -- --sqlite"
  exit 1
fi
chown "$CMS_USER:$CMS_USER" "$APP_DIR/cms/.env.production"
chmod 600 "$APP_DIR/cms/.env.production"

# SQLite is a file: it must be copied by `npm run deploy` on the first deploy.
# Payload does not create the schema automatically in production.
if grep -qE '^DATABASE_URI="?(file|sqlite):' "$APP_DIR/cms/.env.production"; then
  if [ ! -s "$APP_DIR/cms/qualcus.db" ]; then
    echo "ERROR: no SQLite database at $APP_DIR/cms/qualcus.db."
    echo "       Run 'npm run deploy' from your computer — it copies cms/qualcus.db"
    echo "       on the first deploy. The server cannot create the schema by itself."
    exit 1
  fi
fi

# ------------------------------------------------------------
log "Dependencies"
cd "$APP_DIR"
[ -d node_modules ] || sudo -u "$CMS_USER" npm ci --omit=dev --no-audit --no-fund
cd "$APP_DIR/cms"
[ -d node_modules ] || sudo -u "$CMS_USER" npm ci --no-audit --no-fund

# ------------------------------------------------------------
log "Database migrations"
cd "$APP_DIR/cms"
sudo -u "$CMS_USER" env NODE_ENV=production npm run db:migrate

# ------------------------------------------------------------
log "CMS build"
sudo -u "$CMS_USER" env NODE_ENV=production npm run build

# ------------------------------------------------------------
log "systemd service"
cp "$APP_DIR/deploy/systemd/qualcus-cms.service" /etc/systemd/system/qualcus-cms.service
systemctl daemon-reload
systemctl enable qualcus-cms >/dev/null
systemctl restart qualcus-cms
sleep 6
systemctl --no-pager --lines=8 status qualcus-cms || true

# ------------------------------------------------------------
log "Nginx"
cp "$APP_DIR/deploy/nginx/qualcus.conf" /etc/nginx/sites-available/qualcus
ln -sf /etc/nginx/sites-available/qualcus /etc/nginx/sites-enabled/qualcus
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# ------------------------------------------------------------
log "Static site"
if [ -d "$APP_DIR/dist" ]; then
  rsync -a --delete "$APP_DIR/dist/" "$WEB_DIR/"
  chown -R www-data:www-data "$WEB_DIR"
fi

# ------------------------------------------------------------
log "Firewall"
ufw allow 'Nginx Full' >/dev/null 2>&1 || true
ufw status || true

echo -e "\n\033[1;32m==> Server is ready.\033[0m"
echo "    website : http://$(hostname -I | awk '{print $1}')"
echo "    CMS     : http://$(hostname -I | awk '{print $1}'):$CMS_PORT/admin"
echo ""
echo "    Last step — the SSL certificate:"
echo "      certbot --nginx -d qualcus.com -d www.qualcus.com"
echo "    (the A records for qualcus.com must already point at this server)"
