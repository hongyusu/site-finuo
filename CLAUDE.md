# Finuo Website

## Overview

Finuo is a trilingual (Chinese / English / Finnish) website for a Nordic travel, education
and events company based in Helsinki. Built with **Next.js 14 (App Router)** + Material UI,
deployed on Vercel. The original Create React App build is still in the repo but dormant —
`vercel.json` forces the Next build.

Three sub-sites switchable via tabs in the navigation bar:
- **Travel** (formerly "Experience") — Nordic countries, Helsinki guides, China tours
- **Education** — Study abroad consulting services for Finland
- **Events / MICE** — conferences, exhibitions, bespoke programs

## Tech Stack

- **Next.js 14 App Router** (React 18) — SSR/SSG, 84 prerendered pages
- Material UI v5 (MUI) with Emotion, SSR via `@mui/material-nextjs/v14-appRouter`
- `react-i18next` / `i18next`, one instance per language (see i18n below)
- Deployed on Vercel (connected to `master` branch)
- Create React App (`react-scripts 5.0.1`) is still present but **dormant** — kept as a
  rollback (remove `vercel.json` to fall back to it; `api/chat.js` would need restoring)

## Quick Start

```bash
npm install
npm run next:dev     # dev server on http://localhost:3001
npm run next:build   # production build (what Vercel runs)
npm run next:start   # serve the production build locally

# npm start / npm run build still drive the dormant CRA build — not what deploys.
```

## Project Structure

```
app/                        # Next.js App Router — every route lives under [lang]
  [lang]/
    layout.js               # Root layout: html lang, metadata, hreflang, GA4, org schema
    page.js                 # Travel landing page
    education/  mice/       # The other two sub-sites
    nordic/[country]/       # Finland, Norway, Iceland, Denmark
    helsinki/[section]/     # attractions, day-trips, restaurants
    china/travel-guide/     # China practicalities guide
    tour/[id]/              # 8 China tours
    institution/[id]/       # 9 Finnish institutions
  seo.js                    # Language-aware metadata, hreflang, schema helpers
  paths.js                  # localizedPath / splitLangPath (client-safe)
  sitemap.js  robots.js     # Generated from the same data as the pages
  api/chat/route.js         # ChatWidget -> OpenAI

src/                        # Components and content, shared with the dormant CRA build
  App.js                    # CRA root (dormant): theme, site switcher, nav items
  LandingPage.js            # Travel site layout
  LandingPage1.js           # Education site layout
  getLPTheme.js             # MUI theme config (colors, typography)
  i18n/
    index.js                # i18n init (default: Chinese)
    en.json                 # English translations
    zh.json                 # Chinese translations
  components/               # Travel site components
    AppAppBar.js            # Shared navbar (site tabs, nav, language/theme toggle)
    Hero.js                 # Hero section with video
    LogoCollection.js       # Partner logos
    Packages.js             # Travel packages with timeline dialog
    Highlights.js           # Service highlights grid with dialog
    Pricing.js              # Pricing tiers
    Testimonials.js         # Customer testimonials
    FAQ.js                  # Accordion FAQ
    Footer.js               # Footer with newsletter signup
    ToggleColorMode.js      # Dark/light mode toggle button
  components_education/     # Education site components
    Hero.js                 # Education hero with video
    LogoCollection.js       # Partner logos
    Services.js             # Education services grid with dialog
    Testimonials.js         # Education testimonials
    FAQ.js                  # Same FAQ structure
    Footer.js               # Same footer structure
public/
  images/
    finuo_logo.svg          # Main logo (SVG, transparent background)
    hero.jpeg, 1-4_light/dark.jpg  # Hero and package images
  videos/
    hero.mp4                # Travel hero video
    hero_education.mp4      # Education hero video
```

## i18n / Translations

**Every language has its own URL** — this is what lets Google index and rank each one.

- **Chinese keeps the bare paths** (`/`, `/nordic/finland`); English and Finnish are prefixed
  (`/en/...`, `/fi/...`). Chinese URLs must not change: they are the ones already indexed.
- All routes live under `app/[lang]/`. `next.config.mjs` rewrites the bare paths onto the
  `zh` tree, and redirects `/zh/*` back to the bare path so it is not indexed twice.
  **Adding a new top-level route means adding a rewrite for it.**
- `dynamicParams = false` on the language segment and every nested dynamic route, so an
  unknown path 404s instead of rendering the Chinese home page.
- `src/i18n/index.js` exports `getI18n(lang)` — **one instance per language**. Do not go back
  to a shared singleton whose `lng` is flipped: pages are rendered per language during the
  build and a shared instance leaks the wrong language into the wrong page.
- Strings live in `src/i18n/{zh,en,fi}.json`, structurally identical. `fi.json` is machine
  translated and has not had a native review.
- Components use `useTranslation()` and `t('key')`; array data uses
  `t('key', { returnObjects: true })`. Inside `src/`, build link prefixes from
  `i18n.language` — `src/` deliberately imports nothing from `next/` so the dormant CRA
  build keeps compiling.
- Page metadata, hreflang, sitemap entries and structured data are generated from these
  JSON files in `app/seo.js`, so content and SEO cannot drift apart.

## Deployment

- Platform: **Vercel**
- Branch: `master`
- **Push with the `git@github` SSH alias** — the repo's `origin` authenticates as the wrong
  GitHub account: `git push git@github:hongyusu/site-finuo.git master`
- Node.js version: **24.x** (set in Vercel project settings)
- Build command uses `NODE_OPTIONS=--openssl-legacy-provider` for react-scripts compatibility
- Git author for commits must be `Hongyu Su <hongyu.su@me.com>` (Vercel Hobby plan requires matching contributor)

## Git Workflow

- `develop` — working branch
- `master` — production branch, deploys to Vercel
- Workflow: commit on `develop` -> merge to `master` -> push both
