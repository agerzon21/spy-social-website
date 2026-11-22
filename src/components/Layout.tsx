import { Suspense, type ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import SiteHead from './SiteHead'
import { useT } from '../i18n'
import s from './shell.module.css'

interface LayoutProps {
  children: ReactNode
  isHome?: boolean
}

/** Moves focus past the header to the page (the skip link; the page's own scroll and history stay as they are). */
const toMain = (e: React.MouseEvent) => {
  const main = document.getElementById('main')
  if (!main) return
  e.preventDefault()
  main.focus()
}

/**
 * The page's frame: its <head> (SiteHead), the skip link, the header, the page and the footer.
 *
 * The page waits for its chunk INSIDE the frame (nav-blank-1122). Every route draws this same Layout, so a link to a
 * page whose chunk isn't in yet updates the frame and suspends only the page's part. Before, the page suspended up to
 * the app's boundary, and React hid the whole frame while it waited: hiding runs a class component's unmount, and
 * react-helmet-async's (2.0.5) then drops its tags for good (it never adds them back when the frame is shown again).
 * So after the first link <html> had no lang or dir, the title and canonical stayed the old page's, and the built
 * HTML's guard (scripts/prerender.mjs: #root[data-pre] hidden unless <html lang> is its language) left the page blank.
 */
const Layout = ({ children, isHome = false }: LayoutProps) => {
  const t = useT()
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <SiteHead />
      {/* WCAG 2.4.1 (a11y-1111): the first Tab stop, out of sight until it has focus. */}
      <a href="#main" className={s.skip} onClick={toMain}>
        {t.header.skip}
      </a>
      <Header isHome={isHome} />
      <main id="main" tabIndex={-1} className={s.main} style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Suspense fallback={<div style={{ flex: 1 }} />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
