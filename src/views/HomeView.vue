<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { products } from '../data/products.js'

const { t } = useI18n()

const previewProducts = products.slice(0, 3)
const whyKeys = ['accuracy', 'reliability', 'innovation']
const statKeys = ['one', 'two', 'three', 'four']
</script>

<template>
  <main class="view">
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-aside">
          <span class="eyebrow rise stagger-1">{{ t('hero.eyebrow') }}</span>
        </div>

        <div class="hero-main">
          <h1 class="hero-title">
            <span class="hero-line rise stagger-2">{{ t('hero.titleA') }}</span>
            <span class="hero-line rise stagger-3"><em>{{ t('hero.titleB') }}</em></span>
            <span class="hero-line rise stagger-4">
              {{ t('hero.titleC') }}
              <span class="title-mark">●</span>
            </span>
          </h1>
        </div>

        <div class="hero-sub rise stagger-5">
          <p>{{ t('hero.subtitle') }}</p>
          <div class="hero-actions">
            <RouterLink to="/products" class="btn-ink">
              {{ t('hero.ctaPrimary') }}
              <span class="arrow">→</span>
            </RouterLink>
            <RouterLink to="/contact" class="btn-ghost-ink">{{ t('hero.ctaSecondary') }}</RouterLink>
          </div>
        </div>

        <div class="hero-scroll rise stagger-6">
          <span class="scroll-line"></span>
          <span class="scroll-label">{{ t('hero.scroll') }}</span>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="stats-inner">
        <span class="eyebrow fade-in">{{ t('stats.eyebrow') }}</span>
        <div class="stats-grid">
          <div v-for="(k, i) in statKeys" :key="k" class="stat rise"
               :style="{ animationDelay: `${0.15 + i * 0.08}s` }">
            <span class="stat-value">{{ t(`stats.${k}.value`) }}</span>
            <span class="stat-label">{{ t(`stats.${k}.label`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="why">
      <header class="why-head">
        <div class="why-head-left">
          <span class="eyebrow fade-in">{{ t('why.eyebrow') }}</span>
          <h2 class="why-title fade-in">{{ t('why.title') }}</h2>
        </div>
        <p class="why-sub fade-in">{{ t('why.sub') }}</p>
      </header>

      <div class="why-grid">
        <article v-for="(k, i) in whyKeys" :key="k" class="why-item rise"
                 :style="{ animationDelay: `${0.15 + i * 0.1}s` }">
          <span class="why-no">0{{ i + 1 }}</span>
          <h3 class="why-item-title">{{ t(`why.items.${k}.title`) }}</h3>
          <p class="why-item-body">{{ t(`why.items.${k}.body`) }}</p>
        </article>
      </div>
    </section>

    <section id="products" class="collection">
      <header class="collection-head">
        <div class="head-left">
          <span class="eyebrow fade-in">{{ t('section.eyebrow') }}</span>
          <h2 class="collection-title fade-in">{{ t('section.featured') }}</h2>
        </div>
        <div class="head-right">
          <p class="collection-sub fade-in">{{ t('section.featuredSub') }}</p>
          <div class="head-count fade-in">
            <span class="hairline draw-line"></span>
            <span class="count-num">{{ t('section.count') }}</span>
          </div>
        </div>
      </header>

      <div class="grid">
        <ProductCard v-for="(product, i) in previewProducts" :key="product.id" :product="product" :index="i" />
      </div>

      <div class="collection-foot fade-in">
        <RouterLink to="/products" class="btn-ink">
          {{ t('section.viewAll') }}
          <span class="arrow">→</span>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero {
  padding: 11rem 2.5rem 6rem;
  max-width: 1440px; margin: 0 auto; position: relative;
}

.hero::after {
  content: ''; position: absolute; top: 9rem; right: 2.5rem;
  width: 360px; height: 360px;
  background: radial-gradient(circle, var(--accent-soft) 0%, transparent 70%);
  opacity: 0.55; filter: blur(70px);
  pointer-events: none; z-index: 0;
}

html[dir='rtl'] .hero::after { right: auto; left: 2.5rem; }

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-template-rows: auto auto auto;
  gap: 2rem 3rem;
  position: relative; z-index: 1;
}

.hero-aside { grid-column: 1; grid-row: 1; padding-top: 1rem; }
.hero-main { grid-column: 2; grid-row: 1 / span 2; }

.hero-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(3rem, 9vw, 9rem);
  line-height: 0.98; font-weight: 600;
  letter-spacing: -0.035em;
  margin: 0; color: var(--ink);
}

html[lang='fa'] .hero-title {
  font-family: 'FarsiFont', sans-serif;
  font-size: clamp(2.5rem, 7.5vw, 6.5rem);
  line-height: 1.2; font-weight: 700;
}

.hero-line { display: block; }
.hero-line em { font-style: normal; color: var(--accent); font-weight: 500; }
html[lang='fa'] .hero-line em { font-weight: 600; }

.title-mark {
  display: inline-block; font-size: 0.35em; color: var(--accent);
  vertical-align: super; margin-inline-start: 0.2em; transform: translateY(-0.8em);
}

.hero-sub {
  grid-column: 2; grid-row: 3;
  max-width: 560px;
  display: flex; flex-direction: column; gap: 2rem; margin-top: 2rem;
}

.hero-sub p {
  font-size: 1.0625rem; line-height: 1.6;
  color: var(--ink-soft); margin: 0;
}

.hero-actions { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }

.hero-scroll {
  grid-column: 1; grid-row: 3; align-self: end;
  display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;
}

.scroll-line {
  display: block; width: 1px; height: 56px;
  background: var(--ink); opacity: 0.4;
  animation: scrollPulse 2.4s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { transform: scaleY(0.5); transform-origin: top; opacity: 0.2; }
  50% { transform: scaleY(1); opacity: 0.5; }
}

.scroll-label {
  font-family: 'Manrope', sans-serif;
  font-size: 0.6875rem;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--muted);
}

