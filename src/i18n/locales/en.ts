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
      faq: 'Support & FAQ',
      contact: 'Contact us',
      rules: 'Community rules',
      safety: 'Safety',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      childSafety: 'Child Safety Standards',
      whatsNew: "What's New",
      deleteAccount: 'Delete your account',
      join: 'Join a game',
      joinEvent: 'Public event',
      resetPassword: 'Reset your password',
      confirmSuccess: 'Email confirmed',
      notFound: 'Page not found',
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
    tagline: 'The party game of social deception.',
    play: 'Play',
    legal: 'Legal & Safety',
    browser: 'Play in Your Browser',
    whatsNew: "What's New",
    rules: 'Rules',
    support: 'Support',
    contact: 'Contact',
    shop: 'Shop',
    privacy: 'Privacy',
    terms: 'Terms',
    childSafety: 'Child Safety',
    safety: 'Safety',
    deleteAccount: 'Delete Account',
    rights: (year: number) => `© ${year} SpySocial. All rights reserved`,
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
    lineup: {
      group: 'A line-up of five agents. Tap one to accuse them.',
      accuse: (n: number) => `Accuse suspect ${n}`,
      wasSpy: (n: number) => `Suspect ${n} was the spy`,
      isLocal: (n: number) => `Suspect ${n} is a Local`,
      /** The stamps on an accused suspect (short: they sit on a figure). */
      stampSpy: 'Spy!',
      stampLocal: 'Local',
      tap: 'Tap a suspect to accuse',
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
          text: 'The spy can guess the secret any time. Right wins, wrong is out.',
          alt: 'The spy picks the location from the list to win the round',
        },
      ],
      win: 'Locals win by voting out every spy. Spies win by guessing the secret, or by staying hidden until time runs out.',
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
      purchases: 'Optional packs if you want more places and words.',
    },
  },

  faq: {
    title: 'Support & FAQ',
    needMore: 'Need more help?',
    sections: {
      start: 'Getting Started',
      modes: 'Game Modes',
      features: 'In-Game Features',
      sharing: 'Sharing & Joining Rooms',
      languages: 'Language Support',
      host: 'Host Controls',
      account: 'Account & Sign-in',
      trouble: 'Troubleshooting',
    },
    startGame: {
      q: 'How do I start a game?',
      a: [
        'Tap <b>Create Room</b> to host, or join with a room code of 4 to 8 letters and numbers',
        'You need at least 3 players to start a round',
        'Share the room with friends via the share sheet, QR code, or link',
      ],
    },
    firstTime: {
      q: 'First time playing?',
      a: [
        'The app walks you through a quick tutorial on first launch',
        "You'll be prompted to set up a profile (display name and optional avatar)",
        "Then you're dropped onto the home screen, ready to host or join",
      ],
    },
    howMany: {
      q: 'How many players can play?',
      intro: '3 to 21 players. Recommended spies:',
      a: ['3–5 players: 1 spy', '6–8 players: 2 spies', '9+ players: 3 spies'],
    },
    gameModes: {
      q: 'What game modes are available?',
      a: ['Two games: <b>Spy Talk</b>, where the secret is a location and everyone asks and answers questions, and <b>Spy Sketch</b>, where the secret is a word and everyone takes turns drawing it', "<b>Classic:</b> Spies don't know each other", '<b>Spy Mafia:</b> Spies can see who the other spies are'],
    },
    notebook: {
      q: 'What is the Notebook?',
      a: [
        'Tap the notebook icon during a round to jot down notes about who said what',
        'Players are smart-sorted: active players with notes first, then other active players, then eliminated players last',
        'Notes are private — only you can see them',
      ],
    },
    hints: {
      q: 'How do hints work across languages?',
      onePool: 'Hints are shown in <b>your own app language</b>, like the rest of the game',
      gameLanguage: [
        'Hints are always shown in the <b>game language</b> so everyone at the table reads the same prompt',
        'If your interface language is different, tap the hint to see it translated for you',
      ],
      reload: "Use the dedicated reload icon to refresh a hint — tapping the sentence won't accidentally re-roll it",
    },
    poke: {
      q: "What's a poke?",
      a: "Tap a teammate's card in the lobby to send them a quick poke — handy for getting attention before the round starts.",
    },
    leave: {
      q: 'Can I leave mid-game?',
      a: 'Yes — every in-game screen has a Leave button so you can exit without backing all the way out.',
    },
    share: {
      q: 'How do I share a room with friends?',
      a: [
        "<b>Share sheet:</b> Use your phone's native share sheet to send the link anywhere",
        '<b>QR code:</b> Friends nearby can scan to join instantly',
        '<b>Verbal:</b> Just read out the room code',
      ],
    },
    link: {
      q: 'Can someone join from a link?',
      a: [
        'Yes — links like <b>spysocial.app/join/<code></b> open the app directly into the room',
        "If they don't have the app, the link takes them to the App Store or Google Play",
      ],
    },
    languages: {
      q: 'How do languages work?',
      setLanguage: 'Set your interface language in your profile',
      onePool: [
        "Rooms don't have a language: every player sees the game in their own, including the secret location or word, its description, the spy's list and the hints",
        'So friends who speak different languages can play in the same room, or at the same Play Online table',
      ],
      chatAuto:
        'Chat messages stay as they were written, and one in another language is translated into yours automatically (to tap <b>Translate</b> instead, turn off <b>Translate messages automatically</b> in Settings)',
      chatTap: 'Chat messages stay as they were written: tap <b>Translate</b> to read one in your language',
      hostPicks: 'The host picks the game language for locations and hints',
      parity: 'SpySocial is in <b>10 languages</b>: English, Spanish, Russian, Simplified Chinese, Hindi, Arabic, French, Bengali, Brazilian Portuguese and Indonesian',
      differs: "If your language differs from the host's, you'll see translations where it matters",
    },
    customize: {
      q: 'What can the host customize?',
      a: ['Number of spies and game mode', 'Voting rules and whether the vote-caller is revealed', 'Location packs to draw from'],
      turnOnly: 'Turn duration',
      languageAndTurn: 'Game language and turn duration',
    },
    endEarly: {
      q: 'Can the host end a game early?',
      a: 'Yes — hosts have an <b>End Game</b> control to wrap things up at any point during play.',
    },
    needAccount: {
      q: 'Do I need an account?',
      a: [
        'You can play as a guest without signing up',
        'Creating an account lets you keep your profile and progress across devices',
        'You can upgrade a guest profile to a full account at any time without losing anything',
      ],
    },
    forgot: {
      q: 'I forgot my password',
      a: [
        'Tap "Forgot password" on the login screen and enter your email',
        "You'll get a reset link — opening it brings you to a secure reset page",
        'If the link expired, just request a new one',
      ],
    },
    code: {
      q: "Room code isn't working?",
      a: [
        'Room codes are <b>4 to 8 letters and numbers</b>: type the code exactly as the host\'s screen shows it',
        "Make sure the host hasn't closed the room or started the game",
        'Check your internet connection',
      ],
    },
    connection: {
      q: 'Lost connection?',
      a: [
        "The app reconnects automatically — there's no need to reload",
        "Your role and progress are preserved while you're away",
        'If you\'re stuck on a "reconnecting" screen for more than a few seconds, your network may be off — toggle airplane mode or switch Wi-Fi/cellular',
      ],
    },
    offline: {
      q: "App says I'm offline but I'm not?",
      a: 'This was an iOS quirk in older versions; v2.0.0 verifies your connection with a real network probe before showing the offline state. If it still happens, force-close and reopen the app.',
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
    child: {
      title: 'Child safety',
      text: 'We never allow sexual content involving anyone under 18, or anyone trying to groom, sexualize or exploit a child. We remove it, ban the accounts involved, and report it to the National Center for Missing & Exploited Children (NCMEC) as the law requires. If you see anything like this, email <email/> with "Child safety" in the subject, and report the player in the app if you shared a room with them. You can also report it directly to NCMEC\'s <link>CyberTipline</link> (1-800-843-5678). If a child is in immediate danger, call your local emergency number first. Our <link2>Child Safety Standards</link2> say more.',
      /** The email's subject line (English, so our inbox sorts it). */
      subject: 'Child safety',
    },
    breaking: {
      title: 'What happens when someone breaks the rules',
      text: "Usually a warning first. Repeated or serious problems lead to a chat mute (1 hour to 7 days), a pause from public rooms and events (1 to 30 days), or a ban. Sharing someone's personal information, or anything that sexualizes a child, can mean an immediate ban. Every notice in the app says what is limited, why, and until when, with an ID like S-207.",
      drawings:
        "Drawings in public rooms and events may be checked automatically at any time, and any drawing that's reported is checked. If a drawing you made breaks these rules, your account can be paused or banned from public rooms and events, however long you've played. In a public room, a turn that breaks these rules is taken off the drawing and counts as a strike: a warning first, then 3, 7 and 30 days without public rooms and events, and at the fifth strike in 90 days, for good. In any room, a hate symbol (a swastika counts, unless the round's word makes a religious meaning clear), a written slur or hate aimed at someone removes the player from the game and from public rooms and events for good, and a drawing that sexualizes a child ends the account and is handled as Child safety says above. Gore and monsters are fine. In a private room, a reported drawing is acted on automatically only when it's that serious; anything else is up to the person who reads the report. To appeal, email us the code from your notice.",
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
        `<b>Public rooms and events</b> with players your child doesn't know${playOnline ? ', including Play Online, which seats players at a table automatically' : ''}.`,
      buy: '<b>Things to buy:</b> packs and memberships, through the App Store or Google Play.',
      hasNotTitle: "What SpySocial doesn't have",
      noDms:
        "No direct messages: players can only chat inside a room, with the players in it. The spies' chat lasts one game and is filtered, stored and reportable like the rest.",
      noFriends:
        'No friend or follower lists, no player search, no profiles to browse and no bios, so nobody can look your child up or contact them outside a room.',
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
        '<b>Drawing check:</b> every drawing turn in a public room is checked automatically, and a turn that breaks the rules is taken off the drawing.',
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
  },

  whatsNew: {
    title: "What's New",
    sub: 'Release notes for SpySocial. Major updates, new features, and improvements as we ship them.',
    /** The release notes, newest first. Keep every array's length and order. */
    releases: [
      {
        tag: 'Android Launch',
        summary:
          'SpySocial is officially live on the Google Play Store — the first public production release on Android, paired with pre-launch polish from closed-test QA on real Android devices.',
        sections: [
          {
            label: 'Now Available',
            items: [
              { title: 'Android 2.1.1', text: 'Live on Google Play as of June 13, 2026.' },
              { title: 'iOS 2.1.1', text: 'Same fixes, submitted to App Store Connect.' },
            ],
          },
          {
            label: 'Pre-launch Polish',
            items: [
              { title: 'Delete Account button no longer clipped', text: 'The Account screen content now respects the device safe-area bottom inset and reserves room for the unsaved-changes snackbar — Google Play requires in-app account deletion to be reachable.' },
              { title: 'Lobby Leave Room / Start Game buttons', text: 'Now sit above the Android gesture-nav bar via dynamic safe-area insets.' },
              { title: 'Start Game feedback', text: "Now surfaces what's missing (need 3+ players, all-ready, at least one category) when prerequisites aren't met. Previously the button was hard-disabled with no feedback." },
              { title: 'Categories screen', text: 'Back control and "Categories & Locations" title no longer crowd each other. Back button is icon-only on Android (Material convention); title font size trimmed.' },
              { title: 'How to Play modal', text: "Duplicate back button on Android removed (the modal's close X and the inherited stack back button were both rendering)." },
              { title: 'Onboarding tutorial', text: 'Skip is now reachable on every step, not just the first slide.' },
              { title: 'Guest sign-up banner', text: 'Reframed as an invitation ("Unlock Your Full Account") with a sparkles icon and a clear CTA button — was previously styled like a system warning, which felt discouraging.' },
              { title: 'Game results & How to Play screens', text: 'Emojis replaced with Ionicons / FontAwesome glyphs. Emojis render inconsistently across Android vendors; vector icons stay consistent.' },
            ],
          },
          {
            label: 'Infrastructure',
            items: [
              { title: '', text: 'expo-updates now installed and configured against the EAS project. Future JS-only fixes can ship via over-the-air updates without going through Play Store / App Store review.' },
            ],
          },
        ],
      },
      {
        tag: 'Polish Update',
        summary:
          'A polish release: a redesigned Welcome screen, refreshed Game Over and Account screens, iPad layout improvements, and a stack of stability and quality fixes under the hood.',
        sections: [
          {
            label: 'New Features',
            items: [
              { title: 'Welcome screen redesign', text: 'New layered surface with a soft sky-blue gradient and faint spy-themed background details (radar rings, crosshair), an orange "SOCIAL DEDUCTION" eyebrow pill, a tagline beneath the logo, icon-prefixed Login / Sign Up buttons, an OR divider, and a lightweight "Continue as Guest" link. Version badge is now a subtle pill at the bottom of the screen.' },
              { title: 'Account "confirmation pending" flow', text: 'When a guest upgrades to a full account, the Account screen now shows a clear pending state with Resend / Cancel / Refresh actions so they know exactly where they are in the email-confirm process.' },
            ],
          },
          {
            label: 'Visual Revamp',
            items: [
              { title: 'Game Over screen redesigned', text: 'Single-surface player cards with a soft gradient and left-edge color accent, a trophy hero with a glow halo, gold-accented winning-team sections, location card with a map-pin icon, and a sky-blue gradient "Return to Lobby" footer button.' },
              { title: 'Account screen redesign', text: 'Single cohesive list, consistent uppercase section headers across every group (Profile, Preferences, Account & Security, Support & Legal, Danger Zone), iOS-Settings-style menu rows for Support / Legal, Danger Zone moved to the bottom.' },
              { title: 'iPad UI polish', text: 'Lobby player cards in 6 columns (was 3), role-reveal card capped at 420pt, larger in-game player tiles (140×178) with a taller container so the third row never clips, notebook column auto-sizes to the role card, home/play deck row sized for iPad with larger HomeCard typography.' },
            ],
          },
          {
            label: 'Android-Specific Fixes',
            items: [
              { title: 'Back-gesture guard', text: "The Android-10+ system back swipe (and the hardware back button) now route through the same Leave confirmation dialog as tapping the header's Leave button. Previously, Android users could swipe back out of an in-game screen or the lobby with zero confirmation; gestureEnabled: false only stops the iOS swipe gesture. Implemented via a shared useBackPressGuard hook combining navigation.addListener('beforeRemove') with BackHandler.hardwareBackPress." },
              { title: '"Box-in-box" rendering artifact', text: "Android's compositor was rendering a visible inner edge inside every vote / vote-results / game-over card. Root cause: translucent rgba background + translucent hairline border + borderRadius + overflow:hidden — the rounded clip layer's own edge was showing through the semi-transparent border. Fixed across VotePlayerRow, VoteResultRankCard, VoteOutcomeCard, and the game-over player card." },
              { title: 'Game Over header gap', text: "The screen's SafeAreaView was double-counting the top inset on top of the Stack header, leaving a visible strip of the GameBackground gradient between the header and where scroll content started clipping. Now scoped to ['bottom','left','right'], matching the voting / vote_results screens." },
              { title: 'WheelPicker', text: 'Pure-JS replacement for @react-native-picker/picker. The native picker silently ignores itemStyle on Android (which made our white-text styling render as unreadable black-on-dark) and has long-standing NullPointerException crashes during dismissal — both upstream library bugs. The replacement renders identical UX on both platforms via a ScrollView + snap-to-interval.' },
            ],
          },
          {
            label: 'Improvements',
            items: [
              { title: 'Server-synced clock', text: 'Every "seconds remaining" computation now subtracts a measured offset against the server clock (via a new server_now() Postgres function) instead of trusting the device clock. Fixes occasional nonsense countdown values on devices with imperfect time sync.' },
              { title: 'Auth flows consolidated', text: 'Signup, resend confirmation, password reset, and email change all dispatch through a single Edge Function with a shared client wrapper, removing the drift risk across the four UI call sites. New migrations add an idempotency key to signup, extend auth_attempts to cover the additional flow kinds, and add a cancel-email-change RPC.' },
              { title: 'Account: mailto fallback', text: 'Support / Legal email rows now copy the address to the clipboard with a friendly alert when no mail client is configured, instead of throwing an unhandled error.' },
              { title: '', text: 'Translation parity maintained across English, Spanish, and Russian for all new keys (welcome eyebrow / tagline, account upgrade-pending strings, etc).' },
            ],
          },
          {
            label: 'Technical',
            items: [
              { title: '', text: 'tsconfig.json now excludes supabase/functions/** — those are Deno Edge Function files with a different module resolution target.' },
              { title: '', text: 'Version bumped to 2.1.0; iOS build number incremented for App Store submission.' },
            ],
          },
        ],
      },
      {
        tag: 'Major Update',
        summary:
          'A full rebuild of the multiplayer experience: every screen has been redesigned, the realtime engine has been rewritten for stability, and a stack of new features lands together.',
        sections: [
          {
            label: 'New Features',
            items: [
              { title: 'Tutorial & profile setup', text: 'First-time players are walked through the game and prompted to set up their profile.' },
              { title: 'In-game Notebook', text: 'Jot down notes about who said what during the round. Players are smart-sorted: active players with notes first, then other active players, then eliminated players last.' },
              { title: 'Hint translation', text: 'When your UI language differs from the game language, tap a hint to see the same question in your language. Hints stay in the game language so every player at the table reads the same prompt.' },
              { title: 'Player pokes', text: "Tap a teammate's card in the lobby to send them a poke." },
              { title: 'QR-code sharing', text: 'Share rooms via a native share sheet with a scannable QR code.' },
              { title: 'Universal links', text: 'spysocial.app/join/<code> opens the app and drops you straight into the room (with cold-launch handling).' },
              { title: '5-character room codes', text: 'Shorter codes that are easier to share verbally. Legacy 6-character codes still work.' },
              { title: 'Reveal Vote Caller', text: 'Lobby setting to optionally show who triggered the vote.' },
              { title: 'Host End Game', text: 'Hosts can now end a game early.' },
              { title: 'Extra 1 location pack', text: 'A new batch of locations to play with.' },
              { title: 'In-game Leave button', text: 'Quick exit from active games without backing all the way out.' },
            ],
          },
          {
            label: 'Visual Revamp',
            items: [
              { title: '', text: 'Lobby UI completely modernized with interactive player cards.' },
              { title: '', text: 'Lobby settings screen redesigned (with a reusable PickerModal under the hood).' },
              { title: '', text: 'Game screen redesigned.' },
              { title: '', text: 'Voting screen redesigned with a vote-caller display and progress UI.' },
              { title: '', text: 'Vote results screen redesigned, with standardized results / eliminated UX.' },
              { title: '', text: "Role-reveal phase polished — shows waiting players' names, extended to 60 seconds." },
              { title: '', text: 'Home cards now auto-fit text; refresh button slimmed down.' },
              { title: '', text: 'All in-game screens now share the same dark-navy header (Solve and Solve Results no longer use white/transparent variants).' },
              { title: '', text: 'Offline banner standardized across every screen — consistent height, safe-area aware, no longer crashes into the Dynamic Island.' },
              { title: '', text: 'Account screen has a polished offline empty state with a cloud-offline icon.' },
            ],
          },
          {
            label: 'Improvements',
            items: [
              { title: 'Network resilience overhaul', text: 'Fixes a long-standing iOS quirk where NetInfo could lie ("offline") after a long background sleep, leaving screens stuck in reconnect states even though the network was actually fine. The shared useNetwork hook now verifies any "offline" claim with a real HTTP probe to Supabase; all in-game and pre-game screens consume this same hook.' },
              { title: '', text: "The Play screen now trusts actual fetch results over NetInfo's stale state, retries automatically every 5 seconds while offline, serializes concurrent fetches, and never falsely shows the logged-out fallback when the user is merely offline." },
              { title: '', text: 'Realtime sync stability hardened across every phase (lobby, role reveal, game, voting, results).' },
              { title: '', text: 'Game timer is now server-synced — clock drift fixed.' },
              { title: '', text: 'Stronger offline handling and reconnection logic.' },
              { title: '', text: 'Auth & login flows tightened: signup hardening, reset-password flow, and the guest-upgrade flow.' },
              { title: '', text: 'Account screen polish with a redesigned snackbar messaging system.' },
              { title: '', text: 'Full translation parity across English, Spanish, and Russian (171 hint suggestions per language, indexed by stable position so future translation features just work).' },
              { title: '', text: 'Notebook UX: keyboard no longer pops automatically when selecting a player; sheet sizes itself appropriately.' },
              { title: '', text: 'Hint drawer: tapping the hint sentence no longer accidentally re-rolls the hint — the dedicated reload icon is the only way to refresh.' },
              { title: '', text: 'iOS 26 compatibility — opted out of the Liquid Glass capsule on header bar items.' },
              { title: '', text: 'Header consolidated into a shared useGameScreenHeader hook for consistency across screens.' },
              { title: '', text: 'Production logging stripped from release builds.' },
            ],
          },
          {
            label: 'Bug Fixes',
            items: [
              { title: '', text: 'Fixed vote / end-of-game race condition.' },
              { title: '', text: 'Fixed double-tally and timer-end edge cases on votes.' },
              { title: '', text: 'Fixed Plurality tally vs. abstain handling; abstain now pinned to the action dock.' },
              { title: '', text: 'Fixed solve-results header overlap (body crashing into transparent header).' },
              { title: '', text: 'Fixed animation initial-state bleed-through on the game screen.' },
              { title: '', text: 'Fixed Reanimated render-write warnings on the voting screen.' },
              { title: '', text: 'Fixed guest-upgrade flow that was unintentionally signing the guest out.' },
              { title: '', text: 'Fixed Account email field.' },
              { title: '', text: 'Fixed home-card text truncation and Spanish header trims.' },
            ],
          },
          {
            label: 'Technical',
            items: [
              { title: '', text: 'Migrated state management to useRoom and useGame hooks.' },
              { title: '', text: 'Flattened routing — dropped the (tabs) route group in favor of flat routes.' },
              { title: '', text: 'Pinned react-native-screens to ~4.18 for expo-router 6.0.23 compatibility.' },
              { title: '', text: 'Realtime publication fix on the Supabase side.' },
              { title: '', text: 'Question suggestions restructured into parallel translation triples ({ en, es, ru }) — single source of truth.' },
              { title: '', text: 'Removed deprecated Expo schema fields (privacy, privacyPolicyUrl, termsOfServiceUrl); privacy/terms URLs are owned by App Store Connect.' },
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

  join: {
    title: 'Join Game',
    noCode: 'No room code provided',
    browserOrPhone: 'Play in your browser, or on your phone with the app',
    openToJoin: 'Open SpySocial to join the room',
    roomCode: 'Room Code',
  },

  joinEvent: {
    label: 'Public event',
    broken: "This event link doesn't work",
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

  notFound: {
    title: 'Page Not Found',
    text: "The page you're looking for doesn't exist.",
  },

  confirmSuccess: {
    title: 'Email Confirmed',
    text: 'Your email has been successfully verified. You can now use all features of the SpySocial app.',
    home: 'Return to Home',
  },
}

export default en

/** The shape every language's file has: this file's, with every string widened. */
export type Strings = typeof en
