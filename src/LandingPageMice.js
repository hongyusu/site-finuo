'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Footer from './components_shared/Footer';
import {
  fadeIn,
  stagger,
  Statement,
  SectionHeader,
  FullBleedImage,
} from './components_shared/sections';
import { AboutSection, ContactSection } from './components_shared/AboutContact';

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';
const DIM = 'rgba(245,242,237,0.5)';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1800&auto=format&fit=crop&q=80';
const HELSINKI_IMAGE = '/images/destinations/cabin.jpg';

function MiceHero() {
  const { t } = useTranslation();
  return (
    <Box sx={{ position: 'relative', height: { xs: '70vh', md: '85vh' }, width: '100%', overflow: 'hidden' }}>
      <Box
        component="img"
        src={HERO_IMAGE}
        alt="MICE"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.4) 50%, rgba(13,13,13,0.85) 100%)' }} />
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', px: 3 }}>
        <Box component={motion.div} {...fadeIn}>
          <Typography sx={{ fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
            {t('mice.title')}
          </Typography>
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '2.5rem', md: '5rem' }, fontWeight: 300, color: CREAM, lineHeight: 1.1, mb: 3, maxWidth: 1000 }}>
            {t('hero.miceTagline')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

function EventCard({ event, index }) {
  return (
    <Box
      component={motion.div}
      {...stagger(index)}
      sx={{
        p: 4,
        height: '100%',
        border: '1px solid rgba(245,242,237,0.08)',
        transition: 'all 0.4s ease',
        cursor: 'pointer',
        '&:hover': {
          borderColor: GOLD,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD }}>
          {event.month} · {event.city}
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.6rem', md: '1.9rem' }, color: CREAM, mb: 1.5, lineHeight: 1.1 }}>
        {event.name}
      </Typography>
      <Typography sx={{ color: DIM, fontSize: '0.92rem', lineHeight: 1.7 }}>
        {event.desc}
      </Typography>
    </Box>
  );
}

function ServiceCard({ service, index }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        component={motion.div}
        {...stagger(index)}
        sx={{
          height: '100%',
          p: 4,
          bgcolor: 'rgba(245,242,237,0.02)',
          border: '1px solid rgba(245,242,237,0.06)',
          transition: 'all 0.4s ease',
          '&:hover': { bgcolor: 'rgba(196,163,90,0.06)', borderColor: GOLD },
        }}
      >
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 2 }}>
          0{index + 1}
        </Typography>
        <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: CREAM, mb: 2 }}>
          {service.title}
        </Typography>
        <Typography sx={{ color: DIM, fontSize: '0.92rem', lineHeight: 1.7 }}>
          {service.desc}
        </Typography>
      </Box>
    </Grid>
  );
}

function BigTestimonial({ quote, name, role }) {
  return (
    <Box id="testimonials" sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 8 }, maxWidth: 1000, mx: 'auto', textAlign: 'center' }}>
      <Box component={motion.div} {...fadeIn}>
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 4 }}>
          Client Voice
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

export default function LandingPageMice() {
  const { t } = useTranslation();

  const eventList = t('mice.listItems', { returnObjects: true }) || [];
  const serviceList = t('mice.servicesItems', { returnObjects: true }) || [];
  const testimonials = t('testimonials.mice', { returnObjects: true }) || [];
  const firstTestimonial = testimonials[0] || {};

  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      {/* 1. Hero */}
      <MiceHero />

      {/* 2. Intro Statement */}
      <Statement text={t('mice.intro')} light />

      {/* 3. Events List */}
      <Box id="miceList" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('mice.listTitle')}
            title={t('mice.listSubtitle')}
            subtitle="精选芬兰会展，已合作或值得参与"
          />
          <Grid container spacing={2}>
            {eventList.map((ev, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <EventCard event={ev} index={i} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. Helsinki visual break */}
      <FullBleedImage image={HELSINKI_IMAGE} alt="Helsinki" height={{ xs: 280, md: 460 }} />

      {/* 5. Services */}
      <Box id="miceServices" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, bgcolor: '#0A0A0A' }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('mice.servicesTitle')}
            title={t('mice.servicesSubtitle')}
            subtitle={t('mice.intro')}
          />
          <Grid container spacing={2}>
            {serviceList.map((svc, i) => (
              <ServiceCard key={i} service={svc} index={i} />
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 6. Testimonial */}
      <BigTestimonial
        quote={firstTestimonial.testimonial || "Finuo's local resources and execution made our overseas team's landing seamless."}
        name={firstTestimonial.name || "Marcus Lindberg"}
        role={firstTestimonial.occupation || "Slush Program Director"}
      />

      {/* 7. About */}
      <AboutSection />

      {/* 8. Contact */}
      <ContactSection />

      {/* 9. Footer */}
      <Footer />
    </Box>
  );
}
