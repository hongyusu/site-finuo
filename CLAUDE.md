# Finuo Website

## Overview

Finuo is a bilingual (Chinese/English) website for a Nordic travel and education consulting company based in Finland. Built with React + Material UI, deployed on Vercel.

Two sub-sites switchable via tabs in the navigation bar:
- **Travel** (formerly "Experience") — Nordic travel packages, highlights, pricing
- **Education** — Study abroad consulting services for Finland

## Tech Stack

- React 18 + Create React App (`react-scripts 5.0.1`)
- Material UI v5 (MUI) with Emotion
- `react-i18next` / `i18next` for internationalization
- Deployed on Vercel (connected to `master` branch)

## Quick Start

```bash
npm install
npm start        # dev server on http://localhost:3000
npm run build    # production build
```

## Project Structure

```
src/
  App.js                    # Root: theme, site switcher, nav items (uses i18n)
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

- Default language: **Chinese (zh)**
- Language toggle button in navbar (globe icon, shows "EN" or "中文")
- All translatable strings are in `src/i18n/en.json` and `src/i18n/zh.json`
- Components use `useTranslation()` hook and `t('key')` for text
- Array data (packages, highlights, testimonials, pricing tiers) use `t('key', { returnObjects: true })`

To add/edit translations, update both JSON files. Keys are organized by section:
`nav`, `hero`, `packages`, `highlights`, `pricing`, `testimonials`, `faq`, `footer`, `educationServices`, `logoCollection`

## Deployment

- Platform: **Vercel**
- Branch: `master`
- Node.js version: **24.x** (set in Vercel project settings)
- Build command uses `NODE_OPTIONS=--openssl-legacy-provider` for react-scripts compatibility
- Git author for commits must be `Hongyu Su <hongyu.su@me.com>` (Vercel Hobby plan requires matching contributor)

## Git Workflow

- `develop` — working branch
- `master` — production branch, deploys to Vercel
- Workflow: commit on `develop` -> merge to `master` -> push both
