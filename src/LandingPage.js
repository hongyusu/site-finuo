'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import FAQ from './components_shared/FAQ';
import Footer from './components_shared/Footer';
import {
  Statement,
  SectionHeader,
  FullBleedImage,
} from './components_shared/sections';
import { AboutSection, ContactSection } from './components_shared/AboutContact';
import TestimonialsMarquee from './components_shared/TestimonialsMarquee';
import {
  GOLD, CREAM, DIM,
  AnhuiTours, ChinaGuide, ServiceStandards, ForumBlock, NordicTabs,
} from './components_shared/landingSections';
import NordicCountry from './components_shared/NordicCountry';

// All imagery is self-hosted under /public/images (no external CDN dependency).

// Hero panels for each country: image used at the top of each section
const NORDIC_HEADER = '/images/destinations/aurora.jpg';
const CHINA_HEADER = '/images/anhui/huangshan-3.jpeg';

const TOUR_REGIONS = {
  huangshan: 'anhui',
  huizhou: 'anhui',
  qiyun: 'anhui',
  anhui: 'anhui',
  suzhou: 'jiangzhe',
  hangzhou: 'jiangzhe',
  'suzhou-hangzhou': 'jiangzhe',
  shanghai: 'shanghai',
};

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  // Chinese lives at the bare paths; the other languages are prefixed.
  const langPrefix = i18n.language && i18n.language !== 'zh' ? `/${i18n.language}` : '';
  const [activeCountry, setActiveCountry] = React.useState('finland');
  const [activeRegion, setActiveRegion] = React.useState('anhui');
  const [expandedTour, setExpandedTour] = React.useState('huangshan');
  const anhuiToursRaw = t('tourism.china.anhuiTours', { returnObjects: true }) || [];
  const anhuiLabels = t('tourism.china.anhuiLabels', { returnObjects: true }) || {};
  const anhuiTours = anhuiToursRaw.map((tour) => ({
    ...tour,
    eyebrow: anhuiLabels.eyebrow,
    expandLabel: anhuiLabels.expandLabel,
    hideLabel: anhuiLabels.hideLabel,
    detailLabel: anhuiLabels.detailLabel,
  }));
  const anhuiServiceItems = t('tourism.china.anhuiServiceItems', { returnObjects: true }) || [];
  const regionTabs = t('tourism.china.regionTabs', { returnObjects: true }) || [];
  const guideItems = t('tourism.china.guide.items', { returnObjects: true }) || [];
  const regionTours = anhuiTours.filter((tour) => TOUR_REGIONS[tour.id] === activeRegion);
  const switchRegion = (key) => {
    setActiveRegion(key);
    const first = anhuiTours.find((tour) => TOUR_REGIONS[tour.id] === key);
    setExpandedTour(first ? first.id : null);
  };
  const anhuiHeroImages = {
    huangshan: '/images/anhui/huangshan-3.jpeg',          // Huangshan peaks
    huizhou: '/images/anhui/huizhou-6.jpeg',               // Huizhou ancient gateway
    qiyun: '/images/anhui/qiyun-3.jpeg',                   // Qiyun Danxia rock
    anhui: '/images/anhui/anhui-2.jpeg',                   // Jingchuan river
    suzhou: '/images/anhui/suzhou-4.jpeg',                 // Suzhou Humble Admin garden
    hangzhou: '/images/anhui/hangzhou-9.jpeg',             // West Lake peach blossom
    'suzhou-hangzhou': '/images/anhui/hangzhou-5.jpeg',    // Wuzhen waterway
    shanghai: '/images/anhui/shanghai-18.jpeg',            // Shanghai night skyline
  };

  const forumTags = t('tourism.china.forum.tags', { returnObjects: true }) || [];

  const testimonials = t('testimonials.experience', { returnObjects: true }) || [];

  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      {/* 1. Cinematic Video Hero */}
      <Hero />

      {/* 2. Tourism Intro Statement */}
      <Statement text={t('tourism.intro')} light />

      {/* 3. NORDIC SECTION HEADER */}
      <Box id="nordic" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('tourism.regions')}
            title={t('tourism.nordicTitle')}
            subtitle={t('tourism.nordicSubtitle')}
          />
        </Container>
      </Box>
      <FullBleedImage image={NORDIC_HEADER} alt="Nordic landscape" height={{ xs: 250, md: 380 }} />

      {/* 4. NORDIC COUNTRY TABS — click to switch */}
      <NordicTabs
        active={activeCountry}
        onChange={(c) => {
          setActiveCountry(c);
          setTimeout(() => {
            const el = document.getElementById(c);
            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
          }, 50);
        }}
        labels={[
          { key: 'finland', num: '01', label: t('tourism.finland.title') },
          { key: 'norway',  num: '02', label: t('tourism.norway.title') },
          { key: 'iceland', num: '03', label: t('tourism.iceland.title') },
          { key: 'denmark', num: '04', label: t('tourism.denmark.title') },
        ]}
      />

      {/* 4b. ACTIVE COUNTRY CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCountry}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <NordicCountry
            country={activeCountry}
            footer={
              <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(245,242,237,0.08)' }}>
                <Typography
                  component="a"
                  href={`${langPrefix}/nordic/${activeCountry}`}
                  sx={{
                    color: GOLD,
                    fontSize: '0.9rem',
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {t('tourism.fullGuide')} →
                </Typography>
              </Box>
            }
          />
        </motion.div>
      </AnimatePresence>

      {/* 5. CHINA SECTION HEADER */}
      <Box id="china" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, bgcolor: '#0A0A0A' }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('tourism.regions')}
            title={t('tourism.chinaTitle')}
            subtitle={t('tourism.chinaSubtitle')}
          />
        </Container>
      </Box>
      <FullBleedImage image={CHINA_HEADER} alt="China" height={{ xs: 250, md: 380 }} />

      {/* 6. ANHUI THREE-DAY TOURS — featured product */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('tourism.china.anhuiToursTitle')}
            title={t('tourism.china.anhuiToursSubtitle')}
            subtitle={t('tourism.china.anhuiToursIntro')}
          />
        </Container>
      </Box>

      {/* 6b. REGION TABS — click a province/city to see its itineraries */}
      <NordicTabs
        active={activeRegion}
        onChange={switchRegion}
        labels={regionTabs.map((r, i) => ({
          key: r.key,
          num: String(i + 1).padStart(2, '0'),
          label: r.label,
        }))}
      />
      <Box sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {regionTours.length > 0 ? (
                <AnhuiTours
                  tours={regionTours}
                  images={anhuiHeroImages}
                  expanded={expandedTour}
                  onToggle={setExpandedTour}
                />
              ) : (
                <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center', border: '1px solid rgba(245,242,237,0.08)', bgcolor: '#0F0F0F' }}>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.4rem', md: '1.8rem' }, color: CREAM, mb: 1.5 }}>
                    {regionTabs.find((r) => r.key === activeRegion)?.label}
                  </Typography>
                  <Typography sx={{ color: DIM, fontSize: '0.95rem' }}>
                    {t('tourism.china.regionComingSoon')}
                  </Typography>
                </Box>
              )}
            </motion.div>
          </AnimatePresence>
          <ServiceStandards
            title={t('tourism.china.anhuiServiceTitle')}
            items={anhuiServiceItems}
          />
        </Container>
      </Box>

      {/* 6c. CHINA TRAVEL GUIDE for international visitors */}
      <ChinaGuide
        title={t('tourism.china.guide.title')}
        subtitle={t('tourism.china.guide.subtitle')}
        intro={t('tourism.china.guide.intro')}
        items={guideItems}
      />

      {/* 7. FORUM */}
      <ForumBlock
        title={t('tourism.china.forum.title')}
        subtitle={t('tourism.china.forum.subtitle')}
        intro={t('tourism.china.forum.intro')}
        tags={forumTags}
      />

      {/* 8. Testimonials marquee */}
      <TestimonialsMarquee title={t('testimonials.title')} items={testimonials} direction="left" />

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. About */}
      <AboutSection />

      {/* 11. Contact */}
      <ContactSection />

      {/* 12. Footer */}
      <Footer />

      {/* Restaurant detail modal — Google Maps + full info */}
    </Box>
  );
}
