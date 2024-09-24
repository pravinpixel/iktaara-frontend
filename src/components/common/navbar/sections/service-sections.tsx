// import { useRef, useState } from 'react';
// import {
//   ControlledMenu,
//   MenuItem,
//   SubMenu,
//   useHover,
//   useMenuState,
// } from '@szhsin/react-menu';
import ImageComponent from '@/utils/imageComponent';
import { Box, Container, Grid, Typography } from '@mui/material';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Fragment } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { display, textAlign } from 'styled-system';
interface Props {
  closeBox: () => void; // Add closeBox prop
}

const ServicesSections = ({ closeBox }: Props) => {
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
      <section
        className="home-topsection"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click event from propagating to the parent
          closeBox(); // Call the closeBox function from props
        }}
      >
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
        >
          <Box
            sx={{
              paddingTop: '10px',
              paddingBottom: '4px',
            }}
            className="d-md-block d-none"
          >
            <Grid container>
              <Grid item sm={12} lg={5}>
                <Box sx={{ pt: 6 }}>
                  <Box sx={{ display: 'flex' }} className="homenew-boxbg">
                    <Typography className="homenew-text-service">
                      One Stop Digital Platform for
                    </Typography>
                    <div className="vector-img">
                      {/* <img src="/images/home/vector.png" /> */}
                      <ImageComponent
                        src="/images/home/vector.png"
                        width={40}
                        height={33}
                        alt="arrow"
                        priority={true}
                      />
                    </div>
                  </Box>
                  <Typography className="homenew-music-service">
                    All Things with Music!
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={12} lg={7}>
                <Box
                  sx={{
                    mt: 2,
                    mb: 2,
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: '12px',
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

export default ServicesSections;
