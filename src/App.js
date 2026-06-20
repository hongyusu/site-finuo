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
import InstitutionDetailPage from './InstitutionDetailPage';
import ChatWidget from './components_shared/ChatWidget';
import getLPTheme from './getLPTheme';

// Parse the hash into a detail route (tour/institution) and/or an active sub-site.
// Sub-sites are real, shareable URLs: #/education, #/mice (travel is the bare root).
function parseHash() {
  const hash = window.location.hash || '';
  let m = hash.match(/^#\/tour\/([a-z-]+)/i);
  if (m) return { detail: { type: 'tour', id: m[1] }, site: null };
  m = hash.match(/^#\/institution\/([a-z-]+)/i);
  if (m) return { detail: { type: 'institution', id: m[1] }, site: 'education' };
  m = hash.match(/^#\/(education|mice)\b/i);
  if (m) return { detail: null, site: m[1].toLowerCase() };
  return { detail: null, site: 'experience' };
}

function App() {
  const initial = parseHash();
  const [activeSite, setActiveSite] = useState(initial.site || 'experience');
  const [route, setRoute] = useState(initial.detail);
  const { t } = useTranslation();

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash();
      setRoute(parsed.detail);
      if (parsed.site) setActiveSite(parsed.site);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Switch sub-site and reflect it in the URL so it is shareable / back-navigable.
  const handleSiteChange = (site) => {
    setActiveSite(site);
    window.location.hash = site === 'experience' ? '' : `/${site}`;
  };

  const theme = createTheme(getLPTheme('dark'));

  const experienceNavItems = [
    { label: t('nav.china'), sectionId: 'china' },
    { label: t('nav.chinaGuide'), sectionId: 'chinaGuide' },
    { label: t('nav.nordic'), sectionId: 'nordic' },
    { label: t('nav.book'), href: 'https://travel.finuo.fi/search?vendor_id=14' },
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
    const site = route?.type === 'institution' ? 'education' : 'experience';
    setRoute(null);
    setActiveSite(site);
    window.location.hash = site === 'experience' ? '' : `/${site}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {route?.type === 'tour' ? (
        <TourDetailPage tourId={route.id} onBack={goBackToLanding} />
      ) : route?.type === 'institution' ? (
        <InstitutionDetailPage institutionId={route.id} onBack={goBackToLanding} />
      ) : (
        <>
          <AppAppBar
            activeSite={activeSite}
            onSiteChange={handleSiteChange}
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
