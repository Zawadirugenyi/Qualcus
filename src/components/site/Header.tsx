'use client'

import { useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import { ui, type Lang } from '@/lib/ui'
import { navItems, href, activeKey, altLangPath } from '@/lib/site'
import Icon from './Icon'

const THEME_EVENT = 'qualcus-theme-change'

type Theme = 'dark' | 'light'

function subscribeTheme(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback)
  return () => window.removeEventListener(THEME_EVENT, callback)
}

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export default function Header({ lang }: { lang: Lang }) {
  const t = ui[lang]
  const pathname = useLocation().pathname
  const [open, setOpen] = useState(false)
  const theme = useSyncExternalStore(subscribeTheme, readTheme, (): Theme => 'dark')

  const active = activeKey(pathname)
  const otherLang: Lang = lang === 'fr' ? 'en' : 'fr'
  const altPath = altLangPath(lang, pathname)

  function toggleTheme() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('qualcus-theme', next)
    } catch (err) {
      console.warn('Theme preference could not be saved', err)
    }
    window.dispatchEvent(new Event(THEME_EVENT))
  }

  return (
    <header
      id="site-header"
      className="fixed top-0 inset-x-0 z-50 border-b border-[var(--c-line)] backdrop-blur-xl"
      style={{ background: 'color-mix(in srgb, var(--c-canvas) 78%, transparent)' }}
    >
      <div className="container-page flex items-center justify-between h-[72px] gap-4">
        <a href={href(lang, '/')} className="flex items-center gap-3 shrink-0" aria-label="Qualcus">
          <span className="grid place-items-center w-11 h-11 rounded-xl bg-white shadow-[0_6px_20px_rgba(14,165,233,0.25)] overflow-hidden">
            <img src="/QUALCUS.png" alt="Qualcus" className="w-full h-full object-contain p-0.5" />
          </span>
          <span className="font-display font-extrabold text-[1.25rem] tracking-tight">
            Qual<span className="text-grad">cus</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation">
          {navItems.map((n) => (
            <a
              key={n.key}
              href={href(lang, n.slug)}
              className={`px-3.5 py-2 rounded-full text-[0.9rem] font-medium transition-colors ${
                active === n.key ? 'text-brand' : 'text-muted hover:text-ink'
              }`}
            >
              {t.nav[n.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid place-items-center w-10 h-10 rounded-full border border-[var(--c-line)] text-muted hover:text-brand hover:border-brand transition-colors"
            aria-label="Changer de thème"
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-5 h-5" />
          </button>

          <a
            href={altPath}
            className="hidden sm:grid place-items-center min-w-10 h-10 px-3 rounded-full border border-[var(--c-line)] text-[0.8rem] font-bold text-muted hover:text-brand hover:border-brand transition-colors"
            aria-label="Changer de langue"
          >
            {otherLang.toUpperCase()}
          </a>

          <a
            href={href(lang, '/contact')}
            className="btn btn-primary !py-2.5 !px-5 !text-[0.85rem] hidden md:inline-flex"
          >
            {t.cta.quoteShort}
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-[var(--c-line)] text-ink"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="block w-5 h-0.5 bg-current relative before:content-[''] before:absolute before:left-0 before:-top-1.5 before:w-5 before:h-0.5 before:bg-current after:content-[''] after:absolute after:left-0 after:top-1.5 after:w-5 after:h-0.5 after:bg-current" />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--c-line)] bg-canvas/98 backdrop-blur-xl">
          <nav className="container-page py-4 flex flex-col gap-1">
            {navItems.map((n) => (
              <a
                key={n.key}
                href={href(lang, n.slug)}
                className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                  active === n.key ? 'text-brand bg-brand/10' : 'text-muted hover:text-ink'
                }`}
              >
                {t.nav[n.key]}
              </a>
            ))}
            <a href={href(lang, '/contact')} className="btn btn-primary mt-2">
              {t.cta.quote}
            </a>
            <a href={altPath} className="btn btn-ghost mt-1">
              {otherLang === 'en' ? 'English' : 'Français'}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
