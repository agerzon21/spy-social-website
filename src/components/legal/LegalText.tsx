import { Heading, Link as ChakraLink, Text, UnorderedList } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// The text pieces of the legal and safety pages, in the look the Terms and
// the Privacy Policy use (white headings, whiteAlpha body text, blue links).

export const H2 = ({ id, children }: { id?: string; children: ReactNode }) => (
  <Heading as="h2" id={id} size="sm" color="white" mt={4} scrollMarginTop="80px">
    {children}
  </Heading>
)

export const H3 = ({ children }: { children: ReactNode }) => (
  <Text fontSize="sm" lineHeight="1.8" color="whiteAlpha.800" fontWeight="500">
    {children}
  </Text>
)

export const P = ({ children }: { children: ReactNode }) => (
  <Text fontSize="sm" lineHeight="1.8">
    {children}
  </Text>
)

export const Bullets = ({ children }: { children: ReactNode }) => (
  <UnorderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
    {children}
  </UnorderedList>
)

/** Bold words inside a sentence, such as a button's name. */
export const B = ({ children }: { children: ReactNode }) => (
  <Text as="span" fontWeight="600" color="whiteAlpha.800">
    {children}
  </Text>
)

export const PageLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <ChakraLink as={Link} to={to} color="blue.300" _hover={{ color: 'blue.200' }}>
    {children}
  </ChakraLink>
)

export const OutLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <ChakraLink href={href} isExternal color="blue.300" _hover={{ color: 'blue.200' }}>
    {children}
  </ChakraLink>
)

/** support@spysocial.app as a mail link; `subject` fills the subject line. */
export const SupportEmail = ({ subject }: { subject?: string }) => (
  <ChakraLink
    href={`mailto:support@spysocial.app${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`}
    color="blue.300"
    _hover={{ color: 'blue.200' }}
  >
    support@spysocial.app
  </ChakraLink>
)
