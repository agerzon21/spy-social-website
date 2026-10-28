import { ListItem, OrderedList, Text } from '@chakra-ui/react'
import { LegalPage } from '../components/legal/LegalPage'
import { CalloutBox } from '../components/legal/Callout'
import { Bullets, H2, H3, OutLink, P, PageLink } from '../components/legal/LegalText'
import { ShopLink } from '../components/legal/ShopLink'
import UkOnlineSafety, { UK_SECTION_NUMBER } from '../components/legal/UkOnlineSafety'
import {
  LEGAL_LAST_UPDATED,
  LIVE,
  ONLINE_SAFETY_TEXT,
  OPERATOR,
  TERMS_EFFECTIVE_FOR_EXISTING,
  TERMS_PREVIOUS,
  TERMS_PUBLISHED,
  avatarsLive,
  drawingCheckLive,
  drawingCheckTestersOnly,
  photosInUse,
  photosShown,
} from '../lib/legalRelease'

// The owner's choices (2026-10-03): 13 and older only, everyone included;
// Pennsylvania law; buying in 2.2 (shown once LIVE.purchases is on). What
// else depends on what has shipped is in src/lib/legalRelease.ts. When
// publishing a change, update LEGAL_LAST_UPDATED there and raise
// app_config.terms_version so everyone agrees again.
const GOVERNING_STATE = 'Pennsylvania'

const SupportEmail = () => <PageLink to="/contact-us">support@spysocial.app</PageLink>

