import NordicCountryPage from '../../../src/NordicCountryPage';
import { BASE, NORDIC, NORDIC_IDS, clip } from '../../seo';

export function generateStaticParams() {
  return NORDIC_IDS.map((country) => ({ country }));
}

const countryFor = (id) => NORDIC.find((c) => c.id === id);

export async function generateMetadata({ params }) {
  const c = countryFor(params.country);
  if (!c) return { title: 'Nordic Travel | Finuo' };

  const title = `${c.zhTitle} · ${c.zhSubtitle} | Finuo 芬诺北欧旅游`;
  const description = clip(`${c.zhIntro}由芬兰本地旅行社 Finuo 芬诺定制行程与预订。`, 88);
  const url = `/nordic/${c.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url: `${BASE}${url}`,
      type: 'article',
      siteName: 'Finuo',
    },
  };
}

export default function Page({ params }) {
  const c = countryFor(params.country);
  const url = `${BASE}/nordic/${params.country}`;

  const ld = c && [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: c.zhTitle,
      description: c.zhIntro,
      url,
      touristType: ['Sightseeing', 'Nature tourism'],
      provider: { '@type': 'TravelAgency', name: 'Finuo Oy', url: BASE },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Finuo 芬诺', item: BASE },
        { '@type': 'ListItem', position: 2, name: c.zhTitle, item: url },
      ],
    },
  ];

  return (
    <>
      {ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      )}
      <NordicCountryPage country={params.country} />
    </>
  );
}
