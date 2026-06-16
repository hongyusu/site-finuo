'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';

// Use `animate` (not `whileInView`) so content is reliably visible regardless
// of scroll position — IntersectionObserver was missing some images on initial
// load and inside fullPage screenshots.
export const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const stagger = (i) => ({
  ...fadeIn,
  transition: { ...fadeIn.transition, delay: Math.min(i, 8) * 0.05 },
});

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';
const DIM = 'rgba(245,242,237,0.5)';

export function SectionHeader({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <Box component={motion.div} {...fadeIn} sx={{ textAlign: align, mb: { xs: 4, md: 6 } }}>
      {eyebrow && (
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 2 }}>
          {eyebrow}
        </Typography>
      )}
      <Typography variant="h2" sx={{ color: CREAM, mb: subtitle ? 2 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ color: DIM, fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.7, maxWidth: 700, mx: align === 'center' ? 'auto' : 0 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export function Statement({ text, light = false }) {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, px: 3, bgcolor: light ? CREAM : 'transparent', textAlign: 'center' }}>
      <Box component={motion.div} {...fadeIn} sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.5rem', md: '2.5rem' }, fontWeight: 400, color: light ? '#1A1A1A' : CREAM, lineHeight: 1.4 }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

// Card grid item for routes/cities/activities — image with text overlay.
// If image is falsy, renders a typography-only card with no image.
export function MediaCard({ image, title, subtitle, meta, height = 300, index = 0 }) {
  // Fallback handler: if image fails to load, swap to a known-good local image
  const handleError = (e) => {
    if (!e.target.dataset.fallback) {
      e.target.dataset.fallback = '1';
      e.target.src = '/images/destinations/cabin.jpg';
    }
  };

  if (!image) {
    return (
      <Box
        component={motion.div}
        {...stagger(index)}
        sx={{
          position: 'relative',
          height,
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(196,163,90,0.08) 0%, rgba(13,13,13,1) 60%)',
          border: '1px solid rgba(245,242,237,0.08)',
          transition: 'all 0.4s ease',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          p: { xs: 2.5, md: 3 },
          '&:hover': { borderColor: GOLD, transform: 'translateY(-2px)' },
        }}
      >
        {meta && (
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
            {meta}
          </Typography>
        )}
        <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.6rem', md: '2rem' }, color: CREAM, mb: subtitle ? 0.75 : 0, lineHeight: 1.1 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ fontSize: '0.82rem', color: DIM, lineHeight: 1.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      {...stagger(index)}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        height,
        '&:hover img': { transform: 'scale(1.05)' },
        // On hover: image darkens, full overlay fades in, text rises
        '&:hover .overlay-base': { opacity: 0 },
        '&:hover .overlay-hover': { opacity: 1 },
        '&:hover .mc-text': { transform: 'translateY(-6px)' },
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        onError={handleError}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
      />
      {/* Default overlay: subtle gradient at bottom only */}
      <Box
        className="overlay-base"
        sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.2) 60%, transparent 100%)',
          opacity: 0.85,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />
      {/* Hover overlay: covers ~half the image with darker layer for better text readability */}
      <Box
        className="overlay-hover"
        sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.75) 50%, rgba(13,13,13,0.1) 100%)',
          opacity: 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />
      {/* Text content: lifts on hover */}
      <Box
        className="mc-text"
        sx={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          p: { xs: 2.5, md: 3 },
          transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        {meta && (
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
            {meta}
          </Typography>
        )}
        <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.2rem', md: '1.5rem' }, color: CREAM, mb: subtitle ? 0.5 : 0, lineHeight: 1.2 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ fontSize: '0.82rem', color: 'rgba(245,242,237,0.85)', lineHeight: 1.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// Compact text-only list block for routes/itineraries
export function ListBlock({ items, columns = 2 }) {
  return (
    <Grid container spacing={3}>
      {items.map((item, i) => (
        <Grid item xs={12} sm={columns === 3 ? 4 : 6} key={i}>
          <Box
            component={motion.div}
            {...stagger(i)}
            sx={{
              borderTop: '1px solid rgba(245,242,237,0.1)',
              pt: 2,
              transition: 'border-color 0.3s ease',
              '&:hover': { borderTopColor: GOLD },
            }}
          >
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.3rem', md: '1.5rem' }, color: CREAM, mb: 1, lineHeight: 1.2 }}>
              {item.name || item.title}
            </Typography>
            <Typography sx={{ fontSize: '0.88rem', color: DIM, lineHeight: 1.6 }}>
              {item.desc}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export function CountrySection({ id, eyebrow, title, subtitle, intro, image, children }) {
  return (
    <Box id={id} sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl" disableGutters>
        <Grid container spacing={4} sx={{ px: { xs: 2, md: 4 }, mb: 6 }}>
          <Grid item xs={12} md={image ? 6 : 12}>
            <SectionHeader eyebrow={eyebrow} title={title} subtitle={intro || subtitle} />
          </Grid>
          {image && (
            <Grid item xs={12} md={6}>
              <Box component={motion.div} {...fadeIn} sx={{ height: { xs: 300, md: 400 }, overflow: 'hidden' }}>
                <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            </Grid>
          )}
        </Grid>
        <Box sx={{ px: { xs: 2, md: 4 } }}>{children}</Box>
      </Container>
    </Box>
  );
}

export function FullBleedImage({ image, alt, height }) {
  return (
    <Box
      component={motion.div}
      {...fadeIn}
      sx={{ width: '100%', height: height || { xs: 250, md: 400 }, overflow: 'hidden' }}
    >
      <Box component="img" src={image} alt={alt} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </Box>
  );
}
