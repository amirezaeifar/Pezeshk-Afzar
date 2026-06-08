<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { products } from '../data/products.js'

const { t, locale } = useI18n()
</script>

<template>
  <main class="view products">
    <div class="products-inner">
      <header class="head">
        <div class="head-aside">
          <span class="eyebrow rise stagger-1">{{ t('products.eyebrow') }}</span>
        </div>
        <div class="head-main">
          <h1 class="head-title">
            <span class="head-line rise stagger-2">{{ t('products.titleA') }}</span>
            <span class="head-line rise stagger-3"><em>{{ t('products.titleB') }}</em></span>
          </h1>
          <p class="head-intro rise stagger-4">{{ t('products.intro') }}</p>
        </div>
      </header>

      <div class="list">
        <article v-for="(p, i) in products" :id="p.id" :key="p.id"
                 class="row rise" :class="{ 'row-flip': i % 2 === 1 }"
                 :style="{ animationDelay: `${0.2 + i * 0.06}s` }">
          <div class="row-media">
            <span class="row-num">{{ t('card.no') }}{{ p.number }}</span>
            <img :src="p.image" :alt="p.name[locale]" loading="lazy" />
            <span v-if="p.flagship" class="row-flagship">Flagship</span>
          </div>

          <div class="row-body">
            <span class="row-category">{{ p.category[locale] }}</span>
            <h2 class="row-title">{{ p.name[locale] }}</h2>
            <p class="row-tagline">{{ p.tagline[locale] }}</p>
            <p class="row-desc">{{ p.description[locale] }}</p>

            <div class="row-features">
              <span class="row-features-label">{{ t('products.featuresLabel') }}</span>
              <ul>
                <li v-for="(f, j) in p.features[locale]" :key="j">
                  <span class="bullet" aria-hidden="true">—</span>
                  <span>{{ f }}</span>
                </li>
              </ul>
            </div>

            <div class="row-actions">
              <RouterLink to="/contact" class="btn-ink">
                {{ t('products.demo') }}
                <span class="arrow">→</span>
              </RouterLink>
              <a href="#" class="btn-ghost-ink" @click.prevent>{{ t('products.details') }}</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<style scoped>
.products { padding: 11rem 2.5rem 6rem; position: relative; }

.products::before {
  content: ''; position: absolute; top: 9rem; right: 10%;
  width: 380px; height: 380px;
  background: radial-gradient(circle, var(--accent-soft) 0%, transparent 70%);
  opacity: 0.4; filter: blur(80px);
  pointer-events: none; z-index: 0;
}

html[dir='rtl'] .products::before { right: auto; left: 10%; }

.products-inner { max-width: 1440px; margin: 0 auto; position: relative; z-index: 1; }

.head {
  display: grid; grid-template-columns: 1fr 6fr; gap: 2rem 3rem;
  margin-bottom: 6rem; padding-bottom: 3rem;
  border-bottom: 1px solid var(--line);
}

.head-aside { padding-top: 1rem; }

.head-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(3rem, 8vw, 7.5rem);
  line-height: 0.98; font-weight: 600;
  letter-spacing: -0.035em; margin: 0; color: var(--ink);
}

html[lang='fa'] .head-title {
  font-family: 'FarsiFont', sans-serif;
  font-size: clamp(2.5rem, 6.5vw, 5.5rem);
  line-height: 1.2; font-weight: 700;
}

.head-line { display: block; }
.head-line em { font-style: normal; color: var(--accent); font-weight: 500; }
html[lang='fa'] .head-line em { font-weight: 600; }

.head-intro {
  font-size: 1.0625rem; line-height: 1.6;
  color: var(--ink-soft); max-width: 56ch; margin: 2rem 0 0;
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
  background: var(--cream-deep); border-radius: 4px;
}

.row-flip .row-media { aspect-ratio: 5 / 4; }

.row-media img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease;
  filter: saturate(0.88) contrast(1.04);
}

.row:hover .row-media img {
  transform: scale(1.04);
  filter: saturate(1) contrast(1.06);
}

.row-num {
  position: absolute; top: 1.25rem; left: 1.25rem; z-index: 2;
  font-family: 'Manrope', sans-serif;
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--paper); mix-blend-mode: difference;
}

html[lang='fa'] .row-num {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0.05em; text-transform: none; font-size: 0.75rem;
}

html[dir='rtl'] .row-num { left: auto; right: 1.25rem; }

.row-flagship {
  position: absolute; top: 1.25rem; right: 1.25rem; z-index: 2;
  font-family: 'Manrope', sans-serif;
  font-size: 0.625rem; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--paper); background: var(--accent);
  padding: 0.375rem 0.625rem; border-radius: 2px;
}

html[dir='rtl'] .row-flagship { right: auto; left: 1.25rem; }

.row-body { display: flex; flex-direction: column; gap: 0.875rem; }

.row-category {
  font-family: 'Manrope', sans-serif;
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent);
}

html[lang='fa'] .row-category {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0.03em; text-transform: none; font-size: 0.8125rem;
}

.row-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  line-height: 1.1; font-weight: 600;
  letter-spacing: -0.025em; margin: 0.25rem 0 0; color: var(--ink);
}

html[lang='fa'] .row-title {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.row-tagline {
  font-size: 1.0625rem; line-height: 1.4;
  color: var(--ink); font-weight: 500; margin: 0.25rem 0 0;
}

.row-desc {
  font-size: 0.9375rem; line-height: 1.7;
  color: var(--ink-soft); margin: 0.5rem 0 0; max-width: 56ch;
}

.row-features {
  margin-top: 1rem; padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 0.875rem;
}

.row-features-label {
  font-family: 'Manrope', sans-serif;
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--muted);
}

html[lang='fa'] .row-features-label {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0.03em; text-transform: none; font-size: 0.8125rem;
}

.row-features ul {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.625rem;
}

.row-features li {
  display: flex; gap: 0.875rem;
  font-size: 0.9375rem; line-height: 1.5;
  color: var(--ink-soft);
}

.bullet { color: var(--accent); flex-shrink: 0; font-weight: 700; }

.row-actions {
  margin-top: 2rem;
  display: flex; flex-wrap: wrap; gap: 0.875rem; align-items: center;
}

@media (max-width: 1024px) {
  .products { padding: 9rem 1.75rem 4rem; }
  .head { grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 4rem; }
  .list { gap: 5rem; }
  .row, .row-flip { grid-template-columns: 1fr; gap: 2rem; }
  .row-flip .row-media { order: 0; }
  .row-flip .row-body { order: 1; }
  .row-flip .row-media { aspect-ratio: 4 / 5; }
}

@media (max-width: 720px) {
  .products { padding: 7.5rem 1.25rem 3rem; }
  .list { gap: 4rem; }
}
</style>
