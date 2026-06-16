import InstitutionClient from './InstitutionClient';

// Kept in sync with INSTITUTION_HEROES in src/InstitutionDetailPage.js.
const INSTITUTION_IDS = [
  'heureka', 'kisakallio', 'kuortane', 'helsinki', 'aalto',
  'haagahelia', 'lab', 'jyvaskyla', 'turku',
];

export function generateStaticParams() {
  return INSTITUTION_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  return {
    title: 'Finnish Institution | Finuo Education 芬诺留学',
    alternates: { canonical: `/institution/${params.id}` },
  };
}

export default function Page({ params }) {
  return <InstitutionClient id={params.id} />;
}
