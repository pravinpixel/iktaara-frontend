import Image from 'next/image';
import Link from 'next/link';

// type ProductThumbProps = { product: ProductThumbType; css: string };

const LatestArrivalProductThumb = ({ product }: any) => {
  const productName = product.product_name.substr(0, 30) || '';
  // const product1 = {
  //   sale_prices: {
  //     overall_discount_percentage: 2,
  //     strike_rate: 4.00,
  //   },
  // };
  // const product1 = {
  //   sale_prices: {
  //     overall_discount_percentage: 20,
  //     strike_rate: 329589.0,
  //   },
  // };
  return (
    <>
      <div
        className="text-center col-lg-2 col-md-4 col-sm-4 col-6 mt-4 mt-md-0"
        // className="text-center col-12"
        key={product.id}
      >
        <div className="product-thumb bg-black">
          <div className="product-image">
            <Link href={`/product/` + product.product_url}>
              <Image
                src={product?.image}
                className="img-thumbnail"
                alt={productName}
                width="200"
                height="200"
              />
            </Link>
          </div>
          <Link href={`/product/` + product.product_url}>
            <div className="py-3 px-2">
              <div className="title">
                <p className="text-light">{productName}</p>
              </div>
              <div className="tools">
                {product?.sale_prices?.strike_rate !== '0.00' && (
                  <p className="actual-price actual-price-2 actual-price-fonts1">
                    <span> Rs. {product?.sale_prices?.strike_rate}</span>
                    {product?.sale_prices?.overall_discount_percentage !==
                      0 && (
                      <span
                        className="overall_discount_percentage--"
                        style={{
                          color: '#fff',

                          textDecoration: 'none',
                        }}
                      >
                        &nbsp;
                        {product?.sale_prices?.overall_discount_percentage}%
                        offs
                      </span>
                    )}
                  </p>
                )}
                <span className="price text-white">
                  Rs. {product.sale_prices.price}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LatestArrivalProductThumb;

{
  /* <div className="product-footer">
  {product?.sale_prices?.strike_rate !== '0.00' && (
    <p className="actual-price actual-price-1 justify-content-center">
      <span> Rs. {product?.sale_prices?.strike_rate}</span>
      {product?.sale_prices?.overall_discount_percentage !== 0 && (
        <span className="overall_discount_percentage">
          &nbsp;
          {product?.sale_prices?.overall_discount_percentage} % off
        </span>
      )}
    </p>
  )}
  <div className="tools">
    <span className="price text-white">Rs. {product.sale_prices.price}</span>
  </div>
</div>; */
}
