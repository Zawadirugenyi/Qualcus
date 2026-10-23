import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SiteShell from '@/components/site/SiteShell'
import { pageDescription, pageFromPath, pagePath, pageTitle } from '@/lib/meta'
import { applySeo } from '@/lib/seo'
import { usePageMeta } from '@/lib/head'
import type { Lang } from '@/lib/ui'

export default function RootLayout({ lang }: { lang: Lang }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const override = usePageMeta()

  useEffect(() => {
    const page = pageFromPath(pathname)
    document.documentElement.lang = lang

    const title = override?.title ?? pageTitle(lang, page)
    const description = override?.description ?? pageDescription(lang, page)
    const altFr = override?.altFr ?? pagePath('fr', page)
    const altEn = override?.altEn ?? pagePath('en', page)

    applySeo({
      lang,
      title,
      description,
      path: pathname,
      altFr,
      altEn,
      image: override?.ogImage,
    })
  }, [lang, pathname, override])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Turn plain <a href="/..."> anchors into client-side navigation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as HTMLElement | null)?.closest('a')
      if (!link) return
      if (link.getAttribute('target') === '_blank' || link.hasAttribute('download')) return
      const href = link.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      e.preventDefault()
      navigate(href)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])

  return (
    <SiteShell lang={lang}>
      <Outlet />
    </SiteShell>
  )
}
