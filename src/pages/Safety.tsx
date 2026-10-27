import { Box, Flex, Icon, Link as ChakraLink, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiFlag, FiLogOut, FiMessageCircle, FiSlash } from 'react-icons/fi'
import { Callout } from '../components/legal/Callout'
import { ChildSafetyContacts } from '../components/legal/ChildSafetyContacts'
import { InfoTable, type InfoRow } from '../components/legal/InfoTable'
import { B, Bullets, H2, H3, OutLink, P, PageLink, SupportEmail } from '../components/legal/LegalText'
import { UK_SECTION_NUMBER } from '../components/legal/UkOnlineSafety'
import { LEGAL_LAST_UPDATED, LIVE, avatarsLive, photosShown } from '../lib/legalRelease'
import { LegalPage } from '../components/legal/LegalPage'
import { useLang, useT } from '../i18n'
import { formatDate, rich, type Parts } from '../i18n/rich'

// The safety page (www.spysocial.app/safety): for players 13 to 17, for
// parents and carers, child-safety contacts and support lines (UK Online
// Safety Act records, gap G7; Ofcom's Protection of Children Code F1). It
// says only what the app does today: what depends on a release follows
// src/lib/legalRelease.ts, like the legal pages. Helpline details checked on
// each organization's own site on 2026-10-04. Translated (src/i18n: safety),
// with a note that the English version applies.

/** One numbered step with an icon, for the teens' section. */
const Step = ({ n, icon, title, children }: { n: number; icon: IconType; title: string; children: ReactNode }) => (
  <Flex
    w="100%"
    gap={4}
    bg="ss.surface"
    border="var(--ss-card-border) solid"
    borderColor="ss.line"
    borderRadius="var(--ss-radius-card)"
    boxShadow="var(--ss-shadow-card)"
    p={4}
    align="flex-start"
  >
    <Box
      w="40px"
      h="40px"
      borderRadius="var(--ss-radius-control)"
      bg="ss.accent"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      aria-hidden
    >
      <Icon as={icon} color="ss.onAccent" boxSize={5} />
    </Box>
    <Box>
      <Text textStyle="body" fontWeight="700" color="ss.text" mb={1}>
        {n}. {title}
      </Text>
      <Text textStyle="body">
        {children}
      </Text>
    </Box>
  </Flex>
)

