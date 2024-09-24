import { Box } from '@mui/material';
import { Image } from 'react-bootstrap';
// import CartButton from 'src/components/common/cart-button';

const HomeBrandsThumb = ({ product }: any) => {
  // const product1 = {
  //   sale_prices: {
  //     overall_discount_percentage: 2,
  //     strike_rate: 4.00,
  //   },
  // };

  // const handleImageClick = (product: any) => {
  //   if (product.id) {
  //     router.push({
  //       pathname: '/brands',
  //       query: { id: product.id },
  //     });
  //   }
  // };
  return (
    <>
      <Box
        className={`main-product-new-brand mb-4  main-product-new new-product-design brands-home-new mt-1`}
        // key={product.id}
        // sx={{ cursor: 'none' }}
      >
        <div
          className="product-image-new1 mt-3"
          // onClick={() => handleImageClick(product)}
        >
          <Image src={product?.image} alt="image" loading="lazy" />
        </div>
        <div className="d-flex flex-column">
          <p className="product-name-brand">{product?.category_name}</p>
        </div>
      </Box>
    </>
  );
};

export default HomeBrandsThumb;
