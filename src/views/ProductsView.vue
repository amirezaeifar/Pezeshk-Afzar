<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { products } from '../data/products.js'
import { localize } from '../utils/localized.js'

const { t, locale } = useI18n()

// Three primary categories — overlapping cards that spill out of the warm prologue.
const navCards = [
  { id: 'platforms', href: '#platforms', key: 'platforms' },
  { id: 'innovations', href: '#innovations', key: 'innovations' },
  { id: 'custom', href: '#custom', key: 'custom' },
]

// Product listings (custom development is a service, shown as its own panel).
const listings = [
  { id: 'platforms', key: 'platforms', items: products.filter((p) => p.type === 'software') },
  { id: 'innovations', key: 'innovations', items: products.filter((p) => p.type === 'equipment') },
]

/* Scroll reveals */
const root = ref(null)
const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observer = null
onMounted(() => {
  if (reducedMotion) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  root.value?.querySelectorAll('.reveal, .reveal-side').forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <main ref="root" class="view products">
    <!-- Prologue — the catalogue opens on the inverted band:
         vibrant orange melting back into sand -->
    <header class="prologue">
      <span class="prologue-sun" aria-hidden="true"></span>

      <div class="prologue-inner">
        <span class="eyebrow prologue-eyebrow cine-focus" style="animation-delay: 0.1s">{{ t('products.eyebrow') }}</span>
        <h1 class="prologue-title">
          <span class="cine-mask"><span class="cine-lift" style="animation-delay: 0.25s">{{ t('products.titleA') }}</span></span>
          <span class="cine-mask"><span class="cine-lift" style="animation-delay: 0.4s"><em>{{ t('products.titleB') }}</em></span></span>
        </h1>
        <p class="prologue-intro cine-focus" style="animation-delay: 0.65s">{{ t('products.intro') }}</p>
      </div>
    </header>

    <!-- Category cards spill out of the warmth, overlapping the seam -->
    <nav class="nav-cards" :aria-label="t('products.navLabel')">
      <a v-for="(c, i) in navCards" :key="c.id" :href="c.href"
         class="nav-card cine-focus" :class="`nav-card-${i}`"
         :style="{ animationDelay: `${0.5 + i * 0.12}s` }">
        <span class="nav-card-no" aria-hidden="true">0{{ i + 1 }}</span>
        <span class="nav-card-icon" aria-hidden="true">
          <svg v-if="c.key === 'platforms'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
          </svg>
          <svg v-else-if="c.key === 'innovations'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18h6M10 21h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2A7 7 0 0 0 12 2Z" />
          </svg>
          <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 6 2 12l6 6" /><path d="M16 6l6 6-6 6" /><path d="M13 4l-2 16" />
          </svg>
        </span>
        <h2 class="nav-card-title">{{ t(`products.categories.${c.key}.title`) }}</h2>
        <p class="nav-card-desc">{{ t(`products.categories.${c.key}.desc`) }}</p>
        <span class="nav-card-cue">
          {{ t('products.explore') }}
          <span class="nav-card-arrow" aria-hidden="true">→</span>
        </span>
      </a>
    </nav>

    <div class="products-inner">
      <!-- Product listings — alternating frames -->
      <section v-for="(cat, ci) in listings" :id="cat.id" :key="cat.id" class="category">
        <header class="cat-head reveal">
          <span class="cat-count" aria-hidden="true">{{ String(ci + 1).padStart(2, '0') }}</span>
          <div class="cat-head-text">
            <h2 class="cat-title">{{ t(`products.categories.${cat.key}.title`) }}</h2>
            <p class="cat-intro">{{ t(`products.categories.${cat.key}.intro`) }}</p>
          </div>
        </header>

        <div class="list">
          <article v-for="(p, i) in cat.items" :id="p.id" :key="p.id"
                   class="row reveal" :class="{ 'row-flip': i % 2 === 1 }">
            <div class="row-media">
              <img :src="p.image" :alt="localize(p.name, locale)" loading="lazy" />
              <span class="row-num">{{ t('card.no') }}{{ String(i + 1).padStart(2, '0') }}</span>
              <span v-if="p.flagship" class="row-flagship">{{ t('card.flagship') }}</span>
            </div>

            <div class="row-body">
              <span class="row-category">{{ localize(p.category, locale) }}<span class="row-type"> · {{ t(`card.type.${p.type}`) }}</span></span>
              <h2 class="row-title">{{ localize(p.name, locale) }}</h2>
              <p class="row-tagline">{{ localize(p.tagline, locale) }}</p>
              <p class="row-desc">{{ localize(p.description, locale) }}</p>

              <div class="row-features">
                <span class="row-features-label">{{ t('products.featuresLabel') }}</span>
                <ul>
                  <li v-for="(f, j) in (p.features[locale] ?? p.features.en ?? [])" :key="j">
                    <span class="bullet" aria-hidden="true"></span>
                    <span>{{ f }}</span>
                  </li>
                </ul>
              </div>

              <!-- The fine print, set as crafted chips — a taste of the
                   full spec sheet on the detail page -->
              <div v-if="p.specs?.length" class="row-specs">
                <div v-for="(s, j) in p.specs.slice(0, 3)" :key="j" class="spec-chip">
                  <span class="spec-label">{{ localize(s.label, locale) }}</span>
                  <span class="spec-value">{{ localize(s.value, locale) }}</span>
                </div>
              </div>

              <div class="row-actions">
                <RouterLink :to="`/products/${p.id}`" class="btn-ink">
                  {{ t('products.details') }}
                  <span class="arrow">→</span>
                </RouterLink>
                <RouterLink to="/contact" class="btn-ghost-ink">{{ t('products.demo') }}</RouterLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Custom development — the deep green workshop -->
      <section id="custom" class="custom-panel reveal">
        <span class="custom-panel-glow" aria-hidden="true"></span>
        <div class="custom-panel-inner">
          <span class="custom-count" aria-hidden="true">03</span>
          <div class="custom-panel-text">
            <h2 class="custom-title">{{ t('products.categories.custom.title') }}</h2>
            <p class="custom-panel-body">{{ t('products.categories.custom.intro') }}</p>
            <RouterLink to="/contact" class="btn-ink custom-cta">
              {{ t('products.categories.custom.cta') }}
              <span class="arrow">→</span>
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
/* The catalogue page: one flat sheet of ivory, with a few localized
   flares breathing in the mid-to-bottom stretch */
.products {
  position: relative;
  padding-bottom: 6rem;
  background-color: var(--sand);
  background-image:
    radial-gradient(48rem 32rem at 90% 42%, rgba(255, 146, 92, 0.09), transparent 66%),
    radial-gradient(44rem 30rem at 6% 70%, rgba(46, 91, 46, 0.06), transparent 64%),
    radial-gradient(46rem 30rem at 86% 92%, rgba(255, 172, 127, 0.13), transparent 62%);
  background-repeat: no-repeat;
}

/* ── Prologue — the inverted band: orange → sand ──────── */
.prologue {
  position: relative;
  overflow: hidden;
  background: var(--grad-invert);
  padding: 11rem 2.5rem 12rem;
  color: #002900;
}

/* Warm shimmer — light rising off the orange */
.prologue-sun {
  position: absolute;
  width: 46vw; height: 46vw;
  min-width: 420px; min-height: 420px;
  top: -14vw; inset-inline-end: -10vw;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(245, 245, 229, 0.5) 0%,
    rgba(245, 245, 229, 0.18) 45%,
    rgba(245, 245, 229, 0) 70%);
  pointer-events: none;
  animation: sunPulse 10s ease-in-out infinite;
}

.prologue-eyebrow {
  background: rgba(0, 41, 0, 0.16);
  color: #002900;
}

.prologue-eyebrow::before { background: #002900; }

.prologue-inner {
  position: relative;
  max-width: 1280px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 1.75rem;
  align-items: flex-start;
}

.prologue-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 1; font-weight: 550;
  letter-spacing: var(--track-display);
  margin: 0; color: #002900;
}

html[lang='fa'] .prologue-title {
  font-size: clamp(2.5rem, 6.5vw, 5.5rem);
  line-height: 1.25; font-weight: 800;
}

.prologue-title em { font-style: italic; color: #F5F5E5; }
html[lang='fa'] .prologue-title em { font-style: normal; }

.prologue-intro {
  font-size: 1.125rem; line-height: 1.75;
  color: rgba(0, 27, 0, 0.8);
  max-width: 56ch; margin: 0;
}

/* ── Category cards — spilling over the seam ─────────── */
.nav-cards {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: -7.5rem auto 0;
  padding: 0 2.5rem;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
  align-items: start;
}

.nav-card {
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; align-items: flex-start;
  gap: 1.25rem;
  min-height: 21rem;
  padding: 2.75rem 2.5rem 2.5rem;
  border-radius: var(--radius-card);
  border: 1px solid rgba(0, 41, 0, 0.2);
  text-decoration: none; color: inherit;
  box-shadow: var(--shadow-lift);
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.55s ease;
}

/* Cream plates — the middle one drops lower so the row reads
   like a hand of dealt cards */
.nav-card-0 { background: var(--cream); }
.nav-card-1 { background: var(--warm-soft); margin-top: 2.5rem; }
.nav-card-2 { background: var(--cream); margin-top: 5rem; }

.nav-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 146, 92, 0.5);
  box-shadow: var(--glow-fire);
}

