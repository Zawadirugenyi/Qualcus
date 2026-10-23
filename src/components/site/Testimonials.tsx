import { home } from '@/lib/pages'
import type { Lang } from '@/lib/ui'
import Icon from './Icon'
import SectionHead from './SectionHead'

const grad: Record<string, string> = {
  'av-1': 'linear-gradient(135deg,#0ea5e9,#4f46e5)',
  'av-2': 'linear-gradient(135deg,#22d3ee,#0891b2)',
  'av-3': 'linear-gradient(135deg,#6366f1,#a855f7)',
}

export default function Testimonials({ lang }: { lang: Lang }) {
  const { testimonials } = home[lang]
  return (
    <section className="py-20">
      <div className="container-page">
        <SectionHead eyebrow={testimonials.eyebrow} title={testimonials.title} lead={testimonials.lead} />

        <div className="grid gap-6 mt-14 lg:grid-cols-3">
          {testimonials.items.map((it, i) => (
            <figure
              key={it.name}
              className="card-surface p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-brand/50"
              data-animate
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex gap-0.5 mb-4" style={{ color: '#fbbf24' }}>
                {Array.from({ length: it.stars }).map((_, k) => (
                  <Icon key={k} name="star" className="w-4 h-4" />
                ))}
              </div>
              <blockquote className="text-[0.95rem] leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: it.text }} />
              <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-[var(--c-line)]">
                <span className="grid place-items-center w-11 h-11 rounded-full text-white font-bold text-[0.85rem]" style={{ background: grad[it.color] }}>
                  {it.initials}
                </span>
                <div>
                  <strong className="block text-[0.9rem]">{it.name}</strong>
                  <span className="text-muted text-[0.78rem]">{it.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
