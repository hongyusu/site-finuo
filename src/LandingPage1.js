import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Hero from './components_education/Hero';
import LogoCollection from './components_education/LogoCollection';
import Services from './components_education/Services';
import Testimonials from './components_education/Testimonials';
import FAQ from './components_education/FAQ';
import Footer from './components_education/Footer';

export default function LandingPage1() {
  return (
    <>
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Divider />
        <Services />
        <Divider />
        <Testimonials />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </>
  );
}
