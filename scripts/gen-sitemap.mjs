import { writeFileSync } from 'node:fs'

const SITE = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
const API = (process.env.API_URL || process.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '')

const staticPaths = [
  '/',
  '/services',
  '/realisations',
  '/technologies',
  '/a-propos',
  '/faq',
  '/contact',
  '/en',
  '/en/services',
  '/en/projects',
  '/en/technologies',
  '/en/about',
  '/en/faq',
  '/en/contact',
]

let slugs = []
try {
  const res = await fetch(`${API}/api/projects?limit=200&depth=0&where[slug][exists]=true`)
  if (res.ok) {
    const json = await res.json()
    slugs = (json.docs || []).map((d) => d.slug).filter(Boolean)
  }
} catch {
  console.warn('Could not reach the CMS API — sitemap will contain static pages only.')
}

const urls = [...staticPaths]
for (const slug of slugs) {
  urls.push(`/realisations/${slug}`, `/en/projects/${slug}`)
}

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => `  <url><loc>${SITE}${u}</loc><changefreq>weekly</changefreq></url>`).join('\n') +
  '\n</urlset>\n'

const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: ${SITE}/sitemap.xml
`

const publicDir = new URL('../public/', import.meta.url)
writeFileSync(new URL('sitemap.xml', publicDir), xml)
writeFileSync(new URL('robots.txt', publicDir), robots)
console.log(`sitemap.xml + robots.txt written (${urls.length} urls)${slugs.length ? '' : ' — no projects found'}`)
