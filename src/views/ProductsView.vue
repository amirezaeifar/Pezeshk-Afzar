<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import ProductIcon from '../components/ProductIcon.vue'
import { products } from '../data/products.js'

const { t } = useI18n()

// The portfolio is organized around two clear product families.
const navCards = [
  { id: 'platforms', href: '#platforms', key: 'platforms' },
  { id: 'innovations', href: '#innovations', key: 'innovations' },
]

// Product listings (custom development is a service, shown as its own panel).
const listings = [
  { id: 'platforms', key: 'platforms', items: products.filter((p) => p.type === 'software') },
  { id: 'innovations', key: 'innovations', items: products.filter((p) => p.type === 'equipment') },
]

const snapshot = [
  { key: 'total', value: products.length, icon: 'telecare' },
  { key: 'software', value: listings[0].items.length, icon: 'mother' },
  { key: 'equipment', value: listings[1].items.length, icon: 'autoclave' },
  { key: 'families', value: listings.length, icon: 'sterilization' },
]

const comparisonFamilies = [
  { key: 'software', icon: 'telecare' },
  { key: 'equipment', icon: 'autoclave' },
]

const comparisonRows = ['audience', 'role', 'delivery']

const workflowSteps = [
  { key: 'context', icon: 'mother' },
  { key: 'match', icon: 'telecare' },
  { key: 'validate', icon: 'glucose' },
  { key: 'support', icon: 'sterilization' },
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
          <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18h6M10 21h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2A7 7 0 0 0 12 2Z" />
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
      <section class="portfolio-snapshot reveal" aria-labelledby="portfolio-snapshot-title">
        <div class="support-head snapshot-head">
          <div>
            <p class="support-eyebrow">{{ t('products.snapshot.eyebrow') }}</p>
            <h2 id="portfolio-snapshot-title" class="support-title">{{ t('products.snapshot.title') }}</h2>
          </div>
          <p class="support-intro">{{ t('products.snapshot.intro') }}</p>
        </div>

        <div class="snapshot-grid">
          <article v-for="item in snapshot" :key="item.key" class="snapshot-cell">
            <span class="snapshot-icon" aria-hidden="true">
              <ProductIcon :name="item.icon" :size="22" />
            </span>
            <strong>{{ item.value }}</strong>
            <span>{{ t(`products.snapshot.items.${item.key}`) }}</span>
          </article>
        </div>
      </section>

      <!-- Product listings — compact, information-rich catalogue cards -->
      <section v-for="(cat, ci) in listings" :id="cat.id" :key="cat.id" class="category">
        <header class="cat-head reveal">
          <span class="cat-count" aria-hidden="true">{{ String(ci + 1).padStart(2, '0') }}</span>
          <div class="cat-head-text">
            <h2 class="cat-title">{{ t(`products.categories.${cat.key}.title`) }}</h2>
            <p class="cat-intro">{{ t(`products.categories.${cat.key}.intro`) }}</p>
          </div>
        </header>

        <div class="product-grid reveal">
          <ProductCard
            v-for="(p, i) in cat.items"
            :id="p.id"
            :key="p.id"
            :product="p"
            :index="i"
            variant="compact"
          />
        </div>
      </section>

      <section class="portfolio-compare reveal" aria-labelledby="portfolio-compare-title">
        <div class="support-head">
          <div>
            <p class="support-eyebrow">{{ t('products.compare.eyebrow') }}</p>
            <h2 id="portfolio-compare-title" class="support-title">{{ t('products.compare.title') }}</h2>
          </div>
          <p class="support-intro">{{ t('products.compare.intro') }}</p>
        </div>

        <div class="comparison-grid">
          <article
            v-for="family in comparisonFamilies"
            :key="family.key"
            class="comparison-card"
            :class="`comparison-${family.key}`"
          >
            <header class="comparison-card-head">
              <span class="comparison-icon" aria-hidden="true">
                <ProductIcon :name="family.icon" :size="25" />
              </span>
              <div>
                <h3>{{ t(`products.compare.${family.key}.title`) }}</h3>
                <p>{{ t(`products.compare.${family.key}.intro`) }}</p>
              </div>
            </header>
            <dl class="comparison-list">
              <div v-for="row in comparisonRows" :key="row">
                <dt>{{ t(`products.compare.rows.${row}`) }}</dt>
                <dd>{{ t(`products.compare.${family.key}.${row}`) }}</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section class="fit-workflow reveal" aria-labelledby="fit-workflow-title">
        <div class="support-head workflow-head">
          <div>
            <p class="support-eyebrow">{{ t('products.workflow.eyebrow') }}</p>
            <h2 id="fit-workflow-title" class="support-title">{{ t('products.workflow.title') }}</h2>
          </div>
          <p class="support-intro">{{ t('products.workflow.intro') }}</p>
        </div>

        <ol class="workflow-list">
          <li v-for="(step, index) in workflowSteps" :key="step.key" class="workflow-step">
            <span class="workflow-icon" aria-hidden="true">
              <ProductIcon :name="step.icon" :size="22" />
            </span>
            <div class="workflow-copy">
              <span class="workflow-no">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ t(`products.workflow.steps.${step.key}.title`) }}</h3>
              <p>{{ t(`products.workflow.steps.${step.key}.body`) }}</p>
            </div>
          </li>
        </ol>
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
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;
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
  padding: 5.5rem 2.5rem 0;
}

