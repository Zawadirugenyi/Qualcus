import { ui, type Lang } from '@/lib/ui'
import { serviceCards } from '@/lib/pages'
import Icon from './Icon'

export default function ServicesSection({ lang, withHeading = true }: { lang: Lang; withHeading?: boolean }) {
  const t = ui[lang]
  const cards = serviceCards[lang]
  return (
    <section className="py-20">
      <div className="container-page">
        {withHeading && (
          <div className="text-center mx-auto max-w-2xl" data-animate>
            <span className="eyebrow">{t.nav.services}</span>
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] mt-3">
              {lang === 'fr' ? (
                <>
                  Trois expertises, <span className="text-grad">une seule équipe</span>
                </>
              ) : (
                <>
                  Three areas of expertise, <span className="text-grad">one single team</span>
                </>
              )}
            </h2>
            <p className="text-muted mt-4 text-[1.02rem]">
              {lang === 'fr'
                ? 'Du logiciel au matériel, nous couvrons toute la chaîne technologique de votre projet.'
                : 'From software to hardware, we cover the entire technology chain of your project.'}
            </p>
          </div>
        )}

        <div className="grid gap-6 mt-14 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <article
              key={c.title}
              className={`group relative card-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/50 ${
                c.featured ? 'lg:-mt-4 lg:mb-4' : ''
              }`}
              data-animate
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {c.badge && (
                <span className="absolute top-6 right-6 text-[0.65rem] font-bold uppercase tracking-wider text-brand bg-brand/10 border border-brand/25 rounded-full px-2.5 py-1">
                  {c.badge}
                </span>
              )}
              <div className={`icon-badge ${c.color}`}>
                <Icon name={c.icon} />
              </div>
              <h3 className="font-display font-bold text-[1.15rem] mt-5">{c.title}</h3>
              <p className="text-muted text-[0.9rem] mt-2.5">{c.text}</p>
              <ul className="checklist mt-5">
                {c.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
