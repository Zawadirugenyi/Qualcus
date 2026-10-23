import type { Lang } from '@/lib/ui'
import { ui } from '@/lib/ui'
import { serviceCards } from '@/lib/pages'
import { SITE, companyLinks, href } from '@/lib/site'
import Icon from './Icon'
import NewsletterForm from './NewsletterForm'

export default function Footer({ lang }: { lang: Lang }) {
  const t = ui[lang]
  const services = serviceCards[lang]

  return (
    <footer className="mt-24 border-t border-[var(--c-line)] bg-subtle">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href={href(lang, '/')} className="flex items-center gap-3 mb-4">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-white shadow-[0_6px_20px_rgba(14,165,233,0.25)] overflow-hidden">
                <img src="/QUALCUS.png" alt="Qualcus" className="w-full h-full object-contain p-0.5" />
              </span>
              <span className="font-display font-extrabold text-[1.25rem]">
                Qual<span className="text-grad">cus</span>
              </span>
            </a>
            <p className="text-muted text-[0.9rem] max-w-xs">{t.footer.tagline}</p>
            <div className="flex gap-3 mt-5">
              <a href={SITE.whatsapp} target="_blank" rel="noopener" className="grid place-items-center w-10 h-10 rounded-full border border-[var(--c-line)] text-muted hover:text-brand hover:border-brand transition-colors" aria-label="WhatsApp">
                <Icon name="whatsapp" className="w-5 h-5" />
              </a>
              <a href={`tel:${SITE.phonePrimary}`} className="grid place-items-center w-10 h-10 rounded-full border border-[var(--c-line)] text-muted hover:text-brand hover:border-brand transition-colors" aria-label="Téléphone">
                <Icon name="phone" className="w-5 h-5" />
              </a>
              <a href={`mailto:${SITE.email}`} className="grid place-items-center w-10 h-10 rounded-full border border-[var(--c-line)] text-muted hover:text-brand hover:border-brand transition-colors" aria-label="E-mail">
                <Icon name="mail" className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-[0.95rem] mb-4">{t.footer.servicesTitle}</h3>
            <ul className="space-y-2.5 text-[0.9rem] text-muted">
              {services.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
              <li>
                <a href={href(lang, '/realisations')} className="hover:text-brand transition-colors">
                  {t.nav.projects}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-[0.95rem] mb-4">{t.footer.companyTitle}</h3>
            <ul className="space-y-2.5 text-[0.9rem]">
              {companyLinks.map((c) => (
                <li key={c.key}>
                  <a href={href(lang, c.slug)} className="text-muted hover:text-brand transition-colors">
                    {t.nav[c.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-[0.95rem] mb-4">{t.footer.contactTitle}</h3>
            <ul className="space-y-3 text-[0.9rem] text-muted">
              <li className="flex items-start gap-2.5">
                <Icon name="phone" className="w-4 h-4 mt-0.5 text-brand shrink-0" />
                <span>
                  <a href={`tel:${SITE.phonePrimary}`} className="hover:text-brand transition-colors">{SITE.phonePrimaryDisplay}</a>
                  <br />
                  <a href={`tel:${SITE.phoneSecondary}`} className="hover:text-brand transition-colors">{SITE.phoneSecondaryDisplay}</a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="mail" className="w-4 h-4 mt-0.5 text-brand shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-brand transition-colors">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="w-4 h-4 mt-0.5 text-brand shrink-0" />
                <span>{SITE.location}</span>
              </li>
            </ul>
            <NewsletterForm lang={lang} />
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[var(--c-line)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.82rem] text-muted">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <p>{t.footer.made}</p>
        </div>
      </div>
    </footer>
  )
}
