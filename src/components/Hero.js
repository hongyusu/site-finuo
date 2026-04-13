import * as React from 'react';
import { alpha, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            FINUO&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              {t('hero.experienceTitle')}
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            {t('hero.experienceTagline')}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
         </Stack>
        </Stack>
    <Box
      id="video"
      sx={{
        mt: { xs: 8, sm: 0 },
        alignSelf: 'center',
        height: { xs: 1200, sm: 700 },
        width: '150%',
        borderRadius: '10px',
        outline: '1px solid',
        outlineColor:
          theme.palette.mode === 'light'
            ? alpha('#BFCCD9', 0.5)
            : alpha('#9CCCFC', 0.1),
        boxShadow:
          theme.palette.mode === 'light'
            ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
            : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
      }}
    >
      <video
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '10px',
          objectFit: 'cover',
        }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src={'/videos/hero.mp4'}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </Box>
      </Container>
    </Box>
  );
}
