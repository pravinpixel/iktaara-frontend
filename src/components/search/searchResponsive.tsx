import ImageComponent from '@/utils/imageComponent';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
const musicImage = [
  { id: 1, image: '/images/home/home-learn.png', text: 'Learn' },
  { id: 2, image: '/images/home/paly.png', text: 'Paly' },
  { id: 3, image: '/images/home/perform.png', text: 'Perform' },
  { id: 4, image: '/images/home/connect.png', text: 'Connect' },
  { id: 5, image: '/images/home/upgrade.png', text: 'Upgrade' },
];
// const datas= [
//   {
//     id:1,
//     image: '/images/home/home-learn.png',
//     name:'learn',
//     url:'/buy/category/guitars/acoustic-guitar-guitars'
//   },
//   {
//     id:2,
//     image: '/images/home/home-learn.png',
//     name:'buy',
//     url:'/buy/category/piano-and-keyboards/portable-keyboard-piano-and-keyboards'
//   }
// ]
const SearchResponsive = (props: any) => {
  const { data1, handleClosess } = props;
  const router = useRouter();
  const handleSearch = (itemurl: any) => {
    router.replace(itemurl);
    handleClosess();
  };

  const handleLink = (itemsUrl: any) => {
    router.replace(itemsUrl);
    handleClosess();
  };
  const settings = {
    slidesToShow: 8,
    slidesToScroll: 8,
    dots: false,
    arrows: false,
    // centerMode: true,
    // centerPadding: '60px',
    // autoPlay: true,
    className: 'container-fluid  fast-selling-thumb margin-auto',
    responsive: [
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
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
    ],
  };
  return (
    <div className="search-header">
      <h5 className="border-title">Popular Choices</h5>
      <div className="circle-section">
        <Grid container>
          <Grid item xs={12} md={9}>
            <Grid container>
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
                    <h6 className="search-names-item">{item.name}</h6>
                    {/* </Link> */}
                  </Grid>
                ))}
                {/* <Grid item md={2}>
                  <Link href={data1?.popular_choices?.view_url}>
                    <div className="search-circle">
                      <img src="/images/demo/static/rightArrow.png" />
                    </div>
                    <h6 className="search-names-item">View All</h6>
                  </Link>
                </Grid> */}
              </Slider>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <h5 className="border-title">Top Seller </h5>
      <div className="rectangle-section">
        <Grid container my={2}>
          <Grid item xs={12} md={10}>
            <Grid container spacing={3}>
              <Slider {...settings}>
                {data1?.top_seller_books?.data?.map((item: any) => (
                  <Grid item md={2} key={item.id}>
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
                          style={{ width: '100%', height: '80%' }}
                        /> */}
                    </div>
                    {/* </Link> */}
                  </Grid>
                ))}

                <Grid
                  item
                  md={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    onClick={() =>
                      handleLink(data1?.top_seller_books?.view_url)
                    }
                  >
                    {/* <Link href={data1?.top_seller_books?.view_url}> */}
                    <div className="search-circle1 add-image-magein">
                      {/* <img src="/images/demo/static/rightArrow.png" /> */}
                      <ImageComponent
                        src="/images/demo/static/rightArrow.png"
                        alt="view all"
                        priority={true}
                        width={20}
                        height={20}
                      />
                    </div>
                    <h6 className="search-names">View All</h6>
                    {/* </Link> */}
                  </div>
                </Grid>
              </Slider>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <h5 className="border-title">services</h5>
      <div className="services-sectionss">
        <Box sx={{ display: 'flex' }} className="homenew-boxbg">
          <Typography className="homenew-text">
            One Stop Digital Platform for
          </Typography>
          <div className="vector-img">
            <ImageComponent
              src="/images/home/vector.png"
              width={40}
              height={33}
              alt="arrow"
              priority={true}
            />
            {/* <img src="/images/home/vector.png" /> */}
          </div>
        </Box>
        <Typography className="homenew-music">
          All Things with Music!
        </Typography>
        <Grid container>
          <Grid item xs={12} md={8} mb={1}>
            <Grid container spacing={2}>
              {musicImage?.map((item: any) => (
                <Grid item xs={4} sm={2} key={item.id}>
                  <Box
                    sx={{
                      position: 'relative',
                      aspectRatio: 1,
                      objectFit: 'contain',
                    }}
                  >
                    <Image src={item.image} fill alt={item.text} />
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

export default SearchResponsive;
