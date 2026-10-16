import hoodieBack from '../../assets/home/merch/hoodie-back.svg'
import teeBack from '../../assets/home/merch/tee-back.svg'
import { SHOP_URL } from '../../lib/shop'
import ActionLink from '../ui/ActionLink'
import DisplayHeading from '../ui/DisplayHeading'
import Eyebrow from '../ui/Eyebrow'
import ui from '../ui/ui.module.css'
import s from './home.module.css'

/** The merch shop (shown while LIVE.merchShop is on; same tab, like the header's and footer's Shop links). */
const ShopTeaser = () => (
  <section className={`${s.section} ${s.shop}`} aria-labelledby="shop-title">
    <div className={`${ui.wrap} ${s.shopGrid}`}>
      <div>
        <Eyebrow>The shop</Eyebrow>
        <DisplayHeading id="shop-title">Wear the alibi</DisplayHeading>
        <p className={s.shopText}>
          The TRUST NO ONE. hoodie, the I'm Not the Spy tee and more. Printed and shipped by our shop partner.
        </p>
        <ActionLink href={SHOP_URL}>Visit the shop</ActionLink>
      </div>
      <div className={s.art}>
        <img src={hoodieBack} alt="The hoodie's back print: TRUST NO ONE. with the spy head peeking over the top" width={320} height={237} loading="lazy" decoding="async" />
        <img src={teeBack} alt="The tee's back print: (I WAS THE SPY.)" width={320} height={206} loading="lazy" decoding="async" />
      </div>
    </div>
  </section>
)

export default ShopTeaser
