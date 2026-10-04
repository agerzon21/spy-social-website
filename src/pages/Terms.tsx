import { Box, Container, Heading, Link as ChakraLink, ListItem, OrderedList, Text, UnorderedList, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// ---------------------------------------------------------------------------
// Owner choices: set these before publishing. Until ageRule and
// governingState are set, the page is a draft: it says so at the top and
// shows every option boxed and labeled. When publishing, also set
// LAST_UPDATED and raise app_config.terms_version so everyone agrees again.
// ---------------------------------------------------------------------------
type AgeRule = 'thirteen-plus' | 'under-13-private-rooms'

const OWNER_CHOICES: {
  /**
   * 'thirteen-plus': everyone, guests included, must be 13 or older (Option A,
   * the release audit's recommendation; the app then asks every player's
   * birth year before the first game).
   * 'under-13-private-rooms': players under 13 may play private rooms only
   * (Option B, how the app works today).
   */
  ageRule: AgeRule | null
  /** The US state whose law governs these Terms and whose courts hear disputes, e.g. 'New York'. */
  governingState: string | null
  /** true once buying packs and membership ships in the app. */
  purchasesLive: boolean
  /** Optional: the legal name of the person or company that runs SpySocial. */
  operator: string | null
} = {
  ageRule: null,
  governingState: null,
  purchasesLive: false,
  operator: null,
}

/** The day this version is published. */
const LAST_UPDATED = 'October 3, 2026'

const isDraft = OWNER_CHOICES.ageRule === null || OWNER_CHOICES.governingState === null

const H2 = ({ children }: { children: ReactNode }) => (
  <Heading as="h2" size="sm" color="white" mt={4}>
    {children}
  </Heading>
)

const H3 = ({ children }: { children: ReactNode }) => (
  <Text fontSize="sm" lineHeight="1.8" color="whiteAlpha.800" fontWeight="500">
    {children}
  </Text>
)

const P = ({ children }: { children: ReactNode }) => (
  <Text fontSize="sm" lineHeight="1.8">
    {children}
  </Text>
)

const Bullets = ({ children }: { children: ReactNode }) => (
  <UnorderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
    {children}
  </UnorderedList>
)

const PageLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <ChakraLink as={Link} to={to} color="blue.300" _hover={{ color: 'blue.200' }}>
    {children}
  </ChakraLink>
)

const OutLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <ChakraLink href={href} isExternal color="blue.300" _hover={{ color: 'blue.200' }}>
    {children}
  </ChakraLink>
)

const SupportEmail = () => <PageLink to="/contact-us">support@spysocial.app</PageLink>

/** Something the owner still has to fill in; only reachable while the page is a draft. */
const Blank = ({ children }: { children: ReactNode }) => (
  <Text as="span" color="orange.300" fontWeight="700">
    {children}
  </Text>
)

/**
 * A passage that depends on an owner choice. On the published page it shows
 * only when chosen; while the page is a draft it is boxed and labeled.
 */
const OwnerOption = ({ label, chosen, children }: { label: string; chosen: boolean; children: ReactNode }) => {
  if (!isDraft) return chosen ? <>{children}</> : null
  return (
    <Box w="100%" borderWidth="1px" borderStyle="dashed" borderColor="orange.300" borderRadius="md" p={4}>
      <Text fontSize="xs" fontWeight="700" color="orange.300" mb={3}>
        {label}
      </Text>
      <VStack spacing={4} align="start">
        {children}
      </VStack>
    </Box>
  )
}

