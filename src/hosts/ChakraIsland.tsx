import { useMemo, type ReactNode } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MotionConfig } from 'framer-motion'
import ChakraModeBridge from '../theme/ChakraModeBridge'
import { useLang } from '../i18n'
import { theme } from '../theme'
import { colorModeManager } from '../theme/mode'
import Ledger from '../pages/Ledger'
import Transparency from '../pages/Transparency'
import NotFound from '../pages/NotFound'

/**
 * Chakra on the Archive's and the Market's hosts (speed-1111), only for the www pages they also serve (the Ledger, the
 * Transparency page) and the 404 page: the hosts' own pages never load it. One chunk with those three pages, so a
 * visit to one of them fetches Chakra and the page together. Chakra's reset and global styles are the ones
 * hosts/base.css already wears, and its colour mode follows the header's switch (ChakraModeBridge).
 */
function Island({ children }: { children: ReactNode }) {
  const rtl = useLang().language.rtl
  const themed = useMemo(() => (rtl ? extendTheme({ direction: 'rtl' }, theme) : theme), [rtl])
  return (
    <ChakraProvider theme={themed} colorModeManager={colorModeManager}>
      <ChakraModeBridge />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ChakraProvider>
  )
}

const PAGES = { ledger: Ledger, transparency: Transparency, notFound: NotFound }

export default function ChakraPage({ page }: { page: keyof typeof PAGES }) {
  const Page = PAGES[page]
  return (
    <Island>
      <Page />
    </Island>
  )
}
