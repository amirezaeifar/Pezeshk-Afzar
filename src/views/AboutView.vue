<script setup>
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const memberKeys = ['m1', 'm2', 'm3', 'm4']
const certKeys = ['c1', 'c2', 'c3', 'c4']
const statKeys = ['one', 'two', 'three', 'four']
</script>

<template>
  <main class="view about">
    <div class="about-inner">
      <header class="head">
        <div class="head-aside">
          <span class="eyebrow rise stagger-1">{{ t('about.eyebrow') }}</span>
        </div>
        <div class="head-main">
          <h1 class="head-title">
            <span class="head-line rise stagger-2">{{ t('about.titleA') }}</span>
            <span class="head-line rise stagger-3"><em>{{ t('about.titleB') }}</em></span>
          </h1>
          <p class="head-lead rise stagger-4">{{ t('about.lead') }}</p>
        </div>
      </header>

      <section class="prose">
        <div class="prose-block rise stagger-5">
          <span class="prose-no">01</span>
          <h2 class="prose-title">{{ t('about.missionTitle') }}</h2>
          <p class="prose-body">{{ t('about.missionBody') }}</p>
        </div>
        <div class="prose-block rise stagger-6">
          <span class="prose-no">02</span>
          <h2 class="prose-title">{{ t('about.storyTitle') }}</h2>
          <p class="prose-body">{{ t('about.storyBody') }}</p>
        </div>
      </section>

      <section class="stats">
        <div v-for="(k, i) in statKeys" :key="k" class="stat rise"
             :style="{ animationDelay: `${0.1 + i * 0.08}s` }">
          <span class="stat-value">{{ t(`stats.${k}.value`) }}</span>
          <span class="stat-label">{{ t(`stats.${k}.label`) }}</span>
        </div>
      </section>

      <section class="team">
        <header class="team-head">
          <span class="eyebrow fade-in">{{ t('about.teamEyebrow') }}</span>
          <h2 class="team-title fade-in">{{ t('about.teamTitle') }}</h2>
        </header>

        <div class="team-grid">
          <article v-for="(k, i) in memberKeys" :key="k" class="member rise"
                   :style="{ animationDelay: `${0.15 + i * 0.08}s` }">
            <div class="member-avatar">
              <span class="member-initial">{{ t(`about.members.${k}.name`).slice(0, 1) }}</span>
            </div>
            <div class="member-info">
              <h3 class="member-name">{{ t(`about.members.${k}.name`) }}</h3>
              <p class="member-role">{{ t(`about.members.${k}.role`) }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="certs">
        <header class="certs-head">
          <span class="eyebrow fade-in">{{ t('about.certEyebrow') }}</span>
          <h2 class="certs-title fade-in">{{ t('about.certTitle') }}</h2>
        </header>

        <ul class="certs-list">
          <li v-for="(k, i) in certKeys" :key="k" class="cert rise"
              :style="{ animationDelay: `${0.1 + i * 0.06}s` }">
            <span class="cert-tick" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12l5 5 9-11" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span>{{ t(`about.certs.${k}`) }}</span>
          </li>
        </ul>
      </section>

      <section class="cta-block">
        <RouterLink to="/contact" class="btn-ink">
          {{ t('hero.ctaSecondary') }}
          <span class="arrow">→</span>
        </RouterLink>
      </section>
    </div>
  </main>
</template>

<style scoped>
.about { padding: 11rem 2.5rem 6rem; position: relative; }

.about::before {
  content: ''; position: absolute; top: 10rem; left: 8%;
  width: 340px; height: 340px;
  background: radial-gradient(circle, var(--accent-soft) 0%, transparent 70%);
  opacity: 0.4; filter: blur(80px);
  pointer-events: none; z-index: 0;
}

html[dir='rtl'] .about::before { left: auto; right: 8%; }

.about-inner { max-width: 1440px; margin: 0 auto; position: relative; z-index: 1; }

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

.head-lead {
  font-size: 1.125rem; line-height: 1.6;
  color: var(--ink-soft); max-width: 60ch; margin: 2rem 0 0;
}

.prose {
  display: grid; grid-template-columns: 1fr 1fr; gap: 5rem;
  margin-bottom: 6rem;
}

.prose-block { display: flex; flex-direction: column; gap: 1rem; }

.prose-no {
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.2em; color: var(--accent);
}

.prose-title {
  font-family: 'Manrope', sans-serif;
  font-size: 1.5rem; font-weight: 600;
  letter-spacing: -0.015em; color: var(--ink); margin: 0;
}

html[lang='fa'] .prose-title {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.prose-body {
  font-size: 1rem; line-height: 1.7;
  color: var(--ink-soft); margin: 0;
}

.stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 4px; overflow: hidden;
  margin-bottom: 6rem;
}

.stat {
  background: var(--paper); padding: 2rem 1.5rem;
  display: flex; flex-direction: column; gap: 0.5rem;
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

.team { margin-bottom: 6rem; }

.team-head {
  display: flex; flex-direction: column; gap: 1rem; margin-bottom: 3rem;
}

.team-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.625rem, 3vw, 2.25rem);
  line-height: 1.15; font-weight: 600;
  letter-spacing: -0.02em; color: var(--ink);
  margin: 0; max-width: 24ch;
}

