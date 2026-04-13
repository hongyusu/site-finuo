import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import ToggleColorMode from './ToggleColorMode';

const logoStyle = {
  width: '60px',
  height: 'auto',
  cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode, activeSite, onSiteChange, navItems }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const timeoutId = setTimeout(() => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.sectionId);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [navItems, activeSite]);

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 100;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  const handleSiteChange = (event, newValue) => {
    if (newValue !== null) {
      onSiteChange(newValue);
      setActiveSection('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: scrolled ? 0 : 2,
        transition: 'margin-top 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: scrolled ? '12px' : '999px',
            bgcolor:
              theme.palette.mode === 'light'
                ? scrolled
                  ? 'rgba(255, 255, 255, 0.92)'
                  : 'rgba(255, 255, 255, 0.4)'
                : scrolled
                  ? 'rgba(0, 0, 0, 0.88)'
                  : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            minHeight: 56,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? scrolled
                  ? '0 2px 12px rgba(85, 166, 246, 0.12)'
                  : '0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)'
                : scrolled
                  ? '0 2px 12px rgba(2, 31, 59, 0.4)'
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            transition: 'all 0.3s ease',
          })}
        >
          {/* Logo + Site Switcher */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img
              src="/images/finuo_logo.svg"
              style={logoStyle}
              alt="Finuo logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <Tabs
              value={activeSite}
              onChange={handleSiteChange}
              sx={{
                display: { xs: 'none', md: 'flex' },
                minHeight: 36,
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                },
                '& .MuiTab-root': {
                  minHeight: 36,
                  textTransform: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  px: 1.5,
                  py: 0.5,
                },
              }}
            >
              <Tab label={t('nav.experience')} value="experience" />
              <Tab label={t('nav.education')} value="education" />
            </Tabs>
          </Box>

          {/* Desktop Nav Items */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.sectionId}
                variant="text"
                size="small"
                onClick={() => scrollToSection(item.sectionId)}
                sx={{
                  color: 'text.primary',
                  fontWeight: activeSection === item.sectionId ? 600 : 400,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  px: 1.5,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: activeSection === item.sectionId ? '60%' : '0%',
                    height: 2,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '60%',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 0.5, height: 24, alignSelf: 'center' }}
            />
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            <Button
              variant="text"
              size="small"
              onClick={toggleLanguage}
              sx={{
                minWidth: '32px',
                height: '32px',
                p: '4px',
                color: 'text.primary',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
              startIcon={<LanguageIcon fontSize="small" />}
            >
              {i18n.language === 'zh' ? 'EN' : '中文'}
            </Button>
            <Button color="primary" variant="text" size="small" href="#">
              {t('nav.signIn')}
            </Button>
            <Button color="primary" variant="contained" size="small" href="#">
              {t('nav.signUp')}
            </Button>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { md: 'none' } }}>
            <IconButton
              color="primary"
              aria-label="open menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: '60dvw',
                  p: 2,
                  backgroundColor: 'background.paper',
                  flexGrow: 1,
                }}
              >
                {/* Drawer Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img
                      src="/images/finuo_logo.svg"
                      style={{ width: '40px', height: 'auto' }}
                      alt="Finuo logo"
                    />
                    <Typography variant="subtitle2" fontWeight={600}>
                      Finuo{' '}
                      {activeSite === 'experience' ? t('nav.experience') : t('nav.education')}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                    <Button
                      variant="text"
                      size="small"
                      onClick={toggleLanguage}
                      sx={{
                        minWidth: '32px',
                        height: '32px',
                        p: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                      startIcon={<LanguageIcon fontSize="small" />}
                    >
                      {i18n.language === 'zh' ? 'EN' : '中文'}
                    </Button>
                    <IconButton onClick={toggleDrawer(false)} size="small">
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>

                {/* Site Switcher */}
                <Tabs
                  value={activeSite}
                  onChange={handleSiteChange}
                  variant="fullWidth"
                  sx={{
                    mb: 2,
                    minHeight: 40,
                    '& .MuiTab-root': {
                      minHeight: 40,
                      textTransform: 'none',
                      fontWeight: 600,
                    },
                  }}
                >
                  <Tab label={t('nav.experience')} value="experience" />
                  <Tab label={t('nav.education')} value="education" />
                </Tabs>

                <Divider sx={{ mb: 1 }} />

                {/* Nav Items */}
                {navItems.map((item) => (
                  <Button
                    key={item.sectionId}
                    fullWidth
                    onClick={() => scrollToSection(item.sectionId)}
                    sx={{
                      justifyContent: 'flex-start',
                      py: 1,
                      px: 2,
                      color: 'text.primary',
                      fontWeight: activeSection === item.sectionId ? 600 : 400,
                      textTransform: 'none',
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                <Divider sx={{ my: 1 }} />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  href="#"
                  sx={{ mb: 1 }}
                >
                  {t('nav.signUp')}
                </Button>
                <Button color="primary" variant="outlined" fullWidth href="#">
                  {t('nav.signIn')}
                </Button>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  activeSite: PropTypes.oneOf(['experience', 'education']).isRequired,
  onSiteChange: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      sectionId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AppAppBar;
