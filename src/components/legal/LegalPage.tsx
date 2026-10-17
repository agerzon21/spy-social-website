import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { LanguageNotice } from './LanguageNotice'

/**
 * The frame every legal and safety page shares (Privacy, Terms, Community Rules, Safety, Child Safety, Delete
 * Account): the title, the "Last updated" line under a rule, then the page's passages in one column, sized for
 * reading (about 70 characters a line on a desk).
 * `english`: the page's words are English only for now (the legal pages): in another language the note at the top
 * says so, and the page reads left to right, in English, whatever the site's language. `translated`: a translated
 * page whose English version binds, with the same kind of note (LanguageNotice).
 */
export const LegalPage = ({
  title,
  updated,
  english = false,
  translated = false,
  children,
}: {
  title: ReactNode
  updated: ReactNode
  english?: boolean
  translated?: boolean
  children: ReactNode
}) => (
  <Box
    flex="1"
    color="ss.body"
    pt={{ base: 10, md: 16 }}
    pb={{ base: 16, md: 24 }}
    bgImage="linear-gradient(180deg, var(--ss-band) 0, var(--ss-page) 360px)"
  >
    <Container maxW="760px" px={{ base: 4, md: 6 }}>
      {(english || translated) && <LanguageNotice kind={english ? 'english' : 'translated'} />}
      <Box {...(english ? { lang: 'en', dir: 'ltr' } : {})}>
        <Box pb={6} mb={8} borderBottom="var(--ss-hairline) solid" borderColor="ss.lineStrong" position="relative">
          <Heading as="h1" size="lg">
            {title}
          </Heading>
          <Text textStyle="meta" mt={4}>
            {updated}
          </Text>
          {/* A CSS logical side (not Chakra's insetStart, which follows the theme's direction): it sits at the start of the
              title whichever way the page reads. */}
          <Box position="absolute" style={{ insetInlineStart: 0 }} bottom="-2px" w="56px" h="3px" bg="ss.accent" aria-hidden />
        </Box>
        <VStack
          spacing={5}
          align="start"
          // The title's rule already opens the page: a first section heading needs no second one. No passage is
          // wider than the column, so a long address (the Privacy Policy's providers) wraps on a phone.
          sx={{
            '& li::marker': { color: 'var(--ss-accent-text)' },
            '& > h2:first-of-type:first-child': { borderTop: 0, pt: 0, mt: 0 },
            '& > *': { maxW: '100%' },
          }}
        >
          {children}
        </VStack>
      </Box>
    </Container>
  </Box>
)
