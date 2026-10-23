import { ListItem } from '@chakra-ui/react'
import { LegalPage } from '../components/legal/LegalPage'
import { B, Bullets, H2, P, PageLink, SupportEmail } from '../components/legal/LegalText'

// The Game Night rules (www.spysocial.app/game-night-rules): the weekly Game Night's official rules, in English
// like the other legal pages. The route, the footer's link and the sitemap entry exist only while
// LIVE.gameNightRules is on (src/lib/legalRelease.ts). It says only what the server does (app repo
// feat/gamenight-v2, server files 20261106100000-150000): change it first if the night's day, hours or prize rules
// change.

/** The day this page's text was last changed: set it to the day the switch goes on, if later. */
const UPDATED = 'November 3, 2026'

const GameNightRules: React.FC = () => (
  <LegalPage english title="Game Night Rules" updated={<>Last Updated: {UPDATED}</>}>
    <H2>What Game Night is</H2>
    <P>
      Game Night is SpySocial's weekly online event: every Friday from 8 to 10 PM Eastern Time (unless we announce a
      different day or time in the app). While it runs, the Home screen shows a Game Night banner. Tap it to be
      seated with other Game Night players. Tables start by themselves as players arrive: bigger tables first, and
      smaller ones if not enough players are waiting. Each week has its own game and its own prize, shown on the
      banner.
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
      Taking part is free. Nothing you buy in SpySocial (a pack, a Pack Pass, a membership) gives you a better
      chance of winning a prize, and you never need to buy anything to take part or to win.
    </P>

    <H2>The weekly prize</H2>
    <Bullets>
      <ListItem>
        You get the week's prize when you play a full game at a Game Night table and that game <B>starts</B> during
        the night's hours. A game that starts before the end and finishes after it still counts.
      </ListItem>
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
        If another player leaves early and the game ends without a result, everyone who stayed still gets the prize.
      </ListItem>
      <ListItem>
        <B>One prize per account per week.</B> You can keep playing after you've won it, but you won't get it twice.
      </ListItem>
    </Bullets>

    <H2>The developer's bonus prize</H2>
    <P>
      SpySocial's developer sometimes visits Game Night tables as a visible watcher (the table is told when he
      joins). He may give a bonus prize to one or two players at a table he visits, chosen by him, and the table's
      chat says who got it. A bonus prize doesn't depend on winning the game, and it's never a payment or a reward
      for buying anything.
    </P>

    <H2>About the prizes</H2>
    <P>
      Prizes are cosmetic in-game items (such as a title, a border, an avatar item or a celebration) added to your
      account. They have <B>no cash value</B>, can't be exchanged for money or anything else, and can't be transferred
      to another account or sold. If a prize is given by mistake or won against these rules, we may take it back.
      You'll find your prizes in the Locker.
    </P>

    <H2>Changes</H2>
    <P>
      We may change, move or cancel a Game Night, or change its prize, at any time; the app always shows the current
      night and prize. If anything goes wrong during a night (for example, a server problem), we decide fairly what
      counts. These rules are part of our <PageLink to="/terms">Terms of Service</PageLink>.
    </P>

    <H2>Questions</H2>
    <P>
      Email <SupportEmail subject="Game Night" /> with any question about Game Night or a prize.
    </P>
  </LegalPage>
)

export default GameNightRules
