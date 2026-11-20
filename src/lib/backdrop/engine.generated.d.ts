// Types for engine.generated.js (the app's own backdrop drawing, bundled by scripts/archive-item-art/engine.mjs).
export type LayerPose = { o: number; tx: number; ty: number; r: number; sx: number; sy: number }
export type Treatment = { key: string } & Record<string, unknown>
export type VaultLayers = { base: string; bolts: string; seam: string; openBack: string; rays: string; openFront: string; door: string; handle: string; glints: readonly [string, string, string]; motes: string; peakLight: string; spin: number }
export type PanelLayers = { base: string; pulse: string; broken: string; frame: string; cracks: readonly [string, string, string]; pop: string; debris: string; shards: readonly [string, string, string, string]; burst: string; caption: string; word: { fill: string; ink: string }; captionInk: string }
export type BackdropLayers = { kind: 'vault'; look: { key: string }; layers: VaultLayers } | { kind: 'panel'; look: { key: string; sound: string | null }; layers: PanelLayers }
export function backdropLayers(art: string, t: Treatment | null, simple: boolean): BackdropLayers | null
export function backdropCopy(art: string, unique: unknown): Treatment | null
export function isLiveBackdrop(art: string | null | undefined): boolean
export const LIVE_BACKDROP_CODE: Readonly<Record<string, string>>
export const VAULT_RAYS_BOX: readonly [number, number, number]
export const CAPTION_BOX: readonly [number, number, number, number]
export const POP_AT: readonly [number, number, number]
export const BURST_AT: readonly [number, number, number]
export function vaultPose(layer: number, u: number, v: number, boost: number, spin: number): LayerPose
export function panelPose(layer: number, u: number, v: number, boost: number, unique: boolean): LayerPose
export const VL: Readonly<Record<'bolts' | 'seam' | 'openBack' | 'rays' | 'openFront' | 'door' | 'handle' | 'glint0' | 'glint1' | 'glint2' | 'motes' | 'peakFigure', number>>
export const PL: Readonly<Record<'pulse' | 'broken' | 'frame' | 'crack0' | 'crack1' | 'crack2' | 'pop' | 'debris' | 'shard0' | 'shard1' | 'shard2' | 'shard3' | 'burst' | 'caption' | 'figure', number>>
export const VAULT_PIVOT: readonly (readonly [number, number])[]
export const PANEL_PIVOT: readonly (readonly [number, number])[]
export const BACKDROP_BEAT_MS: { vault: number; panel: number }
export const BACKDROP_MOMENT_MS: { vault: number; panel: number }
export function avatarXml(req: Record<string, unknown>): string
export const NEUTRAL_AVATAR: Record<string, unknown> & { v: 1 }
export function itemByCode(code: string): { art: string; slot: string } | undefined
export function markSeedOf(seed: unknown, text: unknown): { seed: number | string; floatText?: string } | null
export const PANEL_SOUNDS: readonly string[]
export const LEGENDARY_BACKDROP_WORDS: Record<string, { caption: string; sounds: readonly string[] }>
