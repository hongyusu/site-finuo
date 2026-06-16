'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';
const DIM = 'rgba(245,242,237,0.5)';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

function TestimonialCard({ name, occupation, testimonial }) {
  return (
    <Box
      sx={{
        flex: '0 0 auto',
        width: { xs: 270, md: 360 },
        mx: 1.5,
        p: { xs: 3, md: 4 },
        borderRadius: '2px',
        bgcolor: 'rgba(245,242,237,0.03)',
        border: '1px solid rgba(245,242,237,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 240,
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
        '&:hover': { borderColor: 'rgba(196,163,90,0.5)', bgcolor: 'rgba(245,242,237,0.05)' },
      }}
    >
      <Box>
        <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD, fontSize: '2.6rem', lineHeight: 0.8, mb: 1.5 }}>
          &ldquo;
        </Typography>
        <Typography sx={{ color: CREAM, fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.65, fontStyle: 'italic' }}>
          {testimonial}
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography sx={{ color: CREAM, fontSize: '0.9rem', fontWeight: 600 }}>{name}</Typography>
        <Typography sx={{ color: DIM, fontSize: '0.78rem' }}>{occupation}</Typography>
      </Box>
    </Box>
  );
}

// A continuously sliding (marquee) row of testimonial cards.
// direction: 'left' (right-to-left) or 'right' (left-to-right). Pauses on hover.
export default function TestimonialsMarquee({ title, eyebrow = 'Testimonials', items = [], direction = 'left', speed = 50 }) {
  if (!items || items.length === 0) return null;
  // Two identical copies + translateX(-50%) gives a seamless infinite loop.
  const loop = [...items, ...items];
  const animationName = direction === 'right' ? 'finuoMarqueeRight' : 'finuoMarqueeLeft';

  return (
    <Box id="testimonials" sx={{ py: { xs: 8, md: 14 }, overflow: 'hidden' }}>
      <Box component={motion.div} {...fadeIn} sx={{ textAlign: 'center', mb: { xs: 5, md: 7 }, px: 3 }}>
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 2 }}>
          {eyebrow}
        </Typography>
        <Typography variant="h2" sx={{ color: CREAM }}>{title}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: `${animationName} ${speed}s linear infinite`,
          '&:hover': { animationPlayState: 'paused' },
          '@keyframes finuoMarqueeLeft': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-50%)' },
          },
          '@keyframes finuoMarqueeRight': {
            from: { transform: 'translateX(-50%)' },
            to: { transform: 'translateX(0)' },
          },
        }}
      >
        {loop.map((item, i) => (
          <TestimonialCard key={i} {...item} />
        ))}
      </Box>
    </Box>
  );
}
