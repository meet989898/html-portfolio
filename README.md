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

Every featured project should eventually include a root-level `portfolio.json` compatible with `portfolio.schema.json`. The portfolio will use those manifests to keep project cards, role signals, demos, and resume bullets current.

## Maintenance Policy

Ongoing commits should be meaningful: tests, docs, benchmark updates, demo improvements, accessibility fixes, model cards, or real issue fixes. Empty churn and timestamp-only edits are intentionally out of scope.
