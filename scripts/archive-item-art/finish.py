"""The item-alone cut-out each copy uses: a hat or an outfit from the full body's layers (an outfit's skin removed),
glasses or an accessory from the bust's three-wearer cut-out. Writes <key>.final.png cropped to the item."""
import json, sys, os, numpy as np
from PIL import Image
R2, R3 = sys.argv[1], sys.argv[2]
def crop(im):
    a = np.asarray(im)[:, :, 3]; ys, xs = np.where(a > 24)
    pad = int(0.03 * max(np.ptp(xs), np.ptp(ys)))
    return im.crop((max(0, xs.min() - pad), max(0, ys.min() - pad), min(im.width, xs.max() + pad), min(im.height, ys.max() + pad)))
for f in sorted(os.listdir(R3)):
    if not f.endswith('.layers.png'): continue
    k = f[:-len('.layers.png')]
    im = Image.open(f'{R3}/{f}').convert('RGBA')
    s2 = f'{R3}/{k}.layers-skin2.png'
    if os.path.exists(s2):
        a, b = np.asarray(im).astype(np.int16), np.asarray(Image.open(s2).convert('RGBA')).astype(np.int16)
        diff = np.abs(a[:, :, :3] - b[:, :, :3]).max(axis=2) > 10
        arr = np.asarray(im).copy(); arr[diff, 3] = 0; im = Image.fromarray(arr)
    crop(im).save(f'{R3}/{k}.final.png'); print('layers', k)
for f in sorted(os.listdir(R2)):
    if not f.endswith('.item.png'): continue
    k = f[:-len('.item.png')]
    if 'glasses' in k or 'accessory' in k:
        crop(Image.open(f'{R2}/{f}').convert('RGBA')).save(f'{R3}/{k}.final.png'); print('bust', k)
