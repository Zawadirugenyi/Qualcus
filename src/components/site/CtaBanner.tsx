import { home } from '@/lib/pages'
import { ui, type Lang } from '@/lib/ui'
import { SITE, href } from '@/lib/site'
import Icon from './Icon'

export default function CtaBanner({ lang }: { lang: Lang }) {
  const { ctaBanner } = home[lang]
  const t = ui[lang].cta
  return (
    <section className="py-20">
      <div className="container-page">
        <div
          className="relative overflow-hidden rounded-[28px] px-8 py-14 md:px-16 md:py-16 text-center"
          style={{ background: 'linear-gradient(120deg, rgba(34,211,238,0.16), rgba(14,165,233,0.18) 45%, rgba(99,102,241,0.2))' }}
          data-animate
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand/20 blur-3xl animate-floaty pointer-events-none" />
          <div className="relative">
            <h2 className="font-display font-extrabold text-[clamp(1.7rem,3.6vw,2.4rem)] max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: ctaBanner.title }} />
            <p className="text-muted mt-4 max-w-xl mx-auto text-[1.02rem]">{ctaBanner.text}</p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a href={href(lang, '/contact')} className="btn btn-primary">{t.quote}</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener" className="btn btn-ghost">
                <Icon name="whatsapp" className="w-5 h-5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
