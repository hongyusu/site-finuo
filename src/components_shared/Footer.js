'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { useTranslation } from 'react-i18next';

const logoStyle = {
  width: '140px',
  height: 'auto',
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="https://finuo.fi/">Finuo Oy&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Box sx={{ ml: '-15px' }}>
              <img
                src={'/images/finuo_logo.svg'}
                style={logoStyle}
                alt="Finuo logo"
              />
            </Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              {t('footer.newsletter')}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {t('footer.newsletterDesc')}
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label={t('footer.emailPlaceholder')}
                placeholder={t('footer.emailPlaceholder')}
                inputProps={{
                  autocomplete: 'off',
                  ariaLabel: t('footer.emailPlaceholder'),
                }}
              />
              <Button variant="contained" color="primary" sx={{ flexShrink: 0 }}>
                {t('footer.subscribe')}
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            {t('footer.product')}
          </Typography>
          <Link color="text.secondary" href="#">
            {t('footer.features')}
          </Link>
          <Link color="text.secondary" href="#">
            {t('nav.testimonials')}
          </Link>
          <Link color="text.secondary" href="#">
            {t('footer.highlights')}
          </Link>
          <Link color="text.secondary" href="#">
            {t('footer.pricing')}
          </Link>
          <Link color="text.secondary" href="#">
            {t('footer.faqs')}
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            {t('footer.company')}
          </Typography>
          <Link color="text.secondary" href="#">
            {t('footer.aboutUs')}
          </Link>
          <Link color="text.secondary" href="#">
            {t('footer.careers')}
          </Link>
          <Link color="text.secondary" href="#">
            {t('footer.press')}
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            {t('footer.legal')}
          </Typography>
          <Link color="text.secondary" href="#">
            {t('footer.terms')}
          </Link>
          <Link color="text.secondary" href="#">
            {t('footer.privacy')}
          </Link>
          <Link color="text.secondary" href="#">
            {t('footer.contact')}
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" href="#">
            {t('footer.privacyPolicy')}
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            {t('footer.termsOfService')}
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: 'text.secondary',
          }}
        >
          <IconButton
            color="inherit"
            href="#"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="#"
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <XIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="#"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
