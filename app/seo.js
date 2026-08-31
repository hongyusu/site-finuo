// Server-only SEO data, language aware. Ids and copy come from the i18n files
// so the sitemap, generateStaticParams and per-page metadata cannot drift.
// Do NOT add 'use client' — Next would treat these as client references and
// generateStaticParams would silently return nothing.
import en from '../src/i18n/en.json';
import zh from '../src/i18n/zh.json';
import fi from '../src/i18n/fi.json';

export const BASE = 'https://finuo.fi';
export const LANGS = ['zh', 'en', 'fi'];
export const DEFAULT_LANG = 'zh';

const CONTENT = { zh, en, fi };
const t = (lang) => CONTENT[LANGS.includes(lang) ? lang : DEFAULT_LANG];

/** Chinese keeps the bare paths it is already indexed under; others are prefixed. */
export function localizedPath(lang, path = '/') {
  const clean = path === '/' ? '' : path;
  if (lang === DEFAULT_LANG) return clean || '/';
  return `/${lang}${clean}`;
}

/** hreflang set for one logical page, plus x-default pointing at the default language. */
export function alternatesFor(lang, path = '/') {
  const languages = {};
  LANGS.forEach((l) => { languages[l] = localizedPath(l, path); });
  languages['x-default'] = localizedPath(DEFAULT_LANG, path);
  return { canonical: localizedPath(lang, path), languages };
}

const CJK = (lang) => lang === 'zh';

/** Trim a description to what a SERP will actually show. */
export function clip(text, lang) {
  const max = CJK(lang) ? 88 : 158;
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const stop = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('，'), cut.lastIndexOf('. '), cut.lastIndexOf(', '));
  return (stop > max * 0.6 ? cut.slice(0, stop + 1) : cut).trim() + '…';
}

/** Numeric price for schema.org Offer — the strings read "1727 元 / 人" / "RMB 1,727 / pp". */
export function priceValue(price) {
  return String(price || '').replace(/[^\d]/g, '') || null;
}

const BOOKED_BY = {
  zh: '由芬兰本地旅行社 Finuo 芬诺定制行程与预订。',
  en: 'Planned and booked by Finuo, a travel agency based in Finland.',
  fi: 'Suunnittelu ja varaukset: Finuo, suomalainen matkatoimisto.',
};

// Site-level titles and descriptions for the three standalone pages.
export const SITE_META = {
  zh: {
    home: {
      title: 'Finuo · 北欧与中国旅游 — 极光、峡湾、江南精选三日游 | 芬诺旅游',
      description: '赫尔辛基本地旅行社：芬兰极光、挪威峡湾、冰岛、丹麦，以及 8 条精选中国三日游。北欧旅游与江南八条精选三日游。',
    },
    education: {
      title: 'Finuo · 芬兰留学教育 — 大学申请、师生培训、研学 | 芬诺留学',
      description: '芬兰留学咨询：赫尔辛基大学、阿尔托、哈格-赫利尔、于韦斯屈莱、图尔库，以及师生培训与北欧研学项目。',
    },
    mice: {
      title: 'Finuo · 赫尔辛基会议会展 — 会议、展览、团建 | 芬诺会展',
      description: '芬兰与北欧的 MICE 服务：会议、展览（Slush、Habitare、Nordic Business Forum）、定制行程与落地执行。',
    },
  },
  en: {
    home: {
      title: 'Finuo · Nordic & China Travel — Aurora Trips, Fjords, China Tours',
      description: 'Helsinki-based travel agency: Finland aurora trips, Norway fjords, Iceland and Denmark, plus eight curated 3-day tours in China. Trilingual team, local since day one.',
    },
    education: {
      title: 'Finuo · Study Abroad in Finland — Universities, Training, Study Tours',
      description: 'Study-abroad consulting in Finland: University of Helsinki, Aalto, Haaga-Helia, Jyväskylä and Turku, plus teacher and student training and Nordic study tours.',
    },
    mice: {
      title: 'Finuo · MICE & Events in Helsinki — Conferences, Exhibitions',
      description: 'MICE services in Helsinki and the Nordics: conferences, exhibitions (Slush, Habitare, Nordic Business Forum), bespoke programmes and on-the-ground hospitality.',
    },
  },
  fi: {
    home: {
      title: 'Finuo · Pohjolan ja Kiinan matkat — revontulet, vuonot, Kiina',
      description: 'Helsinkiläinen matkatoimisto: revontuliretket Suomessa, Norjan vuonot, Islanti ja Tanska sekä kahdeksan huolella suunniteltua kolmen päivän kiertomatkaa Kiinassa.',
    },
    education: {
      title: 'Finuo · Opiskelu Suomessa — yliopistot, koulutus, opintomatkat',
      description: 'Opiskelijaneuvonta Suomessa: Helsingin yliopisto, Aalto, Haaga-Helia, Jyväskylä ja Turku sekä opettajien ja oppilaiden koulutukset ja pohjoismaiset opintomatkat.',
    },
    mice: {
      title: 'Finuo · Kokoukset ja tapahtumat Helsingissä — konferenssit, messut',
      description: 'MICE-palvelut Helsingissä ja Pohjoismaissa: konferenssit, messut (Slush, Habitare, Nordic Business Forum), räätälöidyt ohjelmat ja paikallinen toteutus.',
    },
  },
};

