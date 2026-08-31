import NordicCountryPage from '../../../../src/NordicCountryPage';
import {
  BASE, LANGS, NORDIC_IDS, alternatesFor, bookedBy, clip, localizedPath, nordicFor, ogFor,
} from '../../../seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => NORDIC_IDS.map((country) => ({ lang, country })));
}

const countryFor = (lang, id) => nordicFor(lang).find((c) => c.id === id);

export async function generateMetadata({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const c = countryFor(lang, params.country);
  const path = `/nordic/${params.country}`;
  if (!c) return { title: 'Nordic Travel | Finuo', alternates: alternatesFor(lang, path) };

  const suffix = { zh: 'Finuo 芬诺北欧旅游', en: 'Finuo · Nordic Travel', fi: 'Finuo · Pohjolan matkat' }[lang];
  const title = `${c.title} · ${c.subtitle} | ${suffix}`;
  const description = clip(`${c.intro}${lang === 'zh' ? '' : ' '}${bookedBy(lang)}`, lang);

  return {
    title,
    description,
    alternates: alternatesFor(lang, path),
    openGraph: ogFor(lang, path, title, description, 'article'),
  };
}

export default function Page({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const c = countryFor(lang, params.country);
  const url = `${BASE}${localizedPath(lang, `/nordic/${params.country}`)}`;

  const ld = c && [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: c.title,
      description: c.intro,
      url,
      inLanguage: lang,
      touristType: ['Sightseeing', 'Nature tourism'],
      provider: { '@type': 'TravelAgency', name: 'Finuo Oy', url: BASE },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Finuo', item: `${BASE}${localizedPath(lang, '/')}` },
        { '@type': 'ListItem', position: 2, name: c.title, item: url },
      ],
    },
  ];

  return (
    <>
      {ld && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      )}
      <NordicCountryPage country={params.country} lang={lang} />
    </>
  );
}
