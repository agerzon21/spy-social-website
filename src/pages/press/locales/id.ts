import type { PressStrings } from '../strings'

/** Indonesian (id): everyday "kamu" like the app; the app's words (src/help/locales/id.ts: warga, mata-mata, Main online, Pasar Gelap, sadapan, Intel). */
const id: PressStrings = {
  eyebrow: 'Kit pers',
  title: 'Pers',
  lede: 'Untuk jurnalis dan kreator: apa itu SpySocial, fakta utamanya, serta logo dan screenshot untuk liputanmu.',
  email: 'Email tim kami',
  toAssets: 'Logo dan screenshot',
  about: {
    eyebrow: 'Dalam satu paragraf',
    title: 'Tentang SpySocial',
    short: (_day, out) =>
      `SpySocial adalah game pesta gratis tentang menggertak dan menebak untuk 3 sampai 21 pemain, masing-masing di ponsel atau tabletnya sendiri. Semua orang tahu rahasianya, kecuali para mata-mata. Di Spy Talk rahasianya adalah lokasi, dan pemain bergiliran bertanya dan menjawab. Di Spy Sketch rahasianya adalah kata, dan pemain bergiliran menggambarnya di satu papan bersama sementara mata-mata pura-pura tahu. Lalu semua pemain memilih. Versi 2.2 ${out ? 'sudah hadir' : 'hadir'} di iPhone, iPad, dan Android, dengan Spy Sketch, meja Main online, tutorial terpandu, Malam Permainan, teman, tukar item, dan 10 bahasa. Tidak ada iklan, dan satu-satunya yang dijual adalah keanggotaan opsional.`,
    moreTitle: 'Versi lengkapnya',
    sections: [
      {
        title: 'Dua game',
        text: 'Di Spy Talk rahasianya adalah lokasi. Pemain bergiliran bertanya dan menjawab, diketik atau didikte lewat mikrofon. Terlalu samar, kamu terlihat seperti mata-mata; terlalu jelas, mata-mata jadi tahu kalian di mana. Di Spy Sketch rahasianya adalah kata, yang digambar bergiliran di satu papan bersama sementara mata-mata ikut menggambar dan berusaha tidak ketahuan. Keduanya bisa dimainkan dalam mode Klasik atau Mafia, di mana para mata-mata saling tahu dan punya chat rahasia. Warga menang kalau semua mata-mata berhasil di-voting keluar. Mata-mata menang kalau berhasil menebak rahasianya atau tetap tersembunyi sampai waktu habis.',
      },
      {
        title: 'Cara bermain',
        text: 'Room pribadi menampung sampai 21 orang dengan aturan dan paket sendiri, dan teman bisa masuk lewat kode QR, link undangan, atau kode room. Main online mendudukkanmu di meja berisi 4 atau 8 orang, di mana orang asing saling melihat sebagai warna Agen, seperti Agen Toska, bukan nama. Malam Permainan adalah acara online terjadwal dengan gelar yang hanya bisa didapat malam itu. Pemain baru mulai dengan tutorial terpandu sekitar tiga menit, lalu permainan latihan melawan agen AI, dengan nilai A sampai F.',
      },
      {
        title: '10 bahasa',
        text: 'Inggris, Spanyol, Rusia, Prancis, Portugis Brasil, Indonesia, Hindi, Bengali, Arab, dan Mandarin Sederhana. Di satu meja, setiap pemain melihat game dalam bahasanya sendiri, dan chat diterjemahkan otomatis.',
      },
      {
        title: 'Didapat dengan bermain',
        text: 'Pemain membuat agen bergaya film noir dan mendapat XP, gelar, bingkai, dan selebrasi dengan bermain. Sadapan, berkas tersegel yang didapat dengan bermain, masing-masing berisi satu item acak, dan peluangnya ditampilkan sebelum dibuka. Pemain bisa bertukar item dengan teman, dan pemain dewasa bisa berdagang di Pasar Gelap dengan Intel, mata uang game ini yang hanya didapat dengan bermain. Uang sungguhan tidak pernah bisa membeli item, sadapan, atau Intel, dan semuanya tidak punya nilai uang. Koleksi di game ini bukan NFT, token, atau kripto.',
      },
      {
        title: 'Gratis, hanya satu yang dijual',
        text: 'Tidak ada iklan. Spy Talk, Spy Sketch, Malam Permainan, sadapan, tukar item, dan Pasar Gelap gratis. Satu-satunya yang dijual adalah keanggotaan opsional: keanggotaan bulanan atau tahunan, atau keanggotaan seumur hidup (sekali bayar). Keanggotaan membuka semua paket premium untuk semua orang di room yang di-host anggota itu atau di mejanya di Main online, dan menambahkan pembuat paket, XP 50% lebih banyak, serta meja khusus anggota. Paket satuan atau bundel tidak dijual, dan sadapan serta Intel tidak pernah dijual.',
      },
    ],
  },
  facts: {
    eyebrow: 'Sekilas',
    title: 'Lembar fakta',
    labels: {
      name: 'Nama',
      developer: 'Pengembang',
      genre: 'Genre',
      platforms: 'Platform',
      players: 'Pemain',
      release: 'Rilis',
      price: 'Harga',
      membership: 'Keanggotaan',
      languages: 'Bahasa',
      age: 'Usia',
      website: 'Situs web',
      stores: 'Unduh',
      community: 'Komunitas',
      press: 'Kontak pers',
    },
    developer: 'SpySocial LLC, Pennsylvania, AS',
    genre: 'Game pesta deduksi sosial',
    platforms: 'iPhone, iPad, serta ponsel dan tablet Android. Pemain iPhone dan Android bisa main bersama.',
    players: '3 sampai 21 di room pribadi. Main online: meja berisi 4 atau 8.',
    release: (_day, out) =>
      out
        ? `Versi 2.2 sudah hadir, sebagai update gratis di App Store dan Google Play.`
        : `Versi 2.2 segera hadir. SpySocial sudah ada di App Store dan Google Play, dan 2.2 adalah update gratis.`,
    price: 'Gratis diunduh dan dimainkan. Tanpa iklan.',
    membership: (month, year, life) =>
      `Opsional, dan satu-satunya yang dijual: keanggotaan bulanan seharga ${month} per bulan atau tahunan seharga ${year} per tahun (diperpanjang sampai dibatalkan), atau keanggotaan seumur hidup seharga ${life}, sekali bayar. Harga AS; berbeda di tiap negara. Paket satuan atau bundel tidak dijual.`,
    languages:
      'Inggris, Spanyol, Rusia, Prancis, Portugis Brasil, Indonesia, Hindi, Bengali, Arab, Mandarin Sederhana. Semua kecuali tiga yang pertama ditandai Beta di aplikasi.',
    age: '13 tahun ke atas',
    press: '<email/>, dengan “Press” di subjek',
  },
  assets: {
    eyebrow: 'Unduhan',
    title: 'Logo dan screenshot',
    sub: 'Silakan pakai di artikel dan video tentang SpySocial.',
    logoInk: 'Logo untuk latar terang',
    logoCream: 'Logo untuk latar gelap',
    icon: 'Ikon aplikasi',
    banner: 'Banner',
    shotsTitle: 'Screenshot',
    shotsSub: 'Dari halaman toko versi 2.2, dengan teks dalam bahasa halaman ini. Pilih bahasa lain di bagian atas halaman untuk set lainnya.',
    file: (what, format) => `${what}, ${format}`,
  },
  safety: {
    eyebrow: 'Untuk orang tua dan platform',
    title: 'Keamanan',
    points: [
      'SpySocial untuk usia 13 tahun ke atas.',
      'Pemain hanya bisa chat di dalam room atau grup, dengan orang-orang di dalamnya. Tidak ada pesan langsung.',
      'Filter chat memblokir hinaan dan ancaman. Di room mana pun yang ada pemain di bawah 18 tahun, link, alamat email, nomor telepon, dan akun media sosial diblokir untuk semua orang.',
      'Di meja Main online, orang asing melihat warna Agen, bukan nama.',
      'Pemain, pesan, gambar, atau paket apa pun bisa dilaporkan, dan siapa pun bisa diblokir. Setiap laporan dibaca oleh manusia dalam 24 jam, dan laporan tentang keselamatan anak atau yang melibatkan pemain di bawah 18 tahun didahulukan.',
    ],
  },
  contact: {
    title: 'Kontak pers',
    text: 'Wawancara, akses untuk ulasan, atau pertanyaan soal memainkan SpySocial di kanalmu: kirim email ke <email/> dengan “Press” di subjek.',
  },
}

export default id
