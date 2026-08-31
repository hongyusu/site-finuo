import LandingPage from '../src/LandingPage';
import { faqLd } from './seo';

export const metadata = {
  title: 'Finuo · Nordic & China Travel — Aurora Trips, Fjords, Curated China Tours | 芬诺旅游',
  description:
    'Helsinki-based travel agency: Finland aurora trips, Norway fjords, Iceland, Denmark, and 8 curated 3-day China tours. 北欧旅游与江南八条精选三日游。',
  alternates: { canonical: '/' },
};

export default function Page() {
  const faq = faqLd();
  return (
    <>
      {faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      )}
      <LandingPage />
    </>
  );
}
