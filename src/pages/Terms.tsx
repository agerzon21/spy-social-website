import { ListItem, OrderedList, Text } from '@chakra-ui/react'
import { LegalPage } from '../components/legal/LegalPage'
import { CalloutBox } from '../components/legal/Callout'
import { B, Bullets, H2, H3, OutLink, P, PageLink } from '../components/legal/LegalText'
import { ShopLink } from '../components/legal/ShopLink'
import UkOnlineSafety, { UK_SECTION_NUMBER } from '../components/legal/UkOnlineSafety'
import {
  LEGAL_LAST_UPDATED,
  LIVE,
  LLC_SINCE,
  LLC_STORE_NOTE,
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
  const we = OPERATOR.legalName ? `${OPERATOR.legalName}, the operator of SpySocial` : 'SpySocial'
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

      {LLC_SINCE && (
        <P>
          <B>Change on {LLC_SINCE}:</B> SpySocial is now run by {OPERATOR.legalName} owned by {OPERATOR.person}, who
          ran it himself until then. He transferred SpySocial and these Terms to it (section 20 allows this). Nothing
          else in these Terms changed, and you don't need to do anything.{LLC_STORE_NOTE ? ` ${LLC_STORE_NOTE}` : ''}
        </P>
      )}

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
        {LIVE.passwordless
          ? ' (we email you a one-time code each time you sign in)'
          : LIVE.emailCodes22
            ? ' (from version 2.2, we email you a one-time code each time you sign in; older versions of the app use a password)'
            : ' and a password'}
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
          : LIVE.emailCodes22
            ? `Keep your email account${LIVE.socialSignIn ? ' (and your Apple or Google account)' : ''}, and your password if you use an older version of the app, to yourself: anyone who can read your email can sign in with the codes we send there. Never share a sign-in code; we never ask you for one. You're responsible for what happens on your account. If you think someone else has used it, secure your email account (and change your password, if you have one) and tell us.`
            : `Keep your password${LIVE.socialSignIn ? ' (and your Apple or Google account)' : ''} to yourself. You're responsible for what happens on your account. If you think someone else has used it, change your password and tell us.`}
      </P>
      {LIVE.audit1103 && (
        <P>
          If your account was taken, or you've lost its email address, write to support@spysocial.app. Once we're
          satisfied the account is yours, we can change its email address (we tell the old address, and we sign the
          account out everywhere), sign it out on every device (a sign-in from before that can keep working for up to 15 minutes, but can't trade or use the Black Market; Black Market offers and listings placed before that wait and don't fill until, from a new sign-in, they're put back on the market or cancelled, or a listing's price is changed), and pause its trading for up to 30 days. A pause closes them instead. We can't do
          this for a guest account, which has no email address and can't sign back in.
        </P>
      )}
      <H3>Rules for accounts</H3>
      <Bullets>
        <ListItem>Your account is for you alone. Don't share, sell or give it to anyone, and don't use someone else's.</ListItem>
        <ListItem>Give true information, including your birth year. A birth year can't be changed in the app. If you entered one that made you under 18 and you're an adult, email us: we change it only with proof of age.</ListItem>
        <ListItem>Your display name and username must follow the Community Rules. We may change or remove a name that doesn't.{LIVE.usernameLimit ? ` You can change your username once every 30 days${LIVE.audit1103 ? " (a new account's first changes don't count)" : ''}; a username you stop using stays reserved for 14 days.` : ''}</ListItem>
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
        {LIVE.socialFeatures &&
          " Playing in a party doesn't change these rules: telling anyone at your table your role, the location or the word outside the game is cheating. We may pause a party, ban a player from parties, and take back anything won in those games."}
      </P>
      {/* LIVE.socialFeatures: Social Phase 1 for everyone (legalRelease). */}
      {LIVE.socialFeatures && (
        <>
          <H3>Friends, follows and parties</H3>
          <Bullets>
            <ListItem>
              Friends are two-way: both of you agree. You can add a friend in person with your Friend Code, from a
              private game you just played together, and, between adults who allow it, from a public table or by
              username. Some of these ways depend on age, and players under 18 have more private settings, as our
              Privacy Policy explains. You can remove or block a friend at any time; they aren't told.
            </ListItem>
            <ListItem>
              Adults can have a public profile that other players can open and follow. You can make yours private at
              any time in Privacy &amp; Friends. Players under 18 have no public profile and can't be followed.
            </ListItem>
            <ListItem>
              A party is a leader and friends who play together, up to 21 people in all. It takes a membership to start a
              party; if the leader leaves, the lead goes to someone in it with a membership first, or else to whoever has been in
              it longest. A player who is banned or paused from public rooms leaves the party.
              {/* LIVE.partyLeaderLapse: server party_leader_lapse_1111 (owner 2026-11-11). */}
              {LIVE.partyLeaderLapse
                ? " If the leader's membership ends, the party closes for everyone and the lead isn't passed on; a game the party is playing goes on to its end, and after it each player searches on their own."
                : ''} A party plays together at Play Online tables and game nights, where it takes at most half
              of a table (2 at a table of 4, 4 at a table of 8, 6 at a Game Night table of 12) and is marked for everyone there. Party mates searching on their own count too: never more than half a table between them. Any party can start
              a private room together, and a party too big for a table plays there. A private room plays the host's
              packs, as it always does. A members-only search needs every member of the party to be a member.
            </ListItem>
            <ListItem>
              Party chat follows the same rules as all chat in SpySocial (see section 7), and you can report any
              message in it.
            </ListItem>
            <ListItem>
              Invites, requests and notifications have limits, and we may change the limits on friends, follows and
              parties, or pause any of these features.
            </ListItem>
            <ListItem>
              On iPhone{LIVE.membershipWords1105 ? ' and iPad' : ''}, friends, follows and parties aren't available to players under 18 until a version of the app
              that asks a parent's consent through Apple is out.
            </ListItem>
          </Bullets>
        </>
      )}

      <H2>5. Public Rooms and Events</H2>
      <P>
        {LIVE.onePool
          ? "Public rooms are Play Online's tables and the events we schedule; players can't create public rooms. They're open to players you don't know."
          : "Public rooms are open to players you don't know."}{' '}
        Anyone who meets the requirements can play in them: a saved account with a confirmed email address
        {LIVE.socialSignIn ? ' (or Apple or Google sign-in)' : ''}, being 13 or older, and agreeing to the Community Rules.
        {LIVE.coverage1110 &&
          " Play Online may also ask you to pass a game's practice game first (a grade of C or better), unless you've already finished a few Play Online games of that game; private rooms and Game Night's Play Now don't ask."}
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
          away when the game starts, or leave a game that has started, you may get a short break from Play Online (Game
          Night's tables included){LIVE.onePool ? '' : ' and from other public rooms'}, never from private rooms or the
          events we host in a room of their own. For the first four, within any 24 hours: a warning with no break the
          first time, then 5, 15 and 30 minutes. For leaving a game that has started, within any 24 hours: 5, 15 and
          then 60 minutes.
        </P>
      )}
      <P>
        Events are public games we schedule for a set time, with settings and packs we choose. We may change, move
        or cancel an event, limit how many players can join it, and decide who hosts it.
        {/* LIVE.gameNightRules: the rules page says it's part of these Terms. */}
        {LIVE.gameNightRules && (
          <>
            {' '}Game Night, which we host on the nights we announce in the app, is played at Play Online tables; its titles and how to get them are set
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
          ' When you send a custom pack to Community Packs, you also give us a non-exclusive, worldwide, perpetual, royalty-free license to host, show, translate and use that pack in SpySocial: to review it (before approving it, our team may hide a mild swear in it, take out an entry or change its theme, and the app tells you what we changed) and, once we approve it, show it to every player with your username as its creator (or as Anonymous, while you\'ve chosen that), list it in search and in collections, show its ratings and how many players added it, let any player add it to their packs, rate it, play it and copy it into a draft of their own to make their own version, and keep it in Community Packs while it\'s anonymous and after you delete your account. You still own the pack.'}
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
        {LIVE.communityPacks ? ', and report a Community Pack from its page' : ''}
        {LIVE.socialFeatures ? '. You can also report a friend request, a profile, an invite or a whole party (Report Party covers every member of it)' : ''}.
        A person reads every report, and our Community Rules say how soon. The player you report isn't told who
        reported them. To check a report, we look at what's attached to it and at the records we keep, as our
        Privacy Policy describes.
      </P>
      <H3>Automated tools</H3>
      <P>
        We also use automated tools to keep SpySocial safe: a word filter that can block certain words in names,
        usernames, room codes{LIVE.customPacks ? ', chat messages, typed questions and answers, and custom packs' : ', chat messages and typed questions and answers'}, and limits
        on how often some actions can be repeated. Names and usernames are also refused if they're blank or unreadable, hold a
        link or a phone number, or look like our staff or an Agent colour.
        {LIVE.safetyAnswers1106 &&
          " The filter also refuses links, contact details and other personal details (a home address, asking or saying where someone lives, a school or a real name) at Play Online tables and game nights, and in any room or party with a player under 18 or one who hasn't told us their age. Other automated checks can flag a message for a person to read, such as possible grooming language or sexual talk near a younger player, and these may include OpenAI's models reading what adults write beside a player under 18. A flag doesn't block or change a message, or penalize anyone by itself."}
        {photosSeen &&
          ' We may also use an automated service to check profile photos and remove ones that may break the rules.'}
        {LIVE.customPacks &&
          ` Another automated check reads the name, description and entries of every custom pack before it's created from your draft (and again when it's updated${LIVE.communityPacks ? ' or sent to Community Packs' : ''}); a pack it finds breaks these Terms or the Community Rules isn't created (or, after an update, is paused), so it can't be played${LIVE.communityPacks ? ' or published' : ''}.`}
        {drawings ? (
          <>
            {' '}An automated check also looks at Spy Sketch drawing turns in public rooms (
            {LIVE.onePool ? 'Play Online tables and events' : 'including Play Online tables and events'}), and at
            drawings people report. A turn can go unchecked if the check can't run at that moment, and the check can
            miss things, so reports still matter: a person reads every report.
            {drawingCheckTestersOnly(LIVE) &&
              ' For now, while we test it, it does this only in games where every player is one of our testers (players trying a test version of the app).'}{' '}
            In a public room, when it finds that a turn
            breaks the Community Rules, it takes that turn off the drawing and gives the player a strike: a warning
            first, then 3, 7 and 30 days without public rooms and events, and at the fifth strike within 90 days no
            public rooms or events for good. In any room, a flagrant drawing it finds (a hate symbol, including a swastika,
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
        limited, why, and until when, with a reference such as {'S\u2011207'}.
        {LIVE.accountNotices
          ? " If we ban an account that has an email address, we also send all of that to that address, with how to appeal unless the decision is final; a banned account can't sign in, so the app can show the notice after you enter a code we send there."
          : ''}{' '}
        Don't create a new account to get around a
        penalty; we may ban that account too.
      </P>
      {LIVE.volunteerModerators && (
        <>
          <H3>Community moderators</H3>
          <P>
            Some of these decisions may be made by community moderators: trusted adult players who volunteer to help
            us, have agreed in writing to keep what they see confidential, and act under our supervision. A community
            moderator may act on reports and on what they see in Play Online rooms: warn a player, mute their chat,
            pause them from public rooms and events for up to 7 days, or remove them from a Play Online table.
            {LIVE.moderatorRoomActions
              ? ' With our permission, a moderator may also remove a reported message, watch a Game Night table and help at it, end a Game Night game or the night itself (each with a written reason), and approve or reject Community Packs waiting for review.'
              : ''}{' '}They can
            propose a ban, but only SpySocial can ban an account, permanently or otherwise. We record every action a
            moderator takes and why, we can undo any of them, and you can appeal them like any other decision (see
            Appeals below). Anything involving a child's safety, self-harm or threats{LIVE.safetyAnswers1106 ? ', and any report of personal information shared by or with a player under 18,' : ''} is handled by SpySocial only
            {LIVE.modCoverHold
              ? ": if we haven't opened a report about a child's safety (grooming, or sexual content with a player under 18 involved) or self-harm within 15 minutes, a community moderator may pause the reported player from public rooms and mute their chat for 24 hours (never on a self-harm report), remove them from the room or party, or hide their messages until we do, and we review each of these steps. Only SpySocial decides the report."
              : '.'}
          </P>
        </>
      )}
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
          {/* LIVE.trading: trading between friends (Nov 1, 2026). */}
          {LIVE.trading && LIVE.blackMarket
            ? "Virtual items and Intel have no value in real money. You can trade some items with your friends inside SpySocial, and Intel between adults, as Trades below describes, and adults can buy and sell tradable items for Intel on the Black Market, as Black Market below describes. You can't sell or buy them for money, move them to another account in any other way, or exchange them for money."
            : LIVE.trading
            ? "Virtual items and Intel have no value in real money. You can trade some items with your friends inside SpySocial, and Intel between adults, as Trades below describes. You can't sell or buy them, move them to another account in any other way, or exchange them for money."
            : "Virtual items have no value in real money. You can't sell or trade them, move them to another account, or exchange them for money."}
          {LIVE.purchases &&
            ` The one exception is Restore Purchases, which moves what you bought to the SpySocial account you're using (see ${LIVE.membershipsOnly ? 'Buying a membership' : 'Buying packs, items and membership'} below).`}
        </ListItem>
        {/* LIVE.rmtGambling: no real-money trading, no gambling (Oct 31, 2026). */}
        {LIVE.rmtGambling && (
          <ListItem>
            No real-money trading: you may not buy, sell or offer Intel, items or accounts for real money or anything outside
            SpySocial, or use other sites to do so. We may remove what was traded this way and suspend every account involved.
          </ListItem>
        )}
        {LIVE.rmtGambling && <ListItem>No gambling: you may not use SpySocial items or Intel to gamble, on SpySocial or anywhere else.</ListItem>}
        <ListItem>You get a personal, limited right to use them in SpySocial. They aren't your property, and we may change how they work: update the words and locations in a pack, rebalance XP and levels, or retire an item.</ListItem>
        <ListItem>In a private room, the host's packs decide: everyone there can play the packs the host has unlocked (another player's membership or packs don't add any). At Play Online tables and game nights, when someone at the table has unlocked a pack, everyone there can play it while they're there. We may change how this sharing works.</ListItem>
        {/* LIVE.intel: Intel (the server's "coins"), earned only. */}
        {LIVE.intel && (
          <ListItem>
            {LIVE.intercepts ? (
              <>
                Intel is an earned currency: you get it only from playing (your games, and your first game of the day
                and your daily streak, which you claim in the app) and from shredding spare copies of items. It can't be bought, and like every virtual
                item it has no cash value and can't be sold for money{LIVE.trading ? ` or moved to another account except in a trade between adults (see Trades below)${LIVE.blackMarket ? ' or on the Black Market' : ''}` : ', traded or moved to another account'}.{' '}
                {LIVE.blackMarket
                  ? 'Adults can spend it on the Black Market (see below); we may add other uses for it later, and the app will say what they are.'
                  : "For now there's nothing to spend it on; we may add uses for it later, and the app will say what they are."}
                {LIVE.coverage1110 &&
                  (LIVE.launchSite
                    ? ' While SpySocial was being tested, we also gave test Intel to testers and to our own accounts (incident I-2 on our transparency page); all of it was taken back on December 7, 2026.'
                    : " While SpySocial is being tested, we also give test Intel: 50,000 once to each tester who signs in to a test version before November 13, 2026, and what we choose to our own accounts (incident I-2 on our transparency page). It can be spent and traded like earned Intel, and all of it is taken back on December 7, 2026, never below 0; nothing it paid for stays.")}
                {LIVE.intelLedger ? (
                  <>
                    {' '}We may change how much Intel games, streaks and shredding give; a change counts from then on,
                    never for Intel you already got. Every change to your Intel is a line in your Intel ledger with its
                    reason: we never add or take Intel by hand, and we never change or delete a line.
                    {LIVE.intelCorrections
                      ? ' We correct Intel only in the ways described below.'
                      : " If a balance is wrong or was earned by cheating, we correct it with a new line that says why."}
                  </>
                ) : (
                  <>
                    {' '}Intel we add to your account ourselves is locked and will never be tradable. We may change how
                    much Intel games, streaks and shredding give, and we may correct a balance that's wrong or was earned
                    by cheating.
                  </>
                )}
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
        {/* Integrity (live 2026-10-31, 20261031060528): quiet holds act from Dec 8, 2026 (shadow until then). */}
        {LIVE.intel && LIVE.intercepts && (
          <ListItem>
            To keep rewards fair, our checks look for farming, bots and scripted play, games thrown on purpose and
            several accounts run by one person. From December 8, 2026, while one of our team checks a strong sign of
            this, we may hold an account's new rewards for up to 72 hours (an Intercept being held shows "Verifying" and
            can't be opened yet), and longer only while a case about it is open; you can ask for a review in the app.
            If a reward's odds or an item's count ever look broken, we may pause that reward for everyone until we've
            checked it.
          </ListItem>
        )}
        {/* LIVE.intelCorrections: Economy Integrity E1, the three corrections (see legalRelease). */}
        {LIVE.intel && LIVE.intelCorrections && (
          <ListItem>
            We correct Intel in only {LIVE.accountNotices ? 'four' : 'three'} ways, each a new line in your Intel ledger with its reason. We reverse one
            line, by exactly its amount: for example Intel paid twice for one game, a game we void, or a wrong price (if
            you bought an item by mistake, the item goes back with the Intel). We refund a bug: we first publish what
            happened, and the rule that works out each player's amount, as an incident on our{' '}
            <PageLink to="/transparency">transparency page</PageLink>, then pay what the rule works out for you.
            {LIVE.accountNotices
              ? LIVE.giftsTradable
                ? " If a bug cost only you Intel and there's no line to reverse, we may give it back to you alone, with one line that says it was a bug refund and no public incident; that Intel is locked and will never be tradable."
                : " If a bug cost only you Intel and there's no line to reverse, we may give it back to you alone, with one line that says it was a bug refund and no public incident. That Intel is ordinary Intel, like the Intel you earn."
              : ''}{' '}
            Or we
            take back the Intel that a closed fair-play case shows was earned by breaking our rules (for example farmed
            games), and only the lines the case covers. When an outage we've announced affects players, we may also give
            everyone it lists the same amount of Intel{LIVE.giftsTradable ? ', which is locked and will never be tradable' : ': ordinary Intel, like the Intel you earn'}. A correction of more
            than 500 Intel, or one that affects more than 5 players, waits 24 hours before it takes effect ({LIVE.accountNotices ? 'a bug refund under a published incident' : 'a bug refund'}{' '}
            or an outage's Intel doesn't wait: the published incident is the notice). If you've already spent Intel we
            take back, your balance can go below 0: the Intel you earn next pays it back, and you can't spend Intel
            until it's above 0 again. You can appeal a reversal or a fair-play take-back within 30 days by writing to{' '}
            <SupportEmail />; if we uphold your appeal, we give back what it took. You can ask us there for the record of
            any correction to your account. Each month we publish how much Intel was made, spent and corrected, counting
            every correction without naming anyone.
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
            never the items that come from Intercepts. Each Intercept opens into one random item.{' '}
            {LIVE.interceptsMarket
              ? `You can't buy an Intercept with money, and we never sell Intercepts. Adults can buy an unopened Intercept from another adult, or sell one, for Intel on the Black Market (see Black Market below)${LIVE.interceptsInTrades ? ', and trade one with a friend (see Trades below)' : ''}; players under 18 can't. Intel can't be bought, so no Intercept is ever paid for with money. You can't open an Intercept sooner or with a better chance in any way, and a membership doesn't give you more of them or better odds.`
              : "You can't buy an Intercept, or open one sooner or with a better chance, with money, with Intel or in any other way, and a membership doesn't give you more of them or better odds."}{' '}
            {/* The offer sheet's odds (Nov 10 store build, store-compliance-1103) are out by the launch: LIVE.launchSite. */}
            {LIVE.launchSite && LIVE.interceptsMarket ? 'Before you open or buy one' : 'Before you open one'}, the app shows (under Odds)
            the chance of each tier and rarity and any guarantee. These are the exact odds every opening uses, and the
            app always shows the ones in use, with the date they last changed. If you get an item you already have, you
            keep the extra copy and can shred it for Intel, at the amount the app shows, or trade up: 5 spare copies of
            one rarity give you 1 random item of the next rarity (one you don't have yet, while there is one), and{' '}
            {LIVE.uniquesRarer ? '10' : '5'} spare Legendary copies give you a Unique of one of those{' '}
            {LIVE.uniquesRarer ? 'ten' : 'five'} items, with the odds shown in the app before you trade. Only spare copies count (never your first copy of an item, your only copy of it, or a Unique; a copy you bought or got in a trade is a spare when you hold another copy of that item), and the copies you trade
            up are used up. A Unique is a copy of an item with a colour and a number that no other copy of it has (it
            can't be shredded or traded up). Like every virtual item, Intercepts and what's in them have no cash value
            and can't be sold for money{LIVE.trading ? (LIVE.interceptsMarket ? (LIVE.interceptsInTrades ? '; an Intercept, unopened, and an item from an opened one can be traded or sold for Intel only as Trades and Black Market below describe' : '; an unopened Intercept can be sold for Intel only on the Black Market, and an item from an opened one can be traded or sold only as Trades and Black Market below describe') : `, or traded or moved to another account unopened; an item from an opened Intercept can be traded only as Trades below describes${LIVE.blackMarket ? ', and sold for Intel only on the Black Market' : ''}`) : ', traded or moved to another account, unopened or opened'}.
            {/* LIVE.launchSite: 2.2 is out, so the reset before it is told in the past (site-launch-walk). */}
            {LIVE.launchSite ? (
              <>
                {' '}Before SpySocial 2.2 opened to everyone, Intercepts started fresh: every Intercept earned before then
                (for example while trying a test version of the app), with the copies, Uniques and trade-ups that came from
                them{LIVE.trading ? ' (including copies received in trades)' : ''}, was wiped, and every item that from then on
                comes only from Intercepts was taken back from the accounts that had it, except the Beta Pin and anything
                bought in a store, so that everyone gets these items the same way.
              </>
            ) : (
              <>
                {' '}Before SpySocial 2.2 opens to
            everyone, Intercepts start fresh: every Intercept earned before then (for example while trying a test
            version of the app), with the copies, Uniques and trade-ups that came from them{LIVE.trading ? ' (copies you got in a trade included)' : ''}, is wiped, and every item
            that from then on comes only from Intercepts is taken back from the accounts that had it, except the Beta
            Pin and anything bought in a store, so that everyone gets these items the same way.
              </>
            )}
            {LIVE.intelLedger
              ? LIVE.launchSite
                ? " The items a membership includes stayed, and so did the Intel players got from games, daily claims and streaks. The Intel got by shredding copies from before then was taken back (never below 0), and the items bought with Intel before then were taken back, with the Intel spent on them refunded; we published this as incident I-1 on our transparency page."
                : " The items a membership includes stay, and so does the Intel you got from games, daily claims and streaks. The Intel you got by shredding copies from before then is taken back (never below 0), and the items you bought with Intel before then are taken back with the Intel you spent on them refunded; we publish this as incident I-1 on our transparency page."
              : ' The items a membership includes, and the Intel you already got, stay.'}
            {LIVE.intelCorrections
              ? " We may take back unopened Intercepts given by mistake. We take back an item you've opened only when an incident we've published shows it was given in error, or a closed fair-play case shows it came from cheating; for a Unique this waits 24 hours, its number stays used and is never given to anyone else, and you can appeal within 30 days (an upheld appeal gives you back the same Unique). While a fair-play case is open, we may freeze a copy: it stays yours but can't be shredded or traded up. We never take an item from you to give it to someone else. Otherwise an item you've opened stays yours like the other items you've earned."
              : " We may take back Intercepts or items that were given by mistake or earned by cheating; an item you've opened otherwise stays yours like the other items you've earned."}
          </ListItem>
        )}
        {/* LIVE.mintedCollectibles: minted collectibles and the public ledger (legalRelease). */}
        {LIVE.mintedCollectibles && (
          <ListItem>
            Game Night titles, the Beta Pin, the Field Tester title and every item that comes from an Intercept are
            minted collectibles. Each copy has its own number and a record of how it was earned (for example the
            Game Night and the game, or the Intercept or trade-up it came from), and a copy can be made only by its
            stated rule, inside its window. Once a collectible's window closes, no more copies of it are ever made,
            by anyone, us included. Every copy, and what happens to it later (a shred, a trade-up, a correction), is
            written to a public ledger at <PageLink to="/ledger">spysocial.app/ledger</PageLink>, which shows each
            holder only as a code that is different on every copy, never by name. Each day's fingerprint of the
            ledger is published where we can't change it (a public GitHub repository and the Internet Archive), so
            anyone can check that no copy was added, changed or removed afterwards. Like every virtual item,
            collectibles have no cash value, and they aren't NFTs, tokens or cryptocurrency. We take back a copy only if it was earned by cheating, issued by
            mistake, or taken back as a moderation action; the ledger then shows that it was taken back and why
            (never who held it), and if we restore it after an appeal it comes back with the same number.
            A trade or a Black Market sale shows on the ledger only as the copy moving from one holder code to
            another.
            {/* LIVE.launchSite: the beta test chain and Beta 2's market undo are over (site-launch-walk). */}
            {LIVE.launchSite ? (
              <>
                {' '}Before the launch the ledger was a beta test chain: its copies, numbers, trades and fingerprints were
                for testing and were wiped, and the real ledger started again from its first entry. Black Market sales
                made while SpySocial was being tested were undone before the launch: buyers got back the Intel they paid,
                and sellers gave back what they received.
              </>
            ) : (
              <>
                {' '}Until the launch the ledger is a beta test chain: its copies, numbers, trades and fingerprints
            are for testing and are wiped before the launch, when the real ledger starts again from its first entry.
            {/* Beta 2's open market (owner `open`, Nov 3; app repo nov03/beta2-market-open.md): Nov 3 through accountNotices. */}
            {' '}Black Market sales made while SpySocial is being tested are undone before the launch (Beta 2's on November 16, 2026): buyers get back
            the Intel they paid, and sellers give back what they received.
              </>
            )}
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
      {/* LIVE.trading: trading between friends (Nov 1, 2026; app_config.trading 'on'). */}
      {LIVE.trading && (
        <>
          <H3>Trades</H3>
          <Bullets>
            <ListItem>
              {LIVE.tradeGatesNov2
                ? "Trades are between friends, inside the app, and carry no message. You can trade with a friend as soon as you're friends, once your account is at least 7 days old, its email is confirmed and you've played 3 counted games (finished games that count toward your stats, with at least 2 other saved accounts on other phones, and that our fair-play checks don't flag). Each side can offer up to 10 items and, between adults, up to 1,000,000 Intel, and both sides confirm what they'll get before the trade happens." +
                  (LIVE.helpTruth1105
                    ? " What you offer in an open trade is held for it: it can't go into another trade or onto the Black Market at the same time. If Intel you offered is spent before the trade happens, the trade can't go through until the amount is lowered, and nothing moves."
                    : '') +
                  (LIVE.interceptsInTrades
                    ? " Adults can also offer unopened Intercepts, per tier, each counting as one item; one you receive stays sealed, and can't be traded or listed, until its protection ends."
                    : '')
                : "Trades are between friends, inside the app, and carry no message. You can trade once you and your friend have been friends for 3 days, your account is at least 14 days old, its email is confirmed and you've reached level 20. Each side can offer up to 10 items, and both sides confirm what they'll get before the trade happens."}
            </ListItem>
            <ListItem>
              Players 13–17 can trade items for items only (no gifts), only with friends they added in person with a
              Friend Code{LIVE.tradeNoLimits ? '' : ', and at most 3 trades a day (adults, 5)'}{LIVE.interceptsMarket && LIVE.interceptsInTrades ? ', and never unopened Intercepts' : ''}. Intel can be traded only between two adults. On iPhone{LIVE.membershipWords1105 ? ' and iPad' : ''}, players under 18 can't trade until a version of the
              app that asks a parent's consent through Apple is out.
            </ListItem>
            {/* The test phase (app server trade_test_phase, trade_intel_test_phase, Window W's WT and WQ): ends by itself on December 7, 2026. */}
            <ListItem>
              {LIVE.launchSite
                ? "While SpySocial was being tested, until December 7, 2026, the rules on account age, counted games, a new device and a change of sign-in were off for trades and the Black Market, and adults could trade Intel. On that day every amount of Intel traded went back: whoever gave it got it back, and everyone kept only the Intel they earned, never below 0. We published this as an incident on our transparency page."
                : "While SpySocial is being tested, until December 7, 2026, the rules on account age, counted games, a new device and a change of sign-in are off for trades and the Black Market, and adults can trade Intel. A confirmed email, trading only with friends, the 7-day protection and every rule for players under 18 still apply. On December 7 every amount of Intel traded goes back: whoever gave it gets it back, and everyone keeps only the Intel they earned, never below 0, even if it was already spent. We publish this as an incident on our transparency page."}
            </ListItem>
            <ListItem>
              Not every item can be traded; the app marks the ones that can.{' '}
              {LIVE.coverage1110
                ? `Memberships, what a membership includes, level and achievement rewards (the Arcade's secret titles and controllers among them)${LIVE.giftsTradable ? ' and Intel we add ourselves' : ''} are never tradable${LIVE.launchSite || !LIVE.giftsTradable ? '' : ' (except the test Intel in Intel above, until December 7, 2026)'}: they stay with your account.`
                : `Memberships, what a membership includes, level rewards, items from the arcade games${LIVE.giftsTradable ? ' and Intel we add ourselves' : ''} are never tradable.`}{' '}
              {/* LIVE.giftsTradable: gifted and code copies tradable at once (app_config.economy.gift_copies_tradable, Nov 1, 2026). Off in U0
                  (WG, Dec 7): the owner's rules of Nov 6 and Nov 8 (gift-rules-1108): codes and anything we or staff give, a Developer's
                  Pick included, stay with the account; Intel is never bound; the Beta set trades like anything earned. */}
              {LIVE.giftsTradable
                ? "While SpySocial is being tested, until December 7, 2026, items we give you as a gift, items from a code and the Beta set can be traded at once. From that day, Intercepts from a code or a gift, opened or not, and anything you make in a trade-up with one of them among its inputs, stay with your account: you can use them, but you can't trade them, sell them or give them to anyone. The app marks which items can be traded."
                : "Items from a code or a gift stay with your account. That means anything you redeem with a code, anything we or our staff give you (an Intercept, opened or not, an item, a title, or the developer's bonus title at a game night, such as a Developer's Pick), and anything you make in a trade-up with one of them among its inputs, even if the other inputs were earned. You can open them, wear them, trade them up and shred spares, but you can't trade them, sell them or give them to anyone, however many games you play. Intel is never tied to your account: Intel you get by shredding a spare, and Intel we give you, is ordinary Intel, like the Intel you earn. The Beta set (the Beta Pin and the Field Tester title) can be traded like anything you earn."}{' '}
              {/* LIVE.testerIntercepts: the 2.2 testers' thank-you (owner Nov 11; server app_config tester_gift.intercepts_tradable). */}
              {LIVE.launchSite
                ? 'Our thank-you to the testers of version 2.2, given at its launch: every account on our tester list got the Beta Pin and the Beta Tester title, and an account that finished at least one counted game (a game played to the end, in any room, that shows in its Stats) before December 7, 2026 also got the Field Tester title, 10 Intercepts of each tier and 1 month of membership.'
                : 'Our thank-you to the testers of version 2.2, given at its launch: every account on our tester list gets the Beta Pin and the Beta Tester title, and an account that finishes at least one counted game (a game played to the end, in any room, that shows in its Stats) before December 7, 2026 also gets the Field Tester title, 10 Intercepts of each tier and 1 month of membership.'}{' '}
              {LIVE.testerIntercepts === 'tradable'
                ? 'Unlike Intercepts from a gift, those Intercepts trade like anything you earn, opened or not.'
                : "Like Intercepts from a gift, those Intercepts, opened or not, stay with your account: you can use them, but you can't trade them, sell them or give them to anyone."}
            </ListItem>
            <ListItem>
              What you get in a trade is protected for 7 days: you can wear an item at once, but you can't trade it,
              {LIVE.audit1103 ? ' sell it on the Black Market,' : ''} shred it or trade it up until then, and Intel you get can't be used until then. In that time you can
              reverse your trades (once every 90 days): this reverses all of your protected trades and pauses your
              trading for 30 days. We can also reverse a protected trade for account theft or fraud{LIVE.audit1103 ? ', under a case we open about it' : ''}. After 7 days a trade is
              final, except for items removed for cheating. If you delete your account within those 7 days, what you
              got goes back to the player who gave it. If the other player deletes their account within those 7 days,
              the trade is undone: you get back what you gave, and what you received from them is removed.
            </ListItem>
            <ListItem>
              Big trades ask for a code we email you. Trading pauses for a while after your email or sign-in method
              changes, after a sign-in on a new device, or when you lock it yourself (for up to a year).
              {LIVE.audit1103 ? ' We can also pause it, for up to 30 days, on an account that may have been taken, or on an account, alone or in a group, that we\'re looking into for fraud or farming.' : ''}
              {LIVE.tradeNoLimits
                ? " There's no daily or weekly limit on how many trades anyone makes or on the items and Intel they receive."
                : ' There are also weekly limits on the items and Intel you can receive, which the app shows.'}
            </ListItem>
            <ListItem>
              We check trades for signs of real-money trading, account theft and unfair trades with players under 18;
              a person reviews what the checks flag. We may change trade limits (how many trades, how much Intel,
              which items) with notice in the app, and pause trading. Trades that break these Terms (for example
              real-money trades) may be reversed, and the accounts involved suspended.
            </ListItem>
          </Bullets>
        </>
      )}
      {/* LIVE.blackMarket: the Black Market, Intel only (Nov 1, 2026; app_config.market 'on'). */}
      {LIVE.trading && LIVE.blackMarket && (
        <>
          <H3>Black Market</H3>
          <Bullets>
            <ListItem>
              The Black Market, in the app's Vault, is where adults buy and sell tradable items for Intel, never for
              money. On Items you place offers to buy or sell an item at a price you choose; an offer matches the best
              price on the other side, and the price of the offer that was waiting is the price paid. On Rare Finds you
              list a Unique at a price, and can let other players make lower offers. Other players never see who is
              buying or selling.
              {LIVE.interceptsMarket &&
                " Unopened Intercepts can be bought and sold there too, by tier, for Intel only. What's inside one is random and is decided only when it's opened, by the odds the app shows for its tier."}
            </ListItem>
            <ListItem>
              The same rules as Trades decide who can use it (an adult,{' '}
              {LIVE.tradeGatesNov2 ? 'an account at least 7 days old that has played 3 counted games' : 'level 20, an account at least 14 days old'}, a
              confirmed email, no trading pause)
              {/* LIVE.launchSite: Intel moves on it from the launch, so the condition goes (site-launch-walk). LIVE.testerMarket: Beta 2's open market from Nov 9 (server opened it Nov 9, 12:23 UTC) (its sales undone before the launch, Collectibles bullet above). */}
              {LIVE.launchSite
                ? '.'
                : ", and Intel moves on it only once SpySocial 2.2 opens to everyone, except in Beta 2's test from November 9 to 16, 2026 (its sales are undone on November 16, as described above)."}{' '}
              Players under 18 can look but can't buy, sell or make offers. No emailed code is needed on the Black Market;
              instead no offer can be priced below an item's minimum price, what one copy of it shreds for{LIVE.interceptsMarket ? " (for an unopened Intercept, what the items its tier gives shred for on average, by its odds)" : ''}.
            </ListItem>
            <ListItem>
              While an offer or listing is open, what it offers is held for it: the Intel of a buy offer, or the items of
              a sell offer (you can still wear them). Each item sold costs a fee of 2% of its price (at least 1 Intel, at most 5,000
              Intel), which is removed from the game. Members can have 8 offers open at once, others 4. You can stop an
              offer or listing at any time and collect what's left.
            </ListItem>
            {LIVE.audit1103 && (
              <ListItem>
                If your account is locked, whatever the reason, your open offers and listings, and your offers on Rare Finds,
                close at once, as if you'd stopped them: a trading pause we set (because your account may have been taken, or
                while we look into fraud or farming), your own lock, the pause after a reversal, a new device or a change of
                sign-in, a ban, a suspension, or a fair-play hold. So does a change of your email address that we make at your
                request. What they hold comes back to you (Intel from a buy offer waits for you to collect it, and you can
                collect it while locked), and other players' offers on your listing go back to them. Nothing reopens when the
                lock ends; you place them again. Sales already made stay as they are.
                {LIVE.launchSite ? '' : " While SpySocial is being tested, a new device or a change of sign-in doesn't pause trading, so neither closes anything until December 7, 2026."}{' '}
                If we correct your birth year and you're under 18, your offers and listings close, and what they hold or earned
                comes back to you at once.
              </ListItem>
            )}
            <ListItem>
              A sale on Items is final at once. A Unique bought on Rare Finds is protected for 3 days: it can't be traded,
              listed, shredded or traded up, and the seller's Intel waits until then; in that time the sale can be
              reversed as Trades above describes, or by us for account theft or fraud. If the buyer or the seller
              deletes their account in those 3 days, the sale is undone for the other one: a buyer gets back the Intel
              paid and the Unique is removed; a seller gets the Unique back instead of its price. We check the market for
              manipulation (for example sales between your own accounts or prices set to move Intel between players), may
              pause it, and may reverse sales and suspend the accounts involved when they break these Terms. We may change
              the fee, the limits and which items can be listed, with notice in the app.
            </ListItem>
          </Bullets>
        </>
      )}
      {/* LIVE.membershipTerms: the memberships section before LIVE.purchases (PRESUBMIT-AUDIT B4, 2026-11-02), so App
          Review's "Terms of Use" link shows the subscription terms. */}
      {(LIVE.purchases || (LIVE.membershipTerms && LIVE.membershipsOnly)) && (
        <>
        <H3>{LIVE.membershipsOnly ? 'Buying a membership' : 'Buying packs, items and membership'}</H3>
        {LIVE.membershipsOnly ? (
        <Bullets>
          {!LIVE.purchases && (
            <ListItem>
              Memberships go on sale with version 2.2 of the app; until then, nothing in SpySocial can be bought. Before
              2.2 is released, Apple's and Google's app reviewers and our testers may take a membership with a test
              purchase, which charges no money. We take test memberships back once the review or test is over.
            </ListItem>
          )}
          <ListItem>
            The only things you can buy in SpySocial are three memberships: Agent (the monthly Pack Pass), Elite (the
            yearly Pack Pass) and Spymaster (Lifetime). {notSold} aren't sold. Memberships are bought through the Apple
            App Store or Google Play and follow their terms. They handle payment: the price, and how long the membership
            lasts, are shown in the app and on the store's payment sheet before you buy, including any tax where it
            applies, and the payment is charged to your Apple Account or Google Play account when you confirm.
          </ListItem>
          <ListItem>
            Any membership unlocks every pack that isn't free, new ones included, for as long as it lasts
            {LIVE.customPacks ? ', and lets you make custom packs (see section 6)' : ''}. The free packs stay free for
            everyone. Lifetime also includes the items the app says it includes, and only those. We may also give a
            membership as a gift{LIVE.membershipCodes ? ', for example with a code' : ''}; it works like a bought one for
            as long as we give it, and nothing is charged for it.
            {LIVE.membershipCodes
              ? ' A month or a year given this way adds to the membership time you already have and never renews; once you have Lifetime, such a gift adds no more time.'
              : ''}
          </ListItem>
          <ListItem>
            <B>Automatic renewal.</B> The monthly and yearly Pack Pass are subscriptions that renew automatically. At
            the end of each month or year, the store charges your account the price for the next period (within the 24
            hours before the current period ends) unless you cancel first: on the App Store, at least 24 hours before
            the current period ends; on Google Play, before the renewal date. When you cancel, the pass doesn't renew,
            and you keep its benefits until the end of the period you've already paid for. If a renewal payment fails, your
            membership keeps working during any grace period the store gives, then stops until the payment is fixed or the store ends the pass.
          </ListItem>
          <ListItem>
            <B>How to cancel.</B> On an iPhone or iPad: open Settings, tap your name, then Subscriptions, and choose
            SpySocial. On Android: open the Google Play Store app, tap your profile picture, then Payments &amp;
            subscriptions, then Subscriptions, and choose SpySocial. Manage Subscription in the app opens the same page.
            You can switch between the monthly and yearly pass there too. Deleting the app, or your SpySocial account,
            doesn't cancel a subscription, and neither does buying Lifetime: cancel the pass in the store so it isn't
            charged again.
            {LIVE.memberLoyalty
              ? " In the Vault, Cancel Membership (under Manage Subscription) first shows one screen with the facts: if your membership ends, your member time and stamps reset and start again from zero, and the price you keep while you stay ends. Its one button, Continue to Cancel, goes straight on to the store's page. Manage Subscription itself still opens the store's page directly. Nothing changes before the end of the period you've paid for."
              : ''}
          </ListItem>
          <ListItem>
            <B>Free trials.</B> We don't offer free trials or introductory prices today. If we ever do, the app and the
            store will show before you buy how long the offer lasts and what you'll pay after it; the subscription then
            renews at the full price when the offer ends unless you cancel (on the App Store, at least 24 hours before it
            ends).
          </ListItem>
          <ListItem>
            <B>Lifetime</B> is a one-time purchase: you pay once and it never renews. It lasts for as long as we offer
            SpySocial, not for your lifetime.
          </ListItem>
          {LIVE.memberLoyalty && (
            <ListItem>
              <B>Member time.</B> While you're a member, the app shows when your membership started ("Member since") and
              how long you've been a member, with a stamp at 1, 3 and 6 months, then 1, 2 and 3 years, then every year.
              It counts the time your membership has been active without a break, however it came: a monthly or yearly
              pass, Lifetime, a gift from us or a code. Refunded time and test purchases don't count. Member time is
              earned by staying: on the first day your membership isn't active any more (after any grace period the
              store gives for a failed payment), your member time and stamps are gone, and if you become a member again,
              "Member since" and your time start again from zero. A gap of less than a day while a renewal goes through
              isn't a break. <B>Lifetime</B> is the exception: a Lifetime member's time counts from their first day as a
              member, months on a pass before Lifetime included, and keeps growing for as long as we offer SpySocial,
              with every stamp we add later. Member time and stamps only change how your profile looks: they give no XP
              or better odds, can't be traded or sold, have no value in real money and aren't collectibles.
            </ListItem>
          )}
          {LIVE.memberLoyalty ? (
            <ListItem>
              <B>Your price while you stay.</B> We may change membership prices for new members. When we raise the price
              of a pass, we ask Apple and Google to keep existing members on the price they pay, so your pass keeps
              renewing at the price you pay now for as long as it renews without a break. The store may still adjust
              it for local taxes or currency, and tells you before it does; you can cancel before an adjusted price
              applies. If you switch to the other pass, you pay that plan's current price. If your membership ends and
              you come back later, you may pay the price at that time. A price change never affects a Lifetime you've
              already bought.
            </ListItem>
          ) : (
            <ListItem>
              <B>Price changes.</B> We may change membership prices. A new price applies to a pass only from a renewal
              after Apple or Google has told you about it, with the notice they require, and where the store or the law
              needs your agreement to a higher price, the pass doesn't renew at it without your agreement. You can cancel
              before a new price applies. A price change never affects a Lifetime you've already bought.
            </ListItem>
          )}
          <ListItem>
            A membership's benefits are described in the app when you buy it. We may change them; if a change takes away
            something important, we'll tell you in advance so you can cancel before your next renewal.
          </ListItem>
          <ListItem>
            The items a membership includes only change how your agent looks
            {avatarsLive(LIVE) ? ' (a celebration, how a moment of the game looks)' : ''}, never how you play or score. We
            may update the words and locations in a pack; if we ever have to withdraw a pack or an item a membership
            includes, we'll give you a comparable one where we reasonably can.
          </ListItem>
          <ListItem>
            <B>Family Sharing.</B> Memberships aren't shared through Apple's Family Sharing or Google Play's family
            library. A membership belongs to the SpySocial account it's on.
          </ListItem>
          <ListItem>
            <B>No cash value.</B> A membership has no value in real money. You can't sell, trade or give it to someone
            else, move it to another account (except with Restore Purchases, below), or exchange it for money.
          </ListItem>
          <ListItem>
            <B>Refunds</B> are handled by Apple or Google under their policies, not by us: ask Apple at{' '}
            <OutLink href="https://reportaproblem.apple.com">reportaproblem.apple.com</OutLink>, or Google through your
            Google Play order history. If a purchase is refunded, we remove what it unlocked.
          </ListItem>
          <ListItem>
            <B>If you delete your account</B>, the membership on it stops with the account, but a pass keeps renewing
            (and being charged) until you cancel it in the store. What you bought can come back on another SpySocial
            account with Restore Purchases. If we ban an account for breaking these Terms, its membership stops working
            in SpySocial, but a pass keeps renewing (and being charged) until you cancel it in the store; refunds are
            still up to Apple or Google.
          </ListItem>
          <ListItem>
            To get your membership back on another device, or after losing or deleting an account, use Restore Purchases
            in the app while your device is signed in to the App Store or Google Play account you paid with. Restoring
            moves your membership to the SpySocial account you're using, away from any other account it was on.
          </ListItem>
          <ListItem>
            Nothing in these Terms takes away rights you have under consumer law, for example if something you bought
            doesn't work as described.
          </ListItem>
        </Bullets>
        ) : (
        <Bullets>
          {LIVE.membershipsOnly ? (
            <ListItem>The only things you can buy in SpySocial are three memberships: Agent (the monthly Pack Pass), Elite (the yearly Pack Pass) and Spymaster (Lifetime). {notSold} aren't sold. Memberships are bought through the Apple App Store or Google Play and follow their terms. They handle payment, and prices are shown before you buy, including any tax where it applies.</ListItem>
          ) : (
            <ListItem>You can buy premium packs, avatar items{avatarsLive(LIVE) ? ' (celebrations included)' : ''}, and memberships: the Pack Pass (monthly or yearly) and Lifetime. Purchases are made through the Apple App Store or Google Play and follow their terms. They handle payment, and prices are shown before you buy, including any tax where it applies.</ListItem>
          )}
          <ListItem>The Pack Pass is a subscription. It renews automatically at the end of each month or year, and the store charges you within 24 hours before the new period starts, unless you cancel at least 24 hours before the current period ends. You can cancel at any time in your App Store or Google Play account settings, and you keep your benefits until the end of the period you've paid for. Deleting the app, or your SpySocial account, doesn't cancel a subscription.</ListItem>
          <ListItem>Lifetime means for as long as we offer SpySocial, not for your lifetime.</ListItem>
          {LIVE.membershipsOnly && (
            <ListItem>Any membership unlocks every pack that isn't free, new ones included, for as long as it lasts{LIVE.customPacks ? ', and lets you make custom packs (see section 6)' : ''}. The free packs stay free for everyone. Lifetime also includes the items the app says it includes, and only those. We may also give a membership as a gift{LIVE.membershipCodes ? ', for example with a code' : ''}; it works like a bought one for as long as we give it, and nothing is charged for it.{LIVE.membershipCodes ? " A month or a year given this way adds to the membership time you already have and never renews; once you have Lifetime, such a gift adds no more time." : ''}</ListItem>
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
        )}
        </>
      )}

      <H2>10. Translation and Other Services</H2>
      <H3>Translations</H3>
      <P>
        {LIVE.autoTranslation
          ? "When the app translates a message for you (when you tap Translate, or by itself when the message is in a language other than your app's, unless you turn that off in Settings)"
          : 'When you tap Translate'}
        {/* Translation v3's bridge drop (legalRelease microsoftOff with messagesOnDeviceOnly): Microsoft translates
            nothing; what OpenAI may not take is translated only on the readers' devices (the app's phone backup). */}
        {LIVE.openAiTranslation && LIVE.messagesOnDeviceOnly && LIVE.microsoftOff ? (
          ", the message's text is sent to OpenAI, or translated on your device"
        ) : (
          <>
            , the message's text is sent to Microsoft Translator{LIVE.openAiTranslation ? ' or OpenAI' : ''}
            {LIVE.myMemory !== 'off' ? ", or to MyMemory if that doesn't answer" : ''}
            {LIVE.onDeviceTranslation
              ? LIVE.autoTranslation
                ? ', or translated on your device'
                : ", or translated on your device when our service can't"
              : ''}
          </>
        )}
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
        for services or websites we don't run, including ones linked from SpySocial
        {LIVE.homeDiscord ? " (such as our Discord server, which runs under Discord's own terms and minimum age)" : ''}.
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
      {LIVE.reputation && (
        <P>
          Every account has a reputation (Excellent, Good, Poor, At Risk or Banned), shown in Settings and worked out from
          its record (see our Privacy Policy). If your reputation is Banned, you can still sign in and keep your items,
          Intel and membership, but you can't play at Play Online tables, public rooms or game nights, trade, send gifts or use the
          Black Market, and private rooms are closed too unless the app tells you they stay open for you, until it
          recovers or we lift it. A reputation recovers on its own as older notes fade, and nothing older than 90 days
          counts. We may also set a reputation by hand, for example after a case; you can ask us to review it at
          support@spysocial.app. As with a ban, a pass keeps renewing (and being charged) until you cancel it in the store.
        </P>
      )}

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
        agent{LLC_SINCE ? ` for ${OPERATOR.name}` : ''}, {OPERATOR.person}, by email to <SupportEmail />, or by mail to{' '}
        {LLC_SINCE ? `${OPERATOR.name}, ` : ''}{OPERATOR.address} (phone {OPERATOR.phone}; U.S. Copyright Office
        registration DMCA-1082037). The
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
        {OPERATOR.name && OPERATOR.address ? `, or write to ${OPERATOR.name}, ${OPERATOR.address}` : ''}
        {LLC_SINCE ? ` (phone ${OPERATOR.phone})` : ''}. You can
        write to us in English or in any language the app offers. support@spysocial.app is also our point of contact
        for players and authorities under the EU Digital Services Act.
      </P>

      {ONLINE_SAFETY_TEXT && <UkOnlineSafety />}
    </LegalPage>
  )
}

export default Terms
