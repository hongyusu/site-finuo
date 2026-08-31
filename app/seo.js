// Server-only SEO data. Tour and institution ids live here so the sitemap,
// generateStaticParams and per-page metadata cannot drift apart.
// Do NOT add 'use client' — Next would then treat these as client references
// and generateStaticParams would silently return nothing.
import en from '../src/i18n/en.json';
import zh from '../src/i18n/zh.json';

export const BASE = 'https://finuo.fi';

const enT = en.translation || en;
const zhT = zh.translation || zh;

// Hand-tuned English names (keyword-richer than the i18n titles, e.g. the
// "Yellow Mountain" gloss searchers actually type).
const TOUR_EN_NAMES = {
  huangshan: 'Huangshan (Yellow Mountain) 3-Day Tour',
  huizhou: 'Huizhou Ancient Villages 3-Day Tour',
  qiyun: 'Mount Qiyun 3-Day Tour',
  anhui: 'Southern Anhui & Jingchuan 3-Day Tour',
  suzhou: 'Suzhou Classical Gardens 3-Day Tour',
  hangzhou: 'Hangzhou West Lake 3-Day Tour',
  'suzhou-hangzhou': 'Suzhou & Hangzhou 3-Day Tour',
  shanghai: 'Shanghai 3-Day Itinerary',
};

const zhTours = zhT.tourism.china.anhuiTours;
const enTours = enT.tourism.china.anhuiTours;

export const TOURS = zhTours.map((t) => {
  const e = enTours.find((x) => x.id === t.id) || {};
  return {
    id: t.id,
    zhTitle: t.title,
    enTitle: TOUR_EN_NAMES[t.id] || e.title,
    zhSummary: t.summary,
    enSummary: e.summary,
    price: t.price,
    days: (t.days || []).map((d) => d.title).filter(Boolean),
  };
});

export const INSTITUTIONS = (zhT.education.schools || []).map((s) => {
  const e = (enT.education.schools || []).find((x) => x.id === s.id) || {};
  return {
    id: s.id,
    zhName: s.name,
    enName: e.name || s.name,
    zhDesc: s.desc,
    enDesc: e.desc,
    zhIntro: s.intro,
  };
});

export const TOUR_IDS = TOURS.map((t) => t.id);
export const INSTITUTION_IDS = INSTITUTIONS.map((i) => i.id);

/** First `max` characters of a Chinese string, trimmed at a sentence break. */
export function clip(text, max = 78) {
  const s = (text || '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const stop = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('，'), cut.lastIndexOf('. '));
  return (stop > max * 0.6 ? cut.slice(0, stop + 1) : cut) + '…';
}

/** Numeric price for schema.org Offer — the strings read "1727 元 / 人". */
export function priceValue(price) {
  const digits = String(price || '').replace(/[^\d]/g, '');
  return digits || null;
}

/** FAQPage schema built from the four Q&As the FAQ section actually renders. */
export function faqLd() {
  const f = zhT.faq || {};
  const strip = (s) => String(s || '').replace(/<\/?[a-z]+>/gi, '').trim();
  const entities = [1, 2, 3, 4]
    .map((i) => ({ q: strip(f[`q${i}`]), a: strip(f[`a${i}`]) }))
    .filter((x) => x.q && x.a)
    .map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.a },
    }));
  if (!entities.length) return null;
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: entities };
}

// The four Nordic country pages. The landing page only server-renders the
// active tab, so these standalone URLs are what search engines can actually
// index for Norway / Iceland / Denmark.
export const NORDIC = ['finland', 'norway', 'iceland', 'denmark'].map((id) => ({
  id,
  zhTitle: zhT.tourism[id].title,
  zhSubtitle: zhT.tourism[id].subtitle,
  zhIntro: zhT.tourism[id].intro,
  enTitle: enT.tourism[id].title,
  enIntro: enT.tourism[id].intro,
}));

export const NORDIC_IDS = NORDIC.map((c) => c.id);
