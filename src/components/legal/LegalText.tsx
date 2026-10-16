import { Heading, Link as ChakraLink, OrderedList, Text, UnorderedList } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// The text pieces of the legal and safety pages. Their look is the theme's (src/theme): section headings in the
// display face over a rule, running text at reading size, links underlined in the link colour.

export const H2 = ({ id, children }: { id?: string; children: ReactNode }) => (
  <Heading as="h2" id={id} size="sm" variant="section">
    {children}
  </Heading>
)

export const H3 = ({ children }: { children: ReactNode }) => (
  <Text textStyle="body" color="ss.text" fontWeight="700" mt={2}>
    {children}
  </Text>
)

export const P = ({ children }: { children: ReactNode }) => <Text textStyle="body">{children}</Text>

export const Bullets = ({ children }: { children: ReactNode }) => (
  <UnorderedList spacing={2} pl={4} textStyle="body">
    {children}
  </UnorderedList>
)

export const Numbered = ({ children }: { children: ReactNode }) => (
  <OrderedList spacing={2} pl={4} textStyle="body">
    {children}
  </OrderedList>
)

/** Bold words inside a sentence, such as a button's name. */
export const B = ({ children }: { children: ReactNode }) => (
  <Text as="span" fontWeight="700" color="ss.text">
    {children}
  </Text>
)

export const PageLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <ChakraLink as={Link} to={to}>
    {children}
  </ChakraLink>
)

export const OutLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <ChakraLink href={href} isExternal>
    {children}
  </ChakraLink>
)

/** support@spysocial.app as a mail link; `subject` fills the subject line. */
export const SupportEmail = ({ subject }: { subject?: string }) => (
  <ChakraLink href={`mailto:support@spysocial.app${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`}>
    support@spysocial.app
  </ChakraLink>
)
