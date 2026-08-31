import InstitutionClient from '../../../institution-client';
import {
  BASE, LANGS, INSTITUTION_IDS, alternatesFor, clip, institutionsFor, localizedPath, ogFor,
} from '../../../seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => INSTITUTION_IDS.map((id) => ({ lang, id })));
}

const institutionFor = (lang, id) => institutionsFor(lang).find((x) => x.id === id);

export async function generateMetadata({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const inst = institutionFor(lang, params.id);
  const path = `/institution/${params.id}`;
  if (!inst) return { title: 'Finnish Institution | Finuo', alternates: alternatesFor(lang, path) };

  const suffix = { zh: 'Finuo 芬诺芬兰留学', en: 'Finuo · Study in Finland', fi: 'Finuo · Opiskelu Suomessa' }[lang];
  const title = `${inst.name} | ${suffix}`;
  const description = clip(`${inst.desc}${lang === 'zh' ? '。' : '. '}${inst.intro}`, lang);

  return {
    title,
    description,
    alternates: alternatesFor(lang, path),
    openGraph: ogFor(lang, path, title, description, 'article'),
  };
}

export default function Page({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const inst = institutionFor(lang, params.id);
  const url = `${BASE}${localizedPath(lang, `/institution/${params.id}`)}`;
  const educationName = { zh: '芬兰留学教育', en: 'Study in Finland', fi: 'Opiskelu Suomessa' }[lang];

  const ld = inst && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Finuo', item: `${BASE}${localizedPath(lang, '/')}` },
      { '@type': 'ListItem', position: 2, name: educationName, item: `${BASE}${localizedPath(lang, '/education')}` },
      { '@type': 'ListItem', position: 3, name: inst.name, item: url },
    ],
  };

  return (
    <>
      {ld && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      )}
      <InstitutionClient id={params.id} lang={lang} />
    </>
  );
}
