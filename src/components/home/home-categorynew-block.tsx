// import { useRouter } from 'next/router';
import { Box, Container, Grid } from '@mui/material';
// import Image from 'next/image';
import ImageComponent from '@/utils/imageComponent';
import Link from 'next/link';

// type CategoryBlockProps = {
//   category: Array<any>;
//   products: Array<any>;
// };

const HomeCategoryBlockNew = ({ data }: any) => {
  // const router = useRouter();
  // const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <>
      <Box sx={{ pt: 3, pb: 3 }}>
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
        >
          <Box display={{ sm: 'block', xs: 'none' }}>
            {' '}
            <Grid container spacing={2}>
              {data.map((item: any, index: number) => (
                <Grid key={index} item xs={12} md={index === 0 ? 8 : 4}>
                  {/* <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: index === 0 ? 3.19 : 1.57,
                  }}
                  className="promo_banne-img"
                >
                  <Image src={item.image} fill alt="promo_banner" /> */}
                  <Link href={item.links}>
                    <ImageComponent
                      src={item.image}
                      alt="banner"
                      aspectRatio={index === 0 ? 3.31 : 1.63}
                      objectFit={'content'}
                      type={1}
                      className="promo_banne-img"
                      priority={true}
                    />
                  </Link>

                  {/* </Box> */}
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box display={{ sm: 'none', xs: 'block' }}>
            {' '}
            <Grid container spacing={2}>
              {data.map((item: any, index: number) => (
                <Grid key={index} item xs={12} md={index === 0 ? 8 : 4}>
                  <Link href={item.links}>
                    <ImageComponent
                      src={item.mobile_banner}
                      alt="banner"
                      aspectRatio={index === 0 ? 1.12 : 1.75}
                      objectFit={'content'}
                      type={1}
                      className="promo_banne-img"
                      priority={true}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomeCategoryBlockNew;
{
  /* <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: index === 0 ? 3.19 : 1.57,
                  }}
                  className="promo_banne-img"
                >
                  <Image src={item.image} fill alt="promo_banner" /> */
}
{
  /* </Box> */
}