.portfolio-snapshot,
.portfolio-compare,
.fit-workflow {
  position: relative;
  margin-bottom: 7rem;
}

.portfolio-snapshot {
  overflow: hidden;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  background: rgba(250, 250, 240, 0.78);
  border: 1px solid rgba(0, 41, 0, 0.2);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.portfolio-snapshot::after {
  content: '';
  position: absolute;
  width: 18rem; height: 18rem;
  inset-block-start: -11rem; inset-inline-end: -7rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 146, 92, 0.24), rgba(255, 146, 92, 0) 70%);
  pointer-events: none;
}

.support-head {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
  align-items: end;
  gap: 2.5rem;
  margin-bottom: 2.25rem;
}

.support-eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--coral-deep);
}

html[lang='fa'] .support-eyebrow {
  letter-spacing: 0;
  text-transform: none;
}

.support-title {
  max-width: 15ch;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.625rem);
  line-height: 1.12; font-weight: 550;
  letter-spacing: var(--track-display);
  color: var(--ink);
}

html[lang='fa'] .support-title { font-weight: 800; line-height: 1.35; }

.support-intro {
  max-width: 48ch;
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--ink-soft);
}

.snapshot-grid {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid rgba(0, 41, 0, 0.16);
  border-radius: 20px;
  overflow: hidden;
  background: rgba(245, 245, 229, 0.72);
}

.snapshot-cell {
  min-width: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  align-items: center;
  column-gap: 0.875rem;
  padding: 1.25rem;
  border-inline-end: 1px solid rgba(0, 41, 0, 0.16);
}

.snapshot-cell:last-child { border-inline-end: 0; }

.snapshot-icon {
  grid-row: 1 / 3;
  display: inline-flex; align-items: center; justify-content: center;
  width: 44px; height: 44px;
  border-radius: 14px;
  color: var(--ink);
  background: var(--accent-soft);
  border: 1px solid rgba(255, 146, 92, 0.42);
}

.snapshot-cell strong {
  font-family: var(--font-display);
  font-size: 1.75rem; line-height: 1;
  font-weight: 650; color: var(--ink);
}

.snapshot-cell > span:last-child {
  overflow: hidden;
  font-size: 0.75rem; line-height: 1.35;
  color: var(--muted);
}

.category { margin-bottom: 5.5rem; scroll-margin-top: 7rem; }
.category:last-of-type { margin-bottom: 0; }

.cat-head {
  display: flex; align-items: center; gap: 2rem;
  margin-bottom: 3rem;
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

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 460px));
  justify-content: center;
  column-gap: 1.75rem;
  row-gap: 2rem;
  align-items: stretch;
}

/* ── Family comparison ───────────────────────────────── */
.portfolio-compare { padding-top: 1rem; }

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.comparison-card {
  overflow: hidden;
  border: 1px solid rgba(0, 41, 0, 0.2);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}

.comparison-software { background: rgba(250, 250, 240, 0.9); }
.comparison-equipment { background: var(--warm-soft); }

.comparison-card-head {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
  padding: 1.75rem;
}

.comparison-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 52px; height: 52px; border-radius: 16px;
  color: #002900;
  background: var(--grad-orange);
  box-shadow: 0 14px 30px -16px rgba(229, 100, 42, 0.7);
}

.comparison-card h3 {
  margin: 0 0 0.5rem;
  font-family: var(--font-display);
  font-size: 1.5rem; line-height: 1.2;
  font-weight: 600; color: var(--ink);
}

html[lang='fa'] .comparison-card h3 { font-weight: 800; }

.comparison-card-head p {
  max-width: 38ch;
  margin: 0;
  font-size: 0.875rem; line-height: 1.6;
  color: var(--ink-soft);
}

.comparison-list { margin: 0; }

.comparison-list > div {
  display: grid;
  grid-template-columns: minmax(7.5rem, 0.72fr) 1.5fr;
  gap: 1.25rem;
  padding: 1rem 1.75rem;
  border-top: 1px solid rgba(0, 41, 0, 0.16);
}

.comparison-list dt {
  font-size: 0.75rem; line-height: 1.45;
  font-weight: 700; color: var(--coral-deep);
}

.comparison-list dd {
  margin: 0;
  font-size: 0.875rem; line-height: 1.55;
  color: var(--ink-soft);
}

