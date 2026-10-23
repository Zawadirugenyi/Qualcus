import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function SiteScripts() {
  const pathname = useLocation().pathname

  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>('[data-animate]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).style.transitionDelay = `${Math.min(i * 60, 300)}ms`
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    revealEls.forEach((el) => io.observe(el))

    const observeAnimate = (el: Element) => {
      if (el instanceof HTMLElement && el.hasAttribute('data-animate') && !el.classList.contains('visible')) {
        io.observe(el)
      }
    }

    const counters = document.querySelectorAll<HTMLElement>('[data-counter]')
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const target = parseInt(el.dataset.counter || '0', 10)
          const dur = 1600
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.round(target * eased).toString()
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          co.unobserve(el)
        })
      },
      { threshold: 0.4 },
    )
    counters.forEach((c) => co.observe(c))

    const observeCounter = (el: Element) => {
      if (el instanceof HTMLElement && el.hasAttribute('data-counter')) co.observe(el)
    }

    // Catch elements added later (async data, client-side navigation)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          observeAnimate(node)
          observeCounter(node)
          node.querySelectorAll('[data-animate]').forEach(observeAnimate)
          node.querySelectorAll('[data-counter]').forEach(observeCounter)
        })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    const bar = document.getElementById('scroll-progress')
    const backTop = document.getElementById('back-top')
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? (h.scrollTop / max) * 100 : 0
      if (bar) bar.style.width = p + '%'
      if (backTop) {
        const show = h.scrollTop > 500
        backTop.style.opacity = show ? '1' : '0'
        backTop.style.pointerEvents = show ? 'auto' : 'none'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const backTopClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })
    backTop?.addEventListener('click', backTopClick)

    const hero = document.getElementById('hero')
    const spot = document.getElementById('spotlight')
    const onMove = (e: MouseEvent) => {
      if (!hero || !spot) return
      const r = hero.getBoundingClientRect()
      spot.style.transform = `translate(${e.clientX - r.left}px,${e.clientY - r.top}px) translate(-50%,-50%)`
      spot.style.opacity = '1'
    }
    const onLeave = () => {
      if (spot) spot.style.opacity = '0'
    }
    hero?.addEventListener('mousemove', onMove)
    hero?.addEventListener('mouseleave', onLeave)

    return () => {
      io.disconnect()
      co.disconnect()
      mo.disconnect()
      window.removeEventListener('scroll', onScroll)
      backTop?.removeEventListener('click', backTopClick)
      hero?.removeEventListener('mousemove', onMove)
      hero?.removeEventListener('mouseleave', onLeave)
    }
  }, [pathname])

  return (
    <>
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 h-[3px] z-[70] w-0"
        style={{ background: 'linear-gradient(90deg,#22d3ee,#0ea5e9,#818cf8)' }}
      />
      <button
        id="back-top"
        type="button"
        className="fixed bottom-6 left-6 z-[55] grid place-items-center w-11 h-11 rounded-full border border-[var(--c-line)] bg-panel text-muted hover:text-brand hover:border-brand transition-all opacity-0 pointer-events-none"
        aria-label="Haut de page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  )
}
