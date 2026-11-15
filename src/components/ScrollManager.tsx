import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/** How long a #fragment's element is waited for (a lazily loaded page's chunk, e.g. /privacy#drawing-checks). */
const HASH_WAIT_MS = 3000
const HASH_POLL_MS = 50

/**
 * A new page starts at the top, and a link with a #fragment (the header's Join a room, /#join; the app's
 * /privacy#drawing-checks) scrolls to it once the page has drawn it. A page in its own chunk may not be drawn yet when
 * this runs (a link from another page before the chunk is in), so the fragment's element is looked for again every
 * 50 ms for up to 3 seconds (privacy-anchors-1115); a fragment that names nothing leaves the page at the top. Back and
 * Forward keep the browser's own scroll position.
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : ''
    const jump = () => {
      const el = id ? document.getElementById(id) : null
      if (!el) return false
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' })
      return true
    }
    if (jump()) return
    if (navType !== 'POP') window.scrollTo(0, 0)
    if (!id) return
    const started = Date.now()
    const timer = window.setInterval(() => {
      if (jump() || Date.now() - started > HASH_WAIT_MS) window.clearInterval(timer)
    }, HASH_POLL_MS)
    return () => window.clearInterval(timer)
  }, [pathname, hash, navType])

  return null
}

export default ScrollManager
