/**
 * The 2.2 store screenshots, one set per language (their captions are printed on them): src/assets/shots22/<lang>/
 * <name>-<300|600>.webp, written by scripts/store-shots.mjs from the store-shots tool's output. Only the URLs are
 * bundled; a page loads its own language's files, lazily. The home page's New in 2.2 rail and the press page use them.
 */
const FILES = import.meta.glob<string>('../assets/shots22/*/*.webp', { eager: true, query: '?url', import: 'default' })

/** The shots, in the store's order (their descriptions: src/i18n launch.shots). */
export const SHOTS = ['talk', 'sketch', 'online', 'gamenight', 'market', 'friends'] as const
export type ShotName = (typeof SHOTS)[number]

/** A shot's URL in `lang` (English if that language has none), 300 or 600 px wide (652 or 1304 tall). */
export const shot = (lang: string, name: ShotName, w: 300 | 600): string =>
  FILES[`../assets/shots22/${lang}/${name}-${w}.webp`] ?? FILES[`../assets/shots22/en/${name}-${w}.webp`]
