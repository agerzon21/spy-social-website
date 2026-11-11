// The live backdrops' engine for the website (archive-item-art-1111, owner Nov 11: Vault Zero and Panel Break move on
// the site as in the app): the app's own layers, poses and figure drawing, bundled by engine.mjs into
// src/lib/backdrop/engine.generated.js. Pure code only (no React Native).
export { backdropLayers, backdropCopy, isLiveBackdrop, LIVE_BACKDROP_CODE, VAULT_RAYS_BOX, CAPTION_BOX, POP_AT, BURST_AT } from './lib/avatar/legendaryBackdrops';
export { vaultPose, panelPose, VL, PL, VAULT_PIVOT, PANEL_PIVOT, BACKDROP_BEAT_MS, BACKDROP_MOMENT_MS } from './lib/avatar/legendaryBackdropMotion';
export { avatarXml } from './lib/avatar/render';
export { NEUTRAL_AVATAR } from './lib/avatar/config';
export { itemByCode } from './lib/avatar/catalog';
export { markSeedOf } from './lib/unique/floatText';
export { PANEL_SOUNDS } from './lib/unique/backdropAttributes';
export { LEGENDARY_BACKDROP_WORDS } from './localization/translations/legendaryBackdrops';
