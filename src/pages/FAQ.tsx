import { Box, Container, Heading, Text, VStack, Link as ChakraLink, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, UnorderedList, ListItem } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useT, type Strings } from '../i18n'
import { rich } from '../i18n/rich'
import { LIVE } from '../lib/legalRelease'
import SocialLinks from '../components/SocialLinks'

interface FAQSection {
  title: string
  items: { question: string; answer: ReactNode }[]
}

const Strong = ({ children }: { children: ReactNode }) => (
  <Text as="span" fontWeight="700" color="ss.text">{children}</Text>
)

/** A translated line with its <b> parts in bold. */
const r = (text: string) => rich(text, { b: (c) => <Strong>{c}</Strong> })

const Bullets = ({ lines }: { lines: string[] }) => (
  <UnorderedList spacing={1.5}>
    {lines.map((line) => (
      <ListItem key={line}>{r(line)}</ListItem>
    ))}
  </UnorderedList>
)

/** The questions in their sections; what the app doesn't do yet stays off with its LIVE switch. */
function faqSections(f: Strings['faq']): FAQSection[] {
  return [
    {
      title: f.sections.start,
      items: [
        { question: f.startGame.q, answer: <Bullets lines={f.startGame.a} /> },
        { question: f.firstTime.q, answer: <Bullets lines={f.firstTime.a} /> },
        {
          question: f.howMany.q,
          answer: (
            <Box>
              <Text mb={2}>{f.howMany.intro}</Text>
              <Bullets lines={f.howMany.a} />
            </Box>
          ),
        },
      ],
    },
    {
      title: f.sections.modes,
      items: [{ question: f.gameModes.q, answer: <Bullets lines={f.gameModes.a} /> }],
    },
    {
      title: f.sections.features,
      items: [
        { question: f.notebook.q, answer: <Bullets lines={f.notebook.a} /> },
        {
          question: f.hints.q,
          answer: <Bullets lines={[...(LIVE.onePool ? [f.hints.onePool] : f.hints.gameLanguage), f.hints.reload]} />,
        },
        { question: f.poke.q, answer: <Text>{f.poke.a}</Text> },
        { question: f.leave.q, answer: <Text>{f.leave.a}</Text> },
      ],
    },
    {
      title: f.sections.sharing,
      items: [
        { question: f.share.q, answer: <Bullets lines={f.share.a} /> },
        { question: f.link.q, answer: <Bullets lines={f.link.a} /> },
      ],
    },
    {
      title: f.sections.languages,
      items: [
        {
          question: f.languages.q,
          answer: (
            <Bullets
              lines={[
                f.languages.setLanguage,
                ...(LIVE.onePool
                  ? [...f.languages.onePool, LIVE.autoTranslation ? f.languages.chatAuto : f.languages.chatTap]
                  : [f.languages.hostPicks]),
                f.languages.parity,
                ...(LIVE.onePool ? [] : [f.languages.differs]),
              ]}
            />
          ),
        },
      ],
    },
    {
      title: f.sections.host,
      items: [
        {
          question: f.customize.q,
          answer: (
            <Bullets
              lines={[
                f.customize.a[0],
                LIVE.onePool ? f.customize.turnOnly : f.customize.languageAndTurn,
                ...f.customize.a.slice(1),
              ]}
            />
          ),
        },
        { question: f.endEarly.q, answer: <Text>{r(f.endEarly.a)}</Text> },
      ],
    },
    {
      title: f.sections.account,
      items: [
        { question: f.needAccount.q, answer: <Bullets lines={f.needAccount.a} /> },
        { question: f.forgot.q, answer: <Bullets lines={f.forgot.a} /> },
      ],
    },
    {
      title: f.sections.trouble,
      items: [
        { question: f.code.q, answer: <Bullets lines={f.code.a} /> },
        { question: f.connection.q, answer: <Bullets lines={f.connection.a} /> },
        { question: f.offline.q, answer: <Text>{f.offline.a}</Text> },
      ],
    },
  ]
}

const FAQ = () => {
  const f = useT().faq
  return (
    <Box
      flex="1"
      color="ss.body"
      pt={{ base: 10, md: 16 }}
      pb={{ base: 16, md: 24 }}
      bgImage="linear-gradient(180deg, var(--ss-band) 0, var(--ss-page) 360px)"
    >
      <Container maxW="760px" px={{ base: 4, md: 6 }}>
        <VStack spacing={10} align="stretch" sx={{ '& li::marker': { color: 'var(--ss-accent-text)' } }}>
          <Heading as="h1" size="lg">{f.title}</Heading>

          {faqSections(f).map((section, idx) => (
            <Box key={idx}>
              <Text textStyle="label" mb={3}>
                {section.title}
              </Text>
              <Accordion allowMultiple borderTop="var(--ss-hairline) solid" borderColor="ss.line">
                {section.items.map((item, itemIdx) => (
                  <AccordionItem key={itemIdx} borderTop="none" borderBottom="var(--ss-hairline) solid" borderColor="ss.line">
                    <AccordionButton
                      minH="56px"
                      px={1}
                      py={3}
                      gap={3}
                      transition="background-color 0.15s"
                      _hover={{ bg: 'ss.surface' }}
                      _expanded={{ color: 'ss.highlight' }}
                      _focusVisible={{ boxShadow: 'none', outline: '3px solid var(--ss-focus)', outlineOffset: '-3px' }}
                    >
                      <Box flex="1" textAlign="start" fontWeight="600" fontSize={{ base: '17px', md: '18px' }} lineHeight="1.35" color="inherit">
                        {item.question}
                      </Box>
                      <AccordionIcon color="ss.highlight" boxSize={6} />
                    </AccordionButton>
                    <AccordionPanel pb={5} pt={1} px={1} textStyle="body" color="ss.body">
                      {item.answer}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          ))}

          <Text textStyle="body" color="ss.muted">
            {f.needMore}{' '}
            <ChakraLink as={Link} to="/contact-us">support@spysocial.app</ChakraLink>
          </Text>

          <SocialLinks variant="list" />
        </VStack>
      </Container>
    </Box>
  )
}

export default FAQ
