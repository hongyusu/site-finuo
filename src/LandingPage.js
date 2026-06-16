'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import FAQ from './components_shared/FAQ';
import Footer from './components_shared/Footer';
import {
  Statement,
  SectionHeader,
  ListBlock,
  CountrySection,
  FullBleedImage,
} from './components_shared/sections';
import { AboutSection, ContactSection } from './components_shared/AboutContact';
import RestaurantModal from './components_shared/RestaurantModal';
import TestimonialsMarquee from './components_shared/TestimonialsMarquee';
import {
  GOLD, CREAM, DIM,
  HelsinkiAttractions, DayTripsGrid, RestaurantCard, FinlandActivities, FinlandHotels,
  CountryRoutesGrid, AnhuiTours, ChinaGuide, ServiceStandards, ForumBlock, NordicTabs,
} from './components_shared/landingSections';

// All imagery is self-hosted under /public/images (no external CDN dependency).

// Hero panels for each country: image used at the top of each section
const NORDIC_HEADER = '/images/destinations/aurora.jpg';
const FINLAND_HEADER = '/images/destinations/cabin.jpg';
const NORWAY_HEADER = '/images/destinations/fjord.jpg';
const ICELAND_HEADER = '/images/destinations/iceland.jpg';
const DENMARK_HEADER = '/images/destinations/lake.jpg';
const CHINA_HEADER = '/images/anhui/huangshan-3.jpeg';

const TOUR_REGIONS = {
  huangshan: 'anhui',
  huizhou: 'anhui',
  qiyun: 'anhui',
  anhui: 'anhui',
  suzhou: 'jiangzhe',
  hangzhou: 'jiangzhe',
  'suzhou-hangzhou': 'jiangzhe',
  shanghai: 'shanghai',
};

