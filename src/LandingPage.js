import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import {
  fadeIn,
  stagger,
  Statement,
  SectionHeader,
  MediaCard,
  ListBlock,
  CountrySection,
  FullBleedImage,
} from './components_shared/sections';
import { AboutSection, ContactSection } from './components_shared/AboutContact';

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';
const DIM = 'rgba(245,242,237,0.5)';

// External Unsplash photos for sections we don't have local images for.
// Subjects verified against the actual photo content.
const EXT = {
  // Verified-correct (from contact-sheet review)
  beijing: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1600&auto=format&fit=crop&q=80',     // Forbidden City ✓
  shanghai: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=1600&auto=format&fit=crop&q=80',  // Shanghai skyline ✓
  norwayCoast: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80', // Mountains/sunset (Norway-fitting) ✓
  silkRoad: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1600&auto=format&fit=crop&q=80',  // Mosque/Islamic arch — fits Silk Road ✓
  // East-Asian aesthetic stand-ins (verified Asian content even if not specifically the city)
  pagoda: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&auto=format&fit=crop&q=80',      // Kyoto pagoda + city sunset → Hangzhou
  karstSunset: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1600&auto=format&fit=crop&q=80', // Mountain ridges sunset → Guilin
  coastalVillage: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1600&auto=format&fit=crop&q=80', // Mediterranean village → Xiamen/Gulangyu
};

// Hero panels for each country: image used at the top of each section
const NORDIC_HEADER = '/images/destinations/aurora.jpg';
const FINLAND_HEADER = '/images/destinations/cabin.jpg';
const NORWAY_HEADER = '/images/destinations/fjord.jpg';
const ICELAND_HEADER = '/images/destinations/iceland.jpg';
const DENMARK_HEADER = '/images/destinations/lake.jpg';
const CHINA_HEADER = EXT.beijing;

