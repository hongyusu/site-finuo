'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Hero from './components_education/Hero';
import FAQ from './components_shared/FAQ';
import Footer from './components_shared/Footer';
import TestimonialsMarquee from './components_shared/TestimonialsMarquee';
import {
  stagger,
  Statement,
  SectionHeader,
  MediaCard,
  FullBleedImage,
} from './components_shared/sections';
import { AboutSection, ContactSection } from './components_shared/AboutContact';
import { INSTITUTION_HEROES } from './InstitutionDetailPage';

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';
const DIM = 'rgba(245,242,237,0.5)';

function StatsSection() {
  const stats = [
    { number: '97%', label: 'Acceptance Rate' },
    { number: '50+', label: 'Institutions Covered' },
    { number: '1,200+', label: 'Students Placed' },
    { number: '15+', label: 'Years of Experience' },
  ];
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#141414' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Box component={motion.div} {...stagger(i)} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '2.5rem', md: '3.5rem' }, color: GOLD, fontWeight: 300, mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.4)' }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function SchoolGrid({ schools, detailHint }) {
  const fallbackImages = [
    '/images/destinations/university.jpg',
    '/images/destinations/campus.jpg',
    '/images/destinations/classroom.jpg',
    '/images/destinations/study.jpg',
    '/images/destinations/books.jpg',
    '/images/destinations/graduation.jpg',
  ];
  return (
    <Grid container spacing={2}>
      {schools.map((s, i) => (
        <Grid item xs={12} sm={6} md={4} key={s.id || i}>
          <Box
            onClick={() => { if (s.id) window.location.hash = `#/institution/${s.id}`; }}
            sx={{
              cursor: s.id ? 'pointer' : 'default',
              height: '100%',
              '&:hover .school-hint': { color: GOLD },
            }}
          >
            <MediaCard
              index={i}
              image={INSTITUTION_HEROES[s.id] || fallbackImages[i % fallbackImages.length]}
              title={s.name}
              subtitle={s.desc}
              meta={s.type}
              height={300}
            />
            {s.id && detailHint && (
              <Typography className="school-hint" sx={{ mt: 1.5, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.45)', transition: 'color 0.3s ease' }}>
                {detailHint}
              </Typography>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

function ProgramTriple({ items, images }) {
  return (
    <Grid container spacing={2}>
      {items.map((item, i) => (
        <Grid item xs={12} md={4} key={i}>
          <Box
            component={motion.div}
            {...stagger(i)}
            sx={{
              height: '100%',
              display: 'flex', flexDirection: 'column',
              border: '1px solid rgba(245,242,237,0.08)',
              transition: 'all 0.4s ease',
              '&:hover': { borderColor: GOLD, transform: 'translateY(-4px)' },
              '&:hover .pi': { transform: 'scale(1.05)' },
            }}
          >
            <Box sx={{ height: 240, overflow: 'hidden' }}>
              <Box className="pi" component="img" src={images[i % images.length]} alt={item.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
            </Box>
            <Box sx={{ p: 3, flexGrow: 1 }}>
              <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: CREAM, mb: 1.5 }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: DIM, fontSize: '0.9rem', lineHeight: 1.7 }}>
                {item.desc}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default function LandingPage1() {
  const { t } = useTranslation();

  const schools = t('education.schools', { returnObjects: true }) || [];
  const trainingItems = t('education.trainingItems', { returnObjects: true }) || [];
  const studyToursItems = t('education.studyToursItems', { returnObjects: true }) || [];

  const trainingImages = [
    '/images/destinations/classroom.jpg',
    '/images/destinations/books.jpg',
    '/images/destinations/study.jpg',
  ];
  const studyTourImages = [
    '/images/destinations/aurora.jpg',
    '/images/destinations/forest.jpg',
    '/images/destinations/campus.jpg',
  ];

  const testimonials = t('testimonials.education', { returnObjects: true }) || [];

  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Tagline Statement */}
      <Statement text={t('hero.educationTagline')} light />

      {/* 3. Schools / Partner Institutions */}
      <Box id="schools" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('education.schoolsTitle')}
            title={t('education.schoolsSubtitle')}
            subtitle={t('education.schoolsIntro')}
          />
          <SchoolGrid schools={schools} detailHint={t('education.institutionLabels.detailHint')} />
        </Container>
      </Box>

      {/* 4. Stats */}
      <StatsSection />

      {/* 5. Training Programs */}
      <Box id="training" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('education.trainingTitle')}
            title={t('education.trainingSubtitle')}
            subtitle={t('education.trainingIntro')}
          />
          <ProgramTriple items={trainingItems} images={trainingImages} />
        </Container>
      </Box>

      {/* 6. Full-bleed break */}
      <FullBleedImage image="/images/destinations/graduation.jpg" alt="Graduation" />

      {/* 7. Study Tours */}
      <Box id="studyTours" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, bgcolor: '#0A0A0A' }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('education.studyToursTitle')}
            title={t('education.studyToursSubtitle')}
            subtitle={t('education.studyToursIntro')}
          />
          <ProgramTriple items={studyToursItems} images={studyTourImages} />
        </Container>
      </Box>

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
    </Box>
  );
}