export default function LandingPage() {
  const { t } = useTranslation();
  const [activeCountry, setActiveCountry] = React.useState('finland');
  const [activeRegion, setActiveRegion] = React.useState('anhui');
  const [expandedTour, setExpandedTour] = React.useState('huangshan');
  const [restaurantDetail, setRestaurantDetail] = React.useState(null);

  const openRestaurant = (item, image) => setRestaurantDetail({ item, image });
  const closeRestaurant = () => setRestaurantDetail(null);

  const anhuiToursRaw = t('tourism.china.anhuiTours', { returnObjects: true }) || [];
  const anhuiLabels = t('tourism.china.anhuiLabels', { returnObjects: true }) || {};
  const anhuiTours = anhuiToursRaw.map((tour) => ({
    ...tour,
    eyebrow: anhuiLabels.eyebrow,
    expandLabel: anhuiLabels.expandLabel,
    hideLabel: anhuiLabels.hideLabel,
    detailLabel: anhuiLabels.detailLabel,
  }));
  const anhuiServiceItems = t('tourism.china.anhuiServiceItems', { returnObjects: true }) || [];
  const regionTabs = t('tourism.china.regionTabs', { returnObjects: true }) || [];
  const guideItems = t('tourism.china.guide.items', { returnObjects: true }) || [];
  const regionTours = anhuiTours.filter((tour) => TOUR_REGIONS[tour.id] === activeRegion);
  const switchRegion = (key) => {
    setActiveRegion(key);
    const first = anhuiTours.find((tour) => TOUR_REGIONS[tour.id] === key);
    setExpandedTour(first ? first.id : null);
  };
  const anhuiHeroImages = {
    huangshan: '/images/anhui/huangshan-3.jpeg',          // Huangshan peaks
    huizhou: '/images/anhui/huizhou-6.jpeg',               // Huizhou ancient gateway
    qiyun: '/images/anhui/qiyun-3.jpeg',                   // Qiyun Danxia rock
    anhui: '/images/anhui/anhui-2.jpeg',                   // Jingchuan river
    suzhou: '/images/anhui/suzhou-4.jpeg',                 // Suzhou Humble Admin garden
    hangzhou: '/images/anhui/hangzhou-9.jpeg',             // West Lake peach blossom
    'suzhou-hangzhou': '/images/anhui/hangzhou-5.jpeg',    // Wuzhen waterway
    shanghai: '/images/anhui/shanghai-18.jpeg',            // Shanghai night skyline
  };

  const finlandExperiences = t('tourism.finland.experiences', { returnObjects: true }) || [];
  const finlandHotels = t('tourism.finland.hotelsItems', { returnObjects: true }) || [];
  const helsinkiAttractions = t('tourism.finland.helsinkiAttractions', { returnObjects: true }) || [];
  const dayTripsItems = t('tourism.finland.dayTripsItems', { returnObjects: true }) || [];
  const diningHotel = t('tourism.finland.diningHotelItems', { returnObjects: true }) || [];
  const diningWestern = t('tourism.finland.diningWesternItems', { returnObjects: true }) || [];
  const diningChinese = t('tourism.finland.diningChineseItems', { returnObjects: true }) || [];

  // Helsinki attraction image map (matches order in i18n)
  const helsinkiImages = [
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
  const dayTripImages = [
    '/images/helsinki/porvoo.jpg',
    '/images/helsinki/fiskars-village.jpg',
    '/images/helsinki/tallinn.jpg',
    '/images/helsinki/stockholm.jpg',
  ];
  // Restaurant images by id
  const restaurantImage = (id, category) => {
    const map = {
      konnikiwa: '/images/helsinki/konnikiwa-2.png',
      minmax: '/images/helsinki/minmax-1.png',
      sway: '/images/helsinki/sway-2.png',
      jinguanting: '/images/helsinki/jinguanting-3.jpg',
      liu: '/images/helsinki/jinguanting-2.jpg', // no own photo — reuse a generic restaurant interior
      happy: '/images/helsinki/happyfoodgarden-1.jpg',
      dongbei: '/images/helsinki/dongbeihu-1.jpg',
      leaf: '/images/helsinki/leaf-1.jpg',
    };
    return map[id] || null;
  };
  const norwayRoutes = t('tourism.norway.routesItems', { returnObjects: true }) || [];
  const norwayActs = t('tourism.norway.activitiesItems', { returnObjects: true }) || [];
  const icelandRoutes = t('tourism.iceland.routesItems', { returnObjects: true }) || [];
  const icelandActs = t('tourism.iceland.activitiesItems', { returnObjects: true }) || [];
  const denmarkRoutes = t('tourism.denmark.routesItems', { returnObjects: true }) || [];
  const forumTags = t('tourism.china.forum.tags', { returnObjects: true }) || [];

  const norwayImages = ['/images/destinations/norway-coast.jpg', '/images/destinations/fjord.jpg', '/images/destinations/aurora.jpg', '/images/destinations/midnight.jpg', '/images/destinations/lake.jpg', '/images/destinations/forest.jpg'];
  const icelandImages = ['/images/destinations/iceland.jpg', '/images/destinations/forest.jpg', '/images/destinations/lake.jpg'];
  const denmarkImages = ['/images/destinations/lake.jpg', '/images/destinations/iceland.jpg', '/images/destinations/cabin.jpg'];

  const testimonials = t('testimonials.experience', { returnObjects: true }) || [];

  return (
    <Box sx={{ bgcolor: '#0D0D0D', minHeight: '100vh' }}>
      {/* 1. Cinematic Video Hero */}
      <Hero />

      {/* 2. Tourism Intro Statement */}
      <Statement text={t('tourism.intro')} light />

      {/* 3. CHINA SECTION HEADER */}
      <Box id="china" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 }, bgcolor: '#0A0A0A' }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('tourism.regions')}
            title={t('tourism.chinaTitle')}
            subtitle={t('tourism.chinaSubtitle')}
          />
        </Container>
      </Box>
      <FullBleedImage image={CHINA_HEADER} alt="China" height={{ xs: 250, md: 380 }} />

      {/* 4. ANHUI THREE-DAY TOURS — featured product */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('tourism.china.anhuiToursTitle')}
            title={t('tourism.china.anhuiToursSubtitle')}
            subtitle={t('tourism.china.anhuiToursIntro')}
          />
        </Container>
      </Box>

      {/* 4b. REGION TABS — click a province/city to see its itineraries */}
      <NordicTabs
        active={activeRegion}
        onChange={switchRegion}
        labels={regionTabs.map((r, i) => ({
          key: r.key,
          num: String(i + 1).padStart(2, '0'),
          label: r.label,
        }))}
      />
      <Box sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {regionTours.length > 0 ? (
                <AnhuiTours
                  tours={regionTours}
                  images={anhuiHeroImages}
                  expanded={expandedTour}
                  onToggle={setExpandedTour}
                />
              ) : (
                <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center', border: '1px solid rgba(245,242,237,0.08)', bgcolor: '#0F0F0F' }}>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.4rem', md: '1.8rem' }, color: CREAM, mb: 1.5 }}>
                    {regionTabs.find((r) => r.key === activeRegion)?.label}
                  </Typography>
                  <Typography sx={{ color: DIM, fontSize: '0.95rem' }}>
                    {t('tourism.china.regionComingSoon')}
                  </Typography>
                </Box>
              )}
            </motion.div>
          </AnimatePresence>
          <ServiceStandards
            title={t('tourism.china.anhuiServiceTitle')}
            items={anhuiServiceItems}
          />
        </Container>
      </Box>

      {/* 4c. CHINA TRAVEL GUIDE for international visitors */}
      <ChinaGuide
        title={t('tourism.china.guide.title')}
        subtitle={t('tourism.china.guide.subtitle')}
        intro={t('tourism.china.guide.intro')}
        items={guideItems}
      />

      {/* 5. FORUM */}
      <ForumBlock
        title={t('tourism.china.forum.title')}
        subtitle={t('tourism.china.forum.subtitle')}
        intro={t('tourism.china.forum.intro')}
        tags={forumTags}
      />

      {/* 6. NORDIC SECTION HEADER */}
      <Box id="nordic" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" disableGutters>
          <SectionHeader
            eyebrow={t('tourism.regions')}
            title={t('tourism.nordicTitle')}
            subtitle={t('tourism.nordicSubtitle')}
          />
        </Container>
      </Box>
      <FullBleedImage image={NORDIC_HEADER} alt="Nordic landscape" height={{ xs: 250, md: 380 }} />

      {/* 7. NORDIC COUNTRY TABS — click to switch */}
      <NordicTabs
        active={activeCountry}
        onChange={(c) => {
          setActiveCountry(c);
          setTimeout(() => {
            const el = document.getElementById(c);
            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
          }, 50);
        }}
        labels={[
          { key: 'finland', num: '01', label: t('tourism.finland.title') },
          { key: 'norway',  num: '02', label: t('tourism.norway.title') },
          { key: 'iceland', num: '03', label: t('tourism.iceland.title') },
          { key: 'denmark', num: '04', label: t('tourism.denmark.title') },
        ]}
      />

      {/* 7b. ACTIVE COUNTRY CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCountry}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeCountry === 'finland' && (
            <CountrySection
              id="finland"
              eyebrow="01 — Finland"
              title={t('tourism.finland.title')}
              intro={t('tourism.finland.intro')}
              image={FINLAND_HEADER}
            >
              <Box sx={{ mb: 8 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
                  {t('tourism.finland.hotels')}
                </Typography>
                <Typography sx={{ color: DIM, fontSize: '0.95rem', mb: 4, maxWidth: 700 }}>
                  {t('tourism.finland.hotelsDesc')}
                </Typography>
                <FinlandHotels items={finlandHotels} />
              </Box>
              <Box sx={{ mb: 8 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
                  {t('tourism.finland.activities')}
                </Typography>
                <Typography sx={{ color: DIM, fontSize: '0.95rem', mb: 4 }}>
                  {t('tourism.finland.activitiesDesc')}
                </Typography>
                <FinlandActivities items={finlandExperiences} />
              </Box>

              {/* Helsinki Attractions */}
              <Box sx={{ mb: 8 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
                  {t('tourism.finland.helsinki')}
                </Typography>
                <Typography sx={{ color: DIM, fontSize: '0.95rem', mb: 4, maxWidth: 800 }}>
                  {t('tourism.finland.helsinkiDesc')}
                </Typography>
                <HelsinkiAttractions items={helsinkiAttractions} images={helsinkiImages} />
              </Box>

              {/* Day Trips */}
              <Box sx={{ mb: 8 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
                  {t('tourism.finland.dayTrips')}
                </Typography>
                <Typography sx={{ color: DIM, fontSize: '0.95rem', mb: 4, maxWidth: 800 }}>
                  {t('tourism.finland.dayTripsDesc')}
                </Typography>
                <DayTripsGrid items={dayTripsItems} images={dayTripImages} />
              </Box>

              {/* Dining */}
              <Box sx={{ mb: 6 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 1 }}>
                  {t('tourism.finland.dining')}
                </Typography>
                <Typography sx={{ color: DIM, fontSize: '0.95rem', mb: 5, maxWidth: 800 }}>
                  {t('tourism.finland.diningDesc')}
                </Typography>

                {/* Sub-section: Hotel */}
                <Box sx={{ mb: 5 }}>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.4rem', md: '1.7rem' }, color: CREAM, mb: 3, lineHeight: 1.2 }}>
                    {t('tourism.finland.diningCatHotel')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {diningHotel.map((item, i) => (
                      <RestaurantCard
                        key={item.id}
                        item={item}
                        image={restaurantImage(item.id, 'hotel')}
                        expanded={false}
                        onToggle={() => {}}
                        onOpenDetail={openRestaurant}
                        index={i}
                        category="hotel"
                      />
                    ))}
                  </Box>
                </Box>

                {/* Sub-section: Western */}
                <Box sx={{ mb: 5 }}>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.4rem', md: '1.7rem' }, color: CREAM, mb: 3, lineHeight: 1.2 }}>
                    {t('tourism.finland.diningCatWestern')}
                  </Typography>
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

                {/* Sub-section: Chinese */}
                <Box>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: '1.4rem', md: '1.7rem' }, color: CREAM, mb: 3, lineHeight: 1.2 }}>
                    {t('tourism.finland.diningCatChinese')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {diningChinese.map((item, i) => (
                      <RestaurantCard
                        key={item.id}
                        item={item}
                        image={restaurantImage(item.id, 'chinese')}
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
            </CountrySection>
          )}

          {activeCountry === 'norway' && (
            <CountrySection
              id="norway"
              eyebrow="02 — Norway"
              title={t('tourism.norway.title')}
              intro={t('tourism.norway.intro')}
              image={NORWAY_HEADER}
            >
              <Box sx={{ mb: 6 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
                  {t('tourism.norway.routes')}
                </Typography>
                <CountryRoutesGrid items={norwayRoutes} images={norwayImages} height={220} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
                  {t('tourism.norway.activities')}
                </Typography>
                <ListBlock items={norwayActs} columns={3} />
              </Box>
            </CountrySection>
          )}

          {activeCountry === 'iceland' && (
            <CountrySection
              id="iceland"
              eyebrow="03 — Iceland"
              title={t('tourism.iceland.title')}
              intro={t('tourism.iceland.intro')}
              image={ICELAND_HEADER}
            >
              <Box sx={{ mb: 6 }}>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
                  {t('tourism.iceland.routes')}
                </Typography>
                <CountryRoutesGrid items={icelandRoutes} images={icelandImages} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
                  {t('tourism.iceland.activities')}
                </Typography>
                <ListBlock items={icelandActs} columns={3} />
              </Box>
            </CountrySection>
          )}

          {activeCountry === 'denmark' && (
            <CountrySection
              id="denmark"
              eyebrow="04 — Denmark"
              title={t('tourism.denmark.title')}
              intro={t('tourism.denmark.intro')}
              image={DENMARK_HEADER}
            >
              <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 3 }}>
                {t('tourism.denmark.routes')}
              </Typography>
              <CountryRoutesGrid items={denmarkRoutes} images={denmarkImages} />
            </CountrySection>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 8. Testimonials marquee */}
      <TestimonialsMarquee title={t('testimonials.title')} items={testimonials} direction="left" />

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. About */}
      <AboutSection />

      {/* 11. Contact */}
      <ContactSection />

      {/* 12. Footer */}
      <Footer />

      {/* Restaurant detail modal — Google Maps + full info */}
      <RestaurantModal
        open={!!restaurantDetail}
        item={restaurantDetail?.item}
        image={restaurantDetail?.image}
        onClose={closeRestaurant}
      />
    </Box>
  );
}
