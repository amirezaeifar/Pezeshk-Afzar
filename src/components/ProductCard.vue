<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { localize } from '../utils/localized.js'
import ProductIcon from './ProductIcon.vue'

const props = defineProps({
  product: { type: Object, required: true },
  index: { type: Number, default: 0 },
  variant: { type: String, default: 'catalog' },
})

const { t, locale } = useI18n()

/* Two feature highlights and one headline spec give each card the
   density of a well-set catalogue page without crowding it. */
const highlights = computed(() =>
  (props.product.features?.[locale.value] ?? props.product.features?.en ?? []).slice(0, 2)
)

const headlineSpec = computed(() => props.product.specs?.[0] ?? null)
</script>

<template>
  <RouterLink
    :to="`/products/${product.id}`"
    class="card"
    :class="[
      `span-${product.span}`,
      `card--${variant}`,
      `type-${product.type}`,
      `shape-${index % 6}`,
      'rise',
    ]"
    :style="{ animationDelay: `${0.15 + index * 0.08}s` }"
  >
    <!-- Hand-drafted corner ticks — the card reads as a crafted plate -->
    <span class="tick tick-tl" aria-hidden="true"></span>
    <span class="tick tick-br" aria-hidden="true"></span>

    <div class="card-media">
      <span class="card-no">{{ t('card.no') }}{{ product.number ?? String(index + 1).padStart(2, '0') }}</span>
      <span v-if="product.flagship" class="flagship">{{ t('card.flagship') }}</span>
      <img
        :src="product.image"
        :alt="localize(product.name, locale)"
        loading="lazy"
        decoding="async"
      />
      <div class="card-overlay">
        <span class="overlay-cta">
          {{ t('card.view') }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </div>

    <div class="card-meta">
      <div class="meta-topline">
        <span class="meta-category">
          <span class="product-glyph" aria-hidden="true">
            <ProductIcon :name="product.icon" :size="17" />
          </span>
          {{ localize(product.category, locale) }}
        </span>
        <span class="meta-type">{{ t(`card.type.${product.type}`) }}</span>
      </div>

      <h3 class="card-title">{{ localize(product.name, locale) }}</h3>
      <p class="card-tagline">{{ localize(product.tagline, locale) }}</p>

      <ul v-if="highlights.length" class="card-highlights">
        <li v-for="(f, i) in highlights" :key="i">
          <span class="hl-leaf" aria-hidden="true"></span>
          <span class="hl-text">{{ f }}</span>
        </li>
      </ul>

      <div class="card-rule" aria-hidden="true">
        <span class="rule-dot"></span>
      </div>

      <div class="card-foot">
        <dl v-if="headlineSpec" class="foot-spec">
          <dt>{{ localize(headlineSpec.label, locale) }}</dt>
          <dd>{{ localize(headlineSpec.value, locale) }}</dd>
        </dl>
        <span class="foot-go" aria-hidden="true">
          <span class="foot-arrow">→</span>
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
/* A lighter cream plate standing on the sand canvas — bordered,
   ticked, and set like a page from a fine catalogue. The photograph
   carries its own color; no CSS grading on the image. */
.card {
  position: relative; display: flex; flex-direction: column;
  gap: 1.25rem;
  background: var(--cream);
  border: 1px solid rgba(0, 41, 0, 0.24);
  border-radius: var(--radius-card);
  padding: 1.125rem 1.125rem 1.5rem;
  box-shadow: var(--shadow-card);
  cursor: pointer;
  text-decoration: none; color: inherit;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.5s ease;
}

/* The greeting is quiet and physical: a soft lift, a deeper shadow,
   and a subtle orange glow ringing the border. Nothing travels. */
.card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 146, 92, 0.55);
  box-shadow: var(--glow-warm), 0 0 0 4px rgba(255, 146, 92, 0.13);
}

