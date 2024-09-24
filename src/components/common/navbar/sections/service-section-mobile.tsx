import ImageComponent from '@/utils/imageComponent';
import { Box, Container, Grid } from '@mui/material';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Fragment } from 'react';

interface Props {
  onCloseAccordion: () => void; // Add closeBox prop
}

const ServicesSectionsMobile = ({ onCloseAccordion }: Props) => {
  const handleClick = () => {
    onCloseAccordion(); // Notify parent component to close the accordion
    // Your other logic here
  };
  const musicImage = [
    {
      image: '/images/home/home-learn.png',
      text: 'Learn',
    },
    {
      image: '/images/home/paly.png',
      text: 'Play',
    },
    {
      image: '/images/home/perform.png',
      text: 'Perform',
    },
    {
      image: '/images/home/connect.png',
      text: 'Connect',
    },
    {
      image: '/images/home/upgrade.png',
      text: 'Upgrade',
    },
  ];

  return (
    <>
      <section className="menu-mobile-service">
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
        >
          <Box
            sx={{
              paddingBottom: '4px',
            }}
            onClick={handleClick}
          >
            <Grid container>
              <Grid item md={6}>
                <Box sx={{ pt: 6 }}>
                  <Box sx={{ display: 'flex' }}>
                    <p className="homenew-text-service-mobile">
                      One Stop Digital Platform for
                    </p>
                    <div className="vector-img">
                      <ImageComponent
                        src="/images/home/vector.png"
                        width={40}
                        height={33}
                        alt="arrow"
                        priority={true}
                      />
                      {/* <img src="/images/home/vector.png" /> */}
                    </div>
                  </Box>
                  <p className="homenew-music-service-mobile">
                    All Things with Music!
                  </p>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box
                  sx={{
                    mt: 2,
                    mb: 2,
                    p: { xs: 0, md: 1 },
                    ml: { xs: '-15px', md: 0 },
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: '10px',
                      justifyContent: 'center',
                    }}
                  >
                    {musicImage.map((item, index) => (
                      <Fragment key={index}>
                        <Box className="guitars-img-service">
                          <div className="guitars-imgservice">
                            {/* <img src={item.image}></img> */}
                            <ImageComponent
                              src={item.image}
                              width={78}
                              height={78}
                              alt="serves"
                              priority={true}
                            />
                          </div>
                          <p className="guitars-text-service">{item.text}</p>
                        </Box>
                      </Fragment>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </section>
    </>
  );
};

export default ServicesSectionsMobile;
