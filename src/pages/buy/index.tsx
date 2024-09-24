/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import HeaderBanner from '@/components/common/header/Banner';
import Footer from '@/components/common/footer/Footer';
import api from 'src/lib/api/home';

import dynamic from 'next/dynamic';
const MetaTags = dynamic(() => import('src/components/common/header/MetaTags'));
const MusicStore = dynamic(
  () => import('@/components/common/musicstore/MusicStore'),
);
const HomeTopSellers = dynamic(
  () => import('@/components/home/home-top-sellers'),
);
const HomeCategoryBlockNew = dynamic(
  () => import('@/components/home/home-categorynew-block'),
);
const HomePremiumMusic = dynamic(
  () => import('@/components/home/home-premium-music'),
);
const HomeBooksCollections = dynamic(
  () => import('@/components/home/home-books'),
);

const HomeAccessories = dynamic(
  () => import('@/components/home/home-accessories'),
);
const HomeImageSection = dynamic(
  () => import('@/components/home/home-image-section'),
);
const HomeBrandCenter = dynamic(
  () => import('@/components/home/home-brand-center'),
);
const ApiUrl = process.env.API_END_POINT;
import { axiosInstance } from 'src/lib/api/base';

import { GetServerSideProps } from 'next';
import Header from '@/components/common/header/Header';

type Props = {
  collections: any;
  collections1: any;
  details: any;
  meta: any;
  ecomhomedetails: any;
};

