import { useEffect } from 'react'
import { href, navItems } from '@/lib/site'
import { ui, type Lang } from '@/lib/ui'
import { setPageMeta } from '@/lib/head'
import Icon from '@/components/site/Icon'

const copy = {
  fr: {
    eyebrow: 'Erreur 404',
    title: 'Cette page est <span class="text-grad">introuvable</span>',
    lead: "La page que vous cherchez a peut-être été déplacée ou n'existe plus. Voici quelques raccourcis utiles.",
    home: "Retour à l'accueil",
    contact: 'Nous contacter',
    links: 'Pages populaires',
    metaTitle: 'Page introuvable (404) — Qualcus',
    metaDesc: "La page demandée n'existe pas ou a été déplacée. Revenez à l'accueil ou contactez Qualcus.",
  },
  en: {
    eyebrow: 'Error 404',
    title: 'This page could not be <span class="text-grad">found</span>',
    lead: 'The page you are looking for may have been moved or no longer exists. Here are some useful shortcuts.',
    home: 'Back to home',
    contact: 'Contact us',
    links: 'Popular pages',
    metaTitle: 'Page not found (404) — Qualcus',
    metaDesc: 'The requested page does not exist or has been moved. Go back home or contact Qualcus.',
  },
} as const

export default function NotFoundBody({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const nav = ui[lang].nav
  const quick = navItems.filter((n) => n.key !== 'home')

  useEffect(() => {
    setPageMeta({ title: t.metaTitle, description: t.metaDesc })
    return () => setPageMeta(null)
  }, [t.metaTitle, t.metaDesc])

  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="orb orb-1" style={{ top: '-220px', right: '-100px' }} />
        <div className="orb orb-2" style={{ top: '-200px', left: '-120px', bottom: 'auto' }} />
        <div className="grid-lines" />
      </div>

      <div className="container-page relative z-10 text-center max-w-2xl mx-auto">
        <div className="font-display font-extrabold text-[clamp(5rem,18vw,9rem)] leading-none text-grad" data-animate>
          404
        </div>
        <div className="badge-pill mt-4" data-animate>
          <span className="badge-dot" />
          <span className="uppercase tracking-[0.18em] text-[0.72rem] font-semibold">{t.eyebrow}</span>
        </div>
        <h1 className="font-display font-extrabold text-[clamp(1.7rem,4vw,2.4rem)] mt-6" data-animate dangerouslySetInnerHTML={{ __html: t.title }} />
        <p className="text-muted text-[1.02rem] mt-4" data-animate>
          {t.lead}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-9" data-animate>
          <a href={href(lang, '/')} className="btn btn-primary">
            <Icon name="arrowRight" className="w-4 h-4 rotate-180" />
            {t.home}
          </a>
          <a href={href(lang, '/contact')} className="btn btn-ghost">
            {t.contact}
          </a>
        </div>

        <div className="mt-14" data-animate>
          <p className="text-muted text-[0.78rem] uppercase tracking-[0.16em] font-semibold mb-4">{t.links}</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {quick.map((n) => (
              <a
                key={n.key}
                href={href(lang, n.slug)}
                className="text-[0.85rem] font-medium px-4 py-2 rounded-full border border-[var(--c-line)] text-muted hover:text-brand hover:border-brand transition-colors"
              >
                {nav[n.key]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
