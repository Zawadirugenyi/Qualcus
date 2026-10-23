import Hero from '@/components/site/Hero'
import Guarantees from '@/components/site/Guarantees'
import Marquee from '@/components/site/Marquee'
import Sectors from '@/components/site/Sectors'
import ServicesSection from '@/components/site/ServicesSection'
import Stats from '@/components/site/Stats'
import Solutions from '@/components/site/Solutions'
import ProjectsSection from '@/components/site/ProjectsSection'
import TechSection from '@/components/site/TechSection'
import Testimonials from '@/components/site/Testimonials'
import ProcessSection from '@/components/site/ProcessSection'
import CtaBanner from '@/components/site/CtaBanner'
import { useProjects } from '@/lib/api'
import type { Lang } from '@/lib/ui'

export default function HomeBody({ lang }: { lang: Lang }) {
  const { items } = useProjects(lang, 6)

  return (
    <>
      <Hero lang={lang} />
      <Guarantees lang={lang} />
      <Marquee lang={lang} />
      <Sectors lang={lang} />
      <ServicesSection lang={lang} />
      <Stats lang={lang} />
      <Solutions lang={lang} />
      <ProjectsSection lang={lang} items={items} />
      <TechSection lang={lang} />
      <Testimonials lang={lang} />
      <ProcessSection lang={lang} />
      <CtaBanner lang={lang} />
    </>
  )
}
