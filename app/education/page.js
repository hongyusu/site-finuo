import LandingPage1 from '../../src/LandingPage1';
import { faqLd } from '../seo';

export const metadata = {
  title: 'Finuo · Study Abroad in Finland — Universities, Training, Study Tours | 芬诺留学教育',
  description:
    'Study-abroad consulting in Finland: University of Helsinki, Aalto, Haaga-Helia, Jyväskylä, Turku, plus teacher/student training and Nordic study tours. 芬兰留学与北欧研学。',
  alternates: { canonical: '/education' },
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
      <LandingPage1 />
    </>
  );
}
