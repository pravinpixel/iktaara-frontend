// import { useRouter } from 'next/router';
import { Box, Container, Grid } from '@mui/material';
import Image from 'next/image';

// type CategoryBlockProps = {
//   category: Array<any>;
//   products: Array<any>;
// };

const HomeNewDjDeals = () => {
  // const router = useRouter();

  return (
    <>
      <Box sx={{ pt: 3 }}>
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid item md={2}>
                <Box sx={{ position: 'relative', aspectRatio: 3.19 }}>
                  <p className="dj-text">Products on SALE!</p>
                </Box>
              </Grid>
              <Grid item md={10}>
                <Box sx={{ position: 'relative', aspectRatio: 14.85 }}>
                  <Image src="/images/home1/djdeals.png" fill alt="Sale" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomeNewDjDeals;
