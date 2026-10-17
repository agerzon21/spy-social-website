import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import SiteHead from './SiteHead'

interface LayoutProps {
  children: ReactNode
  isHome?: boolean
}

const Layout = ({ children, isHome = false }: LayoutProps) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
    <SiteHead />
    <Header isHome={isHome} />
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>{children}</main>
    <Footer />
  </div>
)

export default Layout
