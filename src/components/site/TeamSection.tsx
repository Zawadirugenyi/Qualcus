import { aboutContent } from '@/lib/pages'
import type { Lang } from '@/lib/ui'
import Icon from './Icon'
import SectionHead from './SectionHead'

const grad: Record<string, string> = {
  'ta-1': 'linear-gradient(135deg,#0ea5e9,#4f46e5)',
  'ta-2': 'linear-gradient(135deg,#22d3ee,#0891b2)',
  'ta-3': 'linear-gradient(135deg,#6366f1,#a855f7)',
}

export default function TeamSection({ lang }: { lang: Lang }) {
  const c = aboutContent[lang]
  return (
    <section className="py-20">
      <div className="container-page">
        <SectionHead eyebrow={c.teamEyebrow} title={c.teamTitle} lead={c.teamLead} />

        <div className="grid gap-6 mt-14 lg:grid-cols-3">
          {c.team.map((m, i) => (
            <article
              key={m.title}
              className="card-surface overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/50"
              data-animate
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="h-28 grid place-items-center" style={{ background: grad[m.color] }}>
                <Icon name={m.icon} className="w-11 h-11 text-white/95" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-[1.1rem]">{m.title}</h3>
                <span className="text-brand text-[0.8rem] font-medium">{m.role}</span>
                <p className="text-muted text-[0.88rem] mt-3">{m.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
