import type { HelpText } from '../types'

/**
 * English: the source (../types.ts). help-np-1120 (2026-11-20, owner-approved Nov 19 changes, against app review/np-combined-1119 + feat/home-compete-1119): guests do the tutorials and private rooms (#guest-or-saved), Game Night needs a saved account, from o.launch (Dec 8) #game-night / #game-night-weekly say Compete > Game Night tab, new #compete (Ranked and Tournaments: Soon, no date), #change-name (setup = @username + one colour, display name made from it; Settings: name, username once per 30 days, 2nd/3rd colours), #earn-intercepts' Welcome Intercept stays with the account. stale-help-1118 (2026-11-18): behind LIVE.gnRewardsRules (row 83, Fri Nov 20) #who-can-trade's
 * launch line loses the Developer's Pick, and until gnRewards #game-night's line drops the night's titles and #earn-intercepts the
 * winner's Enigma (the other languages: the same words cut from their own lines). help-new-1117 (2026-11-17, against app int/u62-15-prep 05c21a1e3 and NEXT-BATCH rows 70 / 83 / 85 / 95,
 * gamenight-rewards-1116/FINAL-SPEC.md, signup v42): #question-rounds (glossary setting.question_rounds), #game-night-weekly (owner Nov 17:
 * one night a week, Friday and again Saturday), #game-night-rewards + #game-night-intercepts (Game Night Intel 500 / 200, 0 for a leave, idle,
 * late, a spybot table or a voided walk-out; the four ★ counters; tiers 400 / 800 / 10,000; After Hours), #practice-members (5 a day, UTC; the AI
 * line 16+, Settings' Rate My Practice Lines with AI), #membership-switch + #two-memberships (membershipSwitch.ts), #sign-up-email (emailCode.ts;
 * the weak-password line signup v42 answers older apps with), each behind its switch (types.ts). help-u6214-1117 (2026-11-17, against int/u62-14 0c526325f): #voting / #winning's Vote Results
 * head (lib/voteHead 'tape': FINAL VOTE + online.vote_head.*, moments.voting.hud.called_by), #wax-seal's Info entries (seal-info-1116) and
 * the Practice Game's seal (practice-seal-info-1116, practice.end_seal), #role-reveal's in-game card (ingame-role-card-1116, online look
 * only) and every live place's picture (places-181-1116). help-audit-1116 b (2026-11-16, coordinator Q6): new #special-rules (Votes per Game, Paper Trail;
 * server roomVotes / spy_rules) and #pack-creator (20261128000000 custom packs), #winning's Informant conditions (2+ spies, 6+
 * players; vote or last wrong guess, not a missed One Shot or a leave: _informant_*), #earn-intercepts' 7th-day streak and the
 * Game Night win, #report-block's three places, #voice-chat's game and lobby chats, #poker-face's vote hold.
 * help-audit-1116 (2026-11-16, against int-u62 36af0bbcc): #wax-seal's seal is at the top left
 * with Leave and Info, Chat and Notes on their own buttons, a number on Chat (localization/translations/headerSealLeft1110);
 * #new-page's new room starts on 2 pages (lib/balance RECOMMENDED_SKETCH_PAGES, hooks/useNewRoomDefaults). help-beta3-1116 (2026-11-16, against the app's u62.13 line, int-u62 f5a242511): #talk-out-loud
 * (glossary setting.talk_out_loud, lib/lobbySettings), #drawings-checked (drawing_check_note; links Privacy #drawing-checks: never that id here, the ScrollManager would find this page's first), #voice-chat (no voice
 * chat; the mic is speech to text; a call of your own), and #role-reveal / #poker-face rewritten for the Spotlight reveal, the lineup,
 * SPY CHANNEL and "Where Are You Playing?" (still behind LIVE.helpRoleReveal). help-live-fix-1116 (2026-11-16, against int-u62 36af0bbcc; app u61 has the same header): #wax-seal's
 * seal is at the top left with Leave and Info, Chat and Notes on their own buttons, a number on Chat
 * (localization/translations/headerSealLeft1110); #new-page's new room starts on 2 pages (lib/balance RECOMMENDED_SKETCH_PAGES,
 * hooks/useNewRoomDefaults). help-u61-1113 (2026-11-13, against u61.1 0516de145 and int/rr-u62): How to Play's Step 1 Tutorial and Step 2
 * Practice Games (the Play Online gate is off on the server, so nothing says it's required), Reputation in Settings, the beta-reset note, Rare
 * Finds' lowest offer reaching the price, the Archive's holder line, the @username made from the typed name; #role-reveal and #poker-face wait
 * for LIVE.helpRoleReveal (Beta 3). The game's rules (voting, winning, the spy's guess, leaving, a game that doesn't count) checked on 2026-11-06 (site-rules-1106) against the server and the game-logic audit. Facts checked on 2026-11-05 (help-truth-4: guests asked to save for Friends, Trades and the Black Market; Couldn't Open
 * Your Account; You Were Signed Out on This Device; a dead invite before the birth year; names in the app's language; chat resent after a drop;
 * Android's Friends, Party & Trades category and the minors' night hold for pack answers; what's in an open trade is held), 2026-11-04 (help-truth-3: parties, Waiting and Put Back, the Intel tile, the translator offer, no-answer lines, Teaming) and 2026-11-03 (nov03/legal-audit-1103b.md) against the Terms (sections 4, 5, 8, 9), the Privacy
 * Policy's Your Rights, the Game Night rules and the app (integrate/2.2: the How to Play glossary, the Members page,
 * trading, the Black Market and Intercepts strings). When a rule changes there, change it here in all ten languages.
 */
