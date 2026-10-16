import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * A new page starts at the top, and a link with a #fragment (the header's Join a room, /#join) scrolls to it once
 * the page has drawn it. Back and Forward keep the browser's own scroll position.
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' })
        return
      }
    }
    if (navType !== 'POP') window.scrollTo(0, 0)
  }, [pathname, hash, navType])

  return null
}

export default ScrollManager
