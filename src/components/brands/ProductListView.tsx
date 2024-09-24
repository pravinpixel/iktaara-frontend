import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useReducer } from 'react';
import { Col, Row } from 'react-bootstrap';
import Carousel from 'react-material-ui-carousel';
import CartButton from '../product-detail/cart-button';

const CustomDotIndicator = () => {
  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        zIndex: 999,
        width: '40px',
        height: '4px',
        borderRadius: '2px',
        margin: '0 5px',
        background: '#000',
      }}
    ></div>
  );
};
function StockStatus({ product }: any) {
  if (product == 'out_of_stock') {
    return (
      <>
        <div className="stock-comments  py-2">
          <Image
            src="/images/collections/static/Group 6975.png"
            alt="comingsoon"
            width="36"
            height="36"
            className="stock-status"
          />
          Comming Soon
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="stock-comments">
          <Image
            src="/images/collections/static/Group 6975.png"
            alt="in_stock"
            width="36"
            height="36"
            className="stock-status"
          />
          In Stock &amp; Ready to ship
        </div>
      </>
    );
  }
}
// const products = [
//   {
//     id: 1,
//     category: 'Electronic Drumkits',
//     category_slug: 'electronic-drumkits-drums-and-percussions',
//     has_video_shopping: 'yes',
//     hsn_code: '92079000',
//     image:
//       'https://staging-admin.iktaraa.com/storage/products/4112/default/1DKTEF1491-1.jpg',
//     is_best_selling: 0,
//     is_featured: 0,
//     description:
//       "The PSR-touch-sensitive E473's keyboard and robust sound engine combine to create a brand-new portable instrument with excellent sound and feel.",
//     is_new: 0,
//     mrp_price: '183161.02',
//     product_name:
//       'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
//     product_url:
//       'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

//     sale_prices: {
//       overall_discount_percentage: 0,
//       price: '216,130.00',
//       price_original: '216130.00',
//       strike_rate: '0.00',
//       strike_rate_original: 0,
//     },
//   },
//   {
//     id: 2,
//     category: 'Electronic Drumkits',
//     category_slug: 'electronic-drumkits-drums-and-percussions',
//     has_video_shopping: 'yes',
//     hsn_code: '92079000',
//     image:
//       'https://staging-admin.iktaraa.com/storage/products/3835/default/1DKTLD1632-1.jpg',
//     is_best_selling: 0,
//     is_featured: 0,
//     description:
//       "The PSR-touch-sensitive E473's keyboard and robust sound engine combine to create a brand-new portable instrument with excellent sound and feel.",
//     is_new: 0,
//     mrp_price: '183161.02',
//     product_name:
//       'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
//     product_url:
//       'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

//     sale_prices: {
//       overall_discount_percentage: 0,
//       price: '50,190.00',
//       price_original: '50,190.00',
//       strike_rate: '0.00',
//       strike_rate_original: 0,
//     },
//   },
//   {
//     id: 3,
//     category: 'Electronic Drumkits',
//     category_slug: 'electronic-drumkits-drums-and-percussions',
//     has_video_shopping: 'yes',
//     hsn_code: '92079000',
//     image:
//       'https://staging-admin.iktaraa.com/storage/products/4112/default/1DKTEF1491-1.jpg',
//     is_best_selling: 0,
//     is_featured: 0,
//     description:
//       "The PSR-touch-sensitive E473's keyboard and robust sound engine combine to create a brand-new portable instrument with excellent sound and feel.",
//     is_new: 0,
//     mrp_price: '183161.02',
//     product_name:
//       'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
//     product_url:
//       'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

//     sale_prices: {
//       overall_discount_percentage: 0,
//       price: '216,130.00',
//       price_original: '216130.00',
//       strike_rate: '0.00',
//       strike_rate_original: 0,
//     },
//   },
//   {
//     id: 4,
//     category: 'Electronic Drumkits',
//     category_slug: 'electronic-drumkits-drums-and-percussions',
//     has_video_shopping: 'yes',
//     hsn_code: '92079000',
//     image:
//       'https://staging-admin.iktaraa.com/storage/products/3835/default/1DKTLD1632-1.jpg',
//     is_best_selling: 0,
//     is_featured: 0,
//     description:
//       "The PSR-touch-sensitive E473's keyboard and robust sound engine combine to create a brand-new portable instrument with excellent sound and feel.",
//     is_new: 0,
//     mrp_price: '183161.02',
//     product_name:
//       'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
//     product_url:
//       'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

