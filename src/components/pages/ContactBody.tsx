import PageHero from '@/components/site/PageHero'
import ContactForm from '@/components/site/ContactForm'
import Icon from '@/components/site/Icon'
import { contactInfo } from '@/lib/pages'
import { SITE } from '@/lib/site'

export default function ContactBody({ lang }: { lang: 'fr' | 'en' }) {
  const c = contactInfo[lang]

  return (
    <>
      <PageHero lang={lang} eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <section className="pb-24">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="card-surface p-8" data-animate>
            <ContactForm lang={lang} />
          </div>

          <div className="grid gap-5 content-start">
            <div className="card-surface p-6" data-animate style={{ transitionDelay: '80ms' }}>
              <div className="grid gap-5">
                <div className="flex items-start gap-3.5">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand/10 text-brand shrink-0">
                    <Icon name="pin" className="w-5 h-5" />
                  </span>
                  <div>
                    <strong className="block text-[0.9rem] font-semibold">{c.locationLabel}</strong>
                    <span className="text-muted text-[0.85rem]">{c.location}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand/10 text-brand shrink-0">
                    <Icon name="phone" className="w-5 h-5" />
                  </span>
                  <div>
                    <strong className="block text-[0.9rem] font-semibold">{c.phoneLabel}</strong>
                    <a href={`tel:${SITE.phonePrimary}`} className="block text-muted text-[0.85rem] hover:text-brand transition-colors">
                      {SITE.phonePrimaryDisplay}
                    </a>
                    <a href={`tel:${SITE.phoneSecondary}`} className="block text-muted text-[0.85rem] hover:text-brand transition-colors">
                      {SITE.phoneSecondaryDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand/10 text-brand shrink-0">
                    <Icon name="clock" className="w-5 h-5" />
                  </span>
                  <div>
                    <strong className="block text-[0.9rem] font-semibold">{c.hoursLabel}</strong>
                    <span className="text-muted text-[0.85rem]">{c.hours}</span>
                  </div>
                </div>
              </div>

              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener"
                className="btn !w-full mt-6 !bg-emerald-500/15 !text-emerald-400 !border !border-emerald-400/30 hover:!bg-emerald-400/25"
              >
                <Icon name="whatsapp" className="w-5 h-5" />
                {c.whatsapp}
              </a>
            </div>

            <div className="card-surface p-6" data-animate style={{ transitionDelay: '140ms' }}>
              <strong className="block font-display font-bold text-[1rem]">{c.mapTitle}</strong>
              <p className="text-muted text-[0.85rem] mt-1 mb-4">{c.mapText}</p>
              <a href="https://maps.google.com/?q=Kinshasa" target="_blank" rel="noopener" className="btn btn-ghost !w-full !text-[0.85rem]">
                <Icon name="pin" className="w-4 h-4" />
                {c.mapBtn}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
