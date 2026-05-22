# Meet Gandhi Portfolio

Public portfolio for [meetgandhi.com](https://www.meetgandhi.com).

The site is now a React/Next.js portfolio with broad CS positioning, project case-study routes, generated project visuals, a web resume, and a Resend-backed contact API.

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

The verifier checks the homepage, broad hero copy, project cards, visual labels, project detail routes, resume route, mobile/desktop layouts, and contact-form validation.

## Project Manifest

`data/projects.json` is the canonical source for portfolio projects. The Next.js app validates it with Zod during build through `src/lib/projects.ts`, and the PowerShell validator provides a quick local check.

Each project should include:

- status and featured order
- role signals
- tech stack
- visual asset metadata
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
