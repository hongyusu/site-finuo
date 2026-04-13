import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const items = t('educationServices.items', { returnObjects: true });

  const handleOpenDialog = (item) => () => {
    setCurrentItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(null);
  };

  return (
    <Box
      id="services"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'text.primary',
        bgcolor: 'background.default',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            {t('educationServices.title')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            {t('educationServices.description')}
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
                onClick={handleOpenDialog(item)}
              >
                <Box sx={{ opacity: '90%' }}>
                  <SupportAgentRoundedIcon sx={{ color: 'text.primary' }} />
                </Box>
                <div>
                  <Typography fontWeight="bold" gutterBottom sx={{ color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
              {currentItem && (
                <Dialog
                  open={openDialog}
                  onClose={handleCloseDialog}
                  aria-labelledby="dialog-title"
                  aria-describedby="dialog-description"
                >
                  <DialogTitle id="dialog-title">{currentItem.title}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="dialog-description">
                      {currentItem.description}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>{t('educationServices.close')}</Button>
                  </DialogActions>
                </Dialog>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
