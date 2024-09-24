import Slider from 'react-slick';
import { Container } from '@mui/material';
import HomeBrandsThumb from './product/home-brand-newthumb';

const HomeNewBrands = ({ data }: any) => {
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  // const pianoFrom = [
  //   {
  //     title: 'Acoustic Guitars',
  //     type: '/images/home1/brand_new_2.png',
  //     image: ' /images/home1/brand_1.png',

  //     // ClassNames: 'Piano-Beginners',
  //   },
  //   {
  //     title: 'Pianos',
  //     type: '/images/home1/brand_new_2.png',
  //     image: '/images/home1/brand_2.png',

  //     // ClassNames: 'Keyboards-Beginners',
  //   },
  //   {
  //     title: 'Portable keyboards',
  //     type: '/images/home1/brand_new_2.png',
  //     image: '/images/home1/brand_3.png',

  //     // ClassNames: 'Portable-keyboards',
  //   },
  //   {
  //     title: 'Saxaphone',
  //     type: '/images/home1/brand_new_2.png',
  //     image: '/images/home1/brand_4.png',

  //     // ClassNames: 'Musical-Keyboards',
  //   },
  //   {
  //     title: 'Violin',
  //     type: '/images/home1/brand_new_2.png',
  //     image: '/images/home1/brand_5.png',

  //     // ClassNames: 'live-musical',
  //   },
  //   {
  //     title: 'Piano',
  //     type: '/images/home1/brand_new_2.png',
  //     image: '/images/home1/brand_6.png',

  //     // ClassNames: 'KeyboardsPortable',
  //   },
  //   {
  //     title: 'Piano',
  //     type: '/images/home1/brand_new_2.png',
  //     image: '/images/home1/brand_6.png',

  //     // ClassNames: 'KeyboardsPortable',
  //   },
  //   {
  //     title: 'Piano',
  //     type: '/images/home1/brand_new_2.png',
  //     image: '/images/home1/brand_6.png',

  //     // ClassNames: 'KeyboardsPortable',
  //   },
  //   {
  //     title: 'Piano',
  //     type: '/images/home1/brand_new_2.png',
  //     image: '/images/home1/brand_6.png',

  //     // ClassNames: 'KeyboardsPortable',
  //   },
  // ];
  return (
    <>
      <section id="fast-selling" className="home-new-brands-section">
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
        >
          <div className="brands ">
            <div className="fast-selling  pt-2">
              <div
                className="d-flex gap-2 flex-wrap w-100 justify-content-center"
                style={{
                  marginInline: 'auto',
                }}
              >
                <Slider {...settings}>
                  {data?.map((product: any) => {
                    return (
                      <HomeBrandsThumb product={product} key={product.id} />
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomeNewBrands;
