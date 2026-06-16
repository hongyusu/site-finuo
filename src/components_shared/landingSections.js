'use client';
// Presentational section components extracted from LandingPage.js.
// Pure/presentational: all data arrives via props (no i18n here).
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, stagger, MediaCard, SectionHeader } from './sections';

export const GOLD = '#C4A35A';
export const CREAM = '#F5F2ED';
export const DIM = 'rgba(245,242,237,0.5)';

export function HelsinkiAttractions({ items, images }) {
  return (
    <Grid container spacing={2}>
      {items.map((it, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <MediaCard
            index={i}
            image={images[i] || null}
            title={it.name}
            subtitle={it.desc}
            meta={it.type}
            height={260}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export function DayTripsGrid({ items, images }) {
  return (
    <Grid container spacing={2}>
      {items.map((it, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <MediaCard
            index={i}
            image={images[i] || null}
            title={it.name}
            subtitle={it.desc}
            meta={`${it.country} · ${it.duration} · ${it.transport}`}
            height={300}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export function RestaurantCard({ item, image, expanded, onToggle, onOpenDetail, index, category }) {
  return (
    <Box
      component={motion.div}
      {...stagger(index)}
      sx={{
        border: '1px solid rgba(245,242,237,0.08)',
        bgcolor: '#0F0F0F',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ...(expanded && { borderColor: GOLD }),
        '&:hover': { borderColor: GOLD },
        '&:hover .rc-img': { transform: 'scale(1.03)' },
      }}
      onClick={() => onOpenDetail && onOpenDetail(item, image)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {image && (
          <Box sx={{ width: { xs: '100%', md: 280 }, height: { xs: 180, md: 180 }, overflow: 'hidden', flexShrink: 0 }}>
            <Box
              className="rc-img"
              component="img"
              src={image}
              alt={item.name}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            />
          </Box>
        )}
        <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
            {item.type}
          </Typography>
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.3rem', md: '1.55rem' }, color: CREAM, mb: 1, lineHeight: 1.2 }}>
            {item.name}
          </Typography>
          {(item.address || item.location || item.distance) && (
            <Typography sx={{ fontSize: '0.8rem', color: 'rgba(245,242,237,0.55)', mb: 0.5 }}>
              {item.address || item.location || item.distance}
            </Typography>
          )}
          {item.phone && (
            <Typography sx={{ fontSize: '0.8rem', color: 'rgba(245,242,237,0.55)', mb: 1 }}>
              {item.phone}
            </Typography>
          )}
          <Typography sx={{ color: DIM, fontSize: '0.88rem', lineHeight: 1.6 }}>
            {item.desc}
          </Typography>
          {item.best && (
            <Typography sx={{ mt: 1.5, fontSize: '0.82rem', color: GOLD, fontStyle: 'italic' }}>
              {item.best}
            </Typography>
          )}
          <Typography sx={{ mt: 1.5, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,242,237,0.45)' }}>
            📍 view on map →
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export function FinlandActivities({ items }) {
  return (
    <Grid container spacing={2}>
      {items.map((it, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <MediaCard
            index={i}
            image={[
              '/images/destinations/aurora.jpg',
              '/images/destinations/midnight.jpg',
              '/images/destinations/lake.jpg',
              '/images/destinations/forest.jpg',
              '/images/destinations/cabin.jpg',
              '/images/destinations/husky.jpg',
            ][i % 6]}
            title={it.title}
            subtitle={it.desc}
            height={300}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export function FinlandHotels({ items }) {
  // All-local Nordic images so subjects are reliably scenic
  const images = [
    '/images/destinations/cabin.jpg',
    '/images/destinations/aurora.jpg',
    '/images/destinations/university.jpg',
    '/images/destinations/midnight.jpg',
    '/images/destinations/lake.jpg',
    '/images/destinations/forest.jpg',
  ];
  return (
    <Grid container spacing={2}>
      {items.map((h, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <MediaCard
            index={i}
            image={images[i % images.length]}
            title={h.name}
            subtitle={h.desc}
            meta={h.type}
            height={300}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export function CountryRoutesGrid({ items, images, height = 240 }) {
  return (
    <Grid container spacing={2}>
      {items.map((it, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <MediaCard
            index={i}
            image={images[i % images.length]}
            title={it.name}
            subtitle={it.desc}
            height={height}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export function AnhuiItineraryCard({ tour, image, expanded, onToggle, index }) {
  return (
    <Box
      component={motion.div}
      {...stagger(index)}
      sx={{
        border: '1px solid rgba(245,242,237,0.08)',
        bgcolor: '#0F0F0F',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        ...(expanded && { borderColor: GOLD }),
      }}
    >
      {/* Header (always visible, click to expand) */}
      <Box
        onClick={onToggle}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          cursor: 'pointer',
          '&:hover .at-img': { transform: 'scale(1.03)' },
        }}
      >
        <Box sx={{ width: { xs: '100%', md: 360 }, height: { xs: 220, md: 240 }, overflow: 'hidden', flexShrink: 0 }}>
          <Box
            className="at-img"
            component="img"
            src={image}
            alt={tour.title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
          />
        </Box>
        <Box sx={{ flex: 1, p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
            <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD }}>
              {tour.eyebrow}
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: GOLD, fontWeight: 500 }}>
              {tour.price}
            </Typography>
          </Box>
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.6rem', md: '2rem' }, color: CREAM, mb: 1, lineHeight: 1.15 }}>
            {tour.title}
          </Typography>
          <Typography sx={{ color: 'rgba(245,242,237,0.7)', fontSize: '0.95rem', fontStyle: 'italic', mb: 1.5 }}>
            {tour.tagline}
          </Typography>
          <Typography sx={{ color: DIM, fontSize: '0.88rem', lineHeight: 1.6 }}>
            {tour.summary}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>
              {expanded ? tour.hideLabel : tour.expandLabel}
            </Typography>
            <Typography
              component="a"
              href={`#/tour/${tour.id}`}
              onClick={(e) => e.stopPropagation()}
              sx={{
                fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(245,242,237,0.6)', textDecoration: 'none',
                borderBottom: '1px solid rgba(245,242,237,0.3)',
                '&:hover': { color: CREAM, borderBottomColor: GOLD },
              }}
            >
              {tour.detailLabel}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Expandable day-by-day */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <Box sx={{ borderTop: '1px solid rgba(245,242,237,0.08)', p: { xs: 3, md: 4 } }}>
              <Grid container spacing={3}>
                {(tour.days || []).map((d, di) => (
                  <Grid item xs={12} md={4} key={di}>
                    <Box sx={{ borderTop: `2px solid ${GOLD}`, pt: 2 }}>
                      <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: CREAM, lineHeight: 1.1, mb: 0.5 }}>
                        {d.day} · {d.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, mb: 2 }}>
                        {d.meals}{d.stay ? ` · ${d.stay}` : ''}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {(d.items || []).map((it, ii) => (
                          <Box key={ii}>
                            <Typography sx={{ fontSize: '0.72rem', color: GOLD, letterSpacing: '0.05em', mb: 0.25 }}>
                              {it.time}
                            </Typography>
                            <Typography sx={{ color: CREAM, fontSize: '0.92rem', mb: 0.25, fontWeight: 500 }}>
                              {it.name}
                            </Typography>
                            {it.desc && (
                              <Typography sx={{ color: DIM, fontSize: '0.82rem', lineHeight: 1.55 }}>
                                {it.desc}
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export function AnhuiTours({ tours, images, expanded, onToggle }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {tours.map((tour, i) => (
        <AnhuiItineraryCard
          key={tour.id}
          tour={tour}
          image={images[tour.id]}
          expanded={expanded === tour.id}
          onToggle={() => onToggle(expanded === tour.id ? null : tour.id)}
          index={i}
        />
      ))}
    </Box>
  );
}

// Tour id -> region key, drives the region tabs above the China tours

export function ChinaGuide({ title, subtitle, intro, items }) {
  return (
    <Box id="chinaGuide" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, bgcolor: '#0A0A0A' }}>
      <Container maxWidth="xl" disableGutters>
        <SectionHeader eyebrow={title} title={subtitle} subtitle={intro} />
        <Grid container spacing={2}>
          {items.map((it, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Box
                component={motion.div}
                {...stagger(i)}
                sx={{
                  height: '100%',
                  p: { xs: 3, md: 4 },
                  border: '1px solid rgba(245,242,237,0.08)',
                  bgcolor: '#0F0F0F',
                  transition: 'border-color 0.3s ease',
                  '&:hover': { borderColor: GOLD },
                }}
              >
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.4rem', md: '1.7rem' }, color: CREAM, mb: 1.5, lineHeight: 1.2 }}>
                  {it.title}
                </Typography>
                <Typography sx={{ color: DIM, fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {it.body}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export function ServiceStandards({ title, items }) {
  return (
    <Box sx={{ mt: 6, p: { xs: 3, md: 4 }, border: '1px solid rgba(245,242,237,0.08)', bgcolor: '#0F0F0F' }}>
      <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {items.map((it, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
              <Typography sx={{ color: GOLD, fontSize: '0.9rem', flexShrink: 0 }}>·</Typography>
              <Typography sx={{ color: 'rgba(245,242,237,0.8)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {it}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export function ForumBlock({ title, subtitle, intro, tags }) {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, bgcolor: '#141414' }}>
      <Container maxWidth="md">
        <Box component={motion.div} {...fadeIn} sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="h2" sx={{ color: CREAM, mb: 3 }}>
            {subtitle}
          </Typography>
          <Typography sx={{ color: DIM, fontSize: '1rem', lineHeight: 1.8, mb: 5, maxWidth: 600, mx: 'auto' }}>
            {intro}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            {tags.map((tag, i) => (
              <Box
                key={i}
                component={motion.div}
                {...stagger(i)}
                sx={{
                  px: 3, py: 1.2,
                  border: '1px solid rgba(245,242,237,0.15)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  color: DIM,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': { borderColor: GOLD, color: GOLD },
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export function BigTestimonial({ quote, name, role }) {
  return (
    <Box id="testimonials" sx={{ py: { xs: 10, md: 16 }, px: { xs: 3, md: 8 }, maxWidth: 1000, mx: 'auto', textAlign: 'center' }}>
      <Box component={motion.div} {...fadeIn}>
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 4 }}>
          Testimonial
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

export function NordicTabs({ active, onChange, labels }) {
  return (
    <Box sx={{ mb: 4, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{
          display: 'flex',
          gap: { xs: 0, md: 1 },
          borderTop: '1px solid rgba(245,242,237,0.08)',
          borderBottom: '1px solid rgba(245,242,237,0.08)',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}>
          {labels.map((it, i) => (
            <Box
              key={it.key}
              onClick={() => onChange(it.key)}
              sx={{
                flex: 1,
                minWidth: { xs: '50%', md: 'auto' },
                py: { xs: 2, md: 3 },
                px: 2,
                cursor: 'pointer',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(245,242,237,0.08)',
                borderBottom: { xs: i < labels.length - 1 ? '1px solid rgba(245,242,237,0.08)' : 'none', md: 'none' },
                transition: 'all 0.3s ease',
                position: 'relative',
                '&:hover .nt-label': { color: CREAM },
                '&::after': active === it.key ? {
                  content: '""',
                  position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '2px', bgcolor: GOLD,
                } : {},
              }}
            >
              <Typography sx={{
                fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: active === it.key ? GOLD : 'rgba(245,242,237,0.4)',
                mb: 0.5,
              }}>
                {it.num}
              </Typography>
              <Typography
                className="nt-label"
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: '1.3rem', md: '1.7rem' },
                  color: active === it.key ? CREAM : 'rgba(245,242,237,0.6)',
                  lineHeight: 1.1,
                  transition: 'color 0.3s ease',
                }}
              >
                {it.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