//     sale_prices: {
//       overall_discount_percentage: 0,
//       price: '50,190.00',
//       price_original: '50,190.00',
//       strike_rate: '0.00',
//       strike_rate_original: 0,
//     },
//   },
//   {
//     id: 5,
//     category: 'Electronic Drumkits',
//     category_slug: 'electronic-drumkits-drums-and-percussions',
//     has_video_shopping: 'yes',
//     hsn_code: '92079000',
//     image:
//       'https://staging-admin.iktaraa.com/storage/products/4112/default/1DKTEF1491-1.jpg',
//     is_best_selling: 0,
//     is_featured: 0,
//     description:
//       "The PSR-touch-sensitive E473's keyboard and robust sound engine combine to create a brand-new portable instrument with excellent sound and feel.",
//     is_new: 0,
//     mrp_price: '183161.02',
//     product_name:
//       'EFNOTE 3 EFD3-STDSET-WS Standard Electronic Drum Set (White Sparkle)',
//     product_url:
//       'efnote-3-efd3-stdset-ws-standard-electronic-drum-set-white-sparkle',

//     sale_prices: {
//       overall_discount_percentage: 0,
//       price: '216,130.00',
//       price_original: '216130.00',
//       strike_rate: '0.00',
//       strike_rate_original: 0,
//     },
//   },
// ];

// const productViewStyle = {};
enum UpdateKind {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}
interface Qtystate {
  qty: number;
}
interface QtcAction {
  type: UpdateKind;
  payload: number;
}
function updateQuantityReducer(state: Qtystate, action: QtcAction) {
  const { type, payload } = action;
  switch (type) {
    case UpdateKind.INCREASE:
      return {
        ...state,
        qty: state.qty + payload,
      };
    case UpdateKind.DECREASE:
      if (state.qty > 1) {
        return {
          ...state,
          qty: state.qty - payload,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
export default function ProductListView(data: any) {
  const isMobile = useMediaQuery('(max-width:899px)');
  const [state] = useReducer(updateQuantityReducer, { qty: 1 });

  return (
    <div className="product-list-View-carousal">
      {data?.data?.featured_products?.length > 0 && (
        <>
          {' '}
          <Typography className="product-list-view-title">
            Brand Featured
          </Typography>
          <Carousel
            IndicatorIcon={<CustomDotIndicator />}
            navButtonsAlwaysVisible={false}
            navButtonsProps={
              isMobile
                ? undefined
                : {
                    style: {
                      backgroundColor: '#FFFFFF',
                      opacity: 0.8,
                      color: '#818694',
                      border: '1px solid #f2f4f9',
                      boxShadow: ' 0px 1px 2px 0px #00000040',
                    },
                  }
            }
            indicatorIconButtonProps={{
              style: {
                backgroundColor: 'rgba(103, 103, 103, 0.40)',
                display: 'inline-block',
                position: 'relative',
                zIndex: 999,
                width: '6%',
                height: '4px',
                borderRadius: '2px',
                margin: '0px 5px',
                marginTop: '20px',
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                backgroundColor: '#3B4357',
                display: 'inline-block',
                position: 'relative',
                zIndex: 999,
                width: '6%',
                height: '4px',
                borderRadius: '2px',
                margin: '0px 5px',
                marginTop: '20px',
              },
            }}
          >
            {data?.data?.featured_products?.map((item: any, index: any) => (
              <div className="carousal-alignment" key={index}>
                <Grid container key={index} spacing={2}>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '400px',
                        objectFit: 'content',
                      }}
                    >
                      <Image src={item.image} alt={item.product_name} fill />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <h1 className=" product-title">{item.product_name}</h1>
                    <div className="product-title-price">
                      <span>₹</span>
                      <span>{item.mrp_price}</span>
                    </div>
                    <p className="product-list-description-title">
                      {item.description}
                    </p>
                    <Row className="align-items-center product-detailsHead">
                      <Col md={12}>
                        <StockStatus product={item?.stock_status} />
                      </Col>
                    </Row>

                    <div className="product_view-icon">
                      <Image
                        src="/images/collections/static/View.png"
                        alt="view"
                        width="29"
                        height="29"
                        className="view-icon-status"
                      />
                      {item?.views_count} views this month
                    </div>
                    <CartButton product={item} quantity={state.qty} />
                    <Link href={`/buy/product/${item.product_url}`}>
                      <div className="view-detail-button">View Detail</div>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
}
