/* eslint-disable react-hooks/exhaustive-deps */
import styles from '@/theme/styles/Home.module.css';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { axiosInstance } from 'src/lib/api/base';
import store from 'src/redux/store';
import Footer from '../components/common/footer/Footer';
import HomeNewBegin from '@/components/common/home-new-sections/home-new-beginner';
import HomeNewBooks from '@/components/common/home-new-sections/home-new-books';
import HomeNewDjDeals from '@/components/common/home-new-sections/home-new-djdeals';
import HomeNewMusic from '@/components/common/home-new-sections/home-new-music';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import api from 'src/lib/api/home';
import ResponsiveHeader from '@/components/common/header/ResponsiveHeader';
import TopBar2 from '@/components/common/header/TopBar2';
import HomeNewAbout from '@/components/common/home-new-sections/home-new-about';
import HomeNewBrands from '@/components/common/home-new-sections/home-new-brands';
import HeaderBannerNew from '@/components/common/home-new-sections/banner';
import ImageComponent from '@/utils/imageComponent';
import Link from 'next/link';
const MetaTags = dynamic(() => import('src/components/common/header/MetaTags'));

const ApiUrl = process.env.API_END_POINT;

type Props = {
  collections: any;
  collections1: any;
  details: any;
  meta: any;
  ecomhomedetails: any;
};

