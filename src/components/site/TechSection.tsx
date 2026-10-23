import { home, techCards } from '@/lib/pages'
import type { Lang } from '@/lib/ui'
import Icon from './Icon'
import SectionHead from './SectionHead'

export default function TechSection({ lang, withHeading = true }: { lang: Lang; withHeading?: boolean }) {
  const { tech } = home[lang]
  const cards = techCards[lang]
  return (
    <section className="py-20">
      <div className="container-page">
        {withHeading && <SectionHead eyebrow={tech.eyebrow} title={tech.title} lead={tech.lead} />}

        <div className="grid gap-5 mt-14 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <article
              key={c.title}
              className="card-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50"
              data-animate
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`icon-badge ${c.color}`}>
                <Icon name={c.icon} />
              </div>
              <h3 className="font-display font-bold text-[1.05rem] mt-4">{c.title}</h3>
              <p className="text-muted text-[0.85rem] mt-2 mb-4">{c.text}</p>
              <div className="flex flex-wrap gap-2">
                {c.chips.map((chip) => (
                  <span key={chip} className="text-[0.72rem] font-medium rounded-full border border-[var(--c-line)] bg-canvas px-2.5 py-1 text-muted">
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