.nav-card-no {
  position: absolute;
  top: 1.5rem; inset-inline-end: 1.75rem;
  font-family: var(--font-display);
  font-size: 4.5rem; font-weight: 700;
  line-height: 1;
  color: rgba(0, 41, 0, 0.12);
  z-index: 0; pointer-events: none;
}

.nav-card-icon {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; justify-content: center;
  width: 58px; height: 58px; border-radius: 18px;
  background: var(--grad-orange); color: #002900;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-card:hover .nav-card-icon { transform: scale(1.08) rotate(-4deg); }

.nav-card-title {
  position: relative; z-index: 1;
  font-family: var(--font-display);
  font-size: 1.625rem; font-weight: 600;
  line-height: 1.15; margin: 0.5rem 0 0;
  color: #002900;
}

html[lang='fa'] .nav-card-title { font-weight: 800; line-height: 1.35; }

.nav-card-desc {
  position: relative; z-index: 1;
  font-size: 1rem; line-height: 1.65;
  color: rgba(0, 41, 0, 0.78); margin: 0; max-width: 34ch;
}

.nav-card-cue {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; gap: 0.5rem;
  margin-top: auto; padding-top: 1.5rem;
  font-size: 0.875rem; font-weight: 700;
  color: #002900;
}

.nav-card-arrow {
  display: inline-block;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-card:hover .nav-card-arrow { transform: translateX(4px); }
html[dir='rtl'] .nav-card-arrow { transform: rotate(180deg); }
html[dir='rtl'] .nav-card:hover .nav-card-arrow { transform: translateX(-4px) rotate(180deg); }

/* ── Listings ────────────────────────────────────────── */
.products-inner {
  max-width: 1280px; margin: 0 auto;
  padding: 7rem 2.5rem 0;
}

.category { margin-bottom: 9rem; scroll-margin-top: 7rem; }
.category:last-of-type { margin-bottom: 0; }

.cat-head {
  display: flex; align-items: center; gap: 2rem;
  margin-bottom: 4.5rem;
}

/* The chapter number — hollow type filled with warmth on approach */
.cat-count {
  font-family: var(--font-display);
  font-size: clamp(4rem, 8vw, 7rem); font-weight: 700;
  line-height: 0.9;
  background-image: var(--grad-text-fire);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  flex-shrink: 0;
}

.cat-head-text { display: flex; flex-direction: column; gap: 0.875rem; }

.cat-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.6vw, 3rem);
  line-height: 1.08; font-weight: 550;
  letter-spacing: var(--track-display); margin: 0; color: var(--ink);
}

