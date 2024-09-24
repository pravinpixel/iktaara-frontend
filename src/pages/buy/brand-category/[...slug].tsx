import api from 'src/lib/api/home';
import { axiosInstance } from 'src/lib/api/base';
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MetaTags = dynamic(() => import('@/components/common/header/MetaTags'));
const ProductLayout = dynamic(() => import('@/theme/layouts/ProductLayout'));
const TopSeller = dynamic(() => import('@/components/brands/TopSeller'));
const HomePremiumMusicCategory = dynamic(
  () => import('@/components/categoryproduct/HomePremiumMusicCategory'),
);
const ProductListCollection = dynamic(
  () => import('@/components/categoryproduct/ProductListCollection'),
);
const HomeBrandCenter = dynamic(
  () => import('@/components/home/home-brand-center'),
);
export default function BrandDetails({ meta, categoryDatas, brands }: any) {
  const {
    accessories,
    featured_products,
    category_details,
    random_color_section,
    recently_uploaded_products,
    sub_categories,
    faq,
  } = categoryDatas;

  const [expanded, setExpanded] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const numberOfFAQsToShow = showAll ? faq?.length : 5;

  const handleAccordionChange =
    (panel: any) => (_event: any, isExpanded: any) => {
      setExpanded(isExpanded ? panel : false);
    };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setExpanded(0);
  };
  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };

  const router = useRouter();
  const slug = router?.query?.slug;
  const categorySlug = slug?.[0] ?? '';
  return (
    <ProductLayout>
      <MetaTags meta={metaTags} />
      <div className="swpier-header-main">
        <Box
          sx={{
            position: 'relative',
            aspectRatio: 6,
            objectFit: 'content',
          }}
        >
          <Image
            src={category_details?.banner}
            alt={category_details?.name}
            fill
            className="category-imgbrand"
          />
          {/* <Box sx={{ position: 'absolute' }}>
          <h5 className="category-banner-titles">
            {category_details?.name}
          </h5>
          <p className="category-banner-paras">
            {category_details?.description}
          </p>
        </Box> */}
        </Box>
      </div>
      <Container
        maxWidth={'lg'}
        sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
      >
        <section className="category-section">
          <Typography variant="h5" gutterBottom className="category-Piano">
            {category_details?.name} Categories
          </Typography>
          <Box>
            <Grid container spacing={'10px'}>
              {/* {categorypiano?.map((item, index) => ( */}
              {sub_categories?.map((item: any) => (
                <Grid item xs={6} sm={4} md={3} key={item.id}>
                  <Link
                    href={`/buy/category/${item.slug}?brand=${categorySlug}`}
                  >
                    {/* <button className="category-Pianotype">
                    <Typography variant="subtitle2" className="category-text1">
                      {categoryDetails?.name}
                      <img
                        className="arrow-image-categoryPiano"
                        src="/icons/vector-arrow.png"
                      />
                    </Typography>
                  </button> */}
                    <Box className="home-new-begin-category">
                      <p>{item?.name}</p>
                      <div className="arrow-image-size">
                        <Image
                          className="arrow-image"
                          src="/icons/vector-arrow.png"
                          width={9}
                          height={14}
                          alt={item?.name}
                        />
                      </div>
                    </Box>
                  </Link>
                </Grid>
              ))}

              {/* ))} */}
            </Grid>
          </Box>
        </section>
        <section>
          <Grid
            container
            spacing={'16px'}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {random_color_section?.map((item: any, index: any) => (
              <Grid item md={2} key={index}>
                <Box
                  className="Piano-Beginners"
                  sx={{ backgroundColor: item.random_color }}
                >
                  <Typography variant="h5" className="piano-titlebg">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" className="piano-textbg">
                    From ₹
                    <span className="piano-amount">
                      {item.price_range_text}
                    </span>
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
      <Box mt={3}>
        <TopSeller title="Popular Piano’s Online" data={featured_products} />
      </Box>
      <Box>
        <section>
          <HomePremiumMusicCategory data={recently_uploaded_products} />
        </section>
        <ProductListCollection title="Accessories" data={accessories} />
      </Box>

      <section className="category-sections">
        <HomeBrandCenter title="Top Brands Mela" data={brands?.brands} />
      </section>
      {faq?.length > 0 && (
        <section>
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
          >
            <Grid
              container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              my={3}
            >
              <Grid item xs={12} mb={3}>
                <Typography className="brands-faq-title">
                  Frequently Asked Questions
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} className="catogory-accordin">
                {faq
                  ?.slice(0, numberOfFAQsToShow)
                  .map((item: any, index: any) => (
                    <Accordion
                      sx={{ mb: 2 }}
                      expanded={expanded === index}
                      onChange={handleAccordionChange(index)}
                      key={index}
                      className={
                        expanded === index
                          ? 'selected-accordion'
                          : 'unselected-accordion'
                      }
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography className="brands-faq-head">
                          {item.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography className="brands-faq-head-sub">
                          {item.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  {faq?.length > 5 && (
                    <Button
                      className="show-all-toggle-button"
                      onClick={toggleShowAll}
                      variant="outlined"
                    >
                      {showAll ? 'View Less' : 'Load More'}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </section>
      )}
    </ProductLayout>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const { slug } = ctx.query;

  const category_slug = slug[1];
  const [meta, categoryDatas, brands] = await Promise.all([
    await api.getMetaData({ page: 'brands-category' }).then((res: any) => {
      if (res?.error == 0 && res?.status_code == 200) {
        return {
          title: res?.data?.meta_title || 'CategoryBrands | Iktaraa',
          keywords: res?.data?.meta_keywords || '',
          description: res?.data?.meta_description || '',
          image:
            res?.data?.meta_image ||
            res?.data?.logo ||
            '/public/images/logo.svg',
        };
      }
      return [];
    }),
    await axiosInstance()
      .post('api/get/accessories/products', { category_slug: category_slug })
      .then((res) => res?.data?.data)
      .catch(() => {
        return {
          data: {},
        };
      }),
    await api
      .getBrands()
      .then((res: any) => {
        return res.data;
      })
      .catch(() => {
        return {};
      }),
  ]);

  return {
    props: {
      categoryDatas,
      meta,
      brands,
    },
  };
};
