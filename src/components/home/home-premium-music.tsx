// import { useRouter } from 'next/router';
import FastSellingThumb from './products/home-fast-selling-thumb';
import Slider from 'react-slick';
import { Box, Container, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

// type CategoryBlockProps = {
//   category: Array<any>;
//   products: Array<any>;
// };

const HomePremiumMusic = ({ data }: any) => {
  // const router = useRouter();
  const dataLength = data?.products?.length || 0;

  const brandlogo = [
    {
      id: '1',
      img: '/images/home/brands_1.png',
      link: '/brands/yamaha',
    },
    {
      id: '2',
      img: '/images/home/brands_8.png',
      link: '/brands/casio',
    },
    {
      id: '3',
      img: '/images/home/brands_3.png',
      link: '/brands/fender',
    },
    {
      id: '4',
      img: '/images/home/brands_4.png',
      link: '/brands/givson',
    },
    {
      id: '5',
      img: '/images/home/brands_5.png',
      link: '/brands/roland',
    },
    {
      id: '6',
      img: '/images/home/brands_71.png',
      link: '/brands/korg',
    },
  ];
  const settings = {
    slidesToShow: dataLength >= 6 ? 6 : dataLength,
    slidesToScroll: dataLength >= 6 ? 6 : dataLength,
    dots: false,
    // arrows: false,
    // centerMode: true,
    // centerPadding: '0px',
    // autoPlay: true,
    className: 'container-fluid  fast-selling-thumb margin-auto',
    responsive: [
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: dataLength >= 6 ? 6 : dataLength,
          slidesToScroll: dataLength >= 6 ? 6 : dataLength,
          initialSlide: dataLength >= 6 ? 6 : dataLength,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: dataLength >= 4 ? 4 : dataLength,
          slidesToScroll: dataLength >= 4 ? 4 : dataLength,
          initialSlide: dataLength >= 4 ? 4 : dataLength,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: dataLength >= 3 ? 3 : dataLength,
          slidesToScroll: dataLength >= 3 ? 3 : dataLength,
          initialSlide: dataLength >= 3 ? 3 : dataLength,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: dataLength >= 2 ? 2 : dataLength,
          slidesToScroll: dataLength >= 2 ? 2 : dataLength,
          initialSlide: dataLength >= 2 ? 2 : dataLength,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: dataLength >= 1 ? 1 : dataLength,
          slidesToScroll: dataLength >= 1 ? 1 : dataLength,
          initialSlide: dataLength >= 1 ? 1 : dataLength,
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
  const capitalizeWords = (str: any = '') => {
    return str
      ?.split(' ')
      .map(
        (word: any) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join(' ');
  };
  return (
    <>
      {' '}
      {data?.products?.length > 0 ? (
        <section className="premium-musical">
          <Box sx={{ pt: 1 }}>
            <Container
              maxWidth={'lg'}
              sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
            >
              <div className="row text-center">
                <div className="col-12 ">
                  <p className=" premium_musical_title">
                    {capitalizeWords(data?.collection_name)}
                  </p>
                </div>
              </div>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.64 }}>
                      <Image
                        src="/images/home/premium_11.webp"
                        fill
                        alt="premium"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      className="premium-mains"
                      p={{ xs: 3, md: 3, lg: 3, sm: 16 }}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box>
                        <Image
                          src="/images/home/paly.png"
                          width={70}
                          height={70}
                          alt="premium"
                        />
                      </Box>
                      <Box
                        sx={{
                          textAlign: 'center',
                          mt: 1,
                        }}
                      >
                        <div className="preminum-brands">
                          Premium Brands + Exclusive 10%
                        </div>
                        <div className="preminum-brands">
                          OFF on every Sale!
                        </div>
                      </Box>
                      <Grid
                        container
                        my={1.5}
                        gap={1}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        {brandlogo.map((item) => (
                          <Grid
                            item
                            md={3}
                            xs={3}
                            key={item.id}
                            className="preminum-bg"
                            sx={{ padding: 1 }}
                          >
                            <Link href={item?.link}>
                              <Box className="preminum-logo">
                                <Image src={item.img} alt="log" fill />
                              </Box>
                            </Link>
                          </Grid>
                        ))}
                      </Grid>
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
                  {data?.products?.map((product: any) => {
                    return (
                      <FastSellingThumb product={product} key={product.id} />
                    );
                  })}
                </Slider>
              </div>
            </Container>
          </Box>
        </section>
      ) : null}
    </>
  );
};

export default HomePremiumMusic;