/* ── Product-fit workflow ────────────────────────────── */
.fit-workflow {
  overflow: hidden;
  padding: clamp(2rem, 4vw, 3.5rem);
  background: var(--grad-ivory-peach);
  border: 1px solid rgba(0, 41, 0, 0.18);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow-lift);
}

.fit-workflow::after {
  content: '';
  position: absolute;
  width: 26rem; height: 26rem;
  inset-block-end: -19rem; inset-inline-start: -10rem;
  border-radius: 50%;
  border: 1px solid rgba(46, 91, 46, 0.12);
  box-shadow:
    0 0 0 3rem rgba(46, 91, 46, 0.035),
    0 0 0 6rem rgba(255, 146, 92, 0.035);
  pointer-events: none;
}

.workflow-list {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0; margin: 0;
}

.workflow-list::before {
  content: '';
  position: absolute;
  z-index: 0;
  height: 2px;
  inset-block-start: 26px;
  inset-inline: 6.5%;
  background: var(--grad-orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

html[dir='rtl'] .workflow-list::before { transform-origin: right; }
.fit-workflow.is-visible .workflow-list::before { transform: scaleX(1); }

.workflow-step {
  position: relative; z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.workflow-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 52px; height: 52px;
  color: var(--ink);
  background: var(--cream);
  border: 2px solid var(--orange);
  border-radius: 50%;
  box-shadow: 0 8px 20px -12px rgba(0, 41, 0, 0.5);
}

.workflow-copy {
  flex: 1;
  margin-top: 1rem;
  padding: 1.25rem;
  background: rgba(250, 250, 240, 0.82);
  border: 1px solid rgba(0, 41, 0, 0.16);
  border-radius: 18px;
  backdrop-filter: blur(10px);
}

.workflow-no {
  display: block;
  margin-bottom: 0.75rem;
  font-family: var(--font-display);
  font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--coral-deep);
}

html[lang='fa'] .workflow-no { letter-spacing: 0; }

.workflow-copy h3 {
  margin: 0 0 0.5rem;
  font-size: 0.9375rem; line-height: 1.35;
  font-weight: 700; color: var(--ink);
}

.workflow-copy p {
  margin: 0;
  font-size: 0.8125rem; line-height: 1.6;
  color: var(--ink-soft);
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
  .nav-card-1 { margin-top: 0; }
  .products-inner { padding: 5rem 1.75rem 0; }
  .portfolio-snapshot, .portfolio-compare, .fit-workflow { margin-bottom: 5.5rem; }
  .support-head { grid-template-columns: 1fr; align-items: start; gap: 1rem; }
  .support-title { max-width: 20ch; }
  .snapshot-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .snapshot-cell:nth-child(2) { border-inline-end: 0; }
  .snapshot-cell:nth-child(-n + 2) { border-bottom: 1px solid rgba(0, 41, 0, 0.16); }
  .category { margin-bottom: 5.5rem; }
  .cat-head { gap: 1.5rem; margin-bottom: 3rem; }
  .custom-panel { margin-top: 0; }
}

@media (max-width: 720px) {
  .prologue { padding: 7.5rem 1.25rem 9rem; }
  .nav-cards { padding: 0 1.25rem; }
  .products-inner { padding: 4rem 1.25rem 0; }
  .portfolio-snapshot, .portfolio-compare, .fit-workflow { margin-bottom: 4.5rem; }
  .portfolio-snapshot, .fit-workflow { border-radius: var(--radius-card); }
  .support-head { margin-bottom: 1.75rem; }
  .product-grid, .comparison-grid { grid-template-columns: 1fr; }
  .comparison-list > div { grid-template-columns: minmax(6.5rem, 0.7fr) 1.3fr; }
  .workflow-list {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .workflow-list::before {
    width: 2px; height: auto;
    inset-block: 26px;
    inset-inline-start: 25px;
    inset-inline-end: auto;
    transform: scaleY(0);
    transform-origin: top;
  }
  html[dir='rtl'] .workflow-list::before { transform-origin: top; }
  .fit-workflow.is-visible .workflow-list::before { transform: scaleY(1); }
  .workflow-step {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 1rem;
    align-items: start;
  }
  .workflow-copy { margin-top: 0; }
  .custom-panel-inner { flex-direction: column; gap: 1rem; }
  .custom-panel { border-radius: var(--radius-card); }
}

@media (max-width: 480px) {
  .snapshot-grid { grid-template-columns: 1fr; }
  .snapshot-cell,
  .snapshot-cell:nth-child(2) {
    border-inline-end: 0;
    border-bottom: 1px solid rgba(0, 41, 0, 0.16);
  }
  .snapshot-cell:last-child { border-bottom: 0; }
  .comparison-list > div { grid-template-columns: 1fr; gap: 0.375rem; }
}

@media (prefers-reduced-motion: reduce) {
  .workflow-list::before {
    transition: none;
    transform: none;
  }
}
</style>