html[lang='fa'] .cat-title { font-weight: 800; line-height: 1.3; }

.cat-intro {
  font-size: 1rem; line-height: 1.7;
  color: var(--ink-soft); margin: 0; max-width: 60ch;
}

.list { display: flex; flex-direction: column; gap: 7rem; }

.row {
  display: grid; grid-template-columns: 5fr 7fr;
  gap: 4rem; align-items: center;
}

.row-flip { grid-template-columns: 7fr 5fr; }
.row-flip .row-media { order: 2; }
.row-flip .row-body { order: 1; }

.row-media {
  position: relative; overflow: hidden;
  aspect-ratio: 4 / 5;
  background: var(--cream-deep);
  border-radius: 999px 999px 32px 32px;
  border: 5px solid rgba(250, 250, 240, 0.9);
  box-shadow: var(--shadow-lift);
}

.row-flip .row-media {
  aspect-ratio: 5 / 4;
  border-radius: 32px 32px 999px 32px;
}

html[dir='rtl'] .row-flip .row-media { border-radius: 32px 32px 32px 999px; }

.row-media img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.row:hover .row-media img { transform: scale(1.05); }

.row-num {
  position: absolute; top: 1.5rem; inset-inline-start: 1.5rem; z-index: 2;
  font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.14em;
  color: #F5F5E5;
  background: rgba(0, 41, 0, 0.62);
  backdrop-filter: blur(6px);
  padding: 0.375rem 0.75rem;
  border-radius: 999px;
}

