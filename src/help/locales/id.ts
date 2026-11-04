import type { HelpText } from '../types'

/** Indonesian (id): everyday "kamu" like the app, sentence case; the app's words (warga, mata-mata, room, host, Main online, Cari permainan, Aksi, Tebak, Brankas, Pasar Gelap, Temuan Langka, sadapan, Intel). */
const id: HelpText = {
  title: 'Bantuan & FAQ',
  lede: 'Jawaban singkat soal cara main SpySocial, akunmu, hadiah, dan keanggotaan.',
  search: 'Cari bantuan',
  searchHint: 'Coba “voting” atau “tukar”',
  clear: 'Hapus',
  results: (n) => `${n} jawaban`,
  noResults: (q) => `Tidak ada yang cocok dengan “${q}”. Coba kata yang lebih pendek, atau kirim email ke kami.`,
  topics: 'Topik',
  stillStuck: 'Masih bingung? Email ke',
  sections: (o) => [
    {
      id: 'start',
      title: 'Mulai main',
      items: [
        {
          id: 'what-is-spysocial',
          q: 'Apa itu SpySocial?',
          a: [
            'Game pesta tipu-tipuan sosial gratis untuk 3 sampai 21 pemain. Sebagian besar pemain adalah warga yang tahu sebuah rahasia. Satu atau beberapa mata-mata tidak tahu dan berusaha membaur. Temukan mata-matanya, atau kelabui semua orang kalau kamu mata-matanya.',
            'Ada dua game: <b>Spy Talk</b>, di mana semua orang bertanya dan menjawab soal lokasi rahasia, dan <b>Spy Sketch</b>, di mana semua orang bergiliran menggambar kata rahasia.',
          ],
        },
        {
          id: 'how-many-players',
          q: 'Berapa pemain yang dibutuhkan?',
          a: [
            'Room privat dimainkan oleh 3 sampai 21 pemain.',
            '<b>Main online</b> mendudukkanmu di meja berisi 4 atau 8 pemain.',
            'Host memilih jumlah mata-mata, mengikuti jumlah pemain di room: dengan 8 pemain, bisa sampai 3 mata-mata.',
          ],
        },
        {
          id: 'is-it-free',
          q: 'Apakah SpySocial gratis?',
          a: [
            'Ya. Kedua game, Main online, room privat, dan Malam Permainan gratis, tanpa iklan.',
            `Keanggotaan opsional membuka paket premium dan beberapa tampilan untuk agenmu. Tidak ada yang kamu beli yang membantumu menang.${o.purchases ? '' : ' Keanggotaan mulai dijual dengan versi 2.2.'}`,
          ],
        },
        {
          id: 'start-a-game',
          q: 'Bagaimana cara mulai main?',
          a: [
            '<b>Dengan teman:</b> ketuk <b>Room privat</b>, lalu <b>Buat room</b>, dan bagikan kode room, kode QR, atau link undangan. Butuh minimal 3 pemain.',
            '<b>Dengan siapa saja:</b> ketuk <b>Main online</b>, lalu <b>Cari permainan</b>.',
            '<b>Baru pertama kali?</b> <b>Cara bermain</b> di Beranda punya intro 1 menit, panduan, glosarium, dan permainan latihan.',
          ],
        },
      ],
    },
    {
      id: 'how-to-play',
      title: 'Cara bermain',
      items: [
        {
          id: 'roles',
          q: 'Apa tugas warga dan mata-mata?',
          a: [
            '<b>Warga</b> melihat rahasianya: lokasi di Spy Talk, kata di Spy Sketch. Semua warga mendapat yang sama. Tunjukkan kamu tahu tanpa membocorkannya.',
            '<b>Mata-mata</b> melihat MATA-MATA. Dengarkan, bersikaplah seolah kamu juga tahu, dan tebak rahasianya sebelum ketahuan.',
            'Di <b>Mafia</b>, para mata-mata saling tahu dan punya chat pribadi. Di <b>Klasik</b>, setiap mata-mata main sendiri. Dengan 1 mata-mata, keduanya sama saja.',
          ],
        },
        {
          id: 'spy-talk',
          q: 'Bagaimana Spy Talk dimainkan?',
          a: [
            'Pertama, interogasi: bergiliran, setiap pemain mengajukan satu pertanyaan ke pemain berikutnya dan menjawab satu.',
            'Lalu diskusi bebas: ngobrol, kejar jawaban yang aneh, dan mulai voting.',
            'Bingung mau tanya apa? Kartu petunjuk di bawah layar punya satu pertanyaan. Menanyakan nama lokasi atau huruf pertamanya itu curang.',
          ],
        },
        {
          id: 'spy-sketch',
          q: 'Bagaimana Spy Sketch dimainkan?',
          a: [
            'Pemain bergiliran menggambar di satu papan tulis bersama. Warga memberi petunjuk tanpa menggambar katanya terang-terangan. Mata-mata menambahkan sesuatu yang samar yang bisa cocok.',
            'Setelah semua dapat giliran, voting dan tebakan mata-mata terbuka. Ronde berlanjut sampai permainan selesai.',
          ],
        },
        {
          id: 'voting',
          q: 'Bagaimana voting bekerja?',
          a: [
            'Buka <b>Aksi</b> dan ketuk <b>Voting</b>. Semua memilih satu pemain atau <b>Tidak memilih</b>, lalu konfirmasi. Pilihan yang sudah dikonfirmasi tidak bisa diubah.',
            '<b>Mayoritas:</b> seorang pemain gugur hanya kalau dipilih lebih dari separuh pemain yang masih bermain.',
            '<b>Suara terbanyak:</b> cukup dapat suara paling banyak, asalkan lebih banyak dari yang tidak memilih.',
            'Seri di posisi pertama tidak menggugurkan siapa pun, dan selalu butuh minimal 2 suara.',
            'Di meja Main online, setiap pemain bisa memulai satu voting dan menyebut siapa yang dituduh. Kalau voting menangkap mata-mata, semua yang sudah memakai jatahnya mendapatkannya kembali.',
          ],
        },
        {
          id: 'spy-guess',
          q: 'Bagaimana mata-mata menebak?',
          a: [
            'Mata-mata membuka <b>Aksi</b> dan mengetuk <b>Tebak</b>, lalu punya 60 detik untuk memilih rahasianya dari daftar sekitar 30 pilihan.',
            'Tebakan benar membuat semua mata-mata menang. Tebakan salah, atau waktu habis, membuat mata-mata itu gugur. Kalau dia yang terakhir, warga menang.',
            'Semua orang melihat siapa yang menebak, jadi kamu ketahuan.',
            'Kalau <b>Satu Kali Tebak</b> aktif (room privat), tim mata-mata hanya punya satu tebakan: salah sekali, seluruh tim kalah.',
          ],
        },
        {
          id: 'winning',
          q: 'Bagaimana tiap pihak menang?',
          a: [
            '<b>Warga</b> menang dengan menggugurkan semua mata-mata lewat voting, atau saat mata-mata terakhir salah menebak.',
            '<b>Mata-mata</b> menang dengan tebakan benar, saat waktu permainan habis, atau saat voting menyisakan mata-mata sebanyak warga.',
            '<b>Voting terakhir:</b> kalau waktu habis dan tersisa tepat satu mata-mata, semua memilih sekali lagi. Tangkap mata-matanya, warga menang. Ini aktif di Main online dan jadi pengaturan di room privat.',
          ],
        },
      ],
    },
    {
      id: 'ways-to-play',
      title: 'Pilihan bermain',
      items: [
        {
          id: 'play-online',
          q: 'Apa itu Main online?',
          a: [
            '<b>Cari permainan</b> mendudukkanmu di meja berisi 4 atau 8 pemain lain. Semua meja memakai aturan standar yang sama, tanpa host.',
            'Pemain yang tidak kamu kenal melihat warna Agen-mu, seperti Agen Toska, bukan namamu.',
            'Kamu butuh akun tersimpan (email terkonfirmasi, atau masuk dengan Apple atau Google) dan berusia minimal 13 tahun.',
            'Keluar dari permainan setelah peran dibagikan berarti jeda singkat dari Main online.',
          ],
        },
        {
          id: 'private-rooms',
          q: 'Bagaimana room privat bekerja?',
          a: [
            'Room yang dibuat pemain bersifat privat, untuk orang yang kamu kenal. Teman masuk dengan kode room, kode QR, atau link undangan. Tamu tanpa akun juga bisa masuk.',
            'Host mengatur aturannya: game, mata-mata, waktu, voting, dan paket. Pemain maksimal sampai 21, dan <b>Kunci room</b> mencegah pemain baru masuk.',
            'Semua memainkan paket yang sudah dibuka host.',
          ],
        },
        {
          id: 'game-night',
          q: 'Apa itu Malam Permainan?',
          a: [
            'Event online kami, di malam yang kami umumkan di aplikasi, biasanya pukul 20.00–22.00 waktu bagian timur AS. Ketuk <b>Main Sekarang</b> di kartu Malam Permainan di Beranda.',
            'Setiap malam punya paket, pengaturan, dan gelarnya sendiri. Tombol (i) di samping malam itu menampilkannya.',
            'Gratis, dan tidak ada yang kamu beli yang memperbesar peluangmu. Aturan lengkapnya: <gnr>aturan Malam Permainan</gnr> (bahasa Inggris).',
          ],
        },
        {
          id: 'practice-game',
          q: 'Apa itu permainan latihan?',
          a: [
            'Permainan sekitar 5 menit melawan agen AI, dengan pelatih, di <b>Cara bermain</b>. Kamu mendapat nilai A sampai F, dan bisa melanjutkan dari tempat terakhir.',
            'Sebelum kamu main Spy Talk atau Spy Sketch online, aplikasi mungkin memintamu lulus latihan game itu dengan nilai C atau lebih. Malam Permainan tidak pernah memintanya.',
          ],
        },
        {
          id: 'languages',
          q: 'Bisakah main dengan orang yang bicara bahasa lain?',
          a: [
            'SpySocial tersedia dalam 10 bahasa: Inggris, Spanyol, Rusia, Mandarin Sederhana, Hindi, Arab, Prancis, Bengali, Portugis Brasil, dan Indonesia.',
            ...(o.onePool
              ? [
                  'Setiap orang melihat permainan dalam bahasanya sendiri, termasuk rahasia dan petunjuknya, jadi satu meja bisa campur bahasa.',
                  o.autoTranslation
                    ? 'Pesan dalam bahasa lain diterjemahkan ke bahasamu otomatis. Untuk menerjemahkan hanya saat diketuk, matikan <b>Terjemahkan pesan otomatis</b> di Pengaturan.'
                    : 'Ketuk <b>Terjemahkan</b> pada pesan untuk membacanya dalam bahasamu.',
                ]
              : ['Di room privat, host memilih bahasa permainan untuk rahasia dan petunjuk.']),
          ],
        },
      ],
    },
    {
      id: 'in-game',
      title: 'Saat bermain',
      items: [
        {
          id: 'wax-seal',
          q: 'Apa itu Segel Lilin?',
          a: [
            'Segel di kanan atas layar permainan. Ketuk kapan saja untuk membuka chat lengkap, catatanmu, dan info permainan. Titik merah berarti ada pesan baru.',
            'Ketuk foto pemain untuk bertanya padanya di chat. Geser pesan untuk membalasnya.',
            'Berbohong dan menggertak itu bagian dari permainan. Menyebut rahasianya terang-terangan, bukan.',
          ],
        },
        {
          id: 'notes',
          q: 'Bagaimana catatan bekerja?',
          a: [
            'Tekan lama foto pemain untuk membuka catatanmu tentang dia.',
            '<b>Papan</b> memilah pemain ke Curiga, Belum tahu, dan Percaya. Di Spy Talk, <b>Riwayat</b> menampilkan pertanyaan dan jawaban tiap pemain.',
            'Mata-mata punya papan temuan sendiri: <b>Temuanku</b>, dengan Mungkin, Ya, dan Bukan.',
            'Catatanmu pribadi, tersimpan di ponselmu, dan terhapus saat permainan selesai.',
          ],
        },
        {
          id: 'leave-rejoin',
          q: 'Bisakah keluar lalu kembali ke permainan?',
          a: [
            'Kalau keluar, kamu ke Beranda, dan kartu room-mu punya tombol <b>Kembali</b>. Kursimu tetap disimpan selama kamu pergi.',
            'Host bisa mengetuk <b>Akhiri permainan</b> untuk menghentikannya bagi semua orang. Tidak ada yang menang.',
            'Di meja Main online, keluar setelah peran dibagikan berarti jeda singkat dari Main online.',
          ],
        },
      ],
    },
    {
      id: 'friends',
      title: 'Teman & grup',
      items: [
        {
          id: 'add-friends',
          q: 'Bagaimana cara menambah teman?',
          a: [
            '<b>Langsung:</b> tunjukkan <b>Kode Teman</b>-mu dan biarkan dia memindainya di SpySocial. Kodenya sering berganti, jadi tangkapan layar cepat tidak berlaku.',
            '<b>Dari permainan privat</b> yang kalian mainkan bersama dalam 24 jam terakhir.',
            '<b>Khusus dewasa:</b> dari meja publik, atau lewat username yang persis, kalau dia mengizinkan.',
            'Pertemanan berlaku dua arah. Kamu bisa menghapus atau memblokir teman kapan saja, dan dia tidak diberi tahu. Tidak ada pesan pribadi.',
          ],
        },
        {
          id: 'parties',
          q: 'Apa itu grup?',
          a: [
            'Seorang ketua dan teman-teman yang main bersama, sampai 21 orang. Perlu keanggotaan untuk memulainya. Jika ketua pergi, peran ketua lebih dulu pindah ke orang yang punya keanggotaan.',
            'Di meja Main online dan Malam Permainan, grup mengisi paling banyak setengah meja, ditandai untuk semua: sampai 2 orang di meja berisi 4, sampai 4 orang di meja berisi 8.',
            'Di meja 12 kursi Malam Permainan, sampai 6 orang. Anggota grup yang mencari sendiri juga dihitung: bersama-sama tak pernah lebih dari setengah meja.',
            'Grup mana pun bisa membuka room privat bersama, dan grup yang terlalu besar untuk satu meja main di sana.',
            'Chat grup mengikuti aturan yang sama dengan semua chat. Untuk melaporkan pesan, tekan lama pesan itu.',
          ],
        },
        {
          id: 'privacy-friends',
          q: 'Siapa yang bisa melihat aku online, atau mengundangku?',
          a: [
            'Kamu yang menentukan di <b>Privasi & Teman</b>: siapa yang bisa menambahmu, apakah teman melihatmu online, dan siapa yang bisa mengundangmu ke room dan grup.',
            'Teman hanya melihat Online, Main online, Di room privat, atau Di Malam Permainan, bukan room yang mana. Tidak ada yang bisa melihat daftar temanmu.',
            'Orang dewasa bisa punya profil publik dan pengikut. Pemain di bawah 18 tahun tidak.',
          ],
        },
      ],
    },
    {
      id: 'trading',
      title: 'Tukar item',
      items: [
        {
          id: 'who-can-trade',
          q: 'Siapa yang bisa tukar, dan apa saja?',
          a: [
            'Kamu bertukar dengan teman, di dalam aplikasi. Kamu butuh akun berusia minimal 7 hari, email terkonfirmasi, dan 3 permainan yang dihitung (permainan selesai yang masuk ke statistikmu, dengan minimal 2 akun tersimpan lain di ponsel lain).',
            'Tiap pihak menawarkan sampai 10 item, dan keduanya mengonfirmasi sebelum pertukaran terjadi. Pertukaran besar meminta kode yang kami kirim lewat email.',
            'Aplikasi menandai item yang bisa ditukar. Keanggotaan dan isinya, hadiah level, dan item dari game arkade tidak pernah bisa.',
            `Intel hanya bisa ditukar antar orang dewasa${o.launch ? '' : ', mulai peluncuran 2.2 tanggal 8 Desember'}.`,
            'Membeli atau menjual item, Intel, atau akun dengan uang sungguhan melanggar aturan.',
          ],
        },
        {
          id: 'trade-protection',
          q: 'Apa itu perlindungan 7 hari? Bisakah membatalkan pertukaran?',
          a: [
            'Yang kamu dapat dari pertukaran dilindungi selama 7 hari. Item bisa langsung dipakai, tapi belum bisa ditukar, dihancurkan, atau dipakai untuk Tukar Tambah, dan Intel yang diterima belum bisa dipakai.',
            'Dalam 7 hari itu kamu bisa membatalkan pertukaranmu, sekali tiap 90 hari. Semua pertukaranmu yang masih dilindungi dibatalkan, dan pertukaranmu dijeda 30 hari.',
            'Setelah 7 hari, pertukaran bersifat final. Kami juga bisa membatalkan pertukaran karena pencurian akun atau penipuan.',
          ],
        },
        {
          id: 'trade-deleted-account',
          q: 'Bagaimana kalau seseorang menghapus akunnya setelah bertukar?',
          a: [
            'Kalau pemain lain menghapus akunnya dalam 7 hari, pertukaran dibatalkan: kamu mendapat kembali yang kamu berikan, dan yang kamu terima darinya diambil kembali.',
            'Kalau kamu menghapus akunmu dalam 7 hari, yang kamu terima kembali ke pemain yang memberikannya.',
          ],
        },
        {
          id: 'trading-under-18',
          q: 'Bisakah pemain di bawah 18 tahun bertukar?',
          a: [
            'Bisa, dengan batasan: hanya item dengan item, dan hanya dengan teman yang ditambahkan langsung dengan Kode Teman.',
            'Tanpa hadiah, tanpa Intel, tanpa sadapan yang belum dibuka, dan tidak bisa membeli atau menjual di Pasar Gelap.',
            'Di iPhone, pemain di bawah 18 tahun belum bisa bertukar sampai ada versi aplikasi yang meminta izin orang tua lewat Apple.',
          ],
        },
        {
          id: 'trading-paused',
          q: 'Kenapa pertukaranku dijeda?',
          a: [
            'Pertukaran dijeda sebentar setelah email atau cara masuk berubah, setelah masuk dari perangkat baru, setelah kamu membatalkan pertukaranmu (30 hari), atau saat kamu menguncinya sendiri.',
            'Jeda karena perangkat baru berlangsung 24 jam; karena perubahan email atau cara masuk, 3 hari.',
            'Ini melindungi itemmu kalau ada orang lain yang masuk ke akunmu.',
            'Kami juga bisa menjeda pertukaran sebuah akun, untuk melindunginya atau selama kami memeriksa dugaan penipuan. Itu menutup penawaran dan item yang dipasang di Pasar Gelap, dan yang ditahan kembali ke akun. Tidak ada yang dibuka lagi saat jeda berakhir: kamu perlu memasangnya lagi.',
            'Jika kami mengeluarkan akunmu dari semua perangkat tanpa menjeda pertukaran, penawaran dan item yang kamu pasang di Pasar Gelap sebelum itu menunggu dan tidak terpenuhi. Masuk lagi untuk membatalkannya atau mengubah harga item.',
          ],
        },
      ],
    },
    {
      id: 'black-market',
      title: 'Pasar Gelap & Temuan Langka',
      items: [
        {
          id: 'what-is-black-market',
          q: 'Apa itu Pasar Gelap dan Temuan Langka?',
          a: [
            'Pasar Gelap, di <b>Brankas</b>, adalah tempat orang dewasa membeli dan menjual item yang bisa ditukar dengan Intel, tidak pernah dengan uang.',
            '<b>Item:</b> pasang penawaran beli atau jual di harga pilihanmu. Penawaran itu bertemu harga terbaik di sisi lain.',
            '<b>Temuan Langka:</b> setiap item Unik dipasang sendiri, dengan harga, dan penjual bisa menerima tawaran yang lebih rendah.',
            'Sadapan yang belum dibuka juga dijual di sana, per tingkat. Tidak ada yang bisa melihat siapa pembeli atau penjualnya.',
          ],
        },
        {
          id: 'black-market-who',
          q: 'Siapa yang bisa memakai Pasar Gelap?',
          a: [
            'Orang dewasa yang bisa bertukar: akun minimal 7 hari, email terkonfirmasi, 3 permainan yang dihitung, dan pertukaran tidak sedang dijeda.',
            'Pemain di bawah 18 tahun bisa melihat, tapi tidak bisa membeli, menjual, atau menawar.',
            ...(o.launch ? [] : ['Intel mulai berpindah di sana saat peluncuran 2.2, tanggal 8 Desember. Sampai saat itu, kamu bisa melihat-lihat.']),
          ],
        },
        {
          id: 'black-market-fees',
          q: 'Berapa biaya, batas, dan harga minimumnya?',
          a: [
            'Setiap item yang terjual kena biaya 2% (paling banyak 5.000 Intel), yang dihapus dari permainan.',
            'Tidak ada tawaran yang boleh di bawah harga minimum item: nilai hancur satu salinannya. Untuk sadapan yang belum dibuka, itu rata-rata tingkatnya.',
            'Anggota bisa punya 8 penawaran terbuka sekaligus, yang lain 4. Selama penawaran terbuka, Intel atau itemnya ditahan (item tetap bisa dipakai).',
            'Kamu bisa menghentikan penawaran kapan saja dan mengambil sisanya.',
          ],
        },
        {
          id: 'black-market-protection',
          q: 'Apakah penjualan di Pasar Gelap dilindungi?',
          a: [
            'Penjualan di Item langsung final.',
            'Item Unik yang dibeli di Temuan Langka dilindungi 3 hari: tidak bisa ditukar, dipasang, dihancurkan, atau dipakai Tukar Tambah, dan Intel penjual menunggu. Dalam waktu itu penjualan bisa dibatalkan, seperti pertukaran.',
            'Kalau pembeli atau penjual menghapus akunnya dalam 3 hari itu, penjualan dibatalkan: pembeli mendapat Intel-nya kembali, atau penjual mendapat item Unik-nya kembali.',
          ],
        },
      ],
    },
    {
      id: 'rewards',
      title: 'Sadapan & Intel',
      items: [
        {
          id: 'intercepts',
          q: 'Apa itu sadapan?',
          a: [
            'Hadiah tersegel yang kamu dapat dengan bermain. Masing-masing berisi satu item kosmetik acak, seperti tampilan untuk agenmu atau perayaan.',
            'Sadapan tidak pernah dijual dengan uang, dan keanggotaan tidak memberi lebih banyak atau peluang lebih baik.',
            'Sebelum kamu membukanya, aplikasi menampilkan peluang pastinya di <b>Peluang</b>.',
          ],
        },
        {
          id: 'intercept-tiers',
          q: 'Apa saja tingkat sadapan?',
          a: [
            'Lima tingkat, dari yang terendah: <b>Terbatas</b>, <b>Konfidensial</b>, <b>Rahasia</b>, <b>Sangat Rahasia</b>, dan <b>Enigma</b>.',
            'Tingkatnya ditetapkan saat kamu mendapatkannya. Makin tinggi tingkatnya, makin bagus peluangnya.',
            'Item <b>Unik</b> adalah salinan dengan warna dan nomor yang tidak dimiliki salinan lain.',
          ],
        },
        {
          id: 'earn-intercepts',
          q: 'Bagaimana cara mendapat sadapan?',
          a: [
            '<b>Kemenangan:</b> setiap 10 kemenangan di Main online memberimu 5 sadapan, salah satunya tingkat Rahasia atau lebih.',
            '<b>Harian:</b> permainan Main online pertamamu tiap hari memberi satu, dan streak panjang menambah lagi (tiap hari ke-30 berturut-turut, satu Enigma).',
            '<b>Malam Permainan:</b> para pemenang malam itu mendapat satu Enigma.',
            `<b>Kode dan hadiah:</b> kode dari kreator atau dari kami berlaku sekali per akun, dan sadapannya terbuka setelah permainan Main online pertamamu yang dihitung. Kami juga memberi sebagian sebagai hadiah.${o.launch ? ' Sadapan dari kode atau hadiah hanya untukmu: tidak bisa ditukar atau dijual.' : ''}`,
            'Room privat tidak memberi sadapan.',
            ...(o.launch
              ? []
              : ['Sebelum 2.2 terbuka untuk semua orang, sadapan dimulai dari awal: yang didapat di versi uji coba dihapus. Pin Beta dan apa pun yang dibeli di toko tetap ada.']),
          ],
        },
        {
          id: 'duplicates',
          q: 'Apa yang bisa kulakukan dengan duplikat?',
          a: [
            '<b>Hancurkan</b> salinan duplikat untuk mendapat Intel, sebanyak yang ditampilkan aplikasi.',
            '<b>Tukar Tambah:</b> 5 duplikat dari satu kelangkaan memberimu 1 item acak dari kelangkaan berikutnya, dan 10 duplikat Legendaris memberimu satu item Unik.',
            'Hanya duplikat yang dihitung, bukan salinan pertamamu atau item Unik.',
            'Salinan yang kamu beli atau dapat dari pertukaran dihitung sebagai duplikat jika kamu punya salinan lain dari item itu. Satu-satunya salinanmu selalu tetap ada.',
          ],
        },
        {
          id: 'intel',
          q: 'Apa itu Intel?',
          a: [
            'Mata uang yang kamu dapat dengan bermain: dari permainanmu, permainan pertama tiap hari dan streak harian, serta dari menghancurkan duplikat.',
            'Streak-mu: satu permainan Main online sehari menjaganya. Permainan yang kamu mulai sebelum hari baru juga menjaganya, walau selesai setelahnya.',
            'Intel tidak pernah dijual dan tidak bernilai uang. Orang dewasa memakainya di Pasar Gelap dan bisa menukarnya dengan orang dewasa lain.',
            'Setiap perubahan Intel-mu tercatat sebagai satu baris di catatan Intel-mu, beserta alasannya.',
          ],
        },
        {
          id: 'verifying',
          q: 'Kenapa hadiah bertuliskan “Memverifikasi”?',
          a: [
            'Mulai 8 Desember 2026, pemeriksaan permainan adil kami bisa menahan hadiah baru sebuah akun sampai 72 jam selama tim kami memeriksa tanda kuat farming, bot, atau curang.',
            'Kamu bisa meminta peninjauan di aplikasi.',
          ],
        },
        {
          id: 'missing-item',
          q: 'Item atau sadapanku hilang',
          a: [
            'Mungkin ditahan oleh penawaran terbuka di Pasar Gelap. Kamu bisa menghentikan penawaran kapan saja.',
            'Mungkin sudah kamu hancurkan atau pakai untuk Tukar Tambah.',
            'Pertukaran yang dibatalkan mengembalikannya ke pemain yang memberikannya.',
            'Saat keanggotaan berakhir atau dananya dikembalikan, yang datang bersamanya tidak lagi tersedia.',
            ...(o.launch ? [] : ['Sadapan dari versi uji dan item-itemnya dihapus sebelum 2.2 dibuka untuk semua.']),
            'Bukan semua itu? Email ke <email/> dengan nama penggunamu, nama itemnya, dan kapan terakhir kamu melihatnya.',
          ],
        },
        {
          id: 'tester-rewards',
          q: 'Di mana hadiah penguji betaku?',
          a: [
            o.launch
              ? 'Hadiahnya sudah ditambahkan saat peluncuran 2.2 dan jadi milikmu: <b>Pin Beta</b>, gelar <b>Penguji Beta</b> dan <b>Penguji Lapangan</b>, 10 sadapan dari setiap tingkat, dan keanggotaan 1 bulan. Kartu terima kasih muncul saat kamu pertama kali membuka aplikasi setelah peluncuran.'
              : 'Hadiahnya datang saat peluncuran 2.2 pada 8 Desember, di kartu terima kasih saat kamu membuka aplikasi, dan jadi milikmu: <b>Pin Beta</b>, gelar <b>Penguji Beta</b> dan <b>Penguji Lapangan</b>, 10 sadapan dari setiap tingkat, dan keanggotaan 1 bulan.',
            ...(o.launch ? [] : ['Yang kamu punya sekarang di versi uji hanya untuk pengujian dan dihapus sebelum peluncuran. Hadiahmu tidak bergantung padanya, selama kamu tetap memakai akun tersimpan yang sama.']),
            'Cara memakai pin: <b>Akun</b>, <b>Ubah agen</b>, <b>Aksesori</b>, <b>Pin Beta</b>, <b>Simpan</b>.',
            'Ada yang kurang? Email ke <email/> dengan nama penggunamu dan email yang kamu pakai selama pengujian. Akun tamu tidak ada di daftar, jadi biasanya penyebabnya akun yang berbeda.',
            ...(o.launch ? [] : ['Beta 2: ucapan terima kasih $10 dikirim lewat PayPal ke setiap pemain terkonfirmasi yang ikut sesi live satu jam penuh dan mengirim survei, dalam 7 hari setelah sesi, sama untuk iPhone dan Android.']),
          ],
        },
      ],
    },
    {
      id: 'membership',
      title: 'Keanggotaan',
      items: [
        {
          id: 'membership-includes',
          q: 'Apa saja isi keanggotaan?',
          a: [
            ...(o.purchases ? [] : ['Keanggotaan mulai dijual dengan versi 2.2.']),
            'Semua paket premium, termasuk yang baru. Semua orang memainkannya di room yang kamu host dan di mejamu di Main online.',
            'Buat paket sendiri di pembuat paket dan bagikan ke komunitas.',
            '+50% XP di setiap permainan, dan ruangan khusus member di Main online.',
            'Bingkai, label, dan gelar pangkatmu. Kamu bisa memimpin grup dan punya 8 penawaran terbuka di Pasar Gelap, bukan 4.',
            'Keanggotaan tidak pernah mengubah cara kamu bermain atau skormu. Paket gratis tetap gratis untuk semua.',
          ],
        },
        {
          id: 'membership-plans',
          q: 'Apa itu Agen, Elite, dan Dalang?',
          a: [
            '<b>Agen</b> adalah langganan paket bulanan, <b>Elite</b> yang tahunan, dan <b>Dalang</b> adalah keanggotaan seumur hidup: sekali bayar, tanpa perpanjangan.',
            'Dalang menambahkan ketiga bingkai logam, gelar Kartu Emas, perayaan Badai Emas, dan item agen yang hanya ada di keanggotaan seumur hidup.',
            'Seumur hidup berarti selama kami menyediakan SpySocial, bukan seumur hidupmu. Tidak ada uji coba gratis, dan keanggotaan tidak dibagikan lewat Berbagi Keluarga.',
          ],
        },
        {
          id: 'cancel-membership',
          q: 'Bagaimana perpanjangan otomatis dan pembatalan?',
          a: [
            'Agen dan Elite diperpanjang otomatis sampai kamu membatalkannya: di App Store, paling lambat 24 jam sebelum periodenya berakhir; di Google Play, sebelum tanggal perpanjangan. Manfaatnya tetap ada sampai akhir periode yang sudah dibayar.',
            '<b>iPhone atau iPad:</b> Pengaturan, namamu, Langganan, SpySocial.',
            '<b>Android:</b> aplikasi Google Play Store, foto profilmu, Pembayaran & langganan, Langganan, SpySocial.',
            '<b>Kelola langganan</b> di aplikasi membuka halaman yang sama. Menghapus aplikasi atau akun, atau membeli keanggotaan seumur hidup, tidak membatalkan langganan.',
          ],
        },
        {
          id: 'restore-purchases',
          q: 'Bagaimana cara memulihkan keanggotaanku?',
          a: [
            'Ketuk <b>Pulihkan pembelian</b> di aplikasi saat ponselmu masuk ke akun App Store atau Google Play yang dipakai untuk membayar.',
            'Keanggotaanmu pindah ke akun SpySocial yang sedang kamu pakai, dan lepas dari akun lain tempatnya dulu, termasuk akun yang sudah dihapus.',
          ],
        },
        {
          id: 'refunds',
          q: 'Bisakah aku minta pengembalian dana?',
          a: [
            'Apple dan Google mengurus pengembalian dana sesuai kebijakan mereka: minta ke Apple di reportaproblem.apple.com, atau ke Google lewat riwayat pesanan Google Play-mu.',
            'Kalau pembelian dikembalikan dananya, apa yang dibukanya akan dihapus.',
          ],
        },
      ],
    },
    {
      id: 'account',
      title: 'Akunmu',
      items: [
        {
          id: 'guest-or-saved',
          q: 'Akun tamu atau tersimpan: apa bedanya?',
          a: [
            '<b>Tamu</b> bisa langsung main di room privat. Akun tamu hanya ada di satu ponsel, dan keluar dari akun menghapusnya selamanya.',
            `Akun <b>tersimpan</b> (Apple, Google, atau emailmu${o.passwordless ? ', dengan kode yang kami kirim lewat email, tanpa kata sandi' : ''}) menyimpan nama, progres, dan keanggotaanmu di ponsel mana pun, dan membuka Main online, Malam Permainan, dan fitur teman.`,
            'Kamu bisa menyimpan akun tamu kapan saja dari halaman Akun, tanpa kehilangan apa pun.',
          ],
        },
        {
          id: 'lost-account',
          q: 'Akunku hilang. Bisa kembali?',
          a: [
            '<b>Akun tersimpan</b> kembali di ponsel mana pun: buka SpySocial dan masuk dengan cara yang sama seperti dulu (Apple, Google, atau email yang sama). Email lain, atau Sembunyikan Email Saya dari Apple, membuka akun baru yang kosong, dan sering kali itu sebabnya progres seperti hilang.',
            '<b>Akun tamu</b> hanya ada di satu ponsel. Kalau aplikasinya dihapus, ponselnya hilang, atau kamu keluar dari akun, akun itu hilang selamanya dan kami tidak bisa mengembalikannya.',
            'Keanggotaan tidak hilang: <b>Pulihkan pembelian</b> mengembalikannya. Kami tidak bisa menggabungkan akun atau memindahkan item antar-akun.',
            'Kalau dulu akunmu tersimpan, email ke <email/> dengan nama penggunamu dan cara kamu masuk, dan kami akan memeriksanya.',
          ],
        },
        {
          id: 'cant-sign-in',
          q: 'Aku tidak bisa masuk',
          a: [
            ...(o.passwordless ? ['Kamu bisa masuk dengan Apple, Google, atau kode 6 digit yang kami kirim lewat email. Sekarang tidak ada kata sandi lagi: kalau aplikasi masih memintanya, perbarui di App Store atau Google Play.'] : []),
            'Masuklah dengan cara yang sama seperti dulu. Email lain, atau Sembunyikan Email Saya dari Apple, membuka akun baru yang kosong, bukan akunmu.',
            'Kalau aplikasi menulis “Akun ini tidak bisa masuk”, email ke <email/> dari alamat akun itu dan kami akan memeriksanya.',
            'Kalau akun itu diblokir, email kami ke alamat tersebut berisi nomor referensi, alasannya, dan cara mengajukan banding.',
          ],
        },
        {
          id: 'code-not-arriving',
          q: 'Kode atau email masukku tidak sampai',
          a: [
            'Pengirimnya noreply@mail.spysocial.app. Cek folder spam, dan cek huruf demi huruf alamat yang kamu ketik.',
            o.passwordless
              ? 'Kamu bisa minta kode baru setelah 60 detik dengan <b>Kirim Ulang Kode</b>. Kode berlaku 1 jam: pakai yang ada di email terbaru. Kalau aplikasi bilang terlalu banyak email, tunggu beberapa menit lalu coba sekali.'
              : 'Kamu bisa minta email lain setelah 60 detik. Pakai yang terbaru.',
            'Kalau akunmu memakai Apple atau Google, kamu bisa masuk dengan itu.',
            'Masih belum ada? Email ke <email/> dengan alamat persisnya dan kira-kira kapan kamu mencoba, dan kami akan mengeceknya di sisi kami.',
          ],
        },
        {
          id: 'lost-email',
          q: 'Emailku hilang, atau aku ingin menggantinya',
          a: [
            'Aplikasi tidak bisa mengganti email akun tersimpan, jadi tulis ke <email/>.',
            'Kalau alamat lama masih bisa kamu baca, kirim dari alamat itu dan sebutkan alamat barunya. Kami juga akan mengirim email ke alamat baru, dan kamu membalasnya.',
            'Kalau alamat lama sudah tidak ada, coba dulu pulihkan lewat penyedia emailmu. Kalau akunmu juga punya masuk lewat Apple atau Google, kamu tetap bisa masuk dengan itu. Kami tidak bisa menjanjikan penggantian tanpa alamat lama, karena dari situlah kami tahu akun itu milikmu.',
            'Setelah email diganti, pertukaranmu dijeda 3 hari, dan penawaran serta item yang kamu pasang di Pasar Gelap ditutup.',
          ],
        },
        {
          id: 'stolen-account',
          q: 'Ada orang yang masuk ke akunku. Apa yang harus kulakukan?',
          a: [
            'Pertama, amankan email akun SpySocial-mu, dan akun Apple atau Google kalau kamu masuk dengan itu. Siapa pun yang bisa membaca email itu bisa masuk ke akunmu.',
            'Dalam 7 hari sejak pertukaran yang tidak kamu lakukan, ketuk <b>Batalkan Pertukaranku</b> di halaman pertukaranmu. Semua pertukaranmu yang masih dilindungi dibatalkan, dan pertukaranmu dijeda 30 hari. Ini bisa dilakukan sekali tiap 90 hari.',
            'Lalu tulis ke <email/> dengan nama penggunamu, kira-kira kapan kejadiannya, dan apa yang hilang. Beri tahu kami juga kalau menurutmu masih ada orang yang masuk ke akunmu.',
            'Setelah 7 hari, pertukaran bersifat final, dan penjualan Item di Pasar Gelap langsung final. Kami tidak akan pernah meminta kode masukmu.',
          ],
        },
        {
          id: 'change-name',
          q: 'Bagaimana cara mengganti nama?',
          a: [
            'Ganti nama tampilanmu kapan saja di halaman Akun, dan username sekali tiap 30 hari.',
            'Di meja Main online, pemain yang tidak kamu kenal melihat warna Agen-mu. Nama harus mengikuti <rules>aturan komunitas</rules>.',
          ],
        },
        {
          id: 'birth-year',
          q: 'Tahun lahirku salah. Bisa diperbaiki?',
          a: [
            'Tidak bisa diubah di aplikasi: email ke <email/> dari alamat email akunmu.',
            'Kami mengubahnya ke tahun yang lebih baru (usia lebih muda) atas permintaanmu atau orang tuamu, dan ke tahun yang lebih lama hanya dengan bukti usia.',
            'Kalau usia setelah dikoreksi di bawah 13 tahun, akunnya dihapus.',
          ],
        },
        {
          id: 'delete-account',
          q: 'Bagaimana cara menghapus akunku?',
          a: [
            'Di aplikasi: <b>Akun</b>, <b>Pengaturan</b>, <b>Hapus akun</b>. Untuk tamu, keluar dari akun sudah menghapusnya.',
            'Kamu juga bisa minta lewat email: lihat <delete>Hapus akunmu</delete>.',
            'Menghapus akun tidak membatalkan langganan: batalkan juga di toko aplikasi.',
          ],
        },
        {
          id: 'data-copy',
          q: 'Bisakah aku mendapat salinan dataku?',
          a: [
            'Bisa. Email ke <email/> dari alamat email akunmu. Kami mengirim salinannya dalam file yang bisa dibaca mesin (JSON), dalam waktu satu bulan.',
            'Akun tamu tidak punya email, jadi simpan dulu dengan email. Selengkapnya: <privacy>Kebijakan Privasi</privacy>.',
          ],
        },
      ],
    },
    {
      id: 'safety',
      title: 'Keamanan',
      items: [
        {
          id: 'report-block',
          q: 'Bagaimana cara melaporkan atau memblokir seseorang?',
          a: [
            'Tekan lama kartunya, di lobi, di permainan, atau di layar akhir, lalu pilih <b>Laporkan</b> atau <b>Blokir</b>.',
            'Setiap laporan dibaca oleh manusia, dan pemain itu tidak tahu siapa yang melapor.',
            'Memblokir memisahkan kalian: tidak ada yang bisa masuk ke room tempat yang lain berada. Buka blokir di Pengaturan, di <b>Pemain diblokir</b>.',
            'Berbohong dan menggertak itu bagian dari permainan dan tidak bisa dilaporkan.',
          ],
        },
        {
          id: 'moderators',
          q: 'Siapa yang memoderasi SpySocial?',
          a: [
            'Tim kami membaca setiap laporan dan memutuskan tindakannya. Moderator sukarelawan tepercaya membantu, dengan izin kami: di meja Malam Permainan, untuk pesan yang dilaporkan, dan untuk paket komunitas.',
            'Kamu bisa mengajukan banding atas keputusan apa pun lewat email ke <email/>.',
          ],
        },
        {
          id: 'under-18',
          q: 'Apa aturan untuk pemain di bawah 18 tahun?',
          a: [
            'Kamu harus berusia minimal 13 tahun untuk bermain.',
            'Di room mana pun yang ada pemain di bawah 18 tahun, link, email, nomor telepon, dan akun media sosial diblokir untuk semua orang.',
            'Pemain di bawah 18 tahun tidak punya profil publik dan tidak bisa diikuti, hanya bertukar item dengan item bersama teman dari Kode Teman, dan tidak bisa membeli atau menjual di Pasar Gelap.',
            'Di iPhone, teman, grup, dan tukar item menunggu versi aplikasi yang meminta izin orang tua lewat Apple.',
            'Orang tua dan wali: lihat <safety>halaman Keamanan</safety> kami.',
          ],
        },
        {
          id: 'under-13',
          q: 'Aplikasi menulis “SpySocial khusus pemain berusia 13 tahun ke atas”',
          a: [
            o.storeAgeSignals
              ? 'SpySocial khusus pemain berusia 13 tahun ke atas. Kami tidak memverifikasi atau memperkirakan usia: aplikasi mengandalkan tahun lahir yang kamu berikan dan rentang usia yang dibagikan Apple atau Google.'
              : 'SpySocial khusus pemain berusia 13 tahun ke atas. Kami tidak memverifikasi atau memperkirakan usia: aplikasi mengandalkan tahun lahir yang kamu berikan.',
            'Tahun lahir di bawah 13 tahun langsung menghapus akun, dan akun itu tidak bisa dipulihkan.',
            ...(o.storeAgeSignals ? ['Kalau akun Apple atau Google-mu menunjukkan usia yang salah, perbaiki di sana dan aplikasi akan mengizinkanmu bermain. Kalau orang tua atau wali menolak SpySocial lewat toko aplikasi, hanya mereka yang bisa mengubahnya.'] : []),
          ],
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Mengatasi masalah',
      items: [
        {
          id: 'update-not-showing',
          q: 'Pembaruan baru tidak muncul',
          a: [
            'Pembaruan diunduh di latar belakang. Tutup SpySocial sepenuhnya (geser keluar), buka, lalu tutup dan buka sekali lagi.',
            'Kalau itu versi baru di App Store atau Google Play, perbarui di sana.',
          ],
        },
        {
          id: 'cant-join',
          q: 'Kenapa aku tidak bisa masuk ke room?',
          a: [
            'Periksa kodenya: huruf A sampai Z dan angka 2 sampai 9 (0 dan 1 dibaca O dan I).',
            'Permainan yang sedang berlangsung tidak bisa dimasuki: tunggu sampai selesai. Room-nya juga bisa penuh atau dikunci.',
            'Kalau host mengganti kode, link dan kode QR lama tidak berlaku lagi. Kalau host mengeluarkanmu, kamu tidak bisa kembali ke room itu.',
            'Main online dan Malam Permainan butuh akun tersimpan.',
          ],
        },
        {
          id: 'connection-lost',
          q: 'Koneksiku putus saat bermain',
          a: [
            'Aplikasi tersambung lagi sendiri saat koneksimu kembali.',
            'Kalau kamu sampai di Beranda, ketuk <b>Kembali</b> di kartu room-mu. Kursimu tetap disimpan.',
          ],
        },
        {
          id: 'app-crashes',
          q: 'Aplikasinya terus crash',
          a: [
            'Perbarui SpySocial di App Store atau Google Play kalau ada pembaruan.',
            'Tutup sepenuhnya (geser keluar), buka, lalu tutup dan buka sekali lagi.',
            'Mulai ulang ponselmu dan cek masih ada ruang kosong: pembaruan bisa gagal di ponsel yang penuh.',
            'Masih crash? Pakai <b>Akun</b>, <b>Pengaturan</b>, <b>Laporkan masalah</b> kalau bisa dibuka, atau email ke <email/> dengan model ponsel, versi sistem, apa yang sedang kamu lakukan, dan waktunya beserta zona waktumu.',
            'Kalau kamu sedang bermain, aplikasi menyambungkanmu lagi, atau ketuk <b>Kembali</b> di kartu room-mu di Beranda. Kursimu tetap disimpan.',
          ],
        },
        {
          id: 'game-not-counted',
          q: 'Permainanku tidak dihitung',
          a: [
            'Permainan masuk rekam jejakmu kalau sudah berakhir dan kamu punya kursi, baik kamu main sampai selesai, keluar lebih awal (kalah), atau sedang pergi.',
            'Yang tidak dihitung: permainan yang diakhiri host, pembagian yang dibatalkan, permainan yang ditinggalkan, dikeluarkan dari room, kursi yang tidak pernah kamu datangi, atau menonton. Permainan tanpa pemenang bukan menang dan bukan kalah.',
            'Statistikmu memisahkan Main online dan room privat, jadi cek pengalih di bagian atas.',
            'Room privat tidak pernah memberi Intel atau sadapan, dan permainan Main online hanya memberinya kalau menghasilkan XP.',
            'Untuk bertukar, kamu butuh 3 permainan selesai yang dihitung dan tidak ditandai oleh pemeriksaan permainan adil kami, masing-masing dengan minimal 2 akun tersimpan lain di ponsel lain. Dua ponsel di satu Wi-Fi tidak masalah; akun lain di ponselmu sendiri tidak termasuk 2 akun itu.',
            'Kalau seharusnya dihitung, email ke <email/> dengan nama penggunamu, kode room (kalau ada), dan kapan kamu bermain.',
          ],
        },
        {
          id: 'notifications',
          q: 'Aku tidak menerima notifikasi',
          a: [
            'Izinkan notifikasi untuk SpySocial di pengaturan ponselmu.',
            'Di aplikasi, <b>Privasi & Teman</b> punya tombol untuk permintaan teman, undangan, dan paket baru.',
            'Notifikasi permainan datang saat kamu mencari di Main online, dan pengingat Malam Permainan saat kamu mengetuk <b>Ingatkan aku</b>. Tamu tidak menerimanya.',
            'Pemain di bawah 18 tahun tidak menerima notifikasi sosial antara pukul 22.00 dan 07.00.',
          ],
        },
        {
          id: 'contact-support',
          q: 'Bagaimana cara menghubungi dukungan?',
          a: [
            'Email ke <email/>. Untuk urusan akun, kirim dari alamat email akun itu. Setiap pesan dibaca oleh manusia.',
            'Untuk kabar terbaru, Malam Permainan, dan pemain yang mencari teman main, gabung ke <discord>Discord</discord> kami.',
          ],
        },
      ],
    },
  ],
}

export default id
