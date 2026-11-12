#!/usr/bin/env python3
"""
Link-preview cards (link-previews-1112): one 1200x630 JPEG per Unique the Archive has a picture of and per item the
Market has a picture of, for the og:image / twitter:image that middleware.ts puts on an item's page for a link
previewer (Discord, iMessage, X...). Made from the pictures already in public/ (the Archive's and the Market's, made
from the app's own drawing), in English (the previewers' cards are English).

  public/og/a/<key>.jpg   a Unique (u-<item>-<serial>) or its item's Legendary (l-<item>), the Archive's keys
  public/og/m/<key>.jpg   a Market item: <item code>, title-<code>, intercept-<tier>
  public/og/index.json    {"a": {key: hash}, "m": {key: hash}}: middleware.ts reads which cards exist (the hash goes
                          in the image address, so a redrawn card is fetched again)

Run after scripts/archive-art or scripts/market-item-art (needs Python 3 with Pillow, fontTools and brotli; reads the
Market's English names from the live ledger function, public, no key):

  python3 scripts/og-cards/make.py            # every card
  python3 scripts/og-cards/make.py --only a   # the Archive's only
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
import sys
import tempfile
import urllib.request

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
PUB = os.path.join(ROOT, 'public')
OUT = os.path.join(PUB, 'og')
LEDGER = 'https://ajobkfasquywiawjfdxg.supabase.co/functions/v1/ledger'

W, H = 1200, 630
# The Noir skin (src/theme/skins/noir.ts).
PAGE = (10, 17, 28)
TEXT = (254, 250, 234)
HIGHLIGHT = (255, 209, 102)
LEGENDARY = '#F2B64D'
# lib/market.ts RARITY_COLOUR (dark).
RARITY = {'common': '#A3A9B4', 'uncommon': '#6FD39F', 'rare': '#7FB4F5', 'epic': '#C39CFF', 'mythic': '#FF7FB0',
          'legendary': '#F2B64D', 'intercept': '#ffd166'}
SHELF = [('outfit_', 'Outfit'), ('hat_', 'Hat'), ('glasses_', 'Glasses'), ('hair_', 'Hair'), ('facial_hair_', 'Facial hair'),
         ('frame_', 'Border'), ('background_', 'Backdrop'), ('celebration_', 'Celebration'), ('local_', 'Celebration')]


def font_file(name: str, tmp: str) -> str:
    """A woff2 of the site's (src/assets/fonts) as a TTF Pillow can read."""
    out = os.path.join(tmp, name.replace('.woff2', '.ttf'))
    if not os.path.exists(out):
        f = TTFont(os.path.join(ROOT, 'src', 'assets', 'fonts', name))
        f.flavor = None
        f.save(out)
    return out


class Fonts:
    def __init__(self, tmp: str):
        self.display = font_file('big-shoulders-display-latin.woff2', tmp)
        self.bold = font_file('barlow-700-latin.woff2', tmp)
        self.semi = font_file('barlow-600-latin.woff2', tmp)
        self.italic = font_file('barlow-500-italic-latin.woff2', tmp)

    def big(self, size: int) -> ImageFont.FreeTypeFont:
        f = ImageFont.truetype(self.display, size)
        f.set_variation_by_axes([900])
        return f


def hex_rgb(h: str):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def glow(colour, centre, radius, strength):
    """A soft round light in `colour` (RGBA layer)."""
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = centre
    d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=(*colour, strength))
    return layer.filter(ImageFilter.GaussianBlur(radius * 0.45))


def tracked(draw, xy, text, font, fill, tracking):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


def wrap(draw, text, font, width):
    words, lines, line = text.split(), [], ''
    for w in words:
        t = f'{line} {w}'.strip()
        if draw.textlength(t, font=font) <= width or not line:
            line = t
        else:
            lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines


