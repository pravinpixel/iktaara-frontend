import { Swiper, SwiperSlide } from 'swiper/react';

import { Box } from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// import Image from 'next/image';
import ImageComponent from '@/utils/imageComponent';
import Link from 'next/link';

const CustomPrevArrow = () => (
  <div className="custom-prev-arrow-new">
    {/* Your custom previous arrow content */}
    {/* <img src="/images/home/banner_prev.png"></img> */}
    <ImageComponent
      src="/images/home/banner_prev.png"
      width={40}
      height={40}
      alt="arrow"
      priority={true}
    />
    {/* Previous */}
  </div>
);

const CustomNextArrow = () => (
  <div className="custom-next-arrow-new">
    {/* Your custom next arrow content */}
    {/* <img src="/images/home/banner_next.png"></img> */}
    <ImageComponent
      src="/images/home/banner_next.png"
      width={40}
      height={40}
      alt="arrow"
      priority={true}
    />
  </div>
);

export default function HeaderBannerNew({ type, data }: any) {
  // const images = [
  //   '/images/home/cate_3.png',
  //   '/images/home/banner_3.png',
  //   '/images/home/banner_4.png',
  //   '/images/home/banner_5.png',
  // ];
  // const image = [
  //   '/images/banner/Mask-mobilebanner.png',
  //   '/images/banner/music-mobilebanner.png',
  //   '/images/banner/Mask-mobilebanner.png',
  //   '/images/banner/music-mobilebanner.png',
  // ];

  return (
    <>
      <Box
        sx={{
          '.swiper-button-prev:after, .swiper-rtl .swiper-button-next:after': {
            display: 'none',
          },
          '.swiper-button-next:after, .swiper-rtl .swiper-button-prev:after': {
            display: 'none',
          },

          ...(type === 'NewHome' && {
            marginTop: { sm: '-20px', md: '-44px' },
          }),
        }}
        className="swiper-banner-new"
      >
        <Swiper
          loop={true}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: '.custom-prev-arrow-new',
            nextEl: '.custom-next-arrow-new',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {data?.slice(0, 4).map((item: any, index: any) => (
            <SwiperSlide key={index}>
              <Link href={item.links}>
                {' '}
                <Box display={{ xs: 'none', md: 'block' }}>
                  {/* <ImageComponent
                  src={item.image}
                  width={100}
                  height={30}
                  alt="banner"
                  priority={true}
                  className="home-banner-img"
                /> */}
                  <ImageComponent
                    src={item.image}
                    // src="/images/checkout-new/banner_new.jpg"
                    alt="banner"
                    aspectRatio={4.57}
                    objectFit={'content'}
                    type={1}
                    className="home-banner-img"
                    priority={true}
                  />
                </Box>
              </Link>
              <Link href={item.links}>
                <Box display={{ xs: 'block', md: 'none' }}>
                  <ImageComponent
                    src={item.mobile_banner}
                    alt="banner"
                    aspectRatio={1.79}
                    objectFit={'content'}
                    type={1}
                    // className="home-banner-img"
                    priority={true}
                  />
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <CustomPrevArrow />
        <CustomNextArrow />
      </Box>
    </>
  );
}
