import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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

export default function LandingPage() {
  const { t } = useTranslation();

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
  // China cities: only Beijing & Shanghai have verified-correct external photos.
  // Others use null → typography-only card (better than wrong-subject photo).
  const chinaImages = [EXT.beijing, EXT.shanghai, null, null, null, null, null, null];
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

      {/* 4. FINLAND DEEP DIVE */}
      <CountrySection
        id="finland"
        eyebrow="01 — Finland"
        title={t('tourism.finland.title')}
        intro={t('tourism.finland.intro')}
        image={FINLAND_HEADER}
      >
        {/* Hotels block */}
        <Box sx={{ mb: 8 }}>
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
            {t('tourism.finland.hotels')}
          </Typography>
          <Typography sx={{ color: DIM, fontSize: '0.95rem', mb: 4, maxWidth: 700 }}>
            {t('tourism.finland.hotelsDesc')}
          </Typography>
          <FinlandHotels items={finlandHotels} ext={EXT} />
        </Box>
        {/* Activities block */}
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

      {/* 5. NORWAY */}
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

      {/* 6. ICELAND */}
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

      {/* 7. DENMARK / FAROE / GREENLAND */}
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
