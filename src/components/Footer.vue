<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()

const phoneRaw = '+989022802826'
const phoneDisplay = '+98 902 280 2826'
const emailAddress = 'soshika1010@gmail.com'

const socials = [
  { key: 'linkedin', url: 'https://linkedin.com/' },
  { key: 'instagram', url: 'https://instagram.com/' },
  { key: 'telegram', url: 'https://t.me/' },
]
</script>

<template>
  <footer class="foot">
    <div class="foot-inner">
      <div class="cols">
        <div class="col col-brand">
          <RouterLink to="/" class="brand">
            <span class="brand-mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <rect x="8.5" y="2" width="3" height="16" fill="currentColor"/>
                <rect x="2" y="8.5" width="16" height="3" fill="currentColor"/>
              </svg>
            </span>
            <span class="brand-name">{{ t('brand') }}</span>
          </RouterLink>
          <p class="brand-tagline">{{ t('footer.tagline') }}</p>
        </div>

        <nav class="col col-links" aria-label="Footer navigation">
          <h3 class="col-heading">{{ t('footer.columns.navigate') }}</h3>
          <ul class="link-list">
            <li><RouterLink to="/" class="foot-link">{{ t('nav.home') }}</RouterLink></li>
            <li><RouterLink to="/products" class="foot-link">{{ t('nav.products') }}</RouterLink></li>
            <li><RouterLink to="/about" class="foot-link">{{ t('nav.about') }}</RouterLink></li>
            <li><RouterLink to="/contact" class="foot-link">{{ t('nav.contact') }}</RouterLink></li>
          </ul>
        </nav>

        <div class="col col-contact">
          <h3 class="col-heading">{{ t('footer.columns.contact') }}</h3>
          <ul class="contact-list">
            <li class="contact-item">
              <span class="ci-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2"/>
                  <path d="M3 7l9 6 9-6"/>
                </svg>
              </span>
              <a :href="`mailto:${emailAddress}`" class="ci-link" dir="ltr">{{ emailAddress }}</a>
            </li>
            <li class="contact-item">
              <span class="ci-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2.03Z"/>
                </svg>
              </span>
              <a :href="`tel:${phoneRaw}`" class="ci-link" dir="ltr">{{ phoneDisplay }}</a>
            </li>
            <li class="contact-item">
              <span class="ci-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <span class="ci-text">{{ t('footer.contact.address') }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="bar">
        <p class="bar-rights">© {{ year }} {{ t('brand') }}. {{ t('footer.rights') }}</p>

        <ul class="socials">
          <li v-for="s in socials" :key="s.key">
            <a :href="s.url" target="_blank" rel="noopener noreferrer" class="social"
               :aria-label="t(`footer.social.${s.key}`)">
              <svg v-if="s.key === 'linkedin'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0H13v1.6c.6-1 1.9-1.9 3.7-1.9 3 0 4.3 1.8 4.3 4.8V21h-4v-6.4c0-1.6-.6-2.5-1.9-2.5-1.3 0-2 .8-2 2.5V21H9.5V9Z"/>
              </svg>
              <svg v-else-if="s.key === 'instagram'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              <svg v-else-if="s.key === 'telegram'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.5 3.2 2.9 10.4c-1 .4-1 1.8 0 2.2l4.4 1.5 1.7 5.5c.3 1 1.6 1.2 2.2.4l2.6-3.3 4.6 3.4c.8.6 2 .2 2.2-.8l3.4-14.7c.3-1.1-.8-2.1-2-1.4Zm-2.4 3.5-7.7 7.1-.3 3.2-1.5-4.8 9.5-5.5Z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  margin-top: auto;
  background: var(--ink);
  color: var(--paper);
  padding: 5rem 2.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.foot-inner { max-width: 1440px; margin: 0 auto; }

