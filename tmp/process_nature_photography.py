from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "tmp" / "nature-originals"
OUTPUT_SIZE = (1800, 1200)


# Every output has its own real photograph. Keeping the mapping explicit makes
# it easy to verify that no software product reuses another product's image.
MAPPINGS = [
    ("smoky-meadow.jpg", "todays-mom-hero.jpg", (0.50, 0.50)),
    ("fuji-sunset.jpg", "todays-mom-family.jpg", (0.50, 0.48)),
    ("azure-window.jpg", "todays-mom-care.jpg", (0.50, 0.50)),
    ("carezza-lake.jpg", "skinapp-hero.jpg", (0.50, 0.50)),
    ("tahoe-morning.jpg", "skinapp-scan.jpg", (0.50, 0.52)),
    ("aletsch-glacier.jpg", "skinapp-review.jpg", (0.50, 0.50)),
    ("karst-morning.jpg", "ibd-care-hero.jpg", (0.50, 0.50)),
    ("lac-veret.jpg", "ibd-care-lifestyle.jpg", (0.50, 0.52)),
    ("lac-vernant.jpg", "ibd-care-clinic.jpg", (0.50, 0.50)),
    ("revelstoke-lake.jpg", "agingdrug-hero.jpg", (0.50, 0.50)),
    ("fronalpstock.jpg", "agingdrug-pharmacy.jpg", (0.50, 0.50)),
    ("langkofel.jpg", "agingdrug-review.jpg", (0.50, 0.50)),
    ("himalaya-sunset.jpg", "chemotherapy-care-hero.jpg", (0.50, 0.50)),
    ("mosi-waterfall.jpg", "chemotherapy-care-oncology.jpg", (0.50, 0.50)),
    ("mountain-landscape.jpg", "chemotherapy-care-planning.jpg", (0.50, 0.48)),
    ("moraine-lake.jpg", "gib-hero.jpg", (0.50, 0.50)),
    ("forest-waterfall.jpg", "gib-telecare.jpg", (0.43, 0.50)),
    ("ucanca.jpg", "gib-nursing.jpg", (0.50, 0.50)),
]


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
    image = ImageEnhance.Color(image).enhance(1.08)
    image = ImageEnhance.Contrast(image).enhance(1.035)
    return ImageEnhance.Brightness(image).enhance(1.015)


output_dir = ROOT / "public" / "images" / "software"
output_dir.mkdir(parents=True, exist_ok=True)

for source_name, output_name, focal in MAPPINGS:
    source = SOURCE_DIR / source_name
    target = output_dir / output_name
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image = finish(cover(image, OUTPUT_SIZE, focal))
        image.save(
            target,
            "JPEG",
            quality=86,
            optimize=True,
            progressive=True,
            subsampling=1,
        )
    print(f"{source.name} -> {target.relative_to(ROOT)}")
