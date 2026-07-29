from pathlib import Path
import sys

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_SIZE = (1600, 2000)


def load(path):
    with Image.open(ROOT / path) as image:
        return ImageOps.exif_transpose(image).convert("RGB")


def cover(image, size, focal=(0.5, 0.5)):
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


def warm_grade(image, saturation=1.06, contrast=1.04, brightness=1.02):
    image = ImageEnhance.Color(image).enhance(saturation)
    image = ImageEnhance.Contrast(image).enhance(contrast)
    image = ImageEnhance.Brightness(image).enhance(brightness)

    warmth = Image.new("RGB", image.size, (255, 143, 78))
    return Image.blend(image, warmth, 0.035)


def clean_grade(image):
    image = ImageEnhance.Color(image).enhance(1.02)
    image = ImageEnhance.Contrast(image).enhance(1.05)
    return ImageEnhance.Brightness(image).enhance(1.04)


def rounded_mask(size, radius, arch=False):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    if arch:
        draw.rounded_rectangle((0, size[1] // 5, size[0], size[1]), radius=radius, fill=255)
        draw.ellipse((0, 0, size[0], size[0]), fill=255)
    else:
        draw.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def add_warm_light(image, strength=68):
    light = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(light)
    draw.ellipse(
        (-image.width // 3, image.height // 2, image.width, image.height + image.width // 2),
        fill=(255, 128, 56, strength),
    )
    light = light.filter(ImageFilter.GaussianBlur(image.width // 5))
    return Image.alpha_composite(image.convert("RGBA"), light)


def lifestyle_hero(primary_path, output_path, focal=(0.5, 0.5)):
    primary = warm_grade(cover(load(primary_path), OUTPUT_SIZE, focal=focal))
    composed = add_warm_light(primary, strength=48).convert("RGB")
    target = ROOT / output_path
    target.parent.mkdir(parents=True, exist_ok=True)
    composed.save(
        target,
        "JPEG",
        quality=86,
        optimize=True,
        progressive=True,
        subsampling=1,
    )


def equipment_hero(primary_path, output_path, focal=(0.5, 0.5)):
    canvas = clean_grade(cover(load(primary_path), OUTPUT_SIZE, focal=focal))
    target = ROOT / output_path
    target.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(
        target,
        "JPEG",
        quality=86,
        optimize=True,
        progressive=True,
        subsampling=1,
    )


LIFESTYLE_HEROES = [
    (
        "public/images/software/todays-mom-hero.jpg",
        "public/images/software/todays-mom-hero.jpg",
        (0.50, 0.46),
    ),
    (
        "tmp/image-recovery/mother-baby-premium.jpg",
        "public/images/software/skinapp-hero.jpg",
        (0.45, 0.56),
    ),
    (
        "public/images/company/hero-sunrise.jpg",
        "public/images/software/ibd-care-hero.jpg",
        (0.50, 0.52),
    ),
    (
        "public/images/testimonials/nurse-elderly.jpg",
        "public/images/software/agingdrug-hero.jpg",
        (0.67, 0.50),
    ),
    (
        "tmp/image-recovery/family-laughing-premium.jpg",
        "public/images/software/chemotherapy-care-hero.jpg",
        (0.53, 0.50),
    ),
    (
        "tmp/image-recovery/nurse-patient-premium.jpg",
        "public/images/software/gib-hero.jpg",
        (0.50, 0.50),
    ),
]

EQUIPMENT_HEROES = [
    (
        "tmp/image-recovery/equip-pexels-6627665.jpg",
        "public/images/equipment/desktop-autoclave-hero.jpg",
        (0.50, 0.50),
    ),
    (
        "tmp/image-recovery/equip-pexels-8940466.jpg",
        "public/images/equipment/hospital-autoclave-hero.jpg",
        (0.50, 0.50),
    ),
    (
        "tmp/image-recovery/equip-pexels-17043389.jpg",
        "public/images/equipment/glucose-meter-hero.jpg",
        (0.50, 0.50),
    ),
    (
        "tmp/image-recovery/equip-pexels-17071587.jpg",
        "public/images/equipment/glucose-strips-hero.jpg",
        (0.50, 0.50),
    ),
]

TESTIMONIAL_REPLACEMENTS = [
    (
        "tmp/image-recovery/mother-baby-premium.jpg",
        "public/images/testimonials/mother-baby.jpg",
        (0.40, 0.50),
    ),
    (
        "tmp/image-recovery/family-laughing-premium.jpg",
        "public/images/testimonials/family-sunset.jpg",
        (0.50, 0.50),
    ),
]


mode = sys.argv[1] if len(sys.argv) > 1 else "all"

if mode in {"all", "lifestyle"}:
    for source, output, focal in LIFESTYLE_HEROES:
        lifestyle_hero(source, output, focal)
        print(f"lifestyle: {source} -> {output}")

if mode in {"all", "equipment"}:
    for primary, output, focal in EQUIPMENT_HEROES:
        equipment_hero(primary, output, focal)
        print(f"equipment: {primary} -> {output}")

if mode in {"all", "testimonials"}:
    for source, output, focal in TESTIMONIAL_REPLACEMENTS:
        desktop = warm_grade(
            cover(load(source), (1440, 1200), focal=focal),
            saturation=1.07,
            contrast=1.03,
            brightness=1.02,
        )
        desktop.save(
            ROOT / output,
            "JPEG",
            quality=86,
            optimize=True,
            progressive=True,
            subsampling=1,
        )
        mobile_output = output.replace(".jpg", "-mobile.jpg")
        mobile = warm_grade(
            cover(load(source), (1800, 1200), focal=focal),
            saturation=1.07,
            contrast=1.03,
            brightness=1.02,
        )
        mobile.save(
            ROOT / mobile_output,
            "JPEG",
            quality=86,
            optimize=True,
            progressive=True,
            subsampling=1,
        )
        print(f"testimonial: {source} -> {output}, {mobile_output}")
