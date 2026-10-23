import type { Lang } from '@/lib/ui'
import Icon from './Icon'

const ITEMS = {
  fr: [
    { label: 'Développement logiciel', icon: 'code' },
    { label: 'Objets connectés IoT', icon: 'cpu' },
    { label: 'Caméras & alarmes', icon: 'shield' },
    { label: 'Domotique', icon: 'bolt' },
    { label: 'Applications mobiles', icon: 'phone' },
    { label: 'Sites web', icon: 'globe' },
    { label: 'Réseaux & sécurité', icon: 'target' },
  ],
  en: [
    { label: 'Software development', icon: 'code' },
    { label: 'Connected devices IoT', icon: 'cpu' },
    { label: 'Cameras & alarms', icon: 'shield' },
    { label: 'Home automation', icon: 'bolt' },
    { label: 'Mobile apps', icon: 'phone' },
    { label: 'Websites', icon: 'globe' },
    { label: 'Networks & security', icon: 'target' },
  ],
} as const

export default function Marquee({ lang }: { lang: Lang }) {
  const items = ITEMS[lang]
  const loop = [...items, ...items]

  return (
    <section className="marquee-band">
      <div className="container-page marquee-inner">
        <span className="marquee-label">{lang === 'fr' ? 'Nos expertises' : 'What we do'}</span>

        <div className="marquee-viewport">
          <span className="marquee-fade marquee-fade-l" aria-hidden="true" />
          <div className="marquee-track">
            {loop.map((it, i) => (
              <span className="marquee-chip" key={`${it.label}-${i}`}>
                <Icon name={it.icon} className="w-4 h-4" />
                {it.label}
              </span>
            ))}
          </div>
          <span className="marquee-fade marquee-fade-r" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