// Hand-tuned English tour names (keyword-richer than the i18n titles, e.g. the
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

/** Tours in one language. */
export function toursFor(lang) {
  const local = t(lang).tourism.china.anhuiTours;
  return local.map((tour) => ({
    id: tour.id,
    title: tour.title,
    enName: TOUR_EN_NAMES[tour.id],
    summary: tour.summary,
    price: tour.price,
    days: (tour.days || []).map((d) => d.title).filter(Boolean),
  }));
}

/** Institutions in one language. */
export function institutionsFor(lang) {
  return (t(lang).education.schools || []).map((s) => ({
    id: s.id,
    name: s.name,
    desc: s.desc,
    intro: s.intro,
  }));
}

/** Nordic countries in one language. */
export function nordicFor(lang) {
  const tourism = t(lang).tourism;
  return ['finland', 'norway', 'iceland', 'denmark'].map((id) => ({
    id,
    title: tourism[id].title,
    subtitle: tourism[id].subtitle,
    intro: tourism[id].intro,
  }));
}

export const TOUR_IDS = toursFor(DEFAULT_LANG).map((x) => x.id);
export const INSTITUTION_IDS = institutionsFor(DEFAULT_LANG).map((x) => x.id);
export const NORDIC_IDS = ['finland', 'norway', 'iceland', 'denmark'];

export const bookedBy = (lang) => BOOKED_BY[lang] || BOOKED_BY.en;

/** FAQPage schema from the four Q&As the FAQ section renders in this language. */
export function faqLd(lang) {
  const f = t(lang).faq || {};
  const strip = (s) => String(s || '').replace(/<\/?[a-z]+>/gi, '').trim();
  const mainEntity = [1, 2, 3, 4]
    .map((i) => ({ q: strip(f[`q${i}`]), a: strip(f[`a${i}`]) }))
    .filter((x) => x.q && x.a)
    .map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.a },
    }));
  return mainEntity.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity } : null;
}

/** Shared Open Graph block for a page. */
export function ogFor(lang, path, title, description, type = 'website', image) {
  return {
    title,
    description,
    url: `${BASE}${localizedPath(lang, path)}`,
    siteName: 'Finuo',
    type,
    locale: { zh: 'zh_CN', en: 'en_US', fi: 'fi_FI' }[lang] || 'zh_CN',
    images: [image || DEFAULT_OG_IMAGE],
  };
}

// Hero image per page, so a shared link previews the actual subject instead of
// the same aurora photo everywhere. Kept in sync with the image maps in
// src/LandingPage.js and src/InstitutionDetailPage.js.
export const DEFAULT_OG_IMAGE = '/images/destinations/aurora.jpg';

