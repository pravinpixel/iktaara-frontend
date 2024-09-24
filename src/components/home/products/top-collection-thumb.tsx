/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

// type ProductThumbProps = {
//   product: ProductThumbType;
// };

const HomeTopCollectionProductThumb = ({ product }: any) => {
  // const product1 = {
  //   sale_prices: {
  //     overall_discount_percentage: 10,
  //     strike_rate: 329589.0,
  //   },
  // };
  return (
    <div className="top-collection explore text-center mx-3">
      {/* <div className="col-md-6 col-sm-6 col-lg-3 text-center explore text-light top-collection"> */}
      {/* <Col
        xs={12}
        md={12}
        className="text-center explore text-light top-collection"
      > */}
      <Link href={`/product/` + product.product_url} className="product-thumb ">
        <div className="product-image">
          <img
            src={product?.image}
            className="img-thumbnail"
            alt={product.product_name}
          />
        </div>
        <div className="title pt-1 overflow-text">
          <p className="text-light ">{product.product_name.substr(0, 30)}</p>
        </div>

        <div className="tools">
          {product?.sale_prices?.strike_rate !== '0.00' && (
            <p className="actual-price actual-price-2 actual-price-fonts">
              <span> Rs. {product?.sale_prices?.strike_rate}</span>
              {product?.sale_prices?.overall_discount_percentage !== 0 && (
                <span
                  className="overall_discount_percentage--"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                  }}
                >
                  &nbsp;
                  {product?.sale_prices?.overall_discount_percentage}% offs
                </span>
              )}
            </p>
          )}
          <span className="price">Rs. {product?.sale_prices?.price}</span>
        </div>

        <div className="explore">
          <Link href={`/product/` + product.product_url}>Explore</Link>
        </div>
      </Link>
      {/* </Col> */}
      {/* </div> */}
    </div>
  );
};

export default HomeTopCollectionProductThumb;