const en: HelpText = {
  title: 'Help & FAQ',
  lede: 'Quick answers about playing SpySocial, your account, rewards and memberships.',
  search: 'Search help',
  searchHint: 'Try “vote” or “trade”',
  clear: 'Clear',
  results: (n) => (n === 1 ? '1 answer' : `${n} answers`),
  noResults: (q) => `Nothing matches “${q}”. Try a shorter word, or email us.`,
  topics: 'Topics',
  stillStuck: 'Still stuck? Email',
  sections: (o) => [
    {
      id: 'start',
      title: 'Getting started',
      items: [
        {
          id: 'what-is-spysocial',
          q: 'What is SpySocial?',
          a: [
            'A free party game of social deception for 3 to 21 players. Most players are Locals who share a secret. One or more Spies don’t know it and try to blend in. Find the spy, or fool everyone if it’s you.',
            'There are two games: <b>Spy Talk</b>, where everyone asks and answers questions about a secret location, and <b>Spy Sketch</b>, where everyone takes turns drawing a secret word.',
          ],
        },
        {
          id: 'from-a-video',
          q: "I came from a video. What is SpySocial?",
          a: [
            "SpySocial is a free party game of social deception for 3 to 21 players, on iPhone and Android. Download it from the App Store or Google Play, make an account, and play with friends in a private room or online. Browser play comes later with the PC version.",
          ],
        },
        {
          id: 'how-many-players',
          q: 'How many players do I need?',
          a: [
            'A private room plays with 3 to 21 players.',
            '<b>Play Online</b> seats you at a table of 4 or 8.',
            'The host picks the number of spies. It follows the players in the room: 8 players can have up to 3 spies.',
          ],
        },
        {
          id: 'is-it-free',
          q: 'Is SpySocial free?',
          a: [
            'Yes. Both games, Play Online, private rooms and Game Night are free, with no ads.',
            `Optional memberships unlock the premium packs and some looks for your agent. Nothing you buy helps you win.${o.purchases ? '' : ' Memberships go on sale with version 2.2.'}`,
          ],
        },
        {
          id: 'start-a-game',
          q: 'How do I start a game?',
          a: [
            '<b>With friends:</b> tap <b>Private Room</b>, then <b>Create Room</b>, and share the room code, the QR code or the invite link. You need at least 3 players.',
            '<b>With anyone:</b> tap <b>Play Online</b>, then <b>Find a Game</b>.',
            o.practiceMembers ? "<b>New to it?</b> <b>How to Play</b> on Home has a free 3-minute tutorial for each game, then, for members, Practice Games against AI agents. The glossary is there too." : "<b>New to it?</b> <b>How to Play</b> on Home has a 3-minute tutorial for each game, then Practice Games against AI agents. The glossary is there too.",
          ],
        },
      ],
    },
    {
      id: 'how-to-play',
      title: 'How to play',
      items: [
        {
          id: 'roles',
          q: 'What do Locals and Spies do?',
          a: [
            '<b>Locals</b> see the secret: a location in Spy Talk, a word in Spy Sketch. All Locals get the same one. Show you know it without giving it away.',
            '<b>Spies</b> see SPY. Listen, act like you know the secret too, and work it out before you’re caught.',
            'In <b>Spy Mafia</b>, spies see each other’s names and share a private chat. In <b>Classic</b>, each spy plays alone. With 1 spy, they play the same.',
          ],
        },
        {
          id: 'spy-talk',
          q: 'How does Spy Talk work?',
          a: [
            'First, Questions: in turn, each player asks the next player one question and answers one.',
            'Then free discussion: chat, follow up on odd answers and call votes.',
            'Stuck for a question? The hint card at the bottom of the screen has one. Asking for the location’s name or first letter isn’t fair play.',
          ],
        },
        ...(o.questionRounds
          ? [
            {
              id: 'question-rounds',
              q: 'What are Question Rounds?',
              a: [
                'Some Spy Talk tables play 2 rounds of questions instead of 1: private rooms whose host picks 2 in the room’s <b>Rules</b>, and Game Nights that set it. Play Online always plays 1.',
                'In round 1, everyone asks one question and answers one. As soon as the last answer is in, round 2 starts, the other way round: you’re asked by the player you asked. The top of the screen shows “Round 2”.',
                'Then the discussion, with its usual time. Two rounds give the Locals twice the answers to check, and the spy twice the chances to slip.',
              ],
            },
            ]
          : []),
        {
          id: 'talk-out-loud',
          q: "What is Talk Out Loud?",
          a: [
            "A Spy Talk rule for groups in one room or on a voice call. The host turns it on in the room’s <b>Rules</b>; new rooms start with it off. Private rooms only, and Game Nights that turn it on.",
            "During Questions, nobody types or uses the mic: the asker asks out loud and taps <b>Done</b>, then the answerer answers out loud and taps <b>Done</b>.",
            "Nothing is written down, so the notes keep no question history.",
            "We suggest leaving it off, even at one table: tap the mic and ask out loud instead. Everyone hears you, and the app turns what you say into text that every player sees in the question history.",
            "Everyone in the room needs the newest app. If someone has an older one, it shows Off until they update.",
          ],
        },
        {
          id: 'spy-sketch',
          q: 'How does Spy Sketch work?',
          a: [
            'Players take turns drawing on one shared whiteboard. Locals hint at the word without drawing it outright. Spies add something vague that could fit.',
            'Once everyone has had a turn, votes and the spy’s guess open. Rounds go on until the game ends.',
            'Spy Sketch’s drawings aren’t described aloud, so a screen reader (VoiceOver, TalkBack) can’t follow the drawing itself.',
            "Your line starts under your finger. If you’d rather see where it will start, turn on <b>Precision Mode</b> in <b>Settings</b>, under Drawing, or on the board: a pencil sits above your finger, and you aim it, then draw from its point (<b>Hold Still</b> or <b>Lift and Touch Again</b>).",
            ...(o.guestSaveBeforeBuy ? ["The drawing board itself can be reached with a screen reader: it says whose turn it is to draw and the page, and on your turn how to draw (double-tap and hold, then drag)."] : []),
          ],
        },
        {
          id: 'drawings-checked',
          q: "Are Spy Sketch drawings checked?",
          a: [
            "Yes, to keep drawings safe. At Play Online tables and Game Nights, finished drawing turns may be checked automatically by OpenAI for anything that breaks the <rules>community rules</rules>.",
            "The first time, the app shows <b>Drawings Are Checked</b>. Tap <b>I Agree</b> to play Spy Sketch online. Until you do, Spy Talk is open to you either way.",
            o.drawingMinorPeer
              ? "In a private room, a drawing is checked if someone reports it. It can also be checked automatically while anyone who can see it, other than the drawer, is under 18 or hasn’t told us their age. A drawing by a player who said they’re under 18 gets only the first, basic check, and only while another player there is under 18 or hasn’t told us their age; the second check runs only if the first flags it."
              : "In a private room, a drawing is checked if someone reports it. It can also be checked automatically while anyone who can see it, other than the drawer, is under 18 or hasn’t told us their age. A drawing by a player who said they’re under 18 is checked only if someone reports it.",
            "OpenAI gets a picture of the turn and the round’s word, never your name or your messages. A turn that breaks the rules can be removed and can lead to a warning, a pause or a ban. A person reviews every permanent decision, and you can appeal.",
            "The full details: <drawchecks>Drawing Checks in the Privacy Policy</drawchecks>.",
          ],
        },
        {
          id: 'new-page',
          q: "What is New Page in Spy Sketch?",
          a: [
            "A sketch break stops play for up to 20 seconds: study the drawing, chat and check your notes. Everyone still in votes <b>Keep this page</b> or <b>New page</b>. The break ends sooner once everyone has voted.",
            "The page stays only if more than half of the players still in vote to keep it. A tie, or no vote, means a blank sheet. You can still look back at earlier pages.",
            "<b>Play Online:</b> one extra page at most. The break comes after every 2 rounds at a table of 4, and after every round at a table of 8. If the table keeps the page, the next break comes as many rounds later.",
            "<b>Private rooms and Game Nights:</b> the host (or the night) sets <b>New page</b> in the rules: Off, 2, 3 or 4 pages, or Unlimited. A new room starts on 2, as we recommend. The break comes when the sheet fills up.",
            "No break starts in the game’s last 45 seconds.",
          ],
        },
        {
          id: 'voting',
          q: 'How does voting work?',
          a: [
            'Open <b>Actions</b> and tap <b>Vote</b>. Everyone picks a player or <b>Abstain</b>, then confirms. A confirmed vote can’t be changed.',
            '<b>Majority:</b> a player is out only with votes from more than half of the players still in.',
            '<b>Plurality:</b> the most votes is enough, as long as they outnumber the abstains and the players who didn’t vote.',
            'A tie for first place puts nobody out, and it always takes at least 2 votes.',
            'At Play Online tables, each player has one vote call and names who they accuse. When a vote catches a spy, everyone who used theirs gets it back.',
            'At 8-player tables the most votes puts a player out, until 4 players are left; then it’s a majority. Not voting counts as abstaining.',
            'On the results, a black strip says who called the vote: “Called by …”. A final vote shows a red <b>Final Vote</b> tape instead.',
          ],
        },
        {
          id: 'spy-guess',
          q: 'How does the spy’s guess work?',
          a: [
            'A spy opens <b>Actions</b> and taps <b>Solve</b>, then has 60 seconds to pick the secret from a list of about 30.',
            'A right guess wins for every spy. A wrong guess, or running out of time, puts that spy out. If it was the last spy, the Locals win.',
            'Everyone sees who is guessing, so it gives you away.',
            "You guess alone: your chat is closed until you confirm your pick.",
            'With <b>One Shot</b> on (private rooms and Game Nights that turn it on), the spy team has a single guess: a miss loses for the whole team.',
          ],
        },
        {
          id: 'winning',
          q: 'How does each side win?',
          a: [
            '<b>Locals</b> win by voting out every spy, or when the last spy guesses wrong.',
            '<b>Spies</b> win with a right guess, when the game timer runs out, or when a vote leaves as many spies as Locals.',
            'A leave counts like a vote-out: if the last spy leaves, the Locals win; if too many Locals leave, the Spies win. Before the questions end (in Spy Sketch, in the first round), that game shows No Result and doesn’t count.',
            "<b>Final vote:</b> with exactly one spy left, everyone votes once more when time runs out, when nobody has a vote call left, or when the last chance to call one runs out. Catch the spy and the Locals win. It’s on at Play Online tables and a setting in private rooms. A Play Online table or a Game Night can also play it with two spies left: catch either one and the Locals win.",
            "A final vote’s results open under a red <b>Final Vote</b> tape that says why: “The clock has spoken”, “No vote calls left” or “The last chance ran out”.",
            "<b>Informant</b> (Spy Talk and Spy Sketch, private rooms and Game Nights that turn it on, with 2 or more spies and 6 or more players): one Local’s card says <b>You know: Name is a spy</b>, with one spy named, even when there are more. The other Locals’ cards count the Informant in, like “2 spies · 1 informant”. When the Locals win by a vote or by the last spy’s wrong guess, the spies, caught ones too, get 30 seconds to name the Informant and steal the win. Not after a missed One Shot, or when the last spy leaves.",
          ],
        },
        {
          id: 'special-rules',
          q: "What special rules can a private room or Game Night use?",
          a: [
            "<b>Votes per Game:</b> each player can call 1, 2 or 3 votes a game, or Unlimited (a new room starts at 1). When a vote catches a spy, everyone who used a call gets one back.",
            "When nobody still in has a call left, the game clock jumps to its last 5 seconds. When the calls left are no more than the spies still in, there’s a 15-second last chance to call one. If nobody calls one in time, a final vote follows if it’s on (see how each side wins, above); otherwise the spies win.",
            "<b>Paper Trail:</b> when a spy is voted out, everyone sees how that spy voted all game. If roles aren’t revealed on a vote-out, it waits for Game Over.",
            "<b>One Shot</b> and <b>Informant</b>: see the spy’s guess and how each side wins, above.",
            "<b>Talk Out Loud</b> has its own answer above. In the app, <b>How to Play</b> › <b>Features & Settings</b> has a short demo of each rule.",
          ],
        },
      ],
    },
    {
      id: 'ways-to-play',
      title: 'Ways to play',
      items: [
        {
          id: 'play-online',
          q: 'What is Play Online?',
          a: [
            '<b>Find a Game</b> seats you at a table of 4 or 8 with other players. Every table plays by the same Standard Rules, with no host.',
            'Players you don’t know see your Agent colour, like Agent Teal, never your name.',
            'You need a saved account (a confirmed email, or Apple or Google sign-in) and to be 13 or older.',
            'Leaving a game after the roles are dealt means a short break from Play Online.',
            ...(o.guestSaveBeforeBuy ? ["If a game is found for you while SpySocial is in the background and you miss it, the first miss is only a warning, with no break from Play Online. Keep the app open while you search."] : []),
            ...(o.u6152 ? ["Members can turn on <b>Members only</b> to play only with other members. Fewer players search that way, so finding a game may take a bit longer. The (i) beside it says more, with <b>See Membership</b> for players without one."] : []),
          ],
        },
        {
          id: 'private-rooms',
          q: 'How do private rooms work?',
          a: [
            'Rooms that players create are private, for people you know. Friends join with the room code, the QR code or the invite link. Guests can join too.',
            'The host sets the rules: game, spies, timers, voting and packs. Max Players goes up to 21, and <b>Lock Room</b> stops new players joining.',
            'Free packs are open to everyone. A premium pack plays for everyone in the room when anyone there has a membership.',
          ],
        },
        {
          id: 'game-night',
          q: 'What is Game Night?',
          a: [
            o.launch ? "Online play we host, on the nights we announce in the app (usually Friday 8 to 10 PM Eastern, and Saturday at 2 PM). On Home, open <b>Compete</b>, then the <b>Game Night</b> tab, and tap <b>PLAY NOW</b>." : 'Online play we host, on the nights we announce in the app (usually Friday 8 to 10 PM Eastern, and Saturday at 2 PM). Tap <b>PLAY NOW</b> on Home’s Game Night card.',
            "Game Night needs a saved account: guests save theirs first.",
            o.gnRewards
              ? 'Each night has its own packs and settings: the (i) next to the night shows them. <b>PRIZES</b> on the card shows what you earn: Game Night Intel and the ★ titles.'
              : o.gnRewardsRules
                ? 'Each night has its own packs and settings: the (i) next to the night shows them.'
                : 'Each night has its own packs, settings and titles. The (i) next to the night shows its packs and settings, and <b>PRIZES</b> on the card shows its titles.',
            'It’s free, and nothing you buy improves your chances. The full rules: <gnr>Game Night rules</gnr>.',
          ],
        },
        ...(o.launch
          ? [
            {
              id: 'compete',
              q: "What is Compete?",
              a: [
                "<b>Compete</b> is a card on Home with three tabs: <b>Game Night</b>, <b>Ranked</b> and <b>Tournaments</b>.",
                "Only the Game Night tab is in use today. Ranked and Tournaments are coming later, and say “Soon”.",
                "In <b>Compete</b>, the <b>Ranked</b> and <b>Tournaments</b> tabs show a <b>Meanwhile at Game Night</b> card. The whole card is one button: tap it to open the Game Night tab.",
              ],
            },
            ]
          : []),
        ...(o.gnWeekly
          ? [
            {
              id: 'game-night-weekly',
              q: 'When is Game Night?',
              a: [
                'Once a week: on Friday, usually 8 to 10 PM Eastern, then the same Game Night is played again on Saturday at 2 PM Eastern.',
                'Come to either night, or play both.',
                o.launch ? "We announce each night in the app, on Home, in Compete, on the Game Night tab." : 'We announce each night in the app, on Home’s Game Night card.',
              ],
            },
            ]
          : []),
        ...(o.gnRewards
          ? [
            {
              id: 'game-night-rewards',
              q: 'What do I earn at Game Night?',
              a: [
                o.gnTiers4 ? `<b>Game Night Intel</b> for every game you win: 500, but only if you took at least half of your own turns. A loss, or a game with no winner, gives 0. Game Over shows what you got.` : '<b>Game Night Intel</b> for every game you finish: 500 for a win, 200 for a loss, 0 if the game has no winner. Game Over shows what you got.',
                "No Game Night Intel if you leave before the end, are removed or don’t take part, if the game starts after Game Night closes (a game that starts in time and ends later still pays), if our fair-play checks flag the game, or at a table with spybots. A game that ends early because someone walked out pays no one.",
                '<b>★ titles</b> that count up: <b>★ Operative</b> for each Game Night game you finish, <b>★ Local Hero</b> for each win as a Local, <b>★ Master Spy</b> for each win as a spy, and <b>★ Double Agent</b> for each night you win on both sides. Wear one with its count, like ★ Operative ×12.',
                ...(o.gnTiers4 ? [`A game counts toward the ★ titles only if you took at least half of your own turns in it. ★ Operative still counts a loss or a tie you played.`] : []),
                'Game Night Intel and the ★ titles are yours alone: they can’t be traded, and a membership adds nothing to them. Spend the Intel on Game Night Intercepts.',
                ...(o.launch
                  ? []
                  : ['Titles from the beta Game Nights became counts on these titles. At the reset before launch, the Game Night Intel you earned comes back in full, even if you spent it, and your ★ titles stay. Game Night Intercepts and their items are reset like everything else.']),
                "On the <b>Game Night</b> tab, <b>How Game Night Intel Works</b> explains how you earn and spend Intel.",
              ],
            },
            ]
          : []),
        {
          id: 'practice-game',
          q: "What are the Tutorial and the Practice Games?",
          a: [
            "In <b>How to Play</b>, pick Spy Talk or Spy Sketch. <b>Step 1, Tutorial:</b> a guided 3-minute game with AI agents. Play it as a Local or as the Spy: passing either one counts.",
            o.practiceMembers ? "<b>Step 2, Practice Games</b> (for members): full games of 5 to 9 minutes against AI agents, graded A to F. They unlock when you pass that game’s tutorial, and you can pick up where you left off." : "<b>Step 2, Practice Games:</b> full games of 5 to 9 minutes against AI agents, graded A to F. They unlock when you pass that game’s tutorial, and you can pick up where you left off.",
            'Each step of a tutorial or Practice Game has a coach card that says what to do. Tap its main button and the control to use stays lit until you do it, and you can leave from any card.',
            "Each game has four: as a Local or as the Spy, at a table of 4 or of 8. An A in all eight earns the <b>Straight A’s</b> title (saved accounts only).",
            o.launch ? "Passing a game’s tutorial opens Play Online for that game (with a saved account). The Practice Games aren’t needed. Game Night never asks." : "You don’t need either one to play online today. Game Night never asks.",
          ],
        },
        ...(o.practiceMembers
          ? [
            {
              id: 'practice-members',
              q: 'Who can play Practice Games?',
              a: [
                'Practice Games are for members: up to 5 a day. The day starts at midnight UTC. After your 5, a saved game can still be resumed.',
                ...(o.practiceAi
                  ? ['Members get a letter grade for every game and, if you are 16 or older and tap <b>Try It</b> when the app asks, optional AI feedback on your lines as you play; for everyone else, the phone grades. To stop it, turn off <b>Rate My Practice Lines with AI</b> in Settings. A line that only turns the question back (“What do you think?”) isn’t an answer, so it scores low.']
                  : []),
                'The tutorials stay free for everyone, and passing one still counts for Play Online.',
                'Without a membership, <b>Practice Game</b> on the tutorial’s last card is greyed out and says “Practice Games are for members”. The tutorial still counts. The line under it is a link to <b>Membership</b>.',
                'The phone’s own grade, used when AI feedback is off, treats a line that only turns the question back the same way.',
              ],
            },
            ]
          : []),
        {
          id: 'browser-play',
          q: "Can I play SpySocial on a computer?",
          a: [
            "You can sign in at play.spysocial.app with the account you made in the app. There you see your agent, your Vault, the Black Market and your trades.",
            o.browserPlay ? "Rooms, Play Online and Game Night work in the browser too." : "For now, playing games in the browser is open only to testers and creators we invite. Everyone else can sign in and use their account there (Account, your agent, the Vault, the Black Market, trades, settings, How to Play), and sees <b>Browser Play Coming Soon</b> where a game would start. Browser play opens to everyone later, with the PC version; we will announce it.",
            "No account yet? Get the app from the App Store or Google Play and make one there.",
          ],
        },
        {
          id: 'web-trading',
          q: "Can I trade or use the Black Market on the web?",
          a: [
            "Yes, adults who can trade can use Trades and the Black Market in the browser or in the app: same account, same rules. Players under 18 can look but not buy or sell.",
          ],
        },
        ...(o.autoTranslation ? [
          {
            id: 'report-translation',
            q: "A translation is wrong. How do I report it?",
            a: [
              "Under a translated message, tap <b>Show original</b> to read what the player wrote. Translations are automatic and can miss slang or jokes.",
              "There is no report button for translations: <b>Report</b> is for rule-breaking. To tell us about a bad translation, email <email/> with a screenshot of the message and the two languages.",
            ],
          },
        ] : []),
        {
          id: 'languages',
          q: 'Can I play with people who speak other languages?',
          a: [
            'SpySocial is in 10 languages: English, Spanish, Russian, Simplified Chinese, Hindi, Arabic, French, Bengali, Brazilian Portuguese and Indonesian.',
            ...(o.onePool
              ? [
                  'Everyone sees the game in their own language, the secret and the hints included, so one table can mix languages.',
                  o.autoTranslation
                    ? 'Messages in another language are translated into yours automatically. To translate only when you tap, turn off <b>Translate Messages Automatically</b> in Settings.'
                    : 'Tap <b>Translate</b> on a message to read it in your language.',
                ]
              : ['In a private room, the host picks the game’s language for the secret and the hints.', ...(o.autoTranslation ? ['Messages in another language are translated into yours automatically. To translate only when you tap, turn off <b>Translate Messages Automatically</b> in Settings.'] : [])]),
            ...(o.autoTranslation ? ['Play Online may offer to add your language to your phone’s own translator. It’s optional, and it keeps English chat lines translated when our translator is busy.'] : []),
            ...(o.autoTranslation ? ["Under a translated message, tap <b>Show original</b> to read it as it was written."] : []),
            ...(o.u6153 ? ["When you switch language in <b>Settings</b>, the app shows a loader while it turns to the new language."] : []),
          ],
        },
      ],
    },
    {
      id: 'in-game',
      title: 'In the game',
      items: [
        ...(o.roleReveal
          ? [
            {
              id: 'role-reveal',
              q: "How does the role reveal work?",
              a: [
                "Games played online have a role reveal: Play Online, Game Nights, and private rooms whose host picked <b>Online</b>. Tap your card: the lights go down and a spotlight shows your role.",
                "<b>Locals</b> see the secret and how many spies are among them: in Spy Talk the location and its picture (every place in our packs has one); in Spy Sketch, the word only.",
                "<b>Spies</b> get a dark card. In Spy Mafia, the other spies step up beside you, named, with a red SPY tag. In Classic, spies don’t know each other, so the others show as <b>Unknown</b>.",
                "Tap <b>Continue</b> when you’re ready. The game moves on once everyone has tapped Continue, or when the timer runs out.",
                "Your card stays at the bottom of the screen all game with the same face: a Local’s keeps the place’s picture, and a spy’s card in Spy Mafia names the other spies in red.",
                "In Spy Mafia with more than one spy, tap <b>SPY CHANNEL</b> to chat in private with the other spies (it closes while a spy is guessing the secret): on your card before the game starts, then in the top bar, or beside Chat in a vote. One tap is enough; a number shows new messages, and a message from another spy says “… is trying to reach you”.",
                "The red SPY tag stays on the other spies’ pictures all game. Locals never see the tags, the button or the chat.",
                "On a voice call? Turn on <b>Same Sound for Every Role</b> (Settings, Sound & Music) so your mic can’t pick up a spy’s reveal sound. The app asks you (<b>Playing Over a Call?</b>) only in a private room set to <b>Online</b>.",
                "Every face-down role card has the same back: a navy-and-gold playing card. Nothing on it shows your role.",
              ],
            },
            {
              id: 'poker-face',
              q: "Online or Same Room: what is Poker Face?",
              a: [
                "When a host creates a private room, the app asks <b>Where Are You Playing?</b> Pick <b>Online</b> when everyone is on their own phone, wherever they are, a voice call included: you get the full role reveal and one-tap spy chat. Pick <b>Same Room</b> around one table: it turns on <b>Poker Face</b>.",
                "With Poker Face, every role card looks alike: no dark spy card, no red SPY tags, and nothing lights up when a spy message comes in. Spy Mafia still names the other spies, in small print. Spies open their chat by pressing and holding their card (on a computer, right-click it). In a vote, they press and hold the <b>Chat</b> button instead.",
                "Why: at one table, a glance at a neighbour’s phone could give their role away. Poker Face stops accidents, not cheaters. The catch: the other spies are harder to spot and to chat with.",
                "The host can switch it between games in the lobby’s <b>Rules</b>, and players who join see <b>Poker Face Is On</b>. At Game Nights, each night sets it. Play Online doesn’t have it.",
              ],
            },
            ]
          : []),
        {
          id: 'voice-chat',
          q: "Is there voice chat? What does the mic do?",
          a: [
            "SpySocial has no voice chat: nobody hears you through the app. The mic turns what you say into text, so you don’t have to type.",
            "Tap the mic, speak, then tap it again to stop. It works in the game and lobby chats and in Spy Talk’s Questions.",
            "Your phone’s speech recognition (or your browser’s) does this. We get only the text, never the audio. Details: <privacy>Privacy Policy</privacy>.",
            "To talk while you play, run a voice call of your own next to the app, on Discord or your phone, for example.",
            ...(o.roleReveal ? ["On a call, the host picks <b>Online</b> for <b>Where Are You Playing?</b>, and everyone can turn on <b>Same Sound for Every Role</b> (Settings, Sound & Music) so no mic picks up a spy’s reveal sound."] : []),
            "In a private Spy Talk room, <b>Talk Out Loud</b> lets everyone ask and answer by voice, without typing.",
          ],
        },
        {
          id: 'wax-seal',
          q: 'What is the Wax Seal?',
          a: [
            'The seal at the top left of the game screen holds <b>Leave</b> and <b>Info</b>, folded away so nobody leaves by accident. <b>Chat</b> and <b>Notes</b> have their own buttons at the top right, one tap each. A number on Chat means new messages.',
            'You find the seal on every game screen: the vote and its results, the spy’s guess and Game Over.',
            'On the vote, the spy’s guess and Game Over, <b>Info</b> explains the screen you’re on.',
            'Practice Games have the seal too, with <b>End Practice</b> and <b>Info</b> on the vote, the guess and Game Over. The game waits while Info is open.',
            'Tap a player’s picture to ask them in the chat. Swipe a message to reply.',
            'On a computer, point at a message and click the arrow that appears beside it. The tutorial works the same way.',
            'Bluffing is part of the game. Saying the secret outright isn’t.',
          ],
        },
        {
          id: 'notes',
          q: 'How do notes work?',
          a: [
            'Press and hold a player’s picture to open your notes on them.',
            'The <b>Board</b> sorts players into Suspect, Undecided and Trust. In Spy Talk, <b>History</b> shows what each player asked and answered.',
            'Spies get a clue board instead: <b>My Clues</b>, with Maybe, It is and It isn’t.',
            'Your notes are private, stay on your phone and are cleared after Game Over.',
          ],
        },
        {
          id: 'leave-rejoin',
          q: 'Can I leave or rejoin a game?',
          a: [
            'The Leave button offers <b>Step Away</b>, which keeps your seat (Home’s card has <b>Rejoin</b>), or <b>Leave for Good</b>: you can’t come back to that game, and if it counts, it’s a loss for you.',
            'The host can tap <b>End Game for Everyone</b>. Then nobody wins.',
            'At Play Online tables, leaving after the deal means a short break from Play Online.',
          ],
        },
      ],
    },
    {
      id: 'friends',
      title: 'Friends & parties',
      items: [
        {
          id: 'add-friends',
          q: 'How do I add friends?',
          a: [
            "<b>In person:</b> show your <b>Friend Code</b> and let them scan it in SpySocial. A new code comes every 5 minutes and works for up to 3 scans, so a screenshot soon stops working.",
            '<b>From a private game</b> you played together in the last 24 hours.',
            '<b>Adults only:</b> from a public table, or by exact username, if they allow it.',
            'Friends are two-way. You can remove or block a friend any time; they aren’t told. There are no private messages.',
          ],
        },
        {
          id: 'parties',
          q: 'What is a party?',
          a: [
            'A leader and friends who play together, up to 21 people in all. It takes a membership to start one. ' + (o.partyNoMember ? "If the leader leaves, the lead goes to someone in it with a membership." : "If the leader leaves, the lead goes to someone with a membership first."),
            ...(o.partyLeaderLapse ? ['If the leader’s membership ends, the party closes for everyone; the lead isn’t passed on. A game you’re in goes on to the end, and after it each of you searches on your own.'] : []),
            ...(o.partyNoMember ? ['If the leader leaves and nobody left has a membership, the party closes for everyone.'] : []),
            'At Play Online tables and Game Nights, a party takes at most half a table, marked for everyone: up to 2 at a table of 4, up to 4 at a table of 8.',
            'At a 12-seat Game Night table, up to 6. Party mates searching on their own count too: never more than half a table between them.',
            'To sit at one table, search from the party: <b>Play Online</b> on your own is a solo search. After a Play Online game, <b>Back to Your Party</b> takes you back to it.',
            'Leaving a game early gets you the usual break from Play Online, and your party can’t search for a table until it ends. While you’re seated in a game, you stay in the party even if your phone goes to sleep.',
            'Any party can start a private room together, and a party too big for a table plays there.',
            'Party chat follows the same rules as all chat. To report a message, press and hold it.',
          ],
        },
        {
          id: 'privacy-friends',
          q: 'Who can see that I’m online, or invite me?',
          a: [
            'You choose in <b>Privacy & Friends</b>: who can add you, whether friends see you online, and who can invite you to rooms and parties.',
            'Friends see only Online, Playing Online, In a private room or At Game Night, never which room. Nobody can see your friends list.',
            'Adults can have a public profile and followers. Players under 18 can’t.',
          ],
        },
        ...(o.u6152
          ? [
              {
                id: 'showcase-items',
                q: "What happens when I tap an item in a Showcase?",
                a: [
                  "Tap any item in a player’s <b>Showcase</b>, yours or someone else’s, to open its item page.",
                  "On an item page, <b>View in the Archive</b> opens a Unique’s own page on our website, and <b>View on the Market</b> opens any other item’s prices.",
                ],
              },
            ]
          : []),
      ],
    },
    {
      id: 'trading',
      title: 'Trading',
      items: [
        {
          id: 'who-can-trade',
          q: 'Who can trade, and what?',
          a: [
            'You trade with friends, inside the app. You need an account at least 7 days old, a confirmed email and 3 counted games (finished games that count toward your stats, with at least 2 other saved accounts on other phones).',
            "The 7 days count from when the account was saved: time as a guest doesn’t count.",
            ...(o.launch ? [] : ['During the beta test, until December 7, the account-age, counted-games and new-device rules are off: every adult player can trade once their email is confirmed.']),
            ...(o.launch ? ["Testers who played 3 counted games during the beta test don’t need 3 more."] : ["Testers who play 3 counted games during the beta test won’t need 3 more after launch."]),
            'Each side offers up to 10 items, and both confirm before the trade happens. Big trades ask for a code we email you.',
            ...(o.interceptsInTrades ? ['Adults can also put unopened Intercepts in a trade: choose how many of each tier. Each one counts as one of the 10.'] : []),
            ...(o.interceptsInTrades && !o.launch ? ['During the beta test, until December 7, every unopened Intercept can go in a trade, however you got it. Intercepts start fresh at launch anyway.'] : []),
            'What you put in an open trade is held for it: it can’t go into another trade or onto the Black Market at the same time. If Intel in a trade is spent before the trade happens, a warning shows on that side, and the trade can’t go through until the amount is lowered.',
            'The app marks which items can be traded. Memberships and what they include, level rewards and arcade items never can.' + (o.launch ? (o.gnRewardsRules ? " Neither can anything from a code, or anything we or our staff give you: it stays with your account. Intel is never tied to an account, whatever it came from." : " Neither can anything from a code, or anything we or our staff give you, a Developer’s Pick included: it stays with your account. Intel is never tied to an account, whatever it came from.") : ''),
            'Intel can be traded only between adults.',
            ...(o.launch ? [] : ["During the beta test, until December 7, every adult player can trade Intel too." + (o.intelZero ? " Right before launch, every account’s Intel goes to 0, the Intel earned in the test included." : " On December 7 every Intel amount traded goes back: whoever gave it gets it back, and everyone keeps only the Intel they earned."), "From December 7, Intercepts from a code or a gift, what they open into and what you make with them in a Trade Up stay with your account: you can still use them, but you can’t trade or sell them."]),
            'Buying or selling items, Intel or accounts for real money is against the rules.',
          ],
        },
        {
          id: 'trade-protection',
          q: 'What is the 7-day protection? Can I undo a trade?',
          a: [
            'What you get in a trade is protected for 7 days. You can wear an item at once, but you can’t trade it, shred it or trade it up yet, and Intel you get can’t be spent yet.',
            ...(o.r21 ? ["In the <b>Vault</b>, a protected item shows a <b>Trade protected</b> tag. Tap it to see how much time is left."] : []),
            ...(o.interceptsInTrades ? ['An unopened Intercept you get stays sealed for those 7 days: you can’t open it, trade it or list it yet.'] : []),
            'In those 7 days you can reverse your trades, once every 90 days. It undoes all of your protected trades, both ways, and pauses your trading for 30 days.',
            "Reversing also undoes your Rare Finds buys and sales that are still in their 3 days of protection.",
            'After 7 days a trade is final. We can also reverse a trade for account theft or fraud.',
          ],
        },
        {
          id: 'trade-deleted-account',
          q: 'What if someone deletes their account after a trade?',
          a: [
            'If the other player deletes their account within the 7 days, the trade is undone: you get back what you gave, and what you got from them is removed.',
            'If you delete yours within the 7 days, what you got goes back to the player who gave it.',
          ],
        },
        {
          id: 'trading-under-18',
          q: 'Can players under 18 trade?',
          a: [
            'Yes, with limits: items for items only, and only with friends they added in person with a Friend Code.',
            'No gifts, no Intel, no unopened Intercepts, and no buying or selling on the Black Market.',
            'On iPhone and iPad, players under 18 can’t trade until a version of the app that asks a parent’s consent through Apple is out.',
          ],
        },
        {
          id: 'trading-paused',
          q: 'Why is my trading paused?',
          a: [
            'Trading pauses for a while after your email or sign-in method changes, after a sign-in on a new device, after you reverse your trades (30 days), or when you lock it yourself.',
            'A new device’s pause lasts 24 hours; an email or sign-in change’s, 3 days.',
            ...(o.launch ? [] : ['During the beta test, until December 7, a sign-in on a new device or an email or sign-in change doesn’t pause trading.']),
            'It’s there to protect your items if someone else gets into your account.',
            'We can also pause an account’s trading ourselves, to protect it or while we look into fraud.',
            "A fair-play hold pauses trading and the Black Market while it lasts. With a Banned reputation, trading, gifts and the Black Market stay closed until it recovers: see <b>Reputation</b> in Settings.",
            'Any of these pauses, your own lock included, closes your open Black Market offers and listings at once. A ban, a suspension or a fair-play hold does too. Items come back to you, Intel from a buy offer waits for you to collect, and other players’ offers on your listings go back to them. Nothing reopens when it ends: you list again.',
            'If we sign your account out on every device without pausing trading, your Black Market offers and listings from before that show <b>Waiting</b> and don’t fill. Once your new sign-in can trade, tap <b>Put Back</b> on each one that’s yours, or stop it.',
          ],
        },
      ],
    },
    {
      id: 'black-market',
      title: 'Black Market & Rare Finds',
      items: [
        {
          id: 'what-is-black-market',
          q: 'What are the Black Market and Rare Finds?',
          a: [
            'The Black Market, in the <b>Vault</b>, is where adults buy and sell tradable items for Intel, never for money.',
            '<b>Items:</b> place an offer to buy or sell at your price. It matches the best price on the other side.',
            '<b>Rare Finds:</b> each Unique is listed on its own, at a price, and the seller can accept lower offers.',
            'Unopened Intercepts are sold there too, by tier. Nobody sees who is buying or selling.',
          ],
        },
        {
          id: 'black-market-who',
          q: 'Who can use the Black Market?',
          a: [
            'Adults who can trade: an account at least 7 days old, a confirmed email, 3 counted games and no trading pause.',
            "The 7 days count from when the account was saved: time as a guest doesn’t count.",
            ...(o.launch ? [] : ['During the beta test, until December 7, the account-age and counted-games rules are off here too.']),
            'Players under 18 can look, but can’t buy, sell or make offers.',
            ...(o.launch ? [] : ["During the beta, every adult player can buy and sell here. Every sale made while SpySocial is being tested is undone before the launch: buyers get back the Intel they paid, and sellers give back what they received."]),
          ],
        },
        {
          id: 'black-market-fees',
          q: 'What are the fees, limits and minimum price?',
          a: [
            'Each item sold costs a 2% fee (at least 1 Intel, at most 5,000 Intel), which is removed from the game.',
            'No offer can go below an item’s minimum price: what one copy shreds for. For an unopened Intercept, it’s the average its tier shreds for.',
            'Members can have 8 offers open at once, others 4. While an offer is open, its Intel or items are held for it (you can still wear the items).',
            "A price can be up to 1,000,000 Intel each, and one offer can be for up to 1,000 copies.",
            "On Rare Finds, you can list up to 25 Uniques at once and have up to 20 offers open on other players’ listings.",
            'You can stop an offer any time and collect what’s left.',
          ],
        },
        ...(o.rarefindsOffers
          ? [
              {
                id: 'rare-finds-offers',
                q: "How do offers on Rare Finds work?",
                a: [
                  ...(o.appU61 ? ["The seller chooses how far below the price you can offer: up to 5%, 10% or 15%, or no offers at all."] : []),
                  "Your offer’s Intel is held while it waits. If the seller doesn’t answer within 24 hours, the offer ends and the Intel comes back.",
                  "You can take an offer back once it has waited 30 minutes.",
                  ...(o.appU61 ? ["The seller can accept, decline or counter with a price between your offer and theirs. A counter holds none of your Intel: buy at it, decline it or counter back."] : []),
                  "Once a seller declines an offer, nobody can offer that low on that listing again: its lowest offer goes up.",
                  ...(o.appU61 ? ["The seller sees the new lowest offer. Once declines bring it up to the price, the listing takes no more offers: Buy Now only."] : []),
                  "If many of your offers are declined and almost none accepted, you can’t make new offers for up to 3 days.",
                  ...(o.rarefindsOfferPush ? ["With Black Market notifications on, you get one when the seller counters your offer, and when your offer is declined or ends."] : []),
                ],
              },
            ]
          : []),
        {
          id: 'black-market-protection',
          q: 'Are Black Market sales protected?',
          a: [
            'A sale on Items is final at once.',
            'A Unique bought on Rare Finds is protected for 3 days: it can’t be traded, listed, shredded or traded up, and the seller’s Intel waits. In that time the sale can be reversed, like a trade.',
            ...(o.r21 ? ["You can wear it at once: it’s in your <b>Vault</b> with a <b>Trade protected</b> tag that shows the time left."] : []),
            'If the buyer or the seller deletes their account in those 3 days, the sale is undone: the buyer gets the Intel back, or the seller gets the Unique back.',
          ],
        },
        {
          id: 'item-paused',
          q: 'Why does an item say “Paused for review”?',
          a: [
            'We can pause one item on the Black Market for everyone while we check it, for example if its odds or its count look broken.',
            'While it is paused, nobody can make a new offer, listing or sale for that item. Everything else works, and you keep the item.',
            'It opens again once we have checked it.',
          ],
        },
        {
          id: 'price-guide-few',
          q: "Why does an item’s price guide show no line?",
          a: [
            "With too few sales in the time you picked (24 hours, 7 days or 30 days), the card says there are too few sales to show a change, and draws no line.",
            "The line and the change come once there are enough sales.",
          ],
        },
        {
          id: 'archive-holder',
          q: "Can other people see that I hold a Unique?",
          a: [
            "Every Unique has its own page on archive.spysocial.app. Its holder today shows as “Held by @username”, with a link to their profile, only if they’re an adult with a public profile.",
            "For everyone else, players under 18 included, it says “Held privately”.",
            "To hide your name, make your profile private in <b>Privacy & Friends</b>. It leaves the Archive within about a minute.",
          ],
        },
      ],
    },
    {
      id: 'rewards',
      title: 'Intercepts & Intel',
      items: [
        {
          id: 'intercepts',
          q: 'What are Intercepts?',
          a: [
            'Sealed rewards you earn by playing. Each one opens into one random cosmetic item, like a look for your agent or a celebration.',
            'They’re never sold for money, and a membership doesn’t give you more of them or better odds.',
            o.launch ? 'Before you open or buy one, the app shows the exact odds under <b>Odds</b>.' : 'Before you open one, the app shows the exact odds under <b>Odds</b>.',
          ],
        },
        {
          id: 'intercept-tiers',
          q: 'What are the Intercept tiers?',
          a: [
            'Five tiers, lowest first: <b>Restricted</b>, <b>Confidential</b>, <b>Secret</b>, <b>Top Secret</b> and <b>Enigma</b>.',
            'The tier is set when you earn it. The higher the tier, the better the odds.',
            "A <b>Unique</b> is a one-of-one copy: a prism gem, a rainbow foil frame, a codename and a number no other copy has. Each copy keeps its own colours inside.",
            ...(o.u6152 ? ["A Unique’s codename is its name, like <b>Onyx Dispatch</b>. The Legendary it came from shows under it in smaller text, with its number: Paper Plane #37."] : []),
          ],
        },
        {
          id: 'earn-intercepts',
          q: 'How do I earn Intercepts?',
          a: [
            '<b>Wins:</b> every 10 Play Online wins give you 5 Intercepts, one of them Secret or better.',
            "<b>Daily:</b> your first Play Online game of the day gives you one. Every 7th day in a row adds one Secret or better, and every 30th day an Enigma.",
            ...(o.gnRewards ? ["<b>Game Night:</b> your games there earn Game Night Intel, which gets you Game Night Intercepts (below)."] : o.gnRewardsRules ? [] : ["<b>Game Night:</b> win a game there, as a Local or a Spy, and you get an Enigma, once a night."]),
            `<b>Codes and gifts:</b> a code from a creator or from us works once per account, and its Intercepts unlock after your first counted Play Online game. We also give some as gifts.${o.launch ? " Intercepts from a code or a gift, what they open into and what you trade up from them are just for you: they can’t be traded, sold or given away, however many games you play. You can still open them, wear what comes out, trade them up and shred spares. Shredding a spare gives ordinary Intel." : ''}`,
            ...(o.launch ? ["<b>Welcome:</b> a saved account gets a first Intercept, free. Like Intercepts from a code or a gift, it and what comes out of it stay with your account: they can’t be traded or sold."] : []),
            'Private rooms don’t give Intercepts.',
            ...(o.launch
              ? []
              : ['Before 2.2 opens to everyone, Intercepts start fresh: those earned in test versions are wiped. The Beta Pin and anything bought in a store stay.']),
          ],
        },
        ...(o.gnRewards
          ? [
            {
              id: 'game-night-intercepts',
              q: 'What are Game Night Intercepts?',
              a: [
                o.gnTiers4 ? `Intercepts you get with Game Night Intel, in <b>Compete</b>, on the <b>Game Night</b> tab: <b>Tier 1</b> for 400 (any rarity, up to Legendary), <b>Tier 2</b> for 800 (Uncommon or better), <b>Tier 3</b> for 1,600 (Rare or better) and <b>Tier 4</b> for 3,200 (Epic or better, with a chance of a Unique).` : 'Intercepts you get with Game Night Intel, in <b>Compete</b>, on the <b>Game Night</b> tab: <b>Tier 1</b> for 400 (any rarity, up to Legendary), <b>Tier 2</b> for 800 (Uncommon or better) and <b>Tier 3</b> for 10,000 (Epic or better, with a chance of a Unique).',
                ...(o.r21 ? ["You can get up to 5 of a tier at once, as many as your Game Night Intel covers, and open them right there on the <b>Game Night</b> tab."] : []),
                'They open into Game Night’s own set, <b>After Hours</b>: 14 card-room items for your agent that no other Intercept holds. As for every Intercept, the app shows the exact odds.',
                ...(o.gnTiers4 ? [`A spare <b>After Hours</b> item, however you got it (opened, bought or traded), shreds for <b>Game Night Intel</b>, not Intel, at the amount the app shows (never your first copy).`] : []),
                ...(o.u6153 ? ["Game Night’s Legendary background is <b>Blackout</b>, which used to be called The Back Room. Its rest scene is <b>Rain Window</b>."] : []),
                'A bought one waits under <b>To Open</b>. Open it on the <b>Game Night</b> tab or in the <b>Vault</b>, like one you already own. Unlike Game Night Intel, the Intercepts and what they open into trade like anything else you earn.',
                "Tap <b>What’s inside</b> on a tier to see its rarity odds. It shows the odds only, not the list of items.",
              ],
            },
            ]
          : []),
        {
          id: 'change-your-look',
          q: "How do I sort and filter in Your Look?",
          a: [
            "On Home, tap <b>Your Look</b>. There, the <b>Sort & Filter</b> box sets the order and a rarity filter. Both stay as you switch between categories, and an indicator shows when a filter is on.",
            ...(o.r21 ? ["Tap the <b>Agent</b> / <b>Gear</b> switch to move between your agent’s looks (skin, hair, face, facial hair) and your gear (hats, glasses, outfits, backgrounds)."] : []),
          ],
        },
        {
          id: 'vault-filter-empty',
          q: 'Why does my Vault say “Nothing matches” with items I own?',
          a: [
            'A <b>Sort & Filter</b> choice or the search is hiding them. Tap <b>Clear Filters</b> right on that screen to see everything again.',
            'The count at the top matches the list you see, filters included.',
          ],
        },
        {
          id: 'duplicates',
          q: 'What can I do with duplicates?',
          a: [
            '<b>Shred</b> a spare copy for Intel, at the amount the app shows.',
            ...(o.gnTiers4 ? [`A spare <b>After Hours</b> item, however you got it, shreds for Game Night Intel instead.`] : []),
            '<b>Trade Up:</b> 5 spare copies of one rarity give you 1 random item of the next rarity, and 10 spare Legendary copies give you a Unique.' + (o.launch ? " With a gift among them, what you get is just for you too." : ''),
            'Only spares count, never your first copy or a Unique.',
            'A copy you bought or got in a trade counts as a spare when you hold another copy of that item. Your only copy always stays.',
          ],
        },
        {
          id: 'intel',
          q: 'What is Intel?',
          a: [
            'The currency you earn by playing: from your games, your first game of the day and your daily streak, and from shredding spare copies.',
            'Your streak: one Play Online game a day keeps it. A game you start before the new day keeps it too, even if it ends after.',
            o.launch ? 'Intel is never sold and has no cash value. Adults spend it on the Black Market and can trade it with other adults.' : "Intel is never sold and has no cash value. Adults can trade it with other adults and spend it on the Black Market. During the beta, every deal is undone before launch.",
            'Every change to your Intel is a line in your Intel ledger, with its reason. Read yours under <b>Intel History</b> in How Intel Works, on the app’s newest update.',
            'In the <b>Vault</b>, your Intel has its own tile, a stack that grows with the amount. Tap it for what you earned today, earned in all and spent in all. Intel held in an open Black Market offer counts as spent until it comes back.',
          ],
        },
        ...(o.launch
          ? []
          : [
            {
              id: 'shops-closed',
              q: 'Why are the shops closed?',
              a: [
                'Just before launch, the Intel shop and the Game Night shop close, from Monday, December 7. The app says <b>Shops reopen at launch</b>, with the date.',
                'They open again at launch.',
              ],
            },
            ]),
        {
          id: 'verifying',
          q: 'Why does a reward say “Verifying”?',
          a: [
            'From launch day, our fair-play checks may hold an account’s new rewards for up to 72 hours while someone on our team looks at a strong sign of farming, bots or cheating.',
            'You can ask for a review in the app.',
          ],
        },
        {
          id: 'missing-item',
          q: 'An item or Intercept is missing',
          a: [
            'It may be held by an open Black Market offer. You can stop the offer any time.',
            'You may have shredded it or used it in a Trade Up.',
            'A reversed trade sends it back to the player who gave it.',
            'When a membership ends or is refunded, what came with it isn’t available.',
            ...(o.launch ? [] : ['Intercepts earned in test versions, and their items, are wiped before 2.2 opens to everyone.']),
            'None of these? Email <email/> with your username, the item’s name and when you last saw it.',
          ],
        },
        {
          id: 'tester-rewards',
          q: 'Where are my beta tester rewards?',
          a: [
            ...(o.testerGiftGame
              ? [
                o.launch
                  ? 'They were added at the 2.2 launch and are yours to keep. Everyone on the tester list got the <b>Beta Pin</b> and the <b>Beta Tester</b> title. A thank-you card shows when you first open the app after launch.'
                  : 'They arrive at the 2.2 launch, on a thank-you card when you open the app, and they’re yours to keep. Everyone on the tester list gets the <b>Beta Pin</b> and the <b>Beta Tester</b> title.',
                o.launch
                  ? "Testers who finished at least one game with other players before December 7 (played to the end, in any room, so it shows in their Stats; Practice Games don’t count) also got the <b>Field Tester</b> title, 10 Intercepts of each tier and 1 month of membership."
                  : "Finish at least one game with other players before December 7 (played to the end, in any room, so it shows in your Stats; Practice Games don’t count) and you also get the <b>Field Tester</b> title, 10 Intercepts of each tier and 1 month of membership.",
                o.testerInterceptsTradable
                  ? 'The <b>Beta Pin</b>, the <b>Field Tester</b> title and the thank-you Intercepts trade like anything you earn.'
                  : 'The <b>Beta Pin</b> and the <b>Field Tester</b> title trade like anything you earn; like other gifts, the thank-you Intercepts stay with your account.',
              ]
              : [
                o.launch
                  ? 'They were added at the 2.2 launch and are yours to keep: the <b>Beta Pin</b>, the <b>Beta Tester</b> and <b>Field Tester</b> titles, 10 Intercepts of each tier and 1 month of membership. A thank-you card shows when you first open the app after launch.'
                  : 'They arrive at the 2.2 launch, on a thank-you card when you open the app, and they’re yours to keep: the <b>Beta Pin</b>, the <b>Beta Tester</b> and <b>Field Tester</b> titles, 10 Intercepts of each tier and 1 month of membership.',
              ]),
            ...(o.launch ? [] : ['What you hold in a test version now is for testing and is wiped before launch. Your rewards don’t depend on it, as long as you keep the same saved account.']),
            'To wear the pin: <b>Account</b>, <b>Edit Agent</b>, <b>Accessories</b>, <b>Beta Pin</b>, <b>Save</b>.',
            'Something missing? Email <email/> with your username and the email you signed in with during the test. A guest account isn’t on the list, so a different account is the usual reason.',
            ...(o.launch ? [] : ["Beta 3 is on Tuesday, November 24, 8 to 9 PM Eastern (join from 7:30). If your seat email mentions the $10 thank-you: play at least one game that night and send the survey by Friday, November 27, 11:59 PM Eastern, and the $10 comes by PayPal by December 1. Beta 3 is open to everyone. The $50 goes to the most useful report or idea from someone who played that night and sent the survey, chosen by us. Payouts ($10 and $50) are for players 18 or older only."]),
          ],
        },
        ...(o.launch ? [
          {
            id: 'after-launch-reset',
            q: "Where did my beta Intel and items go?",
            a: [
              "Before launch, on December 7, everything from the test versions was reset: Intel, Intercepts, items, Black Market deals, trades and test memberships. Everyone started launch from scratch.",
              "Your account, friends, packs, XP, level, achievements, stats, titles from codes and anything you bought in a store stayed. Testers kept the <b>Beta Pin</b> and got their thank-you rewards (see the tester thank-you question).",
              "Think something is wrong? Email <email/> with your username.",
            ],
          },
        ] : []),
        ...(o.launch
          ? []
          : [
            {
              id: 'beta-reset',
              q: "The app says everything resets before launch. What does that mean?",
              a: [
                "SpySocial is still being tested. Before launch, items, Intercepts, Intel, Black Market deals and trades are reset, and everyone starts from scratch.",
                "Your account, friends and packs stay, and so do your XP, level, achievements, stats, Practice Game grades, titles from codes and anything bought in a store.",
                ...(o.gnRewards ? [o.gnTiers4 ? `Your ★ Game Night titles stay, and you get back all the Game Night Intel you earned from games, even if you spent it. Game Night Intel from shredding isn’t part of it.` : "Your ★ Game Night titles stay, and you get back all the Game Night Intel you earned, even if you spent it."] : []),
                "Memberships given for the test end at launch." + (o.intelZero ? " Your daily streak starts again from day 0." : ''),
                "Testers get a special reward for helping.",
                "The note shows in the Vault, the Black Market and the trading screens. Tap it to read more, or tap X to hide it on that phone.",
              ],
            },
            ]),
      ],
    },
    {
      id: 'membership',
      title: 'Membership',
      items: [
        {
          id: 'membership-includes',
          q: 'What does a membership include?',
          a: [
            ...(o.purchases ? [] : ['Memberships go on sale with version 2.2.']),
            'Every premium pack, new ones included. Everyone plays them in rooms you host and at your Play Online table.',
            'Make your own packs in Pack Creator and share them in Community.',
            '+50% XP on every game, and members-only lobbies in Play Online.',
            ...(o.practiceMembers ? ['Practice Games, up to 5 a day, with letter grades' + (o.practiceAi ? ' and optional AI feedback (16 and older).' : '.')] : []),
            'Your rank’s border, tag and title. You can lead a party, and have 8 open Black Market offers instead of 4.',
            'It never changes how you play or score. The free packs stay free for everyone.',
          ],
        },
        {
          id: 'pack-creator',
          q: "How does Pack Creator work?",
          a: [
            "With a membership (13 or older), open <b>Packs</b>, then <b>Pack Creator</b>. A pack needs 30 to 200 entries to be played or sent to <b>Community</b>.",
            "Your packs play in private rooms you host while you’re a member.",
            "Send one to <b>Community</b> and we check it within 72 hours: an automatic check reads the text first, then a person decides. It shows <b>In Review</b>, then <b>In Community</b>, or <b>Needs Changes</b> with the reason: change it and send it again.",
            "Popular packs can be <b>Featured</b>. Other members add Community packs to <b>My Packs</b> to play in their own rooms.",
            "Players under 18 don’t get our answer between 10 PM and 7 AM.",
            "A pack’s page shows its author’s picture and <b>by name</b>: tap it to open their profile, or tap <b>More by name</b> for their other packs.",
          ],
        },
        ...(o.u6153
          ? [
            {
              id: 'membership-cards',
              q: "What are the Membership cards in the app?",
              a: [
                "Wherever members get more, a short card says so. Tap anywhere on it to open <b>Membership</b> in the Vault. It never buys anything by itself.",
                "<b>Black Market</b>, Your Offers: 8 open offers for members, 4 for everyone else.",
                "<b>Parties</b>: members lead them.",
                "The pack picker in a room you host: every premium pack and any Community Pack you add, plus Pack Creator to make your own.",
                "<b>Locker</b>: members wear their rank’s border and title.",
                "A Community Pack’s page: members add it to <b>My Packs</b>.",
              ],
            },
          ]
          : []),
        {
          id: 'membership-plans',
          q: 'What are Agent, Elite and Spymaster?',
          a: [
            '<b>Agent</b> is the Monthly Membership, <b>Elite</b> the Yearly Membership, and <b>Spymaster</b> is Lifetime: one payment, no renewal.',
            'Spymaster adds all three metal borders, the Gold Card title, the Gold Storm celebration and Lifetime-only items for your agent.',
            'Lifetime lasts as long as we offer SpySocial, not for your lifetime. There are no free trials, and memberships aren’t shared through Family Sharing.',
            ...(o.purchases ? ["The App Store or Google Play shows the price in your own currency before you buy."] : []),
          ],
        },
        ...(o.membershipSwitch
          ? [
            {
              id: 'membership-switch',
              q: 'Can I switch between Monthly and Yearly?',
              a: [
                'Yes, in the app: open the <b>Vault</b>, then <b>Membership</b>. On Monthly, tap <b>Upgrade to Elite</b> (Yearly) or <b>Upgrade to Spymaster</b> (Lifetime). On Yearly, <b>Switch to Monthly</b> is there too: Elite’s border, title and tag change to Agent’s, and every other perk stays.',
                'You’re never charged twice. On Google Play, the new plan starts right away and the time you’ve paid for becomes time on it. On the App Store, Apple decides when it starts, often at your next renewal, and credits the time you’ve paid for.',
                'A membership billed by the other store is changed in that store: buying another plan here would charge you twice.',
                ...(o.googlePassStop
                  ? ['When you buy Lifetime, a Monthly or Yearly membership billed by Google Play stops renewing by itself: you keep it until its end date, and nothing more is charged. Apple doesn’t allow this, so cancel an App Store one yourself.']
                  : []),
              ],
            },
            {
              id: 'two-memberships',
              q: 'The app says I have two memberships active',
              a: [
                'You’re paying for two at once: for example Lifetime and a Monthly membership, or one on each store. The app says which one you need and which one to cancel, when you open it and on the <b>Membership</b> tab.',
                'Tap <b>Manage Subscription</b> to cancel the extra one in its store. Cancelling only stops the next charge: you keep the time you’ve already paid for.',
                ...(o.googlePassStop ? ['If the extra one is billed by Google Play, <b>Stop Renewal</b> stops it right from the app.'] : []),
                'Nothing is blocked meanwhile: <b>Later</b> hides the message until you next open the app.',
              ],
            },
            ]
          : []),
        ...(o.memberLoyalty
          ? [
            {
              id: 'member-time',
              q: "What is “Member since”?",
              a: [
                "While you’re a member, <b>Account</b> shows when your membership started and how long you’ve been a member, and the <b>Vault</b> shows your stamps: 1, 3 and 6 months, 1, 2 and 3 years, then every year.",
                "It counts the time your membership has been active without a break: a monthly or yearly membership, Lifetime, a gift or a code. Refunded time and test purchases don’t count.",
                "It’s earned by staying. On the first day your membership isn’t active any more (after any grace period the store gives for a failed payment), your member time and stamps are gone. If you become a member again, “Member since” and your time start again from zero.",
                "<b>Lifetime</b> is the exception: your time counts from your first day as a member, months of a monthly or yearly membership before it included, and keeps growing, with every stamp we add later.",
                "Other players see only how long, with your stamp, on your player sheet, never the date or the price. Turn off <b>Show my membership time</b> in Settings to hide it. An under-13 account’s time is never shown to others.",
                "Stamps only change how your profile looks: no XP, no better odds, and they can’t be traded.",
              ],
            },
            {
              id: 'membership-price',
              q: "Will my price go up?",
              a: [
                "While your monthly or yearly membership renews without a break, you keep the price you pay now, even if the price goes up for new members. The store may still adjust it for local taxes or currency.",
                "Switching to the other plan (monthly or yearly) means that plan’s current price. If your membership ends and you come back later, you may pay the price at that time. Lifetime is paid once and never renews.",
              ],
            },
            ]
          : []),
        {
          id: 'cancel-membership',
          q: 'How do auto-renewal and cancelling work?',
          a: [
            'Agent and Elite renew automatically until you cancel: on the App Store, at least 24 hours before the period ends; on Google Play, before the renewal date. You keep the benefits until the end of the period you paid for.',
            '<b>iPhone or iPad:</b> Settings, your name, Subscriptions, SpySocial.',
            '<b>Android:</b> the Google Play Store app, your profile picture, Payments & subscriptions, Subscriptions, SpySocial.',
            o.googlePassStop
              ? '<b>Manage Subscription</b> in the app opens the same page. Deleting the app or your account doesn’t cancel a monthly or yearly membership. Buying Lifetime stops one billed by Google Play by itself, but not one billed by the App Store.'
              : '<b>Manage Subscription</b> in the app opens the same page. Deleting the app or your account, or buying Lifetime, doesn’t cancel a monthly or yearly membership.',
            ...(o.memberLoyalty ? ["In the <b>Vault</b>, <b>Cancel Membership</b> (under Manage Subscription) first shows one screen with the facts: if your membership ends, your member time and stamps reset and start again from zero, and your locked price ends. Its one button, <b>Continue to Cancel</b>, goes straight on to the store. <b>Manage Subscription</b> itself still opens the store directly. Nothing changes before the end of the period you paid for."] : []),
          ],
        },
        {
          id: 'restore-purchases',
          q: 'How do I restore my membership?',
          a: [
            'Tap <b>Restore Purchases</b> in the app while your phone is signed in to the App Store or Google Play account you paid with.',
            'It moves your membership to the SpySocial account you’re using, away from any other account it was on, a deleted one included.',
          ],
        },
        {
          id: 'charged-no-membership',
          q: "I was charged but have no membership, or I was charged twice.",
          a: [
            "First tap <b>Restore Purchases</b> in the app while your phone is signed in to the App Store or Google Play account you paid with. It puts the membership on the SpySocial account you are using.",
            "Charged twice, or want your money back? Apple and Google handle refunds: ask Apple at reportaproblem.apple.com, or Google through your Google Play order history.",
            "Still stuck? Email <email/> with your username and the order ID from the Apple or Google receipt. Never send a card number.",
          ],
        },
        {
          id: 'refunds',
          q: 'Can I get a refund?',
          a: [
            'Apple and Google handle refunds under their policies: ask Apple at reportaproblem.apple.com, or Google through your Google Play order history.',
            'If a purchase is refunded, what it unlocked is removed.',
          ],
        },
      ],
    },
    {
      id: 'account',
      title: 'Your account',
      items: [
        {
          id: 'guest-or-saved',
          q: 'Guest or saved account: what’s the difference?',
          a: [
            'A <b>guest</b> can play the tutorials and private rooms right away. A guest account lives on one phone, and signing out deletes it for good.',
            `A <b>saved</b> account (Apple, Google or your email${o.passwordless ? ', with a code we email you, no password' : ''}) keeps your name, progress and membership on any phone, and lets you play online, join Game Night and add friends.`,
            'You can save a guest account at any time from your Account page, without losing anything. Friends, Trades and the Black Market ask a guest to save it first.',
            ...(o.guestSaveBeforeBuy ? ["To buy a membership, a guest saves the account first (with Apple, Google or an email), so the membership is never lost. The purchase goes on once it’s saved."] : []),
            ...(o.u6152 ? ["Until you save, a <b>Save Your Account</b> card shows on Game Over after every game. Tap × to stop it showing on that phone."] : []),
          ],
        },
        ...(o.emailCodes22
          ? [
            {
              id: 'sign-up-email',
              q: 'How do I sign up with my email?',
              a: [
                'Tap <b>Continue with Email</b> and type your email. We email you a 6-digit code: type it in the app, and your account is made. No password needed.',
                'The code works for 1 hour. Not there? Check spam or junk, or tap <b>Resend Code</b> after a minute.',
                ...(o.passwordless
                  ? []
                  : ['Older versions of the app ask for a password. If one says the password is too common or has appeared in a data leak, choose a different one: no account was made, no email was sent, and you can try again right away.']),
              ],
            },
            ]
          : []),
        {
          id: 'lost-account',
          q: 'I lost my account. Can I get it back?',
          a: [
            '<b>A saved account</b> comes back on any phone: open SpySocial and sign in the same way as before (Apple, Google or the same email). A different email, or Apple’s Hide My Email, opens a new, empty account, which is often why progress seems gone.',
            '<b>A guest account</b> lives on one phone. If the app was deleted, the phone was lost or you signed out, it’s gone for good and we can’t bring it back.',
            'If the app shows <b>Couldn’t Open Your Account</b>, your account is still saved on the phone but couldn’t be read just then. Tap <b>Try Again</b>, or close the app and open it again.',
            'A membership isn’t lost: <b>Restore Purchases</b> brings it back. We can’t merge accounts or move items between them.',
            'If you had a saved account, email <email/> with your username and how you signed in, and we’ll look.',
          ],
        },
        {
          id: 'cant-sign-in',
          q: 'I can’t sign in',
          a: [
            ...(o.passwordless ? ['You can sign in with Apple, Google or a 6-digit code we email you. There are no passwords any more: if the app still asks for one, update it in the App Store or Google Play.'] : []),
            'Use the same way in as before. A different email, or Apple’s Hide My Email, opens a new, empty account instead of yours.',
            'If the app opens on Log In with <b>You Were Signed Out on This Device</b>, your sign-in there was ended on our side, usually because the account was signed out everywhere. Sign in again the same way: your progress is saved. A guest account can’t sign back in.',
            'If the app says “This account can’t sign in”, email <email/> from the account’s address and we’ll look.',
            'If the account was banned, our email to that address gives the reference, the reason and how to appeal.',
          ],
        },
        {
          id: 'code-not-arriving',
          q: 'My sign-in code or email isn’t arriving',
          a: [
            'It comes from noreply@mail.spysocial.app. Check spam or junk, and check the address you typed letter by letter.',
            o.passwordless
              ? 'You can ask for a new code after 60 seconds with <b>Resend Code</b>. A code works for 1 hour: use the one in the newest email. If the app says there are too many emails, wait a few minutes and try once.'
              : 'You can ask for another email after 60 seconds. Use the newest one.',
            ...(o.pasteCode ? ["Copied the code from your email? Tap <b>Paste Code</b> in the app and it fills in the boxes."] : []),
            'If your account uses Apple or Google, you can sign in with those instead.',
            'Still nothing? Email <email/> with the exact address and roughly when you tried, and we’ll check on our side.',
          ],
        },
        {
          id: 'lost-email',
          q: 'I lost my email address, or want to change it',
          a: [
            'The app can’t change the email on a saved account, so write to <email/>.',
            'If you can still read the old address, write from it and tell us the new one. We’ll also email the new address, and you reply to that.',
            'If the old address is gone, try to get it back through your email provider first. If your account has Apple or Google sign-in too, you can still sign in that way. We can’t promise a change without the old address, because that’s how we know the account is yours.',
            'After an email change, trading pauses for 3 days and your open Black Market offers and listings close.',
          ],
        },
        {
          id: 'stolen-account',
          q: 'Someone got into my account. What do I do?',
          a: [
            'First secure the email on your SpySocial account, and your Apple or Google account if you sign in with those. Anyone who can read that email can get into your account.',
            'Within 7 days of a trade you didn’t make, tap <b>Reverse My Trades</b> on your Trades page. It reverses all your protected trades and pauses your trading for 30 days. You can do it once every 90 days.',
            'Then write to <email/> with your username, roughly when it happened and what’s missing. Tell us too if you think someone is still signed in.',
            'After 7 days a trade is final, and a Black Market sale on Items is final at once. We’ll never ask for your sign-in code.',
          ],
        },
        {
          id: 'change-name',
          q: 'How do I change my name?',
          a: [
            o.launch ? "Change your display name, your username (once every 30 days) and your 2nd and 3rd colors in <b>Settings</b>." : 'Change your display name on your Account page any time, and your username once every 30 days.',
            ...(o.launch ? [] : ['A new account starts with a random display name in your app’s language.']),
            o.launch ? "When you set up a new account, you pick a @username and one color, and your display name is made from the username. It never uses the name on your Google or Apple account." : "When you set up a new account, your @username is made from the display name you type and follows it until you type your own or roll the dice. It never uses the name on your Google or Apple account.",
            'At Play Online tables, players you don’t know see your Agent colour instead. Names follow the <rules>community rules</rules>.',
          ],
        },
        {
          id: 'birth-year',
          q: 'I entered the wrong birth year. Can I fix it?',
          a: [
            'It can’t be changed in the app: email <email/> from your account’s email address.',
            'We change it to a later year (a younger age) when you or your parent ask, and to an earlier one only with proof of age.',
            'If the corrected age is under 13, the account is deleted.',
          ],
        },
        {
          id: 'delete-account',
          q: 'How do I delete my account?',
          a: [
            "In the app: <b>Account</b>, <b>Settings</b>, <b>Account & Sign-In</b>, <b>Delete Account</b>. It can’t be undone. A guest account is deleted there too, or by signing out.",
            'You can also ask us by email: see <delete>Delete your account</delete>.',
            "Deleting your account doesn’t cancel your membership. Cancel it in the App Store or Google Play first, or you’ll keep being charged.",
          ],
        },
        {
          id: 'data-copy',
          q: 'Can I get a copy of my data?',
          a: [
            'Yes. Email <email/> from your account’s email address. We send a copy in a machine-readable file (JSON), within one month.',
            'A guest account has no email, so save it with an email first. Details: <privacy>Privacy Policy</privacy>.',
          ],
        },
      ],
    },
    {
      id: 'safety',
      title: 'Safety',
      items: [
        {
          id: 'report-block',
          q: 'How do I report or block someone?',
          a: [
            "In the lobby, press and hold their card. In a game, press and hold their picture: <b>Report</b> and <b>Block</b> are at the bottom of your notes on them. On Game Over, tap their card.",
            'A person reads every report, and the player isn’t told who sent it.',
            'Blocking keeps you apart: neither of you can join a room the other is in. Unblock in Settings, under <b>Privacy & Safety</b>: <b>Blocked Players</b>.',
            'Lying and bluffing are part of the game and aren’t reportable.',
            'At a table with a party, choose <b>Teaming</b> if you think they’re working together outside the game. <b>Report Party</b> covers everyone in their party at that table.',
          ],
        },
        {
          id: 'child-safety-urgent',
          q: "Someone is putting a child at risk. What do I do?",
          a: [
            "If a child is in immediate danger, call your local emergency number first: 999 in the UK, 911 in the US, 112 in the EU.",
            "Then report the player in the app (press and hold their card, then <b>Report</b>, and choose <b>Child Safety</b>) and email <email/> with “Child safety” in the subject. We remove the content, ban the accounts involved and report it to the National Center for Missing & Exploited Children (NCMEC), as US law requires. Our <safety>Safety page</safety> says more.",
          ],
        },
        {
          id: 'moderators',
          q: 'Who moderates SpySocial?',
          a: [
            'Our team reads every report and decides what happens. Trusted volunteer moderators help, with our permission: at Game Night tables, with reported messages and with Community Packs.',
            'You can appeal any decision by emailing <email/>.',
          ],
        },
        {
          id: 'reputation',
          q: "What is my reputation?",
          a: [
            "Every account has one. See yours in Settings, under <b>Reputation</b>: Excellent, Good, Poor, At Risk or Banned. New accounts start at Good.",
            "Your reputation comes from your record: how long you've played, and any reports, warnings, mutes and pauses. The exact score isn't shown. Older notes count less over time and stop counting after 90 days.",
            "New accounts and players with a lower reputation have more of their drawings checked automatically.",
            "While it’s Banned, Play Online, public rooms, Game Nights, trading, gifts and the Black Market are closed to you, and private rooms may be too. You can still sign in and keep your items. It recovers over time while you play fair.",
            "Think it’s wrong? Email <email/> and we’ll review it.",
          ],
        },
        {
          id: 'under-18',
          q: 'What are the rules for players under 18?',
          a: [
            'You must be 13 or older to play.',
            'In any room or party with a player under 18 or one who hasn’t told us their age, links, email addresses, phone numbers, social accounts and other personal details (a home address, where someone lives, a school, a real name) are blocked for everyone.',
            'Players under 18 have no public profile and can’t be followed, trade only items for items with Friend Code friends, and can’t buy or sell on the Black Market.',
            'On iPhone and iPad, friends, parties and trading wait for a version of the app that asks a parent’s consent through Apple.',
            'Parents and carers: see our <safety>Safety page</safety>.',
          ],
        },
        {
          id: 'under-13',
          q: 'The app says “SpySocial is for players 13 and older”',
          a: [
            o.storeAgeSignals
              ? 'SpySocial is for players 13 and older. We don’t verify or estimate ages: the app relies on the birth year you give and the age range Apple or Google shares.'
              : 'SpySocial is for players 13 and older. We don’t verify or estimate ages: the app relies on the birth year you give.',
            'A birth year under 13 deletes the account straight away, and it can’t be restored.',
            ...(o.storeAgeSignals ? ['If your Apple or Google account shows the wrong age, correct it there and the app will let you play. If a parent or guardian declined SpySocial through the store, only they can change that.'] : []),
          ],
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      items: [
        {
          id: 'update-not-showing',
          q: 'The new update isn’t showing',
          a: [
            'Updates download in the background. Close SpySocial completely (swipe it away), open it, then close and open it once more.',
            'If it’s a new version in the App Store or Google Play, update it there.',
          ],
        },
        {
          id: 'cant-join',
          q: 'Why can’t I join a room?',
          a: [
            'Check the code: letters A to Z and numbers 2 to 9 (0 and 1 read as O and I).',
            'A game in progress can’t be joined: wait for it to end. The room may also be full or locked.',
            'If the host changed the code, old links and QR codes stop working. If the host removed you, you can’t rejoin that room.',
            'An invite to a room that’s gone says <b>This Invite Doesn’t Work</b> or <b>Room Closed</b> straight away, before it asks your birth year.',
            'Play Online and Game Night need a saved account.',
          ],
        },
        {
          id: 'connection-lost',
          q: 'I lost my connection in a game',
          a: [
            'The app reconnects by itself when your connection comes back.',
            'A chat message that didn’t go out shows <b>Not sent</b>. If your connection comes back within 2 minutes, it’s sent again by itself; after that, tap it to send it.',
            'If you end up on Home, tap <b>Rejoin</b> on your room’s card. Your seat is kept.',
            'If the app says it didn’t hear back after a vote, a guess, a buy, a shred or a trade, it may still have gone through. Check, then try again if it didn’t: nothing is paid or traded twice.',
          ],
        },
        {
          id: 'app-crashes',
          q: 'The app keeps crashing',
          a: [
            'Update SpySocial in the App Store or Google Play if there’s an update.',
            'Close it completely (swipe it away), open it, then close and open it once more.',
            'Restart your phone, and check it has some free storage: an update can fail on a full phone.',
            'Still crashing? Use <b>Account</b>, <b>Settings</b>, <b>Report a Problem</b> if you can reach it, or email <email/> with your phone model, system version, what you were doing, and the time with your time zone.',
            'If you were in a game, the app reconnects you, or tap <b>Rejoin</b> on your room’s card on Home. Your seat is kept.',
          ],
        },
        ...(o.u6153
          ? [
            {
              id: 'tablet-keyboard',
              q: "Does the on-screen keyboard flip the layout on a tablet?",
              a: [
                "In a tablet’s browser, the on-screen keyboard no longer turns the game into its sideways layout: the screen keeps its upright shape while you type.",
                "The page lifts so the field you’re typing in stays above the keys.",
                "A tablet you turn sideways keeps the app’s tablet layout, not the wide computer one.",
              ],
            },
          ]
          : []),
        {
          id: 'game-not-counted',
          q: 'My game didn’t count',
          a: [
            'A game counts on your record when it ended and you had a seat, whether you played to the end, left early (a loss) or were away.',
            'These don’t count: a game the host ended, a game with too few players, a cancelled deal, an abandoned game, being removed from the room, a seat you never came to, or watching. A game with no winner is neither a win nor a loss.',
            'Your stats show Play Online and private rooms apart, so check the switch at the top.',
            'Private rooms never give Intel or Intercepts, and Play Online games give them only if they earned XP.',
            'For trading, you need 3 finished games that count and that our fair-play checks didn’t flag, each with at least 2 other saved accounts on other phones. Two phones on one Wi-Fi are fine; another account on your own phone isn’t one of the 2.',
            'If it should have counted, email <email/> with your username, the room code (if you have it) and when you played.',
          ],
        },
        {
          id: 'notifications',
          q: 'I’m not getting notifications',
          a: [
            'Allow notifications for SpySocial in your phone’s settings.',
            'In the app, <b>Privacy & Friends</b> has switches for friend requests, invites, new packs, trades and the Black Market.',
            'On Android, friend, party, trade and Black Market notifications share one category in the phone’s settings, <b>Friends, Party & Trades</b>: turning it off there stops all of them.',
            'Match notifications come when you search in Play Online, and Game Night reminders when you tap <b>Remind Me</b>. Guests don’t get them.',
            'Players under 18 don’t get social notifications, or our answer about a pack they sent to Community, between 10 PM and 7 AM.',
          ],
        },
        {
          id: 'contact-support',
          q: 'How do I contact support?',
          a: [
            'Email <email/>. For anything about your account, write from its email address. A person reads every message.',
            'For news, Game Nights and players looking for a game, join our <discord>Discord</discord>.',
            'On Home, the <b>Find Players</b> part of the top card opens our Discord server. It is for players 16 and older, and players 16 and 17 see a short safety note first.',
          ],
        },
      ],
    },
  ],
}

export default en
