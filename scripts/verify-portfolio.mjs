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
const siteUrl = "https://www.meetgandhi.com";
const defaultSocialImage = `${siteUrl}/visuals/portfolio-share.svg`;
const viewports = [
  { width: 1440, height: 1000, name: "desktop" },
  { width: 390, height: 844, name: "mobile" },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function assertExternalBlankLinksSafe(page, routeLabel) {
  const links = await page.locator('a[target="_blank"]').evaluateAll((anchors) =>
    anchors.map((anchor) => ({
      href: anchor.getAttribute("href") ?? "",
      rel: anchor.getAttribute("rel") ?? "",
    })),
  );

  for (const link of links) {
    const relTokens = new Set(link.rel.split(/\s+/).filter(Boolean));
    assert(relTokens.has("noopener"), `External link is missing rel=\"noopener\" on ${routeLabel}: ${link.href}`);
    assert(relTokens.has("noreferrer"), `External link is missing rel=\"noreferrer\" on ${routeLabel}: ${link.href}`);
  }
}

async function assertDownloadLinks(page, routeLabel, expectedHref) {
  const resumeLinks = await page.locator(`a[href="${expectedHref}"]`).evaluateAll((anchors) =>
    anchors.map((anchor) => ({
      text: anchor.textContent?.trim() ?? "",
      download: anchor.getAttribute("download") ?? "",
    })),
  );

  assert(resumeLinks.length > 0, `Expected at least one resume download link on ${routeLabel}.`);
  for (const link of resumeLinks) {
    if (/resume|download/i.test(link.text)) {
      assert(link.download.length > 0, `Resume CTA is missing a download attribute on ${routeLabel}: ${link.text}`);
    }
  }
}

async function getJsonLdEntries(page) {
  const scripts = await page.locator('script[type="application/ld+json"]').allInnerTexts();

  return scripts.flatMap((text) => {
    try {
      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      throw new Error(`Invalid JSON-LD payload: ${error.message}`);
    }
  });
}

async function assertJsonLdTypes(page, routeLabel, expectedTypes) {
  const entries = await getJsonLdEntries(page);
  const presentTypes = new Set(entries.map((entry) => entry?.["@type"]).filter(Boolean));

  for (const expectedType of expectedTypes) {
    assert(presentTypes.has(expectedType), `Missing JSON-LD type '${expectedType}' on ${routeLabel}.`);
  }
}

async function assertNoMojibake(page, routeLabel) {
  const bodyText = await page.locator("body").innerText();
  const invalidFragments = ["Ã‚", "Ãƒ", "ï¿½"];
  const detected = invalidFragments.filter((fragment) => bodyText.includes(fragment));
  assert(detected.length === 0, `Unexpected mojibake detected on ${routeLabel}: ${detected.join(", ")}`);
  return bodyText;
}

async function getMetaContent(page, selector) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "attached" });
  return locator.getAttribute("content");
}

async function assertSocialMetadata(page, routeLabel, expected) {
  const canonicalHref = await page.locator('link[rel="canonical"]').first().getAttribute("href");
  assert(canonicalHref === expected.canonical, `Unexpected canonical URL for ${routeLabel}: ${canonicalHref}`);

  const ogUrl = await getMetaContent(page, 'meta[property="og:url"]');
  assert(ogUrl === expected.canonical, `Unexpected og:url for ${routeLabel}: ${ogUrl}`);

  const ogTitle = await getMetaContent(page, 'meta[property="og:title"]');
  assert(ogTitle === expected.ogTitle, `Unexpected og:title for ${routeLabel}: ${ogTitle}`);

  const ogType = await getMetaContent(page, 'meta[property="og:type"]');
  assert(ogType === expected.ogType, `Unexpected og:type for ${routeLabel}: ${ogType}`);

  const ogImage = await getMetaContent(page, 'meta[property="og:image"]');
  assert(ogImage === expected.imageUrl, `Unexpected og:image for ${routeLabel}: ${ogImage}`);

  const twitterCard = await getMetaContent(page, 'meta[name="twitter:card"]');
  assert(twitterCard === "summary_large_image", `Unexpected twitter:card for ${routeLabel}: ${twitterCard}`);

  const twitterTitle = await getMetaContent(page, 'meta[name="twitter:title"]');
  assert(twitterTitle === expected.ogTitle, `Unexpected twitter:title for ${routeLabel}: ${twitterTitle}`);

  const twitterImage = await getMetaContent(page, 'meta[name="twitter:image"]');
  assert(twitterImage === expected.imageUrl, `Unexpected twitter:image for ${routeLabel}: ${twitterImage}`);
}

