import ImageComponent from '@/utils/imageComponent';
import { Box, Container, Grid } from '@mui/material';

// type CategoryBlockProps = {
//   category: Array<any>;
//   products: Array<any>;
// };

const HomeNewBegin = () => {
  // const router = useRouter();
  // const categorypiano = [
  //   {
  //     title: 'Grand Piano',
  //   },
  //   {
  //     title: 'Upright Piano',
  //   },
  //   {
  //     title: 'Digital Piano',
  //   },
  //   {
  //     title: 'Portable Keyboard',
  //   },
  //   {
  //     title: 'Arranger Keyboard',
  //   },
  //   {
  //     title: 'Mini Keyboard',
  //   },
  //   {
  //     title: 'Synthesizer',
  //   },
  //   {
  //     title: 'Keyboard Amps',
  //   },
  //   {
  //     title: 'Keyboard Accessories',
  //   },
  // ];
  return (
    <>
      <Box>
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <Box className="home-new-begin-card1">
                  <p>For Beginners</p>
                  <div className="arrow-image-size">
                    <ImageComponent
                      src="/images/home1/arrow.png"
                      width={18}
                      height={13}
                      alt="arrow"
                      priority={true}
                      className="arrow-image"
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Box className="home-new-begin-card1">
                  <p>For LIVE Bands</p>
                  <div className="arrow-image-size">
                    <ImageComponent
                      src="/images/home1/arrow.png"
                      width={18}
                      height={13}
                      alt="arrow"
                      priority={true}
                      className="arrow-image"
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Box className="home-new-begin-card1">
                  <p>For Sound Specialists</p>
                  <div className="arrow-image-size">
                    <ImageComponent
                      src="/images/home1/arrow.png"
                      width={18}
                      height={13}
                      alt="arrow"
                      priority={true}
                      className="arrow-image"
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomeNewBegin;
