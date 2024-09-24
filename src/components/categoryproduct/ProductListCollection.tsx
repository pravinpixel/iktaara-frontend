import Slider from 'react-slick';
import { Container } from '@mui/material';
import FastSellingThumb from '../home/products/home-fast-selling-thumb';

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
//     id: 6,
//     category: 'Electronic Drumkits',
//     category_slug: 'electronic-drumkits-drums-and-percussions',
//     has_video_shopping: 'yes',
//     hsn_code: '92079000',
//     image:
//       'https://staging-admin.iktaraa.com/storage/products/3835/default/1DKTLD1632-1.jpg',
//     is_best_selling: 0,
//     is_featured: 0,
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
//     id: 7,
//     category: 'Electronic Drumkits',
//     category_slug: 'electronic-drumkits-drums-and-percussions',
//     has_video_shopping: 'yes',
//     hsn_code: '92079000',
//     image:
//       'https://staging-admin.iktaraa.com/storage/products/4112/default/1DKTEF1491-1.jpg',
//     is_best_selling: 0,
//     is_featured: 0,
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
//     id: 8,
//     category: 'Electronic Drumkits',
//     category_slug: 'electronic-drumkits-drums-and-percussions',
//     has_video_shopping: 'yes',
//     hsn_code: '92079000',
//     image:
//       'https://staging-admin.iktaraa.com/storage/products/3835/default/1DKTLD1632-1.jpg',
//     is_best_selling: 0,
//     is_featured: 0,
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
// ];

const ProductListCollection = (props: any) => {
  const { title, type } = props;
  const dataLength = props?.data?.length || 0;

  const settings = {
    slidesToShow: dataLength >= 6 ? 6 : dataLength,
    slidesToScroll: dataLength >= 6 ? 6 : dataLength,
    dots: false,
    className: 'container-fluid  fast-selling-thumb margin-auto',
    responsive: [
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 5,
        },
      },
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
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 389,
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
      {props?.data?.length > 0 ? (
        <section
          id="fast-selling"
          className={
            type === 'cart-topseller'
              ? 'top_seller_brandsportion top-seller-brands cart-recently-view'
              : 'top_seller_brandsportion top-seller-brands'
          }
          style={{
            backgroundImage:
              type === 'cart-topseller'
                ? 'url(/images/home/top_seller.webp)'
                : '',
            backgroundPosition: type === 'cart-topseller' ? 'center' : '',
            backgroundRepeat: type === 'cart-topseller' ? 'no-repeat' : '',
            backgroundSize: type === 'cart-topseller' ? 'cover' : '',
          }}
        >
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
          >
            <div className="brands ">
              <div className="fast-selling  pt-2">
                <div className="row text-center">
                  <div className="col-12 ">
                    <p className="  top_seller_title">
                      {title ? title : 'Top Sellers'}
                    </p>
                  </div>
                </div>
                <div
                  className="d-flex gap-2 flex-wrap w-100 justify-content-center"
                  style={{
                    marginInline: 'auto',
                  }}
                >
                  <Slider {...settings}>
                    {props?.data?.map((product: any) => {
                      return (
                        <FastSellingThumb product={product} key={product.id} />
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default ProductListCollection;
