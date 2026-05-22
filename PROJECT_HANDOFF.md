# Meet Gandhi Portfolio Redesign Handoff

## What Was Built

The portfolio was rebuilt from a static HTML/CSS/JS page into a polished Next.js application for `meetgandhi.com`.

The new site is intentionally broader and more standalone. The homepage now presents Meet Gandhi as a software engineer across AI, data, backend, full-stack, and research work instead of leading with narrow tool names or internal project-planning language.

Public routes:

- `/`: main portfolio homepage
- `/projects/[slug]`: project case-study pages
- `/resume`: web resume
- `/api/contact`: contact form endpoint

## Tech Stack

- **Next.js App Router**: routing, static generation, API route, Vercel deployment fit.
- **TypeScript**: safer component props, route data, and content handling.
- **Tailwind CSS**: responsive layout and visual styling.
- **shadcn/ui**: owned UI primitives such as buttons, badges, cards, tabs, inputs, and textarea.
- **Framer Motion**: section entrance motion.
- **React Three Fiber / Three.js**: interactive 3D hero accent.
- **Zod**: typed project manifest validation during build.
- **Resend**: planned production email delivery for the contact form.
- **Playwright Core**: local browser smoke verification.

## Important Design Choices

- The hero copy is broad and simple: `Meet Gandhi` plus a general software-engineering positioning line.
- Specific tools like FAISS, FastAPI, PyTorch, Docker, and AWS are kept inside project pages and the tech stack section.
- The portfolio website is not listed as a project.
- Internal cadence/planning sections were removed from the public site.
- Projects can be `Live`, `Building`, `Upcoming`, or `Research`, but concept visuals are clearly labeled so they are not mistaken for live screenshots.
- The visual system uses a premium warm editorial base, dark product sections, generated SVG project media, and a small 3D hero scene.

## Important Files

- `src/app/page.tsx`: homepage.
- `src/app/projects/[slug]/page.tsx`: project case-study route.
- `src/app/resume/page.tsx`: web resume route.
- `src/app/api/contact/route.ts`: contact form API route.
- `src/lib/projects.ts`: Zod schema and project manifest loading.
- `src/lib/profile.ts`: profile, experience, education, and stack content.
- `data/projects.json`: canonical project data.
- `public/visuals/`: generated project concept visuals.
- `scripts/verify-portfolio.mjs`: browser smoke test.
- `portfolio.schema.json`: JSON schema companion for project data.

## How To Run

```powershell
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## How To Validate

```powershell
npm run validate:projects
npm run lint
npm run build
```

For browser verification:

```powershell
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
npm run verify
```

The verifier checks desktop and mobile rendering, homepage copy, project cards, visual labels, every project route, the resume route, contact-form required-field validation, and visible mojibake regressions.

## Contact Form Setup

The contact form is implemented, but production sending needs Resend environment variables in Vercel:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL=gandhi.meet.mg@gmail.com
CONTACT_FROM_EMAIL=Portfolio <hello@meetgandhi.com>
```

Resend may require domain verification for `meetgandhi.com` before `hello@meetgandhi.com` can send mail. Direct email links remain visible even before that setup is complete.

## Deployment Notes

Repository:

```text
https://github.com/meet989898/html-portfolio
```

Production domains:

```text
https://www.meetgandhi.com
https://meetgandhi.com
https://meetgandhi.dev
```

Vercel should auto-detect the Next.js app and deploy every push to `main`.

## Future Project Pattern

Every resume-worthy project should include:

- live demo
- GitHub repository
- screenshots or generated concept visuals
- `portfolio.json` or compatible project metadata
- README with architecture and metrics
- tests and verification steps
- project-specific handoff markdown explaining the stack

When demos become live, replace concept visuals in `public/visuals/` with real Playwright screenshots or clearly labeled generated images based on those screenshots.
