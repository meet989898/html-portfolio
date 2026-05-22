import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const baseUrl = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:3000";
const manifestPath = path.join(__dirname, "..", "data", "projects.json");
const projects = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const viewports = [
  { width: 1440, height: 1000, name: "desktop" },
  { width: 390, height: 844, name: "mobile" },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function assertNoMojibake(page, routeLabel) {
  const bodyText = await page.locator("body").innerText();
  const invalidFragments = ["Â", "Ã", "�"];
  const detected = invalidFragments.filter((fragment) => bodyText.includes(fragment));
  assert(detected.length === 0, `Unexpected mojibake detected on ${routeLabel}: ${detected.join(", ")}`);
  return bodyText;
}

async function verifyHome(page) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForSelector('[data-testid="hero-visual"]');

  const h1 = await page.locator("h1").first().innerText();
  assert(h1.trim() === "Meet Gandhi", `Unexpected homepage H1: ${h1}`);

  const bodyText = await assertNoMojibake(page, "home");
  assert(bodyText.includes("Software engineer building reliable products"), "Homepage broad positioning copy is missing.");
  assert(!bodyText.includes("production-minded AI projects"), "Old narrow hero copy is still visible.");
  assert(!bodyText.includes("new approved ML project every three days"), "Internal project cadence text is public.");
  assert(!bodyText.includes("Live engineering signals"), "Old portfolio-process section is still public.");

  const cards = await page.locator('[data-testid="project-card"]').count();
  assert(cards === projects.length, `Expected ${projects.length} project cards, found ${cards}.`);

  const conceptLabels = await page.getByText("Concept visual").count();
  assert(conceptLabels >= projects.length, "Concept visuals are not clearly labeled.");

  await page.locator('[data-testid="contact-form"]').scrollIntoViewIfNeeded();
  await page.locator('[data-testid="contact-form"] button[type="submit"]').click();
  const validationMessage = await page.locator("#name").evaluate((input) => input.validationMessage);
  assert(validationMessage.length > 0, "Contact form required-field validation did not run.");
}

async function verifyRoutes(page) {
  for (const project of projects) {
    await page.goto(`${baseUrl}/projects/${project.slug}`, { waitUntil: "networkidle" });
    await page.waitForSelector("h1");
    await assertNoMojibake(page, `/projects/${project.slug}`);
    const title = await page.locator("h1").first().innerText();
    assert(title.trim() === project.title, `Unexpected project title for ${project.slug}: ${title}`);
    await page.getByText(project.statusLabel).first().waitFor();
  }

  await page.goto(`${baseUrl}/resume`, { waitUntil: "networkidle" });
  await page.waitForSelector("h1");
  await assertNoMojibake(page, "/resume");
  const resumeTitle = await page.locator("h1").first().innerText();
  assert(resumeTitle.trim() === "Meet Gandhi", `Unexpected resume title: ${resumeTitle}`);
}

const results = [];

for (const viewport of viewports) {
  const launchOptions = { headless: true };
  if (fs.existsSync(executablePath)) {
    launchOptions.executablePath = executablePath;
  }

  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage({ viewport });
  const errors = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await verifyHome(page);
  await verifyRoutes(page);
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.screenshot({ path: `portfolio-${viewport.name}.png`, fullPage: false });

  assert(errors.length === 0, `Browser errors detected for ${viewport.name}: ${errors.join(" | ")}`);

  results.push({
    viewport: viewport.name,
    title: await page.title(),
    cards: await page.locator('[data-testid="project-card"]').count(),
    routes: projects.map((project) => `/projects/${project.slug}`),
  });

  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
