import { Box, Container, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';

// type CategoryBlockProps = {
//   category: Array<any>;
//   products: Array<any>;
// };

const HomeNewMusic = () => {
  // const router = useRouter();

  return (
    <>
      <Box sx={{ pt: 3, pb: 3 }}>
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
        >
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                {' '}
                <Box sx={{ position: 'relative', aspectRatio: 3.7 }}>
                  <Image
                    src="/images/home1/home_landing_1.png"
                    fill
                    alt="landing"
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{ position: 'relative', aspectRatio: 3.7 }}>
                  <Image
                    src="/images/home1/home_landing_2.png"
                    fill
                    alt="landing"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
                <Link href="/buy">
                  <Box sx={{ position: 'relative', aspectRatio: 0.73 }}>
                    <Image src="/images/banner/example.png" fill alt="banner" />
                  </Box>
                </Link>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{ position: 'relative', aspectRatio: 0.73 }}>
                  <Image src="/images/banner/examp.png" fill alt="examp" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomeNewMusic;
