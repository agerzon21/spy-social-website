# Changelog

All notable changes to SpySocial will be documented here. This file is the source of truth for in-app release notes, App Store "What's New" copy, and the website updates log.

The format follows [Keep a Changelog](https://keepachangelog.com/), and this project follows [Semantic Versioning](https://semver.org/).

---

## [2.1.1] - 2026-06-13

🎉 **SpySocial is officially live on the Google Play Store** — the first public production release on Android, paired with pre-launch polish from closed-test QA on real Android devices.

### Pre-launch QA Polish
- **Delete Account button no longer clipped** on the Account screen. The scrollable content now respects the device's safe-area bottom inset and reserves room for the unsaved-changes snackbar. Google Play requires in-app account deletion to be reachable — flagged Critical by QA, fixed before launch.
- **Lobby Leave Room / Start Game buttons** now sit above the Android gesture-nav bar via dynamic safe-area insets.
- **Start Game** now surfaces what's missing (need 3+ players, all-ready, at least one category) when prerequisites aren't met. Previously the button was hard-disabled with no feedback.
- **Categories screen** — back control and "Categories & Locations" title no longer crowd each other. Back button is icon-only on Android (Material convention); title font size trimmed.
- **How to Play modal** — duplicate back button on Android removed (the modal's own close X plus the inherited stack back button were both rendering).
- **Onboarding tutorial** — Skip is now reachable on every step, not just the first slide.
- **Guest sign-up banner** reframed as an invitation ("Unlock Your Full Account") with a sparkles icon and a clear CTA button — was previously styled like a system warning, which felt discouraging.
- **Game results & How to Play screens** — emojis replaced with Ionicons / FontAwesome glyphs. Emojis render inconsistently across Android vendors; vector icons stay consistent.

### Platform Status
- **Android 2.1.1** — live on Google Play as of 2026-06-13.
- **iOS 2.1.1** — same fixes, submitted to App Store Connect.

### Infrastructure
- `expo-updates` now installed and configured against the EAS project. Future JS-only fixes can ship via OTA (`eas update`) without going through Play Store / App Store review.

---

## [2.1.0] - 2026-05-15

🤖 **SpySocial now launches on the Google Play Store** — Android players join the party. This release pairs that launch with a Welcome screen redesign and a stack of Android-specific polish to make the first impression feel as sharp on Pixel as it does on iPhone.

### New Features
- **Play Store launch** — SpySocial is now available on Android via Google Play.
- **Welcome screen redesign** — new layered surface with a soft sky-blue gradient and faint spy-themed background details (radar rings, crosshair), an orange "SOCIAL DEDUCTION" eyebrow pill, a tagline beneath the logo, icon-prefixed Login / Sign Up buttons, an OR divider, and a lightweight "Continue as Guest" link. Version badge is now a subtle pill at the bottom of the screen.
- **Account "confirmation pending" flow** — when a guest upgrades to a full account, the Account screen now shows a clear pending state with Resend / Cancel / Refresh actions so they know exactly where they are in the email-confirm process.

### Visual Revamp
- **Game Over screen redesigned** — single-surface player cards with a soft gradient and left-edge color accent (no nested cards / box-in-box artifacts), a trophy hero with a glow halo, gold-accented winning-team sections, location card with a map-pin icon, and a sky-blue gradient "Return to Lobby" footer button.
- **Account screen redesign** — single cohesive list, consistent uppercase section headers across every group (Profile, Preferences, Account & Security, Support & Legal, Danger Zone), iOS-Settings-style menu rows for Support / Legal, Danger Zone moved to the bottom.
- **iPad UI polish** — lobby player cards in 6 columns (was 3), role-reveal card capped at 420pt, larger in-game player tiles (140×178) with a taller container so the third row never clips, notebook column auto-sizes to the role card, home/play deck row sized for iPad with larger HomeCard typography.

### Android-Specific Fixes
- **Back-gesture guard** — the Android-10+ system back swipe (and the hardware back button) now route through the same Leave confirmation dialog as tapping the header's Leave button. Previously, Android users could swipe back out of an in-game screen or the lobby with zero confirmation; `gestureEnabled: false` only stops the iOS swipe gesture. Implemented via a new shared `useBackPressGuard` hook that combines `navigation.addListener('beforeRemove')` (catches the swipe gesture as a navigation action) with `BackHandler.hardwareBackPress` (catches the physical button). REPLACE / push actions flow through untouched so phase transitions and host-end-game routing are unaffected.
- **"Box-in-box" rendering artifact** — Android's compositor was rendering a visible inner edge inside every vote / vote-results / game-over card. Root cause: translucent rgba background + translucent hairline border + borderRadius + overflow:hidden — the rounded clip layer's own edge was showing through the semi-transparent border. Fixed across VotePlayerRow, VoteResultRankCard, VoteOutcomeCard, and the new game-over player card.
- **Game Over header gap** — the screen's SafeAreaView was double-counting the top inset on top of the Stack header, leaving a visible strip of the GameBackground gradient between the header and where scroll content started clipping. Now scoped to `['bottom','left','right']`, matching the voting / vote_results screens.
- **WheelPicker** — pure-JS replacement for `@react-native-picker/picker`. The native picker silently ignores `itemStyle` on Android (which made our white-text styling render as unreadable black-on-dark) and has long-standing NullPointerException crashes during dismissal — both upstream library bugs. The replacement renders identical UX on both platforms via a ScrollView + snap-to-interval.

### Improvements
- **Server-synced clock RPC** — every "seconds remaining" computation in the app now subtracts a measured offset against the server clock (via a new `server_now()` Postgres function) instead of trusting `Date.now()`. Fixes nonsense countdown values ("Revealing in: 1135s") on Android emulators and devices with broken NTP sync.
- **Auth flows consolidated** — signup, resend confirmation, password reset, and email change all dispatch through a single Edge Function with a shared client wrapper, removing the drift risk across the four UI call sites. New migrations add an idempotency key to signup, extend `auth_attempts` to cover the additional flow kinds, and add a cancel-email-change RPC.
- **Account: mailto fallback** — Support / Legal email rows now copy the address to the clipboard with a friendly alert when no mail client is configured (iOS sim, devices without Mail set up) instead of throwing an unhandled promise rejection.
- Translation parity maintained across English, Spanish, and Russian for all new keys (welcome eyebrow / tagline, account upgrade-pending strings, etc).

### Technical
- `tsconfig.json` now excludes `supabase/functions/**` — those are Deno Edge Function files with a different module resolution target.
- `app.json` version bumped to 2.1.0; iOS `buildNumber` to "2" (App Store requires a higher value per submission); Android `versionCode` to 2 (matches iOS for parity on the first Play Store upload).

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
