import PageHero from '@/components/site/PageHero'
import TeamSection from '@/components/site/TeamSection'
import ProcessSection from '@/components/site/ProcessSection'
import CtaBanner from '@/components/site/CtaBanner'
import Icon from '@/components/site/Icon'
import { aboutContent, home } from '@/lib/pages'
import type { Lang } from '@/lib/ui'

export default function AboutBody({ lang }: { lang: Lang }) {
  const c = aboutContent[lang]
  const stats = home[lang].stats

  return (
    <>
      <PageHero lang={lang} eyebrow={c.eyebrow} title={c.title} />

      <section className="pb-10">
        <div className="container-page grid gap-12 lg:grid-cols-2 items-center">
          <div data-animate>
            <p className="text-muted text-[1rem] leading-relaxed">{c.p1}</p>
            <p className="text-muted text-[1rem] leading-relaxed mt-4">{c.p2}</p>

            <div className="grid gap-4 mt-8">
              {c.values.map((v) => (
                <div key={v.title} className="flex items-start gap-3">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-brand/10 text-brand shrink-0 mt-0.5">
                    <Icon name="check" className="w-4 h-4" />
                  </span>
                  <div>
                    <strong className="block text-[0.95rem] font-semibold">{v.title}</strong>
                    <span className="text-muted text-[0.85rem]">{v.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-8" data-animate style={{ transitionDelay: '100ms' }}>
            <h3 className="font-display font-bold text-[1.05rem] mb-4">
              {lang === 'fr' ? "Notre stack en un coup d'œil" : 'Our stack at a glance'}
            </h3>
            <div className="grid gap-3">
              {c.stack.map((s) => (
                <div key={s} className="flex items-center gap-3 text-[0.88rem] text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                  {s}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[var(--c-line)] text-center">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="font-display font-extrabold text-[1.5rem] text-grad">
                    <span data-counter={String(s.value)}>0</span>
                    {s.suffix}
                  </div>
                  <div className="text-muted text-[0.72rem] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TeamSection lang={lang} />
      <ProcessSection lang={lang} />
      <CtaBanner lang={lang} />
    </>
  )
}
