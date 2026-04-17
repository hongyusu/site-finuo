import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        width: '100%',
        height: '80vh',
        minHeight: 500,
        overflow: 'hidden',
      }}
    >
      <video
        autoPlay muted loop playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="/videos/hero_education.mp4" type="video/mp4" />
      </video>

      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 30%)', zIndex: 1 }} />

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        sx={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
        }}
      >
        <Typography sx={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.4)' }}>
          Scroll
        </Typography>
        <Box sx={{
          width: 1, height: 40,
          background: 'linear-gradient(to bottom, rgba(245,242,237,0.4), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
          '@keyframes scrollPulse': { '0%, 100%': { opacity: 0.3 }, '50%': { opacity: 0.8 } },
        }} />
      </Box>
    </Box>
  );
}
