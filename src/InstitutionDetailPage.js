import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Footer from './components_education/Footer';
import { ContactSection } from './components_shared/AboutContact';

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

// Photos from Wikimedia Commons — see public/images/institutions/CREDITS.md
export const INSTITUTION_HEROES = {
  heureka: '/images/institutions/heureka-1.jpg',
  kisakallio: '/images/institutions/kisakallio-1.jpg',
  kuortane: '/images/institutions/kuortane-1.jpg',
  helsinki: '/images/institutions/helsinki-1.jpg',
  aalto: '/images/institutions/aalto-1.jpg',
  haagahelia: '/images/institutions/haagahelia-1.jpg',
  lab: '/images/institutions/lab-1.jpg',
  jyvaskyla: '/images/institutions/jyvaskyla-1.jpg',
  turku: '/images/institutions/turku-1.jpg',
};

const INSTITUTION_GALLERIES = {
  heureka: [
    '/images/institutions/heureka-1.jpg',
    '/images/institutions/heureka-2.jpg',
    '/images/institutions/heureka-3.jpg',
    '/images/institutions/heureka-4.jpg',
  ],
  kisakallio: [
    '/images/institutions/kisakallio-1.jpg',
    '/images/institutions/kisakallio-2.jpg',
  ],
  kuortane: [
    '/images/institutions/kuortane-1.jpg',
    '/images/institutions/kuortane-2.jpg',
  ],
  helsinki: [
    '/images/institutions/helsinki-1.jpg',
    '/images/institutions/helsinki-2.jpg',
    '/images/institutions/helsinki-3.jpg',
  ],
  aalto: [
    '/images/institutions/aalto-1.jpg',
    '/images/institutions/aalto-2.jpg',
    '/images/institutions/aalto-3.jpg',
  ],
  haagahelia: ['/images/institutions/haagahelia-1.jpg'],
  lab: [
    '/images/institutions/lab-1.jpg',
    '/images/institutions/lab-2.jpg',
    '/images/institutions/lab-3.jpg',
  ],
  jyvaskyla: ['/images/institutions/jyvaskyla-1.jpg'],
  turku: [
    '/images/institutions/turku-1.jpg',
    '/images/institutions/turku-2.jpg',
  ],
};

export default function InstitutionDetailPage({ institutionId, onBack }) {
  const { t } = useTranslation();
  const schools = t('education.schools', { returnObjects: true }) || [];
  const labels = t('education.institutionLabels', { returnObjects: true }) || {};

  const school = schools.find((s) => s.id === institutionId);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [institutionId]);

  if (!school) {
    return (
      <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ color: CREAM }}>Institution not found.</Typography>
      </Box>
    );
  }

  const heroImage = INSTITUTION_HEROES[institutionId];
  const gallery = INSTITUTION_GALLERIES[institutionId] || [];

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
            <Typography sx={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>
              {school.type}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Hero */}
      <Box sx={{ position: 'relative', height: { xs: '60vh', md: '75vh' }, width: '100%', overflow: 'hidden' }}>
        <Box component="img" src={heroImage} alt={school.name}
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0.3) 50%, rgba(13,13,13,0.95) 100%)' }} />
        <Container maxWidth="lg" sx={{
          position: 'relative', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          pb: { xs: 6, md: 10 }, px: 3,
        }}>
          <Box component={motion.div} {...fadeIn}>
            <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, mb: 2 }}>
              {school.type}
            </Typography>
            <Typography sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: '2.2rem', md: '4rem' }, fontWeight: 300,
              color: CREAM, lineHeight: 1.05, mb: 2, maxWidth: 1000,
            }}>
              {school.name}
            </Typography>
            <Typography sx={{ color: 'rgba(245,242,237,0.85)', fontSize: { xs: '1rem', md: '1.2rem' }, fontStyle: 'italic', maxWidth: 800 }}>
              {school.desc}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* About */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="md">
          <Box component={motion.div} {...fadeIn}>
            <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
              {labels.about}
            </Typography>
            <Typography sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: '1.3rem', md: '1.7rem' }, fontWeight: 300,
              color: CREAM, lineHeight: 1.6,
            }}>
              {school.intro}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Facts */}
      {(school.facts || []).length > 0 && (
        <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: '#0F0F0F' }}>
          <Container maxWidth="lg">
            <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, mb: 4 }}>
              {labels.facts}
            </Typography>
            <Grid container spacing={3}>
              {school.facts.map((it, i) => (
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
      )}

      {/* Gallery */}
      {gallery.length > 1 && (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#0A0A0A' }}>
          <Container maxWidth="xl">
            <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, mb: 4, px: { xs: 2, md: 0 } }}>
              {labels.gallery}
            </Typography>
            <Grid container spacing={1.5}>
              {gallery.map((src, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Box
                    component={motion.div}
                    {...fadeIn}
                    sx={{
                      height: { xs: 160, md: 260 },
                      overflow: 'hidden',
                      '&:hover img': { transform: 'scale(1.05)' },
                    }}
                  >
                    <Box component="img" src={src} alt={`${school.name} ${i + 1}`}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* CTA */}
      <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center', px: 2 }}>
        <Button
          onClick={() => {
            if (onBack) onBack();
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
          {labels.contactCta}
        </Button>
      </Box>

      <ContactSection />
      <Footer />
    </Box>
  );
}
