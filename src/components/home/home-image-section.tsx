// import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { Box, Container } from '@mui/material';
import Link from 'next/link';
import ImageComponent from '@/utils/imageComponent';

// type CategoryBlockProps = {
//   category: Array<any>;
//   products: Array<any>;
// };

const HomeImageSection = ({ data }: any) => {
  // const router = useRouter();

  const settings = {
    slidesToShow: data?.length >= 8 ? 8 : data?.length,
    slidesToScroll: data?.length > 8 ? 8 : data?.length,
    dots: false,
    arrows: true,
    className:
      'container-fluid  fast-selling-thumb margin-auto home-orange-sec',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: data?.length > 4 ? 4 : 9,
          slidesToScroll: data?.length > 4 ? 4 : 9,
          initialSlide: data?.length > 4 ? 4 : 9,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: data?.length > 4 ? 4 : 7,
          slidesToScroll: data?.length > 4 ? 4 : 7,
          initialSlide: data?.length > 4 ? 4 : 7,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 5,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
    ],
  };
  return (
    <>
      <section>
        {data?.length > 0 ? (
          <Box sx={{ pt: 3 }}>
            <Container
              maxWidth={'lg'}
              sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
            >
              <Slider {...settings}>
                {data.map((item: any, index: any) => (
                  <div className="mb-2" key={index}>
                    <div className=" ps-1 pe-2 d-flex flex-row justify-content-center flex-wrap gap-2">
                      <Link href={item.links}>
                        <Box>
                          <Box className="guitars-img">
                            <ImageComponent
                              src={item.image}
                              width={110}
                              height={110}
                              alt="img"
                              priority={true}
                            />
                          </Box>
                          <p className="guitar-text">{item.title}</p>
                        </Box>
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>
            </Container>
          </Box>
        ) : (
          ''
        )}
      </section>
    </>
  );
};

export default HomeImageSection;
