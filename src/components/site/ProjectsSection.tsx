'use client'

import { useMemo, useState } from 'react'
import { home, projectFilters } from '@/lib/pages'
import type { Lang } from '@/lib/ui'
import { projectPath, projectVisuals } from '@/lib/site'
import Icon from './Icon'
import SectionHead from './SectionHead'

export type ProjectItem = {
  id: string
  slug: string
  cat: 'software' | 'iot' | 'security'
  tag?: string
  title: string
  text: string
  result?: string
  resultText?: string
  image?: string | null
}

export default function ProjectsSection({
  lang,
  items,
  withHeading = true,
}: {
  lang: Lang
  items: ProjectItem[]
  withHeading?: boolean
}) {
  const { projects: proj } = home[lang]
  const filters = projectFilters[lang]
  const [active, setActive] = useState('all')

  const visible = useMemo(
    () => (active === 'all' ? items : items.filter((p) => p.cat === active)),
    [active, items],
  )

  return (
    <section className="py-20">
      <div className="container-page">
        {withHeading && <SectionHead eyebrow={proj.eyebrow} title={proj.title} lead={proj.lead} />}

        <div className="flex flex-wrap justify-center gap-2.5 mt-12" data-animate>
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              data-filter={f.key}
              onClick={() => setActive(f.key)}
              className={`text-[0.85rem] font-medium px-4 py-2 rounded-full border border-[var(--c-line)] transition-colors ${
                active === f.key ? 'text-brand border-brand bg-brand/10' : 'text-muted hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => {
            const v = projectVisuals[p.cat] ?? projectVisuals.software
            return (
              <a
                key={p.id}
                href={projectPath(lang, p.slug)}
                className="card-surface overflow-hidden group block transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/50"
                data-cat={p.cat}
                data-animate
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="relative h-44 grid place-items-center overflow-hidden" style={{ background: p.image ? undefined : v.grad }}>
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 opacity-25"
                        style={{
                          backgroundImage: 'radial-gradient(rgba(255,255,255,.5) 1px, transparent 1px)',
                          backgroundSize: '22px 22px',
                        }}
                      />
                      <Icon name={v.icon} className="w-16 h-16 text-white/90 relative group-hover:scale-110 transition-transform duration-500" />
                    </>
                  )}
                  {p.tag && (
                    <span className="absolute top-4 left-4 text-[0.68rem] font-bold uppercase tracking-wider text-white/95 bg-white/15 backdrop-blur rounded-full px-3 py-1 border border-white/25 z-10">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-[1.1rem]">{p.title}</h3>
                  <p className="text-muted text-[0.88rem] mt-2">{p.text}</p>
                  {(p.result || p.resultText) && (
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[var(--c-line)]">
                      <span className="font-display font-extrabold text-[1.35rem] text-grad">{p.result}</span>
                      <span className="text-muted text-[0.8rem]">{p.resultText}</span>
                    </div>
                  )}
                  <span className="inline-flex items-center gap-1.5 mt-4 text-brand text-[0.85rem] font-semibold">
                    {lang === 'fr' ? 'Voir le projet' : 'View project'}
                    <Icon name="arrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
