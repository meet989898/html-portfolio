# Meet Gandhi Portfolio Handoff

## What Was Built

This repository is the first version of the public portfolio for `meetgandhi.com`. It replaces the old starter HTML portfolio with a modern ML systems portfolio designed for SWE, ML/AI, backend, and data-systems applications.

The site includes:

- A dynamic hero with an animated signal-field canvas.
- Project cards for SIMBA, Pharmacy Document Intelligence, Poker Behavior Modeling, and Augmented KGE Research.
- Filter controls for ML, retrieval, backend, and data projects.
- A project manifest system in `data/projects.json`.
- A schema in `portfolio.schema.json` to standardize future project metadata.
- A printable web resume at `resume.html`.
- A local validation script for project metadata.
- Vercel deployment configuration.
- Codex automations for ongoing maintenance and three-day project planning.

## Tech Stack

- **HTML**: Page structure, semantic sections, navigation, resume page, and project content.
- **CSS**: Responsive layout, dark technical-cinematic visual system, animated tiles, pipeline graphics, print styles, and mobile rules.
- **JavaScript**: Project rendering, filtering, manifest hydration, animated counters, reduced-motion handling, and canvas animation.
- **JSON**: `data/projects.json` stores structured project metadata.
- **JSON Schema**: `portfolio.schema.json` defines the required shape for project metadata.
- **PowerShell**: `scripts/validate-project-manifest.ps1` validates project entries without requiring Node packages.
- **GitHub**: Source control and automatic deployment source.
- **Vercel**: Hosting target for the production portfolio and custom domains.

## Why This Stack

The first version is intentionally dependency-light. A static site is fast, easy to host, reliable on Vercel Hobby, and simple enough for you to understand fully. Once the project cadence is stable, we can upgrade to Next.js or a richer framework if the portfolio needs server-rendered GitHub discovery, API routes, analytics, or more advanced project pages.

## Important Files

- `index.html`: Main portfolio page.
- `styles.css`: Visual design, responsive layout, animation, and print styles.
- `script.js`: Dynamic project rendering, filters, counters, and background animation.
- `resume.html`: Web resume snapshot with print/save support.
- `data/projects.json`: Current portfolio project manifest.
- `portfolio.schema.json`: Manifest schema for future projects.
- `scripts/validate-project-manifest.ps1`: Local validation script.
- `scripts/serve-static.js`: Local static preview server.
- `scripts/verify-portfolio.js`: Browser smoke test for desktop and mobile.
- `vercel.json`: Vercel routing/header configuration.

## How To Run Locally

From the repository root:

```powershell
& "C:\Users\gandh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts/serve-static.js
```

Then open:

```text
http://localhost:4173
```

## How To Validate

Validate the project manifest:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-project-manifest.ps1
```

Run the browser smoke test:

```powershell
$env:NODE_PATH="C:\Users\gandh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\gandh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\playwright-core@1.60.0\node_modules"
& "C:\Users\gandh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts/verify-portfolio.js
```

## Deployment Notes

The GitHub repository is:

```text
https://github.com/meet989898/html-portfolio
```

The intended Vercel setup is:

- Primary domain: `meetgandhi.com`
- Redirect domain: `meetgandhi.dev`
- Production branch: `main`

Every push to `main` should trigger a production deployment once the Vercel project is connected.

## Future Project Pattern

Every new resume-worthy project should include:

- A live demo.
- A GitHub repository.
- A README with architecture, metrics, and screenshots.
- Tests and verification steps.
- Public-safe data or synthetic data generation.
- A root-level `portfolio.json` compatible with the portfolio schema.
- A project-specific handoff markdown file explaining what was built and how to learn the stack.

## Automation Policy

Daily commits should be meaningful. Acceptable maintenance includes:

- Documentation improvements.
- Tests.
- Benchmark refreshes.
- Accessibility fixes.
- UI/demo polish.
- Model cards.
- Project metadata updates.
- Real bug fixes.

Avoid empty churn, timestamp-only commits, fake changes, or meaningless formatting-only commits.
