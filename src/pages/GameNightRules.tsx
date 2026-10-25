import { ListItem } from '@chakra-ui/react'
import { LegalPage } from '../components/legal/LegalPage'
import { B, Bullets, H2, P, PageLink, SupportEmail } from '../components/legal/LegalText'
import { LIVE } from '../lib/legalRelease'

// The Game Night rules (www.spysocial.app/game-night-rules): the weekly Game Night's official rules, in English
// like the other legal pages. The route, the footer's link and the sitemap entry exist only while
// LIVE.gameNightRules is on (src/lib/legalRelease.ts). It says only what the server does (app repo
// feat/gamenight-v2, server files 20261106100000-150000): up to four titles a night (the night's, the Local winner's,
// the Spy winner's, the developer's bonus), each once per account per night. Change it first if any of that changes.

/**
 * The day this page's text was last changed: set it to the day the switch goes on, if later. LIVE.intercepts adds the
 * Intercepts paragraph and LIVE.membershipsOnly changes the no-purchase line: set their dates to the deploy day.
 */
const UPDATED = LIVE.intercepts
  ? 'November 2, 2026' // the Intercepts paragraph: set to the day the site goes up with it on
  : LIVE.membershipsOnly
    ? 'November 2, 2026' // the no-purchase line names memberships only: set to the day the site goes up with it on
    : 'October 24, 2026'

const GameNightRules: React.FC = () => (
  <LegalPage english title="Game Night Rules" updated={<>Last Updated: {UPDATED}</>}>
    <H2>What Game Night is</H2>
    <P>
      Game Night is SpySocial's weekly online event: every Friday from 8 to 10 PM Eastern Time (unless we announce a
      different day or time in the app). While it runs, the Home screen shows a Game Night banner. Tap it to be
      seated with other Game Night players. Tables start by themselves as players arrive: bigger tables first, and
      smaller ones if not enough players are waiting. Each night has its own game and its own titles, shown on the
      banner; a themed night (a holiday night, for example) may have themed titles.
    </P>

    <H2>Who can take part</H2>
    <P>
      Anyone who can play Play Online can take part: a SpySocial account with a confirmed email address or Apple or
      Google sign-in, aged 13 or older, who has accepted our <PageLink to="/terms">Terms of Service</PageLink>. Game
      Night tables are Play Online tables: the <PageLink to="/rules">Community Rules</PageLink> and every safety tool
      apply as at any other table (Report, Block, the vote to remove a player, the chat filters).
    </P>

    <H2>No purchase necessary</H2>
    <P>
      Taking part is free. Nothing you buy in SpySocial
      {LIVE.membershipsOnly ? ' (a membership: the Pack Pass or Lifetime)' : ' (a pack, a Pack Pass, a membership)'} gives
      you a better chance of getting a title{LIVE.intercepts ? ' or an Intercept' : ''}, and you never need to buy
      anything to take part or to get one.
    </P>

    <H2>The night's titles</H2>
    <P>Each Game Night has up to four cosmetic titles:</P>
    <Bullets>
      <ListItem>
        <B>The night's title</B>, for everyone who plays a full game at a Game Night table that <B>starts</B> during
        the night's hours. A game that starts before the end and finishes after it still counts.
      </ListItem>
      <ListItem>
        <B>The Local winner's title</B>, for a player who also wins such a game as a Local.
      </ListItem>
      <ListItem>
        <B>The Spy winner's title</B>, for a player who also wins such a game as a spy.
      </ListItem>
      <ListItem>
        <B>The developer's bonus title</B> (for example, "Developer's Pick"): see below.
      </ListItem>
    </Bullets>
    <P>For every title:</P>
    <Bullets>
      <ListItem>
        Playing means taking part: asking, answering, drawing or voting when the game gives you the chance. Chatting
        alone doesn't count.
      </ListItem>
      <ListItem>
        These don't count: leaving a game before it ends, staying away from the game (not taking your turns), being
        removed from the table, a game cancelled before its end, a game our fair-play checks flag, and accounts
        that are banned.
      </ListItem>
      <ListItem>
        If another player leaves early and the game ends without a result, everyone who stayed still gets the
        night's title.
      </ListItem>
      <ListItem>
        <B>Each title once per account per night.</B> You can keep playing after you've got one, but winning more
        games doesn't give it twice.
      </ListItem>
    </Bullets>

    <H2>The developer's bonus title</H2>
    <P>
      SpySocial's developer sometimes visits Game Night tables as a visible watcher (the table is told when he
      joins). He may give the night's bonus title to one or two players at a table he visits, chosen by him, and the
      table's chat says who got it. It doesn't depend on winning the game, and it's never a payment or a reward for
      buying anything.
    </P>

    {/* LIVE.intercepts: Game Night wins count toward Intercepts; a night may give Intercepts too (legalRelease). */}
    {LIVE.intercepts && (
      <>
        <H2>Intercepts</H2>
        <P>
          Game Night tables are Play Online tables, so a win there counts toward your Intercepts like any Play Online
          win. A night may also give Intercepts as a reward; when it does, the Game Night banner says so. Intercepts
          work as our <PageLink to="/terms">Terms of Service</PageLink> (section 9) describe: earned only, never sold,
          with the odds shown in the app before you open one.
        </P>
      </>
    )}

    <H2>About the titles</H2>
    <P>
      Game Night titles are cosmetic and added to your account. They have <B>no cash value</B>, can't be exchanged
      for money or anything else, and can't be transferred to another account or sold. If a title is given by
      mistake or won against these rules, we may take it back. You'll find your titles in the Locker.
    </P>

    <H2>Changes</H2>
    <P>
      We may change, move or cancel a Game Night, or change its titles, at any time; the app always shows the
      current night and its titles. If anything goes wrong during a night (for example, a server problem), we decide fairly what
      counts. These rules are part of our <PageLink to="/terms">Terms of Service</PageLink>.
    </P>

    <H2>Who runs Game Night</H2>
    <P>
      Game Night is run by SpySocial alone. <B>Apple and Google are not sponsors</B> and are not involved in any way.
    </P>

    <H2>Questions</H2>
    <P>
      Email <SupportEmail subject="Game Night" /> with any question about Game Night or a title.
    </P>
  </LegalPage>
)

export default GameNightRules