const Terms: React.FC = () => {
  const state = OWNER_CHOICES.governingState ?? <Blank>[STATE: owner to choose]</Blank>
  const we = OWNER_CHOICES.operator ? `${OWNER_CHOICES.operator}, the operator of SpySocial` : 'SpySocial'

  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={5} align="start">
          <Box>
            <Heading as="h1" size="lg" color="white" mb={2}>Terms of Service for SpySocial</Heading>
            <Text fontSize="xs" color="whiteAlpha.400">
              {isDraft ? 'Draft, not in effect' : `Last Updated: ${LAST_UPDATED}`}
            </Text>
          </Box>

          {isDraft && (
            <Box w="100%" bg="orange.900" borderLeftWidth="4px" borderColor="orange.300" borderRadius="md" p={4}>
              <Text fontSize="sm" lineHeight="1.8" color="orange.100" fontWeight="600">
                Draft for review. These Terms are not in effect yet.
              </Text>
              <Text fontSize="sm" lineHeight="1.8" color="orange.100">
                Before publishing, set OWNER_CHOICES at the top of src/pages/Terms.tsx: the age rule (Option A or B
                in section 2), the governing state (section 17), and purchasesLive once buying ships (section 9).
                The boxed passages are the options.
              </Text>
            </Box>
          )}

          <P>
            These Terms of Service ("Terms") are the rules for using SpySocial: the SpySocial app, our website at
            spysocial.app, and everything we offer through them. "We", "us" and "our" mean {we}. "You" means you, the
            player. Please read them: they include limits on what we're responsible for.
          </P>

          <Box w="100%" bg="whiteAlpha.50" borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="md" p={4}>
            <Text fontSize="sm" lineHeight="1.8" color="whiteAlpha.800" fontWeight="600" mb={2}>The short version</Text>
            <Bullets>
              <ListItem>Be kind and play fair, and follow our Community Rules. We don't tolerate objectionable content or abusive players.</ListItem>
              <ListItem>What you add (your name, photo, messages and drawings) stays yours, but other players see it, and you let us use it to run SpySocial.</ListItem>
              <ListItem>Public rooms put you in games with people you don't know. Keep your personal information to yourself.</ListItem>
              <ListItem>If you break the rules, we can remove your content and limit or ban your account.</ListItem>
              <ListItem>SpySocial is provided as it is, and our responsibility is limited as far as the law allows.</ListItem>
            </Bullets>
            <Text fontSize="xs" lineHeight="1.8" color="whiteAlpha.500" mt={2}>
              This summary is only a guide. The full Terms below are what apply.
            </Text>
          </Box>

          <H2>1. Accepting These Terms</H2>
          <P>
            By using SpySocial, or by tapping Agree when the app asks you to, you accept these Terms. Our{' '}
            <PageLink to="/rules">Community Rules</PageLink> are part of these Terms. Our{' '}
            <PageLink to="/privacy">Privacy Policy</PageLink> explains how we handle your personal data. If you don't
            accept these Terms, please don't use SpySocial.
          </P>

          <H2>2. Who Can Use SpySocial</H2>
          <OwnerOption
            label="Option A · 13 and older only (the release audit's recommendation)"
            chosen={OWNER_CHOICES.ageRule === 'thirteen-plus'}
          >
            <P>
              You must be at least 13 years old to use SpySocial. The app asks for your birth year before your first
              game, and you must answer truthfully. If you're under 13, you can't use SpySocial, and if we learn that
              an account belongs to someone under 13, we'll delete it.
            </P>
          </OwnerOption>
          <OwnerOption
            label="Option B · Under 13 in private rooms only (how the app works today)"
            chosen={OWNER_CHOICES.ageRule === 'under-13-private-rooms'}
          >
            <P>
              Public rooms and events are for players 13 and older. Players under 13 may use SpySocial only in
              private rooms with people they know, and only with a parent's or guardian's permission. The app asks
              for your birth year before your first public room or event, and you must answer truthfully. If you tell
              us you're under 13, you can't join public rooms or events, or add a profile photo.
            </P>
          </OwnerOption>
          <P>
            If you're under 18, or under the age of majority where you live, you need a parent's or guardian's
            permission to use SpySocial and to buy anything in it. Your parent or guardian accepts these Terms for you
            and is responsible for how you use SpySocial. You can't use SpySocial if we've banned you, or if the law
            where you live doesn't allow you to.
          </P>

          <H2>3. Your Account</H2>
          <H3>Guests and saved accounts</H3>
          <P>
            You can play as a guest without giving us an email address. A guest account lives on your device: signing
            out of it deletes it for good, and you may lose it if you delete the app or lose your device. To keep your
            name, progress and packs on any device, save your account with an email address and a password. Public
            rooms and events need a saved account with a confirmed email address.
          </P>
          <H3>Keeping your account safe</H3>
          <P>
            Keep your password to yourself. You're responsible for what happens on your account. If you think someone
            else has used it, change your password and tell us.
          </P>
          <H3>Rules for accounts</H3>
          <Bullets>
            <ListItem>Your account is for you alone. Don't share, sell or give it to anyone, and don't use someone else's.</ListItem>
            <ListItem>Give true information, including your birth year.</ListItem>
            <ListItem>Your display name and username must follow the Community Rules. We may change or remove a name that doesn't.</ListItem>
            <ListItem>Don't create another account to get around a limit, a penalty or someone's block.</ListItem>
          </Bullets>

          <H2>4. Playing SpySocial</H2>
          <P>
            SpySocial is a party game of bluffing and deduction, with games such as Spy Talk and Spy Sketch. Every
            player uses their own device, whether you're in the same place or far apart.
          </P>
          <H3>Private rooms</H3>
          <P>
            A private room is for people you invite with its code, a link or a QR code. Anyone who has the code or the
            link can join, so share it only with people you want to play with. The host of a private room can remove
            a player, who then can't come back unless the host allows it.
          </P>
          <H3>Fair play</H3>
          <P>
            Bluffing and lying about your role are part of the game, and never a reason to report anyone. Cheating
            isn't: don't reveal the secret word or location, don't team up with other players outside the game, don't
            play in one game with more than one account, and don't set up games just to collect XP or rewards. We may
            remove XP, levels, achievements or rewards that were earned by cheating.
          </P>

          <H2>5. Public Rooms and Events</H2>
          <P>
            Public rooms are open to players you don't know. Anyone who meets the requirements can find them in the
            app and join: a saved account with a confirmed email address, being 13 or older, and agreeing to the
            Community Rules. In a public room, players can vote to remove a player or to end a game.
          </P>
          <P>
            Events are public games we schedule for a set time, with settings and packs we choose. We may change, move
            or cancel an event, limit how many players can join it, and decide who hosts it.
          </P>
          <P>
            Be careful with people you don't know. Don't share personal information, such as your real name, address,
            phone number or social media handles, and use Block, Report or Leave whenever something feels wrong. We
            may limit who can use public rooms and events (for example by age, region or language), and we may switch
            them off.
          </P>

          <H2>6. Your Content</H2>
          <P>
            "Your content" means everything you add to SpySocial: your display name, username, profile photo and any
            room code you choose; your chat messages, including in the spy chat and the chat for players who are out;
            the questions and answers you type; your Spy Sketch drawings; and the reports you send.
          </P>
          <H3>You own it, and you let us use it</H3>
          <P>
            You keep ownership of your content. To run SpySocial, we need your permission to use it, so you give us a
            worldwide, non-exclusive, royalty-free license to store, copy, send, show, translate and adapt it (for
            example, resize a photo or translate a message), and to let other players see it. This includes showing
            it to the players in your room, in room lists and game results, and to the people who review reports. The
            license ends when your content is deleted from SpySocial, except for copies we keep as our Privacy Policy
            describes (for example, content attached to a report). We won't use your photo or your messages in our
            advertising without asking you first.
          </P>
          <H3>Your responsibility</H3>
          <P>
            You're responsible for your content. Only add content you have the right to share (for example, don't
            upload a photo of someone else without their permission), and make sure it follows these Terms and the
            Community Rules. Other players can see, remember and take screenshots of what you share in a room, and we
            can't control what they do with it, so think before you share.
          </P>
          <H3>Other players' content</H3>
          <P>
            Content from other players belongs to them. We don't check everything before it appears and we're not
            responsible for it, but we act on what's reported to us.
          </P>
          <H3>Ideas and feedback</H3>
          <P>If you send us ideas or suggestions, we may use them freely, without owing you anything.</P>

          <H2>7. Community Rules and Zero Tolerance</H2>
          <P>
            Our <PageLink to="/rules">Community Rules</PageLink> are part of these Terms. They apply to names, photos,
            chat, drawings and how you play, in public and private rooms. We have zero tolerance for objectionable
            content and abusive players. Don't post, send, draw or do anything that:
          </P>
          <Bullets>
            <ListItem>is hateful or harassing, insults or targets other players, or attacks anyone for who they are</ListItem>
            <ListItem>is sexual or shows nudity</ListItem>
            <ListItem>threatens or promotes violence, or encourages anyone to hurt themselves</ListItem>
            <ListItem>shares anyone's personal information, such as a real name, address, phone number or social media handle, yours included</ListItem>
            <ListItem>is spam, an ad or a scam, or puts links in public rooms</ListItem>
            <ListItem>pretends to be someone else, including us</ListItem>
            <ListItem>is illegal, or infringes someone else's rights, such as their copyright or privacy</ListItem>
          </Bullets>
          <H3>Child safety</H3>
          <P>
            Child sexual abuse and exploitation are never allowed. Never share, ask for or create sexual content
            involving anyone under 18, and never use SpySocial to groom, sexualize or exploit a child. We remove such
            content, ban the accounts involved, and report it to the National Center for Missing & Exploited Children
            (NCMEC) and other authorities as the law requires. If you see anything like this, report it in the app or
            email <SupportEmail /> with "Child safety" in the subject; you can also report it directly to NCMEC's{' '}
            <OutLink href="https://report.cybertip.org">CyberTipline</OutLink>. If a child is in immediate danger,
            contact your local emergency services first.
          </P>
          <H3>Technical abuse</H3>
          <Bullets>
            <ListItem>Don't use bugs, modified apps, bots, scripts or other tools to get an advantage, or to see what the game hides from you, such as other players' roles, the secret word or location, or chats you're not part of.</ListItem>
            <ListItem>Don't try to get into other players' accounts, our systems, or data you're not meant to see, and don't overload, disrupt, scrape, copy or reverse-engineer SpySocial, except where the law allows it.</ListItem>
            <ListItem>If you find a bug or a security problem, please tell us at <SupportEmail /> instead of using or sharing it.</ListItem>
          </Bullets>

          <H2>8. Reports, Moderation and Appeals</H2>
          <H3>Reporting and blocking</H3>
          <P>
            You can report or block a player from their name in the app. A person reads every report, and our
            Community Rules say how soon. The player you report isn't told who reported them. To check a report, we
            look at what's attached to it and at the records we keep, as our Privacy Policy describes.
          </P>
          <H3>Automated tools</H3>
          <P>
            We also use automated tools to keep SpySocial safe: a word filter that can block certain words in names,
            usernames, room codes and chat messages, and limits on how often some actions can be repeated. We may also
            use an automated service to check profile photos and remove ones that may break the rules. Decisions on
            reports and penalties are made by a person.
          </P>
          <H3>What we can do</H3>
          <P>If you break these Terms or the Community Rules, we may:</P>
          <Bullets>
            <ListItem>remove or hide your content, or change your name or remove your photo</ListItem>
            <ListItem>give you a warning</ListItem>
            <ListItem>mute your chat for a while</ListItem>
            <ListItem>pause you from public rooms and events for a while</ListItem>
            <ListItem>ban your account</ListItem>
            <ListItem>remove you from a room or end a game</ListItem>
          </Bullets>
          <P>
            Usually you'll get a warning first, but serious cases, such as threats, sharing someone's personal
            information or anything involving the sexual exploitation of children, can lead straight to a ban. The
            Community Rules say how long penalties usually last. When we limit your account, the app tells you what's
            limited, why, and until when, with a reference such as {'S\u2011207'}. Don't create a new account to get around a
            penalty; we may ban that account too.
          </P>
          <H3>Appeals</H3>
          <P>
            If you think we got it wrong, email <SupportEmail /> and quote the reference from your notice. A person
            will look at it again and tell you what we decided. If we made a mistake, we'll undo it.
          </P>
          <H3>Reporting illegal content</H3>
          <P>
            Anyone, with or without an account, can tell us about content in SpySocial they believe is illegal by
            emailing <SupportEmail />. Please say where it is (for example, the room code and the player's name), why
            you think it's illegal, and give your name and email address (you can leave these out if your report is
            about child sexual abuse). We'll confirm that we got your report, review it, and tell you what we decided.
          </P>
          <H3>Working with the authorities</H3>
          <P>
            We may share information with the police or other authorities when the law requires it, or when we
            believe someone's life or safety is at risk.
          </P>

          <H2>9. Packs, XP and Other Virtual Items</H2>
          <P>
            SpySocial has virtual items, such as packs of words and locations, XP, levels, prestige, achievements,
            badges and event rewards. Some are free, some you earn by playing, and some may be given to you, for
            example for playing in events.
          </P>
          <Bullets>
            <ListItem>Virtual items have no value in real money. You can't sell or trade them, move them to another account, or exchange them for money.</ListItem>
            <ListItem>You get a personal, limited right to use them in SpySocial. They aren't your property, and we may change how they work: update the words and locations in a pack, rebalance XP and levels, or retire an item.</ListItem>
            <ListItem>When someone in a room has unlocked a pack, everyone in that room can play it while they're there. We may change how this sharing works.</ListItem>
            <ListItem>If your account is deleted or banned, you lose the virtual items on it.</ListItem>
          </Bullets>
          <OwnerOption label="Only once buying ships (purchasesLive: true)" chosen={OWNER_CHOICES.purchasesLive}>
            <H3>Buying packs and membership</H3>
            <Bullets>
              <ListItem>You can buy premium packs, and memberships: the Pack Pass (monthly or yearly) and Lifetime. Purchases are made through the Apple App Store or Google Play and follow their terms. They handle payment, and prices are shown before you buy, including any tax where it applies.</ListItem>
              <ListItem>The Pack Pass is a subscription. It renews automatically at the end of each month or year, and the store charges you within 24 hours before the new period starts, unless you cancel at least 24 hours before the current period ends. You can cancel at any time in your App Store or Google Play account settings, and you keep your benefits until the end of the period you've paid for. Deleting the app, or your SpySocial account, doesn't cancel a subscription.</ListItem>
              <ListItem>Lifetime means for as long as we offer SpySocial, not for your lifetime.</ListItem>
              <ListItem>A membership's benefits are described in the app when you buy it. We may change them; if a change takes away something important, we'll tell you in advance so you can cancel before your next renewal.</ListItem>
              <ListItem>A pack you buy stays yours for as long as we offer SpySocial. We may update its words and locations, and if we ever have to withdraw a pack you bought, we'll give you a comparable one where we reasonably can.</ListItem>
              <ListItem>Refunds are handled by Apple or Google under their policies. If a purchase is refunded, we remove what it unlocked.</ListItem>
              <ListItem>To get your purchases back on another device, sign in to the same account and use Restore Purchases in the app.</ListItem>
              <ListItem>Nothing in these Terms takes away rights you have under consumer law, for example if something you bought doesn't work as described.</ListItem>
            </Bullets>
          </OwnerOption>

          <H2>10. Translation and Other Services</H2>
          <H3>Translations</H3>
          <P>
            When you tap Translate, the message's text is sent to Microsoft Translator, or to MyMemory if that doesn't
            answer, and you get a machine translation. Other players can translate your messages the same way. Machine
            translations can be wrong or miss the tone, so don't rely on them for anything important; we're not
            responsible for them.
          </P>
          <H3>Voice input</H3>
          <P>
            If you use the microphone, your device's speech recognition, from Apple or Google, turns your speech into
            text under their terms. We receive only the text.
          </P>
          <H3>Other services</H3>
          <P>
            SpySocial relies on other companies' services to run; our Privacy Policy lists them. We're not responsible
            for services or websites we don't run, including ones linked from SpySocial.
          </P>

          <H2>11. Apple App Store and Google Play</H2>
          <P>If you got SpySocial from Apple's App Store, these terms also apply:</P>
          <Bullets>
            <ListItem>These Terms are between you and us, not Apple. We, not Apple, are responsible for SpySocial and its content.</ListItem>
            <ListItem>
              Your license to use the app can't be transferred, and lets you use it on Apple devices that you own or
              control, as the Usage Rules in the{' '}
              <OutLink href="https://www.apple.com/legal/internet-services/itunes/">Apple Media Services Terms and Conditions</OutLink>{' '}
              allow (including through Family Sharing, where it applies). Apple's{' '}
              <OutLink href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Licensed Application End User License Agreement</OutLink>{' '}
              also applies.
            </ListItem>
            <ListItem>Apple has no obligation to provide any maintenance or support for the app.</ListItem>
            <ListItem>If the app fails to meet any warranty that applies, you can tell Apple, and Apple will refund the price you paid for the app, if any. To the extent the law allows, Apple has no other warranty obligation for the app.</ListItem>
            <ListItem>Apple isn't responsible for addressing any claims about the app or your use of it, such as product liability claims, claims that the app doesn't meet a legal or regulatory requirement, or claims under consumer protection, privacy or similar laws. We, not Apple, are responsible for addressing them.</ListItem>
            <ListItem>If someone claims that the app, or your use of it, infringes their intellectual property rights, we, not Apple, are responsible for investigating, defending, settling and discharging that claim.</ListItem>
            <ListItem>You confirm that you're not located in a country that is subject to a US government embargo or that the US government has designated as a "terrorist supporting" country, and that you're not on any US government list of prohibited or restricted parties.</ListItem>
            <ListItem>When you use the app, you must also follow any third-party terms that apply to you, such as your mobile carrier's.</ListItem>
            <ListItem>Apple and its subsidiaries are third-party beneficiaries of these Terms, and once you accept them, Apple has the right to enforce them against you.</ListItem>
            <ListItem>Questions, complaints or claims about the app go to us at <SupportEmail />.</ListItem>
          </Bullets>
          <P>
            If you got SpySocial from Google Play, the{' '}
            <OutLink href="https://play.google.com/about/play-terms/">Google Play Terms of Service</OutLink> also
            apply. Google isn't a party to these Terms and isn't responsible for SpySocial.
          </P>

          <H2>12. Changes to SpySocial</H2>
          <P>
            SpySocial keeps changing. We may add, change or remove features, game rules, packs and settings, and we
            may limit or stop parts of SpySocial, or all of it. If we stop SpySocial completely, we'll tell you in
            advance in the app or on our website where we can.
          </P>

          <H2>13. Ending Your Use of SpySocial</H2>
          <P>
            You can stop using SpySocial at any time. To delete a saved account, go to Account, then Delete Account; to
            delete a guest account, sign out of it. Our Privacy Policy explains what we keep afterwards.
          </P>
          <P>
            We may suspend or close your account, or limit what you can do, if you break these Terms or the Community
            Rules, if the law requires it, if your account puts other players or SpySocial at risk, or if you haven't
            used it for 12 months. If we close your account, you lose access to it and to everything on it, including
            virtual items, except where the law says otherwise. The parts of these Terms that by their nature should
            continue, such as the license for copies we keep, the disclaimers, the limits on liability and the rules
            on disputes, still apply after your account ends.
          </P>

          <H2>14. Disclaimers</H2>
          <P>
            We work hard to make SpySocial fun, fair and safe, but we can't promise it will always work. SpySocial is
            provided "as is" and "as available". To the extent the law allows, we make no promises or warranties,
            express or implied, including that SpySocial will be available, uninterrupted, secure or free of errors,
            that a game won't be cut short, or that your progress and data will never be lost. We're not responsible
            for what other players say or do, in SpySocial or outside it.
          </P>

          <H2>15. Limits on Our Liability</H2>
          <P>To the extent the law allows:</P>
          <Bullets>
            <ListItem>we're not liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, data, goodwill or virtual items, arising from SpySocial or these Terms; and</ListItem>
            <ListItem>our total liability for all claims about SpySocial or these Terms is limited to the greater of what you paid us in the 12 months before the claim and US$50.</ListItem>
          </Bullets>
          <P>
            These limits apply whatever the legal basis of the claim, and even if we were told the damage was
            possible. Nothing in these Terms limits liability that the law doesn't allow to be limited, such as
            liability for fraud, or for death or personal injury caused by negligence, and nothing takes away rights
            you have as a consumer where you live.
          </P>

          <H2>16. Your Responsibility to Us</H2>
          <P>
            If you break these Terms or the law and someone makes a claim against us because of it, you agree to cover
            our reasonable losses and costs from that claim, to the extent the law allows.
          </P>

          <H2>17. Disputes and Governing Law</H2>
          <P>
            If you have a problem with SpySocial, please contact us first at <SupportEmail />. Most problems can be
            solved that way. If we can't solve it within 30 days, either of us can take it further.
          </P>
          <P>
            These Terms are governed by the laws of the State of {state}, United States, without regard to its
            conflict-of-laws rules. Any dispute about SpySocial or these Terms will be decided by the state or federal
            courts located in the State of {state}, and you and we agree to their jurisdiction. If you're a consumer
            and the law where you live gives you the right to bring a claim in your local courts, or under your local
            law, you keep that right.
          </P>

          <H2>18. Copyright Complaints</H2>
          <P>If you believe something in SpySocial infringes your copyright, email <SupportEmail /> with:</P>
          <OrderedList spacing={2} pl={4} fontSize="sm" lineHeight="1.8">
            <ListItem>your name, address, phone number and email address;</ListItem>
            <ListItem>a description of the work you believe is infringed;</ListItem>
            <ListItem>where the content is in SpySocial (for example, the player's name and the room code);</ListItem>
            <ListItem>a statement that you believe in good faith that the use isn't authorized by the copyright owner, its agent or the law;</ListItem>
            <ListItem>a statement, under penalty of perjury, that the information in your notice is accurate and that you're the copyright owner or authorized to act for them; and</ListItem>
            <ListItem>your physical or electronic signature.</ListItem>
          </OrderedList>
          <P>
            We may remove the content and let the player who added it know; they can send us a counter-notice if they
            believe it was removed by mistake. We close the accounts of players who repeatedly infringe copyright.
          </P>

          <H2>19. Changes to These Terms</H2>
          <P>
            We may update these Terms from time to time. When we do, we'll change the date at the top. If a change is
            significant, we'll tell you in the app before it applies, and we may ask you to agree to the new Terms
            before you keep playing. If you don't agree to a change, stop using SpySocial and delete your account.
          </P>

          <H2>20. General</H2>
          <Bullets>
            <ListItem>These Terms, together with the Community Rules and any terms shown when you buy something, are the whole agreement between you and us about SpySocial, and replace any earlier version.</ListItem>
            <ListItem>If a court finds that part of these Terms can't be enforced, the rest still applies.</ListItem>
            <ListItem>If we don't enforce part of these Terms straight away, we can still enforce it later.</ListItem>
            <ListItem>We may transfer these Terms to someone who takes over SpySocial. You can't transfer them to anyone else.</ListItem>
            <ListItem>If we translate these Terms, the English version applies where the versions differ.</ListItem>
          </Bullets>

          <H2>21. Contact Us</H2>
          <P>
            For questions, complaints or legal notices about SpySocial, email <SupportEmail />. You can write to us in
            English or in any language the app offers.
          </P>
        </VStack>
      </Container>
    </Box>
  )
}

export default Terms
