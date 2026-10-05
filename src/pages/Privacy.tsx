import { Box, Container, Heading, Text, VStack, Link as ChakraLink, ListItem, UnorderedList } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AfterDeletionLaw, AfterDeletionList } from '../components/legal/AfterDeletion'
import { deletedAlso, deletedSummary } from '../lib/legalText'
import { OPERATOR, PRIVACY, PRIVACY_LAST_UPDATED, avatarsLive, photosInUse, usesMlKit } from '../lib/legalRelease'

// What each passage says depends on what has shipped: see src/lib/legalRelease.ts.
// This page reads PRIVACY, which can run ahead of the Terms (PRIVACY_AHEAD there).

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
  PRIVACY.scheduledRetention
    ? `${what} in private rooms are deleted about 24 hours after they're sent; in public rooms they're kept for 14 days so that reports can be reviewed, and then deleted.`
    : `${what} in private rooms can be read for 24 hours, and in public rooms for 14 days so that reports can be reviewed; after that nobody can read them, and our servers delete them.`

const Privacy: React.FC = () => {
  const backupTranslation =
    PRIVACY.myMemory === 'server'
      ? " If Microsoft can't translate it (for example after a daily limit), our service sends the text to MyMemory, a free translation service run by Translated srl, instead."
      : PRIVACY.myMemory === 'device'
        ? " If our service can't answer (for example after a daily limit), the app sends the text from your device to MyMemory, a free translation service run by Translated srl, which then also receives your device's IP address."
        : ''
  // Versions before 2.2 never call MyMemory (2.1.1 has no chat), so only the current app's setting counts.
  const usesMyMemory = PRIVACY.myMemory !== 'off'
  // While versions before 2.2 connect (and while this page runs ahead of the 2.2 release, with 2.1.1 the store
  // version: legalRelease PRIVACY_AHEAD), what only 2.2 does by itself, or asks of everyone, says so.
  const from22 = PRIVACY.oldAppsInUse
  // Android registers with Firebase Cloud Messaging at launch (legalRelease fcmAutoInit).
  const fcmAtLaunch = PRIVACY.notifications && PRIVACY.fcmAutoInit
  // What Google's ML Kit does in the Android app (usesMlKit).
  const mlKitUses = [
    PRIVACY.onDeviceTranslation ? 'translate messages on your device' : null,
    PRIVACY.qrScanner ? 'read QR codes' : null,
  ]
    .filter(Boolean)
    .join(' and ')
  const mlKitKeeps = [
    PRIVACY.onDeviceTranslation ? 'the text it translates' : null,
    PRIVACY.qrScanner ? 'what the camera sees' : null,
  ]
    .filter(Boolean)
    .join(' and ')

  return (
    <Box flex="1" color="whiteAlpha.700" pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={5} align="start">
          <Box>
            <Heading as="h1" size="lg" color="white" mb={2}>Privacy Policy for SpySocial</Heading>
            <Text fontSize="xs" color="whiteAlpha.400">Last Updated: {PRIVACY_LAST_UPDATED}</Text>
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
              {avatarsLive(PRIVACY)
                ? 'Display name, username, the avatar you put together in the app from the parts it offers (and the avatar items you unlocked), and the email address you give when you save your account.'
                : 'Display name, username, optional profile photo, and the email address you give when you save your account.'}
              {avatarsLive(PRIVACY) &&
                photosInUse(PRIVACY) &&
                (from22
                  ? ' Avatars are new in version 2.2; versions before 2.2 let you add a profile photo instead.'
                  : ' Versions of the app before 2.2 also let you add a profile photo.')}
              {' '}You can also play as a guest without giving an email address; a guest account can be saved later.
              {PRIVACY.socialSignIn &&
                ' If you sign in with Apple or Google, we receive the email address they share with us (with Apple, this can be a relay address that forwards to you), an ID for your Apple or Google account and, the first time you sign in with Apple, the name you choose to share (a new account takes its first name as its display name). With Google, we also receive the name on your Google account and a link to its profile picture; our sign-in service keeps them with your account, and the app doesn\'t use them. On iPhone and iPad, Google\'s sign-in may also use your device\'s IP address to estimate a general location, under Google\'s privacy policy.'}
            </Item>
            <Item label="Profile Preferences">
              Your interface language (one of the ten languages the app offers), your color and similar settings, so the app
              looks and reads the way you chose.
              {PRIVACY.onePool &&
                " Our servers also use your language to show you the game (the secret word or location, its description and the spy's list) in it, and to count the different languages at a table for an achievement."}
            </Item>
            <Item label="Game Data">
              Information related to games you've played: your role, the actions you take in a game (such as when you ask
              and answer, vote, guess, or leave), the drawings made in a Spy Sketch game, and the results. We use it to
              run the game, keep score, award experience points, levels and achievements, and check that games are played
              fairly. A game's drawing, including lines a player drew and then undid, is deleted 24 hours after the game
              ends in a private room, or 14 days after in a public room; a record of which player drew each turn is kept for 90 days so reports can be checked. When you leave a room or are removed from one, we note for 24 hours how your place in it ended (you left, the host removed you, or the game did), so your other devices can tell you what happened.
            </Item>
            {PRIVACY.playOnline && (
              <Item label="Play Online">
                When you use Play Online, our servers keep what you searched for (Spy Talk or Spy Sketch, the table size,
                and when), the table you're seated at, when you tap Ready, and the breaks you get for missing a start or
                leaving a game that has started. We use this to seat you with other players and to keep games fair.
                Searches are deleted 30 days after they end, and breaks and the matchmaking log after 90 days.
              </Item>
            )}
            <Item label="Chat Messages">
              Messages you send in a room's chats (the lobby chat, the game chat, the spy chat, and the chat for players
              who are out) are stored on our servers so the other players in the room can read them.{' '}
              {chatRetention('Messages')} Copies made to deliver messages live are deleted within 3 days.
            </Item>
            <Item label="Questions and Answers">
              {PRIVACY.storedQuestions
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
              {PRIVACY.onDeviceTranslation &&
                " When our service can't translate a message, your device may translate it itself with Apple's or Google's on-device translation; the text then doesn't leave your device. The first time, your device may download that language's translation files from Apple or Google."}{' '}
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
              evidence{PRIVACY.drawingCheck ? ', and a report about a drawing includes the drawing' : ''}), players you block,
              removals from rooms, and any warnings, mutes or bans on your account
              {PRIVACY.drawingCheck
                ? ", including the results of drawing checks, drawings taken off as evidence, removals from a game, and warnings, pauses and bans the drawing check gave. When a drawing is taken off or a player removed, the room's chat says whose drawing it was or who was removed"
                : ''}
              . When we remove a message or a drawing, or replace a name that breaks the rules, our moderation log keeps a
              copy of what we removed and the old name, for as long as we keep reports.
            </Item>
            {PRIVACY.drawingCheck && (
              <Item label="Drawing Checks">
                In public rooms ({PRIVACY.onePool ? 'Play Online tables and events' : 'including Play Online tables and events'}), every drawing turn in a Spy Sketch game is
                checked automatically for content that breaks our Community Rules; in any room, a drawing is checked when
                someone reports it. The app tells you once, before your drawings can be checked, that they're sent to
                OpenAI. For each check, our servers make a picture of the turn (the earlier drawing in light grey, and any
                lines the player drew and then undid) and send it to OpenAI with the round's secret word (which helps tell
                an innocent drawing from an offensive one) and a code made from your account ID that doesn't reveal who
                you are, which OpenAI uses to detect misuse of its service. They never send your name, username, email
                address, chat or your device's IP address. According to OpenAI, it doesn't use what it receives to train
                its models, and keeps it for up to 30 days to watch for misuse, unless the law requires it to keep it
                longer. The check acts by itself: it can take a turn off the drawing for everyone in the game, give a
                strike (which can lead to a pause or a ban from public rooms and events), or remove a player from the game
                and ban them from public rooms and events, as our Community Rules explain. A drawing that sexualizes a
                child is taken off, the account is banned from SpySocial, and the drawing is reported to the National
                Center for Missing & Exploited Children (NCMEC), as US law requires. A person reviews every permanent
                decision within 24 hours, and you can appeal by email with the code in the notice (except a decision about
                child sexual exploitation); a person then looks at it again.
              </Item>
            )}
            <Item label="Age">
              {PRIVACY.ageGateEveryone
                ? `Your birth year, which the app${from22 ? ' (from version 2.2)' : ''} asks everyone before their first game.`
                : 'Your birth year, which the app asks before your first public room or event.'}
              {PRIVACY.birthMonth &&
                " If you turn 13 this year, the app also asks your birth month, because the year alone can't tell whether you're 13 yet; we keep the month only in that case."}
              {PRIVACY.storeAgeSignals &&
                `${from22 ? ' From version 2.2, on' : ' On'} some phones, Apple or Google also tell the app an age range for your account (Apple's Declared Age Range, Google Play's Age Signals); the app uses it on your device.`}{' '}
              We use your age only to apply age limits, and other players never see it.
            </Item>
            {PRIVACY.ageGateEveryone && (
              <Item label="Agreement">
                Which version of our Terms of Service and Community Rules you agreed to in the app, when, and the version
                of the app you used.
              </Item>
            )}
            {PRIVACY.purchases && (
              <Item label="Purchases">
                When you buy a pack or a membership (guests can buy too), Apple or Google handles the payment; we never
                see your payment details. To check and restore purchases, the app and our servers use RevenueCat, which
                receives an ID linked to your SpySocial account, what you bought, the store's transaction IDs, prices and
                dates, your device's IP address, platform, model, language settings and store country, and on iPhones the
                identifier iOS gives our apps on your device. The app first connects to RevenueCat when you open a screen
                where you can buy something; after that, it connects each time it starts on that device, for whoever is
                signed in. We keep a record of what your purchases unlock, and when a membership renews or ends,
                for as long as you have an account; if you use Restore Purchases while signed in to another account, your
                purchases move to that account. The updates RevenueCat sends us about a purchase (such as a renewal or a
                refund) are deleted after 90 days.{' '}
                {PRIVACY.revenueCatDeletion
                  ? 'RevenueCat keeps its record of your purchases until you delete your account, and deletes it within 30 days after that.'
                  : 'RevenueCat keeps its own record of your purchases until we ask it to delete it (see When you delete your account below).'}
              </Item>
            )}
            {PRIVACY.notifications && (
              <Item label="Reminders and Notifications">
                When you tap Remind Me on a game night, we record it so the reminder reaches every device you play on;
                other players see only how many people asked to be reminded, never who. The reminder is a notification
                your device schedules and shows by itself, if you allow notifications: we don't receive a push token or
                any other address for your device, and we don't send players push notifications. The only push
                notifications we send go to our moderators' phones when a new report comes in. They pass through Expo's
                push service and Apple's or Google's, and say only what kind of report it is and its case number, never a
                player's name or what was said.
                {fcmAtLaunch &&
                  `${from22 ? ' From version 2.2, on' : ' On'} Android, when the app starts, it registers with Google's Firebase Cloud Messaging (the service that delivers push notifications on Android). Google then receives a random ID for the app's installation, which isn't linked to your account, and technical details about the app and your device, and gives the app a push address. That address stays on your device: we never receive it.`}
              </Item>
            )}
            {PRIVACY.crashReports && (
              <Item label="Crash Reports">
                {from22 ? 'From version 2.2, if' : 'If'} the app crashes or hits an error, it sends a report to Sentry, our
                crash-reporting service: what went wrong and where in the app, a short trail of what the app did just
                before (such as the screens it opened, with room codes removed), your device's model, operating system version and similar technical details
                (such as free memory, screen size and language), the app's version, and an ID for the app's installation
                that isn't linked to your account (on Android, a random ID the crash reporter creates; on iPhones, a code
                made from the identifier iOS gives our apps on your device). Reports don't include your name, email
                address, account or messages. A report is also sent when the app freezes (stops responding for a few
                seconds), with the same details; the app sends nothing to Sentry while everything works. Sentry
                receives your device's IP address when a report arrives but is set not to store it, and deletes reports
                within 90 days.
              </Item>
            )}
            {PRIVACY.qrScanner && (
              <Item label="Camera">
                If you scan a room's QR code in the app, the camera is used only to read the code on your device. No
                picture is taken, kept or sent.
              </Item>
            )}
            {usesMlKit(PRIVACY) && (
              <Item label="Google ML Kit (Android)">
                {from22 ? 'From version 2.2, on' : 'On'} Android, the app uses Google's ML Kit to {mlKitUses}. ML Kit does
                this on your device, so{' '}
                {mlKitKeeps} {PRIVACY.onDeviceTranslation && PRIVACY.qrScanner ? 'stay' : 'stays'} there. It does send Google
                technical information about how it works: your device's model and Android version, the app's name and
                version, a random ID for the app's installation that isn't linked to your account,
                {PRIVACY.onDeviceTranslation ? ' the two languages of each translation,' : ''} and performance figures,
                such as how long each task took. Google uses this to measure, fix and improve ML Kit and to detect misuse.
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
            {PRIVACY.purchases && <ListItem>Provide and restore what you buy</ListItem>}
            {PRIVACY.notifications && <ListItem>Remind you of the game nights you asked to be reminded about</ListItem>}
            <ListItem>Improve and optimize the app experience</ListItem>
            <ListItem>Troubleshoot issues{PRIVACY.crashReports ? ', fix crashes' : ''} and provide support</ListItem>
            <ListItem>Analyze usage patterns to enhance game design and user experience</ListItem>
            <ListItem>Protect against fraudulent or unauthorized activity</ListItem>
            <ListItem>
              Keep players safe: review reports{PRIVACY.drawingCheck ? ', check drawings' : ''}, apply age limits, and enforce
              our Terms of Service and Community Rules
            </ListItem>
          </Bullets>

          <H2>Legal Basis for Processing</H2>
          <P>Where the law asks for one (for example in the European Economic Area and the UK), we rely on:</P>
          <Bullets>
            <Item label="Performance of Contract">
              To run your account and your games, deliver your chat, translate what you ask us to translate
              {PRIVACY.purchases ? ', provide what you buy' : ''}
              {PRIVACY.notifications ? ' and remind you of the game nights you asked about' : ''}.
            </Item>
            <Item label="Legitimate Interests">
              To keep players safe (reports, the word filter{PRIVACY.drawingCheck ? ', drawing checks' : ''}, moderation, age
              limits), protect accounts and prevent abuse
              (security logs), keep the app working{PRIVACY.crashReports ? ' (crash reports)' : ''}, and improve it (usage
              events). You can object to this processing at any time by emailing <SupportEmail />.
            </Item>
            <Item label="Consent">
              For your device's permissions (the microphone and speech recognition
              {PRIVACY.notifications ? ', notifications' : ''}
              {PRIVACY.qrScanner ? ', the camera' : ''}). You can withdraw it at any time in your device's settings.
            </Item>
            <Item label="Legal Obligations">
              To comply with the law, for example to answer lawful requests and to report child sexual exploitation.
            </Item>
          </Bullets>

          <H2>Data Retention</H2>
          <P>
            We keep your account information and game data for as long as you have an account.{' '}
            {chatRetention(PRIVACY.storedQuestions ? 'Chat messages and typed questions and answers' : 'Chat messages')} Copies
            made to deliver them live are deleted within 3 days. Translations are kept for 24 hours.
            {PRIVACY.playOnline
              ? ' Play Online searches are kept for 30 days after they end, and Play Online breaks and its matchmaking log for 90 days.'
              : ''}
            {PRIVACY.drawingCheck
              ? ' The results of drawing checks are kept for 90 days. A drawing taken off or reported is kept as evidence for 90 days, or longer while its report is still open. A drawing we must report as child sexual exploitation is kept for 1 year after we report it to NCMEC, as US law requires, in restricted storage, and shared with no one except the authorities.'
              : ''}{' '}
            Usage events are kept
            for 180 days
            {PRIVACY.scheduledRetention
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
              {PRIVACY.notifications ? ', and delivers the report alerts our moderators get' : ''}. When the app checks for an
              update, Expo receives your device's IP address and platform, the app's version, and a random ID the app
              creates for that installation, which isn't linked to your account.
            </Item>
            <Item label="Microsoft">
              (Azure AI Translator, https://azure.microsoft.com/products/ai-services/ai-translator) Translates the text of a
              message when you tap Translate.
            </Item>
            {PRIVACY.drawingCheck && (
              <Item label="OpenAI">
                (https://openai.com) Checks drawings for content that breaks our Community Rules: every drawing turn in
                public rooms, and drawings players report. Under OpenAI's API terms and its Data Processing Addendum, it
                doesn't use them to train its models and keeps them for at most 30 days to monitor abuse.
              </Item>
            )}
            {usesMyMemory && (
              <Item label="Translated srl">
                (MyMemory, https://mymemory.translated.net) Backup translation of a message's text when Microsoft can't
                translate it{PRIVACY.myMemory === 'server' ? ', sent from our servers' : ', sent from your device'}.
                MyMemory's terms say it may keep the text it receives and use it to improve its services.
              </Item>
            )}
            {PRIVACY.purchases && (
              <Item label="RevenueCat">(https://www.revenuecat.com) Checks and restores purchases made through Apple and Google.</Item>
            )}
            {PRIVACY.crashReports && (
              <Item label="Sentry">(Functional Software, Inc., https://sentry.io) Receives crash and error reports.</Item>
            )}
            <Item label="Apple and Google">
              Speech recognition when you use the microphone (they may receive the recording)
              {PRIVACY.socialSignIn ? ', Sign in with Apple and Google' : ''}
              {PRIVACY.purchases ? ', payments for purchases' : ''}
              {PRIVACY.onDeviceTranslation ? ', on-device translation files' : ''}
              {usesMlKit(PRIVACY) ? ", Google's ML Kit in the Android app" : ''}
              {fcmAtLaunch ? ", Google's Firebase Cloud Messaging in the Android app" : ''}
              {PRIVACY.storeAgeSignals ? ', age signals' : ''}, and distribution of the app through the App Store and Google
              Play. On iPhones, the app's connection check contacts Google.
            </Item>
            <Item label="Vercel">(https://vercel.com) Hosts our website, spysocial.app, and receives the IP address of its visitors.</Item>
            <Item label="ImprovMX and Google">
              Email you send to support@spysocial.app is forwarded by ImprovMX and read in Google's Gmail.
            </Item>
          </Bullets>
          <P>
            We give these providers only the data they need to provide their service. Supabase, Expo, Microsoft
            {PRIVACY.drawingCheck ? ', OpenAI' : ''}
            {PRIVACY.purchases ? ', RevenueCat' : ''}
            {PRIVACY.crashReports ? ', Sentry' : ''} and Vercel process it for us under contracts that bind them to protect it
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
            your display name, username, {photosInUse(PRIVACY) ? 'profile photo or avatar' : 'avatar'}, color, level, badges
            (including a membership badge) and achievements, the language you play in, whether you've stepped away (and
            for how long), and the messages you send there.{' '}
            {PRIVACY.onePool
              ? "Private rooms waiting for players, and game nights, are listed for all players with their hosts' display names and avatars (a private room still needs its code to join); Play Online's tables are listed without names."
              : "Public rooms, with their hosts' display names and avatars, are listed for all players."}{' '}
            Reports are
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
            {PRIVACY.ageGateEveryone &&
              `${from22 ? 'From version 2.2, the' : 'The'} app asks every player's birth year before their first game. `}
            {PRIVACY.under13Deletion
              ? "If the birth year entered in the app is under 13, the app stops, remembers this on the device and doesn't let them play, and we delete the account at once, as if they had deleted it themselves (see When you delete your account, above, for what stays for a while). "
              : PRIVACY.ageGateEveryone
                ? "If the answer is under 13, the app stops and doesn't let them play, and remembers this on the device. "
                : ''}
            {PRIVACY.storeAgeSignals &&
              "If the age range Apple or Google share with the app is under 13, the app stops in the same way, without asking. That range stays on the device and isn't sent to us, so it doesn't delete the account. "}
            We don't knowingly collect personal information from children under 13. When we learn
            {PRIVACY.under13Deletion ? ' in any other way' : ''} that an account belongs to a child under 13
            {PRIVACY.under13Deletion ? ', we delete it in the same way.' : ', including from the birth year entered in the app, we delete the account and its information.'}{' '}
            If you believe a child under 13 is using SpySocial, email <SupportEmail /> and we'll delete their account.
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
