import type { Strings } from './en'

/** Français (fr)\u00A0: français de France, «\u00A0tu\u00A0» comme dans l'appli, ton film noir sec\u00A0; termes du jeu repris de l'appli (salon, espion, local, «\u00A0Jouer en ligne\u00A0», Réglages). */
const fr: Strings = {
  meta: {
    siteName: 'SpySocial',
    defaultTitle: "SpySocial — Le jeu d'ambiance de bluff et de déduction",
    description:
      "Réunis tes amis et démasque l'espion, ou bluffe tout le monde. Jeu d'ambiance gratuit en temps réel pour 3 à 21 joueurs, sur iOS et Google Play.",
    titles: {
      /** The Beta 2 playtester page (/beta). */
      beta: 'Bêta\u00a02\u00a0: joue à SpySocial avant sa sortie',
      /** The transparency page (/transparency), live with LIVE.transparencyPage. */
      transparency: "Rapport de transparence",
      /** The Game Night rules page (/game-night-rules), live with LIVE.gameNightRules. */
      gameNightRules: "Règles de la soirée jeux",
      faq: "Aide et FAQ",
      contact: 'Nous contacter',
      rules: 'Règles de la communauté',
      safety: 'Sécurité',
      privacy: 'Politique de confidentialité',
      terms: "Conditions d'utilisation",
      childSafety: 'Protection des enfants',
      whatsNew: 'Nouveautés',
      roadmap: 'Feuille de route',
      deleteAccount: 'Supprimer ton compte',
      join: 'Rejoindre une partie',
      joinEvent: 'Événement public',
      resetPassword: 'Réinitialiser ton mot de passe',
      /** /reset-password once passwords are gone (LIVE.passwordless; set by the page's own Helmet). */
      resetPasswordCode: "Connexion avec un code",
      confirmSuccess: 'E-mail confirmé',
      notFound: 'Page introuvable',
    },
    descriptions: {
      beta: 'Rejoins un test de jeu collectif en direct d’une heure de SpySocial, un jeu gratuit de déduction sociale pour soirées, le jeudi 12\u00a0novembre 2026, de 19\u00a0h à 20\u00a0h, heure de l’Est des États-Unis. Réservé aux 18\u00a0ans et plus, sur iPhone ou Android. Les testeurs gardent le Pin bêta et plus encore.',
      transparency: "Chaque mois : combien d’Intel a été gagné, dépensé et corrigé dans SpySocial, chaque incident et chaque changement de règle, sans nommer aucun joueur.",
      gameNightRules: "Les règles de la soirée jeux hebdomadaire de SpySocial : quand elle a lieu, qui peut participer, comment obtenir les titres de la soirée et le titre bonus du développeur.",
      faq: "Aide SpySocial : comment jouer à Spy Talk et Spy Sketch, Jouer en ligne, salons privés et Soirée jeux, amis, échanges, Marché noir, interceptions, Intel, abonnement, ton compte, sécurité et dépannage.",
      contact: "Contacte l'équipe SpySocial\u00A0: écris à support@spysocial.app pour de l'aide avec l'appli, ton compte ou autre chose.",
      rules: "Les règles de la communauté SpySocial\u00A0: sois sympa, bluffe sans tricher, garde ta vie privée, et ce qui arrive quand quelqu'un enfreint les règles.",
      safety: "La sécurité sur SpySocial pour les joueurs de 13 à 17\u00A0ans et pour les parents\u00A0: comment quitter, bloquer et signaler, et où trouver de l'aide.",
      privacy: 'Comment SpySocial collecte, utilise et protège tes données personnelles, qui les reçoit, combien de temps nous les gardons et quels sont tes droits.',
      terms: "Les conditions d'utilisation de SpySocial\u00A0: qui peut jouer, ton compte et ton contenu, les salons publics, les règles de la communauté, la modération et les recours.",
      childSafety: "Les standards de SpySocial contre les abus et l'exploitation sexuels des enfants\u00A0: ce que nous interdisons, comment signaler un problème, ce que nous faisons et notre contact pour la protection des enfants.",
      whatsNew: "Les notes de version de SpySocial\u00A0: nouveautés, corrections et améliorations de chaque version de l'appli.",
      roadmap:
        "Ce qui arrive sur SpySocial : tout sur la version 2.2, de « Jouer en ligne » et Spy Sketch à la traduction automatique du chat, et ce qui est prévu ensuite : mode classé, saisons et tournois.",
      deleteAccount: "Comment supprimer ton compte SpySocial et ses données, dans l'appli ou par e-mail, et ce qui reste conservé un moment.",
    },
  },

  language: {
    button: (name: string) => `Langue\u00A0: ${name}. Changer de langue`,
    menu: 'Langue',
  },

  header: {
    home: 'Accueil SpySocial',
    nav: 'Site',
    join: 'Rejoindre un salon',
    joinShort: 'Entrer',
    shop: 'Boutique',
    toLight: 'Passer en mode clair',
    toDark: 'Passer en mode sombre',
  },

  footer: {
    /** The link to the transparency page (LIVE.transparencyPage). */
    transparency: "Transparence",
    /** The link to the Game Night rules, once they're live (LIVE.gameNightRules). */
    gameNightRules: "Règles de la soirée jeux",
    /** The link to the /beta playtest page, shown only until sign-ups close. */
    beta: "Test bêta\u00a02",
    tagline: "Le jeu d'ambiance de bluff et de déduction.",
    play: 'Jouer',
    legal: 'Mentions légales et sécurité',
    browser: 'Jouer dans le navigateur',
    whatsNew: 'Nouveautés',
    roadmap: 'Feuille de route',
    rules: 'Règles',
    support: 'Aide',
    contact: 'Contact',
    shop: 'Boutique',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    childSafety: 'Protection des enfants',
    safety: 'Sécurité',
    deleteAccount: 'Supprimer le compte',
    rights: (year: number, holder = 'SpySocial') => `© ${year} ${holder}. Tous droits réservés`,
    follow: 'Suivre SpySocial',
    on: (network: string) => `SpySocial sur ${network}`,
    discordHandle: 'Serveur SpySocial',
  },

  notice: {
    englishOnly: "Cette page n'existe qu'en anglais. C'est la version anglaise qui fait foi.",
    translated: "Cette page est une traduction. En cas de différence avec la version anglaise, c'est la version anglaise qui fait foi.",
    readEnglish: 'Lire en anglais',
    englishSections: "Les deux sections ci-dessous font partie de notre politique de confidentialité et n'existent qu'en anglais. C'est la version anglaise qui fait foi.",
  },

  common: {
    lastUpdated: (date: string) => `Dernière mise à jour\u00A0: ${date}`,
    goHome: "Retour à l'accueil",
    close: 'Fermer',
    openInApp: 'Ouvrir dans SpySocial',
    appStore: "Télécharger dans l'App Store",
    googlePlay: 'Disponible sur Google Play',
    noAppIos: "Pas encore l'appli\u00A0? Télécharge-la",
    noAppAndroid: "Pas encore l'appli\u00A0? Installe-la",
    playInBrowser: 'Jouer dans le navigateur',
  },

  badges: {
    appStoreSmall: 'Télécharger dans',
    appStoreName: 'l’App Store',
    appStoreAfter: '',
    appStoreLabel: 'Télécharger dans l’App Store',
    playSmall: 'DISPONIBLE SUR',
    playName: 'Google Play',
    playAfter: '',
    playLabel: 'Disponible sur Google Play',
  },

  home: {
    hero: {
      eyebrow: "Le jeu d'ambiance de bluff et de déduction",
      title: 'Ne crois personne',
      titleMark: '.',
      lede: "<b>Démasque l'espion, ou bluffe tout le monde.</b> L'un de tes amis est l'espion. Tous les autres connaissent le lieu secret. Posez des questions ou dessinez des indices, puis votez avant que l'espion ne devine où vous êtes.",
      facts: ['3–21 joueurs', 'Multijoueur en temps réel', 'Gratuit'],
      browser: 'Jouer dans le navigateur',
      joinCode: 'Entrer avec un code de salon',
    },
    creatorShort: {
      eyebrow: 'Créateur à l’affiche',
      title: (creator: string) => `Regardez ${creator} jouer à Spy Sketch`,
      credit: (creator: string) => `Vidéo de <link>${creator}</link>`,
      cta: 'Jouer gratuitement dans le navigateur',
      play: (creator: string) => `Lire la vidéo de ${creator}`,
      consent: 'La lecture charge la vidéo depuis YouTube, qui peut déposer des cookies. <link>Politique de confidentialité</link>',
    },
    lineup: {
      group: 'Une rangée de cinq agents. Appuie sur l\'un d\'eux pour l\'accuser.',
      accuse: (n: number) => `Accuser le suspect ${n}`,
      wasSpy: (n: number) => `Le suspect ${n} était l'espion`,
      isLocal: (n: number) => `Le suspect ${n} est un local`,
      stampSpy: 'Espion\u00A0!',
      stampLocal: 'Local',
      tap: 'Appuie sur un suspect pour l\'accuser',
      eggFound: 'Œil de lynx\u00A0! Tu as trouvé l\'espion du premier coup.',
      eggWhere: 'Ton code pour un titre secret dans l\'appli (Compte > Réglages > Saisir un code)\u00A0:',
    },
    how: {
      eyebrow: 'Comment ça se joue',
      title: 'Baratine. Ou dessine.',
      sub: "Deux jeux, une règle\u00A0: tout le monde à la table connaît le secret, sauf l'espion.",
      talk: {
        secret: 'Le secret est un lieu',
        name: 'Spy Talk',
        text: "Chacun son tour, pose une question et réponds à une autre. Trop vague, et tu passes pour l'espion. Trop évident, et l'espion devine où vous êtes.",
        alt: 'Spy Talk\u00A0: chaque joueur pose une question et un autre joueur y répond',
      },
      sketch: {
        secret: 'Le secret est un mot',
        name: 'Spy Sketch',
        text: "Chacun son tour, dessinez-le sur un seul tableau partagé. L'espion dessine avec vous sans savoir ce que c'est, en espérant que personne ne le remarque.",
        alt: "Spy Sketch\u00A0: les joueurs dessinent le mot secret à tour de rôle pendant que l'espion fait semblant",
      },
    },
    round: {
      eyebrow: 'Une manche',
      title: 'Quatre temps',
      steps: [
        {
          title: 'La carte',
          text: 'Tu vois le secret, ou une carte qui dit juste Espion.',
          alt: "Révélation des rôles\u00A0: la carte de l'espion dit Espion, il doit donc découvrir où sont les autres",
        },
        { title: 'Les questions', text: 'Prouve que tu le connais sans le trahir.', alt: 'La carte de question en pleine manche' },
        { title: 'Le vote', text: 'Lance un vote contre celui qui sonne faux.', alt: "Le vote\u00A0: chacun vote pour le joueur qu'il soupçonne d'être l'espion" },
        {
          title: 'Le pari',
          text: "L'espion peut deviner le secret à tout moment. Juste, il gagne. Faux, il est éliminé.",
          alt: "L'espion choisit le lieu dans la liste pour gagner la manche",
        },
      ],
      win: "Les locaux gagnent en éliminant tous les espions. Les espions gagnent en devinant le secret, ou en restant cachés jusqu'à la fin du temps.",
    },
    who: {
      eyebrow: 'Avec qui tu joues',
      titleOnline: 'Ta bande. Ou des inconnus.',
      titleCrew: 'Ramène ta bande.',
      sub: 'Chacun joue sur son téléphone ou sa tablette, autour d\'une table ou en appel.',
      privateTitle: 'Salon privé',
      privateText: "Jusqu'à 21 joueurs. Tes amis entrent avec un QR code, un lien d'invitation ou le code du salon. Tu choisis le mode et les règles.",
      howJoin: [
        "<b>Scanne</b> le QR code sur l'écran de l'hôte",
        "<b>Appuie</b> sur le lien d'invitation qu'il t'envoie",
        "<b>Saisis</b> le code du salon ici ou dans l'appli",
      ],
      onlineTitle: 'Jouer en ligne',
      onlineText: "«\u00A0Trouver une partie\u00A0» t'installe à une table de 4 ou 8. Les inconnus ne voient jamais ton nom, seulement ta couleur d'agent. Et des soirées jeux programmées.",
      agentsLabel: "Couleurs d'agent",
      agents: {
        Teal: 'Agent Turquoise',
        Coral: 'Agent Corail',
        Rose: 'Agent Fuchsia',
        Lime: 'Agent Vert citron',
        Yellow: 'Agent Jaune',
        Lilac: 'Agent Lilas',
        Blue: 'Agent Bleu',
        Mint: 'Agent Menthe',
      },
      needsAccount: '«\u00A0Jouer en ligne\u00A0» demande un compte gratuit.',
    },
    joinForm: {
      label: 'Code du salon',
      button: 'Rejoindre',
      note: "Le code sur l'écran de l'hôte, de 4 à 8 lettres et chiffres.",
    },
    langs: {
      eyebrow: 'Dix langues',
      title: 'Même table. Ta langue.',
      sub: 'Chaque joueur voit le jeu dans sa langue, secret compris.',
      listLabel: 'Langues',
      chatAlt: "Traduction du chat\u00A0: un message en espagnol dans le chat du salon, affiché en anglais",
      chatAuto: 'Le chat aussi\u00A0: un message dans une autre langue est traduit dans la tienne dès son arrivée.',
      chatTap: 'Le chat aussi\u00A0: appuie sur Traduire sous n\'importe quel message pour le lire dans ta langue.',
      trioLabel: 'Une carte de rôle en trois langues',
      cardAlts: [
        "Révélation des rôles\u00A0: la carte d'un local affiche le lieu secret, Théâtre",
        'Carte de rôle en espagnol\u00A0: Teatro',
        'Carte de rôle en russe\u00A0: Театр',
      ],
    },
    safety: {
      title: 'Dès 13 ans',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Signale ou bloque n'importe quel joueur${
          o.messages && o.drawings
            ? ', et signale un message ou un dessin'
            : o.messages
              ? ', et signale un message'
              : o.drawings
                ? ', et signale un dessin'
                : ''
        }. Dans les salons où joue un joueur de moins de 18 ans, les liens, adresses e-mail, numéros de téléphone et comptes de réseaux sociaux sont bloqués pour tout le monde, et les signalements qui concernent un joueur de moins de 18 ans sont lus en priorité.`,
      rules: 'Règles de la communauté',
      childSafety: 'Protection des enfants',
      safety: 'Sécurité',
      privacy: 'Confidentialité',
    },
    shop: {
      eyebrow: 'La boutique',
      title: "Porte l'alibi",
      text: "Le sweat à capuche TRUST NO ONE., le tee-shirt I'm Not the Spy et plus encore. Imprimés et expédiés par notre partenaire boutique.",
      cta: 'Voir la boutique',
      hoodieAlt: "L'impression au dos du sweat\u00A0: TRUST NO ONE. avec la tête de l'espion qui dépasse en haut",
      teeAlt: "L'impression au dos du tee-shirt\u00A0: (I WAS THE SPY 😂)",
    },
    final: {
      title: "Ta table t'attend",
      text: 'Gratuit, sans pub.',
      /** Shown once the released app sells memberships (LIVE.purchases). The only things sold are memberships. */
      purchases: 'Des abonnements en option si tu veux plus de lieux et de mots.',
    },
  },

  rules: {
    title: 'Règles de la communauté',
    intro: (o: { onePool: boolean; photos: boolean }) =>
      `Les salons publics${o.onePool ? ' (les tables de «\u00A0Jouer en ligne\u00A0» et nos soirées jeux)' : ''} te font jouer avec des gens que tu ne connais pas. Ces règles gardent le jeu agréable pour tout le monde. Elles s'appliquent aux noms,${o.photos ? ' aux photos,' : ''} au chat, aux dessins et à ta façon de jouer, dans les salons publics comme privés, et font partie de nos <link>conditions d'utilisation</link>.`,
    kind: {
      title: '1. Sois sympa',
      hate: "Ni haine ni harcèlement\u00A0: pas d'insultes visant un joueur, pas d'injures, pas d'attaques contre l'identité de quiconque.",
      sexual: (photos: boolean) => `Aucun contenu sexuel dans le chat, les noms${photos ? ', les photos' : ''} ou les dessins.`,
      threats: "Pas de menaces, et rien qui pousse quelqu'un à se faire du mal.",
      selfHarm:
        "Rien qui encourage, valorise ou explique le suicide, l'automutilation, les troubles alimentaires ou les défis dangereux. C'est valable pour tout le monde, dans tous les salons.",
    },
    bluff: {
      title: '2. Bluffe, ne triche pas',
      lying: 'Mentir et bluffer, c\'est le jeu. Ce n\'est jamais une raison de signaler quelqu\'un.',
      cheating: "Révéler le mot ou le lieu, ou s'entendre avec d'autres joueurs en dehors du jeu, c'est tricher.",
      leaving: 'Quitter des parties exprès, rester inactif ou faire traîner une manche gâche le jeu pour le reste du salon.',
      online: (onePool: boolean) =>
        `Dans «\u00A0Jouer en ligne\u00A0», manquer un début de partie ou quitter une partie commencée te prive un court moment ${onePool ? 'de «\u00A0Jouer en ligne\u00A0»' : 'des parties publiques'} (5 minutes, plus si tu continues de quitter les parties).`,
    },
    privacy: {
      title: '3. Garde ta vie privée',
      personal: "Ne partage pas de vrais noms, d'adresses, de numéros de téléphone ni de pseudos de réseaux sociaux, ni les tiens ni ceux des autres.",
      spam: 'Pas de pub, de spam ni de liens dans les salons publics.',
      minors:
        "Dans tout salon où joue un joueur de moins de 18 ans, les liens, adresses e-mail, numéros de téléphone et comptes de réseaux sociaux sont bloqués pour tout le monde. Aux tables de «\u00A0Jouer en ligne\u00A0» et aux soirées jeux, ils sont toujours bloqués.",
    },
    reports: {
      title: '4. Une personne lit les signalements',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Appuie longuement sur un joueur pour le signaler ou le bloquer.${
          o.messages ? " Appuie longuement sur un message, une question ou une réponse pour le signaler\u00A0: le signalement l'inclut, avec le chat autour." : ''
        }${o.drawings ? ' Tu peux aussi signaler un dessin.' : ''} Une personne lit chaque signalement sous 24 heures. Le chat public est conservé 14 jours pour que les signalements puissent être vérifiés\u00A0; le joueur signalé ne sait pas qui l'a signalé.`,
    },
    /** Section 5, once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
    packs: {
      title: '5. Packs personnalisés',
      intro: 'Les packs que créent les membres suivent aussi ces règles\u00A0: le nom, la description et chaque entrée.',
      rules: [
        "Rien de ce que ces règles interdisent ailleurs\u00A0: pas de haine, de contenu sexuel ni de menaces, et rien qui ne convienne pas aux joueurs de 13\u00A0ans et plus.",
        "Pas d'informations personnelles ni de vraies personnes que tu connais\u00A0: pas de camarades de classe, de profs ni de voisins, ni d'adresses, de numéros de téléphone, d'écoles ou de pseudos de réseaux sociaux.",
        'Pas de pub, de liens ni de spam, et uniquement ton propre travail.',
      ],
      community:
        "Packs de la communauté\u00A0: une personne de notre équipe lit chaque pack avant que quiconque puisse le voir. Si un pack enfreint ces règles, nous pouvons le refuser, le retirer des Packs de la communauté ou empêcher ce compte de partager des packs. Tout joueur peut signaler un pack de la communauté, et une personne lit chaque signalement sous 24\u00A0heures.",
      swearing:
        "Gros mots\u00A0: permis dans les packs que tu joues dans tes propres salons privés, jamais dans les Packs de la communauté, car des joueurs de moins de 18\u00A0ans les utilisent. Si un titre en contient un (celui d'un film, par exemple), les Packs de la communauté l'affichent censuré\u00A0: sa première lettre, puis des astérisques (S***). Les gros mots les plus grossiers n'y sont pas permis du tout.",
    },
    child: {
      title: 'Protection des enfants',
      text: "Nous n'autorisons jamais de contenu sexuel impliquant une personne de moins de 18 ans, ni personne qui cherche à manipuler, sexualiser ou exploiter un enfant. Nous le supprimons, bannissons les comptes concernés et le signalons au National Center for Missing & Exploited Children (NCMEC), comme la loi l'exige. Si tu vois quelque chose de ce genre, écris à <email/> avec «\u00A0Child safety\u00A0» en objet, et signale le joueur dans l'appli si tu as partagé un salon avec lui. Tu peux aussi le signaler directement à la <link>CyberTipline</link> du NCMEC (1-800-843-5678). Si un enfant est en danger immédiat, appelle d'abord le numéro d'urgence local. Nos <link2>normes de protection des enfants</link2> en disent plus.",
      subject: 'Child safety',
    },
    breaking: {
      title: "Ce qui se passe quand quelqu'un enfreint les règles",
      text: "En général, d'abord un avertissement. Les problèmes répétés ou graves entraînent un blocage du chat (de 1 heure à 7 jours), une pause des salons publics et des événements (de 1 à 30 jours), ou un bannissement. Partager les informations personnelles de quelqu'un, ou quoi que ce soit qui sexualise un enfant, peut entraîner un bannissement immédiat. Chaque notification dans l'appli indique ce qui est limité, pourquoi et jusqu'à quand, avec un identifiant comme S-207.",
      drawings:
        "Les dessins des salons publics et des événements peuvent être vérifiés automatiquement à tout moment, et tout dessin signalé est vérifié. Si un dessin que tu as fait enfreint ces règles, ton compte peut être suspendu ou banni des salons publics et des événements, quelle que soit ton ancienneté. Dans un salon public, un tour qui enfreint ces règles est retiré du dessin et compte comme une sanction\u00A0: d'abord un avertissement, puis 3, 7 et 30 jours sans salons publics ni événements, et à la cinquième sanction en 90 jours, pour de bon. Dans tous les salons, un symbole de haine (une croix gammée en est un, sauf si le mot de la manche lui donne clairement un sens religieux), une injure écrite ou un message de haine visant quelqu'un exclut le joueur de la partie, et des salons publics et des événements pour de bon, et un dessin qui sexualise un enfant entraîne la suppression du compte et est traité comme l'indique la section Protection des enfants ci-dessus. Le gore et les monstres sont autorisés. Dans un salon privé, un dessin signalé n'entraîne une mesure automatique que s'il est aussi grave\u00A0; pour tout le reste, c'est la personne qui lit le signalement qui décide. Pour faire appel, envoie-nous par e-mail le code de ta notification.",
      drawingsTesters:
        "Pour l'instant, la vérification automatique des dessins est en test\u00A0: elle ne fonctionne que dans les parties où tous les joueurs sont nos testeurs (des joueurs qui essaient une version de test de l'appli).",
    },
    age: { title: 'Âge', text: 'SpySocial est réservé aux joueurs de 13 ans et plus.' },
    appeal: {
      title: 'Tu penses que nous nous sommes trompés\u00A0?',
      text: "Écris à <email/> en indiquant l'identifiant de ta notification. Consulte aussi les <link>conditions d'utilisation</link> et la <link2>politique de confidentialité</link2>.",
    },
  },

  safety: {
    title: 'La sécurité sur SpySocial',
    intro:
      "SpySocial est un jeu d'ambiance pour les joueurs de 13 ans et plus. Cette page s'adresse aux ados qui y jouent, et aux parents et adultes responsables qui veulent savoir à quoi ça ressemble. Aller à\u00A0: <link>joueurs de 13 à 17 ans</link>, <link2>parents et adultes responsables</link2>, <link3>contacts pour la protection des enfants</link3>, <link4>où trouver de l'aide</link4>.",
    danger: {
      title: "Quelqu'un est en danger en ce moment\u00A0?",
      text: "Appelle le numéro d'urgence local\u00A0: 999 au Royaume-Uni, 911 aux États-Unis, 112 dans l'UE. Ensuite, signale-le-nous.",
    },
    teens: {
      title: 'Pour les joueurs de 13 à 17 ans',
      intro: "SpySocial doit rester un plaisir. Si quelqu'un te met mal à l'aise, te fait peur ou te blesse, tu peux réagir tout de suite, et tu n'auras aucun problème pour ça.",
      leave: {
        title: 'Quitter',
        text: 'Tu peux toujours quitter un salon ou une partie\u00A0: appuie sur <b>Quitter</b>. Ta sécurité compte plus que n\'importe quelle partie.',
        online: (onePool: boolean) =>
          `Dans «\u00A0Jouer en ligne\u00A0», quitter une partie commencée te prive un court moment ${onePool ? 'de «\u00A0Jouer en ligne\u00A0»' : 'des parties publiques'}. Quitte quand même, et signale le joueur si c'est à cause de lui.`,
      },
      block: {
        title: 'Bloquer',
        text: "Appuie longuement sur le joueur, puis sur <b>Bloquer</b>. Tu ne verras plus ses messages, et aucun de vous deux ne pourra rejoindre un salon où se trouve l'autre. Il n'est pas prévenu. Tu peux le débloquer à tout moment dans les Réglages, sous Confidentialité et sécurité\u00A0: Joueurs bloqués.",
      },
      report: {
        title: 'Signaler',
        text: "Appuie longuement sur le joueur, ou sur quelque chose qu'il a écrit dans le chat, puis sur <b>Signaler</b>. Choisis ce qui s'est passé, ajoute des détails si tu veux, et envoie. Nous joignons le chat pour toi\u00A0: pas besoin de captures d'écran.",
      },
      tell: {
        title: 'En parler',
        text: "Parles-en à un parent, à un adulte qui s'occupe de toi, à un prof ou à un autre adulte de confiance. Si tu préfères parler à quelqu'un que tu ne connais pas, les <link>lignes d'écoute ci-dessous</link> sont gratuites et confidentielles.",
      },
      afterTitle: 'Ce qui se passe après ton signalement',
      after: [
        "Une personne, pas un robot, lit chaque signalement sous 24 heures. Les signalements liés à la protection des enfants, à l'automutilation, à un contenu sexuel ou à des informations personnelles sont lus en priorité, tout comme ceux qui concernent un joueur de moins de 18 ans.",
        "Le joueur signalé ne sait pas qui l'a signalé.",
        "S'il a enfreint les règles, nous pouvons l'avertir, bloquer son chat, le suspendre des salons publics ou le bannir.",
        "Nous ne t'envoyons pas le résultat, mais chaque signalement est lu et traité.",
        'Bluffer et mentir sur ton rôle font partie du jeu\u00A0: ce n\'est pas quelque chose à signaler.',
      ],
      neverTitle: "Ce n'est jamais normal si quelqu'un",
      never: [
        "te demande ton âge, où tu habites ou dans quelle école tu vas",
        "te demande des photos, ton numéro de téléphone ou tes réseaux sociaux, ou de discuter sur une autre appli",
        'parle de sexe, ou envoie des messages ou des dessins sexuels',
        "te propose des cadeaux ou de l'argent, ou te demande de garder un secret",
        "te dit de te faire du mal, ou te harcèle",
      ],
      neverWhat:
        "Bloque-le, signale-le (choisis <b>Sécurité des enfants</b> s'il te demande des photos, des conversations sexuelles ou un rendez-vous), et parles-en à un adulte de confiance. Garde pour toi ton vrai nom, ton adresse, ton école, ton numéro de téléphone et tes réseaux sociaux, et ne donne jamais ton mot de passe\u00A0: personne chez SpySocial ne te le demandera jamais.",
    },
    parents: {
      title: 'Pour les parents et adultes responsables',
      intro:
        "SpySocial est un jeu d'ambiance de bluff et de déduction\u00A0: un ou plusieurs joueurs sont secrètement des espions, et tout le monde essaie de deviner qui. Chaque joueur utilise son propre téléphone, dans la même pièce ou à distance. Les ados ont besoin de l'autorisation d'un parent ou d'un tuteur pour jouer (voir nos <link>conditions d'utilisation</link>, section 2).",
      hasTitle: 'Ce que SpySocial propose',
      chat: "<b>Un chat écrit dans les salons\u00A0:</b> le chat du salon, le chat de la partie, un chat privé pour les espions quand une partie en compte plusieurs, et un chat pour les joueurs éliminés. Le chat est supprimé environ 24 heures après l'envoi dans un salon privé, et 14 jours après dans un salon public.",
      sketch: '<b>Spy Sketch\u00A0:</b> les joueurs dessinent au doigt, chacun son tour.',
      names: (o: { avatars: boolean; photos: boolean }) =>
        `<b>Noms et images\u00A0:</b> ${
          o.avatars
            ? o.photos
              ? "un pseudo, un nom d'utilisateur et un avatar composé d'éléments proposés par l'appli. Les versions de l'appli antérieures à 2.2 permettent encore d'ajouter une photo de profil."
              : "un pseudo, un nom d'utilisateur et un avatar composé d'éléments proposés par l'appli. Les joueurs ne peuvent pas ajouter de photos."
            : "un pseudo, un nom d'utilisateur et une photo de profil facultative."
        }`,
      private: "<b>Salons privés\u00A0:</b> seules les personnes qui ont le code, le lien ou le QR code du salon peuvent entrer, et l'hôte peut retirer un joueur.",
      publicOnePool:
        "<b>Salons publics</b> avec des joueurs que ton enfant ne connaît pas\u00A0: les tables de «\u00A0Jouer en ligne\u00A0», où l'appli place les joueurs automatiquement et où tout le monde joue avec les mêmes règles standard, et les soirées jeux que nous organisons à heure fixe. Les joueurs ne peuvent pas créer de salons publics, et aucun joueur n'en est l'hôte.",
      public: (playOnline: boolean) =>
        `<b>Salons publics et événements</b> avec des joueurs que ton enfant ne connaît pas${playOnline ? ', dont «\u00A0Jouer en ligne\u00A0», qui place automatiquement les joueurs à une table' : ''}.`,
      buy: "<b>Des achats\u00A0:</b> packs et abonnements, via l'App Store ou Google Play.",
      /** `buy` once only memberships are sold (LIVE.membershipsOnly). */
      buyMembers:
        "<b>Des achats\u00A0:</b> uniquement des abonnements (l'abonnement aux packs, mensuel ou annuel, et l'Accès à vie), via l'App Store ou Google Play. Un abonnement débloque les packs qui ne sont pas gratuits\u00A0; rien d'autre n'est vendu.",
      /** Once Intercepts are live (LIVE.intercepts). Use the app's own word for Intercepts. */
      intercepts:
        "<b>Interceptions\u00A0:</b> des récompenses gagnées en jouant, chacune avec un objet au hasard, comme un nouveau look pour l'agent. Elles ne s'achètent pas, ni avec de l'argent ni avec la monnaie gagnée dans le jeu, et l'appli affiche les chances avant qu'on en ouvre une.",
      /** `intercepts` once unopened Intercepts trade on the Black Market (LIVE.interceptsMarket). */
      interceptsMarket:
        "<b>Interceptions :</b> des récompenses gagnées en jouant, chacune avec un objet au hasard, comme un nouveau look pour l'agent. Personne ne les vend contre de l'argent, ni nous ni les autres joueurs. Les adultes peuvent aussi en acheter et en vendre entre eux, non ouvertes, sur le Marché noir contre la monnaie gagnée dans le jeu, qui ne s'achète pas ; les moins de 18 ans ne le peuvent pas. L'appli affiche les chances avant qu'on en ouvre une.",
      /** Home's Discord pill (LIVE.homeDiscord; under 16 never, 16-17 a safety note first). */
      discord:
        "<b>Un lien vers notre Discord :</b> l'accueil peut afficher un lien vers le serveur Discord officiel de SpySocial, où les joueurs trouvent avec qui jouer. Discord est une appli à part, avec ses propres règles et son âge minimum. Les moins de 16 ans ne voient jamais ce lien, et les joueurs de 16 et 17 ans voient d'abord un conseil pour y rester en sécurité. Nos modérateurs veillent sur le serveur, mais personne chez SpySocial ne peut voir les messages privés sur Discord.",
      /** Once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
      customPacks: (community: boolean) =>
        `<b>Packs personnalisés\u00A0:</b> les membres peuvent créer leurs propres packs de lieux ou de mots pour leurs salons privés.${
          community ? " Notre équipe lit chaque pack partagé dans les Packs de la communauté avant que quiconque puisse le voir, et tout joueur peut le signaler." : ''
        }`,
      hasNotTitle: "Ce que SpySocial ne propose pas",
      noDms:
        "Pas de messages privés\u00A0: les joueurs ne peuvent discuter que dans un salon, avec les joueurs qui s'y trouvent. Le chat des espions dure une partie et il est filtré, conservé et signalable comme le reste.",
      noFriends:
        "Pas de listes d'amis ni d'abonnés, pas de recherche de joueurs, pas de profils à parcourir ni de bios\u00A0: personne ne peut chercher ton enfant ni le contacter en dehors d'un salon.",
      noDmsSocial:
        "Pas de messages privés : les joueurs ne discutent que dans un salon, avec les joueurs qui s'y trouvent, ou dans le chat d'un groupe, avec les amis qui en font partie. Tous les chats sont filtrés, conservés un temps et signalables.",
      noSearch:
        "Pas de recherche de joueurs ni de suggestions d'amis : un inconnu ne peut pas chercher ton enfant. Les moins de 18 ans n'ont pas de profil public et personne ne peut les suivre.",
      social:
        "<b>Amis et groupes :</b> les joueurs peuvent ajouter des amis et jouer ensemble en groupe, avec un chat de groupe filtré. Un adulte ne peut ajouter un joueur de moins de 16 ans qu'en personne, en scannant le code ami sur le téléphone de l'enfant. Les moins de 18 ans n'ont pas de profil public, ne peuvent pas être suivis et ne reçoivent pas de notifications sociales la nuit. Sur iPhone, tout cela reste désactivé pour les moins de 18 ans pour l'instant.",
      trading:
        "<b>Échanges :</b> les joueurs de 13 à 17 ans ne peuvent échanger des objets du jeu que contre d'autres objets, avec des amis ajoutés en personne, sans cadeaux ni messages. Les adultes peuvent aussi acheter et vendre des objets sur le Marché noir contre la monnaie gagnée dans le jeu ; les moins de 18 ans peuvent seulement regarder. Rien ne peut être acheté ni vendu contre de l'argent réel.",
      noVoice: (photos: boolean) =>
        `Pas de chat vocal ni vidéo\u00A0: le bouton du micro ne fait que transformer la parole en texte, et les autres joueurs n'entendent jamais la voix de personne.${photos ? '' : ' Pas d\'envoi de photos ni de vidéos non plus.'}`,
      noLocation: 'Pas de partage de localisation et pas de pub.',
      safeTitle: 'Comment nous assurons la sécurité',
      age: (o: { gate: boolean; under13Deletion: boolean; storeSignals: boolean }) =>
        `<b>Âge\u00A0:</b> SpySocial est réservé aux joueurs de 13 ans et plus.${
          o.gate ? ` Avant la première partie, l'appli demande l'année de naissance${o.under13Deletion ? ', et une réponse de moins de 13 ans supprime le compte' : ''}.` : ''
        }${o.storeSignals ? " Si Apple ou Google indique à l'appli que son utilisateur a moins de 13 ans, l'appli ne le laisse pas jouer." : ''} Nous ne vérifions pas l'âge\u00A0: si tu découvres qu'un enfant de moins de 13 ans a un compte, écris-nous et nous le supprimerons.`,
      publicRooms:
        "<b>Les salons publics</b> demandent un compte enregistré avec une adresse e-mail confirmée, un âge de 13 ans ou plus et l'acceptation de nos règles de la communauté. Les invités ne peuvent jouer que dans des salons privés, et les joueurs suspendus ou bannis ne peuvent pas rejoindre les salons publics.",
      filter:
        "<b>Filtre du chat\u00A0:</b> les noms et le chat sont vérifiés avant que quiconque les voie. Dans les salons publics, les injures, les mots sexuels explicites et les insultes sont bloqués. Dans les salons privés, les mots les plus graves sont bloqués. Dans tout salon où joue un joueur de moins de 18 ans, les liens, adresses e-mail, numéros de téléphone et comptes de réseaux sociaux sont bloqués pour tout le monde. Aux tables de «\u00A0Jouer en ligne\u00A0» et aux soirées jeux, ils sont toujours bloqués.",
      reports:
        "<b>Signalements, blocages et sanctions\u00A0:</b> une personne lit chaque signalement sous 24 heures, et le joueur signalé ne sait pas qui l'a signalé. Les signalements qui concernent un joueur de moins de 18 ans sont lus en priorité. Les sanctions vont de l'avertissement au blocage du chat, à une suspension des salons publics ou au bannissement. Nos <link>règles de la communauté</link> listent ce qui est interdit.",
      drawingCheck:
        '<b>Vérification des dessins\u00A0:</b> chaque tour de dessin dans un salon public est vérifié automatiquement, et un tour qui enfreint les règles est retiré du dessin.',
      buyTitle: 'Achats',
      buyText:
        "Les ados ont besoin de l'autorisation d'un parent ou d'un tuteur pour acheter quoi que ce soit. Les achats passent par l'App Store ou Google Play, donc leurs contrôles parentaux, comme «\u00A0Autorisation d'achat\u00A0» chez Apple et l'approbation des achats dans Google Family Link, fonctionnent normalement. Un abonnement aux packs se renouvelle jusqu'à sa résiliation dans les réglages de la boutique.",
      deleteTitle: 'Supprimer un compte',
      deleteSteps: (o: { avatars: boolean; oldApps: boolean }) => [
        'Ouvre SpySocial.',
        `Appuie sur ${o.avatars ? "l'avatar" : 'la photo'} en haut de l'écran d'accueil pour ouvrir <b>Compte</b>.${
          o.oldApps ? " (Dans les versions antérieures à 2.2, Compte est l'icône en bas à droite de l'écran d'accueil.)" : ''
        }`,
        `Appuie sur <b>Réglages</b> en haut à droite, puis, sous <b>Compte et connexion</b>, sur <b>Supprimer le compte</b> (la dernière ligne). Un compte invité se supprime plutôt avec <b>Se déconnecter</b>, au même endroit.${
          o.oldApps ? ' (Dans les versions antérieures à 2.2, Supprimer le compte se trouve dans la Zone dangereuse, en bas de Compte.)' : ''
        }`,
      ],
      deleteEmail:
        "Ou écris à <email/> depuis l'adresse du compte, avec l'objet «\u00A0Delete my SpySocial account\u00A0». Si tu ne peux pas écrire depuis cette adresse, écris-nous quand même avec le nom d'utilisateur et nous t'aiderons. Notre page <link>Supprimer le compte</link> indique ce qui est supprimé et ce que nous conservons.",
      deleteSubject: 'Delete my SpySocial account',
      dataRequests:
        "<b>Les données de ton enfant :</b> en tant que parent ou tuteur, tu peux nous demander une copie des données de son compte, la correction de son année de naissance ou la suppression du compte. Notre <link>Politique de confidentialité</link> (Confidentialité des enfants) explique comment nous vérifions la demande et ce qu'elle couvre.",
      contactTitle: 'Nous contacter',
      contact: (section: number) =>
        `Écris à <email/> pour tout ce qui concerne cette page. Pour tout ce qui touche à la sécurité d'un enfant, mets «\u00A0Child safety\u00A0» en objet et nous le traiterons en priorité. Pour contester une décision ou déposer une réclamation, y compris sur la façon dont nous respectons l'Online Safety Act du Royaume-Uni, consulte la section ${section} de nos <link>conditions d'utilisation</link>.`,
    },
    contactsTitle: 'Contacts pour la protection des enfants',
    contactsAfter: 'Nos <link>normes de protection des enfants</link> détaillent ce que nous interdisons, comment le signaler et ce que nous faisons.',
    helpTitle: "Où trouver de l'aide",
    helpIntro: "Si ça ne va pas, ou si tu t'inquiètes pour quelqu'un, ces services sont gratuits et confidentiels, et tu peux leur parler de tout.",
    tableWho: 'Qui',
    tableHow: 'Comment',
    helplines: {
      childline: {
        note: 'Royaume-Uni, pour les moins de 19 ans',
        text: "Appelle le <b>0800 1111</b>, gratuitement, à tout moment, ou discute en ligne avec un conseiller sur <link>childline.org.uk</link>. Les appels n'apparaissent pas sur ta facture de téléphone.",
      },
      samaritans: { note: 'Royaume-Uni et Irlande, tout âge', text: 'Appelle le <b>116 123</b>, gratuitement, à tout moment, de jour comme de nuit (<link>samaritans.org</link>).' },
      lifeline: { note: 'États-Unis', text: 'Appelle ou envoie un SMS au <b>988</b>, ou discute sur <link>988lifeline.org</link>, gratuitement, à tout moment.' },
      findHelpline: {
        note: 'Tous les autres pays',
        text: "<link>findahelpline.com</link> trouve des lignes d'écoute gratuites et confidentielles dans plus de 175 pays, par téléphone, SMS ou chat.",
      },
    },
    contacts: {
      danger: {
        label: 'Un enfant est en danger en ce moment',
        text: "Appelle la police\u00A0: le <b>999</b> au Royaume-Uni, le <b>911</b> aux États-Unis, le <b>112</b> dans l'UE, ou le numéro d'urgence local. Fais-le en premier, avant tout le reste de cette page.",
      },
      ncmec: {
        note: "Exploitation sexuelle d'enfants, depuis n'importe quel pays",
        text: 'Signale-la en ligne sur <link>report.cybertip.org</link>, ou appelle le 1-800-843-5678 (1-800-THE-LOST), à tout moment. Géré par le National Center for Missing & Exploited Children.',
      },
      ceop: {
        note: 'Au Royaume-Uni',
        text: "Si tu t'inquiètes d'abus sexuels en ligne, ou de la façon dont quelqu'un parle à un enfant en ligne, signale-le au CEOP, qui fait partie de la National Crime Agency\u00A0: <link>ceop.police.uk/Safety-Centre</link>. Les jeunes peuvent aussi faire un signalement, et un conseiller en protection de l'enfance lit chaque signalement.",
      },
      spysocial: {
        text: "Signale le joueur dans l'appli en choisissant <b>Sécurité des enfants</b>, et écris à <email/> avec «\u00A0Child safety\u00A0» en objet. Nous supprimons le contenu, bannissons les comptes concernés et le signalons au NCMEC et aux autres autorités, comme la loi l'exige.",
      },
    },
    seeAlso: "Consulte aussi nos <link>règles de la communauté</link>, nos <link2>conditions d'utilisation</link2> et notre <link3>politique de confidentialité</link3>.",
  },

  support: {
    title: 'Comment pouvons-nous t\'aider\u00A0?',
    sub: 'Nous sommes là pour répondre à toutes tes questions et t\'aider avec tout problème sur SpySocial.',
    emailUs: 'Écris-nous',
    respond: 'Nous répondons généralement sous 24 heures',
    copy: (email: string) => `Copier ${email}`,
    copied: 'E-mail copié\u00A0!',
    copyFailed: 'Échec de la copie',
    quickLinks: 'Liens rapides',
    faqLink: 'FAQ et dépannage',
    rate: "Note-nous sur l'App Store",
    ratePlay: 'Note-nous sur Google Play',
  },

  whatsNew: {
    title: 'Nouveautés',
    sub: 'Les notes de version de SpySocial\u00A0: grandes mises à jour, nouvelles fonctions et améliorations, au fil des sorties.',
    releases: [
      {
        tag: 'Lancement Android',
        summary:
          "SpySocial est officiellement disponible sur le Google Play Store\u00A0: la première version publique en production sur Android, accompagnée des finitions issues des tests fermés sur de vrais appareils Android.",
        sections: [
          {
            label: 'Disponible',
            items: [
              { title: 'Android 2.1.1', text: 'Sur Google Play depuis le 13 juin 2026.' },
              { title: 'iOS 2.1.1', text: "Les mêmes corrections, désormais disponibles sur l'App Store." },
            ],
          },
          {
            label: 'Finitions avant lancement',
            items: [
              { title: 'Le bouton Supprimer le compte n\'est plus coupé', text: "Le contenu de l'écran Compte respecte désormais la marge de sécurité en bas de l'appareil et garde de la place pour la barre des modifications non enregistrées\u00A0: Google Play exige que la suppression du compte soit accessible dans l'appli." },
              { title: 'Boutons Quitter le salon / Lancer la partie du salon', text: "Ils se placent maintenant au-dessus de la barre de navigation par gestes d'Android grâce aux marges de sécurité dynamiques." },
              { title: 'Retour du bouton Lancer la partie', text: "Il indique maintenant ce qui manque (au moins 3 joueurs, tout le monde prêt, au moins une catégorie) quand les conditions ne sont pas remplies. Avant, le bouton était simplement désactivé, sans explication." },
              { title: 'Écran Catégories', text: "Le bouton retour et le titre «\u00A0Catégories et lieux\u00A0» ne se chevauchent plus. Sur Android, le bouton retour n'est plus qu'une icône (convention Material)\u00A0; la taille du titre a été réduite." },
              { title: 'Fenêtre Comment jouer', text: "Le bouton retour en double sur Android a été supprimé (le X de fermeture de la fenêtre et le bouton retour hérité de la pile s'affichaient tous les deux)." },
              { title: 'Tutoriel de démarrage', text: "Passer est maintenant accessible à chaque étape, et pas seulement sur la première." },
              { title: "Bannière d'inscription des invités", text: "Reformulée en invitation («\u00A0Débloque ton compte complet\u00A0») avec une icône d'étoiles et un bouton d'action clair\u00A0: elle ressemblait avant à un avertissement système, ce qui décourageait." },
              { title: 'Écrans des résultats et Comment jouer', text: "Les emojis ont été remplacés par des glyphes Ionicons / FontAwesome. Les emojis s'affichent différemment selon les fabricants Android\u00A0; les icônes vectorielles restent identiques." },
            ],
          },
          {
            label: 'Infrastructure',
            items: [
              { title: '', text: "expo-updates est maintenant installé et configuré sur le projet EAS. Les futures corrections purement JS pourront être livrées par mise à jour à distance (OTA), sans passer par la validation du Play Store ou de l'App Store." },
            ],
          },
        ],
      },
      {
        tag: 'Mise à jour de finition',
        summary:
          "Une version de finition\u00A0: un écran d'accueil repensé, des écrans Fin de partie et Compte rafraîchis, une meilleure mise en page sur iPad et une série de corrections de stabilité et de qualité sous le capot.",
        sections: [
          {
            label: 'Nouvelles fonctions',
            items: [
              { title: "Nouvel écran d'accueil", text: "Une nouvelle surface en couches avec un léger dégradé bleu ciel et de discrets détails d'espionnage en fond (cercles de radar, réticule), une pastille orange «\u00A0SOCIAL DEDUCTION\u00A0» au-dessus, un slogan sous le logo, des boutons Connexion / Inscription précédés d'une icône, un séparateur OU et un lien léger «\u00A0Continuer en invité\u00A0». Le badge de version est désormais une pastille discrète en bas de l'écran." },
              { title: 'Compte\u00A0: parcours «\u00A0confirmation en attente\u00A0»', text: "Quand un invité passe à un compte complet, l'écran Compte affiche maintenant un état d'attente clair avec les actions Renvoyer / Annuler / Actualiser, pour qu'il sache exactement où il en est dans la confirmation par e-mail." },
            ],
          },
          {
            label: 'Refonte visuelle',
            items: [
              { title: 'Écran Fin de partie repensé', text: "Des cartes de joueurs d'un seul tenant avec un léger dégradé et une touche de couleur sur le bord gauche, un trophée mis en avant avec un halo lumineux, des sections de l'équipe gagnante rehaussées d'or, une carte du lieu avec une icône d'épingle, et un bouton «\u00A0Retour au salon\u00A0» en dégradé bleu ciel en bas." },
              { title: 'Écran Compte repensé', text: "Une seule liste cohérente, des en-têtes de section en majuscules homogènes pour chaque groupe (Profil, Préférences, Compte et sécurité, Aide et mentions légales, Zone dangereuse), des lignes de menu façon Réglages d'iOS pour Aide / Mentions légales, et la Zone dangereuse déplacée tout en bas." },
              { title: "Finitions de l'interface iPad", text: "Cartes des joueurs du salon sur 6 colonnes (au lieu de 3), carte de révélation des rôles limitée à 420 pt, tuiles de joueurs plus grandes en partie (140×178) dans un conteneur plus haut pour que la troisième rangée ne soit jamais coupée, colonne des notes ajustée à la carte de rôle, rangée de cartes accueil/jouer dimensionnée pour l'iPad avec une typographie HomeCard plus grande." },
            ],
          },
          {
            label: 'Corrections propres à Android',
            items: [
              { title: 'Protection du geste retour', text: "Le balayage retour du système d'Android 10+ (et le bouton retour matériel) passe désormais par la même fenêtre de confirmation Quitter que le bouton Quitter de l'en-tête. Avant, les utilisateurs Android pouvaient sortir d'un écran de jeu ou du salon par un balayage sans aucune confirmation\u00A0; gestureEnabled: false ne bloque que le geste de balayage d'iOS. Implémenté avec un hook partagé useBackPressGuard qui combine navigation.addListener('beforeRemove') et BackHandler.hardwareBackPress." },
              { title: 'Artefact d\'affichage «\u00A0boîte dans la boîte\u00A0»', text: "Le compositeur d'Android affichait un bord intérieur visible dans chaque carte de vote, de résultats du vote et de fin de partie. Cause\u00A0: fond rgba translucide + bordure fine translucide + borderRadius + overflow:hidden\u00A0; le bord du calque de découpe arrondi transparaissait à travers la bordure semi-transparente. Corrigé dans VotePlayerRow, VoteResultRankCard, VoteOutcomeCard et la carte de joueur de fin de partie." },
              { title: "Espace sous l'en-tête de Fin de partie", text: "Le SafeAreaView de l'écran comptait deux fois la marge du haut en plus de l'en-tête de la pile, ce qui laissait une bande visible du dégradé GameBackground entre l'en-tête et le début du contenu défilant. Il est maintenant limité à ['bottom','left','right'], comme sur les écrans voting / vote_results." },
              { title: 'WheelPicker', text: "Un remplaçant en pur JS de @react-native-picker/picker. Le sélecteur natif ignore sans prévenir itemStyle sur Android (notre texte blanc s'affichait donc en noir illisible sur fond sombre) et plante depuis longtemps avec des NullPointerException à la fermeture\u00A0: deux bugs de la bibliothèque d'origine. Le remplaçant offre la même expérience sur les deux plateformes grâce à un ScrollView avec arrêt par intervalle." },
            ],
          },
          {
            label: 'Améliorations',
            items: [
              { title: 'Horloge synchronisée avec le serveur', text: "Chaque calcul de «\u00A0secondes restantes\u00A0» soustrait maintenant un décalage mesuré par rapport à l'horloge du serveur (via une nouvelle fonction Postgres server_now()) au lieu de se fier à l'horloge de l'appareil. Corrige les comptes à rebours parfois absurdes sur les appareils mal synchronisés." },
              { title: "Parcours d'authentification regroupés", text: "L'inscription, le renvoi de confirmation, la réinitialisation du mot de passe et le changement d'e-mail passent tous par une seule Edge Function avec un wrapper client partagé, ce qui supprime le risque d'écart entre les quatre points d'appel de l'interface. De nouvelles migrations ajoutent une clé d'idempotence à l'inscription, étendent auth_attempts aux autres types de parcours et ajoutent un RPC d'annulation du changement d'e-mail." },
              { title: 'Compte\u00A0: solution de repli pour mailto', text: "Les lignes d'e-mail Aide / Mentions légales copient maintenant l'adresse dans le presse-papiers avec une alerte sympathique quand aucune appli de messagerie n'est configurée, au lieu de déclencher une erreur non gérée." },
              { title: '', text: "Traductions maintenues à l'identique en anglais, espagnol et russe pour toutes les nouvelles clés (pastille et slogan de l'accueil, textes de compte en attente de mise à niveau, etc.)." },
            ],
          },
          {
            label: 'Technique',
            items: [
              { title: '', text: "tsconfig.json exclut maintenant supabase/functions/**\u00A0: ce sont des fichiers Deno d'Edge Functions avec une résolution de modules différente." },
              { title: '', text: "Version passée à 2.1.0\u00A0; numéro de build iOS incrémenté pour la soumission à l'App Store." },
            ],
          },
        ],
      },
      {
        tag: 'Mise à jour majeure',
        summary:
          "Une refonte complète de l'expérience multijoueur\u00A0: chaque écran a été repensé, le moteur temps réel a été réécrit pour plus de stabilité, et toute une série de nouvelles fonctions arrive en même temps.",
        sections: [
          {
            label: 'Nouvelles fonctions',
            items: [
              { title: 'Tutoriel et création du profil', text: 'Les nouveaux joueurs découvrent le jeu pas à pas et sont invités à créer leur profil.' },
              { title: 'Notes en partie', text: "Note qui a dit quoi pendant la manche. Les joueurs sont triés intelligemment\u00A0: d'abord les joueurs actifs avec des notes, puis les autres joueurs actifs, et les joueurs éliminés en dernier." },
              { title: 'Traduction des indices', text: "Quand la langue de ton interface diffère de celle de la partie, appuie sur un indice pour voir la même question dans ta langue. Les indices restent dans la langue de la partie pour que tout le monde à la table lise la même suggestion." },
              { title: 'Taquiner les joueurs', text: "Dans le salon, appuie sur la carte d'un joueur pour le taquiner." },
              { title: 'Partage par QR code', text: 'Partage les salons via le menu de partage natif, avec un QR code à scanner.' },
              { title: 'Liens universels', text: "spysocial.app/join/<code> ouvre l'appli et t'emmène directement dans le salon (même quand l'appli était fermée)." },
              { title: 'Codes de salon à 5 caractères', text: 'Des codes plus courts, plus faciles à dicter. Les anciens codes à 6 caractères marchent toujours.' },
              { title: 'Montrer qui lance le vote', text: 'Un réglage du salon pour afficher, si on le souhaite, qui a lancé le vote.' },
              { title: "Terminer la partie (hôte)", text: "L'hôte peut maintenant terminer une partie avant la fin." },
              { title: 'Pack de lieux Extra 1', text: 'Une nouvelle série de lieux pour jouer.' },
              { title: 'Bouton Quitter en partie', text: 'Pour sortir vite d\'une partie en cours sans revenir en arrière écran par écran.' },
            ],
          },
          {
            label: 'Refonte visuelle',
            items: [
              { title: '', text: 'Interface du salon entièrement modernisée, avec des cartes de joueurs interactives.' },
              { title: '', text: 'Écran des réglages du salon repensé (avec un PickerModal réutilisable sous le capot).' },
              { title: '', text: 'Écran de jeu repensé.' },
              { title: '', text: "Écran de vote repensé, avec l'affichage de qui a lancé le vote et une barre de progression." },
              { title: '', text: 'Écran des résultats du vote repensé, avec une présentation harmonisée des résultats et des éliminations.' },
              { title: '', text: "Phase de révélation des rôles peaufinée\u00A0: elle affiche le nom des joueurs attendus et dure désormais 60 secondes." },
              { title: '', text: "Le texte des cartes de l'accueil s'ajuste maintenant tout seul\u00A0; bouton d'actualisation affiné." },
              { title: '', text: "Tous les écrans de jeu partagent maintenant le même en-tête bleu nuit (Deviner et Résultats de la devinette n'utilisent plus de variantes blanches ou transparentes)." },
              { title: '', text: "Bannière hors ligne harmonisée sur tous les écrans\u00A0: hauteur constante, respect des marges de sécurité, et elle ne heurte plus la Dynamic Island." },
              { title: '', text: "L'écran Compte a un état vide hors ligne soigné, avec une icône de nuage hors ligne." },
            ],
          },
          {
            label: 'Améliorations',
            items: [
              { title: 'Refonte de la résilience réseau', text: "Corrige une vieille bizarrerie d'iOS où NetInfo pouvait mentir («\u00A0hors ligne\u00A0») après une longue mise en veille en arrière-plan, laissant des écrans bloqués en reconnexion alors que le réseau allait bien. Le hook partagé useNetwork vérifie maintenant toute annonce «\u00A0hors ligne\u00A0» par une vraie requête HTTP vers Supabase\u00A0; tous les écrans de jeu et d'avant-partie utilisent ce même hook." },
              { title: '', text: "L'écran Jouer se fie maintenant aux vrais résultats des requêtes plutôt qu'à l'état périmé de NetInfo, réessaie automatiquement toutes les 5 secondes hors ligne, met en série les requêtes simultanées et n'affiche plus à tort l'écran de déconnexion quand l'utilisateur est simplement hors ligne." },
              { title: '', text: 'Synchronisation temps réel renforcée à chaque phase (salon, révélation des rôles, partie, vote, résultats).' },
              { title: '', text: "Le minuteur de la partie est maintenant synchronisé avec le serveur\u00A0: fini la dérive de l'horloge." },
              { title: '', text: 'Meilleure gestion du hors-ligne et de la reconnexion.' },
              { title: '', text: "Parcours d'authentification et de connexion renforcés\u00A0: inscription plus robuste, réinitialisation du mot de passe et passage d'un compte invité à un compte complet." },
              { title: '', text: "Finitions de l'écran Compte avec un nouveau système de messages en snackbar." },
              { title: '', text: "Traductions complètes et à l'identique en anglais, espagnol et russe (171 suggestions d'indices par langue, indexées par position fixe pour que les futures fonctions de traduction marchent directement)." },
              { title: '', text: "Notes\u00A0: le clavier ne s'ouvre plus tout seul quand on choisit un joueur\u00A0; le panneau prend la bonne taille." },
              { title: '', text: "Tiroir des indices\u00A0: appuyer sur la phrase de l'indice ne le remplace plus par erreur\u00A0; seule l'icône dédiée permet d'en changer." },
              { title: '', text: "Compatibilité iOS 26\u00A0: désactivation de la capsule Liquid Glass sur les éléments de la barre d'en-tête." },
              { title: '', text: "En-tête regroupé dans un hook partagé useGameScreenHeader, pour la cohérence entre les écrans." },
              { title: '', text: 'Journaux de production retirés des versions publiées.' },
            ],
          },
          {
            label: 'Corrections de bugs',
            items: [
              { title: '', text: 'Correction d\'une situation de concurrence entre le vote et la fin de partie.' },
              { title: '', text: 'Correction des doubles décomptes et des cas limites de fin de minuteur pendant les votes.' },
              { title: '', text: "Correction du décompte à la majorité relative face aux abstentions\u00A0; l'abstention est maintenant fixée à la barre d'actions." },
              { title: '', text: "Correction du chevauchement de l'en-tête des résultats de la devinette (le contenu passait sous l'en-tête transparent)." },
              { title: '', text: "Correction de l'état initial des animations qui transparaissait sur l'écran de jeu." },
              { title: '', text: "Correction des avertissements Reanimated d'écriture pendant le rendu sur l'écran de vote." },
              { title: '', text: "Correction du passage d'un compte invité à un compte complet, qui déconnectait l'invité sans le vouloir." },
              { title: '', text: "Correction du champ e-mail de l'écran Compte." },
              { title: '', text: "Correction du texte tronqué des cartes de l'accueil et des en-têtes raccourcis en espagnol." },
            ],
          },
          {
            label: 'Technique',
            items: [
              { title: '', text: "Gestion d'état migrée vers les hooks useRoom et useGame." },
              { title: '', text: 'Routage aplati\u00A0: le groupe de routes (tabs) a été abandonné au profit de routes plates.' },
              { title: '', text: 'react-native-screens épinglé à ~4.18 pour la compatibilité avec expo-router 6.0.23.' },
              { title: '', text: 'Correction de la publication temps réel côté Supabase.' },
              { title: '', text: 'Suggestions de questions restructurées en triplets de traductions parallèles ({ en, es, ru })\u00A0: une seule source de vérité.' },
              { title: '', text: "Suppression des champs de schéma Expo obsolètes (privacy, privacyPolicyUrl, termsOfServiceUrl)\u00A0; les URL de confidentialité et de conditions sont gérées dans App Store Connect." },
            ],
          },
        ],
      },
      {
        tag: 'Première version',
        summary: "Première version publique de SpySocial sur l'App Store.",
        sections: [] as { label: string; items: { title: string; text: string }[] }[],
      },
    ],
  },

  roadmap: {
    eyebrow: 'Feuille de route',
    title: 'À venir',
    lede: (day: string) => `La mise à jour SpySocial\u00A02.2 arrive le ${day}. Découvre ce qu'elle apporte et ce qu'on prépare pour la suite.`,
    ledeOut: "La mise à jour SpySocial\u00A02.2 est là. Découvre ce qu'elle apporte et ce qu'on prépare pour la suite.",
    now: {
      coming: (day: string) => `Disponible le ${day}`,
      out: 'Disponible',
      title: 'SpySocial 2.2',
      sub: 'Notre plus grosse mise à jour.',
      features: [
        {
          title: 'Jouer en ligne',
          text: "Appuie sur « Trouver une partie » pour une table de 4 ou 8 joueurs, avec les mêmes règles standard pour tous. Si un espion est démasqué, chacun récupère son vote ; quand plus personne n'en a, la partie passe directement à sa fin. Il te faut juste un compte gratuit.",
        },
        {
          title: 'Spy Sketch',
          text: 'Une nouvelle façon de jouer : dessine le mot secret sur un tableau commun et démasque les espions qui font semblant.',
        },
        {
          title: 'Traduction automatique',
          text: "Discute dans le salon et pendant la partie, dans l'une des 10 langues : les messages dans une autre langue sont traduits dans la tienne dès leur arrivée. Les réponses de Spy Talk sont traduites avec leur question, pour garder tout leur sens.",
        },
        {
          title: 'Ton agent et la boutique',
          text: "Crée ton propre avatar d'espion et gagne de nouveaux looks en jouant. La boutique ne vend que des abonnements, qui débloquent tous les packs et te permettent de créer les tiens\u00A0: tout est facultatif, et rien ne change la façon de jouer.",
        },
        {
          title: 'Soirées jeux',
          text: 'Des parties en ligne programmées. Appuie sur « Me le rappeler » et on te préviendra avant le début.',
        },
        {
          title: "Couleurs d'agent",
          text: "Aux tables de « Jouer en ligne » et aux soirées jeux, les inconnus voient ta couleur d'agent, comme Agent Turquoise, jamais ton nom. Choisis tes trois couleurs préférées.",
        },
        {
          title: 'Codes de créateurs',
          text: "Un créateur ou SpySocial t'a donné un code ? Saisis-le dans les Réglages pour obtenir un titre ou une autre récompense.",
        },
        {
          title: 'Musique et sons',
          text: 'Trois morceaux lounge se relaient dans les menus, Spy Talk et Spy Sketch ont chacun le leur, et de nouveaux sons marquent les dernières secondes, la révélation de Spy Sketch et la victoire. Choisis la musique des menus dans les Réglages, ou coupe-la.',
        },
        {
          title: 'Temps de jeu conseillé',
          text: "Les règles du salon indiquent un temps de jeu conseillé selon le nombre de joueurs, dans Spy Talk comme dans Spy Sketch. L'hôte garde le dernier mot.",
        },
        {
          title: 'Sécurité',
          text: "SpySocial est réservé aux 13 ans et plus. Le chat a un filtre de mots, tu peux signaler ou bloquer n'importe quel joueur, et dans les salons avec un joueur de moins de 18 ans, le chat bloque les liens, les numéros de téléphone et les réseaux sociaux.",
        },
      ],
      more: "Et aussi : les statistiques, des titres et des cadres à débloquer, des niveaux jusqu'à 100 avec le prestige, de l'XP même pour les parties courtes, un retour en partie sans accroc quand ton téléphone se met en veille, des liens d'invitation qui marchent tout simplement, et un nouveau look sur chaque écran.",
      launchWeek: "Semaine de lancement : Spy Talk le mardi 8 décembre, Spy Sketch le vendredi 11 décembre et Mafia le samedi 12 décembre, chaque fois de 20 h à 22 h, heure de l'Est américain (ET).",
    },
    next: {
      status: 'Prévu',
      noDates: 'Pas encore de date',
      title: 'Ensuite',
      sub: "Après la 2.2, on s'attaque au côté compétitif de SpySocial.",
      plans: [
        {
          title: 'Mode classé',
          text: 'Joue des parties classées et affiche ton rang sur ton profil. Le matchmaking te place avec des joueurs de ton niveau.',
        },
        {
          title: 'Saisons',
          text: 'Chaque saison a ses propres récompenses, comme des titres et des cadres, selon le rang atteint et les parties jouées.',
        },
        {
          title: 'Tournois',
          text: "Inscris-toi à l'avance à un tournoi programmé et joue des manches à élimination à de petites tables. Les gagnants avancent, manche après manche, jusqu'à la table finale, avec des récompenses selon le classement.",
        },
      ],
    },
    outro: 'Les plans peuvent changer. Suis nos réseaux pour ne rien manquer.',
  },

  join: {
    title: 'Rejoindre la partie',
    noCode: 'Aucun code de salon fourni',
    browserOrPhone: "Joue dans ton navigateur, ou sur ton téléphone avec l'appli",
    openToJoin: 'Ouvre SpySocial pour rejoindre le salon',
    onPhone: 'Ouvre ce lien sur ton téléphone pour rejoindre le salon',
    roomCode: 'Code du salon',
  },

  joinEvent: {
    label: 'Événement public',
    broken: 'Ce lien d\'événement ne marche pas',
    brokenHelp: 'Vérifie-le, ou ouvre SpySocial et parcours les salons.',
    live: 'En direct',
    cancelled: 'Annulé',
    ended: 'Terminé',
    upcoming: 'À venir',
    full: 'Complet pour le moment',
    inRoom: (count: number, capacity: number) => `${count} / ${capacity} dans le salon`,
    yourTime: 'Ton heure',
    hostTime: (who: string, when: string) => {
      const w = who === "L'hôte" ? "l'hôte" : who
      return `Heure ${/^[aeiouyàâäéèêëîïôöùûüh]/i.test(w) ? "d'" : 'de '}${w}\u00A0: ${when}`
    },
    theHost: "L'hôte",
    hostedBy: (name: string) => `organisé par ${name}`,
  },

  resetPassword: {
    title: 'Réinitialise ton mot de passe',
    invalid: 'Lien de réinitialisation invalide ou expiré. Demandes-en un nouveau.',
    failed: 'Une erreur est survenue. Réessaie.',
    mismatch: 'Les mots de passe ne correspondent pas',
    previewSuccess: 'Aperçu\u00A0: mot de passe réinitialisé',
    success: 'Mot de passe réinitialisé',
    error: 'Erreur',
    unexpected: 'Erreur inattendue',
    done: 'Mot de passe réinitialisé\u00A0!',
    redirecting: 'Redirection…',
    newPassword: 'Nouveau mot de passe',
    newPlaceholder: 'Saisis ton nouveau mot de passe',
    minLength: 'Au moins 6 caractères.',
    confirm: 'Confirmer le mot de passe',
    confirmPlaceholder: 'Confirme le mot de passe',
    submit: 'Réinitialiser le mot de passe',
    cancel: 'Annuler',
    // passwordless (legalRelease LIVE.passwordless): the page that replaces the reset form.
    goneTitle: "Fini les mots de passe",
    goneBody: "Connectez-vous avec un code à usage unique dans l'app.",
    goneOpen: "Ouvrir SpySocial",
    goneNoApp: "Vous n'avez pas l'app ?",
    preview: (mode: string) => `Mode aperçu\u00A0: <b>${mode}</b>. L'envoi ne contacte pas Supabase.`,
  },

  deleteAccount: {
    title: 'Supprimer ton compte SpySocial',
    intro: "Tu peux supprimer ton compte SpySocial et les données personnelles qui y sont liées à tout moment, dans l'appli ou par e-mail. Pour toute question, écris-nous à <email/>.",
    appTitle: "Supprimer ton compte depuis l'appli",
    steps: (o: { avatars: boolean; oldApps: boolean }) => [
      'Ouvre SpySocial.',
      `Appuie sur ${o.avatars ? 'ton avatar' : 'ta photo'} en haut de l'écran d'accueil pour ouvrir <b>Compte</b>.${
        o.oldApps ? " (Dans les versions antérieures à 2.2, Compte est l'icône en bas à droite de l'écran d'accueil.)" : ''
      }`,
      'Appuie sur <b>Réglages</b> en haut à droite.',
      `Sous <b>Compte et connexion</b>, appuie sur <b>Supprimer le compte</b> (la dernière ligne, en rouge) et confirme.${
        o.oldApps ? ' (Dans les versions antérieures à 2.2, Supprimer le compte se trouve dans la Zone dangereuse, en bas de Compte.)' : ''
      }`,
    ],
    atOnce: 'Ton compte est supprimé immédiatement.',
    guestTitle: 'Comptes invités',
    guest: (purchases: boolean) =>
      `Un compte invité est supprimé dès que tu appuies sur <b>Se déconnecter</b> (dans les Réglages, sous Compte et connexion\u00A0; dans les versions antérieures à 2.2, dans Compte, sous Compte et sécurité) et que tu confirmes. Un invité ne peut pas se reconnecter, il n'y a donc aucune récupération possible.${
        purchases
          ? " Les achats font exception, comme pour tout compte supprimé\u00A0: ce que tu as acheté en tant qu'invité revient avec Restaurer les achats, sur le compte App Store ou Google Play avec lequel tu as payé."
          : ''
      }`,
    noAppTitle: "Tu n'as plus l'appli\u00A0?",
    noApp: "Écris à <email/> depuis l'adresse liée à ton compte, avec l'objet «\u00A0Delete my SpySocial account\u00A0». Les demandes sont traitées sous 30 jours.",
    deletedTitle: 'Ce qui est supprimé',
    staysTitle: 'Ce qui est conservé, et combien de temps',
    details: 'Notre <link>politique de confidentialité</link> donne tous les détails.',
  },

  beta: {
    eyebrow: 'Bêta\u00a02 · Test en direct',
    title: 'Joue en premier',
    lede: '<b>10\u00a0$ par PayPal</b> pour chaque joueur confirmé qui joue toute l’heure de ce test de jeu collectif en direct de SpySocial, le jeu gratuit de déduction sociale pour soirées, et envoie le questionnaire de 5\u00a0minutes, plus un bonus de 50\u00a0$ pour le rapport de bug ou l’idée la plus utile. En plus, des récompenses bêta à garder après la sortie\u00a0: le Pin bêta, deux titres, 10\u00a0interceptions de chaque niveau et 1\u00a0mois d’abonnement.',
    /** Short note under the lede and in the rewards: the test's progress does not carry over. */
    reset: 'Les parties, l’XP et les objets du test sont remis à zéro à la sortie.',
    headsUp: '<b>Attention\u00a0:</b> le SpySocial de l’App Store et de Google Play est une ancienne version. La bêta est une nouvelle version très différente\u00a0; tu l’installes depuis le lien qu’on t’envoie par e-mail.',
    facts: ['1\u00a0heure, en direct', '18\u00a0ans et plus', '24\u00a0places', 'iPhone ou Android'],
    when: {
      label: 'Quand',
      et: (time: string) => `${time}, heure de l’Est (ET)`,
      others: (pacific: string, utc: string) => `${pacific}, heure du Pacifique · ${utc}\u00a0UTC`,
      yours: (time: string) => `Chez toi\u00a0: ${time}`,
      checkIn: (time: string) => `L’accueil ouvre à ${time} (heure de l’Est) sur le salon vocal Discord.`,
    },
    europe: {
      label: 'Europe · Seconde session facultative',
      time: (cet: string, uk: string) => `${cet}\u00a0CET · ${uk} au Royaume-Uni`,
      note: (date: string) => `Elle n’a lieu que si assez de personnes en Europe s’inscrivent. Confirmation au plus tard le ${date}.`,
    },
    signUp: 'Je m’inscris',
    signUpNote: (day: string, time: string) => `Environ 2\u00a0minutes. Inscriptions jusqu’au ${day}, ${time} (heure de l’Est).`,
    discord: 'Rejoindre notre Discord',
    closed: 'Les inscriptions sont closes. Suis-nous sur Discord pour le prochain test.',
    games: {
      eyebrow: 'À quoi tu joues',
      title: 'Deux jeux',
      talk: 'Questions et réponses. Un ou deux joueurs ne connaissent pas le lieu secret et tentent de passer inaperçus.',
      sketch: 'Tout le monde complète le même dessin. Les espions font semblant.',
    },
    who: {
      eyebrow: 'Pour qui',
      title: 'Qui nous cherchons',
      adults: '<b>Adultes uniquement (18\u00a0ans et plus).</b> 24\u00a0places.',
      phones: '<b>Un iPhone (TestFlight) ou un téléphone Android (tests Google Play).</b> Les Android sont particulièrement bienvenus\u00a0:',
      androidLabel: 'Téléphones Android particulièrement recherchés',
      fans: '<b>Fans de déduction sociale\u00a0:</b> Among Us, Spyfall, Loup-Garou/Mafia, Blood on the Clocktower, Codenames. Débutants bienvenus aussi.',
      mic: '<b>Un micro aide.</b> Écouter seulement, ça marche aussi.',
      langs: '<b>Le jeu existe en 10\u00a0langues\u00a0:</b>',
      langsLabel: 'Les langues du jeu',
    },
    ask: {
      eyebrow: 'Ce qu’on te demande',
      title: 'Joue. Parle. Raconte.',
      steps: ['<b>Joue</b> pendant l’heure.', '<b>Dis à voix haute</b> tout ce qui te paraît confus.', '<b>Réponds à un sondage de 5\u00a0minutes</b> après.'],
      wantTitle: 'Ce qu’on veut savoir',
      want: ['Voit-on clairement à qui c’est le tour\u00a0?', 'Le vote est-il facile à comprendre\u00a0?', 'Le dessin marche-t-il bien sur ton téléphone\u00a0?'],
    },
    get: {
      eyebrow: 'Ce que tu reçois',
      title: 'Récompenses bêta à garder après la sortie',
      items: ['Le <b>Pin bêta</b>', 'Les titres <b>«\u00a0Bêta-testeur\u00a0»</b> et <b>«\u00a0Testeur de terrain\u00a0»</b>', '<b>10\u00a0interceptions</b> de chaque niveau', '<b>1\u00a0mois</b> d’abonnement'],
      prizeTitle: '10\u00a0$ par PayPal + un bonus de 50\u00a0$',
      prize: '10\u00a0$ par PayPal pour chaque joueur confirmé qui joue toute l’heure et envoie le questionnaire de 5\u00a0minutes, versés dans les 7\u00a0jours après la session. En plus, un bonus de 50\u00a0$ (carte cadeau) pour le rapport de bug ou l’idée la plus utile, choisi par le développeur sous une semaine.',
      seats: (day: string) => `24\u00a0places. Seuls les joueurs qu’on confirme par e-mail (au plus tard le ${day}) sont payés\u00a0; les autres passent sur la liste d’attente du prochain test.`,
    },
    friends: {
      eyebrow: 'Amis',
      title: 'Viens avec un ami',
      text: '<b>Indique le nom d’un ami dans le formulaire</b> pour être à la même table. Les testeurs de la Bêta\u00a01 passent en premier.',
    },
    join: {
      eyebrow: 'Comment participer',
      title: 'Quatre étapes',
      form: '<link>Remplis le formulaire d’inscription</link> (environ 2\u00a0minutes).',
      closes: (day: string, time: string) => `Inscriptions jusqu’au ${day}, ${time} (heure de l’Est).`,
      email: (day: string) => `On t’écrit au plus tard le ${day} pour confirmer ta place et t’envoyer le lien d’installation.`,
      discord: '<link>Rejoins notre Discord</link>\u00a0: l’accueil se fait sur son salon vocal.',
      android: 'Android\u00a0: le formulaire demande l’adresse Google de ton Play Store, car Google l’exige pour les versions de test. Elle est supprimée après la session.',
      iphone: 'iPhone\u00a0: tu installes SpySocial avec TestFlight, via le lien de l’e-mail.',
    },
    fine: 'Version de pré-lancement. Ne partage pas les noms ni le chat des autres joueurs. Tes données d’inscription sont supprimées après la Bêta\u00a02. Ton adresse PayPal est supprimée une fois le paiement fait.',
  },

  notFound: {
    title: 'Page introuvable',
    text: "La page que tu cherches n'existe pas.",
  },

  confirmSuccess: {
    title: 'E-mail confirmé',
    text: "Ton adresse e-mail a bien été vérifiée. Tu peux maintenant utiliser toutes les fonctions de l'appli SpySocial.",
    home: "Retour à l'accueil",
    expiredTitle: 'Lien expiré',
    expired: 'Ce lien a expiré ou a déjà été utilisé. Ouvre SpySocial et appuie sur <b>Renvoyer</b>.',
    browserText: 'Ton adresse e-mail a bien été vérifiée. Retourne sur SpySocial dans ton navigateur et connecte-toi.',
    browserPhoneText: "Ton adresse e-mail a bien été vérifiée. Retourne sur SpySocial sur l'ordinateur utilisé pour l'inscription et connecte-toi.",
    browserButton: 'Retour à SpySocial',
  },

  launch: {
    railLabel: "Écrans de SpySocial 2.2",
    shots: {
      talk: "Spy Talk : Des questions malignes. Démasque l'espion.",
      sketch: "Spy Sketch : Dessine le mot secret. Démasque l'imposteur.",
      online: "Jouer en ligne : Une table de 4 ou 8, à tout moment",
      gamenight: "Soirée jeux : Des titres à gagner ce soir-là seulement",
      market: "Marché noir : Échange des objets avec d'autres agents",
      friends: "Amis : Ajoute tes amis. Jouez ensemble.",
    },
    cards: [
      { title: "Spy Sketch", text: "Dessine le mot secret sur un tableau partagé et démasque l'espion qui fait semblant." },
      { title: "Jouer en ligne", text: "Touche « Trouver une partie » pour une table de 4 ou 8, à tout moment. Les inconnus voient ta couleur d'agent, jamais ton nom." },
      { title: "Soirée jeux", text: "Des soirées en ligne programmées, avec des titres à gagner ce soir-là seulement. On te prévient avant le début." },
      { title: "Marché noir", text: "Échange des objets avec tes amis et d'autres agents, ou achète-les et vends-les contre de l'Intel, gagné en jouant." },
      { title: "Abonnements", text: "En option : le Pack Pass (mensuel ou annuel) ou Lifetime débloque tous les packs de lieux et de mots, et te permet de créer les tiens. Rien d'autre n'est vendu." },
    ],
    allNotes: "Toutes les nouveautés de la 2.2",
    community: {
      title: "Trouve ta table",
      text: "Soirées jeux, nouvelles et joueurs qui cherchent une partie : rejoins le Discord de SpySocial.",
      discord: "Rejoindre le Discord",
      pressTitle: "Presse et créateurs",
      press: "Tu écris sur SpySocial ou tu veux y jouer sur ta chaîne ? Écris à <email/> avec « Presse » dans l'objet.",
    },
    notes: {
      tag: "Lancement",
      summary: "Notre plus grosse mise à jour : Spy Sketch, Jouer en ligne, les soirées jeux, les échanges au Marché noir et les abonnements.",
      newLabel: "Nouveau dans la 2.2",
      moreLabel: "Et plus encore",
    },
  },
}

export default fr
