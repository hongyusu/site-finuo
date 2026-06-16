'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';
const BOOKING_URL = 'http://178.104.206.21:8083/destinations';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
};

export default function Hero() {
  const { t } = useTranslation();

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '92vh', md: '88vh' },
        minHeight: 560,
        overflow: 'hidden',
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Legibility overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.35) 45%, rgba(13,13,13,0.45) 100%)',
        }}
      />

      {/* Content overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Box component={motion.div} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: { xs: '0.65rem', md: '0.75rem' },
              fontWeight: 500,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: GOLD,
              mb: { xs: 2, md: 3 },
            }}
          >
            {t('hero.eyebrow')}
          </Typography>
        </Box>

        <Typography
          component={motion.h1}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          variant="h1"
          sx={{ color: CREAM, maxWidth: 1000, mb: { xs: 2, md: 3 }, textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}
        >
          {t('hero.headline')}
        </Typography>

        <Typography
          component={motion.p}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: 'easeOut' }}
          sx={{
            color: 'rgba(245,242,237,0.82)',
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6,
            maxWidth: 680,
            mb: { xs: 4, md: 5 },
          }}
        >
          {t('hero.experienceTagline')}
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}
        >
          <Button
            onClick={() => scrollToSection('china')}
            disableElevation
            sx={{
              bgcolor: GOLD,
              color: '#0D0D0D',
              px: 4,
              py: 1.5,
              borderRadius: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              '&:hover': { bgcolor: '#D4B76A' },
            }}
          >
            {t('hero.ctaExplore')}
          </Button>
          <Button
            component="a"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: CREAM,
              px: 4,
              py: 1.5,
              borderRadius: 0,
              border: '1px solid rgba(245,242,237,0.5)',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              '&:hover': { borderColor: CREAM, bgcolor: 'rgba(245,242,237,0.08)' },
            }}
          >
            {t('hero.ctaBook')}
          </Button>
        </Box>
      </Box>

      {/* Scroll Indicator */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        sx={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.5)' }}>
          {t('hero.scroll')}
        </Typography>
        <Box
          sx={{
            width: 1,
            height: 36,
            background: 'linear-gradient(to bottom, rgba(245,242,237,0.5), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
            '@keyframes scrollPulse': { '0%, 100%': { opacity: 0.3 }, '50%': { opacity: 0.8 } },
          }}
        />
      </Box>
    </Box>
  );
}
