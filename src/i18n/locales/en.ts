/**
 * The site's words in English: the source every other language follows (src/i18n/locales/*.ts are typed
 * `Strings`, this file's shape, so a missing or extra key fails the build) and the fallback.
 *
 * For translators:
 * - Tags mark the parts a page styles or links: <b>bold</b>, <link>a link</link>, <link2>a second link</link>,
 *   <em>accent</em>. Keep every tag, translate the words inside it, and move it wherever the sentence needs it.
 *   A self-closing tag (<email/>) is replaced whole by the page (an address, a link): keep it as it is.
 *   Only those tag names are tags: the "<code>" in "spysocial.app/join/<code>" is shown as written (a stand-in for a
 *   room code), so translate the word inside the angle brackets.
 * - Functions take the values the page fills in (a number, a name, a date); write the sentence round them, with
 *   the plural or gender the language needs.
 * - Arrays keep their length and order (each item is a bullet, a step or a card the page draws in that order).
 * - Game words are the app's own (localization/translations in the app repo): Spy Talk, Spy Sketch, Local, Spy,
 *   Play Online, Find a Game, Create Room, the Agent colours. Button and screen names in <b> are the app's labels.
 * - Code words in the release notes (useBackPressGuard, rgba, server_now()) stay as they are.
 * - Product names on the merch (the TRUST NO ONE. hoodie, the I'm Not the Spy tee) stay in English: that's what is
 *   printed on them.
 */
