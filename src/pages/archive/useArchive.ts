import { useCallback, useEffect, useState } from 'react'
import { useLang, type LangCode } from '../../i18n'
import { ArchiveBusy, fetchUniques, loadArchiveData, loadArtIndex, loadLookIndex, type ArchiveData, type Looks, type ArchiveList, type ArchiveSet } from '../../lib/archive'
import { archiveStrings, type ArchiveStrings } from './strings'

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
  const name = pick(set.names)
  const season = pick(set.season_names)
  // "Beta · Intercepts" already names its season: say it once.
  return { set: name, season: season && name.toLocaleLowerCase().includes(season.toLocaleLowerCase()) ? '' : season }
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

