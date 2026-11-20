import { addTableLoader, type LangCode } from '.'

/**
 * A page's own words in ten languages, loaded per language (speed-1111): the tables given here (English and Russian
 * for the Archive and the Market) are in the page's code, every other language is its own chunk (`loaders`, an
 * import.meta.glob of ./locales/*.ts). The site's loadStrings waits for the reader's language before the first paint
 * and before a language switch (i18n/index.ts addTableLoader); until a table is in, or if its chunk can't load, the
 * words are English.
 */
export function pageTable<S>(own: Partial<Record<LangCode, S>> & { en: S }, loaders: Record<string, () => Promise<{ default: S }>>): (code: LangCode) => S {
  const got = new Map<string, S>(Object.entries(own) as [string, S][])
  const pending = new Map<string, Promise<void>>()
  addTableLoader((code) => {
    if (got.has(code)) return Promise.resolve()
    const load = loaders[`./locales/${code}.ts`]
    if (!load) return Promise.resolve()
    let p = pending.get(code)
    if (!p) {
      p = load().then(
        (m) => {
          got.set(code, m.default)
        },
        () => {
          // A chunk lost to a deploy: English this time, another try next time.
          pending.delete(code)
        },
      )
      pending.set(code, p)
    }
    return p
  })
  return (code) => got.get(code) ?? own.en
}
