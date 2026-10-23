# Deploying Qualcus

Domain bought at Hostinger · the app runs on a VPS · **SQLite on the server**.

## What you are deploying

| Piece | What it is | Where it runs |
| --- | --- | --- |
| `src/` (React + Vite) | The public website | Static files in `/var/www/qualcus` |
| `cms/` (Payload + Next.js) | Admin panel + JSON API | Node process on port 3001 |
| Database | Projects, media, leads | `cms/qualcus.db` (SQLite file) |
| Media files | Uploaded images | `cms/media/` on the same disk |
| Nginx | One domain in front of both | Ports 80 / 443 |

The React site calls `/api/...` on the same domain, so there is no CORS to configure. The whole
database is one file — no Supabase, no free-plan limits, no external service to keep alive.

---

## The fastest path

You need: `qualcus.com` at Hostinger (done) and a server with SSH.

```bash
# 1. production settings (SQLite path, random Payload secret)
npm run deploy:prepare -- --sqlite

# 2. build everything, copy it, set up nginx + systemd, start the CMS
npm run deploy -- root@YOUR_SERVER_IP

# 3. HTTPS (only after the A records point at that IP)
ssh root@YOUR_SERVER_IP 'certbot --nginx -d qualcus.com -d www.qualcus.com'
```

Then open `https://qualcus.com/admin` and change the admin password (see *Passwords* below).

---

## Step 0 — The server and the DNS

**Choose a server.**

- **Oracle Cloud Always Free** — ARM VM, 4 cores / 24 GB, free forever. Ubuntu 24.04.
  In the VCN **security list**, allow TCP 80 and 443 (the cloud firewall is separate from `ufw`).
- **Hostinger VPS KVM 1** — ~$7/month, Ubuntu 24.04, simplest if you want one provider.

You need the public IPv4 of the server and SSH access as `root` (add your SSH key to
`~/.ssh/authorized_keys`).

**Point the domain at it.** Hostinger → **Domains** → `qualcus.com` → **DNS Zone**. Keep Hostinger's
nameservers and add:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | *your server IP* | 300 |
| A | `www` | *your server IP* | 300 |

Delete any parking A/CNAME on `@` and `www` that points elsewhere. Check with
`dig +short qualcus.com` — it must print your server IP before you request the certificate.

> If you later put Cloudflare in front, use **Full (strict)** SSL, never *Flexible*, or Nginx will
> loop between http and https.

---

## Step 1 — Production settings

```bash
npm run deploy:prepare -- --sqlite
```

This writes two files (both are ignored by git):

- `.env.production` — the site URL used by the React build
- `cms/.env.production` — read by systemd and by every Payload command

With `--sqlite` the database is:

```
DATABASE_URI="file:/home/qualcus/app/cms/qualcus.db"
MEDIA_DIR=/home/qualcus/app/cms/media
```

Both must be **absolute**: the standalone server changes its working directory at startup.

Options: `--site https://qualcus.com`, `--email admin@qualcus.com`, `--password '...'`, or
`--db "postgresql://..."` if you ever move to managed Postgres.

---

## Step 2 — Deploy

```bash
npm run deploy -- root@YOUR_SERVER_IP
```

It runs locally, then over SSH:

1. builds the React site (`build:prod`) and the CMS (`next build`, standalone)
2. rsyncs the project to `/home/qualcus/app` and `dist/` to `/var/www/qualcus`
3. **first deploy only:** copies `cms/qualcus.db` to the server (the app files alone are not enough —
   Payload does not create the schema in production)
4. merges `cms/media/` with `--ignore-existing`, so images added later in the admin are never deleted
5. installs Node 22, Nginx, certbot, rsync on the server
6. runs `db:migrate` (currently a no-op — see *Schema changes*), builds, installs and restarts the
   `qualcus-cms` systemd service
7. installs the Nginx config and reloads it
8. checks `/`, `/api/projects` and `/admin` over HTTP and prints the status codes

On every later `npm run deploy`, an existing server database is **kept**; only code and new local
media are copied.

---

## Step 3 — HTTPS

```bash
ssh root@YOUR_SERVER_IP 'certbot --nginx -d qualcus.com -d www.qualcus.com'
```

Certbot edits the Nginx config, installs the certificate and sets up renewal. Verify:

```bash
curl -I https://qualcus.com
curl -s https://qualcus.com/api/projects?limit=1 | head -c 200
```

---

## Step 4 — Verify

