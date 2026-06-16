import '../src/index.css';
import Script from 'next/script';
import Providers from './Providers';
import NavBar from './NavBar';
import ChatWidget from '../src/components_shared/ChatWidget';

const GA_ID = 'G-TPTK4RZE3D';

const DESC =
  'Finuo is a Helsinki-based travel agency in Finland offering Nordic tours, Finland aurora trips, '
  + 'study-abroad consulting and MICE event services. 芬诺 — 芬兰本地的旅行社与中欧桥梁，提供北欧旅游、留学教育与会议会展服务。'
  + 'Trilingual team (Chinese / English / Finnish).';

export const metadata = {
  metadataBase: new URL('https://finuo.fi'),
  title: 'Finuo · Travel Agency in Finland — Nordic Tours, Education & Events | 芬诺芬兰 北欧旅游',
  description: DESC,
  authors: [{ name: 'Finuo Oy' }],
  alternates: { canonical: '/' },
  manifest: '/manifest.json',
  icons: { icon: '/favicon.ico', apple: '/logo192.png' },
  openGraph: {
    title: 'Finuo · Travel Agency in Finland — Nordic Tours, Education, Events',
    description: 'Helsinki-based travel agency offering Nordic tours, aurora trips, study-abroad consulting, and MICE services. 芬兰本地旅行社。',
    url: 'https://finuo.fi/',
    siteName: 'Finuo',
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    images: ['/images/destinations/aurora.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finuo · 芬诺芬兰 — 北欧旅游、教育、会议会展',
    description: '芬兰本地的中欧桥梁。Nordic travel, education, and MICE.',
    images: ['/images/destinations/aurora.jpg'],
  },
};

export const viewport = { themeColor: '#0D0D0D' };

const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Finuo Oy',
  alternateName: ['芬诺', 'Finuo'],
  url: 'https://finuo.fi',
  logo: 'https://finuo.fi/images/finuo_logo.svg',
  image: 'https://finuo.fi/images/destinations/aurora.jpg',
  description: 'Finland-based travel, study-abroad and MICE consultancy bridging China and Northern Europe.',
  address: { '@type': 'PostalAddress', addressLocality: 'Helsinki', addressCountry: 'FI' },
  areaServed: ['FI', 'NO', 'SE', 'DK', 'IS', 'CN'],
  knowsLanguage: ['zh', 'en', 'fi'],
  email: 'booking@finuo.fi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
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
        <Providers>
          <NavBar />
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
