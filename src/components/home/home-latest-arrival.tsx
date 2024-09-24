// import { useRouter } from 'next/router';
import LatestArrivalProductThumb from './products/latest-arrival-thumb';
// import { useKeenSlider } from 'keen-slider/react';
// import { useEffect } from 'react';
import 'keen-slider/keen-slider.min.css';
// import Slider from 'react-slick';

// const animation = { duration: 5000, easing: (t: any) => t };

const HomeLatestArrival = ({ data }: any) => {
  // const router = useRouter();
  // const [ref, internalSlider] = useKeenSlider<HTMLDivElement>({
  //   loop: false,
  //   initial: 0,
  //   breakpoints: {
  //     '(min-width: 400px)': {
  //       slides: { perView: 2, spacing: 5 },
  //     },
  //     '(min-width: 1000px)': {
  //       slides: { perView: 6, spacing: 20 },
  //     },
  //   },
  //   slides: { perView: 1, spacing: 10 },
  // });

  // const [sliderRef] = useKeenSlider({
  //   loop: true,
  //   renderMode: 'performance',
  //   drag: false,
  //   created(s) {
  //     s.moveToIdx(5, true, animation);
  //   },
  //   updated(s) {
  //     s.moveToIdx(s.track.details.abs + 5, true, animation);
  //   },
  //   animationEnded(s) {
  //     s.moveToIdx(s.track.details.abs + 5, true, animation);
  //   },
  // });

  // const settings = {
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 100,
  //   speed: 10000,
  //   arrows: false,
  //   pauseOnHover: false,
  //   cssEase: 'linear',
  // };

  // useEffect(() => {
  //   internalSlider?.current?.update();
  // }, []);

  return (
    <>
      <section id="latest-arrival">
        <div className="latest-arrival">
          <div className="container mb-3">
            <div className="row text-center">
              <div className="col-12">
                <p className="text-lg-center text-light title mt-2">
                  {data?.collection_name}
                </p>
                <p className="text-sm-center text-light sup-title mb-4">
                  {data?.tag_line}
                </p>
              </div>
            </div>
            <div className="row alter-native">
              <div className="row">
                {data?.products?.map((product: any) => {
                  return (
                    <LatestArrivalProductThumb
                      product={product}
                      css={''}
                      key={product.id}
                    />
                  );
                })}
              </div>
              {/* <Slider {...settings} className="row alter-native"> */}
              {/* {data?.products?.slice(0, 6).map((product: any) => {
                return (
                  <LatestArrivalProductThumb
                    product={product}
                    css={''}
                    key={product.id}
                  />
                );
              })} */}
              {/* </Slider> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomeLatestArrival;
