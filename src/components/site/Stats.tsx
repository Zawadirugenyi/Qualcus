import { home } from '@/lib/pages'
import type { Lang } from '@/lib/ui'

export default function Stats({ lang }: { lang: Lang }) {
  const stats = home[lang].stats
  return (
    <section className="py-16">
      <div className="container-page">
        <div
          className="card-surface grid grid-cols-2 lg:grid-cols-4 gap-y-10 py-12 px-6 text-center"
          style={{ background: 'linear-gradient(120deg, rgba(14,165,233,0.08), rgba(99,102,241,0.08))' }}
        >
          {stats.map((s, i) => (
            <div key={s.label} data-animate style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="font-display font-extrabold text-[clamp(2.2rem,5vw,3rem)] text-grad leading-none">
                <span data-counter={String(s.value)}>0</span>
                <span>{s.suffix}</span>
              </div>
              <p className="text-muted text-[0.9rem] mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
