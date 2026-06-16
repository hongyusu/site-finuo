import TourClient from './TourClient';

const TOUR_NAMES = {
  huangshan: 'Huangshan (Yellow Mountain) 3-Day Tour 黄山三日游',
  huizhou: 'Huizhou Ancient Villages 3-Day Tour 徽州三日游',
  qiyun: 'Mount Qiyun 3-Day Tour 齐云山三日游',
  anhui: 'Southern Anhui & Jingchuan 3-Day Tour 皖南泾川三日游',
  suzhou: 'Suzhou Classical Gardens 3-Day Tour 苏州三日游',
  hangzhou: 'Hangzhou West Lake 3-Day Tour 杭州三日游',
  'suzhou-hangzhou': 'Suzhou & Hangzhou 3-Day Tour 苏杭三日游',
  shanghai: 'Shanghai 3-Day Itinerary 上海三日游',
};

export function generateStaticParams() {
  return Object.keys(TOUR_NAMES).map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const name = TOUR_NAMES[params.id];
  const title = name ? `${name} | Finuo` : 'China Tour | Finuo';
  return { title, alternates: { canonical: `/tour/${params.id}` } };
}

export default function Page({ params }) {
  return <TourClient id={params.id} />;
}
