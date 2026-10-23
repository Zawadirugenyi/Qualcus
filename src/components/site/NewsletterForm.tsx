'use client'

import { useState } from 'react'
import type { Lang } from '@/lib/ui'
import { ui } from '@/lib/ui'
import { submitLead } from '@/lib/api'

export default function NewsletterForm({ lang }: { lang: Lang }) {
  const t = ui[lang]
  const [status, setStatus] = useState<'idle' | 'busy' | 'sent' | 'error'>('idle')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('busy')
    try {
      await submitLead({
        email: String(data.get('email') || ''),
        source: 'newsletter',
        locale: lang,
        botField: String(data.get('botField') || ''),
      })
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="mt-5" onSubmit={submit} noValidate>
      <label className="block text-[0.85rem] font-semibold mb-2">{t.footer.newsletterTitle}</label>
      <p className="text-muted text-[0.8rem] mb-3">{t.footer.newsletterText}</p>
      <input type="text" name="botField" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder={lang === 'fr' ? 'Votre e-mail' : 'Your e-mail'}
          className="flex-1 min-w-0 rounded-full border border-[var(--c-line)] bg-panel px-4 py-2.5 text-[0.85rem] text-ink placeholder:text-muted focus:border-brand outline-none transition-colors"
        />
        <button type="submit" className="btn btn-primary !py-2.5 !px-5 !text-[0.85rem]" disabled={status === 'busy'}>
          {t.cta.subscribe}
        </button>
      </div>
      {status === 'sent' && <p className="text-[0.82rem] text-emerald-400 mt-2">{t.footer.newsletterOk}</p>}
      {status === 'error' && <p className="text-[0.82rem] text-red-400 mt-2">{t.footer.newsletterErr}</p>}
    </form>
  )
}
