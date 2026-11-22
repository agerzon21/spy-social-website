/**
 * The site's news (/news, and the Latest strip on the home page). THIS FILE IS THE WHOLE LIST.
 *
 * To add an announcement, add ONE entry to NEWS below (anywhere: the page sorts by date):
 *
 *   {
 *     id: 'beta-3',                      // its address: /news#beta-3 (lowercase letters, digits and dashes; never reuse one)
 *     date: 'November 24, 2026',         // the day it happens, in Eastern Time (or the day it was posted). The page adds the weekday.
 *     endDate: 'December 12, 2026',      // optional: the last day, for something that runs over several days
 *     links: [{ to: '/support', label: { en: 'Help' } }],   // optional, one or two: a page of this site or a full https:// address
 *     text: {
 *       en: { title: 'A short title', body: 'Two or three lines. Times in Eastern Time, with the weekday.' },
 *       ru: { title: '…', body: '…' },   // optional, like every language but English: a language left out shows English
 *     },
 *   },
 *
 * What moves by itself: an entry is under "Coming up" until its day (its endDate, if it has one) is over in Eastern
 * Time, then under "Earlier". The home page shows the next three coming up (or the latest two, when nothing is ahead).
 *
 * Rules for the words: only what is already public and true; no names of testers; no money beyond what the Help
 * center already says; the app's own words for its screens (see src/i18n/locales).
 */

/** The site's ten languages (src/i18n/languages.ts). */
export type NewsLang = 'en' | 'es' | 'ru' | 'zh-Hans' | 'hi' | 'ar' | 'fr' | 'bn' | 'pt-BR' | 'id'

export interface NewsText {
  title: string
  body: string
}

export interface NewsLink {
  /** A page of this site ('/support#tester-rewards') or a full address ('https://…', opens in a new tab). */
  to: string
  label: { en: string } & Partial<Record<NewsLang, string>>
}

export interface NewsEntry {
  id: string
  date: string
  endDate?: string
  links?: NewsLink[]
  text: { en: NewsText } & Partial<Record<NewsLang, NewsText>>
}

const DISCORD = 'https://discord.gg/B8MG3xrV6f'

