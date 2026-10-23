import { home, processSteps } from '@/lib/pages'
import type { Lang } from '@/lib/ui'
import SectionHead from './SectionHead'

export default function ProcessSection({ lang }: { lang: Lang }) {
  const { process } = home[lang]
  const steps = processSteps[lang]
  return (
    <section className="py-20">
      <div className="container-page">
        <SectionHead eyebrow={process.eyebrow} title={process.title} lead={process.lead} />

        <ol className="grid gap-6 mt-14 md:grid-cols-2 lg:grid-cols-4 relative">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="card-surface p-6 relative transition-all duration-300 hover:-translate-y-1 hover:border-brand/50"
              data-animate
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span
                className="grid place-items-center w-12 h-12 rounded-full font-display font-extrabold text-white text-[1.1rem] mb-4"
                style={{ background: 'linear-gradient(135deg,#22d3ee,#0ea5e9 55%,#6366f1)' }}
              >
                {s.n}
              </span>
              <h3 className="font-display font-bold text-[1.05rem]">{s.title}</h3>
              <p className="text-muted text-[0.88rem] mt-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