const Buy = (props: Props) => {
  const { meta, collections, ecomhomedetails, details } = props;

  const metaTags = {
    title: meta?.title,
    keywords: meta?.keywords,
    description: meta?.description,
    image: meta?.image,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [celebrity, setCelebrity] = useState([]);
  const [latest, setlatest] = useState([]);
  const [experts, setExperts] = useState([]);
  const [brand, setbrands] = useState([]);
  const [curated, setCurated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [fastselling, seFastselling] = useState([]);
  const [newSection, setNewSection] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [bookCollections, setBookCollections] = useState([]);
  const [homeCategory, setHomeCategory] = useState([]);
  const [homeBanner, setHomeBanner] = useState([]);
  const [promoBanner, setPromoBanner] = useState([]);
  const [ecomBrands, setEcomBrands] = useState([]);
  const [premiumMusic, setPremiumMusic] = useState([]);
  const [booksNew, setBooksNew] = useState([]);

  useEffect(() => {
    if (!loading) {
      const loadHomeContent = async () => {
        // const datas: any = Array.from(collections) || [];
        const datas: any = Array.isArray(collections) ? collections : [];
        datas.forEach((data: any) => {
          switch (data?.id) {
            // case 'celebrity-choice-recent-purchase-by-music-celebrities':
            case 2:
              setCelebrity(data);
              break;
            // case 'experts-choice':
            case 17:
              setExperts(data);
              break;

            // case 'brand-offers-upto-45':
            case 11:
              setbrands(collections);
              break;
            // case 'top-curated-collections':
            case 16:
              setCurated(data);
              break;
            // case 19:
            //   setTopSellers(data);
            //   break;
            case 20:
              setBookCollections(data);
              break;
            case 18:
              setPremiumMusic(data);
              break;
          }
        });
      };

      const loadHomeCollection = async () => {
        details?.collection?.forEach((data: any) => {
          switch (data?.id) {
            // case 'iktaaras-pick-handpicked-collections-by-music-experts':
            case 6:
              setTrending(data);
              break;
            case 19:
              setNewSection(data);
              break;
            // case 'our-latest-arrivals':
            case 10:
              setlatest(data);
            // case 'fast-selling-deals-across-music-instruments':
            case 7:
              seFastselling(data);
              break;
          }
        });
        setLoading(true);
      };
      const loadHomeEcom = async () => {
        const datas: any = Array.isArray(ecomhomedetails?.home_categories)
          ? Array.from(ecomhomedetails.home_categories_new)
          : [];

        setHomeCategory(datas);
        setLoading(true);
      };

      const loadHomeEcomBanner = async () => {
        const datas: any = Array.isArray(ecomhomedetails?.top_banners)
          ? Array.from(ecomhomedetails?.top_banners)
          : [];

        setHomeBanner(datas);

        setLoading(true);
      };

      const loadHomeEcomPromoBanner = async () => {
        const datas: any = Array.isArray(ecomhomedetails?.promo_banners)
          ? Array.from(ecomhomedetails?.promo_banners)
          : [];
        setPromoBanner(datas);

        setLoading(true);
      };

      const loadHomeEcomBrands = async () => {
        const datas: any = Array.isArray(ecomhomedetails?.brands)
          ? Array.from(ecomhomedetails?.brands)
          : [];
        setEcomBrands(datas);

        setLoading(true);
      };
      // const loadHomeEcomTopSellers = async () => {
      //   const datas: any = Array.isArray(ecomhomedetails?.product_collection)
      //     ? Array.from(ecomhomedetails?.product_collection)
      //     : [];
      //   setTopSellers(datas);

      //   setLoading(true);
      // };
      const loadHomeEcomTopSellers = async () => {
        // Assuming ecomhomedetails contains the necessary data
        const collections: any = ecomhomedetails
          ? ecomhomedetails.product_collection
          : [];

        // Set loading to true before processing
        setLoading(true);

        // Process each collection item
        collections.forEach((data: any) => {
          switch (data?.id) {
            case 18: // Replace with actual ID for home banners
              setPremiumMusic(data);
              break;
            case 19: // Replace with actual ID for promo banners
              setTopSellers(data);
              break;
            case 20: // Replace with actual ID for ecom brands
              const ecomBrandDatas = Array.isArray(data?.brands)
                ? data.brands
                : [];
              setBooksNew(data);
              break;

            // Add other cases as needed
            default:
              console.warn(`Unhandled data ID: ${data?.id}`);
              break;
          }
        });

        // Set loading to false after processing
        setLoading(false);
      };
      loadHomeContent();
      loadHomeCollection();
      loadHomeEcom();
      loadHomeEcomBanner();
      loadHomeEcomPromoBanner();
      loadHomeEcomBrands();
      loadHomeEcomTopSellers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    collections,
    details?.collection,
    ecomhomedetails?.brands,
    ecomhomedetails?.home_categories,
    ecomhomedetails?.product_collection,
    ecomhomedetails?.promo_banners,
    ecomhomedetails?.top_banners,
    loading,
    ecomhomedetails.home_categories_new,
    setLoading,
  ]);

  // useEffect(() => {
  //   if (!loading) {
  //     const loadHomeEcomBanner = async () => {
  //       const datas: any =
  //         Array.from(ecomhomedetails?.top_banners) || [];
  //       setHomeBanner(datas);

  //       setLoading(true);
  //     };

  //     const loadHomeEcom = async () => {
  //       const datas: any = Array.isArray(
  //         ecomhomedetails?.dynamic_brand_category,
  //       )
  //         ? Array.from(ecomhomedetails.dynamic_brand_category)
  //         : [];

  //       setCategory(datas);
  //       setLoading(true);
  //     };

  //     loadHomeEcomBanner();
  //     loadHomeEcom();
  //   }
  // }, [loading, setLoading]);
  return (
    <>
      {/* <header className="header-area">
        <ResponsiveHeader />
        <TopBar2 />
      </header>
      <HeaderBanner type="NewHome" data={homeBanner} />
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
              <Grid item xs={12} md={5} mt={3}>
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
                  </div>
                </Box>
                <Typography className="homenew-music">
                  All Things with Music!
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Box
                  sx={{
                    p: 1,
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
                      <>
                        <Box key={index}>
                          <div className="guitars-imgbg home-music-cg">
                          
                            <ImageComponent
                              src={item.image}
                              width={85}
                              height={85}
                              alt="serves"
                              priority={true}
                            />
                          </div>
                          <p className="guitars-text">{item.text}</p>
                        </Box>
                      </>
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
      <HomeTestimonials /> */}
      <Header />
      <MetaTags meta={metaTags} />
      <HeaderBanner type="Home" data={homeBanner} />
      <MusicStore />
      <HomeImageSection data={homeCategory} />
      <HomeTopSellers data={topSellers} />
      <HomeCategoryBlockNew data={promoBanner} />
      <HomePremiumMusic data={premiumMusic} />
      <HomeAccessories />
      <HomeBrandCenter data={ecomBrands} />
      <HomeBooksCollections data={booksNew} />
      {/* <HomeTestimonials /> */}
      <Footer />
    </>
  );
};

export default Buy;

export const getServerSideProps: GetServerSideProps = async () => {
  const [collections, details, ecomhomedetails, meta] = await Promise.all([
    axiosInstance()
      .get(`${ApiUrl}/api/get/discount/collections`)
      .then((res) => {
        if (res?.status === 200 && res?.data?.status_code === 200) {
          return Array.from(res?.data?.data) || [];
        } else {
          return [];
        }
      })
      .catch(() => []),

    axiosInstance()
      .get(`${ApiUrl}/api/get/home/details`)
      .then((res) => {
        if (res?.status === 200 && res?.data?.status_code === 200) {
          return res?.data?.data;
        } else {
          return [];
        }
      })
      .catch(() => []),

    axiosInstance()
      .get(`${ApiUrl}/api/ecom-home-details`)
      .then((res) => {
        if (res?.status === 200 && res?.data?.status_code === 200) {
          return res?.data?.data;
        } else {
          return [];
        }
      })
      .catch(() => []),

    api
      .getMetaData({ page: 'home' })
      .then((res) => {
        if (res?.error === 0 && res?.status_code === 200) {
          return {
            title: res?.data?.meta_title || 'Home | Iktaraa',
            keywords: res?.data?.meta_keywords,
            description: res?.data?.meta_description,
            image:
              res?.data?.meta_image ||
              res?.data?.logo ||
              '/public/images/logo.svg',
          };
        }
        return { title: '' };
      })
      .catch(() => ({ title: '' })),
  ]);

  return {
    props: {
      collections,
      details,
      ecomhomedetails,
      meta,
    },
  };
};

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