export const NEWS: NewsEntry[] = [
  {
    id: 'beta-3',
    date: 'November 24, 2026',
    links: [
      {
        to: DISCORD,
        label: {
          en: 'Join on Discord',
          ru: 'Перейти в Discord',
          es: 'Únete en Discord',
          fr: 'Rejoindre le Discord',
          'pt-BR': 'Entrar no Discord',
          id: 'Gabung di Discord',
          'zh-Hans': '加入 Discord',
          hi: 'Discord से जुड़ें',
          ar: 'انضموا عبر Discord',
          bn: 'Discord-এ যোগ দিন',
        },
      },
      {
        to: '/support#tester-rewards',
        label: {
          en: 'Details in Help',
          ru: 'Подробности в «Помощи»',
          es: 'Detalles en la Ayuda',
          fr: 'Détails dans l’Aide',
          'pt-BR': 'Detalhes na Ajuda',
          id: 'Detail di Bantuan',
          'zh-Hans': '在帮助中查看详情',
          hi: 'सहायता में पूरी जानकारी',
          ar: 'التفاصيل في المساعدة',
          bn: 'বিস্তারিত সহায়তায়',
        },
      },
    ],
    text: {
      en: {
        title: 'Beta 3: the final beta, open to everyone',
        body: 'Our last test before launch is on Tuesday, November 24, 8 to 9 PM Eastern (join from 7:30). Anyone can play: join our Discord and sign up by Tuesday noon Eastern. Everyone who plays that night and sends the survey can win the $50 for the most useful report or idea, chosen by us.',
      },
      ru: {
        title: 'Бета 3: финальная бета, открыта для всех',
        body: 'Последний тест перед запуском пройдёт во вторник, 24 ноября, с 20:00 до 21:00 по восточному времени США (заходить можно с 19:30). Играть может каждый: вступайте в наш Discord и запишитесь до полудня вторника по восточному времени. Каждый, кто сыграет в тот вечер и отправит опрос, может получить $50 за самый полезный отчёт или идею — по нашему выбору.',
      },
      es: {
        title: 'Beta 3: la beta final, abierta a todos',
        body: 'Nuestra última prueba antes del lanzamiento es el martes 24 de noviembre, de 8 a 9 p. m., hora del Este de EE. UU. (puedes entrar desde las 7:30). Cualquiera puede jugar: únete a nuestro Discord e inscríbete antes del martes al mediodía, hora del Este. Quien juegue esa noche y envíe la encuesta puede ganar los $50 por el informe o la idea más útil, a nuestra elección.',
      },
      fr: {
        title: 'Bêta 3 : la bêta finale, ouverte à tous',
        body: 'Notre dernier test avant la sortie a lieu le mardi 24 novembre, de 20 h à 21 h, heure de l’Est américain (tu peux entrer dès 19 h 30). Tout le monde peut jouer : rejoins notre Discord et inscris-toi avant mardi midi, heure de l’Est. Toute personne qui joue ce soir-là et envoie le questionnaire peut gagner les 50 $ du retour ou de l’idée la plus utile, selon notre choix.',
      },
      'pt-BR': {
        title: 'Beta 3: o beta final, aberto a todo mundo',
        body: 'Nosso último teste antes do lançamento é na terça-feira, 24 de novembro, das 20h às 21h no horário do leste dos EUA (dá para entrar a partir das 19h30). Qualquer pessoa pode jogar: entre no nosso Discord e inscreva-se até terça ao meio-dia, no horário do leste. Quem jogar nessa noite e enviar a pesquisa pode ganhar os US$ 50 pelo relato ou pela ideia mais útil, escolhidos por nós.',
      },
      id: {
        title: 'Beta 3: beta terakhir, terbuka untuk semua',
        body: 'Tes terakhir kami sebelum peluncuran berlangsung pada Selasa, 24 November, pukul 20.00–21.00 waktu bagian timur AS (bisa masuk mulai 19.30). Siapa pun boleh ikut main: gabung ke Discord kami dan daftar sebelum Selasa pukul 12.00 siang waktu bagian timur AS. Semua yang bermain malam itu dan mengirim survei berpeluang mendapat $50 untuk laporan atau ide paling berguna, pilihan kami.',
      },
      'zh-Hans': {
        title: '第 3 轮内测：最后一轮内测，向所有人开放',
        body: '上线前的最后一次测试将于 11 月 24 日（星期二）美国东部时间晚上 8 点至 9 点进行（7:30 起可进入）。人人都可以参加：加入我们的 Discord，并在美国东部时间星期二中午前报名。当晚参与游戏并提交问卷的玩家，都有机会获得 50 美元，奖励给最有用的反馈或点子，由我们评选。',
      },
      hi: {
        title: 'बीटा 3: आख़िरी बीटा, सबके लिए खुला',
        body: 'लॉन्च से पहले हमारा आख़िरी टेस्ट मंगलवार, 24 नवंबर को है, अमेरिकी ईस्टर्न टाइम के मुताबिक रात 8 से 9 बजे तक (7:30 से जुड़ सकते हैं)। कोई भी खेल सकता है: हमारे Discord से जुड़ें और मंगलवार दोपहर 12 बजे (ईस्टर्न टाइम) तक साइन-अप करें। जो भी उस रात खेलकर सर्वे भेजेगा, वह सबसे काम की रिपोर्ट या आइडिया के लिए $50 जीत सकता है; चुनाव हम करेंगे।',
      },
      ar: {
        title: 'بيتا 3: البيتا الأخيرة، مفتوحة للجميع',
        body: 'آخر اختبار لنا قبل الإطلاق يوم الثلاثاء 24 نوفمبر، من 8 إلى 9 مساءً بتوقيت شرق الولايات المتحدة (يمكن الدخول من 7:30). يمكن لأي شخص أن يلعب: انضموا إلى خادمنا على Discord وسجّلوا قبل ظهر الثلاثاء بتوقيت شرق الولايات المتحدة. كل من يلعب في تلك الليلة ويرسل الاستبيان قد يفوز بمبلغ 50 دولارًا عن أنفع تقرير أو فكرة، والاختيار لنا.',
      },
      bn: {
        title: 'বিটা 3: শেষ বিটা, সবার জন্য খোলা',
        body: 'লঞ্চের আগে আমাদের শেষ টেস্ট মঙ্গলবার, 24 নভেম্বর, মার্কিন ইস্টার্ন টাইম রাত 8টা থেকে 9টা (7:30 থেকে ঢোকা যাবে)। যে কেউ খেলতে পারেন: আমাদের Discord-এ যোগ দিন এবং মঙ্গলবার দুপুর 12টার (ইস্টার্ন টাইম) মধ্যে সাইন-আপ করুন। যাঁরা সেই রাতে খেলে সার্ভে পাঠাবেন, তাঁদের যে কেউ সবচেয়ে কাজের রিপোর্ট বা আইডিয়ার জন্য $50 জিততে পারেন; বাছাই করব আমরা।',
      },
    },
  },
  {
    id: 'launch',
    date: 'December 8, 2026',
    links: [
      {
        to: '/roadmap',
        label: {
          en: 'See what’s in 2.2',
          ru: 'Что нового в версии 2.2',
          es: 'Mira lo que trae la 2.2',
          fr: 'Voir ce qu’apporte la 2.2',
          'pt-BR': 'Veja o que vem na 2.2',
          id: 'Lihat isi versi 2.2',
          'zh-Hans': '看看 2.2 有什么',
          hi: 'देखिए 2.2 में क्या है',
          ar: 'تعرّفوا على ما في 2.2',
          bn: 'দেখুন 2.2-এ কী আছে',
        },
      },
    ],
    text: {
      en: {
        title: 'Launch day: December 8',
        body: 'The new SpySocial (version 2.2) comes out on Tuesday, December 8, on iPhone and Android: Play Online, Spy Sketch, your own agent and more.',
      },
      ru: {
        title: 'Запуск: 8 декабря',
        body: 'Новый SpySocial (версия 2.2) выйдет во вторник, 8 декабря, на iPhone и Android: «Играть онлайн», Spy Sketch, собственный агент и многое другое.',
      },
      es: {
        title: 'Lanzamiento: 8 de diciembre',
        body: 'El nuevo SpySocial (versión 2.2) llega el martes 8 de diciembre a iPhone y Android: Jugar en línea, Spy Sketch, tu propio agente y más.',
      },
      fr: {
        title: 'Sortie : le 8 décembre',
        body: 'Le nouveau SpySocial (version 2.2) arrive le mardi 8 décembre sur iPhone et Android : Jouer en ligne, Spy Sketch, ton propre agent et plus encore.',
      },
      'pt-BR': {
        title: 'Lançamento: 8 de dezembro',
        body: 'O novo SpySocial (versão 2.2) chega na terça-feira, 8 de dezembro, ao iPhone e ao Android: Jogar online, Spy Sketch, seu próprio agente e mais.',
      },
      id: {
        title: 'Hari peluncuran: 8 Desember',
        body: 'SpySocial baru (versi 2.2) hadir pada Selasa, 8 Desember, di iPhone dan Android: Main online, Spy Sketch, agenmu sendiri, dan lainnya.',
      },
      'zh-Hans': {
        title: '上线日：12 月 8 日',
        body: '全新 SpySocial（2.2 版）将于 12 月 8 日（星期二）在 iPhone 和 Android 上线：在线游戏、Spy Sketch、属于你自己的特工，还有更多。',
      },
      hi: {
        title: 'लॉन्च का दिन: 8 दिसंबर',
        body: 'नया SpySocial (वर्ज़न 2.2) मंगलवार, 8 दिसंबर को iPhone और Android पर आ रहा है: ऑनलाइन खेलें, Spy Sketch, आपका अपना एजेंट और भी बहुत कुछ।',
      },
      ar: {
        title: 'يوم الإطلاق: 8 ديسمبر',
        body: 'النسخة الجديدة من SpySocial (الإصدار 2.2) تصل يوم الثلاثاء 8 ديسمبر على iPhone وAndroid: اللعب عبر الإنترنت وSpy Sketch وعميلكم الخاص والمزيد.',
      },
      bn: {
        title: 'লঞ্চের দিন: 8 ডিসেম্বর',
        body: 'নতুন SpySocial (ভার্সন 2.2) আসছে মঙ্গলবার, 8 ডিসেম্বর, iPhone ও Android-এ: অনলাইনে খেলা, Spy Sketch, আপনার নিজের এজেন্ট এবং আরও অনেক কিছু।',
      },
    },
  },
  {
    id: 'opening-night',
    date: 'December 11, 2026',
    endDate: 'December 12, 2026',
    links: [
      {
        to: '/game-night-rules',
        label: {
          en: 'Game Night rules',
          ru: 'Правила игрового вечера',
          es: 'Reglas de la Noche de Juegos',
          fr: 'Règles de la soirée jeux',
          'pt-BR': 'Regras da Noite de Jogos',
          id: 'Aturan Malam Permainan',
          'zh-Hans': '游戏之夜规则',
          hi: 'गेम नाइट के नियम',
          ar: 'قواعد ليلة الألعاب',
          bn: 'গেম নাইটের নিয়ম',
        },
      },
    ],
    text: {
      en: {
        title: 'Opening Night',
        body: 'The first Game Night after launch runs twice: Friday, December 11, 8 to 10 PM Eastern, and again Saturday, December 12, 2 to 4 PM Eastern. It’s the same Spy Talk night both days, so come to either or play both.',
      },
      ru: {
        title: 'Вечер премьеры',
        body: 'Первый игровой вечер после запуска пройдёт дважды: в пятницу, 11 декабря, с 20:00 до 22:00 по восточному времени США, и ещё раз в субботу, 12 декабря, с 14:00 до 16:00 по восточному времени. Оба дня это один и тот же вечер Spy Talk: приходите в любой или на оба.',
      },
      es: {
        title: 'Noche de Estreno',
        body: 'La primera Noche de Juegos tras el lanzamiento se juega dos veces: el viernes 11 de diciembre, de 8 a 10 p. m., hora del Este de EE. UU., y otra vez el sábado 12 de diciembre, de 2 a 4 p. m., hora del Este. Es la misma noche de Spy Talk los dos días: ven a una o a las dos.',
      },
      fr: {
        title: 'Soirée de première',
        body: 'La première soirée jeux après la sortie a lieu deux fois : le vendredi 11 décembre, de 20 h à 22 h, heure de l’Est américain, puis à nouveau le samedi 12 décembre, de 14 h à 16 h, heure de l’Est. C’est la même soirée Spy Talk les deux jours : viens à l’une ou aux deux.',
      },
      'pt-BR': {
        title: 'Noite de Estreia',
        body: 'A primeira Noite de Jogos depois do lançamento acontece duas vezes: na sexta, 11 de dezembro, das 20h às 22h no horário do leste dos EUA, e de novo no sábado, 12 de dezembro, das 14h às 16h no horário do leste. É a mesma noite de Spy Talk nos dois dias: venha a uma ou às duas.',
      },
      id: {
        title: 'Malam Pembukaan',
        body: 'Malam Permainan pertama setelah peluncuran digelar dua kali: Jumat, 11 Desember, pukul 20.00–22.00 waktu bagian timur AS, dan sekali lagi Sabtu, 12 Desember, pukul 14.00–16.00 waktu bagian timur AS. Keduanya malam Spy Talk yang sama, jadi pilih salah satu atau main di keduanya.',
      },
      'zh-Hans': {
        title: '首映之夜',
        body: '上线后的第一场游戏之夜共两场：12 月 11 日（周五）美国东部时间晚上 8 点至 10 点，以及 12 月 12 日（周六）美国东部时间下午 2 点至 4 点。两场是同一场 Spy Talk 之夜，任选一场或两场都来。',
      },
      hi: {
        title: 'ओपनिंग नाइट',
        body: 'लॉन्च के बाद की पहली गेम नाइट दो बार होगी: शुक्रवार, 11 दिसंबर को अमेरिकी ईस्टर्न टाइम के मुताबिक रात 8 से 10 बजे तक, और फिर शनिवार, 12 दिसंबर को दोपहर 2 से 4 बजे तक (ईस्टर्न टाइम)। दोनों दिन वही Spy Talk नाइट है, तो कोई भी एक चुनें या दोनों खेलें।',
      },
      ar: {
        title: 'ليلة الافتتاح',
        body: 'أول ليلة ألعاب بعد الإطلاق تُقام مرتين: يوم الجمعة 11 ديسمبر، من 8 إلى 10 مساءً بتوقيت شرق الولايات المتحدة، ومرة أخرى يوم السبت 12 ديسمبر، من 2 إلى 4 عصرًا بتوقيت شرق الولايات المتحدة. هي ليلة Spy Talk نفسها في اليومين، فاختاروا إحداهما أو العبوا في الاثنتين.',
      },
      bn: {
        title: 'উদ্বোধনী রাত',
        body: 'লঞ্চের পর প্রথম গেম নাইট হবে দুবার: শুক্রবার, 11 ডিসেম্বর, মার্কিন ইস্টার্ন টাইম রাত 8টা থেকে 10টা, আবার শনিবার, 12 ডিসেম্বর, ইস্টার্ন টাইম দুপুর 2টা থেকে বিকেল 4টা। দুই দিনই একই Spy Talk রাত, তাই যেকোনো একটিতে আসুন বা দুটোতেই খেলুন।',
      },
    },
  },
  {
    id: 'beta-2',
    date: 'November 12, 2026',
    text: {
      en: {
        title: 'Beta 2',
        body: 'Our second live playtest ran on Thursday, November 12, 7 to 8 PM Eastern. Thank you to everyone who played and sent us bugs and ideas.',
      },
      ru: {
        title: 'Бета 2',
        body: 'Второй живой плейтест прошёл в четверг, 12 ноября, с 19:00 до 20:00 по восточному времени США. Спасибо всем, кто играл и присылал нам ошибки и идеи.',
      },
      es: {
        title: 'Beta 2',
        body: 'Nuestra segunda prueba de juego en vivo fue el jueves 12 de noviembre, de 7 a 8 p. m., hora del Este de EE. UU. Gracias a todos los que jugaron y nos enviaron errores e ideas.',
      },
      fr: {
        title: 'Bêta 2',
        body: 'Notre deuxième test de jeu en direct a eu lieu le jeudi 12 novembre, de 19 h à 20 h, heure de l’Est américain. Merci à tous ceux qui ont joué et nous ont envoyé des bugs et des idées.',
      },
      'pt-BR': {
        title: 'Beta 2',
        body: 'Nosso segundo teste de jogo ao vivo foi na quinta-feira, 12 de novembro, das 19h às 20h no horário do leste dos EUA. Obrigado a todo mundo que jogou e mandou bugs e ideias.',
      },
      id: {
        title: 'Beta 2',
        body: 'Playtest langsung kedua kami berlangsung pada Kamis, 12 November, pukul 19.00–20.00 waktu bagian timur AS. Terima kasih untuk semua yang bermain dan mengirim laporan bug serta ide.',
      },
      'zh-Hans': {
        title: '第 2 轮内测',
        body: '第二次线上试玩已于 11 月 12 日（星期四）美国东部时间晚上 7 点至 8 点进行。感谢每一位参与并向我们反馈问题和点子的玩家。',
      },
      hi: {
        title: 'बीटा 2',
        body: 'हमारा दूसरा लाइव प्लेटेस्ट गुरुवार, 12 नवंबर को अमेरिकी ईस्टर्न टाइम के मुताबिक शाम 7 से 8 बजे तक हुआ। खेलने और हमें बग व आइडिया भेजने वाले सभी लोगों का शुक्रिया।',
      },
      ar: {
        title: 'بيتا 2',
        body: 'أُقيم اختبار اللعب المباشر الثاني يوم الخميس 12 نوفمبر، من 7 إلى 8 مساءً بتوقيت شرق الولايات المتحدة. شكرًا لكل من لعب وأرسل لنا الأخطاء والأفكار.',
      },
      bn: {
        title: 'বিটা 2',
        body: 'আমাদের দ্বিতীয় লাইভ প্লেটেস্ট হয়েছে বৃহস্পতিবার, 12 নভেম্বর, মার্কিন ইস্টার্ন টাইম সন্ধ্যা 7টা থেকে 8টা। যাঁরা খেলেছেন এবং আমাদের বাগ ও আইডিয়া পাঠিয়েছেন, সবাইকে ধন্যবাদ।',
      },
    },
  },
  {
    id: 'beta-1',
    date: 'October 29, 2026',
    text: {
      en: { title: 'Beta 1', body: 'Our first live playtest ran on Thursday, October 29.' },
      ru: { title: 'Бета 1', body: 'Первый живой плейтест прошёл в четверг, 29 октября.' },
      es: { title: 'Beta 1', body: 'Nuestra primera prueba de juego en vivo fue el jueves 29 de octubre.' },
      fr: { title: 'Bêta 1', body: 'Notre premier test de jeu en direct a eu lieu le jeudi 29 octobre.' },
      'pt-BR': { title: 'Beta 1', body: 'Nosso primeiro teste de jogo ao vivo foi na quinta-feira, 29 de outubro.' },
      id: { title: 'Beta 1', body: 'Playtest langsung pertama kami berlangsung pada Kamis, 29 Oktober.' },
      'zh-Hans': { title: '第 1 轮内测', body: '第一次线上试玩已于 10 月 29 日（星期四）进行。' },
      hi: { title: 'बीटा 1', body: 'हमारा पहला लाइव प्लेटेस्ट गुरुवार, 29 अक्टूबर को हुआ।' },
      ar: { title: 'بيتا 1', body: 'أُقيم اختبار اللعب المباشر الأول يوم الخميس 29 أكتوبر.' },
      bn: { title: 'বিটা 1', body: 'আমাদের প্রথম লাইভ প্লেটেস্ট হয়েছে বৃহস্পতিবার, 29 অক্টোবর।' },
    },
  },
]
