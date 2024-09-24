import ImageComponent from '@/utils/imageComponent';
import { Box, Container, Grid, useMediaQuery } from '@mui/material';

const MusicStore = () => {
  const isMobile = useMediaQuery('(max-width:767px)');
  return (
    <Box
      sx={{
        background: '#F2F6F8',
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
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'start' },
              }}
            >
              <Box>
                <h1 className="text-tag">India’s Largest Music Store</h1>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              sx={{ paddingLeft: { xs: '14px', sm: '25px' } }}
            >
              <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <ImageComponent
                      src="/images/home/music-store2.png"
                      width={45}
                      height={45}
                      alt="img"
                      priority={true}
                    />
                    <p
                      className="music-store-text"
                      dangerouslySetInnerHTML={{
                        __html: isMobile
                          ? '3500+<br />PRODUCTS'
                          : '3500+ PRODUCTS',
                      }}
                    ></p>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <ImageComponent
                      src="/images/home/music-store1.png"
                      width={45}
                      height={45}
                      alt="img"
                      priority={true}
                    />
                    <p
                      className="music-store-text"
                      dangerouslySetInnerHTML={{
                        __html: isMobile ? '50+<br />BRANDS' : '50+ BRANDS',
                      }}
                    ></p>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <ImageComponent
                      src="/images/home/music-store4.png"
                      width={45}
                      height={45}
                      alt="img"
                      priority={true}
                    />
                    <p
                      className="music-store-text"
                      dangerouslySetInnerHTML={{
                        __html: isMobile
                          ? '14 DAY<br />RETURN'
                          : '14 DAY RETURN',
                      }}
                    ></p>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <ImageComponent
                      src="/images/home/music-store3.png"
                      width={45}
                      height={45}
                      alt="img"
                      priority={true}
                    />
                    <p
                      className="music-store-text"
                      dangerouslySetInnerHTML={{
                        __html: isMobile
                          ? '2 YEAR<br />WARRANTY'
                          : '2 YEAR WARRANTY',
                      }}
                    ></p>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default MusicStore;
