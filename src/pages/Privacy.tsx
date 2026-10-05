import { Box, Container, Heading, Text, VStack, Link as ChakraLink, ListItem, UnorderedList } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AfterDeletionLaw, AfterDeletionList } from '../components/legal/AfterDeletion'
import { deletedAlso, deletedSummary } from '../lib/legalText'
import { LEGAL_LAST_UPDATED, LIVE, OPERATOR } from '../lib/legalRelease'

// What each passage says depends on what has shipped: see src/lib/legalRelease.ts.

const H2 = ({ children }: { children: ReactNode }) => (
  <Heading as="h2" size="sm" color="white" mt={4}>
    {children}
  </Heading>
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

/** A list item that starts with a bold label. */
const Item = ({ label, children }: { label: string; children: ReactNode }) => (
  <ListItem>
    <Text as="span" fontWeight="600" color="whiteAlpha.800">
      {label}:
    </Text>{' '}
    {children}
  </ListItem>
)

const SupportEmail = () => (
  <ChakraLink as={Link} to="/contact-us" color="blue.300" _hover={{ color: 'blue.200' }}>
    support@spysocial.app
  </ChakraLink>
)

/** How long chat lines stay, for the Chat Messages item and Data Retention. */
const chatRetention = (what: string) =>
  LIVE.scheduledRetention
    ? `${what} in private rooms are deleted about 24 hours after they're sent; in public rooms they're kept for 14 days so that reports can be reviewed, and then deleted.`
    : `${what} in private rooms can be read for 24 hours, and in public rooms for 14 days so that reports can be reviewed; after that nobody can read them, and our servers delete them.`

const Privacy: React.FC = () => {
  const backupTranslation =
    LIVE.myMemory === 'server'
      ? " If Microsoft can't translate it (for example after a daily limit), our service sends the text to MyMemory, a free translation service run by Translated srl, instead."
      : LIVE.myMemory === 'device'
        ? " If our service can't answer (for example after a daily limit), the app sends the text from your device to MyMemory, a free translation service run by Translated srl, which then also receives your device's IP address."
        : ''
  const usesMyMemory = LIVE.myMemory !== 'off' || LIVE.oldAppsInUse

  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={5} align="start">
          <Box>
            <Heading as="h1" size="lg" color="white" mb={2}>Privacy Policy for SpySocial</Heading>
            <Text fontSize="xs" color="whiteAlpha.400">Last Updated: {LEGAL_LAST_UPDATED}</Text>
          </Box>

          <H2>Introduction</H2>
          <P>
            Welcome to SpySocial ("we," "our," or "us"). We respect your privacy and are committed to protecting your
            personal data. This privacy policy explains how we handle your personal information when you use our app and
            our website, spysocial.app, and tells you about your privacy rights.
            {OPERATOR.name
              ? ` SpySocial is run by ${OPERATOR.name}${OPERATOR.address ? `, ${OPERATOR.address}` : ''}, who is responsible for your personal data (the "controller").`
              : ''}
          </P>

          <H2>Information We Collect</H2>
          <P>When you use SpySocial, we collect the following information:</P>
          <Bullets>
            <Item label="Account Information">
              Display name, username, optional profile photo, and the email address you give when you save your account.
              You can also play as a guest without giving an email address; a guest account can be saved later.
              {LIVE.socialSignIn &&
                ' If you sign in with Apple or Google, we receive the email address they share with us (with Apple, this can be a relay address that forwards to you), an ID for your Apple or Google account and, the first time you sign in with Apple, the name you choose to share.'}
            </Item>
            <Item label="Profile Preferences">
              Your interface language (one of the ten languages the app offers), your color and similar settings, so the app
              looks and reads the way you chose.
            </Item>
            <Item label="Game Data">
              Information related to games you've played: your role, the actions you take in a game (such as when you ask
              and answer, vote, guess, or leave), the drawings made in a Spy Sketch game, and the results. We use it to
              run the game, keep score, award experience points, levels and achievements, and check that games are played
              fairly. A game's drawing, including lines a player drew and then undid, is deleted 24 hours after the game
              ends in a private room, or 14 days after in a public room; a record of which player drew each turn is kept for 90 days so reports can be checked. When you leave a room or are removed from one, we note for 24 hours how your place in it ended (you left, the host removed you, or the game did), so your other devices can tell you what happened.
            </Item>
            <Item label="Chat Messages">
              Messages you send in a room's chats (the lobby chat, the game chat, the spy chat, and the chat for players
              who are out) are stored on our servers so the other players in the room can read them.{' '}
              {chatRetention('Messages')} Copies made to deliver messages live are deleted within 3 days.
            </Item>
            <Item label="Questions and Answers">
              {LIVE.storedQuestions
                ? `The questions and answers you type in a Spy Talk interrogation go through our servers to the other players and are kept like chat messages, so they can be checked if someone reports them. ${chatRetention('Those')}`
                : "The questions and answers you type in a Spy Talk interrogation go to the other players in the game through our servers as they're sent; we don't store them."}
            </Item>
            <Item label="Voice Input">
              When you use the microphone to say a chat message, a question or an answer, Apple's or Google's speech
              recognition on your device turns what you say into text, and may send the recording to Apple or Google to
              do this, under their privacy policies. We receive only the text you choose to send, never the audio.
            </Item>
            <Item label="Translations">
              When you tap Translate on a message, the app asks our translation service, which sends the text to
              Microsoft Translator (Azure AI Translator) and keeps the translation for 24 hours, so other players reading
              the same message get it without sending it again.{backupTranslation}
              {LIVE.onDeviceTranslation &&
                " When our service can't translate a message, your device may translate it itself with Apple's or Google's on-device translation; the text then doesn't leave your device. The first time, your device may download that language's translation files from Apple or Google."}
              {LIVE.oldAppsInUse &&
                ` Versions of the app before 2.2 send every translation straight from your device to MyMemory${LIVE.myMemory === 'device' ? '.' : ", which then also receives your device's IP address."}`}{' '}
              Only the message text and the two languages are sent, never your name or account.
              {usesMyMemory &&
                " MyMemory's terms say it may keep the text it receives and use it to improve its services."}
            </Item>
            <Item label="Presence">
              While you're in a game, the app tells our servers every few seconds that it's still open, so other players
              can see if you've stepped away and the game can skip a player who isn't there.
            </Item>
            <Item label="In-Game Notes">
              Notes you write in the in-game Notebook are private to you and are not shared with other players.
            </Item>
            <Item label="Usage Data">
              Simple events about how the app is used (for example which screens are opened and which features are used),
              recorded by our own servers and kept for 180 days. They contain no message text. We don't use third-party
              analytics or advertising trackers.
            </Item>
            <Item label="Safety Information">
              Reports you make or that are made about you (in public rooms a report includes the room's recent chat as
              evidence), players you block, removals from rooms, and any warnings, mutes or bans on your account. When we
              remove a message or a drawing, or replace a name that breaks the rules, our moderation log keeps a copy of
              what we removed and the old name, for as long as we keep reports.
            </Item>
            <Item label="Age">
              {LIVE.ageGateEveryone
                ? 'Your birth year, which the app asks everyone before their first game.'
                : 'Your birth year, which the app asks before your first public room or event.'}
              {LIVE.storeAgeSignals &&
                " On some phones, Apple or Google also tell the app an age range for your account (Apple's Declared Age Range, Google Play's Age Signals); the app uses it on your device."}{' '}
              We use your age only to apply age limits, and other players never see it.
            </Item>
            {LIVE.photoScreening && (
              <Item label="Profile Photo Checks">
                When you add a profile photo, our servers send the image, and nothing else (not your name or account), to
                Microsoft's Azure AI Content Safety, which checks it for sexual, hateful, violent or self-harm content. A
                photo that may break our community rules is removed. We keep the result of each check (the scores and the
                date) until you delete your account. We don't keep a copy of a removed photo, unless the law requires us
                to (for example, when we must report it to the authorities). According to Microsoft, the service doesn't
                store the images it checks or use them to train its models.
              </Item>
            )}
            {LIVE.purchases && (
              <Item label="Purchases">
                When you buy a pack or a membership, Apple or Google handles the payment; we never see your payment
                details. To check and restore purchases, the app and our servers use RevenueCat, which receives your
                SpySocial user ID, what you bought, the store's transaction IDs, prices and dates, and your device's IP
                address and platform. We keep a record of what your purchases unlock, and when a membership renews or
                ends, for as long as you have an account.
              </Item>
            )}
            {LIVE.pushNotifications && (
              <Item label="Notifications">
                If you allow notifications, the app gives our servers a push token, an address for your device that Apple
                or Google issues, so we can send you the notifications you asked for (such as a reminder for a game night
                you signed up for). Notifications reach you through Expo's push service and Apple's or Google's. We keep
                the token until you turn notifications off, sign out or delete your account.
              </Item>
            )}
            {LIVE.crashReports && (
              <Item label="Crash Reports">
                If the app crashes or hits an error, it sends a report to Sentry, our crash-reporting service: what went
                wrong and where in the app, your device's model and operating system version, and the app's version.
                Sentry also receives your device's IP address. Crash reports don't include your name, email address or
                messages, and Sentry deletes them after 30 days.
              </Item>
            )}
            {LIVE.qrScanner && (
              <Item label="Camera">
                If you scan a room's QR code in the app, the camera is used only to read the code on your device. No
                picture is taken, kept or sent.
              </Item>
            )}
            <Item label="Device Information">
              Your device's platform (iOS or Android) and the version of the app, which the app sends with its requests so
              our servers can work with every version of the app.
            </Item>
            <Item label="IP Address">
              Our servers and service providers see your device's IP address whenever the app connects to them, as any
              internet service does. Our sign-in service keeps the IP address and user agent (a short description of the
              app and device making the request) of each signed-in session, to protect your account, until the session
              ends when you sign out or delete your account. To check that it's online, the app contacts our servers now and then; on iPhones it also contacts
              Google (clients3.google.com), which receives your device's IP address and nothing else about you.
            </Item>
          </Bullets>

          <H2>How We Use Your Information</H2>
          <P>We use your information to:</P>
          <Bullets>
            <ListItem>Create and manage your account</ListItem>
            <ListItem>Enable multiplayer game functionality, chat and translation</ListItem>
            {LIVE.purchases && <ListItem>Provide and restore what you buy</ListItem>}
            {LIVE.pushNotifications && <ListItem>Send you the notifications you turned on</ListItem>}
            <ListItem>Improve and optimize the app experience</ListItem>
            <ListItem>Troubleshoot issues{LIVE.crashReports ? ', fix crashes' : ''} and provide support</ListItem>
            <ListItem>Analyze usage patterns to enhance game design and user experience</ListItem>
            <ListItem>Protect against fraudulent or unauthorized activity</ListItem>
            <ListItem>Keep players safe: review reports, apply age limits, and enforce our Terms of Service and Community Rules</ListItem>
          </Bullets>

          <H2>Legal Basis for Processing</H2>
          <P>Where the law asks for one (for example in the European Economic Area and the UK), we rely on:</P>
          <Bullets>
            <Item label="Performance of Contract">
              To run your account and your games, deliver your chat, translate what you ask us to translate
              {LIVE.purchases ? ', provide what you buy' : ''}
              {LIVE.pushNotifications ? ' and send the notifications you turned on' : ''}.
            </Item>
            <Item label="Legitimate Interests">
              To keep players safe (reports, the word filter, moderation, age limits), protect accounts and prevent abuse
              (security logs), keep the app working{LIVE.crashReports ? ' (crash reports)' : ''}, and improve it (usage
              events). You can object to this processing at any time by emailing <SupportEmail />.
            </Item>
            <Item label="Consent">
              For your device's permissions (the microphone and speech recognition
              {LIVE.pushNotifications ? ', notifications' : ''}
              {LIVE.qrScanner ? ', the camera' : ''}). You can withdraw it at any time in your device's settings.
            </Item>
            <Item label="Legal Obligations">
              To comply with the law, for example to answer lawful requests and to report child sexual exploitation.
            </Item>
          </Bullets>

          <H2>Data Retention</H2>
          <P>
            We keep your account information and game data for as long as you have an account.{' '}
            {chatRetention(LIVE.storedQuestions ? 'Chat messages and typed questions and answers' : 'Chat messages')} Copies
            made to deliver them live are deleted within 3 days. Translations are kept for 24 hours. Usage events are kept
            for 180 days
            {LIVE.scheduledRetention
              ? ', and security logs (such as sign-ups, sign-ins, password resets and email changes, which can include your email address and IP address) for 180 days.'
              : '.'}
          </P>
          <P>
            We may remove accounts that haven't been used for 12 months, after telling you in the app or by email where
            we can. We don't remove an account that holds a purchase or a membership this way. This cleanup doesn't run
            automatically yet, so for now an unused account stays until you delete it or ask us to delete it.
          </P>
          <Text fontSize="sm" lineHeight="1.8" color="whiteAlpha.800" fontWeight="500">When you delete your account</Text>
          <P>
            You can delete your account in the app at any time (Account, then Delete Account; signing out of a guest
            account deletes it), or ask us to delete it (see{' '}
            <ChakraLink as={Link} to="/delete-account" color="blue.300" _hover={{ color: 'blue.200' }}>Delete Your Account</ChakraLink>).
            We then delete your account and the personal data linked to it: {deletedSummary()}.{deletedAlso()} Some
            information stays for a while:
          </P>
          <AfterDeletionList />
          <AfterDeletionLaw />

          <H2>Third-Party Service Providers</H2>
          <P>We use the following service providers to help deliver our services:</P>
          <Bullets>
            <Item label="Supabase">
              (https://supabase.com) Hosts our database, sign-in, file storage and server functions.
            </Item>
            <Item label="Expo">
              (https://expo.dev) Builds and delivers our app and its updates
              {LIVE.pushNotifications ? ', and delivers our notifications' : ''}. When the app checks for an update, Expo
              receives your device's IP address and platform, the app's version, and a random ID the app creates for that
              installation, which isn't linked to your account.
            </Item>
            <Item label="Microsoft">
              (Azure AI Translator, https://azure.microsoft.com/products/ai-services/ai-translator) Translates the text of a
              message when you tap Translate.
            </Item>
            {LIVE.photoScreening && (
              <Item label="Microsoft">
                (Azure AI Content Safety, https://azure.microsoft.com/products/ai-services/ai-content-safety) Checks each
                profile photo for content that breaks our community rules.
              </Item>
            )}
            {usesMyMemory && (
              <Item label="Translated srl">
                (MyMemory, https://mymemory.translated.net) Backup translation of a message's text when Microsoft can't
                translate it
                {LIVE.myMemory === 'server' ? ', sent from our servers' : LIVE.myMemory === 'device' ? ', sent from your device' : ''}
                {LIVE.oldAppsInUse && LIVE.myMemory !== 'device' ? ' (from your device in versions of the app before 2.2)' : ''}.
                MyMemory's terms say it may keep the text it receives and use it to improve its services.
              </Item>
            )}
            {LIVE.purchases && (
              <Item label="RevenueCat">(https://www.revenuecat.com) Checks and restores purchases made through Apple and Google.</Item>
            )}
            {LIVE.crashReports && (
              <Item label="Sentry">(Functional Software, Inc., https://sentry.io) Receives crash and error reports.</Item>
            )}
            <Item label="Apple and Google">
              Speech recognition when you use the microphone (they may receive the recording)
              {LIVE.socialSignIn ? ', Sign in with Apple and Google' : ''}
              {LIVE.purchases ? ', payments for purchases' : ''}
              {LIVE.pushNotifications ? ', delivering notifications' : ''}
              {LIVE.onDeviceTranslation ? ', on-device translation files' : ''}
              {LIVE.storeAgeSignals ? ', age signals' : ''}, and distribution of the app through the App Store and Google
              Play. On iPhones, the app's connection check contacts Google.
            </Item>
            <Item label="Vercel">(https://vercel.com) Hosts our website, spysocial.app, and receives the IP address of its visitors.</Item>
            <Item label="ImprovMX and Google">
              Email you send to support@spysocial.app is forwarded by ImprovMX and read in Google's Gmail.
            </Item>
          </Bullets>
          <P>
            We give these providers only the data they need to provide their service. Supabase, Expo, Microsoft
            {LIVE.purchases ? ', RevenueCat' : ''}
            {LIVE.crashReports ? ', Sentry' : ''} and Vercel process it for us under contracts that bind them to protect it
            at least as well as this policy does. Apple, Google{usesMyMemory ? ', Translated (MyMemory)' : ''} and ImprovMX
            handle what they receive under their own terms and privacy policies.
          </P>

          <H2>Data Storage and Security</H2>
          <P>
            Your data is stored in our Supabase database with appropriate security measures in place. We implement
            reasonable security practices including encryption, access controls, and regular security reviews to protect
            your information from unauthorized access or disclosure.
          </P>

          <H2>International Transfers</H2>
          <P>
            Your information is stored and processed in the United States, where our servers and most of our service
            providers are, and may be processed in other countries where our providers work. When we transfer personal
            data from the European Economic Area, the United Kingdom or Switzerland to a country without an adequacy
            decision, we rely on the safeguards in our providers' data processing terms: the European Commission's
            Standard Contractual Clauses (with the UK and Swiss addenda), or the EU-U.S. Data Privacy Framework and its UK
            and Swiss extensions where the provider is certified under them.
          </P>

          <H2>Data Sharing</H2>
          <P>
            We do not sell your personal information or share it for targeted advertising. Other players in your room see
            your display name, username, profile photo or avatar, color, level, badges (including a membership badge) and
            achievements, the language you play in, whether you've stepped away (and for how long), and the messages you
            send there. Public rooms, with their hosts' display names and avatars, are listed for all players. Reports are
            reviewed by our moderators. We may share anonymous, aggregated data for analytics purposes.
          </P>
          <P>
            We may also share information when the law requires it (for example, to report child sexual exploitation to
            the National Center for Missing & Exploited Children), or when we believe in good faith that it's needed to
            protect someone's life or safety.
          </P>

          <H2>Your Rights</H2>
          <P>Depending on your location, you may have the right to:</P>
          <Bullets>
            <ListItem>Access the personal information we have about you</ListItem>
            <ListItem>Correct inaccurate information</ListItem>
            <ListItem>Delete your personal information</ListItem>
            <ListItem>Object to or restrict certain processing of your data</ListItem>
            <ListItem>Data portability (receiving your data in a usable format)</ListItem>
            <ListItem>Withdraw consent where processing is based on consent</ListItem>
          </Bullets>
          <P>
            To exercise these rights, please contact us at <SupportEmail />. So we know a request is really yours, please
            write from the email address on your account. We reply within one month.
          </P>

          <H2>California Privacy Rights</H2>
          <P>
            If you are a California resident, you have specific rights regarding your personal information under the
            California Consumer Privacy Act (CCPA). You have the right to request information about how we collect, use,
            and disclose your personal information, and to request access to and deletion of your personal information.
          </P>

          <H2>European Economic Area (EEA) and UK Users</H2>
          <P>
            If you are in the EEA or the UK, you have rights under the General Data Protection Regulation (GDPR) or the UK
            GDPR. In addition to the rights listed above, you have the right to lodge a complaint with your local data
            protection authority.
          </P>

          <H2>Children's Privacy</H2>
          <P>
            SpySocial is for players 13 and older.{' '}
            {LIVE.ageGateEveryone &&
              "The app asks every player's birth year before their first game. If the answer is under 13, the app stops and doesn't let them play, and remembers this on the device. "}
            We don't knowingly collect personal information from children under 13. When we learn that an account belongs
            to a child under 13, including from the birth year entered in the app, we delete the account and its
            information. If you believe a child under 13 is using SpySocial, email <SupportEmail /> and we'll delete their
            account.
          </P>

          <H2>Do Not Track Signals</H2>
          <P>
            Some browsers have a "Do Not Track" feature that signals websites not to track your online activity. We
            currently do not respond to Do Not Track signals, as there is not yet a common understanding of how to
            interpret these signals.
          </P>

          <H2>Changes to This Privacy Policy</H2>
          <P>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new
            privacy policy on this page and updating the "Last Updated" date. For significant changes, we may also provide
            additional notice, such as an in-app notification.
          </P>

          <H2>Contact Us</H2>
          <P>
            If you have any questions about this privacy policy or our data practices, please contact us at <SupportEmail />
            {OPERATOR.name && OPERATOR.address ? `, or write to ${OPERATOR.name}, ${OPERATOR.address}` : ''}.
          </P>
        </VStack>
      </Container>
    </Box>
  )
}

export default Privacy
