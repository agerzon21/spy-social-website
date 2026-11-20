"""Item-alone cut-outs from gen2.mjs's renders: item = all three wearers agree, differs from the agent without it,
and isn't the bare backdrop. Writes <key>.item.png (RGBA, cropped to the item with a margin) and a report line."""
import json, sys
import numpy as np
from PIL import Image, ImageFilter

D = sys.argv[1]
TOL = 6  # per-channel tolerance (anti-aliasing)


def load(n):
    return np.asarray(Image.open(f'{D}/{n}.png').convert('RGB')).astype(np.int16)


def same(a, b):
    return np.abs(a - b).max(axis=2) <= TOL


for j in json.load(open(f'{D}/jobs.json')):
    k = j['key']
    w = [load(f'{k}.w{i}') for i in range(3)]
    base, field = load(f'{k}.base'), load(f'{k}.field')
    m = same(w[0], w[1]) & same(w[0], w[2]) & ~same(w[0], base) & ~same(w[0], field)
    img = Image.fromarray((m * 255).astype(np.uint8))
    # Close pinholes (edges where a wearer's colour bled through), drop specks, then soften the edge.
    img = img.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))
    img = img.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    a = np.asarray(img.filter(ImageFilter.GaussianBlur(1.2)))
    rgba = np.dstack([w[0].astype(np.uint8), a])
    ys, xs = np.where(a > 40)
    if len(xs) == 0:
        print(k, 'EMPTY'); continue
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    pad = int(0.04 * max(x1 - x0, y1 - y0))
    H, W = a.shape
    box = (max(0, x0 - pad), max(0, y0 - pad), min(W, x1 + pad), min(H, y1 + pad))
    out = Image.fromarray(rgba).crop(box)
    out.save(f'{D}/{k}.item.png')
    edge = [x0 <= 2, y0 <= 2, x1 >= W - 3, y1 >= H - 3]
    print(k, 'box', box, 'cover %.1f%%' % (100 * (a > 40).mean()), 'TOUCHES EDGE' if any(edge) else '')
