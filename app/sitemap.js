import { BASE, TOUR_IDS, INSTITUTION_IDS } from './seo';

// Generated from the same id lists the pages are built from, so a new tour or
// institution appears in the sitemap automatically.
export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: `${BASE}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/education`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/mice`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    ...TOUR_IDS.map((id) => ({
      url: `${BASE}/tour/${id}`, lastModified, changeFrequency: 'monthly', priority: 0.7,
    })),
    ...INSTITUTION_IDS.map((id) => ({
      url: `${BASE}/institution/${id}`, lastModified, changeFrequency: 'monthly', priority: 0.6,
    })),
  ];
}
