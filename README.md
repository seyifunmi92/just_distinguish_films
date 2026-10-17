# Just Distinguish Films

Cinematic single-page site for Just Distinguish Films. Next.js (App Router) + TypeScript + Tailwind CSS v4, GSAP (ScrollTrigger) for motion, Lenis for smooth scrolling. Fonts are self-hosted through Fontsource (Big Shoulders Display, Manrope, Cormorant Garamond italic).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploys cleanly to Vercel (import the repo, no settings needed).

## Everything editable lives in `src/data/site.ts`

- **Add a film:** add an entry to `videos` with the YouTube video ID (the part after `v=`), then list its id in `railVideoIds`. The thumbnail is pulled from YouTube automatically.
- **Featured film / hero stills / showreel:** `featuredVideoId`, `heroStillIds`, `showreelVideoId`.
- **Coming Soon:** add real titles to `comingSoon`. While it is empty, the site shows a single "Next production, announcing soon" teaser.
- **CEO portrait and bio:** `ceo.portrait` (put the image in `public/`) and `ceo.bio`.
- **Social links:** `socials`. Only platforms listed here appear on the site and in structured data.

## Contact form

`POST /api/contact` sends mail through Resend when `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are set (see `.env.example`). Without them the form opens the visitor's email app with the message pre-filled, so nothing is lost.

Set `NEXT_PUBLIC_SITE_URL` to the real domain for correct canonical links, Open Graph and sitemap.

## Motion and accessibility

- Opening curtain, hero reveal, masked headings, clip-path image reveals, parallax, magnetic buttons and a soft cursor light. The intro is shortened on repeat visits in the same session.
- `prefers-reduced-motion` turns off smooth scrolling and all animation; content is simply visible.
- Skip link, semantic landmarks, visible focus states, keyboard-reachable film rail, labelled form fields.

## Open items

- Real film stills for the hero and cards (YouTube thumbnails from 2017 are low resolution).
- Higher-resolution logo (transparent PNG or SVG).
- CEO portrait; approve the draft Story and CEO copy.
- Confirm the Instagram handles: `@justdistinguishtv` (company) and `@moradekeadegboyega` (CEO).
- Real Coming Soon titles, synopses and dates.
- Film years shown are the YouTube upload years.
