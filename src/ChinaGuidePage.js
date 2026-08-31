'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { ChinaGuide, GOLD, CREAM, DIM } from './components_shared/landingSections';
import { ContactSection } from './components_shared/AboutContact';
import Footer from './components_shared/Footer';

/** Standalone China practicalities guide (visa, flights, SIM, payments, apps). */
export default function ChinaGuidePage() {
  const { t, i18n } = useTranslation();
  const prefix = i18n.language && i18n.language !== 'zh' ? `/${i18n.language}` : '';
  const items = t('tourism.china.guide.items', { returnObjects: true }) || [];

  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      <Box sx={{ pt: { xs: 10, md: 14 } }} />
      <ChinaGuide
        title={t('tourism.china.guide.title')}
        subtitle={t('tourism.china.guide.subtitle')}
        intro={t('tourism.china.guide.intro')}
        items={items}
      />

      <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
            {t('tourism.china.anhuiToursTitle')}
          </Typography>
          <Typography sx={{ color: DIM, fontSize: '0.95rem', mb: 3, maxWidth: 800 }}>
            {t('tourism.china.anhuiToursIntro')}
          </Typography>
          <Typography
            component="a"
            href={`${prefix}/#china`}
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: '1.4rem', md: '1.8rem' },
              color: CREAM, textDecoration: 'none',
              transition: 'color 0.3s ease', '&:hover': { color: GOLD },
            }}
          >
            {t('tourism.china.subtitle')} →
          </Typography>
        </Container>
      </Box>

      <ContactSection />
      <Footer />
    </Box>
  );
}
