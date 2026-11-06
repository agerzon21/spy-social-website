import type { HelpText } from '../types'

/**
 * English: the source (../types.ts). Facts checked on 2026-11-05 (help-truth-4: guests asked to save for Friends, Trades and the Black Market; Couldn't Open
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
            '<b>New to it?</b> <b>How to Play</b> on Home has a 1-minute intro, walkthroughs, a glossary and a Practice Game.',
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
        {
          id: 'spy-sketch',
          q: 'How does Spy Sketch work?',
          a: [
            'Players take turns drawing on one shared whiteboard. Locals hint at the word without drawing it outright. Spies add something vague that could fit.',
            'Once everyone has had a turn, votes and the spy’s guess open. Rounds go on until the game ends.',
          ],
        },
        {
          id: 'voting',
          q: 'How does voting work?',
          a: [
            'Open <b>Actions</b> and tap <b>Vote</b>. Everyone picks a player or <b>Abstain</b>, then confirms. A confirmed vote can’t be changed.',
            '<b>Majority:</b> a player is out only with votes from more than half of the players still in.',
            '<b>Plurality:</b> the most votes is enough, as long as they outnumber the abstains.',
            'A tie for first place puts nobody out, and it always takes at least 2 votes.',
            'At Play Online tables, each player has one vote call and names who they accuse. When a vote catches a spy, everyone who used theirs gets it back.',
          ],
        },
        {
          id: 'spy-guess',
          q: 'How does the spy’s guess work?',
          a: [
            'A spy opens <b>Actions</b> and taps <b>Solve</b>, then has 60 seconds to pick the secret from a list of about 30.',
            'A right guess wins for every spy. A wrong guess, or running out of time, puts that spy out. If it was the last spy, the Locals win.',
            'Everyone sees who is guessing, so it gives you away.',
            'With <b>One Shot</b> on (private rooms), the spy team has a single guess: a miss loses for the whole team.',
          ],
        },
        {
          id: 'winning',
          q: 'How does each side win?',
          a: [
            '<b>Locals</b> win by voting out every spy, or when the last spy guesses wrong.',
            '<b>Spies</b> win with a right guess, when the game timer runs out, or when a vote leaves as many spies as Locals.',
            '<b>Final vote:</b> if time runs out with exactly one spy left, everyone votes once more. Catch the spy and the Locals win. It’s on at Play Online tables and a setting in private rooms.',
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
          ],
        },
        {
          id: 'private-rooms',
          q: 'How do private rooms work?',
          a: [
            'Rooms that players create are private, for people you know. Friends join with the room code, the QR code or the invite link. Guests can join too.',
            'The host sets the rules: game, spies, timers, voting and packs. Max Players goes up to 21, and <b>Lock Room</b> stops new players joining.',
            'Everyone plays the packs the host has unlocked.',
          ],
        },
        {
          id: 'game-night',
          q: 'What is Game Night?',
          a: [
            'Online play we host, on the nights we announce in the app, usually 8 to 10 PM Eastern. Tap <b>PLAY NOW</b> on Home’s Game Night card.',
            'Each night has its own packs, settings and titles. The (i) next to the night shows its packs and settings, and <b>PRIZES</b> on the card shows its titles.',
            'It’s free, and nothing you buy improves your chances. The full rules: <gnr>Game Night rules</gnr>.',
          ],
        },
        {
          id: 'practice-game',
          q: 'What is the Practice Game?',
          a: [
            'A game of about 5 minutes against AI agents, with a coach, in <b>How to Play</b>. You get a grade from A to F, and you can pick up where you left off.',
            'Before you play Spy Talk or Spy Sketch online, the app may ask you to pass that game’s practice with a C or better. Game Night never asks.',
          ],
        },
        {
          id: 'languages',
          q: 'Can I play with people who speak other languages?',
          a: [
            'SpySocial is in 10 languages: English, Spanish, Russian, Simplified Chinese, Hindi, Arabic, French, Bengali, Brazilian Portuguese and Indonesian.',
            ...(o.onePool
              ? [
                  'Everyone sees the game in their own language, the secret and the hints included, so one table can mix languages.',
                  o.autoTranslation
                    ? 'Messages in another language are translated into yours automatically. To translate only when you tap, turn off <b>Translate messages automatically</b> in Settings.'
                    : 'Tap <b>Translate</b> on a message to read it in your language.',
                ]
              : ['In a private room, the host picks the game’s language for the secret and the hints.']),
            ...(o.autoTranslation ? ['Play Online may offer to add your language to your phone’s own translator. It’s optional, and it keeps English chat lines translated when our translator is busy.'] : []),
          ],
        },
      ],
    },
    {
      id: 'in-game',
      title: 'In the game',
      items: [
        {
          id: 'wax-seal',
          q: 'What is the Wax Seal?',
          a: [
            'The seal at the top right of the game screen. Tap it any time for the full game chat, your notes and the game’s info. A red dot means new messages.',
            'Tap a player’s picture to ask them in the chat. Swipe a message to reply.',
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
            'Your notes are private, stay on your phone and are cleared when the game ends.',
          ],
        },
        {
          id: 'leave-rejoin',
          q: 'Can I leave or rejoin a game?',
          a: [
            'Leaving takes you to Home, where your room’s card has <b>Rejoin</b>. Your seat is kept while you’re gone.',
            'The host can tap <b>End Game</b> to stop it for everyone. Then nobody wins.',
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
            '<b>In person:</b> show your <b>Friend Code</b> and let them scan it in SpySocial. It changes often, so a screenshot stops working.',
            '<b>From a private game</b> you played together in the last 24 hours.',
            '<b>Adults only:</b> from a public table, or by exact username, if they allow it.',
            'Friends are two-way. You can remove or block a friend any time; they aren’t told. There are no private messages.',
          ],
        },
        {
          id: 'parties',
          q: 'What is a party?',
          a: [
            'A leader and friends who play together, up to 21 people in all. It takes a membership to start one. If the leader leaves, the lead goes to someone with a membership first.',
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
            ...(o.launch ? [] : ['During the beta test, until December 7, the account-age, counted-games and new-device rules are off: every tester can trade once their email is confirmed.']),
            'Each side offers up to 10 items, and both confirm before the trade happens. Big trades ask for a code we email you.',
            'What you put in an open trade is held for it: it can’t go into another trade or onto the Black Market at the same time. If Intel in a trade is spent before the trade happens, a warning shows on that side, and the trade can’t go through until the amount is lowered.',
            'The app marks which items can be traded. Memberships and what they include, level rewards and arcade items never can.',
            'Intel can be traded only between adults.',
            ...(o.launch ? [] : ['During the beta test, until December 7, adult testers trade Intel too. On December 7 every Intel amount traded goes back: whoever gave it gets it back, and everyone keeps only the Intel they earned.']),
            'Buying or selling items, Intel or accounts for real money is against the rules.',
          ],
        },
        {
          id: 'trade-protection',
          q: 'What is the 7-day protection? Can I undo a trade?',
          a: [
            'What you get in a trade is protected for 7 days. You can wear an item at once, but you can’t trade it, shred it or trade it up yet, and Intel you get can’t be spent yet.',
            'In those 7 days you can reverse your trades, once every 90 days. It reverses all of your protected trades and pauses your trading for 30 days.',
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
            'We can also pause an account’s trading ourselves, to protect it or while we look into fraud. That closes its open Black Market offers and listings, and what they held goes back to the account. Nothing reopens when the pause ends: you list again.',
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
            ...(o.launch ? [] : ['During the beta test, until December 7, the account-age and counted-games rules are off here too.']),
            'Players under 18 can look, but can’t buy, sell or make offers.',
            ...(o.launch ? [] : [o.testerMarket ? 'Beta 2: from November 12 to November 16, adults who can trade buy and sell here for real. Every sale made while SpySocial is being tested is undone before the launch: buyers get back the Intel they paid, and sellers give back what they received.' : 'Intel starts moving there at the 2.2 launch on December 8. Until then, you can look around.']),
          ],
        },
        {
          id: 'black-market-fees',
          q: 'What are the fees, limits and minimum price?',
          a: [
            'Each item sold costs a 2% fee (at most 5,000 Intel), which is removed from the game.',
            'No offer can go below an item’s minimum price: what one copy shreds for. For an unopened Intercept, it’s the average its tier shreds for.',
            'Members can have 8 offers open at once, others 4. While an offer is open, its Intel or items are held for it (you can still wear the items).',
            'You can stop an offer any time and collect what’s left.',
          ],
        },
        {
          id: 'black-market-protection',
          q: 'Are Black Market sales protected?',
          a: [
            'A sale on Items is final at once.',
            'A Unique bought on Rare Finds is protected for 3 days: it can’t be traded, listed, shredded or traded up, and the seller’s Intel waits. In that time the sale can be reversed, like a trade.',
            'If the buyer or the seller deletes their account in those 3 days, the sale is undone: the buyer gets the Intel back, or the seller gets the Unique back.',
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
            'A <b>Unique</b> is a copy with a colour and a number no other copy has.',
          ],
        },
        {
          id: 'earn-intercepts',
          q: 'How do I earn Intercepts?',
          a: [
            '<b>Wins:</b> every 10 Play Online wins give you 5 Intercepts, one of them Secret or better.',
            '<b>Daily:</b> your first Play Online game of the day gives you one, and long streaks add more (every 30th day in a row, an Enigma).',
            '<b>Game Night:</b> the night’s winners get an Enigma.',
            `<b>Codes and gifts:</b> a code from a creator or from us works once per account, and its Intercepts unlock after your first counted Play Online game. We also give some as gifts.${o.launch ? ' Intercepts from a code or a gift are just for you: they can’t be traded or sold.' : ''}`,
            'Private rooms don’t give Intercepts.',
            ...(o.launch
              ? []
              : ['Before 2.2 opens to everyone, Intercepts start fresh: those earned in test versions are wiped. The Beta Pin and anything bought in a store stay.']),
          ],
        },
        {
          id: 'duplicates',
          q: 'What can I do with duplicates?',
          a: [
            '<b>Shred</b> a spare copy for Intel, at the amount the app shows.',
            '<b>Trade Up:</b> 5 spare copies of one rarity give you 1 random item of the next rarity, and 10 spare Legendary copies give you a Unique.',
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
            'Intel is never sold and has no cash value. Adults spend it on the Black Market and can trade it with other adults.',
            'Every change to your Intel is a line in your Intel ledger, with its reason.',
            'In the <b>Vault</b>, your Intel has its own tile, a stack that grows with the amount. Tap it for what you earned today, earned in all and spent in all. Intel held in an open Black Market offer counts as spent until it comes back.',
          ],
        },
        {
          id: 'verifying',
          q: 'Why does a reward say “Verifying”?',
          a: [
            'From December 8, 2026, our fair-play checks may hold an account’s new rewards for up to 72 hours while someone on our team looks at a strong sign of farming, bots or cheating.',
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
            o.launch
              ? 'They were added at the 2.2 launch and are yours to keep: the <b>Beta Pin</b>, the <b>Beta Tester</b> and <b>Field Tester</b> titles, 10 Intercepts of each tier and 1 month of membership. A thank-you card shows when you first open the app after launch.'
              : 'They arrive at the 2.2 launch on December 8, on a thank-you card when you open the app, and they’re yours to keep: the <b>Beta Pin</b>, the <b>Beta Tester</b> and <b>Field Tester</b> titles, 10 Intercepts of each tier and 1 month of membership.',
            ...(o.launch ? [] : ['What you hold in a test version now is for testing and is wiped before launch. Your rewards don’t depend on it, as long as you keep the same saved account.']),
            'To wear the pin: <b>Account</b>, <b>Edit Agent</b>, <b>Accessories</b>, <b>Beta Pin</b>, <b>Save</b>.',
            'Something missing? Email <email/> with your username and the email you signed in with during the test. A guest account isn’t on the list, so a different account is the usual reason.',
            ...(o.launch ? [] : ['Beta 2: the $10 thank-you goes by PayPal to every confirmed player who joins the full live hour and sends the survey, within 7 days of the session, the same on iPhone and Android.']),
          ],
        },
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
            'Your rank’s border, tag and title. You can lead a party, and have 8 open Black Market offers instead of 4.',
            'It never changes how you play or score. The free packs stay free for everyone.',
          ],
        },
        {
          id: 'membership-plans',
          q: 'What are Agent, Elite and Spymaster?',
          a: [
            '<b>Agent</b> is the monthly Pack Pass, <b>Elite</b> the yearly one, and <b>Spymaster</b> is Lifetime: one payment, no renewal.',
            'Spymaster adds all three metal borders, the Gold Card title, the Gold Storm celebration and Lifetime-only items for your agent.',
            'Lifetime lasts as long as we offer SpySocial, not for your lifetime. There are no free trials, and memberships aren’t shared through Family Sharing.',
          ],
        },
        {
          id: 'cancel-membership',
          q: 'How do auto-renewal and cancelling work?',
          a: [
            'Agent and Elite renew automatically until you cancel: on the App Store, at least 24 hours before the period ends; on Google Play, before the renewal date. You keep the benefits until the end of the period you paid for.',
            '<b>iPhone or iPad:</b> Settings, your name, Subscriptions, SpySocial.',
            '<b>Android:</b> the Google Play Store app, your profile picture, Payments & subscriptions, Subscriptions, SpySocial.',
            '<b>Manage Subscription</b> in the app opens the same page. Deleting the app or your account, or buying Lifetime, doesn’t cancel a pass.',
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
            'A <b>guest</b> plays private rooms right away. A guest account lives on one phone, and signing out deletes it for good.',
            `A <b>saved</b> account (Apple, Google or your email${o.passwordless ? ', with a code we email you, no password' : ''}) keeps your name, progress and membership on any phone, and lets you play online, join Game Night and add friends.`,
            'You can save a guest account at any time from your Account page, without losing anything. Friends, Trades and the Black Market ask a guest to save it first.',
          ],
        },
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
            'Change your display name on your Account page any time, and your username once every 30 days.',
            'A new account starts with a random display name in your app’s language.',
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
            'In the app: <b>Account</b>, <b>Settings</b>, <b>Delete Account</b>. For a guest, signing out deletes it.',
            'You can also ask us by email: see <delete>Delete your account</delete>.',
            'Deleting doesn’t cancel a membership pass: cancel it in the store too.',
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
            'Press and hold their card, in the lobby, in a game or on Game Over, and choose <b>Report</b> or <b>Block</b>.',
            'A person reads every report, and the player isn’t told who sent it.',
            'Blocking keeps you apart: neither of you can join a room the other is in. Unblock in Settings, under <b>Blocked Players</b>.',
            'Lying and bluffing are part of the game and aren’t reportable.',
            'At a table with a party, choose <b>Teaming</b> if you think they’re working together outside the game. <b>Report Party</b> covers everyone in their party at that table.',
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
          id: 'under-18',
          q: 'What are the rules for players under 18?',
          a: [
            'You must be 13 or older to play.',
            'In any room with a player under 18, links, emails, phone numbers and social handles are blocked for everyone.',
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
        {
          id: 'game-not-counted',
          q: 'My game didn’t count',
          a: [
            'A game counts on your record when it ended and you had a seat, whether you played to the end, left early (a loss) or were away.',
            'These don’t count: a game the host ended, a cancelled deal, an abandoned game, being removed from the room, a seat you never came to, or watching. A game with no winner is neither a win nor a loss.',
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
          ],
        },
      ],
    },
  ],
}

export default en
