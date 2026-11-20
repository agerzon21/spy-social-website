#!/bin/sh
# The Market's pictures and lines for every Black Market item (market-art-1111, owner Nov 11: "most items don't have
# photos ... why aren't there descriptions"). No server change. Re-run after an app update adds or redraws items:
#   scripts/market-item-art/run.sh <app ref, e.g. prep/u61> <app worktree at that ref, with harness-1111.patch applied>
# 1. words.mjs: the app's item descriptions (localization/translations/itemDescriptions) in ten languages ->
#    src/pages/market/words/<lang>.json (+ dynamic-titles.json: the Game Night titles' names and lines, titles.meta).
# 2. wear.mjs + the Archive's mask.py: glasses, accessories, hair / beard / outfit colours (the standard hair, beard or
#    trench coat alone in that colour), hats and outfits (the full figure's own layers), the Mythic backdrops (their still
#    layers, full frame), drawn by the app's lib/avatar (bundled with esbuild, no Metro); no agent in any picture.
# 3. The app's qa/overflow harness (its own Metro; harness-1111.patch adds the cells and qa/overflow/marketArt.mjs, scratch,
#    never committed in the app): celebrations full frame, borders round an empty dark stage, each title's plate and
#    each Intercept's file with its stamp in all ten languages (on black and on white: finish.py cuts them out).
# 4. finish.py: public/market-art/<code>.webp (600 / 640) and -s.webp (128), title/<lang>/, intercept/<lang>/, and the
#    index src/pages/market/art.json. Heavy (Metro, ~2,500 headless shots): mind the machine guard (load under 40).
# Needs Pillow, numpy, Playwright (PLAYWRIGHT_PKG / PLAYWRIGHT_PATH).
set -eu
REF="$1"
APPWT="$2"
SITE="$(cd "$(dirname "$0")/../.." && pwd)"
APP="$(git -C "$APPWT" rev-parse --path-format=absolute --git-common-dir)/.."
HERE="$SITE/scripts/market-item-art"
WORK="$(mktemp -d "$HERE/.work.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
node "$HERE/words.mjs" "$REF" "$APP"
mkdir -p "$WORK/app"
git -C "$APP" archive "$REF" lib localization/translations/uniqueCodenames.ts localization/languages.ts | tar -x -C "$WORK/app"
cp "$HERE/entry.ts" "$WORK/app/entry.ts"
node -e "require('$SITE/node_modules/esbuild').build({entryPoints:['$WORK/app/entry.ts'],bundle:true,format:'esm',platform:'neutral',alias:{'@':'$WORK/app'},outfile:'$WORK/noir.mjs',logLevel:'warning',external:['react','react-native','@react-native-async-storage/async-storage']}).catch(e=>{console.error(e);process.exit(1)})"
URL="$(grep -h "^VITE_SUPABASE_URL=" "$SITE"/.env* 2>/dev/null | head -1 | cut -d= -f2- || true)"
URL="${URL:-https://ajobkfasquywiawjfdxg.supabase.co}"
curl -sf "${URL%/}/functions/v1/ledger?op=market&lang=en" -o "$WORK/market.json"
python3 - "$WORK" <<'PY'
import json, sys
W = sys.argv[1]
items = json.load(open(f'{W}/market.json'))['items']
wear, cells, plates = [], [], []
for x in items:
    i = x['i']
    if x['k'] == 'intercept': plates.append({'key': 'i-' + i, 'kind': 'intercept', 'code': 'x', 'tier': int(i)})
    elif x['k'] == 'title': plates.append({'key': 't-' + i, 'kind': 'title', 'code': i, 'plate': True})
    elif i.startswith(('celebration_', 'local_')): cells.append({'key': 'c-' + i, 'kind': 'avatar', 'code': i, 'bare': True})
    elif i.startswith('frame_'): cells.append({'key': 'b-' + i, 'kind': 'avatar', 'code': i, 'stage': '#121a2b'})
    elif i.startswith(('hat_', 'outfit_', 'glasses_', 'accessory_', 'hair_color_', 'facial_hair_color_', 'background_')): wear.append(i)
json.dump(wear, open(f'{W}/wear.json', 'w')); json.dump(cells + plates, open(f'{W}/cells-en.json', 'w')); json.dump(plates, open(f'{W}/cells-lang.json', 'w'))
PY
NOIR_BUNDLE="$WORK/noir.mjs" node "$HERE/wear.mjs" "$WORK/r" "$WORK/wear.json" 1000
python3 "$SITE/scripts/archive-item-art/mask.py" "$WORK/r" > /dev/null
python3 - "$HERE/dynamic-titles.json" "$WORK/dyn.json" <<'PY'
import json, sys
json.dump([{k: t[k] for k in ('code', 'name', 'names')} for t in json.load(open(sys.argv[1]))], open(sys.argv[2], 'w'), ensure_ascii=False)
PY
(cd "$APPWT" && OVERFLOW_WORK="$WORK/ovf" DYN_TITLES="$WORK/dyn.json" node qa/overflow/marketArt.mjs "$WORK/cells-en.json" "$WORK/h" --langs en --bgs 'k=#000000,w=#ffffff' --port 8463 --keep 1)
(cd "$APPWT" && OVERFLOW_WORK="$WORK/ovf" DYN_TITLES="$WORK/dyn.json" node qa/overflow/marketArt.mjs "$WORK/cells-lang.json" "$WORK/h" --langs es,ru,zh-Hans,hi,ar,fr,bn,pt-BR,id --bgs 'k=#000000,w=#ffffff' --port 8463)
python3 "$HERE/finish.py" "$WORK/r" "$WORK/h" "$SITE/public/market-art" "$SITE/src/pages/market/art.json"
echo "Metro on 8463 (from the first harness run) is still up: stop that one process by its PID."
