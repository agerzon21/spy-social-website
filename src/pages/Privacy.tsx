import { Text, Link as ChakraLink, ListItem } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AfterDeletionLaw, AfterDeletionList } from '../components/legal/AfterDeletion'
import { ShopLink } from '../components/legal/ShopLink'
import { HELLO_STRINGS } from '../hello/strings'
import { useLang } from '../i18n'
import { deletedAlso, deletedSummary } from '../lib/legalText'
import {
  LLC_SINCE,
  LLC_STORE_NOTE,
  OPERATOR,
  PRIVACY,
  PRIVACY_LAST_UPDATED,
  avatarsLive,
  creatorShortLive,
  photosInUse,
  photosShown,
  usesMlKit,
} from '../lib/legalRelease'
import { LegalPage } from '../components/legal/LegalPage'
import { B, Bullets, H2, P } from '../components/legal/LegalText'

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


/** The launch reminder (LIVE.launchReminder): the binding English, and above it the same words in the visitor's language. */
const LaunchReminderSection = () => {
  const { lang, language } = useLang()
  return (
    <>
      <H2 id="launch-reminder">Launch Reminder</H2>
      {lang !== 'en' && (
        <P>
          <span lang={lang} dir={language.rtl ? 'rtl' : 'ltr'} style={{ display: 'block', hyphens: 'manual', WebkitHyphens: 'manual' }}>
            {HELLO_STRINGS[lang].privacyText}
          </span>
        </P>
      )}
      <P>
        <span style={{ hyphens: 'manual', WebkitHyphens: 'manual' }}>
        {HELLO_STRINGS.en.privacyText} Backup copies expire within 30 more days. Supabase stores them for us and Resend
        sends the email, which has its own line to remove you. Before sending, we check that the address's domain can
        receive mail (a DNS lookup). We don't keep your IP address with the reminder; our host's own request logs see IP
        addresses, as the IP Address item says.
        {PRIVACY.reminderNetworkCap1108
          ? " To stop one network from filling the list, we count each hour's sign-ups from it using a one-way code made from its IP address (for IPv6, the address's first half) with a secret key, and delete that count after about two hours; we never keep the IP address itself, and the code is never stored with an email address."
          : ''}{' '}
        Asking for a reminder doesn't create a SpySocial account, and the
        reminder isn't linked to one even if you have one, so Delete Account and the data export don't reach it: write
        to support and we remove that address. We don't use it for anything else or share it for marketing.
        </span>
      </P>
    </>
  )
}

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
  // Translation v3 (legalRelease): messages translated when sent (translateSendTime), and Microsoft out of messages,
  // their under-16, undeclared and not-agreed lines translated only on the readers' devices (messagesOnDeviceOnly).
  const sendTime = PRIVACY.openAiTranslation && PRIVACY.translateSendTime
  const msOff = PRIVACY.openAiTranslation && PRIVACY.messagesOnDeviceOnly
  // The bridge drop (legalRelease microsoftOff): Microsoft translates nothing, packs included (translate-pack v10).
  const msGone = msOff && PRIVACY.microsoftOff
  // Who translates custom packs on our servers.
  const packTranslator = msGone
    ? 'OpenAI'
    : PRIVACY.openAiTranslation
      ? "OpenAI (or, only when OpenAI can't translate it at that moment, Microsoft Translator)"
      : 'Microsoft Translator'
  const serverTranslator = msOff
    ? 'OpenAI'
    : PRIVACY.openAiTranslation
      ? 'Microsoft Translator (Azure AI Translator) or OpenAI, depending on which our service uses,'
      : 'Microsoft Translator (Azure AI Translator)'
  // OpenAI is a provider for drawing checks, translation, the custom packs' text check (LIVE.customPacks) or all three.
  const usesOpenAi = PRIVACY.drawingCheck || PRIVACY.openAiTranslation || PRIVACY.customPacks || PRIVACY.spybots || PRIVACY.practiceAi
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
          ? ` SpySocial is run by ${OPERATOR.legalName}${OPERATOR.address ? `, ${OPERATOR.address}` : ''}, ${OPERATOR.isCompany ? 'which' : 'who'} is responsible for your personal data (the "controller").`
          : ''}
      </P>
      {LLC_SINCE && (
        <P>
          <B>Change on {LLC_SINCE}:</B> {OPERATOR.legalName} owned by {OPERATOR.person}, now runs SpySocial and is the
          controller of your personal data, in place of {OPERATOR.person} himself. Your information moved to it under
          this privacy policy (see If SpySocial Changes Hands). Nothing changed in what we collect, how we use it or who
          we share it with, and you don't need to do anything.{LLC_STORE_NOTE ? ` ${LLC_STORE_NOTE}` : ''}
        </P>
      )}

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
          {PRIVACY.usernameLimit &&
            " When you change your username, we keep a record of your past usernames and when you changed them, so we can apply the limit of one change every 30 days (a new account's first changes don't count); it's deleted with your account."}
          {PRIVACY.socialSignIn &&
            ' If you sign in with Apple or Google, we receive the email address they share with us (with Apple, this can be a relay address that forwards to you), an ID for your Apple or Google account and, the first time you sign in with Apple, the name you choose to share (a new account takes its first name as its display name). With Google, we also receive the name on your Google account and a link to its profile picture; our sign-in service keeps them with your account, and the app doesn\'t use them. On iPhone and iPad, Google\'s sign-in may also use your device\'s IP address to estimate a general location, and collect a device identifier and usage information for Google\'s own analytics, under Google\'s privacy policy.'}
        </Item>
        <Item label="Profile Preferences">
          Your interface language (one of the ten languages the app offers), your colors (a 1st, 2nd and 3rd choice: each room gives you the first one that's free) and similar settings, so the app
          looks and reads the way you chose. Our servers also use your language to show you the game (the secret
          word or location, its description and the spy's list) in it, and to count the different languages at a
          table for an achievement. The app can also tell the players in a room which app languages are used at their
          table, never whose.{PRIVACY.audit1103 ? ' Our sign-in service keeps your language with your account too, and some of the emails we send you use it.' : ''}
        </Item>
        <Item label="Game Data">
          Information related to games you've played: your role, the actions you take in a game (such as when you ask
          and answer, vote, guess, or leave), the drawings made in a Spy Sketch game, and the results. We use it to
          run the game, keep score, award experience points, levels and achievements, and check that games are played
          fairly. A game's drawing, including lines a player drew and then undid, is deleted 24 hours after the game
          ends in a private room, or 14 days after in a public room; a record of which player drew each turn is kept for 90 days so reports can be checked. When you leave a room or are removed from one, we note how your place in it ended (you left, the host removed you, or the game did), so your other devices can tell you what happened for the next 24 hours.{PRIVACY.retentionSweep ? ' The note is deleted after those 24 hours.' : ' The note is deleted the next time you leave a room, or with your account.'}
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
          {PRIVACY.coverage1110 &&
            " Players who are out can also play Safecracker, and anyone can play Night Glide, Safecracker and Rooftop Run at any time in the Arcade. For each of these games we keep your best Arcade score, how many scores you sent, and when you last opened the game, sent a score and set your best, so we can check that a score could be reached in the time you played. Some Arcade scores earn secret achievements, with their titles and an accessory for your agent; these rewards stay with your account and can't be traded. It's kept with your account and deleted with it."}
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
            When you play in our Game Night, our servers keep which week you played, whether each game you
            played there counted toward the night's titles, and, when you get titles (the night's titles, or a bonus
            title the developer gives at a table he visits), which titles, the game they came from (if any) and when.
            We use this to give each account each title once, to show you a notice in the app, and to check that
            titles are won fairly. Game Night seats you through Play Online, so your Game Night search is kept like a
            Play Online search{PRIVACY.playOnline ? ' (see Play Online above)' : ''}, with the night it was for. When
            the developer gives a bonus title at a table, that table's chat says who got it, by the name the table
            shows. The titles are cosmetic and kept with your account, and this information is deleted with it. Apart
            from that chat line, it doesn't leave our servers and isn't shared with anyone
            {PRIVACY.mintedCollectibles
              ? ", except that each title is a minted copy on the public ledger, under a holder code and never your name (see Collectibles and the public ledger)."
              : '.'}
          </Item>
        )}
        {/* LIVE.intel: Intel (the server's "coins") and the daily streak (legalRelease). */}
        {PRIVACY.intel && (
          <Item label="Intel and Daily Streak">
            Intel is SpySocial's in-app currency. It's earned only by playing: it can't be bought.
            {PRIVACY.coverage1110 &&
              (PRIVACY.launchSite
                ? ' While SpySocial was being tested, we also gave test Intel to testers and to our own accounts under a published incident (I-2), and took all of it back on December 7, 2026.'
                : " While SpySocial is being tested, we also give test Intel under a published incident (I-2): 50,000 once to each saved account that signs in to a test version before November 13, 2026, and what we choose to our own accounts. It's a line in your Intel history like any other, can be spent and traded, and is all taken back on December 7, 2026 (see our Terms, section 9).")}
            {PRIVACY.intercepts ? ` You also get it by shredding spare copies of items. ${PRIVACY.blackMarket ? (PRIVACY.launchSite ? 'Adults can spend it on the Black Market (see below) and trade it with other adults (see Trades).' : 'Adults can trade it with other adults (see Trades), and spend it on the Black Market (see below) once version 2.2 opens to everyone, or before that in a test whose sales are undone.') : 'For now there\'s nothing to spend it on.'} The Intel for your first game of the day and your streak waits until you claim it in the app; we keep each day's reward, and when you claimed it, with your account.` : ''} When a game you
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
              (PRIVACY.intelLedger
                ? ' The history also records the Intel you get by shredding a spare copy of an item, and which part of your balance is locked (Intel that will never be tradable: Intel we give everyone an announced outage affected, a bug refund we give one player, or test Intel on our own test accounts).'
                : ' The history also records the Intel you get by shredding a spare copy of an item, and which part of your balance is locked (Intel we added ourselves, which will never be tradable).')}
            {PRIVACY.intelLedger &&
              " Each line of your Intel history (your Intel ledger) also records who caused it (a game, you, or us), when, and the app version and platform it came from, so that we can find everyone a bug affected. Lines are only ever added: we never change or delete one."}{' '}
            Other players never see your Intel or your streak, and we look at Intel only as totals across all
            players{PRIVACY.intercepts ? '' : ' (for example to set prices)'}.
            {PRIVACY.intelLedger
              ? " Your balance and streak are deleted with your account. The lines of your Intel ledger are kept for good, so that the totals stay right and can be checked: when you delete your account, we remove who they belonged to, and we drop the app version and platform from lines more than 2 years old. None of it leaves our servers."
              : " It's kept with your account and deleted with it, and it doesn't leave our servers."}
          </Item>
        )}
        {/* LIVE.intelCorrections: Economy Integrity E1, Intel corrections (legalRelease). */}
        {PRIVACY.intel && PRIVACY.intelCorrections && (
          <Item label="Intel Corrections">
            We correct Intel only by reversing one line of a player's Intel ledger, refunding a bug we've published as an
            incident,{PRIVACY.accountNotices ? " refunding one player for a bug that cost only them Intel," : ''} taking back what a closed fair-play case covers, or giving everyone an announced outage affected the
            same Intel (see our <ChakraLink as={Link} to="/terms">Terms</ChakraLink>, section 9), and we take back a Unique only
            for a published incident or a closed fair-play case. For each correction we keep: its kind, the amount, the
            accounts and ledger lines it covers, its reason, its evidence (the line it reverses, the incident, or the
            fair-play case), our moderator's private note, who proposed and approved it and when, whether it waited 24
            hours or was cancelled, any appeal, and a fingerprint (a SHA-256 hash) of the record. A copy of each correction,
            with that fingerprint and the username of the account it affects, is e-mailed to our own support inbox through
            Resend, so a record can be checked against a copy we can't change later. A fair-play case we open for a
            correction is kept like any other report. Each day we record, and from the launch we publish in our monthly
            transparency report, each correction's kind, amount, reason and day, and its incident or the category of its
            case. The record carries a code made from the ledger line and a secret kept for your account, so nothing
            published links it to you, your username or your other items. We never publish who was corrected, a balance or a
            history, or what a case found; any number covering fewer than 5 players shows as "fewer than 5". Correction
            records are kept for good; when an account is deleted, we remove who they belonged to.
          </Item>
        )}
        {/* LIVE.intercepts: Intercepts (the server's "crates"), earned only (legalRelease). */}
        {PRIVACY.intercepts && (
          <Item label="Intercepts">
            Intercepts are sealed rewards that each open into one random item (such as a look for your agent, a
            celebration or a title). {PRIVACY.interceptsMarket
              ? `They're earned by playing, or given by us, and never bought with money; an adult can also buy an unopened one from another adult with Intel on the Black Market${PRIVACY.interceptsInTrades ? ', or get one in a trade with a friend' : ''}.`
              : "They're earned only by playing, or given by us, never bought, with money or with Intel."} Our servers keep each Intercept you get: when, how you got it (the Play Online game that completed a
            set of 10 wins, your first Play Online game of the day or a streak milestone, a Game Night win, a code you
            entered, or a gift from us, with its reason{PRIVACY.interceptsMarket ? `, or the Black Market sale${PRIVACY.interceptsInTrades ? ' or trade' : ''} it came from` : ''}) and its tier; whether you've claimed it yet (a daily one) or
            it's waiting for your first Play Online game that counts (one from a code); when you've seen the app's
            notices about your Intercepts (such as Welcome Back); and, once you open it, when, the item and
            its rarity, whether you already had that item, and for a Unique, its number and colour. We keep every copy
            you get, the Intel you get when you shred a spare one, and each trade-up (the spare copies it used, the odds
            it used and the item it gave). They also keep your progress toward your next
            Intercepts and the counts behind any guarantee the app shows. All of this comes from the games you play and
            the codes you enter: private-room games, and games that give no Intel (for example a game you left or one
            our fair-play checks flag), don't count.{' '}
            {/* LIVE.launchSite: 2.2 is out, so the reset before it is told in the past (site-launch-walk). */}
            {PRIVACY.launchSite
              ? 'Before version 2.2 opened to everyone, Intercepts started fresh: the Intercepts, copies and trade-ups from before then (for example from testing) were wiped, and the items that from then on come only from Intercepts were taken back from every account (the Beta Pin and anything bought in a store excepted).'
              : 'Before version 2.2 opens to everyone, Intercepts start fresh: the Intercepts, copies and trade-ups from before then (for example from testing) are wiped, and the items that from then on come only from Intercepts are taken back from every account (the Beta Pin and anything bought in a store excepted).'}{' '}
            We keep a record of what was wiped and taken back from yours, and of the look or title
            it replaced, so that we can put it back if we have to. We use all
            this to give you your Intercepts and their items, to show them to you in the app, and to check that
            Intercepts are earned fairly and that the odds work as the app shows them. Other players never see your
            Intercepts{PRIVACY.interceptsMarket ? (PRIVACY.interceptsInTrades ? ' unless you offer an unopened one in a trade or list it on the Black Market (where your name isn\'t shown); we keep each Intercept\'s trades and sales like those of any item (see Trades and Black Market)' : ' unless you list an unopened one on the Black Market (where your name isn\'t shown); we keep each Intercept\'s sales like those of any item (see Black Market)') : ''};{' '}
            {PRIVACY.blackMarket
              ? "they see an item from one only when you wear it, show it on your profile, offer it in a trade, or list it on the Black Market (where your name isn't shown)."
              : 'they see an item from one only when you wear it, like any other look.'}{' '}
            We look at Intercepts only
            as totals across all players (and at a player's own Intercepts only to answer a question or check a
            problem). It's kept with your account and deleted with it, and it doesn't leave our servers
            {PRIVACY.mintedCollectibles
              ? ", except that each item an Intercept gives is a minted copy on the public ledger, under a holder code and never your name (see Collectibles and the public ledger)."
              : '.'}
          </Item>
        )}
        {/* LIVE.mintedCollectibles: minted collectibles and the public ledger (legalRelease). */}
        {PRIVACY.mintedCollectibles && (
          <Item label="Collectibles and the public ledger">
            Game Night titles, the Beta Pin, the Field Tester title and every item from an Intercept are minted: each
            copy has its own number. For each copy you get, our servers keep your account, the copy's holder code,
            when it was earned and when it was minted, how it was earned (the Game Night and game, the Intercept or
            trade-up, or the beta tester list and why you're on it), whether it was traded, sold on the Black Market,
            shredded, traded up or taken back and why, and whether you were under 18, an adult or of unknown age when you got it (from the birth year
            you gave us). We use this to give you your collectibles, to show how each was earned, to check that they
            are earned fairly, and to keep the public ledger. The public ledger (spysocial.app/ledger) lists every
            copy and what happened to it, but never your account, username or name: each copy's holder appears only
            as a code made from that copy and a secret kept for your account, so two of your copies never share a
            code and nobody else can link them to you or to each other. When a copy is traded or sold, the ledger
            shows only that it moved from one holder code to another, never who traded or sold it, or the price.{' '}
            {PRIVACY.uniqueArchive &&
              "The Archive (archive.spysocial.app) gives each Unique its own page: its picture, number and attributes, how and when it was minted, whether it is for sale and at what price, and the date and price in Intel of each of its Black Market sales, as Rare Finds shows them in the app. Its holders appear only as numbers in the order they first held it (Holder 1, Holder 2), never as an account, username, name or holder code. "}
            Each
            day only a fingerprint of the ledger is sent to GitHub and the Internet Archive, with no personal data in
            it.{' '}
            {/* LIVE.launchSite: the beta test chain is over (site-launch-walk). */}
            {PRIVACY.launchSite
              ? "Before the launch, the ledger was a beta test chain: every copy, number, trade and day's fingerprint on it was for testing and was wiped, and the real ledger started again from its first entry."
              : "Until the launch, the ledger is a beta test chain: every copy, number, trade and day's fingerprint on it is for testing and is wiped before the launch, when the real ledger starts again from its first entry."}
          </Item>
        )}
        {/* LIVE.customPacks (members' own packs), with communityPacks and featuredPacks (legalRelease). */}
        {PRIVACY.customPacks && (
          <Item label={PRIVACY.communityPacks ? 'Custom Packs and Community Packs' : 'Custom Packs'}>
            If you're a member, you can make your own packs. We keep each draft and each pack you make with your
            account: its name, its game (Spy Talk or Spy Sketch), its language{PRIVACY.packAutoTranslate ? ' (which we detect from its text)' : ''}, its description if you add one, its
            entries (the locations or words), its cover (the emoji, color and pattern you pick from the app's), when you
            made and last changed it, and which draft a pack was created from. A draft is private to you and is never
            played. Names and entries go through our word filter when you save them. When you create a pack from a
            draft (and again when you update it{PRIVACY.communityPacks ? ' or send it to Community Packs' : ''}), its
            name, description and entries are also sent to OpenAI's moderation model for an automated check (only the
            pack's text, never your account, name or age), and we keep the result and anything it flagged with the
            pack; if the check finds something that breaks our Terms, the pack isn't created (our moderation log keeps
            a copy of it, as it does for any pack we remove), and a pack it flags for child sexual content is also
            logged for our child-safety review.
            {PRIVACY.packAutoTranslate &&
              ` When you create a pack, our translation service also detects the language it's written in and translates its name, description and entries into the other languages the app offers, so every player sees it in their own language. For that, it sends only the pack's text and the languages to ${packTranslator}, never your account, name or age. Each translation also goes through OpenAI's moderation model and our word filter, and we keep the translations with the pack. When you change a pack, only the text you changed is translated again.`}{' '}
            When you play one of your packs in a private room, the players there see its name and, as with any
            pack, what the game deals and shows from it (such as the location or word, and the spy's list), and for a
            while after a game with it, they can open the pack and see all its entries. Records of games already played
            with a pack keep its name and the entries they dealt. You can change or delete your drafts, and the packs
            you haven't published, at any time.
            {PRIVACY.communityPacks &&
              ` If you send a pack to Community Packs (a copy of your draft), you agree to our Terms and Community Rules again, and a person on our team reviews it before anyone else can see it (we aim to within 72 hours). Before that, an AI model (OpenAI's) reads the copy's name, theme, description and entries (only the pack's text, never your account, name or age) and notes for our team anything that may break our Terms or Community Rules, with a suggestion to approve it or send it back; it never decides: a person on our team does. Its notes are kept with the review and only our team sees them. Before approving a pack, our team may hide a mild swear in it (as the app already does), remove an entry or change its theme; the approval notice then tells you what we changed, and your draft stays as you made it. We keep a record of the review (who reviewed it, when, what we decided and why, with a copy of the pack as it was). We may approve it, turn it down, hold it (for example after reports) or take it out. When we approve or turn down a pack you sent, the app tells you (with our reason, if we turned it down), and if you allow notifications we also send you a push notification; we keep these notices with your account. While it's still in review, you can cancel it (the copy you sent is deleted, and our moderation log keeps a copy of it); it's published only once we approve it and it's live in Community Packs. Once we approve it, every SpySocial player, players under 18 included, can see it: its name, description, cover, game, language and entries, your username as its creator (never your display name; Anonymous instead, if you chose that), when it was added, its average rating and number of ratings, how many players have added it (its downloads) and how many games it was played in. Players can search Community Packs (by a pack's name, description or its creator's username), browse our collections, add a pack to their packs, rate it from 1 to 5 stars and copy it into a draft of their own to make their own version. When you add or rate a pack, we keep which pack, your rating and when, with your account; other players and the pack's creator see only the totals, never who added or rated it. You can report a Community Pack: the report keeps a snapshot of the pack as it was, your reason and anything you write, and we handle it like any other report (see Safety Information). A published pack can't be changed or deleted by its creator, because it's shared under the license in our Terms (section 6); a new version is a separate pack. You can choose Post Anonymously when you send a pack, and switch a pack that's in review or published between Anonymous and Show My Name, once every 24 hours: while it's anonymous, it shows Anonymous as its creator, drops off your profile and titles, and your username isn't linked to it anywhere public (our team can still see who made it). We log every switch (which pack, which account and when), and every time our team puts a name back. Creators get the Pack Maker title, which counts their approved packs that show their name and shows like any title.`}
            {PRIVACY.featuredPacks &&
              ` We may feature a Community Pack: then it's also played at Play Online tables and Game Nights, where the players see its name and creator as Community Packs shows them${PRIVACY.packAutoTranslate ? ', each in their own language.' : `, and our translation service translates its name, description and entries into the languages the app offers. For that, it sends only the pack's text and the languages to ${packTranslator}, never your account, name or age, and we keep the translations with the pack.`} If we feature your pack, you get the Featured Creator title and border, which count your featured packs and show like any title and border.`}{' '}
            Your drafts and packs{PRIVACY.communityPacks ? ', ratings and the packs you added' : ''} are kept with your
            account and deleted with it
            {PRIVACY.communityPacks
              ? ', except the packs you published to Community Packs (approved and live there; a pack still in review is deleted): when you delete your account, they stay there for other players, but we remove your username from them at once, so they show Anonymous as their creator and nothing public links them to you.'
              : '.'}
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
          {PRIVACY.moneyChatSignals &&
            ' Buying or selling items, Intel or accounts for real money is against our Terms: when our filter stops a message that offers it (or, in a room with a player under 18, a message about payment apps or real money), we keep a note on your account that it happened, when and where, and what kind of words it caught, never the message itself. We keep these notes with our fair-play records for up to 400 days, and repeated ones may lead us to review the account.'}
        </Item>
        {/* LIVE.socialFeatures: Social Phase 1 for everyone (legalRelease). */}
        {PRIVACY.socialFeatures && (
          <Item label="Friends">
            Your friends list ({PRIVACY.socialLimits ? '' : 'up to 200 friends, '}each friendship confirmed by both players), the friend requests you
            send and receive (with how they were made: your Friend Code, a private game you played together, a public
            table or an exact username), the room and party invites and Ask to Join requests between you and your
            friends, and your choices in Privacy &amp; Friends. Your Friend Code is a QR code that changes every 5
            minutes and works for 3 scans; we keep only a coded (hashed) copy of it until it expires. Requests carry no
            message, and declining or removing someone isn't shown to them. We never suggest friends, offer a search
            for players, read your contacts or show anyone your friends list. Who can add whom depends on age, which
            our servers work out from the birth year you gave and never show anyone: everyone can add each other in
            person with a Friend Code; from a private game played together in the last 24 hours, except between an
            adult and a player under 16; from a public table or by exact username, only adults, and only when the
            other adult allows it. We keep one time you were last active in the app (replaced each time, never a
            history); if you choose "Show friends when I'm online", your friends see only whether you're online now.
          </Item>
        )}
        {PRIVACY.socialFeatures && (
          <Item label="Follows and Profiles">
            Who you follow, which only you see. An adult can have a public profile: display name, username, the title,
            border and agent you wear, a showcase of up to six items you hold, your published community packs and your
            follower count (no bio, status or location). Other players can follow an adult whose profile is public and
            who allows follows; the people you follow, and the new packs and showcase changes of the people you follow,
            make up your Following feed. On your followers list you see by name only the followers whose own profiles
            are public; the rest are a number{PRIVACY.audit1103 ? ', and you can search those names' : ''}. Adults are told once, the first time their profile is public, and can
            make it private at any time in Privacy &amp; Friends. Players under 18 have no public profile, can't be
            followed and aren't named on anyone's followers list, and a private profile, or any player under 18, makes
            their Community Packs anonymous.
          </Item>
        )}
        {PRIVACY.socialFeatures && (
          <Item label="Party and Party Chat">
            When you join a party (a member and friends who play together, up to 21 people in all), we keep who is in
            it, who led it, the invites, and the games it played, so that the party is seated together and marked at
            the table for everyone. Messages in a party's chat are stored on our servers so the party can read them, go through
            the same filters as room chat (with the stricter public-room rules when anyone in the party is under 18),
            can be reported, and are deleted 30 days after they're sent.
          </Item>
        )}
        {/* LIVE.trading: trading between friends (legalRelease). */}
        {PRIVACY.trading && (
          <Item label="Trades">
            When you trade, we keep each trade and its steps (who offered and confirmed what, and when), the items and
            Intel that moved, any reversal and its reason, the 7-day protection of what each side got, and any trading
            pause on your account (after a reversal, a change to your email or sign-in method, a sign-in on a new
            device, a lock you set{PRIVACY.audit1103 ? ", or a pause we set on an account that may have been taken or that we're looking into for fraud or farming" : ''}). For a big trade we email you a code; we keep only a coded (hashed) copy of it,
            and the code is removed from our mail queue once it's sent{PRIVACY.retentionSweep ? '; the note that we sent one (no address, no code) is deleted after 30 days' : '; the note that we sent one (no address, no code) stays until your account is deleted'}. Trades carry no message. Only you and the
            other player see a trade{PRIVACY.mintedCollectibles ? ' (the public ledger shows only that a traded collectible moved from one holder code to another, never who traded it; see Collectibles and the public ledger)' : ''}.
            Trades are kept with your Intel and item history.
            {PRIVACY.tradeGatesNov2 && PRIVACY.gameDeviceChecks
              ? " Whether you can trade is decided from your account's age, whether its email is confirmed and how many counted games you've played (finished games with at least 2 other saved accounts on other phones, that count toward your stats and that our fair-play checks don't flag). To check that the players in a counted game are different people, we keep, for each game you play, the coded install code of the device you played it from (see Device Information). We don't compare networks for this, so people who share a home or Wi-Fi aren't affected. The device notes are kept for 90 days and deleted with your account."
              : PRIVACY.tradeGatesNov2
                ? " Whether you can trade is decided from your account's age, whether its email is confirmed and how many counted games you've played (finished games that count toward your stats and that our fair-play checks don't flag); we use the game records we already keep for this, and nothing new is collected."
                : ''}
            {/* The test phase (app server trade_test_phase, trade_intel_test_phase): ends by itself on December 7, 2026. */}
            {PRIVACY.launchSite
              ? " While SpySocial was being tested, until December 7, 2026, the account-age, counted-games, new-device and sign-in-change rules were off, and adults could trade Intel. On that day every amount of Intel traded went back: we worked out each account's total from its trades, added the matching lines to its Intel ledger under a published incident, and kept each account's total with our records of the reset."
              : " While SpySocial is being tested, until December 7, 2026, the account-age, counted-games, new-device and sign-in-change rules are off, and adults can trade Intel. On that day every amount of Intel traded goes back: we work out each account's total from its trades, add the matching lines to its Intel ledger under a published incident, and keep each account's total with our records of the reset."}
          </Item>
        )}
        {/* LIVE.blackMarket: the Black Market, Intel only (legalRelease). */}
        {PRIVACY.blackMarket && (
          <Item label="Black Market">
            The Black Market, in the app's Vault, lets adults buy and sell tradable items for Intel (never for money):
            on Items, by placing offers to buy or sell at a price, and on Rare Finds, by listing a Unique at a price or
            making an offer on one. Players under 18 can look but can't use it. We keep each offer and listing you make
            (the item, the quantity, your price, the copies or Intel it holds, and when you placed, changed, stopped or
            collected it), each offer you make or get on a listing, each sale and fill (who bought and sold which copies,
            at what price and fee, and when), the protection and any reversal of a Rare Finds sale, and the matching
            lines in your Intel ledger. The Black Market emails no codes.
            {PRIVACY.audit1103 ? " When a lock lands on an account, whatever the reason (a pause we set because it may have been taken or while we look into fraud or farming, your own lock, the pause after a reversal, a ban, a suspension, a fair-play hold, and from December 7, 2026 a new device or a change of sign-in), or when we change its email address or correct its birth year to under 18, its open offers and listings close, and we keep that as we keep a stopped offer." : ''}{' '}
            {PRIVACY.launchSite
              ? "Sales made while SpySocial was being tested were undone before the launch, with matching lines in the Intel ledger of everyone they touched, and we keep the record of each undo like the sale. "
              : "Before version 2.2 opens to everyone, only test accounts use the market, except in Beta 2's test from November 9 to 16, 2026, when adults who can trade buy and sell for real. Those sales are undone on November 16, and any later test sales before the launch, with matching lines in the Intel ledger of everyone they touch, and we keep the record of each undo like the sale. "}
            Other players see the market without names: an item's prices and quantities on offer, the prices and times
            of past sales, and, for a Unique listed on Rare Finds, its number, its colour and its price, never who is
            buying or selling. Sales are kept for good, like the Intel ledger, with no link to you once you delete your
            account.
          </Item>
        )}
        {PRIVACY.socialFeatures && (
          <Item label="Social Notifications">
            If you allow notifications, we send a push for a friend request, an accepted request, a room or party
            invite, an Ask to Join and a new pack from a creator you follow (at most one a day for each creator), each
            with its own switch in Privacy &amp; Friends.{PRIVACY.audit1103 ? " We also send a push when a friend offers, changes or completes a trade or it's your turn in one, when your Black Market offer fills, your Rare Finds item sells or gets an offer, or your offer on one is accepted, and when a trade or sale of yours is undone; Trades and Black Market each have their own switch there. These never show an item, a price or an Intel amount, and the market's never name the other player." : ''} The push shows the sender's display name. We keep your
            device's time zone so that a player under 18 gets none between 10 PM and 7 AM local time{PRIVACY.audit1103 ? `, and none at all while we don't know it; on iPhone${PRIVACY.membershipWords1105 ? ' and iPad' : ''}, players under 18 get none of these for now` : ''}. A notice waiting
            to be sent is kept for about a day, and a sent one for about 7 days{PRIVACY.retentionSweep ? '' : ' (cleared the next time we send a notice)'}.
          </Item>
        )}
        <Item label="Questions and Answers">
          {PRIVACY.storedQuestions
            ? `The questions and answers you type during Spy Talk's Questions go through our servers to the other players and are kept like chat messages, so they can be checked if someone reports them. ${chatRetention('Those')}`
            : "The questions and answers you type during Spy Talk's Questions go to the other players in the game through our servers as they're sent; we don't store them."}
        </Item>
        <Item label="Voice Input">
          When you use the microphone to say a chat message, a question or an answer, Apple's or Google's speech
          recognition on your device turns what you say into text, and may send the recording to Apple or Google to
          do this, under their privacy policies.
          {PRIVACY.storePrivacy1108
            ? `${from22 ? ' From version 2.2, on' : ' On'} iPhone and iPad, and on Android 13 and later, when you say a chat message, a question or an answer in a game, the app also gives Apple's or Google's speech recognition the names of the players in your game (as the game shows them) and the names of the agent colors, to help it recognize them.`
            : `${from22 ? ' From version 2.2, on' : ' On'} iPhone and iPad, when you say a question or an answer, the app also gives Apple's speech recognition the names of the players in your game (as the game shows them), to help it recognize them.`}
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
          {sendTime &&
            " So that a translation is ready when other players see a message, our service usually translates it as soon as it's sent, before anyone asks: into the app languages of the other players in that chat who agreed to translation by OpenAI (see below), under the same rules, and with nothing sent that it wouldn't send when they ask."}
          {PRIVACY.onDeviceTranslation &&
            (msOff && PRIVACY.autoTranslation
              ? " Your device also translates messages in other languages itself, with Apple's or Google's on-device translation, and shows its own translation only when our service has none for a message (for example a message our service may not send to OpenAI, see below, or when our service can't be reached); the text then doesn't leave your device. Your device may first download that language's translation files from Apple or Google. On Android, the app can download them ahead of time in a room's lobby when players at your table use other languages (on Wi-Fi, or on mobile data only if you agree); during a game, only when you tap Download for that language. On Android and iPhone, the Play Online screen can also offer your app language's files if they aren't on your device yet: they download only if you tap Download there (on Android, on mobile data only if you agree; on iPhone, Apple's own sheet asks first), and no message is sent to do it."
              : PRIVACY.autoTranslation
              ? " Your device may also translate a message itself with Apple's or Google's on-device translation instead of asking our service (for example when our service can't translate it); the text then doesn't leave your device. Your device may first download that language's translation files from Apple or Google. On Android, the app can download them ahead of time in a room's lobby when players at your table use other languages (on Wi-Fi, or on mobile data only if you agree); during a game, only when you tap Download for that language. On Android and iPhone, the Play Online screen can also offer your app language's files if they aren't on your device yet: they download only if you tap Download there (on Android, on mobile data only if you agree; on iPhone, Apple's own sheet asks first), and no message is sent to do it."
              : " When our service can't translate a message, your device may translate it itself with Apple's or Google's on-device translation; the text then doesn't leave your device. The first time, your device may download that language's translation files from Apple or Google.")}{' '}
          {PRIVACY.openAiTranslation
            ? `${msOff ? 'Our service' : 'When our service uses OpenAI, it'} sends OpenAI only messages written by players who told us they're 16 or older (from the birth year the app asks for) and who ${openAiAgreed}; other messages, including those from players ${msOff ? "under 16, from players who haven't told us their age and from players who haven't agreed, are never sent to OpenAI to be translated, or to any other translation service: they're translated only on the devices of the players reading them (or not at all; what adults write beside a player under 18 may also get a safety check, see Chat Safety Checks)" : "who haven't told us their age or haven't agreed, go to Microsoft Translator"}. We keep your answer to that note (which version of the note you answered, and when) so that it applies on every device you use, until you answer it again or your account is deleted.${msOff ? '' : ' Microsoft receives only the message text and the two languages, never your name or account.'} OpenAI receives the text of the messages being translated and the two languages. So that a translation fits the conversation, it also receives up to three other recent messages from the same chat by players 16 or older who agreed, normally the ones said just before (their text only, not who said them), and a list of names to leave as they are: the game's agent names (such as "Agent Blue") and, in a private room, the display names of the players there who are 16 or older and agreed (or the username of a player who has none). It never receives anyone's age. We send these messages to OpenAI only to translate them. For translation, our service never sends OpenAI your account or a code made from it, your email address, your device's IP address or details, the game's secret word or location, or anyone's role. OpenAI doesn't use them to train its models: it doesn't train on what is sent to its API unless the sender opts in, and we haven't. Our service also asks OpenAI not to store these requests or its answers, so they aren't kept as saved responses. Like everything sent to its API, they go into OpenAI's abuse-monitoring logs, which it keeps for up to 30 days, unless the law requires it to keep them longer or keeping them is reasonably necessary to protect its services or anyone else from harm. OpenAI may also keep an encrypted cache made from a request on its servers for up to 24 hours, so that similar requests run faster.`
            : 'Only the message text and the two languages are sent, never your name or account.'}
          {usesMyMemory &&
            " MyMemory's terms say it may keep the text it receives and use it to improve its services."}{' '}
          {PRIVACY.modTranslate1106 &&
            "So that our moderators can read a report in any language without copying it into an outside tool, our Mod Console shows them a translation beside the original of what they may already read in that report. It uses the translation the game already made when there is one. Otherwise our service sends OpenAI the text alone, by the same rule as above (a message or a report's written note only if whoever wrote it told us they're 16 or older and agreed), never a name, an account or anything about the report; everything else is translated only on the moderator's own device, where the text stays, or not at all. The name and entries of a pack in review are translated for them the same way, from the text alone, whoever made it. These translations are kept for up to 30 days, only moderators who may read that report or pack see them, and they're never shown to other players. "}
          To keep translation within its limits and stop abuse, our servers count, for each player and day, the
          translation requests they made, the messages and characters sent to be translated, and an estimate of
          what translating them cost; these counts are deleted after 14 days.
        </Item>
        {/* LIVE.safetyAnswers1106: the chat safety check beside a player under 18 (app server 20261211400000; "may": built, on at the owner's key). */}
        {PRIVACY.safetyAnswers1106 && (
          <Item label="Chat Safety Checks">
            When someone else in a room, game or party has told us they're under 18, what adults (players who told us
            they're 18 or older) write there may be checked automatically after it's sent: OpenAI's moderation model
            reads each message, and some also go to a second OpenAI model, to find sexual talk aimed at a younger
            player. Our servers send only the message's text, never your account, name, username, age or the room, and
            the request says only that a player under 18 may read it. The check never blocks, hides or changes a message
            and isn't shown to any player: a message it finds is flagged for one of our team to read, as described in
            Safety Information. Messages written by players under 18, or by players who haven't told us their age, are
            never sent. OpenAI doesn't use them to train its models; its moderation model doesn't keep them, and the
            second model's requests go into OpenAI's abuse-monitoring logs for up to 30 days (we ask it not to store them
            otherwise). While it's on, this check runs whatever you chose in the app's translation note, because it's how we
            keep younger players safe. We spend at most a fixed amount on it each month; when that runs out, the check stops
            until the next month, and nothing else changes. Apart from a flagged message, which is kept like any flag, our
            servers keep only a list of message IDs waiting to be checked, for up to 15 minutes, and daily counts (how many
            messages were checked and flagged, and what it cost, never the messages or who wrote them), for 90 days.
          </Item>
        )}
        {/* LIVE.practiceAi: OpenAI rates practice lines for 16+ players who agreed (legalRelease).
            LIVE.practiceReportLog: the last practice game sent with Report a Problem when the player leaves it ticked. */}
        {(PRIVACY.practiceAi || PRIVACY.practiceReportLog || PRIVACY.coverage1110) && (
          <Item label="Practice Games">
            {PRIVACY.coverage1110 &&
              "Our servers keep how far you've got in How to Play for each game (Spy Talk and Spy Sketch: each part, its last step, and when you finished or skipped it) and your best grade in each game's practice game, so your progress follows you to your other devices. Play Online can use them to open a game once you've passed its practice game (a C or better). We can also mark a game's practice as done for an account (for example, for a tester who has trouble with it), and we record who did it and when. This is kept with your account and deleted with it. "}
            {PRIVACY.practiceAi && <>
            In a practice game, your device rates every move you make. If you told us you're 16 or older (from the
            birth year the app asks for), are signed in to an account (not playing as a guest) and chose Try It in the
            app's one-time "Rate with AI?" note that names OpenAI, our servers also ask OpenAI to rate each line you
            type in a Spy Talk practice game, for a sharper score (Spy Sketch practice is rated only on your device). For that, our servers send OpenAI only the line you typed (up to 160 characters),
            whether it's an answer, a question or a follow-up, your role in the practice game (Local or spy), the game's
            secret location and the other locations in its pack, the question or answer from the practice game your
            line replies to, and the language it's probably in. They never send your name, username, account or a code
            made from it, email address, age or your device's IP address. A line our chat filter would block is never
            sent. We send these lines to OpenAI only to rate them. Our servers ask OpenAI not to store these requests or
            its answers, and OpenAI doesn't use them to train its models; like everything sent to its API, they go into
            OpenAI's abuse-monitoring logs for up to 30 days, and OpenAI may keep an encrypted cache made from a request
            for up to 24 hours (see OpenAI below). If you choose Not Now, or you're
            under 16 or playing as a guest, your practice lines are rated only on your device. We keep your answer to
            that note (which version of the note you answered, and when) until you answer it again or your account is
            deleted. To keep this within its limits, we count how many lines each account had rated each day (deleted
            after 14 days) and keep daily totals for the whole app that don't identify anyone; we don't keep the lines
            themselves. We spend at most a fixed amount on it each month and each day; when that runs out, your device's
            rating is used until it resets.
            </>}
            {PRIVACY.practiceReportLog &&
              `${PRIVACY.practiceAi ? ' ' : ''}Your device keeps a transcript of your last three practice games (every line, the ones you typed and the agents' lines, with your grades and the tips shown). It leaves your device only if you use Report a Problem and leave "Include my last Practice game" ticked (the box starts unticked for players who told us they're under 18, or haven't told us their age): then, as the email opens, that one game's transcript is sent to our servers with your account, the app's version, your phone's model and the app's language, and kept for 90 days (or until your account is deleted) to find and fix the problem. If our servers can't take it, the transcript is put in the email instead, and goes only if you send it.`}
          </Item>
        )}
        {/* LIVE.spybots: the developer's AI players (legalRelease). */}
        {PRIVACY.spybots && (
          <Item label="AI Players">
            SpySocial's developer sometimes plays with computer-controlled players (bots) that he runs himself, mostly
            to test the game. They play only at a table where he is playing too, and only when everyone else at that
            table is an adult he knows or one of our test accounts; if anyone else sits down, the bots leave, in private
            rooms and at Play Online alike. A bot always shows an "AI" tag next to its name. To decide what
            a bot says, asks, answers, draws and votes, our bot program sends OpenAI what that bot's seat can see in the
            game: the questions, answers and chat at the table (and, for a bot that is a spy, the spies' chat) with the
            names the table shows (display names in private rooms, agent names in public play), what happens in the
            game, the drawings in a Spy Sketch game, and the bot's own role and secret. It never sends anyone's account
            or user ID, username, email address, age or IP address. The program asks OpenAI not to store these requests
            or its answers, and OpenAI doesn't use them to train its models (see OpenAI below). The program also keeps
            logs of the games the bots play, with what was said and done at the table, on the developer's computer, and
            uses them only to check and improve the bots; they're deleted automatically once they're 30 days old, the next time the program starts.
          </Item>
        )}
        <Item label="Presence">
          While you're in a game, the app tells our servers every few seconds that it's still open, so other players
          can see if you've stepped away and the game can skip a player who isn't there.
          {PRIVACY.socialFeatures &&
            " While the app is open, it also tells our servers every minute or so that you're active, for the online status your friends can see (see Friends above)."}
        </Item>
        <Item label="In-Game Notes">
          Notes you make in a game (your board's marks, the order you put players in and the short clue and suspicion
          tags you type) are kept only on your phone: they're never sent to us or shown to other players, and they're
          cleared a while after the game ends.
        </Item>
        <Item label="Usage Data">
          Simple events about how the app is used (for example which screens are opened and which features are used),
          recorded by our own servers and kept for 180 days. They contain no message text. We don't use third-party
          analytics or advertising trackers.{' '}
          {/* LIVE.launchSite: the Beta Pin's window and the testers' early features ended at the launch (site-launch-walk). */}
          {PRIVACY.launchSite
            ? "Until version 2.2's launch on December 8, 2026, we also used these events and your device's platform to recognize saved accounts that used a test version of the app (on iPhone, Android or the web) and were created before December 7, 2026, and gave them a Beta Pin for their avatar as a thank-you; we keep only that the account has it. Until the launch, we also used them, with the app's version, to let saved accounts that recently used a test version on a phone try features that weren't open to everyone yet."
            : "Until version 2.2's launch on December 8, 2026, we also use these events and your device's platform to recognize saved accounts that used a test version of the app (on iPhone, Android or the web) and were created before December 7, 2026, and give them a Beta Pin for their avatar as a thank-you; we keep only that the account has it. Until the launch, we also use them, with the app's version, to let saved accounts that recently used a test version on a phone try features that aren't open to everyone yet."}
        </Item>
        <Item label="Test Versions">
          If you test a version of the app before it's released, through Apple's TestFlight, Google Play's testing or a
          testing service such as BetaTesting, Apple, Google or that service handle your sign-up and anything you send
          through them, under their own terms and privacy policies. We receive what you choose to share with us there
          (such as your answers to a test's survey) and, to let you install an Android test version, the email address
          of your Google account, which we add to the app's list of testers in Google Play and remove once the test is
          over. We use these only to run the test and improve the app.
          {PRIVACY.playtestPayPal && (
            <>
              {' '}
              If you sign up on our website for a live group playtest, we receive what you enter in the sign-up form,
              including, if you get the session thank-you, the email address of your PayPal account. We use that address only
              to send your thank-you through PayPal, which handles it under its own terms and privacy policy, and we delete
              it once it's sent. The form is a Google Form, which Google handles for us. To choose seats, we also use the email
              address you sign up with to look up a SpySocial account that has it (its age, when it was made, whether you
              tested before, and the app versions it used), and we email you about your seat through Resend. If your bug report
              or idea wins the one bonus for the session (a gift card), we send it to your email address. The rest of your sign-up is deleted after the test.
              {PRIVACY.coverage1110 &&
                " If you get a seat, our servers also keep you on that test's list of testers: your seat, the name and Discord name you gave, your phone's platform, a coded (hashed) copy of each email address you gave us (in the form, for Google Play and for PayPal; never the addresses themselves) and, if we link it by hand, your account. Only our developer sees the list, in our console, with each tester's progress (such as their practice grades, Play Online games, app version and when they were last active), to help testers and run the test. The list is deleted within a week after the test (Beta 2's on November 19, 2026), even if you delete your account first."}
            </>
          )}{' '}
          Otherwise, a test version is the same app, and this policy applies to it.
        </Item>
        <Item label="Rate Limits">
          To stop floods, guessing at room codes and other abuse, our servers note when an account does certain things
          (such as sending a message, joining or trying to join a room, poking a player, or saving its avatar or title),
          without what was said. Notes about joining rooms are deleted after 24 hours and the others after 2 days, even if
          the account is deleted first. To limit account emails, when you sign up, save a guest account,
          {PRIVACY.passwordless ? ' ask for a sign-in code' : ' ask for a new confirmation link, reset your password'} or
          change your email address, our servers keep a record of each email
          they send: a coded form of the email address and of your network (your IP address, or for IPv6 its first
          half), made with a secret key, the kind of email and when, never the address or the IP address itself. Under
          the same code, they also count how many of these requests come from each network in an hour. These records
          stop counting after a day{PRIVACY.retentionSweep ? ' and are deleted then' : ' and are deleted soon after, the next time a request clears them, which can take some days when few requests come in'}.
          {PRIVACY.socialLimits &&
            ' To stop rapid-fire follows and friend requests, our servers also use the times in the social safety log (see Safety Information) to slow an account down for a few seconds, and when an account reaches the daily limit for follows or for friend requests, they count how many times that day it was turned away (the account, which limit, the day and the count), for our team to spot spam. These counts aren\'t shown to any player, don\'t change anything on their own, and are deleted after 90 days.'}
          {PRIVACY.passwordless
            ? ' Sign-in codes are made and checked by our sign-in service (Supabase Auth): a code has 6 digits, works only once and for 1 hour, and a new one can be asked for after a minute; the service keeps only a coded form of the code, never the code itself.'
            : ''}
        </Item>
        <Item label="Safety Information">
          Reports you make or that are made about you, players you block (and when you unblock someone, which counts for 24 hours so a player can't be blocked and unblocked over and over{PRIVACY.retentionSweep ? ' and is then deleted' : ', and is deleted the next time you unblock someone or with your account'}), removals from rooms, and any warnings,
          mutes or bans on your account
          {PRIVACY.drawingCheck
            ? ', including the results of drawing checks, drawings taken off as evidence, removals from a game, and warnings, pauses and bans the drawing check gave'
            : ''}
          {PRIVACY.banTombstone
            ? '. If an account is deleted while one of these is still running, or within 90 days of a warning, we keep a short record of it after the deletion (see Data Retention)'
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
            ` We automatically flag possible grooming language in rooms with minors for human review: ${PRIVACY.groomingScope ? "in any room or game where anyone else, watchers included, is under 18 or hasn't told us their age, our servers check the messages written there by adults and by players who haven't told us their age (such as guests)" : "in any room or game where anyone, watchers included, is under 18 or hasn't told us their age, our servers check the messages adults write there"} for phrases that can be part of grooming (for example asking a younger player's age or school, asking them to keep secrets, to talk somewhere else, to meet up or to send photos, or offering gifts), and a message that has one is flagged for one of our team to review.${PRIVACY.groomingScope ? " So that this still works after a younger player leaves, our servers also note which messages were sent while someone else there was under 18 or hadn't told us their age: only the message's ID, kept on our servers and never shown to any player, for as long as we keep the message itself." : ''} A flag doesn't block, hide or change the message, isn't shown to any player and isn't a report to anyone; we decide what to do, as with a report.${PRIVACY.childSafetyHolds ? " We do the same for party chat when someone else in the party is under 18 or hasn't told us their age. Explicit sexual talk is refused at public tables and in any room or party with a player under 18 or one who hasn't told us their age. With such a player there, lines that could be sexual but may be innocent are refused too, and those are never flagged. When an adult or a player who hasn't told us their age writes an explicit line with such a player there, the refused words are flagged too, though nobody else ever saw them. A flag keeps which message it was, what kind of phrase it had, and a copy of the message and the chat just before it, in a child-safety case or with a report from that room, for as long as we keep reports, so that a person can still read it after the chat schedule (see Chat Messages above) has deleted the message itself." : " A flag keeps only which message it was and what kind of phrase it had, with the player's report case, for as long as we keep reports. The message itself is still deleted on the chat schedule (see Chat Messages above)."}`}
          {PRIVACY.socialFeatures &&
            " For friends and parties, our servers keep a social safety log (who sent or accepted a friend request and how it was made, follows, blocks, invites and changes to your Privacy & Friends choices) and check it for patterns that can be part of grooming: an adult adding several players under 16 with Friend Codes, an adult whose private games keep producing new friendships with players under 18, or many invites from an adult to players under 18. A match is flagged for one of our team to review, as with a report; it isn't shown to any player and doesn't change anything on its own. To keep public tables fair, we also look at the games parties play (when games end, when spies guess, and reports of teaming up) for signs of cheating together, and keep what we find with the case. A report about a friend, a request, a profile, an invite or a party includes our servers' own record of it (for a party, every member and the games it played)."}
          {PRIVACY.trading &&
            " We also check trades for signs of real-money trading, account theft and grooming (for example a lopsided trade between an adult and a player under 18, or many gifts to one account). A flagged trade is reviewed by one of our team; the flag isn't shown to any player and doesn't change anything on its own."}
          {PRIVACY.blackMarket &&
            " We check the Black Market in the same way, for example for sales between accounts that use the same phone or network, items sold back to their seller, prices far from an item's usual price, and offers placed and stopped over and over; what the checks flag is reviewed by one of our team, isn't shown to any player and doesn't change anything on its own. If the market's own records don't add up, it pauses by itself until we've checked them."}
          {PRIVACY.intercepts &&
            " To keep rewards fair, our servers also look for signs of farming, bots and scripted play, games thrown on purpose and several accounts run by one person, using records we already keep (games and their results, rewards, trades and sales, reports, and the coded device and network notes described under Device Information and IP Address)." + (PRIVACY.integrityProbes ? " Our servers also note when an account sends them a request that our app never makes, which can be a sign of a modified app or a script: which account, what kind of request, the day and how many times, nothing else." : '') + " Some signs add to a score for the account that only our team sees; others only alert our team and change nothing for the account. From December 8, 2026, while one of our team checks a strong sign, the app may hold an account's new rewards for up to 72 hours (an Intercept shows \"Verifying\" and stays sealed), and longer only while a case about it is open; you can ask for a review there. A hold never becomes a penalty by itself: a person decides. If signs like these point to a group of accounts, SpySocial's developer may pause trading on all of them together for up to 30 days, after reading who is in the group. Nothing does this by itself, we record it for each account as we keep moderation records, and it can be undone account by account. If a reward's odds or an item's count ever look broken, that reward pauses for everyone until we've checked it."}
        </Item>
        {PRIVACY.drawingCheck && (
          <Item label="Drawing Checks">
            In public rooms (Play Online tables and Game Nights), drawing turns in a Spy Sketch game go through an
            automated check by OpenAI for content that breaks our Community Rules, and some are also checked by a
            second, more detailed OpenAI model. In any room, a drawing is checked by both when someone reports it. If
            the checks can't run at that moment and still can't after a few more tries, that turn goes unchecked; a
            report of it still goes to a person, as every report does. The
            app tells you once, before your drawings can be checked, that they're sent to OpenAI, and in a room where
            turns are checked you draw only after you agree.
            {PRIVACY.sketchConsentRecord &&
              " When you agree, the app also tells our servers, and we keep with your account that it agreed, to which version of the note and when, so that your answer counts on every device you use. It counts only for the account that agreed, never for another account signed in on the same device. Not Now isn't recorded. Our servers can use this record to seat only players who have agreed at public Spy Sketch tables (Play Online and Game Nights, alone or in a party); when they do, and someone in a party hasn't agreed yet, the app tells the party's leader which member it is."}{' '}
            For the first check, our servers send OpenAI's
            moderation service a picture of the turn's own lines (and any lines the player drew and then undid), with
            nothing else. The second check gets a picture of the turn (the earlier drawing in light grey) with the
            round's secret word (which helps tell an innocent drawing from an offensive one) and a code made from your
            account ID that doesn't reveal who you are, which OpenAI uses to detect misuse of its service. Our servers
            pick which drawings get the second check: every reported drawing, every drawing the first check flags
            (except one it flags as sexual content involving a child: that drawing goes to no second check and goes
            straight to a person), and a share of the rest that depends on what we already keep about the account (how many games it has played, how
            old it is, whether it's saved, and any strikes or upheld reports). We don't use this for anything else or
            show it to other players. If the second check can't give an answer, the first check's answer is used. Our
            servers never send your name, username, email address, chat or your
            device's IP address.{PRIVACY.audit1103 ? " These checks run the same way at every age, players under 16 included (unlike translation, see Translations): they're how we keep drawings safe, and OpenAI never receives your age." : ''} According to OpenAI, it doesn't use what it receives to train
            its models, and keeps it for up to 30 days to watch for misuse, unless the law requires it to keep it
            longer. The check acts by itself: it can take a turn off the drawing for everyone in the game, give a
            strike (which can lead to a pause or a ban from public rooms and Game Nights), or remove a player from the game
            and ban them from public rooms and Game Nights, as our Community Rules explain. A drawing that sexualizes a
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
          {PRIVACY.openAiTranslation ? (msOff ? ', to decide whether your messages may be sent to OpenAI to be translated (see Translations)' : ', to choose which service translates your messages (see Translations)') : ''}
          {PRIVACY.practiceAi ? ', to decide whether OpenAI may rate your practice lines (see Practice Games)' : ''}
          {PRIVACY.safetyAnswers1106 ? ', to decide whether what you write may get the chat safety check (see Chat Safety Checks)' : ''} and
          to protect players under 18.
          In any room{PRIVACY.safetyAnswers1106 ? ', game or party' : ' or game'} where anyone, watchers included, is under 18 or hasn't told us their age, its chats and
          typed questions and answers block links, email addresses, websites, phone numbers and social media accounts
          and handles{PRIVACY.safetyAnswers1106 ? ", and other personal details (a home address, asking or saying where someone lives, their school or their real name)" : ''}, for everyone there{PRIVACY.safetyAnswers1106 ? ", so a player under 18 can't share them or be asked for them. Public tables block them for everyone, whatever their age" : ''}.
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
            signed in. We keep a record of what your purchases unlock, and when a membership renews, is paused or ends (and whether it ended because a payment failed),
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
            record which code you entered and when, and give you its reward (such as {PRIVACY.membershipCodes ? 'a title, an avatar item or a membership for a month, a year or Lifetime' : 'a title or an avatar item'}). A
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
            send to it only while that sign-in lasts. If you're on a saved account, the same address is stored when you allow notifications
            from Remind Me, after you send or accept a friend request, from Privacy &amp; Friends or when you send a pack to
            Community Packs, and it's used for every notification on this page that you allow. The "Match found!" notification says only that a match was found,
            for which game and how many players, never who is in it. The app refreshes the token at most once a day,
            and the token is deleted when you sign out in the app, turn off notifications for SpySocial (the next time
            the app opens) or delete your account{PRIVACY.audit1103 ? ', or once no device has refreshed it for 120 days. To stop sending to a phone that can no longer get notifications, we keep the receipt number Expo gives each push with its token for about 2 days' : ''}. A match notification waiting to be sent is kept for about a day. Guests
            don't send a push token.
            {PRIVACY.communityPacks &&
              ` If you send a pack to Community Packs, we also use that push address to tell you when we approve or turn it down (with the pack's name and our reason)${PRIVACY.helpTruth1105 ? "; a player under 18 gets it only between 7 AM and 10 PM local time, and not at all while we don't know their time zone" : ''}.`}{' '}
            {PRIVACY.socialFeatures
              ? "Apart from that and the notifications in Social Notifications above, the only other push notifications we send go to our moderators' phones when a new report comes in, a report is waiting past its time or our safety checks flag something, and to SpySocial's developer's phone when our fair-play, economy or email checks need him."
              : "Apart from that, the only other push notifications we send go to our moderators' phones when a new report comes in."} They pass through Expo's push service and Apple's or Google's, and say
            only what kind of report it is and its case number, never a player's name or what was said. The developer's own alerts say what kind
            of alert it is and its counts, and one about trades can name the account it's about.
            {PRIVACY.fcmAutoInit
              ? `${from22 ? ' From version 2.2, on' : ' On'} Android, when the app starts, it registers with Google's Firebase Cloud Messaging (the service that delivers push notifications on Android). Google then receives a random ID for the app's installation, which isn't linked to your account, and technical details about the app and your device, and gives the app a push address. We receive that address only when you allow notifications, as described above.`
              : " On Android, the push address comes from Google's Firebase Cloud Messaging (the service that delivers push notifications on Android), which the app contacts only to get one. Google then receives a random ID for the app's installation, which isn't linked to your account, and technical details about the app and your device."}
          </Item>
        )}
        {PRIVACY.crashReports && (
          <Item label="Crash Reports">
            {from22 ? 'From version 2.2, if' : 'If'} the app crashes or hits an error, it sends a report to Sentry, our
            crash-reporting service: what went wrong and where in the app, a short trail of what the app did just
            before (such as the screens it opened, with room codes removed), your device's model, operating system version and similar technical details
            (such as free memory, screen size and language), the app's version, and a random ID the app makes only for crash reports,
            which isn't linked to your account or to the install code described under Device Information, and which we
            use to count how many installations a problem reached. Reports don't include your name, email
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
        {PRIVACY.audit1103 && (
          <Item label="Account Support">
            When you write to us about your account, we use what's described here to help. If it may have been taken, or
            you've lost its email address, we may change the address, sign the account out on every device (a sign-in from before that can keep working for up to 15 minutes, but can't trade or use the Black Market, and Black Market offers and listings placed before that wait and don't fill), pause its
            trading (up to 30 days), and open a case about it so that we can reverse a protected trade or sale. To answer
            a question about a purchase, we may look up your purchases. Each of these is done by SpySocial's developer,
            never a community moderator, and we record what was done, when and why (for an email change, how we checked
            the account is yours and only the two addresses' domains), as we keep moderation records.
          </Item>
        )}
        <Item label="Device Information">
          Your device's platform (iOS or Android{PRIVACY.browserLegal ? ', or web for the browser version' : ''}) and
          the version of the app, which the app sends with its requests so our servers can work with every version of
          the app. To keep accounts safe{PRIVACY.trading ? ' (for example, to pause trading after a sign-in on a new device)' : ''}, we also keep, for each app install you
          sign in on, a coded (hashed) install code that isn't your device's own ID, with its platform, app version, which
          build of the app it runs (its build number and update channel, the app update it runs, and whether a newer
          update is downloaded and waiting to start; this helps us check that fixes reach every phone) and when it was
          first and last used{PRIVACY.trading ? ", and which of your sign-in sessions registered an install (a session that never did can't trade)" : ''}; it's deleted with your account.
          {PRIVACY.gameDeviceChecks
            ? " We also note which install each of your sign-in sessions is on, which install each Play Online search was made from and which install you played each game from. We use these notes only so that two accounts on one device at the same moment aren't seated at the same Play Online table or put in the same party, and so that counted games for trading are played by different people (people who share a home or Wi-Fi aren't affected). These notes are kept for 90 days and deleted with your account."
            : ''}
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
          internet service does.
          {PRIVACY.storePrivacy1108
            ? ' Supabase, which hosts our servers, keeps a log of the requests the app makes, with their IP addresses, for up to 7 days, to keep the service running and secure.'
            : ''}{' '}
          Our sign-in service keeps the IP address and user agent (a short description of the
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
          {PRIVACY.ipVault ? (
            <>
              {' '}To keep players safe and to answer legal requests, we also keep the IP address of each new account and
              of each sign-in and app start (at most one record per network every 6 hours), with the time and the
              account. Each address is encrypted as soon as it reaches our servers, and the key that opens it isn't
              kept on our servers, so it can't be read from our database. Only SpySocial's developer can open these
              records, offline, and only for a report of child sexual exploitation to NCMEC, a serious breach of our
              Terms or Community Rules, cheating or manipulation of the in-game economy, or a lawful request from law
              enforcement; each time, we record who opened them, why and when, and keep that record. Next to each one we keep a coded form of
              its network (made with a secret key), which lets us notice several accounts from one network without
              opening them. They're deleted after 90 days, or kept for up to 1 year when they're part of a report to
              NCMEC, an open case{PRIVACY.childSafetyHolds ? ', a child-safety case' : ''} or a law-enforcement request.
            </>
          ) : null}
          {PRIVACY.integritySignupNetwork ? (
            <>
              {' '}When an account is created, and when the app connects, we keep a one-way, salted code of the
              network it came from (never the address itself): 30 days for sign-ups, and next to the encrypted
              address above for app sessions, to spot batches of fake accounts. If a network is used to abuse
              SpySocial we may stop new accounts from it for 30 days, and pause rewards on a new account whose
              first session comes from it until we have checked it; existing accounts are not affected.
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

      {/* LIVE.launchReminder: the reminder form on /hello (src/hello/strings.ts has this text in each language). */}
      {PRIVACY.launchReminder && <LaunchReminderSection />}

      <H2>How We Use Your Information</H2>
      <P>We use your information to:</P>
      <Bullets>
        <ListItem>Create and manage your account</ListItem>
        {PRIVACY.launchReminder && <ListItem>Send the one launch email you asked for</ListItem>}
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
            Keep your custom packs and check their text{PRIVACY.packAutoTranslate ? ', translate them into the languages the app offers' : ''}{PRIVACY.communityPacks ? ', review Community Packs (with an AI model\'s notes for our team first) and show them, count their ratings and adds, and give creators their titles' : ''}
            {PRIVACY.featuredPacks ? (PRIVACY.packAutoTranslate ? ', and play the packs we feature' : ', and translate and play the packs we feature') : ''}
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
          <ListItem>Remind you of the game nights you asked about, tell you when a Play Online match is found, and send the other notifications you allow</ListItem>
        )}
        {PRIVACY.socialFeatures && (
          <ListItem>Run friends, follows, profiles, parties and party chat, and send the social notifications you allow</ListItem>
        )}
        {PRIVACY.trading && <ListItem>Run trades between friends: their limits, protection and reversals, and the codes we email for big trades</ListItem>}
        {PRIVACY.blackMarket && <ListItem>Run the Black Market: offers, listings, sales, their fees and protection</ListItem>}
        <ListItem>Improve and optimize the app experience</ListItem>
        {PRIVACY.practiceAi && <ListItem>Rate the lines you type in practice games (with OpenAI, if you agree)</ListItem>}
        {PRIVACY.spybots && <ListItem>Test the game with the AI players our developer plays with, and improve them</ListItem>}
        <ListItem>Troubleshoot issues{PRIVACY.crashReports ? ', fix crashes' : ''} and provide support</ListItem>
        <ListItem>Analyze usage patterns to enhance game design and user experience</ListItem>
        <ListItem>Protect against fraudulent or unauthorized activity</ListItem>
        {PRIVACY.audit1103 && <ListItem>Help you when you write to us about your account, for example a lost email address or a stolen account</ListItem>}
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
          {PRIVACY.trading ? ', run your trades' : ''}
          {PRIVACY.blackMarket ? ', run your Black Market offers and sales' : ''}
          {PRIVACY.customPacks ? ', keep your custom packs' : ''}
          {PRIVACY.communityPacks ? ', show Community Packs and their ratings' : ''}
          {PRIVACY.ranked ? ', run Ranked and its leaderboards' : ''}
          {PRIVACY.tournaments ? ', run tournaments' : ''}
          {PRIVACY.socialFeatures ? ', run your friends, follows, profile and parties' : ''}
          {PRIVACY.notifications ? ', remind you of the game nights you asked about and tell you when a match is found' : ''}.
        </Item>
        <Item label="Legitimate Interests">
          To keep players safe (reports, the word filter{PRIVACY.groomingFlag ? ', flags of possible grooming' : ''}
          {PRIVACY.safetyAnswers1106 ? ', the automated safety check of what adults write beside players under 18' : ''}
          {PRIVACY.drawingCheck ? ', drawing checks' : ''}
          {PRIVACY.customPacks ? ', the automated check of custom packs' : ''}
          {PRIVACY.communityPacks ? ', the review of Community Packs' : ''}
          {PRIVACY.modTranslate1106 ? ', translating reports and packs in review so that our moderators can read them' : ''}
          {PRIVACY.socialFeatures ? ', the checks of the social safety log and of the games parties play' : ''}
          {PRIVACY.trading ? ', the checks of trades' : ''}
          {PRIVACY.blackMarket ? ', the checks of the Black Market' : ''}, moderation
          {PRIVACY.banTombstone ? ', keeping banned, paused and muted players from coming back on a new account' : ''}, age
          limits and the protections for players under 18), protect accounts and prevent abuse
          (security logs{PRIVACY.ipVault ? ', and the encrypted IP addresses of new accounts and sign-ins, for safety, fraud and legal requests' : ''}), keep the app working{PRIVACY.crashReports ? ' (crash reports)' : ''}, and improve it (usage
          events{PRIVACY.spybots ? ', and testing the game with our AI players' : ''}){PRIVACY.creatorCodes ? ', and credit and pay the content creators whose codes players enter (creator codes)' : ''}.
          You can object to this processing at any time by emailing <SupportEmail />.
        </Item>
        <Item label="Consent">
          {PRIVACY.launchReminder ? 'Asking for a launch reminder on our website. ' : ''}
          For your device's permissions (the microphone and speech recognition
          {PRIVACY.notifications ? ', notifications' : ''}
          {PRIVACY.qrScanner ? ', the camera' : ''}). You can withdraw it at any time in your device's settings
          {PRIVACY.browserLegal ? " (in the browser version, in your browser's settings for the site)" : ''}.
          {PRIVACY.audit1103 ? " Also for sending your messages to OpenAI to be translated, which you can change with the app's own choices." : ''}
          {PRIVACY.practiceAi ? ' Also for sending your practice lines to OpenAI to be rated (see Practice Games).' : ''}
        </Item>
        <Item label="Legal Obligations">
          To comply with the law, for example to answer lawful requests and to report child sexual exploitation.
        </Item>
      </Bullets>

      <H2>Data Retention</H2>
      <P>
        We keep your account information for as long as you have an account. Records of games (moves, votes, roles and
        results) have no end date: we don't delete them on a schedule, and they stay after an account is deleted (see below).
        A game's drawings and chat are the exception, on the schedules described here.{' '}
        {PRIVACY.launchReminder ? 'The launch reminder list is deleted once the launch email has gone out, at the latest 30 days after the launch. ' : ''}
        {chatRetention(PRIVACY.storedQuestions ? 'Chat messages and typed questions and answers' : 'Chat messages')} Copies
        made to deliver them live are deleted within 4 days. Translations are kept for 24 hours{PRIVACY.modTranslate1106 ? ' (those made for our moderators, for up to 30 days)' : ''}, and daily translation
        counts for 14 days.
        {PRIVACY.practiceReportLog ? ' A practice game sent with Report a Problem is kept for 90 days.' : ''}
        {PRIVACY.coverage1110 && PRIVACY.playtestPayPal ? " A live playtest's list of testers is deleted within a week after the test." : ''}
        {PRIVACY.playOnline
          ? ' Play Online searches are kept for 30 days after they end, and Play Online breaks and its matchmaking log for 90 days.'
          : ''}
        {PRIVACY.drawingCheck
          ? ' The results of drawing checks are kept for 90 days. A drawing taken off or reported is kept as evidence for 90 days, or longer while its report is still open. A drawing we must report as child sexual exploitation is kept for 1 year after we report it to NCMEC, as US law requires, in restricted storage, and shared with no one except the authorities.'
          : ''}
        {PRIVACY.drawingCheck && PRIVACY.sketchConsentRecord
          ? " The record that an account agreed to the drawing check's note is kept until the account is deleted."
          : ''}{' '}
        When we report child sexual exploitation to NCMEC, we keep what we reported (such as the messages, drawings or
        packs involved and the account details in the report) for at least 1 year after the report, as US law requires,
        in restricted storage, shared with no one except the authorities, even if the account is deleted.{' '}
        {PRIVACY.childSafetyHolds &&
          "If an account that is part of a child-safety case is deleted before we've finished with the case, we first keep a restricted copy of the case, the account's email address, names, sign-in dates and the IP addresses in our sign-in log, its messages still on our servers and its encrypted IP addresses, for 1 year, or longer if the authorities ask us to. "}
        Usage events are kept
        for 180 days
        {PRIVACY.scheduledRetention
          ? `, and security logs (such as sign-ups, sign-ins, ${PRIVACY.passwordless ? 'sign-in codes sent' : 'password resets'} and email changes, which can include your email address and IP address) for 180 days.`
          : '.'}{' '}
        Rate-limit notes are deleted after 2 days, notes about joining rooms after 24 hours, and the coded records of
        account emails and sign-up requests {PRIVACY.retentionSweep ? 'after a day' : 'after a day of no use, the next time a request clears them'}.
        {PRIVACY.socialLimits ? ' Counts of daily limits reached for follows and friend requests are deleted after 90 days.' : ''}
        {PRIVACY.intel
          ? PRIVACY.intelLedger
            ? ` Your Intel balance and daily streak are kept for as long as you have an account, and the lines of your Intel ledger${PRIVACY.intelCorrections ? ' and the records of corrections' : ''} for good (with no link to you once you delete your account; the app version and platform in a line for 2 years).`
            : ' Your Intel, its history and your daily streak are kept for as long as you have an account.'
          : ''}
        {PRIVACY.intercepts ? ' Your Intercepts and what they gave you are kept for as long as you have an account.' : ''}
        {PRIVACY.mintedCollectibles
          ? ' The public ledger\'s entries are kept for good, so that it can always be checked; when you delete your account we delete its secret and remove your account from your copies\' records, so the holder codes on them no longer point at anyone.'
          : ''}
        {PRIVACY.customPacks
          ? ` Your custom packs${PRIVACY.communityPacks ? ', your ratings and the Community Packs you added' : ''} are kept until you delete them or your account.${PRIVACY.communityPacks ? ' The record of a pack\'s review, and reports about a pack (with the pack as it was), are kept as long as we keep reports.' : ''}`
          : ''}
        {PRIVACY.ranked ? ' Your Ranked ratings, game records, breaks and rewards are kept for as long as you have an account.' : ''}
        {PRIVACY.tournaments ? ' Your tournament entries, results and Tournament Tokens are kept for as long as you have an account.' : ''}
        {PRIVACY.creatorCodes
          ? " The codes you entered stay with your account for as long as you have it. The purchases credited to a content creator are kept for as long as we need them to pay the creator and keep our accounting records (up to 7 years after the creator's agreement ends)."
          : ''}
        {PRIVACY.trading
          ? " Trades and their steps are kept for good, like the Intel ledger, with no link to you once you delete your account; a code we email for a big trade stops working after 10 minutes."
          : ''}
        {PRIVACY.gameDeviceChecks
          ? ' The device notes for sign-in sessions, Play Online searches and games (see Device Information) are kept for 90 days, then deleted.'
          : ''}
        {PRIVACY.blackMarket
          ? ' Black Market offers, listings and sales are kept for good in the same way, with no link to you once you delete your account; the coded copies of the codes we email you are deleted with your account.'
          : ''}
        {PRIVACY.socialFeatures
          ? " Your friends, follows, profile and Privacy & Friends choices are kept for as long as you have an account. Friend requests are deleted 30 days after they're answered or expire, room invites 24 hours after they're answered, party invites after a day, party chat 30 days after it's sent, and sent social notifications after about 7 days. The social safety log is kept for 1 year, and what our safety checks flag for as long as we keep reports."
          : ''}
        {PRIVACY.ipVault
          ? ' The encrypted IP addresses of new accounts and sign-ins are kept for 90 days, or up to 1 year when they\'re part of a report to NCMEC, an open case, a child-safety case or a law-enforcement request.'
          : ''}
        {PRIVACY.audit1103
          ? ' Emails waiting in our account mail queue are kept for 30 days (the address and any code are removed once sent), coded copies of ban-notice codes stop working after 30 minutes and are deleted 2 days later, and push receipt numbers are deleted after about 2 days' + (PRIVACY.retentionSweep ? '' : ', the next time we send a push') + '. The record of what we did for you in Account Support is kept as long as we keep reports.'
          : ''}
        {PRIVACY.banTombstone
          ? ' Records of sanctions on deleted accounts: 12 months after the sanction would have ended (or after its 90-day warning period); for a permanent ban, 12 months after the account was deleted (3 years for a ban for child safety), and again from each later attempt to sign up with one of its sign-ins.'
          : ''}
        {PRIVACY.intercepts
          ? ` The signs our fair-play checks find are kept for up to 400 days, or longer while they're part of an open case or an alert that's waiting for our review; reward holds and the reviews players ask for stay with their case for as long as we keep reports.${PRIVACY.dataRights ? " The account's fair-play score is kept while you have an account and deleted with it." : ''}${PRIVACY.integrityProbes ? ' Notes of requests our app never makes are deleted after 90 days, or with the account if it goes first.' : ''}`
          : ''}
        {PRIVACY.dataRights
          ? ' Our record of a privacy request (see Your Rights) is kept for 24 months after we answer it.'
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
            ? ', and delivers our push notifications (the ones you allow, and the alerts our moderators and developer get)'
            : ''}
          . When the app checks for an
          update, Expo receives your device's IP address and platform, the app's version, and a random ID the app
          creates for that installation, which isn't linked to your account.
        </Item>
        {!msGone && (
          <Item label="Microsoft">
            (Azure AI Translator, https://azure.microsoft.com/products/ai-services/ai-translator){' '}
            {msOff && PRIVACY.packAutoTranslate ? (
              "Translates custom packs, only when OpenAI can't translate one at that moment (only their text and the languages, see Custom Packs above). It doesn't translate chat messages, questions or answers."
            ) : (
            <>
            Translates the text of a
            message{' '}
            {PRIVACY.autoTranslation
              ? 'when the app translates it for you (automatically, or when you tap Translate)'
              : 'when you tap Translate'}
            {PRIVACY.openAiTranslation
              ? ", if our translation service uses Microsoft rather than OpenAI, and always for messages from players under 16, from players who haven't told us their age, and from players who haven't agreed in the app to translation by OpenAI"
              : ''}
            .
            {PRIVACY.packAutoTranslate
              ? ` It also translates custom packs${PRIVACY.openAiTranslation ? ', only when OpenAI can\'t translate one at that moment' : ''} (only their text and the languages, see Custom Packs above).`
              : PRIVACY.featuredPacks &&
                ` It may also translate the Community Packs we feature${PRIVACY.openAiTranslation ? ', when our service uses it for them' : ''} (only their text, see Custom Packs and Community Packs above).`}
            </>
            )}
          </Item>
        )}
        {usesOpenAi && (
          <Item label="OpenAI">
            (https://openai.com){' '}
            {PRIVACY.drawingCheck &&
              'Checks drawings for content that breaks our Community Rules: drawing turns in public rooms get an automated check, some also get a second, more detailed check, and so do drawings players report. '}
            {PRIVACY.openAiTranslation &&
              `${PRIVACY.drawingCheck ? 'It also translates' : 'Translates'} messages ${sendTime ? 'for our translation service, usually as soon as they\'re sent' : 'when our translation service uses it'} (see Translations above), only messages written by players who told us they're 16 or older and agreed to it in the app, and we send them to it only for that: it receives the text of the messages being translated, up to three other recent messages from the same chat by such players (without who said them), a list of names to leave as they are (agent names and, in private rooms, the display names of such players) and the two languages, never your account or anyone's age. Our service asks OpenAI not to store these requests or its answers. `}
            {PRIVACY.modTranslate1106 &&
              "It also translates, for our moderators, messages and report notes under the same rule, and the text of a pack in review (see Translations and Custom Packs above); for that it receives only the text and the languages, never who wrote it. "}
            {PRIVACY.customPacks &&
              `${PRIVACY.drawingCheck || PRIVACY.openAiTranslation ? 'It also checks' : 'Checks'} the text of every custom pack (its name, description and entries) with its moderation model before anyone else can play or see it (see Custom Packs above); it receives only that text, never who made the pack. `}
            {PRIVACY.communityPacks &&
              'It also reads each pack sent to Community Packs for our team before we review it (its name, theme, description and entries, and the share of its entries another listing has too), and notes anything that may break our rules; it receives only that text, never who made the pack, and only our team sees its notes. '}
            {PRIVACY.packAutoTranslate
              ? `${PRIVACY.openAiTranslation ? 'It also detects each custom pack\'s language and translates the pack, receiving only the pack\'s name, description and entries and the languages, never who made the pack. ' : ''}Its moderation model also checks each pack translation before it is kept. `
              : PRIVACY.featuredPacks &&
                PRIVACY.openAiTranslation &&
                'When our translation service uses it for the Community Packs we feature, it receives only the pack\'s name, description and entries and the languages, never who made the pack. '}
            {PRIVACY.practiceAi &&
              'It also rates the lines players type in practice games, only for players who told us they\'re 16 or older and agreed to it in the app (see Practice Games above): it receives the line, what kind of line it is, the practice role, the game\'s location and the pack\'s other locations, the practice game\'s line it replies to and the language, never your account, name or age, with a request not to store it. '}
            {PRIVACY.spybots &&
              'It also decides the moves of the AI players our developer plays with, receiving what a bot\'s seat can see at the table, as AI Players above describes, with a request not to store it. '}
            {PRIVACY.safetyAnswers1106 &&
              'It may also check the messages adults write beside a player under 18 for sexual talk aimed at them (see Chat Safety Checks); it receives only each message\'s text, never who wrote it, with a request not to store it. '}
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
          Speech recognition when you use the microphone (they may receive the recording
          {PRIVACY.storePrivacy1108 ? ' and the names the app asks them to listen for, as Voice Input above says' : ''})
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
            (Plus Five Five, Inc., https://resend.com) Sends our account emails, such as
            {PRIVACY.passwordless ? ' sign-in codes' : ' sign-up confirmations and password resets'}, and the emails for agreements signed on our website (the signed agreement and its audit
            trail){PRIVACY.trading ? `, the codes we email you for big trades` : ''}{PRIVACY.playtestPayPal ? `, the emails about a live playtest's seats` : ''}{PRIVACY.launchReminder ? ', the one launch reminder email' : ''}{PRIVACY.accountNotices ? `, the notice when an account is banned (its reference, reason and, unless the decision is final, how to appeal, in the account's language) with any code you ask for to read it in the app, and the note to an account's old address when we change its email at your request (that address and any code are removed from our records once sent)` : ''}{PRIVACY.intelCorrections ? ', and the copy of each Intel correction sent to our own support inbox (the username of the account it affects, the amounts and the record\'s fingerprint)' : ''}, so it receives the email addresses and the emails it delivers.
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
        {creatorShortLive(PRIVACY) && (
          <Item label="YouTube">
            (Google, https://www.youtube.com) Our home page can show a creator's video in YouTube's privacy-enhanced
            player (youtube-nocookie.com). Nothing loads from YouTube until you press play on the video. When you do,
            YouTube receives your IP address and information about your browser and device, and may store cookies or
            similar data in your browser, under Google's privacy policy. We don't receive anything from YouTube about
            you.
          </Item>
        )}
        <Item label="ImprovMX and Google">
          Email you send to support@spysocial.app is forwarded by ImprovMX and read in Google's Gmail. When you use
          Report a Problem in the app's Settings, the email it prepares also lists the app's version and update, your
          phone's model and operating system, and the app's language, to help us find the problem; the email is sent
          only when you send it, and you can delete those lines first.
          {PRIVACY.practiceReportLog &&
            ' The one thing sent before that is your last practice game, and only if you leave "Include my last Practice game" ticked (see Practice Games).'}
        </Item>
      </Bullets>
      <P>
        We give these providers only the data they need to provide their service. Supabase, Expo
        {msGone ? '' : ', Microsoft'}
        {usesOpenAi ? ', OpenAI' : ''}
        {PRIVACY.purchases ? ', RevenueCat' : ''}
        {PRIVACY.crashReports ? ', Sentry' : ''}
        {PRIVACY.resendAccountEmail ? ', Resend' : ''} and Vercel process it for us under contracts that bind them to protect it
        at least as well as this policy does. Apple, Google{usesMyMemory ? ', Translated (MyMemory)' : ''}, ImprovMX and
        testing services such as BetaTesting{PRIVACY.playtestPayPal ? ', and PayPal (for playtest payments),' : ''} handle what they receive under their own terms and privacy policies.
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
        never a role or the secret word before every player can see it, or anyone's vote
        {PRIVACY.coverage1110
          ? " (except that in a room with the Paper Trail rule on, they see how a spy who was voted out voted, once that spy's role is shown)"
          : ''}
        .
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
        {PRIVACY.blackMarket &&
          " The Black Market shows every player who opens it an item's prices and quantities on offer and its past sales, and a listed Unique's number, colour and price, never who is buying or selling."}
        {/* LIVE.socialFeatures (legalRelease). */}
        {PRIVACY.socialFeatures &&
          " Your friends see your display name, your agent and, if you allow it, whether you're online now. An adult's public profile (see Follows and Profiles above) can be opened by any player; a private profile, and the profile of any player under 18, can't be opened by other players. A party is marked at the table for everyone there, and its members see each other by display name."}
        {/* LIVE.ranked: get_ranked_leaderboard (adults only; @username only when chosen). */}
        {PRIVACY.ranked &&
          ' Ranked leaderboards show the top 100 players of each Ranked game in a season, with their rank and rating, to every player who opens them: by agent name (for example, "Agent Blue"), or by username if the player chose that in the app. Players under 18, and players who haven\'t told us their age, are never shown on a leaderboard.'}
        {/* LIVE.tournaments: get_tournament (standings between stages, the winners). */}
        {PRIVACY.tournaments &&
          " A tournament's standings (after each stage, never during one) and its winners are shown, with their points and places, to every player who opens that tournament in the app: by username, or by agent name for players under 18 and players who haven't told us their age."}
        {/* LIVE.communityPacks: an approved pack is public (legalRelease). */}
        {PRIVACY.communityPacks &&
          " A custom pack you submit to Community Packs is shown to every player once we approve it, with your username as its creator (or Anonymous, if you chose that), its ratings and how many players added it (see Custom Packs and Community Packs above); never who rated or added it."}{' '}
        Reports are
        reviewed by our moderators. We may share anonymous, aggregated data for analytics purposes.
        {/* LIVE.publicStats: get_public_stats / the public-stats function (legalRelease). */}
        {PRIVACY.publicStats &&
          ' We also publish live totals, on our website and on our Discord server: how many players are online, how many games are being played in each mode, how many games were played today and this week, and how many accounts there are (rounded down to a multiple of 10). Any number under 5 shows as "<5", and these totals never say who.'}
        {PRIVACY.audit1103 && ' On Discord we also post recent public games (the game, table size, which side won, how and about when, never who played), the game nights we schedule, and the Community Packs added most.'}
      </P>
      {PRIVACY.volunteerModerators && (
        <P>
          Some of our moderators are community moderators: trusted adult players who volunteer to help us review
          reports. Before they start, each one signs a moderator agreement in which they promise to keep everything
          they see confidential, not to copy, screenshot or share it, not to contact players outside SpySocial about a
          case, and to step aside from cases involving people they know; that promise continues after they stop
          moderating. A community moderator sees only what a case they're handling needs: the report and what's
          attached to it (for example, the messages, questions, answers or drawings reported, and the chat of the game
          it came from), the usernames and public names of the players involved, how long their accounts have existed,
          the player's earlier warnings and penalties, how many of the reporter's reports led to action, whether a
          player under 18 is involved and, for fair-play cases, the game patterns behind the case.{PRIVACY.moderatorRoomActions ? ' With our permission, a community moderator may also watch a Game Night table while it plays (seeing what a watcher sees: the agents, chat and drawings at that table), and read the Community Packs waiting for review with their creator\'s username.' : ''} They never see your
          email address, sign-in details, IP address, payment details or your age. Cases involving a child's safety, self-harm
          or threats{PRIVACY.safetyAnswers1106 ? ', and reports of personal info shared by or with a player under 18,' : ''} go to SpySocial's developer only, never to community moderators. We keep a record of every case a
          community moderator opens and every action they take (what they did, to whom, when and why), for as long as
          we keep reports, and we can see and undo each one. We also keep, for each community moderator, that they are
          one, what they may do, when they accepted the agreement and which version, and when their role started and
          ended.
        </P>
      )}
      <P>
        We may also share information when the law requires it (for example, to report child sexual exploitation to
        the National Center for Missing & Exploited Children), or when we believe in good faith that it's needed to
        protect someone's life or safety.
      </P>

      {PRIVACY.homeDiscord && (
        <>
          <H2>Links to Other Services</H2>
          <P>
            The app and this website link to services we don't run, such as SpySocial's official Discord server (the app
            can show a link to it on Home, but never to players under 16) and our social media pages. Opening a link
            takes you to that service, which handles what you do and share there under its own terms and privacy
            policy. We don't send it anything about you when you open the link. Our team and volunteer moderators look
            after our Discord server, but we can't see private messages on Discord.
          </P>
        </>
      )}

      <H2>If SpySocial Changes Hands</H2>
      <P>
        {LLC_SINCE
          ? `On ${LLC_SINCE}, SpySocial moved to ${OPERATOR.name}, a company its owner controls, and your information moved with it under this privacy policy. SpySocial may move again to someone else who takes over SpySocial, such as a buyer.`
          : 'SpySocial may move to a company that its owner controls (for example, SpySocial LLC, which is being set up), or to someone else who takes over SpySocial, such as a buyer.'}{' '}
        If that happens, your information moves with it,
        and the new owner must keep using it under this privacy policy. Before anything changes in how your
        information is used, we'll tell you in the app and on this website. You can delete your account at any time,
        before or after a change.
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
        write from the email address on your account. We reply within one month, free of charge. If a request is
        complex, or you send us several, we may take up to two more months, and we'll tell you why within the first
        month.
      </P>
      <Bullets>
        <Item label="A copy of your data">
          {PRIVACY.dataRights
            ? `We email a copy of the personal data linked to your account, in a machine-readable file (JSON), to the email address on your account: your account and sign-in details, profile, settings and the answers you gave the app, your games, stats and rewards, the chat messages we still keep, purchases, trades, friends, follows${PRIVACY.exportTesters ? ", the problem reports you sent us (with any practice game you included), your entry on a beta tester list if you're on one" : ''} and the other records we keep about your account. Other players appear in it only as "another player". `
            : 'We send a copy of the personal data linked to your account, in a machine-readable file, to the email address on your account. Other players appear in it only as "another player". '}
          To protect other people and keep SpySocial safe, it doesn't include reports others made about you or who made
          them, who blocked you, the records and score of our fair-play and safety checks, the encrypted IP addresses
          described above{PRIVACY.exportTesters ? ', one-time codes, or the coded copies (hashes) of the email addresses you gave us to join a beta test' : ', or one-time codes'}; the copy lists what it leaves out and why.
        </Item>
        <Item label="Correcting your data">
          You can change your display name in the app at any time
          {PRIVACY.usernameLimit ? ', and your username once every 30 days' : ', and your username'}. Your email address
          and birth year can't be changed in the app: email us.{PRIVACY.audit1103 ? " To change an email address we first check that the account is yours, from both addresses when you still have the old one. We then tell the old address, sign the account out everywhere and close its open Black Market offers and listings, and its trading pauses for 3 days." : ''} We change a birth year to a later one (a younger age) when
          you, or your parent or guardian, ask; to an earlier one (an older age) only with proof of age, because age limits
          keep younger players safe. If you entered a year that made you 13 to 17 and you're an adult, email us and we'll ask
          for the proof: only SpySocial's developer can make this change, it's never done by a community moderator, and
          we use what you send only to check your age. We keep a short note of what we checked, with the old and new years, in
          our record of your request and in our moderation records. There's no way back from an answer under 13, which
          deleted the account. If the corrected age is under 13, we delete
          the account (see Children's Privacy). A correction that makes you under 18 also gives your account the
          Privacy &amp; Friends choices of a player under 18{PRIVACY.audit1103 ? ' and closes its Black Market offers and listings, with what they hold or earned coming back to it' : ''}.
        </Item>
        <Item label="Deleting your data">
          In the app at any time, or by asking us (see When you delete your account, above).
        </Item>
        <Item label="Objecting or restricting">
          Tell us which use you object to. We stop it unless we have compelling legitimate grounds that override your
          interests, such as keeping players safe and preventing fraud and cheating, or we need it to establish,
          exercise or defend legal claims. You can withdraw consent at any time: for your device's permissions in your
          device's settings, and for translation by OpenAI with the app's own choices.
        </Item>
        <Item label="Guest accounts">
          A guest account has no email address, so we can't confirm by email that a request is yours. A guest can
          delete their account at any time by signing out; to get a copy or a correction, first save the account with
          an email address in the app.
        </Item>
        <Item label="Checking that it's you">
          We answer only to the email address on the account (if you signed in with Apple and hid your email, that's
          Apple's private relay address). If you write from another address, we write to the account's address to
          confirm, and we may ask for more if we still can't be sure. Someone acting for you (for example an authorized
          agent under California law) needs your signed permission, and we'll still confirm with you.
        </Item>
        {PRIVACY.dataRights && (
          <Item label="Our record of your request">
            We keep a record of each request (what was asked, when, how we confirmed it was you, and when and how we
            answered) for 24 months after we answer it, even if the account has been deleted, to show that we answered
            it.
          </Item>
        )}
      </Bullets>

      <H2>California Privacy Rights</H2>
      <P>
        If you are a California resident, the California Consumer Privacy Act (CCPA), as amended by the California
        Privacy Rights Act, gives you the right to know what personal information we collect, use and disclose (this
        policy lists it: account, profile and sign-in details, what you do and send in the game, device and network
        information, purchases, and what our fair-play and safety checks find), to get a copy of it, to have it
        corrected or deleted, and not to be treated differently for using these rights. You use them as described in
        Your Rights, above; we reply within one month (the CCPA allows 45 days).
      </P>
      <P>
        We don't sell your personal information, and we don't share it for cross-context behavioral advertising
        (targeted ads); we never have. SpySocial shows no ads: the app has no advertising or ad-tracking services and
        doesn't use your device's advertising identifier, and our website has no ad or tracking pixels. So there is
        nothing to opt out of, and we don't sell or share the personal information of anyone, including players under
        16. We use sensitive personal information (such as the details you sign in with) only to provide SpySocial and
        keep it secure, never to infer anything about you.
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
      <P>
        If you're the parent or guardian of a player under 18, you can ask us to delete your child's account, to
        correct its birth year, or for a copy of its data (see Your Rights). Email <SupportEmail /> with your child's
        username. So that we never act on a stranger's request, we confirm it with the email address on the account
        (or, for a guest account, which has none, we explain how to delete it in the app by signing out), and for a
        copy of the data we may also ask you to show that you're the child's parent or guardian. We reply within one
        month. A request to delete the account of a child under 13 is always granted. A copy never includes other
        players' data.
      </P>
      {PRIVACY.socialFeatures && (
        <P>
          Players under 18 have the most private Privacy &amp; Friends choices to start with: no adding by username,
          no follows, no public profile and online status hidden; they can show their online status to friends, but
          can't turn the others on until they're 18. Players who haven't told us their age are treated as under 16.
          An adult can add a player under 16 only in person, with a Friend Code. Players under 18 get no social
          notifications between 10 PM and 7 AM, can't be found, suggested or followed, and their packs are
          anonymous. On iPhone{PRIVACY.membershipWords1105 ? ' and iPad' : ''}, friends, follows and parties stay off for players under 18 until a version of the app
          that asks a parent's consent through Apple is out.
        </P>
      )}
      <P>
        In the app's list of rooms, players under 16 (and players who haven't told us their age) see no private room
        but their own, and a private room hosted by a player under 18 is listed to no one but its host; joining a
        private room still needs its code, link or QR code, or an invite. Some of the game's suggested questions are never offered to a player under 18,
        and the game never picks one by itself while a player under 18 is in the room or game.{PRIVACY.homeDiscord ? " Players under 16 never see the app's link to our Discord server, and players 16 and 17 see a note on staying safe before it opens (on iPhone" + (PRIVACY.membershipWords1105 ? ' and iPad' : '') + ", no player under 18 sees it for now)." : ''}
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
        {OPERATOR.name && OPERATOR.address ? `, or write to ${OPERATOR.name}, ${OPERATOR.address}` : ''}
        {LLC_SINCE ? ` (phone ${OPERATOR.phone})` : ''}.
      </P>
    </LegalPage>
  )
}

export default Privacy