def card(fonts: Fonts, pic: Image.Image, kind: str, eyebrow: str, name: str, sub: str, sub_colour, note: str | None, tint) -> Image.Image:
    """kind: 'cut' (a cut-out item on the light) or 'tile' (a full-frame picture, framed)."""
    im = Image.new('RGBA', (W, H), (*PAGE, 255))
    # The spotlight from above and the item's own colour behind it, on the right.
    cx, cy = 905, 330
    im.alpha_composite(glow(tint, (cx, cy + 20), 250, 120))
    im.alpha_composite(glow((255, 240, 205), (cx, cy - 40), 200, 60))
    d = ImageDraw.Draw(im)

    box = 470 if kind == 'tile' else 440
    pic = pic.convert('RGBA')
    scale = min(box / pic.width, box / pic.height)
    if kind == 'cut':
        scale = min(scale, 2.2)
    pw, ph = max(1, round(pic.width * scale)), max(1, round(pic.height * scale))
    pic = pic.resize((pw, ph), Image.LANCZOS)
    px, py = cx - pw // 2, cy - ph // 2
    if kind == 'tile':
        shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(shadow).rectangle((px + 10, py + 18, px + pw + 10, py + ph + 18), fill=(0, 0, 0, 150))
        im.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(16)))
        im.alpha_composite(pic, (px, py))
        d.rectangle((px - 1, py - 1, px + pw, py + ph), outline=(*TEXT, 60), width=2)
    else:
        sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        alpha = pic.split()[3].point(lambda a: a * 0.55)
        dark = Image.new('RGBA', pic.size, (0, 0, 0, 255))
        dark.putalpha(alpha)
        sh.alpha_composite(dark, (px + 8, py + 16))
        im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(12)))
        im.alpha_composite(pic, (px, py))

    # The words, left: the name as large as fits with its lines above the wordmark.
    x, width = 72, 520
    logo = Image.open(os.path.join(PUB, 'images', 'logo-light.png')).convert('RGBA')
    lw = 190
    logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
    limit = H - 64 - logo.height - 28
    sub_font = ImageFont.truetype(fonts.bold, 26)
    nf = ImageFont.truetype(fonts.italic, 28)
    notes = wrap(d, note, nf, width)[:2] if note else []
    top = 150
    size = 118
    while True:
        f = fonts.big(size)
        lines = wrap(d, name.upper(), f, width)
        lead = round(size * 0.9)
        last = d.textbbox((0, top + lead * (len(lines) - 1)), lines[-1], font=f)[3]
        end = last + 24 + 42 + 36 * len(notes)
        fits = len(lines) <= 3 and all(d.textlength(l, font=f) <= width for l in lines) and end <= limit
        if fits or size <= 48:
            break
        size -= 4
    y = 74
    tracked(d, (x, y), eyebrow.upper(), ImageFont.truetype(fonts.bold, 24), HIGHLIGHT, 4)
    d.rectangle((x, y + 40, x + 56, y + 43), fill=HIGHLIGHT)
    y = top
    for line in lines:
        d.text((x - 2, y), line, font=f, fill=TEXT)
        y += lead
    y = last + 24
    tracked(d, (x, y), sub.upper(), sub_font, sub_colour, 2.5)
    y += 42
    for line in notes:
        d.text((x, y), line, font=nf, fill=(*TEXT, 215))
        y += 36

    # The wordmark, bottom left.
    im.alpha_composite(logo, (x - 4, H - 64 - logo.height))
    return im.convert('RGB')


def save(img: Image.Image, path: str) -> str:
    buf = io.BytesIO()
    img.save(buf, 'JPEG', quality=80, optimize=True, progressive=True)
    data = buf.getvalue()
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as fh:
        fh.write(data)
    return hashlib.sha256(data).hexdigest()[:8]


def keys(rel: str) -> set:
    p = os.path.join(PUB, rel)
    if not os.path.exists(p):
        return set()
    v = json.load(open(p))
    return set(v.keys() if isinstance(v, dict) else v)


def serial_text(n: int) -> str:
    return '#' + str(n).zfill(5)


