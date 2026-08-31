import TourClient from '../../../tour-client';
import {
  BASE, LANGS, TOUR_IDS, alternatesFor, bookedBy, clip, localizedPath, ogFor, ogImage, priceValue, toursFor,
} from '../../../seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => TOUR_IDS.map((id) => ({ lang, id })));
}

const tourFor = (lang, id) => toursFor(lang).find((x) => x.id === id);

export async function generateMetadata({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const tour = tourFor(lang, params.id);
  const path = `/tour/${params.id}`;
  if (!tour) return { title: 'China Tour | Finuo', alternates: alternatesFor(lang, path) };

  // Chinese keeps the bilingual title it already ranks with.
  const title = lang === 'zh' ? `${tour.enName} ${tour.title} | Finuo` : `${tour.title} | Finuo`;
  const joiner = lang === 'zh' ? '' : ' ';
  const description = clip(`${tour.summary}${joiner}${tour.price}. ${bookedBy(lang)}`, lang);

  return {
    title,
    description,
    alternates: alternatesFor(lang, path),
    openGraph: ogFor(lang, path, title, description, 'article', ogImage('tour', params.id)),
  };
}

export default function Page({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const tour = tourFor(lang, params.id);
  const url = `${BASE}${localizedPath(lang, `/tour/${params.id}`)}`;
  const price = tour && priceValue(tour.price);

  const ld = tour && [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: lang === 'zh' ? `${tour.title} ${tour.enName}` : tour.title,
      description: tour.summary,
      url,
      inLanguage: lang,
      touristType: ['Cultural tourism', 'Sightseeing'],
      provider: { '@type': 'TravelAgency', name: 'Finuo Oy', url: BASE },
      ...(tour.days.length
        ? {
            itinerary: {
              '@type': 'ItemList',
              numberOfItems: tour.days.length,
              itemListElement: tour.days.map((name, i) => ({ '@type': 'ListItem', position: i + 1, name })),
            },
          }
        : {}),
      ...(price
        ? {
            offers: {
              '@type': 'Offer', price, priceCurrency: 'CNY',
              availability: 'https://schema.org/InStock', url,
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Finuo', item: `${BASE}${localizedPath(lang, '/')}` },
        { '@type': 'ListItem', position: 2, name: tour.title, item: url },
      ],
    },
  ];

  return (
    <>
      {ld && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      )}
      <TourClient id={params.id} lang={lang} />
    </>
  );
}
