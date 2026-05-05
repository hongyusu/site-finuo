import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeIn, SectionHeader } from './sections';

const GOLD = '#C4A35A';
const CREAM = '#F5F2ED';
const DIM = 'rgba(245,242,237,0.5)';

export function AboutSection() {
  const { t } = useTranslation();
  return (
    <Box id="about" sx={{ py: { xs: 10, md: 16 }, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box component={motion.div} {...fadeIn}>
              <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, mb: 2 }}>
                {t('about.title')}
              </Typography>
              <Typography variant="h2" sx={{ color: CREAM, mb: 3 }}>
                {t('about.subtitle')}
              </Typography>
              <Typography sx={{ color: DIM, lineHeight: 1.8, mb: 4 }}>
                {t('about.intro')}
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: CREAM, mb: 1 }}>
                    {t('about.team')}
                  </Typography>
                  <Typography sx={{ color: DIM, fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {t('about.teamDesc')}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: CREAM, mb: 1 }}>
                    {t('about.partners')}
                  </Typography>
                  <Typography sx={{ color: DIM, fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {t('about.partnersDesc')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component={motion.div} {...fadeIn} sx={{ height: { xs: 320, md: 480 }, overflow: 'hidden' }}>
              <Box component="img" src="/images/destinations/cabin.jpg" alt="Finuo team" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const FORMSPREE_URL = 'https://formspree.io/f/xkoybgvn';

export function ContactSection() {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.target;
    const data = new FormData(form);
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        const body = await res.json().catch(() => ({}));
        const msg = body.errors?.[0]?.message || `Error ${res.status}`;
        setErrorMsg(msg);
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg('Network error — please try again or email booking@finuo.fi');
      setStatus('error');
    }
  };

  const buttonLabel =
    status === 'sending' ? '...' :
    status === 'sent'    ? '✓ Sent' :
    t('contact.formSubmit');

  return (
    <Box id="contact" sx={{ py: { xs: 10, md: 16 }, px: { xs: 2, md: 4 }, bgcolor: '#0A0A0A' }}>
      <Container maxWidth="lg">
        <SectionHeader eyebrow={t('contact.title')} title={t('contact.subtitle')} subtitle={t('contact.intro')} align="center" />
        <Grid container spacing={6} sx={{ mt: 2 }}>
          <Grid item xs={12} md={5}>
            <Box component={motion.div} {...fadeIn} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <ContactRow label={t('contact.email')} value="booking@finuo.fi" />
              <ContactRow label={t('contact.phone')} value="+358 40 000 0000" />
              <ContactRow label={t('contact.wechat')} value="finuo_helsinki" />
              <ContactRow label={t('contact.whatsapp')} value="+358 40 000 0000" />
              <ContactRow label={t('contact.address')} value={t('contact.addressValue')} />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              component={motion.form}
              {...fadeIn}
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                required
                name="name"
                placeholder={t('contact.formName')}
                variant="standard"
                InputProps={{ disableUnderline: false, sx: inputSx }}
                sx={fieldSx}
              />
              <TextField
                required
                type="email"
                name="email"
                placeholder={t('contact.formEmail')}
                variant="standard"
                InputProps={{ sx: inputSx }}
                sx={fieldSx}
              />
              <TextField
                required
                multiline
                minRows={4}
                name="message"
                placeholder={t('contact.formMessage')}
                variant="standard"
                InputProps={{ sx: inputSx }}
                sx={fieldSx}
              />
              {/* Honeypot for spam (Formspree convention) */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
              <Button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                sx={{
                  alignSelf: 'flex-start', mt: 2, px: 4, py: 1.5,
                  borderRadius: 0,
                  border: `1px solid ${GOLD}`,
                  color: status === 'sent' ? GOLD : CREAM,
                  bgcolor: 'transparent',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  '&:hover': { bgcolor: GOLD, color: '#0D0D0D' },
                  '&.Mui-disabled': { color: GOLD, borderColor: GOLD },
                }}
              >
                {buttonLabel}
              </Button>
              {status === 'error' && (
                <Typography sx={{ color: '#E57373', fontSize: '0.85rem', mt: 1 }}>
                  {errorMsg}
                </Typography>
              )}
              {status === 'sent' && (
                <Typography sx={{ color: GOLD, fontSize: '0.85rem', mt: 1 }}>
                  Thank you — we'll be in touch shortly.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function ContactRow({ label, value }) {
  return (
    <Box sx={{ borderBottom: '1px solid rgba(245,242,237,0.08)', pb: 2 }}>
      <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD, mb: 0.5 }}>
        {label}
      </Typography>
      <Typography sx={{ color: CREAM, fontSize: '1rem' }}>
        {value}
      </Typography>
    </Box>
  );
}

const inputSx = {
  color: CREAM,
  fontSize: '0.95rem',
  '&::before': { borderBottom: '1px solid rgba(245,242,237,0.15)' },
  '&:hover:not(.Mui-disabled)::before': { borderBottom: `1px solid ${GOLD}` },
  '&::after': { borderBottom: `1px solid ${GOLD}` },
};

const fieldSx = {
  '& .MuiInput-root::placeholder': { color: DIM },
  '& input::placeholder, & textarea::placeholder': { color: DIM, opacity: 1 },
};
