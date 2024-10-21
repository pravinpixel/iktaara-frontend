import ImageComponent from '@/utils/imageComponent';
import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Slider from 'react-slick';

const musicImage = [
  { id: 1, image: '/images/home/home-learn.png', text: 'Learn' },
  { id: 2, image: '/images/home/paly.png', text: 'Play' },
  { id: 3, image: '/images/home/perform.png', text: 'Perform' },
  { id: 4, image: '/images/home/connect.png', text: 'Connect' },
  { id: 5, image: '/images/home/upgrade.png', text: 'Upgrade' },
];

const Searchcompound = (props: any) => {
  const { data1, setOpen } = props;
  const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     setCurrentUrl(url);
  //     handleBackdropClick();
  //     // setOpen(false); // Close the backdrop
  //   };

  //   // Listen for route changes
  //   router.events.on('routeChangeComplete', handleRouteChange);

  //   // Remove event listener on component unmount
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events, setOpen]);
  const handleSearch = (itemurl: any) => {
    router.replace(itemurl);
    // handleBackdropClick();
    setOpen(false);

    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      activeElement.blur();
    }
  };

  const handleLink = (itemsUrl: any) => {
    router.replace(itemsUrl);
    // handleBackdropClick();
    setOpen(false);
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      activeElement.blur();
    }
  };

  const settings = {
    slidesToShow: 6,
    slidesToScroll: 6,
    dots: false,
    arrows: false,
    className: 'container-fluid  fast-selling-thumb margin-auto',
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 5,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
    ],
  };

  // const staticUrls = [
  //   {
  //     id: 1,
  //     url: '/category/drums-and-percussions/electronic-drumkits-drums-and-percussions',
  //     name: 'Name 1',
  //     image: '/images/home/image_5.png',
  //   },
  //   {
  //     id: 2,
  //     url: '/category/guitars/acoustic-guitar-guitars',
  //     name: 'Name 2',
  //     image: '/images/home/image_5.png',
  //   },
  //   {
  //     id: 2,
  //     url: '/category/accessories/music-stand-accessories',
  //     name: 'Name 2',
  //     image: '/images/home/image_5.png',
  //   },

  //   {
  //     id: 2,
  //     url: '/category/woodwind/saxophone-woodwind',
  //     name: 'Name 2',
  //     image: '/images/home/image_5.png',
  //   },
  //   // Add more objects as needed
  // ];
  return (
    <div>
      <h5 className="border-title">Popular Choices</h5>
      <div className="circle-section">
        <Grid container>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Slider {...settings}>
                {data1?.popular_choices?.data?.map((item: any) => (
                  <Grid
                    item
                    md={2}
                    key={item.id}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleSearch(item?.url)}
                  >
                    {/* <Link href={item.url}> */}
                    <div className="search-circle">
                      {/* <img src={item.image} /> */}
                      <ImageComponent
                        src={item.image}
                        alt="popular_choice"
                        priority={true}
                        width={50}
                        height={50}
                      />
                    </div>
                    <h6 className="search-names">{item.name}</h6>
                    {/* </Link> */}
                  </Grid>
                ))}
              </Slider>
              {/* <Grid item md={2}>
                <Link href={data1?.popular_choices?.view_url}>
                  <div className="search-circle">
                    <img src="/images/demo/static/rightArrow.png" />
                  </div>
                  <h6 className="search-names" style={{ cursor: 'pointer' }}>
                    View All
                  </h6>
                </Link>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <h5 className="border-title">Top Seller Books</h5>
      <div className="rectangle-section">
        <Grid container my={2}>
          <Grid item xs={12} md={10}>
            <Grid container spacing={1}>
              {data1?.top_seller_books?.data?.map((item: any) => (
                <Grid
                  item
                  xs={2}
                  md={2}
                  key={item.id}
                  sx={{ cursor: 'pointer' }}
                >
                  {/* <Link href={item.url}> */}
                  <div
                    className="rectangle-sec-border"
                    onClick={() => handleSearch(item?.url)}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        objectFit: 'contain',
                        aspectRatio: 0.68,
                      }}
                    >
                      <Image src={item.image} fill alt="img-book" />
                    </Box>
                    {/* <img
                      src={item.image}
                      style={{ width: '100%', height: '100%' }}
                    /> */}
                  </div>
                  {/* </Link> */}
                </Grid>
              ))}
              <Grid
                item
                xs={2}
                md={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  verticalAlign: 'middle',
                }}
              >
                {/* {'data1?.top_seller_books?.view_url'} */}
                <div
                  onClick={() => handleLink(data1?.top_seller_books?.view_url)}
                >
                  {/* <Link href="/category/books"> */}
                  <div className="search-circle1" style={{ marginTop: '10px' }}>
                    {/* <img src="/images/demo/static/rightArrow.png" /> */}
                    <ImageComponent
                      src="/images/demo/static/rightArrow.png"
                      alt="view all"
                      priority={true}
                      width={18}
                      height={18}
                    />
                  </div>
                  <h6
                    className="search-names"
                    style={{
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    View All
                  </h6>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <h5 className="border-title">services</h5>
      <div className="services-sectionss">
        <Grid container>
          <Grid item xs={12} md={10} lg={8} mb={1}>
            <Grid container spacing={2}>
              {musicImage?.map((item: any) => (
                <Grid item xs={2} md={2} key={item.id}>
                  <Box
                    sx={{
                      position: 'relative',
                      aspectRatio: 1,
                      objectFit: 'contain',
                    }}
                  >
                    <Image src={item.image} fill alt="service" />
                  </Box>
                  <h6 className="service-text">{item.text}</h6>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Searchcompound;
