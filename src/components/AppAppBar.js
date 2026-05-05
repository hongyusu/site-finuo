import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function AppAppBar({ activeSite, onSiteChange, navItems }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
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
    return () => { clearTimeout(timeoutId); observer.disconnect(); };
  }, [navItems, activeSite]);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      setOpen(false);
    }
  };

  const switchSite = (site) => {
    onSiteChange(site);
    setActiveSection('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? 'rgba(13, 13, 13, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(245, 242, 237, 0.06)' : 'none',
          transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 3, md: 6 }, py: 2, maxWidth: 1400, mx: 'auto', width: '100%' }}>
          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/images/finuo_logo.svg" style={{ width: 48, height: 'auto' }} alt="Finuo" />
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 500, letterSpacing: '0.05em', color: '#F5F2ED' }}>
              Finuo
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
            {/* Site Switcher */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              {['experience', 'education', 'mice'].map((site) => (
                <Typography
                  key={site}
                  onClick={() => switchSite(site)}
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: activeSite === site ? '#C4A35A' : 'rgba(245, 242, 237, 0.4)',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': { color: '#F5F2ED' },
                  }}
                >
                  {t(`nav.${site}`)}
                </Typography>
              ))}
            </Box>

            {/* Divider */}
            <Box sx={{ width: 1, height: 16, bgcolor: 'rgba(245, 242, 237, 0.12)' }} />

            {/* Section Nav */}
            {navItems.map((item) => (
              <Typography
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: activeSection === item.sectionId ? '#F5F2ED' : 'rgba(245, 242, 237, 0.4)',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    width: activeSection === item.sectionId ? '100%' : '0%',
                    height: 1,
                    bgcolor: '#C4A35A',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': { color: '#F5F2ED' },
                  '&:hover::after': { width: '100%' },
                }}
              >
                {item.label}
              </Typography>
            ))}

            {/* Language */}
            <Typography
              onClick={toggleLanguage}
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: 'rgba(245, 242, 237, 0.4)',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': { color: '#F5F2ED' },
              }}
            >
              {i18n.language === 'zh' ? 'EN' : '中文'}
            </Typography>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{ display: { md: 'none' }, color: '#F5F2ED' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </AppBar>

      {/* Mobile Drawer — Full Screen Overlay */}
      <Drawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            height: '100dvh',
            background: '#0D0D0D',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', top: 24, right: 24, color: '#F5F2ED' }}
        >
          <CloseIcon />
        </IconButton>

        {/* Site Switcher */}
        <Box sx={{ display: 'flex', gap: 4, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['experience', 'education', 'mice'].map((site) => (
            <Typography
              key={site}
              onClick={() => switchSite(site)}
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.5rem',
                color: activeSite === site ? '#C4A35A' : 'rgba(245, 242, 237, 0.3)',
                cursor: 'pointer',
              }}
            >
              {t(`nav.${site}`)}
            </Typography>
          ))}
        </Box>

        {/* Nav Links */}
        {navItems.map((item) => (
          <Typography
            key={item.sectionId}
            onClick={() => scrollToSection(item.sectionId)}
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2rem',
              color: 'rgba(245, 242, 237, 0.6)',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              '&:hover': { color: '#F5F2ED' },
            }}
          >
            {item.label}
          </Typography>
        ))}

        <Button
          onClick={toggleLanguage}
          sx={{ mt: 4, color: 'rgba(245, 242, 237, 0.4)', fontSize: '0.85rem', letterSpacing: '0.1em' }}
        >
          {i18n.language === 'zh' ? 'English' : '中文'}
        </Button>
      </Drawer>
    </>
  );
}

AppAppBar.propTypes = {
  activeSite: PropTypes.oneOf(['experience', 'education', 'mice']).isRequired,
  onSiteChange: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      sectionId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AppAppBar;
