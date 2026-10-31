from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math
import random

W, H = 1200, 630
random.seed(41)
image = Image.new("RGB", (W, H))
p = image.load()
for y in range(H):
    for x in range(W):
        glow = max(0, 1 - math.hypot((x-720)/820, (y-80)/720))
        p[x, y] = (int(26 + 40*glow), int(17 + 23*glow), int(31 + 35*glow))

halo = Image.new("RGBA", (W, H))
hd = ImageDraw.Draw(halo)
for radius in range(230, 10, -10):
    hd.ellipse((790-radius, 260-radius, 790+radius, 260+radius), fill=(217, 169, 84, max(1, 18-radius//18)))
halo = halo.filter(ImageFilter.GaussianBlur(30))
image = Image.alpha_composite(image.convert("RGBA"), halo)
d = ImageDraw.Draw(image)

d.arc((590, 55, 1080, 565), 180, 360, fill=(217, 169, 84, 210), width=4)
d.line([(610, 550), (610, 300), (1060, 300), (1060, 550)], fill=(217, 169, 84, 100), width=3)
d.polygon([(713, 520), (713, 253), (790, 142), (867, 253), (867, 520)], fill=(43, 27, 47), outline=(217, 169, 84), width=4)
d.polygon([(682, 520), (682, 307), (898, 307), (898, 520)], fill=(43, 27, 47), outline=(217, 169, 84), width=4)
d.rectangle((770, 260, 810, 307), fill=(240, 223, 187, 220))
d.rounded_rectangle((762, 420, 818, 520), radius=28, fill=(240, 223, 187, 170))
d.line([(560, 550), (1110, 550)], fill=(217, 169, 84, 160), width=3)
d.ellipse((953, 61, 1035, 143), fill=(240, 223, 187, 230))
d.ellipse((936, 49, 1013, 126), fill=(62, 39, 59, 255))

for i in range(45):
    x = random.randrange(W)
    y = random.randrange(H)
    r = random.choice([1, 1, 2])
    d.ellipse((x-r, y-r, x+r, y+r), fill=(217, 169, 84, random.randrange(35, 120)))

def die(cx, cy, size, angle, value):
    tile = Image.new("RGBA", (size+60, size+60))
    td = ImageDraw.Draw(tile)
    td.rounded_rectangle((30, 30, 30+size, 30+size), radius=18, fill=(240, 223, 187), outline=(255, 245, 218), width=4)
    positions = {1:[(0,0)],2:[(-1,-1),(1,1)],3:[(-1,-1),(0,0),(1,1)],4:[(-1,-1),(1,-1),(-1,1),(1,1)],5:[(-1,-1),(1,-1),(0,0),(-1,1),(1,1)],6:[(-1,-1),(1,-1),(-1,0),(1,0),(-1,1),(1,1)]}[value]
    for px, py in positions:
        x = 30+size/2+px*size*.26
        y = 30+size/2+py*size*.26
        r = size*.065
        td.ellipse((x-r,y-r,x+r,y+r), fill=(48,35,52))
    tile = tile.rotate(angle, resample=Image.Resampling.BICUBIC, expand=False)
    image.alpha_composite(tile, (int(cx-tile.width/2), int(cy-tile.height/2)))

die(620, 420, 104, -13, 5)
die(988, 422, 96, 12, 3)

font_dir = Path("C:/Windows/Fonts")
def font(name, size):
    try:
        return ImageFont.truetype(str(font_dir / name), size)
    except OSError:
        return ImageFont.load_default(size=size)

d.text((67, 83), "A CANDLELIT GAME OF NERVE", font=font("trebuc.ttf", 19), fill=(217,169,84))
d.text((62, 126), "DICE & DUSK", font=font("georgiab.ttf", 70), fill=(248,237,207))
d.text((70, 225), "Three dice. Three choices. One last bell.", font=font("georgiai.ttf", 25), fill=(240,223,187))
d.text((72, 289), "Read your enemy. Spend your dice on steel,", font=font("trebuc.ttf", 21), fill=(190,162,181))
d.text((72, 321), "safety or sorcery.", font=font("trebuc.ttf", 21), fill=(190,162,181))
d.rounded_rectangle((70, 390, 352, 450), radius=5, fill=(217,169,84))
d.text((93, 407), "ENTER THE DUNGEON", font=font("trebucbd.ttf", 17), fill=(45,32,48))
d.line([(320, 420), (334, 420)], fill=(45,32,48), width=2)
d.line([(329, 414), (334, 420), (329, 426)], fill=(45,32,48), width=2)

output = Path(__file__).with_name("cover.png")
image.convert("RGB").save(output, optimize=True)
print(output)
