import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

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

// Magazine-style destination card
function DestinationCard({ image, title, subtitle, tall }) {
  return (
    <Grid item xs={12} md={tall ? 8 : 4}>
      <Box
        component={motion.div}
        {...fadeIn}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          height: tall ? { xs: 400, md: 600 } : { xs: 300, md: 400 },
          '&:hover img': { transform: 'scale(1.05)' },
          '&:hover .overlay': { opacity: 1 },
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
        />
        <Box
          className="overlay"
          sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 60%)',
            opacity: 0.7,
            transition: 'opacity 0.5s ease',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.5rem', md: '2rem' }, color: '#F5F2ED', fontWeight: 400, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: 'rgba(245,242,237,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

// Full-bleed image section with text overlay
function EditorialSection({ image, title, text, reverse }) {
  return (
    <Box sx={{ py: { xs: 4, md: 0 } }}>
      <Grid container sx={{ minHeight: { md: '80vh' } }} direction={reverse ? 'row-reverse' : 'row'}>
        <Grid item xs={12} md={7}>
          <Box
            component={motion.div}
            {...fadeIn}
            sx={{ height: { xs: 350, md: '100%' }, minHeight: { md: 500 }, overflow: 'hidden' }}
          >
            <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component={motion.div} {...fadeIn} sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 0 }, maxWidth: 500 }}>
            <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A35A', mb: 2 }}>
              Featured Experience
            </Typography>
            <Typography variant="h2" sx={{ color: '#F5F2ED', mb: 3 }}>
              {title}
            </Typography>
            <Typography sx={{ color: 'rgba(245,242,237,0.5)', lineHeight: 1.8, mb: 4 }}>
              {text}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#F5F2ED', display: 'inline-block', position: 'relative', cursor: 'pointer',
                '&::after': { content: '""', position: 'absolute', bottom: -4, left: 0, width: '100%', height: 1, bgcolor: '#C4A35A' },
                '&:hover': { color: '#C4A35A' },
              }}
            >
              Discover more →
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

// Single dramatic testimonial
function BigTestimonial({ quote, name, role }) {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 8 }, maxWidth: 1000, mx: 'auto', textAlign: 'center' }}>
      <Box component={motion.div} {...fadeIn}>
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A35A', mb: 4 }}>
          Testimonial
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

