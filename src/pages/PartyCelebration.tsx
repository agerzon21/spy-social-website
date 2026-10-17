import { useCallback, useEffect, useRef } from 'react'

// Fireworks and confetti over the party page: every time it opens, and again whenever the headline is tapped.
// A canvas drawn on top of the page (it never takes a tap), removed when the show ends. Skipped for reduced motion.

const COLOURS = ['#ff9500', '#ffd23f', '#fefaea', '#ff5d8f', '#b07cff', '#3ec6ff']

type Bit = {
  x: number; y: number; vx: number; vy: number
  life: number; max: number; colour: string
  kind: 'spark' | 'paper'; size: number; spin: number; angle: number
}

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]

export function useCelebration() {
  const running = useRef(false)

  const play = useCallback(() => {
    if (running.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    running.current = true

    const canvas = document.createElement('canvas')
    canvas.setAttribute('aria-hidden', 'true')
    Object.assign(canvas.style, { position: 'fixed', inset: '0', width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: '1000' })
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    if (!ctx) { canvas.remove(); running.current = false; return }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const fit = () => { canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    fit()
    window.addEventListener('resize', fit)
    const W = () => window.innerWidth
    const H = () => window.innerHeight

    const bits: Bit[] = []
    const burst = (x: number, y: number) => {
      const colour = pick(COLOURS)
      const n = 70
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.2
        const speed = 2.2 + Math.random() * 3.2
        bits.push({ x, y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, life: 0, max: 55 + Math.random() * 30,
          colour: Math.random() < 0.8 ? colour : '#fefaea', kind: 'spark', size: 2 + Math.random() * 1.5, spin: 0, angle: 0 })
      }
    }
    const confetti = (n: number) => {
      for (let i = 0; i < n; i++) {
        const fromLeft = i % 2 === 0
        bits.push({ x: fromLeft ? -10 : W() + 10, y: H() * (0.55 + Math.random() * 0.3),
          vx: (fromLeft ? 1 : -1) * (4 + Math.random() * 6), vy: -(7 + Math.random() * 7),
          life: 0, max: 170 + Math.random() * 60, colour: pick(COLOURS), kind: 'paper',
          size: 6 + Math.random() * 6, spin: (Math.random() - 0.5) * 0.3, angle: Math.random() * Math.PI })
      }
    }

    // The show: confetti cannons from both sides, then four fireworks over the top half.
    const timers = [
      window.setTimeout(() => confetti(140), 0),
      window.setTimeout(() => burst(W() * 0.3, H() * 0.25), 350),
      window.setTimeout(() => burst(W() * 0.72, H() * 0.18), 800),
      window.setTimeout(() => burst(W() * 0.5, H() * 0.32), 1250),
      window.setTimeout(() => confetti(80), 1500),
      window.setTimeout(() => burst(W() * 0.22, H() * 0.15), 1800),
    ]

    let frame = 0
    let started = 0
    const tick = (now: number) => {
      if (!started) started = now
      ctx.clearRect(0, 0, W(), H())
      for (let i = bits.length - 1; i >= 0; i--) {
        const b = bits[i]
        b.life++
        if (b.kind === 'spark') { b.vx *= 0.97; b.vy = b.vy * 0.97 + 0.06 } else { b.vx *= 0.985; b.vy = Math.min(b.vy + 0.18, 3.2); b.angle += b.spin }
        b.x += b.vx
        b.y += b.vy
        const fade = Math.max(0, 1 - b.life / b.max)
        if (fade <= 0 || b.y > H() + 40) { bits.splice(i, 1); continue }
        ctx.globalAlpha = b.kind === 'spark' ? fade : Math.min(1, fade * 3)
        ctx.fillStyle = b.colour
        if (b.kind === 'spark') {
          ctx.beginPath(); ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2); ctx.fill()
        } else {
          ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.angle)
          ctx.fillRect(-b.size / 2, -b.size / 4, b.size, b.size / 2 * Math.abs(Math.cos(b.angle * 2)) + 1)
          ctx.restore()
        }
      }
      ctx.globalAlpha = 1
      if (bits.length || now - started < 2000) { frame = requestAnimationFrame(tick); return }
      stop()
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      timers.forEach((t) => window.clearTimeout(t))
      window.removeEventListener('resize', fit)
      canvas.remove()
      running.current = false
    }
    frame = requestAnimationFrame(tick)
  }, [])

  // Every open of the page: play shortly after it shows.
  useEffect(() => {
    const t = window.setTimeout(play, 300)
    return () => window.clearTimeout(t)
  }, [play])

  return play
}
