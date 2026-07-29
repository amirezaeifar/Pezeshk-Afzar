const { chromium } = require('C:/Users/acer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const base = 'http://127.0.0.1:5175'

const productIds = [
  'todays-mom',
  'skinapp',
  'ibd-care',
  'agingdrug',
  'chemotherapy-care',
  'gib',
  'desktop-autoclaves',
  'hospital-autoclaves',
  'blood-glucose-meters',
  'blood-glucose-test-strips',
]

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await context.newPage()
  const runtimeErrors = []
  const failedRequests = []

  page.on('pageerror', (error) => runtimeErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text())
  })
  page.on('requestfailed', (request) => failedRequests.push(`${request.url()} — ${request.failure()?.errorText}`))

  const results = []
  for (const id of productIds) {
    const response = await page.goto(`${base}/products/${id}`, { waitUntil: 'networkidle' })
    const audit = await page.evaluate(() => ({
      title: document.querySelector('h1')?.textContent?.trim(),
      features: document.querySelectorAll('.feature-card').length,
      workflow: document.querySelectorAll('.workflow-step').length,
      comparison: document.querySelectorAll('.comparison-row').length,
      resources: document.querySelectorAll('.resource-card').length,
      faqs: document.querySelectorAll('.faq-item').length,
      brokenImages: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.getAttribute('src')),
      remoteImages: [...document.images]
        .map((image) => image.getAttribute('src'))
        .filter((source) => source && /^https?:\/\//i.test(source)),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }))
    results.push({ id, status: response?.status(), ...audit })
  }

  await page.setViewportSize({ width: 390, height: 844 })
  const mobile = []
  for (const path of ['/', '/products', '/products/blood-glucose-meters']) {
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
    mobile.push({
      path,
      ...(await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        brokenImages: [...document.images]
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.getAttribute('src')),
      }))),
    })
  }

  console.log(JSON.stringify({ results, mobile, runtimeErrors, failedRequests }, null, 2))
  await browser.close()
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
