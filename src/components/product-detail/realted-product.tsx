import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../../../node_modules/keen-slider/keen-slider.min.css';
import RelatedProductThumb from './related-product-thumbs';

const RelatedProducts = (props: any) => {
  const { products = [], title = ' Related Products' } = props;
  // const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
  //   initial: 0,
  // });
  // const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
  //   {
  //     initial: 0,
  //     slides: {
  //       perView: 6,
  //       spacing: 20,
  //     },
  //   },
  //   [ThumbnailPlugin(instanceRef)],
  // );
  return (
    <>
      {props?.products?.length > 0 ? (
        <Container fluid>
          <div className="realatedProdHead my-3">{title}</div>
          <Slider
            // dots={true}
            centerMode={false}
            arrows={true}
            centerPadding="60px"
            className="new-relatedpro"
            infinite={true}
            slidesToShow={5}
            rows={1}
            slidesToScroll={5}
            responsive={[
              {
                breakpoint: 1200,
                settings: {
                  rows: 1,
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  initialSlide: 4,
                },
              },
              {
                breakpoint: 900,
                settings: {
                  rows: 1,
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  initialSlide: 3,
                },
              },
              {
                breakpoint: 800,
                settings: {
                  rows: 1,
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2,
                },
              },
              {
                breakpoint: 500,
                settings: {
                  rows: 1,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  initialSlide: 1,
                },
              },
            ]}
          >
            {products?.map((product: any) => {
              return (
                <Fragment key={product.id}>
                  <RelatedProductThumb product={product} />;
                </Fragment>
              );
            })}
          </Slider>
        </Container>
      ) : null}
    </>
  );
};

// function ThumbnailPlugin(
//   mainRef: MutableRefObject<KeenSliderInstance | null>,
// ): KeenSliderPlugin {
//   return (slider) => {
//     function removeActive() {
//       slider.slides.forEach((slide) => {
//         slide.classList.remove('active');
//       });
//     }
//     function addActive(idx: number) {
//       slider.slides[idx].classList.add('active');
//     }

//     function addClickEvents() {
//       slider.slides.forEach((slide, idx) => {
//         slide.addEventListener('click', () => {
//           if (mainRef.current) mainRef.current.moveToIdx(idx);
//         });
//       });
//     }

//     slider.on('created', () => {
//       if (!mainRef.current) return;
//       addActive(slider.track.details.rel);
//       addClickEvents();
//       mainRef.current.on('animationStarted', (main) => {
//         removeActive();
//         const next = main.animator.targetIdx || 0;
//         addActive(main.track.absToRel(next));
//         slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
//       });
//     });
//   };
// }

export default RelatedProducts;