function FinlandActivities({ items }) {
  return (
    <Grid container spacing={2}>
      {items.map((it, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <MediaCard
            index={i}
            image={[
              '/images/destinations/aurora.jpg',
              '/images/destinations/midnight.jpg',
              '/images/destinations/lake.jpg',
              '/images/destinations/forest.jpg',
              '/images/destinations/cabin.jpg',
              '/images/destinations/husky.jpg',
            ][i % 6]}
            title={it.title}
            subtitle={it.desc}
            height={300}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function FinlandHotels({ items }) {
  // All-local Nordic images so subjects are reliably scenic
  const images = [
    '/images/destinations/cabin.jpg',
    '/images/destinations/aurora.jpg',
    '/images/destinations/university.jpg',
    '/images/destinations/midnight.jpg',
    '/images/destinations/lake.jpg',
    '/images/destinations/forest.jpg',
  ];
  return (
    <Grid container spacing={2}>
      {items.map((h, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <MediaCard
            index={i}
            image={images[i % images.length]}
            title={h.name}
            subtitle={h.desc}
            meta={h.type}
            height={300}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function ChinaItineraries({ items, images }) {
  return (
    <Grid container spacing={2}>
      {items.map((it, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <MediaCard
            index={i}
            image={images[i % images.length]}
            title={it.name}
            subtitle={it.desc}
            meta={it.route}
            height={280}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function CountryRoutesGrid({ items, images, height = 240 }) {
  return (
    <Grid container spacing={2}>
      {items.map((it, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <MediaCard
            index={i}
            image={images[i % images.length]}
            title={it.name}
            subtitle={it.desc}
            height={height}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function ChinaCities({ cities, images }) {
  return (
    <Grid container spacing={2}>
      {cities.map((c, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <MediaCard
            index={i}
            image={images[i % images.length]}
            title={c.name}
            subtitle={c.desc}
            height={280}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function ForumBlock({ title, subtitle, intro, tags }) {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, bgcolor: '#141414' }}>
      <Container maxWidth="md">
        <Box component={motion.div} {...fadeIn} sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="h2" sx={{ color: CREAM, mb: 3 }}>
            {subtitle}
          </Typography>
          <Typography sx={{ color: DIM, fontSize: '1rem', lineHeight: 1.8, mb: 5, maxWidth: 600, mx: 'auto' }}>
            {intro}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            {tags.map((tag, i) => (
              <Box
                key={i}
                component={motion.div}
                {...stagger(i)}
                sx={{
                  px: 3, py: 1.2,
                  border: '1px solid rgba(245,242,237,0.15)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  color: DIM,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': { borderColor: GOLD, color: GOLD },
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function BigTestimonial({ quote, name, role }) {
  return (
    <Box id="testimonials" sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 8 }, maxWidth: 1000, mx: 'auto', textAlign: 'center' }}>
      <Box component={motion.div} {...fadeIn}>
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 4 }}>
          Testimonial
        </Typography>
        <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.5rem', md: '2.2rem' }, fontStyle: 'italic', fontWeight: 300, color: CREAM, lineHeight: 1.5, mb: 4 }}>
          "{quote}"
        </Typography>
        <Typography sx={{ color: DIM, fontSize: '0.85rem' }}>
          {name} — <span style={{ fontStyle: 'italic' }}>{role}</span>
        </Typography>
      </Box>
    </Box>
  );
}

function NordicTabs({ active, onChange, labels }) {
  return (
    <Box sx={{ mb: 4, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{
          display: 'flex',
          gap: { xs: 0, md: 1 },
          borderTop: '1px solid rgba(245,242,237,0.08)',
          borderBottom: '1px solid rgba(245,242,237,0.08)',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}>
          {labels.map((it, i) => (
            <Box
              key={it.key}
              onClick={() => onChange(it.key)}
              sx={{
                flex: 1,
                minWidth: { xs: '50%', md: 'auto' },
                py: { xs: 2, md: 3 },
                px: 2,
                cursor: 'pointer',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(245,242,237,0.08)',
                borderBottom: { xs: i < labels.length - 1 ? '1px solid rgba(245,242,237,0.08)' : 'none', md: 'none' },
                bgcolor: active === it.key ? 'rgba(196,163,90,0.06)' : 'transparent',
                transition: 'all 0.3s ease',
                position: 'relative',
                '&:hover': { bgcolor: 'rgba(196,163,90,0.04)' },
                '&::after': active === it.key ? {
                  content: '""',
                  position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, bgcolor: GOLD,
                } : {},
              }}
            >
              <Typography sx={{
                fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: active === it.key ? GOLD : 'rgba(245,242,237,0.4)',
                mb: 0.5,
              }}>
                {it.num}
              </Typography>
              <Typography sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: '1.3rem', md: '1.7rem' },
                color: active === it.key ? CREAM : 'rgba(245,242,237,0.6)',
                lineHeight: 1.1,
              }}>
                {it.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default function LandingPage() {
  const { t } = useTranslation();
  const [activeCountry, setActiveCountry] = React.useState('finland');

  const finlandExperiences = t('tourism.finland.experiences', { returnObjects: true }) || [];
  const finlandHotels = t('tourism.finland.hotelsItems', { returnObjects: true }) || [];
  const norwayRoutes = t('tourism.norway.routesItems', { returnObjects: true }) || [];
  const norwayActs = t('tourism.norway.activitiesItems', { returnObjects: true }) || [];
  const icelandRoutes = t('tourism.iceland.routesItems', { returnObjects: true }) || [];
  const icelandActs = t('tourism.iceland.activitiesItems', { returnObjects: true }) || [];
  const denmarkRoutes = t('tourism.denmark.routesItems', { returnObjects: true }) || [];
  const chinaCities = t('tourism.china.cities', { returnObjects: true }) || [];
  const chinaItineraries = t('tourism.china.itinerariesItems', { returnObjects: true }) || [];
  const forumTags = t('tourism.china.forum.tags', { returnObjects: true }) || [];

  const norwayImages = [EXT.norwayCoast, '/images/destinations/fjord.jpg', '/images/destinations/aurora.jpg', '/images/destinations/midnight.jpg', '/images/destinations/lake.jpg', '/images/destinations/forest.jpg'];
  const icelandImages = ['/images/destinations/iceland.jpg', '/images/destinations/forest.jpg', '/images/destinations/lake.jpg'];
  const denmarkImages = ['/images/destinations/lake.jpg', '/images/destinations/iceland.jpg', '/images/destinations/cabin.jpg'];
  // China cities: photos for cities with verified-correct or visually-fitting
  // East-Asian images. Cities without a good photo get a typography-only card
  // (Xi'an, Chengdu, Lijiang) — better than a wrong-subject photo.
  // Order matches zh.json: Beijing, Shanghai, Xi'an, Chengdu, Hangzhou, Guilin, Lijiang, Xiamen
  const chinaImages = [
    EXT.beijing,         // Beijing — Forbidden City ✓
    EXT.shanghai,        // Shanghai — skyline ✓
    null,                // Xi'an — typography card
    null,                // Chengdu — typography card
    EXT.pagoda,          // Hangzhou — Kyoto pagoda+city (Asian temple feel)
    EXT.karstSunset,     // Guilin — mountain ridges sunset (karst-like)
    null,                // Lijiang — typography card
    EXT.coastalVillage,  // Xiamen — Mediterranean village (Gulangyu-like)
  ];
  // Itineraries: West gets verified mosque (Silk Road); others typography-only.
  const itineraryImages = [null, null, EXT.silkRoad, EXT.silkRoad];

  const testimonials = t('testimonials.experience', { returnObjects: true }) || [];
  const firstTestimonial = testimonials[0] || {};

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
          {activeCountry === 'finland' && (
            <CountrySection
              id="finland"
              eyebrow="01 — Finland"
              title={t('tourism.finland.title')}
              intro={t('tourism.finland.intro')}
              image={FINLAND_HEADER}
            >
              <Box sx={{ mb: 8 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
                  {t('tourism.finland.hotels')}
                </Typography>
                <Typography sx={{ color: DIM, fontSize: '0.95rem', mb: 4, maxWidth: 700 }}>
                  {t('tourism.finland.hotelsDesc')}
                </Typography>
                <FinlandHotels items={finlandHotels} />
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
                  {t('tourism.finland.activities')}
                </Typography>
                <Typography sx={{ color: DIM, fontSize: '0.95rem', mb: 4 }}>
                  {t('tourism.finland.activitiesDesc')}
                </Typography>
                <FinlandActivities items={finlandExperiences} />
              </Box>
            </CountrySection>
          )}

          {activeCountry === 'norway' && (
            <CountrySection
              id="norway"
              eyebrow="02 — Norway"
              title={t('tourism.norway.title')}
              intro={t('tourism.norway.intro')}
              image={NORWAY_HEADER}
            >
              <Box sx={{ mb: 6 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
                  {t('tourism.norway.routes')}
                </Typography>
                <CountryRoutesGrid items={norwayRoutes} images={norwayImages} height={220} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
                  {t('tourism.norway.activities')}
                </Typography>
                <ListBlock items={norwayActs} columns={3} />
              </Box>
            </CountrySection>
          )}

          {activeCountry === 'iceland' && (
            <CountrySection
              id="iceland"
              eyebrow="03 — Iceland"
              title={t('tourism.iceland.title')}
              intro={t('tourism.iceland.intro')}
              image={ICELAND_HEADER}
            >
              <Box sx={{ mb: 6 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
                  {t('tourism.iceland.routes')}
                </Typography>
                <CountryRoutesGrid items={icelandRoutes} images={icelandImages} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
                  {t('tourism.iceland.activities')}
                </Typography>
                <ListBlock items={icelandActs} columns={3} />
              </Box>
            </CountrySection>
          )}

          {activeCountry === 'denmark' && (
            <CountrySection
              id="denmark"
              eyebrow="04 — Denmark"
              title={t('tourism.denmark.title')}
              intro={t('tourism.denmark.intro')}
              image={DENMARK_HEADER}
            >
              <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
                {t('tourism.denmark.routes')}
              </Typography>
              <CountryRoutesGrid items={denmarkRoutes} images={denmarkImages} />
            </CountrySection>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 8. CHINA SECTION HEADER */}
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

      {/* 9. CHINA CITIES */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader eyebrow="China · Cities" title={t('tourism.china.citiesTitle')} subtitle={t('tourism.china.intro')} />
          <ChinaCities cities={chinaCities} images={chinaImages} />
        </Container>
      </Box>

      {/* 9b. CHINA ITINERARIES */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader eyebrow="China · Routes" title={t('tourism.china.itineraries')} subtitle={t('tourism.china.itinerariesIntro')} />
          <ChinaItineraries items={chinaItineraries} images={itineraryImages} />
        </Container>
      </Box>

      {/* 10. FORUM */}
      <ForumBlock
        title={t('tourism.china.forum.title')}
        subtitle={t('tourism.china.forum.subtitle')}
        intro={t('tourism.china.forum.intro')}
        tags={forumTags}
      />

      {/* 11. Big Testimonial */}
      <BigTestimonial
        quote={firstTestimonial.testimonial || "The Northern Lights trip was beyond magical."}
        name={firstTestimonial.name || "Elsa Nygard"}
        role={firstTestimonial.occupation || "Adventure Photographer"}
      />

      {/* 12. FAQ */}
      <FAQ />

      {/* 13. About */}
      <AboutSection />

      {/* 14. Contact */}
      <ContactSection />

      {/* 15. Footer */}
      <Footer />
    </Box>
  );
}