const Home = (props: Props) => {
  const { meta } = props;
  const metaTags = {
    title: meta?.title,
    keywords: meta?.keywords,
    description: meta?.description,
    image: meta?.image,
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [homeBanner, setHomeBanner] = useState([]);
  const [category, setCategory] = useState([]);

  const musicImage = [
    {
      image: '/images/demo/static/home-landing-buy.png',
      text: 'Buy',
      url: '/buy',
    },
    {
      image: '/images/home/home-learn.png',
      text: 'Learn',
      url: 'https://www.iktaraa.com/learn',
    },
    {
      image: '/images/home/paly.png',
      text: 'Play',
      url: '',
    },
    {
      image: '/images/home/perform.png',
      text: 'Perform',
      url: '',
    },
    {
      image: '/images/home/connect.png',
      text: 'Connect',
      url: 'https://survey.zohopublic.in/zs/8DdeYJ',
    },
    {
      image: '/images/home/upgrade.png',
      text: 'Upgrade',
      url: '',
    },
    {
      image: '/images/home/notified.png',
      text: 'Get Notified!',
      url: '',
    },
  ];

  useEffect(() => {
    if (!loading) {
      const loadHomeEcomBanner = async () => {
        const datas: any =
          Array.from(props?.ecomhomedetails?.top_banners) || [];
        // const datas = Array.from(props?.ecomhomedetails?.top_banners) || [];
        setHomeBanner(datas);

        setLoading(true);
      };

      const loadHomeEcom = async () => {
        const datas: any = Array.isArray(
          props?.ecomhomedetails?.dynamic_brand_category,
        )
          ? Array.from(props.ecomhomedetails.dynamic_brand_category)
          : [];

        setCategory(datas);
        setLoading(true);
      };

      loadHomeEcomBanner();
      loadHomeEcom();
    }
  }, [loading, setLoading]);

  return (
    <Provider store={store}>
      <MetaTags meta={metaTags} />
      <main className={styles.main}>
        {/* <Header />
        <HeaderBanner type="Home" data={homeBanner} />
        <MusicStore />
        <HomeImageSection data={homeCategory} />
        <HomeTopSellers data={topSellers} />
        <HomeCategoryBlockNew data={promoBanner} />
        <HomePremiumMusic data={topSellers} />
        <HomeAccessories />
        <HomeBrandCenter data={ecomBrands} />
        <HomeBooksCollections data={topSellers} />
        <HomeTestimonials /> */}
        <header className="header-area">
          <ResponsiveHeader />
          <TopBar2 />
        </header>
        <HeaderBannerNew type="NewHome" data={homeBanner} />
        <section className="home-topsection">
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
          >
            <Box
              sx={{
                paddingTop: '10px',
                paddingBottom: '4px',
              }}
            >
              <Grid container>
                <Grid item xs={12} md={4} mt={3}>
                  <Box sx={{ display: 'flex' }} className="homenew-boxbg">
                    <Typography className="homenew-text">
                      One Stop Digital Platform for
                    </Typography>
                    <div className="vector-img">
                      {/* <img src="/images/home/vector.png" alt="img" /> */}
                      <ImageComponent
                        src="/images/home/vector.png"
                        width={40}
                        height={33}
                        alt="arrow"
                        priority={true}
                      />
                    </div>
                  </Box>
                  <Typography className="homenew-music">
                    All Things with Music!
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      // p: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: { xs: '10px', md: '15px' },
                        justifyContent: 'center',
                      }}
                    >
                      {musicImage.map((item, index) => (
                        <Fragment key={index}>
                          <Box>
                            <div className="guitars-imgbg home-music-cg">
                              {/* <img src={item.image} alt="img"></img> */}
                              {item?.url ? (
                                <Link href={item.url}>
                                  <ImageComponent
                                    src={item.image}
                                    width={85}
                                    height={85}
                                    alt="serves"
                                    priority={true}
                                  />
                                </Link>
                              ) : (
                                <ImageComponent
                                  src={item.image}
                                  width={85}
                                  height={85}
                                  alt="serves"
                                  priority={true}
                                />
                              )}
                            </div>
                            <p className="guitars-text">{item.text}</p>
                          </Box>
                        </Fragment>
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </section>
        <HomeNewMusic />
        <HomeNewBooks />
        <HomeNewDjDeals />
        <HomeNewBrands data={category} />
        <HomeNewBegin />
        <HomeNewAbout />
        {/* <HomeTestimonials /> */}
        <Footer />
      </main>
    </Provider>
  );
};
export default Home;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const collections = await axiosInstance()
//     .get(ApiUrl + '/api/get/discount/collections')
//     .then((res: any) => {
//       if (res?.status == 200 && res?.data?.status_code == 200) {
//         const datas: any = Array.from(res?.data?.data) || [];

//         return datas;
//       } else {
//         return [];
//       }
//     })
//     .catch(() => {
//       return [];
//     });

//   const details = await axiosInstance()
//     .get(ApiUrl + '/api/get/home/details')
//     .then((res: any) => {
//       if (res?.status == 200 && res?.data?.status_code == 200) {
//         const datas: any = res?.data?.data;
//         return datas;
//       } else {
//         return [];
//       }
//     })
//     .catch(() => {
//       return [];
//     });

//   const ecomhomedetails = await axiosInstance()
//     .get(ApiUrl + '/api/ecom-home-details')
//     .then((res: any) => {
//       if (res?.status == 200 && res?.data?.status_code == 200) {
//         const datas: any = res?.data?.data;
//         return datas;
//       } else {
//         return [];
//       }
//     });

//   const meta = await api.getMetaData({ page: 'home' }).then((res: any) => {

//     if (res?.error == 0 && res?.status_code == 200) {
//       return {
//         title: res?.data?.meta_title,
//         keywords: res?.data?.meta_keywords,
//         description: res?.data?.meta_description,
//         image: res?.data?.logo,
//       };
//     }
//     return {
//       title: '',
//     };
//   });

//   return {
//     props: {
//       collections: collections,
//       details: details,
//       meta: meta,
//       ecomhomedetails: ecomhomedetails,
//     },
//   };
// };

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const [collections, details, ecomhomedetails, meta] = await Promise.all([
//     axiosInstance()
//       .get(`${ApiUrl}/api/get/discount/collections`)
//       .then((res) => {
//         if (res?.status === 200 && res?.data?.status_code === 200) {
//           return Array.from(res?.data?.data) || [];
//         } else {
//           return [];
//         }
//       })
//       .catch(() => []),

//     axiosInstance()
//       .get(`${ApiUrl}/api/get/home/details`)
//       .then((res) => {
//         if (res?.status === 200 && res?.data?.status_code === 200) {
//           return res?.data?.data;
//         } else {
//           return [];
//         }
//       })
//       .catch(() => []),

//     axiosInstance()
//       .get(`${ApiUrl}/api/ecom-home-details`)
//       .then((res) => {
//         if (res?.status === 200 && res?.data?.status_code === 200) {
//           return res?.data?.data;
//         } else {
//           return [];
//         }
//       })
//       .catch(() => []),

//     api
//       .getMetaData({ page: 'home' })
//       .then((res) => {
//         if (res?.error === 0 && res?.status_code === 200) {
//           return {
//             title: res?.data?.meta_title,
//             keywords: res?.data?.meta_keywords,
//             description: res?.data?.meta_description,
//             image: res?.data?.logo,
//           };
//         }
//         return { title: '' };
//       })
//       .catch(() => ({ title: '' })),
//   ]);

//   return {
//     props: {
//       collections,
//       details,
//       ecomhomedetails,
//       meta,
//     },
//   };
// };

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const ecomhomedetails = await axiosInstance()
//     .get(ApiUrl + '/api/home-banners')
//     .then((res: any) => {
//       if (res?.status == 200 && res?.data?.status_code == 200) {
//         const datas: any = res?.data?.data;
//         return datas;
//       } else {
//         return [];
//       }
//     })
//     .catch(() => {
//       console.log('error');
//       return [];
//     });

//   return {
//     props: {
//       ecomhomedetails: ecomhomedetails,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async () => {
  const [ecomhomedetails, meta] = await Promise.all([
    axiosInstance()
      .get(`${ApiUrl}/api/home-banners`)
      .then((res: any) => {
        if (res?.status === 200 && res?.data?.status_code === 200) {
          return res?.data?.data;
        } else {
          return [];
        }
      })
      .catch(() => {
        console.log('error');
        return [];
      }),

    api
      .getMetaData({ page: 'home' })
      .then((res) => {
        if (res?.error === 0 && res?.status_code === 200) {
          return {
            title: res?.data?.meta_title,
            keywords: res?.data?.meta_keywords,
            description: res?.data?.meta_description,
            image: res?.data?.logo,
          };
        }
        return { title: '' };
      })
      .catch(() => ({ title: '' })),
  ]);

  return {
    props: {
      ecomhomedetails,
      meta,
    },
  };
};

export const config = {
  unstable_JsPreload: false,
  // unstable_runtimeJS:false,
  optimizeImages: true,
  optimizeFonts: true,
};
