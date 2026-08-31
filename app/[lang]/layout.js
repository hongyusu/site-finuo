import '../../src/index.css';
import Script from 'next/script';
import Providers from '../Providers';
import NavBar from '../NavBar';
import ChatWidget from '../../src/components_shared/ChatWidget';
import { BASE, LANGS, SITE_META, alternatesFor } from '../seo';

const GA_ID = 'G-TPTK4RZE3D';

const HTML_LANG = { zh: 'zh-Hans', en: 'en', fi: 'fi' };

// Only zh/en/fi exist. Without this, /anything renders the Chinese home page
// under lang="anything" and Google gets an unbounded set of soft 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const viewport = { themeColor: '#0D0D0D' };

export async function generateMetadata({ params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';
  const meta = SITE_META[lang].home;

  return {
    metadataBase: new URL(BASE),
    title: meta.title,
    description: meta.description,
    authors: [{ name: 'Finuo Oy' }],
    alternates: alternatesFor(lang, '/'),
    manifest: '/manifest.json',
    icons: { icon: '/favicon.ico', apple: '/logo192.png' },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE}${alternatesFor(lang, '/').canonical}`,
      siteName: 'Finuo',
      type: 'website',
      locale: { zh: 'zh_CN', en: 'en_US', fi: 'fi_FI' }[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => ({ zh: 'zh_CN', en: 'en_US', fi: 'fi_FI' }[l])),
      images: ['/images/destinations/aurora.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/images/destinations/aurora.jpg'],
    },
  };
}

const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Finuo Oy',
  alternateName: ['芬诺', 'Finuo'],
  url: BASE,
  logo: `${BASE}/images/finuo_logo_blue.png`,
  image: `${BASE}/images/destinations/aurora.jpg`,
  description: 'Finland-based travel, study-abroad and MICE consultancy bridging China and Northern Europe.',
  address: { '@type': 'PostalAddress', addressLocality: 'Helsinki', addressCountry: 'FI' },
  areaServed: ['FI', 'NO', 'SE', 'DK', 'IS', 'CN'],
  knowsLanguage: ['zh', 'en', 'fi'],
  email: 'booking@finuo.fi',
  telephone: '+358445820927',
  priceRange: '$$',
};

export default function RootLayout({ children, params }) {
  const lang = LANGS.includes(params.lang) ? params.lang : 'zh';

  return (
    <html lang={HTML_LANG[lang]}>
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
        />
        <Providers lang={lang}>
          <NavBar lang={lang} />
          {children}
          <ChatWidget />
        </Providers>

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
