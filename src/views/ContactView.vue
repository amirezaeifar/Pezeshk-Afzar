<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({ name: '', email: '', phone: '', subject: '', message: '' })
const touched = reactive({ name: false, email: false, subject: false, message: false })

const submitting = ref(false)
const submitted = ref(false)
const showSummary = ref(false)

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => ({
  name: form.name.trim() ? null : 'required',
  email: !form.email.trim() ? 'required' : !emailRe.test(form.email.trim()) ? 'email' : null,
  subject: form.subject.trim() ? null : 'required',
  message: !form.message.trim() ? 'required' : form.message.trim().length < 20 ? 'minMessage' : null,
}))

const isValid = computed(() =>
  !errors.value.name && !errors.value.email && !errors.value.subject && !errors.value.message
)

const errMsg = (field) => {
  const code = errors.value[field]
  if (!code) return null
  if (!touched[field] && !showSummary.value) return null
  return t(`contact.errors.${code}`)
}

const onBlur = (field) => { touched[field] = true }

const handleSubmit = async () => {
  touched.name = true
  touched.email = true
  touched.subject = true
  touched.message = true

  if (!isValid.value) { showSummary.value = true; return }

  showSummary.value = false
  submitting.value = true
  await new Promise((r) => setTimeout(r, 900))
  submitting.value = false
  submitted.value = true
}

const reset = () => {
  Object.assign(form, { name: '', email: '', phone: '', subject: '', message: '' })
  Object.assign(touched, { name: false, email: false, subject: false, message: false })
  submitted.value = false
  showSummary.value = false
}
</script>

<template>
  <main class="view contact">
    <div class="contact-inner">
      <header class="head">
        <div class="head-aside">
          <span class="eyebrow rise stagger-1">{{ t('contact.eyebrow') }}</span>
        </div>
        <div class="head-main">
          <h1 class="head-title">
            <span class="head-line rise stagger-2">{{ t('contact.titleA') }}</span>
            <span class="head-line rise stagger-3"><em>{{ t('contact.titleB') }}</em></span>
          </h1>
        </div>
      </header>

      <div class="layout">
        <aside class="meta rise stagger-4">
          <p class="intro">{{ t('contact.intro') }}</p>
          <dl class="meta-list">
            <div class="meta-item">
              <dt>{{ t('contact.meta.studio') }}</dt>
              <dd>{{ t('contact.meta.studioVal') }}</dd>
            </div>
            <div class="meta-item">
              <dt>{{ t('contact.meta.hours') }}</dt>
              <dd>{{ t('contact.meta.hoursVal') }}</dd>
            </div>
            <div class="meta-item">
              <dt>{{ t('contact.meta.email') }}</dt>
              <dd>
                <a :href="`mailto:${t('contact.meta.emailVal')}`" class="link-underline">
                  {{ t('contact.meta.emailVal') }}
                </a>
              </dd>
            </div>
          </dl>
        </aside>

        <section class="panel rise stagger-5">
          <transition name="swap" mode="out-in">
            <div v-if="submitted" key="success" class="success">
              <span class="success-mark" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12l3 3 5-6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <h2 class="success-title">{{ t('contact.success.title') }}</h2>
              <p class="success-body">{{ t('contact.success.body') }}</p>
              <button type="button" class="btn-ink" @click="reset">
                {{ t('contact.success.again') }}
                <span class="arrow">→</span>
              </button>
            </div>

            <form v-else key="form" class="form" novalidate @submit.prevent="handleSubmit">
              <div class="form-section-label">
                <span class="hairline"></span>
                <span>{{ t('contact.form.section') }}</span>
              </div>

              <transition name="fade">
                <div v-if="showSummary && !isValid" class="alert">
                  {{ t('contact.errors.summary') }}
                </div>
              </transition>

              <div class="field" :class="{ 'has-error': errMsg('name') }">
                <label for="name">
                  <span class="lbl-num">01</span>
                  <span class="lbl-text">{{ t('contact.form.name') }}</span>
                  <span class="req" aria-hidden="true">*</span>
                </label>
                <input id="name" v-model="form.name" type="text"
                       :placeholder="t('contact.form.namePh')"
                       autocomplete="name" @blur="onBlur('name')" />
                <span v-if="errMsg('name')" class="err">{{ errMsg('name') }}</span>
              </div>

              <div class="field" :class="{ 'has-error': errMsg('email') }">
                <label for="email">
                  <span class="lbl-num">02</span>
                  <span class="lbl-text">{{ t('contact.form.email') }}</span>
                  <span class="req" aria-hidden="true">*</span>
                </label>
                <input id="email" v-model="form.email" type="email" dir="ltr"
                       :placeholder="t('contact.form.emailPh')"
                       autocomplete="email" @blur="onBlur('email')" />
                <span v-if="errMsg('email')" class="err">{{ errMsg('email') }}</span>
              </div>

              <div class="field">
                <label for="phone">
                  <span class="lbl-num">03</span>
                  <span class="lbl-text">{{ t('contact.form.phone') }}</span>
                </label>
                <input id="phone" v-model="form.phone" type="tel" dir="ltr"
                       :placeholder="t('contact.form.phonePh')" autocomplete="tel" />
              </div>

              <div class="field" :class="{ 'has-error': errMsg('subject') }">
                <label for="subject">
                  <span class="lbl-num">04</span>
                  <span class="lbl-text">{{ t('contact.form.subject') }}</span>
                  <span class="req" aria-hidden="true">*</span>
                </label>
                <input id="subject" v-model="form.subject" type="text"
                       :placeholder="t('contact.form.subjectPh')" @blur="onBlur('subject')" />
                <span v-if="errMsg('subject')" class="err">{{ errMsg('subject') }}</span>
              </div>

              <div class="field" :class="{ 'has-error': errMsg('message') }">
                <label for="message">
                  <span class="lbl-num">05</span>
                  <span class="lbl-text">{{ t('contact.form.message') }}</span>
                  <span class="req" aria-hidden="true">*</span>
                </label>
                <textarea id="message" v-model="form.message" rows="5"
                          :placeholder="t('contact.form.messagePh')" @blur="onBlur('message')"></textarea>
                <span v-if="errMsg('message')" class="err">{{ errMsg('message') }}</span>
              </div>

              <div class="actions">
                <button type="submit" class="btn-ink" :disabled="submitting">
                  <span>{{ submitting ? t('contact.form.sending') : t('contact.form.submit') }}</span>
                  <span class="arrow">→</span>
                </button>
              </div>
            </form>
          </transition>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact { padding: 11rem 2.5rem 6rem; position: relative; }