export const OG_IMAGES = {
  nordic: {
    finland: '/images/destinations/cabin.jpg',
    norway: '/images/destinations/fjord.jpg',
    iceland: '/images/destinations/iceland.jpg',
    denmark: '/images/destinations/lake.jpg',
  },
  tour: {
    huangshan: '/images/anhui/huangshan-3.jpeg',
    huizhou: '/images/anhui/huizhou-6.jpeg',
    qiyun: '/images/anhui/qiyun-3.jpeg',
    anhui: '/images/anhui/anhui-2.jpeg',
    suzhou: '/images/anhui/suzhou-4.jpeg',
    hangzhou: '/images/anhui/hangzhou-9.jpeg',
    'suzhou-hangzhou': '/images/anhui/hangzhou-5.jpeg',
    shanghai: '/images/anhui/shanghai-18.jpeg',
  },
  helsinki: {
    attractions: '/images/helsinki/helsinki-cathedral.png',
    'day-trips': '/images/helsinki/porvoo.jpg',
    restaurants: '/images/helsinki/loyly.jpg',
  },
  institution: {
    heureka: '/images/institutions/heureka-1.jpg',
    kisakallio: '/images/institutions/kisakallio-1.jpg',
    kuortane: '/images/institutions/kuortane-1.jpg',
    helsinki: '/images/institutions/helsinki-1.jpg',
    aalto: '/images/institutions/aalto-1.jpg',
    haagahelia: '/images/institutions/haagahelia-1.jpg',
    lab: '/images/institutions/lab-1.jpg',
    jyvaskyla: '/images/institutions/jyvaskyla-1.jpg',
    turku: '/images/institutions/turku-1.jpg',
  },
};

export const ogImage = (kind, id) => (OG_IMAGES[kind] && OG_IMAGES[kind][id]) || DEFAULT_OG_IMAGE;

export const HELSINKI_SECTIONS = ['attractions', 'day-trips', 'restaurants'];

// Search-led page titles. The visible heading stays the site's own wording;
// these are what a searcher actually types.
const HELSINKI_TITLES = {
  attractions: {
    zh: '赫尔辛基景点 · 15 处必去打卡地',
    en: 'Things to Do in Helsinki — 15 Must-See Attractions',
    fi: 'Nähtävyydet Helsingissä — 15 kohdetta, jotka kannattaa nähdä',
  },
  'day-trips': {
    zh: '赫尔辛基周边一日游 · 波尔沃、菲斯卡斯、塔林、斯德哥尔摩',
    en: 'Day Trips from Helsinki — Porvoo, Fiskars, Tallinn, Stockholm',
    fi: 'Päiväretket Helsingistä — Porvoo, Fiskars, Tallinna, Tukholma',
  },
  restaurants: {
    zh: '赫尔辛基餐厅推荐 · 米其林、北欧与中餐精选',
    en: 'Best Restaurants in Helsinki — Michelin, Nordic and Chinese',
    fi: 'Ravintolat Helsingissä — Michelin, pohjoismainen ja kiinalainen',
  },
};

export const helsinkiTitle = (lang, section) =>
  (HELSINKI_TITLES[section] || {})[lang] || null;

const HELSINKI_KEYS = {
  attractions: ['helsinki', 'helsinkiDesc', 'helsinkiAttractions'],
  'day-trips': ['dayTrips', 'dayTripsDesc', 'dayTripsItems'],
  restaurants: ['dining', 'diningDesc', null],
};

/** Title, description and item names for one Helsinki guide, in one language. */
export function helsinkiSectionFor(lang, section) {
  const keys = HELSINKI_KEYS[section];
  if (!keys) return null;
  const fin = t(lang).tourism.finland;
  const [titleKey, descKey, itemsKey] = keys;
  const items = itemsKey
    ? (fin[itemsKey] || []).map((x) => x.name)
    : ['diningHotelItems', 'diningWesternItems', 'diningChineseItems']
        .flatMap((k) => (fin[k] || []).map((x) => x.name));
  return {
    title: fin[titleKey],
    desc: fin[descKey],
    countryTitle: fin.title,
    items,
  };
}

/** The China practicalities guide in one language. */
export function chinaGuideFor(lang) {
  return t(lang).tourism.china.guide;
}
