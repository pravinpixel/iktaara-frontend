import Slider from 'react-slick';
import HomeTopCollectionProductThumb from './products/top-collection-thumb';
// import { useRouter } from 'next/router';

// const Left = () => {
//   return <></>;
// };

const HomeTopCollections = ({ popular, experts }: any) => {
  // const router = useRouter();
  const settings_3 = {
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 4,
    dots: false,
    // arrows: false,
    // centerMode: true,
    // centerPadding: '60px',
    autoPlay: true,
    responsive: [
      {
        breakpoint: 1200,
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
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    className: ' px-4 py-4 h-100 w-100',
  };
  return (
    <>
      <section id="top-collection" className="">
        <div className="home-top-collection-product-thumb">
          <div className="bg-black topcollectionHeader-new">
            <div className="topcollectionHeader">
              {popular?.collection_name}
            </div>
            <Slider {...settings_3} cssEase="">
              {popular?.products?.map((product: any) => {
                return (
                  <HomeTopCollectionProductThumb
                    product={product}
                    key={product.id}
                  />
                );
              })}
            </Slider>
          </div>
          <div className="bg-black topcollectionHeader-new ">
            <div className="topcollectionHeader">
              {experts?.collection_name}
            </div>
            <Slider {...settings_3}>
              {experts?.products?.map((product: any) => {
                return (
                  <HomeTopCollectionProductThumb
                    product={product}
                    key={product.id}
                  />
                );
              })}
            </Slider>
          </div>
          {/* <div className="row">
            <div className="col-md-12 col-sm-12 col-lg-6">
              <div className="card collectionBackground rounded-5">
                <div className="topcollectionHeader">
                  {popular?.collection_name}
                </div>
                <div>

                <Slider {...settings}  className='container-fluid pb-4 mx-4 row'>
                {popular?.products?.map((product: any) => {
                    return (
                      <HomeTopCollectionProductThumb
                        product={product}
                        key={product.id}
                      />
                    );
                  })}
                </Slider>
                </div>
                {/* <div className="card-body row pb-4">
                  
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 col-lg-6">
              <div className="car collectionBackground collectionBackgroundrounded-5">
                <div className="topcollectionHeader">
                  {experts?.collection_name}
                </div>
                <div className="card-body  row pb-4">
                  {experts?.products?.slice(0, 4).map((product: any) => {
                    return (
                      <HomeTopCollectionProductThumb
                        product={product}
                        key={product.id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default HomeTopCollections;