.contact::before {
  content: ''; position: absolute; top: 10rem; left: 8%;
  width: 320px; height: 320px;
  background: radial-gradient(circle, var(--accent-soft) 0%, transparent 70%);
  opacity: 0.45; filter: blur(70px);
  pointer-events: none; z-index: 0;
}

html[dir='rtl'] .contact::before { left: auto; right: 8%; }

.contact-inner { max-width: 1440px; margin: 0 auto; position: relative; z-index: 1; }

.head {
  display: grid; grid-template-columns: 1fr 6fr; gap: 2rem 3rem;
  margin-bottom: 5rem; padding-bottom: 3rem;
  border-bottom: 1px solid var(--line);
}

.head-aside { padding-top: 1rem; }

.head-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(2.75rem, 7.5vw, 7rem);
  line-height: 0.98; font-weight: 600;
  letter-spacing: -0.035em; margin: 0; color: var(--ink);
}

html[lang='fa'] .head-title {
  font-family: 'FarsiFont', sans-serif;
  font-size: clamp(2.25rem, 6vw, 5rem);
  line-height: 1.2; font-weight: 700;
}

.head-line { display: block; }
.head-line em { font-style: normal; color: var(--accent); font-weight: 500; }
html[lang='fa'] .head-line em { font-weight: 600; }

.layout {
  display: grid; grid-template-columns: 1fr 1.5fr;
  gap: 5rem; align-items: start;
}

.meta {
  display: flex; flex-direction: column; gap: 2.5rem; padding-top: 0.25rem;
}

.intro {
  font-size: 1.0625rem; line-height: 1.6;
  color: var(--ink-soft); margin: 0; max-width: 38ch;
}

.meta-list { display: flex; flex-direction: column; gap: 1.5rem; margin: 0; }

.meta-item {
  display: flex; flex-direction: column; gap: 0.375rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--line);
}

.meta-item dt {
  font-family: 'Manrope', sans-serif;
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--muted);
}

html[lang='fa'] .meta-item dt {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0.03em; text-transform: none; font-size: 0.8125rem;
}

