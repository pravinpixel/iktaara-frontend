import Slider from 'react-slick';
import FastSellingThumb from './products/home-fast-selling-thumb';
import { Container } from '@mui/material';

const HomeTopSellers = ({ data }: any) => {
  const dataLength = data?.products?.length || 0;

  const settings = {
    slidesToShow: dataLength >= 8 ? 8 : dataLength,
    slidesToScroll: dataLength >= 8 ? 8 : dataLength,
    infinite: true,
    dots: false,
    className: 'container-fluid  fast-selling-thumb margin-auto',
    responsive: [
      {
        breakpoint: 2100,
        settings: {
          slidesToShow: dataLength >= 7 ? 7 : dataLength,
          slidesToScroll: dataLength >= 7 ? 7 : dataLength,
          initialSlide: dataLength >= 7 ? 7 : dataLength,
        },
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: dataLength >= 6 ? 6 : dataLength,
          slidesToScroll: dataLength >= 6 ? 6 : dataLength,
          initialSlide: dataLength >= 6 ? 6 : dataLength,
        },
      },
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: dataLength >= 6 ? 6 : dataLength,
          slidesToScroll: dataLength >= 6 ? 6 : dataLength,
          initialSlide: dataLength >= 6 ? 6 : dataLength,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: dataLength >= 4 ? 4 : dataLength,
          slidesToScroll: dataLength >= 4 ? 4 : dataLength,
          initialSlide: dataLength >= 4 ? 4 : dataLength,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: dataLength >= 3 ? 3 : dataLength,
          slidesToScroll: dataLength >= 3 ? 3 : dataLength,
          initialSlide: dataLength >= 3 ? 3 : dataLength,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: dataLength >= 2 ? 2 : dataLength,
          slidesToScroll: dataLength >= 2 ? 2 : dataLength,
          initialSlide: dataLength >= 2 ? 2 : dataLength,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: dataLength >= 2 ? 2 : dataLength,
          slidesToScroll: dataLength >= 2 ? 2 : dataLength,
          initialSlide: dataLength >= 2 ? 2 : dataLength,
        },
      },
      {
        breakpoint: 389,
        settings: {
          slidesToShow: dataLength >= 1 ? 1 : dataLength,
          slidesToScroll: dataLength >= 1 ? 1 : dataLength,
          initialSlide: dataLength >= 1 ? 1 : dataLength,
        },
      },
    ],
  };
  const capitalizeWords = (str: any) => {
    return str
      .split(' ')
      .map(
        (word: any) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join(' ');
  };
  return (
    <>
      {data?.products?.length > 0 ? (
        <section
          id="fast-selling"
          className="top_seller"
          style={{
            backgroundImage: 'url(/images/home/top_seller.webp)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
          >
            <div className="brands">
              <div className="fast-selling  pt-2">
                <div className="row text-center">
                  <div className="col-12 ">
                    <p className="top_seller_title pt-3">
                      {capitalizeWords(data?.collection_name)}
                    </p>
                  </div>
                </div>
                <div
                  className="d-flex gap-1 flex-wrap w-100 justify-content-center"
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
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
};

export default HomeTopSellers;
