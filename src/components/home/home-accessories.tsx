// import HomeCategoryThumb from './products/home-category-thumb';
// import { FC } from 'react';
// import FastSellingThumb from './products/home-fast-selling-thumb';
// import Slider from 'react-slick';
import { Box, Container, Grid } from '@mui/material';
// import Image from 'next/image';
// import HomeTopSellers from './home-top-sellers';
import MusicAccessThumb from './products/home-access-thumb';

const HomeAccessories = () => {
  return (
    <>
      <section className="music-accessories">
        <Box sx={{ pb: 3, pt: 1 }}>
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
          >
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12} className="music-access-grid">
                  <MusicAccessThumb />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </section>
    </>
  );
};

export default HomeAccessories;
