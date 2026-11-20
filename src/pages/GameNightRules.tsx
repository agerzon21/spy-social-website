import { LegalPage } from '../components/legal/LegalPage'
import { B, Bullets, H2, P, PageLink, SupportEmail } from '../components/legal/LegalText'
import { GN_REWARDS_RULES_DAY, LIVE } from '../lib/legalRelease'

// The Game Night rules (www.spysocial.app/game-night-rules): the Game Night's official rules, in English
// like the other legal pages. The route, the footer's link and the sitemap entry exist only while
// LIVE.gameNightRules is on (src/lib/legalRelease.ts). It says only what the server does (app repo
// feat/gamenight-v2, server files 20261106100000-150000): up to four titles a night (the night's, the Local winner's,
// the Spy winner's, the developer's bonus), each once per account per night. Change it first if any of that changes.
// LIVE.gnRewardsRules (howto-truth-1117; app server row 83, 20261231999848_gamenight_rewards_1117, spec
// gamenight-rewards-1116/FINAL-SPEC.md) swaps the titles' sections for the rewards that replace them: Game Night Intel,
// the four ★ counter titles and the Game Night Intercepts; no developer's bonus title, no winner's Enigma.

/**
 * The day this page's text was last changed: set it to the day the switch goes on, if later. LIVE.intercepts adds the
 * Intercepts paragraph and LIVE.membershipsOnly changes the no-purchase line: set their dates to the deploy day.
 * October 30, 2026: the no-purchase line names memberships only (LIVE.membershipsOnly on); joining is PLAY NOW on Home's Game Night card (titles under its trophy button); nights are the ones
 * we announce, usually 8-10 PM ET, not every Friday.
 * October 25, 2026: the tables' safety tools corrected (Play Online tables have no vote to remove a player; the
 * developer's actions).
 */
const UPDATED = LIVE.gnRewardsRules ? GN_REWARDS_RULES_DAY : LIVE.giftsTradable ? 'November 7, 2026' : 'December 7, 2026' // December 7 (U0, giftsTradable off): the developer's bonus title is a gift that stays with its account (gift-rules-1108); before it, titles trade and sell as Terms 9 says, Intercepts earned or given (site-full-1106); before it, November 5, 2026: the card's titles button is PRIZES (was "the trophy button"; gamenight-fixes-1105); "online play SpySocial hosts", not "online event" (help-truth-4: Game Night, never event); before it, November 2, 2026: the night's packs and settings (Community Packs in the picker, the (i) sheet; 20261207850000 live) and volunteer moderators at Game Night tables; before it, October 30, 2026: the no-purchase line (memberships only, LIVE.membershipsOnly), joining (PLAY NOW on Home's Game Night card, titles under its trophy button) and the schedule (the nights we announce)

