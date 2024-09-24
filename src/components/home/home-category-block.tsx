// import HomeCategoryThumb from './products/home-category-thumb';
// import { FC } from 'react';
import Slider from 'react-slick';
import FastSellingThumb from './products/home-fast-selling-thumb';

const HomeCategoryBlock = ({ data, page }: any) => {
  // const settings_3 = {
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide : 1,
  //   dots: false,
  //   // centerMode: true,
  //   // centerPadding: '60px',
  //   autoPlay: true,
  //   className: 'p-5 container',
  //   slidesPerRow: 2,
  // };
  const settings_3 = {
    dots: false,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 3,
    slidesPerRow: 2,
    className: ' container-fluid margin-auto',
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 1000,
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
  return (
    <>
      <section id="category-widget border-bottom">
        <div className="home-cateogy-widget ">
          <div className="container-fluid">
            <div className="row categoryBlockPage">
              <div className="col-md-4 col-12 d-sm-none d-md-block bannerSection">
                {page === 'pick' ? (
                  <div className="bg-img"></div>
                ) : (
                  <div className="bg-img1"></div>
                )}
              </div>
              <div className="col-md-8 col-sm-12 imageSection">
                <div className=" category-title text-center bg-black">
                  <h5 className="text-light text-start">
                    {data?.collection_name}
                  </h5>
                </div>
                {/* <div className="d-flex"> */}
                <div className="products-section-2">
                  <Slider
                    {...settings_3}

                    // responsive={[
                    //   {
                    //     breakpoint: 400,
                    //     settings: {
                    //       slidesToShow: 1,
                    //       slidesToScroll: 1,
                    //       initialSlide: 1,
                    //     },
                    //   },
                    //   {
                    //     breakpoint: 500,
                    //     settings: {
                    //       slidesToShow: 2,
                    //       slidesToScroll: 2,
                    //       initialSlide: 2,
                    //     },
                    //   },
                    //   {
                    //     breakpoint: 600,
                    //     settings: {
                    //       slidesToShow: 3,
                    //       slidesToScroll: 3,
                    //       initialSlide: 3,
                    //     },
                    //   },
                    //   {
                    //     breakpoint: 700,
                    //     settings: {
                    //       slidesToShow: 4,
                    //       slidesToScroll: 4,
                    //       initialSlide: 4,
                    //     },
                    //   },
                    //   {
                    //     breakpoint: 800,
                    //     settings: {
                    //       slidesToShow: 5,
                    //       slidesToScroll: 5,
                    //       initialSlide: 5,
                    //     },
                    //   },
                    // ]}
                  >
                    {data?.products?.map((product: any) => {
                      return (
                        <FastSellingThumb
                          product={product}
                          key={product.id}
                          page={page}
                        />
                      );
                    })}
                  </Slider>
                </div>

                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCategoryBlock;
