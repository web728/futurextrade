# Futurex Trade Fair and Events — Corporate Website

Premium, multi-page Next.js 16 (App Router) website for Futurex Trade Fair and Events Private Limited.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) (this project is registered on port 3002 in the workspace-level `.claude/launch.json`, alongside the sibling `ibis2026` (3000) and `issolar2026` (3001) event microsites).

```bash
npm run build   # production build — must pass with zero TypeScript errors
npm run start   # serve the production build
npm run lint    # ESLint
```

## Tech stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**, **Tailwind CSS v4**
- **shadcn/ui** (built on `@base-ui/react`, *not* Radix — see note below)
- **motion** (Motion.dev, formerly Framer Motion) for UI animation, CTAs, hover/tap gestures, layout animation
- **gsap** + **@gsap/react** (`useGSAP`) for the ScrollTrigger-pinned homepage story section
- **lottie-react** for the loader/success/empty-state animations
- **react-hook-form** + **zod** + **@hookform/resolvers** for all forms

### shadcn/ui uses Base UI, not Radix

This project's `components/ui/*` files were generated against `@base-ui/react`. Triggers/Close buttons use a `render={<element />}` prop instead of the Radix `asChild` pattern — see `components/ui/sheet.tsx` for the reference pattern before adding new shadcn components.

## How to edit content

**All editable content lives in `lib/constants/*.ts`** — each file is a documented "single source of truth" for one content domain. Do not hardcode copy inside page/component files; import from these instead:

| File | Contains |
|---|---|
| `company.ts` | Company facts, stats, contact info, CTA copy, microcopy, enquiry types, footer links, associate logos |
| `navigation.ts` | Header nav structure |
| `services.ts` | The 7 services (listing + detail page copy) |
| `industries.ts` | The 16 industries served |
| `exhibitions.ts` | Exhibition events — real events sourced from futurextrade.com. `isEventUpcoming`/`getUpcomingEvents` derive status from each event's date vs. "now", so this stays correct without manual upkeep — just add new events with real dates |
| `conferences.ts` | Conference events (currently 2 illustrative entries — replace with confirmed conferences) |
| `testimonials.ts` | Testimonials — real organization names, **paraphrased quotes marked with a TODO** to confirm exact wording/permission before publishing |
| `gallery.ts` | Gallery photos — real Futurex event photos downloaded from futurextrade.com into `public/images/gallery/` |
| `media.ts` | Blog/media posts — currently illustrative placeholder posts, replace via this file or wire to a CMS |
| `careers.ts` | Careers page copy + `OPEN_POSITIONS` (currently empty — add real roles here) |
| `seo.ts` | Per-page `<title>`/description metadata for the pages listed here; other pages set metadata inline in their `page.tsx` |

## Replacing / adding real assets

- **Logo**: `public/logos/futurex-logo.png` was extracted directly (with real transparency) from the official brand book PDF — this is the authoritative source if you need to regenerate it.
- **Favicon**: `app/favicon.ico` and `public/apple-touch-icon.png` were generated from the brand book's chevron mark.
- **Gallery photos** (`public/images/gallery/`) and **association logos** (`public/logos/associates/`): real files downloaded from the live futurextrade.com site. `components/gallery/GalleryImage.tsx` shows a premium gradient placeholder automatically if any referenced image file is ever missing, so it's always safe to add new `GALLERY_ITEMS` entries before the photo is sourced.
- **Lottie animations**: `public/lottie/{loader,success,empty}.json` are small hand-built placeholder animations (pulsing dot / checkmark / floating dashed box). Swap in real After-Effects-exported JSON from your designer by replacing these files — `components/interactive/LottieLoader.tsx` doesn't need any code changes as long as the filenames stay the same.

## Animation system

- `lib/gsap.ts` registers `gsap`/`ScrollTrigger`/`useGSAP` once.
- `lib/animation.ts` exports shared Motion variants (`fadeUp`, `fadeIn`, `scaleIn`, `slideLeft`, `slideRight`, `staggerContainer`, `staggerItem`).
- `hooks/useReducedMotion.ts` and `hooks/useIsMobile.ts` (via `useSyncExternalStore`) gate every heavy animation — hero tilt, GSAP pinning, magnetic buttons, cursor glow, card tilt.
- `components/interactive/` holds every reusable animated primitive (photo-based hero visual, pinned GSAP showcase, CTA/magnetic buttons, hover-lift cards, reveal grids, counters, marquee, cursor glow, page transitions, Lottie loader, scroll progress bar).
- **To disable heavy animation globally** for a low-power deployment target: force `useReducedMotion` to always return `true` (one-line change in `hooks/useReducedMotion.ts`), which already cleanly degrades every animated component to its static/reduced state.

## Connecting a real CRM / email service

Form submissions post to `app/api/enquiry/route.ts`, which validates with the shared `lib/validations/enquiry.ts` zod schema and currently just logs the payload. Replace the `// TODO` in that route with a `fetch()` call to your CRM/webhook/email provider (e.g. HubSpot, Zoho, a Zapier/Make webhook, or SMTP via Resend/SendGrid) — no changes are needed anywhere else, since every page uses the shared `components/forms/LeadFlowForm.tsx`.

## Deploying

This is a standard Next.js 16 app — deploy to Vercel by importing the `futurex-website` directory as the project root, or run `npm run build && npm run start` on any Node 18+ host. No environment variables are required yet; add `ENQUIRY_WEBHOOK_URL` (or similar) once you wire up a real CRM per the section above.

## Notes for future Claude sessions

See `AGENTS.md` — this Next.js version has breaking changes vs. training data; check `node_modules/next/dist/docs/` before writing code that touches routing, `params`, or metadata APIs.
