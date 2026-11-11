import type { HelpOpts, HelpSection, HelpText } from '../types'

/**
 * Français (fr) : français de France, « tu » comme dans l'appli ; les mots de l'appli (salon, local, espion, hôte,
 * « Jouer en ligne », « Trouver une partie », Coffre, Marché noir, Trouvailles rares, interceptions, Intel, Réglages).
 * Written with plain spaces before : ? ! ; and inside « » : `nb` puts the no-break spaces in.
 */
const nb = (t: string) => t.replace(/ ([:?!;»])/g, '\u00A0$1').replace(/« /g, '«\u00A0').replace(/ %/g, '\u00A0%')

const sections = (o: HelpOpts): HelpSection[] => [
  {
    id: 'start',
    title: 'Pour commencer',
    items: [
      {
        id: 'what-is-spysocial',
        q: "Qu'est-ce que SpySocial ?",
        a: [
          "Un jeu d'ambiance gratuit de déduction sociale, de 3 à 21 joueurs. La plupart sont des locaux qui partagent un secret. Un ou plusieurs espions ne le connaissent pas et essaient de passer inaperçus. Démasque l'espion, ou mène tout le monde en bateau si c'est toi.",
          "Il y a deux jeux : <b>Spy Talk</b>, où chacun pose des questions et y répond à propos d'un lieu secret, et <b>Spy Sketch</b>, où chacun dessine à son tour un mot secret.",
        ],
      },
      {
        id: 'how-many-players',
        q: 'Combien de joueurs faut-il ?',
        a: [
          'Un salon privé se joue de 3 à 21 joueurs.',
          '<b>Jouer en ligne</b> t\'installe à une table de 4 ou 8.',
          "L'hôte choisit le nombre d'espions, selon les joueurs du salon : à 8 joueurs, jusqu'à 3 espions.",
        ],
      },
      {
        id: 'is-it-free',
        q: 'SpySocial est-il gratuit ?',
        a: [
          'Oui. Les deux jeux, Jouer en ligne, les salons privés et la Soirée jeux sont gratuits, sans publicité.',
          `L'abonnement, facultatif, débloque les packs premium et quelques looks pour ton agent. Rien de ce que tu achètes ne t'aide à gagner.${o.purchases ? '' : " L'abonnement sera en vente avec la version 2.2."}`,
        ],
      },
      {
        id: 'start-a-game',
        q: 'Comment lancer une partie ?',
        a: [
          '<b>Entre amis :</b> touche <b>Salon privé</b>, puis <b>Créer un salon</b>, et partage le code du salon, le QR code ou le lien d\'invitation. Il faut au moins 3 joueurs.',
          '<b>Avec n\'importe qui :</b> touche <b>Jouer en ligne</b>, puis <b>Trouver une partie</b>.',
          "<b>Tu débutes ?</b> <b>Comment jouer</b>, sur l'accueil, propose une intro d'une minute, des tutoriels, un glossaire et une partie d'entraînement.",
        ],
      },
    ],
  },
  {
    id: 'how-to-play',
    title: 'Comment jouer',
    items: [
      {
        id: 'roles',
        q: 'Que font les locaux et les espions ?',
        a: [
          'Les <b>locaux</b> voient le secret : un lieu dans Spy Talk, un mot dans Spy Sketch. Tous ont le même. Montre que tu le connais sans le dévoiler.',
          "Les <b>espions</b> voient « Espion ». Écoute, fais comme si tu connaissais le secret toi aussi et devine-le avant d'être démasqué.",
          'En mode <b>Mafia</b>, les espions se connaissent et partagent un chat privé. En <b>Classique</b>, chaque espion joue seul. Avec 1 espion, les deux modes se jouent pareil.',
        ],
      },
      {
        id: 'spy-talk',
        q: 'Comment se joue Spy Talk ?',
        a: [
          "D'abord les questions : chacun son tour, chaque joueur pose une question au suivant et répond à une.",
          'Ensuite la discussion libre : discute, creuse les réponses bizarres et lance des votes.',
          "Pas d'idée ? La carte d'indices en bas de l'écran propose une question. Demander le nom du lieu ou sa première lettre, ce n'est pas du jeu.",
        ],
      },
      {
        id: 'spy-sketch',
        q: 'Comment se joue Spy Sketch ?',
        a: [
          "Les joueurs dessinent à tour de rôle sur un tableau blanc commun. Les locaux suggèrent le mot sans le dessiner franchement. Les espions ajoutent quelque chose de vague qui pourrait coller.",
          "Une fois que chacun a joué son tour, les votes et la tentative de l'espion s'ouvrent. Les manches continuent jusqu'à la fin de la partie.",
            'Les dessins de Spy Sketch ne sont pas décrits à voix haute : un lecteur d’écran (VoiceOver, TalkBack) ne peut donc pas suivre le dessin.',
        ],
      },
      {
        id: 'voting',
        q: 'Comment fonctionne le vote ?',
        a: [
          'Ouvre <b>Actions</b> et touche <b>Voter</b>. Chacun choisit un joueur ou <b>S\'abstenir</b>, puis valide. Un vote validé ne peut plus changer.',
          '<b>Majorité absolue :</b> un joueur n\'est éliminé qu\'avec les voix de plus de la moitié des joueurs encore en jeu.',
          '<b>Majorité relative :</b> le plus de voix suffit, à condition de dépasser les abstentions et les non-votants.',
          "Une égalité en tête n'élimine personne, et il faut toujours au moins 2 voix.",
          "Aux tables de Jouer en ligne, chaque joueur peut lancer un vote et désigne qui il accuse. Quand un vote démasque un espion, tous ceux qui avaient utilisé le leur le récupèrent.",
          "Aux tables de 8 joueurs, la personne qui a le plus de voix est éliminée, jusqu'à ce qu'il reste 4 joueurs ; ensuite, il faut la majorité absolue. Ne pas voter compte comme une abstention.",
        ],
      },
      {
        id: 'spy-guess',
        q: "Comment l'espion devine-t-il le secret ?",
        a: [
          'Un espion ouvre <b>Actions</b> et touche <b>Deviner</b>. Il a 60 secondes pour choisir le secret dans une liste d\'une trentaine de réponses.',
          "Bonne réponse : tous les espions gagnent. Mauvaise réponse, ou temps écoulé : cet espion est éliminé. Si c'était le dernier, les locaux gagnent.",
          'Tout le monde voit qui devine : ça te trahit.',
          "Avec <b>Une seule tentative</b> (salons privés et Soirées jeux qui l'activent), l'équipe des espions n'a qu'un essai : raté, et c'est toute l'équipe qui perd.",
        ],
      },
      {
        id: 'winning',
        q: 'Comment chaque camp gagne-t-il ?',
        a: [
          "Les <b>locaux</b> gagnent en éliminant tous les espions par vote, ou si le dernier espion se trompe.",
          "Les <b>espions</b> gagnent avec une bonne réponse, quand le chrono de la partie arrive à zéro, ou quand un vote laisse autant d'espions que de locaux.",
          "Partir compte comme être éliminé par un vote : si le dernier espion part, les locaux gagnent ; si trop de locaux partent, les espions gagnent. Si cela arrive avant la fin des questions (dans Spy Sketch, au premier tour), la partie affiche « Pas de résultat » et ne compte pas.",
          "<b>Vote final :</b> si le temps est écoulé et qu'il reste exactement un espion, tout le monde vote une dernière fois. Démasquez-le et les locaux gagnent. Il est actif à Jouer en ligne et c'est un réglage dans les salons privés.",
          "<b>Informateur</b> (salons privés et Soirées jeux qui l'activent) : un local connaît un espion. Si les espions sont pris par un vote ou une mauvaise réponse, ils ont 30 secondes pour nommer ce local et voler la victoire.",
        ],
      },
    ],
  },
  {
    id: 'ways-to-play',
    title: 'Façons de jouer',
    items: [
      {
        id: 'play-online',
        q: "C'est quoi, Jouer en ligne ?",
        a: [
          "<b>Trouver une partie</b> t'installe à une table de 4 ou 8 avec d'autres joueurs. Toutes les tables suivent les mêmes règles standard, sans hôte.",
          'Les joueurs que tu ne connais pas voient ta couleur d\'agent, comme Agent Turquoise, jamais ton nom.',
          'Il te faut un compte sauvegardé (e-mail confirmé, ou connexion Apple ou Google) et avoir 13 ans ou plus.',
          'Quitter une partie après la distribution des rôles entraîne une courte pause sur Jouer en ligne.',
        ],
      },
      {
        id: 'private-rooms',
        q: 'Comment fonctionnent les salons privés ?',
        a: [
          "Les salons créés par les joueurs sont privés, pour les gens que tu connais. Tes amis entrent avec le code du salon, le QR code ou le lien d'invitation. Les invités sans compte aussi.",
          "L'hôte fixe les règles : jeu, espions, chronos, vote et packs. Le nombre de joueurs monte jusqu'à 21, et <b>Verrouiller le salon</b> bloque les nouveaux venus.",
          "Tout le monde joue avec les packs que l'hôte a débloqués.",
        ],
      },
      {
        id: 'game-night',
        q: "C'est quoi, la Soirée jeux ?",
        a: [
          "Des parties en ligne que nous organisons, les soirs annoncés dans l'appli, en général de 20 h à 22 h, heure de l'Est des États-Unis. Touche <b>Jouer</b> sur la carte Soirée jeux de l'accueil.",
          'Chaque soirée a ses packs, ses réglages et ses titres. Le (i) à côté de la soirée affiche ses packs et ses réglages, et <b>Prix</b>, sur la carte, ses titres.',
          "C'est gratuit, et rien de ce que tu achètes n'améliore tes chances. Le règlement complet : <gnr>règles de la Soirée jeux</gnr> (en anglais).",
        ],
      },
      {
        id: 'practice-game',
        q: "C'est quoi, la partie d'entraînement ?",
        a: [
          "Une partie de 5 à 9 minutes contre des agents IA, avec un coach, dans <b>Comment jouer</b>. Tu reçois une note de A à F et tu peux reprendre là où tu t'es arrêté.",
          "Avant de jouer à Spy Talk ou Spy Sketch en ligne, l'appli peut te demander de réussir l'entraînement de ce jeu avec un C ou mieux. La Soirée jeux ne le demande jamais.",
        ],
      },
      {
        id: 'languages',
        q: "Puis-je jouer avec des gens qui parlent d'autres langues ?",
        a: [
          'SpySocial existe en 10 langues : anglais, espagnol, russe, chinois simplifié, hindi, arabe, français, bengali, portugais du Brésil et indonésien.',
          ...(o.onePool
            ? [
                "Chacun voit la partie dans sa langue, secret et indices compris : une même table peut mélanger les langues.",
                o.autoTranslation
                  ? 'Les messages dans une autre langue sont traduits automatiquement dans la tienne. Pour traduire seulement quand tu touches, désactive <b>Traduire les messages automatiquement</b> dans les Réglages.'
                  : 'Touche <b>Traduire</b> sur un message pour le lire dans ta langue.',
              ]
            : ["Dans un salon privé, l'hôte choisit la langue de la partie pour le secret et les indices."]),
          ...(o.autoTranslation ? ["Jouer en ligne peut te proposer d'ajouter ta langue au traducteur de ton téléphone. C'est facultatif, et ça garde les lignes en anglais du chat traduites quand notre traducteur est occupé."] : []),
        ],
      },
    ],
  },
  {
    id: 'in-game',
    title: 'Pendant la partie',
    items: [
      {
        id: 'wax-seal',
        q: "C'est quoi, le sceau de cire ?",
        a: [
          "Le sceau en haut à droite de l'écran de jeu. Touche-le à tout moment pour le chat complet de la partie, tes notes et les infos de la partie. Un point rouge signale de nouveaux messages.",
          "Touche la photo d'un joueur pour l'interpeller dans le chat. Fais glisser un message pour y répondre.",
          "Mentir et bluffer font partie du jeu. Dire le secret tel quel, non.",
        ],
      },
      {
        id: 'notes',
        q: 'Comment marchent les notes ?',
        a: [
          "Appuie longuement sur la photo d'un joueur pour ouvrir tes notes sur lui.",
          "Le <b>Tableau</b> range les joueurs en Soupçon, Doute et Confiance. Dans Spy Talk, l'<b>Historique</b> montre ce que chacun a demandé et répondu.",
          'Les espions ont à la place un tableau de déductions : <b>Mes déductions</b>, avec Peut-être, Oui et Non.',
          'Tes notes sont privées, restent sur ton téléphone et sont effacées après l\'écran de fin.',
        ],
      },
      {
        id: 'leave-rejoin',
        q: 'Puis-je quitter une partie et revenir ?',
        a: [
          "Le bouton <b>Quitter</b> propose <b>Faire une pause</b>, qui garde ta place (la carte de l'accueil a <b>Revenir</b>), ou <b>Partir pour de bon</b> : tu ne peux plus revenir dans cette partie et, si elle compte, c'est une défaite pour toi.",
          "L'hôte peut toucher <b>Terminer la partie pour tous</b>. Personne ne gagne alors.",
          'Aux tables de Jouer en ligne, partir après la distribution entraîne une courte pause sur Jouer en ligne.',
        ],
      },
    ],
  },
  {
    id: 'friends',
    title: 'Amis et groupes',
    items: [
      {
        id: 'add-friends',
        q: 'Comment ajouter des amis ?',
        a: [
          "<b>En personne :</b> montre ton <b>code ami</b> et laisse ton ami le scanner dans SpySocial. Il change souvent : une capture d'écran cesse vite de marcher.",
          '<b>Depuis une partie privée</b> jouée ensemble dans les dernières 24 heures.',
          "<b>Entre adultes :</b> depuis une table publique, ou par nom d'utilisateur exact, s'ils l'autorisent.",
          "L'amitié est réciproque. Tu peux retirer ou bloquer un ami à tout moment, sans qu'il soit prévenu. Il n'y a pas de messages privés.",
        ],
      },
      {
        id: 'parties',
        q: "C'est quoi, un groupe ?",
        a: [
          "Un chef et ses amis qui jouent ensemble, jusqu'à 21 personnes en tout. Il faut un abonnement pour en créer un. Si le chef part, la main passe d'abord à quelqu'un qui a un abonnement.",
          "Aux tables de Jouer en ligne et aux Soirées jeux, un groupe occupe au plus la moitié d'une table, signalé à tous : jusqu'à 2 à une table de 4, jusqu'à 4 à une table de 8.",
          "À une table de 12 places d'une Soirée jeux, jusqu'à 6. Les membres du groupe qui cherchent seuls comptent aussi : ensemble, jamais plus de la moitié d'une table.",
          "Pour s'asseoir à la même table, cherchez depuis le groupe : <b>Jouer en ligne</b> tout seul, c'est une recherche en solo. Après une partie de Jouer en ligne, <b>Retour à ton groupe</b> t'y ramène.",
          'Quitter une partie en cours te vaut la pause habituelle de Jouer en ligne, et ton groupe ne peut pas chercher de table avant la fin de celle-ci. Tant que tu as une place dans une partie, tu restes dans le groupe, même si ton téléphone se met en veille.',
          'Tout groupe peut ouvrir un salon privé ensemble, et un groupe trop grand pour une table y joue.',
          'Le chat du groupe suit les mêmes règles que tout le chat. Pour signaler un message, appuie longuement dessus.',
        ],
      },
      {
        id: 'privacy-friends',
        q: "Qui peut voir que je suis en ligne, ou m'inviter ?",
        a: [
          "C'est toi qui décides, dans <b>Confidentialité et amis</b> : qui peut t'ajouter, si tes amis te voient en ligne, et qui peut t'inviter dans des salons et des groupes.",
          'Tes amis voient seulement En ligne, Joue en ligne, Dans un salon privé ou À la Soirée jeux, jamais quel salon. Personne ne voit ta liste d\'amis.',
          'Les adultes peuvent avoir un profil public et des abonnés. Pas les moins de 18 ans.',
        ],
      },
    ],
  },
  {
    id: 'trading',
    title: 'Échanges',
    items: [
      {
        id: 'who-can-trade',
        q: 'Qui peut échanger, et quoi ?',
        a: [
          "Tu échanges avec tes amis, dans l'appli. Il te faut un compte d'au moins 7 jours, un e-mail confirmé et 3 parties comptées (des parties terminées qui comptent dans tes stats, avec au moins 2 autres comptes sauvegardés sur d'autres téléphones).",
            ...(o.launch ? [] : ['Pendant le test bêta, jusqu’au 7 décembre, les règles d’ancienneté du compte, de parties comptées et de nouvel appareil sont levées : chaque testeur peut échanger dès que son e-mail est confirmé.']),
          "Chaque côté propose jusqu'à 10 objets, et les deux confirment avant l'échange. Les gros échanges demandent un code envoyé par e-mail.",
          ...(o.interceptsInTrades ? ['Les adultes peuvent aussi mettre des Interceptions non ouvertes dans un échange : choisis combien de chaque niveau. Chacune compte pour un des 10 objets.'] : []),
          ...(o.interceptsInTrades && !o.launch ? ["Pendant la bêta, jusqu'au 7 décembre, n'importe quelle Interception non ouverte peut entrer dans un échange, quelle que soit son origine. De toute façon, les Interceptions repartent de zéro au lancement."] : []),
          "Ce que tu mets dans un échange ouvert lui est réservé : ça ne peut pas aller dans un autre échange ou sur le Marché noir en même temps. Si l'Intel d'un échange est dépensé avant qu'il se fasse, un avertissement s'affiche de ce côté, et l'échange ne peut pas se faire tant que le montant n'est pas baissé.",
          "L'appli indique quels objets s'échangent. L'abonnement et ce qu'il inclut, les récompenses de niveau et les objets des jeux d'arcade, jamais.",
          "L'Intel ne s'échange qu'entre adultes.",
          ...(o.launch ? [] : ['Pendant le test bêta, jusqu’au 7 décembre, les testeurs adultes échangent aussi de l’Intel. Le 7 décembre, toute l’Intel échangée est rendue : celui qui l’a donnée la récupère, et chacun ne garde que l’Intel qu’il a gagnée.', 'À partir du 7 décembre, les interceptions reçues par un code ou un cadeau, ce qu’elles contiennent et ce que tu obtiens avec elles par Échange restent sur ton compte : tu peux t’en servir, mais pas les échanger ni les vendre.']),
          "Acheter ou vendre des objets, de l'Intel ou des comptes contre de l'argent réel est interdit.",
        ],
      },
      {
        id: 'trade-protection',
        q: "C'est quoi, la protection de 7 jours ? Puis-je annuler un échange ?",
        a: [
          "Ce que tu reçois dans un échange est protégé pendant 7 jours. Tu peux porter un objet tout de suite, mais pas encore l'échanger, le déchiqueter ni l'utiliser dans un Échange, et l'Intel reçu ne se dépense pas encore.",
          ...(o.interceptsInTrades ? ["Une Interception non ouverte que tu reçois reste scellée pendant ces 7 jours : tu ne peux pas encore l'ouvrir, l'échanger ni la mettre en vente."] : []),
          'Pendant ces 7 jours, tu peux annuler tes échanges, une fois tous les 90 jours. Ça annule tous tes échanges protégés et met tes échanges en pause pendant 30 jours.',
          "Après 7 jours, l'échange est définitif. Nous pouvons aussi annuler un échange en cas de vol de compte ou de fraude.",
        ],
      },
      {
        id: 'trade-deleted-account',
        q: 'Et si quelqu\'un supprime son compte après un échange ?',
        a: [
          "Si l'autre joueur supprime son compte dans les 7 jours, l'échange est annulé : tu récupères ce que tu as donné, et ce que tu as reçu de lui est retiré.",
          'Si tu supprimes le tien dans les 7 jours, ce que tu as reçu retourne au joueur qui te l\'a donné.',
        ],
      },
      {
        id: 'trading-under-18',
        q: 'Les moins de 18 ans peuvent-ils échanger ?',
        a: [
          "Oui, avec des limites : uniquement objet contre objet, et seulement avec des amis ajoutés en personne avec un code ami.",
          "Pas de cadeaux, pas d'Intel, pas d'interceptions non ouvertes, et ni achat ni vente au Marché noir.",
          "Sur iPhone et iPad, les moins de 18 ans ne peuvent pas échanger tant qu'une version de l'appli qui demande l'accord d'un parent via Apple n'est pas sortie.",
        ],
      },
      {
        id: 'trading-paused',
        q: 'Pourquoi mes échanges sont-ils en pause ?',
        a: [
          "Les échanges se mettent en pause un moment après un changement d'e-mail ou de mode de connexion, après une connexion sur un nouvel appareil, après l'annulation de tes échanges (30 jours), ou quand tu les verrouilles toi-même.",
          "La pause après un nouvel appareil dure 24 heures ; après un changement d'e-mail ou de connexion, 3 jours.",
            ...(o.launch ? [] : ['Pendant le test bêta, jusqu’au 7 décembre, une connexion sur un nouvel appareil ou un changement d’e-mail ou de mode de connexion ne met pas les échanges en pause.']),
          "Ça protège tes objets si quelqu'un d'autre accède à ton compte.",
          "Nous pouvons aussi mettre nous-mêmes en pause les échanges d'un compte, pour le protéger ou le temps de vérifier une fraude.",
            "Chacune de ces pauses, ton propre verrouillage compris, ferme aussitôt tes offres et annonces ouvertes sur le Marché noir. Un bannissement, une suspension ou une vérification de fair-play aussi. Les objets te reviennent, l'Intel d'une offre d'achat attend que tu la récupères, et les offres des autres joueurs sur tes annonces leur reviennent. Rien ne rouvre à la fin : il faut republier.",
          "Si nous déconnectons ton compte sur tous les appareils sans mettre les échanges en pause, tes offres et annonces du Marché noir d'avant cela affichent <b>En attente</b> et ne s'exécutent pas. Quand ta nouvelle connexion peut échanger, touche <b>Remettre</b> sur chacune qui est à toi, ou arrête-la.",
        ],
      },
    ],
  },
  {
    id: 'black-market',
    title: 'Marché noir et Trouvailles rares',
    items: [
      {
        id: 'what-is-black-market',
        q: "C'est quoi, le Marché noir et les Trouvailles rares ?",
        a: [
          "Le Marché noir, dans le <b>Coffre</b>, est l'endroit où les adultes achètent et vendent des objets échangeables contre de l'Intel, jamais contre de l'argent.",
          "<b>Objets :</b> place une offre d'achat ou de vente au prix que tu veux. Elle rencontre le meilleur prix en face.",
          '<b>Trouvailles rares :</b> chaque objet Unique est mis en vente à part, à un prix, et le vendeur peut accepter des offres plus basses.',
          "Les interceptions non ouvertes s'y vendent aussi, par niveau. Personne ne voit qui achète ou qui vend.",
        ],
      },
      {
        id: 'black-market-who',
        q: 'Qui peut utiliser le Marché noir ?',
        a: [
          "Les adultes qui peuvent échanger : un compte d'au moins 7 jours, un e-mail confirmé, 3 parties comptées et pas de pause des échanges.",
            ...(o.launch ? [] : ['Pendant le test bêta, jusqu’au 7 décembre, les règles d’ancienneté du compte et de parties comptées sont levées ici aussi.']),
          "Les moins de 18 ans peuvent regarder, mais ni acheter, ni vendre, ni faire d'offres.",
          ...(o.launch ? [] : [o.testerMarket ? "Bêta 2 : du 9 au 16 novembre, les adultes qui peuvent échanger achètent et vendent ici pour de vrai. Toutes les ventes faites pendant le test sont annulées le 16 novembre : l'acheteur récupère l'Intel payé et le vendeur rend ce qu'il a reçu." : "L'Intel y circulera à partir du lancement de la 2.2, le 8 décembre. D'ici là, tu peux faire un tour."]),
        ],
      },
      {
        id: 'black-market-fees',
        q: 'Quels frais, limites et prix minimum ?',
        a: [
          "Chaque objet vendu coûte 2 % de frais (1 Intel au moins, 5 000 au plus), retirés du jeu.",
          "Aucune offre ne peut passer sous le prix minimum d'un objet : ce que rapporte le déchiquetage d'un exemplaire. Pour une interception non ouverte, c'est la moyenne de son niveau.",
          "Les membres peuvent avoir 8 offres ouvertes à la fois, les autres 4. Tant qu'une offre est ouverte, son Intel ou ses objets sont réservés (tu peux toujours porter les objets).",
          'Tu peux arrêter une offre à tout moment et récupérer ce qui reste.',
        ],
      },
      {
        id: 'black-market-protection',
        q: 'Les ventes du Marché noir sont-elles protégées ?',
        a: [
          'Une vente sur Objets est définitive tout de suite.',
          "Un Unique acheté sur Trouvailles rares est protégé pendant 3 jours : impossible de l'échanger, de le remettre en vente, de le déchiqueter ou de l'utiliser dans un Échange, et l'Intel du vendeur attend. Pendant ce temps, la vente peut être annulée, comme un échange.",
          "Si l'acheteur ou le vendeur supprime son compte pendant ces 3 jours, la vente est annulée : l'acheteur récupère son Intel, ou le vendeur récupère l'Unique.",
        ],
      },
    ],
  },
  {
    id: 'rewards',
    title: 'Interceptions et Intel',
    items: [
      {
        id: 'intercepts',
        q: "C'est quoi, les interceptions ?",
        a: [
          "Des récompenses scellées que tu gagnes en jouant. Chacune s'ouvre sur un objet cosmétique au hasard, comme un look pour ton agent ou une célébration.",
          "Elles ne sont jamais vendues contre de l'argent, et l'abonnement n'en donne ni plus ni de meilleures chances.",
          o.launch ? "Avant d'en ouvrir ou d'en acheter une, l'appli affiche les probabilités exactes dans <b>Probabilités</b>." : "Avant d'en ouvrir une, l'appli affiche les probabilités exactes dans <b>Probabilités</b>.",
        ],
      },
      {
        id: 'intercept-tiers',
        q: 'Quels sont les niveaux des interceptions ?',
        a: [
          'Cinq niveaux, du plus bas au plus haut : <b>Restreint</b>, <b>Confidentiel</b>, <b>Secret</b>, <b>Très secret</b> et <b>Enigma</b>.',
          "Le niveau est fixé quand tu la gagnes. Plus il est haut, meilleures sont les chances.",
          "Un <b>Unique</b> est un exemplaire avec une couleur et un numéro qu'aucun autre n'a.",
        ],
      },
      {
        id: 'earn-intercepts',
        q: 'Comment gagner des interceptions ?',
        a: [
          '<b>Victoires :</b> toutes les 10 victoires à Jouer en ligne, tu reçois 5 interceptions, dont une de niveau Secret ou mieux.',
          "<b>Chaque jour :</b> ta première partie du jour à Jouer en ligne t'en donne une, et les longues séries en ajoutent (tous les 30 jours d'affilée, une Enigma).",
          '<b>Soirée jeux :</b> les gagnants de la soirée reçoivent une Enigma.',
          `<b>Codes et cadeaux :</b> un code d'un créateur ou de nous marche une fois par compte, et ses interceptions se débloquent après ta première partie comptée à Jouer en ligne. Nous en offrons aussi.${o.launch ? " Les interceptions d'un code ou d'un cadeau sont pour toi seul : elles ne s'échangent ni ne se vendent." : ''}`,
          'Les salons privés ne donnent pas d\'interceptions.',
          ...(o.launch
            ? []
            : ["Avant l'ouverture de la 2.2 à tous, les interceptions repartent de zéro : celles gagnées dans les versions de test sont effacées. Le Pin bêta et ce qui a été acheté dans un store restent."]),
        ],
      },
      {
        id: 'duplicates',
        q: 'Que faire des doublons ?',
        a: [
          "<b>Déchiquette</b> un doublon contre de l'Intel, au montant affiché par l'appli.",
          "<b>Échange :</b> 5 doublons d'une rareté te donnent 1 objet au hasard de la rareté suivante, et 10 doublons Légendaires te donnent un Unique.",
          'Seuls les doublons comptent, jamais ton premier exemplaire ni un Unique.',
          'Un exemplaire acheté ou reçu dans un échange compte comme doublon si tu as un autre exemplaire de cet objet. Ton seul exemplaire reste toujours.',
        ],
      },
      {
        id: 'intel',
        q: "C'est quoi, l'Intel ?",
        a: [
          'La monnaie que tu gagnes en jouant : avec tes parties, ta première partie du jour et ta série quotidienne, et en déchiquetant des doublons.',
          'Ta série : une partie de Jouer en ligne par jour la garde. Une partie lancée avant le nouveau jour la garde aussi, même si elle finit après.',
          o.launch ? "L'Intel n'est jamais vendu et n'a aucune valeur en argent. Les adultes le dépensent au Marché noir et peuvent l'échanger avec d'autres adultes." : 'L’Intel n’est jamais vendu et n’a aucune valeur en argent. Les adultes peuvent l’échanger avec d’autres adultes, et le dépenser au Marché noir à partir du lancement de la 2.2, le 8 décembre, ou pendant un test dont les ventes sont annulées.',
          "Chaque changement de ton Intel est une ligne de ton registre Intel, avec son motif. Consulte le tien dans <b>Historique d'Intel</b>, depuis « Comment fonctionne l'Intel », sur la dernière mise à jour de l'appli.",
          "Dans le <b>Coffre</b>, ton Intel a sa propre tuile, une pile qui grandit avec le montant. Touche-la pour voir ce que tu as gagné aujourd'hui, gagné en tout et dépensé en tout. L'Intel bloqué dans une offre ouverte du Marché noir compte comme dépensé jusqu'à son retour.",
        ],
      },
      {
        id: 'verifying',
        q: 'Pourquoi une récompense affiche « Vérification » ?',
        a: [
          "À partir du 8 décembre 2026, nos contrôles de fair-play peuvent retenir les nouvelles récompenses d'un compte jusqu'à 72 heures, le temps qu'un membre de l'équipe examine un signe net de farm, de bots ou de triche.",
          "Tu peux demander un réexamen dans l'appli.",
        ],
      },
      {
        id: 'missing-item',
        q: 'Il me manque un objet ou une interception',
        a: [
          "Il est peut-être réservé par une offre ouverte au Marché noir. Tu peux arrêter l'offre à tout moment.",
          "Tu l'as peut-être déchiqueté ou utilisé dans un Échange.",
          "Un échange annulé le renvoie au joueur qui l'a donné.",
          "Quand un abonnement se termine ou est remboursé, ce qui allait avec n'est plus disponible.",
          ...(o.launch ? [] : ['Les interceptions des versions de test et leurs objets sont effacés avant que la 2.2 ouvre à tout le monde.']),
          "Rien de tout ça ? Écris à <email/> avec ton nom d'utilisateur, le nom de l'objet et quand tu l'as vu pour la dernière fois.",
        ],
      },
      {
        id: 'tester-rewards',
        q: 'Où sont mes récompenses de la bêta ?',
        a: [
          o.launch
            ? "Elles ont été ajoutées au lancement de la 2.2 et restent à toi. Tous les testeurs de la liste ont reçu le <b>Pin bêta</b> et le titre <b>« Bêta-testeur »</b>. Une carte de remerciement s'affiche à ta première ouverture de l'appli après le lancement."
            : "Elles arrivent au lancement de la 2.2, le 8 décembre, sur une carte de remerciement à l'ouverture de l'appli, et elles restent à toi. Tous les testeurs de la liste reçoivent le <b>Pin bêta</b> et le titre <b>« Bêta-testeur »</b>.",
          o.launch
            ? "Les testeurs qui ont terminé au moins une partie avant le 7 décembre (jouée jusqu'au bout, dans n'importe quel salon, donc visible dans leurs Stats) ont aussi reçu le titre <b>« Testeur de terrain »</b>, 10 interceptions de chaque niveau et 1 mois d'abonnement."
            : "Termine au moins une partie avant le 7 décembre (jouée jusqu'au bout, dans n'importe quel salon, donc visible dans tes Stats) et tu reçois aussi le titre <b>« Testeur de terrain »</b>, 10 interceptions de chaque niveau et 1 mois d'abonnement.",
          o.testerInterceptsTradable
            ? "Contrairement aux autres cadeaux, les interceptions de remerciement s'échangent comme tout ce que tu gagnes."
            : "Comme les autres cadeaux, les interceptions de remerciement restent sur ton compte.",
          ...(o.launch ? [] : ["Ce que tu as maintenant dans une version de test sert à tester et sera effacé avant le lancement. Tes récompenses n'en dépendent pas, tant que tu gardes le même compte sauvegardé."]),
          "Pour porter le pin : <b>Compte</b>, <b>Modifier l'agent</b>, <b>Accessoires</b>, <b>Pin bêta</b>, <b>Enregistrer</b>.",
          "Il manque quelque chose ? Écris à <email/> avec ton nom d'utilisateur et l'e-mail utilisé pendant le test. Un compte invité n'est pas sur la liste : c'est souvent une question de compte différent.",
          ...(o.launch ? [] : ["Bêta 2 : le remerciement de 10 $ est envoyé par PayPal à chaque joueur confirmé qui participe à toute l'heure en direct et envoie le questionnaire, dans les 7 jours après la session, pareil sur iPhone et Android. En plus, un bonus de 50\u00a0$ (carte cadeau) pour le rapport de bug ou l’idée la plus utile de la session, choisi par le développeur sous une semaine."]),
        ],
      },
    ],
  },
  {
    id: 'membership',
    title: 'Abonnement',
    items: [
      {
        id: 'membership-includes',
        q: "Que comprend l'abonnement ?",
        a: [
          ...(o.purchases ? [] : ["L'abonnement sera en vente avec la version 2.2."]),
          'Tous les packs premium, nouveaux compris. Tout le monde y joue dans les salons dont tu es l’hôte et à ta table de Jouer en ligne.',
          'Crée tes propres packs avec le créateur et partage-les dans la communauté.',
          '+50 % d\'XP à chaque partie, et des salons réservés aux membres à Jouer en ligne.',
          "Le cadre, l'étiquette et le titre de ton rang. Tu peux mener un groupe et avoir 8 offres ouvertes au Marché noir au lieu de 4.",
          "Ça ne change jamais ta façon de jouer ni tes points. Les packs gratuits restent gratuits pour tous.",
        ],
      },
      {
        id: 'membership-plans',
        q: "C'est quoi, Agent, Élite et Maître espion ?",
        a: [
          "<b>Agent</b> est l'abonnement mensuel aux packs, <b>Élite</b> l'annuel, et <b>Maître espion</b> l'accès à vie : un seul paiement, sans renouvellement.",
          'Maître espion ajoute les trois cadres métalliques, le titre Carte or, la célébration Tempête dorée et des objets pour ton agent réservés à l\'accès à vie.',
          "L'accès à vie dure tant que nous proposons SpySocial, pas toute ta vie. Pas d'essai gratuit, et l'abonnement ne se partage pas via le Partage familial.",
        ],
      },
      {
        id: 'cancel-membership',
        q: 'Comment marchent le renouvellement automatique et la résiliation ?',
        a: [
          "Agent et Élite se renouvellent automatiquement jusqu'à ce que tu résilies : sur l'App Store, au moins 24 heures avant la fin de la période ; sur Google Play, avant la date de renouvellement. Tu gardes les avantages jusqu'à la fin de la période payée.",
          '<b>iPhone ou iPad :</b> Réglages, ton nom, Abonnements, SpySocial.',
          "<b>Android :</b> l'appli Google Play Store, ta photo de profil, Paiements et abonnements, Abonnements, SpySocial.",
          "<b>Gérer l'abonnement</b> dans l'appli ouvre la même page. Supprimer l'appli ou ton compte, ou acheter l'accès à vie, ne résilie pas un abonnement.",
        ],
      },
      {
        id: 'restore-purchases',
        q: 'Comment récupérer mon abonnement ?',
        a: [
          "Touche <b>Restaurer les achats</b> dans l'appli, avec ton téléphone connecté au compte App Store ou Google Play qui a payé.",
          "Ton abonnement passe sur le compte SpySocial que tu utilises, et quitte tout autre compte où il était, même supprimé.",
        ],
      },
      {
        id: 'refunds',
        q: 'Puis-je être remboursé ?',
        a: [
          "Apple et Google gèrent les remboursements selon leurs règles : demande à Apple sur reportaproblem.apple.com, ou à Google depuis ton historique de commandes Google Play.",
          "Si un achat est remboursé, ce qu'il avait débloqué est retiré.",
        ],
      },
    ],
  },
  {
    id: 'account',
    title: 'Ton compte',
    items: [
      {
        id: 'guest-or-saved',
        q: 'Compte invité ou sauvegardé : quelle différence ?',
        a: [
          "Un <b>invité</b> joue tout de suite dans les salons privés. Un compte invité vit sur un seul téléphone, et se déconnecter le supprime pour de bon.",
          `Un compte <b>sauvegardé</b> (Apple, Google ou ton e-mail${o.passwordless ? ', avec un code envoyé par e-mail, sans mot de passe' : ''}) garde ton nom, ta progression et ton abonnement sur n'importe quel téléphone, et te permet de jouer en ligne, de rejoindre la Soirée jeux et d'ajouter des amis.`,
          "Tu peux sauvegarder un compte invité à tout moment depuis la page de ton compte, sans rien perdre. Amis, Échanges et le Marché noir demandent d'abord à un invité de le sauvegarder.",
        ],
      },
      {
        id: 'lost-account',
        q: "J'ai perdu mon compte. Puis-je le récupérer ?",
        a: [
          "Un <b>compte sauvegardé</b> revient sur n'importe quel téléphone : ouvre SpySocial et connecte-toi comme avant (Apple, Google ou le même e-mail). Un autre e-mail, ou Masquer mon adresse e-mail d'Apple, ouvre un nouveau compte vide : c'est souvent pour ça que la progression semble disparue.",
          "Un <b>compte invité</b> vit sur un seul téléphone. Si l'appli a été supprimée, si le téléphone est perdu ou si tu t'es déconnecté, il est perdu pour de bon et nous ne pouvons pas le récupérer.",
          "Si l'appli affiche <b>Impossible d’ouvrir ton compte</b>, ton compte est toujours enregistré sur le téléphone, mais il n'a pas pu être lu à ce moment-là. Touche <b>Réessayer</b>, ou ferme l'appli et rouvre-la.",
          'Un abonnement ne se perd pas : <b>Restaurer les achats</b> le ramène. Nous ne pouvons pas fusionner des comptes ni déplacer des objets entre eux.',
          "Si tu avais un compte sauvegardé, écris à <email/> avec ton nom d'utilisateur et ta façon de te connecter, et nous regarderons.",
        ],
      },
      {
        id: 'cant-sign-in',
        q: "Je n'arrive pas à me connecter",
        a: [
          ...(o.passwordless ? ["Tu peux te connecter avec Apple, Google ou un code à 6 chiffres envoyé par e-mail. Il n'y a plus de mot de passe : si l'appli en demande encore un, mets-la à jour dans l'App Store ou Google Play."] : []),
          "Connecte-toi de la même façon qu'avant. Un autre e-mail, ou Masquer mon adresse e-mail d'Apple, ouvre un nouveau compte vide à la place du tien.",
          "Si l'appli s'ouvre sur l'écran de connexion avec <b>Session fermée sur cet appareil</b>, ta connexion y a été fermée de notre côté, en général parce que le compte a été déconnecté partout. Reconnecte-toi de la même façon : ta progression est sauvegardée. Un compte invité ne peut pas se reconnecter.",
          "Si l'appli affiche « Ce compte ne peut pas se connecter », écris à <email/> depuis l'adresse du compte et nous regarderons.",
          'Si le compte a été banni, notre e-mail à cette adresse donne la référence, la raison et la façon de faire appel.',
        ],
      },
      {
        id: 'code-not-arriving',
        q: "Mon code ou mon e-mail de connexion n'arrive pas",
        a: [
          "Il vient de noreply@mail.spysocial.app. Regarde dans les spams ou le courrier indésirable, et vérifie lettre par lettre l'adresse que tu as saisie.",
          o.passwordless
            ? "Tu peux demander un nouveau code après 60 secondes avec <b>Renvoyer le code</b>. Un code marche 1 heure : utilise celui du dernier e-mail. Si l'appli dit qu'il y a trop d'e-mails, attends quelques minutes et réessaie une fois."
            : 'Tu peux demander un autre e-mail après 60 secondes. Utilise le plus récent.',
          'Si ton compte utilise Apple ou Google, tu peux te connecter avec eux.',
          "Toujours rien ? Écris à <email/> avec l'adresse exacte et à peu près quand tu as essayé, et nous vérifierons de notre côté.",
        ],
      },
      {
        id: 'lost-email',
        q: "J'ai perdu mon adresse e-mail, ou je veux la changer",
        a: [
          "L'appli ne peut pas changer l'e-mail d'un compte sauvegardé : écris à <email/>.",
          "Si tu peux encore lire l'ancienne adresse, écris depuis celle-ci et donne-nous la nouvelle. Nous écrirons aussi à la nouvelle adresse, et tu répondras à ce message.",
          "Si l'ancienne adresse n'existe plus, essaie d'abord de la récupérer auprès de ton fournisseur de messagerie. Si ton compte a aussi la connexion Apple ou Google, tu peux toujours te connecter ainsi. Nous ne pouvons pas promettre un changement sans l'ancienne adresse, car c'est ainsi que nous savons que le compte est à toi.",
          "Après un changement d'e-mail, tes échanges sont en pause pendant 3 jours et tes offres et annonces ouvertes sur le Marché noir sont fermées.",
        ],
      },
      {
        id: 'stolen-account',
        q: "Quelqu'un est entré dans mon compte. Que faire ?",
        a: [
          "Protège d'abord l'e-mail de ton compte SpySocial, et ton compte Apple ou Google si tu te connectes avec. Toute personne qui peut lire cet e-mail peut entrer dans ton compte.",
          "Dans les 7 jours suivant un échange que tu n'as pas fait, touche <b>Annuler mes échanges</b> sur ta page d'échanges. Ça annule tous tes échanges protégés et met tes échanges en pause pendant 30 jours. C'est possible une fois tous les 90 jours.",
          "Écris ensuite à <email/> avec ton nom d'utilisateur, à peu près quand c'est arrivé et ce qui manque. Dis-nous aussi si tu penses que quelqu'un est encore connecté.",
          "Après 7 jours, un échange est définitif, et une vente d'objets au Marché noir l'est tout de suite. Nous ne te demanderons jamais ton code de connexion.",
        ],
      },
      {
        id: 'change-name',
        q: 'Comment changer mon nom ?',
        a: [
          "Change ton nom affiché quand tu veux sur la page de ton compte, et ton nom d'utilisateur une fois tous les 30 jours.",
          "Un nouveau compte commence avec un nom d'affichage au hasard, dans la langue de ton appli.",
          "Aux tables de Jouer en ligne, les joueurs que tu ne connais pas voient ta couleur d'agent à la place. Les noms suivent les <rules>règles de la communauté</rules>.",
        ],
      },
      {
        id: 'birth-year',
        q: "Mon année de naissance est fausse. Puis-je la corriger ?",
        a: [
          "Elle ne se change pas dans l'appli : écris à <email/> depuis l'adresse e-mail de ton compte.",
          "Nous la changeons pour une année plus récente (un âge plus jeune) quand toi ou ton parent le demandez, et pour une plus ancienne seulement avec une preuve d'âge.",
          "Si l'âge corrigé est de moins de 13 ans, le compte est supprimé.",
        ],
      },
      {
        id: 'delete-account',
        q: 'Comment supprimer mon compte ?',
        a: [
          "Dans l'appli : <b>Compte</b>, <b>Réglages</b>, <b>Supprimer le compte</b>. Pour un invité, se déconnecter le supprime.",
          'Tu peux aussi nous le demander par e-mail : voir <delete>Supprimer ton compte</delete>.',
          "Supprimer ton compte ne résilie pas un abonnement : résilie-le aussi dans le store.",
        ],
      },
      {
        id: 'data-copy',
        q: 'Puis-je obtenir une copie de mes données ?',
        a: [
          "Oui. Écris à <email/> depuis l'adresse e-mail de ton compte. Nous t'envoyons une copie dans un fichier lisible par machine (JSON), sous un mois.",
          "Un compte invité n'a pas d'e-mail : sauvegarde-le d'abord avec un e-mail. Détails : <privacy>Politique de confidentialité</privacy>.",
        ],
      },
    ],
  },
  {
    id: 'safety',
    title: 'Sécurité',
    items: [
      {
        id: 'report-block',
        q: "Comment signaler ou bloquer quelqu'un ?",
        a: [
          'Appuie longuement sur sa carte, dans le salon, en partie ou sur l\'écran de fin, et choisis <b>Signaler</b> ou <b>Bloquer</b>.',
          "Une personne lit chaque signalement, et le joueur ne sait pas qui l'a envoyé.",
          "Bloquer vous sépare : aucun de vous ne peut rejoindre un salon où se trouve l'autre. Débloque dans les Réglages, sous <b>Joueurs bloqués</b>.",
          'Mentir et bluffer font partie du jeu et ne se signalent pas.',
          "À une table avec un groupe, choisis <b>Entente</b> si tu penses qu'ils s'aident en dehors du jeu. <b>Signaler le groupe</b> couvre tous les membres de leur groupe à cette table.",
        ],
      },
      {
        id: 'moderators',
        q: 'Qui modère SpySocial ?',
        a: [
          "Notre équipe lit chaque signalement et décide de la suite. Des modérateurs bénévoles de confiance aident, avec notre accord : aux tables de la Soirée jeux, avec les messages signalés et avec les packs de la communauté.",
          'Tu peux faire appel de toute décision en écrivant à <email/>.',
        ],
      },
      {
        id: 'under-18',
        q: 'Quelles règles pour les moins de 18 ans ?',
        a: [
          'Il faut avoir 13 ans ou plus pour jouer.',
          "Dans tout salon ou groupe où se trouve un joueur de moins de 18 ans ou qui ne nous a pas donné son âge, les liens, adresses e-mail, numéros de téléphone, comptes de réseaux sociaux et autres informations personnelles (adresse du domicile, lieu de vie, école, vrai nom) sont bloqués pour tout le monde.",
          "Les moins de 18 ans n'ont pas de profil public ni d'abonnés, n'échangent qu'objet contre objet avec des amis ajoutés par code ami, et ne peuvent ni acheter ni vendre au Marché noir.",
          "Sur iPhone et iPad, les amis, les groupes et les échanges attendent une version de l'appli qui demande l'accord d'un parent via Apple.",
          'Parents et proches : consultez notre <safety>page Sécurité</safety>.',
        ],
      },
      {
        id: 'under-13',
        q: "L'appli affiche « SpySocial est réservé aux joueurs de 13 ans et plus »",
        a: [
          o.storeAgeSignals
            ? "SpySocial est réservé aux joueurs de 13 ans et plus. Nous ne vérifions ni n'estimons les âges : l'appli se fie à l'année de naissance que tu donnes et à la tranche d'âge partagée par Apple ou Google."
            : "SpySocial est réservé aux joueurs de 13 ans et plus. Nous ne vérifions ni n'estimons les âges : l'appli se fie à l'année de naissance que tu donnes.",
          'Une année de naissance de moins de 13 ans supprime le compte aussitôt, et il ne peut pas être restauré.',
          ...(o.storeAgeSignals ? ["Si ton compte Apple ou Google indique un âge erroné, corrige-le là-bas et l'appli te laissera jouer. Si un parent ou un tuteur a refusé SpySocial dans le store, lui seul peut changer ça."] : []),
        ],
      },
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Dépannage',
    items: [
      {
        id: 'update-not-showing',
        q: "La nouvelle mise à jour n'apparaît pas",
        a: [
          "Les mises à jour se téléchargent en arrière-plan. Ferme complètement SpySocial (balaie-la), ouvre-la, puis ferme-la et rouvre-la encore une fois.",
          "Si c'est une nouvelle version sur l'App Store ou Google Play, mets-la à jour là-bas.",
        ],
      },
      {
        id: 'cant-join',
        q: 'Pourquoi je ne peux pas rejoindre un salon ?',
        a: [
          'Vérifie le code : lettres de A à Z et chiffres de 2 à 9 (0 et 1 se lisent O et I).',
          "Impossible de rejoindre une partie en cours : attends qu'elle finisse. Le salon peut aussi être plein ou verrouillé.",
          "Si l'hôte a changé le code, les anciens liens et QR codes ne marchent plus. Si l'hôte t'a exclu, tu ne peux pas revenir dans ce salon.",
          "Une invitation vers un salon qui n'existe plus affiche tout de suite <b>Cette invitation ne fonctionne pas</b> ou <b>Salon fermé</b>, avant de te demander ton année de naissance.",
          'Jouer en ligne et la Soirée jeux demandent un compte sauvegardé.',
        ],
      },
      {
        id: 'connection-lost',
        q: "J'ai perdu la connexion pendant une partie",
        a: [
          "L'appli se reconnecte toute seule quand ta connexion revient.",
          "Un message de chat qui n'est pas parti affiche <b>Non envoyé</b>. Si ta connexion revient dans les 2 minutes, il repart tout seul ; après, touche-le pour l'envoyer.",
          "Si tu te retrouves sur l'accueil, touche <b>Revenir</b> sur la carte de ton salon. Ta place est gardée.",
          "Si l'appli dit qu'elle n'a pas eu de réponse après un vote, une proposition, un achat, un déchiquetage ou un échange, l'action est peut-être quand même passée. Vérifie, puis réessaie si ce n'est pas le cas : rien n'est payé ni échangé deux fois.",
        ],
      },
      {
        id: 'app-crashes',
        q: "L'appli plante sans arrêt",
        a: [
          "Mets à jour SpySocial dans l'App Store ou Google Play s'il y a une mise à jour.",
          'Ferme-la complètement (balaie-la), ouvre-la, puis ferme-la et rouvre-la une fois de plus.',
          "Redémarre ton téléphone et vérifie qu'il reste de la place : une mise à jour peut échouer sur un téléphone plein.",
          "Ça plante encore ? Va dans <b>Compte</b>, <b>Réglages</b>, <b>Signaler un problème</b> si tu y arrives, ou écris à <email/> avec le modèle de ton téléphone, la version du système, ce que tu faisais, et l'heure avec ton fuseau horaire.",
          "Si tu étais en partie, l'appli te reconnecte, ou touche <b>Revenir</b> sur la carte de ton salon, sur l'accueil. Ta place est gardée.",
        ],
      },
      {
        id: 'game-not-counted',
        q: "Ma partie n'a pas compté",
        a: [
          "Une partie compte dans ton palmarès quand elle s'est terminée et que tu avais une place, que tu aies joué jusqu'au bout, quitté avant la fin (une défaite) ou été absent.",
          "Ne comptent pas : une partie arrêtée par l'hôte, une partie trop courte ou avec trop peu de joueurs, une distribution annulée, une partie abandonnée, être retiré du salon, une place où tu n'es jamais venu, ou regarder. Une partie sans gagnant n'est ni une victoire ni une défaite.",
          'Tes stats séparent Jouer en ligne et les salons privés : regarde le sélecteur en haut.',
          "Les salons privés ne donnent jamais d'Intel ni d'interceptions, et les parties de Jouer en ligne n'en donnent que si elles ont rapporté de l'XP.",
          "Pour échanger, il te faut 3 parties terminées qui comptent et que nos vérifications de fair-play n'ont pas signalées, chacune avec au moins 2 autres comptes sauvegardés sur d'autres téléphones. Deux téléphones sur le même Wi-Fi, ça passe ; un autre compte sur ton propre téléphone ne fait pas partie de ces 2.",
          "Si elle aurait dû compter, écris à <email/> avec ton nom d'utilisateur, le code du salon (si tu l'as) et quand tu as joué.",
        ],
      },
      {
        id: 'notifications',
        q: 'Je ne reçois pas les notifications',
        a: [
          'Autorise les notifications de SpySocial dans les réglages de ton téléphone.',
          "Dans l'appli, <b>Confidentialité et amis</b> a des interrupteurs pour les demandes d'ami, les invitations, les nouveaux packs, les échanges et le Marché noir.",
          "Sur Android, les notifications d'amis, de groupe, d'échanges et du Marché noir partagent une seule catégorie dans les réglages du téléphone, <b>Amis, groupe et échanges</b> : la désactiver là-bas les arrête toutes.",
          "Les notifications de partie arrivent quand tu cherches une partie à Jouer en ligne, et les rappels de Soirée jeux quand tu touches <b>Me le rappeler</b>. Les invités n'en reçoivent pas.",
          'Les moins de 18 ans ne reçoivent pas de notifications sociales, ni notre réponse sur un pack envoyé à Communauté, entre 22 h et 7 h.',
        ],
      },
      {
        id: 'contact-support',
        q: 'Comment contacter le support ?',
        a: [
          "Écris à <email/>. Pour ton compte, écris depuis son adresse e-mail. Une personne lit chaque message.",
          'Pour les nouvelles, les Soirées jeux et les joueurs qui cherchent une partie, rejoins notre <discord>Discord</discord>.',
        ],
      },
    ],
  },
]

const fix = (list: HelpSection[]): HelpSection[] =>
  list.map((sec) => ({ ...sec, title: nb(sec.title), items: sec.items.map((it) => ({ ...it, q: nb(it.q), a: it.a.map(nb) })) }))

const fr: HelpText = {
  title: 'Aide et FAQ',
  lede: nb("Des réponses rapides pour jouer à SpySocial, ton compte, les récompenses et l'abonnement."),
  search: "Rechercher dans l'aide",
  searchHint: nb('Essaie « vote » ou « échange »'),
  clear: 'Effacer',
  results: (n) => (n <= 1 ? `${n} réponse` : `${n} réponses`),
  noResults: (q) => nb(`Rien ne correspond à « ${q} ». Essaie un mot plus court, ou écris-nous.`),
  topics: 'Sujets',
  stillStuck: nb('Toujours bloqué ? Écris à'),
  sections: (o) => fix(sections(o)),
}

export default fr
