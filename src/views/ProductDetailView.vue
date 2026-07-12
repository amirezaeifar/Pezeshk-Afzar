<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { getProductById } from '../data/products.js'
import { localize } from '../utils/localized.js'

const props = defineProps({
  id: { type: String, required: true },
})

const { t, locale } = useI18n()

const product = computed(() => getProductById(props.id))

const features = computed(() => {
  const p = product.value
  if (!p) return []
  return p.features[locale.value] ?? p.features.en ?? []
})

const certifications = computed(() => {
  const p = product.value
  if (!p) return []
  return p.certifications[locale.value] ?? p.certifications.en ?? []
})
</script>

<template>
  <main class="view detail">
    <div v-if="product" class="detail-inner">
      <!-- Breadcrumb -->
      <nav class="crumb rise stagger-1" aria-label="Breadcrumb">
        <RouterLink to="/products" class="crumb-link">{{ t('nav.products') }}</RouterLink>
        <span class="crumb-sep" aria-hidden="true">/</span>
        <span class="crumb-current">{{ localize(product.name, locale) }}</span>
      </nav>

      <!-- Header -->
      <header class="head">
        <div class="head-text">
          <div class="tags rise stagger-2">
            <span class="tag tag-type">{{ t(`card.type.${product.type}`) }}</span>
            <span class="tag tag-cat">{{ localize(product.category, locale) }}</span>
            <span v-if="product.flagship" class="tag tag-flag">{{ t('card.flagship') }}</span>
          </div>
          <h1 class="title rise stagger-3">{{ localize(product.name, locale) }}</h1>
          <p class="tagline rise stagger-4">{{ localize(product.tagline, locale) }}</p>
          <div class="head-actions rise stagger-5">
            <RouterLink to="/contact" class="btn-ink">
              {{ t('detail.requestInfo') }}
              <span class="arrow">→</span>
            </RouterLink>
            <RouterLink to="/products" class="btn-ghost-ink">{{ t('detail.backToProducts') }}</RouterLink>
          </div>
        </div>
        <div class="head-media rise stagger-3">
          <span class="media-no">{{ t('card.no') }}{{ product.number }}</span>
          <img :src="product.image" :alt="localize(product.name, locale)" loading="lazy" />
        </div>
      </header>

      <!-- Body: general description + sidebar -->
      <div class="body">
        <div class="body-main">
          <section class="block">
            <span class="block-no">01</span>
            <h2 class="block-title">{{ t('detail.overview') }}</h2>
            <p class="block-lead">{{ localize(product.description, locale) }}</p>
          </section>

          <section class="block">
            <span class="block-no">02</span>
            <h2 class="block-title">{{ t('detail.capabilities') }}</h2>
            <ul class="feat-list">
              <li v-for="(f, i) in features" :key="i" class="feat">
                <span class="feat-bullet" aria-hidden="true">—</span>
                <span>{{ f }}</span>
              </li>
            </ul>
          </section>

          <section class="block">
            <span class="block-no">03</span>
            <h2 class="block-title">{{ t('detail.specs') }}</h2>
            <dl class="spec-table">
              <div v-for="(s, i) in product.specs" :key="i" class="spec-row">
                <dt class="spec-label">{{ localize(s.label, locale) }}</dt>
                <dd class="spec-value">{{ localize(s.value, locale) }}</dd>
              </div>
            </dl>
          </section>
        </div>

        <aside class="body-aside">
          <div class="aside-card">
            <h3 class="aside-title">{{ t('detail.certifications') }}</h3>
            <ul class="cert-list">
              <li v-for="(c, i) in certifications" :key="i" class="cert">
                <span class="cert-tick" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12l5 5 9-11" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span>{{ c }}</span>
              </li>
            </ul>
          </div>

          <div class="aside-card aside-meta">
            <div class="meta-row">
              <span class="meta-key">{{ t('detail.metaCategory') }}</span>
              <span class="meta-val">{{ localize(product.category, locale) }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-key">{{ t('detail.metaType') }}</span>
              <span class="meta-val">{{ t(`card.type.${product.type}`) }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-key">{{ t('detail.metaRef') }}</span>
              <span class="meta-val">{{ t('card.no') }}{{ product.number }}</span>
            </div>
          </div>
        </aside>
      </div>

      <!-- Closing CTA -->
      <section class="cta-block">
        <p class="cta-text">{{ t('detail.ctaText') }}</p>
        <RouterLink to="/contact" class="btn-ink">
          {{ t('detail.requestInfo') }}
          <span class="arrow">→</span>
        </RouterLink>
      </section>
    </div>

    <!-- Not found -->
    <div v-else class="detail-inner missing">
      <h1 class="missing-title">{{ t('detail.notFound') }}</h1>
      <RouterLink to="/products" class="btn-ink">
        {{ t('detail.backToProducts') }}
        <span class="arrow">→</span>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.detail { padding: 11rem 2.5rem 6rem; position: relative; }
.detail-inner { max-width: 1280px; margin: 0 auto; }

/* Breadcrumb */
.crumb {
  display: flex; align-items: center; gap: 0.625rem;
  font-family: var(--font-body);
  font-size: 0.8125rem; font-weight: 600;
  color: var(--muted); margin-bottom: 2.5rem;
}

.crumb-link { color: var(--muted); text-decoration: none; transition: color 0.3s ease; }
.crumb-link:hover { color: var(--accent); }
.crumb-sep { opacity: 0.5; }
.crumb-current { color: var(--ink); }

/* Header */
.head {
  display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
  padding-bottom: 4rem; margin-bottom: 4rem;
  border-bottom: 1px solid var(--line);
}

.tags { display: flex; flex-wrap: wrap; gap: 0.625rem; margin-bottom: 1.5rem; }

.tag {
  font-family: var(--font-body);
  font-size: 0.75rem; font-weight: 600;
  padding: 0.375rem 0.875rem; border: 1px solid var(--line);
  border-radius: 999px;
}

.tag-type { color: var(--accent); border-color: var(--accent); }
.tag-cat { color: var(--ink-soft); }
.tag-flag { color: #001B00; background: var(--warm); border-color: var(--warm); }

.title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.05; font-weight: 550;
  letter-spacing: var(--track-display); color: var(--ink); margin: 0;
}

html[lang='fa'] .title { font-weight: 800; line-height: 1.25; }

.tagline {
  font-size: 1.125rem; line-height: 1.5;
  color: var(--ink-soft); margin: 1.25rem 0 0; max-width: 46ch;
}

.head-actions {
  margin-top: 2.5rem;
  display: flex; flex-wrap: wrap; gap: 0.875rem; align-items: center;
}

.head-media {
  position: relative; overflow: hidden;
  aspect-ratio: 4 / 3; background: var(--cream-deep);
  border: 1px solid var(--line);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow-card);
}

/* The photo carries its own color — no CSS grading */
.head-media img {
  width: 100%; height: 100%; object-fit: cover;
}

.media-no {
  position: absolute; top: 1.25rem; left: 1.25rem; z-index: 2;
  font-family: var(--font-body);
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--paper); mix-blend-mode: difference;
}

