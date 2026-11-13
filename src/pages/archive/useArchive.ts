import { useCallback, useEffect, useState } from 'react'
import { useLang, type LangCode } from '../../i18n'
import { ArchiveBusy, fetchUniques, loadArchiveData, loadArtIndex, loadLookIndex, type ArchiveData, type Looks, type ArchiveList, type ArchiveSet } from '../../lib/archive'
import { archiveStrings, type ArchiveStrings } from './strings'
import { setName } from './serverWords'

const NO_LOOKS: Looks = { item: new Set(), worn: new Set(), scene: new Set(), motion: {} }

/** The page's words, the app's tables in the reader's language, and the pictures drawn so far. */
export function useArchive(): { w: ArchiveStrings; data: ArchiveData | null; art: Set<string>; looks: Looks; lang: LangCode; locale: string } {
  const { lang, language } = useLang()
  const [data, setData] = useState<ArchiveData | null>(null)
  const [art, setArt] = useState<Set<string>>(new Set())
  const [looks, setLooks] = useState<Looks>(NO_LOOKS)
  useEffect(() => {
    let live = true
    loadArchiveData(lang).then((d) => live && setData(d))
    loadArtIndex().then((a) => live && setArt(a))
    loadLookIndex().then((l) => live && setLooks(l))
    return () => {
      live = false
    }
  }, [lang])
  return { w: archiveStrings(lang), data, art, looks, lang, locale: language.locale }
}

export const fmt = (n: number, locale: string) => n.toLocaleString(locale)
export const dayText = (iso: string, locale: string) =>
  new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })

/** A set's name and its season's in the reader's language (the server's own words). */
export function setText(set: ArchiveSet | undefined | null, lang: string): { set: string; season: string } {
  if (!set) return { set: '', season: '' }
  const pick = (m: Record<string, string>) => m[lang] ?? m[lang.split('-')[0]] ?? m.en ?? ''
  // The set's name on the site's side in every language (serverWords: the server names it in two before archive_words_1111).
  const name = setName(set, lang as LangCode)
  const season = pick(set.season_names)
  // "Beta · Intercepts" already names its season: say it once.
  return { set: name, season: season && name.toLocaleLowerCase().includes(season.toLocaleLowerCase()) ? '' : season }
}

/**
 * A card's set line (owner Nov 13): a short mark for the set's season, then the set's own name without the season it
 * already says. All from the server's set: a numbered season reads "S1" (strings card.season), the pre-season Beta its
 * season's name in capitals ("BETA"). "Beta · Intercepts" -> BETA + Intercepts; "Season 1 · Origins" -> S1 + Origins;
 * a set whose name doesn't start with its season (a Game Night) keeps its whole name.
 */
export function setBadge(set: ArchiveSet | undefined | null, lang: string, locale: string, season: (n: string) => string): { mark: string; name: string } {
  if (!set) return { mark: '', name: '' }
  const name = setName(set, lang as LangCode)
  const pick = (m: Record<string, string> | undefined) => (m ? (m[lang] ?? m[lang.split('-')[0]] ?? m.en ?? '') : '')
  const seasonName = pick(set.season_names)
  const n = Number(set.season_number)
  const mark = Number.isFinite(n) && n >= 1 ? season(fmt(n, locale)) : seasonName.toLocaleUpperCase(locale)
  const parts = name.split(' · ')
  const rest =
    parts.length > 1 && seasonName && parts[0].trim().toLocaleLowerCase(locale) === seasonName.toLocaleLowerCase(locale) ? parts.slice(1).join(' · ') : name
  return { mark, name: rest }
}

/** Every Unique (op=uniques), its state: 'soon' while the server's Archive reads aren't on (the function answers 400). */
export function useUniques() {
  const [list, setList] = useState<ArchiveList | null>(null)
  const [state, setState] = useState<'loading' | 'ok' | 'busy' | 'soon'>('loading')
  const load = useCallback(() => {
    setState('loading')
    fetchUniques()
      .then((l) => {
        setList(l)
        setState(l ? 'ok' : 'busy')
      })
      .catch((e) => setState(e instanceof ArchiveBusy && /archive 400/.test(e.message) ? 'soon' : 'busy'))
  }, [])
  useEffect(load, [load])
  return { list, state, retry: load }
}

