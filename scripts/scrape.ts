import { puppeteer } from "../deps.ts";

const URL = Deno.args[1] ??
  `https://www.pathofexile.com/trade/search/Hardcore%20Sanctum/r80dVGCQ`;

const SELECTOR = ".explicitMod > [data-field]";

const NUMBER_REGEX = /\d+/;

const scrape = async () => {
  const POESESSID = Deno.args[0];
  if (!POESESSID) {
    console.error(
      "POESESSID is not provided, please provide it as the argument after the script name",
    );
    return;
  }
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();

  try {
    await page.setCookie({
      name: "POESESSID",
      value: POESESSID,
      url: URL,
    });
    await page.goto(URL);

    await page.waitForSelector(SELECTOR, {
      timeout: 10000,
    });
    const bodyHandle = await page.$("body");
    const textNodes = await page.evaluate((el: any) => {
      return Array.from(el?.querySelectorAll(".explicitMod [data-field]") ?? [])
        .map(
          (b: any) => b.textContent,
        );
    }, bodyHandle);

    const values = textNodes.map((text) => text?.match(NUMBER_REGEX)?.[0])
      .filter(isDefined);
    console.log("Extracted the following numbers from explicit mods section:");
    console.log(values.join("\n"));

    await Deno.writeTextFile("./data.txt", values.join("\n"));
  } catch (error) {
    await page.screenshot({ path: "./debug_screenshot.png" });
    console.error(error);
  }

  await browser.close();
};

scrape();

const isDefined = (t: string | null | undefined): t is string =>
  typeof t === "string";