const Safety: React.FC = () => {
  // Photos other players can see or players can add: none since 2026-10-20 (photosPrivate).
  const photos = photosShown(LIVE)
  const avatars = avatarsLive(LIVE)
  const { language } = useLang()
  const strings = useT()
  const t = strings.safety
  const p = t.parents

  const b: Parts['b'] = (c) => <B>{c}</B>
  const hash = (id: string) => (c: ReactNode) => <ChakraLink href={`#${id}`}>{c}</ChakraLink>
  const page = (to: string) => (c: ReactNode) => <PageLink to={to}>{c}</PageLink>
  const out = (href: string) => (c: ReactNode) => <OutLink href={href}>{c}</OutLink>
  const r = (text: string, parts: Parts = {}) => rich(text, { b, ...parts })

  const helplines: InfoRow[] = [
    { label: 'Childline', note: t.helplines.childline.note, cells: [r(t.helplines.childline.text, { link: out('https://www.childline.org.uk') })] },
    { label: 'Samaritans', note: t.helplines.samaritans.note, cells: [r(t.helplines.samaritans.text, { link: out('https://www.samaritans.org') })] },
    { label: '988 Suicide & Crisis Lifeline', note: t.helplines.lifeline.note, cells: [r(t.helplines.lifeline.text, { link: out('https://988lifeline.org') })] },
    { label: 'Find A Helpline', note: t.helplines.findHelpline.note, cells: [r(t.helplines.findHelpline.text, { link: out('https://findahelpline.com') })] },
  ]

  return (
    <LegalPage translated title={t.title} updated={strings.common.lastUpdated(formatDate(LEGAL_LAST_UPDATED, language.locale))}>

      <P>{r(t.intro, { link: hash('teens'), link2: hash('parents'), link3: hash('child-safety'), link4: hash('help') })}</P>

      <Callout title={t.danger.title}>
        <Text textStyle="body">{t.danger.text}</Text>
      </Callout>

      <H2 id="teens">{t.teens.title}</H2>
      <P>{t.teens.intro}</P>
      <VStack spacing={3} w="100%" align="stretch">
        <Step n={1} icon={FiLogOut} title={t.teens.leave.title}>
          {r(t.teens.leave.text)}
          {LIVE.playOnline && ` ${t.teens.leave.online(LIVE.onePool)}`}
        </Step>
        <Step n={2} icon={FiSlash} title={t.teens.block.title}>
          {r(t.teens.block.text)}
        </Step>
        <Step n={3} icon={FiFlag} title={t.teens.report.title}>
          {r(t.teens.report.text)}
        </Step>
        <Step n={4} icon={FiMessageCircle} title={t.teens.tell.title}>
          {r(t.teens.tell.text, { link: hash('help') })}
        </Step>
      </VStack>

      <H3>{t.teens.afterTitle}</H3>
      <Bullets>
        {t.teens.after.map((line) => (
          <ListItem key={line}>{line}</ListItem>
        ))}
      </Bullets>

      <H3>{t.teens.neverTitle}</H3>
      <Bullets>
        {t.teens.never.map((line) => (
          <ListItem key={line}>{line}</ListItem>
        ))}
      </Bullets>
      <P>{r(t.teens.neverWhat)}</P>

      <H2 id="parents">{p.title}</H2>
      <P>{r(p.intro, { link: page('/terms') })}</P>

      <H3>{p.hasTitle}</H3>
      <Bullets>
        <ListItem>{r(p.chat)}</ListItem>
        <ListItem>{r(p.sketch)}</ListItem>
        <ListItem>{r(p.names({ avatars, photos }))}</ListItem>
        <ListItem>{r(p.private)}</ListItem>
        <ListItem>{LIVE.onePool ? r(p.publicOnePool) : r(p.public(LIVE.playOnline))}</ListItem>
        {LIVE.customPacks && <ListItem>{r(p.customPacks(LIVE.communityPacks))}</ListItem>}
        {LIVE.intercepts && <ListItem>{r(p.intercepts)}</ListItem>}
        {LIVE.purchases && <ListItem>{r(LIVE.membershipsOnly ? p.buyMembers : p.buy)}</ListItem>}
      </Bullets>

      <H3>{p.hasNotTitle}</H3>
      <Bullets>
        <ListItem>{p.noDms}</ListItem>
        <ListItem>{p.noFriends}</ListItem>
        <ListItem>{p.noVoice(photos)}</ListItem>
        <ListItem>{p.noLocation}</ListItem>
      </Bullets>

      <H3>{p.safeTitle}</H3>
      <Bullets>
        <ListItem>
          {r(p.age({ gate: LIVE.ageGateEveryone, under13Deletion: LIVE.under13Deletion, storeSignals: LIVE.storeAgeSignals }))}
        </ListItem>
        <ListItem>{r(p.publicRooms)}</ListItem>
        <ListItem>{r(p.filter)}</ListItem>
        <ListItem>{r(p.reports, { link: page('/rules') })}</ListItem>
        {LIVE.drawingCheck && <ListItem>{r(p.drawingCheck)}</ListItem>}
      </Bullets>

      {LIVE.purchases && (
        <>
          <H3>{p.buyTitle}</H3>
          <P>{p.buyText}</P>
        </>
      )}

      <H3>{p.deleteTitle}</H3>
      <OrderedList spacing={2} ps={4} textStyle="body">
        {p.deleteSteps({ avatars, oldApps: LIVE.oldAppsInUse }).map((step) => (
          <ListItem key={step}>{r(step)}</ListItem>
        ))}
      </OrderedList>
      <P>{r(p.deleteEmail, { email: () => <SupportEmail subject={p.deleteSubject} />, link: page('/delete-account') })}</P>

      <H3>{p.contactTitle}</H3>
      <P>{r(p.contact(UK_SECTION_NUMBER), { email: () => <SupportEmail />, link: page('/terms') })}</P>

      <H2 id="child-safety">{t.contactsTitle}</H2>
      <ChildSafetyContacts localized />
      <P>{r(t.contactsAfter, { link: page('/child-safety') })}</P>

      <H2 id="help">{t.helpTitle}</H2>
      <P>{t.helpIntro}</P>
      <InfoTable head={[t.tableWho, t.tableHow]} rows={helplines} firstWidth="30%" />

      <P>{r(t.seeAlso, { link: page('/rules'), link2: page('/terms'), link3: page('/privacy') })}</P>
    </LegalPage>
  )
}

export default Safety