html[lang='fa'] .scroll-label {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0; text-transform: none; font-size: 0.75rem;
}

.stats {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--cream);
  padding: 3.5rem 2.5rem;
}

.stats-inner {
  max-width: 1440px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 2rem;
}

.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;
}

.stat {
  display: flex; flex-direction: column; gap: 0.5rem;
  padding-inline-start: 1rem;
  border-inline-start: 1px solid var(--line);
}

.stat-value {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 600;
  letter-spacing: -0.02em; color: var(--ink);
}

html[lang='fa'] .stat-value {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.stat-label {
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--muted);
}

html[lang='fa'] .stat-label {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0; text-transform: none; font-size: 0.875rem;
}

.why {
  padding: 7rem 2.5rem 5rem;
  max-width: 1440px; margin: 0 auto;
}

.why-head {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; margin-bottom: 4rem; align-items: end;
}

.why-head-left { display: flex; flex-direction: column; gap: 1.25rem; }

.why-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.75rem, 3.2vw, 2.75rem);
  line-height: 1.15; font-weight: 600;
  letter-spacing: -0.02em; margin: 0;
  color: var(--ink); max-width: 18ch;
}

html[lang='fa'] .why-title {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.why-sub {
  font-size: 1rem; line-height: 1.6;
  color: var(--ink-soft); margin: 0; max-width: 44ch;
}

.why-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem;
  padding-top: 3rem; border-top: 1px solid var(--line);
}

.why-item { display: flex; flex-direction: column; gap: 1rem; }

.why-no {
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.2em; color: var(--accent);
}

.why-item-title {
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem; font-weight: 600;
  letter-spacing: -0.01em; margin: 0; color: var(--ink);
}

html[lang='fa'] .why-item-title {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.why-item-body {
  font-size: 0.9375rem; line-height: 1.6;
  color: var(--ink-soft); margin: 0;
}

.collection {
  padding: 5rem 2.5rem 8rem;
  max-width: 1440px; margin: 0 auto;
}

.collection-head {
  display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
  margin-bottom: 4rem; padding-bottom: 3rem;
  border-bottom: 1px solid var(--line);
}

.head-left { display: flex; flex-direction: column; gap: 1.25rem; }

.collection-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.15; font-weight: 600;
  letter-spacing: -0.02em; margin: 0;
  color: var(--ink); max-width: 18ch;
}

html[lang='fa'] .collection-title {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.head-right {
  display: flex; flex-direction: column;
  justify-content: space-between; align-items: flex-end;
  text-align: end; gap: 2rem; padding-top: 0.5rem;
}

.collection-sub {
  font-size: 1rem; line-height: 1.6;
  color: var(--ink-soft); max-width: 38ch; margin: 0;
}

.head-count {
  display: flex; align-items: center; gap: 1rem;
  width: 100%; justify-content: flex-end;
}

.head-count .hairline { flex: 1; max-width: 180px; }

.count-num {
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink);
}

html[lang='fa'] .count-num {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0; text-transform: none;
}

.grid {
  display: grid; grid-template-columns: repeat(12, 1fr); gap: 3rem 2rem;
}

.grid > :deep(.card) { grid-column: span 4; }
.grid > :deep(.card.span-wide) { grid-column: span 8; }
.grid > :deep(.card:nth-child(2)) { margin-top: 4rem; }
.grid > :deep(.card:nth-child(3)) { margin-top: 2rem; }

.collection-foot {
  display: flex; justify-content: center; margin-top: 5rem;
}

@media (max-width: 1024px) {
  .hero { padding: 9rem 1.75rem 4rem; }
  .why, .collection { padding-left: 1.75rem; padding-right: 1.75rem; }
  .stats { padding: 2.5rem 1.75rem; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  .why-head { grid-template-columns: 1fr; gap: 1.5rem; }
  .why-grid { grid-template-columns: 1fr; gap: 2rem; }
  .grid { gap: 2.5rem 1.5rem; }
  .grid > :deep(.card) { grid-column: span 6; }
  .grid > :deep(.card.span-wide) { grid-column: span 12; }
  .grid > :deep(.card:nth-child(n)) { margin-top: 0; }
  .collection-head { grid-template-columns: 1fr; gap: 2rem; }
  .head-right { align-items: flex-start; text-align: start; }
  .head-count { justify-content: flex-start; }
}

@media (max-width: 720px) {
  .hero { padding: 7.5rem 1.25rem 3rem; }
  .hero-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .hero-aside, .hero-main, .hero-sub, .hero-scroll { grid-column: 1; }
  .hero-aside { grid-row: 1; } .hero-main { grid-row: 2; }
  .hero-sub { grid-row: 3; margin-top: 1rem; }
  .hero-scroll { grid-row: 4; }
  .why, .collection { padding-left: 1.25rem; padding-right: 1.25rem; padding-top: 4rem; padding-bottom: 5rem; }
  .stats { padding: 2rem 1.25rem; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .grid > :deep(.card) { grid-column: span 12; }
}
</style>