.cols {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.4fr;
  gap: 4rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.col { display: flex; flex-direction: column; gap: 1.25rem; }

.brand {
  display: inline-flex; align-items: center; gap: 0.625rem;
  text-decoration: none; color: var(--paper);
}

.brand-mark {
  display: inline-flex; align-items: center; justify-content: center;
  color: var(--accent); line-height: 1;
}

.brand-name {
  font-family: 'Manrope', sans-serif;
  font-size: 1.125rem; font-weight: 600;
  letter-spacing: -0.005em; color: var(--paper);
}

html[lang='fa'] .brand-name {
  font-family: 'FarsiFont', sans-serif; font-weight: 700; font-size: 1.1875rem;
}

.brand-tagline {
  font-size: 0.9375rem; line-height: 1.6;
  color: rgba(246, 247, 248, 0.62);
  max-width: 32ch; margin: 0.25rem 0 0;
}

.col-heading {
  font-family: 'Manrope', sans-serif;
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: rgba(246, 247, 248, 0.5);
  margin: 0 0 0.5rem; position: relative; padding-bottom: 0.875rem;
}

.col-heading::after {
  content: ''; position: absolute; bottom: 0; inset-inline-start: 0;
  width: 28px; height: 1px; background: var(--accent);
}

html[lang='fa'] .col-heading {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0.05em; text-transform: none; font-size: 0.8125rem;
}

.link-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.75rem;
}

.foot-link {
  color: rgba(246, 247, 248, 0.72);
  text-decoration: none;
  font-size: 0.9375rem; font-weight: 400;
  transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex; align-items: center; gap: 0.5rem;
}

.foot-link::before {
  content: ''; display: inline-block; width: 0; height: 1px;
  background: var(--accent);
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.foot-link:hover { color: var(--paper); }
.foot-link:hover::before { width: 14px; }

.contact-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 1rem;
}

.contact-item {
  display: flex; align-items: flex-start; gap: 0.75rem;
  font-size: 0.9375rem; line-height: 1.5;
  color: rgba(246, 247, 248, 0.72);
}

.ci-icon {
  flex-shrink: 0;
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: var(--accent);
  transition: background 0.4s ease;
  margin-top: 1px;
}

.contact-item:hover .ci-icon { background: rgba(15, 118, 110, 0.18); }

.ci-link {
  color: rgba(246, 247, 248, 0.85);
  text-decoration: none;
  transition: color 0.3s ease;
  font-variant-numeric: tabular-nums;
}

.ci-link:hover { color: var(--paper); }
.ci-text { color: rgba(246, 247, 248, 0.72); }

.bar {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 2rem; gap: 1.5rem;
}

.bar-rights {
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem; font-weight: 500; letter-spacing: 0.06em;
  color: rgba(246, 247, 248, 0.5); margin: 0;
}

html[lang='fa'] .bar-rights {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0; font-size: 0.8125rem;
}

.socials {
  list-style: none; padding: 0; margin: 0;
  display: flex; gap: 0.625rem;
}

.social {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 50%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(246, 247, 248, 0.72);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.4s ease, color 0.4s ease, border-color 0.4s ease;
}

.social:hover {
  transform: scale(1.08) translateY(-1px);
  background: var(--accent);
  border-color: var(--accent);
  color: var(--paper);
}

@media (max-width: 1024px) {
  .foot { padding: 4rem 1.75rem 1.5rem; }
  .cols { grid-template-columns: 1fr 1fr; gap: 3rem; padding-bottom: 2.5rem; }
  .col-brand { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .foot { padding: 3rem 1.25rem 1.25rem; }
  .cols { grid-template-columns: 1fr; gap: 2.5rem; text-align: center; }
  .col { align-items: center; }
  .col-heading::after { left: 50%; inset-inline-start: auto; transform: translateX(-50%); }
  .brand-tagline { text-align: center; }
  .link-list, .contact-list { align-items: center; }
  .contact-item { justify-content: center; }
  .bar { flex-direction: column; text-align: center; gap: 1.25rem; padding-top: 1.75rem; }
}
</style>
