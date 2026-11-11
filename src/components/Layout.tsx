import type { ReactNode } from 'react'
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
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
