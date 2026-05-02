import { Box } from '@chakra-ui/react'
import Header, { HEADER_HEIGHT } from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  isHome?: boolean
}

const Layout = ({ children, isHome = false }: LayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" width="100%">
      {!isHome && <Header />}
      <Box
        as="main"
        flex="1"
        display="flex"
        flexDirection="column"
        width="100%"
        pt={!isHome ? `${HEADER_HEIGHT}px` : 0}
      >
        {children}
      </Box>
      <Footer sticky={isHome} />
    </Box>
  )
}

export default Layout
