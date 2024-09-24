import Slider from 'react-slick';
import { Container } from '@mui/material';
import HomeBrandThumb from './products/home-brand-thumb';

const HomeBrandCenter = ({ data }: any) => {
  const settings = {
    slidesToShow: 6,
    slidesToScroll: 6,
    dots: false,
    rows: 2,
    // arrows: false,
    // centerMode: true,
    // centerPadding: '60px',
    // autoPlay: true,
    className: 'container-fluid  fast-selling-thumb margin-auto',
    responsive: [
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
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
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
    ],
  };

  return (
    <>
      {data?.length > 0 ? (
        <section className="brand-center">
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
          >
            <div className="brands ">
              <div className="fast-selling  pt-2 pb-4">
                <div className="row text-center pt-2">
                  <div className="col-12 ">
                    <p className="  top_seller_title">Brand Center</p>
                  </div>
                </div>
                <div className="brand-center-slider mt-2">
                  <Slider {...settings} className="brands-center-slick">
                    {data?.map((data: any, index: any) => (
                      <div key={index}>
                        <HomeBrandThumb data={data} />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default HomeBrandCenter;
