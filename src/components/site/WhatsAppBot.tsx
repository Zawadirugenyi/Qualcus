'use client'

import { useEffect, useRef, useState } from 'react'
import { ui, type Lang } from '@/lib/ui'
import { SITE } from '@/lib/site'
import Icon from './Icon'

type Msg = { who: 'bot' | 'user'; html: string }

export default function WhatsAppBot({ lang }: { lang: Lang }) {
  const b = ui[lang].bot
  const [open, setOpen] = useState(false)
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const scroller = useRef<HTMLDivElement>(null)

  const menu = [
    { key: 'services', label: b.menu.services },
    { key: 'quote', label: b.menu.quote },
    { key: 'contact', label: b.menu.contact },
    { key: 'agent', label: b.menu.agent },
  ]

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [messages, typing])

  function botReply(html: string) {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { who: 'bot', html }])
    }, 700)
  }

  function toggle() {
    const next = !open
    setOpen(next)
    if (next && !started) {
      setStarted(true)
      setTimeout(() => setMessages((m) => [...m, { who: 'bot', html: b.hello }]), 250)
    }
  }

  function pick(m: { key: string; label: string }) {
    setMessages((ms) => [...ms, { who: 'user', html: m.label }])
    const ans = (b.answers as Record<string, string>)[m.key] || b.answers.fallback
    botReply(ans)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const v = input.trim()
    if (!v) return
    setMessages((m) => [...m, { who: 'user', html: v.replace(/</g, '&lt;') }])
    setInput('')
    botReply(b.answers.fallback)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-[min(360px,calc(100vw-2.5rem))] rounded-3xl overflow-hidden border border-[var(--c-line)] shadow-[0_30px_80px_rgba(2,10,30,0.55)]"
          style={{ background: 'var(--c-panel)' }}
          role="dialog"
          aria-label={b.name}
        >
          <div className="flex items-center gap-3 px-4 py-3.5" style={{ background: 'linear-gradient(110deg,#0ea5e9,#6366f1)' }}>
            <span className="grid place-items-center w-11 h-11 rounded-full bg-white/95 overflow-hidden shrink-0">
              <img src="/QUALCUS.png" alt="Qualcus" className="w-full h-full object-contain p-0.5" />
            </span>
            <div className="flex-1 min-w-0 text-white">
              <strong className="block text-[0.95rem] leading-tight">{b.name}</strong>
              <span className="flex items-center gap-1.5 text-[0.72rem] opacity-90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                {b.status}
              </span>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-white/90 hover:text-white text-xl leading-none px-1" aria-label="Fermer">
              &times;
            </button>
          </div>

          <div ref={scroller} className="h-[330px] overflow-y-auto p-4 space-y-3 text-[0.85rem]" style={{ background: 'var(--c-canvas)' }}>
            <div className="text-center text-[0.68rem] uppercase tracking-wider text-muted">{b.today}</div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.who === 'user' ? 'justify-end' : 'justify-start'}`} style={{ animation: 'msgIn .35s ease both' }}>
                {m.who === 'user' ? (
                  <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-br-md text-white" style={{ background: 'linear-gradient(110deg,#0ea5e9,#6366f1)' }} dangerouslySetInnerHTML={{ __html: m.html }} />
                ) : (
                  <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-md border border-[var(--c-line)] whitespace-pre-line leading-relaxed" style={{ background: 'var(--c-panel)' }} dangerouslySetInnerHTML={{ __html: m.html }} />
                )}
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-md border border-[var(--c-line)] flex gap-1" style={{ background: 'var(--c-panel)' }}>
                  <span style={{ animation: 'typing 1s infinite' }}>•</span>
                  <span style={{ animation: 'typing 1s infinite .15s' }}>•</span>
                  <span style={{ animation: 'typing 1s infinite .3s' }}>•</span>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {menu.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => pick(m)}
                className="text-[0.78rem] px-3 py-1.5 rounded-full border border-[var(--c-line)] text-muted hover:text-brand hover:border-brand transition-colors"
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="px-4 pb-3">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-[0.82rem] font-semibold text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400/20 transition-colors"
            >
              <Icon name="whatsapp" className="w-4 h-4" /> {b.continue}
            </a>
          </div>

          <form onSubmit={submit} className="flex items-center gap-2 px-3 py-3 border-t border-[var(--c-line)]" style={{ background: 'var(--c-panel)' }}>
            <input
              type="text"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={b.placeholder}
              className="flex-1 min-w-0 rounded-full border border-[var(--c-line)] bg-canvas px-4 py-2.5 text-[0.85rem] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors"
            />
            <button type="submit" className="grid place-items-center w-10 h-10 rounded-full shrink-0 text-white" style={{ background: 'linear-gradient(110deg,#0ea5e9,#6366f1)' }} aria-label="Envoyer">
              <Icon name="arrowRight" className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        className="relative grid place-items-center w-14 h-14 rounded-full text-white shadow-[0_14px_36px_rgba(14,165,233,0.5)] transition-transform hover:scale-105"
        style={{ background: 'linear-gradient(110deg,#0ea5e9,#6366f1)' }}
        aria-label={b.name}
      >
        <span className="absolute inset-0 rounded-full" style={{ background: 'rgba(14,165,233,0.55)', animation: 'waPulse 2.4s ease-out infinite' }} />
        <Icon name="chat" className="w-6 h-6 relative z-10" />
      </button>
    </div>
  )
}
