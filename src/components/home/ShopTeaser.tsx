import hoodieBack from '../../assets/home/merch/hoodie-back.svg'
import hoodieBackEs from '../../assets/home/merch/hoodie-back-es.svg'
import hoodieBackRu from '../../assets/home/merch/hoodie-back-ru.svg'
import teeBack from '../../assets/home/merch/tee-back.svg'
import teeBackEs from '../../assets/home/merch/tee-back-es.svg'
import teeBackRu from '../../assets/home/merch/tee-back-ru.svg'
import { useLang, useT } from '../../i18n'
import { SHOP_URL } from '../../lib/shop'
import ActionLink from '../ui/ActionLink'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

// The prints as the shop sells them: Russian and Spanish pages show their own editions (heights from each file's viewBox at 320 wide).
const ART = {
  en: { hoodie: [hoodieBack, 237], tee: [teeBack, 187] },
  ru: { hoodie: [hoodieBackRu, 221], tee: [teeBackRu, 175] },
  es: { hoodie: [hoodieBackEs, 198], tee: [teeBackEs, 200] },
} as const

/** The merch shop (shown while LIVE.merchShop is on; same tab, like the header's and footer's Shop links). */
const ShopTeaser = () => {
  const t = useT().home.shop
  const { lang } = useLang()
  const art = lang === 'ru' || lang === 'es' ? ART[lang] : ART.en
  return (
    <section className={`${s.section} ${s.shop}`} aria-labelledby="shop-title">
      <div className={`${ui.wrap} ${s.shopGrid}`}>
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <DisplayHeading id="shop-title">{t.title}</DisplayHeading>
          <p className={s.shopText}>{t.text}</p>
          <ActionLink href={SHOP_URL}>{t.cta}</ActionLink>
        </div>
        <div className={s.art}>
          <img src={art.hoodie[0]} alt={t.hoodieAlt} width={320} height={art.hoodie[1]} loading="lazy" decoding="async" />
          <img src={art.tee[0]} alt={t.teeAlt} width={320} height={art.tee[1]} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}

export default ShopTeaser
