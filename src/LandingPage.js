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
// Stable CDN URLs — replace with our own when available.
const EXT = {
  lofoten: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=1600&auto=format&fit=crop&q=80',
  norwayCoast: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80',
  faroe: 'https://images.unsplash.com/photo-1554435517-50bbd02fc9bf?w=1600&auto=format&fit=crop&q=80',
  greenland: 'https://images.unsplash.com/photo-1601057275065-2bbd80b3afad?w=1600&auto=format&fit=crop&q=80',
  beijing: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1600&auto=format&fit=crop&q=80',
  shanghai: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=1600&auto=format&fit=crop&q=80',
  hk: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600&auto=format&fit=crop&q=80',
  xian: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1600&auto=format&fit=crop&q=80',
  guilin: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&auto=format&fit=crop&q=80',
  chengdu: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1600&auto=format&fit=crop&q=80',
  hangzhou: 'https://images.unsplash.com/photo-1599394022918-6c2776530abb?w=1600&auto=format&fit=crop&q=80',
  lijiang: 'https://images.unsplash.com/photo-1583062091717-a6ec0f0a3d2a?w=1600&auto=format&fit=crop&q=80',
  xiamen: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&auto=format&fit=crop&q=80',
};

// Hero panels for each country: image used at the top of each section
const NORDIC_HEADER = '/images/destinations/aurora.jpg';
const FINLAND_HEADER = '/images/destinations/cabin.jpg';
const NORWAY_HEADER = '/images/destinations/fjord.jpg';
const ICELAND_HEADER = '/images/destinations/iceland.jpg';
const DENMARK_HEADER = EXT.faroe;
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
  const norwayRoutes = t('tourism.norway.routesItems', { returnObjects: true }) || [];
  const norwayActs = t('tourism.norway.activitiesItems', { returnObjects: true }) || [];
  const icelandRoutes = t('tourism.iceland.routesItems', { returnObjects: true }) || [];
  const icelandActs = t('tourism.iceland.activitiesItems', { returnObjects: true }) || [];
  const denmarkRoutes = t('tourism.denmark.routesItems', { returnObjects: true }) || [];
  const chinaCities = t('tourism.china.cities', { returnObjects: true }) || [];
  const forumTags = t('tourism.china.forum.tags', { returnObjects: true }) || [];

  const norwayImages = [EXT.lofoten, EXT.norwayCoast, '/images/destinations/aurora.jpg', '/images/destinations/fjord.jpg', '/images/destinations/midnight.jpg', '/images/destinations/lake.jpg'];
  const icelandImages = ['/images/destinations/iceland.jpg', '/images/destinations/forest.jpg', '/images/destinations/lake.jpg'];
  const denmarkImages = [EXT.greenland, EXT.faroe, '/images/destinations/iceland.jpg'];
  const chinaImages = [EXT.beijing, EXT.shanghai, EXT.xian, EXT.chengdu, EXT.hangzhou, EXT.guilin, EXT.lijiang, EXT.xiamen];

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
