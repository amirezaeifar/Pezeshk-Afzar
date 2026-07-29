from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "image-recovery" / "testimonial-family-field.jpg"


def cover(image, size, focal):
    width, height = size
    scale = max(width / image.width, height / image.height)
    resized = image.resize(
        (round(image.width * scale), round(image.height * scale)),
        Image.Resampling.LANCZOS,
    )
    left = round((resized.width - width) * focal[0])
    top = round((resized.height - height) * focal[1])
    left = min(max(left, 0), resized.width - width)
    top = min(max(top, 0), resized.height - height)
    return resized.crop((left, top, left + width, top + height))


def finish(image):
    image = ImageEnhance.Color(image).enhance(1.06)
    image = ImageEnhance.Contrast(image).enhance(1.025)
    return ImageEnhance.Brightness(image).enhance(1.015)


with Image.open(SOURCE) as source:
    source = ImageOps.exif_transpose(source).convert("RGB")
    outputs = [
        ("family-sunset.jpg", (1440, 1200), (0.50, 0.07)),
        ("family-sunset-mobile.jpg", (1800, 1200), (0.50, 0.08)),
    ]

    for filename, size, focal in outputs:
        target = ROOT / "public" / "images" / "testimonials" / filename
        image = finish(cover(source, size, focal))
        image.save(
            target,
            "JPEG",
            quality=86,
            optimize=True,
            progressive=True,
            subsampling=1,
        )
        print(f"{SOURCE.name} -> {target.relative_to(ROOT)} ({size[0]}x{size[1]})")
