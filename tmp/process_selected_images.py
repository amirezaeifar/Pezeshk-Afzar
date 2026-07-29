from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "image-recovery"

MAPPINGS = {
    # Exact photographs referenced by the original committed site.
    "hero-original.jpg": "public/images/company/hero-sunrise.jpg",
    "life1-original.jpg": "public/images/company/life-walk.jpg",
    "life2-original.jpg": "public/images/company/friends-laughing.jpg",
    "life3-original.jpg": "public/images/company/sunset-movement.jpg",
    "sunrise-original.jpg": "public/images/company/family-sunlight.jpg",
    "partner-original.jpg": "public/images/company/care-partner.jpg",
    # Curated real lifestyle photography.
    "nurse-patient-premium.jpg": "public/images/testimonials/nurse-patient.jpg",
    "diverse-friends-candidate.jpg": "public/images/testimonials/diverse-friends.jpg",
    "mother-baby-candidate.jpg": "public/images/testimonials/mother-baby.jpg",
    "family-sunset-candidate.jpg": "public/images/testimonials/family-sunset.jpg",
    "family-laughing-premium.jpg": "public/images/testimonials/friends-sunset.jpg",
    # Curated real medical product photography.
    "equip-pexels-6627665.jpg": "public/images/equipment/desktop-autoclave-hero.jpg",
    "equip-pexels-9951400.jpg": "public/images/equipment/desktop-autoclave-chamber.jpg",
    "equip-pexels-6627664.jpg": "public/images/equipment/desktop-autoclave-clinic.jpg",
    "equip-pexels-8940466.jpg": "public/images/equipment/hospital-autoclave-hero.jpg",
    "equip-pexels-9951393.jpg": "public/images/equipment/hospital-autoclave-room.jpg",
    "equip-pexels-8940466.jpg": "public/images/equipment/hospital-autoclave-loading.jpg",
    "equip-pexels-17043389.jpg": "public/images/equipment/glucose-meter-hero.jpg",
    "equip-photo-1684156486280-ff59f07fc5bb.jpg": "public/images/equipment/glucose-meter-use.jpg",
    "equip-pexels-17043389.jpg": "public/images/equipment/glucose-meter-kit.jpg",
    "equip-pexels-17071587.jpg": "public/images/equipment/glucose-strips-hero.jpg",
    "equip-pexels-17071590.jpg": "public/images/equipment/glucose-strips-pack.jpg",
    "equip-pexels-33200678.jpg": "public/images/equipment/glucose-strips-meter.jpg",
}


for source_name, target_name in MAPPINGS.items():
    source_path = SOURCE / source_name
    target_path = ROOT / target_name
    target_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source_path) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        image.save(
            target_path,
            format="JPEG",
            quality=84,
            optimize=True,
            progressive=True,
            subsampling=1,
        )

    print(f"{source_name} -> {target_name}")
