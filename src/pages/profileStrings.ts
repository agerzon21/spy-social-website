/**
 * The words of /profile/<username> (pages/Profile, archive-holder-1110), in the site's ten languages (the other eight
 * added by site-qa-1113, in each language's words for the Archive). The buttons are the site's common ones (useT().common).
 */
import type { LangCode } from '../i18n'

const en = {
  eyebrow: 'Player profile',
  phone: 'Profiles live in the SpySocial app. If this player keeps their profile public, the app shows their agent, title and showcase.',
  desktop: 'Profiles live in the SpySocial app. Open this link on your phone to see it there.',
  bad: 'This profile link isn’t right.',
  badText: 'Check the username in the link and try again.',
  back: 'Back to the Archive',
}

export type ProfileStrings = typeof en

const ru: ProfileStrings = {
  eyebrow: 'Профиль игрока',
  phone: 'Профили открываются в приложении SpySocial. Если игрок держит профиль открытым, там видны его агент, титул и витрина.',
  desktop: 'Профили открываются в приложении SpySocial. Откройте эту ссылку на телефоне.',
  bad: 'Ссылка на профиль неверна.',
  badText: 'Проверьте имя пользователя в ссылке и попробуйте снова.',
  back: 'Вернуться в Архив',
}

const es: ProfileStrings = {
  eyebrow: 'Perfil de jugador',
  phone: 'Los perfiles están en la app de SpySocial. Si este jugador tiene su perfil público, la app muestra su agente, su título y su vitrina.',
  desktop: 'Los perfiles están en la app de SpySocial. Abre este enlace en tu teléfono para verlo allí.',
  bad: 'Este enlace de perfil no es correcto.',
  badText: 'Revisa el nombre de usuario del enlace y vuelve a intentarlo.',
  back: 'Volver al Archivo',
}

const ptBR: ProfileStrings = {
  eyebrow: 'Perfil do jogador',
  phone: 'Os perfis ficam no app SpySocial. Se este jogador deixa o perfil público, o app mostra o agente, o título e a vitrine dele.',
  desktop: 'Os perfis ficam no app SpySocial. Abra este link no celular para ver lá.',
  bad: 'Este link de perfil não está certo.',
  badText: 'Confira o nome de usuário no link e tente de novo.',
  back: 'Voltar ao Arquivo',
}

const fr: ProfileStrings = {
  eyebrow: 'Profil du joueur',
  phone: 'Les profils se trouvent dans l’app SpySocial. Si ce joueur garde son profil public, l’app affiche son agent, son titre et sa vitrine.',
  desktop: 'Les profils se trouvent dans l’app SpySocial. Ouvre ce lien sur ton téléphone pour le voir.',
  bad: 'Ce lien de profil n’est pas valide.',
  badText: 'Vérifie le nom d’utilisateur dans le lien et réessaie.',
  back: 'Retour aux Archives',
}

const id: ProfileStrings = {
  eyebrow: 'Profil pemain',
  phone: 'Profil ada di aplikasi SpySocial. Kalau pemain ini membuat profilnya publik, aplikasi menampilkan agen, gelar, dan etalasenya.',
  desktop: 'Profil ada di aplikasi SpySocial. Buka link ini di HP-mu untuk melihatnya di sana.',
  bad: 'Link profil ini tidak benar.',
  badText: 'Periksa nama pengguna di link, lalu coba lagi.',
  back: 'Kembali ke Arsip',
}

const hi: ProfileStrings = {
  eyebrow: 'खिलाड़ी की प्रोफ़ाइल',
  phone: 'प्रोफ़ाइल SpySocial ऐप में होती हैं। अगर इस खिलाड़ी की प्रोफ़ाइल सार्वजनिक है, तो ऐप उसका एजेंट, टाइटल और शोकेस दिखाता है।',
  desktop: 'प्रोफ़ाइल SpySocial ऐप में होती हैं। उसे देखने के लिए यह लिंक अपने फ़ोन पर खोलें।',
  bad: 'यह प्रोफ़ाइल लिंक सही नहीं है।',
  badText: 'लिंक में यूज़रनेम जाँचें और फिर से कोशिश करें।',
  back: 'आर्काइव पर वापस',
}

const bn: ProfileStrings = {
  eyebrow: 'খেলোয়াড়ের প্রোফাইল',
  phone: 'প্রোফাইল থাকে SpySocial অ্যাপে। এই খেলোয়াড়ের প্রোফাইল পাবলিক হলে অ্যাপে তার এজেন্ট, টাইটেল আর শোকেস দেখা যায়।',
  desktop: 'প্রোফাইল থাকে SpySocial অ্যাপে। দেখতে এই লিংকটি আপনার ফোনে খুলুন।',
  bad: 'এই প্রোফাইল লিংকটি ঠিক নয়।',
  badText: 'লিংকের ইউজারনেমটি দেখে আবার চেষ্টা করুন।',
  back: 'আর্কাইভে ফিরুন',
}

const ar: ProfileStrings = {
  eyebrow: 'ملف اللاعب',
  phone: 'الملفات الشخصية موجودة في تطبيق SpySocial. إذا كان ملف هذا اللاعب عامًا، يعرض التطبيق عميله ولقبه وواجهة عرضه.',
  desktop: 'الملفات الشخصية موجودة في تطبيق SpySocial. يمكنك فتح هذا الرابط على هاتفك لرؤيته هناك.',
  bad: 'رابط الملف الشخصي هذا غير صحيح.',
  badText: 'يُرجى التحقق من اسم المستخدم في الرابط والمحاولة مرة أخرى.',
  back: 'العودة إلى الأرشيف',
}

const zhHans: ProfileStrings = {
  eyebrow: '玩家资料',
  phone: '个人资料在 SpySocial 应用里查看。如果这位玩家公开了资料，应用会显示其特工、称号和展示柜。',
  desktop: '个人资料在 SpySocial 应用里查看。请在手机上打开此链接查看。',
  bad: '这个个人资料链接不正确。',
  badText: '请检查链接里的用户名，然后重试。',
  back: '返回档案馆',
}

const BY_LANG: Partial<Record<LangCode, ProfileStrings>> = { en, ru, es, 'pt-BR': ptBR, fr, id, hi, bn, ar, 'zh-Hans': zhHans }

export function profileStrings(lang: LangCode): ProfileStrings {
  return BY_LANG[lang] ?? en
}
