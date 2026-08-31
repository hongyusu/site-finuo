import HelsinkiPage from '../../../../src/HelsinkiPage';
import {
  BASE, LANGS, HELSINKI_SECTIONS, alternatesFor, clip, helsinkiSectionFor, helsinkiTitle, localizedPath, ogFor, ogImage,
} from '../../../seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => HELSINKI_SECTIONS.map((section) => ({ lang, section })));
}

export async function generateMetadata({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const s = helsinkiSectionFor(lang, params.section);
  const path = `/helsinki/${params.section}`;
  if (!s) return { title: 'Helsinki | Finuo', alternates: alternatesFor(lang, path) };

  const city = { zh: '赫尔辛基', en: 'Helsinki', fi: 'Helsinki' }[lang];
  const title = `${helsinkiTitle(lang, params.section) || `${s.title} · ${city}`} | Finuo`;
  const description = clip(s.desc, lang);

  return {
    title,
    description,
    alternates: alternatesFor(lang, path),
    openGraph: ogFor(lang, path, title, description, 'article', ogImage('helsinki', params.section)),
  };
}

export default function Page({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const s = helsinkiSectionFor(lang, params.section);
  const url = `${BASE}${localizedPath(lang, `/helsinki/${params.section}`)}`;

  const ld = s && [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: s.title,
      description: s.desc,
      url,
      inLanguage: lang,
      numberOfItems: s.items.length,
      itemListElement: s.items.map((name, i) => ({ '@type': 'ListItem', position: i + 1, name })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Finuo', item: `${BASE}${localizedPath(lang, '/')}` },
        { '@type': 'ListItem', position: 2, name: s.countryTitle, item: `${BASE}${localizedPath(lang, '/nordic/finland')}` },
        { '@type': 'ListItem', position: 3, name: s.title, item: url },
      ],
    },
  ];

  return (
    <>
      {ld && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      )}
      <HelsinkiPage section={params.section} />
    </>
  );
}
