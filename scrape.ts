import puppeteer from 'puppeteer'
import * as fs from 'fs/promises'

const POESESSID = process.argv[2]
if (!POESESSID) {
  console.error('POESESSID is not provided, please run the script with it: yarn scrape <POESESSID>')
}
const URL =
  process.argv[3] ?? `https://www.pathofexile.com/trade/search/Hardcore%20Sanctum/r80dVGCQ`

const selector = '.explicitMod > [data-field]'

const NUMBER_REGEX = /\d+/

const isDefined = (t: string | null | undefined): t is string => typeof t === 'string'

const scrape = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  })
  const page = await browser.newPage()

  try {
    await page.setCookie({
      name: 'POESESSID',
      value: POESESSID,
      url: URL,
    })
    await page.goto(URL)

    await page.waitForSelector(selector, {
      timeout: 10000,
    })
    const bodyHandle = await page.$('body')
    const textNodes = await page.evaluate((el) => {
      return Array.from(el?.querySelectorAll('.explicitMod [data-field]') ?? []).map(
        (b) => b.textContent,
      )
    }, bodyHandle)

    const values = textNodes.map((text) => text?.match(NUMBER_REGEX)?.[0]).filter(isDefined)
    console.log(values)

    await fs.writeFile('./data.txt', values.join('\n'))
  } catch (error) {
    await page.screenshot({ path: './debug_screenshot.png' })
    console.error(error)
  }
  await page.screenshot({ path: './debug_screenshot.png' })

  await browser.close()
}

scrape()
