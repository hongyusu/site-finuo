import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Hero from './components_education/Hero';
import FAQ from './components_education/FAQ';
import Footer from './components_education/Footer';

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
};

const stagger = (i) => ({
  ...fadeIn,
  transition: { ...fadeIn.transition, delay: i * 0.15 },
});

function Statement({ text }) {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, px: 3, bgcolor: '#F5F2ED', textAlign: 'center' }}>
      <Box component={motion.div} {...fadeIn} sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.5rem', md: '2.5rem' }, fontWeight: 400, color: '#1A1A1A', lineHeight: 1.4 }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

function ServiceCard({ image, title, description, index }) {
  return (
    <Grid item xs={12} md={index < 2 ? 6 : 4}>
      <Box
        component={motion.div}
        {...stagger(index)}
        sx={{
          position: 'relative', overflow: 'hidden', cursor: 'pointer',
          height: index < 2 ? { xs: 350, md: 500 } : { xs: 300, md: 380 },
          '&:hover img': { transform: 'scale(1.05)' },
          '&:hover .service-overlay': { opacity: 1 },
        }}
      >
        <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)' }} />
        <Box
          className="service-overlay"
          sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.3) 50%, transparent 100%)',
            opacity: 0.8, transition: 'opacity 0.5s ease',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.3rem', md: '1.6rem' }, color: '#F5F2ED', mb: 1 }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: 'rgba(245,242,237,0.5)', lineHeight: 1.6 }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

function EditorialSection({ image, title, text, reverse }) {
  return (
    <Box sx={{ py: { xs: 4, md: 0 } }}>
      <Grid container sx={{ minHeight: { md: '80vh' } }} direction={reverse ? 'row-reverse' : 'row'}>
        <Grid item xs={12} md={7}>
          <Box component={motion.div} {...fadeIn} sx={{ height: { xs: 350, md: '100%' }, minHeight: { md: 500 }, overflow: 'hidden' }}>
            <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component={motion.div} {...fadeIn} sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 0 }, maxWidth: 500 }}>
            <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A35A', mb: 2 }}>
              Why Finland
            </Typography>
            <Typography variant="h2" sx={{ color: '#F5F2ED', mb: 3 }}>
              {title}
            </Typography>
            <Typography sx={{ color: 'rgba(245,242,237,0.5)', lineHeight: 1.8, mb: 4 }}>
              {text}
            </Typography>
            <Typography sx={{
              fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#F5F2ED', display: 'inline-block', position: 'relative', cursor: 'pointer',
              '&::after': { content: '""', position: 'absolute', bottom: -4, left: 0, width: '100%', height: 1, bgcolor: '#C4A35A' },
              '&:hover': { color: '#C4A35A' },
            }}>
              Learn more →
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

function BigTestimonial({ quote, name, role }) {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 8 }, maxWidth: 1000, mx: 'auto', textAlign: 'center' }}>
      <Box component={motion.div} {...fadeIn}>
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A35A', mb: 4 }}>
          Student Story
        </Typography>
        <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.5rem', md: '2.2rem' }, fontStyle: 'italic', fontWeight: 300, color: '#F5F2ED', lineHeight: 1.5, mb: 4 }}>
          "{quote}"
        </Typography>
        <Typography sx={{ color: 'rgba(245,242,237,0.5)', fontSize: '0.85rem' }}>
          {name} — <span style={{ fontStyle: 'italic' }}>{role}</span>
        </Typography>
      </Box>
    </Box>
  );
}

function StatsSection() {
  const stats = [
    { number: '97%', label: 'Acceptance Rate' },
    { number: '50+', label: 'Partner Universities' },
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
                <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '2.5rem', md: '3.5rem' }, color: '#C4A35A', fontWeight: 300, mb: 1 }}>
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

export default function LandingPage1() {
  const { t } = useTranslation();

  const services = t('educationServices.items', { returnObjects: true }) || [];

  const serviceImages = [
    '/images/destinations/university.jpg',
    '/images/destinations/classroom.jpg',
    '/images/destinations/books.jpg',
    '/images/destinations/study.jpg',
    '/images/destinations/campus.jpg',
    '/images/destinations/graduation.jpg',
  ];

  const testimonials = t('testimonials.education', { returnObjects: true }) || [];
  const firstTestimonial = testimonials[0] || {};

  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      {/* 1. Cinematic Video Hero */}
      <Hero />

      {/* 2. Philosophy Statement */}
      <Statement text={t('hero.educationTagline')} />

      {/* 3. Services Grid — Magazine Layout */}
      <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <Box component={motion.div} {...fadeIn} sx={{ px: { xs: 1, md: 2 }, mb: 4 }}>
            <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A35A', mb: 2 }}>
              Our Services
            </Typography>
            <Typography variant="h2" sx={{ color: '#F5F2ED' }}>
              {t('educationServices.title')}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {services.map((service, i) => (
              <ServiceCard
                key={i}
                index={i}
                image={serviceImages[i] || serviceImages[0]}
                title={service.title}
                description={service.description}
              />
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. Stats Section */}
      <StatsSection />

      {/* 5. Editorial: Why Finland */}
      <EditorialSection
        image="/images/destinations/campus.jpg"
        title="World-Class Finnish Education"
        text="Finland consistently ranks among the top education systems globally. Our consulting services help you navigate applications, visas, and cultural adaptation — turning your dream of studying in the Nordics into reality."
      />

      {/* 6. Full-bleed Image Break */}
      <Box component={motion.div} {...fadeIn} sx={{ width: '100%', height: { xs: 300, md: 500 }, overflow: 'hidden' }}>
        <Box component="img" src="/images/destinations/graduation.jpg" alt="Graduation" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>

      {/* 7. Editorial: Student Life (reversed) */}
      <EditorialSection
        image="/images/destinations/books.jpg"
        title="Your Journey Starts Here"
        text="From school selection to visa assistance, accommodation guidance to scholarship applications — we support you at every step. Our team of experienced consultants understands both Finnish and international education systems."
        reverse
      />

      {/* 8. Big Testimonial */}
      <BigTestimonial
        quote={firstTestimonial.testimonial || "The guidance I received was exceptional. From university selection to visa preparation, every step was handled with care and expertise."}
        name={firstTestimonial.name || "Emma Thompson"}
        role={firstTestimonial.occupation || "Graduate Student"}
      />

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. Footer */}
      <Footer />
    </Box>
  );
}
