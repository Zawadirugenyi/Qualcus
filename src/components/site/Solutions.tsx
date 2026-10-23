import { home, solutionCards } from '@/lib/pages'
import type { Lang } from '@/lib/ui'
import Icon from './Icon'
import SectionHead from './SectionHead'

export default function Solutions({ lang }: { lang: Lang }) {
  const { solutions } = home[lang]
  const cards = solutionCards[lang]
  return (
    <section className="py-20">
      <div className="container-page">
        <SectionHead eyebrow={solutions.eyebrow} title={solutions.title} lead={solutions.lead} />

        <div className="grid gap-6 mt-14 lg:grid-cols-3">
          {cards.map((c, i) => (
            <article
              key={c.title}
              className="card-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/50 relative overflow-hidden"
              data-animate
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand/10 blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className={`icon-badge ${c.color}`}>
                  <Icon name={c.icon} />
                </div>
                {c.badge && (
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-brand bg-brand/10 border border-brand/25 rounded-full px-2.5 py-1">
                    {c.badge}
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-[1.2rem] mt-5">{c.title}</h3>
              <p className="text-muted text-[0.9rem] mt-2.5">{c.text}</p>
              <ul className="checklist mt-5">
                {c.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="card-surface mt-8 p-6 text-center text-muted text-[0.95rem]" data-animate dangerouslySetInnerHTML={{ __html: solutions.note }} />
      </div>
    </section>
  )
}
