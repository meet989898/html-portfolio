# Meet Gandhi Portfolio

Public portfolio for [meetgandhi.com](https://www.meetgandhi.com).

The site is now a React/Next.js portfolio with broad CS positioning, project case-study routes, generated project visuals, a polished web resume, branded subdomain shortcuts, and a Resend-backed contact API.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Three Fiber / Three.js
- Zod
- Resend
- Vercel

## Public Routes

- `/`: portfolio homepage
- `/projects`: filterable project index
- `/projects/[slug]`: project case studies
- `/chess`: SIMBA chess demo landing page
- `/resume`: web resume
- `/api/contact`: contact endpoint

## Local Development

```powershell
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## Validation

```powershell
npm run validate:projects
npm run lint
npm run build
```

For browser verification, start the built app:

```powershell
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

Then run:

```powershell
npm run verify
```

The verifier checks the homepage, broad hero copy, canonical/social metadata, JSON-LD structured data, project cards, visual labels, project detail routes, resume route, invalid-route 404 handling, mobile/desktop layouts, contact-form validation, and visible mojibake regressions.

## Project Manifest

`data/projects.json` is the canonical source for portfolio projects. The Next.js app validates it with Zod during build through `src/lib/projects.ts`, and the PowerShell validator provides a quick local check.

Each project should include:

- status and featured order
- role signals
- tech stack
- visual asset metadata with a rooted `visual.src` path to a real file under `public/`
- resume bullets
- case-study problem, approach, and outcome

## Contact Form

The contact endpoint lives at `/api/contact` and uses Resend when these Vercel environment variables are present:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

Until those are configured, the site still exposes direct email and social links.

`CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` can be set safely in Vercel because they are not secrets. `RESEND_API_KEY` must be added directly in the Vercel dashboard or CLI and should never be committed.

If a Resend key is ever pasted into chat or logs, revoke it and create a fresh key before using it in production.

## Branded Shortcuts

The same Vercel project handles these domains:

- `resume.meetgandhi.com` -> latest resume PDF
- `github.meetgandhi.com` -> GitHub profile
- `linkedin.meetgandhi.com` -> LinkedIn profile
- `projects.meetgandhi.com` -> project index
- `chess.meetgandhi.com` -> always-on SIMBA landing page
