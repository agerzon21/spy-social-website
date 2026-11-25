/**
 * The site's news (/news, and the Latest strip on the home page). THIS FILE IS THE WHOLE LIST.
 *
 * To add an announcement, add ONE entry to NEWS below (anywhere: the page sorts by date):
 *
 *   {
 *     id: 'beta-3',                      // its address: /news#beta-3 (lowercase letters, digits and dashes; never reuse one)
 *     date: 'November 24, 2026',         // the day it happens, in Eastern Time (or the day it was posted). The page adds the weekday.
 *     endDate: 'December 12, 2026',      // optional: the last day, for something that runs over several days
 *     links: [{ to: '/support', label: { en: 'Help' } }],   // optional, one or two: a page of this site or a full https:// address.
 *                                                            // Check the page really shows what you point at (the Help answer #tester-rewards is hidden until launch).
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
  /** A page of this site ('/roadmap', '/support#browser-play') or a full address ('https://…', opens in a new tab). */
  to: string
  label: { en: string } & Partial<Record<NewsLang, string>>
}

export interface NewsEntry {
  id: string
  /** 'stores': listed only while the site sends people to the stores (STORES_OPEN, src/lib/legalRelease.ts: the launch flip or the early store release). */
  gate?: 'stores'
  date: string
  endDate?: string
  links?: NewsLink[]
  text: { en: NewsText } & Partial<Record<NewsLang, NewsText>>
}

const DISCORD = 'https://discord.gg/B8MG3xrV6f'

