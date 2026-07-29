"""Build the six calm software hero photographs used by Home and What We Make."""

from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "minimal-originals"
DESTINATION = ROOT / "public" / "images" / "software"
OUTPUT_SIZE = (1800, 1200)

# focus=(x, y) guides ImageOps.fit without changing the photograph's geometry.
MAPPINGS = (
    ("misty-sunrise.jpg", "todays-mom-hero.jpg", (0.52, 0.54)),
    ("calm-water.jpg", "skinapp-hero.jpg", (0.58, 0.54)),
    ("misty-forest.jpg", "ibd-care-hero.jpg", (0.48, 0.5)),
    ("mountain-fog.jpg", "agingdrug-hero.jpg", (0.52, 0.52)),
    ("lake-sylvester.jpg", "chemotherapy-care-hero.jpg", (0.54, 0.48)),
    ("rolling-hills.jpg", "gib-hero.jpg", (0.58, 0.56)),
)


def build(source_name: str, output_name: str, focus: tuple[float, float]) -> None:
    source_path = SOURCE / source_name
    output_path = DESTINATION / output_name

    with Image.open(source_path) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        image = ImageOps.fit(
            image,
            OUTPUT_SIZE,
            method=Image.Resampling.LANCZOS,
            centering=focus,
        )

    # A restrained common grade keeps the set cohesive and photographic.
    image = ImageEnhance.Color(image).enhance(1.02)
    image = ImageEnhance.Contrast(image).enhance(1.015)
    image = ImageEnhance.Brightness(image).enhance(1.01)
    image.save(
        output_path,
        "JPEG",
        quality=85,
        optimize=True,
        progressive=True,
        subsampling=1,
    )
    print(f"{output_name}: {image.width}x{image.height} ({output_path.stat().st_size} bytes)")


if __name__ == "__main__":
    DESTINATION.mkdir(parents=True, exist_ok=True)
    for mapping in MAPPINGS:
        build(*mapping)
