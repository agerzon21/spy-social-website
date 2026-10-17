import { Box, Heading, Text, Link as ChakraLink, ListItem, OrderedList } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AfterDeletionLaw, AfterDeletionList } from '../components/legal/AfterDeletion'
import { LanguageNotice } from '../components/legal/LanguageNotice'
import { deletedAlso, deletedSummary } from '../lib/legalText'
import { PRIVACY, PRIVACY_LAST_UPDATED, avatarsLive } from '../lib/legalRelease'
import { LegalPage } from '../components/legal/LegalPage'
import { useLang, useT } from '../i18n'
import { formatDate, rich } from '../i18n/rich'

const B = ({ children }: { children: ReactNode }) => (
  <Text as="span" fontWeight="600" color="ss.text">
    {children}
  </Text>
)
const Email = () => (
  <ChakraLink as={Link} to="/contact-us">
    support@spysocial.app
  </ChakraLink>
)

// Google Play's account deletion link. How to delete is in the page's language (src/i18n: deleteAccount); what a
// deletion removes and keeps comes from components/legal/AfterDeletion and lib/legalText, the same English text as
// the Privacy Policy, so the two never differ: in another language a note says those sections are English only.
const DeleteAccount: React.FC = () => {
  const { lang, language } = useLang()
  const strings = useT()
  const t = strings.deleteAccount
  const parts = { b: (c: ReactNode) => <B>{c}</B>, email: () => <Email />, link: (c: ReactNode) => <ChakraLink as={Link} to="/privacy">{c}</ChakraLink> }
  const english = lang === 'en' ? {} : { lang: 'en', dir: 'ltr' }

  return (
    <LegalPage title={t.title} updated={strings.common.lastUpdated(formatDate(PRIVACY_LAST_UPDATED, language.locale))}>
      <Text textStyle="body">{rich(t.intro, parts)}</Text>

      <Heading as="h2" size="sm" variant="section">{t.appTitle}</Heading>
      <OrderedList spacing={2} ps={4} textStyle="body">
        {t.steps({ avatars: avatarsLive(PRIVACY), oldApps: PRIVACY.oldAppsInUse }).map((step) => (
          <ListItem key={step}>{rich(step, parts)}</ListItem>
        ))}
      </OrderedList>
      <Text textStyle="body">{t.atOnce}</Text>

      <Heading as="h2" size="sm" variant="section">{t.guestTitle}</Heading>
      <Text textStyle="body">{rich(t.guest(PRIVACY.purchases), parts)}</Text>

      <Heading as="h2" size="sm" variant="section">{t.noAppTitle}</Heading>
      <Text textStyle="body">{rich(t.noApp, parts)}</Text>

      <LanguageNotice kind="sections" />

      <Heading as="h2" size="sm" variant="section">{t.deletedTitle}</Heading>
      <Text textStyle="body" {...english}>
        Your account and the personal data linked to it: {deletedSummary()}.{deletedAlso()}
      </Text>

      <Heading as="h2" size="sm" variant="section">{t.staysTitle}</Heading>
      <Box w="100%" {...english}>
        <AfterDeletionList />
        <Box mt={5}>
          <AfterDeletionLaw />
        </Box>
      </Box>
      <Text textStyle="body">{rich(t.details, parts)}</Text>
    </LegalPage>
  )
}

export default DeleteAccount
