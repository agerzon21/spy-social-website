import { useEffect } from 'react'
import { useLang, type LangCode } from '../i18n'

/**
 * Chakra's toast regions in the reader's language (crawl2-1114). Chakra 2 names its six live regions
 * "Notifications-top", "Notifications-bottom-left"... in English, with no option to change them, so screen readers
 * heard English on every page. This names them in the page's language once Chakra's portal has put them in, and again
 * on a language switch. Chakra never writes the label again (it is the same value on every render), so it stays.
 */
const WORDS: Record<LangCode, { name: string; at: Record<string, string>; join: (name: string, at: string) => string }> = {
  en: { name: 'Notifications', at: { top: 'top', 'top-left': 'top left', 'top-right': 'top right', bottom: 'bottom', 'bottom-left': 'bottom left', 'bottom-right': 'bottom right' }, join: (n, a) => `${n}, ${a}` },
  ru: { name: 'Уведомления', at: { top: 'сверху', 'top-left': 'сверху слева', 'top-right': 'сверху справа', bottom: 'снизу', 'bottom-left': 'снизу слева', 'bottom-right': 'снизу справа' }, join: (n, a) => `${n}, ${a}` },
  es: { name: 'Notificaciones', at: { top: 'arriba', 'top-left': 'arriba a la izquierda', 'top-right': 'arriba a la derecha', bottom: 'abajo', 'bottom-left': 'abajo a la izquierda', 'bottom-right': 'abajo a la derecha' }, join: (n, a) => `${n}, ${a}` },
  fr: { name: 'Notifications', at: { top: 'en haut', 'top-left': 'en haut à gauche', 'top-right': 'en haut à droite', bottom: 'en bas', 'bottom-left': 'en bas à gauche', 'bottom-right': 'en bas à droite' }, join: (n, a) => `${n}, ${a}` },
  'pt-BR': { name: 'Notificações', at: { top: 'no topo', 'top-left': 'no topo à esquerda', 'top-right': 'no topo à direita', bottom: 'embaixo', 'bottom-left': 'embaixo à esquerda', 'bottom-right': 'embaixo à direita' }, join: (n, a) => `${n}, ${a}` },
  id: { name: 'Notifikasi', at: { top: 'atas', 'top-left': 'kiri atas', 'top-right': 'kanan atas', bottom: 'bawah', 'bottom-left': 'kiri bawah', 'bottom-right': 'kanan bawah' }, join: (n, a) => `${n}, ${a}` },
  'zh-Hans': { name: '通知', at: { top: '顶部', 'top-left': '左上', 'top-right': '右上', bottom: '底部', 'bottom-left': '左下', 'bottom-right': '右下' }, join: (n, a) => `${n}（${a}）` },
  hi: { name: 'सूचनाएँ', at: { top: 'ऊपर', 'top-left': 'ऊपर बाएँ', 'top-right': 'ऊपर दाएँ', bottom: 'नीचे', 'bottom-left': 'नीचे बाएँ', 'bottom-right': 'नीचे दाएँ' }, join: (n, a) => `${n}, ${a}` },
  ar: { name: 'الإشعارات', at: { top: 'في الأعلى', 'top-left': 'أعلى اليسار', 'top-right': 'أعلى اليمين', bottom: 'في الأسفل', 'bottom-left': 'أسفل اليسار', 'bottom-right': 'أسفل اليمين' }, join: (n, a) => `${n}، ${a}` },
  bn: { name: 'বিজ্ঞপ্তি', at: { top: 'উপরে', 'top-left': 'উপরে বাঁয়ে', 'top-right': 'উপরে ডানে', bottom: 'নিচে', 'bottom-left': 'নিচে বাঁয়ে', 'bottom-right': 'নিচে ডানে' }, join: (n, a) => `${n}, ${a}` },
}

const PREFIX = 'chakra-toast-manager-'

export default function ToastRegionLabels() {
  const { lang } = useLang()
  useEffect(() => {
    const w = WORDS[lang] ?? WORDS.en
    const label = () => {
      for (const el of document.querySelectorAll<HTMLElement>(`[id^="${PREFIX}"][role="region"]`)) {
        const at = el.id.slice(PREFIX.length)
        const text = w.join(w.name, w.at[at] ?? at)
        if (el.getAttribute('aria-label') !== text) el.setAttribute('aria-label', text)
      }
    }
    label()
    // Chakra's portal puts the regions in after the first render (and again should it mount anew).
    const watch = new MutationObserver(label)
    watch.observe(document.body, { childList: true, subtree: true })
    return () => watch.disconnect()
  }, [lang])
  return null
}
