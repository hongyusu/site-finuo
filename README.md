# Finuo - Nordic Travel & Education

Bilingual website for [Finuo](https://finuo.fi/), a Nordic travel and education consulting company based in Finland.

## Features

- **Two sub-sites** — Travel and Education, switchable via tabs in the navigation bar
- **Bilingual** — Chinese (default) and English with instant language toggle
- **Dark/Light mode** — theme toggle in the navbar
- **Responsive** — mobile drawer menu with adaptive layouts

## Getting Started

```bash
npm install
npm start
```

Dev server runs at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Deployment

Deployed on **Vercel** from the `master` branch.

- Node.js version: **24.x** (configured in Vercel project settings)
- Build uses `NODE_OPTIONS=--openssl-legacy-provider` for react-scripts compatibility
- Git author must be `Hongyu Su <hongyu.su@me.com>` (Vercel Hobby plan requirement)

## Git Workflow

```
develop  -->  master  -->  Vercel (auto-deploy)
```

Commit on `develop`, merge to `master`, push both.

## Tech Stack

- React 18
- Material UI v5 (MUI) with Emotion
- react-i18next / i18next for internationalization
- Create React App (react-scripts 5.0.1)

## Project Structure

```
src/
  App.js                  # Root component: theme, site switcher, i18n
  LandingPage.js          # Travel site layout
  LandingPage1.js         # Education site layout
  getLPTheme.js            # MUI theme (colors, typography)
  i18n/
    index.js              # i18n config (default: Chinese)
    en.json               # English translations
    zh.json               # Chinese translations
  components/             # Travel site components
    AppAppBar.js          # Shared navbar (tabs, nav, language/theme toggle)
    Hero.js               # Hero with video
    Packages.js           # Travel packages with timeline dialog
    Highlights.js         # Services grid with dialog
    Pricing.js            # Pricing tiers
    Testimonials.js       # Customer testimonials
    FAQ.js                # Accordion FAQ
    Footer.js             # Footer with newsletter
    LogoCollection.js     # Partner logos
    ToggleColorMode.js    # Dark/light toggle
  components_education/   # Education site components
    Hero.js, Services.js, Testimonials.js,
    FAQ.js, Footer.js, LogoCollection.js
public/
  images/                 # Logo (SVG), hero/package images
  videos/                 # Hero videos (travel, education)
```

## Translations

All text is in `src/i18n/en.json` and `src/i18n/zh.json`, organized by section: `nav`, `hero`, `packages`, `highlights`, `pricing`, `testimonials`, `faq`, `footer`, `educationServices`, `logoCollection`.

Components use the `useTranslation()` hook. Array data (packages, pricing tiers, etc.) uses `t('key', { returnObjects: true })`.
