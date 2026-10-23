import type { Lang } from './ui'

export const SITE = {
  name: 'Qualcus',
  url:
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
  phonePrimary: '+243811708999',
  phonePrimaryDisplay: '+243 81 170 8999',
  phoneSecondary: '+254746616124',
  phoneSecondaryDisplay: '+254 746 616 124',
  whatsapp: 'https://wa.me/243811708999',
  email: 'contact@qualcus.com',
  location: 'Congo — Kinshasa · Bunia · Goma',
}

export const ROUTE_KEYS = [
  'home',
  'services',
  'projects',
  'technologies',
  'about',
  'faq',
  'contact',
] as const

export type NavKey = (typeof ROUTE_KEYS)[number]

export const ROUTES: Record<NavKey, { fr: string; en: string }> = {
  home: { fr: '/', en: '/en/' },
  services: { fr: '/services', en: '/en/services' },
  projects: { fr: '/realisations', en: '/en/projects' },
  technologies: { fr: '/technologies', en: '/en/technologies' },
  about: { fr: '/a-propos', en: '/en/about' },
  faq: { fr: '/faq', en: '/en/faq' },
  contact: { fr: '/contact', en: '/en/contact' },
}

export const navItems = ROUTE_KEYS.map((key) => ({ key, slug: ROUTES[key].fr }))

export const companyLinks = navItems.filter((n) =>
  (['about', 'projects', 'technologies', 'faq', 'contact'] as NavKey[]).includes(n.key),
)

export function href(lang: Lang, slug: string): string {
  if (lang !== 'en') return slug
  const match = ROUTE_KEYS.find((k) => ROUTES[k].fr === slug)
  return match ? ROUTES[match].en : '/en' + slug
}

export function projectPath(lang: Lang, slug: string): string {
  return lang === 'en' ? `/en/projects/${slug}` : `/realisations/${slug}`
}

export function altLangPath(lang: Lang, pathname: string): string {
  const norm = pathname.replace(/\/$/, '') || '/'
  const target: Lang = lang === 'fr' ? 'en' : 'fr'
  const match = ROUTE_KEYS.find((k) => ROUTES[k][lang].replace(/\/$/, '') === norm)
  if (match) return ROUTES[match][target]
  const detail = norm.match(/^\/realisations\/(.+)$/) || norm.match(/^\/en\/projects\/(.+)$/)
  if (detail) return target === 'en' ? `/en/projects/${detail[1]}` : `/realisations/${detail[1]}`
  return target === 'en' ? '/en/' : '/'
}

export function activeKey(pathname: string): NavKey {
  const norm = pathname.replace(/\/$/, '') || '/'
  if (norm.startsWith('/realisations/') || norm.startsWith('/en/projects/')) return 'projects'
  const match = ROUTE_KEYS.find(
    (k) => ROUTES[k].fr.replace(/\/$/, '') === norm || ROUTES[k].en.replace(/\/$/, '') === norm,
  )
  return match ?? 'home'
}

export const projectVisuals: Record<string, { icon: string; grad: string }> = {
  software: { icon: 'layers', grad: 'linear-gradient(135deg,#0ea5e9,#4f46e5)' },
  security: { icon: 'shield', grad: 'linear-gradient(135deg,#0891b2,#6366f1)' },
  iot: { icon: 'cpu', grad: 'linear-gradient(135deg,#22d3ee,#0ea5e9)' },
}