html[lang='fa'] .team-title {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.team-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;
}

.member { display: flex; flex-direction: column; gap: 1rem; }

.member-avatar {
  aspect-ratio: 1 / 1;
  background: var(--cream-deep);
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
  transition: background 0.5s ease;
}

.member-avatar::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 3px; background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

html[dir='rtl'] .member-avatar::after { transform-origin: right; }

.member:hover .member-avatar { background: var(--cream); }
.member:hover .member-avatar::after { transform: scaleX(1); }

.member-initial {
  font-family: 'Manrope', sans-serif;
  font-size: 3rem; font-weight: 500;
  color: var(--ink); opacity: 0.25;
}

html[lang='fa'] .member-initial {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.member-info { display: flex; flex-direction: column; gap: 0.25rem; }

.member-name {
  font-family: 'Manrope', sans-serif;
  font-size: 1.0625rem; font-weight: 600;
  color: var(--ink); margin: 0; letter-spacing: -0.005em;
}

html[lang='fa'] .member-name {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.member-role {
  font-family: 'Manrope', sans-serif;
  font-size: 0.8125rem; letter-spacing: 0.05em;
  color: var(--muted); margin: 0;
}

html[lang='fa'] .member-role {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0; font-size: 0.875rem;
}

.certs { margin-bottom: 5rem; }

.certs-head {
  display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;
}

.certs-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  line-height: 1.2; font-weight: 600;
  letter-spacing: -0.02em; color: var(--ink);
  margin: 0; max-width: 28ch;
}

html[lang='fa'] .certs-title {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.certs-list {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 2rem;
}

.cert {
  display: flex; align-items: center; gap: 0.875rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.9375rem; color: var(--ink);
}

.cert-tick {
  display: inline-flex; align-items: center; justify-content: center;
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--accent); color: var(--paper);
  flex-shrink: 0;
}

.cta-block {
  display: flex; justify-content: center;
  padding: 4rem 0 0;
  border-top: 1px solid var(--line);
}

@media (max-width: 1024px) {
  .about { padding: 9rem 1.75rem 4rem; }
  .head { grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 4rem; }
  .prose { grid-template-columns: 1fr; gap: 3rem; margin-bottom: 4rem; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .team-grid { grid-template-columns: repeat(2, 1fr); }
  .certs-list { grid-template-columns: 1fr; }
}

@media (max-width: 720px) {
  .about { padding: 7.5rem 1.25rem 3rem; }
  .stats { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr 1fr; }
}
</style>
