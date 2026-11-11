"""The pipeline's PNGs -> public/archive/item/<key>.webp (the item alone, transparent, at most 640 on its long side;
a backdrop's scene square) and public/archive/worn/<key>-m.webp / -f.webp (the standard agents wearing it, 480),
each folder with index.json (its keys). Usage: python3 webp.py <bust renders> <layer renders> <site public/archive>."""
import glob, json, os, sys
from PIL import Image
R2, R3, OUT = sys.argv[1:4]
item, worn = os.path.join(OUT, 'item'), os.path.join(OUT, 'worn')
os.makedirs(item, exist_ok=True); os.makedirs(worn, exist_ok=True)
for f in glob.glob(os.path.join(R3, '*.final.png')):
    im = Image.open(f).convert('RGBA'); im.thumbnail((640, 640), Image.LANCZOS)
    im.save(os.path.join(item, os.path.basename(f)[:-len('.final.png')] + '.webp'), 'WEBP', quality=86, method=6)
for f in glob.glob(os.path.join(R2, '*.scene.png')):
    Image.open(f).convert('RGB').resize((640, 640), Image.LANCZOS).save(os.path.join(item, os.path.basename(f)[:-len('.scene.png')] + '.webp'), 'WEBP', quality=82, method=6)
for f in glob.glob(os.path.join(R2, '*.worn-*.png')):
    k, g = os.path.basename(f)[:-4].split('.worn-')
    Image.open(f).convert('RGB').resize((480, 480), Image.LANCZOS).save(os.path.join(worn, f'{k}-{g}.webp'), 'WEBP', quality=82, method=6)
for d in (item, worn):
    keys = sorted(os.path.basename(p)[:-5] for p in glob.glob(os.path.join(d, '*.webp')))
    with open(os.path.join(d, 'index.json'), 'w') as fh: json.dump(keys, fh); fh.write('\n')
    print(d, len(keys))