const en = {
  /** The page's <title> and description for search engines and tabs, per page. */
  meta: {
    siteName: 'SpySocial',
    defaultTitle: 'SpySocial — The Party Game of Social Deception',
    description:
      'Gather your friends and find the spy — or fool everyone trying. Free real-time multiplayer party game for 3–21 players. Available on iOS and Google Play.',
    titles: {
      /** The Beta 2 playtester page (/beta). */
      beta: 'Beta 2 playtest: play SpySocial before launch',
      /** The transparency page (/transparency), live with LIVE.transparencyPage. */
      /** The collectibles ledger (/ledger), live with LIVE.mintedCollectibles. */
      ledger: "Collectibles ledger",
      transparency: "Transparency report",
      /** The Game Night rules page (/game-night-rules), live with LIVE.gameNightRules. */
      gameNightRules: "Game Night rules",
      faq: "Help & FAQ",
      contact: 'Contact us',
      rules: 'Community rules',
      safety: 'Safety',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      childSafety: 'Child Safety Standards',
      whatsNew: "What's New",
      roadmap: 'Roadmap',
      deleteAccount: 'Delete your account',
      join: 'Join a game',
      joinEvent: 'Public Game Night',
      resetPassword: 'Reset your password',
      /** /reset-password once passwords are gone (LIVE.passwordless; set by the page's own Helmet). */
      resetPasswordCode: "Sign in with a code",
      confirmSuccess: 'Email confirmed',
      notFound: 'Page not found',
    },
    /** Each page's own description for search results; the home page and the unlisted pages use `description`. */
    descriptions: {
      beta: 'Join a live 1-hour group playtest of SpySocial, a free social deduction party game, on Thursday, November 12, 2026, 7–8 PM Eastern. Adults 18+, iPhone or Android. Testers keep the Beta Pin and more.',
      ledger: "The public record of every minted SpySocial collectible: each copy and its number. Anyone can check it.",
      transparency: "Each month, how much Intel was made, spent and corrected in SpySocial, every incident and every rule change, with no player named.",
      gameNightRules: "The rules for SpySocial's weekly Game Night: when it runs, who can take part, how to get the night's titles, and the developer's bonus title.",
      faq: "SpySocial help: how to play Spy Talk and Spy Sketch, Play Online, private rooms and Game Night, friends, trading, the Black Market, Intercepts, Intel, membership, your account, safety and troubleshooting.",
      contact: 'Contact the SpySocial team: email support@spysocial.app for help with the app, your account or anything else.',
      rules: "SpySocial's community rules: be kind, bluff but don't cheat, keep personal information private, and what happens when someone breaks the rules.",
      safety: 'Safety at SpySocial for players 13 to 17 and for parents and carers: how to leave, block and report, and where to get help.',
      privacy: 'How SpySocial collects, uses and protects your personal data, who receives it, how long we keep it, and your privacy rights.',
      terms: 'The terms for using SpySocial: who can play, your account and content, public rooms, the community rules, moderation and appeals.',
      childSafety: "SpySocial's standards against child sexual abuse and exploitation: what we prohibit, how to report a concern, what we do, and our child safety contact.",
      whatsNew: 'Release notes for SpySocial: new features, fixes and improvements in each version of the app.',
      roadmap:
        "What's coming to SpySocial: everything in version 2.2, from Play Online and Spy Sketch to automatic chat translation, and what's planned next: ranked games, seasons and tournaments.",
      deleteAccount: 'How to delete your SpySocial account and its data, in the app or by email, and what stays for a while after.',
    },
  },

  /** The header's language menu. */
  language: {
    /** The button's accessible name; `name` is the current language's own name. */
    button: (name: string) => `Language: ${name}. Change language`,
    menu: 'Language',
  },

  header: {
    home: 'SpySocial home',
    nav: 'Site',
    /** The link to the home page's room-code box, on a computer or tablet. */
    join: 'Join a room',
    /** The same link on a phone, where the header has little room: one short word if you can. */
    joinShort: 'Join',
    shop: 'Shop',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
  },

  footer: {
    /** The link to the transparency page (LIVE.transparencyPage). */
    transparency: "Transparency",
    /** The link to the Game Night rules, once they're live (LIVE.gameNightRules). */
    gameNightRules: "Game Night Rules",
    /** The link to the /beta playtest page, shown only until sign-ups close. */
    beta: "Beta 2 playtest",
    tagline: 'The party game of social deception.',
    play: 'Play',
    legal: 'Legal & Safety',
    browser: 'Play in Your Browser',
    whatsNew: "What's New",
    /** The link to the roadmap page, once it's announced (LIVE.roadmap). */
    roadmap: 'Roadmap',
    rules: 'Rules',
    support: 'Support',
    contact: 'Contact',
    shop: 'Shop',
    privacy: 'Privacy',
    terms: 'Terms',
    childSafety: 'Child Safety',
    safety: 'Safety',
    deleteAccount: 'Delete Account',
    rights: (year: number, holder = 'SpySocial') => `© ${year} ${holder}. All rights reserved`,
    follow: 'Follow SpySocial',
    /** A social account's link, for screen readers: "SpySocial on Instagram". */
    on: (network: string) => `SpySocial on ${network}`,
    discordHandle: 'SpySocial server',
  },

  /** Shown at the top of a page whose text is English only, or translated with the English text binding. */
  notice: {
    englishOnly: 'This page is available in English only. The English version applies.',
    translated: 'This page is a translation. If it differs from the English version, the English version applies.',
    readEnglish: 'Read it in English',
    /** Delete Account: the two sections that come from the Privacy Policy. */
    englishSections: 'The two sections below are part of our Privacy Policy and are available in English only. The English version applies.',
  },

  common: {
    lastUpdated: (date: string) => `Last updated: ${date}`,
    goHome: 'Go Home',
    close: 'Close',
    openInApp: 'Open in SpySocial',
    appStore: 'Download on the App Store',
    googlePlay: 'Get it on Google Play',
    /** On an iPhone, under Open in SpySocial. */
    noAppIos: "Don't have the app? Download",
    /** On an Android phone, under Open in SpySocial. */
    noAppAndroid: "Don't have the app? Get it",
    playInBrowser: 'Play in Your Browser',
  },

  /** The store badges: the small line over the store's name, as each store words its badge in the language. */
  badges: {
    /** The line over the store's name ('' if the store's badge has none in the language). */
    appStoreSmall: 'Download on the',
    /** The store's name as the badge writes it (French: l’App Store). */
    appStoreName: 'App Store',
    /** A line under the name, where the store's badge puts its words after it (Chinese: 下载). Usually ''. */
    appStoreAfter: '',
    appStoreLabel: 'Download on the App Store',
    playSmall: 'Get it on',
    playName: 'Google Play',
    /** A line under the name (Hindi: पर पाएं). Usually ''. */
    playAfter: '',
    playLabel: 'Get it on Google Play',
  },

  home: {
    hero: {
      eyebrow: 'The party game of social deception',
      /** The poster line, set huge. Short and punchy: it must fit a 320 px phone. */
      title: 'Trust no one',
      /** The full stop after it, in the accent colour (your language's own mark). */
      titleMark: '.',
      lede: '<b>Find the spy — or fool everyone trying.</b> One of your friends is the spy. Everyone else knows the secret location. Ask questions or draw clues, then vote before the spy works out where you are.',
      facts: ['3–21 players', 'Real-time multiplayer', 'Free to play'],
      browser: 'Play in your browser',
      joinCode: 'Join with a room code',
    },
    /** A creator's YouTube Short under the hero (LIVE.creatorShort). The page fills in the creator's name. */
    creatorShort: {
      eyebrow: 'Creator spotlight',
      title: (creator: string) => `Watch ${creator} play Spy Sketch`,
      credit: (creator: string) => `Video by <link>${creator}</link>`,
      cta: 'Play free in your browser',
      play: (creator: string) => `Play ${creator}'s video`,
      consent: 'Pressing play loads the video from YouTube, which may set cookies. <link>Privacy Policy</link>',
    },
    lineup: {
      group: 'A line-up of five agents. Tap one to accuse them.',
      accuse: (n: number) => `Accuse suspect ${n}`,
      wasSpy: (n: number) => `Suspect ${n} was the spy`,
      isLocal: (n: number) => `Suspect ${n} is a Local`,
      /** The stamps on an accused suspect (short: they sit on a figure). */
      stampSpy: 'Spy!',
      stampLocal: 'Local',
      tap: 'Tap a suspect to accuse',
      /** The Easter egg (owner 2026-10-17): the spy accused on the very first try shows the reward code SPOTTED. */
      eggFound: 'Sharp eye! You spotted the spy on your first try.',
      eggWhere: 'Your code for a secret title in the app (Account > Settings > Enter a Code):',
    },
    how: {
      eyebrow: 'How it plays',
      title: 'Talk your way out. Or draw.',
      sub: 'Two games, one rule: everyone at the table knows the secret except the spy.',
      talk: {
        secret: 'The secret is a location',
        name: 'Spy Talk',
        text: 'Take turns asking and answering one question each. Too vague and you look like the spy. Too obvious and the spy finds out where you are.',
        alt: 'Spy Talk: each player asks one question and another player answers',
      },
      sketch: {
        secret: 'The secret is a word',
        name: 'Spy Sketch',
        text: 'Take turns drawing it on one shared whiteboard. The spy draws along without knowing what it is, and hopes nobody notices.',
        alt: 'Spy Sketch: players take turns drawing the secret word while the spy fakes it',
      },
    },
    round: {
      eyebrow: 'One round',
      title: 'Four beats',
      steps: [
        {
          title: 'The card',
          text: 'You see the secret, or a card that just says Spy.',
          alt: "Role reveal: the spy's card says Spy, so they have to find out where everyone is",
        },
        { title: 'The questions', text: 'Prove you know it without giving it away.', alt: 'The question card mid-round' },
        { title: 'The vote', text: 'Call a vote on whoever sounds off.', alt: 'Voting: everyone votes for the player they suspect is the spy' },
        {
          title: 'The gamble',
          text: 'The spy can risk a guess at the secret. Right wins, wrong is out.',
          alt: 'The spy picks the location from the list to win the round',
        },
      ],
      win: 'Locals win by voting out every spy. Spies win by guessing the secret, or by staying hidden to the end.',
    },
    who: {
      eyebrow: 'Who you play with',
      titleOnline: 'Your crew. Or strangers.',
      titleCrew: 'Bring your crew.',
      sub: 'Everyone plays on their own phone or tablet, around one table or on a call.',
      privateTitle: 'Private room',
      privateText: 'Up to 21 players. Friends join with a QR code, an invite link or the room code. You pick the mode and the rules.',
      howJoin: [
        "<b>Scan</b> the QR code on the host's screen",
        '<b>Tap</b> the invite link they send',
        '<b>Type</b> the room code here or in the app',
      ],
      onlineTitle: 'Play Online',
      onlineText: 'Find a Game seats you at a table of 4 or 8. Strangers never see your name, only your Agent Color. Scheduled game nights too.',
      agentsLabel: 'Agent Colors',
      /** The names strangers see: the app's own (Agent Colours). */
      agents: {
        Teal: 'Agent Teal',
        Coral: 'Agent Coral',
        Rose: 'Agent Rose',
        Lime: 'Agent Lime',
        Yellow: 'Agent Yellow',
        Lilac: 'Agent Lilac',
        Blue: 'Agent Blue',
        Mint: 'Agent Mint',
      },
      needsAccount: 'Play Online needs a free account.',
    },
    joinForm: {
      label: 'Room code',
      button: 'Join',
      note: "The code on the host's screen, 4 to 8 letters and numbers.",
    },
    langs: {
      eyebrow: 'Ten languages',
      title: 'Same table. Your language.',
      sub: 'Every player sees the game in their own language, the secret included.',
      listLabel: 'Languages',
      chatAlt: 'Chat translation: a Spanish message in the lobby chat shown in English',
      chatAuto: 'Chat too: a message in another language is translated into yours as it arrives.',
      chatTap: 'Chat too: tap Translate on any message to read it in yours.',
      trioLabel: 'One role card in three languages',
      cardAlts: [
        "Role reveal: a Local's card shows the secret location, Theater",
        'Role card in Spanish: Teatro',
        'Role card in Russian: Театр',
      ],
    },
    safety: {
      title: 'For ages 13 and up',
      /** Which report tools the app has decides the sentence. */
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Report or block any player${
          o.messages && o.drawings
            ? ', and report a message or a drawing'
            : o.messages
              ? ', and report a message'
              : o.drawings
                ? ', and report a drawing'
                : ''
        }. Rooms with a player under 18 block links, email addresses, phone numbers and social accounts for everyone, and reports involving a player under 18 are read first.`,
      rules: 'Community rules',
      childSafety: 'Child safety',
      safety: 'Safety',
      privacy: 'Privacy',
    },
    shop: {
      eyebrow: 'The shop',
      title: 'Wear the alibi',
      text: "The TRUST NO ONE. hoodie, the I'm Not the Spy tee and more. Printed and shipped by our shop partner.",
      cta: 'Visit the shop',
      hoodieAlt: "The hoodie's back print: TRUST NO ONE. with the spy head peeking over the top",
      teeAlt: "The tee's back print: (I WAS THE SPY 😂)",
    },
    final: {
      title: 'Your table is waiting',
      text: 'Free to play, no ads.',
      /** Shown once the released app sells memberships (LIVE.purchases). The only things sold are memberships. */
      purchases: 'Optional memberships if you want more places and words.',
    },
  },

  /** The Community Rules (part of the Terms of Service). */
  rules: {
    title: 'Community rules',
    intro: (o: { onePool: boolean; photos: boolean }) =>
      `Public rooms${o.onePool ? " (Play Online's tables and our game nights)" : ''} put you in a game with people you don't know. These rules keep it fun for everyone. They apply to names,${o.photos ? ' photos,' : ''} chat, drawings and how you play, in public and private rooms, and they're part of our <link>Terms of Service</link>.`,
    kind: {
      title: '1. Be kind',
      hate: "No hate or harassment: no insults aimed at a player, slurs, or attacks on anyone's identity.",
      sexual: (photos: boolean) => `No sexual content in chat, names${photos ? ', photos' : ''} or drawings.`,
      threats: 'No threats, and nothing that encourages anyone to hurt themselves.',
      selfHarm:
        'Nothing that encourages, promotes or gives instructions for suicide, self-harm, eating disorders or dangerous challenges. This goes for everyone, in every room.',
    },
    bluff: {
      title: "2. Bluff, don't cheat",
      lying: 'Lying and bluffing are the game. They are never a reason to report anyone.',
      cheating: 'Revealing the word or location, or agreeing with other players outside the game, is cheating.',
      leaving: 'Leaving games on purpose, going idle or stalling a round spoils it for the rest of the room.',
      online: (onePool: boolean) =>
        `In Play Online, missing a start or leaving a game that has started gives you a short break from ${onePool ? 'Play Online' : 'public games'} (5 minutes, longer if you keep leaving).`,
    },
    privacy: {
      title: '3. Keep it private',
      personal: "Don't share real names, addresses, phone numbers or social handles, yours or anyone else's.",
      spam: 'No ads, spam or links in public rooms.',
      minors:
        "In any room with a player under 18, links, email addresses, phone numbers and social accounts are blocked for everyone. At Play Online tables and game nights they're always blocked.",
    },
    reports: {
      title: '4. A person reads reports',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Long-press a player to report or block them.${
          o.messages ? ' Long-press a message, question or answer to report it: the report includes it and the chat around it.' : ''
        }${o.drawings ? ' You can also report a drawing.' : ''} A person reads every report within 24 hours. Public chat is kept for 14 days so reports can be checked; the player you report isn't told who sent it.`,
    },
    /** Section 5, once members can make packs (LIVE.customPacks); `community` shows once Community Packs are live (LIVE.communityPacks). */
    packs: {
      title: '5. Custom packs',
      intro: 'The packs members make follow these rules too: the name, the description and every entry.',
      rules: [
        'Nothing these rules ban anywhere else: no hate, sexual content or threats, and nothing unsuitable for players 13 and older.',
        'No personal information and no real people you know: no classmates, teachers or neighbors, and no addresses, phone numbers, schools or social handles.',
        'No ads, links or spam, and only your own work.',
      ],
      community:
        'Community Packs: a person on our team reads every pack before anyone else can see it. We can turn a pack down, take it out of Community Packs, or stop an account from sharing packs if it breaks these rules. Any player can report a Community Pack, and a person reads every report within 24 hours.',
      /** Swearing (owner 2026-10-28; app server 20261201790000_pack_swear_mask), shown with `community`. */
      swearing:
        "Swearing: fine in the packs you play in your own private rooms, never in Community Packs, because players under 18 use them. If a title has a swear in it (a movie's, say), Community Packs show it censored: its first letter, then asterisks (S***). Strong swear words aren't allowed there at all.",
    },
    child: {
      title: 'Child safety',
      text: 'We never allow sexual content involving anyone under 18, or anyone trying to groom, sexualize or exploit a child. We remove it, ban the accounts involved, and report it to the National Center for Missing & Exploited Children (NCMEC) as the law requires. If you see anything like this, email <email/> with "Child safety" in the subject, and report the player in the app if you shared a room with them. You can also report it directly to NCMEC\'s <link>CyberTipline</link> (1-800-843-5678). If a child is in immediate danger, call your local emergency number first. Our <link2>Child Safety Standards</link2> say more.',
      /** The email's subject line (English, so our inbox sorts it). */
      subject: 'Child safety',
    },
    breaking: {
      title: 'What happens when someone breaks the rules',
      text: "Usually a warning first. Repeated or serious problems lead to a chat mute (1 hour to 7 days), a pause from public rooms and Game Nights (1 to 30 days), or a ban. Sharing someone's personal information, or anything that sexualizes a child, can mean an immediate ban. Every notice in the app says what is limited, why, and until when, with an ID like S-207.",
      drawings:
        "Drawings in public rooms and at Game Nights may be checked automatically at any time, and reported drawings are checked too. If a drawing you made breaks these rules, your account can be paused or banned from public rooms and Game Nights, however long you've played. In a public room, a turn that breaks these rules is taken off the drawing and counts as a strike: a warning first, then 3, 7 and 30 days without public rooms and Game Nights, and at the fifth strike in 90 days, for good. In any room, a hate symbol (a swastika counts, unless the round's word makes a religious meaning clear), a written slur or hate aimed at someone removes the player from the game and from public rooms and Game Nights for good, and a drawing that sexualizes a child ends the account and is handled as Child safety says above. Gore and monsters are fine. In a private room, a reported drawing is acted on automatically only when it's that serious; anything else is up to the person who reads the report. To appeal, email us the code from your notice.",
      drawingsTesters:
        'For now, while we test it, the automatic drawing check runs only in games where every player is one of our testers (players trying a test version of the app).',
    },
    age: { title: 'Age', text: 'SpySocial is for players 13 and older.' },
    appeal: {
      title: 'Think we got it wrong?',
      text: 'Email <email/> and quote the ID from your notice. See also the <link>Terms of Service</link> and <link2>Privacy Policy</link2>.',
    },
  },

  /** The Safety page, for teens and for parents and carers. */
  safety: {
    title: 'Safety at SpySocial',
    intro:
      "SpySocial is a party game for players 13 and older. This page is for teens who play it, and for parents and carers who want to know what it's like. Jump to: <link>players 13 to 17</link>, <link2>parents and carers</link2>, <link3>child safety contacts</link3>, <link4>places to get help</link4>.",
    danger: {
      title: 'Is someone in danger right now?',
      text: 'Call your local emergency number: 999 in the UK, 911 in the US, 112 in the EU. Then report it to us.',
    },
    teens: {
      title: 'For players 13 to 17',
      intro: "SpySocial should be fun. If someone makes you feel uncomfortable, scared or upset, you can do something about it straight away, and you won't be in trouble for it.",
      leave: {
        title: 'Leave',
        text: 'You can always leave a room or a game: tap <b>Leave</b>. Your safety matters more than any game.',
        online: (onePool: boolean) =>
          `In Play Online, leaving a game that has started gives you a short break from ${onePool ? 'Play Online' : 'public games'}. Leave anyway, and report the player if they were the reason.`,
      },
      block: {
        title: 'Block',
        text: "Long-press the player and tap <b>Block</b>. You won't see their chat, and neither of you can join a room the other is in. They aren't told. You can unblock them any time in Settings, under Privacy & Safety: Blocked Players.",
      },
      report: {
        title: 'Report',
        text: "Long-press the player, or something they wrote in the chat, and tap <b>Report</b>. Pick what happened, add details if you like, and send. We attach the chat for you, so you don't need screenshots.",
      },
      tell: {
        title: 'Tell someone',
        text: "Talk to a parent, a carer, a teacher or another adult you trust. If you'd rather talk to someone you don't know, the <link>helplines below</link> are free and confidential.",
      },
      afterTitle: 'What happens after you report',
      after: [
        'A person, not a robot, reads every report within 24 hours. Reports about child safety, self-harm, sexual content or personal information are read first, and so are reports involving a player under 18.',
        "The player you report isn't told who reported them.",
        'If they broke the rules, we may warn them, mute their chat, pause them from public rooms, or ban them.',
        "We don't send you the outcome, but every report is read and acted on.",
        "Bluffing and lying about your role are part of the game, so they're not something to report.",
      ],
      neverTitle: "It's never OK if someone",
      never: [
        'asks how old you are, where you live or which school you go to',
        'asks for photos, or for your phone number or social media, or to talk in another app',
        'talks about sex, or sends sexual messages or drawings',
        'offers you gifts or money, or asks you to keep a secret',
        'tells you to hurt yourself, or bullies you',
      ],
      neverWhat:
        "Block them, report them (choose <b>Child Safety</b> if they're asking for photos, sexual talk or meeting up), and tell an adult you trust. Keep your real name, address, school, phone number and social media to yourself, and never share your password: nobody from SpySocial will ever ask for it.",
    },
    parents: {
      title: 'For parents and carers',
      intro:
        "SpySocial is a party game of bluffing and deduction: one or more players are secretly spies, and everyone tries to work out who. Each player uses their own phone, in the same room or far apart. Teens need a parent's or guardian's permission to play (see our <link>Terms of Service</link>, section 2).",
      hasTitle: 'What SpySocial has',
      chat: "<b>Text chat inside a room:</b> the room's chat, the game chat, a private chat for the spies when a game has more than one, and a chat for players who are out. Chat is deleted about 24 hours after it's sent in a private room, and 14 days after in a public room.",
      sketch: '<b>Spy Sketch:</b> players take turns drawing with a finger.',
      names: (o: { avatars: boolean; photos: boolean }) =>
        `<b>Names and pictures:</b> ${
          o.avatars
            ? o.photos
              ? 'a display name, a username and an avatar built from parts the app offers. Versions of the app before 2.2 can still add a profile photo.'
              : "a display name, a username and an avatar built from parts the app offers. Players can't add photos."
            : 'a display name, a username and an optional profile photo.'
        }`,
      private: "<b>Private rooms:</b> only people with the room's code, link or QR code can join, and the host can remove a player.",
      publicOnePool:
        "<b>Public rooms</b> with players your child doesn't know: Play Online's tables, where the app seats players automatically and everyone plays by the same standard rules, and game nights we host at a set time. Players can't create public rooms, and no player hosts one.",
      public: (playOnline: boolean) =>
        `<b>Public rooms and Game Nights</b> with players your child doesn't know${playOnline ? ', including Play Online, which seats players at a table automatically' : ''}.`,
      buy: '<b>Things to buy:</b> packs and memberships, through the App Store or Google Play.',
      /** `buy` once only memberships are sold (LIVE.membershipsOnly). */
      buyMembers:
        "<b>Things to buy:</b> only memberships (the Pack Pass, monthly or yearly, and Lifetime), through the App Store or Google Play. A membership unlocks the packs that aren't free; nothing else is sold.",
      /** Once Intercepts are live (LIVE.intercepts). Use the app's own word for Intercepts. */
      intercepts:
        "<b>Intercepts:</b> rewards earned by playing, each holding one random item, such as a new look for the player's agent. They can't be bought, with money or with the currency players earn in the game, and the app shows the odds before one is opened.",
      /** `intercepts` once unopened Intercepts trade on the Black Market (LIVE.interceptsMarket). */
      interceptsMarket:
        "<b>Intercepts:</b> rewards earned by playing, each holding one random item, such as a new look for the player's agent. Nobody sells them for money, neither we nor other players. Adults can also buy and sell unopened ones with each other on the Black Market for the currency earned in the game, which can't be bought; players under 18 can't. The app shows the odds before one is opened.",
      /** Home's Discord pill (LIVE.homeDiscord; under 16 never, 16-17 a safety note first). */
      discord:
        "<b>A link to our Discord:</b> Home can show a link to SpySocial's official Discord server, where players find others to play with. Discord is a separate app with its own rules and minimum age. Players under 16 never see the link, and players 16 and 17 first see a note on staying safe there. Our moderators look after the server, but nobody at SpySocial can see private messages on Discord.",
      /** Once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
      customPacks: (community: boolean) =>
        `<b>Custom packs:</b> members can make their own packs of locations or words for their private rooms.${
          community ? ' Every pack shared to Community Packs is read by our team before anyone else can see it, and any player can report one.' : ''
        }`,
      hasNotTitle: "What SpySocial doesn't have",
      noDms:
        "No direct messages: players can only chat inside a room, with the players in it. The spies' chat lasts one game and is filtered, stored and reportable like the rest.",
      noFriends:
        'No friend or follower lists, no player search, no profiles to browse and no bios, so nobody can look your child up or contact them outside a room.',
      /** Once friends, follows and parties are live (LIVE.socialFeatures): in place of noDms and noFriends. */
      noDmsSocial:
        "No direct messages: players chat only inside a room, with the players in it, or in a party's chat, with the friends in that party. Every chat is filtered, kept for a while and can be reported.",
      noSearch:
        "No player search and no friend suggestions, so a stranger can't look your child up. Players under 18 have no public profile and can't be followed.",
      /** What SpySocial has, once live: social (LIVE.socialFeatures), trading (LIVE.trading with LIVE.blackMarket). */
      social:
        "<b>Friends and parties:</b> players can add friends and play together as a party, with a filtered party chat. An adult can add a player under 16 only in person, by scanning the Friend Code on the child's phone. Players under 18 have no public profile, can't be followed and get no social notifications at night. On iPhone, this stays off for players under 18 for now.",
      trading:
        "<b>Trading:</b> players 13–17 can trade game items only for other items, with friends they added in person, with no gifts and no messages. Adults can also buy and sell items for the currency earned in the game on the Black Market; players under 18 can only look. Nothing can be bought or sold for real money.",
      noVoice: (photos: boolean) =>
        `No voice or video chat: the microphone button only turns speech into text, and other players never hear anyone's voice.${photos ? '' : ' No photo or video uploads either.'}`,
      noLocation: 'No location sharing and no ads.',
      safeTitle: 'How we keep it safe',
      age: (o: { gate: boolean; under13Deletion: boolean; storeSignals: boolean }) =>
        `<b>Age:</b> SpySocial is for players 13 and older.${
          o.gate ? ` Before the first game, the app asks for a birth year${o.under13Deletion ? ', and an answer under 13 deletes the account' : ''}.` : ''
        }${o.storeSignals ? " If Apple or Google tells the app that its user is under 13, the app doesn't let them play." : ''} We don't verify ages, so if you find that a child under 13 has an account, email us and we'll delete it.`,
      publicRooms:
        "<b>Public rooms</b> need a saved account with a confirmed email address, an age of 13 or older and agreement to our Community Rules. Guests can play only in private rooms, and players with a pause or a ban can't join public rooms.",
      filter:
        "<b>Chat filter:</b> names and chat are checked before anyone sees them. In public rooms, slurs, explicit sexual words and insults are blocked. In private rooms, the most serious words are blocked. In any room with a player under 18, links, email addresses, phone numbers and social accounts are blocked for everyone. At Play Online tables and game nights they're always blocked.",
      reports:
        "<b>Reports, blocks and penalties:</b> a person reads every report within 24 hours, and the reported player isn't told who sent it. Reports involving a player under 18 are read first. Penalties go from a warning to a chat mute, a pause from public rooms, or a ban. Our <link>Community Rules</link> list what isn't allowed.",
      drawingCheck:
        '<b>Drawing check:</b> drawing turns in a public room may be checked automatically, and a turn the check finds breaks the rules is taken off the drawing.',
      buyTitle: 'Buying',
      buyText:
        "Teens need a parent's or guardian's permission to buy anything. Purchases go through the App Store or Google Play, so their parental controls, such as Apple's Ask to Buy and purchase approvals in Google Family Link, work as usual. A Pack Pass renews until it's cancelled in the store's settings.",
      deleteTitle: 'Deleting an account',
      deleteSteps: (o: { avatars: boolean; oldApps: boolean }) => [
        'Open SpySocial.',
        `Tap the ${o.avatars ? 'avatar' : 'picture'} at the top of the home screen to open <b>Account</b>.${
          o.oldApps ? ' (In versions before 2.2, Account is the icon at the bottom right of the home screen.)' : ''
        }`,
        `Tap <b>Settings</b> at the top right, then, under <b>Account & Sign-In</b>, <b>Delete Account</b> (the last row). A guest account is deleted with <b>Sign Out</b> instead, in the same place.${
          o.oldApps ? ' (In versions before 2.2, Delete Account is in the Danger Zone at the bottom of Account.)' : ''
        }`,
      ],
      deleteEmail:
        'Or email <email/> from the address on the account, with the subject "Delete my SpySocial account". If you can\'t write from that address, email us anyway with the username and we\'ll help. Our <link>Delete Account</link> page says what\'s deleted and what we keep.',
      /** The email's subject line (English, so our inbox sorts it). */
      deleteSubject: 'Delete my SpySocial account',
      /** For parents: their child's data rights (copy, birth-year correction, deletion), pointing to Privacy's Children's Privacy. */
      dataRequests:
        "<b>Your child's data:</b> as a parent or guardian, you can ask us for a copy of your child's account data, to correct its birth year, or to delete the account. Our <link>Privacy Policy</link> (Children's Privacy) explains how we confirm a request and what it covers.",
      contactTitle: 'Contact us',
      contact: (section: number) =>
        `Email <email/> about anything on this page. For anything about a child's safety, put "Child safety" in the subject and we'll deal with it first. To appeal a decision or make a complaint, including about how we meet the UK's Online Safety Act, see section ${section} of our <link>Terms of Service</link>.`,
    },
    contactsTitle: 'Child safety contacts',
    contactsAfter: 'Our <link>Child Safety Standards</link> set out what we prohibit, how to report it and what we do about it.',
    helpTitle: 'Places to get help',
    helpIntro: "If you're struggling, or you're worried about someone, these services are free and confidential, and you can talk to them about anything.",
    tableWho: 'Who',
    tableHow: 'How',
    helplines: {
      childline: {
        note: 'UK, for anyone under 19',
        text: "Call <b>0800 1111</b>, free, any time, or chat with a counsellor online at <link>childline.org.uk</link>. Calls don't show on your phone bill.",
      },
      samaritans: { note: 'UK and Ireland, any age', text: 'Call <b>116 123</b>, free, any time, day or night (<link>samaritans.org</link>).' },
      lifeline: { note: 'US', text: 'Call or text <b>988</b>, or chat at <link>988lifeline.org</link>, free, any time.' },
      findHelpline: {
        note: 'Every other country',
        text: '<link>findahelpline.com</link> finds free, confidential helplines in more than 175 countries, by phone, text or chat.',
      },
    },
    contacts: {
      danger: {
        label: 'A child is in danger right now',
        text: 'Call the police: <b>999</b> in the UK, <b>911</b> in the US, <b>112</b> in the EU, or your local emergency number. Do this first, before anything else on this page.',
      },
      ncmec: {
        note: 'Child sexual exploitation, from any country',
        text: 'Report online at <link>report.cybertip.org</link>, or call 1-800-843-5678 (1-800-THE-LOST), any time. Run by the National Center for Missing & Exploited Children.',
      },
      ceop: {
        note: 'In the UK',
        text: "If you're worried about online sexual abuse, or about the way someone has been talking to a child online, report it to CEOP, part of the National Crime Agency: <link>ceop.police.uk/Safety-Centre</link>. Young people can report too, and a Child Protection Advisor reads every report.",
      },
      spysocial: {
        text: 'Report the player in the app and choose <b>Child Safety</b>, and email <email/> with "Child safety" in the subject. We remove the content, ban the accounts involved, and report it to NCMEC and other authorities as the law requires.',
      },
    },
    seeAlso: 'See also our <link>Community Rules</link>, <link2>Terms of Service</link2> and <link3>Privacy Policy</link3>.',
  },

  support: {
    title: 'How can we help?',
    sub: "We're here to help with any questions or issues you have with SpySocial.",
    emailUs: 'Email us',
    respond: 'We typically respond within 24 hours',
    copy: (email: string) => `Copy ${email}`,
    copied: 'Email copied!',
    copyFailed: 'Failed to copy',
    quickLinks: 'Quick links',
    faqLink: 'FAQ & Troubleshooting',
    rate: 'Rate us on the App Store',
    ratePlay: 'Rate us on Google Play',
  },

  /**
   * The /ledger page's Supply table and its search, sort and pages (the rest of that page is English only). Item names
   * come from public/ledger/names (the app's own). Numbers and dates arrive formatted.
   */
  ledger: {
    head: ['Collectible', 'Supply and status'],
    supply: (minted: string, burned: string, held: string) => [`${minted} minted`, `${burned} burned`, `${held} held`],
    neverAwarded: 'Never awarded',
    closed: (date: string, entry: string) => `Closed ${date} (entry ${entry})`,
    openUntil: (date: string) => `Open until ${date}`,
    search: 'Search collectibles',
    searchHint: 'Try “border” or “title”',
    clear: 'Clear',
    sort: 'Sort',
    sortBy: { newest: 'Newest first', name: 'Name (A–Z)', minted: 'Most minted', held: 'Most held' },
    count: (from: string, to: string, total: string) => `${from}–${to} of ${total}`,
    noMatch: (query: string) => `Nothing matches “${query}”.`,
    pages: 'Supply pages',
    prev: 'Previous',
    next: 'Next',
    page: (n: string, total: string) => `Page ${n} of ${total}`,
  },

  whatsNew: {
    title: "What's New",
    sub: 'Release notes for SpySocial. Major updates, new features, and improvements as we ship them.',
    /** The release notes, newest first, in players' words: what changed for a player, never a library, file or error name. Keep every array's length and order. */
    releases: [
      {
        tag: "Android Launch",
        summary:
          "SpySocial is now on Google Play, with a round of fixes from testing on real Android phones.",
        sections: [
          {
            label: "Now Available",
            items: [
              { title: "Android", text: "On Google Play from June 13, 2026." },
              { title: "iPhone and iPad", text: "The same fixes are on the App Store." },
            ],
          },
          {
            label: "Fixes",
            items: [
              { title: "Delete Account", text: "The button is no longer cut off at the bottom of the Account screen." },
              { title: "Lobby buttons", text: "Leave Room and Start Game no longer sit under Android's navigation bar." },
              { title: "Start Game", text: "If the game can't start yet, it tells you why: it needs at least 3 players, everyone ready and at least one category." },
              { title: "Categories", text: "The back button and the title no longer crowd each other." },
              { title: "How to Play", text: "One back button on Android, not two." },
              { title: "Tutorial", text: "You can skip it from any step, not only the first." },
              { title: "Guest accounts", text: "The reminder to save your guest account now reads as an invitation, not a warning." },
              { title: "Icons", text: "Game results and How to Play use icons that look the same on every Android phone." },
              { title: "Faster fixes", text: "Small fixes can now reach the app without waiting for a store update." },
            ],
          },
        ],
      },
      {
        tag: "Polish Update",
        summary:
          "A polish update: a new Welcome screen, fresh Game Over and Account screens, a better layout on iPad, and a batch of fixes.",
        sections: [
          {
            label: "New Features",
            items: [
              { title: "New Welcome screen", text: "A fresh look, clear Log In and Sign Up buttons, and a simple Continue as Guest link." },
              { title: "Saving a guest account", text: "While you wait for the confirmation email, the Account screen shows where you are, with Resend, Cancel and Refresh." },
            ],
          },
          {
            label: "New Look",
            items: [
              { title: "Game Over", text: "New player cards, a trophy for the winners, the location with a map pin, and a clear Return to Lobby button." },
              { title: "Account", text: "One tidy list with clear sections, and the Danger Zone at the bottom." },
              { title: "iPad", text: "Better use of the big screen: six player cards across in the lobby, bigger player tiles in the game, and nothing cut off." },
            ],
          },
          {
            label: "Android Fixes",
            items: [
              { title: "Back gesture", text: "Swiping back (or pressing Back) during a game or in the lobby now asks before you leave, like the Leave button." },
              { title: "Cards", text: "Vote and Game Over cards no longer show a faint box inside them." },
              { title: "Game Over", text: "No more gap under the header." },
              { title: "Pickers", text: "The lobby settings pickers are easy to read and no longer crash the app when they close." },
            ],
          },
          {
            label: "Improvements",
            items: [
              { title: "Timers", text: "Countdowns follow the game's clock, so they stay right even when your phone's clock is off." },
              { title: "Sign-up and email", text: "Signing up, resending the confirmation, resetting your password and changing your email are more reliable." },
              { title: "Support emails", text: "If your phone has no mail app, tapping a support address copies it instead of showing an error." },
              { title: "Languages", text: "Everything new is in English, Spanish and Russian." },
            ],
          },
        ],
      },
      {
        tag: "Major Update",
        summary:
          "Online play rebuilt from the ground up: every screen redesigned, steadier connections, and a stack of new features.",
        sections: [
          {
            label: "New Features",
            items: [
              { title: "Tutorial and profile", text: "New players get a walk-through of the game and set up their profile in a moment." },
              { title: "Notebook", text: "Jot down who said what during the round. Players you have notes on come first, players who are out go last." },
              { title: "Hint translation", text: "If the game is in another language, tap a hint to read it in yours. Everyone at the table still gets the same hint." },
              { title: "Pokes", text: "Tap a player's card in the lobby to poke them." },
              { title: "QR codes", text: "Share a room from your phone's share sheet, with a QR code to scan." },
              { title: "Room links", text: "A room link opens the app and takes you straight into the room, even if the app was closed." },
              { title: "Shorter room codes", text: "5 characters, easier to read out loud. Old 6-character codes still work." },
              { title: "Who called the vote", text: "A lobby setting that shows who started each vote." },
              { title: "End the game", text: "The host can end a game early." },
              { title: "More locations", text: "A new pack of locations to play." },
              { title: "Leave button", text: "Leave a game in one tap." },
            ],
          },
          {
            label: "New Look",
            items: [
              { title: "", text: "A new lobby with interactive player cards and redesigned settings." },
              { title: "", text: "Redesigned game, voting and vote results screens. Voting shows who called the vote and how it's going." },
              { title: "", text: "Role reveal shows who you're waiting for, and now lasts 60 seconds." },
              { title: "", text: "Home cards fit their text." },
              { title: "", text: "Every in-game screen has the same dark header." },
              { title: "", text: "The offline banner looks the same on every screen and no longer runs into the Dynamic Island." },
              { title: "", text: "The Account screen shows a clear message when you're offline." },
            ],
          },
          {
            label: "Improvements",
            items: [
              { title: "Connections", text: "After your phone sleeps for a long time, the app no longer wrongly says you're offline." },
              { title: "", text: "While you're offline, the Play screen retries every 5 seconds and no longer looks as if you've been signed out." },
              { title: "", text: "Steadier live play in the lobby, role reveal, game, voting and results." },
              { title: "", text: "The game timer follows the game's clock, not your phone's." },
              { title: "", text: "Better at reconnecting when you lose signal." },
              { title: "", text: "Sign-up, password reset and saving a guest account are more reliable." },
              { title: "", text: "Clearer messages on the Account screen." },
              { title: "", text: "English, Spanish and Russian everywhere, including all 171 hint suggestions." },
              { title: "", text: "Notebook: the keyboard no longer pops up when you pick a player." },
              { title: "", text: "Hints: tapping a hint no longer swaps it by accident. Use the reload button for a new one." },
              { title: "", text: "Ready for iOS 26." },
            ],
          },
          {
            label: "Bug Fixes",
            items: [
              { title: "", text: "Fixed a rare mix-up when a vote and the end of the game happened at the same time." },
              { title: "", text: "Fixed votes being counted twice, and votes ending at the wrong moment." },
              { title: "", text: "Fixed how abstaining counts. Abstain now sits with the other vote buttons." },
              { title: "", text: "Fixed the header covering the guess results." },
              { title: "", text: "Fixed a flicker when the game screen opens." },
              { title: "", text: "Fixed saving a guest account signing you out." },
              { title: "", text: "Fixed the email field on the Account screen." },
              { title: "", text: "Fixed cut-off text on home cards and in Spanish headers." },
            ],
          },
        ],
      },
      {
        tag: 'Initial Release',
        summary: 'First public release of SpySocial on the App Store.',
        sections: [] as { label: string; items: { title: string; text: string }[] }[],
      },
    ],
  },

  /**
   * The roadmap (/roadmap): what 2.2 brings on the launch day, then what's planned, with no other dates. Short and
   * player-facing, in the app's own words (the stores' 2.2 What's New). Say "planned", never promise.
   */
  roadmap: {
    eyebrow: 'Roadmap',
    /** The poster line, set huge, before the home hero's full stop (home.hero.titleMark). Short: it must fit a 320 px phone. */
    title: "What's coming",
    /** Under it until 2.2 is out. `day` is the launch day in the page's language, without the year ("December 8", "8 декабря"). */
    lede: (day: string) => `SpySocial\u00A02.2 lands on ${day}. See what's in it, and what we're building next.`,
    /** The same once 2.2 is out. */
    ledeOut: "SpySocial\u00A02.2 is out now. See what's in it, and what we're building next.",
    now: {
      /** Over the 2.2 heading until it's out (a short label in capitals). */
      coming: (day: string) => `Coming ${day}`,
      /** The same label once it's out. */
      out: 'Out now',
      title: 'SpySocial 2.2',
      sub: 'Our biggest update yet.',
      /** The cards, in this order: the page gives them their icons by position. Button names are the app's. */
      features: [
        {
          title: 'Play Online',
          text: 'Tap Find a Game for a table of 4 or 8 players, with the same standard rules for everyone. Catch a spy and everyone gets their vote call back; once nobody has one left, the game goes straight to its end. All you need is a free account.',
        },
        { title: 'Spy Sketch', text: 'A new way to play: draw the secret word on one shared whiteboard, and catch the spies faking it.' },
        {
          title: 'Automatic translation',
          text: 'Chat in the lobby and during the game, in any of 10 languages: messages in other languages translate into yours as they arrive. Spy Talk answers are translated together with their question, so they keep their meaning.',
        },
        {
          title: 'Your agent and the Shop',
          text: "Build your own spy avatar, and earn new looks by playing. The Shop sells only memberships, which unlock every pack and let you make your own: all optional, and none of it changes how the game plays.",
        },
        { title: 'Game nights', text: "Scheduled online games. Tap Remind Me and we'll remind you before they start." },
        {
          title: 'Agent Colors',
          text: 'At Play Online tables and game nights, strangers see your Agent Color, like Agent Teal, never your name. Pick your three favorite colors.',
        },
        {
          title: 'Creator codes',
          text: 'Got a code from a creator or from SpySocial? Enter it in Settings for a title or another reward.',
        },
        {
          title: 'Music and sounds',
          text: 'Three lounge songs take turns in the menus, Spy Talk and Spy Sketch each have a song of their own, and new sounds mark the final seconds, the Spy Sketch reveal and the win. Pick your menu song in Settings, or turn the music off.',
        },
        {
          title: 'Recommended game time',
          text: "Your room's rules show a recommended game time for the number of players, in Spy Talk and Spy Sketch. The host still decides.",
        },
        {
          title: 'Safety built in',
          text: 'SpySocial is for ages 13 and up. Chat has a word filter, you can report or block any player, and rooms with a player under 18 block links, phone numbers and social accounts in chat.',
        },
      ],
      /** One line under the cards. */
      more: 'Plus Player Stats, titles and borders to unlock, levels up to 100 with prestige, XP for quick games too, smooth rejoining after your phone sleeps, invite links that just work, and a new look on every screen.',
      /** Added to the Game nights card once LIVE.launchGameNights is on (owner to OK the days first). If a day or
       * hour changes, change it in all 10 languages. */
      launchWeek: 'Launch week: Spy Talk on Tuesday, December 8, Spy Sketch on Friday, December 11, and Spy Mafia on Saturday, December 12, each from 8 to 10 PM ET.',
    },
    next: {
      /** A stamp: these are plans. */
      status: 'Planned',
      noDates: 'No dates yet',
      title: 'Up next',
      sub: "After 2.2, we're building the competitive side of SpySocial.",
      /** In this order (icons by position): ranked, seasons, tournaments. */
      plans: [
        {
          title: 'Ranked',
          text: 'Play ranked games for a rank that shows on your profile. Matchmaking puts you with players near your rank.',
        },
        {
          title: 'Seasons',
          text: 'Each season comes with its own rewards, like titles and borders, for the rank you reach and the games you play.',
        },
        {
          title: 'Tournaments',
          text: 'Sign up ahead for a scheduled tournament and play knockout rounds at small tables. Winners move on, round by round, to the final table, with rewards for placing.',
        },
      ],
    },
    /** The last line, over the social accounts. */
    outro: 'Plans can change. Follow us for news.',
  },

  join: {
    title: 'Join Game',
    noCode: 'No room code provided',
    browserOrPhone: 'Play in your browser, or on your phone with the app',
    openToJoin: 'Open SpySocial to join the room',
    onPhone: 'Open this link on your phone to join the room',
    roomCode: 'Room Code',
    /** Under the store button on a phone: there is no deferred link, so the invite has to be tapped again. */
    afterInstall: "After installing, tap the invite link again.",
  },

  joinEvent: {
    label: 'Public Game Night',
    broken: "This Game Night link doesn't work",
    brokenHelp: 'Check it, or open SpySocial and browse rooms.',
    live: 'Live now',
    cancelled: 'Cancelled',
    ended: 'Ended',
    upcoming: 'Upcoming',
    full: 'Full right now',
    inRoom: (count: number, capacity: number) => `${count} / ${capacity} in the room`,
    yourTime: 'Your time',
    /** `who` is the host's name, or `theHost` when there's none. */
    hostTime: (who: string, when: string) => `${who}'s time: ${when}`,
    theHost: 'The host',
    hostedBy: (name: string) => `hosted by ${name}`,
  },

  resetPassword: {
    title: 'Reset Your Password',
    invalid: 'Invalid or expired reset link. Please request a new one.',
    failed: 'An error occurred. Please try again.',
    mismatch: 'Passwords do not match',
    previewSuccess: 'Preview: password reset successful',
    success: 'Password reset successful',
    error: 'Error',
    unexpected: 'Unexpected error',
    done: 'Password reset successfully!',
    redirecting: 'Redirecting...',
    newPassword: 'New Password',
    newPlaceholder: 'Enter new password',
    minLength: 'At least 6 characters.',
    confirm: 'Confirm Password',
    confirmPlaceholder: 'Confirm password',
    submit: 'Reset Password',
    cancel: 'Cancel',
    // passwordless (legalRelease LIVE.passwordless): the page that replaces the reset form.
    goneTitle: "Passwords are gone",
    goneBody: "Sign in with a one-time code in the app.",
    goneOpen: "Open SpySocial",
    goneNoApp: "Don't have the app?",
    preview: (mode: string) => `Preview mode: <b>${mode}</b>. Submitting won't hit Supabase.`,
  },

  deleteAccount: {
    title: 'Delete Your SpySocial Account',
    intro: 'You can delete your SpySocial account and the personal data linked to it at any time, in the app or by email. For any questions, contact us at <email/>.',
    appTitle: 'How to delete your account from the app',
    steps: (o: { avatars: boolean; oldApps: boolean }) => [
      'Open SpySocial.',
      `Tap your ${o.avatars ? 'avatar' : 'picture'} at the top of the home screen to open <b>Account</b>.${
        o.oldApps ? ' (In versions before 2.2, Account is the icon at the bottom right of the home screen.)' : ''
      }`,
      'Tap <b>Settings</b> at the top right.',
      `Under <b>Account & Sign-In</b>, tap <b>Delete Account</b> (the last row, in red) and confirm.${
        o.oldApps ? ' (In versions before 2.2, Delete Account is in the Danger Zone at the bottom of Account.)' : ''
      }`,
    ],
    atOnce: 'Your account is deleted at once.',
    guestTitle: 'Guest accounts',
    guest: (purchases: boolean) =>
      `A guest account is deleted the moment you tap <b>Sign Out</b> (in Settings, under Account & Sign-In; in versions before 2.2, in Account under Account & Security) and confirm. A guest can't sign back in, so there is no recovery.${
        purchases
          ? ' Purchases are the exception, as for any deleted account: anything you bought as a guest comes back with Restore Purchases, on the App Store or Google Play account you paid with.'
          : ''
      }`,
    noAppTitle: "Don't have the app installed anymore?",
    noApp: 'Email <email/> from the address tied to your account with the subject "Delete my SpySocial account". Requests are processed within 30 days.',
    deletedTitle: 'What is deleted',
    staysTitle: 'What stays, and for how long',
    details: 'Our <link>Privacy Policy</link> has the details.',
  },

  /**
   * /beta: the Beta 2 playtester page. The page fills in every date and time, already written in your language's
   * own format ("Thursday, November 12", "7:00 – 8:00 PM"): write the sentence round them. Eastern and Pacific are
   * US time zones (ET, PT); CET is Central European Time; UK is the time in the United Kingdom.
   */
  beta: {
    eyebrow: 'Beta 2 · Live playtest',
    /** The poster line, set huge: it must fit a 320 px phone. The full stop after it is home.hero.titleMark. */
    title: 'Play it first',
    lede: '<b>A $10 PayPal thank-you</b> for every confirmed player who joins the full hour of this live group playtest session of SpySocial, the free social deduction party game, and sends the 5-minute survey, the same on iPhone and Android, plus one $50 bonus for the single most useful bug report or idea from the session. Plus beta rewards you keep after launch: the Beta Pin, two titles, 10 Intercepts of each tier and a month of membership.',
    /** Short note under the lede and in the rewards: the test's progress does not carry over. */
    reset: 'Games, XP and items from the test reset at launch.',
    /** Under the lede: the store app is the old version; the beta comes from the emailed link. */
    headsUp: '<b>Heads up:</b> the SpySocial on the App Store and Google Play is an old version. The beta is a new, very different build; you install it from the link we email you.',
    /** Short facts under the lede. */
    facts: ['1 hour, live', 'Adults 18+', '24 seats', 'iPhone or Android'],
    when: {
      label: 'When',
      /** The session's hours in Eastern time ("7:00 – 8:00 PM"). */
      et: (time: string) => `${time} Eastern`,
      /** Its start in Pacific time ("4:00 PM"), then its hours in UTC with the date ("Fri, Nov 13, 00:00 – 01:00"). */
      others: (pacific: string, utc: string) => `${pacific} Pacific · ${utc}\u00a0UTC`,
      /** The same hour in the visitor's own time zone, with the zone's name ("Thu, Nov 12, 6:00 – 7:00 PM CST"). */
      yours: (time: string) => `Your time: ${time}`,
      checkIn: (time: string) => `Check-in opens at ${time} Eastern on Discord voice.`,
    },
    /** The optional second session for Europe (the owner turns it on or off). */
    europe: {
      label: 'Europe · Optional second session',
      /** The hours in Central European Time, then in the UK. */
      time: (cet: string, uk: string) => `${cet}\u00a0CET · ${uk}\u00a0UK`,
      /** `date`: the day we confirm it ("November 9"). */
      note: (date: string) => `Runs only if enough people in Europe sign up. We confirm it by ${date}.`,
    },
    signUp: 'Sign up',
    /** Under the button: how long the form takes and when sign-ups close ("Sunday, November 8", "11:59 PM"). */
    signUpNote: (day: string, time: string) => `About 2 minutes. Sign-ups close ${day}, ${time} Eastern.`,
    discord: 'Join our Discord',
    /** Shown instead of the sign-up once sign-ups have closed. */
    closed: 'Sign-ups are closed. Follow us on Discord for the next test.',
    games: {
      eyebrow: 'What you play',
      title: 'Two games',
      talk: "Questions and answers. One or two players don't know the secret place and try to blend in.",
      sketch: 'Everyone adds to the same drawing. The spies fake it.',
    },
    who: {
      eyebrow: "Who it's for",
      title: "Who we're looking for",
      adults: '<b>Adults 18+ only.</b> 24 seats.',
      /** A list of Android phone brands follows it. */
      phones: '<b>An iPhone (TestFlight) or an Android phone (Google Play testing).</b> Android phones are especially welcome:',
      androidLabel: 'Android phones we especially want',
      /** Werewolf/Mafia: the party game's name as players know it in your language. The others are brand names. */
      fans: '<b>Social deduction fans:</b> Among Us, Spyfall, Werewolf/Mafia, Blood on the Clocktower, Codenames. Beginners welcome too.',
      mic: '<b>A mic helps.</b> Listening only is OK.',
      /** The ten languages follow it, each in its own script. */
      langs: '<b>The game is in 10 languages:</b>',
      langsLabel: "The game's languages",
    },
    ask: {
      eyebrow: 'What we ask',
      title: 'Play. Talk. Tell us.',
      steps: ['<b>Play</b> for the hour.', '<b>Talk out loud</b> about anything that confuses you.', '<b>Fill in a 5-minute survey</b> afterwards.'],
      wantTitle: 'What we want to find out',
      want: ['Is it clear whose turn it is?', 'Is voting easy to understand?', 'Does drawing work on your phone?'],
    },
    get: {
      eyebrow: 'What you get',
      title: 'Beta rewards you keep after launch',
      /** The app's own names for the pin, the titles and the Intercepts. */
      items: ['The <b>Beta Pin</b>', 'The <b>Beta Tester</b> and <b>Field Tester</b> titles', '<b>10 Intercepts</b> of each tier', '<b>1 month</b> of membership'],
      prizeTitle: '$10 PayPal thank-you + one $50 bonus',
      prize: 'A $10 thank-you by PayPal for your time in the live session: every confirmed player who joins the full hour and sends the 5-minute survey gets it within 7 days of the session, the same on iPhone and Android. Installing the test build doesn\'t earn it on its own. Plus one $50 bonus (a gift card) for the single most useful bug report or idea from the session, chosen by the developer within a week.',
      /** `day`: the day we confirm seats by email ("Monday, November 9"). */
      seats: (day: string) => `24 seats. The thank-you goes only to players we confirm by email (by ${day}) who join the session; everyone else goes on the waitlist for the next test.`,
    },
    friends: {
      eyebrow: 'Friends',
      title: 'Bring a friend',
      text: "<b>Put a friend's name on the form</b> to sit at the same table. Beta 1 testers are first in line.",
    },
    join: {
      eyebrow: 'How to join',
      title: 'Four steps',
      form: '<link>Fill in the sign-up form</link> (about 2 minutes).',
      closes: (day: string, time: string) => `Sign-ups close ${day}, ${time} Eastern.`,
      email: (day: string) => `We email you by ${day} to confirm your seat and send the install link.`,
      discord: '<link>Join our Discord</link>: check-in happens on its voice channel.',
      android: "Android: the form asks for your Play Store's Google email, because Google requires it for test builds. It's deleted after the session.",
      iphone: 'iPhone: you install SpySocial with TestFlight, from the link in your email.',
    },
    fine: 'Pre-release build. Don\'t share other players\' names or chat. Your sign-up data is deleted after Beta 2. Your PayPal email is deleted once we have sent your thank-you.',
  },

  notFound: {
    title: 'Page Not Found',
    text: "The page you're looking for doesn't exist.",
  },

  confirmSuccess: {
    title: 'Email Confirmed',
    text: 'Your email has been successfully verified. You can now use all features of the SpySocial app.',
    home: 'Return to Home',
    expiredTitle: 'Link Expired',
    expired: 'This link has expired or was already used. Open SpySocial and tap <b>Resend</b>.',
    /** A sign-up made in the browser version (the signup function's ?from=browser): on a computer, the way back to it. */
    browserText: 'Your email has been verified. Go back to SpySocial in your browser and log in.',
    /** The same e-mail opened on a phone: back to the computer the sign-up was made on. */
    browserPhoneText: 'Your email has been verified. Go back to SpySocial on the computer where you signed up, and log in.',
    browserButton: 'Back to SpySocial',
  },

  /**
   * The launch version of the site (LIVE.launchSite): the home page's New in 2.2 section and its community strip, the
   * Contact page's press line and What's New's 2.2.0 entry. The cards' names are the app's own; the screenshots'
   * descriptions repeat the words printed on each store screenshot in this language (the store listing's captions).
   */
  launch: {
    /** The screenshot rail's name for screen readers. */
    railLabel: "Screens from SpySocial 2.2",
    /** Each store screenshot's description: the caption printed on it (Feature: line). */
    shots: {
      talk: "Spy Talk: Ask sharp questions. Find the spy.",
      sketch: "Spy Sketch: Draw the secret word. Catch the faker.",
      online: "Play Online: A table of 4 or 8, any time",
      gamenight: "Game Night: Titles you can only earn that night",
      market: "Black Market: Trade items with other agents",
      friends: "Friends: Add friends. Play together.",
    },
    /** In this order: Spy Sketch, Play Online, Game Night, Black Market, memberships (the page gives the icons by position). */
    cards: [
      { title: "Spy Sketch", text: "Draw the secret word on one shared whiteboard, and catch the spy faking it." },
      { title: "Play Online", text: "Tap Find a Game for a table of 4 or 8, any time. Strangers see your Agent Color, never your name." },
      { title: "Game Night", text: "Scheduled nights online, with titles you can only earn that night. We'll remind you before they start." },
      { title: "Black Market", text: "Trade items with friends. Adults can also trade with other agents, and buy and sell for Intel, which you earn by playing." },
      { title: "Memberships", text: "Optional: the Pack Pass (monthly or yearly) or Lifetime unlocks every pack of places and words, and lets you make your own. Nothing else is sold." },
    ],
    /** The link to What's New under the cards. */
    allNotes: "Everything new in 2.2",
    /** The strip under New in 2.2: the Discord invite, and the press and creator contact (<email/> is the address). */
    community: {
      title: "Find your table",
      text: "Game nights, news and players looking for a game: join the SpySocial Discord.",
      discord: "Join the Discord",
      pressTitle: "Press and creators",
      press: "Writing about SpySocial, or want to play it on your channel? Email <email/> with “Press” in the subject.",
    },
    /** What's New's 2.2.0 entry: its tag, summary and the two section labels (the items are the cards above and the Roadmap's 2.2 features). */
    notes: {
      tag: "Launch",
      summary: "Our biggest update yet: Spy Sketch, Play Online, Game Night, trading on the Black Market, and memberships.",
      newLabel: "New in 2.2",
      moreLabel: "And more",
    },
  },
}

export default en

/** The shape every language's file has: this file's, with every string widened. */
export type Strings = typeof en
