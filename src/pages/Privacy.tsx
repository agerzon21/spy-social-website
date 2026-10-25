import { Text, Link as ChakraLink, ListItem } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AfterDeletionLaw, AfterDeletionList } from '../components/legal/AfterDeletion'
import { ShopLink } from '../components/legal/ShopLink'
import { deletedAlso, deletedSummary } from '../lib/legalText'
import { OPERATOR, PRIVACY, PRIVACY_LAST_UPDATED, avatarsLive, photosInUse, photosShown, usesMlKit } from '../lib/legalRelease'
import { LegalPage } from '../components/legal/LegalPage'
import { Bullets, H2, P } from '../components/legal/LegalText'

// What each passage says depends on what has shipped: see src/lib/legalRelease.ts.
// This page reads PRIVACY, which can run ahead of the Terms (PRIVACY_AHEAD there).

/** A list item that starts with a bold label. */
const Item = ({ label, children }: { label: string; children: ReactNode }) => (
  <ListItem>
    <Text as="span" fontWeight="600" color="ss.text">
      {label}:
    </Text>{' '}
    {children}
  </ListItem>
)

const SupportEmail = () => (
  <ChakraLink as={Link} to="/contact-us">
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
  // Who translates on our servers: Microsoft, or OpenAI when app_config.translation_engine is 'openai'.
  const serverTranslator = PRIVACY.openAiTranslation
    ? 'Microsoft Translator (Azure AI Translator) or OpenAI, depending on which our service uses,'
    : 'Microsoft Translator (Azure AI Translator)'
  // OpenAI is a provider for drawing checks, translation, the custom packs' text check (LIVE.customPacks) or all three.
  const usesOpenAi = PRIVACY.drawingCheck || PRIVACY.openAiTranslation || PRIVACY.customPacks
  // Each author's own yes (server 20261031100000): OpenAI gets a player's messages only after they chose Translate in
  // the app's note naming OpenAI, and not while they've since chosen Not Now there or turned automatic translation off.
  const openAiAgreed = PRIVACY.autoTranslation
    ? 'chose Translate in the app\'s "Before You Translate" note that names OpenAI, and haven\'t since chosen Not Now there or turned automatic translation off'
    : 'chose Translate in the app\'s "Before You Translate" note that names OpenAI, and haven\'t since chosen Not Now there'

  return (
    <LegalPage english title="Privacy Policy for SpySocial" updated={<>Last Updated: {PRIVACY_LAST_UPDATED}</>}>

      <H2>Introduction</H2>
      <P>
        Welcome to SpySocial ("we," "our," or "us"). We respect your privacy and are committed to protecting your
        personal data. This privacy policy explains how we handle your personal information when you use our app
        {PRIVACY.browserLegal ? ' (on your phone, or in a browser at play.spysocial.app, the browser version)' : ''} and
        our website, spysocial.app,{PRIVACY.merchShop ? ' or buy from our merch shop, shop.spysocial.app,' : ''} and tells you about your privacy rights.
        {OPERATOR.name
          ? ` SpySocial is run by ${OPERATOR.name}${OPERATOR.address ? `, ${OPERATOR.address}` : ''}, who is responsible for your personal data (the "controller").`
          : ''}
      </P>

      <H2>Information We Collect</H2>
      <P>When you use SpySocial, we collect the following information:</P>
      <Bullets>
        <Item label="Account Information">
          {avatarsLive(PRIVACY)
            ? 'Display name, username, the avatar you put together in the app from the parts it offers (and the avatar items, titles and borders you unlocked, and the title and border you choose to wear), and the email address you give when you save your account.'
            : PRIVACY.photosPrivate
              ? 'Display name, username, the profile photo you added before October 20, 2026, if any (it isn\'t shown to anyone), and the email address you give when you save your account.'
              : 'Display name, username, optional profile photo, and the email address you give when you save your account.'}
          {avatarsLive(PRIVACY) &&
            photosInUse(PRIVACY) &&
            (PRIVACY.photosPrivate
              ? `${from22 ? ' Avatars are new in version 2.2. Until October 20, 2026, versions before 2.2 let you add a profile photo instead' : ' Until October 20, 2026, versions of the app before 2.2 also let you add a profile photo'}; since then, no one can add or change one, and the photos added before aren't shown to anyone. We keep each one in private storage, where only the account that added it can still open it, and delete it with the account.`
              : from22
                ? ' Avatars are new in version 2.2; versions before 2.2 let you add a profile photo instead.'
                : ' Versions of the app before 2.2 also let you add a profile photo.')}
          {' '}You can also play as a guest without giving an email address; a guest account can be saved later.
          {PRIVACY.socialSignIn &&
            ' If you sign in with Apple or Google, we receive the email address they share with us (with Apple, this can be a relay address that forwards to you), an ID for your Apple or Google account and, the first time you sign in with Apple, the name you choose to share (a new account takes its first name as its display name). With Google, we also receive the name on your Google account and a link to its profile picture; our sign-in service keeps them with your account, and the app doesn\'t use them. On iPhone and iPad, Google\'s sign-in may also use your device\'s IP address to estimate a general location, and collect a device identifier and usage information for Google\'s own analytics, under Google\'s privacy policy.'}
        </Item>
        <Item label="Profile Preferences">
          Your interface language (one of the ten languages the app offers), your colors (a 1st, 2nd and 3rd choice: each room gives you the first one that's free) and similar settings, so the app
          looks and reads the way you chose. Our servers also use your language to show you the game (the secret
          word or location, its description and the spy's list) in it, and to count the different languages at a
          table for an achievement. The app can also tell the players in a room which app languages are used at their
          table, never whose.
        </Item>
        <Item label="Game Data">
          Information related to games you've played: your role, the actions you take in a game (such as when you ask
          and answer, vote, guess, or leave), the drawings made in a Spy Sketch game, and the results. We use it to
          run the game, keep score, award experience points, levels and achievements, and check that games are played
          fairly. A game's drawing, including lines a player drew and then undid, is deleted 24 hours after the game
          ends in a private room, or 14 days after in a public room; a record of which player drew each turn is kept for 90 days so reports can be checked. When you leave a room or are removed from one, we note for 24 hours how your place in it ended (you left, the host removed you, or the game did), so your other devices can tell you what happened.
          {PRIVACY.playerStats &&
            " We also use your game records (each game's result, your role, your votes, vote calls, answers and guesses, how long you played, and the game's location or word) to show you your own stats in the app. If you're a member, you also see the locations and words that came up most in your games and a playstyle label worked out from your stats. Only you see your stats: we don't show them to other players or share them with anyone."}
        </Item>
        <Item label="Mini-Game">
          Players who are out of a game can play a mini-game, Night Glide, while the game goes on. For each game, we
          store your best Night Glide score with the game, how many scores you sent and when, so we can show the best
          scores and check that a score could be reached in the time you played. A Call It pick (a player who is out
          naming the player they think is a spy) is also kept with the game; nobody else can see it until the game is
          over. Some scores and correct Call It picks earn achievements, and some achievements unlock cosmetic
          rewards.
        </Item>
        {PRIVACY.playOnline && (
          <Item label="Play Online">
            When you use Play Online, our servers keep what you searched for (Spy Talk or Spy Sketch, the table size,
            and when), the table you're seated at, when you tap Ready, and the breaks you get for declining a match,
            missing a start or leaving a game that has started. We use this to seat you with other players and to keep games fair.
            Searches are deleted 30 days after they end, and breaks and the matchmaking log after 90 days.
          </Item>
        )}
        {/* LIVE.gameNightPrizes: each Game Night's titles and the developer's bonus title (legalRelease). */}
        {PRIVACY.gameNightPrizes && (
          <Item label="Game Night">
            When you play in our weekly Game Night, our servers keep which week you played, whether each game you
            played there counted toward the night's titles, and, when you get titles (the night's titles, or a bonus
            title the developer gives at a table he visits), which titles, the game they came from (if any) and when.
            We use this to give each account each title once, to show you a notice in the app, and to check that
            titles are won fairly. Game Night seats you through Play Online, so your Game Night search is kept like a
            Play Online search{PRIVACY.playOnline ? ' (see Play Online above)' : ''}, with the night it was for. When
            the developer gives a bonus title at a table, that table's chat says who got it, by the name the table
            shows. The titles are cosmetic and kept with your account, and this information is deleted with it. Apart
            from that chat line, it doesn't leave our servers and isn't shared with anyone.
          </Item>
        )}
        {/* LIVE.intel: Intel (the server's "coins") and the daily streak (legalRelease). */}
        {PRIVACY.intel && (
          <Item label="Intel and Daily Streak">
            Intel is SpySocial's in-app currency. It's earned only by playing: it can't be bought.
            {PRIVACY.intercepts ? ' You also get it by shredding spare copies of items. For now there\'s nothing to spend it on.' : ''} When a game you
            played earns Intel, our servers record it in your Intel history: the game, the day, how much it gave and
            for what (the game itself, your first game of the day, your daily streak), and your balance after it. We
            also keep your balance, how much Intel you've earned and spent in all, and your daily streak: how many days
            in a row you've played a game that counts, your best streak, the last day you did, and any streak freeze
            you hold.
            {PRIVACY.intercepts
              ? ''
              : ' When you unlock an item with Intel, we record which item, its price and when, and add the item to your account.'}{' '}
            All of this is worked out from the games you play (games that give no experience points,
            for example a game you left or one our fair-play checks flag, give no Intel). We use it to give you Intel
            {PRIVACY.intercepts ? ' and your streak' : ', your streak and the items you choose'}, to show them to you in the app, and to check that Intel is earned
            fairly.
            {PRIVACY.intercepts &&
              ' The history also records the Intel you get by shredding a spare copy of an item, and which part of your balance is locked (Intel we added ourselves, which will never be tradable).'}{' '}
            Other players never see your Intel or your streak, and we look at Intel only as totals across all
            players{PRIVACY.intercepts ? '' : ' (for example to set prices)'}. It's kept with your account and deleted with it, and it doesn't leave
            our servers.
          </Item>
        )}
        {/* LIVE.intercepts: Intercepts (the server's "crates"), earned only (legalRelease). */}
        {PRIVACY.intercepts && (
          <Item label="Intercepts">
            Intercepts are sealed rewards that each open into one random item (such as a look for your agent, a
            celebration or a title). They're earned only by playing, or given by us, never bought, with money or with
            Intel. Our servers keep each Intercept you get: when, how you got it (the Play Online game that completed a
            set of 10 wins, your first Play Online game of the day or a streak milestone, a Game Night win, a creator
            code you entered, or a gift from us, with its reason) and its tier; and, once you open it, when, the item and
            its rarity, whether you already had that item, and for a Unique, its number and colour. We keep every copy
            you get, the Intel you get when you shred a spare one, and each trade-up (the spare copies it used, the odds
            it used and the item it gave). They also keep your progress toward your next
            Intercepts and the counts behind any guarantee the app shows. All of this comes from the games you play and
            the codes you enter: private-room games, and games that give no Intel (for example a game you left or one
            our fair-play checks flag), don't count. When Intercepts start, the items that from then on come only from
            Intercepts are taken back from every account (the Beta Pin excepted), and we keep a record of what was taken
            back from yours, and of the look or title it replaced, so that we can put it back if we have to. We use all
            this to give you your Intercepts and their items, to show them to you in the app, and to check that
            Intercepts are earned fairly and that the odds work as the app shows them. Other players never see your
            Intercepts; they see an item from one only when you wear it, like any other look. We look at Intercepts only
            as totals across all players (and at a player's own Intercepts only to answer a question or check a
            problem). It's kept with your account and deleted with it, and it doesn't leave our servers.
          </Item>
        )}
        {/* LIVE.customPacks (members' own packs), with communityPacks and featuredPacks (legalRelease). */}
        {PRIVACY.customPacks && (
          <Item label={PRIVACY.communityPacks ? 'Custom Packs and Community Packs' : 'Custom Packs'}>
            If you're a member, you can make your own packs. We keep each pack you make with your account: its name, its
            game (Spy Talk or Spy Sketch), its language, its description if you add one, its entries (the locations or
            words) and when you made and last changed it. Names and entries go through our word filter when you save
            them. Before anyone else can play or see a pack, its name, description and entries are also sent to
            OpenAI's moderation model for an automated check (only the pack's text, never your account, name or age),
            and we keep the result and anything it flagged with the pack; a pack it flags waits until a person on our
            team looks at it, and a pack it flags for child sexual content is logged with a copy for our child-safety
            review. Any change to the text is checked again. When you play one of your packs in a private room, the players there see its name and, as with any
            pack, what the game deals and shows from it (such as the location or word, and the spy's list). You can
            change or delete your packs at any time.
            {PRIVACY.communityPacks &&
              ` If you submit a pack to Community Packs, a person on our team reviews it before anyone else can see it (we aim to within 72 hours), and we keep a record of the review (who reviewed it, when, what we decided and why, with a copy of the pack as it was). We may approve it, send it back, turn it down, hold it (for example after reports) or take it out. Once we approve it, every SpySocial player, players under 18 included, can see it: its name, description, game, language and entries, your display name as its creator, when it was added, its average rating and number of ratings, and how many players have added it (its downloads). Players can search Community Packs (by a pack's name, description or creator's name), browse our collections, add a pack to their collection and rate it from 1 to 5 stars. When you add or rate a pack, we keep which pack, your rating and when, with your account; other players and the pack's creator see only the totals, never who added or rated it. You can report a Community Pack: the report keeps a snapshot of the pack as it was, your reason and anything you write, and we handle it like any other report (see Safety Information). If you take your pack out of Community Packs or delete it, it disappears from search and collections. Creators get the Pack Maker title, which counts their approved packs and shows like any title.`}
            {PRIVACY.featuredPacks &&
              ` We may feature a Community Pack: then it's also played at Play Online tables and events, where the players see its name and creator as Community Packs shows them, and our translation service translates its name, description and entries into the languages the app offers. For that, it sends only the pack's text and the languages to ${PRIVACY.openAiTranslation ? 'OpenAI (only when you told us you\'re 16 or older and agreed to translation by OpenAI in the app) or else Microsoft Translator' : 'Microsoft Translator'}, never your account, name or age, and we keep the translations with the pack. If we feature your pack, you get the Featured Creator title and border, which count your featured packs and show like any title and border.`}{' '}
            Your packs{PRIVACY.communityPacks ? ', ratings and the packs you added' : ''} are kept with your account and
            deleted with it.
          </Item>
        )}
        {/* LIVE.ranked: Ranked's rating, ranks, seasons and leaderboards (legalRelease). */}
        {PRIVACY.ranked && (
          <Item label="Ranked">
            When you play Ranked, our servers work out a skill rating (MMR) for you in each Ranked game (Spy Talk and
            Spy Sketch) and season, from the results of your Ranked games only, never from your questions, answers,
            chat, drawings or votes. We keep your rating and how certain it is, your rank and your best rank in the
            season, how many Ranked games you've played, won and left, a record of each Ranked game (its result,
            whether it counted for you and why not, and your rating and rank before and after), the breaks you get for
            declining or leaving Ranked games, the season rewards (titles and borders) you earned, and whether you
            chose to show your username on the leaderboards. We use this to match you with players of similar skill,
            to show you your rank, rating and rewards, to run the leaderboards (see Data Sharing) and to keep Ranked
            fair. Your Ranked searches are kept like Play Online searches. The rest is kept with your account and
            deleted with it.
          </Item>
        )}
        {/* LIVE.tournaments: tournament entries, standings and Tournament Tokens (legalRelease). */}
        {PRIVACY.tournaments && (
          <Item label="Tournaments">
            When you sign up for a tournament, our servers keep your entry: when you signed up and checked in, your
            Ranked rank then, the tables you played at, your points, wins and place in each stage, and whether you
            withdrew, didn't show up for a game, left one or were disqualified. They also keep the Tournament Tokens
            you earned (for your place, your rank and your wins) and spent, and what you bought with them. Results are
            checked for fair play for up to 48 hours before they're final. We use this to run tournaments, give their
            titles and tokens, apply the pause for missed games and keep tournaments fair. A tournament's standings
            and winners are shown to other players (see Data Sharing). It's kept with your account and deleted with it.
          </Item>
        )}
        <Item label="Chat Messages">
          Messages you send in a room's chats (the lobby chat, the game chat, the spy chat, the chat for players
          who are out, and the game's chat on Game Over, which stays open to the players of that game for a few
          minutes after it ends) are stored on our servers so the other players in the room can read them.{' '}
          {chatRetention('Messages')} Copies made to deliver messages live are deleted within 4 days.
        </Item>
        <Item label="Questions and Answers">
          {PRIVACY.storedQuestions
            ? `The questions and answers you type in a Spy Talk interrogation go through our servers to the other players and are kept like chat messages, so they can be checked if someone reports them. ${chatRetention('Those')}`
            : "The questions and answers you type in a Spy Talk interrogation go to the other players in the game through our servers as they're sent; we don't store them."}
        </Item>
        <Item label="Voice Input">
          When you use the microphone to say a chat message, a question or an answer, Apple's or Google's speech
          recognition on your device turns what you say into text, and may send the recording to Apple or Google to
          do this, under their privacy policies.
          {`${from22 ? ' From version 2.2, on' : ' On'} iPhone and iPad, when you say a question or an answer, the app also gives Apple's speech recognition the names of the players in your game (as the game shows them), to help it recognize them.`}
          {PRIVACY.browserLegal
            ? " When you play in the browser version, your browser's own speech recognition does this instead, where the browser has it, and the browser's maker (for example Google in Chrome, Microsoft in Edge, Apple in Safari) may receive the recording, under its privacy policy."
            : ''}{' '}
          We receive only the text you choose to send, never the audio.
        </Item>
        <Item label="Translations">
          {PRIVACY.autoTranslation &&
            "Chat messages, questions and answers written in a language other than your app's language are translated for you automatically, unless you turn off Translate messages automatically in the app's Settings; then a message is translated only when you tap Translate on it. Messages in your own language aren't translated. "}
          {PRIVACY.autoTranslation ? 'To translate a message' : 'When you tap Translate on a message'}, the app asks
          our translation service, which sends the text to {serverTranslator} and keeps the translation for 24 hours,
          so other players reading the same message get it without sending it again.{backupTranslation}
          {PRIVACY.onDeviceTranslation &&
            (PRIVACY.autoTranslation
              ? " Your device may also translate a message itself with Apple's or Google's on-device translation instead of asking our service (for example when our service can't translate it); the text then doesn't leave your device. Your device may first download that language's translation files from Apple or Google. On Android, the app can download them ahead of time in a room's lobby when players at your table use other languages (on Wi-Fi, or on mobile data only if you agree); during a game, only when you tap Download for that language."
              : " When our service can't translate a message, your device may translate it itself with Apple's or Google's on-device translation; the text then doesn't leave your device. The first time, your device may download that language's translation files from Apple or Google.")}{' '}
          {PRIVACY.openAiTranslation
            ? `When our service uses OpenAI, it sends OpenAI only messages written by players who told us they're 16 or older (from the birth year the app asks for) and who ${openAiAgreed}; other messages, including those from players who haven't told us their age or haven't agreed, go to Microsoft Translator. We keep your answer to that note (which version of the note you answered, and when) so that it applies on every device you use, until you answer it again or your account is deleted. Microsoft receives only the message text and the two languages, never your name or account. OpenAI receives the text of the messages being translated and the two languages. So that a translation fits the conversation, it also receives up to three other recent messages from the same chat by players 16 or older who agreed, normally the ones said just before (their text only, not who said them), and a list of names to leave as they are: the game's agent names (such as "Agent Blue") and, in a private room, the display names of the players there who are 16 or older and agreed (or the username of a player who has none). It never receives anyone's age. We send these messages to OpenAI only to translate them. For translation, our service never sends OpenAI your account or a code made from it, your email address, your device's IP address or details, the game's secret word or location, or anyone's role. OpenAI doesn't use them to train its models: it doesn't train on what is sent to its API unless the sender opts in, and we haven't. Our service also asks OpenAI not to store these requests or its answers, so they aren't kept as saved responses. Like everything sent to its API, they go into OpenAI's abuse-monitoring logs, which it keeps for up to 30 days, unless the law requires it to keep them longer or keeping them is reasonably necessary to protect its services or anyone else from harm. OpenAI may also keep an encrypted cache made from a request on its servers for up to 24 hours, so that similar requests run faster.`
            : 'Only the message text and the two languages are sent, never your name or account.'}
          {usesMyMemory &&
            " MyMemory's terms say it may keep the text it receives and use it to improve its services."}{' '}
          To keep translation within its limits and stop abuse, our servers count, for each player and day, the
          translation requests they made, the messages and characters sent to be translated, and an estimate of
          what translating them cost; these counts are deleted after 14 days.
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
          analytics or advertising trackers. Until version 2.2's launch on November 10, 2026, we also use these events
          and your device's platform to recognize saved accounts that used a test version of the app (on iPhone, Android
          or the web) and were created before November 3, 2026, and give them a Beta Pin for their avatar as a thank-you;
          we keep only that the account has it. Until the launch, we also use them, with the app's version, to let saved
          accounts that recently used a test version on a phone try features that aren't open to everyone yet, such as
          Play Online.
        </Item>
        <Item label="Rate Limits">
          To stop floods, guessing at room codes and other abuse, our servers note when an account does certain things
          (such as sending a message, joining or trying to join a room, poking a player, or saving its avatar or title),
          without what was said. Notes about joining rooms are deleted after 24 hours and the others after 2 days, even if
          the account is deleted first. To limit account emails, when you sign up, save a guest account, ask for a new
          confirmation link, reset your password or change your email address, our servers keep a record of each email
          they send: a coded form of the email address and of your network (your IP address, or for IPv6 its first
          half), made with a secret key, the kind of email and when, never the address or the IP address itself. Under
          the same code, they also count how many of these requests come from each network in an hour. These records
          are deleted after a day.
        </Item>
        <Item label="Safety Information">
          Reports you make or that are made about you, players you block, removals from rooms, and any warnings,
          mutes or bans on your account
          {PRIVACY.drawingCheck
            ? ', including the results of drawing checks, drawings taken off as evidence, removals from a game, and warnings, pauses and bans the drawing check gave'
            : ''}
          .
          {PRIVACY.drawingCheck &&
            " When a drawing is taken off or a player removed, the room's chat says whose drawing it was or who was removed."}{' '}
          As evidence, a report includes our servers' own copy of the room's last 50 messages that the person
          reporting could read there (every chat, in a public room). A report about a message, a question or an
          answer also includes that message and the chat around it (up to 20 messages before it and 10 after)
          {PRIVACY.drawingCheck ? ', and a report about a drawing includes the drawing' : ''}. Only messages we still
          keep are attached (see Chat Messages above). A report is marked urgent and read first when the person
          reporting, the player reported or anyone in that room or game is under 18 or hasn't told us their age; the
          report notes only a yes or no for this, never anyone's age. When we remove a message
          {PRIVACY.customPacks ? ', a drawing or a custom pack' : ' or a drawing'}, or replace a name that
          breaks the rules, our moderation log keeps a copy of what we removed and the old name, for as long as we
          keep reports. For each player who reports, our moderators can see how many of their reports led to action
          and how many were dismissed. We work this out from the reports we already keep, use it only to review
          reports and to find players who might help us moderate, and never show it to other players.
          {PRIVACY.groomingFlag &&
            ` We automatically flag possible grooming language in rooms with minors for human review: ${PRIVACY.groomingScope ? "in any room or game where anyone else, watchers included, is under 18 or hasn't told us their age, our servers check the messages written there by adults and by players who haven't told us their age (such as guests)" : "in any room or game where anyone, watchers included, is under 18 or hasn't told us their age, our servers check the messages adults write there"} for phrases that can be part of grooming (for example asking a younger player's age or school, asking them to keep secrets, to talk somewhere else, to meet up or to send photos, or offering gifts), and a message that has one is flagged for one of our team to review.${PRIVACY.groomingScope ? " So that this still works after a younger player leaves, our servers also note which messages were sent while someone else there was under 18 or hadn't told us their age: only the message's ID, kept on our servers and never shown to any player, for as long as we keep the message itself." : ''} A flag doesn't block, hide or change the message, isn't shown to any player and isn't a report to anyone; we decide what to do, as with a report. A flag keeps only which message it was and what kind of phrase it had, with the player's report case, for as long as we keep reports. The message itself is still deleted on the chat schedule (see Chat Messages above).`}
        </Item>
        {PRIVACY.drawingCheck && (
          <Item label="Drawing Checks">
            In public rooms (Play Online tables and events), every drawing turn in a Spy Sketch game goes through an
            automated check by OpenAI for content that breaks our Community Rules, and some are also checked by a
            second, more detailed OpenAI model. In any room, a drawing is checked by both when someone reports it. The
            app tells you once, before your drawings can be checked, that they're sent to OpenAI, and in a room where
            every turn is checked you draw only after you agree. For the first check, our servers send OpenAI's
            moderation service a picture of the turn's own lines (and any lines the player drew and then undid), with
            nothing else. The second check gets a picture of the turn (the earlier drawing in light grey) with the
            round's secret word (which helps tell an innocent drawing from an offensive one) and a code made from your
            account ID that doesn't reveal who you are, which OpenAI uses to detect misuse of its service. Our servers
            pick which drawings get the second check: every reported drawing, every drawing the first check flags, and a
            share of the rest that depends on what we already keep about the account (how many games it has played, how
            old it is, whether it's saved, and any strikes or upheld reports). We don't use this for anything else or
            show it to other players. If the second check can't give an answer, the first check's answer is used. Our
            servers never send your name, username, email address, chat or your
            device's IP address. According to OpenAI, it doesn't use what it receives to train
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
            " If you turn 13 to 16 in the year you answer, the app also asks your birth month, because the year alone can't tell whether you've had your birthday yet; we keep the month only in that case."}
          {PRIVACY.storeAgeSignals &&
            `${from22 ? ' From version 2.2, on' : ' On'} some phones, Apple or Google also tell the app an age range for your account (Apple's Declared Age Range, Google Play's Age Signals); the app uses it on your device.`}{' '}
          We use your age only to apply age limits
          {PRIVACY.openAiTranslation ? ', to choose which service translates your messages (see Translations)' : ''} and
          to protect players under 18.
          In any room or game where anyone, watchers included, is under 18 or hasn't told us their age, its chats and
          typed questions and answers block links, email addresses, websites, phone numbers and social media accounts
          and handles, for everyone there.
          {PRIVACY.groomingFlag &&
            (PRIVACY.groomingScope
              ? " Messages there that may be grooming, from adults or from players who haven't told us their age, are flagged automatically for one of our team to review (see Safety Information)."
              : ' Messages adults write there that may be grooming are flagged automatically for one of our team to review (see Safety Information).')}{' '}
          Reports involving a player under 18 are read first (see Safety
          Information), and the app shows players under 18 a one-time "Playing Safe" note with tips. Other players
          never see your age.
        </Item>
        {PRIVACY.ageGateEveryone && (
          <Item label="Agreement">
            Which version of our Terms of Service and Community Rules you agreed to in the app, when, and the version
            of the app you used.
          </Item>
        )}
        {PRIVACY.purchases && (
          <Item label="Purchases">
            {PRIVACY.membershipsOnly
              ? 'When you buy a membership in the app (Agent, the monthly Pack Pass; Elite, the yearly one; or Spymaster, Lifetime: the only things SpySocial sells; guests can buy too), Apple or Google handles the payment; we never see your payment details.'
              : 'When you buy something in the app, such as a pack, an avatar item or a membership (guests can buy too), Apple or Google handles the payment; we never see your payment details.'} To check and restore purchases, the app and our servers use RevenueCat, which
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
            {' '}The SpySocial team can also give you a pack, a membership, an avatar item, a title or a border as a gift. We keep a record of the gift
            for as long as you have an account, show you a thank-you in the app, and may say in the chat of the room you're
            in that you received it.
          </Item>
        )}
        {PRIVACY.creatorCodes && (
          <Item label="Creator and Reward Codes">
            If you enter a code in the app (Settings, then Enter a Code; you need a saved account, not a guest one), we
            record which code you entered and when, and give you its reward (such as a title or an avatar item). A
            reward code works once per account. A creator code comes from a content creator in our creator program:
            you can enter one creator code, once, and it stays with your account. From then on, so that we can pay the
            creator a share of what we earn from players who entered their code, we credit to that creator each
            purchase you make in the app, and each refund of one: we keep the store, what you bought, its price in US
            dollars, the share the store kept for its fees and taxes, the date, and a scrambled form of the store's
            transaction ID (to match a refund to its purchase). This record holds no name, email or country. You don't
            pay anything extra. The creator never learns who entered their code or what anyone bought: we tell them
            only totals for their code (such as how many players entered it and how much their share comes to). If
            you're a content creator in the program, we link your account to your code and show a CONTENT CREATOR
            badge on your profile and player card (see Data Sharing); your own purchases never count toward your share.
          </Item>
        )}
        {PRIVACY.notifications && (
          <Item label="Reminders and Notifications">
            When you tap Remind Me on a game night, we record it so the reminder reaches every device you play on;
            other players see only how many people asked to be reminded, never who. The reminder is a notification
            your device schedules and shows by itself, if you allow notifications. Play Online can also tell you
            when a match is found while the app is in the background: the first time you tap Find a Game, the app asks
            whether you allow notifications (unless you already answered). If you do, tapping Find a Game stores your
            device's push address with your account (a push token from Expo, which works through Apple's or Google's
            push service), with your device's platform, the app's version and the sign-in it was registered under; we
            send to it only while that sign-in lasts. The "Match found!" notification says only that a match was found,
            for which game and how many players, never who is in it. The app refreshes the token at most once a day,
            and the token is deleted when you sign out in the app, turn off notifications for SpySocial (the next time
            the app opens) or delete your account. A match notification waiting to be sent is kept for one day. Guests
            don't send a push token. Apart from that, the only other push notifications we send go to our moderators'
            phones when a new report comes in. They pass through Expo's push service and Apple's or Google's, and say
            only what kind of report it is and its case number, never a player's name or what was said.
            {PRIVACY.fcmAutoInit
              ? `${from22 ? ' From version 2.2, on' : ' On'} Android, when the app starts, it registers with Google's Firebase Cloud Messaging (the service that delivers push notifications on Android). Google then receives a random ID for the app's installation, which isn't linked to your account, and technical details about the app and your device, and gives the app a push address. We receive that address only for match notifications, as described above.`
              : " On Android, the push address comes from Google's Firebase Cloud Messaging (the service that delivers push notifications on Android), which the app contacts only to get one, for match notifications. Google then receives a random ID for the app's installation, which isn't linked to your account, and technical details about the app and your device."}
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
            receives your device's IP address when a report arrives but is set not to store it
            {PRIVACY.crashReportLocation
              ? '. Before it drops the address, Sentry uses it to estimate an approximate location (country, region and city), which it keeps with the report. Sentry deletes reports'
              : ', and deletes reports'}{' '}
            within 90 days.
            {PRIVACY.browserLegal
              ? ' A report from the browser version names your browser, its version and your operating system instead of the device details, and carries no installation ID.'
              : ''}
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
          Your device's platform (iOS or Android{PRIVACY.browserLegal ? ', or web for the browser version' : ''}) and
          the version of the app, which the app sends with its requests so our servers can work with every version of
          the app.
        </Item>
        {PRIVACY.browserLegal && (
          <Item label="Your Browser">
            The browser version keeps your sign-in and your choices on that computer (such as your language and the
            tips you've seen) in your browser's storage, and while you're signed in, some game data so it loads
            quickly (such as recent room codes and, once you play, other players' avatars). Signing out removes your sign-in and that
            game data from the browser; your choices stay until you clear the browser's data. It uses no cookies, and
            we don't use your browser's storage for advertising or tracking. While playing in the browser version is
            invite-only, we keep a list of the players we've invited to play in it (the email address or account we
            invited, with a short note), use it only to let them play there, and delete it once playing in a browser
            opens to everyone.
          </Item>
        )}
        <Item label="IP Address">
          Our servers and service providers see your device's IP address whenever the app connects to them, as any
          internet service does. Our sign-in service keeps the IP address and user agent (a short description of the
          app and device making the request) of each signed-in session, to protect your account, until the session
          ends when you sign out or delete your account. To check that it's online, the app contacts our servers now and then; on iPhones it also contacts
          Google (clients3.google.com), which receives your device's IP address and nothing else about you.
          {PRIVACY.fairPlaySignals ? (
            <>
              {' '}To keep public games fair, when you join a room, watch a game, search Play Online or play, we keep a coded form of
              your network (your IP address, or for IPv6 its first half), made with a key that changes daily and is
              deleted when the day ends; we never store the address. We use it only to notice several accounts playing
              from one network: to avoid seating them at the same Play Online table, for our experience-point rules on
              alternate accounts, and for moderation reviews. Codes are kept 14 days; the record that two accounts in a
              game shared a network, 30 days.
            </>
          ) : null}
        </Item>
        <Item label="Signed Agreements">
          If you sign an agreement with SpySocial on our website (for example a creator or partner agreement), we
          record your name, email address, the details you enter (such as your legal or company name and channel),
          your typed and any drawn signature, the time you signed, your IP address and your browser's user agent. We
          keep them with the signed agreement and its audit trail, which we email to every party, and use them only
          as a record of the agreement and to establish, exercise or defend legal claims, for 7 years after the
          agreement ends.
        </Item>
      </Bullets>

      <H2>How We Use Your Information</H2>
      <P>We use your information to:</P>
      <Bullets>
        <ListItem>Create and manage your account</ListItem>
        <ListItem>Enable multiplayer game functionality, chat and translation</ListItem>
        {PRIVACY.purchases && <ListItem>Provide and restore what you buy</ListItem>}
        {PRIVACY.creatorCodes && (
          <ListItem>Give you the rewards of the codes you enter, and credit and pay the content creators whose codes players enter</ListItem>
        )}
        {PRIVACY.intel && (
          <ListItem>
            {PRIVACY.intercepts ? 'Give you Intel and your daily streak' : 'Give you Intel, your daily streak and the items you unlock with Intel'}
          </ListItem>
        )}
        {PRIVACY.intercepts && <ListItem>Give you Intercepts and the items in them</ListItem>}
        {PRIVACY.customPacks && (
          <ListItem>
            Keep your custom packs and check their text{PRIVACY.communityPacks ? ', review and show Community Packs, count their ratings and adds, and give creators their titles' : ''}
            {PRIVACY.featuredPacks ? ', and translate and play the packs we feature' : ''}
          </ListItem>
        )}
        {(PRIVACY.ranked || PRIVACY.tournaments) && (
          <ListItem>
            Run {PRIVACY.ranked ? 'Ranked and its leaderboards' : ''}
            {PRIVACY.ranked && PRIVACY.tournaments ? ', and ' : ''}
            {PRIVACY.tournaments ? 'tournaments, their standings and Tournament Tokens' : ''}
          </ListItem>
        )}
        {PRIVACY.notifications && (
          <ListItem>Remind you of the game nights you asked about, and tell you when a Play Online match is found</ListItem>
        )}
        <ListItem>Improve and optimize the app experience</ListItem>
        <ListItem>Troubleshoot issues{PRIVACY.crashReports ? ', fix crashes' : ''} and provide support</ListItem>
        <ListItem>Analyze usage patterns to enhance game design and user experience</ListItem>
        <ListItem>Protect against fraudulent or unauthorized activity</ListItem>
        <ListItem>
          Keep players safe: review reports{PRIVACY.drawingCheck ? ', check drawings' : ''}, apply age limits, protect
          players under 18, and enforce our Terms of Service and Community Rules
        </ListItem>
      </Bullets>

      <H2>Legal Basis for Processing</H2>
      <P>Where the law asks for one (for example in the European Economic Area and the UK), we rely on:</P>
      <Bullets>
        <Item label="Performance of Contract">
          To run your account and your games, deliver your chat,{' '}
          {PRIVACY.autoTranslation ? 'translate messages for you' : 'translate what you ask us to translate'}
          {PRIVACY.purchases ? ', provide what you buy' : ''}
          {PRIVACY.creatorCodes ? ", give you a code's reward" : ''}
          {PRIVACY.intel ? (PRIVACY.intercepts ? ', give you Intel' : ', give you Intel and what you unlock with it') : ''}
          {PRIVACY.intercepts ? ', give you Intercepts and their items' : ''}
          {PRIVACY.customPacks ? ', keep your custom packs' : ''}
          {PRIVACY.communityPacks ? ', show Community Packs and their ratings' : ''}
          {PRIVACY.ranked ? ', run Ranked and its leaderboards' : ''}
          {PRIVACY.tournaments ? ', run tournaments' : ''}
          {PRIVACY.notifications ? ', remind you of the game nights you asked about and tell you when a match is found' : ''}.
        </Item>
        <Item label="Legitimate Interests">
          To keep players safe (reports, the word filter{PRIVACY.groomingFlag ? ', flags of possible grooming' : ''}
          {PRIVACY.drawingCheck ? ', drawing checks' : ''}
          {PRIVACY.customPacks ? ', the automated check of custom packs' : ''}
          {PRIVACY.communityPacks ? ', the review of Community Packs' : ''}, moderation, age
          limits and the protections for players under 18), protect accounts and prevent abuse
          (security logs), keep the app working{PRIVACY.crashReports ? ' (crash reports)' : ''}, and improve it (usage
          events){PRIVACY.creatorCodes ? ', and credit and pay the content creators whose codes players enter (creator codes)' : ''}.
          You can object to this processing at any time by emailing <SupportEmail />.
        </Item>
        <Item label="Consent">
          For your device's permissions (the microphone and speech recognition
          {PRIVACY.notifications ? ', notifications' : ''}
          {PRIVACY.qrScanner ? ', the camera' : ''}). You can withdraw it at any time in your device's settings
          {PRIVACY.browserLegal ? " (in the browser version, in your browser's settings for the site)" : ''}.
        </Item>
        <Item label="Legal Obligations">
          To comply with the law, for example to answer lawful requests and to report child sexual exploitation.
        </Item>
      </Bullets>

      <H2>Data Retention</H2>
      <P>
        We keep your account information and game data for as long as you have an account.{' '}
        {chatRetention(PRIVACY.storedQuestions ? 'Chat messages and typed questions and answers' : 'Chat messages')} Copies
        made to deliver them live are deleted within 4 days. Translations are kept for 24 hours, and daily translation
        counts for 14 days.
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
          : '.'}{' '}
        Rate-limit notes are deleted after 2 days, notes about joining rooms after 24 hours, and the coded records of
        account emails and sign-up requests after a day.
        {PRIVACY.intel ? ' Your Intel, its history and your daily streak are kept for as long as you have an account.' : ''}
        {PRIVACY.intercepts ? ' Your Intercepts and what they gave you are kept for as long as you have an account.' : ''}
        {PRIVACY.customPacks
          ? ` Your custom packs${PRIVACY.communityPacks ? ', your ratings and the Community Packs you added' : ''} are kept until you delete them or your account.${PRIVACY.communityPacks ? ' The record of a pack\'s review, and reports about a pack (with the pack as it was), are kept as long as we keep reports.' : ''}`
          : ''}
        {PRIVACY.ranked ? ' Your Ranked ratings, game records, breaks and rewards are kept for as long as you have an account.' : ''}
        {PRIVACY.tournaments ? ' Your tournament entries, results and Tournament Tokens are kept for as long as you have an account.' : ''}
        {PRIVACY.creatorCodes
          ? " The codes you entered stay with your account for as long as you have it. The purchases credited to a content creator are kept for as long as we need them to pay the creator and keep our accounting records (up to 7 years after the creator's agreement ends)."
          : ''}
      </P>
      <P>
        We may remove accounts that haven't been used for 12 months, after telling you in the app or by email where
        we can. We don't remove an account that holds a purchase or a membership this way. This cleanup doesn't run
        automatically yet, so for now an unused account stays until you delete it or ask us to delete it.
      </P>
      <Text textStyle="body" color="ss.text" fontWeight="500">When you delete your account</Text>
      <P>
        You can delete your account in the app at any time (Account, then Settings, then Delete Account; signing out of a guest
        account deletes it), or ask us to delete it (see{' '}
        <ChakraLink as={Link} to="/delete-account">Delete Your Account</ChakraLink>).
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
          {PRIVACY.notifications
            ? ', and delivers our push notifications (match notifications and the report alerts our moderators get)'
            : ''}
          . When the app checks for an
          update, Expo receives your device's IP address and platform, the app's version, and a random ID the app
          creates for that installation, which isn't linked to your account.
        </Item>
        <Item label="Microsoft">
          (Azure AI Translator, https://azure.microsoft.com/products/ai-services/ai-translator) Translates the text of a
          message{' '}
          {PRIVACY.autoTranslation
            ? 'when the app translates it for you (automatically, or when you tap Translate)'
            : 'when you tap Translate'}
          {PRIVACY.openAiTranslation
            ? ", if our translation service uses Microsoft rather than OpenAI, and always for messages from players under 16, from players who haven't told us their age, and from players who haven't agreed in the app to translation by OpenAI"
            : ''}
          .
          {PRIVACY.featuredPacks &&
            ` It may also translate the Community Packs we feature${PRIVACY.openAiTranslation ? ', when our service uses it for them' : ''} (only their text, see Custom Packs and Community Packs above).`}
        </Item>
        {usesOpenAi && (
          <Item label="OpenAI">
            (https://openai.com){' '}
            {PRIVACY.drawingCheck &&
              'Checks drawings for content that breaks our Community Rules: every drawing turn in public rooms gets an automated check, some also get a second, more detailed check, and so do drawings players report. '}
            {PRIVACY.openAiTranslation &&
              `${PRIVACY.drawingCheck ? 'It also translates' : 'Translates'} messages when our translation service uses it (see Translations above), only messages written by players who told us they're 16 or older and agreed to it in the app, and we send them to it only for that: it receives the text of the messages being translated, up to three other recent messages from the same chat by such players (without who said them), a list of names to leave as they are (agent names and, in private rooms, the display names of such players) and the two languages, never your account or anyone's age. Our service asks OpenAI not to store these requests or its answers. `}
            {PRIVACY.customPacks &&
              `${PRIVACY.drawingCheck || PRIVACY.openAiTranslation ? 'It also checks' : 'Checks'} the text of every custom pack (its name, description and entries) with its moderation model before anyone else can play or see it (see Custom Packs above); it receives only that text, never who made the pack. `}
            {PRIVACY.featuredPacks &&
              PRIVACY.openAiTranslation &&
              'When our translation service uses it for the Community Packs we feature, it receives only the pack\'s name, description and entries and the languages, never who made the pack. '}
            Under OpenAI's API terms and its Data Processing Addendum, it{' '}
            {PRIVACY.openAiTranslation
              ? "doesn't use what it receives to train its models, and keeps it for up to 30 days to monitor abuse, unless the law requires it to keep it longer or keeping it is reasonably necessary to protect its services or anyone else from harm."
              : "doesn't use them to train its models and keeps them for at most 30 days to monitor abuse."}
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
          {PRIVACY.notifications ? ", delivering push notifications (in the Android app, Google's Firebase Cloud Messaging)" : ''}
          {PRIVACY.storeAgeSignals ? ', age signals' : ''}, and distribution of the app through the App Store and Google
          Play. On iPhones, the app's connection check contacts Google.
        </Item>
        {PRIVACY.resendAccountEmail && (
          <Item label="Resend">
            (Plus Five Five, Inc., https://resend.com) Sends our account emails, such as sign-up confirmations and
            password resets, and the emails for agreements signed on our website (the signed agreement and its audit
            trail), so it receives the email addresses and the emails it delivers.
          </Item>
        )}
        <Item label="Vercel">
          (https://vercel.com) Hosts our website, spysocial.app,
          {PRIVACY.browserLegal
            ? ' and the browser version of the game, play.spysocial.app, and receives the IP address of their visitors.'
            : ' and receives the IP address of its visitors.'}
        </Item>
        {PRIVACY.merchShop && (
          <Item label="Fourthwall">
            (Fourthwall, Inc., https://fourthwall.com) Runs our merch shop, shop.spysocial.app, and sells and ships its
            orders (see Merch Shop below).
          </Item>
        )}
        <Item label="ImprovMX and Google">
          Email you send to support@spysocial.app is forwarded by ImprovMX and read in Google's Gmail. When you use
          Report a Problem in the app's Settings, the email it prepares also lists the app's version and update, your
          phone's model and operating system, and the app's language, to help us find the problem; nothing is sent
          until you send the email, and you can delete those lines first.
        </Item>
      </Bullets>
      <P>
        We give these providers only the data they need to provide their service. Supabase, Expo, Microsoft
        {usesOpenAi ? ', OpenAI' : ''}
        {PRIVACY.purchases ? ', RevenueCat' : ''}
        {PRIVACY.crashReports ? ', Sentry' : ''}
        {PRIVACY.resendAccountEmail ? ', Resend' : ''} and Vercel process it for us under contracts that bind them to protect it
        at least as well as this policy does. Apple, Google{usesMyMemory ? ', Translated (MyMemory)' : ''} and ImprovMX
        handle what they receive under their own terms and privacy policies.
      </P>

      {PRIVACY.merchShop && (
        <>
          <H2>Merch Shop</H2>
          <P>
            SpySocial merch is sold and fulfilled by Fourthwall (Fourthwall, Inc.), which runs our shop at{' '}
            <ShopLink /> for us. To take and ship your order, Fourthwall processes your order data: your name,
            shipping address and email address, what you order, and your order history. You pay through Fourthwall's
            payment processors, such as Stripe and PayPal, which receive your payment details (such as your card
            number and billing address); we never see your card details. Fourthwall's print partners and carriers get
            what they need to print and deliver your order, such as your name and shipping address.
          </P>
          <P>
            We receive the details of each order (what was bought, and the name, shipping address and email address it
            was ordered with) for our records and to help with questions about it. Shop orders aren't linked to your
            SpySocial account, so deleting your account doesn't delete them.
          </P>
          <P>
            Fourthwall is responsible for payment, tax and returns, under its own terms. Its{' '}
            <ChakraLink href="https://fourthwall.com/legal/privacy-policy" isExternal>
              privacy policy
            </ChakraLink>{' '}
            gives no fixed period for keeping order data: it keeps it as long as needed for orders, tax and legal
            obligations, and then deletes it or keeps it in a form that no longer identifies you. To see, correct or
            delete your order data, or for any other privacy request about the shop, email <SupportEmail /> or
            Fourthwall at privacy@fourthwall.com.
          </P>
        </>
      )}

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
        We do not sell your personal information or share it for targeted advertising. At Play Online tables and game
        nights (public play), other players see you as an agent named after your color (for example, "Agent Blue"),
        never by your display name; your display name is shown only in private rooms. Other players in your room see
        your display name (private rooms) or agent name (public play), username
        {PRIVACY.agentColoursPhase2 ? ' (in public play too, including during a game)' : ''},{' '}
        {photosShown(PRIVACY) ? 'profile photo or avatar' : 'avatar'}, color, level, badges
        (including a membership badge), the title and border you wear, and achievements,
        {/* One pool: no language badges; versions before 2.2 show the language a room is played in. */}
        {PRIVACY.oldAppsInUse ? ' the language you play in,' : ''} whether you've stepped away (and
        for how long), and the messages you send there. If you're a member, your title and border show your
        membership (for example, the Spymaster title and its gold border) unless you choose another title and border,
        or None; a title or border that shows a membership is shown only to players who share a room with you or played
        a game with you in the last 24 hours, and with a room you host in the room list.
        {PRIVACY.creatorCodes &&
          " A content creator in our creator program shows a CONTENT CREATOR badge on their profile and player card to the players who share a private room with them or played a game in one with them in the last 24 hours; it isn't shown in public play. A title a creator code or a reward code gave you shows like any other title. We tell a content creator only totals for their code, never who entered it or what anyone bought."}
        {/* Agent Colours phase 2: get_my_game_view and get_watch_view send a pre-2.2 photo only to its owner at public tables. */}
        {PRIVACY.agentColoursPhase2 &&
          photosShown(PRIVACY) &&
          ' A profile photo added with a version of the app before 2.2 is never shown to other players at Play Online tables or game nights; only private rooms show it.'}
        {/* photosPrivate (2026-10-20): the photos are in private storage; no app shows them to anyone. */}
        {PRIVACY.photosPrivate &&
          photosInUse(PRIVACY) &&
          " Profile photos added with versions of the app before 2.2 aren't shown to other players anywhere."}{' '}
        Someone who opens a room's link or code while a Spy Sketch game
        is running can watch it until the next game: they see the same things
        {PRIVACY.agentColoursPhase2
          ? ' the players do (in public play, agent names and usernames, never a display name or profile photo)'
          : ''}
        , the drawing and the room's chat, but
        never a role or the secret word before every player can see it, or anyone's vote.
        {PRIVACY.agentColoursPhase2 &&
          " In a private room, the players see who is watching by display name; in public play, they see only how many people are watching and an agent name for each."}
        {/* LIVE.developerWatch: the developer's visible watch at public tables (legalRelease). */}
        {PRIVACY.developerWatch &&
          ` SpySocial's developer may join game night tables, and other live Play Online tables, as a visible watcher. The table is told when he joins ("The developer has joined.") and he counts among its watchers. He sees only what any watcher sees: the players' public names, the questions, answers and general chat, and what the game shows everyone; never anyone's role, the secret word or location, votes before they're revealed, or the spies' chat or the chat for players who are out. His messages show as "DEV Developer" and go through the same chat filters and safety checks as everyone's${PRIVACY.groomingFlag ? ', including the automated grooming check in rooms with players under 18 (see Safety Information)' : ''}. We keep a record in our moderation log that he watched a table (the table, the game and the time). He never takes a seat, but for safety or a broken rule he may act while watching: mute a player for the rest of that game (their messages in the game's general chat are removed and they can't send more), remove a player from the game and the room, ban a player's account (for 24 hours, 7 days or permanently), or end the game early for everyone with no result. When he removes a player or ends a game, the table's chat says so, without naming anyone. Each time, we keep a record of what he did and why, with our servers' copy of the game's last 50 messages, questions and answers and the player's own messages and answers in that game (never the spies' chat or the chat for players who are out), as evidence for as long as we keep reports (see Safety Information).`}{' '}
        When you play the mini-game, players who are out of that game and, once it's over, everyone who played it see
        the game's best score and the room's best score ever, with the name of the player who set it: their display
        name in private rooms, and in public play their agent name (or "A player" if they weren't in that game).{' '}
        Private rooms that aren't locked, whether waiting for players or playing a game, and game nights, are listed
        for all players with their hosts' display names, avatars, titles and borders (a private room still needs its code
        to join).
        {PRIVACY.agentColoursPhase2 &&
          ` A game night run by a stand-in host (a player who took over from the host who scheduled it) is listed, and named on its page, under that player's agent name${photosShown(PRIVACY) ? ', with no profile photo' : ''}.`}
        {PRIVACY.playOnline && ' Play Online shows only how many players are searching and playing, never who.'}
        {/* LIVE.ranked: get_ranked_leaderboard (adults only; @username only when chosen). */}
        {PRIVACY.ranked &&
          ' Ranked leaderboards show the top 100 players of each Ranked game in a season, with their rank and rating, to every player who opens them: by agent name (for example, "Agent Blue"), or by username if the player chose that in the app. Players under 18, and players who haven\'t told us their age, are never shown on a leaderboard.'}
        {/* LIVE.tournaments: get_tournament (standings between stages, the winners). */}
        {PRIVACY.tournaments &&
          " A tournament's standings (after each stage, never during one) and its winners are shown, with their points and places, to every player who opens that tournament in the app: by username, or by agent name for players under 18 and players who haven't told us their age."}
        {/* LIVE.communityPacks: an approved pack is public (legalRelease). */}
        {PRIVACY.communityPacks &&
          " A custom pack you submit to Community Packs is shown to every player once we approve it, with your display name as its creator, its ratings and how many players added it (see Custom Packs and Community Packs above); never who rated or added it."}{' '}
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
    </LegalPage>
  )
}

export default Privacy
