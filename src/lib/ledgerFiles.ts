// Where spysocial.app/ledger reads the ledger's files: all static, under one base (LEDGER_FILES_BASE), so they can move
// to object storage later by changing this one constant. The daily GitHub Action writes the day files, their
// OpenTimestamps proofs, heads.csv and supply.json (.github/workflows/ledger-heads.yml, scripts/ledger-rows.mjs); the
// site's build adds summary.json, the whole-ledger file and the newest day's CSV (scripts/ledger-files.mjs). The beta
// test chain's files sit under beta/, the real chain's at the base itself.

export const LEDGER_FILES_BASE = '/ledger/'

/** This site's public repository, where the Action commits the files (git history = when each was published). */
export const LEDGER_REPO = 'https://github.com/agerzon21/spy-social-website'

export type LedgerChain = 'main' | 'beta'

/** A chain's folder under the base ("" or "beta/"). */
export const chainDir = (chain: LedgerChain) => (chain === 'beta' ? 'beta/' : '')

/** A file of a chain, from a path relative to its folder (summary.json's paths are). */
export const ledgerFile = (chain: LedgerChain, rel: string) => `${LEDGER_FILES_BASE}${chainDir(chain)}${rel}`

/** The same file in the repository (public/ledger/...), as GitHub shows it. */
export const repoPath = (chain: LedgerChain, rel: string) => `public/ledger/${chainDir(chain)}${rel}`

export type LedgerDay = {
  day: string; from: number; to: number; hash: string; rows: number; bytes: number; fetched_at: string | null
  file: string; ots: string | null
}

export type LedgerSummary = {
  ok: boolean
  problem: string | null
  chain: LedgerChain
  rows: number
  first_at: string | null
  last: { seq: number; at: string; kind: string; hash: string; line: string } | null
  days: LedgerDay[]
  built_at: string
  files: { all?: { path: string; bytes: number }; latestCsv?: { path: string; bytes: number; day: string } }
}

export type LedgerSupply = {
  as_of: string
  chain: string
  collectibles: {
    code: string; set: string; season: string; track: string; set_names: Record<string, string>; item_kind: string; item_code: string
    variant: string; how: Record<string, string>; opens_at: string; closes_at: string; minted: number; burned: number; held: number
    closed_at: string | null; close_seq: number | null; name: string | null
    /** ledger_reasons_1111: copies removed for integrity, and by reason (absent before that server file). */
    removed?: number; removed_by?: Record<string, number>
  }[]
}

/** A static JSON file, or null when it isn't there (a missing file can come back as the site's HTML page). */
export async function staticJson<T>(url: string): Promise<T | null> {
  try {
    const r = await fetch(url, { cache: 'no-cache' })
    if (!r.ok || !(r.headers.get('content-type') ?? '').includes('json')) return null
    return (await r.json()) as T
  } catch {
    return null
  }
}

export const sizeOf = (bytes: number) =>
  bytes < 1024 ? `${bytes} bytes` : bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1048576).toFixed(1)} MB`

/** CyberChef (GCHQ's free, open-source tool that runs in the browser) with a SHA-256 recipe and this text as input. */
export function cyberChefSha256(text: string): string {
  const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(text))).replace(/=+$/, '')
  return `https://gchq.github.io/CyberChef/#recipe=SHA2('256',64,160)&input=${encodeURIComponent(b64)}`
}