html[lang='fa'] .row-num { letter-spacing: 0.03em; }

.row-flagship {
  position: absolute; top: 1.5rem; inset-inline-end: 1.5rem; z-index: 2;
  font-size: 0.6875rem; font-weight: 700;
  letter-spacing: 0.08em;
  color: #002900; background: var(--grad-orange);
  padding: 0.4375rem 0.875rem; border-radius: 999px;
  box-shadow: 0 8px 20px -8px rgba(229, 100, 42, 0.55);
}

html[lang='fa'] .row-flagship { letter-spacing: 0; }

.row-body { display: flex; flex-direction: column; gap: 0.875rem; }

.row-category {
  font-size: 0.8125rem; font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--coral-deep);
}

html[lang='fa'] .row-category { letter-spacing: 0; }

.row-type { color: var(--muted); font-weight: 500; }

.row-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  line-height: 1.06; font-weight: 550;
  letter-spacing: var(--track-display);
  margin: 0.25rem 0 0; color: var(--ink);
}

html[lang='fa'] .row-title { font-weight: 800; line-height: 1.3; }

.row-tagline {
  font-size: 1.0625rem; line-height: 1.4;
  color: var(--ink); font-weight: 600; margin: 0.25rem 0 0;
}

.row-desc {
  font-size: 0.9375rem; line-height: 1.75;
  color: var(--ink-soft); margin: 0.5rem 0 0; max-width: 56ch;
}

.row-features {
  margin-top: 1rem; padding-top: 1.5rem;
  border-top: 2px solid rgba(255, 146, 92, 0.35);
  display: flex; flex-direction: column; gap: 0.875rem;
}

.row-features-label {
  font-size: 0.8125rem; font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--muted);
}

html[lang='fa'] .row-features-label { letter-spacing: 0; }

.row-features ul {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.625rem;
}

.row-features li {
  display: flex; align-items: baseline; gap: 0.875rem;
  font-size: 0.9375rem; line-height: 1.5;
  color: var(--ink-soft);
}

.bullet {
  width: 14px; height: 4px; border-radius: 2px;
  background: var(--grad-orange);
  flex-shrink: 0;
  transform: translateY(-3px);
}