.meta-item dd {
  font-size: 1rem; color: var(--ink); margin: 0; font-weight: 500;
}

.panel {
  background: var(--paper);
  border: 1px solid var(--line); border-radius: 4px;
  padding: 3rem;
  position: relative;
}

.panel::before, .panel::after {
  content: ''; position: absolute;
  width: 12px; height: 12px;
  background: var(--accent); border-radius: 50%;
}
.panel::before { top: -6px; left: -6px; }
.panel::after { bottom: -6px; right: -6px; }

html[dir='rtl'] .panel::before { left: auto; right: -6px; }
html[dir='rtl'] .panel::after { right: auto; left: -6px; }

.form { display: flex; flex-direction: column; gap: 1.5rem; }

.form-section-label {
  display: flex; align-items: center; gap: 1rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 0.5rem;
}

html[lang='fa'] .form-section-label {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0.03em; text-transform: none; font-size: 0.8125rem;
}

.form-section-label .hairline {
  flex: 0 0 32px; background: var(--accent); height: 1px;
}

.alert {
  padding: 0.875rem 1rem;
  border: 1px solid var(--accent);
  background: rgba(15, 118, 110, 0.06);
  color: var(--accent);
  font-size: 0.875rem; border-radius: 2px;
}

.field {
  display: flex; flex-direction: column; gap: 0.5rem; position: relative;
}

.field label {
  display: inline-flex; align-items: baseline; gap: 0.625rem;
  font-size: 0.875rem; color: var(--ink); font-weight: 500;
}

.lbl-num {
  font-family: 'Manrope', sans-serif;
  font-size: 0.6875rem; letter-spacing: 0.18em;
  color: var(--muted); font-weight: 600;
}

html[lang='fa'] .lbl-num {
  font-family: 'FarsiFont', sans-serif;
  letter-spacing: 0; font-size: 0.75rem;
}

.req { color: var(--accent); font-weight: 600; }

.field input, .field textarea {
  width: 100%; background: transparent;
  border: none; border-bottom: 1px solid var(--line);
  padding: 0.625rem 0;
  font-family: inherit; font-size: 1rem;
  color: var(--ink); outline: none;
  resize: vertical; border-radius: 0;
  -webkit-appearance: none; appearance: none;
  transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease;
}

.field textarea { min-height: 120px; }

.field input::placeholder, .field textarea::placeholder {
  color: var(--muted); opacity: 0.6;
}

.field input:focus, .field textarea:focus {
  border-bottom-color: var(--ink); padding-bottom: 0.875rem;
}

.field.has-error input, .field.has-error textarea {
  border-bottom-color: var(--accent);
}

.err {
  font-size: 0.8125rem; color: var(--accent);
  animation: fadeUp 0.3s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.actions { margin-top: 1rem; display: flex; justify-content: flex-end; }
html[dir='rtl'] .actions { justify-content: flex-start; }

.btn-ink:disabled { opacity: 0.65; cursor: not-allowed; }

.success {
  display: flex; flex-direction: column; align-items: flex-start;
  gap: 1.25rem; padding: 1.5rem 0;
}

.success-mark {
  display: inline-flex; color: var(--accent);
  animation: popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes popIn {
  0% { opacity: 0; transform: scale(0.6); }
  100% { opacity: 1; transform: scale(1); }
}

.success-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.625rem, 3vw, 2.125rem);
  line-height: 1.2; font-weight: 600;
  color: var(--ink); margin: 0;
  letter-spacing: -0.02em; max-width: 24ch;
}

html[lang='fa'] .success-title {
  font-family: 'FarsiFont', sans-serif; font-weight: 700;
}

.success-body {
  font-size: 1rem; color: var(--ink-soft);
  line-height: 1.6; margin: 0; max-width: 40ch;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-4px); }

.swap-enter-active, .swap-leave-active { transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
.swap-enter-from { opacity: 0; transform: translateY(12px); }
.swap-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 1024px) {
  .contact { padding: 9rem 1.75rem 4rem; }
  .layout { grid-template-columns: 1fr; gap: 3rem; }
  .head { grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 4rem; }
  .panel { padding: 2rem; }
}

@media (max-width: 720px) {
  .contact { padding: 7.5rem 1.25rem 3rem; }
  .panel { padding: 1.5rem; }
  .head { margin-bottom: 3rem; }
}
</style>
