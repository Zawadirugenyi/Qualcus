import { home, serviceCards } from '@/lib/pages'
import { ui, type Lang } from '@/lib/ui'
import { href } from '@/lib/site'
import Icon from './Icon'

const METRICS = {
  fr: [
    { label: 'Capteurs connectés', value: '128' },
    { label: 'Caméras en ligne', value: '24/24' },
    { label: 'Menaces bloquées', value: '1 452' },
  ],
  en: [
    { label: 'Connected sensors', value: '128' },
    { label: 'Cameras online', value: '24/24' },
    { label: 'Threats blocked', value: '1,452' },
  ],
} as const

const BARS = [38, 64, 46, 82, 58, 94, 72]
const WAVE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const CAMERAS = Array.from({ length: 18 }, (_, i) => i < 15)

export default function Hero({ lang }: { lang: Lang }) {
  const { hero, stats } = home[lang]
  const t = ui[lang].cta
  const modules = serviceCards[lang]
  const metrics = METRICS[lang]
  const proof = stats.slice(0, 3)
  const titleHtml = hero.title.replace(/<br\s*\/?>/gi, ' ')

  return (
    <section id="hero" className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="hero-aurora" />
        <div className="grid-lines" />
        <div className="spotlight" id="spotlight" />
      </div>

      <div className="container-page relative z-10 flex flex-col items-center text-center">
        <div className="badge-pill" data-animate>
          <span className="badge-dot" />
          <span>{hero.badge}</span>
        </div>

        <h1
          className="hero-title mt-7"
          data-animate
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />

        <p className="hero-sub mt-3" data-animate dangerouslySetInnerHTML={{ __html: hero.sub }} />

        <p className="hero-lead mt-6" data-animate>
          {hero.lead}
        </p>

        <div className="hero-actions mt-9" data-animate>
          <a href={href(lang, '/contact')} className="btn btn-primary">
            {t.quote}
            <Icon name="arrowRight" className="w-4 h-4" />
          </a>
          <a href={href(lang, '/realisations')} className="btn btn-ghost">
            {t.seeProjects}
          </a>
        </div>

        <div className="hero-proof mt-9" data-animate>
          {proof.map((s) => (
            <div className="hero-proof-item" key={s.label}>
              <span className="hero-proof-value">
                <span data-counter={String(s.value)}>0</span>
                <span>{s.suffix}</span>
              </span>
              <span className="hero-proof-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page relative z-10 mt-16" data-animate>
        <div className="hero-console">
          <div className="hero-console-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="hero-console-url">console.qualcus.com</span>
            <span className="hero-console-live">
              <i />
              {lang === 'fr' ? 'en direct' : 'live'}
            </span>
          </div>

          <div className="hero-console-body">
            {modules.map((m, idx) => (
              <div className="hero-module" key={m.title}>
                <span className={`icon-badge ${m.color}`}>
                  <Icon name={m.icon} />
                </span>
                <h3 className="mt-4">{m.title}</h3>
                <p>{m.text}</p>

                {idx === 0 && (
                  <div className="hero-bars" aria-hidden="true">
                    {BARS.map((h, i) => (
                      <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 120}ms` }} />
                    ))}
                  </div>
                )}

                {idx === 1 && (
                  <div className="hero-wave" aria-hidden="true">
                    {WAVE.map((i) => (
                      <span key={i} style={{ animationDelay: `${i * 110}ms` }} />
                    ))}
                  </div>
                )}

                {idx === 2 && (
                  <div className="hero-grid-dots" aria-hidden="true">
                    {CAMERAS.map((on, i) => (
                      <span className={on ? 'on' : ''} key={i} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hero-console-foot">
            {metrics.map((m) => (
              <span className="hero-metric" key={m.label}>
                <span className="ok">●</span>
                {m.label} : <strong>{m.value}</strong>
              </span>
            ))}
          </div>
        </div>

        <div className="hero-float hero-float-l" aria-hidden="true">
          <Icon name="shield" className="w-4 h-4" />
          {lang === 'fr' ? 'Surveillance 24/7' : '24/7 monitoring'}
        </div>
        <div className="hero-float hero-float-r" aria-hidden="true">
          <Icon name="bolt" className="w-4 h-4" />
          {lang === 'fr' ? 'Installation rapide' : 'Fast deployment'}
        </div>
      </div>
    </section>
  )
}
