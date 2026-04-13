# Finuo - Nordic Travel & Education

Bilingual (Chinese/English) website for Finuo, a Nordic travel and education consulting company based in Finland.

## Getting Started

```bash
npm install
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
```

Deployed on **Vercel** from the `master` branch. Node.js 24.x required.

## Features

- **Two sub-sites**: Travel and Education, switchable via navigation tabs
- **Bilingual**: Chinese (default) and English, toggle via language button in navbar
- **Dark/Light mode**: Theme toggle in navbar
- **Responsive**: Mobile drawer menu, adaptive layouts

## Tech Stack

- React 18
- Material UI v5
- react-i18next (i18n)

## Project Structure

- `src/components/` - Travel site components
- `src/components_education/` - Education site components
- `src/i18n/` - Translation files (en.json, zh.json)
- `public/images/` - Logo, hero images
- `public/videos/` - Hero videos
