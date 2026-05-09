import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Footer from './components/Footer';
import { ContactSection } from './components_shared/AboutContact';

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';
const DIM = 'rgba(245,242,237,0.5)';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

// Photo galleries per tour — pulled from the docx-extracted images
const TOUR_GALLERIES = {
  huangshan: [
    '/images/anhui/huangshan-3.jpeg',  // mountain peaks
    '/images/anhui/huangshan-1.jpeg',
    '/images/anhui/huangshan-2.jpeg',
    '/images/anhui/huangshan-4.jpeg',
    '/images/anhui/huangshan-5.jpeg',
    '/images/anhui/huangshan-7.jpeg',
    '/images/anhui/huangshan-8.jpeg',
  ],
  huizhou: [
    '/images/anhui/huizhou-7.jpeg',
    '/images/anhui/huizhou-2.jpeg',
    '/images/anhui/huizhou-4.jpeg',
    '/images/anhui/huizhou-5.jpeg',
    '/images/anhui/huizhou-6.jpeg',
    '/images/anhui/huizhou-8.jpeg',
    '/images/anhui/huizhou-9.jpeg',
    '/images/anhui/huizhou-10.jpeg',
  ],
  qiyun: [
    '/images/anhui/qiyun-3.jpeg',
    '/images/anhui/qiyun-1.jpeg',
    '/images/anhui/qiyun-2.jpeg',
    '/images/anhui/qiyun-4.jpeg',
    '/images/anhui/qiyun-6.jpeg',
  ],
  anhui: [
    '/images/anhui/anhui-1.jpeg',
    '/images/anhui/anhui-2.jpeg',
    '/images/anhui/anhui-3.jpeg',
    '/images/anhui/anhui-4.jpeg',
    '/images/anhui/anhui-5.jpeg',
    '/images/anhui/anhui-6.jpeg',
    '/images/anhui/anhui-7.jpeg',
    '/images/anhui/anhui-8.jpeg',
    '/images/anhui/anhui-9.jpeg',
    '/images/anhui/anhui-10.jpeg',
  ],
};

const TOUR_HEROES = {
  huangshan: '/images/anhui/huangshan-3.jpeg',
  huizhou: '/images/anhui/huizhou-7.jpeg',
  qiyun: '/images/anhui/qiyun-3.jpeg',
  anhui: '/images/anhui/anhui-1.jpeg',
};

function Hero({ image, eyebrow, title, tagline, price, fromLabel }) {
  return (
    <Box sx={{ position: 'relative', height: { xs: '70vh', md: '85vh' }, width: '100%', overflow: 'hidden' }}>
      <Box component="img" src={image} alt={title}
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0.35) 50%, rgba(13,13,13,0.95) 100%)' }} />
      <Container maxWidth="lg" sx={{
        position: 'relative', height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        pb: { xs: 6, md: 10 }, px: 3,
      }}>
        <Box component={motion.div} {...fadeIn}>
          <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, mb: 2 }}>
            {eyebrow}
          </Typography>
          <Typography sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: '2.5rem', md: '4.5rem' }, fontWeight: 300,
            color: CREAM, lineHeight: 1.05, mb: 2, maxWidth: 1000,
          }}>
            {title}
          </Typography>
          <Typography sx={{ color: 'rgba(245,242,237,0.85)', fontSize: { xs: '1rem', md: '1.2rem' }, fontStyle: 'italic', mb: 3, maxWidth: 800 }}>
            {tagline}
          </Typography>
          <Typography sx={{ color: GOLD, fontSize: '1.1rem', fontWeight: 500 }}>
            {fromLabel} {price}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

