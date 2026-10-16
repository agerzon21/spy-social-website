import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  isHome?: boolean
}

const Layout = ({ children, isHome = false }: LayoutProps) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
    <Header isHome={isHome} />
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>{children}</main>
    <Footer />
  </div>
)

export default Layout
