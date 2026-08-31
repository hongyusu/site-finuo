'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { CountrySection, ListBlock } from './sections';
import RestaurantModal from './RestaurantModal';
import {
  GOLD, CREAM, DIM,
  HelsinkiAttractions, DayTripsGrid, RestaurantCard, FinlandActivities, FinlandHotels,
  CountryRoutesGrid,
} from './landingSections';

// One source of truth for the four Nordic countries, rendered both inside the
// landing page's country tabs and as the standalone /nordic/[country] pages.
export const COUNTRY_IDS = ['finland', 'norway', 'iceland', 'denmark'];

export const COUNTRY_HEADERS = {
  finland: '/images/destinations/cabin.jpg',
  norway: '/images/destinations/fjord.jpg',
  iceland: '/images/destinations/iceland.jpg',
  denmark: '/images/destinations/lake.jpg',
};

const EYEBROWS = {
  finland: '01 — Finland',
  norway: '02 — Norway',
  iceland: '03 — Iceland',
  denmark: '04 — Denmark',
};

const HELSINKI_IMAGES = [
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

const DAY_TRIP_IMAGES = [
  '/images/helsinki/porvoo.jpg',
  '/images/helsinki/fiskars-village.jpg',
  '/images/helsinki/tallinn.jpg',
  '/images/helsinki/stockholm.jpg',
];

const RESTAURANT_IMAGES = {
  konnikiwa: '/images/helsinki/konnikiwa-2.png',
  minmax: '/images/helsinki/minmax-1.png',
  sway: '/images/helsinki/sway-2.png',
  jinguanting: '/images/helsinki/jinguanting-3.jpg',
  liu: '/images/helsinki/jinguanting-2.jpg', // no own photo — reuse a generic restaurant interior
  happy: '/images/helsinki/happyfoodgarden-1.jpg',
  dongbei: '/images/helsinki/dongbeihu-1.jpg',
  leaf: '/images/helsinki/leaf-1.jpg',
};

const COUNTRY_IMAGES = {
  norway: ['/images/destinations/norway-coast.jpg', '/images/destinations/fjord.jpg', '/images/destinations/aurora.jpg', '/images/destinations/midnight.jpg', '/images/destinations/lake.jpg', '/images/destinations/forest.jpg'],
  iceland: ['/images/destinations/iceland.jpg', '/images/destinations/forest.jpg', '/images/destinations/lake.jpg'],
  denmark: ['/images/destinations/lake.jpg', '/images/destinations/iceland.jpg', '/images/destinations/cabin.jpg'],
};

const eyebrowSx = { fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 };
const descSx = { color: DIM, fontSize: '0.95rem', mb: 4 };
const subHeadSx = { fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.4rem', md: '1.7rem' }, color: CREAM, mb: 3, lineHeight: 1.2 };

/**
 * Renders one Nordic country's content.
 * `footer` is appended inside the section (used for the "full guide" link on
 * the landing page and the related-destination links on the standalone page).
 */
export default function NordicCountry({ country, footer = null }) {
  const { t } = useTranslation();
  const [restaurantDetail, setRestaurantDetail] = React.useState(null);
  const openRestaurant = (item, image) => setRestaurantDetail({ item, image });

  const list = (key) => t(key, { returnObjects: true }) || [];
  const common = {
    id: country,
    eyebrow: EYEBROWS[country],
    title: t(`tourism.${country}.title`),
    intro: t(`tourism.${country}.intro`),
    image: COUNTRY_HEADERS[country],
  };

  if (country === 'finland') {
    const diningHotel = list('tourism.finland.diningHotelItems');
    const diningWestern = list('tourism.finland.diningWesternItems');
    const diningChinese = list('tourism.finland.diningChineseItems');
    const restaurantImage = (id) => RESTAURANT_IMAGES[id] || null;

    return (
      <>
        <CountrySection {...common}>
          <Box sx={{ mb: 8 }}>
            <Typography sx={eyebrowSx}>{t('tourism.finland.hotels')}</Typography>
            <Typography sx={{ ...descSx, maxWidth: 700 }}>{t('tourism.finland.hotelsDesc')}</Typography>
            <FinlandHotels items={list('tourism.finland.hotelsItems')} />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography sx={eyebrowSx}>{t('tourism.finland.activities')}</Typography>
            <Typography sx={descSx}>{t('tourism.finland.activitiesDesc')}</Typography>
            <FinlandActivities items={list('tourism.finland.experiences')} />
          </Box>

          {/* Helsinki Attractions */}
          <Box sx={{ mb: 8 }}>
            <Typography sx={eyebrowSx}>{t('tourism.finland.helsinki')}</Typography>
            <Typography sx={{ ...descSx, maxWidth: 800 }}>{t('tourism.finland.helsinkiDesc')}</Typography>
            <HelsinkiAttractions items={list('tourism.finland.helsinkiAttractions')} images={HELSINKI_IMAGES} />
          </Box>

          {/* Day Trips */}
          <Box sx={{ mb: 8 }}>
            <Typography sx={eyebrowSx}>{t('tourism.finland.dayTrips')}</Typography>
            <Typography sx={{ ...descSx, maxWidth: 800 }}>{t('tourism.finland.dayTripsDesc')}</Typography>
            <DayTripsGrid items={list('tourism.finland.dayTripsItems')} images={DAY_TRIP_IMAGES} />
          </Box>

          {/* Dining */}
          <Box sx={{ mb: 6 }}>
            <Typography sx={eyebrowSx}>{t('tourism.finland.dining')}</Typography>
            <Typography sx={{ ...descSx, mb: 5, maxWidth: 800 }}>{t('tourism.finland.diningDesc')}</Typography>

            <Box sx={{ mb: 5 }}>
              <Typography sx={subHeadSx}>{t('tourism.finland.diningCatHotel')}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {diningHotel.map((item, i) => (
                  <RestaurantCard
                    key={item.id}
                    item={item}
                    image={restaurantImage(item.id)}
                    expanded={false}
                    onToggle={() => {}}
                    onOpenDetail={openRestaurant}
                    index={i}
                    category="hotel"
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 5 }}>
              <Typography sx={subHeadSx}>{t('tourism.finland.diningCatWestern')}</Typography>
              <Grid container spacing={2}>
                {diningWestern.map((item, i) => (
                  <Grid item xs={12} md={6} key={item.id}>
                    <RestaurantCard
                      item={item}
                      image={null}
                      expanded={false}
                      onToggle={() => {}}
                      onOpenDetail={openRestaurant}
                      index={i}
                      category="western"
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Typography sx={subHeadSx}>{t('tourism.finland.diningCatChinese')}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {diningChinese.map((item, i) => (
                  <RestaurantCard
                    key={item.id}
                    item={item}
                    image={restaurantImage(item.id)}
                    expanded={false}
                    onToggle={() => {}}
                    onOpenDetail={openRestaurant}
                    index={i}
                    category="chinese"
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {footer}
        </CountrySection>

        <RestaurantModal
          open={Boolean(restaurantDetail)}
          item={restaurantDetail?.item}
          image={restaurantDetail?.image}
          onClose={() => setRestaurantDetail(null)}
        />
      </>
    );
  }

  if (country === 'denmark') {
    return (
      <CountrySection {...common}>
        <Typography sx={{ ...eyebrowSx, mb: 3 }}>{t('tourism.denmark.routes')}</Typography>
        <CountryRoutesGrid items={list('tourism.denmark.routesItems')} images={COUNTRY_IMAGES.denmark} />
        {footer}
      </CountrySection>
    );
  }

  // Norway and Iceland share a routes + activities shape.
  return (
    <CountrySection {...common}>
      <Box sx={{ mb: 6 }}>
        <Typography sx={{ ...eyebrowSx, mb: 3 }}>{t(`tourism.${country}.routes`)}</Typography>
        <CountryRoutesGrid
          items={list(`tourism.${country}.routesItems`)}
          images={COUNTRY_IMAGES[country]}
          {...(country === 'norway' ? { height: 220 } : {})}
        />
      </Box>
      <Box>
        <Typography sx={{ ...eyebrowSx, mb: 3 }}>{t(`tourism.${country}.activities`)}</Typography>
        <ListBlock items={list(`tourism.${country}.activitiesItems`)} columns={3} />
      </Box>
      {footer}
    </CountrySection>
  );
}
