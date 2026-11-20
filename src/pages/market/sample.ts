/**
 * SAMPLE DATA for the Market's design preview: dev builds only, with ?sample=1 (src/lib/market.ts sampleOn). Every
 * page shows a SAMPLE DATA line while it's on. The items are real items on the books (names as the app has them on
 * Nov 10, 2026); every price, change and count is made up here from a fixed seed. Never shipped in a production build's
 * pages: only imported behind import.meta.env.DEV.
 */
import type { MarketDay, MarketItem, MarketItemPage, MarketList } from '../../lib/market'

type Row = [kind: 'avatar' | 'title', code: string, rarity: string, shred: number, name: string]
const ROWS: Row[] = [
  ['avatar', 'accessory_baguette', 'uncommon', 15, 'Baguette'], ['avatar', 'accessory_cipher_wheel', 'rare', 40, 'Cipher Wheel'],
  ['avatar', 'accessory_dog_tags', 'common', 5, 'Dog Tags'], ['avatar', 'accessory_jewelled_egg', 'mythic', 250, 'Jewelled Egg'],
  ['avatar', 'accessory_lipstick_camera', 'epic', 100, 'Lipstick Camera'], ['avatar', 'accessory_midnight_star', 'legendary', 600, 'The Midnight Star'],
  ['avatar', 'accessory_pocket_watch', 'epic', 100, 'Pocket Watch'], ['avatar', 'accessory_powder_compact', 'common', 5, 'Powder Compact'],
  ['avatar', 'accessory_room_key', 'uncommon', 15, 'Room Key'], ['avatar', 'accessory_snow_globe', 'rare', 40, 'Snow Globe'],
  ['avatar', 'accessory_spy_cat', 'legendary', 600, 'Spy Cat'], ['avatar', 'accessory_stolen_masterpiece', 'mythic', 250, 'Stolen Masterpiece'],
  ['avatar', 'background_enigma_rotor', 'mythic', 250, 'Enigma Rotor'], ['avatar', 'background_panel_break', 'legendary', 600, 'Panel Break'],
  ['avatar', 'background_pulp_burst', 'mythic', 250, 'Pulp Burst'], ['avatar', 'background_vault_zero', 'legendary', 600, 'Vault Zero'],
  ['avatar', 'celebration_getaway', 'legendary', 600, 'Getaway'], ['avatar', 'celebration_most_wanted', 'mythic', 250, 'Most Wanted'],
  ['avatar', 'celebration_red_carpet', 'mythic', 250, 'Red Carpet'], ['avatar', 'celebration_vanishing_act', 'legendary', 600, 'Vanishing Act'],
  ['avatar', 'facial_hair_color_apricot', 'uncommon', 15, 'Apricot'], ['avatar', 'facial_hair_color_gunmetal', 'common', 5, 'Gunmetal'],
  ['avatar', 'facial_hair_color_ice', 'rare', 40, 'Ice Blue'], ['avatar', 'facial_hair_color_violet', 'rare', 40, 'Violet'],
  ['avatar', 'frame_aurora', 'mythic', 250, 'Aurora'], ['avatar', 'frame_black_diamond', 'legendary', 600, 'Black Diamond'],
  ['avatar', 'frame_black_lace', 'uncommon', 15, 'Black Lace'], ['avatar', 'frame_censored', 'uncommon', 15, 'Censored'],
  ['avatar', 'frame_counterfeit', 'rare', 40, 'Counterfeit'], ['avatar', 'frame_houndstooth', 'rare', 40, 'Houndstooth'],
  ['avatar', 'frame_ledger', 'common', 5, 'Ledger Paper'], ['avatar', 'frame_lit_fuse', 'mythic', 250, 'Lit Fuse'],
  ['avatar', 'frame_safe_dial', 'epic', 100, 'Safe Dial'], ['avatar', 'frame_static', 'common', 5, 'TV Static'],
  ['avatar', 'frame_venetian_blinds', 'epic', 100, 'Venetian Blinds'], ['avatar', 'glasses_cat_burglar_mask', 'rare', 40, 'Cat Burglar Mask'],
  ['avatar', 'glasses_eye_patch', 'uncommon', 15, 'Eye Patch'], ['avatar', 'glasses_hypno_specs', 'epic', 100, 'Hypno Specs'],
  ['avatar', 'glasses_incognito', 'legendary', 600, 'Incognito'], ['avatar', 'glasses_infrared_specs', 'epic', 100, 'Infrared Specs'],
  ['avatar', 'glasses_mirror_shades', 'mythic', 250, 'Mirror Shades'], ['avatar', 'glasses_prism_shades', 'mythic', 250, 'Prism Shades'],
  ['avatar', 'glasses_safety_specs', 'uncommon', 15, 'Safety Specs'], ['avatar', 'glasses_snow_goggles', 'rare', 40, 'Snow Goggles'],
  ['avatar', 'glasses_steel_frames', 'common', 5, 'Wire Frames'], ['avatar', 'hair_color_cherry', 'uncommon', 15, 'Cherry'],
  ['avatar', 'hair_color_emerald', 'uncommon', 15, 'Emerald'], ['avatar', 'hair_color_ice', 'rare', 40, 'Ice Blue'],
  ['avatar', 'hair_color_midnight_blue', 'rare', 40, 'Midnight Blue'], ['avatar', 'hat_alpine', 'rare', 40, 'Alpine Hat'],
  ['avatar', 'hat_chauffeur_cap', 'common', 5, 'Chauffeur Cap'], ['avatar', 'hat_cycling_cap', 'uncommon', 15, 'Cycling Cap'],
  ['avatar', 'hat_diamond_tiara', 'mythic', 250, 'Diamond Tiara'], ['avatar', 'hat_earmuffs', 'uncommon', 15, 'Earmuffs'],
  ['avatar', 'hat_fez', 'rare', 40, 'Fez'], ['avatar', 'hat_headlamp', 'common', 5, 'Headlamp'],
  ['avatar', 'hat_legion_kepi', 'epic', 100, 'Legion Kepi'], ['avatar', 'hat_nom_de_plume', 'legendary', 600, 'Nom de Plume'],
  ['avatar', 'hat_peacock_fascinator', 'mythic', 250, 'Peacock Fascinator'], ['avatar', 'hat_veiled_pillbox', 'epic', 100, 'Veiled Pillbox'],
  ['avatar', 'local_extra_extra', 'mythic', 250, 'Extra! Extra!'], ['avatar', 'local_fingerprint_match', 'mythic', 250, 'Fingerprint Match'],
  ['avatar', 'local_laser_trap', 'legendary', 600, 'Laser Trap'], ['avatar', 'local_unmasked', 'legendary', 600, 'Unmasked'],
  ['avatar', 'outfit_ambassador_sash', 'epic', 100, 'Ambassador’s Sash'], ['avatar', 'outfit_color_forest', 'common', 5, 'Forest'],
  ['avatar', 'outfit_diplomatic_immunity', 'legendary', 600, 'Diplomatic Immunity'], ['avatar', 'outfit_fencing_jacket', 'rare', 40, 'Fencing Jacket'],
  ['avatar', 'outfit_fur_stole', 'epic', 100, 'Fur Stole'], ['avatar', 'outfit_gold_lame_jacket', 'mythic', 250, 'Gold Lamé Jacket'],
  ['avatar', 'outfit_hi_vis_vest', 'common', 5, 'Hi-Vis Vest'], ['avatar', 'outfit_quilted_gilet', 'rare', 40, 'Quilted Gilet'],
  ['avatar', 'outfit_safari_jacket', 'uncommon', 15, 'Safari Jacket'], ['avatar', 'outfit_sequin_jacket', 'mythic', 250, 'Sequin Jacket'],
  ['avatar', 'outfit_waiter_waistcoat', 'uncommon', 15, 'Waiter’s Waistcoat'], ['title', 'alibi', 'common', 5, 'Alibi'],
  ['title', 'backchannel', 'rare', 40, 'Backchannel'], ['title', 'burn_notice', 'uncommon', 15, 'Burn Notice'],
  ['title', 'cloak_dagger', 'epic', 100, 'Cloak & Dagger'], ['title', 'double_cross', 'epic', 100, 'Double Cross'],
  ['title', 'eyes_only', 'uncommon', 15, 'Eyes Only'], ['title', 'hologram', 'legendary', 600, 'Hologram'],
  ['title', 'long_game', 'rare', 40, 'Long Game'], ['title', 'mastermind', 'epic', 100, 'Mastermind'],
  ['title', 'mole', 'rare', 40, 'Mole'], ['title', 'phantom', 'mythic', 250, 'Phantom'],
  ['title', 'red_herring', 'rare', 40, 'Red Herring'], ['title', 'ringleader', 'epic', 100, 'Ringleader'],
  ['title', 'shadow_broker', 'mythic', 250, 'Shadow Broker'], ['title', 'sleeper', 'rare', 40, 'Sleeper'],
  ['title', 'sphinx', 'mythic', 250, 'Sphinx'], ['title', 'turncoat', 'rare', 40, 'Turncoat'],
  ['title', 'wild_card', 'epic', 100, 'Wild Card'], ['title', 'wiretap', 'uncommon', 15, 'Wiretap'],
  ['title', 'snoop', 'common', 5, 'Snoop'], ['title', 'small_fry', 'common', 5, 'Small Fry'],
]
const TIERS: [number, string, number][] = [[1, 'Restricted Intercept', 8], [2, 'Confidential Intercept', 15], [3, 'Secret Intercept', 50], [4, 'Top Secret Intercept', 113], [5, 'Enigma Intercept', 168]]
const RANK: Record<string, number> = { common: 1, uncommon: 2, rare: 3, epic: 4, mythic: 5, legendary: 6 }

