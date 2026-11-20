#!/bin/sh
# The Archive's item-alone pictures and "See it worn" previews (archive-item-art-1111, owner Nov 11: no agent on a
# Unique's picture; the standard agent only when asked). No server change.
#   scripts/archive-item-art/run.sh <app ref, e.g. prep/u60.3> [app repo, default ../spy-social]
# 1. Bundles the app's own drawing (lib/avatar, lib/unique at <ref>, git archive: no checkout, no Metro) with esbuild.
# 2. bust.mjs: each wearable copy on three wearers on three spotlights + the first without it + the bare field;
#    mask.py keeps what all three wearers agree on, the item (glasses, accessories). Backdrops: the scene alone
#    (render.ts layer 'backdrop'). The worn previews: the copy on the two standard agents (NEUTRAL_AVATAR, and the
#    same with hair_long), framed by the app's slot crop.
# 3. layers.mjs: a hat's and an outfit's own layers from the full-body figure (fullBody pieces, the copy's dye), the
#    outfit's skin taken out; finish.py crops every cut-out.
# 4. webp.py: public/archive/item/<key>.webp (transparent) and public/archive/worn/<key>-m.webp / -f.webp, index.json;
#    border.py: the Black Diamond border lifted off its scene (public/archive/scene) for the case.
# Heavy-ish (a few hundred headless renders): mind the machine guard. Needs Pillow, numpy, Playwright (PLAYWRIGHT_PKG).
set -eu
REF="$1"
SITE="$(cd "$(dirname "$0")/../.." && pwd)"
APP="${2:-$SITE/../spy-social}"
HERE="$SITE/scripts/archive-item-art"
URL="$(grep -h "^VITE_SUPABASE_URL=" "$SITE"/.env* 2>/dev/null | head -1 | cut -d= -f2- || true)"
URL="${URL:-https://ajobkfasquywiawjfdxg.supabase.co}"
WORK="$(mktemp -d "$HERE/.work.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
mkdir -p "$WORK/app" "$WORK/r2" "$WORK/r3" "$WORK/worn"
git -C "$APP" archive "$REF" lib localization/translations/uniqueCodenames.ts localization/languages.ts | tar -x -C "$WORK/app"
cp "$HERE/entry.ts" "$WORK/app/entry.ts"
node -e "require('$SITE/node_modules/esbuild').build({entryPoints:['$WORK/app/entry.ts'],bundle:true,format:'esm',platform:'neutral',alias:{'@':'$WORK/app'},outfile:'$WORK/noir.mjs',logLevel:'warning',external:['react','react-native','@react-native-async-storage/async-storage']}).catch(e=>{console.error(e);process.exit(1)})"
curl -sf "${URL%/}/functions/v1/ledger?op=uniques" -o "$WORK/uniques.json"
export NOIR_BUNDLE="$WORK/noir.mjs"
PLATES='#8e99ae,#e8b64c,#5a8f6a' node "$HERE/bust.mjs" "$WORK/r2" 1000 "$WORK/uniques.json"
python3 "$HERE/mask.py" "$WORK/r2" > /dev/null
node "$HERE/layers.mjs" "$WORK/r3" "$WORK/uniques.json" 1200 > /dev/null
python3 "$HERE/finish.py" "$WORK/r2" "$WORK/r3" > /dev/null
python3 "$HERE/webp.py" "$WORK/r2" "$WORK/r3" "$SITE/public/archive"
python3 "$HERE/border.py" "$SITE/public/archive"
