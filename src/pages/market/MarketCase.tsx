import type { MarketPic } from '../../lib/marketArt'
import c from '../archive/displayCase.module.css'
import s from './market.module.css'

/**
 * An item's big picture on its Market page (market-art-1111): the Archive's display case (its dark room, light beam,
 * plinth and glass: pages/archive/displayCase.module.css) inside a frame in the item's rarity colour (as the app's
 * rarity tiles), the item alone in it. A title's plate hangs in the light (no plinth, no glass); a sealed Intercept
 * stands on the plinth. A backdrop or a celebration fills the picture: no case and no frame (owner Nov 11).
 */
export function MarketCase({ pic, alt }: { pic: MarketPic; alt: string }) {
  if (pic.kind === 'scene') {
    return <img className={s.caseScene} src={pic.src} alt={alt} width={640} height={640} decoding="async" />
  }
  const onPlinth = pic.kind === 'case' || pic.kind === 'file'
  return (
    <span className={c.box}>
      <span className={`${c.ring} ${s.caseRing}`} />
      <span className={c.inside}>
        <span className={c.room} />
        <span className={c.beam} />
        {onPlinth ? (
          <>
            <span className={c.column} />
            <span className={c.top} />
            {pic.kind === 'case' ? <span className={c.glass} /> : null}
            <img className={`${c.item} ${pic.big ? c.big : ''}`} src={pic.src} alt={alt} decoding="async" />
          </>
        ) : (
          <img className={s.casePlate} src={pic.src} alt={alt} decoding="async" />
        )}
      </span>
    </span>
  )
}
