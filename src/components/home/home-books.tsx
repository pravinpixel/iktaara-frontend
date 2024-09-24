import Slider from 'react-slick';
import FastSellingThumb from './products/home-fast-selling-thumb';
import { Container } from '@mui/material';

const HomeBooksCollections = ({ data }: any) => {
  const dataLength = data?.products?.length || 0;

  const settings = {
    slidesToShow: dataLength >= 6 ? 6 : dataLength,
    slidesToScroll: dataLength >= 6 ? 6 : dataLength,
    dots: false,
    // arrows: false,
    // centerMode: true,
    // centerPadding: '60px',
    // autoPlay: true,
    className: 'container-fluid  fast-selling-thumb margin-auto',

    responsive: [
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: dataLength >= 5 ? 5 : dataLength,
          slidesToScroll: dataLength >= 5 ? 5 : dataLength,
          initialSlide: dataLength >= 5 ? 5 : dataLength,
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
      {dataLength > 0 ? (
        <section id="fast-selling" className="huge-books">
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
          >
            <div className="brands ">
              <div className="fast-selling  pt-2">
                <div className="row text-center pt-2">
                  <div className="col-12 ">
                    <p className="  top_seller_title">
                      {capitalizeWords(data.collection_name)}
                    </p>
                  </div>
                </div>
                <div
                  className="d-flex gap-2 flex-wrap w-100 justify-content-center huge-books"
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

export default HomeBooksCollections;
