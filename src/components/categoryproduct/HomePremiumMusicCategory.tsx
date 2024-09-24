// import { FC } from 'react';

import { Box, Container, Grid } from '@mui/material';
import Image from 'next/image';
import Slider from 'react-slick';
import FastSellingThumb from '../home/products/home-fast-selling-thumb';

// type CategoryBlockProps = {
//   category: Array<any>;
//   products: Array<any>;
// };

const HomePremiumMusicCategory = ({ data }: any) => {
  // const router = useRouter();
  const settings = {
    slidesToShow: 6,
    slidesToScroll: 6,
    dots: false,
    className: 'container-fluid  fast-selling-thumb margin-auto',
    responsive: [
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 389,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  // const settings_3 = {
  //   dots: false,
  //   autoplay: false,
  //   autoplaySpeed: 3000,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   initialSlide: 3,
  //   slidesPerRow: 2,
  //   className: ' container-fluid margin-auto',
  //   responsive: [
  //     {
  //       breakpoint: 1470,
  //       settings: {
  //         slidesToShow: 5,
  //         slidesToScroll: 5,
  //         initialSlide: 5,
  //       },
  //     },
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         initialSlide: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 1000,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 500,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 1,
  //       },
  //     },
  //   ],
  // };
  return (
    <>
      <section className="premium-musical">
        <Box sx={{ pt: 1 }}>
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
          >
            <div className="row text-center">
              <div className="col-12 ">
                <p className=" premium_musical_title">Premium Musical Gears</p>
              </div>
            </div>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={1.2}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ position: 'relative', aspectRatio: 2.58 }}>
                    <Image
                      src="/images/home/premium_1.png"
                      fill
                      alt="PremiumMusic"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ position: 'relative', aspectRatio: 1.27 }}>
                    <Image
                      src="/images/home/premium_2.png"
                      fill
                      alt="PremiumMusic"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <div
              className="d-flex gap-2 flex-wrap w-100 justify-content-center"
              style={{
                marginInline: 'auto',
              }}
            >
              <Slider {...settings}>
                {/* <div className="product-section"> */}
                {data?.map((product: any) => {
                  return (
                    <FastSellingThumb product={product} key={product.id} />
                  );
                })}
              </Slider>

              {/* </div> */}
            </div>
          </Container>
        </Box>
      </section>
    </>
  );
};

export default HomePremiumMusicCategory;
