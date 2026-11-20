import type { PressStrings } from '../strings'

/**
 * Français (fr) : « tu » comme dans l'appli ; les mots de l'appli (src/help/locales/fr.ts : locaux, espions, salon,
 * « Jouer en ligne », Marché noir, interceptions, Intel, statut de membre). No-break spaces before : ; ? ! and inside « ».
 */
const fr: PressStrings = {
  eyebrow: 'Kit presse',
  title: 'Presse',
  lede: "Pour les journalistes et les créateurs\u00A0: ce qu'est SpySocial, les chiffres clés, et des logos et captures d'écran pour tes articles et vidéos.",
  email: "Écrire à l'équipe",
  toAssets: "Logos et captures d'écran",
  about: {
    eyebrow: 'En un paragraphe',
    title: 'À propos de SpySocial',
    short: (day, out) =>
      `SpySocial est un jeu d'ambiance gratuit de bluff et de déduction pour 3 à 21\u00A0joueurs, chacun sur son téléphone ou sa tablette. Tout le monde connaît le secret, sauf les espions. Dans Spy Talk, le secret est un lieu, et les joueurs posent des questions et y répondent à tour de rôle. Dans Spy Sketch, c'est un mot, que les joueurs dessinent à tour de rôle sur un tableau commun pendant que les espions font semblant. Puis la table vote. La version\u00A02.2 ${out ? 'est sortie' : 'sort'} sur iPhone, iPad et Android le ${day}, avec Spy Sketch, les tables de Jouer en ligne, un tutoriel guidé, les soirées jeux, les amis, les échanges et 10\u00A0langues. Il n'y a pas de pub, et la seule chose à vendre est un statut de membre facultatif.`,
    moreTitle: 'La version longue',
    sections: [
      {
        title: 'Deux jeux',
        text: "Dans Spy Talk, le secret est un lieu. Les joueurs posent des questions et y répondent à tour de rôle, en les tapant ou en les dictant au micro. Trop vague, tu passes pour un espion\u00A0; trop évident, les espions découvrent où vous êtes. Dans Spy Sketch, le secret est un mot, dessiné tour à tour sur un tableau commun pendant que les espions dessinent aussi en essayant de ne pas se faire prendre. Les deux se jouent en Classique ou en Mafia, où les espions se connaissent et partagent un chat secret. Les locaux gagnent en éliminant tous les espions par le vote. Les espions gagnent en devinant le secret ou en restant cachés jusqu'à la fin du temps.",
      },
      {
        title: 'Façons de jouer',
        text: "Les salons privés accueillent jusqu'à 21\u00A0personnes, avec leurs propres règles et packs\u00A0; les amis entrent avec un QR code, un lien d'invitation ou le code du salon. Jouer en ligne t'installe à une table de 4 ou 8, où les inconnus se voient en couleurs d'agent, comme Agent Turquoise, et pas par leur nom. La soirée jeux est un événement en ligne programmé, avec des titres qu'on ne gagne que ce soir-là. Les nouveaux joueurs commencent par un tutoriel guidé d'environ trois minutes, puis des parties d'entraînement contre des agents IA, notées de A à F.",
      },
      {
        title: '10\u00A0langues',
        text: "Anglais, espagnol, russe, français, portugais du Brésil, indonésien, hindi, bengali, arabe et chinois simplifié. À une même table, chaque joueur voit le jeu dans sa langue, et le chat est traduit automatiquement.",
      },
      {
        title: 'Gagné en jouant',
        text: "Les joueurs créent un agent façon film noir et gagnent de l'XP, des titres, des cadres et des célébrations en jouant. Les interceptions, des dossiers scellés gagnés en jouant, s'ouvrent chacune sur un objet au hasard, et les chances s'affichent avant l'ouverture. On peut échanger des objets avec ses amis, et les adultes peuvent commercer sur le Marché noir contre de l'Intel, la monnaie du jeu, qu'on gagne uniquement en jouant. L'argent réel n'achète jamais d'objets, d'interceptions ni d'Intel, et rien de tout cela n'a de valeur monétaire. Les objets de collection ne sont ni des NFT, ni des jetons, ni des cryptomonnaies.",
      },
      {
        title: 'Gratuit, avec une seule chose à vendre',
        text: "Il n'y a pas de pub. Spy Talk, Spy Sketch, les soirées jeux, les interceptions, les échanges et le Marché noir sont gratuits. La seule chose à vendre est un statut de membre facultatif\u00A0: l'abonnement mensuel ou annuel, ou l'accès à vie (un seul paiement). Il débloque tous les packs premium pour tout le monde dans les salons dont le membre est l'hôte ou à sa table de Jouer en ligne, et ajoute le créateur de packs, 50\u00A0% d'XP en plus et des tables réservées aux membres. Aucun pack ni lot n'est vendu à l'unité, et les interceptions et l'Intel ne sont jamais vendues.",
      },
    ],
  },
  facts: {
    eyebrow: "En un coup d'œil",
    title: 'Fiche technique',
    labels: {
      name: 'Nom',
      developer: 'Développeur',
      genre: 'Genre',
      platforms: 'Plateformes',
      players: 'Joueurs',
      release: 'Sortie',
      price: 'Prix',
      membership: 'Statut de membre',
      languages: 'Langues',
      age: 'Âge',
      website: 'Site web',
      stores: 'Télécharger',
      community: 'Communauté',
      press: 'Contact presse',
    },
    developer: 'SpySocial LLC, Pennsylvanie, États-Unis',
    genre: "Jeu d'ambiance de déduction sociale",
    platforms: 'iPhone, iPad, et téléphones et tablettes Android. Les joueurs iPhone et Android jouent ensemble.',
    players: 'De 3 à 21 dans un salon privé. Jouer en ligne\u00A0: tables de 4 ou 8.',
    release: (day, out) =>
      out
        ? `La version\u00A02.2 est sortie le ${day}, en mise à jour gratuite sur l'App Store et Google Play.`
        : `La version\u00A02.2 sort le ${day}. SpySocial est déjà sur l'App Store et Google Play, et la\u00A02.2 est une mise à jour gratuite.`,
    price: 'Gratuit à télécharger et à jouer. Sans pub.',
    membership: (month, year, life) =>
      `Facultatif, et la seule chose vendue\u00A0: l'abonnement mensuel à ${month} par mois ou annuel à ${year} par an (renouvelés jusqu'à résiliation), ou l'accès à vie à ${life}, en un seul paiement. Prix américains\u00A0; ils varient selon le pays. Aucun pack ni lot n'est vendu à l'unité.`,
    languages:
      'Anglais, espagnol, russe, français, portugais du Brésil, indonésien, hindi, bengali, arabe, chinois simplifié. Toutes sauf les trois premières sont marquées Bêta dans l’appli.',
    age: '13\u00A0ans et plus',
    press: "<email/>, avec «\u00A0Presse\u00A0» dans l'objet",
  },
  assets: {
    eyebrow: 'Téléchargements',
    title: "Logos et captures d'écran",
    sub: 'Utilise-les dans tes articles et vidéos sur SpySocial.',
    logoInk: 'Logo pour fonds clairs',
    logoCream: 'Logo pour fonds sombres',
    icon: "Icône de l'appli",
    banner: 'Bannière',
    shotsTitle: "Captures d'écran",
    shotsSub: "Celles de la fiche\u00A02.2 sur les stores, avec les légendes dans la langue de cette page. Choisis une autre langue en haut de la page pour en avoir la série.",
    file: (what, format) => `${what}, ${format}`,
  },
  safety: {
    eyebrow: 'Pour les parents et les plateformes',
    title: 'Sécurité',
    points: [
      'SpySocial est réservé aux 13\u00A0ans et plus.',
      "Les joueurs ne discutent qu'à l'intérieur d'un salon ou d'un groupe, avec les personnes qui s'y trouvent. Il n'y a pas de messages privés.",
      "Les filtres du chat bloquent les insultes et les menaces. Dans tout salon avec un joueur de moins de 18\u00A0ans, les liens, adresses e-mail, numéros de téléphone et réseaux sociaux sont bloqués pour tout le monde.",
      'Aux tables de Jouer en ligne, les inconnus voient une couleur d’agent, pas un nom.',
      "On peut signaler n'importe quel joueur, message, dessin ou pack, et bloquer n'importe qui. Une personne lit chaque signalement sous 24\u00A0heures, et ceux qui concernent la protection des enfants ou un joueur de moins de 18\u00A0ans passent en premier.",
    ],
  },
  contact: {
    title: 'Contact presse',
    text: "Interviews, accès pour un test ou questions pour jouer à SpySocial sur ta chaîne\u00A0: écris à <email/> avec «\u00A0Presse\u00A0» dans l'objet.",
  },
}

export default fr
