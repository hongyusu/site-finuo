import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';


const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Fjord Explorer Journey',
    days: 'Duration: 3 days',
    description: 'Embark on a voyage through the serene waters of the Nordic fjords, witnessing breathtaking landscapes and pristine nature.',
    imageLight: 'url("/images/1_light.jpg")',
    imageDark: 'url("/images/1_dark.jpg")',
    tasks: [
      {
        time: '08:00',
        name: 'Boarding the vessel',
        type: 'Preparation',
        description: 'Meet at the harbor to board our state-of-the-art exploration vessel.'
      },
      {
        time: '09:00',
        name: 'Fjord navigation briefing',
        type: 'Education',
        description: 'Receive a comprehensive briefing on fjord geography and navigation techniques.'
      },
      {
        time: '11:00',
        name: 'Wildlife spotting',
        type: 'Activity',
        description: 'Spot and learn about local wildlife, including seals, eagles, and dolphins.'
      },
      {
        time: '13:00',
        name: 'Lunch at a remote cove',
        type: 'Meal',
        description: 'Enjoy a gourmet lunch prepared by our onboard chef in a secluded cove.'
      },
      {
        time: '15:00',
        name: 'Kayaking adventure',
        type: 'Adventure',
        description: 'Explore the fjords up close in a kayak, guided by our expert instructors.'
      },
      {
        time: '18:00',
        name: 'Evening reflections',
        type: 'Relaxation',
        description: 'Reflect on the day’s adventures over dinner as we anchor in a peaceful bay.'
      },
    ]
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Midnight Sun Hiking',
    days: 'Duration: 3 days',
    description: 'Discover the magic of the midnight sun with guided hikes through the untouched Nordic wilderness, offering unparalleled views and solitude.',
    imageLight: 'url("/images/2_light.jpg")',
    imageDark: 'url("/images/2_dark.jpg")',
    tasks: [
      {
        time: '20:00',
        name: 'Pre-hike orientation',
        type: 'Preparation',
        description: 'Gather for an orientation session on the unique phenomena of the midnight sun.'
      },
      {
        time: '21:00',
        name: 'Hike commencement',
        type: 'Departure',
        description: 'Begin the hike under the ethereal light of the midnight sun, with stops at scenic outlooks.'
      },
      {
        time: '23:00',
        name: 'Mid-hike campfire',
        type: 'Activity',
        description: 'Enjoy stories and local delicacies by the campfire, surrounded by the tranquil night.'
      },
      {
        time: '01:00',
        name: 'Summit at midnight',
        type: 'Highlight',
        description: 'Reach the summit to experience the full majesty of the sun at midnight, a moment of awe and serenity.'
      },
      {
        time: '03:00',
        name: 'Descent and return',
        type: 'Return',
        description: 'Descend under the still-bright sky, returning with memories of an unforgettable journey.'
      },
    ]
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Viking Heritage Tour',
    days: 'Duration: 3 days',
    description: 'Step back in time on a cultural odyssey exploring the rich Viking heritage of the Nordics, from ancient ruins to historic villages.',
    imageLight: 'url("/images/3_light.jpg")',
    imageDark: 'url("/images/3_dark.jpg")',
    tasks: [
      {
        time: '10:00',
        name: 'Museum visit',
        type: 'Cultural',
        description: 'Start the day with a guided tour of the National Viking Museum, showcasing rare artifacts.'
      },
      {
        time: '12:00',
        name: 'Traditional Viking lunch',
        type: 'Meal',
        description: 'Enjoy a meal of traditional Viking fare in a reconstructed longhouse.'
      },
      {
        time: '14:00',
        name: 'Archaeological site exploration',
        type: 'Adventure',
        description: 'Explore an archaeological site with remnants from the Viking Age, guided by an expert historian.'
      },
      {
        time: '16:00',
        name: 'Viking shipbuilding workshop',
        type: 'Education',
        description: 'Participate in a workshop on ancient shipbuilding techniques, crafting a miniature Viking ship.'
      },
      {
        time: '18:00',
        name: 'Evening saga storytelling',
        type: 'Entertainment',
        description: 'Conclude the day with an evening of Viking sagas and legends, narrated by a local skald.'
      },
    ]
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Arctic Survival Challenge',
    days: 'Duration: 3 days',
    description: 'Test your limits with an immersive survival experience in the Arctic wilderness, guided by seasoned survival experts.',
    imageLight: 'url("/images/4_light.jpg")',
    imageDark: 'url("/images/4_dark.jpg")',
    tasks: [
      {
        time: '07:00',
        name: 'Survival skills briefing',
        type: 'Preparation',
        description: 'Begin with a briefing on essential survival skills and gear preparation.'
      },
      {
        time: '09:00',
        name: 'Shelter building',
        type: 'Activity',
        description: 'Learn to build a shelter using natural materials found in the Arctic environment.'
      },
      {
        time: '12:00',
        name: 'Ice fishing',
        type: 'Activity',
        description: 'Try your hand at ice fishing, learning techniques to catch fish in frozen lakes.'
      },
      {
        time: '15:00',
        name: 'Wilderness navigation',
        type: 'Education',
        description: 'Navigate through the wilderness using traditional and modern tools under expert guidance.'
      },
      {
        time: '18:00',
        name: 'Campfire cooking',
        type: 'Meal',
        description: 'Prepare a meal with your catch of the day, cooking over an open campfire.'
      },
      {
        time: '20:00',
        name: 'Arctic survival tactics',
        type: 'Education',
        description: 'Evening discussion on advanced survival tactics and strategies for the Arctic environment.'
      },
    ]
  },
];

export default function Packages() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);


  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="packages" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
             Popular destinations and routes 
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
      Here you find a selection of travel packages around Nordics.
            </Typography>
          </div>
          <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'primary.light' : '';
                    }
                    return selectedItemIndex === index ? 'primary.light' : '';
                  },
                  background: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'none' : '';
                    }
                    return selectedItemIndex === index ? 'none' : '';
                  },
                  backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                  '& .MuiChip-label': {
                    color: selectedItemIndex === index ? '#fff' : '',
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: 'auto', sm: 'none' },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography color="text.primary" variant="body2" fontWeight="bold">
                {selectedFeature.title}
              </Typography>
              <Typography color="text.primary" variant="body2" fontWeight="bold">
                {selectedFeature.days}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                {selectedFeature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: '1px', ml: '2px' }}
                />
              </Link>
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {items.map(({ icon, title, days, description }, index) => (
              <Card
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor:
                    selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index
                        ? 'primary.light'
                        : 'grey.200';
                    }
                    return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.300';
                        }
                        return selectedItemIndex === index
                          ? 'primary.main'
                          : 'grey.700';
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <div>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {days}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      //onClick={(event) => {
                      //  event.stopPropagation();
                      //}}

        onClick={handleClickOpen} // Modified to open the dialog
                    >
                      <span>Learn more and book</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{"Explore Our Adventures"}</DialogTitle>
        <DialogContent>
          <Typography>{items[selectedItemIndex].description}</Typography>
          <Timeline position="alternate">
            {items[selectedItemIndex].tasks.map((task, index) => (

                <TimelineItem key={index}>
                    <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                    >
                            {task.time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                            {task.name}
                    </Typography>
                    <Typography>
                            {task.description}
                            {task.title}
                            </Typography>
                    </TimelineContent>
                </TimelineItem>
            ))}
          </Timeline>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
                  </div>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                m: 'auto',
                width: 500,
                height: 600,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat', // Prevents the background image from repeating
                backgroundPosition: 'center', // Centers the background image
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
