import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';


const userTestimonials = [
  {
    avatar: <Avatar alt="Elsa Nygård" src="/static/images/avatar/1.jpg" />,
    name: 'Elsa Nygård',
    occupation: 'Adventure Photographer',
    testimonial:
      "Exploring the Arctic wilderness with Finuo's Northern Lights trip was a surreal experience. Their expertise in choosing the perfect spots allowed me to capture some of my best shots under the celestial dance of the auroras.",
  },
  {
    avatar: <Avatar alt="Mikkel Jensen" src="/static/images/avatar/2.jpg" />,
    name: 'Mikkel Jensen',
    occupation: 'Nature Guide',
    testimonial:
      "Finuo's commitment to authentic Nordic experiences shines through their meticulously planned hiking tours. The vistas of untouched landscapes were breathtaking, and their knowledgeable guides made the journey unforgettable.",
  },
  {
    avatar: <Avatar alt="Sofia Karlsson" src="/static/images/avatar/3.jpg" />,
    name: 'Sofia Karlsson',
    occupation: 'Cultural Blogger',
    testimonial:
      "The Santa Claus Village tour with Finuo was magical. It was more than just a trip; it was stepping into a fairy tale. The joy on my children's faces was priceless, and the attention to detail made it a special family memory.",
  },
  {
    avatar: <Avatar alt="Liam O'Sullivan" src="/static/images/avatar/4.jpg" />,
    name: 'Liam O\'Sullivan',
    occupation: 'Ski Instructor',
    testimonial:
      "As a ski instructor, I've experienced many ski trips, but Finuo's ski trip was top-notch. The perfect balance of thrill and safety, with luxury accommodations, made it stand out. Highly recommended for both beginners and pros.",
  },
  {
    avatar: <Avatar alt="Anna Petrova" src="/static/images/avatar/5.jpg" />,
    name: 'Anna Petrova',
    occupation: 'Travel Influencer',
    testimonial:
      "The snowmobile adventure organized by Finuo was exhilarating! Racing across the snow-covered landscapes was a thrilling experience, and their team ensured everything was seamless from start to finish. The gear provided was first-rate, making the adventure not only thrilling but also safe.",
},
{
avatar: <Avatar alt="Oliver Thomson" src="/static/images/avatar/6.jpg" />,
name: 'Oliver Thomson',
occupation: 'Documentary Filmmaker',
testimonial:
"Documenting the Nordic cities with Finuo was an extraordinary journey. Their city tours are well-curated, combining historical depth with modern vibrancy. The insights provided by our guides were invaluable for our project.",
},
];
      
const whiteLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography component="h2" variant="h4" color="text.primary">
          Testimonials
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See what our customers love about our products. Discover how we excel in
          efficiency, durability, and satisfaction. Join us for quality, innovation,
          and reliable support.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
