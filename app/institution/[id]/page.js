import InstitutionClient from './InstitutionClient';
import { BASE, INSTITUTIONS, INSTITUTION_IDS, clip } from '../../seo';

export function generateStaticParams() {
  return INSTITUTION_IDS.map((id) => ({ id }));
}

const institutionFor = (id) => INSTITUTIONS.find((i) => i.id === id);

export async function generateMetadata({ params }) {
  const inst = institutionFor(params.id);
  if (!inst) {
    return {
      title: 'Finnish Institution | Finuo Education 芬诺留学',
      alternates: { canonical: `/institution/${params.id}` },
    };
  }

  // Every institution used to share one title, so the nine pages competed as
  // duplicates. Name-led titles let each rank for its own school.
  const title = `${inst.zhName} ${inst.enName} | Finuo 芬诺芬兰留学`;
  const description = clip(`${inst.zhDesc}。${inst.zhIntro}`, 88);
  const url = `/institution/${inst.id}`;

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
  const inst = institutionFor(params.id);
  const url = `${BASE}/institution/${params.id}`;

  const ld = inst && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Finuo 芬诺', item: BASE },
      { '@type': 'ListItem', position: 2, name: '芬兰留学教育', item: `${BASE}/education` },
      { '@type': 'ListItem', position: 3, name: inst.zhName, item: url },
    ],
  };

  return (
    <>
      {ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      )}
      <InstitutionClient id={params.id} />
    </>
  );
}
