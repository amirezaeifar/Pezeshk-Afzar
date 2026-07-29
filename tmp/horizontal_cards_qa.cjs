const { chromium } = require(
  'C:/Users/acer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'
)
const fs = require('fs')
const path = require('path')

const base = 'http://127.0.0.1:5176'
const output = path.resolve('tmp/horizontal-cards-qa')
fs.mkdirSync(output, { recursive: true })

async function revealPage(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let top = 0; top < height; top += 700) {
    await page.evaluate((position) => window.scrollTo(0, position), top)
    await page.waitForTimeout(45)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(180)
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const inspectGrid = (selector) => {
      const grid = document.querySelector(selector)
      const cards = [...grid.querySelectorAll('.card')].map((card) => {
        const image = card.querySelector('img')
        const cardRect = card.getBoundingClientRect()
        const mediaRect = card.querySelector('.card-media').getBoundingClientRect()
        return {
          id: new URL(card.href).pathname.split('/').pop(),
          src: new URL(image.currentSrc || image.src).pathname,
          card: {
            width: Math.round(cardRect.width),
            height: Math.round(cardRect.height),
            ratio: Number((cardRect.width / cardRect.height).toFixed(2)),
            top: Math.round(cardRect.top),
            left: Math.round(cardRect.left),
          },
          media: {
            width: Math.round(mediaRect.width),
            height: Math.round(mediaRect.height),
            ratio: Number((mediaRect.width / mediaRect.height).toFixed(2)),
            objectFit: getComputedStyle(image).objectFit,
          },
        }
      })
      const rows = Object.values(
        cards.reduce((grouped, card) => {
          const row = Math.round(card.card.top / 4) * 4
          grouped[row] ||= []
          grouped[row].push(card.id)
          return grouped
        }, {})
      )
      const style = getComputedStyle(grid)
      return {
        cards,
        rows,
        columnGap: style.columnGap,
        rowGap: style.rowGap,
      }
    }

    return {
      software: inspectGrid('.cascade-grid'),
      equipment: inspectGrid('.tech-grid'),
      brokenImages: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.getAttribute('src')),
      remoteImages: [...document.images]
        .map((image) => image.getAttribute('src'))
        .filter((source) => source && /^https?:\/\//i.test(source)),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
}

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
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
  const desktop = await inspectPage(page)
  await page.screenshot({ path: path.join(output, 'home-desktop.png'), fullPage: true })

  await page.goto(`${base}/products`, { waitUntil: 'networkidle' })
  await revealPage(page)
  const products = await page.evaluate(() => {
    const grid = document.querySelector('.product-grid')
    const style = getComputedStyle(grid)
    return {
      cardCount: grid.querySelectorAll('.card').length,
      columnGap: style.columnGap,
      rowGap: style.rowGap,
      brokenImages: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.getAttribute('src')),
      remoteImages: [...document.images]
        .map((image) => image.getAttribute('src'))
        .filter((source) => source && /^https?:\/\//i.test(source)),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
  await page.screenshot({ path: path.join(output, 'products-desktop.png'), fullPage: true })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  await revealPage(page)
  const mobile = await inspectPage(page)
  await page.screenshot({ path: path.join(output, 'home-mobile.png'), fullPage: true })

  const softwareSources = desktop.software.cards.map((card) => card.src)
  const assertions = {
    desktopSoftwareTwoPerRow:
      desktop.software.rows.length === 3 &&
      desktop.software.rows.every((row) => row.length === 2),
    desktopEquipmentTwoPerRow:
      desktop.equipment.rows.length === 2 &&
      desktop.equipment.rows.every((row) => row.length === 2),
    desktopCardsHorizontal:
      [...desktop.software.cards, ...desktop.equipment.cards].every(
        (card) => card.card.ratio >= 1.75 && card.card.height < 300
      ),
    softwareImagesUnique:
      softwareSources.length === 6 && new Set(softwareSources).size === 6,
    softwareImagesLocal: softwareSources.every((source) =>
      source.startsWith('/images/software/')
    ),
    equipmentImagesContained: desktop.equipment.cards.every(
      (card) => card.media.objectFit === 'contain'
    ),
    whatWeMakeGap:
      products.columnGap === '28px' && products.rowGap === '32px',
    mobileSingleColumn:
      [...mobile.software.rows, ...mobile.equipment.rows].every(
        (row) => row.length === 1
      ),
    noBrokenImages:
      desktop.brokenImages.length === 0 &&
      products.brokenImages.length === 0 &&
      mobile.brokenImages.length === 0,
    noRemoteImages:
      desktop.remoteImages.length === 0 &&
      products.remoteImages.length === 0 &&
      mobile.remoteImages.length === 0,
    noOverflow:
      desktop.overflow <= 0 && products.overflow <= 0 && mobile.overflow <= 0,
    noRuntimeErrors: runtimeErrors.length === 0 && failedRequests.length === 0,
  }

  const report = {
    assertions,
    desktop,
    products,
    mobile,
    runtimeErrors,
    failedRequests,
  }
  const serialized = JSON.stringify(report, null, 2)
  fs.writeFileSync(path.join(output, 'audit.json'), serialized)
  console.log(serialized)
  await browser.close()

  if (Object.values(assertions).some((passed) => !passed)) process.exit(1)
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
