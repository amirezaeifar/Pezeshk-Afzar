import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './style.css'

import en from './locales/en.js'
import fa from './locales/fa.js'

export const SUPPORTED_LOCALES = ['en', 'fa']
export const RTL_LOCALES = ['fa']

const messages = { en, fa }

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

document.documentElement.setAttribute('dir', 'ltr')
document.documentElement.setAttribute('lang', 'en')

createApp(App).use(router).use(i18n).mount('#app')
