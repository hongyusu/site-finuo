'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import NordicCountry, { COUNTRY_IDS } from './components_shared/NordicCountry';
import { SectionHeader } from './components_shared/sections';
import { GOLD, CREAM, DIM } from './components_shared/landingSections';
import { ContactSection } from './components_shared/AboutContact';
import Footer from './components_shared/Footer';

const BOOKING_URL = 'https://travel.finuo.fi/search?vendor_id=14';

/**
 * Standalone page for one Nordic country. The landing page only server-renders
 * whichever country tab is active, so these pages are what actually gets
 * indexed for "Norway fjords", "Iceland ring road", 芬兰极光 and so on.
 */
export default function NordicCountryPage({ country }) {
  const { t, i18n } = useTranslation();
  const others = COUNTRY_IDS.filter((c) => c !== country);
  // Chinese lives at the bare paths; the other languages are prefixed.
  const langPrefix = i18n.language && i18n.language !== 'zh' ? `/${i18n.language}` : '';

  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('tourism.regions')}
            title={t(`tourism.${country}.title`)}
            subtitle={t(`tourism.${country}.subtitle`)}
          />
        </Container>
      </Box>

      <NordicCountry
        country={country}
        compact
        footer={
          <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(245,242,237,0.08)' }}>
            <Typography
              component="a"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-block',
                px: 4, py: 1.5,
                border: `1px solid ${GOLD}`,
                color: GOLD,
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                '&:hover': { bgcolor: GOLD, color: '#0D0D0D' },
              }}
            >
              {t('tourism.countryPageCta')}
            </Typography>
          </Box>
        }
      />

      {/* Internal links so every country page reaches the other three */}
      <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 2, md: 4 }, bgcolor: '#0A0A0A' }}>
        <Container maxWidth="xl" disableGutters>
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
            {t('tourism.otherDestinations')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 3, md: 6 } }}>
            {others.map((c) => (
              <Typography
                key={c}
                component="a"
                href={`${langPrefix}/nordic/${c}`}
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  color: CREAM,
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: GOLD },
                }}
              >
                {t(`tourism.${c}.title`)}
              </Typography>
            ))}
          </Box>
          <Typography sx={{ color: DIM, fontSize: '0.9rem', mt: 4 }}>
            <Typography component="a" href={langPrefix || '/'} sx={{ color: DIM, textDecoration: 'underline', '&:hover': { color: GOLD } }}>
              Finuo · {t('tourism.nordicTitle')}
            </Typography>
          </Typography>
        </Container>
      </Box>

      <ContactSection />
      <Footer />
    </Box>
  );
}
