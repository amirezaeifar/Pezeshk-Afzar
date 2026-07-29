const { chromium } = require('C:/Users/acer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const fs = require('fs')
const path = require('path')

const base = 'http://127.0.0.1:5175'
const output = path.resolve('tmp/refinement-qa')
fs.mkdirSync(output, { recursive: true })

async function revealPage(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let position = 0; position < height; position += 700) {
    await page.evaluate((top) => window.scrollTo(0, top), position)
    await page.waitForTimeout(55)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(200)
}

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } })
  const runtimeErrors = []
  const failedRequests = []

  page.on('pageerror', (error) => runtimeErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text())
  })
  page.on('requestfailed', (request) => {
    failedRequests.push(`${request.url()} — ${request.failure()?.errorText}`)
  })

  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  await revealPage(page)
  const home = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.cascade-grid .card, .tech-grid .card')].map((card) => {
      const image = card.querySelector('img')
      const media = card.querySelector('.card-media')
      const cardRect = card.getBoundingClientRect()
      const mediaRect = media.getBoundingClientRect()
      return {
        id: new URL(card.href).pathname.split('/').pop(),
        src: new URL(image.currentSrc || image.src).pathname,
        card: [Math.round(cardRect.width), Math.round(cardRect.height)],
        media: [Math.round(mediaRect.width), Math.round(mediaRect.height)],
      }
    })
    return {
      cards,
      testimonialSources: [...document.querySelectorAll('.voice-shot img')].map(
        (image) => new URL(image.currentSrc || image.src).pathname
      ),
      broken: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.getAttribute('src')),
      remote: [...document.images]
        .map((image) => image.getAttribute('src'))
        .filter((source) => source && /^https?:\/\//i.test(source)),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
  await page.screenshot({ path: path.join(output, 'home-desktop.png'), fullPage: true })

  await page.goto(`${base}/products`, { waitUntil: 'networkidle' })
  await revealPage(page)
  const products = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.product-grid .card')].map((card) => {
      const image = card.querySelector('img')
      const media = card.querySelector('.card-media')
      const cardRect = card.getBoundingClientRect()
      const mediaRect = media.getBoundingClientRect()
      return {
        id: new URL(card.href).pathname.split('/').pop(),
        src: new URL(image.currentSrc || image.src).pathname,
        card: [Math.round(cardRect.width), Math.round(cardRect.height)],
        media: [Math.round(mediaRect.width), Math.round(mediaRect.height)],
      }
    })
    return {
      cards,
      broken: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.getAttribute('src')),
      remote: [...document.images]
        .map((image) => image.getAttribute('src'))
        .filter((source) => source && /^https?:\/\//i.test(source)),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
  await page.screenshot({ path: path.join(output, 'products-desktop.png'), fullPage: true })

  const productMap = new Map(products.cards.map((card) => [card.id, card.src]))
  const mismatches = home.cards
    .filter((card) => productMap.get(card.id) !== card.src)
    .map((card) => ({
      id: card.id,
      home: card.src,
      products: productMap.get(card.id),
    }))

  const softwareHome = home.cards.filter((card) => card.src.includes('/images/software/'))
  const uniqueSoftware = new Set(softwareHome.map((card) => card.src))

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  await revealPage(page)
  const mobile = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.cascade-grid .card, .tech-grid .card')].map((card) => {
      const image = card.querySelector('img')
      const media = card.querySelector('.card-media')
      const cardRect = card.getBoundingClientRect()
      const mediaRect = media.getBoundingClientRect()
      return {
        id: new URL(card.href).pathname.split('/').pop(),
        src: new URL(image.currentSrc || image.src).pathname,
        card: [Math.round(cardRect.width), Math.round(cardRect.height)],
        media: [Math.round(mediaRect.width), Math.round(mediaRect.height)],
      }
    })
    return {
      cards,
      testimonialSources: [...document.querySelectorAll('.voice-shot img')].map(
        (image) => new URL(image.currentSrc || image.src).pathname
      ),
      broken: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.getAttribute('src')),
      remote: [...document.images]
        .map((image) => image.getAttribute('src'))
        .filter((source) => source && /^https?:\/\//i.test(source)),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
  await page.screenshot({ path: path.join(output, 'home-mobile.png'), fullPage: true })

  const report = {
    home,
    products,
    mobile,
    consistency: {
      compared: home.cards.length,
      mismatches,
      softwarePrimaryCount: softwareHome.length,
      uniqueSoftwarePrimaryCount: uniqueSoftware.size,
    },
    runtimeErrors,
    failedRequests,
  }
  const serialized = JSON.stringify(report, null, 2)
  fs.writeFileSync(path.join(output, 'audit.json'), serialized)
  console.log(serialized)

  await browser.close()
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
