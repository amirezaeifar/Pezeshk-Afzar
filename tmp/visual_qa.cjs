const { chromium } = require('C:/Users/acer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const fs = require('fs')
const path = require('path')

const output = path.resolve('tmp/visual-qa')
fs.mkdirSync(output, { recursive: true })

async function revealPage(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let position = 0; position < height; position += 650) {
    await page.evaluate((top) => window.scrollTo(0, top), position)
    await page.waitForTimeout(70)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(250)
}

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 })
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`)
  })
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`))

  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' })
  await revealPage(page)
  await page.screenshot({ path: path.join(output, 'home-desktop.png'), fullPage: true })

  const home = await page.evaluate(() => ({
    tickerIcons: document.querySelectorAll('.ticker-item svg').length,
    testimonialPhotos: [...document.querySelectorAll('.voice-shot')].map((element) => {
      const image = element.querySelector('img')
      const rect = element.getBoundingClientRect()
      return {
        src: image?.getAttribute('src'),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        ratio: Number((rect.width / rect.height).toFixed(3)),
      }
    }),
    remoteImages: [...document.images]
      .map((image) => image.getAttribute('src'))
      .filter((source) => source && /^https?:\/\//i.test(source)),
  }))

  await page.goto('http://127.0.0.1:5174/products/todays-mom', { waitUntil: 'networkidle' })
  await revealPage(page)
  await page.screenshot({ path: path.join(output, 'product-detail-en.png'), fullPage: true })
  const detail = await page.evaluate(() => ({
    sections: [...document.querySelectorAll('main.detail section')].map((section) => section.className),
    featureCards: document.querySelectorAll('.feature-card').length,
    workflowSteps: document.querySelectorAll('.workflow-step').length,
    resourceCards: document.querySelectorAll('.resource-card').length,
    comparisonRows: document.querySelectorAll('.comparison-row').length,
    hiddenReveals: [...document.querySelectorAll('.detail-reveal')].filter(
      (element) => getComputedStyle(element).opacity === '0'
    ).length,
    remoteImages: [...document.images]
      .map((image) => image.getAttribute('src'))
      .filter((source) => source && /^https?:\/\//i.test(source)),
  }))

  await page.locator('.lang-toggle').click()
  await page.waitForTimeout(250)
  await revealPage(page)
  await page.screenshot({ path: path.join(output, 'product-detail-fa.png'), fullPage: true })
  const rtl = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }))

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle' })
  await revealPage(page)
  await page.screenshot({ path: path.join(output, 'home-mobile.png'), fullPage: true })
  const mobile = await page.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    testimonialPhotos: [...document.querySelectorAll('.voice-shot')].map((element) => {
      const rect = element.getBoundingClientRect()
      return { width: Math.round(rect.width), height: Math.round(rect.height) }
    }),
  }))

  console.log(JSON.stringify({ home, detail, rtl, mobile, errors }, null, 2))
  await browser.close()
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
