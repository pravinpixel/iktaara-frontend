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

const TopSeller = (props: any) => {
  const { title, type } = props;
  const dataLength = props?.data?.length || 0;
  const settings = {
    slidesToShow: dataLength > 6 ? 6 : dataLength,
    slidesToScroll: dataLength > 6 ? 6 : dataLength,
    dots: false,
    className: 'container-fluid  fast-selling-thumb margin-auto',
    responsive: [
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: dataLength > 5 ? 5 : dataLength,
          slidesToScroll: dataLength > 5 ? 5 : dataLength,
          initialSlide: dataLength > 5 ? 5 : dataLength,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: dataLength > 4 ? 4 : dataLength,
          slidesToScroll: dataLength > 4 ? 4 : dataLength,
          initialSlide: dataLength > 4 ? 4 : dataLength,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: dataLength > 3 ? 3 : dataLength,
          slidesToScroll: dataLength > 3 ? 3 : dataLength,
          initialSlide: dataLength > 3 ? 3 : dataLength,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: dataLength > 2 ? 2 : dataLength,
          slidesToScroll: dataLength > 2 ? 2 : dataLength,
          initialSlide: dataLength > 2 ? 2 : dataLength,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: dataLength > 2 ? 2 : dataLength,
          slidesToScroll: dataLength > 2 ? 2 : dataLength,
          initialSlide: dataLength > 2 ? 2 : dataLength,
        },
      },
      {
        breakpoint: 389,
        settings: {
          slidesToShow: dataLength > 1 ? 1 : dataLength,
          slidesToScroll: dataLength > 1 ? 1 : dataLength,
          initialSlide: dataLength > 1 ? 1 : dataLength,
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
            type === 'cart-topseller' ? '' : 'top_seller top-seller-brands'
          }
          style={{
            backgroundImage:
              type === 'cart-topseller'
                ? ''
                : 'url(/images/home/top_seller.webp)',
            backgroundPosition: type === 'cart-topseller' ? '' : 'center',
            backgroundRepeat: type === 'cart-topseller' ? '' : 'no-repeat',
            backgroundSize: type === 'cart-topseller' ? '' : 'cover',
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
                        <FastSellingThumb
                          product={product}
                          key={product.id}
                          type={type}
                        />
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

export default TopSeller;