/* Spec chips — the fine print made tactile */
.row-specs {
  display: flex; flex-wrap: wrap; gap: 0.625rem;
  margin-top: 1.125rem;
}

.spec-chip {
  display: flex; flex-direction: column; gap: 0.125rem;
  padding: 0.625rem 0.9375rem;
  background: var(--cream);
  border: 1px solid rgba(0, 41, 0, 0.22);
  border-radius: 14px;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.spec-chip:hover {
  border-color: rgba(255, 146, 92, 0.55);
  box-shadow: 0 10px 24px -14px rgba(255, 146, 92, 0.5);
  transform: translateY(-2px);
}

.spec-label {
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--muted);
}

html[lang='fa'] .spec-label { letter-spacing: 0; }

.spec-value {
  font-size: 0.8125rem; font-weight: 700;
  color: var(--ink);
}

.row-actions {
  margin-top: 2rem;
  display: flex; flex-wrap: wrap; gap: 0.875rem; align-items: center;
}

/* ── Custom development — the deep green workshop ────── */
.custom-panel {
  position: relative; overflow: hidden;
  margin-top: 0; scroll-margin-top: 7rem;
  background: var(--grad-green);
  border-radius: var(--radius-panel);
  padding: clamp(3rem, 5vw, 5rem);
  box-shadow: var(--glow-green);
  color: #F5F5E5;
}

.custom-panel-glow {
  position: absolute;
  width: 380px; height: 380px;
  top: -170px; inset-inline-end: -110px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 146, 92, 0.24) 0%, rgba(255, 146, 92, 0) 70%);
  pointer-events: none;
}

.custom-panel-inner {
  position: relative;
  display: flex; align-items: flex-start; gap: 2rem;
}

.custom-count {
  font-family: var(--font-display);
  font-size: clamp(4rem, 8vw, 7rem); font-weight: 700;
  line-height: 0.9;
  color: rgba(245, 245, 229, 0.22);
  flex-shrink: 0;
}

.custom-panel-text { display: flex; flex-direction: column; gap: 1.25rem; }

.custom-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.6vw, 3rem);
  line-height: 1.08; font-weight: 550;
  letter-spacing: var(--track-display); margin: 0; color: #F5F5E5;
}

html[lang='fa'] .custom-title { font-weight: 800; line-height: 1.3; }

.custom-panel-body {
  font-size: 1.0625rem; line-height: 1.7;
  color: rgba(245, 245, 229, 0.8); margin: 0; max-width: 60ch;
}

.custom-cta { align-self: flex-start; margin-top: 0.5rem; }

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1024px) {
  .prologue { padding: 9rem 1.75rem 10rem; }
  .nav-cards { grid-template-columns: 1fr; gap: 1.5rem; margin-top: -6.5rem; padding: 0 1.75rem; }
  .nav-card { min-height: auto; padding: 2.5rem 2.25rem; }
  .nav-card-1, .nav-card-2 { margin-top: 0; }
  .products-inner { padding: 5rem 1.75rem 0; }
  .category { margin-bottom: 6rem; }
  .cat-head { gap: 1.5rem; margin-bottom: 3rem; }
  .list { gap: 5rem; }
  .row, .row-flip { grid-template-columns: 1fr; gap: 2rem; }
  .row-flip .row-media { order: 0; }
  .row-flip .row-body { order: 1; }
  .row-media, .row-flip .row-media { aspect-ratio: 4 / 3; border-radius: 32px; }
  .custom-panel { margin-top: 0; }
}

@media (max-width: 720px) {
  .prologue { padding: 7.5rem 1.25rem 9rem; }
  .nav-cards { padding: 0 1.25rem; }
  .products-inner { padding: 4rem 1.25rem 0; }
  .list { gap: 4rem; }
  .custom-panel-inner { flex-direction: column; gap: 1rem; }
  .custom-panel { border-radius: var(--radius-card); }
}
</style>
