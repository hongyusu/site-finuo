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
    title: "Promoting Local Finnish Educational Resources",
    description: "We connect students with a wide range of educational opportunities in Finland, including renowned universities, vocational schools, and high schools. We provide detailed information about these institutions, their programs, and their unique offerings."
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "School and Program Selection Assistance",
    description: "We understand that choosing the right school and program is crucial for students' academic and career aspirations. Our experienced consultants work closely with students to assess their academic interests, career goals, and personal preferences. Based on this information, we provide personalized guidance to help students make informed decisions."
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Application Guidance and Support",
    description: "Navigating the application process can be overwhelming. We offer comprehensive guidance and support to ensure students meet all application requirements. Our consultants assist students in preparing their application materials, such as resumes, essays, and recommendation letters, to maximize their chances of success."
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Visa and Immigration Assistance",
    description: "We provide valuable support in the visa and immigration process. Our team assists students with document preparation, appointment scheduling, and guidance on fulfilling the necessary requirements. We strive to simplify the visa process and ensure a smooth transition for students."
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Accommodation and Adaptation Support",
    description: "Moving to a new country can be challenging. We offer guidance on finding suitable accommodation options that align with students' preferences and budgets. Additionally, we provide cultural orientation and language training to help students adapt to their new environment and make the most of their study abroad experience."
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Scholarship and Financial Aid Support",
    description: "We recognize the importance of financial considerations in pursuing an education abroad. Our consultants provide guidance on available scholarships and financial aid opportunities, helping students explore options to fund their studies and alleviate financial burdens."
  },
];

export default function Services() {
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
      id="services"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'black',
        bgcolor: 'white',
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
      Education Services
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
Finuo Education Consulting is your trusted partner in making your dreams of studying abroad a reality. Our comprehensive range of services is designed to support students at every step of their journey:
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
