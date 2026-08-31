'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import RestaurantModal from './RestaurantModal';
import {
  GOLD, CREAM, DIM,
  HelsinkiAttractions, DayTripsGrid, RestaurantCard,
} from './landingSections';

// Helsinki content blocks, shared by the Finland country section and the
// standalone /helsinki/* guide pages so both render from one source.

export const HELSINKI_IMAGES = [
  '/images/helsinki/helsinki-cathedral.png',
  '/images/helsinki/suomenlinna.jpg',
  '/images/helsinki/temppeliaukio.jpg',
  '/images/helsinki/kauppatori.jpg',
  '/images/helsinki/oodi.jpg',
  '/images/helsinki/design-district.jpg',
  '/images/helsinki/loyly.jpg',
  '/images/helsinki/allas-sea-pool.jpg',
  '/images/helsinki/esplanadi.jpg',
  '/images/helsinki/seurasaari.jpg',
  '/images/helsinki/uspenski.jpg',
  '/images/helsinki/sibelius.jpg',
  '/images/helsinki/kiasma.jpg',
  '/images/helsinki/ateneum.jpg',
  '/images/helsinki/old-market-hall.jpg',
];

export const DAY_TRIP_IMAGES = [
  '/images/helsinki/porvoo.jpg',
  '/images/helsinki/fiskars-village.jpg',
  '/images/helsinki/tallinn.jpg',
  '/images/helsinki/stockholm.jpg',
];

export const RESTAURANT_IMAGES = {
  konnikiwa: '/images/helsinki/konnikiwa-2.png',
  minmax: '/images/helsinki/minmax-1.png',
  sway: '/images/helsinki/sway-2.png',
  jinguanting: '/images/helsinki/jinguanting-3.jpg',
  liu: '/images/helsinki/jinguanting-2.jpg', // no own photo — reuse a generic restaurant interior
  happy: '/images/helsinki/happyfoodgarden-1.jpg',
  dongbei: '/images/helsinki/dongbeihu-1.jpg',
  leaf: '/images/helsinki/leaf-1.jpg',
};

const eyebrowSx = { fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 };
const descSx = { color: DIM, fontSize: '0.95rem', mb: 4 };
const subHeadSx = { fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.4rem', md: '1.7rem' }, color: CREAM, mb: 3, lineHeight: 1.2 };

const useList = () => {
  const { t } = useTranslation();
  return (key) => t(key, { returnObjects: true }) || [];
};

export function HelsinkiAttractionsBlock({ heading = true }) {
  const { t } = useTranslation();
  const list = useList();
  return (
    <Box sx={{ mb: 8 }}>
      {heading && (
        <>
          <Typography sx={eyebrowSx}>{t('tourism.finland.helsinki')}</Typography>
          <Typography sx={{ ...descSx, maxWidth: 800 }}>{t('tourism.finland.helsinkiDesc')}</Typography>
        </>
      )}
      <HelsinkiAttractions items={list('tourism.finland.helsinkiAttractions')} images={HELSINKI_IMAGES} />
    </Box>
  );
}

export function DayTripsBlock({ heading = true }) {
  const { t } = useTranslation();
  const list = useList();
  return (
    <Box sx={{ mb: 8 }}>
      {heading && (
        <>
          <Typography sx={eyebrowSx}>{t('tourism.finland.dayTrips')}</Typography>
          <Typography sx={{ ...descSx, maxWidth: 800 }}>{t('tourism.finland.dayTripsDesc')}</Typography>
        </>
      )}
      <DayTripsGrid items={list('tourism.finland.dayTripsItems')} images={DAY_TRIP_IMAGES} />
    </Box>
  );
}

export function DiningBlock({ heading = true }) {
  const { t } = useTranslation();
  const list = useList();
  const [detail, setDetail] = React.useState(null);
  const open = (item, image) => setDetail({ item, image });
  const image = (id) => RESTAURANT_IMAGES[id] || null;

  const hotel = list('tourism.finland.diningHotelItems');
  const western = list('tourism.finland.diningWesternItems');
  const chinese = list('tourism.finland.diningChineseItems');

  return (
    <Box sx={{ mb: 6 }}>
      {heading && (
        <>
          <Typography sx={eyebrowSx}>{t('tourism.finland.dining')}</Typography>
          <Typography sx={{ ...descSx, mb: 5, maxWidth: 800 }}>{t('tourism.finland.diningDesc')}</Typography>
        </>
      )}

      <Box sx={{ mb: 5 }}>
        <Typography sx={subHeadSx}>{t('tourism.finland.diningCatHotel')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {hotel.map((item, i) => (
            <RestaurantCard key={item.id} item={item} image={image(item.id)} expanded={false}
              onToggle={() => {}} onOpenDetail={open} index={i} category="hotel" />
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography sx={subHeadSx}>{t('tourism.finland.diningCatWestern')}</Typography>
        <Grid container spacing={2}>
          {western.map((item, i) => (
            <Grid item xs={12} md={6} key={item.id}>
              <RestaurantCard item={item} image={null} expanded={false}
                onToggle={() => {}} onOpenDetail={open} index={i} category="western" />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography sx={subHeadSx}>{t('tourism.finland.diningCatChinese')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {chinese.map((item, i) => (
            <RestaurantCard key={item.id} item={item} image={image(item.id)} expanded={false}
              onToggle={() => {}} onOpenDetail={open} index={i} category="chinese" />
          ))}
        </Box>
      </Box>

      <RestaurantModal
        open={Boolean(detail)}
        item={detail?.item}
        image={detail?.image}
        onClose={() => setDetail(null)}
      />
    </Box>
  );
}
