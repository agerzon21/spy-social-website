# Changelog

All notable changes to SpySocial will be documented here. This file is the source of truth for in-app release notes, App Store "What's New" copy, and the website updates log.

The format follows [Keep a Changelog](https://keepachangelog.com/), and this project follows [Semantic Versioning](https://semver.org/).

---

## [2.0.0] - 2026-04-30

A full rebuild of the multiplayer experience: every screen has been redesigned, the realtime engine has been rewritten for stability, and a stack of new features lands together.

### New Features
- **Tutorial & profile setup** — first-time players are walked through the game and prompted to set up their profile.
- **In-game Notebook** — jot down notes about who said what during the round. Players are smart-sorted: active players with existing notes first, then other active players, then eliminated players last.
- **Hint translation** — when your UI language differs from the game language, tap a hint to see the same question translated into your language. Hints themselves are always shown in the game language so every player at the table reads the same prompt.
- **Player pokes** — tap a teammate's card in the lobby to send them a poke.
- **QR-code sharing** — share rooms via a native share sheet with a scannable QR code.
- **Universal links** — `spysocial.app/join/<code>` opens the app and drops you straight into the room (with cold-launch handling).
- **5-character room codes** — shorter codes that are easier to share verbally. Legacy 6-character codes still work.
- **Reveal Vote Caller** lobby setting — optionally show who triggered the vote.
- **Host End Game** — hosts can now end a game early.
- **Extra 1 location pack** — a new batch of locations to play with.
- **In-game Leave button** — quick exit from active games without backing all the way out.

### Visual Revamp
- Lobby UI completely modernized with interactive player cards.
- Lobby settings screen redesigned (with a reusable PickerModal under the hood).
- Game screen redesigned.
- Voting screen redesigned with a vote-caller display and progress UI.
- Vote results screen redesigned, with standardized results / eliminated UX.
- Role-reveal phase polished — shows waiting players' names, extended to 60 seconds.
- Home cards now auto-fit text; refresh button slimmed down.
- All in-game screens now share the same dark-navy header (Solve and Solve Results no longer use white/transparent variants).
- Offline banner standardized across every screen — consistent height, safe-area aware, no longer crashes into the Dynamic Island.
- Account screen has a polished offline empty state with a cloud-offline icon.

### Improvements
- **Network resilience overhaul** — fixes a long-standing iOS quirk where NetInfo could lie ("offline") after a long background sleep, leaving screens stuck in reconnect states even though the network was actually fine. The shared `useNetwork` hook now verifies any "offline" claim with a real HTTP probe to Supabase; all in-game screens (lobby, role reveal, game, voting, vote results, solve, solve results, game results) and pre-game screens (welcome, login, play, account, categories) consume this same hook — no more duplicated network state, no more screen-specific defaults, no more stuck "Reconnecting…" overlays.
- The Play screen now trusts actual fetch results over NetInfo's stale state, retries automatically every 5 seconds while offline, serializes concurrent fetches, and never falsely shows the "Get Started" logged-out fallback when the user is merely offline.
- Realtime sync stability hardened across every phase (lobby, role reveal, game, voting, results).
- Game timer is now server-synced — clock drift fixed.
- Stronger offline handling and reconnection logic.
- Auth & login flows tightened: signup hardening, reset-password flow, and the guest-upgrade flow.
- Account screen polish with a redesigned snackbar messaging system.
- Full translation parity across English, Spanish, and Russian (171 hint suggestions per language, now indexed by stable position so future translation features just work).
- Notebook UX: keyboard no longer pops automatically when selecting a player (matches iOS standard); sheet sizes itself appropriately based on whether a player is selected.
- Hint drawer: tapping the hint sentence no longer accidentally re-rolls the hint — the dedicated reload icon is the only way to refresh.
- iOS 26 compatibility — opted out of the Liquid Glass capsule on header bar items.
- Header consolidated into a shared `useGameScreenHeader` hook for consistency across screens.
- Production logging stripped from release builds.

### Bug Fixes
- Fixed vote / end-of-game race condition.
- Fixed double-tally and timer-end edge cases on votes.
- Fixed Plurality tally vs. abstain handling; abstain now pinned to the action dock.
- Fixed solve-results header overlap (body crashing into transparent header).
- Fixed animation initial-state bleed-through on the game screen.
- Fixed Reanimated render-write warnings on the voting screen.
- Fixed guest-upgrade flow that was unintentionally signing the guest out.
- Fixed Account email field.
- Fixed home-card text truncation and Spanish header trims.

### Technical
- Migrated state management to `useRoom` and `useGame` hooks.
- Flattened routing — dropped the `(tabs)` route group in favor of flat routes.
- Pinned `react-native-screens` to `~4.18` for `expo-router` 6.0.23 compatibility.
- Realtime publication fix on the Supabase side.
- Question suggestions restructured into parallel translation triples (`{ en, es, ru }`) — single source of truth, makes per-language drift impossible going forward.
- Removed deprecated Expo schema fields (`privacy`, `privacyPolicyUrl`, `termsOfServiceUrl`); privacy/terms URLs are owned by App Store Connect.

---

## [1.0.1] - Initial release

First public release of SpySocial on the App Store.
