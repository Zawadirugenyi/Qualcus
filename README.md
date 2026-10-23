# Qualcus

Website (French + English) for Qualcus — software, IoT and security in the Congo.

```
src/          the public website  (React 19 + Vite + Tailwind v4)
cms/          the backend         (Payload CMS 3 + Next.js 16 + SQLite)
public/       static files copied into the build (logo, robots.txt, sitemap.xml, .htaccess)
scripts/      dev launcher, sitemap generator, CMS backup
deploy/       server configs: Nginx + systemd
```

The website is a single-page app; the CMS serves the content as JSON over `/api`.

---

## Daily work

```bash
npm run dev:all      # website on :3000 + CMS on :3001
```

| URL | What |
| --- | --- |
| http://localhost:3000 | the website (FR) |
| http://localhost:3000/en | the website (EN) |
| http://localhost:3001/admin | the CMS |

The Vite dev server proxies `/api` and `/media` to the CMS, so the browser only ever talks to :3000.

## Checks

```bash
npm run lint         # eslint (root + cms)
npm run typecheck    # tsc --noEmit
npm run build        # production build of the website -> dist/
npm run cms:build    # production build of the CMS
npm run check:routing  # do the site / API / admin answer the way Nginx will serve them?
```

## Content

The website text lives in `src/lib/pages.ts` (FR + EN in one file).
Projects, images and leads live in the database and are edited in the CMS admin.

## The admin panel

`http://localhost:3001/admin` — French by default, English in the account menu.

| What | Where |
| --- | --- |
| Login text, logo, favicon | `cms/src/components/admin/` |
| Colours and branding | `cms/src/app/(payload)/custom.scss` |
| Admin language | `i18n` in `cms/src/payload.config.ts` |

The admin shows `/QUALCUS.png`. `npm run sync:logo` copies `public/QUALCUS.png` into
`cms/public/`, so the site and the admin always use the same file (`build:prod` does it automatically).

## Deploying

```bash
npm run deploy:prepare -- --sqlite                # writes the production env files
npm run deploy -- root@YOUR_VPS_IP                   # build + copy + set up the server
```

See **[DEPLOY.md](DEPLOY.md)** — VPS + DNS, SQLite, SSL, backups.

## Backups

```bash
npm run backup:cms                       # -> backups/qualcus-cms-<date>.tar.gz
node scripts/backup-cms.mjs restore <file>.tar.gz
```