html[lang='fa'] .media-no { letter-spacing: 0.05em; text-transform: none; font-size: 0.75rem; }

html[dir='rtl'] .media-no { left: auto; right: 1.25rem; }

/* Body */
.body {
  display: grid; grid-template-columns: 7fr 4fr; gap: 4rem;
  margin-bottom: 5rem;
}

.body-main { display: flex; flex-direction: column; gap: 3.5rem; }

.block { display: flex; flex-direction: column; gap: 1rem; }

.block-no {
  font-family: var(--font-body);
  font-size: 0.8125rem; font-weight: 700;
  letter-spacing: 0.1em; color: var(--coral-deep);
}

html[lang='fa'] .block-no { letter-spacing: 0; }

.block-title {
  font-family: var(--font-display);
  font-size: clamp(1.375rem, 2.4vw, 1.75rem);
  font-weight: 600; letter-spacing: var(--track-display);
  color: var(--ink); margin: 0;
}

html[lang='fa'] .block-title { font-weight: 700; }

.block-lead {
  font-size: 1.0625rem; line-height: 1.75;
  color: var(--ink-soft); margin: 0; max-width: 64ch;
}

.feat-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 0.875rem;
}

.feat {
  display: flex; gap: 0.875rem;
  font-size: 1rem; line-height: 1.55; color: var(--ink-soft);
  padding-bottom: 0.875rem; border-bottom: 1px solid var(--line);
}

