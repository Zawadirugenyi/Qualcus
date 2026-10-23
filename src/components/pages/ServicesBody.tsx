import PageHero from '@/components/site/PageHero'
import ServicesSection from '@/components/site/ServicesSection'
import Solutions from '@/components/site/Solutions'
import ProcessSection from '@/components/site/ProcessSection'
import CtaBanner from '@/components/site/CtaBanner'
import type { Lang } from '@/lib/ui'

const head = {
  fr: {
    eyebrow: 'Nos services',
    title: "Des solutions complètes, <span class='text-grad'>du code au matériel</span>",
    lead: 'Logiciels sur mesure, objets connectés et sécurité : une seule équipe pour concevoir, installer et maintenir votre technologie.',
  },
  en: {
    eyebrow: 'Our services',
    title: "Complete solutions, <span class='text-grad'>from code to hardware</span>",
    lead: 'Custom software, connected devices and security: one team to design, install and maintain your technology.',
  },
}

export default function ServicesBody({ lang }: { lang: Lang }) {
  const h = head[lang]
  return (
    <>
      <PageHero lang={lang} eyebrow={h.eyebrow} title={h.title} lead={h.lead} />
      <ServicesSection lang={lang} withHeading={false} />
      <Solutions lang={lang} />
      <ProcessSection lang={lang} />
      <CtaBanner lang={lang} />
    </>
  )
}
