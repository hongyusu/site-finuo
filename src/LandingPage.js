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

// External Unsplash photos. China content now uses local Anhui photos
// (extracted from real tour brochures) so no external Chinese images needed.
const EXT = {
  norwayCoast: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80',
};

// Hero panels for each country: image used at the top of each section
const NORDIC_HEADER = '/images/destinations/aurora.jpg';
const FINLAND_HEADER = '/images/destinations/cabin.jpg';
const NORWAY_HEADER = '/images/destinations/fjord.jpg';
const ICELAND_HEADER = '/images/destinations/iceland.jpg';
const DENMARK_HEADER = '/images/destinations/lake.jpg';
const CHINA_HEADER = '/images/anhui/huangshan-3.jpeg';

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

function AnhuiItineraryCard({ tour, image, expanded, onToggle, index }) {
  return (
    <Box
      component={motion.div}
      {...stagger(index)}
      sx={{
        border: '1px solid rgba(245,242,237,0.08)',
        bgcolor: '#0F0F0F',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        ...(expanded && { borderColor: GOLD }),
      }}
    >
      {/* Header (always visible, click to expand) */}
      <Box
        onClick={onToggle}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          cursor: 'pointer',
          '&:hover .at-img': { transform: 'scale(1.03)' },
        }}
      >
        <Box sx={{ width: { xs: '100%', md: 360 }, height: { xs: 220, md: 240 }, overflow: 'hidden', flexShrink: 0 }}>
          <Box
            className="at-img"
            component="img"
            src={image}
            alt={tour.title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
          />
        </Box>
        <Box sx={{ flex: 1, p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
            <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD }}>
              3 Days · {tour.titleEn}
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: GOLD, fontWeight: 500 }}>
              {tour.price}
            </Typography>
          </Box>
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.6rem', md: '2rem' }, color: CREAM, mb: 1, lineHeight: 1.15 }}>
            {tour.title}
          </Typography>
          <Typography sx={{ color: 'rgba(245,242,237,0.7)', fontSize: '0.95rem', fontStyle: 'italic', mb: 1.5 }}>
            {tour.tagline}
          </Typography>
          <Typography sx={{ color: DIM, fontSize: '0.88rem', lineHeight: 1.6 }}>
            {tour.summary}
          </Typography>
          <Typography sx={{ mt: 2, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>
            {expanded ? '— Hide Itinerary' : '+ View Day-by-Day'}
          </Typography>
        </Box>
      </Box>

      {/* Expandable day-by-day */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <Box sx={{ borderTop: '1px solid rgba(245,242,237,0.08)', p: { xs: 3, md: 4 } }}>
              <Grid container spacing={3}>
                {(tour.days || []).map((d, di) => (
                  <Grid item xs={12} md={4} key={di}>
                    <Box sx={{ borderTop: `2px solid ${GOLD}`, pt: 2 }}>
                      <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: CREAM, lineHeight: 1.1, mb: 0.5 }}>
                        {d.day} · {d.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, mb: 2 }}>
                        {d.meals}{d.stay ? ` · ${d.stay}` : ''}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {(d.items || []).map((it, ii) => (
                          <Box key={ii}>
                            <Typography sx={{ fontSize: '0.72rem', color: GOLD, letterSpacing: '0.05em', mb: 0.25 }}>
                              {it.time}
                            </Typography>
                            <Typography sx={{ color: CREAM, fontSize: '0.92rem', mb: 0.25, fontWeight: 500 }}>
                              {it.name}
                            </Typography>
                            {it.desc && (
                              <Typography sx={{ color: DIM, fontSize: '0.82rem', lineHeight: 1.55 }}>
                                {it.desc}
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

function AnhuiTours({ tours, images, expanded, onToggle }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {tours.map((tour, i) => (
        <AnhuiItineraryCard
          key={tour.id}
          tour={tour}
          image={images[tour.id]}
          expanded={expanded === tour.id}
          onToggle={() => onToggle(expanded === tour.id ? null : tour.id)}
          index={i}
        />
      ))}
    </Box>
  );
}

function ServiceStandards({ title, items }) {
  return (
    <Box sx={{ mt: 6, p: { xs: 3, md: 4 }, border: '1px solid rgba(245,242,237,0.08)', bgcolor: '#0F0F0F' }}>
      <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {items.map((it, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
              <Typography sx={{ color: GOLD, fontSize: '0.9rem', flexShrink: 0 }}>·</Typography>
              <Typography sx={{ color: 'rgba(245,242,237,0.8)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {it}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
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
                transition: 'all 0.3s ease',
                position: 'relative',
                '&:hover .nt-label': { color: CREAM },
                '&::after': active === it.key ? {
                  content: '""',
                  position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '2px', bgcolor: GOLD,
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
              <Typography
                className="nt-label"
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: '1.3rem', md: '1.7rem' },
                  color: active === it.key ? CREAM : 'rgba(245,242,237,0.6)',
                  lineHeight: 1.1,
                  transition: 'color 0.3s ease',
                }}
              >
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
  const [expandedTour, setExpandedTour] = React.useState('huangshan');

  const anhuiTours = t('tourism.china.anhuiTours', { returnObjects: true }) || [];
  const anhuiServiceItems = t('tourism.china.anhuiServiceItems', { returnObjects: true }) || [];
  const anhuiHeroImages = {
    huangshan: '/images/anhui/huangshan-3.jpeg',  // Huangshan peaks
    huizhou: '/images/anhui/huizhou-7.jpeg',       // Huizhou street
    qiyun: '/images/anhui/qiyun-3.jpeg',           // Qiyun stone
    anhui: '/images/anhui/anhui-1.jpeg',            // Jingchuan landscape
  };

  const finlandExperiences = t('tourism.finland.experiences', { returnObjects: true }) || [];
  const finlandHotels = t('tourism.finland.hotelsItems', { returnObjects: true }) || [];
  const norwayRoutes = t('tourism.norway.routesItems', { returnObjects: true }) || [];
  const norwayActs = t('tourism.norway.activitiesItems', { returnObjects: true }) || [];
  const icelandRoutes = t('tourism.iceland.routesItems', { returnObjects: true }) || [];
  const icelandActs = t('tourism.iceland.activitiesItems', { returnObjects: true }) || [];
  const denmarkRoutes = t('tourism.denmark.routesItems', { returnObjects: true }) || [];
  const forumTags = t('tourism.china.forum.tags', { returnObjects: true }) || [];

  const norwayImages = [EXT.norwayCoast, '/images/destinations/fjord.jpg', '/images/destinations/aurora.jpg', '/images/destinations/midnight.jpg', '/images/destinations/lake.jpg', '/images/destinations/forest.jpg'];
  const icelandImages = ['/images/destinations/iceland.jpg', '/images/destinations/forest.jpg', '/images/destinations/lake.jpg'];
  const denmarkImages = ['/images/destinations/lake.jpg', '/images/destinations/iceland.jpg', '/images/destinations/cabin.jpg'];

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

      {/* 9. ANHUI THREE-DAY TOURS — featured product */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('tourism.china.anhuiToursTitle')}
            title={t('tourism.china.anhuiToursSubtitle')}
            subtitle={t('tourism.china.anhuiToursIntro')}
          />
          <AnhuiTours
            tours={anhuiTours}
            images={anhuiHeroImages}
            expanded={expandedTour}
            onToggle={setExpandedTour}
          />
          <ServiceStandards
            title={t('tourism.china.anhuiServiceTitle')}
            items={anhuiServiceItems}
          />
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
