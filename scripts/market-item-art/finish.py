"""The Market's renders -> public/market/art (market-art-1111). Usage:
  python3 finish.py <wear.mjs dir (after the Archive's mask.py) or -> <harness dir or -> <site public/market-art> <index: src/pages/market/art.json>
Writes, per item code:
  <code>.webp (the big picture: a cut-out on transparency at most 600 on its long side, or a full frame 640 square)
  <code>-s.webp (the list's: 128)
  title/<lang>/<code>.webp and intercept/<lang>/<tier>.webp (the plate / the file with its stamp in that language)
and the index (src/pages/market/art.json): { "<code>": "case" | "scene" | "plate", ... , "langs": [...] }: what each picture is."""
import glob, json, os, sys
import numpy as np
from PIL import Image

R, H, OUT, IDX = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
os.makedirs(OUT, exist_ok=True)
idx_path = IDX
index = json.load(open(idx_path)) if os.path.exists(idx_path) else {}


def crop(im, pad=0.03):
    a = np.asarray(im)[:, :, 3]
    ys, xs = np.where(a > 24)
    if len(xs) == 0:
        return None
    p = int(pad * max(np.ptp(xs), np.ptp(ys)))
    return im.crop((max(0, xs.min() - p), max(0, ys.min() - p), min(im.width, xs.max() + p), min(im.height, ys.max() + p)))


def rim(im):
    """The full-body layers' white rim (the app's sticker edge, fullBodyFigure rim #ffffff) round a bust cut-out, so glasses,
    accessories and colours match the hats and outfits and a dark item still reads on the case's dark room."""
    from PIL import ImageFilter
    r = max(3, int(0.011 * max(im.size)))
    a = im.getchannel('A').point(lambda v: 255 if v > 90 else 0)
    # A blur then a low threshold: the shape grown by about r (a big MaxFilter is slow in Pillow).
    edge = a.filter(ImageFilter.GaussianBlur(r * 0.55)).point(lambda v: 255 if v > 14 else 0).filter(ImageFilter.GaussianBlur(0.8))
    under = Image.new('RGBA', im.size, (255, 255, 255, 0)); under.putalpha(edge.point(lambda v: int(v * 0.92)))
    return Image.alpha_composite(under, im)


def save_cut(code, im, sub=''):
    d = os.path.join(OUT, sub)
    os.makedirs(d, exist_ok=True)
    big = im.copy(); big.thumbnail((600, 600), Image.LANCZOS)
    big.save(os.path.join(d, code + '.webp'), 'WEBP', quality=86, method=6)
    sm = im.copy(); sm.thumbnail((128, 128), Image.LANCZOS)
    sm.save(os.path.join(d, code + '-s.webp'), 'WEBP', quality=84, method=6)


def save_scene(code, im):
    im = im.convert('RGB')
    im.resize((640, 640), Image.LANCZOS).save(os.path.join(OUT, code + '.webp'), 'WEBP', quality=80, method=6)
    im.resize((128, 128), Image.LANCZOS).save(os.path.join(OUT, code + '-s.webp'), 'WEBP', quality=80, method=6)


def matte(k, w):
    """A cut-out from the same picture on black and on white: alpha = 1 - (white - black)."""
    kb = np.asarray(Image.open(k).convert('RGB')).astype(np.float32)
    wb = np.asarray(Image.open(w).convert('RGB')).astype(np.float32)
    a = 1 - np.clip((wb - kb).max(axis=2) / 255.0, 0, 1)
    rgb = np.where(a[..., None] > 0.004, kb / np.maximum(a[..., None], 0.004), 0)
    return Image.fromarray(np.dstack([np.clip(rgb, 0, 255), a * 255]).astype(np.uint8))


done = {'case': 0, 'scene': 0, 'plate': 0}
if R != '-':
    # Glasses, accessories, colours: mask.py's <code>.item.png; hats, outfits: the layers (an outfit's skin out).
    for f in sorted(glob.glob(os.path.join(R, '*.item.png'))):
        code = os.path.basename(f)[:-len('.item.png')]
        im = crop(Image.open(f).convert('RGBA'), 0.05)
        if im is not None:
            save_cut(code, rim(im)); index[code] = 'case'; done['case'] += 1
    for f in sorted(glob.glob(os.path.join(R, '*.layers.png'))):
        code = os.path.basename(f)[:-len('.layers.png')]
        im = Image.open(f).convert('RGBA')
        s2 = os.path.join(R, code + '.layers-skin2.png')
        if os.path.exists(s2):
            a = np.asarray(im).astype(np.int16); b = np.asarray(Image.open(s2).convert('RGBA')).astype(np.int16)
            diff = np.abs(a[:, :, :3] - b[:, :, :3]).max(axis=2) > 10
            arr = np.asarray(im).copy(); arr[diff, 3] = 0; im = Image.fromarray(arr)
        im = crop(im)
        if im is not None:
            save_cut(code, im); index[code] = 'case'; done['case'] += 1
    for f in sorted(glob.glob(os.path.join(R, '*.scene.png'))):
        code = os.path.basename(f)[:-len('.scene.png')]
        save_scene(code, Image.open(f)); index[code] = 'scene'; done['scene'] += 1

langs = set(index.get('langs', []))
if H != '-':
    # The harness's shots: <key>.<lang>.<bg>.png, key c-<code> (a celebration: full frame), b-<code> (a border round its
    # empty dark stage: cut out by the black/white pair), t-<code> (a title's plate, per language), i-<tier> (a file).
    shots = {}
    for f in glob.glob(os.path.join(H, '*.png')):
        key, lang, bg = os.path.basename(f)[:-4].rsplit('.', 2)
        shots.setdefault((key, lang), {})[bg] = f
    for (key, lang), by in sorted(shots.items()):
        kind, code = key[0], key[2:]
        if kind == 'c' and lang == 'en':
            save_scene(code, Image.open(by['k'])); index[code] = 'scene'; done['scene'] += 1
        elif kind == 'b' and lang == 'en' and 'w' in by:
            im = crop(matte(by['k'], by['w']), 0.02)
            save_cut(code, im); index[code] = 'case'; done['case'] += 1
        elif kind == 't' and 'w' in by:
            im = crop(matte(by['k'], by['w']), 0.04)
            save_cut(code, im, os.path.join('title', lang)); index[code] = 'plate'; langs.add(lang); done['plate'] += 1
        elif kind == 'i' and 'w' in by:
            im = crop(matte(by['k'], by['w']), 0.03)
            save_cut(code, im, os.path.join('intercept', lang)); index['intercept.tier.' + code] = 'file'; langs.add(lang)
index['langs'] = sorted(langs)
with open(idx_path, 'w') as fh:
    json.dump(dict(sorted(index.items())), fh, ensure_ascii=False)
    fh.write('\n')
print(done, len(index) - 1, 'in the index')
