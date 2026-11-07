/**
 * The words only /hello has (the page the merch QR opens: src/hello/page.ts). Everything else on it is the site's own
 * text in each language, from src/i18n/locales: the poster line, the one-line pitch, the Discord and Beta 2 labels.
 *
 * TRANSLATIONS UNREVIEWED: everything here but English is written by the agent qr-page-1107 (2026-11-07) from the
 * site's own wording and was not read by a native speaker. Russian was checked for tense (future: выйдет) and the
 * site's formal "вы"; each language keeps the site's own "you" (tú, tu, kamu, вы, আপনি, आप, você).
 *
 * `before` + the launch day + `after` make one sentence: the page sets the day huge between them, written by Intl in
 * the language's own format ("December 8", "8 декабря"). This file has no imports the build can't drop (vite.config.ts
 * reads it through esbuild). The English of `privacyText` must keep saying what src/pages/Privacy.tsx says.
 */
export interface HelloStrings {
  before: string
  after: string
  /** The version in the stores today is the old one. */
  stores: string
  /** So wait for this one. */
  wait: string
  /** The reminder form. `day` is the launch day in the language's own format. Plain words: what happened, what to do. */
  remind: {
    button: (day: string) => string
    email: string
    /** The box they must tick. */
    age: string
    /** One short line under the form. */
    note: string
    /** The link after it, to the Privacy Policy's Launch Reminder section. */
    privacy: string
    sending: string
    done: string
    /** No date: the email goes out in waves after the launch hour's watch (checklist RM0-RM5), not at a set moment. */
    doneDetail: (day: string) => string
    badEmail: string
    ageMissing: string
    network: string
    /** The server's cap or a failure on its side (reason 'busy', HTTP 429 or 5xx). */
    busy: string
    /** The server said no for any other reason ('closed', or one this page doesn't know). */
    refused: string
  }
  /** Until the launch, one sentence for pages that had store buttons, and the home page's description. */
  launchLine: (day: string) => string
  /** /join with a room code, until the launch: the one page that keeps a store button, and why it isn't the main way. */
  joinStores: string
  /** The end of this language's meta.description that names the stores, taken off until the launch. */
  storeTail: string
  /** The Privacy Policy's Launch Reminder section in this language, shown above its binding English (src/pages/Privacy.tsx). */
  privacyText: string
}