function ItineraryDay({ day, index }) {
  const cover = day.image; // optional per-day photo
  return (
    <Box component={motion.div} {...fadeIn} sx={{ mb: { xs: 6, md: 10 } }}>
      <Grid container spacing={{ xs: 3, md: 6 }}>
        <Grid item xs={12} md={5}>
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '3rem', md: '4.5rem' }, color: GOLD, fontWeight: 300, lineHeight: 1, mb: 1 }}>
            {day.day}
          </Typography>
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.5rem', md: '2rem' }, color: CREAM, mb: 2, lineHeight: 1.15 }}>
            {day.title}
          </Typography>
          <Typography sx={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: DIM, mb: 1 }}>
            {day.meals}{day.stay ? ` · ${day.stay}` : ''}
          </Typography>
          {cover && (
            <Box sx={{ mt: 3, height: { xs: 240, md: 320 }, overflow: 'hidden' }}>
              <Box component="img" src={cover} alt={day.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderLeft: `1px solid rgba(245,242,237,0.1)`, pl: { xs: 3, md: 5 } }}>
            {(day.items || []).map((it, ii) => (
              <Box key={ii}>
                <Typography sx={{ fontSize: '0.75rem', color: GOLD, letterSpacing: '0.1em', mb: 0.5 }}>
                  {it.time}
                </Typography>
                <Typography sx={{ color: CREAM, fontSize: '1.05rem', fontWeight: 500, mb: 0.75 }}>
                  {it.name}
                </Typography>
                {it.desc && (
                  <Typography sx={{ color: 'rgba(245,242,237,0.65)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                    {it.desc}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

function Gallery({ images, title }) {
  if (!images || images.length === 0) return null;
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#0A0A0A' }}>
      <Container maxWidth="xl">
        <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, mb: 4, px: { xs: 2, md: 0 } }}>
          {title}
        </Typography>
        <Grid container spacing={1.5}>
          {images.map((src, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <Box
                component={motion.div}
                {...fadeIn}
                sx={{
                  height: { xs: 160, md: 240 },
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover img': { transform: 'scale(1.05)' },
                }}
              >
                <Box component="img" src={src} alt={`gallery ${i + 1}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function ServiceList({ title, items }) {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: '#0F0F0F' }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, mb: 4 }}>
          {title}
        </Typography>
        <Grid container spacing={3}>
          {items.map((it, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box sx={{ borderTop: '1px solid rgba(245,242,237,0.1)', pt: 2 }}>
                <Typography sx={{ color: 'rgba(245,242,237,0.85)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {it}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default function TourDetailPage({ tourId, onBack }) {
  const { t } = useTranslation();
  const tours = t('tourism.china.anhuiTours', { returnObjects: true }) || [];
  const labels = t('tourism.china.anhuiLabels', { returnObjects: true }) || {};
  const serviceItems = t('tourism.china.anhuiServiceItems', { returnObjects: true }) || [];

  const tour = tours.find((tr) => tr.id === tourId);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [tourId]);

  if (!tour) {
    return (
      <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ color: CREAM }}>Tour not found.</Typography>
      </Box>
    );
  }

  const heroImage = TOUR_HEROES[tourId] || '/images/anhui/huangshan-3.jpeg';
  const gallery = TOUR_GALLERIES[tourId] || [];

  // Attach a per-day image (rotating from the gallery) so each day section has visual context
  const daysWithImages = (tour.days || []).map((d, i) => ({
    ...d,
    image: gallery[(i + 1) % gallery.length] || null,
  }));

  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      {/* Back link bar */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(245,242,237,0.06)' }}>
        <Container maxWidth="xl">
          <Box sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              component="a"
              href="#"
              onClick={(e) => { e.preventDefault(); onBack && onBack(); }}
              sx={{
                fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(245,242,237,0.6)', textDecoration: 'none', cursor: 'pointer',
                '&:hover': { color: CREAM },
              }}
            >
              {labels.back}
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: GOLD, fontWeight: 500 }}>
              {labels.from} {tour.price}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Hero */}
      <Hero
        image={heroImage}
        eyebrow={labels.eyebrow}
        title={tour.title}
        tagline={tour.tagline}
        price={tour.price}
        fromLabel={labels.from}
      />

      {/* Summary block */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="md">
          <Box component={motion.div} {...fadeIn}>
            <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
              {labels.highlights}
            </Typography>
            <Typography sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 300,
              color: CREAM, lineHeight: 1.5,
            }}>
              {tour.summary}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Day-by-day */}
      <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, mb: 6 }}>
            {labels.dayByDay}
          </Typography>
          {daysWithImages.map((d, i) => (
            <ItineraryDay key={i} day={d} index={i} />
          ))}
        </Container>
      </Box>

      {/* Gallery */}
      <Gallery images={gallery} title={labels.gallery} />

      {/* Service standards */}
      <ServiceList title={labels.included} items={serviceItems} />

      {/* CTA */}
      <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center', px: 2 }}>
        <Button
          onClick={() => {
            if (onBack) onBack(); // navigate back to landing
            setTimeout(() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }}
          sx={{
            px: 5, py: 1.8, borderRadius: 0,
            border: `1px solid ${GOLD}`, color: CREAM,
            fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            '&:hover': { bgcolor: GOLD, color: '#0D0D0D' },
          }}
        >
          {labels.bookCta}
        </Button>
      </Box>

      <ContactSection />
      <Footer />
    </Box>
  );
}
