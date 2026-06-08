<script setup>
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted } from 'vue'

const { t, locale } = useI18n()
const scrolled = ref(false)

const toggleLocale = () => {
  const next = locale.value === 'fa' ? 'en' : 'fa'
  locale.value = next
  document.documentElement.setAttribute('lang', next)
  document.documentElement.setAttribute('dir', next === 'fa' ? 'rtl' : 'ltr')
}

const onScroll = () => { scrolled.value = window.scrollY > 24 }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled }">
    <div class="nav-inner">
      <RouterLink to="/" class="brand">
        <span class="brand-mark" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="8.5" y="2" width="3" height="16" fill="currentColor"/>
            <rect x="2" y="8.5" width="16" height="3" fill="currentColor"/>
          </svg>
        </span>
        <span class="brand-name">{{ t('brand') }}</span>
      </RouterLink>

      <nav class="nav-links">
        <RouterLink to="/" class="link-underline" exact-active-class="is-active">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/products" class="link-underline" active-class="is-active">{{ t('nav.products') }}</RouterLink>
        <RouterLink to="/about" class="link-underline" active-class="is-active">{{ t('nav.about') }}</RouterLink>
        <RouterLink to="/contact" class="link-underline" active-class="is-active">{{ t('nav.contact') }}</RouterLink>
      </nav>

      <button @click="toggleLocale" class="lang-toggle" aria-label="Switch language">
        <span class="lang-current">{{ locale.toUpperCase() }}</span>
        <span class="lang-divider">/</span>
        <span class="lang-other">{{ t('lang.switch') }}</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  padding: 1.5rem 0;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  background: transparent;
}

.nav.is-scrolled {
  padding: 0.875rem 0;
  background: rgba(246, 247, 248, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--line);
}

.nav-inner {
  max-width: 1440px; margin: 0 auto; padding: 0 2.5rem;
  display: grid; grid-template-columns: 1fr auto 1fr;
  align-items: center; gap: 2rem;
}

.brand {
  display: inline-flex; align-items: center; gap: 0.625rem;
  text-decoration: none; color: var(--ink); justify-self: start;
}

.brand-mark {
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--accent); line-height: 1;
}

.brand-name {
  font-size: 1.0625rem; font-weight: 600; letter-spacing: -0.005em;
}

html[lang='fa'] .brand-name { font-weight: 700; font-size: 1.125rem; }

.nav-links {
  display: flex; gap: 2.5rem; align-items: center;
}

.nav-links :deep(.is-active)::after {
  transform: scaleX(1) !important;
  transform-origin: left;
}
html[dir='rtl'] .nav-links :deep(.is-active)::after { transform-origin: right; }

.lang-toggle {
  justify-self: end;
  background: transparent; border: none; cursor: pointer;
  display: inline-flex; align-items: center; gap: 0.375rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem; font-weight: 600; letter-spacing: 0.16em;
  color: var(--ink);
  padding: 0.5rem 0.875rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

html[lang='fa'] .lang-toggle { font-family: 'FarsiFont', sans-serif; }

.lang-toggle:hover {
  background: var(--ink); color: var(--paper); border-color: var(--ink);
}

.lang-current { color: var(--accent); transition: color 0.3s; }
.lang-toggle:hover .lang-current { color: var(--paper); }
.lang-divider { opacity: 0.4; }
.lang-other { opacity: 0.6; }

@media (max-width: 880px) {
  .nav-links { display: none; }
  .nav-inner { grid-template-columns: 1fr auto; }
}
</style>