export const HELLO_STRINGS: Record<string, HelloStrings> = {
  en: {
    before: 'The new SpySocial launches',
    after: '',
    stores: 'The SpySocial on the App Store and Google Play today is the old version.',
    wait: 'Wait for this one.',
    launchLine: (day) => `The new SpySocial launches ${day}.`,
    joinStores: 'The version in the stores today is the old one. It only helps if your friend is playing on it too.',
    storeTail: ' Available on iOS and Google Play.',
    remind: {
      button: (day) => `Remind me on ${day}`,
      email: 'Your email',
      age: "I'm 13 or older",
      note: 'We send one launch email and keep your address only for that.',
      privacy: 'Privacy',
      sending: 'Sending…',
      done: "You're on the list.",
      doneDetail: () => 'One launch email, then your address is deleted.',
      badEmail: "That email address doesn't look right. Check it and try again.",
      ageMissing: "Tick the box to confirm you're 13 or older.",
      network: "We couldn't reach the server. Check your signal and try again.",
      busy: "We're busy right now. Try again in a minute.",
      refused: "We couldn't add that address. Try again later, or write to support@spysocial.app.",
    },
    privacyText: "If you ask us on our website to remind you about the launch, we keep your email address, the language you were reading in and your answer that you're 13 or older, with the time. We use them only to send you one launch email when the new SpySocial is out. We delete the whole list once that email has gone out, at the latest 30 days after the launch. To be removed sooner, or if someone else entered your address, write to support@spysocial.app.",
  },
  es: {
    before: 'El nuevo SpySocial llega el',
    after: '',
    stores: 'El SpySocial que hoy está en la App Store y Google Play es la versión antigua.',
    wait: 'Espera a la nueva.',
    launchLine: (day) => `El nuevo SpySocial llega el ${day}.`,
    joinStores: 'La versión que hoy está en las tiendas es la antigua. Solo te sirve si tu amigo también juega con ella.',
    storeTail: ' Disponible en iOS y Google Play.',
    remind: {
      button: (day) => `Recuérdamelo el ${day}`,
      email: 'Tu correo',
      age: 'Tengo 13 años o más',
      note: 'Enviamos un solo correo de lanzamiento y guardamos tu dirección solo para eso.',
      privacy: 'Privacidad',
      sending: 'Enviando…',
      done: 'Ya estás en la lista.',
      doneDetail: () => 'Un correo de lanzamiento y después borramos tu dirección.',
      badEmail: 'Esa dirección de correo no parece correcta. Revísala e inténtalo de nuevo.',
      ageMissing: 'Marca la casilla para confirmar que tienes 13 años o más.',
      network: 'No pudimos conectar con el servidor. Comprueba tu señal e inténtalo de nuevo.',
      busy: 'Ahora mismo estamos saturados. Inténtalo de nuevo en un minuto.',
      refused: 'No pudimos añadir esa dirección. Inténtalo más tarde o escribe a support@spysocial.app.',
    },
    privacyText: 'Si en nuestra web nos pides que te avisemos del lanzamiento, guardamos tu correo, el idioma en el que leías y tu respuesta de que tienes 13 años o más, con la hora. Los usamos solo para enviarte un correo de lanzamiento cuando salga el nuevo SpySocial. Borramos toda la lista cuando ese correo se ha enviado, como muy tarde 30 días después del lanzamiento. Para que te quitemos antes, o si otra persona escribió tu dirección, escribe a support@spysocial.app.',
  },
  ru: {
    before: 'Новый SpySocial выйдет',
    after: '',
    stores: 'SpySocial, который сейчас в App Store и Google Play, — это старая версия.',
    wait: 'Дождитесь новой.',
    launchLine: (day) => `Новый SpySocial выйдет ${day}.`,
    joinStores: 'В магазинах сейчас старая версия. Она пригодится, только если ваш друг тоже играет в ней.',
    storeTail: ' В App Store и Google Play.',
    remind: {
      button: (day) => `Напомнить ${day}`,
      email: 'Ваш e-mail',
      age: 'Мне уже есть 13 лет',
      note: 'Мы пришлём одно письмо о выходе и храним адрес только для этого.',
      privacy: 'Конфиденциальность',
      sending: 'Отправляем…',
      done: 'Вы в списке.',
      doneDetail: () => 'Одно письмо о выходе, после этого адрес будет удалён.',
      badEmail: 'Этот адрес выглядит неверно. Проверьте его и попробуйте ещё раз.',
      ageMissing: 'Отметьте галочку, чтобы подтвердить, что вам уже есть 13 лет.',
      network: 'Не удалось связаться с сервером. Проверьте связь и попробуйте ещё раз.',
      busy: 'Сейчас мы перегружены. Попробуйте ещё раз через минуту.',
      refused: 'Не удалось добавить этот адрес. Попробуйте позже или напишите на support@spysocial.app.',
    },
    privacyText: 'Если вы просите на нашем сайте напомнить о выходе игры, мы храним ваш адрес электронной почты, язык страницы и ваш ответ о том, что вам уже есть 13 лет, вместе со временем запроса. Мы используем их только для того, чтобы отправить одно письмо о выходе нового SpySocial. Весь список мы удаляем после отправки этого письма, но не позднее чем через 30 дней после выхода. Чтобы удалить адрес раньше или если ваш адрес ввёл кто-то другой, напишите на support@spysocial.app.',
  },
  'zh-Hans': {
    before: '全新 SpySocial 将于',
    after: '上线',
    stores: '目前 App Store 和 Google Play 上的 SpySocial 是旧版本。',
    wait: '请等待新版。',
    launchLine: (day) => `全新 SpySocial 将于${day}上线。`,
    joinStores: '商店里现在是旧版本。只有你的朋友也在用旧版本时才有用。',
    storeTail: 'iOS 和 Google Play 均可下载。',
    remind: {
      button: (day) => `${day}提醒我`,
      email: '你的邮箱',
      age: '我已年满 13 岁',
      note: '我们只发一封上线邮件，你的邮箱只用于此。',
      privacy: '隐私',
      sending: '正在发送…',
      done: '已加入名单。',
      doneDetail: () => '发一封上线邮件，之后删除你的邮箱。',
      badEmail: '这个邮箱地址好像不对，请检查后再试。',
      ageMissing: '请勾选以确认你已年满 13 岁。',
      network: '无法连接服务器，请检查网络后再试。',
      busy: '现在有点忙，请过一分钟再试。',
      refused: '无法添加这个邮箱。请稍后再试，或写信到 support@spysocial.app。',
    },
    privacyText: '如果你在我们的网站上请我们提醒你上线消息，我们会保存你的邮箱、你阅读时使用的语言，以及你确认已年满 13 岁的回答和时间。这些信息只用于在新版 SpySocial 上线时发送一封邮件。邮件发出后我们会删除整个名单，最迟在上线后 30 天内删除。如需提前移除，或有人用你的邮箱填写了表单，请写信到 support@spysocial.app。',
  },
  hi: {
    before: 'नया SpySocial',
    after: 'को आ रहा है',
    stores: 'App Store और Google Play पर अभी मौजूद SpySocial पुराना वर्ज़न है।',
    wait: 'नए वर्ज़न का इंतज़ार करें।',
    launchLine: (day) => `नया SpySocial ${day} को आ रहा है।`,
    joinStores: 'स्टोर में अभी पुराना वर्ज़न है। यह तभी काम आएगा जब आपका दोस्त भी इसी पर खेल रहा हो।',
    storeTail: ' iOS और Google Play पर उपलब्ध।',
    remind: {
      button: (day) => `${day} को याद दिलाएँ`,
      email: 'आपका ईमेल',
      age: 'मेरी उम्र 13 साल या उससे ज़्यादा है',
      note: 'हम लॉन्च का सिर्फ़ एक ईमेल भेजते हैं और आपका पता सिर्फ़ इसी के लिए रखते हैं।',
      privacy: 'गोपनीयता',
      sending: 'भेज रहे हैं…',
      done: 'आप सूची में हैं।',
      doneDetail: () => 'लॉन्च का एक ईमेल, फिर आपका पता हटा दिया जाएगा।',
      badEmail: 'यह ईमेल पता सही नहीं लगता। जाँचकर फिर कोशिश करें।',
      ageMissing: 'पुष्टि के लिए बॉक्स पर टिक करें कि आपकी उम्र 13 साल या उससे ज़्यादा है।',
      network: 'सर्वर से जुड़ नहीं पाए। अपना सिग्नल जाँचकर फिर कोशिश करें।',
      busy: 'अभी बहुत व्यस्तता है। एक मिनट बाद फिर कोशिश करें।',
      refused: 'यह पता नहीं जोड़ पाए। बाद में कोशिश करें या support@spysocial.app पर लिखें।',
    },
    privacyText: 'अगर आप हमारी वेबसाइट पर लॉन्च की याद दिलाने को कहते हैं, तो हम आपका ईमेल पता, जिस भाषा में आप पढ़ रहे थे वह, और 13 साल या उससे ज़्यादा उम्र का आपका जवाब, समय के साथ रखते हैं। हम इनका इस्तेमाल सिर्फ़ नए SpySocial के आने पर एक ईमेल भेजने के लिए करते हैं। वह ईमेल जाने के बाद हम पूरी सूची हटा देते हैं, ज़्यादा से ज़्यादा लॉन्च के 30 दिन बाद तक। पहले हटवाने के लिए, या अगर किसी और ने आपका पता डाला हो, तो support@spysocial.app पर लिखें।',
  },
  ar: {
    before: 'النسخة الجديدة من SpySocial تصل في',
    after: '',
    stores: 'النسخة الموجودة اليوم على App Store وGoogle Play هي النسخة القديمة.',
    wait: 'انتظروا النسخة الجديدة.',
    launchLine: (day) => `النسخة الجديدة من SpySocial تصل في ${day}.`,
    joinStores: 'النسخة الموجودة في المتاجر اليوم هي القديمة. لن تفيدك إلا إذا كان صديقك يلعب عليها أيضًا.',
    storeTail: ' متوفرة على iOS وGoogle Play.',
    remind: {
      button: (day) => `ذكّرني في ${day}`,
      email: 'بريدك الإلكتروني',
      age: 'عمري 13 سنة أو أكثر',
      note: 'نرسل رسالة واحدة عند الإطلاق ونحتفظ بعنوانك لهذا الغرض فقط.',
      privacy: 'الخصوصية',
      sending: 'جارٍ الإرسال…',
      done: 'أنت الآن في القائمة.',
      doneDetail: () => 'رسالة واحدة عند الإطلاق، ثم نحذف عنوانك.',
      badEmail: 'يبدو أن هذا العنوان غير صحيح. تحقق منه وحاول مرة أخرى.',
      ageMissing: 'حدّد المربع لتأكيد أن عمرك 13 سنة أو أكثر.',
      network: 'تعذّر الاتصال بالخادم. تحقق من الإشارة وحاول مرة أخرى.',
      busy: 'لدينا ضغط كبير الآن. حاول مرة أخرى بعد دقيقة.',
      refused: 'تعذّرت إضافة هذا العنوان. حاول لاحقًا أو راسلنا على support@spysocial.app.',
    },
    privacyText: 'إذا طلبت منا عبر موقعنا تذكيرك بالإطلاق، نحتفظ ببريدك الإلكتروني واللغة التي كنت تقرأ بها وإجابتك بأن عمرك 13 سنة أو أكثر، مع الوقت. نستخدمها فقط لنرسل إليك رسالة واحدة عند صدور SpySocial الجديدة. نحذف القائمة كلها بعد إرسال تلك الرسالة، وفي موعد أقصاه 30 يومًا بعد الإطلاق. لإزالة عنوانك قبل ذلك، أو إذا أدخل شخص آخر عنوانك، راسلنا على support@spysocial.app.',
  },
  fr: {
    before: 'Le nouveau SpySocial arrive le',
    after: '',
    stores: 'Le SpySocial de l’App Store et de Google Play est aujourd’hui l’ancienne version.',
    wait: 'Attends le nouveau.',
    launchLine: (day) => `Le nouveau SpySocial arrive le ${day}.`,
    joinStores: 'La version dans les stores aujourd’hui est l’ancienne. Elle ne sert que si ton ami joue aussi dessus.',
    storeTail: ', sur iOS et Google Play',
    remind: {
      button: (day) => `Préviens-moi le ${day}`,
      email: 'Ton e-mail',
      age: 'J’ai 13 ans ou plus',
      note: 'On envoie un seul e-mail de lancement et on ne garde ton adresse que pour ça.',
      privacy: 'Confidentialité',
      sending: 'Envoi…',
      done: 'C’est noté.',
      doneDetail: () => 'Un e-mail de lancement, puis ton adresse est supprimée.',
      badEmail: 'Cette adresse ne semble pas correcte. Vérifie-la et réessaie.',
      ageMissing: 'Coche la case pour confirmer que tu as 13 ans ou plus.',
      network: 'Impossible de joindre le serveur. Vérifie ton réseau et réessaie.',
      busy: 'On est débordés pour l’instant. Réessaie dans une minute.',
      refused: 'Impossible d’ajouter cette adresse. Réessaie plus tard ou écris à support@spysocial.app.',
    },
    privacyText: 'Si tu nous demandes sur notre site de te prévenir du lancement, nous gardons ton adresse e-mail, la langue dans laquelle tu lisais et ta réponse indiquant que tu as 13 ans ou plus, avec l’heure. Nous les utilisons uniquement pour t’envoyer un e-mail de lancement à la sortie du nouveau SpySocial. Nous supprimons toute la liste une fois cet e-mail envoyé, au plus tard 30 jours après le lancement. Pour être retiré plus tôt, ou si quelqu’un d’autre a saisi ton adresse, écris à support@spysocial.app.',
  },
  bn: {
    before: 'নতুন SpySocial আসছে',
    after: '',
    stores: 'App Store আর Google Play-এ এখন যে SpySocial আছে, সেটি পুরোনো ভার্সন।',
    wait: 'নতুনটির জন্য অপেক্ষা করুন।',
    launchLine: (day) => `নতুন SpySocial আসছে ${day}।`,
    joinStores: 'স্টোরে এখন পুরোনো ভার্সন আছে। আপনার বন্ধুও এতে খেললে তবেই এটি কাজে লাগবে।',
    storeTail: ' iOS আর Google Play-তে পাওয়া যাচ্ছে।',
    remind: {
      button: (day) => `${day} মনে করিয়ে দিন`,
      email: 'আপনার ইমেল',
      age: 'আমার বয়স 13 বা তার বেশি',
      note: 'আমরা লঞ্চের একটিই ইমেল পাঠাই, আর আপনার ঠিকানা শুধু এর জন্যই রাখি।',
      privacy: 'গোপনীয়তা',
      sending: 'পাঠানো হচ্ছে…',
      done: 'আপনি তালিকায় আছেন।',
      doneDetail: () => 'লঞ্চের একটি ইমেল, তারপর আপনার ঠিকানা মুছে দেওয়া হবে।',
      badEmail: 'এই ইমেল ঠিকানাটি ঠিক মনে হচ্ছে না। দেখে আবার চেষ্টা করুন।',
      ageMissing: 'আপনার বয়স 13 বা তার বেশি তা নিশ্চিত করতে বাক্সে টিক দিন।',
      network: 'সার্ভারে পৌঁছানো গেল না। সিগন্যাল দেখে আবার চেষ্টা করুন।',
      busy: 'এখন খুব ব্যস্ততা চলছে। এক মিনিট পরে আবার চেষ্টা করুন।',
      refused: 'এই ঠিকানা যোগ করা গেল না। পরে চেষ্টা করুন বা support@spysocial.app-এ লিখুন।',
    },
    privacyText: 'আপনি যদি আমাদের ওয়েবসাইটে লঞ্চের কথা মনে করিয়ে দিতে বলেন, আমরা আপনার ইমেল ঠিকানা, আপনি যে ভাষায় পড়ছিলেন সেটি এবং আপনার বয়স 13 বা তার বেশি এই উত্তরটি, সময়সহ রাখি। নতুন SpySocial এলে একটি ইমেল পাঠাতেই শুধু এগুলো ব্যবহার করি। সেই ইমেল যাওয়ার পর পুরো তালিকা মুছে দিই, দেরি হলেও লঞ্চের 30 দিনের মধ্যে। আগে মুছতে চাইলে, বা অন্য কেউ আপনার ঠিকানা দিলে, support@spysocial.app-এ লিখুন।',
  },
  'pt-BR': {
    before: 'O novo SpySocial chega em',
    after: '',
    stores: 'O SpySocial que está hoje na App Store e no Google Play é a versão antiga.',
    wait: 'Espere pelo novo.',
    launchLine: (day) => `O novo SpySocial chega em ${day}.`,
    joinStores: 'A versão nas lojas hoje é a antiga. Ela só serve se seu amigo também estiver jogando nela.',
    storeTail: ' Para iOS e Google Play.',
    remind: {
      button: (day) => `Me avise em ${day}`,
      email: 'Seu e-mail',
      age: 'Tenho 13 anos ou mais',
      note: 'Enviamos um único e-mail de lançamento e guardamos seu endereço só para isso.',
      privacy: 'Privacidade',
      sending: 'Enviando…',
      done: 'Você está na lista.',
      doneDetail: () => 'Um e-mail de lançamento, depois apagamos seu endereço.',
      badEmail: 'Esse endereço não parece certo. Confira e tente de novo.',
      ageMissing: 'Marque a caixa para confirmar que você tem 13 anos ou mais.',
      network: 'Não conseguimos falar com o servidor. Confira seu sinal e tente de novo.',
      busy: 'Estamos sobrecarregados agora. Tente de novo em um minuto.',
      refused: 'Não conseguimos adicionar esse endereço. Tente mais tarde ou escreva para support@spysocial.app.',
    },
    privacyText: 'Se você pedir no nosso site para ser avisado do lançamento, guardamos seu e-mail, o idioma em que você estava lendo e sua resposta de que tem 13 anos ou mais, com o horário. Usamos isso só para enviar um e-mail de lançamento quando o novo SpySocial sair. Apagamos a lista inteira depois que esse e-mail sai, no máximo 30 dias após o lançamento. Para ser removido antes, ou se outra pessoa informou seu endereço, escreva para support@spysocial.app.',
  },
  id: {
    before: 'SpySocial baru hadir pada',
    after: '',
    stores: 'SpySocial di App Store dan Google Play saat ini adalah versi lama.',
    wait: 'Tunggu yang baru.',
    launchLine: (day) => `SpySocial baru hadir pada ${day}.`,
    joinStores: 'Versi di toko saat ini adalah versi lama. Itu hanya berguna kalau temanmu juga bermain di versi itu.',
    storeTail: ' Di iOS dan Google Play.',
    remind: {
      button: (day) => `Ingatkan aku pada ${day}`,
      email: 'Email kamu',
      age: 'Usiaku 13 tahun atau lebih',
      note: 'Kami hanya mengirim satu email peluncuran dan menyimpan alamatmu hanya untuk itu.',
      privacy: 'Privasi',
      sending: 'Mengirim…',
      done: 'Kamu sudah masuk daftar.',
      doneDetail: () => 'Satu email peluncuran, lalu alamatmu dihapus.',
      badEmail: 'Alamat email itu sepertinya salah. Periksa dan coba lagi.',
      ageMissing: 'Centang kotak untuk memastikan usiamu 13 tahun atau lebih.',
      network: 'Tidak bisa menghubungi server. Periksa sinyal dan coba lagi.',
      busy: 'Sedang sibuk sekarang. Coba lagi semenit lagi.',
      refused: 'Tidak bisa menambahkan alamat itu. Coba lagi nanti atau tulis ke support@spysocial.app.',
    },
    privacyText: 'Kalau kamu meminta kami di situs untuk mengingatkan soal peluncuran, kami menyimpan alamat emailmu, bahasa yang kamu baca, dan jawabanmu bahwa usiamu 13 tahun atau lebih, beserta waktunya. Kami memakainya hanya untuk mengirim satu email saat SpySocial baru keluar. Kami menghapus seluruh daftar setelah email itu terkirim, paling lambat 30 hari setelah peluncuran. Untuk dihapus lebih awal, atau kalau orang lain memasukkan alamatmu, tulis ke support@spysocial.app.',
  },
}
