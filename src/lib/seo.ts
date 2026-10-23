import { SITE } from './site'
import type { Lang } from './ui'

function metaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function linkTag(rel: string, href: string, extra?: Record<string, string>) {
  let selector = `link[rel="${rel}"]`
  if (extra) for (const k of Object.keys(extra)) selector += `[${k}="${extra[k]}"]`
  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (extra) for (const k of Object.keys(extra)) el.setAttribute(k, extra[k])
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function abs(base: string, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '')
  return `${base}${clean}` || base
}

export function siteBase(): string {
  return SITE.url.replace(/\/$/, '')
}

export function applySeo(opts: {
  lang: Lang
  title: string
  description: string
  path: string
  altFr: string
  altEn: string
  image?: string
}) {
  const base = siteBase()
  const url = abs(base, opts.path)
  const image = base + (opts.image || '/QUALCUS.png')

  document.title = opts.title
  metaTag('name', 'description', opts.description)

  linkTag('canonical', url)
  linkTag('alternate', abs(base, opts.altFr), { hreflang: 'fr' })
  linkTag('alternate', abs(base, opts.altEn), { hreflang: 'en' })
  linkTag('alternate', url, { hreflang: 'x-default' })

  metaTag('property', 'og:title', opts.title)
  metaTag('property', 'og:description', opts.description)
  metaTag('property', 'og:type', 'website')
  metaTag('property', 'og:site_name', 'Qualcus')
  metaTag('property', 'og:url', url)
  metaTag('property', 'og:image', image)
  metaTag('property', 'og:locale', opts.lang === 'fr' ? 'fr_FR' : 'en_US')
  metaTag('property', 'og:locale:alternate', opts.lang === 'fr' ? 'en_US' : 'fr_FR')

  metaTag('name', 'twitter:card', 'summary_large_image')
  metaTag('name', 'twitter:title', opts.title)
  metaTag('name', 'twitter:description', opts.description)
  metaTag('name', 'twitter:image', image)

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${base}/#organization`,
        name: 'Qualcus',
        url: base,
        logo: `${base}/QUALCUS.png`,
        email: SITE.email,
        telephone: SITE.phonePrimary,
        areaServed: 'CD',
        knowsAbout: ['Custom software', 'IoT', 'Security systems'],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CD',
          addressLocality: 'Kinshasa',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: base,
        name: 'Qualcus',
        inLanguage: ['fr', 'en'],
        publisher: { '@id': `${base}/#organization` },
      },
    ],
  }

  let script = document.getElementById('qualcus-jsonld') as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = 'qualcus-jsonld'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(jsonld)
}
