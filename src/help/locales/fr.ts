import type { HelpOpts, HelpSection, HelpText } from '../types'

/**
 * Français (fr) : français de France, « tu » comme dans l'appli ; les mots de l'appli (salon, local, espion, hôte,
 * « Jouer en ligne », « Trouver une partie », Coffre, Marché noir, Trouvailles rares, interceptions, Intel, Réglages).
 * Written with plain spaces before : ? ! ; and inside « » : `nb` puts the no-break spaces in.
 * help-new-1117 (2026-11-17, against app int/u62-15-prep): #question-rounds, #game-night-weekly, #game-night-rewards, #game-night-intercepts, #practice-members, #membership-switch, #two-memberships, #sign-up-email; agent translation, unreviewed.
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
        id: 'from-a-video',
        q: "Je viens d'une vidéo. C'est quoi, SpySocial ?",
        a: [
          "SpySocial est un jeu d'ambiance gratuit de déduction sociale, de 3 à 21 joueurs, sur iPhone et Android. Télécharge-le sur l'App Store ou Google Play, crée un compte et joue avec tes amis dans un salon privé ou en ligne. Le jeu dans le navigateur arrivera plus tard, avec la version PC.",
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
          'Oui. Les deux jeux, Jouer en ligne, les salons privés et la soirée jeux sont gratuits, sans publicité.',
          `Devenir membre, c'est facultatif : ça débloque les packs premium et quelques looks pour ton agent. Rien de ce que tu achètes ne t'aide à gagner.${o.purchases ? '' : " Le statut de membre sera en vente avec la version 2.2."}`,
        ],
      },
      {
        id: 'start-a-game',
        q: 'Comment lancer une partie ?',
        a: [
          '<b>Entre amis :</b> touche <b>Salon privé</b>, puis <b>Créer un salon</b>, et partage le code du salon, le QR code ou le lien d\'invitation. Il faut au moins 3 joueurs.',
          '<b>Avec n\'importe qui :</b> touche <b>Jouer en ligne</b>, puis <b>Trouver une partie</b>.',
          o.practiceMembers ? "<b>Tu débutes ?</b> <b>Comment jouer</b>, sur l'accueil, propose un tutoriel gratuit de 3 minutes pour chaque jeu, puis, pour les membres, des parties d'entraînement contre des agents IA. Le glossaire est là aussi." : "<b>Tu débutes ?</b> <b>Comment jouer</b>, sur l'accueil, propose un tutoriel de 3 minutes pour chaque jeu, puis des parties d'entraînement contre des agents IA. Le glossaire est là aussi.",
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
      ...(o.questionRounds
        ? [
          {
            id: 'question-rounds',
            q: "C'est quoi, les manches de questions ?",
            a: [
              "Certaines tables de Spy Talk jouent 2 manches de questions au lieu d'une : les salons privés dont l'hôte choisit 2 dans les <b>Règles</b> du salon, et les soirées jeux qui l'activent. Avec Jouer en ligne, c'est toujours 1 manche.",
              "À la manche 1, chacun pose une question et répond à une. Dès que la dernière réponse arrive, la manche 2 commence, à l'envers : la personne à qui tu as posé ta question te pose la sienne. En haut de l'écran s'affiche « Manche 2 ».",
              "Puis la discussion, avec son temps habituel. Deux manches donnent aux locaux deux fois plus de réponses à vérifier, et à l'espion deux fois plus d'occasions de se trahir.",
            ],
          },
          ]
        : []),
      {
        id: 'talk-out-loud',
        q: "C'est quoi, Parler à voix haute ?",
        a: [
          "Une règle de Spy Talk pour jouer dans la même pièce ou en appel vocal. L'hôte l'active dans les <b>Règles</b> du salon ; elle est désactivée dans les nouveaux salons. Seulement dans les salons privés et les soirées jeux qui l'activent.",
          "Pendant les questions, personne n'écrit ni n'utilise le micro : celui qui interroge pose sa question à voix haute et appuie sur <b>Terminé</b>, puis l'autre répond à voix haute et appuie à son tour sur <b>Terminé</b>.",
          "Rien n'est écrit, donc les notes ne gardent pas l'historique des questions.",
          "On conseille de la laisser désactivée, même autour d'une table : appuie sur le micro et pose ta question à voix haute. Tout le monde t'entend, et l'appli transforme ce que tu dis en texte que tous les joueurs voient dans l'historique des questions.",
          "Tout le monde dans le salon doit avoir la dernière version de l'appli. Si quelqu'un a une ancienne version, la règle reste désactivée tant qu'il n'a pas mis à jour l'appli.",
        ],
      },
      {
        id: 'spy-sketch',
        q: 'Comment se joue Spy Sketch ?',
        a: [
          "Les joueurs dessinent à tour de rôle sur un tableau blanc commun. Les locaux suggèrent le mot sans le dessiner franchement. Les espions ajoutent quelque chose de vague qui pourrait coller.",
          "Une fois que chacun a joué son tour, les votes et la tentative de l'espion s'ouvrent. Les manches continuent jusqu'à la fin de la partie.",
            'Les dessins de Spy Sketch ne sont pas décrits à voix haute : un lecteur d’écran (VoiceOver, TalkBack) ne peut donc pas suivre le dessin.',
            "Ton trait commence sous ton doigt. Pour voir d’abord où il commencera, active le <b>Mode précision</b> dans les <b>Réglages</b>, sous Dessin, ou sur le tableau : un crayon apparaît au-dessus de ton doigt, tu le places puis tu dessines depuis sa pointe (<b>Rester immobile</b> ou <b>Lever puis toucher</b>).",
            ...(o.guestSaveBeforeBuy ? ["On peut atteindre le tableau de dessin lui-même avec un lecteur d'écran : il dit à qui c'est de dessiner et la page, et à ton tour comment dessiner (touche deux fois et maintiens, puis fais glisser)."] : []),
        ],
      },
      {
        id: 'drawings-checked',
        q: "Les dessins de Spy Sketch sont-ils vérifiés ?",
        a: [
          "Oui, pour la sécurité de tous. Aux tables de Jouer en ligne et aux soirées jeux, les tours de dessin terminés peuvent être vérifiés automatiquement par OpenAI, à la recherche de tout ce qui enfreint les <rules>règles de la communauté</rules>.",
          "La première fois, l'appli affiche <b>Les dessins sont vérifiés</b>. Appuie sur <b>J'accepte</b> pour jouer à Spy Sketch en ligne. Tant que tu n'acceptes pas, Spy Talk reste ouvert.",
          o.drawingMinorPeer
            ? "Dans un salon privé, un dessin est vérifié si quelqu'un le signale. Il peut aussi être vérifié automatiquement tant que peut le voir une personne, autre que le dessinateur, de moins de 18 ans ou qui ne nous a pas donné son âge. Le dessin d'un joueur qui a dit avoir moins de 18 ans ne reçoit que la première vérification, la basique, et seulement tant qu'un autre joueur présent a moins de 18 ans ou ne nous a pas donné son âge ; la seconde n'a lieu que si la première le signale."
            : "Dans un salon privé, un dessin est vérifié si quelqu'un le signale. Il peut aussi être vérifié automatiquement tant que peut le voir une personne, autre que le dessinateur, de moins de 18 ans ou qui ne nous a pas donné son âge. Le dessin d'un joueur qui a dit avoir moins de 18 ans n'est vérifié que si quelqu'un le signale.",
          "OpenAI reçoit une image du tour et le mot de la manche, jamais ton nom ni tes messages. Un tour qui enfreint les règles peut être retiré et peut mener à un avertissement, une pause ou un bannissement. Une personne examine chaque décision définitive, et tu peux faire appel.",
          "Tous les détails : <drawchecks>Drawing Checks, dans la Politique de confidentialité</drawchecks>.",
        ],
      },
      {
        id: 'new-page',
        q: "C’est quoi, Nouvelle page dans Spy Sketch ?",
        a: [
          "Une pause dessin arrête le jeu jusqu’à 20 secondes : étudie le dessin, discute et regarde tes notes. Tous ceux encore en jeu votent <b>Garder la page</b> ou <b>Nouvelle page</b>. La pause finit plus tôt dès que tout le monde a voté.",
          "La page reste seulement si plus de la moitié des joueurs encore en jeu votent pour la garder. Une égalité, ou aucun vote, donne une page blanche. Tu peux toujours revoir les pages d’avant.",
          "<b>Jouer en ligne :</b> une page en plus au maximum. La pause arrive toutes les 2 manches à une table de 4, et après chaque manche à une table de 8. Si la table garde la page, la pause suivante arrive autant de manches plus tard.",
          "<b>Salons privés et soirées jeux :</b> l’hôte (ou la soirée) règle <b>Nouvelle page</b> dans les règles : Non, 2, 3 ou 4 pages, ou Illimité. Un nouveau salon commence à 2, comme nous le conseillons. La pause arrive quand la feuille est pleine.",
          "Aucune pause ne commence dans les 45 dernières secondes de la partie.",
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
          "Sur les résultats, une bande noire indique qui a lancé le vote : « Lancé par … ». Un vote final affiche à la place un ruban rouge <b>Vote final</b>.",
        ],
      },
      {
        id: 'spy-guess',
        q: "Comment l'espion devine-t-il le secret ?",
        a: [
          'Un espion ouvre <b>Actions</b> et touche <b>Deviner</b>. Il a 60 secondes pour choisir le secret dans une liste d\'une trentaine de réponses.',
          "Bonne réponse : tous les espions gagnent. Mauvaise réponse, ou temps écoulé : cet espion est éliminé. Si c'était le dernier, les locaux gagnent.",
          'Tout le monde voit qui devine : ça te trahit.',
          "Tu devines sans aide : ton chat reste fermé jusqu’à ta confirmation.",
          "Avec <b>Une seule balle</b> (salons privés et soirées jeux qui l'activent), l'équipe des espions n'a qu'un essai : raté, et c'est toute l'équipe qui perd.",
        ],
      },
      {
        id: 'winning',
        q: 'Comment chaque camp gagne-t-il ?',
        a: [
          "Les <b>locaux</b> gagnent en éliminant tous les espions par vote, ou si le dernier espion se trompe.",
          "Les <b>espions</b> gagnent avec une bonne réponse, quand le chrono de la partie arrive à zéro, ou quand un vote laisse autant d'espions que de locaux.",
          "Partir compte comme être éliminé par un vote : si le dernier espion part, les locaux gagnent ; si trop de locaux partent, les espions gagnent. Si cela arrive avant la fin des questions (dans Spy Sketch, au premier tour), la partie affiche « Pas de résultat » et ne compte pas.",
          "<b>Vote final :</b> s'il reste exactement un espion, tout le monde vote une dernière fois quand le temps est écoulé, quand plus personne n'a de vote à lancer ou quand la dernière chance d'en lancer un est passée. Si l'espion est démasqué, les locaux gagnent. Il est actif dans Jouer en ligne, et c'est un réglage dans les salons privés. Une table de Jouer en ligne ou une soirée jeux peut aussi le jouer avec deux espions : démasque l'un des deux et les locaux gagnent.",
          "Les résultats d'un vote final s'ouvrent sous un ruban rouge <b>Vote final</b> qui dit pourquoi : « Le chrono a parlé », « Plus aucun vote à lancer » ou « La dernière chance est passée ».",
          "<b>Informateur</b> (Spy Talk et Spy Sketch, salons privés et soirées jeux qui l'activent, avec au moins 2 espions et 6 joueurs) : la carte d'un local dit <b>Tu sais : Nom fait partie des espions</b>, avec un seul espion nommé, même s'il y en a plus. Les cartes des autres locaux comptent l'informateur, comme « 2 espions · 1 informateur ». Quand les locaux gagnent par un vote ou par la mauvaise réponse du dernier espion, les espions, même démasqués, ont 30 secondes pour désigner l'informateur et voler la victoire. Pas après un raté avec <b>Une seule balle</b>, ni quand le dernier espion s'en va.",
        ],
      },
      {
        id: 'special-rules',
        q: "Quelles règles spéciales un salon privé ou une soirée jeux peut-il utiliser ?",
        a: [
          "<b>Votes par partie :</b> chaque joueur peut lancer 1, 2 ou 3 votes par partie, ou sans limite (un nouveau salon commence à 1). Quand un vote démasque un espion, chaque joueur qui en a lancé un le récupère.",
          "Quand plus personne encore en jeu n'a de vote à lancer, le chrono de la partie saute à ses 5 dernières secondes. Quand il reste autant de votes que d'espions en jeu, ou moins, une dernière chance de 15 secondes permet d'en lancer un. Si personne n'en lance un à temps, un vote final suit s'il est actif (vois comment chaque camp gagne, plus haut) ; sinon, les espions gagnent.",
          "<b>Trace écrite :</b> quand un espion est éliminé par un vote, tout le monde voit comment il a voté pendant toute la partie. Si les rôles ne sont pas révélés à l'élimination, elle attend la fin de la partie.",
          "<b>Une seule balle</b> et <b>Informateur</b> : voir plus haut, la réponse de l'espion et comment chaque camp gagne.",
          "<b>Parler à voix haute</b> a sa propre réponse plus haut. Dans l'appli, <b>Comment jouer</b> › <b>Options et réglages</b> montre une courte démo de chaque règle.",
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
          ...(o.guestSaveBeforeBuy ? ["Si une partie est trouvée pour toi pendant que SpySocial est en arrière-plan et que tu la rates, la première fois n'est qu'un avertissement, sans pause sur Jouer en ligne. Garde l'appli ouverte pendant ta recherche."] : []),
          ...(o.u6152 ? ["Avec le statut de membre, tu peux activer <b>Membres uniquement</b> pour jouer seulement avec d'autres membres. Moins de joueurs cherchent ainsi, donc trouver une partie peut prendre un peu plus de temps. Le (i) à côté en dit plus, avec <b>Voir l'offre membres</b> si tu n'es pas membre."] : []),
        ],
      },
      {
        id: 'private-rooms',
        q: 'Comment fonctionnent les salons privés ?',
        a: [
          "Les salons créés par les joueurs sont privés, pour les gens que tu connais. Tes amis entrent avec le code du salon, le QR code ou le lien d'invitation. Les invités sans compte aussi.",
          "L'hôte fixe les règles : jeu, espions, chronos, vote et packs. Le nombre de joueurs monte jusqu'à 21, et <b>Verrouiller le salon</b> bloque les nouveaux venus.",
          "Les packs gratuits sont ouverts à tous. Si quelqu'un dans le salon est membre, tous les packs premium sont débloqués pour tout le monde.",
        ],
      },
      {
        id: 'game-night',
        q: "C'est quoi, la soirée jeux ?",
        a: [
          o.launch ? "Des parties en ligne que nous organisons, les soirs annoncés dans l'appli, en général de 20 h à 22 h, heure de l'Est des États-Unis. Sur l’accueil, ouvre <b>Compétition</b>, puis l’onglet <b>Soirée jeux</b> et touche <b>Jouer</b>." : "Des parties en ligne que nous organisons, les soirs annoncés dans l'appli, en général de 20 h à 22 h, heure de l'Est des États-Unis. Touche <b>Jouer</b> sur la carte de la soirée jeux, sur l'accueil.",
          "La soirée jeux demande un compte sauvegardé : un invité sauvegarde d’abord le sien.",
          o.gnRewards
            ? "Chaque soirée a ses packs et ses réglages : le (i) à côté de la soirée les affiche. <b>Prix</b>, sur la carte, montre ce que tu gagnes : l'Intel de soirée jeux et les titres ★."
            : o.gnRewardsRules
              ? 'Chaque soirée a ses packs et ses réglages : le (i) à côté de la soirée les affiche.'
              : 'Chaque soirée a ses packs, ses réglages et ses titres. Le (i) à côté de la soirée affiche ses packs et ses réglages, et <b>Prix</b>, sur la carte, ses titres.',
          "C'est gratuit, et rien de ce que tu achètes n'améliore tes chances. Le règlement complet : <gnr>règles de la soirée jeux</gnr> (en anglais).",
        ],
      },
      ...(o.launch
        ? [
          {
            id: 'compete',
            q: "C’est quoi, Compétition ?",
            a: [
              "<b>Compétition</b> est une carte de l’accueil avec trois onglets : <b>Soirée jeux</b>, <b>Classé</b> et <b>Tournois</b>.",
              "Aujourd’hui, seul l’onglet Soirée jeux sert. Classé et Tournois arriveront plus tard et affichent « Bientôt ».",
              "Dans <b>Compétition</b>, les onglets <b>Classé</b> et <b>Tournois</b> affichent la carte <b>En attendant, la Soirée jeux</b>. Toute la carte est un seul bouton : touche-la pour ouvrir l'onglet Soirée jeux.",
            ],
          },
          ]
        : []),
      ...(o.gnWeekly
        ? [
          {
            id: 'game-night-weekly',
            q: "C'est quand, la soirée jeux ?",
            a: [
              "Une fois par semaine : le vendredi, en général de 20 h à 22 h, puis la même soirée jeux à nouveau le samedi à 14 h, heure de l'Est des États-Unis.",
              "Viens à l'une des deux, ou joue aux deux.",
              o.launch ? "Nous annonçons chaque soirée dans l’appli, sur l’accueil, dans Compétition, sur l’onglet Soirée jeux." : "Nous annonçons chaque soirée dans l'appli, sur la carte de la soirée jeux de l'accueil.",
            ],
          },
          ]
        : []),
      ...(o.gnRewards
        ? [
          {
            id: 'game-night-rewards',
            q: "Qu'est-ce que je gagne en soirée jeux ?",
            a: [
              o.gnTiers4 ? `De l'<b>Intel de soirée jeux</b> pour chaque partie que tu gagnes : 500, mais seulement si tu as joué au moins la moitié de tes propres tours. Une défaite, ou une partie sans gagnant, donne 0. L'écran de fin montre ce que tu as gagné.` : "De l'<b>Intel de soirée jeux</b> pour chaque partie que tu termines : 500 pour une victoire, 200 pour une défaite, 0 si la partie se termine sans gagnant. L'écran de fin montre ce que tu as gagné.",
              "Pas d'Intel de soirée jeux si tu quittes avant la fin, si tu es retiré de la table ou ne participes pas, si la partie commence après la fermeture de la soirée jeux (une partie lancée à temps et finie plus tard rapporte quand même), si nos contrôles de fair-play signalent la partie, ou à une table avec des spybots. Une partie qui s'arrête tôt parce que quelqu'un est parti ne rapporte rien à personne.",
              "Des <b>titres ★</b> à compteur : <b>★ Infiltré</b> pour chaque partie de soirée jeux terminée, <b>★ Héros local</b> pour chaque victoire en local, <b>★ Espion émérite</b> pour chaque victoire en espion, et <b>★ Agent double</b> pour chaque soirée où tu gagnes des deux côtés. Porte-les avec leur nombre, comme ★ Infiltré ×12.",
              ...(o.gnTiers4 ? [`Une partie compte pour les titres ★ seulement si vous avez joué au moins la moitié de vos propres tours. ★ Infiltré compte toujours une défaite ou une égalité jouée.`] : []),
              "L'Intel de soirée jeux et les titres ★ sont à toi seul : ils ne s'échangent pas, et le statut de membre n'y ajoute rien. Dépense l'Intel en interceptions de soirée jeux.",
              ...(o.launch
                ? []
                : ["Les titres des soirées jeux de la bêta se sont ajoutés au compteur de ces titres. À la remise à zéro avant le lancement, l'Intel de soirée jeux que tu as gagné revient en entier, même si tu l'as dépensé, et tes titres ★ restent. Les interceptions de soirée jeux et leurs objets repartent de zéro comme tout le reste."]),
              "Dans l’onglet <b>Soirée jeux</b>, <b>Comment fonctionne l’Intel de Soirée jeux</b> explique comment gagner et dépenser l’Intel.",
            ],
          },
          ]
        : []),
      {
        id: 'practice-game',
        q: "C'est quoi, le tutoriel et les parties d'entraînement ?",
        a: [
          "Dans <b>Comment jouer</b>, choisis Spy Talk ou Spy Sketch. <b>Étape 1, Tutoriel :</b> une partie guidée de 3 minutes contre des agents IA. Joue-la côté local ou côté espion : réussir l'un ou l'autre suffit.",
          o.practiceMembers ? "<b>Étape 2, Parties d'entraînement</b> (pour les membres) : des parties complètes de 5 à 9 minutes contre des agents IA, notées de A à F. Elles se débloquent quand tu réussis le tutoriel de ce jeu, et tu peux reprendre là où tu t'es arrêté." : "<b>Étape 2, Parties d'entraînement :</b> des parties complètes de 5 à 9 minutes contre des agents IA, notées de A à F. Elles se débloquent quand tu réussis le tutoriel de ce jeu, et tu peux reprendre là où tu t'es arrêté.",
          "Chaque étape d'un tutoriel ou d'une partie d'entraînement a une carte de coach qui explique quoi faire. Une fois son bouton principal touché, la commande à utiliser reste éclairée jusqu'à ce qu'elle serve, et on peut quitter depuis n'importe quelle carte.",
          "Chaque jeu en a quatre : côté local ou côté espion, à une table de 4 ou de 8. Un A dans les huit te vaut le titre <b>Sans-faute</b> (comptes sauvegardés seulement).",
          o.launch ? "Réussir le tutoriel d'un jeu ouvre Jouer en ligne pour ce jeu (avec un compte sauvegardé). Les parties d'entraînement ne sont pas nécessaires. La soirée jeux ne le demande jamais." : "Aujourd'hui, aucun des deux n'est nécessaire pour jouer en ligne. La soirée jeux ne le demande jamais.",
        ],
      },
      ...(o.practiceMembers
        ? [
          {
            id: 'practice-members',
            q: "Qui peut jouer aux parties d'entraînement ?",
            a: [
              "Les parties d'entraînement sont réservées aux membres : jusqu'à 5 par jour. La journée commence à minuit UTC. Après tes 5 parties, une partie sauvegardée peut toujours être reprise.",
              ...(o.practiceAi
                ? ["Les membres ont les conseils de l'IA sur chaque phrase qu'ils écrivent, pendant la partie, et une note de A à F à chaque partie. Les conseils de l'IA sont pour les joueurs de 16 ans et plus qui touchent <b>Essayer</b> quand l'appli le propose ; pour les autres, c'est le téléphone qui note. Pour arrêter, désactive <b>Noter mes phrases d'entraînement avec l'IA</b> dans les Réglages. Une ligne qui ne fait que renvoyer la question (« Et toi, t'en penses quoi ? ») n'est pas une réponse : elle a une note basse."]
                : []),
              "Les tutoriels restent gratuits pour tous, et en réussir un compte toujours pour Jouer en ligne.",
              "Sans abonnement, <b>Partie d'entraînement</b> sur la dernière carte du tutoriel est grisé et indique « L'entraînement est réservé aux membres ». Le tutoriel compte quand même. La ligne en dessous est un lien vers <b>Membres</b>.",
              "La note du téléphone lui-même, quand l'avis de l'IA est désactivé, traite de la même façon une ligne qui ne fait que renvoyer la question.",
            ],
          },
          ]
        : []),
      {
        id: 'browser-play',
        q: "Puis-je jouer à SpySocial sur ordinateur ?",
        a: [
          "Tu peux te connecter sur play.spysocial.app avec le compte que tu as créé dans l'appli. Tu y retrouves ton agent, ton Coffre, le Marché noir et tes échanges.",
          o.browserPlay ? "Les salons, Jouer en ligne et la Soirée jeux fonctionnent aussi dans le navigateur." : "Pour l'instant, jouer dans le navigateur n'est ouvert qu'aux testeurs et aux créateurs que nous invitons. Les autres peuvent se connecter et utiliser leur compte (Compte, ton agent, le Coffre, le Marché noir, les échanges, réglages, Comment jouer), et voient <b>Le jeu dans le navigateur arrive bientôt</b> là où une partie commencerait. Le jeu dans le navigateur s'ouvrira à tous après le lancement, avec la version PC ; nous l'annoncerons.",
          "Les nouveaux comptes se créent dans l'appli, depuis l'App Store ou Google Play.",
        ],
      },
      {
        id: 'web-trading',
        q: "Puis-je faire des échanges ou utiliser le Marché noir sur le web ?",
        a: [
          "Oui : les adultes qui peuvent échanger peuvent utiliser les échanges et le Marché noir dans le navigateur ou dans l'appli, avec le même compte et les mêmes règles. Les moins de 18 ans peuvent regarder, mais pas acheter ni vendre.",
        ],
      },
      ...(o.autoTranslation ? [
        {
          id: 'report-translation',
          q: "Une traduction est fausse. Comment la signaler ?",
          a: [
            "Sous un message traduit, touche <b>Voir l’original</b> pour lire ce que le joueur a écrit. Les traductions sont automatiques et peuvent rater l'argot ou les blagues.",
            "Il n'y a pas de bouton pour signaler une traduction : <b>Signaler</b> sert aux infractions aux règles. Pour nous parler d'une mauvaise traduction, écris à <email/> avec une capture du message et les deux langues.",
          ],
        },
      ] : []),
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
            : ["Dans un salon privé, l'hôte choisit la langue de la partie pour le secret et les indices.", ...(o.autoTranslation ? ['Les messages dans une autre langue sont traduits automatiquement dans la tienne. Pour traduire seulement quand tu touches, désactive <b>Traduire les messages automatiquement</b> dans les Réglages.'] : [])]),
          ...(o.autoTranslation ? ["Jouer en ligne peut te proposer d'ajouter ta langue au traducteur de ton téléphone. C'est facultatif, et ça garde les lignes en anglais du chat traduites quand notre traducteur est occupé."] : []),
          ...(o.autoTranslation ? ["Sous un message traduit, touche <b>Voir l’original</b> pour le lire tel qu’il a été écrit."] : []),
          ...(o.u6153 ? ["Quand tu changes de langue dans les <b>Réglages</b>, l'appli affiche un indicateur de chargement le temps de passer à la nouvelle langue."] : []),
        ],
      },
    ],
  },
  {
    id: 'in-game',
    title: 'Pendant la partie',
    items: [
      ...(o.roleReveal
        ? [
          {
            id: 'role-reveal',
            q: "Comment marche la révélation des rôles ?",
            a: [
              "Les parties en ligne ont une révélation des rôles : Jouer en ligne, les soirées jeux et les salons privés dont l'hôte a choisi <b>En ligne</b>. Appuie sur ta carte : la lumière s'éteint et un projecteur éclaire ton rôle.",
              "Les <b>locaux</b> voient le secret et combien d'espions se cachent parmi eux : dans Spy Talk, le lieu et son image (chaque lieu de nos packs en a une) ; dans Spy Sketch, seulement le mot.",
              "Les <b>espions</b> reçoivent une carte sombre. En mode Mafia, les autres espions apparaissent à côté de toi, avec leur nom et une étiquette rouge « Espion ». En mode Classique, les espions ne se connaissent pas, donc les autres apparaissent comme <b>Inconnu</b>.",
              "Appuie sur <b>Continuer</b> dès que c'est bon pour toi. La partie avance quand tout le monde a appuyé sur « Continuer », ou quand le chrono arrive à zéro.",
              "Ta carte reste en bas de l'écran toute la partie, avec la même face : celle d'un local garde l'image du lieu, et celle d'un espion en mode Mafia donne en rouge le nom des autres espions.",
              "En mode Mafia avec plus d'un espion, appuie sur <b>CANAL DES ESPIONS</b> pour discuter en privé avec les autres espions (le canal est fermé pendant qu'un espion devine le secret) : sur ta carte avant le début, puis dans la barre du haut, ou à côté du chat pendant un vote. Un seul appui suffit ; un chiffre montre les nouveaux messages, et un message d'un autre espion s'annonce par « … essaie de te joindre ».",
              "L'étiquette rouge reste sur les photos des autres espions toute la partie. Les locaux ne voient ni les étiquettes, ni le bouton, ni le chat.",
              "En appel vocal ? Active <b>Même son pour tous les rôles</b> (Réglages, Son et musique) pour que ton micro ne capte pas le son de révélation d'un espion. L'appli ne te le demande (<b>Tu joues en appel ?</b>) que dans un salon privé <b>En ligne</b>.",
              "Toutes les cartes de rôle face cachée ont le même dos : une carte bleu marine et or. Rien dessus ne révèle ton rôle.",
            ],
          },
          {
            id: 'poker-face',
            q: "En ligne ou Même pièce : c'est quoi, Poker face ?",
            a: [
              "Quand un hôte crée un salon privé, l'appli demande <b>Où jouez-vous ?</b> Choisis <b>En ligne</b> si chacun est sur son téléphone, où qu'il soit, appel vocal compris : révélation complète des rôles et chat des espions en un geste. Choisis <b>Même pièce</b> autour d'une table : ça active <b>Poker face</b>.",
              "Avec Poker face, toutes les cartes de rôle se ressemblent : pas de carte d'espion sombre, pas d'étiquette rouge « Espion », et rien ne s'allume quand un message des espions arrive. Le mode Mafia affiche quand même en petit le nom des autres espions. Les espions ouvrent leur chat par un appui long sur leur carte (sur ordinateur, par un clic droit). Pendant un vote, ils appuient longuement sur le bouton du chat.",
              "Pourquoi : autour d'une table, un coup d'œil au téléphone du voisin pourrait trahir son rôle. Poker face évite les accidents, pas la triche. Le revers : les autres espions sont plus durs à repérer et à joindre.",
              "L'hôte peut le changer entre deux parties dans les <b>Règles</b> du salon, et les joueurs qui arrivent voient <b>« Poker face » est activé</b>. Aux soirées jeux, il se règle soirée par soirée. Il n'existe pas dans Jouer en ligne.",
            ],
          },
          ]
        : []),
      {
        id: 'voice-chat',
        q: "Y a-t-il un chat vocal ? À quoi sert le micro ?",
        a: [
          "SpySocial n'a pas de chat vocal : personne ne t'entend via l'appli. Le micro transforme ce que tu dis en texte, pour t'éviter de taper.",
          "Appuie sur le micro, parle, puis appuie de nouveau pour arrêter. Ça marche dans les chats de partie et de salon, et dans les questions de Spy Talk.",
          "C'est la reconnaissance vocale de ton téléphone (ou de ton navigateur) qui s'en charge. Nous recevons seulement le texte, jamais l'audio. Détails : <privacy>Politique de confidentialité</privacy>.",
          "Pour parler pendant la partie, lance un appel vocal à part, sur Discord ou par téléphone par exemple.",
          ...(o.roleReveal ? ["En appel, l'hôte répond <b>En ligne</b> à <b>Où jouez-vous ?</b>, et chacun peut activer <b>Même son pour tous les rôles</b> (Réglages, Son et musique) pour qu'aucun micro ne capte le son de révélation d'un espion."] : []),
          "Dans un salon privé de Spy Talk, <b>Parler à voix haute</b> permet de poser les questions et d'y répondre à voix haute, sans rien écrire.",
        ],
      },
      {
        id: 'wax-seal',
        q: "C'est quoi, le sceau de cire ?",
        a: [
          "Le sceau en haut à gauche de l'écran de jeu contient <b>Quitter</b> et <b>Infos</b>, repliés pour que personne ne quitte la partie par erreur. <b>Chat</b> et <b>Notes</b> ont leurs propres boutons en haut à droite, qui s'ouvrent d'une seule touche. Un nombre sur Chat signale de nouveaux messages.",
          "Le sceau est sur tous les écrans de la partie : le vote et ses résultats, la tentative de l'espion et l'écran de fin.",
          "Pendant le vote, la tentative de l'espion et l'écran de fin, <b>Infos</b> explique l'écran où tu es.",
          "Les parties d'entraînement ont aussi le sceau, avec <b>Terminer</b> et <b>Infos</b> pendant le vote, la tentative et l'écran de fin. La partie attend tant qu'Infos est ouvert.",
          "Touche la photo d'un joueur pour l'interpeller dans le chat. Fais glisser un message pour y répondre.",
          "Sur un ordinateur, place le curseur sur un message et clique sur la flèche qui apparaît à côté. Le tutoriel fonctionne pareil.",
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
          "<b>En personne :</b> montre ton <b>code ami</b> et laisse ton ami le scanner dans SpySocial. Un nouveau code arrive toutes les 5 minutes et marche pour 3 scans au plus : une capture d’écran cesse vite de marcher.",
          '<b>Depuis une partie privée</b> jouée ensemble dans les dernières 24 heures.',
          "<b>Entre adultes :</b> depuis une table publique, ou par nom d'utilisateur exact, s'ils l'autorisent.",
          "L'amitié est réciproque. Tu peux retirer ou bloquer un ami à tout moment, sans qu'il soit prévenu. Il n'y a pas de messages privés.",
        ],
      },
      {
        id: 'parties',
        q: "C'est quoi, un groupe ?",
        a: [
          "Un chef et ses amis qui jouent ensemble, jusqu'à 21 personnes en tout. Il faut être membre pour en créer un. " + (o.partyNoMember ? "Si le chef part, la main passe à un membre." : "Si le chef part, la main passe d'abord à un membre."),
          ...(o.partyLeaderLapse ? ["Si le chef n'est plus membre, le groupe est dissous pour tout le monde ; la main ne passe à personne. Une partie en cours va jusqu'au bout, puis chacun cherche de son côté."] : []),
          ...(o.partyNoMember ? ["Si le chef part et que plus personne n'est membre, le groupe est dissous pour tout le monde."] : []),
          "Aux tables de Jouer en ligne et aux soirées jeux, un groupe occupe au plus la moitié d'une table, signalé à tous : jusqu'à 2 à une table de 4, jusqu'à 4 à une table de 8.",
          "À une table de 12 places d'une soirée jeux, jusqu'à 6. Les membres du groupe qui cherchent seuls comptent aussi : ensemble, jamais plus de la moitié d'une table.",
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
          'Tes amis voient seulement En ligne, Joue en ligne, Dans un salon privé ou À la soirée jeux, jamais quel salon. Personne ne voit ta liste d\'amis.',
          'Les adultes peuvent avoir un profil public et des abonnés. Pas les moins de 18 ans.',
        ],
      },
      ...(o.u6152
        ? [
            {
              id: 'showcase-items',
              q: "Que se passe-t-il quand je touche un objet d'une vitrine ?",
              a: [
                "Touche n'importe quel objet de la <b>Vitrine</b> d'un joueur, la tienne ou celle d'un autre, pour ouvrir sa page.",
                "Sur la page de l'objet, <b>Voir dans les Archives</b> ouvre la page d'un Unique sur notre site, et <b>Voir sur le Marché</b> les prix de tout autre objet.",
              ],
            },
          ]
        : []),
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
          "Les 7 jours comptent à partir de la sauvegarde du compte : le temps passé en invité ne compte pas.",
            ...(o.launch ? [] : ['Pendant le test bêta, jusqu’au 7 décembre, les règles d’ancienneté du compte, de parties comptées et de nouvel appareil sont levées : chaque joueur adulte peut échanger dès que son e-mail est confirmé.']),
          ...(o.launch ? ["Les testeurs qui ont joué 3 parties comptées pendant le test bêta n’ont pas besoin de 3 autres."] : ["Les testeurs qui jouent 3 parties comptées pendant le test bêta n’en auront pas besoin de 3 autres après le lancement."]),
          "Chaque côté propose jusqu'à 10 objets, et les deux confirment avant l'échange. Les gros échanges demandent un code envoyé par e-mail.",
          ...(o.interceptsInTrades ? ['Les adultes peuvent aussi mettre des interceptions non ouvertes dans un échange : choisis combien de chaque niveau. Chacune compte pour un des 10 objets.'] : []),
          ...(o.interceptsInTrades && !o.launch ? ["Pendant la bêta, jusqu'au 7 décembre, n'importe quelle interception non ouverte peut entrer dans un échange, quelle que soit son origine. De toute façon, les interceptions repartent de zéro au lancement."] : []),
          "Ce que tu mets dans un échange ouvert lui est réservé : ça ne peut pas aller dans un autre échange ou sur le Marché noir en même temps. Si l'Intel d'un échange est dépensé avant qu'il se fasse, un avertissement s'affiche de ce côté, et l'échange ne peut pas se faire tant que le montant n'est pas baissé.",
          "L'appli indique quels objets s'échangent. Le statut de membre et ce qu'il inclut, les récompenses de niveau et les objets des jeux d'arcade, jamais." + (o.launch ? (o.gnRewardsRules ? " Ni ce qui vient d'un code, ni ce que nous ou notre équipe te donnons : ça reste sur ton compte. L'Intel n'est jamais lié à un compte, d'où qu'il vienne." : " Ni ce qui vient d'un code, ni ce que nous ou notre équipe te donnons, Choix du développeur compris : ça reste sur ton compte. L'Intel n'est jamais lié à un compte, d'où qu'il vienne.") : ''),
          "L'Intel ne s'échange qu'entre adultes.",
          ...(o.launch ? [] : ["Pendant le test bêta, jusqu’au 7 décembre, tous les adultes peuvent aussi échanger de l’Intel." + (o.intelZero ? " Juste avant le lancement, l’Intel de chaque compte passe à 0, y compris celui gagné pendant le test." : " Le 7 décembre, tout l’Intel échangé est rendu : celui qui l’a donné le récupère, et chacun ne garde que l’Intel qu’il a gagné."), "À partir du 7 décembre, les interceptions reçues par un code ou un cadeau, ce qu’elles contiennent et ce que tu obtiens avec elles par Échange restent sur ton compte : tu peux t’en servir, mais pas les échanger ni les vendre."]),
          "Acheter ou vendre des objets, de l'Intel ou des comptes contre de l'argent réel est interdit.",
        ],
      },
      {
        id: 'trade-protection',
        q: "C'est quoi, la protection de 7 jours ? Puis-je annuler un échange ?",
        a: [
          "Ce que tu reçois dans un échange est protégé pendant 7 jours. Tu peux porter un objet tout de suite, mais pas encore l'échanger, le déchiqueter ni l'utiliser dans un Échange, et l'Intel reçu ne se dépense pas encore.",
          ...(o.r21 ? ["Dans le <b>Coffre</b>, un objet protégé porte l'étiquette <b>Protégé</b>. Touche-la pour voir le temps restant."] : []),
          ...(o.interceptsInTrades ? ["Une interception non ouverte que tu reçois reste scellée pendant ces 7 jours : tu ne peux pas encore l'ouvrir, l'échanger ni la mettre en vente."] : []),
          'Pendant ces 7 jours, tu peux annuler tes échanges, une fois tous les 90 jours. Ça défait tous tes échanges protégés, dans les deux sens, et met tes échanges en pause pendant 30 jours.',
          "L’annulation défait aussi tes achats et ventes sur les Trouvailles rares encore dans leurs 3 jours de protection.",
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
          "Une vérification de fair-play met en pause les échanges et le Marché noir tant qu’elle dure. Avec une réputation Bloquée, les échanges, les cadeaux et le Marché noir restent fermés jusqu’à ce qu’elle remonte : vois <b>Réputation</b> dans les Réglages.",
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
          "Les 7 jours comptent à partir de la sauvegarde du compte : le temps passé en invité ne compte pas.",
            ...(o.launch ? [] : ['Pendant le test bêta, jusqu’au 7 décembre, les règles d’ancienneté du compte et de parties comptées sont levées ici aussi.']),
          "Les moins de 18 ans peuvent regarder, mais ni acheter, ni vendre, ni faire d'offres.",
          ...(o.launch ? [] : ["Pendant la bêta, tous les adultes peuvent acheter et vendre ici. Toutes les ventes faites pendant le test sont annulées avant le lancement : l'acheteur récupère l'Intel payé et le vendeur rend ce qu'il a reçu."]),
        ],
      },
      {
        id: 'black-market-fees',
        q: 'Quels frais, limites et prix minimum ?',
        a: [
          "Chaque objet vendu coûte 2 % de frais (1 Intel au moins, 5 000 au plus), retirés du jeu.",
          "Aucune offre ne peut passer sous le prix minimum d'un objet : ce que rapporte le déchiquetage d'un exemplaire. Pour une interception non ouverte, c'est la moyenne de son niveau.",
          "Les membres peuvent avoir 8 offres ouvertes à la fois, les autres 4. Tant qu'une offre est ouverte, son Intel ou ses objets sont réservés (tu peux toujours porter les objets).",
          "Un prix peut aller jusqu’à 1 000 000 d’Intel par exemplaire, et une offre peut porter sur 1 000 exemplaires au plus.",
          "Sur les Trouvailles rares, tu peux mettre en vente jusqu’à 25 objets Uniques à la fois et avoir jusqu’à 20 offres ouvertes sur les annonces des autres joueurs.",
          'Tu peux arrêter une offre à tout moment et récupérer ce qui reste.',
        ],
      },
      ...(o.rarefindsOffers
        ? [
            {
              id: 'rare-finds-offers',
              q: "Comment marchent les offres sur Trouvailles rares ?",
              a: [
                ...(o.appU61 ? ["Le vendeur choisit jusqu'où sous son prix on peut proposer : jusqu'à 5 %, 10 % ou 15 %, ou aucune offre."] : []),
                "L'Intel de ton offre est réservé tant qu'elle attend. Si le vendeur ne répond pas sous 24 heures, l'offre prend fin et l'Intel revient.",
                "Tu peux retirer une offre une fois qu'elle a attendu 30 minutes.",
                ...(o.appU61 ? ["Le vendeur peut accepter, refuser ou faire une contre-offre, à un prix entre ton offre et le sien. Une contre-offre ne réserve pas ton Intel : achète à ce prix, refuse-la ou fais une contre-offre à ton tour."] : []),
                "Une fois qu'un vendeur a refusé une offre, plus personne ne peut proposer aussi bas sur cette annonce : l'offre minimale monte.",
                ...(o.appU61 ? ["Le vendeur voit la nouvelle offre minimale. Si les refus la font monter jusqu'au prix, l'annonce ne prend plus d'offres : Achat immédiat seulement."] : []),
                "Si beaucoup de tes offres sont refusées et presque aucune acceptée, tu ne peux plus faire de nouvelle offre pendant 3 jours au plus.",
                ...(o.rarefindsOfferPush ? ["Avec les notifications du Marché noir activées, tu en reçois une quand le vendeur fait une contre-offre, et quand ton offre est refusée ou prend fin."] : []),
              ],
            },
          ]
        : []),
      {
        id: 'black-market-protection',
        q: 'Les ventes du Marché noir sont-elles protégées ?',
        a: [
          'Une vente sur Objets est définitive tout de suite.',
          "Un Unique acheté sur Trouvailles rares est protégé pendant 3 jours : impossible de l'échanger, de le remettre en vente, de le déchiqueter ou de l'utiliser dans un Échange, et l'Intel du vendeur attend. Pendant ce temps, la vente peut être annulée, comme un échange.",
          ...(o.r21 ? ["Tu peux le porter tout de suite : il est dans ton <b>Coffre</b> avec l'étiquette <b>Protégé</b>, qui affiche le temps restant."] : []),
          "Si l'acheteur ou le vendeur supprime son compte pendant ces 3 jours, la vente est annulée : l'acheteur récupère son Intel, ou le vendeur récupère l'Unique.",
        ],
      },
      {
        id: 'item-paused',
        q: 'Pourquoi un objet indique-t-il « En pause pour vérification » ?',
        a: [
          "Nous pouvons mettre un objet en pause sur le Marché noir pour tout le monde, le temps de le vérifier, par exemple si ses chances ou son nombre d'exemplaires semblent faussés.",
          'Pendant la pause, personne ne peut faire de nouvelle offre, mise en vente ou vente de cet objet. Tout le reste fonctionne et tu gardes ton objet.',
          "Il rouvre dès que nous l'avons vérifié.",
        ],
      },
      {
        id: 'price-guide-few',
        q: "Pourquoi le guide des prix d'un objet n'affiche-t-il pas de courbe ?",
        a: [
          "Quand il y a trop peu de ventes sur la période choisie (24 heures, 7 jours ou 30 jours), la carte indique qu'il y en a trop peu pour montrer une évolution, et ne trace pas de courbe.",
          "La courbe et l'évolution apparaissent dès qu'il y a assez de ventes.",
        ],
      },
      {
        id: 'archive-holder',
        q: "Les autres peuvent-ils voir que je détiens un Unique ?",
        a: [
          "Chaque Unique a sa page sur archive.spysocial.app. Son détenteur actuel s'affiche comme « Détenu par @pseudo », avec un lien vers son profil, seulement s'il est adulte et que son profil est public.",
          "Pour tous les autres, y compris les moins de 18 ans, c'est « Détenteur masqué ».",
          "Pour cacher ton nom, rends ton profil privé dans <b>Confidentialité et amis</b>. Il quitte les Archives en une minute environ.",
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
          "Elles ne sont jamais vendues contre de l'argent, et être membre n'en donne ni plus ni de meilleures chances.",
          o.launch ? "Avant d'en ouvrir ou d'en acheter une, l'appli affiche les probabilités exactes dans <b>Probabilités</b>." : "Avant d'en ouvrir une, l'appli affiche les probabilités exactes dans <b>Probabilités</b>.",
        ],
      },
      {
        id: 'intercept-tiers',
        q: 'Quels sont les niveaux des interceptions ?',
        a: [
          'Cinq niveaux, du plus bas au plus haut : <b>Restreint</b>, <b>Confidentiel</b>, <b>Secret</b>, <b>Très secret</b> et <b>Enigma</b>.',
          "Le niveau est fixé quand tu la gagnes. Plus il est haut, meilleures sont les chances.",
          "Un <b>Unique</b> est un exemplaire sans pareil : une gemme prisme, un cadre en feuille arc-en-ciel, un nom de code et un numéro qu'aucun autre n'a. Chaque exemplaire garde ses propres couleurs à l'intérieur.",
          ...(o.u6152 ? ["Le nom de code est le nom de l'Unique, comme <b>Dépêche d'onyx</b>. En dessous, en plus petit, s'affiche le Légendaire dont il vient, avec son numéro : Avion en papier #37."] : []),
        ],
      },
      {
        id: 'earn-intercepts',
        q: 'Comment gagner des interceptions ?',
        a: [
          '<b>Victoires :</b> toutes les 10 victoires à Jouer en ligne, tu reçois 5 interceptions, dont une de niveau Secret ou mieux.',
          "<b>Chaque jour :</b> ta première partie du jour à Jouer en ligne t'en donne une. Chaque 7e jour d'affilée en ajoute une Secret ou mieux, et chaque 30e jour, une Enigma.",
          ...(o.gnRewards ? ["<b>Soirée jeux :</b> tes parties y rapportent de l'Intel de soirée jeux, qui te permet d'obtenir des interceptions de soirée jeux (plus bas)."] : o.gnRewardsRules ? [] : ["<b>Soirée jeux :</b> gagne une partie, en local ou en espion, et tu reçois une Enigma, une par soirée."]),
          `<b>Codes et cadeaux :</b> un code d'un créateur ou de nous marche une fois par compte, et ses interceptions se débloquent après ta première partie comptée à Jouer en ligne. Nous en offrons aussi.${o.launch ? " Les interceptions d'un code ou d'un cadeau, ce qu'elles contiennent et ce que tu en tires par Échange sont pour toi seul : ils ne s'échangent, ne se vendent et ne s'offrent pas, quel que soit ton nombre de parties. Tu peux toujours les ouvrir, porter ce qui en sort, les utiliser dans un Échange et déchiqueter les doublons. Déchiqueter un doublon donne de l'Intel ordinaire." : ''}`,
          ...(o.launch ? ["<b>Bienvenue :</b> un compte sauvegardé reçoit une première interception gratuite. Comme celles d’un code ou d’un cadeau, elle et ce qu’elle contient restent sur ton compte : ils ne s’échangent pas et ne se vendent pas."] : []),
          'Les salons privés ne donnent pas d\'interceptions.',
          ...(o.launch
            ? []
            : ["Avant l'ouverture de la 2.2 à tous, les interceptions repartent de zéro : celles gagnées dans les versions de test sont effacées. Le Pin bêta et ce qui a été acheté dans un store restent."]),
        ],
      },
      ...(o.gnRewards
        ? [
          {
            id: 'game-night-intercepts',
            q: "C'est quoi, les interceptions de soirée jeux ?",
            a: [
              o.gnTiers4 ? `Des interceptions que tu obtiens avec l'Intel de soirée jeux, dans <b>Compétition</b>, sur l'onglet <b>Soirée jeux</b> : <b>Niveau 1</b> pour 400 (toute rareté, jusqu'à Légendaire), <b>Niveau 2</b> pour 800 (Peu commun ou mieux), <b>Niveau 3</b> pour 1 600 (Rare ou mieux) et <b>Niveau 4</b> pour 3 200 (Épique ou mieux, avec une chance d'Unique).` : "Des interceptions que tu obtiens avec l'Intel de soirée jeux, dans <b>Compétition</b>, sur l'onglet <b>Soirée jeux</b> : <b>Niveau 1</b> pour 400 (toute rareté, jusqu'à Légendaire), <b>Niveau 2</b> pour 800 (Peu commun ou mieux) et <b>Niveau 3</b> pour 10 000 (Épique ou mieux, avec une chance d'Unique).",
              ...(o.r21 ? ["Tu peux en obtenir jusqu'à 5 d'un même niveau à la fois, autant que ton Intel de Soirée jeux le permet, et les ouvrir sur place, dans l'onglet <b>Soirée jeux</b>."] : []),
              "Elles s'ouvrent sur la collection propre à la soirée jeux, <b>After Hours</b> : 14 objets de salle de cartes pour ton agent qu'aucune autre interception ne contient. Comme pour toute interception, l'appli affiche les chances exactes.",
              ...(o.gnTiers4 ? [`Un doublon de n'importe quel objet <b>After Hours</b>, quelle que soit la façon dont tu l'as obtenu (ouvert, acheté ou reçu dans un échange), se déchiquette contre de l'<b>Intel de soirée jeux</b>, pas de l'Intel, au montant affiché par l'appli (jamais ta première copie).`] : []),
              ...(o.u6153 ? ["Le fond Légendaire de la soirée jeux est <b>Black-out</b>, qui s'appelait avant L'Arrière-salle. Sa scène de repos est <b>Rain Window</b>."] : []),
              "Une interception achetée attend dans <b>À ouvrir</b>. Ouvre-la sur l'onglet <b>Soirée jeux</b> ou dans le <b>Coffre</b>, comme celles que tu as déjà. Contrairement à l'Intel de soirée jeux, les interceptions et ce qu'elles contiennent s'échangent comme tout ce que tu gagnes.",
              "Touche <b>Contenu</b> sur un palier pour voir les probabilités par rareté. Seules les probabilités sont affichées, pas la liste des objets.",
            ],
          },
          ]
        : []),
      {
        id: 'change-your-look',
        q: "Comment trier et filtrer dans Ton look ?",
        a: [
          "Sur l'accueil, touche <b>Ton look</b>. Là, la boîte <b>Trier et filtrer</b> règle l’ordre et un filtre de rareté. Les deux restent quand tu changes de catégorie, et un indicateur montre qu’un filtre est actif.",
          ...(o.r21 ? ["Touche le sélecteur <b>Agent</b> / <b>Équipement</b> pour passer de l'apparence de ton agent (peau, cheveux, visage, pilosité) à ton équipement (chapeaux, lunettes, tenues, fonds)."] : []),
        ],
      },
      {
        id: 'vault-filter-empty',
        q: 'Pourquoi mon Coffre indique-t-il « Aucun résultat » alors que j\'ai des objets ?',
        a: [
          'Un choix de <b>Trier et filtrer</b> ou la recherche les masque. Touche <b>Effacer les filtres</b> sur cet écran pour tout revoir.',
          'Le nombre en haut correspond à la liste affichée, filtres compris.',
        ],
      },
      {
        id: 'duplicates',
        q: 'Que faire des doublons ?',
        a: [
          "<b>Déchiquette</b> un doublon contre de l'Intel, au montant affiché par l'appli.",
          ...(o.gnTiers4 ? [`Un doublon de n'importe quel objet <b>After Hours</b>, quelle que soit la façon dont tu l'as obtenu, se déchiquette plutôt contre de l'Intel de soirée jeux.`] : []),
          "<b>Échange :</b> 5 doublons d'une rareté te donnent 1 objet au hasard de la rareté suivante, et 10 doublons Légendaires te donnent un Unique." + (o.launch ? " S'il y a un cadeau parmi eux, ce que tu obtiens est pour toi seul aussi." : ''),
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
          o.launch ? "L'Intel n'est jamais vendu et n'a aucune valeur en argent. Les adultes le dépensent au Marché noir et peuvent l'échanger avec d'autres adultes." : "L’Intel n’est jamais vendu et n’a aucune valeur en argent. Les adultes peuvent l’échanger avec d’autres adultes et le dépenser au Marché noir. Pendant la bêta, tous les échanges sont annulés avant le lancement du 8 décembre.",
          "Chaque changement de ton Intel est une ligne de ton registre Intel, avec son motif. Consulte le tien dans <b>Historique d'Intel</b>, depuis « Comment fonctionne l'Intel », sur la dernière mise à jour de l'appli.",
          "Dans le <b>Coffre</b>, ton Intel a sa propre tuile, une pile qui grandit avec le montant. Touche-la pour voir ce que tu as gagné aujourd'hui, gagné en tout et dépensé en tout. L'Intel bloqué dans une offre ouverte du Marché noir compte comme dépensé jusqu'à son retour.",
        ],
      },
      ...(o.launch
        ? []
        : [
          {
            id: 'shops-closed',
            q: 'Pourquoi les boutiques sont-elles fermées ?',
            a: [
              "Juste avant le lancement, la boutique Intel et la boutique Soirée jeux ferment, à partir du lundi 7 décembre. L'appli affiche <b>Les boutiques rouvrent au lancement</b>, avec la date.",
              'Elles rouvrent au lancement, le mardi 8 décembre.',
            ],
          },
          ]),
      {
        id: 'verifying',
        q: 'Pourquoi une récompense affiche-t-elle « Vérification » ?',
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
          "Quand une formule membre se termine ou est remboursée, ce qui allait avec n'est plus disponible.",
          ...(o.launch ? [] : ['Les interceptions des versions de test et leurs objets sont effacés avant que la 2.2 ouvre à tout le monde.']),
          "Rien de tout ça ? Écris à <email/> avec ton nom d'utilisateur, le nom de l'objet et quand tu l'as vu pour la dernière fois.",
        ],
      },
      {
        id: 'tester-rewards',
        q: 'Où sont mes récompenses de la bêta ?',
        a: [
          ...(o.testerGiftGame
            ? [
              o.launch
                ? "Elles ont été ajoutées au lancement de la 2.2 et restent à toi. Tous les testeurs de la liste ont reçu le <b>Pin bêta</b> et le titre <b>« Équipe bêta »</b>. Une carte de remerciement s'affiche à ta première ouverture de l'appli après le lancement."
                : "Elles arrivent au lancement de la 2.2, le 8 décembre, sur une carte de remerciement à l'ouverture de l'appli, et elles restent à toi. Tous les testeurs de la liste reçoivent le <b>Pin bêta</b> et le titre <b>« Équipe bêta »</b>.",
              o.launch
                ? "Les testeurs qui ont terminé au moins une partie avec d'autres joueurs avant le 7 décembre (jouée jusqu'au bout, dans n'importe quel salon, donc visible dans leurs Stats ; les parties d'entraînement ne comptent pas) ont aussi reçu le titre <b>« Test de terrain »</b>, 10 interceptions de chaque niveau et 1 mois en tant que membre."
                : "Termine au moins une partie avec d'autres joueurs avant le 7 décembre (jouée jusqu'au bout, dans n'importe quel salon, donc visible dans tes Stats ; les parties d'entraînement ne comptent pas) et tu reçois aussi le titre <b>« Test de terrain »</b>, 10 interceptions de chaque niveau et 1 mois en tant que membre.",
              o.testerInterceptsTradable
                ? "Le <b>Pin bêta</b>, le titre <b>« Test de terrain »</b> et les interceptions de remerciement s'échangent comme tout ce que tu gagnes."
                : "Le <b>Pin bêta</b> et le titre <b>« Test de terrain »</b> s'échangent comme tout ce que tu gagnes ; comme les autres cadeaux, les interceptions de remerciement restent sur ton compte.",
            ]
            : [
              o.launch
                ? "Elles ont été ajoutées au lancement de la 2.2 et restent à toi : le <b>Pin bêta</b>, les titres <b>« Équipe bêta »</b> et <b>« Test de terrain »</b>, 10 interceptions de chaque niveau et 1 mois en tant que membre. Une carte de remerciement s'affiche à ta première ouverture de l'appli après le lancement."
                : "Elles arrivent au lancement de la 2.2, le 8 décembre, sur une carte de remerciement à l'ouverture de l'appli, et elles restent à toi : le <b>Pin bêta</b>, les titres <b>« Équipe bêta »</b> et <b>« Test de terrain »</b>, 10 interceptions de chaque niveau et 1 mois en tant que membre.",
            ]),
          ...(o.launch ? [] : ["Ce que tu as maintenant dans une version de test sert à tester et sera effacé avant le lancement. Tes récompenses n'en dépendent pas, tant que tu gardes le même compte sauvegardé."]),
          "Pour porter le pin : <b>Compte</b>, <b>Modifier l'agent</b>, <b>Accessoires</b>, <b>Pin bêta</b>, <b>Enregistrer</b>.",
          "Il manque quelque chose ? Écris à <email/> avec ton nom d'utilisateur et l'e-mail utilisé pendant le test. Un compte invité n'est pas sur la liste : c'est souvent une question de compte différent.",
          ...(o.launch ? [] : ["La Bêta 3 a lieu le mardi 24 novembre, de 20 h à 21 h, heure de l’Est des États-Unis (on peut rejoindre dès 19 h 30). Si l’e-mail de ta place parle du remerciement de 10 $ : joue au moins une partie ce soir-là et envoie le questionnaire avant le vendredi 27 novembre, 23 h 59 heure de l’Est, et les 10 $ arrivent par PayPal avant le 1er décembre. La Bêta 3 est ouverte à tous : toute personne qui joue ce soir-là et envoie le questionnaire peut gagner les 50 $ pour le rapport ou l’idée la plus utile, que nous choisirons."]),
        ],
      },
      ...(o.launch ? [
        {
          id: 'after-launch-reset',
          q: "Où sont passés mes Intel et objets de la bêta ?",
          a: [
            "Avant le lancement, le 7 décembre, tout ce qui venait des versions de test a été réinitialisé : Intel, interceptions, objets, offres du Marché noir, échanges et abonnements de test. Tout le monde est reparti de zéro au lancement.",
            "Tu gardes ton compte, tes amis, tes packs, ton XP, ton niveau, tes succès, tes stats, les titres obtenus par code et ce que tu as acheté en boutique. Les testeurs ont gardé le <b>Beta Pin</b> et reçu leurs récompenses de remerciement (voir « Où sont mes récompenses de la bêta ? »).",
            "Un problème ? Écris à <email/> avec ton nom d'utilisateur.",
          ],
        },
      ] : []),
      ...(o.launch
        ? []
        : [
          {
            id: 'beta-reset',
            q: "L'appli dit que tout sera réinitialisé avant le lancement. Ça veut dire quoi ?",
            a: [
              "SpySocial est encore en test. Avant le lancement du 8 décembre, les objets, les interceptions, l'Intel, les transactions du Marché noir et les échanges seront réinitialisés, et tout le monde repartira de zéro.",
              "Ton compte, tes amis et tes packs restent, tout comme ton XP, ton niveau, tes succès, tes stats, tes notes des parties d'entraînement, les titres obtenus par code et tout ce que tu as acheté sur l'App Store ou Google Play.",
              ...(o.gnRewards ? [o.gnTiers4 ? `Tes titres ★ de soirée jeux restent, et tu récupères tout l'Intel de soirée jeux que tu as gagné en jouant, même si tu l'as dépensé. Celui obtenu en déchiquetant n'est pas rendu.` : "Tes titres ★ de soirée jeux restent, et tu récupères tout l'Intel de soirée jeux que tu as gagné, même si tu l'as dépensé."] : []),
              "Les statuts de membre offerts pour le test prennent fin au lancement." + (o.intelZero ? " Ta série repart du jour 0." : ''),
              "Les testeurs recevront une récompense spéciale pour leur aide.",
              "Le message s'affiche dans le Coffre, le Marché noir et les écrans d'échanges. Touche-le pour en savoir plus, ou touche X pour le masquer sur ce téléphone.",
            ],
          },
          ]),
    ],
  },
  {
    id: 'membership',
    title: 'Membres',
    items: [
      {
        id: 'membership-includes',
        q: "Que comprend le statut de membre ?",
        a: [
          ...(o.purchases ? [] : ["Le statut de membre sera en vente avec la version 2.2."]),
          'Tous les packs premium, nouveaux compris. Tout le monde y joue dans les salons dont tu es l’hôte et à ta table de Jouer en ligne.',
          'Crée tes propres packs avec le créateur et partage-les dans la communauté.',
          '+50 % d\'XP à chaque partie, et des salons réservés aux membres à Jouer en ligne.',
          ...(o.practiceMembers ? ["Les parties d'entraînement, jusqu'à 5 par jour, avec des notes de A à F" + (o.practiceAi ? " et les conseils de l'IA en option (16+)." : ".")] : []),
          "Le cadre, l'étiquette et le titre de ton rang. Tu peux mener un groupe et avoir 8 offres ouvertes au Marché noir au lieu de 4.",
          "Ça ne change jamais ta façon de jouer ni tes points. Les packs gratuits restent gratuits pour tous.",
        ],
      },
      {
        id: 'pack-creator',
        q: "Comment marche le créateur de packs ?",
        a: [
          "Avec le statut de membre (dès 13 ans), ouvre <b>Packs</b>, puis le créateur de packs. Un pack doit compter de 30 à 200 entrées pour être joué ou envoyé à la <b>Communauté</b>.",
          "Tes packs se jouent dans les salons privés dont tu es l'hôte, tant que tu es membre.",
          "Envoie-en un à la <b>Communauté</b> et on le vérifie sous 72 heures : une vérification automatique lit d'abord le texte, puis une personne décide. Il affiche <b>En vérification</b>, puis <b>Dans la communauté</b>, ou <b>À modifier</b> avec la raison : corrige-le et renvoie-le.",
          "Les packs populaires peuvent passer <b>À la une</b>. Les autres membres ajoutent des packs de la communauté à <b>Mes packs</b> pour y jouer dans leurs salons.",
          "Les joueurs de moins de 18 ans ne reçoivent pas notre réponse entre 22 h et 7 h.",
          "La page d’un pack affiche la photo de son auteur et <b>par nom</b> : touche-le pour ouvrir son profil, ou touche <b>Autres packs : nom</b>.",
        ],
      },
      ...(o.u6153
        ? [
          {
            id: 'membership-cards',
            q: "Que sont les cartes d'abonnement membre dans l'appli ?",
            a: [
              "Là où les membres ont plus, une courte carte le dit. Touche-la n'importe où pour ouvrir l'offre membres dans le <b>Coffre</b>. Elle n'achète jamais rien toute seule.",
              "<b>Marché noir</b>, Tes offres : 8 offres ouvertes pour les membres, 4 pour les autres.",
              "<b>Groupes</b> : les membres les mènent.",
              "Le choix des packs dans un salon que tu héberges : tous les packs premium et n'importe quel pack de la communauté que tu ajoutes, plus le créateur de packs pour faire les tiens.",
              "<b>Vestiaire</b> : les membres portent le cadre et le titre de leur rang.",
              "La page d'un pack de la communauté : les membres l'ajoutent à <b>Mes packs</b>.",
            ],
          },
        ]
        : []),
      {
        id: 'membership-plans',
        q: "C'est quoi, Agent, Élite et Maître espion ?",
        a: [
          "<b>Agent</b> est la formule mensuelle, <b>Élite</b> la formule annuelle, et <b>Maître espion</b> l'accès à vie : un seul paiement, sans renouvellement.",
          'Maître espion ajoute les trois cadres métalliques, le titre Carte or, la célébration Tempête dorée et des objets pour ton agent réservés à l\'accès à vie.',
          "L'accès à vie dure tant que nous proposons SpySocial, pas toute ta vie. Pas d'essai gratuit, et le statut de membre ne se partage pas via le Partage familial.",
          ...(o.purchases ? ["L'App Store ou Google Play affiche le prix dans ta monnaie avant l'achat."] : []),
        ],
      },
      ...(o.membershipSwitch
        ? [
          {
            id: 'membership-switch',
            q: 'Puis-je passer de la formule mensuelle à la formule annuelle, et inversement ?',
            a: [
              "Oui, dans l'appli : ouvre le <b>Coffre</b>, puis <b>Membres</b>. Avec la formule mensuelle, touche <b>Passer à Élite</b> (annuelle) ou <b>Passer à Maître espion</b> (accès à vie). Avec la formule annuelle, il y a aussi <b>Passer au mensuel</b> : le cadre, le titre et l'étiquette Élite deviennent ceux d'Agent, et tous les autres avantages restent.",
              "Tu ne paies jamais deux fois. Sur Google Play, la nouvelle formule commence tout de suite et le temps déjà payé devient du temps sur la nouvelle. Sur l'App Store, Apple décide quand elle commence, souvent à ton prochain renouvellement, et te crédite le temps déjà payé.",
              "Une formule facturée par l'autre boutique se change dans cette boutique : en acheter une autre ici te ferait payer deux fois.",
              ...(o.googlePassStop
                ? ["Quand tu achètes l'accès à vie, une formule mensuelle ou annuelle facturée par Google Play arrête de se renouveler toute seule : tu la gardes jusqu'à sa date de fin, et rien d'autre n'est prélevé. Apple ne le permet pas, donc résilie toi-même une formule de l'App Store."]
                : []),
            ],
          },
          {
            id: 'two-memberships',
            q: "L'appli dit que j'ai deux formules actives",
            a: [
              "Tu paies deux formules à la fois : par exemple l'accès à vie et une formule mensuelle, ou une sur chaque boutique. L'appli te dit laquelle garder et laquelle résilier, à l'ouverture et dans l'onglet <b>Membres</b>.",
              "Touche <b>Gérer ma formule</b> pour résilier celle en trop dans sa boutique. Résilier arrête seulement le prochain prélèvement : tu gardes le temps déjà payé.",
              ...(o.googlePassStop ? ["Si celle en trop est facturée par Google Play, <b>Arrêter le renouvellement</b> l'arrête directement depuis l'appli."] : []),
              "Rien n'est bloqué en attendant : <b>Plus tard</b> masque le message jusqu'à ta prochaine ouverture de l'appli.",
            ],
          },
          ]
        : []),
      ...(o.memberLoyalty
        ? [
          {
            id: 'member-time',
            q: "C'est quoi, « Membre depuis » ?",
            a: [
              "Tant que tu es membre, le <b>Compte</b> indique depuis quand et depuis combien de temps tu l'es, et le <b>Coffre</b> montre tes tampons : 1, 3 et 6 mois, 1, 2 et 3 ans, puis chaque année.",
              "On compte le temps où tu as été membre sans interruption : une formule mensuelle ou annuelle, l'accès à vie, un cadeau ou un code. Le temps remboursé et les achats de test ne comptent pas.",
              "Ça se gagne en restant. Dès le premier jour où tu n'es plus membre (après le délai de grâce que le store accorde en cas d'échec de paiement), ton ancienneté et tes tampons disparaissent. Si tu redeviens membre, « Membre depuis » et ton ancienneté repartent de zéro.",
              "L'<b>accès à vie</b> fait exception : ton ancienneté compte depuis ton premier jour de membre, mois de formule mensuelle ou annuelle d'avant compris, et continue de grandir, avec chaque tampon que nous ajouterons.",
              "Les autres joueurs voient seulement ton ancienneté, avec ton tampon, sur ta fiche de joueur, jamais la date ni le prix. Désactive <b>Afficher mon ancienneté de membre</b> dans les Réglages pour le cacher. L'ancienneté d'un compte de moins de 13 ans n'est jamais montrée aux autres.",
              "Les tampons changent seulement l'apparence de ton profil : pas d'XP, pas de meilleures chances, et ils ne s'échangent pas.",
            ],
          },
          {
            id: 'membership-price',
            q: "Mon prix va-t-il augmenter ?",
            a: [
              "Tant que ta formule se renouvelle sans interruption, tu gardes le prix que tu paies aujourd'hui, même s'il augmente pour les nouveaux membres. Le store peut encore l'ajuster selon les taxes locales ou la devise.",
              "Si tu passes à l'autre formule, tu paies le prix actuel de cette formule. Si ta formule prend fin et que tu reviens plus tard, tu paieras peut-être le prix du moment. L'accès à vie se paie une fois et ne se renouvelle jamais.",
            ],
          },
          ]
        : []),
      {
        id: 'cancel-membership',
        q: 'Comment marchent le renouvellement automatique et la résiliation ?',
        a: [
          "Agent et Élite se renouvellent automatiquement jusqu'à ce que tu résilies : sur l'App Store, au moins 24 heures avant la fin de la période ; sur Google Play, avant la date de renouvellement. Tu gardes les avantages jusqu'à la fin de la période payée.",
          '<b>iPhone ou iPad :</b> Réglages, ton nom, Abonnements, SpySocial.',
          "<b>Android :</b> l'appli Google Play Store, ta photo de profil, Paiements et abonnements, Abonnements, SpySocial.",
          o.googlePassStop
            ? "<b>Gérer ma formule</b> dans l'appli ouvre la même page. Supprimer l'appli ou ton compte ne résilie pas une formule mensuelle ou annuelle. Acheter l'accès à vie arrête tout seul une formule facturée par Google Play, mais pas une formule facturée par l'App Store."
            : "<b>Gérer ma formule</b> dans l'appli ouvre la même page. Supprimer l'appli ou ton compte, ou acheter l'accès à vie, ne résilie pas une formule mensuelle ou annuelle.",
          ...(o.memberLoyalty ? ["Dans le <b>Coffre</b>, <b>Résilier la formule</b> (sous Gérer ma formule) affiche d'abord un seul écran avec les faits : si ta formule prend fin, ton ancienneté et tes tampons repartent à zéro, et ton prix bloqué prend fin. Son seul bouton, <b>Continuer la résiliation</b>, mène directement à la boutique. <b>Gérer ma formule</b> ouvre toujours directement la boutique. Rien ne change avant la fin de la période payée."] : []),
        ],
      },
      {
        id: 'restore-purchases',
        q: 'Comment récupérer mon statut de membre ?',
        a: [
          "Touche <b>Restaurer les achats</b> dans l'appli, avec ton téléphone connecté au compte App Store ou Google Play qui a payé.",
          "Ton statut de membre passe sur le compte SpySocial que tu utilises, et quitte tout autre compte où il était, même supprimé.",
        ],
      },
      {
        id: 'charged-no-membership',
        q: "On m'a débité, mais je n'ai pas d'abonnement, ou on m'a débité deux fois.",
        a: [
          "Touche d'abord <b>Restaurer les achats</b> dans l'appli, avec ton téléphone connecté au compte App Store ou Google Play qui a payé. L'abonnement passe sur le compte SpySocial que tu utilises.",
          "Débité deux fois, ou tu veux un remboursement ? Apple et Google gèrent les remboursements : demande à Apple sur reportaproblem.apple.com, ou à Google via l'historique de tes commandes Google Play.",
          "Toujours bloqué ? Écris à <email/> avec ton nom d'utilisateur et le numéro de commande du reçu Apple ou Google. N'envoie jamais de numéro de carte.",
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
          "Un <b>invité</b> peut faire les tutoriels et jouer tout de suite dans les salons privés. Un compte invité vit sur un seul téléphone, et se déconnecter le supprime pour de bon.",
          `Un compte <b>sauvegardé</b> (Apple, Google ou ton e-mail${o.passwordless ? ', avec un code envoyé par e-mail, sans mot de passe' : ''}) garde ton nom, ta progression et ton statut de membre sur n'importe quel téléphone, et te permet de jouer en ligne, de rejoindre la soirée jeux et d'ajouter des amis.`,
          "Tu peux sauvegarder un compte invité à tout moment depuis la page de ton compte, sans rien perdre. Amis, Échanges et le Marché noir demandent d'abord à un invité de le sauvegarder.",
          ...(o.guestSaveBeforeBuy ? ["Pour acheter un statut de membre, un invité sauvegarde d'abord son compte (avec Apple, Google ou un e-mail), pour ne jamais perdre ce statut. L'achat continue dès que le compte est sauvegardé."] : []),
          ...(o.u6152 ? ["Tant que tu ne l'as pas sauvegardé, une carte <b>Sauvegarde ton compte</b> s'affiche sur l'écran de fin après chaque partie. Touche × pour ne plus la voir sur ce téléphone."] : []),
        ],
      },
      ...(o.emailCodes22
        ? [
          {
            id: 'sign-up-email',
            q: "Comment m'inscrire avec mon e-mail ?",
            a: [
              "Touche <b>Continuer avec un e-mail</b> et tape ton adresse. On t'envoie un code à 6 chiffres : tape-le dans l'appli, et ton compte est créé. Pas besoin de mot de passe.",
              "Le code marche pendant 1 heure. Pas reçu ? Regarde dans les spams ou le courrier indésirable, ou touche <b>Renvoyer le code</b> au bout d'une minute.",
              ...(o.passwordless
                ? []
                : ["Les anciennes versions de l'appli demandent un mot de passe. Si l'une d'elles dit que le mot de passe est trop courant ou est apparu dans une fuite de données, choisis-en un autre : aucun compte n'a été créé, aucun e-mail n'est parti, et tu peux réessayer tout de suite."]),
            ],
          },
          ]
        : []),
      {
        id: 'lost-account',
        q: "J'ai perdu mon compte. Puis-je le récupérer ?",
        a: [
          "Un <b>compte sauvegardé</b> revient sur n'importe quel téléphone : ouvre SpySocial et connecte-toi comme avant (Apple, Google ou le même e-mail). Un autre e-mail, ou Masquer mon adresse e-mail d'Apple, ouvre un nouveau compte vide : c'est souvent pour ça que la progression semble disparue.",
          "Un <b>compte invité</b> vit sur un seul téléphone. Si l'appli a été supprimée, si le téléphone est perdu ou si tu t'es déconnecté, il est perdu pour de bon et nous ne pouvons pas le récupérer.",
          "Si l'appli affiche <b>Impossible d’ouvrir ton compte</b>, ton compte est toujours enregistré sur le téléphone, mais il n'a pas pu être lu à ce moment-là. Touche <b>Réessayer</b>, ou ferme l'appli et rouvre-la.",
          'Le statut de membre ne se perd pas : <b>Restaurer les achats</b> le ramène. Nous ne pouvons pas fusionner des comptes ni déplacer des objets entre eux.',
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
          ...(o.pasteCode ? ["Tu as copié le code de ton e-mail ? Touche <b>Coller le code</b> dans l'appli et les cases se remplissent."] : []),
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
          o.launch ? "Change ton nom affiché, ton nom d’utilisateur (une fois tous les 30 jours) et tes 2e et 3e couleurs dans <b>Réglages</b>." : "Change ton nom affiché quand tu veux sur la page de ton compte, et ton nom d'utilisateur une fois tous les 30 jours.",
          ...(o.launch ? [] : ["Un nouveau compte commence avec un nom d'affichage au hasard, dans la langue de ton appli."]),
          o.launch ? "Quand tu crées un compte, tu choisis ton @nom d’utilisateur et une couleur, et ton nom affiché est formé à partir du nom d’utilisateur. Il ne reprend jamais le nom de ton compte Google ou Apple." : "Quand tu crées un compte, ton @nom d'utilisateur est formé à partir du nom affiché que tu tapes et le suit jusqu'à ce que tu en tapes un toi-même ou que tu lances le dé. Il ne reprend jamais le nom de ton compte Google ou Apple.",
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
          "Dans l’appli : <b>Compte</b>, <b>Réglages</b>, <b>Compte et connexion</b>, <b>Supprimer le compte</b>. C’est définitif. Un compte invité se supprime au même endroit, ou en se déconnectant.",
          'Tu peux aussi nous le demander par e-mail : voir <delete>Supprimer ton compte</delete>.',
          "Supprimer ton compte ne résilie pas ta formule. Résilie-la d'abord dans l'App Store ou sur Google Play, sinon tu continueras à payer.",
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
          "Dans le salon, appuie longuement sur sa carte. En partie, appuie longuement sur sa photo : <b>Signaler</b> et <b>Bloquer</b> sont en bas de tes notes sur ce joueur. Sur l'écran de fin, touche sa carte.",
          "Une personne lit chaque signalement, et le joueur ne sait pas qui l'a envoyé.",
          "Bloquer vous sépare : aucun de vous ne peut rejoindre un salon où se trouve l'autre. Débloque dans les Réglages, sous <b>Confidentialité et sécurité</b> : <b>Joueurs bloqués</b>.",
          'Mentir et bluffer font partie du jeu et ne se signalent pas.',
          "À une table avec un groupe, choisis <b>Entente</b> si tu penses qu'ils s'aident en dehors du jeu. <b>Signaler le groupe</b> couvre tous les membres de leur groupe à cette table.",
        ],
      },
      {
        id: 'child-safety-urgent',
        q: "Quelqu'un met un enfant en danger. Que faire ?",
        a: [
          "Si un enfant est en danger immédiat, appelle d'abord le numéro d'urgence de ton pays : 999 au Royaume-Uni, 911 aux États-Unis, 112 dans l'UE.",
          "Signale ensuite le joueur dans l'appli (appui long sur sa carte, puis <b>Signaler</b>, et choisis <b>Sécurité des enfants</b>) et écris à <email/> avec « Child safety » en objet. Nous supprimons le contenu, bannissons les comptes concernés et le signalons au National Center for Missing & Exploited Children (NCMEC), comme la loi américaine l'exige. Notre <safety>page Sécurité</safety> en dit plus.",
        ],
      },
      {
        id: 'moderators',
        q: 'Qui modère SpySocial ?',
        a: [
          "Notre équipe lit chaque signalement et décide de la suite. Des modérateurs bénévoles de confiance aident, avec notre accord : aux tables de la soirée jeux, avec les messages signalés et avec les packs de la communauté.",
          'Tu peux faire appel de toute décision en écrivant à <email/>.',
        ],
      },
      {
        id: 'reputation',
        q: "C'est quoi, ma réputation ?",
        a: [
          "Chaque compte en a une. Regarde la tienne dans les Réglages, sous <b>Réputation</b> : Excellente, Bonne, Faible, En danger ou Bloquée. Les nouveaux comptes commencent à Bonne.",
          "Ta réputation vient de ton historique : depuis quand tu joues, et les signalements, avertissements, chats coupés et pauses. Le score exact n'est pas affiché. Les anciennes notes comptent moins avec le temps et ne comptent plus après 90 jours.",
          "Pour les nouveaux comptes et les joueurs à la réputation plus faible, davantage de dessins sont vérifiés automatiquement.",
          "Tant qu'elle est Bloquée, Jouer en ligne, les salons publics, les soirées jeux, les échanges, les cadeaux et le Marché noir te sont fermés, et parfois les salons privés aussi. Tu peux toujours te connecter et tu gardes tes objets. Elle remonte avec le temps si tu joues franc jeu.",
          "Tu penses que c'est une erreur ? Écris à <email/> et on vérifiera.",
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
          'Jouer en ligne et la soirée jeux demandent un compte sauvegardé.',
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
      ...(o.u6153
        ? [
          {
            id: 'tablet-keyboard',
            q: "Le clavier à l'écran change-t-il la mise en page sur une tablette ?",
            a: [
              "Dans le navigateur d'une tablette, le clavier à l'écran ne fait plus passer le jeu en mise en page à l'horizontale : l'écran garde sa forme verticale pendant que tu écris.",
              "La page remonte pour que le champ où tu écris reste au-dessus des touches.",
              "Une tablette tournée sur le côté garde la mise en page tablette de l'appli, pas la large mise en page d'ordinateur.",
            ],
          },
        ]
        : []),
      {
        id: 'game-not-counted',
        q: "Ma partie n'a pas compté",
        a: [
          "Une partie compte dans ton palmarès quand elle s'est terminée et que tu avais une place, que tu aies joué jusqu'au bout, quitté avant la fin (une défaite) ou été absent.",
          "Ne comptent pas : une partie arrêtée par l'hôte, une partie avec trop peu de joueurs, une distribution annulée, une partie abandonnée, être retiré du salon, une place où tu n'es jamais venu, ou regarder. Une partie sans gagnant n'est ni une victoire ni une défaite.",
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
          "Les notifications de partie arrivent quand tu cherches une partie à Jouer en ligne, et les rappels de soirée jeux quand tu touches <b>Me le rappeler</b>. Les invités n'en reçoivent pas.",
          'Les moins de 18 ans ne reçoivent pas de notifications sociales, ni notre réponse sur un pack envoyé à Communauté, entre 22 h et 7 h.',
        ],
      },
      {
        id: 'contact-support',
        q: 'Comment contacter le support ?',
        a: [
          "Écris à <email/>. Pour ton compte, écris depuis son adresse e-mail. Une personne lit chaque message.",
          'Pour les nouvelles, les soirées jeux et les joueurs qui cherchent une partie, rejoins notre <discord>Discord</discord>.',
          "Sur l'accueil, la partie <b>Trouver des joueurs</b> de la carte du haut ouvre notre serveur Discord. Il est réservé aux joueurs de 16 ans et plus, et ceux de 16 et 17 ans voient d'abord une courte note de sécurité.",
        ],
      },
    ],
  },
]

const fix = (list: HelpSection[]): HelpSection[] =>
  list.map((sec) => ({ ...sec, title: nb(sec.title), items: sec.items.map((it) => ({ ...it, q: nb(it.q), a: it.a.map(nb) })) }))

const fr: HelpText = {
  title: 'Aide et FAQ',
  lede: nb("Des réponses rapides pour jouer à SpySocial, ton compte, les récompenses et le statut de membre."),
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