async function verifyHome(page) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForSelector('[data-testid="hero-visual"]');
  const title = await page.title();
  assert(title === "Meet Gandhi | Software Engineer", `Unexpected homepage title: ${title}`);
  await assertJsonLdTypes(page, "home", ["WebSite", "Person"]);
  await assertSocialMetadata(page, "home", {
    canonical: siteUrl,
    ogTitle: "Meet Gandhi | Software Engineer",
    ogType: "website",
    imageUrl: defaultSocialImage,
  });

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
  await assertExternalBlankLinksSafe(page, "home");
  await assertDownloadLinks(page, "home", "/assets/Meet_Gandhi_Resume.pdf");

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
    const pageTitle = await page.title();
    assert(pageTitle === `${project.title} | Meet Gandhi`, `Unexpected page title for ${project.slug}: ${pageTitle}`);
    await assertJsonLdTypes(page, `/projects/${project.slug}`, ["CreativeWork"]);
    await assertSocialMetadata(page, `/projects/${project.slug}`, {
      canonical: `${siteUrl}/projects/${project.slug}`,
      ogTitle: project.title,
      ogType: "article",
      imageUrl: `${siteUrl}${project.visual.src}`,
    });
    await assertExternalBlankLinksSafe(page, `/projects/${project.slug}`);
    const title = await page.locator("h1").first().innerText();
    assert(title.trim() === project.title, `Unexpected project title for ${project.slug}: ${title}`);
    await page.getByText(project.statusLabel).first().waitFor();
  }

  await page.goto(`${baseUrl}/resume`, { waitUntil: "networkidle" });
  await page.waitForSelector("h1");
  await assertNoMojibake(page, "/resume");
  const resumePageTitle = await page.title();
  assert(resumePageTitle === "Resume | Meet Gandhi", `Unexpected resume page title: ${resumePageTitle}`);
  await assertJsonLdTypes(page, "/resume", ["ProfilePage", "Person"]);
  await assertSocialMetadata(page, "/resume", {
    canonical: `${siteUrl}/resume`,
    ogTitle: "Resume",
    ogType: "profile",
    imageUrl: defaultSocialImage,
  });
  await assertExternalBlankLinksSafe(page, "/resume");
  await assertDownloadLinks(page, "/resume", "/assets/Meet_Gandhi_Resume.pdf");
  const resumeTitle = await page.locator("h1").first().innerText();
  assert(resumeTitle.trim() === "Meet Gandhi", `Unexpected resume title: ${resumeTitle}`);

  await page.goto(`${baseUrl}/projects`, { waitUntil: "networkidle" });
  await page.waitForSelector("h1");
  await assertNoMojibake(page, "/projects");
  const projectsTitle = await page.locator("h1").first().innerText();
  assert(projectsTitle.trim() === "Projects built as public proof.", `Unexpected projects index title: ${projectsTitle}`);
  const indexCards = await page.locator('[data-testid="project-card"]').count();
  assert(indexCards === projects.length, `Expected ${projects.length} project cards on /projects, found ${indexCards}.`);
  await assertExternalBlankLinksSafe(page, "/projects");

  await page.goto(`${baseUrl}/chess`, { waitUntil: "networkidle" });
  await page.waitForSelector("h1");
  await assertNoMojibake(page, "/chess");
  const chessTitle = await page.locator("h1").first().innerText();
  assert(chessTitle.trim() === "SIMBA Chess Similarity Search", `Unexpected chess title: ${chessTitle}`);
  await page.getByText("Launch Streamlit demo").first().waitFor();
  await assertExternalBlankLinksSafe(page, "/chess");

  const missingProjectResponse = await page.goto(`${baseUrl}/projects/not-a-real-project`, { waitUntil: "networkidle" });
  assert(missingProjectResponse?.status() === 404, "Unknown project route did not return a 404 status.");
  await page.waitForSelector("h1");
  const missingProjectTitle = await page.locator("h1").first().innerText();
  assert(missingProjectTitle.trim() === "This page is not here.", `Unexpected missing-project title: ${missingProjectTitle}`);

  const missingRouteResponse = await page.goto(`${baseUrl}/definitely-not-a-real-route`, { waitUntil: "networkidle" });
  assert(missingRouteResponse?.status() === 404, "Unknown top-level route did not return a 404 status.");
  await page.waitForSelector("h1");
  const missingRouteTitle = await page.locator("h1").first().innerText();
  assert(missingRouteTitle.trim() === "This page is not here.", `Unexpected missing-route title: ${missingRouteTitle}`);
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
    if (message.type() === "error" && !message.text().includes("server responded with a status of 404")) errors.push(message.text());
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
