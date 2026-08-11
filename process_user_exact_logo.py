from PIL import Image

src_path = r"C:\Users\as\.gemini\antigravity\brain\131d9ab5-d7e1-4385-9579-3149295c740f\.user_uploaded\media__1786486748379.png"

img = Image.open(src_path).convert("RGBA")
print(f"Original User Image Size: {img.size}")

# Save exact original copy
img.save(r"f:\fahad project 1\assets\images\user-exact-logo-raw.png", "PNG")

# Crop tight bounding box
bbox = img.getbbox()
if bbox:
    cropped = img.crop(bbox)
    print(f"Cropped tight size: {cropped.size}")
    cropped.save(r"f:\fahad project 1\assets\images\user-exact-logo-tight.png", "PNG")

# Now let's remove dark background to make a pristine 100% transparent PNG for white header!
def remove_dark_bg_exact(pil_img):
    datas = pil_img.getdata()
    new_data = []
    for item in datas:
        r, g, b, a = item
        brightness = 0.299 * r + 0.587 * g + 0.114 * b
        # Dark navy background removal
        if r < 35 and g < 40 and b < 65 and brightness < 40:
            new_data.append((0, 0, 0, 0)) # Fully transparent
        elif brightness < 65 and r < 50 and g < 55 and b < 85:
            alpha = int(((brightness - 25) / 40.0) * 255)
            alpha = max(0, min(255, alpha))
            new_data.append((r, g, b, alpha))
        else:
            new_data.append(item)
    pil_img.putdata(new_data)
    return pil_img

transparent_version = remove_dark_bg_exact(img.copy())
t_bbox = transparent_version.getbbox()
if t_bbox:
    transparent_version = transparent_version.crop(t_bbox)

# Save transparent version (for header)
transparent_version.save(r"f:\fahad project 1\assets\images\user-exact-logo-header.png", "PNG")

# Save exact dark version (for footer)
if bbox:
    cropped.save(r"f:\fahad project 1\assets\images\user-exact-logo-footer.png", "PNG")

print("Processed user exact logo into header and footer assets successfully.")
