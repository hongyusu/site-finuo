import LandingPageMice from '../../../src/LandingPageMice';
import { LANGS, SITE_META, alternatesFor, ogFor } from '../../seo';

export async function generateMetadata({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const meta = SITE_META[lang].mice;
  return {
    title: meta.title,
    description: meta.description,
    alternates: alternatesFor(lang, '/mice'),
    openGraph: ogFor(lang, '/mice', meta.title, meta.description),
  };
}

export default function Page() {
  return <LandingPageMice />;
}
