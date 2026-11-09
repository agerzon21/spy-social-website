#!/bin/sh
# Re-draw the Archive's pictures (after Uniques are minted, or an app update changes an item's art):
#   scripts/archive-art/run.sh <app checkout with node_modules and qa/overflow/archiveArt.mjs> [cells.json]
# Reads every Unique from the ledger function (one request), draws each with the app's own Unique tile in headless
# Chrome (the app's qa/overflow harness: its own Metro on 8441, stopped after), and writes public/archive/art/*.webp and
# index.json. A copy's picture never changes (its float is minted), so only new ones matter; the plain Legendaries
# (l-<item>) and the float page's examples (x-...) come from cells-base.json. Needs Playwright (PLAYWRIGHT_PATH) and
# Pillow. Heavy (a Metro build): mind the machine guard. Commit the new files with the site.
set -eu
APP="$1"
SITE="$(cd "$(dirname "$0")/../.." && pwd)"
URL="$(grep -h "^VITE_SUPABASE_URL=" "$SITE"/.env* 2>/dev/null | head -1 | cut -d= -f2- || true)"
URL="${URL:-https://ajobkfasquywiawjfdxg.supabase.co}"
WORK="$(mktemp -d "$SITE/scripts/archive-art/.work.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
if [ -n "${2:-}" ]; then cp "$2" "$WORK/cells.json"; else
  curl -sf "${URL%/}/functions/v1/ledger?op=uniques" -o "$WORK/uniques.json"
  python3 - "$WORK/uniques.json" "$SITE/scripts/archive-art/cells-base.json" "$WORK/cells.json" <<'PY'
import json, sys
live = json.load(open(sys.argv[1]))['copies']
base = json.load(open(sys.argv[2]))
cells = base + [{'key': f"u-{c['item_code']}-{c['serial']}", 'kind': c['item_kind'], 'code': c['item_code'], 'serial': c['serial'],
                 'float': c['float'], 'pattern': c['pattern']} for c in live]
json.dump(cells, open(sys.argv[3], 'w'))
PY
fi
(cd "$APP" && OVERFLOW_WORK="${OVERFLOW_WORK:-$APP/../archive-art-ovf}" node qa/overflow/archiveArt.mjs "$WORK/cells.json" "$WORK/png" --port 8441)
python3 "$SITE/scripts/archive-art/webp.py" "$WORK/png" "$SITE/public/archive/art"
