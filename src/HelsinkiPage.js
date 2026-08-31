'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { SectionHeader, FullBleedImage } from './components_shared/sections';
import { GOLD, CREAM, DIM } from './components_shared/landingSections';
import { HelsinkiAttractionsBlock, DayTripsBlock, DiningBlock } from './components_shared/helsinkiBlocks';
import { ContactSection } from './components_shared/AboutContact';
import Footer from './components_shared/Footer';

export const HELSINKI_SECTIONS = ['attractions', 'day-trips', 'restaurants'];

const SECTION_KEYS = {
  attractions: { title: 'tourism.finland.helsinki', desc: 'tourism.finland.helsinkiDesc' },
  'day-trips': { title: 'tourism.finland.dayTrips', desc: 'tourism.finland.dayTripsDesc' },
  restaurants: { title: 'tourism.finland.dining', desc: 'tourism.finland.diningDesc' },
};

const HEADERS = {
  attractions: '/images/helsinki/helsinki-cathedral.png',
  'day-trips': '/images/helsinki/porvoo.jpg',
  restaurants: '/images/helsinki/loyly.jpg',
};

/**
 * Standalone Helsinki guide. This content used to exist only inside the
 * landing page's Finland tab, where it had no URL of its own to rank for
 * "things to do in Helsinki", "day trips from Helsinki" or Chinese
 * restaurants in Helsinki.
 */
export default function HelsinkiPage({ section }) {
  const { t, i18n } = useTranslation();
  const prefix = i18n.language && i18n.language !== 'zh' ? `/${i18n.language}` : '';
  const keys = SECTION_KEYS[section];
  const others = HELSINKI_SECTIONS.filter((s) => s !== section);

  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('tourism.finland.title')}
            title={t(keys.title)}
            subtitle={t(keys.desc)}
          />
        </Container>
      </Box>

      <FullBleedImage image={HEADERS[section]} alt={t(keys.title)} height={{ xs: 220, md: 340 }} />

      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          {section === 'attractions' && <HelsinkiAttractionsBlock heading={false} />}
          {section === 'day-trips' && <DayTripsBlock heading={false} />}
          {section === 'restaurants' && <DiningBlock heading={false} />}
        </Container>
      </Box>

      {/* Internal links: the other guides and the Finland hub */}
      <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 2, md: 4 }, bgcolor: '#0A0A0A' }}>
        <Container maxWidth="xl" disableGutters>
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
            {t('tourism.otherDestinations')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 3, md: 6 } }}>
            {others.map((s) => (
              <Typography
                key={s}
                component="a"
                href={`${prefix}/helsinki/${s}`}
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: '1.4rem', md: '1.8rem' },
                  color: CREAM, textDecoration: 'none',
                  transition: 'color 0.3s ease', '&:hover': { color: GOLD },
                }}
              >
                {t(SECTION_KEYS[s].title)}
              </Typography>
            ))}
            <Typography
              component="a"
              href={`${prefix}/nordic/finland`}
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: '1.4rem', md: '1.8rem' },
                color: CREAM, textDecoration: 'none',
                transition: 'color 0.3s ease', '&:hover': { color: GOLD },
              }}
            >
              {t('tourism.finland.title')}
            </Typography>
          </Box>
          <Typography sx={{ color: DIM, fontSize: '0.9rem', mt: 4 }}>
            <Typography component="a" href={prefix || '/'} sx={{ color: DIM, textDecoration: 'underline', '&:hover': { color: GOLD } }}>
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
