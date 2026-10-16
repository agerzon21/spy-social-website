import { Box, Container, Flex, Grid, Link as ChakraLink, List, ListItem, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo } from 'react'
import { LIVE, ONLINE_SAFETY_TEXT } from '../lib/legalRelease'
import { currentPlatform } from '../lib/platform'
import { PLAY_URL } from '../lib/playUrl'
import { SHOP_URL } from '../lib/shop'
import SocialLinks from './SocialLinks'
import Wordmark from './Wordmark'

// A shade below the page's #2c3252, so the footer reads as its own block on every page and runs on from the
// home hero's darkened bottom edge. Text stays whiteAlpha.700 (6.8:1 on it, F1157 asked for AA or better).
const FOOTER_BG = '#232843'

// Every footer link and the wordmark: plain text, white and underlined on hover, a white ring for the keyboard
// (12:1 on the footer; Chakra's default blue ring is 2.4:1 here).
const FOCUS_RING = {
  outline: '2px solid white',
  outlineOffset: '3px',
  borderRadius: '2px',
  boxShadow: 'none',
}

const linkStyle = {
  fontSize: 'sm',
  color: 'whiteAlpha.700',
  transition: 'color 0.2s',
  _hover: { color: 'white', textDecoration: 'underline', textUnderlineOffset: '3px' },
  _focusVisible: FOCUS_RING,
}

// `to` is a route on this site; `href` leaves it (same tab).
interface FooterLinkItem {
  label: string
  to?: string
  href?: string
}

const FooterLink = ({ label, to, href }: FooterLinkItem) =>
  to ? (
    <ChakraLink as={RouterLink} to={to} {...linkStyle}>{label}</ChakraLink>
  ) : (
    <ChakraLink href={href} {...linkStyle}>{label}</ChakraLink>
  )

const FooterColumn = ({ id, title, links }: { id: string; title: string; links: FooterLinkItem[] }) => (
  <Box as="nav" aria-labelledby={id} minW={0}>
    <Text
      id={id}
      fontSize="xs"
      fontWeight="700"
      letterSpacing="0.12em"
      textTransform="uppercase"
      color="#FFB48C"
      mb={4}
    >
      {title}
    </Text>
    <List spacing={2.5}>
      {links.map((link) => (
        <ListItem key={link.label} lineHeight="1.4">
          <FooterLink {...link} />
        </ListItem>
      ))}
    </List>
  </Box>
)

// Logo and tagline, two labelled link columns, then a bottom bar with the copyright and the social icons.
// Desktop and tablet: the logo left, the columns right. Phones: stacked, the columns two-up.
const Footer = () => {
  // The browser version, on a computer once it's live (LIVE.browserLinks); phones keep the app.
  const showBrowser = useMemo(() => LIVE.browserLinks && currentPlatform() === 'desktop', [])

  const play: FooterLinkItem[] = [
    ...(showBrowser ? [{ label: 'Play in Your Browser', href: PLAY_URL }] : []),
    { label: "What's New", to: '/whats-new' },
    { label: 'Rules', to: '/rules' },
    { label: 'Support', to: '/support' },
    { label: 'Contact', to: '/contact-us' },
    ...(LIVE.merchShop ? [{ label: 'Shop', href: SHOP_URL }] : []),
  ]
  const legal: FooterLinkItem[] = [
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
    { label: 'Child Safety', to: '/child-safety' },
    ...(ONLINE_SAFETY_TEXT ? [{ label: 'Safety', to: '/safety' }] : []),
    { label: 'Delete Account', to: '/delete-account' },
  ]

  return (
    <Box
      as="footer"
      color="whiteAlpha.700"
      width="100%"
      bg={FOOTER_BG}
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
    >
      <Container maxW="container.lg" pt={{ base: 10, md: 14 }} pb={{ base: 6, md: 8 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="flex-start"
          gap={{ base: 9, md: 12 }}
        >
          <Box maxW="320px">
            <ChakraLink
              as={RouterLink}
              to="/"
              aria-label="SpySocial home"
              display="inline-block"
              opacity={0.9}
              transition="opacity 0.2s"
              _hover={{ opacity: 1 }}
              _focusVisible={FOCUS_RING}
            >
              <Wordmark h={{ base: '40px', md: '44px' }} w="auto" />
            </ChakraLink>
            <Text mt={3} fontSize="sm" lineHeight="1.6">
              The party game of social deception.
            </Text>
          </Box>

          <Grid
            templateColumns={{ base: 'repeat(2, minmax(0, 1fr))', md: 'repeat(2, minmax(150px, auto))' }}
            columnGap={{ base: 6, md: 16 }}
            w={{ base: '100%', md: 'auto' }}
          >
            <FooterColumn id="footer-play" title="Play" links={play} />
            <FooterColumn id="footer-legal" title="Legal & Safety" links={legal} />
          </Grid>
        </Flex>

        <Flex
          mt={{ base: 9, md: 12 }}
          pt={5}
          borderTop="1px solid"
          borderColor="whiteAlpha.100"
          direction={{ base: 'column-reverse', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          gap={3}
        >
          <Text fontSize="xs" color="whiteAlpha.700">
            &copy; {new Date().getFullYear()} SpySocial. All rights reserved
          </Text>
          {/* The icons' own padding pulled back, so the glyphs line up with the text edge */}
          <Box mx="-9px">
            <SocialLinks />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