/** A fixed stream of numbers per item (mulberry32 over the code's hash). */
function rng(seed: string) {
  let h = 1779033703
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
  let a = h >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const TODAY = new Date(Date.UTC(2026, 11, 20))
const DAYS = 180

/** An item's made-up 180 days: trades and their Intel per day, around a wandering price above its shred value. */
function history(code: string, shred: number, rank: number) {
  const r = rng(code)
  const base = Math.max(shred, 3) * (1.25 + r() * 1.6)
  const busy = (7 - rank) * (0.5 + r() * 2.2) + (r() < 0.12 ? 6 : 0)
  const thin = r() < 0.12
  const trend = (r() - 0.45) * 1.4
  const out: { d: string; n: number; s: number }[] = []
  let level = base * (1 - trend * 0.4)
  for (let i = DAYS - 1; i >= 0; i--) {
    const t = (DAYS - i) / DAYS
    level = Math.max(shred, level * (1 + (r() - 0.5) * 0.06) + (base * trend * 0.8) / DAYS + (t > 0.9 && trend > 0.4 ? base * 0.01 : 0))
    const n = thin ? (r() < 0.05 ? 1 : 0) : Math.max(0, Math.round(busy * (0.4 + r() * 1.2) * (0.6 + t * 0.8)))
    const day = new Date(TODAY.getTime() - i * 86_400_000).toISOString().slice(0, 10)
    out.push({ d: day, n, s: Math.round(n * level * (0.92 + r() * 0.16)) })
  }
  return out
}

const K = 5
/** The server's rule, roughly, client side (sample data only; the server takes the median, a pair of accounts once a day,
 * and needs 3 pairs): the 7-day average, then 30, then 90 days, with at least K trades. */
function priceAt(rows: { n: number; s: number }[], end: number): number | null {
  for (const w of [7, 30, 90]) {
    let n = 0
    let s = 0
    for (let j = Math.max(0, end - w + 1); j <= end; j++) {
      n += rows[j].n
      s += rows[j].s
    }
    if (n >= K) return Math.round(s / n)
  }
  return null
}

function build(): { list: MarketList; days: Map<string, MarketDay[]> } {
  const items: MarketItem[] = []
  const days = new Map<string, MarketDay[]>()
  const all: [string, MarketItem, number][] = [
    ...TIERS.map(([t, nm, s]) => [`intercept.tier.${t}`, { c: `intercept.tier.${t}`, k: 'intercept', i: String(t), nm, r: 'intercept', rk: null, t: true, s } as MarketItem, 7 - t] as [string, MarketItem, number]),
    ...ROWS.map(([k, i, r, s, nm]) => {
      const c = `beta.intercepts.${k}.${i}`
      return [c, { c, k, i, nm, r, rk: RANK[r], t: false, s } as MarketItem, RANK[r]] as [string, MarketItem, number]
    }),
  ]
  let t1 = 0
  let t30 = 0
  let x30 = 0
  for (const [code, it, rank] of all) {
    const h = history(code, it.s ?? 5, rank)
    const last = h.length - 1
    const p = priceAt(h, last)
    const sum = (w: number, f: 'n' | 's') => h.slice(h.length - w).reduce((a, d) => a + d[f], 0)
    t1 += h[last].n
    t30 += sum(30, 'n')
    x30 += sum(30, 's')
    if (p != null) {
      const v = [1, 7, 30, 90, 180].map((w) => sum(w, 'n'))
      it.p = p
      it.g = Math.max(it.s ?? 0, Math.round(p * (0.96 + rng(code + 'g')() * 0.08)))
      it.b = [1, 7, 30, 90, 180].map((w) => (w >= DAYS ? null : priceAt(h, last - w)))
      it.v = v
      it.x = [1, 7, 30, 90, 180].map((w, j) => (v[j] >= K ? sum(w, 's') : null))
    }
    items.push(it)
    days.set(
      code,
      h.map((d, j) => ({ d: d.d, n: d.n, a: d.n >= K ? Math.round(d.s / d.n) : null, p: priceAt(h, j) })),
    )
  }
  items.sort((a, b) => Number(b.t) - Number(a.t) || (b.rk ?? 0) - (a.rk ?? 0) || a.nm.localeCompare(b.nm))
  const head = { ok: true as const, phase: 'open' as const, opens_at: '2026-12-08T08:00:00Z', at: TODAY.toISOString(), min_trades: K, halted: false }
  return { list: { ...head, featured: null, totals: { trades_1d: t1, trades_30d: t30, intel_30d: x30 }, items }, days }
}

let built: ReturnType<typeof build> | null = null
const get = () => (built ??= build())

export async function sampleMarket(): Promise<MarketList> {
  return get().list
}

export async function sampleItem(code: string): Promise<MarketItemPage | null> {
  const { list, days } = get()
  const item = list.items.find((it) => it.c === code)
  if (!item) return null
  const all = days.get(code) ?? []
  const first = all.findIndex((d) => d.n > 0)
  return { ...list, item, days: item.p != null ? all : first < 0 ? [] : all.slice(first) }
}
