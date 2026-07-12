# DESIGN SYSTEM — "Life Ignites" (refined)

Cinematic and vibrant, but balanced. The page breathes on warm cream;
the fire hits hard only where it matters; deep green stays at the edges.

---

## Color Distribution

| Color | Hex | Where it lives |
| --- | --- | --- |
| **Warm cream** | `#F5F5E6` | THE primary background for most sections. Whitespace is back — the design breathes on it. |
| **Strong orange** | `#FF925C` | CTAs and a few full-intensity gradient moments per page (hero ticker, stats band, finale panels). Gradients run `#FF5310 → #FF925C → #FFA76F` — intense, never mellow. |
| **Breeze** | `#8AD5BE` | A soft complementary nuance, low intensity only: whispers inside background gradients, dashed rings, corner glows. Never a card background, never loud. |
| **Deep dark green** | `#002900` | Typography everywhere, plus Navbar, Footer, and exactly one distinct body section (the Home cinema hero). NOT scattered through the body. |

## Card UI

Product and content cards always have clean backgrounds: pure `#FFFFFF`
or the very soft orange tint `--warm-soft` (`#FFEBDD`). High readability
against the `#F5F5E6` canvas. No gradient-filled or dark cards.

## The Orange Element rule (imagery)

Natural sourcing only. Every photo is chosen because the scene itself
contains orange — a sunset sky, golden-hour light, warm clothing. No CSS
overlays, grades, borders, or badges on photographs (`.photo-frame` is a
clean frame). Photos are immersive and candid — pure life, joy, and
vitality; never corporate poses.

## Typography

* Display: Fraunces; body: Inter; Persian: YekanBakh (weight 800 display,
  leading ≥1.25).
* Film-title reveals (`.cine-mask` / `.cine-lift`) and one fire-gradient
  word (`.text-fire`) on light backgrounds.

## Signature Moves

* **The opening shot** (Home): the single deep-green body section — full
  viewport `#002900`, breathing orange sun, parallax layers, light-beam
  sweep, molten ticker.
* **Fire moments**: one or two per page at full intensity (`--grad-orange`,
  `--grad-orange-deep`), with `#001B00` ink on top.
* **The family home** (About): cozy, intimate — centered welcome, a spoken
  belief with a breathing heart, notes taped to the fridge, house rules
  leaning like people on a couch, a polaroid family album.
* Structural asymmetry stays: stepped cascades, offset grids, overlapping
  seams — but resting on cream, not on stacked gradients.

## Motion

Cinematic library in `style.css` (`cineLift`, `cineFocus`, `cineZoom`,
`lightSweep`, `sunPulse`, `orbit`, `marqueeX`, `scrollDrop`,
`gradientShift`); scroll reveals + hero parallax; everything respects
`prefers-reduced-motion`.

## Tone

Warm, human, familial. About reads like a family, not an org chart.
CTAs stay conversational.
