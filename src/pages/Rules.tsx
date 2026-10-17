import { Heading, Link as ChakraLink, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLang, useT } from '../i18n'
import { formatDate, rich } from '../i18n/rich'
import { LEGAL_LAST_UPDATED, LIVE, ONLINE_SAFETY_TEXT, photosInUse } from '../lib/legalRelease'
import { LegalPage } from '../components/legal/LegalPage'

const PageLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <ChakraLink as={Link} to={to}>
    {children}
  </ChakraLink>
)

// The community rules the app links to (www.spysocial.app/rules), part of the
// Terms of Service. Short on purpose: the app shows the same rules; this page
// adds what counts, what happens, child safety and how to appeal. Translated
// (src/i18n: rules), with a note that the English version applies.
const Rules: React.FC = () => {
  const photos = photosInUse(LIVE)
  const { language } = useLang()
  const strings = useT()
  const t = strings.rules
  const tools = { messages: LIVE.messageReports, drawings: LIVE.drawingCheck }

  return (
    <LegalPage
      translated
      title={t.title}
      updated={strings.common.lastUpdated(formatDate(LEGAL_LAST_UPDATED, language.locale))}
    >
      <Text textStyle="body">
        {rich(t.intro({ onePool: LIVE.onePool, photos }), { link: (c) => <PageLink to="/terms">{c}</PageLink> })}
      </Text>

      <Heading as="h2" size="sm" variant="section">
        {t.kind.title}
      </Heading>
      <UnorderedList textStyle="body" spacing={1}>
        <ListItem>{t.kind.hate}</ListItem>
        <ListItem>{t.kind.sexual(photos)}</ListItem>
        <ListItem>{t.kind.threats}</ListItem>
        {ONLINE_SAFETY_TEXT && <ListItem>{t.kind.selfHarm}</ListItem>}
      </UnorderedList>

      <Heading as="h2" size="sm" variant="section">
        {t.bluff.title}
      </Heading>
      <UnorderedList textStyle="body" spacing={1}>
        <ListItem>{t.bluff.lying}</ListItem>
        <ListItem>{t.bluff.cheating}</ListItem>
        <ListItem>{t.bluff.leaving}</ListItem>
        {LIVE.playOnline && <ListItem>{t.bluff.online(LIVE.onePool)}</ListItem>}
      </UnorderedList>

      <Heading as="h2" size="sm" variant="section">
        {t.privacy.title}
      </Heading>
      <UnorderedList textStyle="body" spacing={1}>
        <ListItem>{t.privacy.personal}</ListItem>
        <ListItem>{t.privacy.spam}</ListItem>
        <ListItem>{t.privacy.minors}</ListItem>
      </UnorderedList>

      <Heading as="h2" size="sm" variant="section">
        {t.reports.title}
      </Heading>
      <Text textStyle="body">{t.reports.text(tools)}</Text>

      <Heading as="h2" size="sm" variant="section">
        {t.child.title}
      </Heading>
      <Text textStyle="body">
        {rich(t.child.text, {
          email: () => <ChakraLink href={`mailto:support@spysocial.app?subject=${encodeURIComponent(t.child.subject)}`}>support@spysocial.app</ChakraLink>,
          link: (c) => (
            <ChakraLink href="https://report.cybertip.org" isExternal>
              {c}
            </ChakraLink>
          ),
          link2: (c) => <PageLink to="/child-safety">{c}</PageLink>,
        })}
      </Text>

      <Heading as="h2" size="sm" variant="section">
        {t.breaking.title}
      </Heading>
      <Text textStyle="body">{t.breaking.text}</Text>
      {LIVE.drawingCheck && <Text textStyle="body">{t.breaking.drawings}</Text>}

      <Heading as="h2" size="sm" variant="section">
        {t.age.title}
      </Heading>
      <Text textStyle="body">{t.age.text}</Text>

      <Heading as="h2" size="sm" variant="section">
        {t.appeal.title}
      </Heading>
      <Text textStyle="body">
        {rich(t.appeal.text, {
          email: () => <ChakraLink href="mailto:support@spysocial.app">support@spysocial.app</ChakraLink>,
          link: (c) => <PageLink to="/terms">{c}</PageLink>,
          link2: (c) => <PageLink to="/privacy">{c}</PageLink>,
        })}
      </Text>
    </LegalPage>
  )
}

export default Rules
