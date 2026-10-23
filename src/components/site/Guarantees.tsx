import { home } from '@/lib/pages'
import type { Lang } from '@/lib/ui'
import Icon from './Icon'

export default function Guarantees({ lang }: { lang: Lang }) {
  const items = home[lang].guarantees
  return (
    <section className="py-10 border-y border-[var(--c-line)] bg-subtle">
      <div className="container-page grid gap-6 grid-cols-2 lg:grid-cols-4">
        {items.map((g, i) => (
          <div className="flex items-center gap-3.5" key={g.title} data-animate style={{ transitionDelay: `${i * 70}ms` }}>
            <div className="grid place-items-center w-12 h-12 rounded-xl bg-brand/10 text-brand shrink-0">
              <Icon name={g.icon} className="w-6 h-6" />
            </div>
            <div>
              <strong className="block text-[0.95rem] font-semibold">{g.title}</strong>
              <span className="text-muted text-[0.8rem]">{g.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
