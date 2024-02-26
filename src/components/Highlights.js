import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle, Button } from '@mui/material';

const items = [
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Viking Line Cruise',
    description: 'Embark on a majestic journey through the Baltic Sea, exploring scenic coastlines and historic ports with the comfort and elegance of our Viking Line Cruises.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'VR Train Expeditions',
    description: 'Experience the beauty of the Nordic landscapes through the window of our VR trains, offering fast, eco-friendly, and comfortable travel across the region.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Husky Sled Adventures',
    description: 'Dive into the thrill of the Arctic wilderness with our Husky Sled Adventures, where you can steer your own sled team across frozen landscapes under the Northern Lights.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Sailing Cruise Trip',
    description: 'Set sail on a breathtaking cruise, navigating the clear Nordic waters and discovering secluded islands, with opportunities for fishing, swimming, and wildlife spotting.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Aurora Borealis Tours',
    description: 'Join us for an unforgettable night under the stars, where we chase the mesmerizing Northern Lights, offering guided tours in prime viewing locations.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Ski and Snowboard Escapes',
    description: 'Hit the slopes with our premium ski and snowboard packages, catering to all skill levels and offering access to top resorts with breathtaking mountain views.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Wildlife Photography Safaris',
    description: 'Capture the majestic beauty of Nordic wildlife on our photography safaris, guided by professional photographers through untouched natural habitats.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Kayak Expeditions',
    description: 'Paddle through serene fjords and along rugged coastlines on our guided kayak expeditions, suitable for adventurers of all experience levels.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Guided Hiking Tours',
    description: 'Explore the great outdoors with our guided hiking tours, featuring breathtaking trails through national parks, mountains, and coastal paths.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Nordic Culinary Experiences',
    description: 'Savor the flavors of the North with our culinary tours, offering tastings of traditional dishes, visits to local markets, and cooking classes with expert chefs.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Cultural Festival Tours',
    description: 'Immerse yourself in Nordic culture with our festival tours, attending authentic celebrations, music festivals, and historical reenactments.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Castle and Heritage Sites',
    description: 'Step back in time as you visit ancient castles, Viking settlements, and UNESCO World Heritage sites, rich in history and architectural marvels.',
  },
];

export default function Highlights() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleOpenDialog = (item) => () => {
    setCurrentItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(null); // Reset current item when closing the dialog
  };  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
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
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
      Explore our services and connections to our partners.
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
                {React.cloneElement(item.icon, {
                    sx: { color: 'white' }
                })}
                </Box>
                <div>
                  <Typography fontWeight="xxlarge" gutterBottom sx={{ color: 'white' }}>
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
            <Button onClick={handleCloseDialog}>Close</Button>
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
