<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  product: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const { t, locale } = useI18n()
</script>

<template>
  <RouterLink
    :to="`/products#${product.id}`"
    class="card"
    :class="[`span-${product.span}`, 'rise']"
    :style="{ animationDelay: `${0.15 + index * 0.08}s` }"
  >
    <div class="card-media">
      <span class="card-no">{{ t('card.no') }}{{ product.number }}</span>
      <span v-if="product.flagship" class="flagship">Flagship</span>
      <img :src="product.image" :alt="product.name[locale]" loading="lazy" />
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
      <span class="meta-category">{{ product.category[locale] }}</span>
      <h3 class="card-title">{{ product.name[locale] }}</h3>
      <p class="card-tagline">{{ product.tagline[locale] }}</p>
      <div class="card-foot">
        <span class="foot-link">{{ t('card.view') }}</span>
        <span class="foot-arrow">→</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  position: relative; display: flex; flex-direction: column;
  gap: 1.5rem; background: transparent; cursor: pointer;
  text-decoration: none; color: inherit;
}

.card-media {
  position: relative; overflow: hidden;
  aspect-ratio: 4 / 5;
  background: var(--cream-deep); border-radius: 4px;
}

.span-wide .card-media { aspect-ratio: 16 / 10; }

.card-media img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease;
  filter: saturate(0.85) contrast(1.05);
}

.card:hover .card-media img {
  transform: scale(1.05);
  filter: saturate(1) contrast(1.08);
}

.card-no {
  position: absolute; top: 1.25rem; left: 1.25rem; z-index: 2;
  font-family: 'Manrope', sans-serif;
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--paper); mix-blend-mode: difference; opacity: 0.95;
}

html[lang='fa'] .card-no {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0.05em; text-transform: none; font-size: 0.75rem;
}

html[dir='rtl'] .card-no { left: auto; right: 1.25rem; }

.flagship {
  position: absolute; top: 1.25rem; right: 1.25rem; z-index: 2;
  font-family: 'Manrope', sans-serif;
  font-size: 0.625rem; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--paper); background: var(--accent);
  padding: 0.375rem 0.625rem; border-radius: 2px;
}

html[dir='rtl'] .flagship { right: auto; left: 1.25rem; }

.card-overlay {
  position: absolute; inset: 0;
  display: flex; align-items: flex-end; justify-content: flex-end;
  padding: 1.25rem;
  background: linear-gradient(to top, rgba(12, 17, 22, 0.6), transparent 60%);
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover .card-overlay { opacity: 1; }

.overlay-cta {
  display: inline-flex; align-items: center; gap: 0.5rem;
  color: var(--paper);
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.16em; text-transform: uppercase;
  transform: translateY(8px);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s;
}

html[lang='fa'] .overlay-cta {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0; text-transform: none; font-size: 0.875rem;
}

.card:hover .overlay-cta { transform: translateY(0); }
html[dir='rtl'] .overlay-cta svg { transform: rotate(180deg); }

.card-meta {
  display: flex; flex-direction: column; gap: 0.5rem;
  padding: 0 0.125rem;
}

.meta-category {
  font-family: 'Manrope', sans-serif;
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--accent);
}

html[lang='fa'] .meta-category {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0.03em; text-transform: none; font-size: 0.75rem;
}

.card-title {
  font-family: 'Manrope', sans-serif;
  font-size: 1.375rem; line-height: 1.2; font-weight: 600;
  letter-spacing: -0.015em; color: var(--ink); margin: 0.125rem 0 0;
}

html[lang='fa'] .card-title {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.card-tagline {
  font-size: 0.9375rem; line-height: 1.5;
  color: var(--ink-soft); opacity: 0.78;
  max-width: 38ch; margin: 0;
}

.card-foot {
  display: inline-flex; align-items: center; gap: 0.5rem;
  margin-top: 0.5rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--ink); transition: color 0.4s ease;
}

html[lang='fa'] .card-foot {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0; text-transform: none; font-size: 0.875rem;
}

.foot-arrow {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-block;
}

html[dir='rtl'] .foot-arrow { transform: rotate(180deg); }

.card:hover .card-foot { color: var(--accent); }
.card:hover .foot-arrow { transform: translateX(4px); }
html[dir='rtl'] .card:hover .foot-arrow { transform: translateX(-4px) rotate(180deg); }
</style>
