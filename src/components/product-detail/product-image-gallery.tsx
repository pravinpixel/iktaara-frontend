/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from 'keen-slider/react';
import '../../../node_modules/keen-slider/keen-slider.min.css';
import { MutableRefObject } from 'react';
import Image from 'react-bootstrap/Image';
import React, { useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';

const ProductImageGallery = (props: any) => {
  const { product } = props;
  const gallery: any = product?.gallery || [];

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 3,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  );

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);

  const openLightbox = () => setIsOpen(true);
  const closeLightbox = () => setIsOpen(false);
  // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const goToPrevious = () =>
    setPhotoIndex((photoIndex + gallery.length - 1) % gallery.length);
  const goToNext = () => setPhotoIndex((photoIndex + 1) % gallery.length);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
      <div className="product-gallery">
        <div ref={sliderRef} className="keen-slider keen-gallery">
          {gallery.lenth == 0
            ? ''
            : gallery?.map((image: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="keen-slider__slide number-slide1 d-flex align-items-center justify-content-center product-image new-product-details"
                    onClick={() => openLightbox()}
                  >
                    <Image src={image} alt={'slide'} fluid />
                  </div>
                );
              })}
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={gallery[photoIndex]}
            nextSrc={gallery[(photoIndex + 1) % gallery.length]}
            prevSrc={
              gallery[(photoIndex + gallery.length - 1) % gallery.length]
            }
            onCloseRequest={closeLightbox}
            onMovePrevRequest={goToPrevious}
            onMoveNextRequest={goToNext}
          />
        )}

        <div ref={thumbnailRef} className="keen-slider thumbnail my-3">
          {gallery.length == 0
            ? ''
            : gallery?.map((image: any, index: number) => {
                return (
                  <div
                    className={`keen-slider__slide keen-slide2 number-slide1 d-flex align-items-center justify-content-center ${
                      index === photoIndex ? 'selected' : ''
                    }`}
                    key={index}
                    onClick={() => setPhotoIndex(index)}
                  >
                    <Image src={image} alt={'slide'} width="128" height="100" />
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>,
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active');
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add('active');
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default ProductImageGallery;
