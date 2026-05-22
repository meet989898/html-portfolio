const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const baseUrl = process.env.PORTFOLIO_BASE_URL || "http://localhost:4173";
const manifestPath = path.join(__dirname, "..", "data", "projects.json");
const manifestProjects = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const filtersToVerify = ["all", "ml", "retrieval", "backend", "data"];
const viewports = [
  { width: 1440, height: 1000, name: "desktop" },
  { width: 390, height: 844, name: "mobile" }
];
const ignoredErrorSnippets = ["net::ERR_NETWORK_ACCESS_DENIED"];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function getExpectedCount(filter) {
  if (filter === "all") return manifestProjects.length;
  return manifestProjects.filter((project) => project.portfolioTags.includes(filter)).length;
}

function isIgnorableError(message) {
  return ignoredErrorSnippets.some((snippet) => message.includes(snippet));
}

async function verifyFilter(page, filter) {
  const button = page.locator(`.filter[data-filter="${filter}"]`);
  await button.click();

  const expectedCount = getExpectedCount(filter);
  await page.waitForFunction(
    ({ expected, activeFilter }) => {
      const activeButton = document.querySelector(`.filter[data-filter="${activeFilter}"]`);
      const visibleCards = Array.from(document.querySelectorAll(".project-card")).filter(
        (card) => !card.classList.contains("hidden")
      );
      return activeButton?.classList.contains("active") && visibleCards.length === expected;
    },
    { expected: expectedCount, activeFilter: filter }
  );

  const actualVisible = await page.locator(".project-card:not(.hidden)").count();
  assert(actualVisible === expectedCount, `Expected ${expectedCount} visible cards for "${filter}", found ${actualVisible}.`);

  const statusText = await page.locator("#project-status").innerText();
  const expectedStatus =
    filter === "all"
      ? `Showing all ${expectedCount} projects.`
      : `Showing ${expectedCount} ${filter} project${expectedCount === 1 ? "" : "s"}.`;
  assert(statusText.trim() === expectedStatus, `Unexpected status for "${filter}": ${statusText}`);
}

(async () => {
  const launchOptions = { headless: true };
  if (fs.existsSync(executablePath)) {
    launchOptions.executablePath = executablePath;
  }

  const results = [];

  for (const viewport of viewports) {
    const browser = await chromium.launch(launchOptions);
    const page = await browser.newPage({ viewport });
    const errors = [];

    page.on("console", (message) => {
      if (message.type() === "error" && !isIgnorableError(message.text())) errors.push(message.text());
    });
    page.on("pageerror", (error) => {
      if (!isIgnorableError(error.message)) errors.push(error.message);
    });

    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.waitForSelector(".project-card");

    const cardCount = await page.locator(".project-card").count();
    assert(cardCount === manifestProjects.length, `Expected ${manifestProjects.length} cards, found ${cardCount}.`);

    for (const filter of filtersToVerify) {
      await verifyFilter(page, filter);
    }

    await page.screenshot({ path: `portfolio-${viewport.name}.png`, fullPage: false });

    assert(errors.length === 0, `Browser errors detected for ${viewport.name}: ${errors.join(" | ")}`);

    results.push({
      viewport: viewport.name,
      title: await page.title(),
      cards: cardCount,
      verifiedFilters: filtersToVerify,
      h1: await page.locator("h1").innerText()
    });

    await browser.close();
  }

  console.log(JSON.stringify(results, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