/* Corner ticks — quiet drafting marks that warm up on hover */
.tick {
  position: absolute;
  width: 14px; height: 14px;
  border-color: rgba(0, 41, 0, 0.35);
  border-style: solid;
  transition: border-color 0.5s ease, width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.tick-tl { top: 8px; inset-inline-start: 8px; border-width: 1.5px 0 0 1.5px; border-start-start-radius: 10px; }
.tick-br { bottom: 8px; inset-inline-end: 8px; border-width: 0 1.5px 1.5px 0; border-end-end-radius: 10px; }

.card:hover .tick { border-color: var(--orange); width: 20px; height: 20px; }

.card-media {
  position: relative; overflow: hidden;
  aspect-ratio: 4 / 5;
  background: var(--cream-deep);
  border-radius: 18px;
  border: 1px solid rgba(0, 41, 0, 0.16);
}

.span-wide .card-media { aspect-ratio: 16 / 10; }

.card-media img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover .card-media img { transform: scale(1.05); }

.card-no {
  position: absolute; top: 1.125rem; left: 1.125rem; z-index: 2;
  font-family: var(--font-display);
  font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: #F5F5E5;
  background: rgba(0, 41, 0, 0.68);
  backdrop-filter: blur(6px);
  padding: 0.3125rem 0.6875rem;
  border-radius: 999px;
}

html[lang='fa'] .card-no {
  letter-spacing: 0.04em; text-transform: none; font-size: 0.8125rem;
}

html[dir='rtl'] .card-no { left: auto; right: 1.125rem; }

.flagship {
  position: absolute; top: 1.125rem; right: 1.125rem; z-index: 2;
  font-size: 0.6875rem; font-weight: 700;
  color: #002900; background: var(--orange);
  padding: 0.375rem 0.75rem; border-radius: 999px;
}

html[dir='rtl'] .flagship { right: auto; left: 1.125rem; }

.card-overlay {
  position: absolute; inset: 0;
  display: flex; align-items: flex-end; justify-content: flex-end;
  padding: 1.25rem;
  background: rgba(0, 41, 0, 0.5);
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover .card-overlay { opacity: 1; }

.overlay-cta {
  display: inline-flex; align-items: center; gap: 0.5rem;
  color: #F5F5E5;
  font-size: 0.875rem; font-weight: 600;
  transform: translateY(8px);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s;
}

.card:hover .overlay-cta { transform: translateY(0); }
html[dir='rtl'] .overlay-cta svg { transform: rotate(180deg); }

.card-meta {
  display: flex; flex-direction: column; gap: 0.5rem;
  padding: 0 0.5rem;
  flex: 1;
}

/* Category on one side, kind on the other — a set catalogue topline */
.meta-topline {
  display: flex; align-items: baseline; justify-content: space-between;
  gap: 0.75rem;
}

.meta-category {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.8125rem; font-weight: 700;
  color: var(--coral-deep);
}

.product-glyph {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px;
  color: var(--ink);
  background: var(--accent-soft);
  border: 1px solid rgba(255, 146, 92, 0.38);
  border-radius: 10px;
  transition: color 0.35s ease, background 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card:hover .product-glyph {
  color: #002900;
  background: var(--orange);
  transform: rotate(-4deg) scale(1.05);
}

.meta-type {
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--muted);
  border: 1px solid rgba(0, 41, 0, 0.25);
  border-radius: 999px;
  padding: 0.1875rem 0.625rem;
  white-space: nowrap;
  transition: border-color 0.4s ease, color 0.4s ease;
}

html[lang='fa'] .meta-type { letter-spacing: 0; }

.card:hover .meta-type { border-color: rgba(255, 146, 92, 0.55); color: var(--coral-deep); }

.card-title {
  position: relative;
  font-family: var(--font-display);
  font-size: 1.375rem; line-height: 1.2; font-weight: 600;
  letter-spacing: var(--track-display);
  color: var(--ink); margin: 0.125rem 0 0;
  width: fit-content;
}

html[lang='fa'] .card-title { font-weight: 700; }

/* The title grows a warm underline as the card is considered */
.card-title::after {
  content: '';
  position: absolute; bottom: -3px; inset-inline-start: 0;
  width: 100%; height: 2px; border-radius: 2px;
  background: var(--orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

html[dir='rtl'] .card-title::after { transform-origin: right; }
.card:hover .card-title::after { transform: scaleX(1); }

.card-tagline {
  font-size: 0.9375rem; line-height: 1.6;
  color: var(--ink-soft);
  max-width: 38ch; margin: 0;
}

/* Feature highlights — two leaf-marked lines of real capability */
.card-highlights {
  list-style: none; padding: 0; margin: 0.625rem 0 0;
  display: flex; flex-direction: column; gap: 0.4375rem;
}

.card-highlights li {
  display: flex; align-items: baseline; gap: 0.625rem;
  font-size: 0.8125rem; line-height: 1.55;
  color: var(--ink-soft);
}

.hl-leaf {
  width: 12px; height: 4px; border-radius: 2px 999px 2px 999px;
  background: var(--soft-green);
  flex-shrink: 0;
  transform: translateY(-2px);
  transition: background 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card:hover .hl-leaf { background: var(--orange); transform: translateY(-2px) scaleX(1.25); }

/* Hairline rule with a seed dot — the card's crafted midline.
   The dot stays put; it only warms to orange on hover. */
.card-rule {
  position: relative;
  height: 1px; margin-top: 0.875rem;
  background: rgba(0, 41, 0, 0.18);
}

.rule-dot {
  position: absolute; top: -2.5px; inset-inline-start: 0;
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--soft-green);
  transition: background 0.4s ease;
}

.card:hover .rule-dot { background: var(--orange); }

/* Foot: one headline spec set like fine print, and a circled arrow */
.card-foot {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem;
  margin-top: 0.75rem;
}

.foot-spec { display: flex; flex-direction: column; gap: 0.125rem; margin: 0; min-width: 0; }

.foot-spec dt {
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--muted);
}

html[lang='fa'] .foot-spec dt { letter-spacing: 0; }

.foot-spec dd {
  font-size: 0.8125rem; font-weight: 600;
  color: var(--ink); margin: 0;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.foot-go {
  flex-shrink: 0;
  display: inline-flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: 50%;
  border: 1.5px solid rgba(0, 41, 0, 0.3);
  color: var(--ink);
  transition: background 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.45s ease, color 0.45s ease,
              transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card:hover .foot-go {
  background: var(--orange);
  border-color: var(--orange);
  color: #002900;
  transform: rotate(-8deg) scale(1.06);
}

.foot-arrow {
  display: inline-block;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

html[dir='rtl'] .foot-arrow { transform: rotate(180deg); }
.card:hover .foot-arrow { transform: translateX(2px); }
html[dir='rtl'] .card:hover .foot-arrow { transform: translateX(-2px) rotate(180deg); }

/* Home-only showcase: a moderate horizontal plate keeps the restored
   organic image language while making the product overview easier to scan.
   The catalogue and compact variants remain unchanged everywhere else. */
.card--showcase {
  display: grid;
  grid-template-columns: minmax(180px, 42%) minmax(0, 1fr);
  align-items: center;
  gap: 1.25rem;
  padding: 0.75rem;
  background: rgba(250, 250, 240, 0.7);
  border: 1px solid rgba(0, 41, 0, 0.18);
  border-radius: 26px;
  box-shadow: 0 22px 52px -38px rgba(0, 41, 0, 0.48);
}

.card--showcase:hover {
  border-color: rgba(255, 146, 92, 0.55);
  box-shadow: var(--glow-warm), 0 24px 56px -38px rgba(0, 41, 0, 0.54);
}

.card--showcase .tick,
.card--showcase .meta-type,
.card--showcase .product-glyph,
.card--showcase .card-highlights,
.card--showcase .card-rule,
.card--showcase .foot-spec {
  display: none;
}

.card--showcase .card-media {
  width: 100%;
  aspect-ratio: 4 / 3;
  border: 0;
  box-shadow: 0 20px 44px -30px rgba(0, 41, 0, 0.46);
  transition:
    border-radius 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.55s ease;
}

.card--showcase:hover .card-media {
  box-shadow: 0 24px 50px -30px rgba(0, 41, 0, 0.54);
}

.card--showcase.type-equipment .card-media img {
  object-fit: contain;
  padding: 0.45rem;
}

.card--showcase.type-equipment:hover .card-media img {
  transform: scale(1.025);
}

.card--showcase.shape-0 .card-media {
  border-radius: 999px 999px 34px 34px;
}

.card--showcase.shape-1 .card-media {
  border-radius: 34px 34% 34px 34%;
}

.card--showcase.shape-2 .card-media {
  border-radius: 44% 44% 28px 28px / 30% 30% 28px 28px;
}

.card--showcase.shape-3 .card-media {
  border-radius: 32% 32px 32% 32px / 22% 32px 22% 32px;
}

.card--showcase.shape-4 .card-media {
  border-radius: 46% 46% 46% 16% / 34% 34% 48% 18%;
}

.card--showcase.shape-5 .card-media {
  border-radius: 34px 34px 999px 999px;
}

.card--showcase .card-meta {
  align-self: center;
  gap: 0.375rem;
  padding: 0;
  padding-inline-end: 0.5rem;
}

.card--showcase .meta-topline {
  justify-content: flex-start;
}

.card--showcase .meta-category {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

html[lang='fa'] .card--showcase .meta-category {
  letter-spacing: 0;
  text-transform: none;
}

.card--showcase .card-title {
  font-size: clamp(1.25rem, 1.7vw, 1.5rem);
}

.card--showcase .card-tagline {
  display: -webkit-box;
  overflow: hidden;
  font-size: 0.875rem;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card--showcase .card-foot {
  margin-top: 0.125rem;
  justify-content: flex-start;
}

.card--showcase .foot-go {
  width: 36px;
  height: 36px;
  background: transparent;
}

/* The portfolio keeps the existing catalogue language while fitting more
   products in the viewport: a tighter plate, shorter media, and denser rhythm. */
.card--compact {
  width: 100%;
  max-width: 460px;
  gap: 0.875rem;
  padding: 0.875rem 0.875rem 1rem;
}

.card--compact.type-software .card-media {
  aspect-ratio: 16 / 10;
}

.card--compact.type-equipment .card-media {
  aspect-ratio: 1 / 1;
}

.card--compact .card-media {
  border-radius: 14px;
}

.card--compact .card-meta {
  gap: 0.375rem;
  padding: 0 0.25rem;
}

.card--compact .card-title {
  font-size: 1.25rem;
}

.card--compact .card-tagline {
  font-size: 0.875rem;
  line-height: 1.5;
}

.card--compact .card-highlights {
  margin-top: 0.375rem;
  gap: 0.3rem;
}

.card--compact .card-rule {
  margin-top: 0.5rem;
}

.card--compact .card-foot {
  margin-top: 0.4rem;
}

.card--compact .foot-go {
  width: 36px;
  height: 36px;
}

@media (max-width: 720px) {
  .card--showcase {
    grid-template-columns: minmax(110px, 38%) minmax(0, 1fr);
    gap: 0.875rem;
    padding: 0.625rem;
    border-radius: 20px;
  }

  .card--showcase .card-meta {
    padding-inline-end: 0.25rem;
  }

  .card--showcase .card-no {
    top: 0.625rem;
    left: 0.625rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.625rem;
  }

  html[dir='rtl'] .card--showcase .card-no {
    right: 0.625rem;
    left: auto;
  }

  .card--showcase .flagship {
    top: 0.625rem;
    right: 0.625rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.625rem;
  }

  html[dir='rtl'] .card--showcase .flagship {
    right: auto;
    left: 0.625rem;
  }

  .card--showcase .card-title {
    font-size: 1.125rem;
  }

  .card--showcase .meta-category {
    font-size: 0.6875rem;
  }

  .card--showcase .card-tagline {
    font-size: 0.8125rem;
  }

  .card--showcase .foot-go {
    width: 32px;
    height: 32px;
  }
}
</style>
