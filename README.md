# Meet Gandhi Portfolio

This repository contains the public portfolio hub for `meetgandhi.com`.

The site is intentionally lightweight for the first launch: static HTML, CSS, and JavaScript with no build step. That keeps deployment simple while we establish the project manifest system, domain routing, and the automation cadence for future ML projects.

## Current Focus

- Feature the existing `SIMBA` chess similarity search project.
- Present the public-safe rebuild roadmap for Pharmacy Document Intelligence and Poker Behavior Modeling.
- Provide a polished portfolio page for SWE, ML/AI, backend, and data systems applications.
- Define `portfolio.schema.json` so every future project can publish structured metadata.

## Deployment

The portfolio should be deployed on Vercel with:

- Primary domain: `meetgandhi.com`
- Redirect domain: `meetgandhi.dev`

## Project Manifest

The portfolio site now treats `data/projects.json` as the primary source for project cards. `script.js` will fetch that manifest when served over HTTP(S) and will fall back to bundled cards when opened directly from `file://`.

Every featured project should eventually include a root-level `portfolio.json` compatible with `portfolio.schema.json`. The portfolio will use those manifests to keep project cards, role signals, demos, and resume bullets current.

### Validation

Run the local PowerShell validator before publishing manifest changes:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\validate-project-manifest.ps1
```

This checks required fields, duplicate slugs, allowed filter tags, status values, and URL shape without requiring Node dependencies.

### Browser Smoke Test

Run the static preview server in one terminal:

```powershell
& "C:\Users\gandh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" .\scripts\serve-static.js
```

Then run the browser verifier in another:

```powershell
$env:NODE_PATH="C:\Users\gandh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules;C:\Users\gandh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\playwright-core@1.60.0\node_modules"
& "C:\Users\gandh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" .\scripts\verify-portfolio.js
```

The smoke test now verifies manifest hydration, all project filters, visible-card counts, status copy, and captures desktop/mobile screenshots.

The resume page also consumes `data/projects.json` when served over HTTP(S), using each project's first `resumeBullets` entry as the primary project summary. That keeps the portfolio cards and resume project blurbs aligned while preserving bundled fallback content for `file://` previews.

## Maintenance Policy

Ongoing commits should be meaningful: tests, docs, benchmark updates, demo improvements, accessibility fixes, model cards, or real issue fixes. Empty churn and timestamp-only edits are intentionally out of scope.
