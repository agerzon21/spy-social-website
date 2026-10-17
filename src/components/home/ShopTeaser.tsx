import hoodieBack from '../../assets/home/merch/hoodie-back.svg'
import teeBack from '../../assets/home/merch/tee-back.svg'
import { useT } from '../../i18n'
import { SHOP_URL } from '../../lib/shop'
import ActionLink from '../ui/ActionLink'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

/** The merch shop (shown while LIVE.merchShop is on; same tab, like the header's and footer's Shop links). */
const ShopTeaser = () => {
  const t = useT().home.shop
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
          <img src={hoodieBack} alt={t.hoodieAlt} width={320} height={237} loading="lazy" decoding="async" />
          <img src={teeBack} alt={t.teeAlt} width={320} height={206} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}

export default ShopTeaser
