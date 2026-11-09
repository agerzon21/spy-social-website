"""PNGs from the app's Unique tiles (qa/overflow/archiveArt.mjs) -> public/archive/art/<key>.webp (640) and <key>-s.webp
(320), and index.json (the keys). Usage: python3 webp.py <png dir> <site public/archive/art>. Keeps pictures already
there (a copy drawn once never changes: its float is minted)."""
import glob
import json
import os
import sys

from PIL import Image

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
for f in sorted(glob.glob(os.path.join(src, '*.png'))):
    key = os.path.basename(f)[:-4]
    im = Image.open(f).convert('RGB')
    im.resize((640, 640), Image.LANCZOS).save(os.path.join(out, key + '.webp'), 'WEBP', quality=80, method=6)
    im.resize((320, 320), Image.LANCZOS).save(os.path.join(out, key + '-s.webp'), 'WEBP', quality=78, method=6)
keys = sorted({os.path.basename(p)[:-5] for p in glob.glob(os.path.join(out, '*.webp')) if not p.endswith('-s.webp')})
with open(os.path.join(out, 'index.json'), 'w') as fh:
    json.dump(keys, fh)
    fh.write('\n')
print(len(keys), 'pictures')
