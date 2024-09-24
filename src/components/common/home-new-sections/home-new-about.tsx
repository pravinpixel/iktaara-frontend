import ImageComponent from '@/utils/imageComponent';
import { Box, Container, Grid } from '@mui/material';
import Image from 'next/image';

// type CategoryBlockProps = {
//   category: Array<any>;
//   products: Array<any>;
// };

const HomeNewAbout = () => {
  return (
    <>
      <Box sx={{ pt: 3, pb: 3 }}>
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid
                item
                md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box>
                  <p className="about-title">About Iktaraa</p>
                  <p className="about-title1">
                    Iktaraa is an initiative by the founders of the oldest
                    Musical organization in India to connect Music enthusiasts
                    with the world of Music on a single platform. The platform
                    caters to aspirants who want to study music by helping them
                    find the best and the closest teaching facility with the
                    highest quality standards (Learn).
                  </p>
                  <Grid item xs={12} className="about-button">
                    <Box className="about-card">
                      <p>Learn More</p>
                      <ImageComponent
                        src="/icons/vector-arrow.png"
                        width={10}
                        height={13}
                        alt="arrow"
                        priority={true}
                        className="arrow-image"
                      />
                    </Box>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative', aspectRatio: 1.466 }}>
                  <Image src="/images/home1/about_image.png" fill alt="about" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomeNewAbout;
