'use client'

import { useState } from 'react'
import { contactInfo } from '@/lib/pages'
import { ui, type Lang } from '@/lib/ui'
import { submitLead } from '@/lib/api'
import Icon from './Icon'

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = ui[lang].cta
  const f = contactInfo[lang].form
  const [status, setStatus] = useState<'idle' | 'busy' | 'sent' | 'error'>('idle')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('busy')
    try {
      await submitLead({
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        phone: String(data.get('phone') || ''),
        service: String(data.get('service') || ''),
        message: String(data.get('message') || ''),
        source: 'contact',
        locale: lang,
        botField: String(data.get('botField') || ''),
      })
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'rounded-xl border border-[var(--c-line)] bg-canvas px-4 py-3 text-[0.9rem] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors'

  return (
    <form className="grid gap-5" onSubmit={submit} noValidate>
      <input
        type="text"
        name="botField"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-[0.85rem] font-semibold">{f.name}</span>
          <input type="text" name="name" required placeholder={f.namePh} className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className="text-[0.85rem] font-semibold">{f.email}</span>
          <input type="email" name="email" required placeholder={f.emailPh} className={inputClass} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-[0.85rem] font-semibold">{f.phone}</span>
          <input type="tel" name="phone" placeholder={f.phonePh} className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className="text-[0.85rem] font-semibold">{f.service}</span>
          <select name="service" className={inputClass}>
            {f.services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-[0.85rem] font-semibold">{f.message}</span>
        <textarea name="message" rows={5} required placeholder={f.messagePh} className={`${inputClass} resize-y`} />
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status === 'busy'}>
          {status === 'busy' ? t.sending : t.send}
        </button>
        <span className="text-muted text-[0.8rem] flex items-center gap-2">
          <Icon name="shield" className="w-4 h-4 text-brand" />
          {f.note}
        </span>
      </div>
      {status === 'sent' && <p className="text-[0.9rem] text-emerald-400">{f.sent}</p>}
      {status === 'error' && <p className="text-[0.9rem] text-red-400">{f.error}</p>}
    </form>
  )
}
