import { home } from '@/lib/pages'
import type { Lang } from '@/lib/ui'
import Icon from './Icon'

export default function Sectors({ lang }: { lang: Lang }) {
  const { sectors } = home[lang]
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="text-center mx-auto max-w-2xl mb-14" data-animate>
          <span className="eyebrow">{sectors.eyebrow}</span>
          <p className="font-display font-semibold text-[1.1rem] mt-3 text-muted">{sectors.label}</p>
        </div>

        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sectors.items.map((s, i) => (
            <div
              key={s.title}
              className="card-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 group"
              data-animate
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-brand/20 to-brand2/20 text-brand mb-3 group-hover:from-brand group-hover:to-brand2 group-hover:text-white transition-all">
                <Icon name={s.icon} className="w-5 h-5" />
              </div>
              <strong className="block text-[0.92rem] font-semibold leading-snug">{s.title}</strong>
              <span className="text-muted text-[0.78rem] mt-1 block">{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
