// import TopSeller from '@/components/brands/TopSeller';
// import ProductListCollection from '@/components/categoryproduct/ProductListCollection';
import ProductLayout from '@/theme/layouts/ProductLayout';
import {
  Box,
  Grid,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import HomeBrandCenter from '@/components/home/home-brand-center';
// import HomePremiumMusic from '@/components/home/home-premium-music';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const TopSeller = dynamic(() => import('@/components/brands/TopSeller'));
const ProductListCollection = dynamic(
  () => import('@/components/categoryproduct/ProductListCollection'),
);
const HomeBrandCenter = dynamic(
  () => import('@/components/home/home-brand-center'),
);
const HomePremiumMusic = dynamic(
  () => import('@/components/home/home-premium-music'),
);

export default function BrandDetails() {
  const [expanded, setExpanded] = useState(0);
  const handleAccordionChange =
    (panel: any) => (event: any, isExpanded: any) => {
      setExpanded(isExpanded ? panel : false);
    };

  const brand = {
    products: [
      {
        id: 1,
        category: 'Electronic Drumkits',
        category_slug: 'electronic-drumkits-drums-and-percussions',
        has_video_shopping: 'yes',
        hsn_code: '92079000',
        image:
          'https://staging-admin.iktaraa.com/storage/products/4112/default/1DKTEF1491-1.jpg',
        is_best_selling: 0,
        is_featured: 0,
        is_new: 0,
        mrp_price: '183161.02',
        product_name:
          'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
        product_url:
          'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

        sale_prices: {
          overall_discount_percentage: 0,
          price: '216,130.00',
          price_original: '216130.00',
          strike_rate: '0.00',
          strike_rate_original: 0,
        },
      },
      {
        id: 2,
        category: 'Electronic Drumkits',
        category_slug: 'electronic-drumkits-drums-and-percussions',
        has_video_shopping: 'yes',
        hsn_code: '92079000',
        image:
          'https://staging-admin.iktaraa.com/storage/products/3835/default/1DKTLD1632-1.jpg',
        is_best_selling: 0,
        is_featured: 0,
        is_new: 0,
        mrp_price: '183161.02',
        product_name:
          'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
        product_url:
          'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

        sale_prices: {
          overall_discount_percentage: 0,
          price: '50,190.00',
          price_original: '50,190.00',
          strike_rate: '0.00',
          strike_rate_original: 0,
        },
      },
      {
        id: 3,
        category: 'Electronic Drumkits',
        category_slug: 'electronic-drumkits-drums-and-percussions',
        has_video_shopping: 'yes',
        hsn_code: '92079000',
        image:
          'https://staging-admin.iktaraa.com/storage/products/4112/default/1DKTEF1491-1.jpg',
        is_best_selling: 0,
        is_featured: 0,
        is_new: 0,
        mrp_price: '183161.02',
        product_name:
          'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
        product_url:
          'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

        sale_prices: {
          overall_discount_percentage: 0,
          price: '216,130.00',
          price_original: '216130.00',
          strike_rate: '0.00',
          strike_rate_original: 0,
        },
      },
      {
        id: 4,
        category: 'Electronic Drumkits',
        category_slug: 'electronic-drumkits-drums-and-percussions',
        has_video_shopping: 'yes',
        hsn_code: '92079000',
        image:
          'https://staging-admin.iktaraa.com/storage/products/3835/default/1DKTLD1632-1.jpg',
        is_best_selling: 0,
        is_featured: 0,
        is_new: 0,
        mrp_price: '183161.02',
        product_name:
          'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
        product_url:
          'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

        sale_prices: {
          overall_discount_percentage: 0,
          price: '50,190.00',
          price_original: '50,190.00',
          strike_rate: '0.00',
          strike_rate_original: 0,
        },
      },
      {
        id: 5,
        category: 'Electronic Drumkits',
        category_slug: 'electronic-drumkits-drums-and-percussions',
        has_video_shopping: 'yes',
        hsn_code: '92079000',
        image:
          'https://staging-admin.iktaraa.com/storage/products/4112/default/1DKTEF1491-1.jpg',
        is_best_selling: 0,
        is_featured: 0,
        is_new: 0,
        mrp_price: '183161.02',
        product_name:
          'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
        product_url:
          'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

        sale_prices: {
          overall_discount_percentage: 0,
          price: '216,130.00',
          price_original: '216130.00',
          strike_rate: '0.00',
          strike_rate_original: 0,
        },
      },
      {
        id: 6,
        category: 'Electronic Drumkits',
        category_slug: 'electronic-drumkits-drums-and-percussions',
        has_video_shopping: 'yes',
        hsn_code: '92079000',
        image:
          'https://staging-admin.iktaraa.com/storage/products/3835/default/1DKTLD1632-1.jpg',
        is_best_selling: 0,
        is_featured: 0,
        is_new: 0,
        mrp_price: '183161.02',
        product_name:
          'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
        product_url:
          'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

        sale_prices: {
          overall_discount_percentage: 0,
          price: '50,190.00',
          price_original: '50,190.00',
          strike_rate: '0.00',
          strike_rate_original: 0,
        },
      },
      {
        id: 7,
        category: 'Electronic Drumkits',
        category_slug: 'electronic-drumkits-drums-and-percussions',
        has_video_shopping: 'yes',
        hsn_code: '92079000',
        image:
          'https://staging-admin.iktaraa.com/storage/products/4112/default/1DKTEF1491-1.jpg',
        is_best_selling: 0,
        is_featured: 0,
        is_new: 0,
        mrp_price: '183161.02',
        product_name:
          'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
        product_url:
          'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

        sale_prices: {
          overall_discount_percentage: 0,
          price: '216,130.00',
          price_original: '216130.00',
          strike_rate: '0.00',
          strike_rate_original: 0,
        },
      },
      {
        id: 8,
        category: 'Electronic Drumkits',
        category_slug: 'electronic-drumkits-drums-and-percussions',
        has_video_shopping: 'yes',
        hsn_code: '92079000',
        image:
          'https://staging-admin.iktaraa.com/storage/products/3835/default/1DKTLD1632-1.jpg',
        is_best_selling: 0,
        is_featured: 0,
        is_new: 0,
        mrp_price: '183161.02',
        product_name:
          'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
        product_url:
          'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

        sale_prices: {
          overall_discount_percentage: 0,
          price: '50,190.00',
          price_original: '50,190.00',
          strike_rate: '0.00',
          strike_rate_original: 0,
        },
      },
    ],
  };
  const faq = [
    {
      id: 1,
      title: 'How do I choose the right pianica online?',
      sub: 'To select the perfect pianica online, consider your skill level, budget, and desired features. Look for reputable brands, read customer reviews, and choose a model that aligns with your musical preferences.',
    },
    {
      id: 2,
      title: 'What are the advantages of shopping for a "Pianica Online"?',
      sub: 'To select the perfect pianica online, consider your skill level, budget, and desired features. Look for reputable brands, read customer reviews, and choose a model that aligns with your musical preferences.',
    },
    {
      id: 3,
      title: 'What is the typical price of a Pianica in India?',
      sub: 'To select the perfect pianica online, consider your skill level, budget, and desired features. Look for reputable brands, read customer reviews, and choose a model that aligns with your musical preferences.',
    },
  ];

  // const settings = {
  //   className: 'container-fluid margin-auto',
  //   centerMode: true,
  //   infinite: true,
  //   slidesToShow: 3,
  //   speed: 500,
  //   rows: 2,

  //   slidesPerRow: 2,
  //   responsive: [
  //     {
  //       breakpoint: 1250,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         initialSlide: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 1000,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 500,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 1,
  //       },
  //     },
  //   ],
  // };
  const categorypiano = [
    {
      title: 'Grand Piano',
    },
    {
      title: 'Upright Piano',
    },
    {
      title: 'Digital Piano',
    },
    {
      title: 'Portable Keyboard',
    },
    {
      title: 'Arranger Keyboard',
    },
    {
      title: 'Mini Keyboard',
    },
    {
      title: 'Synthesizer',
    },
    {
      title: 'Keyboard Amps',
    },
    {
      title: 'Keyboard Accessories',
    },
  ];
  const pianoFrom = [
    {
      title: 'Piano for Beginners',
      amount: '5,500',
      ClassNames: 'Piano-Beginners',
    },
    {
      title: 'Keyboards for Beginners',
      amount: '25,000',
      ClassNames: 'Keyboards-Beginners',
    },
    {
      title: 'Portable keyboards',
      amount: '35,500',
      ClassNames: 'Portable-keyboards',
    },
    {
      title: 'Musical Studio Keyboards',
      amount: '35,500',
      ClassNames: 'Musical-Keyboards',
    },
    {
      title: 'LIVE Musical performance ',
      amount: '35,500',
      ClassNames: 'live-musical',
    },
    {
      title: 'Portable keyboards ',
      amount: '35,500',
      ClassNames: 'KeyboardsPortable',
    },
  ];
  // const brandsbox = [
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  //   {
  //     image: '/images/yamaha-logo.png',
  //     title: '50 Products',
  //   },
  // ];
  return (
    <ProductLayout>
      <Box sx={{ position: 'relative', aspectRatio: 6, objectFit: 'content' }}>
        <Image
          src="/images/collections/static/Brand.png"
          alt="Brand"
          fill
          className="category-imgbrand"
        />
      </Box>
      <Container
        maxWidth={'lg'}
        sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
      >
        <section className="category-section">
          <Typography variant="h5" gutterBottom className="category-Piano">
            Piano & Keyboard Categories
          </Typography>
          <Box>
            <Grid container spacing={'10px'}>
              {categorypiano?.map((item, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  {/* <Button className="category-Pianotype">
                    <Typography variant="subtitle2" className="category-text1">
                      {item.title}
                    </Typography>
                    <img
                      className="arrow-image"
                      src="/icons/vector-arrow.png"
                    />
                  </Button> */}
                  <Box className="home-new-begin-category">
                    <p>{item.title}</p>
                    <div className="arrow-image-size">
                      <Image
                        className="arrow-image"
                        src="/icons/vector-arrow.png"
                        width={9}
                        height={14}
                        alt="arrow"
                      />
                    </div>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </section>
        <section>
          <Grid
            container
            spacing={'16px'}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {pianoFrom?.map((item, index) => (
              <Grid item md={2} key={index}>
                <Box className={item.ClassNames}>
                  <Typography variant="h5" className="piano-titlebg">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" className="piano-textbg">
                    From ₹<span className="piano-amount">{item.amount}</span>
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
      <Box mt={3}>
        <TopSeller title="Popular Piano’s Online" />
      </Box>
      <Box>
        <section>
          <HomePremiumMusic data={brand} />
        </section>
        <ProductListCollection title="Accessories" />
      </Box>

      <section>
        <HomeBrandCenter title="Top Brands Mela" />
      </section>

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
              {faq?.map((item, index) => (
                <Accordion
                  sx={{ mb: 2 }}
                  expanded={expanded === index}
                  onChange={handleAccordionChange(index)}
                  key={item.id}
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
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="brands-faq-head-sub">
                      {item.sub}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </section>
    </ProductLayout>
  );
}
