import { BASE, LANGS, TOUR_IDS, INSTITUTION_IDS, NORDIC_IDS, localizedPath } from './seo';

// Every page in every language, each entry carrying the full hreflang set.
const PATHS = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/education', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/mice', changeFrequency: 'monthly', priority: 0.8 },
  ...NORDIC_IDS.map((id) => ({ path: `/nordic/${id}`, changeFrequency: 'monthly', priority: 0.9 })),
  ...TOUR_IDS.map((id) => ({ path: `/tour/${id}`, changeFrequency: 'monthly', priority: 0.7 })),
  ...INSTITUTION_IDS.map((id) => ({ path: `/institution/${id}`, changeFrequency: 'monthly', priority: 0.6 })),
];

// Match the canonical tags exactly: Next renders the root canonical without a
// trailing slash, so the sitemap must not add one.
const abs = (lang, path) => `${BASE}${localizedPath(lang, path)}`.replace(/\/+$/, '');

export default function sitemap() {
  const lastModified = new Date();
  return PATHS.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      LANGS.map((l) => [l, abs(l, path)])
    );
    return LANGS.map((lang) => ({
      url: abs(lang, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
