import ImageComponent from '@/utils/imageComponent';
import { Box, Container, Grid } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import Slider from 'react-slick';
import VideoPlayer from './products/home-video-thumb';
// type CategoryBlockProps = {
//   category: Array<any>;
//   products: Array<any>;
// };

// type ImageData = {
//   src: string;
//   videoUrl: string;
// };

const HomeTestimonials = () => {
  // const router = useRouter();
  const images = [
    '/images/home/testi_1.png',
    '/images/home/testi_2.png',
    '/images/home/testi_3.png',
    '/images/home/testi_4.png',
  ];

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const openVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: false,
    // arrows: false,
    // centerMode: true,
    // centerPadding: '60px',
    // autoPlay: true,
    className: 'container-fluid  fast-selling-thumb margin-auto ',
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
      <section
        id="musician-section"
        //  className="musician-testi"
      >
        <Box
          sx={{ position: 'relative', aspectRatio: 3.99, objectFit: 'cover' }}
        >
          <Image src="/images/home/testi.webp" fill alt="image-bg" />
          <Box sx={{ pt: 1, pb: 3 }}>
            <Container
              maxWidth={'lg'}
              sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
            >
              <div
                className="row"
                style={{
                  position: 'absolute',
                  top: '12%',
                  left: '0%',
                  transform: 'translate(-0%, -50%)',
                  width: '100%',
                }}
              >
                <div className="col-12 ">
                  <p
                    className="musician-testi-title"
                    style={{ textAlign: 'center' }}
                  >
                    Musician Testimonials
                  </p>
                </div>
              </div>
              <Box sx={{ mt: 10 }} display={{ md: 'block', xs: 'none' }}>
                <Grid container spacing={2}>
                  {images.map((image, index) => (
                    <Grid item md={3} sm={6} xs={12} key={index}>
                      <Box
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={() => openVideo('')}
                      >
                        {/* <Image src={image} fill alt="" /> */}
                        <ImageComponent
                          src={image}
                          alt="banner"
                          aspectRatio={1.05}
                          objectFit={'content'}
                          type={1}
                          priority={true}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box sx={{ mt: 10 }} display={{ md: 'none', xs: 'block' }}>
                <Grid container>
                  <Slider {...settings}>
                    {images.map((image, index) => (
                      // <Grid item md={3} sm={6} xs={12} key={index}>
                      <Box
                        sx={{
                          cursor: 'pointer',
                        }}
                        onClick={() =>
                          openVideo('https://www.youtube.com/embed/nYEoxne_20Y')
                        }
                        key={index}
                      >
                        <ImageComponent
                          src={image}
                          alt="banner"
                          aspectRatio={1.05}
                          objectFit={'content'}
                          type={1}
                          priority={true}
                          className="home-testimonial-section-res"
                        />
                      </Box>
                      // </Grid>
                    ))}
                  </Slider>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Box>
      </section>
      {selectedVideo && (
        <VideoPlayer videoUrl={selectedVideo} onClose={closeVideo} />
      )}
    </>
  );
};

export default HomeTestimonials;
{
  /* <Image src={image} fill alt="" /> */
}
