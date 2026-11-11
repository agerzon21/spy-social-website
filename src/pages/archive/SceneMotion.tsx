import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n'

/**
 * A celebration or a local playing as in the app (archive-item-art-1111, owner Nov 11): its loop shot from the app's own
 * preview (the standard agents, no plate; scripts/archive-art/motion.py: one animated WebP, or one per language where
 * the scene has words), over its still picture. The still alone under Reduce Motion, with `still` (the grid, the
 * home's fan, the Market's rows) and while off screen (the loop is taken off the page, so it costs nothing there).
 */
const FILL = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' } as const

export function SceneMotion({ poster, motion, alt, eager = false, still = false, className }: { poster: string; motion: { key: string; langs: string[] } | null | undefined; alt: string; eager?: boolean; still?: boolean; className?: string }) {
  const { lang } = useLang()
  const box = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(false)
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  const plays = !!motion && !still && !reduced
  useEffect(() => {
    if (!plays || !box.current) return
    const io = new IntersectionObserver((es) => setShown(es.some((e) => e.isIntersecting)))
    io.observe(box.current)
    const vis = () => document.hidden && setShown(false)
    document.addEventListener('visibilitychange', vis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', vis)
    }
  }, [plays])
  const own = motion ? (motion.langs.includes('*') ? '' : `.${motion.langs.includes(lang) ? lang : 'en'}`) : ''
  const src = motion ? `/archive/motion/${motion.key}${own}.webp` : null
  // The still in the reader's language where the scene has words (its poster); else the one given.
  const still0 = motion && own ? `/archive/motion/${motion.key}${own}.poster.webp` : poster
  return (
    <span ref={box} style={{ position: 'absolute', inset: 0, display: 'block' }}>
      <img className={className} style={FILL} src={still0} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      {plays && shown && src ? <img className={className} style={FILL} src={src} alt="" aria-hidden decoding="async" /> : null}
    </span>
  )
}
