import type { IconType } from 'react-icons'
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaBorderAll,
  FaCoins,
  FaDroplet,
  FaEnvelope,
  FaFire,
  FaGem,
  FaGlasses,
  FaHatCowboy,
  FaImage,
  FaQuoteLeft,
  FaShirt,
  FaWandMagicSparkles,
} from 'react-icons/fa6'
import type { Category, MoverList } from '../../lib/market'

/** Each catalogue shelf's mark (an item without a drawn picture wears its shelf's mark in its rarity's colour). */
export const CATEGORY_ICON: Record<Category, IconType> = {
  intercepts: FaEnvelope,
  outfits: FaShirt,
  hats: FaHatCowboy,
  glasses: FaGlasses,
  accessories: FaGem,
  hair: FaDroplet,
  facial_hair: FaDroplet,
  borders: FaBorderAll,
  backdrops: FaImage,
  celebrations: FaWandMagicSparkles,
  titles: FaQuoteLeft,
}

/** Each Market Movers list's mark. */
export const LIST_ICON: Record<MoverList, IconType> = { rises: FaArrowTrendUp, falls: FaArrowTrendDown, traded: FaFire, valuable: FaCoins }
