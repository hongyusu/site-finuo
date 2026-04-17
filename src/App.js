import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import './i18n';
import AppAppBar from './components/AppAppBar';
import LandingPage from './LandingPage';
import LandingPage1 from './LandingPage1';
import getLPTheme from './getLPTheme';

function App() {
  const [activeSite, setActiveSite] = useState('experience');
  const { t } = useTranslation();

  const theme = createTheme(getLPTheme('dark'));

  const experienceNavItems = [
    { label: t('nav.packages'), sectionId: 'packages' },
    { label: t('nav.highlights'), sectionId: 'highlights' },
    { label: t('nav.testimonials'), sectionId: 'testimonials' },
    { label: t('nav.pricing'), sectionId: 'pricing' },
    { label: t('nav.faq'), sectionId: 'faq' },
  ];

  const educationNavItems = [
    { label: t('nav.services'), sectionId: 'services' },
    { label: t('nav.testimonials'), sectionId: 'testimonials' },
    { label: t('nav.pricing'), sectionId: 'pricing' },
    { label: t('nav.faq'), sectionId: 'faq' },
  ];

  const navItems =
    activeSite === 'experience' ? experienceNavItems : educationNavItems;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppAppBar
        activeSite={activeSite}
        onSiteChange={setActiveSite}
        navItems={navItems}
      />
      {activeSite === 'experience' ? <LandingPage /> : <LandingPage1 />}
    </ThemeProvider>
  );
}

export default App;
