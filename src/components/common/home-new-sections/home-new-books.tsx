import { Box, Button, Container, Grid } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import Slider from 'react-slick';

// type CategoryBlockProps = {
//   category: Array<any>;
//   products: Array<any>;
// };

const HomeNewBooks = () => {
  // const router = useRouter();
  const [selectedButton, setSelectedButton] = useState('Learn');

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };
  const settings = {
    slidesToShow: 9,
    slidesToScroll: 9,
    dots: false,
    arrows: false,
    rows: 1,
    className: 'container-fluid  fast-selling-thumb margin-auto',
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const images = [
    '/images/home1/home_book_1.png',
    '/images/home1/home_book_2.png',
    '/images/home1/home_book_3.png',
    '/images/home1/home_book_4.png',
  ];
  return (
    <>
      <Box sx={{ pt: 3, pb: 3 }} className="new-home-books-section">
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
        >
          <Box className="home-new-books">
            <p className="home-new-books-text">Explore Services</p>
            <Box className="home-gap-books">
              <Button
                className="home-new-books-button"
                onClick={() => handleButtonClick('Learn')}
                //  variant={selectedButton === 'Learn' ? 'contained' : 'outlined'}
              >
                Learn
              </Button>
              <Button
                className="home-new-books-button"
                onClick={() => handleButtonClick('Play')}
              >
                Play
              </Button>
              <Button
                className="home-new-books-button"
                onClick={() => handleButtonClick('Perform')}
              >
                Perform
              </Button>
              <Button
                className="home-new-books-button"
                onClick={() => handleButtonClick('Connect')}
              >
                Connect
              </Button>
            </Box>
          </Box>
          {selectedButton === 'Learn' && (
            <Box mt={2}>
              <Box mt={2}>
                <Grid
                  container
                  spacing={2}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_1.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_2.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_3.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_4.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                  <Slider {...settings}>
                    {images.map((image, index) => (
                      <div key={index}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Box
                              sx={{ position: 'relative', aspectRatio: 2.0 }}
                            >
                              <Image src={image} fill alt="home_book" />
                            </Box>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </Slider>
                </Box>
              </Box>
            </Box>
          )}
          {selectedButton === 'Play' && (
            <Box mt={2}>
              <Box mt={2}>
                <Grid
                  container
                  spacing={2}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_3.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_4.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_1.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_2.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                  <Slider {...settings}>
                    {images.map((image, index) => (
                      <div key={index}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Box
                              sx={{ position: 'relative', aspectRatio: 2.0 }}
                            >
                              <Image src={image} fill alt="home_book" />
                            </Box>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </Slider>
                </Box>
              </Box>
            </Box>
          )}
          {selectedButton === 'Perform' && (
            <Box mt={2}>
              <Box mt={2}>
                <Grid
                  container
                  spacing={2}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_3.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_1.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>

                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_4.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_2.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                  <Slider {...settings}>
                    {images.map((image, index) => (
                      <div key={index}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Box
                              sx={{ position: 'relative', aspectRatio: 2.0 }}
                            >
                              <Image src={image} fill alt="home_book" />
                            </Box>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </Slider>
                </Box>
              </Box>
            </Box>
          )}
          {selectedButton === 'Connect' && (
            <Box mt={2}>
              <Box mt={2}>
                <Grid
                  container
                  spacing={2}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_1.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_3.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>

                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_2.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={3}>
                    <Box sx={{ position: 'relative', aspectRatio: 2.0 }}>
                      <Image
                        src="/images/home1/home_book_4.png"
                        fill
                        alt="home_book"
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                  <Slider {...settings}>
                    {images.map((image, index) => (
                      <div key={index}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Box
                              sx={{ position: 'relative', aspectRatio: 2.0 }}
                            >
                              <Image src={image} fill alt="home_book" />
                            </Box>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </Slider>
                </Box>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default HomeNewBooks;