.feat-bullet { color: var(--accent); flex-shrink: 0; font-weight: 700; }

/* Spec table */
.spec-table {
  margin: 0; border: 1px solid var(--line);
  border-radius: 16px; overflow: hidden;
  background: #FCFCF2;
}

.spec-row {
  display: grid; grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--line);
}

.spec-row:last-child { border-bottom: none; }

.spec-label, .spec-value {
  padding: 1rem 1.25rem; margin: 0; font-size: 0.9375rem;
}

.spec-label {
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--ink); background: var(--warm-soft);
  border-inline-end: 1px solid var(--line);
}

html[lang='fa'] .spec-label { font-weight: 700; }

.spec-value { color: var(--ink-soft); }

/* Aside */
.body-aside { display: flex; flex-direction: column; gap: 1.5rem; }

/* Clean white cards on the cream canvas */
.aside-card {
  border: 1px solid var(--line);
  background: #FCFCF2;
  border-radius: var(--radius-card);
  padding: 1.75rem;
  box-shadow: var(--shadow-card);
}

.aside-title {
  font-family: var(--font-body);
  font-size: 0.8125rem; font-weight: 700;
  color: var(--coral-deep); margin: 0 0 1.25rem;
}

.cert-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 1rem;
}

.cert {
  display: flex; align-items: flex-start; gap: 0.75rem;
  font-size: 0.9375rem; line-height: 1.45; color: var(--ink);
}

.cert-tick {
  display: inline-flex; align-items: center; justify-content: center;
  width: 22px; height: 22px; flex-shrink: 0; margin-top: 1px;
  border-radius: 50%;
  background: var(--grad-orange); color: #001B00;
}

.aside-meta { display: flex; flex-direction: column; gap: 0; padding: 0.5rem 1.75rem; }

.meta-row {
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  padding: 0.875rem 0; border-bottom: 1px solid var(--line);
}

.meta-row:last-child { border-bottom: none; }

.meta-key {
  font-family: var(--font-body);
  font-size: 0.8125rem; font-weight: 600;
  color: var(--muted);
}

.meta-val { font-size: 0.9375rem; color: var(--ink); font-weight: 500; text-align: end; }

/* CTA */
.cta-block {
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
  text-align: center; padding: 4rem 0 0;
  border-top: 1px solid var(--line);
}

.cta-text {
  font-size: 1.125rem; line-height: 1.5;
  color: var(--ink-soft); margin: 0; max-width: 44ch;
}

/* Missing */
.missing { display: flex; flex-direction: column; align-items: flex-start; gap: 2rem; }
.missing-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 600;
  letter-spacing: var(--track-display); color: var(--ink); margin: 0;
}
html[lang='fa'] .missing-title { font-weight: 800; }

@media (max-width: 1024px) {
  .detail { padding: 9rem 1.75rem 4rem; }
  .head { grid-template-columns: 1fr; gap: 2.5rem; }
  .head-media { order: -1; }
  .body { grid-template-columns: 1fr; gap: 2.5rem; }
}

@media (max-width: 720px) {
  .detail { padding: 7.5rem 1.25rem 3rem; }
  .spec-row { grid-template-columns: 1fr; }
  .spec-label { border-inline-end: none; border-bottom: 1px solid var(--line); }
}
</style>
