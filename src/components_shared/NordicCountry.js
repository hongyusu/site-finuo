'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { CountrySection, ListBlock } from './sections';
import {
  GOLD, CREAM, DIM,
  FinlandActivities, FinlandHotels, CountryRoutesGrid,
} from './landingSections';
import { HelsinkiAttractionsBlock, DayTripsBlock, DiningBlock } from './helsinkiBlocks';

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

const COUNTRY_IMAGES = {
  norway: ['/images/destinations/norway-coast.jpg', '/images/destinations/fjord.jpg', '/images/destinations/aurora.jpg', '/images/destinations/midnight.jpg', '/images/destinations/lake.jpg', '/images/destinations/forest.jpg'],
  iceland: ['/images/destinations/iceland.jpg', '/images/destinations/forest.jpg', '/images/destinations/lake.jpg'],
  denmark: ['/images/destinations/lake.jpg', '/images/destinations/iceland.jpg', '/images/destinations/cabin.jpg'],
};

const eyebrowSx = { fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 };
const descSx = { color: DIM, fontSize: '0.95rem', mb: 4 };

/** Links out to the Helsinki guides instead of repeating them inline. */
function HelsinkiGuideLinks() {
  const { t, i18n } = useTranslation();
  const prefix = i18n.language && i18n.language !== 'zh' ? `/${i18n.language}` : '';
  const guides = [
    { href: `${prefix}/helsinki/attractions`, title: t('tourism.finland.helsinki'), desc: t('tourism.finland.helsinkiDesc') },
    { href: `${prefix}/helsinki/day-trips`, title: t('tourism.finland.dayTrips'), desc: t('tourism.finland.dayTripsDesc') },
    { href: `${prefix}/helsinki/restaurants`, title: t('tourism.finland.dining'), desc: t('tourism.finland.diningDesc') },
  ];
  return (
    <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {guides.map((g) => (
        <Box
          key={g.href}
          component="a"
          href={g.href}
          sx={{
            display: 'block',
            p: { xs: 3, md: 4 },
            border: '1px solid rgba(245,242,237,0.08)',
            bgcolor: '#0F0F0F',
            textDecoration: 'none',
            transition: 'border-color 0.3s ease',
            '&:hover': { borderColor: GOLD },
          }}
        >
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.3rem', md: '1.6rem' }, color: CREAM, mb: 1 }}>
            {g.title}
          </Typography>
          <Typography sx={{ color: DIM, fontSize: '0.9rem', lineHeight: 1.7 }}>{g.desc}</Typography>
          <Typography sx={{ color: GOLD, fontSize: '0.8rem', letterSpacing: '0.08em', mt: 2 }}>
            {t('tourism.fullGuide')} →
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/**
 * Renders one Nordic country's content.
 * `compact` swaps the three Helsinki blocks for links to their own pages, so
 * the country page and the guide pages do not duplicate each other.
 * `footer` is appended inside the section.
 */
export default function NordicCountry({ country, footer = null, compact = false }) {
  const { t } = useTranslation();
  const list = (key) => t(key, { returnObjects: true }) || [];
  const common = {
    id: country,
    eyebrow: EYEBROWS[country],
    title: t(`tourism.${country}.title`),
    intro: t(`tourism.${country}.intro`),
    image: COUNTRY_HEADERS[country],
  };

  if (country === 'finland') {
    return (
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

        {compact ? (
          <HelsinkiGuideLinks />
        ) : (
          <>
            <HelsinkiAttractionsBlock />
            <DayTripsBlock />
            <DiningBlock />
          </>
        )}

        {footer}
      </CountrySection>
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
