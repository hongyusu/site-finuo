import LandingPage1 from '../../../src/LandingPage1';
import { LANGS, SITE_META, alternatesFor, faqLd, ogFor } from '../../seo';

export async function generateMetadata({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const meta = SITE_META[lang].education;
  return {
    title: meta.title,
    description: meta.description,
    alternates: alternatesFor(lang, '/education'),
    openGraph: ogFor(lang, '/education', meta.title, meta.description),
  };
}

export default function Page({ params }) {
  const faq = faqLd(params.lang);
  return (
    <>
      {faq && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      )}
      <LandingPage1 />
    </>
  );
}
