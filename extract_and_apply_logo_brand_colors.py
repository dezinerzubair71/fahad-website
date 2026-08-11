from PIL import Image
from collections import Counter

src_path = r"C:\Users\as\.gemini\antigravity\brain\131d9ab5-d7e1-4385-9579-3149295c740f\.user_uploaded\media__1786487747315.png"
img = Image.open(src_path).convert("RGBA")

# Sample non-transparent pixels to extract dominant color clusters
pixels = img.get_flattened_data() if hasattr(img, 'get_flattened_data') else img.getdata()
colors = []
for p in pixels:
    r, g, b, a = p
    if a > 100:
        # ignore pure black/white
        brightness = 0.299*r + 0.587*g + 0.114*b
        if 20 < brightness < 240:
            colors.append((r, g, b))

# Quantize color palette
quantized = img.quantize(colors=12).convert("RGB")
palette = quantized.getcolors(maxcolors=1000)
palette.sort(key=lambda x: x[0], reverse=True)

print("Dominant extracted colors from logo:")
extracted_hex = []
for count, (r, g, b) in palette[:10]:
    hex_code = f"#{r:02x}{g:02x}{b:02x}".upper()
    extracted_hex.append((count, hex_code, (r, g, b)))
    print(f"Count: {count}, Hex: {hex_code}, RGB: ({r}, {g}, {b})")