export const NEWS: NewsEntry[] = [
  {
    id: 'reset',
    date: 'December 7, 2026',
    links: [
      {
        to: DISCORD,
        label: {
          en: 'Questions? Ask on Discord',
          ru: 'Вопросы? Спросите в Discord',
          es: '¿Dudas? Pregunta en Discord',
          fr: 'Des questions ? Sur Discord',
          'pt-BR': 'Dúvidas? Pergunte no Discord',
          id: 'Ada pertanyaan? Tanya di Discord',
          'zh-Hans': '有问题？到 Discord 提问',
          hi: 'सवाल? Discord पर पूछें',
          ar: 'للأسئلة: Discord',
          bn: 'প্রশ্ন? Discord-এ জিজ্ঞাসা করুন',
        },
      },
    ],
    text: {
      en: {
        title: 'The reset: Monday, December 7, 00:00 Eastern',
        body: 'On Monday, December 7 at 00:00 Eastern, Intercepts and items reset. Intel from games is reset by launch morning, December 8. Game Night Intel you earned comes back. Your account, name, level and store-bought membership stay.',
      },
      ru: {
        title: 'Обнуление: понедельник, 7 декабря, 00:00 по восточному времени',
        body: 'В понедельник, 7 декабря, в 00:00 по восточному времени США перехваты и предметы обнулятся. Разведданные за игры обнулятся к утру запуска, 8 декабря. Заработанные разведданные игрового вечера вернутся. Аккаунт, имя, уровень и купленная в магазине подписка останутся.',
      },
      es: {
        title: 'El reinicio: lunes 7 de diciembre, 00:00 (hora del Este)',
        body: 'El lunes 7 de diciembre a las 00:00 (hora del Este), las intercepciones y los objetos se reinician. El Intel de las partidas se reinicia antes de la mañana del lanzamiento, el 8 de diciembre. El Intel de Noche de Juegos que ganaste vuelve. Tu cuenta, tu nombre, tu nivel y tu membresía comprada en la tienda se mantienen.',
      },
      fr: {
        title: 'La réinitialisation : lundi 7 décembre, 00 h 00 (heure de l’Est)',
        body: 'Le lundi 7 décembre à 00 h 00 (heure de l’Est), les interceptions et les objets sont réinitialisés. L’Intel des parties l’est d’ici le matin du lancement, le 8 décembre. L’Intel de Soirée jeux que tu as gagné te revient. Ton compte, ton nom, ton niveau et ton statut de membre acheté en boutique restent.',
      },
      'pt-BR': {
        title: 'O reset: segunda-feira, 7 de dezembro, 00:00 (horário do Leste)',
        body: 'Na segunda-feira, 7 de dezembro, às 00:00 (horário do Leste), interceptações e itens são zerados. O Intel das partidas é zerado até a manhã do lançamento, 8 de dezembro. O Intel da Noite de Jogos que você ganhou volta. Sua conta, seu nome, seu nível e seu plano de membro comprado na loja continuam.',
      },
      id: {
        title: 'Reset: Senin, 7 Desember, pukul 00.00 (Waktu Timur AS)',
        body: 'Pada Senin, 7 Desember pukul 00.00 (Waktu Timur AS), sadapan dan item direset. Intel dari permainan direset sebelum pagi peluncuran, 8 Desember. Intel Malam Permainan yang kamu dapat akan kembali. Akun, nama, level, dan keanggotaan yang kamu beli di toko tetap ada.',
      },
      'zh-Hans': {
        title: '重置：12 月 7 日（星期一）美东时间 00:00',
        body: '12 月 7 日（星期一）美国东部时间 00:00，密函和物品会重置。对局获得的情报会在上线当天早上（12 月 8 日）前重置。你获得的游戏之夜情报会返还。你的账号、名字、等级和在商店购买的会员保持不变。',
      },
      hi: {
        title: 'रीसेट: सोमवार, 7 दिसंबर, अमेरिकी ईस्टर्न टाइम 00:00',
        body: 'सोमवार, 7 दिसंबर को अमेरिकी ईस्टर्न टाइम 00:00 बजे इंटरसेप्ट और आइटम रीसेट होंगे। गेम से मिला इंटेल लॉन्च की सुबह, 8 दिसंबर तक रीसेट हो जाएगा। आपका कमाया गेम नाइट इंटेल वापस मिलेगा। आपका अकाउंट, नाम, लेवल और स्टोर से खरीदी गई मेंबरशिप बने रहेंगे।',
      },
      ar: {
        title: 'إعادة الضبط: الاثنين 7 ديسمبر، 00:00 بتوقيت شرق الولايات المتحدة',
        body: 'يوم الاثنين 7 ديسمبر الساعة 00:00 بتوقيت شرق الولايات المتحدة، يُعاد ضبط الملفات والعناصر. ويُعاد ضبط إنتل الألعاب بحلول صباح الإطلاق، 8 ديسمبر. ويعود إليك إنتل ليلة الألعاب الذي كسبته. ويبقى حسابك واسمك ومستواك وعضويتك المشتراة من المتجر.',
      },
      bn: {
        title: 'রিসেট: সোমবার, 7 ডিসেম্বর, মার্কিন ইস্টার্ন টাইম 00:00',
        body: 'সোমবার, 7 ডিসেম্বর মার্কিন ইস্টার্ন টাইম 00:00-এ ইন্টারসেপ্ট আর আইটেম রিসেট হবে। গেম থেকে পাওয়া ইন্টেল লঞ্চের সকালে, 8 ডিসেম্বরের মধ্যে রিসেট হবে। আপনার অর্জিত গেম নাইট ইন্টেল ফিরে আসবে। আপনার অ্যাকাউন্ট, নাম, লেভেল আর স্টোর থেকে কেনা সদস্যপদ থাকবে।',
      },
    },
  },
  {
    id: 'in-the-stores',
    gate: 'stores',
    date: 'December 3, 2026',
    links: [
      {
        to: 'https://apps.apple.com/us/app/spysocial-a-party-game/id6746734390',
        label: {
          en: 'App Store',
          ru: 'App Store',
          es: 'App Store',
          fr: 'App Store',
          'pt-BR': 'App Store',
          id: 'App Store',
          'zh-Hans': 'App Store',
          hi: 'App Store',
          ar: 'App Store',
          bn: 'App Store',
        },
      },
      {
        to: 'https://play.google.com/store/apps/details?id=com.gerz.spysocial',
        label: {
          en: 'Google Play',
          ru: 'Google Play',
          es: 'Google Play',
          fr: 'Google Play',
          'pt-BR': 'Google Play',
          id: 'Google Play',
          'zh-Hans': 'Google Play',
          hi: 'Google Play',
          ar: 'Google Play',
          bn: 'Google Play',
        },
      },
    ],
    text: {
      en: {
        title: 'SpySocial is in the App Store and Google Play',
        body: 'SpySocial is now in the App Store and Google Play. Intercepts and items reset Dec 7. Intel from games goes to 0 by launch morning, Dec 8. Game Night Intel you earned comes back. Your account, level and store-bought membership stay. Membership can be bought from launch day. Browser play ends Dec 7 at 00:00 Eastern. Questions? Ask in our Discord.',
      },
      ru: {
        title: 'SpySocial теперь в App Store и Google Play',
        body: 'SpySocial теперь в App Store и Google Play. Перехваты и предметы обнулятся 7 декабря. Разведданные за игры обнулятся к утру запуска, 8 декабря. Заработанные разведданные игрового вечера вернутся. Аккаунт, уровень и купленная в магазине подписка останутся. Подписку можно купить с дня запуска. Игра в браузере заканчивается 7 декабря в 00:00 по восточному времени США. Вопросы? Пишите в наш Discord.',
      },
      es: {
        title: 'SpySocial ya está en el App Store y Google Play',
        body: 'SpySocial ya está en el App Store y en Google Play. Las intercepciones y los objetos se reinician el 7 de diciembre. El Intel de las partidas baja a 0 antes de la mañana del lanzamiento, el 8 de diciembre. El Intel de Noche de Juegos que ganaste vuelve. Tu cuenta, tu nivel y tu membresía comprada en la tienda se mantienen. La membresía se puede comprar desde el día del lanzamiento. El juego en el navegador termina el 7 de diciembre a las 00:00 (hora del Este). ¿Dudas? Pregunta en nuestro Discord.',
      },
      fr: {
        title: 'SpySocial est sur l’App Store et Google Play',
        body: 'SpySocial est désormais sur l’App Store et Google Play. Les interceptions et objets seront réinitialisés le 7 décembre. L’Intel des parties tombera à 0 d’ici le matin du lancement, le 8 décembre. L’Intel de Soirée jeux que tu as gagné te sera rendu. Ton compte, ton niveau et ton statut de membre acheté en boutique restent. Tu peux acheter l’abonnement de membre dès le jour du lancement. Le jeu dans le navigateur prend fin le 7 décembre à 00 h 00 (heure de l’Est). Des questions ? Pose-les sur notre Discord.',
      },
      'pt-BR': {
        title: 'O SpySocial está na App Store e no Google Play',
        body: 'O SpySocial já está na App Store e no Google Play. Interceptações e itens serão zerados em 7 de dezembro. O Intel das partidas vai a 0 até a manhã do lançamento, 8 de dezembro. O Intel da Noite de Jogos que você ganhou volta. Sua conta, seu nível e seu plano de membro comprado na loja continuam. O plano de membro pode ser comprado a partir do dia do lançamento. O jogo no navegador termina em 7 de dezembro, às 00:00 (horário do Leste). Dúvidas? Pergunte no nosso Discord.',
      },
      id: {
        title: 'SpySocial kini ada di App Store dan Google Play',
        body: 'SpySocial kini tersedia di App Store dan Google Play. Sadapan dan item direset pada 7 Desember. Intel dari permainan menjadi 0 sebelum pagi peluncuran, 8 Desember. Intel Malam Permainan yang kamu dapat akan kembali. Akun, level, dan keanggotaan yang kamu beli di toko tetap ada. Keanggotaan bisa dibeli mulai hari peluncuran. Bermain di browser berakhir pada 7 Desember pukul 00.00 (Waktu Timur AS). Ada pertanyaan? Tanyakan di Discord kami.',
      },
      'zh-Hans': {
        title: 'SpySocial 已登陆 App Store 和 Google Play',
        body: 'SpySocial 现已登陆 App Store 和 Google Play。密函和物品将于12 月 7 日重置。对局获得的情报会在上线当天早上（12 月 8 日）前清零。你获得的游戏之夜情报会返还。你的账号、等级和在商店购买的会员保持不变。会员从上线当天起可购买。浏览器游玩将于 12 月 7 日美东时间 00:00 结束。有问题？欢迎到我们的 Discord 提问。',
      },
      hi: {
        title: 'SpySocial अब App Store और Google Play पर है',
        body: 'SpySocial अब App Store और Google Play पर उपलब्ध है। 7 दिसंबर को इंटरसेप्ट और आइटम रीसेट होंगे। गेम से मिला इंटेल लॉन्च की सुबह, 8 दिसंबर तक 0 हो जाएगा। आपका कमाया गेम नाइट इंटेल वापस मिलेगा। आपका अकाउंट, लेवल और स्टोर से खरीदी गई मेंबरशिप बने रहेंगे। मेंबरशिप लॉन्च के दिन से खरीदी जा सकेगी। ब्राउज़र में खेलना 7 दिसंबर को अमेरिकी ईस्टर्न टाइम 00:00 बजे बंद हो जाएगा। सवाल हैं? हमारे Discord पर पूछें।',
      },
      ar: {
        title: 'SpySocial متاح الآن على App Store وGoogle Play',
        body: 'أصبح SpySocial متاحًا الآن على App Store وGoogle Play. يُعاد ضبط الملفات والعناصر في 7 ديسمبر. ويصبح إنتل الألعاب 0 بحلول صباح الإطلاق، 8 ديسمبر. ويعود إليك إنتل ليلة الألعاب الذي كسبته. ويبقى حسابك ومستواك وعضويتك المشتراة من المتجر. يمكن شراء العضوية اعتبارًا من يوم الإطلاق. ينتهي اللعب في المتصفح في 7 ديسمبر الساعة 00:00 بتوقيت شرق الولايات المتحدة. للأسئلة والأفكار: Discord الخاص بنا.',
      },
      bn: {
        title: 'SpySocial এখন App Store ও Google Play-তে',
        body: 'SpySocial এখন App Store ও Google Play-তে পাওয়া যাচ্ছে। 7 ডিসেম্বর ইন্টারসেপ্ট আর আইটেম রিসেট হবে। গেম থেকে পাওয়া ইন্টেল লঞ্চের সকালে, 8 ডিসেম্বরের মধ্যে 0 হবে। আপনার অর্জিত গেম নাইট ইন্টেল ফিরে আসবে। আপনার অ্যাকাউন্ট, লেভেল আর স্টোর থেকে কেনা সদস্যপদ থাকবে। লঞ্চের দিন থেকে সদস্যপদ কেনা যাবে। ব্রাউজারে খেলা 7 ডিসেম্বর মার্কিন ইস্টার্ন টাইম 00:00-এ শেষ হবে। প্রশ্ন আছে? আমাদের Discord-এ জিজ্ঞাসা করুন।',
      },
    },
  },
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
          ar: 'الانضمام عبر Discord',
          bn: 'Discord-এ যোগ দিন',
        },
      },
    ],
    text: {
      en: {
        title: 'Beta 3 is over: thank you',
        body: 'Beta 3 ran on Tuesday, November 24. Thank you to everyone who played, reported bugs and sent ideas. You helped us fix a lot before launch. Questions or ideas? Find us on Discord.',
      },
      ru: {
        title: 'Бета 3 закончилась: спасибо',
        body: 'Бета 3 прошла во вторник, 24 ноября. Спасибо всем, кто играл, сообщал об ошибках и присылал идеи. Вы помогли нам многое исправить до запуска. Вопросы или идеи? Пишите нам в Discord.',
      },
      es: {
        title: 'La Beta 3 terminó: gracias',
        body: 'La Beta 3 fue el martes 24 de noviembre. Gracias a todos los que jugaron, reportaron errores y enviaron ideas. Nos ayudaron a arreglar mucho antes del lanzamiento. ¿Dudas o ideas? Estamos en Discord.',
      },
      fr: {
        title: 'La bêta 3 est terminée : merci',
        body: 'La bêta 3 a eu lieu le mardi 24 novembre. Merci à toutes celles et ceux qui ont joué, signalé des bugs et envoyé des idées. Tu nous as aidés à corriger beaucoup de choses avant la sortie. Des questions ou des idées ? Retrouve-nous sur Discord.',
      },
      'pt-BR': {
        title: 'O Beta 3 acabou: obrigado',
        body: 'O Beta 3 foi na terça-feira, 24 de novembro. Obrigado a todo mundo que jogou, reportou bugs e mandou ideias. Vocês nos ajudaram a corrigir muita coisa antes do lançamento. Dúvidas ou ideias? Fale com a gente no Discord.',
      },
      id: {
        title: 'Beta 3 sudah selesai: terima kasih',
        body: 'Beta 3 berlangsung pada Selasa, 24 November. Terima kasih untuk semua yang bermain, melaporkan bug, dan mengirim ide. Kalian membantu kami memperbaiki banyak hal sebelum peluncuran. Ada pertanyaan atau ide? Temui kami di Discord.',
      },
      'zh-Hans': {
        title: '第 3 轮内测已结束：谢谢大家',
        body: '第 3 轮内测已于 11 月 24 日（星期二）举行。感谢每一位参与游玩、反馈问题和提出想法的人。你们帮我们在上线前修复了很多问题。有问题或想法？欢迎来 Discord 找我们。',
      },
      hi: {
        title: 'बीटा 3 पूरा हुआ: धन्यवाद',
        body: 'बीटा 3 मंगलवार, 24 नवंबर को हुआ। खेलने, बग बताने और आइडिया भेजने वाले सभी का धन्यवाद। आपने लॉन्च से पहले बहुत कुछ ठीक करने में हमारी मदद की। सवाल या आइडिया हैं? हमें Discord पर मिलें।',
      },
      ar: {
        title: 'انتهت بيتا 3: شكرًا للجميع',
        body: 'أُقيمت بيتا 3 يوم الثلاثاء 24 نوفمبر. شكرًا لكل من لعب وأبلغ عن الأخطاء وأرسل أفكاره وساهم في إصلاح الكثير قبل الإطلاق. للأسئلة والأفكار: Discord.',
      },
      bn: {
        title: 'বিটা 3 শেষ: ধন্যবাদ',
        body: 'বিটা 3 হয়েছিল মঙ্গলবার, 24 নভেম্বর। যাঁরা খেলেছেন, বাগ জানিয়েছেন আর আইডিয়া পাঠিয়েছেন, সবাইকে ধন্যবাদ। লঞ্চের আগে অনেক কিছু ঠিক করতে আপনারা আমাদের সাহায্য করেছেন। প্রশ্ন বা আইডিয়া আছে? আমাদের Discord-এ আসুন।',
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
          ar: 'التعرّف على ما في 2.2',
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
        body: 'النسخة الجديدة من SpySocial (الإصدار 2.2) تصل يوم الثلاثاء 8 ديسمبر على iPhone وAndroid: اللعب عبر الإنترنت وSpy Sketch وعميلك الخاص والمزيد.',
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
        body: 'أول ليلة ألعاب بعد الإطلاق تُقام مرتين: يوم الجمعة 11 ديسمبر، من 8 إلى 10 مساءً بتوقيت شرق الولايات المتحدة، ومرة أخرى يوم السبت 12 ديسمبر، من 2 إلى 4 عصرًا بتوقيت شرق الولايات المتحدة. هي ليلة Spy Talk نفسها في اليومين، فيمكن اختيار إحداهما أو اللعب في الاثنتين.',
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
