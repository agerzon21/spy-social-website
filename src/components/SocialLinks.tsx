import { HStack, Icon, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { FaInstagram, FaThreads, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'

// Plain outbound links only: nothing is embedded and no third-party script or image loads, so the
// CSP in vercel.json and the Privacy page need no change. The icons are inline SVG from react-icons.
interface SocialAccount {
  name: string
  handle: string
  url: string
  icon: IconType
}

// TODO(discord): add Discord (FaDiscord) once the server has a permanent invite link.
const SOCIAL_ACCOUNTS: SocialAccount[] = [
  { name: 'Instagram', handle: '@spysocial.game', url: 'https://www.instagram.com/spysocial.game', icon: FaInstagram },
  { name: 'TikTok', handle: '@spysocial.game', url: 'https://www.tiktok.com/@spysocial.game', icon: FaTiktok },
  { name: 'YouTube', handle: '@SpySocialGame', url: 'https://www.youtube.com/@SpySocialGame', icon: FaYoutube },
  { name: 'X', handle: '@spysocialgame', url: 'https://x.com/spysocialgame', icon: FaXTwitter },
  { name: 'Threads', handle: '@spysocial.game', url: 'https://www.threads.com/@spysocial.game', icon: FaThreads },
]

const label = (a: SocialAccount) => `SpySocial on ${a.name}`

interface SocialLinksProps {
  // 'icons': a compact icon row (footer). 'list': a titled section of rows (Support pages).
  variant?: 'icons' | 'list'
}

const SocialLinks = ({ variant = 'icons' }: SocialLinksProps) => {
  if (variant === 'icons') {
    return (
      <HStack as="nav" aria-label="Follow SpySocial" spacing={1}>
        {SOCIAL_ACCOUNTS.map((a) => (
          <ChakraLink
            key={a.name}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label(a)}
            title={label(a)}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w="32px"
            h="32px"
            borderRadius="md"
            color="whiteAlpha.500"
            transition="all 0.2s"
            _hover={{ color: 'whiteAlpha.800' }}
          >
            <Icon as={a.icon} boxSize={4} aria-hidden focusable={false} />
          </ChakraLink>
        ))}
      </HStack>
    )
  }

  return (
    <VStack as="section" aria-labelledby="follow-spysocial" spacing={3} align="stretch">
      <Text
        id="follow-spysocial"
        fontSize="xs"
        fontWeight="600"
        textTransform="uppercase"
        letterSpacing="0.08em"
        color="whiteAlpha.400"
      >
        Follow SpySocial
      </Text>
      {SOCIAL_ACCOUNTS.map((a) => (
        <ChakraLink
          key={a.name}
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label(a)}
          _hover={{ textDecoration: 'none' }}
        >
          <HStack
            spacing={3}
            p={4}
            bg="whiteAlpha.50"
            borderRadius="lg"
            border="1px solid"
            borderColor="whiteAlpha.100"
            transition="all 0.2s"
            _hover={{ bg: 'whiteAlpha.100' }}
          >
            <Icon as={a.icon} color="whiteAlpha.600" boxSize={4} aria-hidden focusable={false} />
            <Text fontSize="sm" color="whiteAlpha.700" flex="1">{a.name}</Text>
            <Text fontSize="xs" color="whiteAlpha.400">{a.handle}</Text>
            <Text color="whiteAlpha.300" aria-hidden>&#8599;</Text>
          </HStack>
        </ChakraLink>
      ))}
    </VStack>
  )
}

export default SocialLinks
