import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProject } from '@/lib/api'
import { href, projectPath, projectVisuals } from '@/lib/site'
import { setPageMeta } from '@/lib/head'
import type { Lang } from '@/lib/ui'
import Icon from '@/components/site/Icon'
import RichText from '@/components/site/RichText'
import { hasContent } from '@/lib/richText'
import CtaBanner from '@/components/site/CtaBanner'
import NotFoundBody from './NotFoundBody'

const copy = {
  fr: {
    back: 'Toutes les réalisations',
    loading: 'Chargement du projet…',
    overview: 'Le projet',
    resultLabel: 'Résultat',
    noContent:
      "Ce projet est présenté ici en résumé. Contactez-nous pour recevoir l'étude de cas complète, les captures d'écran et les détails techniques.",
    discuss: 'Discuter d’un projet similaire',
    category: { software: 'Logiciel', iot: 'IoT', security: 'Sécurité' } as Record<string, string>,
  },
  en: {
    back: 'All projects',
    loading: 'Loading project…',
    overview: 'The project',
    resultLabel: 'Result',
    noContent:
      'This project is shown here as a summary. Contact us to receive the full case study, screenshots and technical details.',
    discuss: 'Discuss a similar project',
    category: { software: 'Software', iot: 'IoT', security: 'Security' } as Record<string, string>,
  },
} as const

export default function ProjectDetailBody({ lang }: { lang: Lang }) {
  const { slug } = useParams<{ slug: string }>()
  const { project, loading } = useProject(lang, slug)
  const t = copy[lang]

  useEffect(() => {
    if (!project) return
    setPageMeta({
      title: `${project.title} — Qualcus`,
      description: project.text,
      ogImage: project.image || undefined,
      altFr: projectPath('fr', project.slug),
      altEn: projectPath('en', project.slug),
    })
    return () => setPageMeta(null)
  }, [project])

  if (loading) {
    return (
      <section className="pt-40 pb-24">
        <div className="container-page text-center text-muted">{t.loading}</div>
      </section>
    )
  }

  if (!project) {
    return <NotFoundBody lang={lang} />
  }

  const visual = projectVisuals[project.cat] ?? projectVisuals.software
  const catLabel = t.category[project.cat] ?? project.cat

  return (
    <>
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="orb orb-1" style={{ top: '-220px', right: '-100px' }} />
          <div className="orb orb-2" style={{ top: '-200px', left: '-120px', bottom: 'auto' }} />
          <div className="grid-lines" />
        </div>

        <div className="container-page relative z-10">
          <a href={href(lang, '/realisations')} className="inline-flex items-center gap-2 text-muted hover:text-brand text-[0.85rem] font-medium transition-colors" data-animate>
            <Icon name="arrowRight" className="w-4 h-4 rotate-180" />
            {t.back}
          </a>

          <div className="grid gap-10 lg:grid-cols-2 items-center mt-8">
            <div>
              <div className="badge-pill" data-animate>
                <span className="badge-dot" />
                <span className="uppercase tracking-[0.18em] text-[0.72rem] font-semibold">{catLabel}</span>
              </div>
              <h1 className="font-display font-extrabold text-[clamp(1.9rem,4.5vw,3rem)] tracking-[-0.03em] mt-5" data-animate>
                {project.title}
              </h1>
              <p className="text-muted text-[1.05rem] mt-4 max-w-xl" data-animate>
                {project.text}
              </p>

              <div className="flex flex-wrap gap-3 mt-8" data-animate style={{ transitionDelay: '120ms' }}>
                <a href={href(lang, '/contact')} className="btn btn-primary">
                  {t.discuss}
                </a>
                <a href={href(lang, '/realisations')} className="btn btn-ghost">
                  {t.back}
                </a>
              </div>
            </div>

            <div className="card-surface overflow-hidden relative min-h-[280px] grid place-items-center" data-animate style={{ background: project.image ? undefined : visual.grad }}>
              {project.image ? (
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <Icon name={visual.icon} className="w-24 h-24 text-white/90 relative" />
              )}
              {project.tag && (
                <span className="absolute top-4 left-4 text-[0.68rem] font-bold uppercase tracking-wider text-white/95 bg-white/15 backdrop-blur rounded-full px-3 py-1 border border-white/25 z-10">
                  {project.tag}
                </span>
              )}
            </div>
          </div>

          {project.result && (
            <div className="card-surface p-6 mt-10 flex items-center gap-5" data-animate>
              <span className="font-display font-extrabold text-[2.4rem] text-grad leading-none">{project.result}</span>
              <span className="text-muted text-[0.95rem]">
                <strong className="block text-ink font-semibold text-[0.8rem] uppercase tracking-wider mb-1">
                  {t.resultLabel}
                </strong>
                {project.resultText}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="py-14">
        <div className="container-page max-w-3xl">
          <h2 className="eyebrow" data-animate>
            {t.overview}
          </h2>
          {hasContent(project.content) ? (
            <RichText data={project.content} className="mt-5" />
          ) : (
            <p className="text-muted mt-4 text-[1.02rem]" data-animate>
              {t.noContent}
            </p>
          )}
        </div>
      </section>

      <CtaBanner lang={lang} />
    </>
  )
}
