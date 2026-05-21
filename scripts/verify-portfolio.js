const { chromium } = require("playwright");

const executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const viewports = [
  { width: 1440, height: 1000, name: "desktop" },
  { width: 390, height: 844, name: "mobile" }
];

(async () => {
  const results = [];

  for (const viewport of viewports) {
    const browser = await chromium.launch({ headless: true, executablePath });
    const page = await browser.newPage({ viewport });
    const errors = [];

    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
    await page.screenshot({ path: `portfolio-${viewport.name}.png`, fullPage: false });

    results.push({
      viewport: viewport.name,
      title: await page.title(),
      cards: await page.locator(".project-card").count(),
      visibleCards: await page.locator(".project-card:not(.hidden)").count(),
      h1: await page.locator("h1").innerText(),
      errors
    });

    await browser.close();
  }

  console.log(JSON.stringify(results, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