| Check | Expected |
| --- | --- |
| `https://qualcus.com` | Hero, in French |
| `https://qualcus.com/en/about` | English About page |
| `https://qualcus.com/realisations` | The 6 projects |
| `https://qualcus.com/admin` | Branded Qualcus login, in French |
| Contact form | A row appears in the admin under **Demandes de contact** |

> The admin logo is `/QUALCUS.png`. On the server that URL is served from the website's `public/`
> folder, which is why `build:prod` runs `sync:logo` first — it keeps `public/QUALCUS.png` and
> `cms/public/QUALCUS.png` identical.

---

## Passwords

`--password` only applies when **seeding a brand-new database**. With SQLite we copy your existing
database, so the production admin password is the one you already use locally.

After the first login on the server: avatar (bottom-left) → **Compte** → change the password.

---

## Updating the site later

```bash
npm run deploy -- root@YOUR_SERVER_IP
```

Build, copy, restart. The database and production uploads are left untouched.

---

## Schema changes (new fields or collections)

The live schema currently comes from the copied SQLite file. `cms/src/migrations/` is still an empty
placeholder, so `db:migrate` does nothing — **do not delete `cms/qualcus.db`**, it is your schema.

When you add or rename fields in `cms/src/collections/`, ask for a migration to be generated and
baselined against the existing database. Until then, code changes that only touch the frontend or the
admin UI are safe to deploy normally.

---

## Backups

On your computer (the CMS must be stopped, the script checks):

```bash
node scripts/backup-cms.mjs                      # -> backups/qualcus-cms-<date>.tar.gz
node scripts/backup-cms.mjs restore <file>.tar.gz
```

On the server, a daily copy of the database and media:

```bash
mkdir -p /home/qualcus/backups
crontab -e
# 0 3 * * * tar -czf /home/qualcus/backups/qualcus-$(date +\%F).tar.gz -C /home/qualcus/app/cms qualcus.db media
```

Download one of those files off the server from time to time — a backup on the same disk is not a
backup. SQLite has no automatic hosted backups (unlike Supabase), which is the trade-off for having no
external service.

---

## Checking the routing before you go live

```bash
npm run build && node scripts/check-routing.mjs
```

It mimics the Nginx rules (`/api`, `/admin`, `/_next` → CMS, everything else → the SPA) against your
local CMS and verifies that the site, API, admin page and all admin assets answer correctly. If the
admin ever opens as a blank page, run this first.

---

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| `/admin` is a blank white page | Nginx sends `/_next/...` to the React app. The config proxies `/_next/` to the CMS; make sure the server has the current `deploy/nginx/qualcus.conf` (redeploy). |
| `/admin` loads but says wrong password | The server database is not yours (first deploy skipped the copy). See the next row. |
| The site shows 0 projects after the first deploy | An empty `cms/qualcus.db` already existed on the server, so the copy was skipped. Move it aside and redeploy: `ssh root@IP 'mv /home/qualcus/app/cms/qualcus.db /home/qualcus/old.db'`. |
| `attempt to write a readonly database` | Wrong file owner. `chown -R qualcus:qualcus /home/qualcus/app/cms` |
| `SQLITE_ERROR: no such table` | The database is empty or relative. `DATABASE_URI` must be `file:/home/qualcus/app/cms/qualcus.db`. |
| Images are broken | `MEDIA_DIR` must be absolute and writable by `qualcus`, and the folder must exist. |
| `certbot` fails | DNS does not point at this server yet, or port 80 is blocked (Oracle VCN security list + `ufw allow 'Nginx Full'`). |
| The whole site disappears from Google | `robots.txt` must not be served with `X-Robots-Tag: noindex`; that header belongs on `/admin` only. |
| Contact form fails | The CMS is unreachable at `/api`. Check `systemctl status qualcus-cms` and `journalctl -u qualcus-cms -n 50`. |
| The CMS migrated the wrong database | The Payload CLI reads `.env.production` only when `NODE_ENV=production`; the `db:*` scripts set it for you. |

---

## Appendix — managed Postgres instead of SQLite

Everything above works the same if you pass a Postgres URL instead of `--sqlite`:

```bash
npm run deploy:prepare -- --db "postgresql://user:pass@host:5432/db"
```

- **Neon** free tier: use the **direct** connection string (the host must not contain `-pooler`).
- **Supabase**: use the **session pooler**, port **5432** — not the transaction pooler on 6543
  (Payload needs prepared statements).

Create the schema before the first deploy (`migrations/` must contain real migrations):

```bash
cd cms
npm run db:migrate:create
npm run db:migrate
npm run seed
```

Then `npm run deploy` never copies a database file; Postgres holds the data.
