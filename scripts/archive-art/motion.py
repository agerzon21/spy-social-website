"""The moving celebrations' loops (archive-item-art-1111, owner Nov 11): the frames qa/overflow/archiveMotion.mjs shot
(the app's own previews on Playwright's clock, `dt` ms apart, each cell full frame with the standard agents and no
plate) -> public/archive/motion/<key>.webp, or <key>.<lang>.webp where the scene has words in the reader's language,
one loop each (the preview's own period, from loops.json), and index.json ({key: ["*"] or [langs]}). Its still
(Reduce Motion, the grid) is a frame of the loop, in each language where it has words: <key>[.<lang>].poster.webp, the
frame nearest its public/archive/scene picture where there is one, else the loop's fullest frame.
Usage: python3 motion.py <frames dir (one folder per language)> <cells.json> <site public/archive/motion> <dt>
WORDED: the scenes whose pictures carry the app's words (Paper Plane's TOP SECRET, Laser Trap's INTRUDER and ALARM,
Unmasked's UNMASKED; checked en against ru, Nov 11): one loop per language; every other scene one loop for all."""
import json, os, sys
from PIL import Image

FR, CELLS, OUT, DT = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
SIZE = 400
POSTERS_ONLY = '--posters-only' in sys.argv  # the loops already made: their stills alone
WORDED = {'celebration_paper_plane', 'local_laser_trap', 'local_unmasked'}
os.makedirs(OUT, exist_ok=True)
cells = json.load(open(CELLS))
langs = sorted(d for d in os.listdir(FR) if os.path.isdir(os.path.join(FR, d)))
langs = ['en'] + [l for l in langs if l != 'en']


def period_of(lang, code):
    loops = json.load(open(os.path.join(FR, lang, 'loops.json')))
    vals = loops.get(code) or []
    return max(vals) if vals else None


def frames_of(lang, key, period):
    d = os.path.join(FR, lang, key)
    files = sorted(f for f in os.listdir(d) if f.endswith('.png'))
    n = max(2, round(period / DT))
    if len(files) < n:
        raise SystemExit(f'{key} {lang}: {len(files)} frames, the loop needs {n} (raise --to)')
    ims = [Image.open(os.path.join(d, f)).convert('RGB').resize((SIZE, SIZE), Image.LANCZOS) for f in files[:n]]
    durs = [DT] * n
    durs[-1] = max(20, period - DT * (n - 1))
    return ims, durs


def poster_index(ims, scene_path):
    import numpy as np
    small = [np.asarray(x.resize((100, 100))).astype(int) for x in ims]
    if os.path.exists(scene_path):
        ref = np.asarray(Image.open(scene_path).convert('RGB').resize((100, 100))).astype(int)
        return int(np.argmin([np.abs(x - ref).mean() for x in small]))
    return int(np.argmax([x.std() for x in small]))


def save_poster(im, path):
    im.save(path, 'WEBP', quality=80, method=4)


def save(ims, durs, path):
    ims[0].save(path, 'WEBP', save_all=True, append_images=ims[1:], duration=durs, loop=0, quality=72, method=3)


index = {}
total = 0
for c in cells:
    key, code = c['key'], c['code']
    local = code.startswith('local_')
    # The preview's code key: a local by its local code, a celebration by its own (CelebrationPreview: local ?? code).
    reg = code.replace('celebration_', '').replace('local_', '')
    period = None
    for k in (code, reg):
        period = period or period_of('en', k)
    if not period:
        loops = json.load(open(os.path.join(FR, 'en', 'loops.json')))
        cand = [v for k, vs in loops.items() if reg.replace('_', '') in k.replace('_', '').lower() for v in vs]
        period = max(cand) if cand else None
    if not period:
        print('no loop for', key); continue
    en, durs = frames_of('en', key, period)
    at = poster_index(en, os.path.join(OUT, '..', 'scene', f'{key}.webp'))
    if code in WORDED:
        per = {lang: (en if lang == 'en' else frames_of(lang, key, period)[0]) for lang in langs if os.path.isdir(os.path.join(FR, lang, key))}
        for lang, ims in per.items():
            p = os.path.join(OUT, f'{key}.{lang}.webp')
            if not POSTERS_ONLY:
                save(ims, durs, p); total += os.path.getsize(p)
            save_poster(ims[at], os.path.join(OUT, f'{key}.{lang}.poster.webp'))
        index[key] = sorted(per)
    else:
        p = os.path.join(OUT, f'{key}.webp')
        if not POSTERS_ONLY:
            save(en, durs, p); total += os.path.getsize(p)
        save_poster(en[at], os.path.join(OUT, f'{key}.poster.webp'))
        index[key] = ['*']
    print(key, period, 'ms', len(en), 'frames', index[key], round(os.path.getsize(p) / 1024), 'KB')
with open(os.path.join(OUT, 'index.json'), 'w') as fh:
    json.dump(index, fh, sort_keys=True); fh.write('\n')
print('total', round(total / 1024), 'KB')
