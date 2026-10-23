'use client'

import { useState } from 'react'
import { faqItems } from '@/lib/pages'
import type { Lang } from '@/lib/ui'

const head = {
  fr: {
    eyebrow: 'Questions fréquentes',
    title: "Vous avez des questions ? <span class='text-grad'>Nous avons les réponses.</span>",
    lead: "Tout ce qu'il faut savoir avant de démarrer votre projet avec Qualcus.",
  },
  en: {
    eyebrow: 'Frequently asked questions',
    title: 'Got questions? <span class="text-grad">We have answers.</span>',
    lead: 'Everything you need to know before starting your project with Qualcus.',
  },
}

export default function FaqSection({ lang, withHeading = true }: { lang: Lang; withHeading?: boolean }) {
  const items = faqItems[lang]
  const h = head[lang]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20">
      <div className="container-page max-w-3xl">
        {withHeading && (
          <div className="text-center mx-auto max-w-2xl mb-12" data-animate>
            <span className="eyebrow">{h.eyebrow}</span>
            <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] mt-3" dangerouslySetInnerHTML={{ __html: h.title }} />
            <p className="text-muted mt-4 text-[1.02rem]">{h.lead}</p>
          </div>
        )}

        <div className="space-y-3">
          {items.map((it, i) => (
            <div
              key={it.q}
              data-faq-item
              className={`card-surface overflow-hidden ${open === i ? 'is-open' : ''}`}
              data-animate
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <button
                type="button"
                data-faq-question
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 font-display font-semibold text-[0.98rem]"
                aria-expanded={open === i}
              >
                <span>{it.q}</span>
                <span className="faq-icon shrink-0 grid place-items-center w-7 h-7 rounded-full border border-[var(--c-line)] text-brand transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div className="faq-answer px-6 text-muted text-[0.9rem]">
                <p className="pb-5">{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
