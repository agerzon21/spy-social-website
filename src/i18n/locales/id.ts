import type { Strings } from './en'

/** Indonesian (id): everyday "kamu" like the app, sentence case, app terms (mata-mata, warga, room, host, event, “Main online”). */
const id: Strings = {
  meta: {
    siteName: 'SpySocial',
    defaultTitle: 'SpySocial — Game Pesta Tipu-Tipuan Sosial',
    description:
      'Kumpulkan temanmu dan temukan mata-matanya, atau kelabui semua orang. Game pesta multipemain real-time gratis untuk 3–21 pemain. Di iOS dan Google Play.',
    titles: {
      /** The Beta 2 playtester page (/beta). */
      beta: 'Beta 2: main SpySocial sebelum peluncuran',
      /** The transparency page (/transparency), live with LIVE.transparencyPage. */
      transparency: "Laporan transparansi",
      /** The Game Night rules page (/game-night-rules), live with LIVE.gameNightRules. */
      gameNightRules: "Aturan Malam Permainan",
      faq: 'Bantuan & FAQ',
      contact: 'Hubungi kami',
      rules: 'Aturan komunitas',
      safety: 'Keamanan',
      privacy: 'Kebijakan Privasi',
      terms: 'Ketentuan Layanan',
      childSafety: 'Standar Keselamatan Anak',
      whatsNew: 'Yang baru',
      roadmap: 'Roadmap',
      deleteAccount: 'Hapus akunmu',
      join: 'Gabung ke permainan',
      joinEvent: 'Event publik',
      resetPassword: 'Atur ulang kata sandi',
      /** /reset-password once passwords are gone (LIVE.passwordless; set by the page's own Helmet). */
      resetPasswordCode: "Masuk dengan kode",
      confirmSuccess: 'Email dikonfirmasi',
      notFound: 'Halaman tidak ditemukan',
    },
    descriptions: {
      beta: 'Ikut playtest grup live selama 1 jam untuk SpySocial, game pesta deduksi sosial gratis, pada Kamis, 19 November 2026, pukul 19.00–20.00 waktu Timur AS. Khusus 18+, di iPhone atau Android. Penguji mendapat Pin Beta dan lainnya.',
      transparency: "Setiap bulan: berapa Intel yang didapat, dibelanjakan, dan dikoreksi di SpySocial, setiap insiden, dan setiap perubahan aturan, tanpa menyebut nama pemain.",
      gameNightRules: "Aturan Malam Permainan mingguan SpySocial: kapan diadakan, siapa yang bisa ikut, cara mendapatkan gelar malam itu, dan gelar bonus dari pengembang.",
      faq: 'Jawaban atas pertanyaan umum tentang SpySocial: cara mulai, mode permainan, berbagi dan gabung ke room, bahasa, kontrol host, akunmu, dan cara mengatasi masalah.',
      contact: 'Hubungi tim SpySocial: kirim email ke support@spysocial.app kalau kamu butuh bantuan soal aplikasi, akunmu, atau hal lainnya.',
      rules: 'Aturan komunitas SpySocial: bersikap baik, menggertak boleh tapi curang jangan, jaga privasi, dan apa yang terjadi kalau ada yang melanggar aturan.',
      safety: 'Keamanan di SpySocial untuk pemain usia 13 sampai 17 tahun dan untuk orang tua serta wali: cara keluar, memblokir, dan melapor, serta tempat mencari bantuan.',
      privacy: 'Cara SpySocial mengumpulkan, memakai, dan melindungi data pribadimu, siapa yang menerimanya, berapa lama kami menyimpannya, dan hak privasimu.',
      terms: 'Ketentuan memakai SpySocial: siapa yang boleh bermain, akun dan kontenmu, room publik, aturan komunitas, moderasi, dan banding.',
      childSafety: 'Standar SpySocial melawan pelecehan dan eksploitasi seksual anak: apa yang kami larang, cara melaporkan masalah, apa yang kami lakukan, dan kontak keselamatan anak kami.',
      whatsNew: 'Catatan rilis SpySocial: fitur baru, perbaikan, dan peningkatan di setiap versi aplikasi.',
      roadmap:
        'Yang akan datang di SpySocial: semua isi versi 2.2, dari Main online dan Spy Sketch sampai terjemahan otomatis chat, dan rencana berikutnya: ranked, season, dan turnamen.',
      deleteAccount: 'Cara menghapus akun SpySocial dan datanya, lewat aplikasi atau email, serta apa yang masih disimpan untuk sementara.',
    },
  },

  language: {
    button: (name: string) => `Bahasa: ${name}. Ganti bahasa`,
    menu: 'Bahasa',
  },

  header: {
    home: 'Beranda SpySocial',
    nav: 'Situs',
    join: 'Gabung ke room',
    joinShort: 'Gabung',
    shop: 'Toko',
    toLight: 'Ganti ke mode terang',
    toDark: 'Ganti ke mode gelap',
  },

  footer: {
    /** The link to the transparency page (LIVE.transparencyPage). */
    transparency: "Transparansi",
    /** The link to the Game Night rules, once they're live (LIVE.gameNightRules). */
    gameNightRules: "Aturan Malam Permainan",
    /** The link to the /beta playtest page, shown only until sign-ups close. */
    beta: "Playtest Beta 2",
    tagline: 'Game pesta tipu-tipuan sosial.',
    play: 'Main',
    legal: 'Hukum & keamanan',
    browser: 'Main di browser',
    whatsNew: 'Yang baru',
    roadmap: 'Roadmap',
    rules: 'Aturan',
    support: 'Bantuan',
    contact: 'Kontak',
    shop: 'Toko',
    privacy: 'Privasi',
    terms: 'Ketentuan',
    childSafety: 'Keselamatan anak',
    safety: 'Keamanan',
    deleteAccount: 'Hapus akun',
    rights: (year: number) => `© ${year} SpySocial. Hak cipta dilindungi`,
    follow: 'Ikuti SpySocial',
    on: (network: string) => `SpySocial di ${network}`,
    discordHandle: 'Server SpySocial',
  },

  notice: {
    englishOnly: 'Halaman ini hanya tersedia dalam bahasa Inggris. Versi bahasa Inggris yang berlaku.',
    translated: 'Halaman ini adalah terjemahan. Jika ada perbedaan dengan versi bahasa Inggris, versi bahasa Inggris yang berlaku.',
    readEnglish: 'Baca dalam bahasa Inggris',
    englishSections:
      'Dua bagian di bawah ini adalah bagian dari Kebijakan Privasi kami dan hanya tersedia dalam bahasa Inggris. Versi bahasa Inggris yang berlaku.',
  },

  common: {
    lastUpdated: (date: string) => `Terakhir diperbarui: ${date}`,
    goHome: 'Ke beranda',
    close: 'Tutup',
    openInApp: 'Buka di SpySocial',
    appStore: 'Download di App Store',
    googlePlay: 'Tersedia di Google Play',
    noAppIos: 'Belum punya aplikasinya? Download',
    noAppAndroid: 'Belum punya aplikasinya? Unduh',
    playInBrowser: 'Main di browser',
  },

  badges: {
    appStoreSmall: 'Download di',
    appStoreName: 'App Store',
    appStoreAfter: '',
    appStoreLabel: 'Download di App Store',
    playSmall: 'TEMUKAN DI',
    playName: 'Google Play',
    playAfter: '',
    playLabel: 'Temukan di Google Play',
  },

  home: {
    hero: {
      eyebrow: 'Game pesta tipu-tipuan sosial',
      title: 'Curigai semua',
      titleMark: '.',
      lede: '<b>Temukan mata-matanya, atau kelabui semua orang.</b> Salah satu temanmu adalah mata-mata. Semua yang lain tahu lokasi rahasianya. Ajukan pertanyaan atau gambar petunjuk, lalu voting sebelum si mata-mata tahu kalian ada di mana.',
      facts: ['3–21 pemain', 'Multipemain real-time', 'Gratis dimainkan'],
      browser: 'Main di browser',
      joinCode: 'Gabung dengan kode room',
    },
    creatorShort: {
      eyebrow: 'Sorotan kreator',
      title: (creator: string) => `Tonton ${creator} main Spy Sketch`,
      credit: (creator: string) => `Video oleh <link>${creator}</link>`,
      cta: 'Main gratis di browser',
      play: (creator: string) => `Putar video ${creator}`,
      consent: 'Saat diputar, video dimuat dari YouTube, yang mungkin menyimpan cookie. <link>Kebijakan Privasi</link>',
    },
    lineup: {
      group: 'Barisan lima agen. Ketuk satu untuk menuduhnya.',
      accuse: (n: number) => `Tuduh tersangka ${n}`,
      wasSpy: (n: number) => `Tersangka ${n} adalah mata-mata`,
      isLocal: (n: number) => `Tersangka ${n} adalah warga`,
      stampSpy: 'Mata-mata!',
      stampLocal: 'Warga',
      tap: 'Ketuk tersangka untuk menuduh',
      eggFound: 'Mata elang! Kamu menemukan mata-matanya di percobaan pertama.',
      eggWhere: 'Kode untuk gelar rahasia di aplikasi (Akun > Pengaturan > Masukkan Kode):',
    },
    how: {
      eyebrow: 'Cara mainnya',
      title: 'Bersilat lidah. Atau gambar.',
      sub: 'Dua game, satu aturan: semua orang di meja tahu rahasianya, kecuali si mata-mata.',
      talk: {
        secret: 'Rahasianya sebuah lokasi',
        name: 'Spy Talk',
        text: 'Bergiliran, setiap orang mengajukan dan menjawab satu pertanyaan. Terlalu samar, kamu terlihat seperti mata-mata. Terlalu jelas, si mata-mata jadi tahu kalian ada di mana.',
        alt: 'Spy Talk: setiap pemain mengajukan satu pertanyaan dan pemain lain menjawabnya',
      },
      sketch: {
        secret: 'Rahasianya sebuah kata',
        name: 'Spy Sketch',
        text: 'Bergiliran menggambarnya di satu papan tulis bersama. Si mata-mata ikut menggambar tanpa tahu apa katanya, dan berharap tidak ada yang sadar.',
        alt: 'Spy Sketch: para pemain bergiliran menggambar kata rahasia sementara si mata-mata berpura-pura',
      },
    },
    round: {
      eyebrow: 'Satu ronde',
      title: 'Empat babak',
      steps: [
        {
          title: 'Kartunya',
          text: 'Kamu melihat rahasianya, atau kartu yang hanya bertuliskan Mata-mata.',
          alt: 'Pembagian peran: kartu si mata-mata bertuliskan Mata-mata, jadi dia harus mencari tahu semua orang ada di mana',
        },
        { title: 'Pertanyaan', text: 'Buktikan kamu tahu tanpa membocorkannya.', alt: 'Kartu pertanyaan di tengah ronde' },
        { title: 'Voting', text: 'Mulai voting untuk siapa pun yang terdengar janggal.', alt: 'Voting: semua orang memilih pemain yang mereka curigai sebagai mata-mata' },
        {
          title: 'Taruhan',
          text: 'Mata-mata bisa menebak rahasianya kapan saja. Benar, menang. Salah, gugur.',
          alt: 'Si mata-mata memilih lokasi dari daftar untuk memenangkan ronde',
        },
      ],
      win: 'Warga menang dengan menyingkirkan semua mata-mata lewat voting. Mata-mata menang dengan menebak rahasianya, atau tetap tersembunyi sampai waktu habis.',
    },
    who: {
      eyebrow: 'Main bareng siapa',
      titleOnline: 'Gengmu. Atau orang asing.',
      titleCrew: 'Ajak gengmu.',
      sub: 'Setiap orang main di HP atau tabletnya sendiri, di satu meja atau lewat telepon.',
      privateTitle: 'Room privat',
      privateText: 'Hingga 21 pemain. Teman gabung lewat kode QR, link undangan, atau kode room. Kamu yang memilih mode dan aturannya.',
      howJoin: [
        '<b>Pindai</b> kode QR di layar host',
        '<b>Ketuk</b> link undangan yang dia kirim',
        '<b>Ketik</b> kode room di sini atau di aplikasi',
      ],
      onlineTitle: 'Main online',
      onlineText: '“Cari permainan” mendudukkanmu di meja berisi 4 atau 8 pemain. Orang asing tidak pernah melihat namamu, hanya warna Agen-mu. Ada event terjadwal juga.',
      agentsLabel: 'Warna Agen',
      agents: {
        Teal: 'Agen Toska',
        Coral: 'Agen Koral',
        Rose: 'Agen Magenta',
        Lime: 'Agen Hijau Muda',
        Yellow: 'Agen Kuning',
        Lilac: 'Agen Ungu Muda',
        Blue: 'Agen Biru',
        Mint: 'Agen Mint',
      },
      needsAccount: '“Main online” butuh akun gratis.',
    },
    joinForm: {
      label: 'Kode room',
      button: 'Gabung',
      note: 'Kode di layar host, 4 sampai 8 huruf dan angka.',
    },
    langs: {
      eyebrow: 'Sepuluh bahasa',
      title: 'Satu meja. Bahasamu.',
      sub: 'Setiap pemain melihat game dalam bahasanya sendiri, termasuk rahasianya.',
      listLabel: 'Bahasa',
      chatAlt: 'Terjemahan chat: pesan berbahasa Spanyol di chat lobi tampil dalam bahasa Inggris',
      chatAuto: 'Chat juga: pesan dalam bahasa lain langsung diterjemahkan ke bahasamu begitu masuk.',
      chatTap: 'Chat juga: ketuk Terjemahkan di pesan mana pun untuk membacanya dalam bahasamu.',
      trioLabel: 'Satu kartu peran dalam tiga bahasa',
      cardAlts: [
        'Pembagian peran: kartu warga menampilkan lokasi rahasianya, Teater',
        'Kartu peran dalam bahasa Spanyol: Teatro',
        'Kartu peran dalam bahasa Rusia: Театр',
      ],
    },
    safety: {
      title: 'Untuk usia 13 ke atas',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Laporkan atau blokir pemain mana pun${
          o.messages && o.drawings
            ? ', serta laporkan pesan atau gambar'
            : o.messages
              ? ', serta laporkan pesan'
              : o.drawings
                ? ', serta laporkan gambar'
                : ''
        }. Di room yang ada pemain di bawah 18 tahun, link, alamat email, nomor telepon, dan akun media sosial diblokir untuk semua orang, dan laporan yang melibatkan pemain di bawah 18 tahun dibaca lebih dulu.`,
      rules: 'Aturan komunitas',
      childSafety: 'Keselamatan anak',
      safety: 'Keamanan',
      privacy: 'Privasi',
    },
    shop: {
      eyebrow: 'Toko',
      title: 'Pakai alibimu',
      text: 'Hoodie TRUST NO ONE., kaus I’m Not the Spy, dan lainnya. Dicetak dan dikirim oleh mitra toko kami.',
      cta: 'Kunjungi toko',
      hoodieAlt: 'Sablon belakang hoodie: TRUST NO ONE. dengan kepala mata-mata mengintip dari atas',
      teeAlt: 'Sablon belakang kaus: (I WAS THE SPY 😂)',
    },
    final: {
      title: 'Mejamu menanti',
      text: 'Gratis dimainkan, tanpa iklan.',
      /** Shown once the released app sells memberships (LIVE.purchases). The only things sold are memberships. */
      purchases: 'Keanggotaan opsional kalau kamu mau lebih banyak lokasi dan kata.',
    },
  },

  faq: {
    title: 'Bantuan & FAQ',
    needMore: 'Butuh bantuan lain?',
    sections: {
      start: 'Memulai',
      modes: 'Mode permainan',
      features: 'Fitur dalam permainan',
      sharing: 'Berbagi & gabung ke room',
      languages: 'Dukungan bahasa',
      host: 'Kontrol host',
      account: 'Akun & masuk',
      trouble: 'Mengatasi masalah',
    },
    startGame: {
      q: 'Bagaimana cara memulai permainan?',
      a: [
        'Ketuk <b>Buat room</b> untuk jadi host, atau gabung dengan kode room berisi 4 sampai 8 huruf dan angka',
        'Kamu butuh minimal 3 pemain untuk memulai ronde',
        'Bagikan room ke teman lewat menu berbagi, kode QR, atau link',
      ],
    },
    firstTime: {
      q: 'Baru pertama kali main?',
      a: [
        'Saat pertama dibuka, aplikasi memandumu lewat tutorial singkat',
        'Kamu akan diminta menyiapkan profil (nama tampilan dan avatar opsional)',
        'Setelah itu kamu masuk ke layar beranda, siap jadi host atau gabung',
      ],
    },
    howMany: {
      q: 'Berapa banyak pemain yang bisa ikut?',
      intro: '3 sampai 21 pemain. Jumlah mata-mata yang disarankan:',
      a: ['3–5 pemain: 1 mata-mata', '6–8 pemain: 2 mata-mata', '9+ pemain: 3 mata-mata'],
    },
    gameModes: {
      q: 'Ada mode permainan apa saja?',
      a: ['Dua permainan: <b>Spy Talk</b>, rahasianya sebuah lokasi dan semua bergiliran bertanya dan menjawab, dan <b>Spy Sketch</b>, rahasianya sebuah kata dan semua bergiliran menggambarnya', '<b>Klasik:</b> para mata-mata tidak saling kenal', '<b>Mafia:</b> para mata-mata bisa melihat siapa saja mata-mata lainnya'],
    },
    notebook: {
      q: 'Apa itu Catatan?',
      a: [
        'Ketuk ikon catatan selama ronde untuk mencatat siapa bilang apa',
        'Pemain diurutkan otomatis: pemain aktif yang punya catatan lebih dulu, lalu pemain aktif lainnya, lalu pemain yang gugur paling akhir',
        'Catatan bersifat pribadi — hanya kamu yang bisa melihatnya',
      ],
    },
    hints: {
      q: 'Bagaimana petunjuk bekerja di berbagai bahasa?',
      onePool: 'Petunjuk tampil dalam <b>bahasa aplikasimu sendiri</b>, seperti bagian game lainnya',
      gameLanguage: [
        'Petunjuk selalu tampil dalam <b>bahasa permainan</b> supaya semua orang di meja membaca pertanyaan yang sama',
        'Kalau bahasa tampilanmu berbeda, ketuk petunjuknya untuk melihat terjemahannya',
      ],
      reload: 'Pakai ikon muat ulang khusus untuk mengganti petunjuk — mengetuk kalimatnya tidak akan mengacaknya ulang tanpa sengaja',
    },
    poke: {
      q: 'Apa itu colek?',
      a: 'Ketuk kartu teman di lobi untuk mencoleknya sebentar — berguna untuk menarik perhatian sebelum ronde dimulai.',
    },
    leave: {
      q: 'Bisakah aku keluar di tengah permainan?',
      a: 'Bisa — setiap layar dalam permainan punya tombol Keluar, jadi kamu bisa keluar tanpa harus mundur satu per satu.',
    },
    share: {
      q: 'Bagaimana cara membagikan room ke teman?',
      a: [
        '<b>Menu berbagi:</b> pakai menu berbagi bawaan HP-mu untuk mengirim link ke mana saja',
        '<b>Kode QR:</b> teman di dekatmu bisa memindainya untuk langsung gabung',
        '<b>Lisan:</b> cukup bacakan kode room-nya',
      ],
    },
    link: {
      q: 'Bisakah orang gabung lewat link?',
      a: [
        'Bisa — link seperti <b>spysocial.app/join/<kode></b> langsung membuka aplikasi ke dalam room',
        'Kalau mereka belum punya aplikasinya, link akan membawa mereka ke App Store atau Google Play',
      ],
    },
    languages: {
      q: 'Bagaimana bahasa bekerja?',
      setLanguage: 'Atur bahasa tampilanmu di profil',
      onePool: [
        'Room tidak punya bahasa: setiap pemain melihat game dalam bahasanya sendiri, termasuk lokasi atau kata rahasia, deskripsinya, daftar milik mata-mata, dan petunjuknya',
        'Jadi teman yang berbeda bahasa bisa main di room yang sama, atau di meja “Main online” yang sama',
      ],
      chatAuto:
        'Pesan chat tetap seperti yang ditulis, dan pesan dalam bahasa lain otomatis diterjemahkan ke bahasamu (kalau mau mengetuk <b>Terjemahkan</b> sendiri, matikan <b>Terjemahkan pesan otomatis</b> di Pengaturan)',
      chatTap: 'Pesan chat tetap seperti yang ditulis: ketuk <b>Terjemahkan</b> untuk membacanya dalam bahasamu',
      hostPicks: 'Host memilih bahasa permainan untuk lokasi dan petunjuk',
      parity: 'SpySocial tersedia dalam <b>10 bahasa</b>: Inggris, Spanyol, Rusia, Mandarin Sederhana, Hindi, Arab, Prancis, Bengali, Portugis Brasil, dan Indonesia',
      differs: 'Kalau bahasamu berbeda dari bahasa host, kamu akan melihat terjemahan di bagian yang penting',
    },
    customize: {
      q: 'Apa saja yang bisa diatur host?',
      a: ['Jumlah mata-mata dan mode permainan', 'Aturan voting dan apakah pemanggil voting ditampilkan', 'Paket lokasi yang dipakai'],
      turnOnly: 'Durasi giliran',
      languageAndTurn: 'Bahasa permainan dan durasi giliran',
    },
    endEarly: {
      q: 'Bisakah host mengakhiri permainan lebih awal?',
      a: 'Bisa — host punya kontrol <b>Akhiri permainan</b> untuk menyudahi permainan kapan saja.',
    },
    needAccount: {
      q: 'Apakah aku butuh akun?',
      a: [
        'Kamu bisa main sebagai tamu tanpa mendaftar',
        'Dengan membuat akun, profil dan progresmu tersimpan di semua perangkat',
        'Kamu bisa meningkatkan profil tamu jadi akun lengkap kapan saja tanpa kehilangan apa pun',
      ],
    },
    forgot: {
      q: 'Aku lupa kata sandi',
      a: [
        'Ketuk “Lupa kata sandi” di layar masuk lalu masukkan emailmu',
        'Kamu akan menerima link atur ulang — membukanya akan membawamu ke halaman atur ulang yang aman',
        'Kalau link-nya kedaluwarsa, minta saja yang baru',
      ],
    },
    code: {
      q: 'Kode room tidak berfungsi?',
      a: [
        'Kode room terdiri dari <b>4 sampai 8 huruf dan angka</b>: ketik persis seperti yang tampil di layar host',
        'Pastikan host belum menutup room atau memulai permainan',
        'Periksa koneksi internetmu',
      ],
    },
    connection: {
      q: 'Koneksi terputus?',
      a: [
        'Aplikasi tersambung kembali secara otomatis — tidak perlu memuat ulang',
        'Peran dan progresmu tetap tersimpan selama kamu pergi',
        'Kalau kamu tertahan di layar “menyambungkan ulang” lebih dari beberapa detik, mungkin jaringanmu bermasalah — nyalakan lalu matikan mode pesawat atau ganti Wi-Fi/data seluler',
      ],
    },
    offline: {
      q: 'Aplikasi bilang aku offline padahal tidak?',
      a: 'Ini masalah iOS di versi lama; v2.0.0 memeriksa koneksimu dengan uji jaringan sungguhan sebelum menampilkan status offline. Kalau masih terjadi, tutup paksa lalu buka lagi aplikasinya.',
    },
  },

  rules: {
    title: 'Aturan komunitas',
    intro: (o: { onePool: boolean; photos: boolean }) =>
      `Room publik${o.onePool ? ' (meja “Main online” dan event kami)' : ''} mempertemukanmu dengan orang yang tidak kamu kenal. Aturan ini menjaga permainan tetap seru untuk semua orang. Aturan ini berlaku untuk nama,${o.photos ? ' foto,' : ''} chat, gambar, dan caramu bermain, di room publik maupun privat, dan merupakan bagian dari <link>Ketentuan Layanan</link> kami.`,
    kind: {
      title: '1. Bersikap baik',
      hate: 'Dilarang menyebar kebencian atau melecehkan: tidak boleh ada hinaan yang ditujukan ke pemain, cercaan bernada SARA, atau serangan terhadap identitas siapa pun.',
      sexual: (photos: boolean) => `Dilarang ada konten seksual di chat, nama${photos ? ', foto,' : ''} atau gambar.`,
      threats: 'Dilarang mengancam, dan dilarang apa pun yang mendorong orang menyakiti dirinya sendiri.',
      selfHarm:
        'Dilarang apa pun yang mendorong, mempromosikan, atau memberi petunjuk tentang bunuh diri, melukai diri sendiri, gangguan makan, atau tantangan berbahaya. Ini berlaku untuk semua orang, di setiap room.',
    },
    bluff: {
      title: '2. Menggertak boleh, curang jangan',
      lying: 'Berbohong dan menggertak adalah inti permainan. Itu tidak pernah jadi alasan untuk melaporkan siapa pun.',
      cheating: 'Membocorkan kata atau lokasi, atau bersepakat dengan pemain lain di luar permainan, termasuk curang.',
      leaving: 'Sengaja keluar dari permainan, diam tak aktif, atau mengulur ronde merusak keseruan pemain lain di room.',
      online: (onePool: boolean) =>
        `Di “Main online”, melewatkan awal permainan atau keluar dari permainan yang sudah dimulai membuatmu dijeda sebentar dari ${onePool ? '“Main online”' : 'permainan publik'} (5 menit, lebih lama kalau kamu terus keluar).`,
    },
    privacy: {
      title: '3. Jaga privasi',
      personal: 'Jangan bagikan nama asli, alamat, nomor telepon, atau akun media sosial, baik milikmu maupun milik orang lain.',
      spam: 'Dilarang iklan, spam, atau link di room publik.',
      minors:
        'Di room mana pun yang ada pemain di bawah 18 tahun, link, alamat email, nomor telepon, dan akun media sosial diblokir untuk semua orang. Di meja “Main online” dan event, semuanya selalu diblokir.',
    },
    reports: {
      title: '4. Laporan dibaca oleh manusia',
      text: (o: { messages: boolean; drawings: boolean }) =>
        `Tekan lama pemain untuk melaporkan atau memblokirnya.${
          o.messages ? ' Tekan lama pesan, pertanyaan, atau jawaban untuk melaporkannya: laporan menyertakan pesan itu beserta chat di sekitarnya.' : ''
        }${o.drawings ? ' Kamu juga bisa melaporkan gambar.' : ''} Setiap laporan dibaca oleh manusia dalam 24 jam. Chat publik disimpan selama 14 hari supaya laporan bisa diperiksa; pemain yang kamu laporkan tidak diberi tahu siapa pelapornya.`,
    },
    /** Section 5, once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
    packs: {
      title: '5. Paket buatan sendiri',
      intro: 'Paket yang dibuat anggota juga mengikuti aturan ini: nama, deskripsi, dan setiap isinya.',
      rules: [
        'Tidak ada yang dilarang aturan ini di tempat lain: tanpa kebencian, konten seksual, atau ancaman, dan tanpa apa pun yang tidak pantas untuk pemain 13 tahun ke atas.',
        'Tanpa info pribadi dan tanpa orang sungguhan yang kamu kenal: tanpa teman sekelas, guru, atau tetangga, dan tanpa alamat, nomor telepon, sekolah, atau akun media sosial.',
        'Tanpa iklan, link, atau spam, dan hanya karyamu sendiri.',
      ],
      community:
        'Paket Komunitas: seseorang dari tim kami membaca setiap paket sebelum orang lain bisa melihatnya. Jika sebuah paket melanggar aturan ini, kami bisa menolaknya, mengeluarkannya dari Paket Komunitas, atau melarang akun itu membagikan paket. Pemain mana pun bisa melaporkan Paket Komunitas, dan manusia membaca setiap laporan dalam 24 jam.',
      swearing:
        'Kata kasar: boleh di paket yang kamu mainkan di room privatmu sendiri, tidak pernah di Paket Komunitas, karena pemain di bawah 18 tahun memakainya. Kalau sebuah judul mengandung kata kasar (judul film, misalnya), Paket Komunitas menampilkannya tersensor: huruf pertamanya, lalu tanda bintang (S***). Kata kasar yang berat sama sekali tidak diizinkan di sana.',
    },
    child: {
      title: 'Keselamatan anak',
      text: 'Kami tidak pernah mengizinkan konten seksual yang melibatkan siapa pun di bawah 18 tahun, atau siapa pun yang mencoba melakukan grooming, menyeksualisasi, atau mengeksploitasi anak. Kami menghapusnya, memblokir akun yang terlibat, dan melaporkannya ke National Center for Missing & Exploited Children (NCMEC) sesuai ketentuan hukum. Kalau kamu melihat hal seperti ini, kirim email ke <email/> dengan subjek “Child safety” (keselamatan anak), dan laporkan pemainnya di aplikasi kalau kamu pernah satu room dengannya. Kamu juga bisa melaporkannya langsung ke <link>CyberTipline</link> milik NCMEC (1-800-843-5678). Kalau ada anak dalam bahaya saat ini juga, hubungi dulu nomor darurat setempat. <link2>Standar Keselamatan Anak</link2> kami menjelaskan lebih lanjut.',
      subject: 'Child safety',
    },
    breaking: {
      title: 'Kalau ada yang melanggar aturan',
      text: 'Biasanya peringatan dulu. Masalah yang berulang atau serius bisa berujung pada chat dibisukan (1 jam sampai 7 hari), jeda dari room publik dan event (1 sampai 30 hari), atau pemblokiran akun. Membagikan informasi pribadi orang lain, atau apa pun yang menyeksualisasi anak, bisa langsung berujung pemblokiran akun. Setiap pemberitahuan di aplikasi menyebutkan apa yang dibatasi, alasannya, dan sampai kapan, dengan ID seperti S-207.',
      drawings:
        'Gambar di room publik dan event bisa diperiksa otomatis kapan saja, dan setiap gambar yang dilaporkan pasti diperiksa. Kalau gambar buatanmu melanggar aturan ini, akunmu bisa dijeda atau diblokir dari room publik dan event, tak peduli sudah berapa lama kamu bermain. Di room publik, giliran yang melanggar aturan ini dihapus dari gambar dan dihitung sebagai pelanggaran: pertama peringatan, lalu 3, 7, dan 30 hari tanpa room publik dan event, dan pada pelanggaran kelima dalam 90 hari, untuk selamanya. Di room mana pun, simbol kebencian (termasuk swastika, kecuali kata di ronde itu jelas menunjukkan makna keagamaan), cercaan tertulis, atau kebencian yang ditujukan ke seseorang membuat pemainnya dikeluarkan dari permainan serta dari room publik dan event untuk selamanya, dan gambar yang menyeksualisasi anak mengakhiri akunnya dan ditangani seperti yang dijelaskan di bagian Keselamatan anak di atas. Darah dan monster boleh saja. Di room privat, gambar yang dilaporkan hanya ditindak otomatis kalau seserius itu; selebihnya diputuskan oleh orang yang membaca laporannya. Untuk mengajukan banding, kirimkan kode dari pemberitahuanmu ke email kami.',
      drawingsTesters:
        'Untuk sekarang, pemeriksaan gambar otomatis masih diuji dan hanya berjalan di permainan yang semua pemainnya adalah penguji kami (pemain yang mencoba versi uji aplikasi).',
    },
    age: { title: 'Usia', text: 'SpySocial untuk pemain berusia 13 tahun ke atas.' },
    appeal: {
      title: 'Merasa kami keliru?',
      text: 'Kirim email ke <email/> dan sebutkan ID dari pemberitahuanmu. Lihat juga <link>Ketentuan Layanan</link> dan <link2>Kebijakan Privasi</link2>.',
    },
  },

  safety: {
    title: 'Keamanan di SpySocial',
    intro:
      'SpySocial adalah game pesta untuk pemain berusia 13 tahun ke atas. Halaman ini untuk remaja yang memainkannya, serta orang tua dan pengasuh yang ingin tahu seperti apa game ini. Langsung ke: <link>pemain 13 sampai 17 tahun</link>, <link2>orang tua dan pengasuh</link2>, <link3>kontak keselamatan anak</link3>, <link4>tempat mencari bantuan</link4>.',
    danger: {
      title: 'Ada yang sedang dalam bahaya?',
      text: 'Hubungi nomor darurat setempat: 999 di Inggris, 911 di AS, 112 di Uni Eropa. Setelah itu, laporkan ke kami.',
    },
    teens: {
      title: 'Untuk pemain 13 sampai 17 tahun',
      intro: 'SpySocial seharusnya seru. Kalau ada yang membuatmu tidak nyaman, takut, atau sedih, kamu bisa langsung bertindak, dan kamu tidak akan dapat masalah karenanya.',
      leave: {
        title: 'Keluar',
        text: 'Kamu selalu bisa keluar dari room atau permainan: ketuk <b>Keluar</b>. Keselamatanmu lebih penting dari permainan apa pun.',
        online: (onePool: boolean) =>
          `Di “Main online”, keluar dari permainan yang sudah dimulai membuatmu dijeda sebentar dari ${onePool ? '“Main online”' : 'permainan publik'}. Tetap keluar saja, dan laporkan pemainnya kalau dia penyebabnya.`,
      },
      block: {
        title: 'Blokir',
        text: 'Tekan lama pemainnya lalu ketuk <b>Blokir</b>. Kamu tidak akan melihat chat-nya, dan kalian berdua tidak bisa masuk ke room yang ada salah satu dari kalian. Dia tidak diberi tahu. Kamu bisa membuka blokirnya kapan saja di Pengaturan, bagian Privasi & keamanan: Pemain diblokir.',
      },
      report: {
        title: 'Laporkan',
        text: 'Tekan lama pemainnya, atau sesuatu yang dia tulis di chat, lalu ketuk <b>Laporkan</b>. Pilih apa yang terjadi, tambahkan detail kalau mau, lalu kirim. Kami melampirkan chat-nya untukmu, jadi kamu tidak perlu tangkapan layar.',
      },
      tell: {
        title: 'Ceritakan ke seseorang',
        text: 'Bicaralah dengan orang tua, pengasuh, guru, atau orang dewasa lain yang kamu percaya. Kalau kamu lebih suka bicara dengan orang yang tidak kamu kenal, <link>layanan bantuan di bawah</link> gratis dan rahasia.',
      },
      afterTitle: 'Setelah kamu melapor',
      after: [
        'Manusia, bukan robot, membaca setiap laporan dalam 24 jam. Laporan tentang keselamatan anak, melukai diri sendiri, konten seksual, atau informasi pribadi dibaca lebih dulu, begitu juga laporan yang melibatkan pemain di bawah 18 tahun.',
        'Pemain yang kamu laporkan tidak diberi tahu siapa yang melaporkannya.',
        'Kalau dia melanggar aturan, kami bisa memberinya peringatan, membisukan chat-nya, menjedanya dari room publik, atau memblokir akunnya.',
        'Kami tidak mengirimkan hasilnya kepadamu, tapi setiap laporan dibaca dan ditindaklanjuti.',
        'Menggertak dan berbohong soal peranmu adalah bagian dari permainan, jadi itu bukan hal yang perlu dilaporkan.',
      ],
      neverTitle: 'Tidak pernah boleh kalau seseorang',
      never: [
        'menanyakan umurmu, tempat tinggalmu, atau sekolahmu',
        'meminta foto, nomor teleponmu, atau media sosialmu, atau mengajak ngobrol di aplikasi lain',
        'membicarakan seks, atau mengirim pesan atau gambar bermuatan seksual',
        'menawarimu hadiah atau uang, atau memintamu menyimpan rahasia',
        'menyuruhmu menyakiti diri sendiri, atau merundungmu',
      ],
      neverWhat:
        'Blokir dia, laporkan dia (pilih <b>Keselamatan anak</b> kalau dia meminta foto, mengajak ngobrol soal seks, atau mengajak ketemuan), dan ceritakan ke orang dewasa yang kamu percaya. Simpan sendiri nama asli, alamat, sekolah, nomor telepon, dan media sosialmu, dan jangan pernah membagikan kata sandimu: tidak ada orang dari SpySocial yang akan memintanya.',
    },
    parents: {
      title: 'Untuk orang tua dan pengasuh',
      intro:
        'SpySocial adalah game pesta menggertak dan menebak: satu pemain atau lebih diam-diam menjadi mata-mata, dan semua orang berusaha mencari tahu siapa. Setiap pemain memakai HP-nya sendiri, di ruangan yang sama atau berjauhan. Remaja butuh izin orang tua atau wali untuk bermain (lihat <link>Ketentuan Layanan</link> kami, bagian 2).',
      hasTitle: 'Apa yang ada di SpySocial',
      chat: '<b>Chat teks di dalam room:</b> chat room, chat permainan, chat rahasia untuk para mata-mata kalau dalam satu permainan ada lebih dari satu, dan chat untuk pemain yang sudah gugur. Chat dihapus sekitar 24 jam setelah dikirim di room privat, dan 14 hari setelahnya di room publik.',
      sketch: '<b>Spy Sketch:</b> para pemain bergiliran menggambar dengan jari.',
      names: (o: { avatars: boolean; photos: boolean }) =>
        `<b>Nama dan gambar profil:</b> ${
          o.avatars
            ? o.photos
              ? 'nama tampilan, nama pengguna, dan avatar yang disusun dari bagian-bagian yang disediakan aplikasi. Aplikasi versi sebelum 2.2 masih bisa menambahkan foto profil.'
              : 'nama tampilan, nama pengguna, dan avatar yang disusun dari bagian-bagian yang disediakan aplikasi. Pemain tidak bisa menambahkan foto.'
            : 'nama tampilan, nama pengguna, dan foto profil opsional.'
        }`,
      private: '<b>Room privat:</b> hanya orang yang punya kode, link, atau kode QR room yang bisa gabung, dan host bisa mengeluarkan pemain.',
      publicOnePool:
        '<b>Room publik</b> dengan pemain yang tidak dikenal anak Anda: meja “Main online”, tempat aplikasi mendudukkan pemain secara otomatis dan semua orang bermain dengan aturan standar yang sama, serta event yang kami selenggarakan pada waktu tertentu. Pemain tidak bisa membuat room publik, dan tidak ada pemain yang menjadi host-nya.',
      public: (playOnline: boolean) =>
        `<b>Room publik dan event</b> dengan pemain yang tidak dikenal anak Anda${playOnline ? ', termasuk “Main online”, yang mendudukkan pemain di meja secara otomatis' : ''}.`,
      buy: '<b>Barang yang bisa dibeli:</b> paket dan keanggotaan, lewat App Store atau Google Play.',
      /** `buy` once only memberships are sold (LIVE.membershipsOnly). */
      buyMembers:
        '<b>Barang yang bisa dibeli:</b> hanya keanggotaan (Langganan paket, bulanan atau tahunan, dan Akses seumur hidup), lewat App Store atau Google Play. Keanggotaan membuka paket yang tidak gratis; selain itu tidak ada yang dijual.',
      /** Once Intercepts are live (LIVE.intercepts). Use the app's own word for Intercepts. */
      intercepts:
        '<b>Intercepts:</b> hadiah yang didapat dengan bermain, masing-masing berisi satu item acak, seperti tampilan baru untuk agen. Hadiah ini tidak bisa dibeli, baik dengan uang maupun dengan mata uang yang didapat dari bermain, dan aplikasi menunjukkan peluangnya sebelum dibuka.',
      /** Once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
      customPacks: (community: boolean) =>
        `<b>Paket buatan sendiri:</b> anggota bisa membuat paket lokasi atau kata sendiri untuk room privat mereka.${
          community ? ' Tim kami membaca setiap paket yang dibagikan ke Paket Komunitas sebelum orang lain bisa melihatnya, dan pemain mana pun bisa melaporkannya.' : ''
        }`,
      hasNotTitle: 'Apa yang tidak ada di SpySocial',
      noDms:
        'Tidak ada pesan langsung: pemain hanya bisa chat di dalam room, dengan pemain yang ada di room itu. Chat para mata-mata hanya berlaku selama satu permainan dan difilter, disimpan, serta bisa dilaporkan seperti chat lainnya.',
      noFriends:
        'Tidak ada daftar teman atau pengikut, tidak ada pencarian pemain, tidak ada profil untuk dijelajahi, dan tidak ada bio, jadi tidak ada yang bisa mencari anak Anda atau menghubunginya di luar room.',
      noVoice: (photos: boolean) =>
        `Tidak ada chat suara atau video: tombol mikrofon hanya mengubah ucapan menjadi teks, dan pemain lain tidak pernah mendengar suara siapa pun.${photos ? '' : ' Tidak ada unggahan foto atau video juga.'}`,
      noLocation: 'Tidak ada berbagi lokasi dan tidak ada iklan.',
      safeTitle: 'Cara kami menjaga keamanan',
      age: (o: { gate: boolean; under13Deletion: boolean; storeSignals: boolean }) =>
        `<b>Usia:</b> SpySocial untuk pemain berusia 13 tahun ke atas.${
          o.gate ? ` Sebelum permainan pertama, aplikasi menanyakan tahun lahir${o.under13Deletion ? ', dan jawaban di bawah 13 tahun akan menghapus akunnya' : ''}.` : ''
        }${o.storeSignals ? ' Kalau Apple atau Google memberi tahu aplikasi bahwa penggunanya berusia di bawah 13 tahun, aplikasi tidak mengizinkannya bermain.' : ''} Kami tidak memverifikasi usia, jadi kalau Anda mendapati anak di bawah 13 tahun punya akun, kirimkan email kepada kami dan kami akan menghapusnya.`,
      publicRooms:
        '<b>Room publik</b> membutuhkan akun tersimpan dengan alamat email yang sudah dikonfirmasi, usia 13 tahun ke atas, dan persetujuan terhadap Aturan Komunitas kami. Tamu hanya bisa bermain di room privat, dan pemain yang sedang dijeda atau diblokir tidak bisa masuk ke room publik.',
      filter:
        '<b>Filter chat:</b> nama dan chat diperiksa sebelum dilihat siapa pun. Di room publik, cercaan, kata-kata seksual yang vulgar, dan hinaan diblokir. Di room privat, kata-kata yang paling parah diblokir. Di room mana pun yang ada pemain di bawah 18 tahun, link, alamat email, nomor telepon, dan akun media sosial diblokir untuk semua orang. Di meja “Main online” dan event, semuanya selalu diblokir.',
      reports:
        '<b>Laporan, blokir, dan sanksi:</b> manusia membaca setiap laporan dalam 24 jam, dan pemain yang dilaporkan tidak diberi tahu siapa pelapornya. Laporan yang melibatkan pemain di bawah 18 tahun dibaca lebih dulu. Sanksinya mulai dari peringatan, chat dibisukan, jeda dari room publik, hingga pemblokiran akun. <link>Aturan Komunitas</link> kami mencantumkan apa saja yang tidak diperbolehkan.',
      drawingCheck:
        '<b>Pemeriksaan gambar:</b> setiap giliran menggambar di room publik diperiksa otomatis, dan giliran yang melanggar aturan dihapus dari gambar.',
      buyTitle: 'Pembelian',
      buyText:
        'Remaja butuh izin orang tua atau wali untuk membeli apa pun. Pembelian dilakukan lewat App Store atau Google Play, jadi kontrol orang tua di sana, seperti Ask to Buy dari Apple dan persetujuan pembelian di Google Family Link, tetap berfungsi seperti biasa. Langganan paket diperpanjang otomatis sampai dibatalkan di pengaturan toko aplikasi.',
      deleteTitle: 'Menghapus akun',
      deleteSteps: (o: { avatars: boolean; oldApps: boolean }) => [
        'Buka SpySocial.',
        `Ketuk ${o.avatars ? 'avatar' : 'gambar profil'} di bagian atas layar beranda untuk membuka <b>Akun</b>.${
          o.oldApps ? ' (Di versi sebelum 2.2, Akun adalah ikon di kanan bawah layar beranda.)' : ''
        }`,
        `Ketuk <b>Pengaturan</b> di kanan atas, lalu, di bagian <b>Akun & masuk</b>, ketuk <b>Hapus akun</b> (baris terakhir). Akun tamu dihapus dengan <b>Keluar</b>, di tempat yang sama.${
          o.oldApps ? ' (Di versi sebelum 2.2, Hapus akun ada di Zona bahaya di bagian bawah Akun.)' : ''
        }`,
      ],
      deleteEmail:
        'Atau kirim email ke <email/> dari alamat yang terdaftar di akun, dengan subjek “Delete my SpySocial account”. Kalau Anda tidak bisa mengirim dari alamat itu, tetap kirimkan email kepada kami dengan menyebutkan nama penggunanya dan kami akan membantu. Halaman <link>Hapus akun</link> kami menjelaskan apa yang dihapus dan apa yang kami simpan.',
      deleteSubject: 'Delete my SpySocial account',
      contactTitle: 'Hubungi kami',
      contact: (section: number) =>
        `Kirim email ke <email/> tentang apa pun di halaman ini. Untuk apa pun yang menyangkut keselamatan anak, tulis “Child safety” di subjek dan kami akan menanganinya lebih dulu. Untuk mengajukan banding atas keputusan atau menyampaikan keluhan, termasuk tentang cara kami memenuhi Online Safety Act Inggris, lihat bagian ${section} dari <link>Ketentuan Layanan</link> kami.`,
    },
    contactsTitle: 'Kontak keselamatan anak',
    contactsAfter: '<link>Standar Keselamatan Anak</link> kami menjelaskan apa yang kami larang, cara melaporkannya, dan apa yang kami lakukan.',
    helpTitle: 'Tempat mencari bantuan',
    helpIntro: 'Kalau kamu sedang kesulitan, atau mengkhawatirkan seseorang, layanan ini gratis dan rahasia, dan kamu bisa membicarakan apa saja dengan mereka.',
    tableWho: 'Siapa',
    tableHow: 'Caranya',
    helplines: {
      childline: {
        note: 'Inggris, untuk siapa pun di bawah 19 tahun',
        text: 'Telepon <b>0800 1111</b>, gratis, kapan saja, atau chat dengan konselor secara online di <link>childline.org.uk</link>. Panggilan tidak muncul di tagihan teleponmu.',
      },
      samaritans: { note: 'Inggris dan Irlandia, segala usia', text: 'Telepon <b>116 123</b>, gratis, kapan saja, siang atau malam (<link>samaritans.org</link>).' },
      lifeline: { note: 'AS', text: 'Telepon atau kirim SMS ke <b>988</b>, atau chat di <link>988lifeline.org</link>, gratis, kapan saja.' },
      findHelpline: {
        note: 'Semua negara lain',
        text: '<link>findahelpline.com</link> mencarikan layanan bantuan gratis dan rahasia di lebih dari 175 negara, lewat telepon, SMS, atau chat.',
      },
    },
    contacts: {
      danger: {
        label: 'Ada anak dalam bahaya saat ini juga',
        text: 'Hubungi polisi: <b>999</b> di Inggris, <b>911</b> di AS, <b>112</b> di Uni Eropa, atau nomor darurat setempat. Lakukan ini dulu, sebelum hal lain di halaman ini.',
      },
      ncmec: {
        note: 'Eksploitasi seksual anak, dari negara mana pun',
        text: 'Laporkan secara online di <link>report.cybertip.org</link>, atau telepon 1-800-843-5678 (1-800-THE-LOST), kapan saja. Dikelola oleh National Center for Missing & Exploited Children.',
      },
      ceop: {
        note: 'Di Inggris',
        text: 'Kalau kamu khawatir tentang pelecehan seksual online, atau tentang cara seseorang berbicara dengan anak secara online, laporkan ke CEOP, bagian dari National Crime Agency: <link>ceop.police.uk/Safety-Centre</link>. Anak muda juga bisa melapor, dan setiap laporan dibaca oleh Child Protection Advisor.',
      },
      spysocial: {
        text: 'Laporkan pemainnya di aplikasi dan pilih <b>Keselamatan anak</b>, lalu kirim email ke <email/> dengan subjek “Child safety”. Kami menghapus kontennya, memblokir akun yang terlibat, dan melaporkannya ke NCMEC dan otoritas lain sesuai ketentuan hukum.',
      },
    },
    seeAlso: 'Lihat juga <link>Aturan Komunitas</link>, <link2>Ketentuan Layanan</link2>, dan <link3>Kebijakan Privasi</link3> kami.',
  },

  support: {
    title: 'Ada yang bisa kami bantu?',
    sub: 'Kami siap membantu soal pertanyaan atau masalah apa pun yang kamu alami dengan SpySocial.',
    emailUs: 'Kirim email',
    respond: 'Biasanya kami membalas dalam 24 jam',
    copy: (email: string) => `Salin ${email}`,
    copied: 'Email disalin!',
    copyFailed: 'Gagal menyalin',
    quickLinks: 'Link cepat',
    faqLink: 'FAQ & mengatasi masalah',
    rate: 'Beri kami rating di App Store',
    ratePlay: 'Beri kami rating di Google Play',
  },

  whatsNew: {
    title: 'Yang baru',
    sub: 'Catatan rilis SpySocial. Pembaruan besar, fitur baru, dan perbaikan, langsung saat kami merilisnya.',
    releases: [
      {
        tag: 'Rilis Android',
        summary:
          'SpySocial resmi hadir di Google Play Store — rilis produksi publik pertama di Android, dilengkapi poles pra-rilis dari QA uji tertutup di perangkat Android sungguhan.',
        sections: [
          {
            label: 'Sudah tersedia',
            items: [
              { title: 'Android 2.1.1', text: 'Tersedia di Google Play sejak 13 Juni 2026.' },
              { title: 'iOS 2.1.1', text: 'Perbaikan yang sama, sekarang sudah tersedia di App Store.' },
            ],
          },
          {
            label: 'Poles pra-rilis',
            items: [
              { title: 'Tombol Hapus akun tidak lagi terpotong', text: 'Isi layar Akun sekarang mengikuti inset bawah safe area perangkat dan menyisakan ruang untuk snackbar perubahan yang belum disimpan — Google Play mewajibkan penghapusan akun di dalam aplikasi bisa dijangkau.' },
              { title: 'Tombol Keluar dari room / Mulai permainan di lobi', text: 'Sekarang berada di atas bilah navigasi gestur Android lewat inset safe area dinamis.' },
              { title: 'Umpan balik Mulai permainan', text: 'Sekarang menunjukkan apa yang kurang (butuh 3+ pemain, semua siap, minimal satu kategori) saat syaratnya belum terpenuhi. Sebelumnya tombol langsung dinonaktifkan tanpa keterangan.' },
              { title: 'Layar Kategori', text: 'Kontrol kembali dan judul “Kategori & lokasi” tidak lagi berdesakan. Tombol kembali hanya berupa ikon di Android (konvensi Material); ukuran font judul dikecilkan.' },
              { title: 'Modal Cara bermain', text: 'Tombol kembali ganda di Android dihapus (tombol X penutup modal dan tombol kembali bawaan stack sama-sama tampil).' },
              { title: 'Tutorial pengenalan', text: 'Lewati sekarang bisa dijangkau di setiap langkah, bukan hanya di slide pertama.' },
              { title: 'Banner daftar untuk tamu', text: 'Diubah menjadi ajakan (“Buka akun lengkapmu”) dengan ikon kilauan dan tombol CTA yang jelas — sebelumnya tampil seperti peringatan sistem, yang terasa mengecilkan hati.' },
              { title: 'Layar hasil permainan & Cara bermain', text: 'Emoji diganti dengan glyph Ionicons / FontAwesome. Emoji tampil tidak konsisten di berbagai vendor Android; ikon vektor tetap konsisten.' },
            ],
          },
          {
            label: 'Infrastruktur',
            items: [
              { title: '', text: 'expo-updates kini terpasang dan dikonfigurasi untuk proyek EAS. Perbaikan JS saja ke depannya bisa dikirim lewat pembaruan over-the-air tanpa melalui peninjauan Play Store / App Store.' },
            ],
          },
        ],
      },
      {
        tag: 'Pembaruan poles',
        summary:
          'Rilis poles: layar Selamat datang yang didesain ulang, layar Permainan selesai dan Akun yang diperbarui, tata letak iPad yang lebih baik, serta setumpuk perbaikan stabilitas dan kualitas di balik layar.',
        sections: [
          {
            label: 'Fitur baru',
            items: [
              { title: 'Desain ulang layar Selamat datang', text: 'Permukaan berlapis baru dengan gradien biru langit lembut dan detail latar bertema mata-mata yang samar (cincin radar, bidikan), pil eyebrow oranye “SOCIAL DEDUCTION”, tagline di bawah logo, tombol Masuk / Daftar berikon, pemisah ATAU, dan link ringan “Lanjut sebagai tamu”. Lencana versi kini berupa pil halus di bagian bawah layar.' },
              { title: 'Alur “menunggu konfirmasi” di Akun', text: 'Saat tamu meningkatkan akunnya jadi akun lengkap, layar Akun kini menampilkan status menunggu yang jelas dengan aksi Kirim ulang / Batal / Muat ulang, jadi mereka tahu persis posisinya dalam proses konfirmasi email.' },
            ],
          },
          {
            label: 'Tampilan baru',
            items: [
              { title: 'Desain ulang layar Permainan selesai', text: 'Kartu pemain satu permukaan dengan gradien lembut dan aksen warna di tepi kiri, piala utama dengan lingkaran cahaya, bagian tim pemenang beraksen emas, kartu lokasi dengan ikon pin peta, dan tombol bawah “Kembali ke lobi” bergradien biru langit.' },
              { title: 'Desain ulang layar Akun', text: 'Satu daftar yang padu, judul bagian berhuruf kapital yang konsisten di setiap grup (Profil, Preferensi, Akun & keamanan, Dukungan & hukum, Zona bahaya), baris menu bergaya Pengaturan iOS untuk Dukungan / Hukum, Zona bahaya dipindah ke bawah.' },
              { title: 'Poles UI iPad', text: 'Kartu pemain di lobi dalam 6 kolom (sebelumnya 3), kartu pembagian peran dibatasi 420pt, petak pemain dalam permainan lebih besar (140×178) dengan wadah lebih tinggi agar baris ketiga tidak terpotong, kolom catatan menyesuaikan ukuran kartu peran, baris dek beranda/main diatur untuk iPad dengan tipografi HomeCard yang lebih besar.' },
            ],
          },
          {
            label: 'Perbaikan khusus Android',
            items: [
              { title: 'Pengaman gestur kembali', text: 'Usapan kembali sistem Android 10+ (dan tombol kembali fisik) kini melewati dialog konfirmasi Keluar yang sama seperti saat mengetuk tombol Keluar di header. Sebelumnya, pengguna Android bisa mengusap keluar dari layar dalam permainan atau lobi tanpa konfirmasi sama sekali; gestureEnabled: false hanya menghentikan gestur usap iOS. Diterapkan lewat hook bersama useBackPressGuard yang menggabungkan navigation.addListener(\'beforeRemove\') dengan BackHandler.hardwareBackPress.' },
              { title: 'Artefak tampilan “kotak dalam kotak”', text: 'Compositor Android menampilkan tepi dalam yang terlihat di setiap kartu voting / hasil voting / permainan selesai. Penyebab utamanya: latar rgba transparan + border hairline transparan + borderRadius + overflow:hidden — tepi lapisan klip bulat ikut terlihat menembus border semi-transparan. Diperbaiki di VotePlayerRow, VoteResultRankCard, VoteOutcomeCard, dan kartu pemain di layar permainan selesai.' },
              { title: 'Celah header Permainan selesai', text: 'SafeAreaView layar ini menghitung inset atas dua kali di atas header Stack, sehingga ada strip gradien GameBackground yang terlihat antara header dan titik konten scroll mulai terpotong. Kini dibatasi ke [\'bottom\',\'left\',\'right\'], sama seperti layar voting / vote_results.' },
              { title: 'WheelPicker', text: 'Pengganti murni JS untuk @react-native-picker/picker. Picker native diam-diam mengabaikan itemStyle di Android (sehingga teks putih kami tampil hitam di atas latar gelap dan tak terbaca) dan sudah lama mengalami crash NullPointerException saat ditutup — keduanya bug di library upstream. Penggantinya menampilkan UX yang identik di kedua platform lewat ScrollView + snap-to-interval.' },
            ],
          },
          {
            label: 'Peningkatan',
            items: [
              { title: 'Jam yang disinkronkan dengan server', text: 'Setiap perhitungan “detik tersisa” kini dikurangi selisih terukur terhadap jam server (lewat fungsi Postgres baru server_now()) alih-alih memercayai jam perangkat. Memperbaiki nilai hitung mundur yang sesekali kacau di perangkat dengan sinkronisasi waktu yang kurang tepat.' },
              { title: 'Alur autentikasi disatukan', text: 'Pendaftaran, kirim ulang konfirmasi, atur ulang kata sandi, dan ganti email kini semuanya dikirim lewat satu Edge Function dengan wrapper klien bersama, menghilangkan risiko perbedaan di empat titik panggilan UI. Migrasi baru menambahkan kunci idempotensi ke pendaftaran, memperluas auth_attempts untuk jenis alur tambahan, dan menambahkan RPC pembatalan ganti email.' },
              { title: 'Akun: cadangan mailto', text: 'Baris email Dukungan / Hukum kini menyalin alamatnya ke papan klip dengan peringatan yang ramah saat tidak ada aplikasi email yang dikonfigurasi, alih-alih memunculkan error yang tidak tertangani.' },
              { title: '', text: 'Kesetaraan terjemahan bahasa Inggris, Spanyol, dan Rusia tetap terjaga untuk semua kunci baru (eyebrow / tagline selamat datang, teks menunggu peningkatan akun, dll).' },
            ],
          },
          {
            label: 'Teknis',
            items: [
              { title: '', text: 'tsconfig.json kini mengecualikan supabase/functions/** — itu file Edge Function Deno dengan target resolusi modul yang berbeda.' },
              { title: '', text: 'Versi dinaikkan ke 2.1.0; nomor build iOS dinaikkan untuk pengajuan ke App Store.' },
            ],
          },
        ],
      },
      {
        tag: 'Pembaruan besar',
        summary:
          'Pembangunan ulang total pengalaman multipemain: setiap layar didesain ulang, mesin realtime ditulis ulang demi stabilitas, dan setumpuk fitur baru hadir bersamaan.',
        sections: [
          {
            label: 'Fitur baru',
            items: [
              { title: 'Tutorial & penyiapan profil', text: 'Pemain baru dipandu mengenal permainan dan diminta menyiapkan profil.' },
              { title: 'Catatan dalam permainan', text: 'Catat siapa bilang apa selama ronde. Pemain diurutkan otomatis: pemain aktif yang punya catatan lebih dulu, lalu pemain aktif lainnya, lalu pemain yang gugur paling akhir.' },
              { title: 'Terjemahan petunjuk', text: 'Saat bahasa UI-mu berbeda dari bahasa permainan, ketuk petunjuk untuk melihat pertanyaan yang sama dalam bahasamu. Petunjuk tetap dalam bahasa permainan supaya setiap pemain di meja membaca pertanyaan yang sama.' },
              { title: 'Colek pemain', text: 'Ketuk kartu teman di lobi untuk mencoleknya.' },
              { title: 'Berbagi lewat kode QR', text: 'Bagikan room lewat menu berbagi bawaan dengan kode QR yang bisa dipindai.' },
              { title: 'Universal link', text: 'spysocial.app/join/<kode> membuka aplikasi dan langsung membawamu ke dalam room (termasuk saat aplikasi belum berjalan).' },
              { title: 'Kode room 5 karakter', text: 'Kode lebih pendek yang lebih mudah dibagikan secara lisan. Kode lama 6 karakter masih bisa dipakai.' },
              { title: 'Tampilkan pemanggil voting', text: 'Pengaturan lobi untuk menampilkan siapa yang memulai voting, kalau mau.' },
              { title: 'Host mengakhiri permainan', text: 'Host kini bisa mengakhiri permainan lebih awal.' },
              { title: 'Paket lokasi Extra 1', text: 'Sekumpulan lokasi baru untuk dimainkan.' },
              { title: 'Tombol Keluar dalam permainan', text: 'Keluar cepat dari permainan yang sedang berjalan tanpa harus mundur satu per satu.' },
            ],
          },
          {
            label: 'Tampilan baru',
            items: [
              { title: '', text: 'UI lobi dimodernisasi total dengan kartu pemain interaktif.' },
              { title: '', text: 'Layar pengaturan lobi didesain ulang (dengan PickerModal yang bisa dipakai ulang di baliknya).' },
              { title: '', text: 'Layar permainan didesain ulang.' },
              { title: '', text: 'Layar voting didesain ulang dengan tampilan pemanggil voting dan UI progres.' },
              { title: '', text: 'Layar hasil voting didesain ulang, dengan UX hasil / tersingkir yang distandarkan.' },
              { title: '', text: 'Fase pembagian peran dipoles — menampilkan nama pemain yang sedang ditunggu, diperpanjang jadi 60 detik.' },
              { title: '', text: 'Kartu beranda kini menyesuaikan teks otomatis; tombol muat ulang dirampingkan.' },
              { title: '', text: 'Semua layar dalam permainan kini memakai header biru tua yang sama (Solve dan Solve Results tidak lagi memakai varian putih/transparan).' },
              { title: '', text: 'Banner offline distandarkan di setiap layar — tinggi konsisten, mengikuti safe area, tidak lagi menabrak Dynamic Island.' },
              { title: '', text: 'Layar Akun punya tampilan kosong saat offline yang rapi dengan ikon awan offline.' },
            ],
          },
          {
            label: 'Peningkatan',
            items: [
              { title: 'Perombakan ketahanan jaringan', text: 'Memperbaiki masalah lama di iOS ketika NetInfo bisa salah melapor (“offline”) setelah lama tertidur di latar belakang, membuat layar tertahan di status menyambungkan ulang padahal jaringannya baik-baik saja. Hook bersama useNetwork kini memverifikasi setiap klaim “offline” dengan uji HTTP sungguhan ke Supabase; semua layar dalam dan sebelum permainan memakai hook yang sama ini.' },
              { title: '', text: 'Layar Main kini memercayai hasil fetch yang sebenarnya alih-alih status NetInfo yang basi, mencoba lagi otomatis setiap 5 detik saat offline, menjalankan fetch bersamaan secara berurutan, dan tidak pernah keliru menampilkan tampilan cadangan “belum masuk” saat pengguna hanya sedang offline.' },
              { title: '', text: 'Stabilitas sinkronisasi realtime diperkuat di setiap fase (lobi, pembagian peran, permainan, voting, hasil).' },
              { title: '', text: 'Timer permainan kini disinkronkan dengan server — selisih jam diperbaiki.' },
              { title: '', text: 'Penanganan offline dan logika penyambungan ulang yang lebih kuat.' },
              { title: '', text: 'Alur autentikasi & masuk diperketat: pengamanan pendaftaran, alur atur ulang kata sandi, dan alur peningkatan akun tamu.' },
              { title: '', text: 'Poles layar Akun dengan sistem pesan snackbar yang didesain ulang.' },
              { title: '', text: 'Kesetaraan terjemahan penuh untuk bahasa Inggris, Spanyol, dan Rusia (171 saran petunjuk per bahasa, diindeks berdasarkan posisi tetap supaya fitur terjemahan ke depannya langsung berfungsi).' },
              { title: '', text: 'UX Catatan: keyboard tidak lagi muncul otomatis saat memilih pemain; ukuran sheet menyesuaikan dengan tepat.' },
              { title: '', text: 'Laci petunjuk: mengetuk kalimat petunjuk tidak lagi mengacaknya ulang tanpa sengaja — ikon muat ulang khusus adalah satu-satunya cara menggantinya.' },
              { title: '', text: 'Kompatibilitas iOS 26 — kapsul Liquid Glass di item bilah header dinonaktifkan.' },
              { title: '', text: 'Header disatukan ke dalam hook bersama useGameScreenHeader agar konsisten di semua layar.' },
              { title: '', text: 'Log produksi dihapus dari build rilis.' },
            ],
          },
          {
            label: 'Perbaikan bug',
            items: [
              { title: '', text: 'Memperbaiki race condition voting / akhir permainan.' },
              { title: '', text: 'Memperbaiki kasus tepi hitungan ganda dan akhir timer pada voting.' },
              { title: '', text: 'Memperbaiki penanganan hitungan Plurality vs. abstain; tombol abstain kini disematkan di dok aksi.' },
              { title: '', text: 'Memperbaiki header hasil solve yang bertumpuk (isi layar menabrak header transparan).' },
              { title: '', text: 'Memperbaiki status awal animasi yang bocor terlihat di layar permainan.' },
              { title: '', text: 'Memperbaiki peringatan render-write Reanimated di layar voting.' },
              { title: '', text: 'Memperbaiki alur peningkatan akun tamu yang tanpa sengaja mengeluarkan tamu dari akunnya.' },
              { title: '', text: 'Memperbaiki kolom email di Akun.' },
              { title: '', text: 'Memperbaiki teks kartu beranda yang terpotong dan pemangkasan header berbahasa Spanyol.' },
            ],
          },
          {
            label: 'Teknis',
            items: [
              { title: '', text: 'Manajemen state dimigrasikan ke hook useRoom dan useGame.' },
              { title: '', text: 'Routing diratakan — grup rute (tabs) dihapus dan diganti rute datar.' },
              { title: '', text: 'react-native-screens dikunci di ~4.18 demi kompatibilitas dengan expo-router 6.0.23.' },
              { title: '', text: 'Perbaikan publikasi realtime di sisi Supabase.' },
              { title: '', text: 'Saran pertanyaan disusun ulang menjadi tripel terjemahan paralel ({ en, es, ru }) — satu sumber kebenaran.' },
              { title: '', text: 'Kolom skema Expo yang sudah usang (privacy, privacyPolicyUrl, termsOfServiceUrl) dihapus; URL privasi/ketentuan dikelola oleh App Store Connect.' },
            ],
          },
        ],
      },
      {
        tag: 'Rilis perdana',
        summary: 'Rilis publik pertama SpySocial di App Store.',
        sections: [],
      },
    ],
  },

  roadmap: {
    eyebrow: 'Roadmap',
    title: 'Yang akan datang',
    lede: (day: string) => `SpySocial\u00A02.2 hadir pada ${day}. Lihat apa saja isinya dan apa yang kami siapkan berikutnya.`,
    ledeOut: 'SpySocial\u00A02.2 sudah hadir. Lihat apa saja isinya dan apa yang kami siapkan berikutnya.',
    now: {
      coming: (day: string) => `Hadir ${day}`,
      out: 'Sudah tersedia',
      title: 'SpySocial 2.2',
      sub: 'Update terbesar kami sejauh ini.',
      features: [
        {
          title: 'Main online',
          text: 'Ketuk “Cari permainan” untuk meja berisi 4 atau 8 pemain, dengan aturan standar yang sama untuk semua. Kalau mata-mata tertangkap, semua dapat jatah voting lagi; kalau jatah semua pemain habis, permainan langsung ke akhirnya. Cukup pakai akun gratis.',
        },
        {
          title: 'Spy Sketch',
          text: 'Cara main baru: gambar kata rahasianya di satu papan bersama dan tangkap mata-mata yang cuma pura-pura tahu.',
        },
        {
          title: 'Terjemahan otomatis',
          text: 'Ngobrol di lobi dan selama permainan dalam 10 bahasa: pesan dalam bahasa lain langsung diterjemahkan ke bahasamu begitu masuk. Jawaban di Spy Talk diterjemahkan bersama pertanyaannya, jadi maknanya tetap terjaga.',
        },
        {
          title: 'Agenmu dan Toko',
          text: "Buat avatar mata-matamu sendiri dan dapatkan tampilan baru dengan bermain. Toko hanya menjual keanggotaan, yang membuka semua paket dan memungkinkanmu membuat paket sendiri: semuanya opsional, dan tidak ada yang mengubah cara bermain.",
        },
        { title: 'Event', text: 'Permainan online terjadwal. Ketuk “Ingatkan aku” dan kami akan mengingatkanmu sebelum dimulai.' },
        {
          title: 'Warna Agen',
          text: 'Di meja Main online dan di event, orang asing melihat warna Agen-mu, seperti Agen Toska, bukan namamu. Pilih tiga warna favoritmu.',
        },
        {
          title: 'Kode kreator',
          text: 'Dapat kode dari kreator atau dari SpySocial? Masukkan di Pengaturan untuk mendapat gelar atau hadiah lain.',
        },
        {
          title: 'Musik dan suara',
          text: 'Tiga lagu lounge bergantian di menu, Spy Talk dan Spy Sketch masing-masing punya lagu sendiri, dan suara baru menandai detik-detik terakhir, momen pengungkapan di Spy Sketch, dan kemenangan. Pilih lagu menu di Pengaturan, atau matikan musiknya.',
        },
        {
          title: 'Waktu permainan yang disarankan',
          text: 'Aturan room menampilkan waktu permainan yang disarankan sesuai jumlah pemain, di Spy Talk dan Spy Sketch. Keputusannya tetap di tangan host.',
        },
        {
          title: 'Keamanan',
          text: 'SpySocial untuk usia 13 tahun ke atas. Chat punya filter kata, kamu bisa melaporkan atau memblokir pemain mana pun, dan room yang ada pemain di bawah 18 tahun memblokir tautan, nomor telepon, dan akun media sosial di chat.',
        },
      ],
      more: 'Ada juga Statistik, gelar dan bingkai untuk dibuka, level hingga 100 dengan prestise, XP juga dari permainan singkat, kembali ke permainan dengan mulus setelah ponsel masuk mode tidur, tautan undangan yang langsung berfungsi, dan tampilan baru di setiap layar.',
      launchWeek: 'Minggu peluncuran: Spy Talk hari Selasa, 8 Desember, Spy Sketch hari Jumat, 11 Desember, dan Mafia hari Sabtu, 12 Desember, masing-masing pukul 20.00–22.00 waktu bagian timur AS (ET).',
    },
    next: {
      status: 'Direncanakan',
      noDates: 'Belum ada tanggal',
      title: 'Berikutnya',
      sub: 'Setelah 2.2, kami akan membangun sisi kompetitif SpySocial.',
      plans: [
        {
          title: 'Ranked',
          text: 'Main ranked dan pamerkan rank-mu di profil. Matchmaking mempertemukanmu dengan pemain yang rank-nya mirip.',
        },
        {
          title: 'Season',
          text: 'Setiap season punya hadiahnya sendiri, seperti gelar dan bingkai, sesuai rank yang kamu capai dan permainan yang kamu mainkan.',
        },
        {
          title: 'Turnamen',
          text: 'Daftar lebih dulu untuk turnamen terjadwal dan main babak gugur di meja-meja kecil. Pemenang lanjut, babak demi babak, sampai meja final, dengan hadiah sesuai peringkat.',
        },
      ],
    },
    outro: 'Rencana bisa berubah. Ikuti kami untuk kabar terbaru.',
  },

  join: {
    title: 'Gabung ke permainan',
    noCode: 'Tidak ada kode room',
    browserOrPhone: 'Main di browser, atau di HP dengan aplikasinya',
    openToJoin: 'Buka SpySocial untuk gabung ke room',
    onPhone: 'Buka link ini di HP-mu untuk gabung ke room',
    roomCode: 'Kode room',
  },

  joinEvent: {
    label: 'Event publik',
    broken: 'Link event ini tidak berfungsi',
    brokenHelp: 'Periksa link-nya, atau buka SpySocial dan cari room.',
    live: 'Sedang berlangsung',
    cancelled: 'Dibatalkan',
    ended: 'Selesai',
    upcoming: 'Akan datang',
    full: 'Sedang penuh',
    inRoom: (count: number, capacity: number) => `${count} / ${capacity} di room`,
    yourTime: 'Waktumu',
    hostTime: (who: string, when: string) => `Waktu ${who}: ${when}`,
    theHost: 'host',
    hostedBy: (name: string) => `dipandu ${name}`,
  },

  resetPassword: {
    title: 'Atur ulang kata sandi',
    invalid: 'Link atur ulang tidak valid atau sudah kedaluwarsa. Silakan minta yang baru.',
    failed: 'Terjadi kesalahan. Coba lagi.',
    mismatch: 'Kata sandi tidak cocok',
    previewSuccess: 'Pratinjau: kata sandi berhasil diatur ulang',
    success: 'Kata sandi berhasil diatur ulang',
    error: 'Error',
    unexpected: 'Kesalahan tak terduga',
    done: 'Kata sandi berhasil diatur ulang!',
    redirecting: 'Mengalihkan...',
    newPassword: 'Kata sandi baru',
    newPlaceholder: 'Masukkan kata sandi baru',
    minLength: 'Minimal 6 karakter.',
    confirm: 'Konfirmasi kata sandi',
    confirmPlaceholder: 'Ulangi kata sandi',
    submit: 'Atur ulang kata sandi',
    cancel: 'Batal',
    // passwordless (legalRelease LIVE.passwordless): the page that replaces the reset form.
    goneTitle: "Tidak ada kata sandi lagi",
    goneBody: "Masuk dengan kode sekali pakai di aplikasi.",
    goneOpen: "Buka SpySocial",
    goneNoApp: "Belum punya aplikasinya?",
    preview: (mode: string) => `Mode pratinjau: <b>${mode}</b>. Mengirim tidak akan menyentuh Supabase.`,
  },

  deleteAccount: {
    title: 'Hapus akun SpySocial-mu',
    intro: 'Kamu bisa menghapus akun SpySocial-mu beserta data pribadi yang terkait dengannya kapan saja, lewat aplikasi atau email. Kalau ada pertanyaan, hubungi kami di <email/>.',
    appTitle: 'Cara menghapus akunmu dari aplikasi',
    steps: (o: { avatars: boolean; oldApps: boolean }) => [
      'Buka SpySocial.',
      `Ketuk ${o.avatars ? 'avatar-mu' : 'gambar profilmu'} di bagian atas layar beranda untuk membuka <b>Akun</b>.${
        o.oldApps ? ' (Di versi sebelum 2.2, Akun adalah ikon di kanan bawah layar beranda.)' : ''
      }`,
      'Ketuk <b>Pengaturan</b> di kanan atas.',
      `Di bagian <b>Akun & masuk</b>, ketuk <b>Hapus akun</b> (baris terakhir, berwarna merah) lalu konfirmasi.${
        o.oldApps ? ' (Di versi sebelum 2.2, Hapus akun ada di Zona bahaya di bagian bawah Akun.)' : ''
      }`,
    ],
    atOnce: 'Akunmu langsung dihapus.',
    guestTitle: 'Akun tamu',
    guest: (purchases: boolean) =>
      `Akun tamu dihapus begitu kamu mengetuk <b>Keluar</b> (di Pengaturan, bagian Akun & masuk; di versi sebelum 2.2, di Akun bagian Akun dan keamanan) lalu mengonfirmasi. Tamu tidak bisa masuk lagi, jadi akunnya tidak bisa dipulihkan.${
        purchases
          ? ' Pembelian adalah pengecualian, seperti untuk akun apa pun yang dihapus: apa pun yang kamu beli sebagai tamu akan kembali lewat Pulihkan pembelian, di akun App Store atau Google Play yang kamu pakai untuk membayar.'
          : ''
      }`,
    noAppTitle: 'Aplikasinya sudah tidak terpasang?',
    noApp: 'Kirim email ke <email/> dari alamat yang terhubung dengan akunmu, dengan subjek “Delete my SpySocial account”. Permintaan diproses dalam 30 hari.',
    deletedTitle: 'Apa yang dihapus',
    staysTitle: 'Apa yang tetap disimpan, dan berapa lama',
    details: '<link>Kebijakan Privasi</link> kami menjelaskan detailnya.',
  },

  beta: {
    eyebrow: 'Beta 2 · Playtest live',
    title: 'Main duluan',
    lede: '<b>Lima kartu hadiah $50</b> untuk laporan bug atau ide paling berguna dari playtest grup live selama 1 jam untuk SpySocial ini, game pesta deduksi sosial yang gratis. Plus hadiah beta yang tetap jadi milikmu setelah peluncuran: Pin Beta, dua gelar, 10 sadapan dari setiap tingkat, dan keanggotaan 1 bulan.',
    /** Short note under the lede and in the rewards: the test's progress does not carry over. */
    reset: 'Game, XP, dan item dari tes ini direset saat peluncuran.',
    facts: ['1 jam, live', 'Khusus 18+', 'Sekitar 24 pemain', 'iPhone atau Android'],
    when: {
      label: 'Kapan',
      et: (time: string) => `${time} waktu Timur AS (ET)`,
      others: (pacific: string, utc: string) => `${pacific} waktu Pasifik · ${utc}\u00a0UTC`,
      yours: (time: string) => `Waktumu: ${time}`,
      checkIn: (time: string) => `Check-in dibuka pukul ${time} waktu Timur AS di saluran suara Discord.`,
    },
    europe: {
      label: 'Eropa · Sesi kedua opsional',
      time: (cet: string, uk: string) => `${cet}\u00a0CET · ${uk} waktu Inggris`,
      note: (date: string) => `Hanya berjalan kalau cukup banyak orang di Eropa yang mendaftar. Kami konfirmasi paling lambat ${date}.`,
    },
    signUp: 'Daftar',
    signUpNote: (day: string, time: string) => `Sekitar 2 menit. Pendaftaran ditutup ${day}, pukul ${time} waktu Timur AS.`,
    discord: 'Gabung Discord kami',
    closed: 'Pendaftaran sudah ditutup. Ikuti kami di Discord untuk tes berikutnya.',
    games: {
      eyebrow: 'Yang kamu mainkan',
      title: 'Dua game',
      talk: 'Tanya jawab. Satu atau dua pemain tidak tahu tempat rahasianya dan berusaha berbaur.',
      sketch: 'Semua orang menambah coretan di gambar yang sama. Mata-mata pura-pura tahu.',
    },
    who: {
      eyebrow: 'Untuk siapa',
      title: 'Siapa yang kami cari',
      adults: '<b>Khusus dewasa 18+.</b> Sekitar 24 pemain sekaligus.',
      phones: '<b>iPhone (TestFlight) atau ponsel Android (pengujian Google Play).</b> Ponsel Android sangat kami harapkan:',
      androidLabel: 'Ponsel Android yang paling kami cari',
      fans: '<b>Penggemar game deduksi sosial:</b> Among Us, Spyfall, Werewolf/Mafia, Blood on the Clocktower, Codenames. Pemula juga boleh ikut.',
      mic: '<b>Mikrofon membantu.</b> Cuma mendengarkan juga boleh.',
      langs: '<b>Game ini tersedia dalam 10 bahasa:</b>',
      langsLabel: 'Bahasa dalam game',
    },
    ask: {
      eyebrow: 'Yang kami minta',
      title: 'Main. Bicara. Ceritakan.',
      steps: ['<b>Main</b> selama satu jam.', '<b>Ucapkan dengan suara keras</b> apa pun yang membingungkan.', '<b>Isi survei 5 menit</b> sesudahnya.'],
      wantTitle: 'Yang ingin kami ketahui',
      want: ['Jelaskah giliran siapa sekarang?', 'Mudahkah memahami voting?', 'Apakah menggambar lancar di ponselmu?'],
    },
    get: {
      eyebrow: 'Yang kamu dapat',
      title: 'Hadiah beta yang tetap jadi milikmu setelah peluncuran',
      items: ['<b>Pin Beta</b>', 'Gelar <b>Penguji Beta</b> dan <b>Penguji Lapangan</b>', '<b>10 sadapan</b> dari setiap tingkat', 'Keanggotaan <b>1 bulan</b>'],
      prizeTitle: '5 kartu hadiah $50',
      prize: 'Lima laporan bug atau ide paling berguna masing-masing mendapat kartu hadiah $50, dipilih oleh developer dalam waktu seminggu.',
    },
    friends: {
      eyebrow: 'Teman',
      title: 'Ajak teman',
      text: '<b>Tulis nama temanmu di formulir</b> supaya duduk di meja yang sama. Penguji Beta 1 dapat prioritas.',
    },
    join: {
      eyebrow: 'Cara ikut',
      title: 'Empat langkah',
      form: '<link>Isi formulir pendaftaran</link> (sekitar 2 menit).',
      closes: (day: string, time: string) => `Pendaftaran ditutup ${day}, pukul ${time} waktu Timur AS.`,
      email: (day: string) => `Kami kirim email paling lambat ${day} untuk mengonfirmasi tempatmu dan mengirim link instalasi.`,
      discord: '<link>Gabung Discord kami</link>: check-in di saluran suaranya.',
      android: 'Android: formulir meminta email Google yang dipakai di Play Store-mu, karena Google mewajibkannya untuk build uji. Email itu dihapus setelah sesi.',
      iphone: 'iPhone: kamu memasang SpySocial lewat TestFlight, dari link di email.',
    },
    fine: 'Build pra-rilis. Jangan bagikan nama atau chat pemain lain. Data pendaftaranmu dihapus setelah Beta 2.',
  },

  notFound: {
    title: 'Halaman tidak ditemukan',
    text: 'Halaman yang kamu cari tidak ada.',
  },

  confirmSuccess: {
    title: 'Email dikonfirmasi',
    text: 'Emailmu berhasil diverifikasi. Sekarang kamu bisa memakai semua fitur aplikasi SpySocial.',
    home: 'Kembali ke beranda',
    expiredTitle: 'Link kedaluwarsa',
    expired: 'Link ini sudah kedaluwarsa atau sudah dipakai. Buka SpySocial lalu ketuk <b>Kirim ulang</b>.',
    browserText: 'Emailmu berhasil diverifikasi. Kembali ke SpySocial di browser-mu, lalu masuk.',
    browserPhoneText: 'Emailmu berhasil diverifikasi. Kembali ke SpySocial di komputer tempat kamu mendaftar, lalu masuk.',
    browserButton: 'Kembali ke SpySocial',
  },
}

export default id
