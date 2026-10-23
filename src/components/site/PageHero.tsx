import type { Lang } from '@/lib/ui'
import Icon from './Icon'

const chips = {
  fr: [
    { icon: 'chat', label: 'Devis gratuit & sans engagement' },
    { icon: 'shield', label: 'Garantie 12 mois' },
    { icon: 'flag', label: 'Équipe locale au Congo' },
  ],
  en: [
    { icon: 'chat', label: 'Free, no-obligation quote' },
    { icon: 'shield', label: '12-month warranty' },
    { icon: 'flag', label: 'Local team in the Congo' },
  ],
}

export default function PageHero({ eyebrow, title, lead, lang }: { eyebrow?: string; title: string; lead?: string; lang: Lang }) {
  const list = chips[lang]
  return (
    <section className="relative pt-36 pb-14 overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="orb orb-1" style={{ top: '-220px', right: '-100px' }} />
        <div className="orb orb-2" style={{ top: '-200px', left: '-120px', bottom: 'auto' }} />
        <div className="grid-lines" />
      </div>

      <div className="container-page relative z-10 text-center max-w-3xl mx-auto">
        {eyebrow && (
          <div className="badge-pill" data-animate>
            <span className="badge-dot" />
            <span className="uppercase tracking-[0.18em] text-[0.72rem] font-semibold">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.2rem)] tracking-[-0.03em] mt-6" data-animate dangerouslySetInnerHTML={{ __html: title }} />
        {lead && (
          <p className="text-muted text-[1.07rem] mt-5 max-w-2xl mx-auto" data-animate>
            {lead}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-2.5 mt-9" data-animate style={{ transitionDelay: '120ms' }}>
          {list.map((c) => (
            <span key={c.label} className="inline-flex items-center gap-2 text-[0.8rem] font-medium text-muted border border-[var(--c-line)] bg-panel rounded-full px-4 py-2">
              <Icon name={c.icon} className="w-4 h-4 text-brand" />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