// Horizontal scroll gallery
function ExperienceGallery({ items }) {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box component={motion.div} {...fadeIn}>
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A35A', mb: 2 }}>
            Experiences
          </Typography>
          <Typography variant="h2" sx={{ color: '#F5F2ED', mb: 6 }}>
            Curated Nordic Adventures
          </Typography>
        </Box>
      </Container>
      <Box sx={{ overflowX: 'auto', px: { xs: 3, md: 6 }, pb: 2, '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
        <Box sx={{ display: 'flex', gap: 3, width: 'max-content' }}>
          {items.map((item, i) => (
            <Box
              key={i}
              component={motion.div}
              {...stagger(i)}
              sx={{
                width: { xs: 280, md: 350 }, flexShrink: 0, cursor: 'pointer',
                '&:hover .exp-img': { transform: 'scale(1.05)' },
              }}
            >
              <Box sx={{ height: { xs: 200, md: 260 }, overflow: 'hidden', mb: 2 }}>
                <Box className="exp-img" component="img" src={item.image} alt={item.title} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
              </Box>
              <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#F5F2ED', mb: 0.5 }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: 'rgba(245,242,237,0.4)', lineHeight: 1.6 }}>
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// Statement section - centered text on cream background
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

export default function LandingPage() {
  const { t } = useTranslation();

  const experiences = [
    { image: '/images/destinations/aurora.jpg', title: 'Aurora Borealis Tours', desc: 'Chase the Northern Lights across Arctic skies' },
    { image: '/images/destinations/husky.jpg', title: 'Husky Sled Adventures', desc: 'Race through snowy wilderness with Arctic huskies' },
    { image: '/images/destinations/lake.jpg', title: 'Midnight Sun Hiking', desc: 'Trek under the endless Nordic summer light' },
    { image: '/images/destinations/cabin.jpg', title: 'Nordic Culinary', desc: 'Savor traditional flavors in authentic settings' },
    { image: '/images/destinations/iceland.jpg', title: 'Kayak Expeditions', desc: 'Paddle through fjords and pristine coastlines' },
    { image: '/images/destinations/forest.jpg', title: 'Wildlife Photography', desc: 'Capture untouched nature with expert guides' },
  ];

  const testimonials = t('testimonials.experience', { returnObjects: true }) || [];
  const firstTestimonial = testimonials[0] || {};

  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      {/* 1. Cinematic Video Hero */}
      <Hero />

      {/* 2. Philosophy Statement */}
      <Statement text={t('hero.experienceTagline')} />

      {/* 3. Destination Grid — Magazine Layout */}
      <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <Box component={motion.div} {...fadeIn} sx={{ px: { xs: 1, md: 2 }, mb: 4 }}>
            <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A35A', mb: 2 }}>
              Destinations
            </Typography>
            <Typography variant="h2" sx={{ color: '#F5F2ED' }}>
              {t('packages.title')}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <DestinationCard image="/images/destinations/fjord.jpg" title="Fjord Explorer Journey" subtitle="Norway · 3 Days" tall />
            <DestinationCard image="/images/destinations/aurora.jpg" title="Aurora Borealis Tours" subtitle="Finland · 2 Nights" />
            <DestinationCard image="/images/destinations/midnight.jpg" title="Midnight Sun Hiking" subtitle="Sweden · 3 Days" />
            <DestinationCard image="/images/destinations/iceland.jpg" title="Viking Heritage Tour" subtitle="Iceland · 3 Days" tall />
            <DestinationCard image="/images/destinations/forest.jpg" title="Arctic Survival Challenge" subtitle="Lapland · 3 Days" />
            <DestinationCard image="/images/destinations/cabin.jpg" title="Nordic Wellness Retreat" subtitle="Finland · 5 Days" />
          </Grid>
        </Container>
      </Box>

      {/* 4. Editorial: Featured Experience */}
      <EditorialSection
        image="/images/destinations/husky.jpg"
        title="Husky Sled Adventures"
        text="Race through the Arctic wilderness with a team of eager huskies, crossing frozen lakes and snow-covered forests under the vast Nordic sky. Our expert mushers guide you through routes that few travelers ever see."
      />

      {/* 5. Horizontal Experience Gallery */}
      <ExperienceGallery items={experiences} />

      {/* 6. Full-bleed Image Break */}
      <Box
        component={motion.div}
        {...fadeIn}
        sx={{ width: '100%', height: { xs: 300, md: 500 }, overflow: 'hidden' }}
      >
        <Box component="img" src="/images/destinations/lake.jpg" alt="Nordic landscape" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>

      {/* 7. Editorial: Featured Experience (reversed) */}
      <EditorialSection
        image="/images/destinations/aurora.jpg"
        title="Aurora Borealis Tours"
        text="Witness nature's most spectacular light show from prime Arctic locations. Our expert guides use real-time aurora tracking to position you in the best spots, far from light pollution, for an unforgettable experience under the dancing lights."
        reverse
      />

      {/* 8. Big Testimonial */}
      <BigTestimonial
        quote={firstTestimonial.testimonial || "The Northern Lights trip was beyond magical. The photography expertise of the guides helped us capture moments we'll treasure forever."}
        name={firstTestimonial.name || "Elsa Nygard"}
        role={firstTestimonial.occupation || "Adventure Photographer"}
      />

      {/* 9. Pricing */}
      <Pricing />

      {/* 10. FAQ */}
      <FAQ />

      {/* 11. Footer */}
      <Footer />
    </Box>
  );
}
