import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import './i18n';
import AppAppBar from './components/AppAppBar';
import LandingPage from './LandingPage';
import LandingPage1 from './LandingPage1';
import LandingPageMice from './LandingPageMice';
import TourDetailPage from './TourDetailPage';
import ChatWidget from './components_shared/ChatWidget';
import getLPTheme from './getLPTheme';

function parseTourFromHash() {
  const hash = window.location.hash || '';
  const m = hash.match(/^#\/tour\/([a-z]+)/i);
  return m ? m[1] : null;
}

function App() {
  const [activeSite, setActiveSite] = useState('experience');
  const [tourId, setTourId] = useState(parseTourFromHash);
  const { t } = useTranslation();

  useEffect(() => {
    const onHashChange = () => setTourId(parseTourFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const theme = createTheme(getLPTheme('dark'));

  const experienceNavItems = [
    { label: t('nav.china'), sectionId: 'china' },
    { label: t('nav.nordic'), sectionId: 'nordic' },
    { label: t('nav.testimonials'), sectionId: 'testimonials' },
    { label: t('nav.faq'), sectionId: 'faq' },
    { label: t('nav.contact'), sectionId: 'contact' },
  ];

  const educationNavItems = [
    { label: t('nav.schools'), sectionId: 'schools' },
    { label: t('nav.training'), sectionId: 'training' },
    { label: t('nav.studyTours'), sectionId: 'studyTours' },
    { label: t('nav.faq'), sectionId: 'faq' },
    { label: t('nav.contact'), sectionId: 'contact' },
  ];

  const miceNavItems = [
    { label: t('nav.miceList'), sectionId: 'miceList' },
    { label: t('nav.miceServices'), sectionId: 'miceServices' },
    { label: t('nav.testimonials'), sectionId: 'testimonials' },
    { label: t('nav.contact'), sectionId: 'contact' },
  ];

  const navItemsBySite = {
    experience: experienceNavItems,
    education: educationNavItems,
    mice: miceNavItems,
  };
  const navItems = navItemsBySite[activeSite] || experienceNavItems;

  const renderSite = () => {
    if (activeSite === 'experience') return <LandingPage />;
    if (activeSite === 'education') return <LandingPage1 />;
    if (activeSite === 'mice') return <LandingPageMice />;
    return <LandingPage />;
  };

  const goBackToLanding = () => {
    window.location.hash = '';
    setTourId(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {tourId ? (
        <TourDetailPage tourId={tourId} onBack={goBackToLanding} />
      ) : (
        <>
          <AppAppBar
            activeSite={activeSite}
            onSiteChange={setActiveSite}
            navItems={navItems}
          />
          {renderSite()}
        </>
      )}
      <ChatWidget />
    </ThemeProvider>
  );
}

export default App;
