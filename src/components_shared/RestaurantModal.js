'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';
const DIM = 'rgba(245,242,237,0.5)';

// Build a Google Maps search URL — works without an API key.
// Prefers a full address; falls back to "<name> Helsinki" for restaurants
// that only have a vague location.
function buildMapUrls(item) {
  const query = item.address
    ? item.address
    : `${item.name} ${item.location || 'Helsinki'}`;
  const encoded = encodeURIComponent(query);
  return {
    embed: `https://www.google.com/maps?q=${encoded}&output=embed`,
    open: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
  };
}

export default function RestaurantModal({ item, image, open, onClose }) {
  const { t } = useTranslation();
  if (!item) return null;

  const { embed, open: openUrl, directions } = buildMapUrls(item);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{ sx: { bgcolor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' } }}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 1, md: 3 } }}
    >
      <AnimatePresence>
        {open && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            sx={{
              position: 'relative',
              width: { xs: '100%', md: 'min(900px, 95vw)' },
              maxHeight: { xs: '95vh', md: '90vh' },
              bgcolor: '#0F0F0F',
              border: `1px solid rgba(196,163,90,0.3)`,
              boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
              overflow: 'auto',
              outline: 'none',
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(245,242,237,0.15)' },
            }}
          >
            {/* Close button */}
            <IconButton
              onClick={onClose}
              aria-label="Close"
              sx={{
                position: 'absolute', top: 12, right: 12, zIndex: 2,
                color: CREAM, bgcolor: 'rgba(0,0,0,0.5)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            {/* Header: image + meta */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              {image && (
                <Box sx={{ width: { xs: '100%', md: 360 }, height: { xs: 220, md: 280 }, flexShrink: 0, overflow: 'hidden' }}>
                  <Box component="img" src={image} alt={item.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              )}
              <Box sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
                <Typography sx={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1.5 }}>
                  {item.type}
                </Typography>
                <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.6rem', md: '2rem' }, color: CREAM, mb: 2, lineHeight: 1.15 }}>
                  {item.name}
                </Typography>
                {item.address && (
                  <Typography sx={{ fontSize: '0.9rem', color: 'rgba(245,242,237,0.75)', mb: 0.5 }}>
                    📍 {item.address}
                  </Typography>
                )}
                {item.location && (
                  <Typography sx={{ fontSize: '0.9rem', color: 'rgba(245,242,237,0.75)', mb: 0.5 }}>
                    📍 {item.location}
                  </Typography>
                )}
                {item.distance && (
                  <Typography sx={{ fontSize: '0.9rem', color: 'rgba(245,242,237,0.75)', mb: 0.5 }}>
                    🚶 {item.distance}
                  </Typography>
                )}
                {item.phone && (
                  <Typography
                    component="a"
                    href={`tel:${item.phone.replace(/\s/g, '')}`}
                    sx={{
                      fontSize: '0.9rem', color: 'rgba(245,242,237,0.75)', mb: 1,
                      textDecoration: 'none', display: 'block',
                      '&:hover': { color: GOLD },
                    }}
                  >
                    📞 {item.phone}
                  </Typography>
                )}
                {item.best && (
                  <Typography sx={{ mt: 2, fontSize: '0.88rem', color: GOLD, fontStyle: 'italic' }}>
                    {item.best}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Description */}
            <Box sx={{ px: { xs: 3, md: 4 }, pb: 3 }}>
              <Typography sx={{ color: 'rgba(245,242,237,0.85)', fontSize: '0.95rem', lineHeight: 1.75 }}>
                {item.desc}
              </Typography>
            </Box>

            {/* Map */}
            <Box sx={{ px: { xs: 0, md: 0 } }}>
              <Box sx={{ position: 'relative', height: { xs: 280, md: 360 }, bgcolor: '#1a1a1a' }}>
                <iframe
                  title={`Map of ${item.name}`}
                  src={embed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </Box>
            </Box>

            {/* Action buttons */}
            <Box sx={{
              p: { xs: 2.5, md: 3 },
              display: 'flex', gap: 2, flexWrap: 'wrap',
              borderTop: '1px solid rgba(245,242,237,0.08)',
            }}>
              <Box
                component="a"
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  px: 3, py: 1.4,
                  border: `1px solid ${GOLD}`,
                  color: CREAM,
                  fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': { bgcolor: GOLD, color: '#0D0D0D' },
                }}
              >
                {t('restaurantModal.directions')} →
              </Box>
              <Box
                component="a"
                href={openUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  px: 3, py: 1.4,
                  border: '1px solid rgba(245,242,237,0.2)',
                  color: DIM,
                  fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': { color: CREAM, borderColor: 'rgba(245,242,237,0.5)' },
                }}
              >
                {t('restaurantModal.openInMaps')}
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Modal>
  );
}
