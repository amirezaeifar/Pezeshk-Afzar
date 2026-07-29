import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { getProductById } from '../data/products.js'
import { localize } from '../utils/localized.js'

const SOCIAL_IMAGE_PATH = '/images/og/pezeshk-afzar-social.jpg'
const ROBOTS_DIRECTIVE = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

function compactDescription(value, maxLength = 160) {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim()
  if (text.length <= maxLength) return text

  const shortened = text.slice(0, maxLength - 1)
  const lastSpace = shortened.lastIndexOf(' ')
  return `${shortened.slice(0, Math.max(lastSpace, 100))}…`
}

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function getSiteOrigin() {
  const configuredOrigin = String(import.meta.env.VITE_SITE_URL ?? '').trim()
  const origin = configuredOrigin || window.location.origin
  return origin.endsWith('/') ? origin : `${origin}/`
}

export function useMetadata() {
  const route = useRoute()
  const { t, locale } = useI18n()

  const updateMetadata = () => {
    const language = locale.value === 'fa' ? 'fa' : 'en'
    const seoKey = route.meta.seoKey ?? 'home'
    const product = seoKey === 'product' ? getProductById(route.params.id) : null

    const title = product
      ? t('meta.productTitle', { product: localize(product.name, language) })
      : t(`meta.pages.${seoKey}.title`)

    const description = compactDescription(
      product
        ? `${localize(product.tagline, language)} ${localize(product.description, language)}`
        : t(`meta.pages.${seoKey}.description`),
    )

    const siteOrigin = getSiteOrigin()
    const canonicalUrl = new URL(route.path, siteOrigin).href
    const socialImageUrl = new URL(SOCIAL_IMAGE_PATH, siteOrigin).href
    const openGraphLocale = language === 'fa' ? 'fa_IR' : 'en_US'
    const alternateLocale = language === 'fa' ? 'en_US' : 'fa_IR'
    const direction = language === 'fa' ? 'rtl' : 'ltr'

    document.title = title
    document.documentElement.setAttribute('lang', language)
    document.documentElement.setAttribute('dir', direction)

    upsertLink('canonical', canonicalUrl)

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', ROBOTS_DIRECTIVE)
    upsertMeta('name', 'googlebot', ROBOTS_DIRECTIVE)
    upsertMeta('name', 'application-name', t('brand'))
    upsertMeta('name', 'apple-mobile-web-app-title', t('brand'))

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', t('brand'))
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', socialImageUrl)
    upsertMeta('property', 'og:image:secure_url', socialImageUrl)
    upsertMeta('property', 'og:image:alt', t('meta.socialImageAlt'))
    upsertMeta('property', 'og:locale', openGraphLocale)
    upsertMeta('property', 'og:locale:alternate', alternateLocale)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', socialImageUrl)
    upsertMeta('name', 'twitter:image:alt', t('meta.socialImageAlt'))
  }

  watch(
    [() => route.fullPath, locale],
    updateMetadata,
    { immediate: true },
  )
}
