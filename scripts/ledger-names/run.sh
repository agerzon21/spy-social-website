#!/bin/sh
# Re-export /ledger's item names from the app (after an app update adds Intercept items or titles):
#   scripts/ledger-names/run.sh <app checkout with node_modules, e.g. a worktree of the release branch>
# Writes public/ledger/names/<code>.json (10 languages). Commit them with the site.
set -eu
APP="$1"
SITE="$(cd "$(dirname "$0")/../.." && pwd)"
URL="$(grep -h "^VITE_SUPABASE_URL=" "$SITE"/.env* 2>/dev/null | head -1 | cut -d= -f2- || true)"
URL="${URL:-https://ajobkfasquywiawjfdxg.supabase.co}"
WORK="$(mktemp -d "$SITE/scripts/ledger-names/.work.XXXXXX")"
curl -sf "${URL%/}/functions/v1/ledger?op=supply" -o "$WORK/supply.json"
mkdir -p "$SITE/public/ledger/names"
cp "$SITE/scripts/ledger-names/zzSiteLedgerNames.test.ts" "$APP/localization/__tests__/zzSiteLedgerNames.test.ts"
trap 'rm -f "$APP/localization/__tests__/zzSiteLedgerNames.test.ts"; rm -rf "$WORK"' EXIT
(cd "$APP" && SITE_NAMES_OUT="$SITE/public/ledger/names" SITE_SUPPLY="$WORK/supply.json" npx jest localization/__tests__/zzSiteLedgerNames.test.ts --maxWorkers=2)
