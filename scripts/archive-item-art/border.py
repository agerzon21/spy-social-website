"""The Black Diamond border alone for the display case (owner Nov 11: a border shows in C's case on the same dark room
as every item, not on the flat grey-blue field). Reads public/archive/scene/<key>.webp (the border drawn by the app on
an empty #8e99ae spotlight, scripts/archive-art standard-agents-1111) and lifts the border off its field: the flat
field outside and the spotlight's gradient inside are flood-filled from a corner and from the middle (each fill
stops at the border's dark onyx band), the rest is the border with its glow. Writes public/archive/item/<key>.webp
and adds the keys to public/archive/item/index.json.
Usage: python3 border.py <site public/archive>"""
import glob, json, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = sys.argv[1]
SCENE, ITEM = os.path.join(ROOT, 'scene'), os.path.join(ROOT, 'item')
done = []
for f in sorted(glob.glob(os.path.join(SCENE, '*frame_black_diamond*.webp'))):
    if f.endswith('-s.webp'):
        continue
    key = os.path.basename(f)[:-5]
    im = Image.open(f).convert('RGB')
    W, H = im.size
    px = np.asarray(im).astype(np.float32)
    # Inside: the spotlight (mid grey-blue: luma 95..172, little colour), reached from the middle; it stops at the
    # border's dark inner line and never reaches the platinum rails (lighter) or the field outside (checked: no leak).
    luma = px @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    sat = px.max(axis=2) - px.min(axis=2)
    grey = Image.fromarray((((luma > 95) & (luma < 172) & (sat < 34)) * 255).astype(np.uint8)).copy()
    ImageDraw.floodfill(grey, (W // 2, H // 2), 128)
    inside = np.array(grey) == 128
    if inside[2, 2]:
        raise SystemExit(f'{key}: the spotlight fill reached the field outside')
    inside = np.asarray(Image.fromarray((inside * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) > 0
    # Outside: the flat field, lifted softly (its glow kept, the field's grey taken out of it).
    field = px[2, 2]
    a = np.clip(np.abs(px - field).max(axis=2) / 45.0, 0, 1)
    a[inside] = 0
    a = np.asarray(Image.fromarray((a * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))).astype(np.float32) / 255
    rgb = np.where(a[..., None] > 0.02, (px - (1 - a[..., None]) * field) / np.maximum(a[..., None], 0.02), px)
    out = Image.fromarray(np.dstack([np.clip(rgb, 0, 255), a * 255]).astype(np.uint8))
    box = out.getbbox()
    out.crop(box).save(os.path.join(ITEM, key + '.webp'), 'WEBP', quality=88, method=6)
    done.append(key)
idx = os.path.join(ITEM, 'index.json')
keys = set(json.load(open(idx))) if os.path.exists(idx) else set()
with open(idx, 'w') as fh:
    json.dump(sorted(keys | set(done)), fh)
    fh.write('\n')
print('borders', len(done))
