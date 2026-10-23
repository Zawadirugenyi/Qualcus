import PageHero from '@/components/site/PageHero'
import FaqSection from '@/components/site/FaqSection'
import CtaBanner from '@/components/site/CtaBanner'
import type { Lang } from '@/lib/ui'

const head = {
  fr: {
    eyebrow: 'FAQ',
    title: "Questions <span class='text-grad'>fréquentes</span>",
    lead: 'Des réponses claires avant de vous lancer. Notre équipe reste disponible pour tout le reste.',
  },
  en: {
    eyebrow: 'FAQ',
    title: "Frequently asked <span class='text-grad'>questions</span>",
    lead: 'Clear answers before you get started. Our team stays available for everything else.',
  },
}

export default function FaqBody({ lang }: { lang: Lang }) {
  const h = head[lang]
  return (
    <>
      <PageHero lang={lang} eyebrow={h.eyebrow} title={h.title} lead={h.lead} />
      <FaqSection lang={lang} withHeading={false} />
      <CtaBanner lang={lang} />
    </>
  )
}