const GameNightRules: React.FC = () => (
  <LegalPage english title="Game Night Rules" updated={<>Last Updated: {UPDATED}</>}>
    <H2>What Game Night is</H2>
    <P>
      Game Night is online play SpySocial hosts on the nights we announce in the app (usually from 8 to 10 PM
      Eastern Time). While it runs, the Home screen shows a Game Night card. Press <B>PLAY NOW</B> on the card to be
      seated with other Game Night players. Tables start by themselves as players arrive: bigger tables first, and
      smaller ones if not enough players are waiting.{' '}
      {LIVE.gnRewardsRules
        ? <>Each night has its own game. <B>PRIZES</B> on the card shows what you can earn there: Game Night Intel, the ★ titles and the Game Night Intercepts it buys.</>
        : <>Each night has its own game and its own titles: <B>PRIZES</B> on the card shows them. A themed night (a holiday night, for example) may have themed titles.</>}
    </P>

    <H2>Who can take part</H2>
    <P>
      Anyone who can play Play Online can take part: a SpySocial account with a confirmed email address or Apple or
      Google sign-in, aged 13 or older, who has accepted our <PageLink to="/terms">Terms of Service</PageLink>. Game
      Night tables are Play Online tables: the <PageLink to="/rules">Community Rules</PageLink> and every safety tool
      apply as at any other Play Online table (Report, Block, Leave and the chat filters). Like every Play Online table,
      they have no votes to remove a player or to end a game; a person reads every report, and SpySocial's developer,
      when he watches a table, can mute, remove or ban a player, or end the game, for safety or a broken rule.
      {LIVE.moderatorRoomActions &&
        ' With our permission, a volunteer moderator may also watch a Game Night table and help at it, and end a game or the night itself, each with a written reason.'}
    </P>

    <H2>The night's packs and settings</H2>
    <P>
      We choose each Game Night's packs, from our own packs and from Community Packs our team has already reviewed
      and approved, and the settings its tables play with, which can differ from a standard Play Online table (for
      example how voting works). The (i) next to the night on Home and on its card shows the packs and every setting
      that differs. Everyone at a Game Night table plays the night's packs, whatever packs they have unlocked, and the
      night's settings are the same for every table of the same size.
    </P>

    <H2>No purchase necessary</H2>
    <P>
      Taking part is free. Nothing you buy in SpySocial
      {LIVE.membershipsOnly ? ' (a membership: Agent, Elite or Spymaster)' : ' (a pack or a membership)'}
      {LIVE.gnRewardsRules
        ? ' gives you more Game Night Intel, a ★ title or a better chance in a Game Night Intercept, and you never need to buy anything to take part or to earn them.'
        : <> gives you a better chance of getting a title{LIVE.intercepts ? ' or an Intercept' : ''}, and you never need to buy anything to take part or to get one.</>}
    </P>

    {LIVE.gnRewardsRules ? (
      <>
        <H2>Game Night Intel</H2>
        <P>
          For each game you finish at a Game Night table that <B>starts</B> during the night's hours, you get Game Night
          Intel: <B>500</B> for a win (the Locals win and you're a Local, or the spies win and you're a spy) and{' '}
          <B>200</B> for a finished loss. A game with no winner gives <B>0</B>. A game that starts before the end and
          finishes after it still counts. Game Over shows what you got.
        </P>
        <P>For Game Night Intel and the ★ titles:</P>
        <Bullets>
          <li>
            Playing means taking part: asking, answering, drawing or voting when the game gives you the chance. Chatting
            alone doesn't count.
          </li>
          <li>
            These get nothing: leaving a game before it ends, staying away from the game (not taking your turns), being
            removed from the table, a game that starts after the night's hours, a game that ends without a result because
            a player walked out, a game our fair-play checks flag, a table with a spybot, and accounts that are banned.
          </li>
        </Bullets>
        <P>
          Game Night Intel is earned only by playing at Game Night. It can't be bought, traded, sold or given to anyone,
          a membership adds nothing to it, and it has <B>no cash value</B>. It's spent only on Game Night Intercepts.
          {LIVE.launchSite
            ? ''
            : ' Before SpySocial 2.2 opens to everyone on December 8, 2026, Game Night Intercepts and their items are reset with everything else, and each account gets back all the Game Night Intel it earned before the reset, even Intel it spent.'}
        </P>

        <H2>The ★ titles</H2>
        <P>
          Four cosmetic titles count what you do at Game Night: <B>★ Operative</B> for each Game Night game you finish,{' '}
          <B>★ Local Hero</B> for each win as a Local, <B>★ Master Spy</B> for each win as a spy, and{' '}
          <B>★ Double Agent</B> for each night you win at least once on each side. You wear one with its count, like
          ★ Operative ×12. They stay with the account that earned them: they can't be traded, sold or given to anyone.
          Titles from the beta's Game Nights became counts on these titles.{LIVE.launchSite ? '' : ' The ★ titles stay through the reset before launch.'}
        </P>

        <H2>Game Night Intercepts</H2>
        <P>
          In the <B>Vault</B>, Game Night Intel buys Game Night Intercepts: <B>Tier 1</B> for 400, <B>Tier 2</B> for 800
          and <B>Tier 3</B> for 10,000. Each one opens into one item of Game Night's own set, After Hours: Tier 1 any
          rarity, Tier 2 Uncommon or better, Tier 3 Epic or better with a chance of a Unique. The app shows the exact
          odds before you buy or open one. Once bought, a Game Night Intercept and the item it opens into work like any
          Intercept you earn, as our <PageLink to="/terms">Terms of Service</PageLink> (section 9) describe. Game Night
          tables are Play Online tables, so a win there also counts toward your Intercepts like any Play Online win, and
          your first game of the day there gives your daily Intercept.
        </P>
      </>
    ) : (
      <>
    <H2>The night's titles</H2>
    <P>Each Game Night has up to four cosmetic titles:</P>
    <Bullets>
      <li>
        <B>The night's title</B>, for everyone who plays a full game at a Game Night table that <B>starts</B> during
        the night's hours. A game that starts before the end and finishes after it still counts.
      </li>
      <li>
        <B>The Local winner's title</B>, for a player who also wins such a game as a Local.
      </li>
      <li>
        <B>The Spy winner's title</B>, for a player who also wins such a game as a spy.
      </li>
      <li>
        <B>The developer's bonus title</B> (for example, "Developer's Pick"): see below.
      </li>
    </Bullets>
    <P>For every title:</P>
    <Bullets>
      <li>
        Playing means taking part: asking, answering, drawing or voting when the game gives you the chance. Chatting
        alone doesn't count.
      </li>
      <li>
        These don't count: leaving a game before it ends, staying away from the game (not taking your turns), being
        removed from the table, a game cancelled before its end, a game our fair-play checks flag, and accounts
        that are banned.
      </li>
      <li>
        If another player leaves early and the game ends without a result, everyone who stayed still gets the
        night's title.
      </li>
      <li>
        <B>Each title once per account per night.</B> You can keep playing after you've got one, but winning more
        games doesn't give it twice.
      </li>
    </Bullets>

    <H2>The developer's bonus title</H2>
    <P>
      SpySocial's developer sometimes visits Game Night tables as a visible watcher (the table is told when he
      joins). He may give the night's bonus title to one or two players at a table he visits, chosen by him, and the
      table's chat says who got it. It doesn't depend on winning the game, and it's never a payment or a reward for
      buying anything.
      {/* LIVE.giftsTradable off (U0, December 7, 2026; owner 2026-11-08, gift-rules-1108): his pick is a gift, like a code's reward. */}
      {LIVE.giftsTradable ? '' : " It's a gift from us: it stays with the account it was given to, and it can't be traded, sold or given to anyone."}
    </P>

    {/* LIVE.intercepts: Game Night wins count toward Intercepts; the night's winners get an Enigma Intercept (crates seed, earn.game_night). */}
    {LIVE.intercepts && (
      <>
        <H2>Intercepts</H2>
        <P>
          Game Night tables are Play Online tables, so a win there counts toward your Intercepts like any Play Online
          win, and your first game of the day there gives your daily Intercept. Every player who gets the Local winner's
          or the Spy winner's title also gets one Enigma Intercept, the highest tier (one a night, even with both
          titles). Intercepts
          work as our <PageLink to="/terms">Terms of Service</PageLink> (section 9) describe: earned or given by us, never sold for money,
          with the odds shown in the app before you open one.
        </P>
      </>
    )}

    <H2>About the titles</H2>
    <P>
      Game Night titles are cosmetic and added to your account. They have <B>no cash value</B> and can't be exchanged
      for money. They can move to another account only in a trade with a friend or a sale for Intel on the Black Market, as
      our <PageLink to="/terms">Terms of Service</PageLink> (section 9) describe. If a title is given by
      mistake or won against these rules, we may take it back. You'll find your titles in the Locker.
    </P>
      </>
    )}

    <H2>Changes</H2>
    <P>
      {LIVE.gnRewardsRules
        ? "We may change, move or cancel a Game Night, or change what it pays, at any time; the app always shows the current night and what it pays. If a reward is given by mistake or earned against these rules, we may take it back."
        : 'We may change, move or cancel a Game Night, or change its titles, at any time; the app always shows the current night and its titles.'} If anything goes wrong during a night (for example, a server problem), we decide fairly what
      counts. These rules are part of our <PageLink to="/terms">Terms of Service</PageLink>.
    </P>

    <H2>Who runs Game Night</H2>
    <P>
      Game Night is run by SpySocial alone. <B>Apple and Google are not sponsors</B> and are not involved in any way.
    </P>

    <H2>Questions</H2>
    <P>
      Email <SupportEmail subject="Game Night" /> with any question about Game Night or {LIVE.gnRewardsRules ? 'its rewards' : 'a title'}.
    </P>
  </LegalPage>
)

export default GameNightRules
