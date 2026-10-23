import PageHero from '@/components/site/PageHero'
import TechSection from '@/components/site/TechSection'
import Sectors from '@/components/site/Sectors'
import CtaBanner from '@/components/site/CtaBanner'
import { techNote } from '@/lib/pages'
import type { Lang } from '@/lib/ui'

const head = {
  fr: {
    eyebrow: 'Technologies',
    title: "La bonne technologie, <span class='text-grad'>pour la bonne réalité</span>",
    lead: "Nous maîtrisons une large gamme d'outils et choisissons chaque brique en fonction de votre budget, de votre connectivité et de vos objectifs.",
  },
  en: {
    eyebrow: 'Technologies',
    title: 'The right technology, <span class="text-grad">for the right reality</span>',
    lead: 'We master a broad range of tools and choose each building block based on your budget, connectivity and goals.',
  },
}

export default function TechBody({ lang }: { lang: Lang }) {
  const h = head[lang]
  return (
    <>
      <PageHero lang={lang} eyebrow={h.eyebrow} title={h.title} lead={h.lead} />
      <TechSection lang={lang} withHeading={false} />

      <section className="pb-4">
        <div className="container-page">
          <p className="card-surface p-6 text-muted text-[0.95rem] max-w-3xl mx-auto text-center" data-animate dangerouslySetInnerHTML={{ __html: techNote[lang] }} />
        </div>
      </section>

      <Sectors lang={lang} />
      <CtaBanner lang={lang} />
    </>
  )
}
