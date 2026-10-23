import PageHero from '@/components/site/PageHero'
import ProjectsSection from '@/components/site/ProjectsSection'
import Stats from '@/components/site/Stats'
import Testimonials from '@/components/site/Testimonials'
import CtaBanner from '@/components/site/CtaBanner'
import { useProjects } from '@/lib/api'
import type { Lang } from '@/lib/ui'

const head = {
  fr: {
    eyebrow: 'Réalisations',
    title: "Des projets concrets, <span class='text-grad'>des résultats mesurables</span>",
    lead: 'Découvrez comment nous avons aidé entreprises, écoles et familles à digitaliser leurs opérations et à sécuriser leurs sites.',
  },
  en: {
    eyebrow: 'Projects',
    title: "Concrete projects, <span class='text-grad'>measurable results</span>",
    lead: 'See how we helped companies, schools and families digitize their operations and secure their sites.',
  },
}

export default function ProjectsBody({ lang }: { lang: Lang }) {
  const h = head[lang]
  const { items } = useProjects(lang, 100)

  return (
    <>
      <PageHero lang={lang} eyebrow={h.eyebrow} title={h.title} lead={h.lead} />
      <ProjectsSection lang={lang} items={items} withHeading={false} />
      <Stats lang={lang} />
      <Testimonials lang={lang} />
      <CtaBanner lang={lang} />
    </>
  )
}