const Terms: React.FC = () => {
  const state = GOVERNING_STATE
  const we = OPERATOR.name ? `${OPERATOR.name}, the operator of SpySocial` : 'SpySocial'
  // Profile photos we still hold (photosInUse) and ones other players can still see or players can add (photosShown).
  const photos = photosInUse(LIVE)
  const photosSeen = photosShown(LIVE)
  const drawings = drawingCheckLive(LIVE)
  // With LIVE.membershipsOnly: what isn't sold, as one list ("Packs, avatar items, celebrations, Intercepts and Intel").
  const notSoldItems = [
    'Packs',
    'avatar items',
    avatarsLive(LIVE) ? 'celebrations' : null,
    LIVE.intercepts ? 'Intercepts' : null,
    LIVE.intel ? 'Intel' : null,
  ].filter((item): item is string => item !== null)
  const notSold = `${notSoldItems.slice(0, -1).join(', ')} and ${notSoldItems[notSoldItems.length - 1]}`

  return (
    <LegalPage english title="Terms of Service for SpySocial" updated={<>Last Updated: {LEGAL_LAST_UPDATED}</>}>

      <P>
        These Terms of Service ("Terms") are the rules for using SpySocial: the SpySocial app, our website at
        spysocial.app, and everything we offer through them. "We", "us" and "our" mean {we}. "You" means you, the
        player. Please read them: they include limits on what we're responsible for.
      </P>

      <P>
        These Terms were published on {TERMS_PUBLISHED} and replace the Terms of{' '}
        {TERMS_PREVIOUS.join(' and the Terms of ')}. If you started
        using SpySocial before {TERMS_PUBLISHED}, they apply to you from {TERMS_EFFECTIVE_FOR_EXISTING}, or sooner
        if you accept them in the app. For everyone else, they apply from the first time you use SpySocial.
      </P>

      <CalloutBox>
        <Text textStyle="body" color="ss.text" fontWeight="700" mb={2}>The short version</Text>
        <Bullets>
          <ListItem>Be kind and play fair, and follow our Community Rules. We don't tolerate objectionable content or abusive players.</ListItem>
          <ListItem>
            What you add (your name, {photosSeen ? 'photo, ' : ''}messages{LIVE.customPacks ? ', drawings and packs' : ' and drawings'})
            stays yours, but other players see it, and you let us use it to run SpySocial.
          </ListItem>
          <ListItem>Public rooms put you in games with people you don't know. Keep your personal information to yourself.</ListItem>
          <ListItem>If you break the rules, we can remove your content and limit or ban your account.</ListItem>
          <ListItem>SpySocial is provided as it is, and our responsibility is limited as far as the law allows.</ListItem>
        </Bullets>
        <Text textStyle="small" color="ss.muted" mt={2}>
          This summary is only a guide. The full Terms below are what apply.
        </Text>
      </CalloutBox>

      <H2>1. Accepting These Terms</H2>
      <P>
        By using SpySocial, or by tapping Agree when the app asks you to, you accept these Terms. Our{' '}
        <PageLink to="/rules">Community Rules</PageLink> are part of these Terms. Our{' '}
        <PageLink to="/privacy">Privacy Policy</PageLink> explains how we handle your personal data. If you don't
        accept these Terms, please don't use SpySocial.
      </P>

      <H2>2. Who Can Use SpySocial</H2>
      <P>
        You must be at least 13 years old to use SpySocial.{' '}
        {LIVE.ageGateEveryone
          ? `The app asks for your birth year${LIVE.birthMonth ? ' (and, if you turn 13 to 16 in the year you answer, your birth month)' : ''} before your first game, and you must answer truthfully.`
          : 'When the app asks for your birth year, you must answer truthfully.'}{' '}
        {LIVE.under13Deletion
          ? "If you're under 13, you can't use SpySocial: an answer under 13 deletes the account, and if we learn in any other way that an account belongs to someone under 13, we'll delete it."
          : "If you're under 13, you can't use SpySocial, and if we learn that an account belongs to someone under 13, we'll delete it."}
      </P>
      <P>
        If you're under 18, or under the age of majority where you live, you need a parent's or guardian's
        permission to use SpySocial and to buy anything in it. Your parent or guardian accepts these Terms for you
        and is responsible for how you use SpySocial. You can't use SpySocial if we've banned you, or if the law
        where you live doesn't allow you to.
      </P>

      <H2>3. Your Account</H2>
      <H3>Guests and saved accounts</H3>
      <P>
        You can play as a guest without giving us an email address. A guest account lives on your device
        {LIVE.browserLegal ? ' (in the browser version, in that browser)' : ''}: signing out of it deletes it for
        good, and you may lose it if you delete the app{LIVE.browserLegal ? ", clear your browser's data" : ''} or
        lose your device. To keep your
        name, progress and packs on any device, save your account with an email address
        {LIVE.passwordless ? ' (we email you a one-time code each time you sign in)' : ' and a password'}
        {LIVE.socialSignIn ? ', or with Sign in with Apple or Google' : ''}. Public rooms and events need a saved
        account with a confirmed email address{LIVE.socialSignIn ? ', or one that signs in with Apple or Google' : ''}.
        {LIVE.purchases &&
          (LIVE.membershipsOnly
            ? " Guests can buy a membership too. A guest's membership belongs to the guest account; if you lose it, Restore Purchases brings it back (see section 9)."
            : " Guests can buy packs and memberships too. A guest's purchases belong to the guest account; if you lose it, Restore Purchases brings them back (see section 9).")}
      </P>
      <H3>Keeping your account safe</H3>
      <P>
        {LIVE.passwordless
          ? `Keep your email account${LIVE.socialSignIn ? ' (and your Apple or Google account)' : ''} to yourself: anyone who can read your email can sign in with the codes we send there. Never share a sign-in code; we never ask you for one. You're responsible for what happens on your account. If you think someone else has used it, secure your email account and tell us.`
          : `Keep your password${LIVE.socialSignIn ? ' (and your Apple or Google account)' : ''} to yourself. You're responsible for what happens on your account. If you think someone else has used it, change your password and tell us.`}
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
        {LIVE.onePool &&
          ' Each player sees the game, including the secret word or location and the hints, in the language their own app is set to.'}
      </P>
      <H3>Private rooms</H3>
      <P>
        {LIVE.onePool
          ? "Every room you create is private: it's for the people you invite with its code, a link or a QR code."
          : 'A private room is for people you invite with its code, a link or a QR code.'}{' '}
        Anyone who has the code or the link can join, so share it only with people you want to play with. The host of a private room can remove
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
        {LIVE.onePool
          ? "Public rooms are Play Online's tables and the events we schedule; players can't create public rooms. They're open to players you don't know."
          : "Public rooms are open to players you don't know."}{' '}
        Anyone who meets the requirements can play in them: a saved account with a confirmed email address
        {LIVE.socialSignIn ? ' (or Apple or Google sign-in)' : ''}, being 13 or older, and agreeing to the Community Rules.
        {/* Play Online's presets all have rules.room_votes_in_game false (live, 2026-10-25), call_room_vote refuses kick and
            end votes in a standard game, and a Play Online table has no lobby; only a hosted event room (events.format
            'room', off while app_config.events_enabled is false) has them. */}
        {' '}Play Online's tables, Game Night's included, have no votes to remove a player or to end a game: Report, Block
        and Leave are always there (see section 8). Players can vote to remove a player or to end a game only in an event
        we host in a room of its own.
      </P>
      {LIVE.playOnline && (
        <P>
          Play Online seats you at a table with other players for a game with standard settings
          {LIVE.onePool
            ? ` and the free packs, plus the members' packs when a member sits at the table${LIVE.featuredPacks ? ', and the Community Packs we feature' : ''}. Nobody hosts a table, and the same requirements apply`
            : ', under the same requirements'}
          . If you don't tap Ready in time, leave a table that is starting, don't open your role card in time, are
          away when the game starts, or leave a game that has started, you get a short break from Play Online (Game
          Night's tables included){LIVE.onePool ? '' : ' and from other public rooms'}, never from private rooms or the
          events we host in a room of their own: 5 minutes, and for leaving started games again within 24 hours, 15 and
          then 60 minutes. The first time in a day that you're away when a game starts, there's no
          break.
        </P>
      )}
      <P>
        Events are public games we schedule for a set time, with settings and packs we choose. We may change, move
        or cancel an event, limit how many players can join it, and decide who hosts it.
        {/* LIVE.gameNightRules: the rules page says it's part of these Terms. */}
        {LIVE.gameNightRules && (
          <>
            {' '}Game Night, our weekly event, is played at Play Online tables; its titles and how to get them are set
            out in the <PageLink to="/game-night-rules">Game Night Rules</PageLink>, which are part of these Terms.
          </>
        )}
      </P>
      {/* LIVE.ranked: Ranked v2 (material: it adds Ranked's own breaks; see legalRelease). */}
      {LIVE.ranked && (
        <P>
          Ranked is a Play Online mode where the results of your games move a skill rating (MMR) and a rank, season by
          season. Only a game's result counts; a game without a result, or one our fair-play checks flag, doesn't. How
          placement games, ranks, rank drops, the reset at the start of a season and season rewards work is shown in
          the app, and we may change these rules, usually between seasons. Ranked has breaks of its own, on top of Play
          Online's: for declining a Ranked match (5, then 15, then 60 minutes within 24 hours), for leaving a Ranked
          game that has started (15 minutes, then 2 hours, then 24 hours within 24 hours), and 3 days without Ranked
          for leaving 3 of your last 20 Ranked games. We may correct a rating or rank that's wrong, and take back a
          rating, rank or reward that was earned by cheating. Ratings, ranks and season rewards are virtual items
          (section 9).
        </P>
      )}
      {/* LIVE.tournaments: Tournaments v1 (material: new rules and a pause; see legalRelease). */}
      {LIVE.tournaments && (
        <P>
          Tournaments are free cups we schedule for Ranked players: you can sign up for one that's open to your Ranked
          rank, and you have to check in before it starts. A tournament is played in stages at tables of four; the
          top half of each stage go on to the next, and the top half of the last stage win. If you don't show up for
          a game (for example, you don't tap Ready) or leave one, you're out of that tournament, and 2 missed games
          within 60 days mean no tournaments for 30 days. When a tournament ends, its results are checked for fair
          play for up to 48 hours before they're final; we may disqualify a player who cheated and change the results
          and rewards. Titles and Tournament Tokens are given as the app shows for each tournament. We may change,
          move or cancel a tournament (for example, when too few players check in), limit how many players can join
          it, or change its format and rewards.
        </P>
      )}
      <P>
        Be careful with people you don't know. Don't share personal information, such as your real name, address,
        phone number or social media handles, and use Block, Report or Leave whenever something feels wrong. We
        may limit who can use public rooms and events (for example by{' '}
        {LIVE.onePool ? 'age or region' : 'age, region or language'}), and we may switch
        them off.
      </P>

      <H2>6. Your Content</H2>
      <P>
        "Your content" means everything you add to SpySocial: your display name, username
        {photos ? ', profile photo' : ''} and any room code you choose; your chat messages, including in the spy
        chat and the chat for players who are out; the questions and answers you type; your Spy Sketch drawings;
        {LIVE.customPacks ? ' the custom packs you make, and their drafts (their names, descriptions and entries);' : ''}
        {LIVE.communityPacks ? ' the ratings you give Community Packs;' : ''} and the reports you send.
      </P>
      <H3>You own it, and you let us use it</H3>
      <P>
        You keep ownership of your content. To run SpySocial, we need your permission to use it, so you give us a
        worldwide, non-exclusive, royalty-free license to store, copy, send, show, translate and adapt it (for
        example, {photos ? 'resize a photo or translate a message' : 'translate a message'}), and to let other
        players see it. This includes showing it to the players in your room, in room lists and game results, and
        to the people who review reports.
        {LIVE.communityPacks &&
          ' When you send a custom pack to Community Packs, you also give us a non-exclusive, worldwide, perpetual, royalty-free license to host, show, translate and use that pack in SpySocial: to review it and, once we approve it, show it to every player with your username as its creator (or as Anonymous, while you\'ve chosen that), list it in search and in collections, show its ratings and how many players added it, let any player add it to their packs, rate it, play it and copy it into a draft of their own to make their own version, and keep it in Community Packs while it\'s anonymous and after you delete your account. You still own the pack.'}
        {LIVE.featuredPacks &&
          ' If we feature your pack, it also lets us edit it (for example to fix spelling or take out an entry that doesn\'t fit), translate it into the languages the app offers, and play it at Play Online tables and events.'}{' '}
        The license ends when your content is deleted from SpySocial, except for{' '}
        {LIVE.communityPacks ? 'the packs you published to Community Packs (above) and ' : ''}copies we keep as our
        Privacy Policy describes (for example, content attached to a report). We won't use
        your {photos ? 'photo or your messages' : 'messages'} in our advertising without asking you first.
      </P>
      <H3>Your responsibility</H3>
      <P>
        You're responsible for your content. Only add content you have the right to share
        {photosSeen ? " (for example, don't upload a photo of someone else without their permission)" : ''}, and make
        sure it follows these Terms and the Community Rules. Other players can see, remember and take screenshots of
        what you share in a room, and we can't control what they do with it, so think before you share.
      </P>
      <H3>Other players' content</H3>
      <P>
        Content from other players belongs to them. We don't check everything before it appears and we're not
        responsible for it, but we act on what's reported to us.
        {LIVE.communityPacks &&
          ' We do read every pack sent to Community Packs before other players can see it, but it still belongs to the player who made it.'}
      </P>
      {/* LIVE.customPacks: Custom Packs, with Community Packs (communityPacks) and featuring (featuredPacks). */}
      {LIVE.customPacks && (
        <>
          <H3>Custom packs{LIVE.communityPacks ? ' and Community Packs' : ''}</H3>
          <P>
            With a membership, you can make your own packs of locations or words and play them in your private rooms,
            where everyone in the room plays them with you. You write a pack as a draft: a draft can hold up to 200
            entries, stays private to you and is never played in a game. When it's ready (5 to 200 entries), you
            create a pack from it; after you change the draft, you can update that pack from it. An automated check
            reads the pack's text first, and again at each update (see section 8): if it finds
            something that breaks these Terms or the Community Rules, such as slurs, hate or extremist content, the
            pack isn't created (an updated pack is paused instead) and your draft stays as it was. Ordinary swear words are fine in a pack you only play in
            your own private rooms. Making and playing custom packs is a membership benefit; your drafts and packs stay
            on your account if your membership ends, until you delete them or your account is deleted. Only make packs
            that are your own work and that follow the Community Rules: no personal information, no real people you
            know, and no ads or links.
            {LIVE.communityPacks && (
              <>
                {' '}You can also send a copy of your draft to Community Packs (Submit to Community), where every player
                can find it once we approve it, with your username as its creator unless you choose to post it
                anonymously. Before it's sent, the app asks you to agree to these Terms and the Community Rules again. A person on our team reviews every pack sent to Community Packs before anyone else can see it
                (we aim to do it within 72 hours) and holds it to a stricter standard, because Community Packs are for
                every player aged 13 and older: for example, no swearing. We may approve it or turn it down, and we may
                later hold a Community Pack while we look at it (for example after reports) or take it out if it breaks
                these Terms or the Community Rules, or if we decide not to keep it. When we turn down or take out your
                pack, the app tells you why, and you can fix it and publish it again, or appeal (see section 8).
                Publishing a pack with content that isn't allowed can lead to a suspension or a ban (see section 8).
                {' '}A pack is published once we approve it and it's live in Community Packs. While it's still in review,
                you can cancel it; your draft and your own packs stay as they are.
                {' '}A published pack is frozen: you can't change it or delete it, and players who added it keep it as
                it was. To change it, you send your changed draft again: the new version becomes a separate pack, and we
                may link the older one to it. You can choose Post Anonymously when you send a pack, and later switch a
                pack that's in review or published between Anonymous and Show My Name as often as you like, but after
                each switch you have to wait 24 hours before the next one. While a pack is anonymous, it shows Anonymous
                as its creator, can't be found by your username and doesn't count on your profile or titles. We may also
                put your name back on a pack, for example if someone else used your account to take it off. When you
                delete your account, your published packs stay in Community Packs and become anonymous at once, for
                good, and your drafts and unpublished packs (a pack still in review included) are deleted. We may
                remove any pack at any time. Creators get the Pack Maker title, which counts their approved packs that
                show their name.
              </>
            )}
            {LIVE.featuredPacks && (
              <>
                {' '}We may also feature a Community Pack: translate it and play it at Play Online tables and events. If
                we feature yours, you get the Featured Creator title and border, which count your featured packs. These
                titles and the border are virtual items bound to your account (see section 9). We don't pay money or
                give other rewards for packs, and which packs we feature is up to us.
              </>
            )}
          </P>
        </>
      )}
      <H3>Ideas and feedback</H3>
      <P>If you send us ideas or suggestions, we may use them freely, without owing you anything.</P>

      <H2>7. Community Rules and Zero Tolerance</H2>
      <P>
        Our <PageLink to="/rules">Community Rules</PageLink> are part of these Terms. They apply to names,
        {photosSeen ? ' photos,' : ''} chat, drawings{LIVE.customPacks ? ', custom packs' : ''} and how you play, in
        public and private rooms. We have zero
        tolerance for objectionable content and abusive players. Don't post, send, draw or do anything that:
      </P>
      <Bullets>
        <ListItem>is hateful or harassing, insults or targets other players, or attacks anyone for who they are</ListItem>
        <ListItem>is sexual or shows nudity</ListItem>
        <ListItem>threatens or promotes violence, or encourages anyone to hurt themselves</ListItem>
        {ONLINE_SAFETY_TEXT && (
          <ListItem>encourages, promotes or gives instructions for suicide, self-harm, eating disorders or dangerous challenges (this applies to everyone, whatever their age, in every room)</ListItem>
        )}
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
        (NCMEC) and other authorities as the law requires. If you see anything like this, email <SupportEmail /> with
        "Child safety" in the subject, and report the player in the app if you shared a room with them. You can also
        report it directly to NCMEC's <OutLink href="https://report.cybertip.org">CyberTipline</OutLink>. If a child
        is in immediate danger, contact your local emergency services first.
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
        You can report or block a player from their name in the app
        {LIVE.messageReports ? ', report a message, question or answer by long-pressing it' : ''}
        {drawings ? (LIVE.communityPacks ? ', report a drawing' : ', and report a drawing') : ''}
        {LIVE.communityPacks ? ', and report a Community Pack from its page' : ''}.
        A person reads every report, and our Community Rules say how soon. The player you report isn't told who
        reported them. To check a report, we look at what's attached to it and at the records we keep, as our
        Privacy Policy describes.
      </P>
      <H3>Automated tools</H3>
      <P>
        We also use automated tools to keep SpySocial safe: a word filter that can block certain words in names,
        usernames, room codes{LIVE.customPacks ? ', chat messages and custom packs' : ' and chat messages'}, and limits
        on how often some actions can be repeated.
        {photosSeen &&
          ' We may also use an automated service to check profile photos and remove ones that may break the rules.'}
        {LIVE.customPacks &&
          ` Another automated check reads the name, description and entries of every custom pack before it's created from your draft (and again when it's updated${LIVE.communityPacks ? ' or sent to Community Packs' : ''}); a pack it finds breaks these Terms or the Community Rules isn't created (or, after an update, is paused), so it can't be played${LIVE.communityPacks ? ' or published' : ''}.`}
        {drawings ? (
          <>
            {' '}An automated check also looks at every Spy Sketch drawing turn in public rooms (
            {LIVE.onePool ? 'Play Online tables and events' : 'including Play Online tables and events'}), and at
            any drawing someone reports.
            {drawingCheckTestersOnly(LIVE) &&
              ' For now, while we test it, it does this only in games where every player is one of our testers (players trying a test version of the app).'}{' '}
            In a public room, when it finds that a turn
            breaks the Community Rules, it takes that turn off the drawing and gives the player a strike: a warning
            first, then 3, 7 and 30 days without public rooms and events, and at the fifth strike within 90 days no
            public rooms or events for good. In any room, a flagrant drawing (a hate symbol, including a swastika,
            unless the round's word makes a religious meaning clear; a written slur; or written hate or harassment
            aimed at someone) gets the player removed from the game and banned from public rooms and events for good,
            once a second check agrees. If that removal decides the game, it ends with no winner and doesn't count. A
            drawing that sexualizes a child ends the account, with no appeal, and is reported to NCMEC. Gore and
            monsters are not against the drawing rules. In a private room, the check does nothing by itself about
            anything less serious. A person reviews every permanent decision within 24 hours. If you think the check
            got it wrong, you can appeal by email with the code in the notice (see Appeals below), and a person will
            look at it. Other decisions on reports and penalties are made by a person.
          </>
        ) : (
          ' Decisions on reports and penalties are made by a person.'
        )}
      </P>
      <H3>What we can do</H3>
      <P>If you break these Terms or the Community Rules, we may:</P>
      <Bullets>
        <ListItem>remove or hide your content, or change your name{photos ? ' or remove your photo' : ''}</ListItem>
        <ListItem>give you a warning</ListItem>
        <ListItem>mute your chat for a while</ListItem>
        <ListItem>pause you from public rooms and events for a while</ListItem>
        <ListItem>ban your account</ListItem>
        <ListItem>remove you from a room or end a game</ListItem>
        {LIVE.customPacks && (
          <ListItem>
            remove or change a custom pack at any time{LIVE.communityPacks ? ', hold it or take it out of Community Packs,' : ''} or stop you
            from making{LIVE.communityPacks ? ' or publishing' : ''} packs
          </ListItem>
        )}
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
      {ONLINE_SAFETY_TEXT && (
        <P>
          Section {UK_SECTION_NUMBER} sets out, kind by kind, how we deal with illegal content and content harmful to
          children, and every way to complain, including about our automated tools.
        </P>
      )}

      <H2>9. Packs, XP and Other Virtual Items</H2>
      <P>
        SpySocial has virtual items, such as packs of words and locations,
        {avatarsLive(LIVE) ? ' avatar items (hats, glasses, colours and the like, and celebrations),' : ''} XP, levels,
        prestige,
        achievements, badges{LIVE.intel ? ', Intel' : ''}{LIVE.intercepts ? ', Intercepts' : ''}
        {LIVE.ranked ? ', Ranked ratings and ranks' : ''}
        {LIVE.tournaments ? ', Tournament Tokens' : ''} and event rewards. Some are free, some you earn by playing, and some may be given to you, for
        example for playing in events.
      </P>
      <Bullets>
        <ListItem>
          Virtual items have no value in real money. You can't sell or trade them, move them to another account, or
          exchange them for money.
          {LIVE.purchases &&
            ` The one exception is Restore Purchases, which moves what you bought to the SpySocial account you're using (see ${LIVE.membershipsOnly ? 'Buying a membership' : 'Buying packs, items and membership'} below).`}
        </ListItem>
        <ListItem>You get a personal, limited right to use them in SpySocial. They aren't your property, and we may change how they work: update the words and locations in a pack, rebalance XP and levels, or retire an item.</ListItem>
        <ListItem>When someone in a room has unlocked a pack, everyone in that room can play it while they're there. We may change how this sharing works.</ListItem>
        {/* LIVE.intel: Intel (the server's "coins"), earned only. */}
        {LIVE.intel && (
          <ListItem>
            {LIVE.intercepts ? (
              <>
                Intel is an earned currency: you get it only from playing (your games, and your first game of the day
                and your daily streak, which you claim in the app) and from shredding spare copies of items. It can't be bought, and like every virtual
                item it has no cash value and can't be sold, traded or moved to another account. For now there's
                nothing to spend it on; we may add uses for it later, and the app will say what they are. Intel we add to
                your account ourselves is locked and will never be tradable. We may change how much Intel games, streaks
                and shredding give, and we may correct a balance that's wrong or was earned by cheating.
              </>
            ) : (
              <>
                Intel is earned only by playing: it can't be bought, and like every virtual item it has no cash value and
                can't be sold, traded or moved to another account. You can spend it only on the items the app offers for
                Intel. We may change how much Intel games and daily streaks give, which items it unlocks and what they cost;
                we may correct a balance that's wrong or was earned by cheating. An item you've already unlocked with Intel
                stays yours like the other items you've earned.
              </>
            )}
          </ListItem>
        )}
        {/* LIVE.intercepts: Intercepts (the server's "crates"), earned only, odds shown (see legalRelease). */}
        {LIVE.intercepts && (
          <ListItem>
            Intercepts are sealed rewards you earn only by playing, or that we give you. You get them for wins at Play
            Online tables (Game Night's included; never in a private room, or for a game that gives no Intel): every 10
            wins that count give you 5 Intercepts, 4 of a random tier and 1 of the Secret tier or better. Your first
            Play Online game of each day earns you a daily Intercept of a random tier (on top of that day's Intel),
            which you claim in the app; rewards you haven't claimed don't expire. On every 7th day in a row of your
            streak you also get an extra Intercept of the Secret tier or better, and on every 30th day in a row an extra
            Enigma Intercept, both on top of that day's Intercept. Game Night's winners get an Enigma Intercept. A code from a content creator or from us can
            also give Intercepts, once per account: each code gives what we set for it, and the app tells you what you
            got. Intercepts from a code unlock after your first Play Online game that counts. Codes tied to a purchase
            (such as merch codes) never give Intercepts. We may also give Intercepts, and memberships, as gifts, but
            never the items that come from Intercepts. Each Intercept opens into one random item. You can't buy an
            Intercept, or open one sooner or with a better chance, with money, with Intel or in any other way, and a
            membership doesn't give you more of them or better odds. Before you open one, the app shows (under Odds)
            the chance of each tier and rarity and any guarantee. These are the exact odds every opening uses, and the
            app always shows the ones in use, with the date they last changed. If you get an item you already have, you
            keep the extra copy and can shred it for Intel, at the amount the app shows, or trade up: 5 spare copies of
            one rarity give you 1 random item of the next rarity (one you don't have yet, while there is one), and 5
            spare Legendary copies give you a Unique of one of those five items, with the odds shown in the app before
            you trade. Only spare copies count (never your first copy of an item, or a Unique), and the copies you trade
            up are used up. A Unique is a copy of an item with a colour and a number that no other copy of it has (it
            can't be shredded or traded up). Like every virtual item, Intercepts and what's in them have no cash value
            and can't be sold, traded or moved to another account, unopened or opened. Before SpySocial 2.2 opens to
            everyone, Intercepts start fresh: every Intercept earned before then (for example while trying a test
            version of the app), with the copies, Uniques and trade-ups that came from them, is wiped, and every item
            that from then on comes only from Intercepts is taken back from the accounts that had it, except the Beta
            Pin and anything bought in a store, so that everyone gets these items the same way. The items a membership
            includes, and the Intel you already got, stay. We may take back Intercepts or items that were given by
            mistake or earned by cheating; an item you've opened otherwise stays yours like the other items you've
            earned.
          </ListItem>
        )}
        {/* LIVE.tournaments: Tournament Tokens, earned only. */}
        {LIVE.tournaments && (
          <ListItem>
            Tournament Tokens are earned only by playing in tournaments: they can't be bought, and like every virtual
            item they have no cash value and can't be sold, traded or moved to another account. You can spend them only
            in the Tournament Shop, whose items and prices can change each season. We may correct a balance that's
            wrong or was earned by cheating, and reset balances if we change or stop Tournament Tokens.
          </ListItem>
        )}
        {avatarsLive(LIVE) && (
          <ListItem>
            Celebrations are avatar items: short animations that everyone at the table sees at a game's big moments, such
            as a spy guessing the secret or being caught. Ink Burst and Ink Check are free; Paper Storm and Case Closed
            are earned by playing (the app shows how); Gold Storm comes with Lifetime;
            {LIVE.membershipsOnly
              ? ` the others, such as Searchlight, Most Wanted, The End, Curtain Call, Cuffed, Detective Badge, Fingerprint Match, Extra! Extra! and Evidence Board, aren't sold: they come ${LIVE.intercepts ? 'only from Intercepts (or a trade-up of spare copies)' : 'as rewards'}, and the app shows how to get each one.${LIVE.intercepts ? '' : ' Players who earned Cuffed earlier keep it.'}`
              : ' Searchlight, Most Wanted, The End, Curtain Call, Cuffed, Detective Badge, Fingerprint Match, Extra! Extra! and Evidence Board are sold one by one. Players who earned Cuffed before it went on sale keep it.'}
          </ListItem>
        )}
        <ListItem>
          If your account is deleted or banned, you lose the virtual items on it.
          {LIVE.purchases &&
            ' After a deletion, though, what you bought through the App Store or Google Play can come back on another SpySocial account with Restore Purchases.'}
        </ListItem>
      </Bullets>
      {LIVE.purchases && (
        <>
        <H3>{LIVE.membershipsOnly ? 'Buying a membership' : 'Buying packs, items and membership'}</H3>
        <Bullets>
          {LIVE.membershipsOnly ? (
            <ListItem>The only things you can buy in SpySocial are three memberships: Agent (the monthly Pack Pass), Elite (the yearly Pack Pass) and Spymaster (Lifetime). {notSold} aren't sold. Memberships are bought through the Apple App Store or Google Play and follow their terms. They handle payment, and prices are shown before you buy, including any tax where it applies.</ListItem>
          ) : (
            <ListItem>You can buy premium packs, avatar items{avatarsLive(LIVE) ? ' (celebrations included)' : ''}, and memberships: the Pack Pass (monthly or yearly) and Lifetime. Purchases are made through the Apple App Store or Google Play and follow their terms. They handle payment, and prices are shown before you buy, including any tax where it applies.</ListItem>
          )}
          <ListItem>The Pack Pass is a subscription. It renews automatically at the end of each month or year, and the store charges you within 24 hours before the new period starts, unless you cancel at least 24 hours before the current period ends. You can cancel at any time in your App Store or Google Play account settings, and you keep your benefits until the end of the period you've paid for. Deleting the app, or your SpySocial account, doesn't cancel a subscription.</ListItem>
          <ListItem>Lifetime means for as long as we offer SpySocial, not for your lifetime.</ListItem>
          {LIVE.membershipsOnly && (
            <ListItem>Any membership unlocks every pack that isn't free, new ones included, for as long as it lasts{LIVE.customPacks ? ', and lets you make custom packs (see section 6)' : ''}. The free packs stay free for everyone. Lifetime also includes the items the app says it includes, and only those. We may also give a membership as a gift; it works like a bought one for as long as we give it, and nothing is charged for it.</ListItem>
          )}
          <ListItem>A membership's benefits are described in the app when you buy it. We may change them; if a change takes away something important, we'll tell you in advance so you can cancel before your next renewal.</ListItem>
          {LIVE.membershipsOnly ? (
            <ListItem>The items a membership includes only change how your agent looks{avatarsLive(LIVE) ? ' (a celebration, how a moment of the game looks)' : ''}, never how you play or score. We may update the words and locations in a pack; if we ever have to withdraw a pack or an item a membership includes, we'll give you a comparable one where we reasonably can.</ListItem>
          ) : (
            <>
              <ListItem>A pack you buy stays yours for as long as we offer SpySocial. We may update its words and locations, and if we ever have to withdraw a pack you bought, we'll give you a comparable one where we reasonably can.</ListItem>
              <ListItem>An avatar item you buy only changes how your agent looks{avatarsLive(LIVE) ? ' (a celebration, how a moment of the game looks)' : ''}, never how you play or score. It stays yours for as long as we offer SpySocial; if we ever have to withdraw one, we'll give you a comparable one where we reasonably can. Lifetime includes only the items the app says it includes.</ListItem>
            </>
          )}
          <ListItem>Refunds are handled by Apple or Google under their policies. If a purchase is refunded, we remove what it unlocked.</ListItem>
          <ListItem>To get your purchases back on another device, or after losing or deleting an account, use Restore Purchases in the app while your device is signed in to the App Store or Google Play account you paid with. Restoring moves your purchases to the SpySocial account you're using, away from any other account they were on.</ListItem>
          <ListItem>Nothing in these Terms takes away rights you have under consumer law, for example if something you bought doesn't work as described.</ListItem>
        </Bullets>
        </>
      )}

      <H2>10. Translation and Other Services</H2>
      <H3>Translations</H3>
      <P>
        {LIVE.autoTranslation
          ? "When the app translates a message for you (when you tap Translate, or by itself when the message is in a language other than your app's, unless you turn that off in Settings)"
          : 'When you tap Translate'}
        , the message's text is sent to Microsoft Translator{LIVE.openAiTranslation ? ' or OpenAI' : ''}
        {LIVE.myMemory !== 'off' ? ", or to MyMemory if that doesn't answer" : ''}
        {LIVE.onDeviceTranslation
          ? LIVE.autoTranslation
            ? ', or translated on your device'
            : ", or translated on your device when our service can't"
          : ''}
        , and you get a machine translation.{' '}
        {LIVE.autoTranslation
          ? 'Your messages are translated for other players the same way.'
          : 'Other players can translate your messages the same way.'}{' '}
        Machine translations can be
        wrong or miss the tone, so don't rely on them for anything important; we're not responsible for them.
      </P>
      <H3>Voice input</H3>
      <P>
        If you use the microphone, Apple's or Google's speech recognition turns what you say into text under their
        terms, and may send the recording to Apple or Google to do this.
        {LIVE.browserLegal
          ? " When you play in the browser version, your browser's own speech recognition does it instead, under the terms of the browser's maker, who may receive the recording."
          : ''}{' '}
        We receive only the text.
      </P>
      {LIVE.merchShop && (
        <>
          <H3>Merch</H3>
          <P>
            SpySocial merch bought at <ShopLink /> is sold and fulfilled by Fourthwall, under Fourthwall's terms and
            returns policy.
          </P>
        </>
      )}
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
        <ListItem>
          Questions, complaints or claims about the app go to us at <SupportEmail />
          {OPERATOR.name && OPERATOR.address ? `, or by post to ${OPERATOR.name}, ${OPERATOR.address}` : ''}.
        </ListItem>
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
        You can stop using SpySocial at any time. To delete a saved account, go to Account, then Settings, then Delete Account; to
        delete a guest account, sign out of it. Our Privacy Policy explains what we keep afterwards.
      </P>
      <P>
        We may suspend or close your account, or limit what you can do, if you break these Terms or the Community
        Rules, if the law requires it, or if your account puts other players or SpySocial at risk. We may also close
        an account that hasn't been used for 12 months, after telling you in the app or by email where we can; we
        never close an account for this reason while it holds a purchase or a membership. If we close your account,
        you lose access to it and to everything on it, including virtual items, except where the law says otherwise. The parts of these Terms that by their nature should
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
      <P>
        If you believe something in SpySocial infringes your copyright, send a notice to our designated copyright
        agent, Aleksandr Gerzon, by email to <SupportEmail />, or by mail to 55 Ash Gap Road, Clifton Township, PA
        18424-7702, United States (phone (570) 445-3516; U.S. Copyright Office registration DMCA-1082037). The
        notice must include:
      </P>
      <OrderedList spacing={2} pl={4} textStyle="body">
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
        For questions, complaints or legal notices about SpySocial, email <SupportEmail />
        {OPERATOR.name && OPERATOR.address ? `, or write to ${OPERATOR.name}, ${OPERATOR.address}` : ''}. You can
        write to us in English or in any language the app offers. support@spysocial.app is also our point of contact
        for players and authorities under the EU Digital Services Act.
      </P>

      {ONLINE_SAFETY_TEXT && <UkOnlineSafety />}
    </LegalPage>
  )
}

export default Terms
