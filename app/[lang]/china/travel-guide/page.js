import ChinaGuidePage from '../../../../src/ChinaGuidePage';
import { BASE, LANGS, alternatesFor, chinaGuideFor, clip, localizedPath, ogFor } from '../../../seo';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const g = chinaGuideFor(lang);
  const path = '/china/travel-guide';
  const title = `${g.subtitle} | Finuo`;
  const description = clip(g.intro, lang);

  return {
    title,
    description,
    alternates: alternatesFor(lang, path),
    openGraph: ogFor(lang, path, title, description, 'article', '/images/anhui/shanghai-18.jpeg'),
  };
}

export default function Page({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const g = chinaGuideFor(lang);
  const url = `${BASE}${localizedPath(lang, '/china/travel-guide')}`;

  // The guide is a set of question-shaped practicalities, so it is marked up
  // as an FAQ: visas, flights, transfers, SIM cards, payments, apps.
  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: g.items.map((it) => ({
        '@type': 'Question',
        name: it.title,
        acceptedAnswer: { '@type': 'Answer', text: it.body },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Finuo', item: `${BASE}${localizedPath(lang, '/')}` },
        { '@type': 'ListItem', position: 2, name: g.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ChinaGuidePage />
    </>
  );
}
