import TourClient from './TourClient';
import { BASE, TOURS, TOUR_IDS, clip, priceValue } from '../../seo';

export function generateStaticParams() {
  return TOUR_IDS.map((id) => ({ id }));
}

const tourFor = (id) => TOURS.find((t) => t.id === id);

export async function generateMetadata({ params }) {
  const tour = tourFor(params.id);
  if (!tour) return { title: 'China Tour | Finuo', alternates: { canonical: `/tour/${params.id}` } };

  const title = `${tour.enTitle} ${tour.zhTitle} | Finuo`;
  const description = clip(`${tour.zhSummary}${tour.price}。芬兰本地旅行社 Finuo 芬诺定制。`, 88);
  const url = `/tour/${tour.id}`;

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
  const tour = tourFor(params.id);
  const url = `${BASE}/tour/${params.id}`;
  const price = tour && priceValue(tour.price);

  // Structured data mirrors what the page actually renders (Chinese by
  // default, which is the version Google indexes).
  const ld = tour && [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: `${tour.zhTitle} ${tour.enTitle}`,
      description: tour.zhSummary,
      url,
      touristType: ['Cultural tourism', 'Sightseeing'],
      provider: {
        '@type': 'TravelAgency',
        name: 'Finuo Oy',
        url: BASE,
      },
      ...(tour.days.length
        ? {
            itinerary: {
              '@type': 'ItemList',
              numberOfItems: tour.days.length,
              itemListElement: tour.days.map((name, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name,
              })),
            },
          }
        : {}),
      ...(price
        ? {
            offers: {
              '@type': 'Offer',
              price,
              priceCurrency: 'CNY',
              availability: 'https://schema.org/InStock',
              url,
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Finuo 芬诺', item: BASE },
        { '@type': 'ListItem', position: 2, name: tour.zhTitle, item: url },
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
      <TourClient id={params.id} />
    </>
  );
}