ROMAN = [(1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'), (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'), (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')]


def codename(data, item: str, serial: int):
    """lib/archive.ts codenameOf, in English."""
    it = data['items'].get(item)
    if not it or serial < 1:
        return None
    nouns = data['codenames']['nouns'].get(it['pool'])
    if not nouns:
        return None
    rnd = (serial - 1) // 128 + 1
    k = (serial - 1) % 128 + 1
    n = (it['offset'] + k * 53) % 128
    noun = (nouns[n // 16] if n // 16 < len(nouns) else '').split(':')[0]
    name = data['codenames']['template'].replace('{{mod}}', data['codenames']['mods'][n % 16]).replace('{{noun}}', noun).replace('{{of}}', '')
    mark = ''
    r = rnd
    for v, s in ROMAN:
        while r >= v:
            mark += s
            r -= v
    return f'{name} {mark}' if rnd > 1 else name


def swatch(data, item: str, flt: str | None):
    it = data['items'].get(item)
    if not it or not flt:
        return None
    digits = (flt.split('.')[1] if '.' in flt else '').ljust(6, '0')[:6]
    for a in it['attrs']:
        if a['place'] == 2:
            v = a['values'][int(digits[1]) % len(a['values'])]
            return v.get('hex')
    return None


def archive_cards(fonts: Fonts, index: dict):
    data = json.load(open(os.path.join(PUB, 'archive', 'data', 'en.json')))
    art = keys('archive/art/index.json')
    item_k, scene_k = keys('archive/item/index.json'), keys('archive/scene/index.json')
    motion = json.load(open(os.path.join(PUB, 'archive', 'motion', 'index.json')))
    # The copies' floats (the glow's colour) from the live list; without it the Legendary gold.
    floats = {}
    try:
        with urllib.request.urlopen(f'{LEDGER}?op=uniques', timeout=20) as r:
            for c in json.load(r).get('copies', []):
                floats[f"u-{c['item_code']}-{c['serial']}"] = c['float']
    except Exception as e:  # noqa: BLE001
        print('uniques list unavailable, Legendary gold for every glow:', e, file=sys.stderr)
    out = {}
    for key in sorted(art):
        if key.startswith('x-'):
            continue
        if key.startswith('u-'):
            item, serial = key[2:].rsplit('-', 1)
            serial = int(serial)
        else:
            item, serial = key[2:], None
        info = data['items'].get(item)
        if not info:
            continue
        # The page's picture (lib/archive lookOf): the item alone, else its scene, else its tile.
        if key in item_k:
            pic, kind = Image.open(os.path.join(PUB, 'archive', 'item', f'{key}.webp')), 'cut'
            if item.startswith('background_'):
                kind = 'tile'
        elif key in motion:
            langs = motion[key]
            pic, kind = Image.open(os.path.join(PUB, 'archive', 'motion', f"{key}{'' if '*' in langs else '.en'}.poster.webp")), 'tile'
        elif key in scene_k:
            pic, kind = Image.open(os.path.join(PUB, 'archive', 'scene', f'{key}.webp')), 'tile'
        else:
            pic, kind = Image.open(os.path.join(PUB, 'archive', 'art', f'{key}.webp')), 'tile'
        tint = hex_rgb(swatch(data, item, floats.get(key)) or LEGENDARY)
        sub = f"{data['words']['unique']} {serial_text(serial)}" if serial else data['words']['unique']
        cn = codename(data, item, serial) if serial else None
        note = f'“{cn}”' if cn else info.get('kindLine', '').replace('Avatar · ', '')
        img = card(fonts, pic, kind, 'The Archive', info['name'], sub, hex_rgb(LEGENDARY), note, tint)
        out[key] = save(img, os.path.join(OUT, 'a', f'{key}.jpg'))
    index['a'] = out


def shelf(code: str) -> str:
    for pre, label in SHELF:
        if code.startswith(pre):
            return label
    return 'Accessory'


def market_cards(fonts: Fonts, index: dict):
    kinds = json.load(open(os.path.join(ROOT, 'src', 'pages', 'market', 'art.json')))
    words = json.load(open(os.path.join(ROOT, 'src', 'pages', 'market', 'words', 'en.json')))
    with urllib.request.urlopen(f'{LEDGER}?op=market&lang=en', timeout=20) as r:
        items = json.load(r)['items']
    out = {}
    seen = set()
    for it in items:
        k, i = it['k'], it['i']
        intercept = it.get('t') or k == 'intercept'
        key = f'intercept-{i}' if intercept else f'title-{i}' if k == 'title' else i
        if key in seen:
            continue
        if intercept:
            if not kinds.get(f'intercept.tier.{i}'):
                continue
            path, kind, sub = os.path.join(PUB, 'market-art', 'intercept', 'en', f'{i}.webp'), 'cut', 'Sealed Intercept'
        elif k == 'title':
            if kinds.get(i) != 'plate':
                continue
            path, kind, sub = os.path.join(PUB, 'market-art', 'title', 'en', f'{i}.webp'), 'cut', f"{it['r']} · Title"
        else:
            kd = kinds.get(i)
            if not isinstance(kd, str):
                continue
            path, kind, sub = os.path.join(PUB, 'market-art', f'{i}.webp'), 'tile' if kd == 'scene' else 'cut', f"{it['r']} · {shelf(i)}"
        if not os.path.exists(path):
            continue
        lk = f"{'intercept' if intercept else 'title' if k == 'title' else 'avatar'}:{i}"
        name = it['nm'] if it['nm'] and it['nm'] != i else words['n'].get(lk, i)
        colour = hex_rgb(RARITY.get(it['r'], RARITY['common']))
        line = words['d'].get(lk)
        img = card(fonts, Image.open(path), kind, 'Black Market', name, sub, colour, line, colour)
        out[key] = save(img, os.path.join(OUT, 'm', f'{key}.jpg'))
        seen.add(key)
    index['m'] = out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--only', choices=['a', 'm'])
    args = ap.parse_args()
    path = os.path.join(OUT, 'index.json')
    index = json.load(open(path)) if os.path.exists(path) else {}
    with tempfile.TemporaryDirectory() as tmp:
        fonts = Fonts(tmp)
        if args.only in (None, 'a'):
            archive_cards(fonts, index)
        if args.only in (None, 'm'):
            market_cards(fonts, index)
    # A card no longer in the index (its picture gone) is removed.
    for sub in ('a', 'm'):
        d = os.path.join(OUT, sub)
        if os.path.isdir(d):
            for f in os.listdir(d):
                if f.endswith('.jpg') and f[:-4] not in index.get(sub, {}):
                    os.remove(os.path.join(d, f))
    with open(path, 'w') as fh:
        json.dump({'a': dict(sorted(index.get('a', {}).items())), 'm': dict(sorted(index.get('m', {}).items()))}, fh, separators=(',', ':'))
        fh.write('\n')
    print(f"cards: {len(index.get('a', {}))} Archive, {len(index.get('m', {}))} Market")


if __name__ == '__main__':
    main()
