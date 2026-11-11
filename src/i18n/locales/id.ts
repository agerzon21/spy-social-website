import type { Strings } from './en'

/** Indonesian (id): everyday "kamu" like the app, sentence case, app terms (mata-mata, warga, room, host, Malam Permainan, “Main online”). */
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
      /** The collectibles ledger (/ledger), live with LIVE.mintedCollectibles. */
      ledger: "Buku besar koleksi",
      /** The Archive (archive.spysocial.app: /, /uniques, /u/<item>/<serial>), live with LIVE.mintedCollectibles. */
      archive: "Arsip",
      /** The Market (market.spysocial.app and its pages), live with LIVE.marketSite: the Black Market's prices. */
      market: "Harga Pasar Gelap",
      transparency: "Laporan transparansi",
      /** The Game Night rules page (/game-night-rules), live with LIVE.gameNightRules. */
      gameNightRules: "Aturan Malam Permainan",
      faq: "Bantuan & FAQ",
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
      joinEvent: 'Malam Permainan publik',
      resetPassword: 'Atur ulang kata sandi',
      /** /reset-password once passwords are gone (LIVE.passwordless; set by the page's own Helmet). */
      resetPasswordCode: "Masuk dengan kode",
      confirmSuccess: 'Email dikonfirmasi',
      notFound: 'Halaman tidak ditemukan',
    },
    descriptions: {
      beta: 'Ikut playtest grup live selama 1 jam untuk SpySocial, game pesta deduksi sosial gratis, pada Kamis, 12 November 2026, pukul 19.00–20.00 waktu Timur AS. Khusus 18+, di iPhone atau Android. Penguji mendapat Pin Beta dan lainnya.',
      ledger: "Catatan publik setiap item koleksi SpySocial: setiap salinan dan nomornya. Siapa saja bisa memeriksanya.",
      archive: "Setiap Unik SpySocial tercatat: gambarnya, nomornya, atributnya, cara dicetak, dan setiap penjualan, tanpa menyebut pemain.",
      market: "Harga setiap item SpySocial di Pasar Gelap: harga dari transaksi pemain, yang paling naik dan turun, dan yang paling banyak diperdagangkan, tanpa menyebut pemain.",
      transparency: "Setiap bulan: berapa Intel yang didapat, dibelanjakan, dan dikoreksi di SpySocial, setiap insiden, dan setiap perubahan aturan, tanpa menyebut nama pemain.",
      gameNightRules: "Aturan Malam Permainan mingguan SpySocial: kapan diadakan, siapa yang bisa ikut, cara mendapatkan gelar malam itu, dan gelar bonus dari pengembang.",
      faq: "Bantuan SpySocial: cara main Spy Talk dan Spy Sketch, Main online, room privat dan Malam Permainan, teman, tukar item, Pasar Gelap, sadapan, Intel, keanggotaan, akunmu, keamanan, dan cara mengatasi masalah.",
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

    /** The link to the Market (LIVE.marketSite). */

    market: "Harga Pasar Gelap",
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
    rights: (year: number, holder = 'SpySocial') => `© ${year} ${holder}. Hak cipta dilindungi`,
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
          text: 'Mata-mata bisa mencoba menebak rahasianya. Benar, menang. Salah, gugur.',
          alt: 'Si mata-mata memilih lokasi dari daftar untuk memenangkan ronde',
        },
      ],
      win: 'Warga menang dengan menyingkirkan semua mata-mata lewat voting. Mata-mata menang dengan menebak rahasianya, atau tetap tersembunyi sampai akhir.',
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
      onlineText: '“Cari permainan” mendudukkanmu di meja berisi 4 atau 8 pemain. Orang asing tidak pernah melihat namamu, hanya warna Agen-mu. Ada Malam Permainan terjadwal juga.',
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

  rules: {
    title: 'Aturan komunitas',
    intro: (o: { onePool: boolean; photos: boolean }) =>
      `Room publik${o.onePool ? ' (meja “Main online” dan Malam Permainan kami)' : ''} mempertemukanmu dengan orang yang tidak kamu kenal. Aturan ini menjaga permainan tetap seru untuk semua orang. Aturan ini berlaku untuk nama,${o.photos ? ' foto,' : ''} chat, gambar, dan caramu bermain, di room publik maupun privat, dan merupakan bagian dari <link>Ketentuan Layanan</link> kami.`,
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
        'Di room atau grup mana pun yang ada pemain di bawah 18 tahun atau pemain yang belum memberi tahu usianya, link, alamat email, nomor telepon, akun media sosial, dan info pribadi lain (alamat rumah, tempat tinggal seseorang, sekolah, nama asli) diblokir untuk semua orang. Di meja “Main online” dan Malam Permainan, semuanya selalu diblokir.',
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
      text: 'Biasanya peringatan dulu. Masalah yang berulang atau serius bisa berujung pada chat dibisukan (1 jam sampai 7 hari), jeda dari room publik dan Malam Permainan (1 sampai 30 hari), atau pemblokiran akun. Membagikan informasi pribadi orang lain, atau apa pun yang menyeksualisasi anak, bisa langsung berujung pemblokiran akun. Setiap pemberitahuan di aplikasi menyebutkan apa yang dibatasi, alasannya, dan sampai kapan, dengan ID seperti S-207.',
      drawings:
        'Gambar di room publik dan Malam Permainan bisa diperiksa otomatis kapan saja, dan gambar yang dilaporkan juga diperiksa. Kalau gambar buatanmu melanggar aturan ini, akunmu bisa dijeda atau diblokir dari room publik dan Malam Permainan, tak peduli sudah berapa lama kamu bermain. Di room publik, giliran yang melanggar aturan ini dihapus dari gambar dan dihitung sebagai pelanggaran: pertama peringatan, lalu 3, 7, dan 30 hari tanpa room publik dan Malam Permainan, dan pada pelanggaran kelima dalam 90 hari, untuk selamanya. Di room mana pun, simbol kebencian (termasuk swastika, kecuali kata di ronde itu jelas menunjukkan makna keagamaan), cercaan tertulis, atau kebencian yang ditujukan ke seseorang membuat pemainnya dikeluarkan dari permainan serta dari room publik dan Malam Permainan untuk selamanya, dan gambar yang menyeksualisasi anak mengakhiri akunnya dan ditangani seperti yang dijelaskan di bagian Keselamatan anak di atas. Darah dan monster boleh saja. Di room privat, gambar yang dilaporkan hanya ditindak otomatis kalau seserius itu; selebihnya diputuskan oleh orang yang membaca laporannya. Untuk mengajukan banding, kirimkan kode dari pemberitahuanmu ke email kami.',
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
        '<b>Room publik</b> dengan pemain yang tidak dikenal anak Anda: meja “Main online”, tempat aplikasi mendudukkan pemain secara otomatis dan semua orang bermain dengan aturan standar yang sama, serta Malam Permainan yang kami selenggarakan pada waktu tertentu. Pemain tidak bisa membuat room publik, dan tidak ada pemain yang menjadi host-nya.',
      public: (playOnline: boolean) =>
        `<b>Room publik dan Malam Permainan</b> dengan pemain yang tidak dikenal anak Anda${playOnline ? ', termasuk “Main online”, yang mendudukkan pemain di meja secara otomatis' : ''}.`,
      buy: '<b>Barang yang bisa dibeli:</b> paket dan keanggotaan, lewat App Store atau Google Play.',
      /** `buy` once only memberships are sold (LIVE.membershipsOnly). */
      buyMembers:
        '<b>Barang yang bisa dibeli:</b> hanya keanggotaan (Langganan paket, bulanan atau tahunan, dan Akses seumur hidup), lewat App Store atau Google Play. Keanggotaan membuka paket yang tidak gratis; selain itu tidak ada yang dijual.',
      /** Once Intercepts are live (LIVE.intercepts). Use the app's own word for Intercepts. */
      intercepts:
        '<b>Sadapan (Intercepts):</b> hadiah yang didapat dengan bermain, masing-masing berisi satu item acak, seperti tampilan baru untuk agen. Hadiah ini tidak bisa dibeli, baik dengan uang maupun dengan mata uang yang didapat dari bermain, dan aplikasi menunjukkan peluangnya sebelum dibuka.',
      /** `intercepts` once unopened Intercepts trade on the Black Market (LIVE.interceptsMarket). */
      interceptsMarket:
        "<b>Sadapan (Intercepts):</b> hadiah yang didapat dengan bermain, masing-masing berisi satu item acak, seperti tampilan baru untuk agen. Tidak ada yang menjualnya demi uang, baik kami maupun pemain lain. Orang dewasa juga bisa saling membeli dan menjual sadapan yang belum dibuka di Pasar Gelap dengan mata uang yang didapat dari bermain, yang tidak bisa dibeli; pemain di bawah 18 tahun tidak bisa. Aplikasi menunjukkan peluangnya sebelum dibuka.",
      /** A sentence after interceptsMarket once the app offers it (LIVE.interceptsInTrades). */
      interceptsFriendTrades:
        "Orang dewasa juga bisa menukar sadapan yang belum dibuka dengan teman.",
      /** Home's Discord pill (LIVE.homeDiscord; under 16 never, 16-17 a safety note first). */
      discord:
        "<b>Tautan ke Discord kami:</b> beranda bisa menampilkan tautan ke server Discord resmi SpySocial, tempat pemain mencari teman bermain. Discord adalah aplikasi terpisah dengan aturan dan batas usianya sendiri. Pemain di bawah 16 tahun tidak pernah melihat tautan ini, dan pemain 16 dan 17 tahun lebih dulu melihat catatan agar tetap aman di sana. Moderator kami menjaga server itu, tetapi tidak ada seorang pun di SpySocial yang bisa melihat pesan pribadi di Discord.",
      /** Once members can make packs (LIVE.customPacks); `community`: LIVE.communityPacks. */
      customPacks: (community: boolean) =>
        `<b>Pembuat paket:</b> anggota bisa membuat paket lokasi atau kata sendiri untuk room privat mereka.${
          community ? ' Tim kami membaca setiap paket yang dibagikan ke Paket Komunitas sebelum orang lain bisa melihatnya, dan pemain mana pun bisa melaporkannya.' : ''
        }`,
      hasNotTitle: 'Apa yang tidak ada di SpySocial',
      noDms:
        'Tidak ada pesan langsung: pemain hanya bisa chat di dalam room, dengan pemain yang ada di room itu. Chat para mata-mata hanya berlaku selama satu permainan dan difilter, disimpan, serta bisa dilaporkan seperti chat lainnya.',
      noFriends:
        'Tidak ada daftar teman atau pengikut, tidak ada pencarian pemain, tidak ada profil untuk dijelajahi, dan tidak ada bio, jadi tidak ada yang bisa mencari anak Anda atau menghubunginya di luar room.',
      noDmsSocial:
        "Tidak ada pesan langsung: pemain hanya chat di dalam room, dengan pemain yang ada di room itu, atau di chat grup, dengan teman-teman di grup itu. Semua chat difilter, disimpan untuk sementara, dan bisa dilaporkan.",
      noSearch:
        "Tidak ada pencarian pemain dan tidak ada saran teman, jadi orang asing tidak bisa mencari anak Anda. Pemain di bawah 18 tahun tidak punya profil publik dan tidak bisa diikuti.",
      social:
        "<b>Teman dan grup:</b> pemain bisa menambahkan teman dan bermain bersama sebagai grup, dengan chat grup yang difilter. Orang dewasa hanya bisa menambahkan pemain di bawah 16 tahun secara langsung, dengan memindai Kode Teman di ponsel anak itu. Pemain di bawah 18 tahun tidak punya profil publik, tidak bisa diikuti, dan tidak menerima notifikasi sosial pada malam hari. Di iPhone dan iPad, fitur ini untuk sementara tetap mati bagi pemain di bawah 18 tahun.",
      trading:
        "<b>Tukar:</b> pemain berusia 13–17 tahun hanya bisa menukar item game dengan item lain, dengan teman yang mereka tambahkan secara langsung, tanpa hadiah dan tanpa pesan. Orang dewasa juga bisa membeli dan menjual item di Pasar Gelap dengan mata uang yang didapat dari bermain; pemain di bawah 18 tahun hanya bisa melihat. Tidak ada yang bisa dibeli atau dijual dengan uang sungguhan.",
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
        '<b>Filter chat:</b> nama dan chat diperiksa sebelum dilihat siapa pun. Di room publik, cercaan, kata-kata seksual yang vulgar, dan hinaan diblokir. Di room privat, kata-kata yang paling parah diblokir. Di room atau grup mana pun yang ada pemain di bawah 18 tahun atau pemain yang belum memberi tahu usianya, link, alamat email, nomor telepon, akun media sosial, dan info pribadi lain (alamat rumah, tempat tinggal seseorang, sekolah, nama asli) diblokir untuk semua orang. Di meja “Main online” dan Malam Permainan, semuanya selalu diblokir.',
      filterMild:
        'Di meja “Main online” dan Malam Permainan, kata kasar yang umum tidak diblokir, tetapi semua orang melihatnya tersensor: huruf pertamanya, lalu tanda bintang (S***). Kata yang lebih ringan tampil apa adanya.',
      reports:
        '<b>Laporan, blokir, dan sanksi:</b> manusia membaca setiap laporan dalam 24 jam, dan pemain yang dilaporkan tidak diberi tahu siapa pelapornya. Laporan yang melibatkan pemain di bawah 18 tahun dibaca lebih dulu. Sanksinya mulai dari peringatan, chat dibisukan, jeda dari room publik, hingga pemblokiran akun. <link>Aturan Komunitas</link> kami mencantumkan apa saja yang tidak diperbolehkan.',
      drawingCheck:
        '<b>Pemeriksaan gambar:</b> giliran menggambar di room publik bisa diperiksa otomatis, dan giliran yang menurut pemeriksaan melanggar aturan dihapus dari gambar.',
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
      dataRequests:
        '<b>Data anak Anda:</b> sebagai orang tua atau wali, Anda dapat meminta salinan data akun anak Anda, perbaikan tahun lahirnya, atau penghapusan akunnya. <link>Kebijakan Privasi</link> kami (bagian Privasi Anak) menjelaskan cara kami memastikan permintaan itu dan apa saja yang dicakupnya.',
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
        text: 'Laporkan pemainnya di aplikasi dan pilih <b>Keselamatan anak</b>, lalu kirim email ke <email/> dengan subjek “Child safety”. Kami menghapus kontennya, memblokir akun yang terlibat, dan melaporkannya ke NCMEC sesuai ketentuan hukum AS; NCMEC meneruskannya ke polisi di negara yang bersangkutan.',
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

  ledger: {
    head: ['Koleksi', 'Jumlah dan status'],
    supply: (minted, burned, held) => [`${minted} dicetak`, `${burned} dimusnahkan`, `${held} dimiliki`],
    neverAwarded: 'Tidak pernah diberikan',
    closed: (date, entry) => `Ditutup ${date} (entri ${entry})`,
    openUntil: (date) => `Dibuka sampai ${date}`,
    search: 'Cari koleksi',
    searchHint: 'Coba “bingkai” atau “gelar”',
    clear: 'Hapus',
    sort: 'Urutkan',
    sortBy: { newest: 'Terbaru', name: 'Nama (A–Z)', minted: 'Paling banyak dicetak', held: 'Paling banyak dimiliki' },
    count: (from, to, total) => `${from}–${to} dari ${total}`,
    noMatch: (query) => `Tidak ada yang cocok dengan “${query}”.`,
    pages: 'Halaman tabel',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    page: (n, total) => `Halaman ${n} dari ${total}`,
  },

  whatsNew: {
    title: 'Yang baru',
    sub: 'Catatan rilis SpySocial. Pembaruan besar, fitur baru, dan perbaikan, langsung saat kami merilisnya.',
    releases: [
      {
        tag: "Rilis Android",
        summary:
          "SpySocial kini ada di Google Play, plus sederet perbaikan dari pengujian di ponsel Android sungguhan.",
        sections: [
          {
            label: "Sudah tersedia",
            items: [
              { title: "Android", text: "Di Google Play sejak 13 Juni 2026." },
              { title: "iPhone dan iPad", text: "Perbaikan yang sama sudah ada di App Store." },
            ],
          },
          {
            label: "Perbaikan",
            items: [
              { title: "Hapus akun", text: "Tombolnya tidak lagi terpotong di bagian bawah layar Akun." },
              { title: "Tombol lobi", text: "Keluar dari room dan Mulai permainan tidak lagi tertutup bilah navigasi Android." },
              { title: "Mulai permainan", text: "Kalau permainan belum bisa dimulai, aplikasi memberi tahu alasannya: perlu minimal 3 pemain, semua siap, dan minimal satu kategori." },
              { title: "Kategori", text: "Tombol kembali dan judul tidak lagi berdesakan." },
              { title: "Cara bermain", text: "Hanya satu tombol kembali di Android, bukan dua." },
              { title: "Tutorial", text: "Kamu bisa melewatinya dari langkah mana pun, bukan cuma dari yang pertama." },
              { title: "Akun tamu", text: "Pengingat untuk menyimpan akun tamu kini terasa seperti undangan, bukan peringatan." },
              { title: "Ikon", text: "Hasil permainan dan Cara bermain memakai ikon yang terlihat sama di semua ponsel Android." },
              { title: "Perbaikan lebih cepat", text: "Perbaikan kecil kini bisa sampai ke aplikasi tanpa menunggu pembaruan dari toko." },
            ],
          },
        ],
      },
      {
        tag: "Pembaruan poles",
        summary:
          "Pembaruan poles: layar Selamat datang baru, layar Permainan selesai dan Akun yang lebih segar, tata letak iPad yang lebih baik, dan sederet perbaikan.",
        sections: [
          {
            label: "Fitur baru",
            items: [
              { title: "Layar Selamat datang baru", text: "Tampilan baru, tombol masuk dan daftar yang jelas, serta tautan sederhana untuk lanjut sebagai tamu." },
              { title: "Menyimpan akun tamu", text: "Sambil menunggu email konfirmasi, layar Akun menunjukkan kamu sudah di langkah mana, lengkap dengan Kirim ulang, Batal, dan Muat ulang." },
            ],
          },
          {
            label: "Tampilan baru",
            items: [
              { title: "Permainan selesai", text: "Kartu pemain baru, trofi untuk pemenang, lokasi dengan pin peta, dan tombol yang jelas untuk kembali ke lobi." },
              { title: "Akun", text: "Satu daftar rapi dengan bagian yang jelas, dan Zona bahaya di paling bawah." },
              { title: "iPad", text: "Layar besar lebih termanfaatkan: enam kartu pemain sebaris di lobi, kotak pemain lebih besar saat bermain, dan tidak ada yang terpotong." },
            ],
          },
          {
            label: "Perbaikan khusus Android",
            items: [
              { title: "Gestur kembali", text: "Menggeser untuk kembali (atau menekan Kembali) saat bermain atau di lobi kini bertanya dulu sebelum kamu keluar, sama seperti tombol Keluar." },
              { title: "Kartu", text: "Kartu voting dan Permainan selesai tidak lagi menampilkan kotak samar di dalamnya." },
              { title: "Permainan selesai", text: "Tidak ada lagi celah di bawah header." },
              { title: "Pemilih", text: "Pemilih di pengaturan lobi kini mudah dibaca dan tidak lagi membuat aplikasi crash saat ditutup." },
            ],
          },
          {
            label: "Peningkatan",
            items: [
              { title: "Timer", text: "Hitung mundur mengikuti jam permainan, jadi tetap tepat walau jam ponselmu meleset." },
              { title: "Daftar dan email", text: "Mendaftar, mengirim ulang konfirmasi, mengatur ulang kata sandi, dan mengganti email kini lebih andal." },
              { title: "Email dukungan", text: "Kalau ponselmu tidak punya aplikasi email, mengetuk alamat dukungan akan menyalinnya, bukan memunculkan error." },
              { title: "Bahasa", text: "Semua yang baru tersedia dalam bahasa Inggris, Spanyol, dan Rusia." },
            ],
          },
        ],
      },
      {
        tag: "Pembaruan besar",
        summary:
          "Main online dibangun ulang dari nol: setiap layar didesain ulang, koneksi lebih stabil, dan segudang fitur baru.",
        sections: [
          {
            label: "Fitur baru",
            items: [
              { title: "Tutorial dan profil", text: "Pemain baru diajak mengenal permainan dan langsung menyiapkan profil." },
              { title: "Buku catatan", text: "Catat siapa bilang apa selama ronde. Pemain yang punya catatan muncul duluan, yang tersingkir paling akhir." },
              { title: "Terjemahan petunjuk", text: "Kalau permainan memakai bahasa lain, ketuk petunjuk untuk membacanya dalam bahasamu. Semua pemain di meja tetap mendapat petunjuk yang sama." },
              { title: "Colekan", text: "Ketuk kartu pemain di lobi untuk mencoleknya." },
              { title: "Kode QR", text: "Bagikan room lewat menu berbagi di ponselmu, lengkap dengan kode QR untuk dipindai." },
              { title: "Tautan room", text: "Tautan room membuka aplikasi dan langsung membawamu ke room, meski aplikasi sedang tertutup." },
              { title: "Kode room lebih pendek", text: "Cuma 5 karakter, lebih gampang diucapkan. Kode lama 6 karakter tetap berfungsi." },
              { title: "Siapa yang memulai voting", text: "Pengaturan lobi yang menunjukkan siapa yang memulai setiap voting." },
              { title: "Akhiri permainan", text: "Host bisa mengakhiri permainan lebih awal." },
              { title: "Lebih banyak lokasi", text: "Paket lokasi baru untuk dimainkan." },
              { title: "Tombol Keluar", text: "Keluar dari permainan dengan sekali ketuk." },
            ],
          },
          {
            label: "Tampilan baru",
            items: [
              { title: "", text: "Lobi baru dengan kartu pemain interaktif dan pengaturan yang didesain ulang." },
              { title: "", text: "Layar permainan, voting, dan hasil voting didesain ulang. Voting menunjukkan siapa yang memulainya dan bagaimana jalannya." },
              { title: "", text: "Pembagian peran menunjukkan siapa yang masih ditunggu, dan kini berlangsung 60 detik." },
              { title: "", text: "Teks di kartu beranda kini pas." },
              { title: "", text: "Semua layar permainan punya header gelap yang sama." },
              { title: "", text: "Banner offline sama di semua layar dan tidak lagi menabrak Dynamic Island." },
              { title: "", text: "Layar Akun menampilkan pesan yang jelas saat kamu offline." },
            ],
          },
          {
            label: "Peningkatan",
            items: [
              { title: "Koneksi", text: "Setelah ponsel lama tertidur, aplikasi tidak lagi keliru bilang kamu offline." },
              { title: "", text: "Saat offline, layar Main mencoba lagi tiap 5 detik dan tidak lagi terlihat seolah kamu keluar dari akun." },
              { title: "", text: "Permainan langsung lebih stabil di lobi, pembagian peran, permainan, voting, dan hasil." },
              { title: "", text: "Timer permainan mengikuti jam permainan, bukan jam ponselmu." },
              { title: "", text: "Lebih cepat tersambung lagi saat sinyal hilang." },
              { title: "", text: "Mendaftar, mengatur ulang kata sandi, dan menyimpan akun tamu kini lebih andal." },
              { title: "", text: "Pesan yang lebih jelas di layar Akun." },
              { title: "", text: "Bahasa Inggris, Spanyol, dan Rusia di mana-mana, termasuk semua 171 saran petunjuk." },
              { title: "", text: "Buku catatan: keyboard tidak lagi muncul sendiri saat kamu memilih pemain." },
              { title: "", text: "Petunjuk: mengetuk petunjuk tidak lagi menggantinya tanpa sengaja. Pakai tombol muat ulang untuk petunjuk baru." },
              { title: "", text: "Siap untuk iOS 26." },
            ],
          },
          {
            label: "Perbaikan bug",
            items: [
              { title: "", text: "Memperbaiki kekacauan langka saat voting dan akhir permainan terjadi bersamaan." },
              { title: "", text: "Memperbaiki suara yang terhitung dua kali dan voting yang berakhir di saat yang salah." },
              { title: "", text: "Memperbaiki cara abstain dihitung. Tombol Abstain kini ada bersama tombol voting lainnya." },
              { title: "", text: "Memperbaiki header yang menutupi hasil tebakan." },
              { title: "", text: "Memperbaiki kedipan saat layar permainan dibuka." },
              { title: "", text: "Memperbaiki menyimpan akun tamu yang malah membuatmu keluar dari akun." },
              { title: "", text: "Memperbaiki kolom email di layar Akun." },
              { title: "", text: "Memperbaiki teks terpotong di kartu beranda dan di header bahasa Spanyol." },
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
          title: 'Agenmu dan Brankas',
          text: "Buat avatar mata-matamu sendiri dan dapatkan tampilan baru dengan bermain. Brankas hanya menjual keanggotaan: semua paket premium di room yang kamu host dan di mejamu di Main online, pembuat paket, dan memimpin grup. Semuanya opsional, dan tidak ada yang mengubah cara bermain.",
        },
        { title: 'Malam Permainan', text: 'Permainan online terjadwal. Ketuk “Ingatkan aku” dan kami akan mengingatkanmu sebelum dimulai.' },
        {
          title: 'Warna Agen',
          text: 'Di meja Main online dan di Malam Permainan, orang asing melihat warna Agen-mu, seperti Agen Toska, bukan namamu. Pilih tiga warna favoritmu.',
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
    friendTitle: "Tambah Teman",
    friendLink: "Buka SpySocial untuk menambahkan temanmu. Kodenya hanya berlaku beberapa menit.",
    browserOrPhone: 'Main di browser, atau di HP dengan aplikasinya',
    openToJoin: 'Buka SpySocial untuk gabung ke room',
    onPhone: 'Buka link ini di HP-mu untuk gabung ke room',
    roomCode: 'Kode room',
    afterInstall: "Setelah instal, ketuk link undangannya lagi.",
  },

  joinEvent: {
    label: 'Malam Permainan publik',
    broken: 'Link Malam Permainan ini tidak berlaku',
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
      `Di bagian <b>Akun & masuk</b>, ketuk <b>Hapus akun</b> (baris terakhir, berwarna merah), lalu <b>Kirim Kode</b>.${
        o.oldApps ? ' (Di versi sebelum 2.2, Hapus akun ada di Zona bahaya di bagian bawah Akun.)' : ''
      }`,
      'Masukkan kode 6 digit yang kami kirim lewat email. Akunmu dihapus begitu kodenya dimasukkan.',
    ],
    atOnce: 'Akunmu langsung dihapus.',
    guestTitle: 'Akun tamu',
    guest: (purchases: boolean, oldApps: boolean) =>
      `Akun tamu dihapus begitu kamu mengetuk <b>Hapus akun</b> (di Pengaturan, bagian Akun & masuk; di versi sebelumnya, baris ini bernama <b>Keluar</b>${oldApps ? '; di versi sebelum 2.2, di Akun bagian Akun dan keamanan' : ''}) lalu mengonfirmasi. Tamu tidak bisa masuk lagi, jadi akunnya tidak bisa dipulihkan.${
        purchases
          ? ' Pembelian adalah pengecualian, seperti untuk akun apa pun yang dihapus: apa pun yang kamu beli sebagai tamu akan kembali lewat Pulihkan pembelian, di akun App Store atau Google Play yang kamu pakai untuk membayar.'
          : ''
      }`,
    noAppTitle: 'Aplikasinya sudah tidak terpasang?',
    noApp: 'Kirim email ke <email/> dari alamat yang terhubung dengan akunmu, dengan subjek “Delete my SpySocial account”. Permintaan diproses dalam satu bulan.',
    deletedTitle: 'Apa yang dihapus',
    staysTitle: 'Apa yang tetap disimpan, dan berapa lama',
    details: '<link>Kebijakan Privasi</link> kami menjelaskan detailnya.',
  },

  beta: {
    eyebrow: 'Beta 2 · Playtest live',
    title: 'Main duluan',
    lede: '<b>$10 lewat PayPal sebagai ucapan terima kasih</b> untuk setiap pemain terkonfirmasi yang ikut penuh 1 jam di sesi playtest grup live SpySocial ini, game pesta deduksi sosial yang gratis, dan mengirim survei 5 menit, sama untuk iPhone dan Android, ditambah satu bonus $50 untuk laporan bug atau ide paling berguna dari sesi. Plus hadiah beta yang tetap jadi milikmu setelah peluncuran: Pin Beta dan satu gelar untuk setiap penguji, dan dengan satu game yang selesai sebelum 7 Desember, gelar kedua, 10 sadapan dari setiap tingkat, dan keanggotaan 1 bulan.',
    /** Short note under the lede and in the rewards: the test's progress does not carry over. */
    reset: 'Game, XP, dan item dari tes ini direset saat peluncuran.',
    headsUp: '<b>Perhatian:</b> SpySocial di App Store dan Google Play adalah versi lama. Beta ini build baru yang sangat berbeda; kamu menginstalnya dari link yang kami kirim lewat email.',
    facts: ['1 jam, live', 'Khusus 18+', '24 kursi', 'iPhone atau Android'],
    when: {
      label: 'Kapan',
      et: (time: string) => `${time} waktu Timur AS (ET)`,
      others: (pacific: string, utc: string) => `${pacific} waktu Pasifik · ${utc}\u00a0UTC`,
      yours: (time: string) => `Waktumu: ${time}`,
      checkIn: (time: string) => `Check-in dibuka pukul ${time} waktu Timur AS di #beta-2-ask-hq di Discord (ruang suara Beta 2 juga dibuka).`,
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
      adults: '<b>Khusus dewasa 18+.</b> 24 kursi.',
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
      items: ['<b>Pin Beta</b>', 'Gelar <b>Penguji Beta</b>'],
      gameTitle: 'Selesaikan satu game sebelum 7 Desember untuk juga dapat',
      gameItems: ['Gelar <b>Penguji Lapangan</b>', '<b>10 sadapan</b> dari setiap tingkat', 'Keanggotaan <b>1 bulan</b>'],
      trade: { tradable: 'Setelah peluncuran, sadapan terima kasih bisa ditukar seperti apa pun yang kamu dapatkan sendiri.', bound: 'Sadapan terima kasih tetap di akunmu.' },
      prizeTitle: 'Terima kasih $10 lewat PayPal + satu bonus $50',
      prize: 'Ucapan terima kasih $10 lewat PayPal untuk waktumu di sesi live: setiap pemain terkonfirmasi yang ikut penuh satu jam dan mengirim survei 5 menit menerimanya dalam 7 hari setelah sesi, sama untuk iPhone dan Android. Hanya memasang build uji tidak membuatmu mendapatkannya. Plus satu bonus $50 (kartu hadiah) untuk satu laporan bug atau ide paling berguna dari sesi, dipilih oleh developer dalam waktu seminggu.',
      seats: (day: string) => `24 kursi. Ucapan terima kasih hanya untuk pemain yang kami konfirmasi lewat email (paling lambat ${day}) dan ikut sesi; yang lain masuk daftar tunggu untuk tes berikutnya.`,
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
      discord: '<link>Gabung Discord kami</link>: check-in di #beta-2-ask-hq (ruang suara Beta 2 juga dibuka).',
      android: 'Android: formulir meminta email Google yang dipakai di Play Store-mu, karena Google mewajibkannya untuk build uji. Email itu dihapus setelah sesi.',
      iphone: 'iPhone: kamu memasang SpySocial lewat TestFlight, dari link di email.',
    },
    fine: 'Build pra-rilis. Jangan bagikan nama atau chat pemain lain. Data pendaftaranmu dihapus setelah Beta 2. Email PayPal-mu dihapus setelah ucapan terima kasihmu kami kirim.',
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

  launch: {
    railLabel: "Layar SpySocial 2.2",
    shots: {
      talk: "Spy Talk: Tanya dengan cerdik. Temukan mata-matanya.",
      sketch: "Spy Sketch: Gambar kata rahasia. Tangkap si peniru.",
      online: "Main Online: Meja 4 atau 8 orang, kapan saja",
      gamenight: "Malam Permainan: Gelar yang hanya didapat malam itu",
      market: "Pasar Gelap: Tukar item dengan agen lain",
      friends: "Teman: Tambah teman. Main bareng.",
    },
    cards: [
      { title: "Spy Sketch", text: "Gambar kata rahasia di satu papan tulis bersama, lalu tangkap mata-mata yang pura-pura tahu." },
      { title: "Main online", text: "Ketuk “Cari permainan” untuk meja 4 atau 8 orang, kapan saja. Orang asing hanya melihat warna Agen-mu, tidak pernah namamu." },
      { title: "Malam Permainan", text: "Malam online terjadwal, dengan gelar yang hanya didapat malam itu. Kami akan mengingatkanmu sebelum dimulai." },
      { title: "Pasar Gelap", text: "Tukar item dengan teman. Orang dewasa juga bisa membeli dan menjual item di Pasar Gelap dengan Intel yang didapat dari bermain. Tidak pernah dengan uang sungguhan." },
      { title: "Keanggotaan", text: "Opsional: Langganan paket (bulanan atau tahunan) atau Seumur hidup, sekali bayar dan tidak pernah diperpanjang. Semua paket premium di room yang kamu host dan di mejamu di Main online, plus pembuat paket. Tidak ada lagi yang dijual." },
    ],
    allNotes: "Semua yang baru di 2.2",
    community: {
      title: "Temukan mejamu",
      text: "Malam permainan, kabar terbaru, dan pemain yang sedang cari teman main: gabung ke Discord SpySocial.",
      discord: "Gabung ke Discord",
      pressTitle: "Pers dan kreator",
      press: "Mau menulis tentang SpySocial, atau memainkannya di kanalmu? Kirim email ke <email/> dengan “Press” di subjek.",
    },
    notes: {
      tag: "Peluncuran",
      summary: "Pembaruan terbesar kami: Spy Sketch, Main online, Malam Permainan, permainan latihan, pertukaran, Pasar Gelap, dan keanggotaan.",
      items: [
        { title: "Permainan latihan", text: "Pelajari Spy Talk dan Spy Sketch dalam permainan sungguhan bersama agen AI, sebagai warga atau sebagai mata-mata. Kami membimbing setiap langkah dan memberi nilai A sampai F untuk permainanmu." },
        { title: "Temuanku", text: "Mata-mata mencatat apa yang mereka tangkap di halaman temuan, menyusun daftar pendek tempat atau kata yang mungkin, lalu menebak terakhir kali dari daftar itu." },
        { title: "Aturan room privat", text: "Aturan opsional, seperti Informan: seorang warga yang diam-diam tahu satu mata-mata. Di Cara bermain > Fitur & Pengaturan ada demo singkat yang bisa dimainkan untuk tiap aturan." },
        { title: "Teman dan grup", text: "Tambahkan teman dengan Kode Teman atau nama pengguna, ikuti pemain, dan cari meja bersama sebagai grup. Membuat grup khusus member. Di iPhone dan iPad, teman, grup, dan fitur tukar khusus untuk pemain 18 tahun ke atas." },
        { title: "Sadapan", text: "Berkas tersegel berisi item acak untuk agenmu, didapat dengan menang di Main online, dari Rentetan Harian, dan di Malam Permainan. Sebagian item hadir sebagai Unik: satu-satunya, dengan warna dan nomor seri sendiri. Peluangnya terlihat sebelum dibuka atau dibeli. Tidak pernah dijual dengan uang." },
        { title: "Intel dan pertukaran", text: "Intel adalah uang khusus dalam game: didapat dari bermain dan dibelanjakan di Brankas. Tidak bisa dibeli dan tidak punya nilai uang. Tukar item dengan teman setelah akunmu berumur 7 hari, emailmu terkonfirmasi, dan kamu sudah main 3 game. Setiap pertukaran dilindungi 7 hari." },
        { title: "Paket komunitas", text: "Jelajahi paket buatan pemain di Komunitas. Member menulis paket sendiri di pembuat paket lalu membagikannya." },
        { title: "10 bahasa", text: "Inggris, Spanyol, dan Rusia, ditambah Prancis, Portugis (Brasil), Mandarin (Sederhana), Hindi, Arab, Bengali, dan Indonesia dalam versi beta. Semua orang melihat game dalam bahasanya sendiri." },
        { title: "Notifikasi", text: "Untuk undangan dan permintaan teman, pertukaran, penawaran Pasar Gelap, dan Malam Permainan yang kamu ketuk Ingatkan aku." },
      ],
      more: "Plus statistik, level hingga 100 dengan prestise, pencapaian, gelar, bingkai, dan selebrasi, mention dengan @, mini-game di Arkade, mikrofon yang lebih cepat, kembali ke game dengan mulus setelah ponsel tidur, dan tampilan baru di setiap layar.",
      newLabel: "Baru di 2.2",
      moreLabel: "Dan lainnya",
    },
  },
}

export default id
