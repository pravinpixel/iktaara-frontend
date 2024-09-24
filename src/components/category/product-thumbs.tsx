import ImageComponent from '@/utils/imageComponent';
import Link from 'next/link';
import { Col } from 'react-bootstrap';
import CartButton from 'src/components/common/cart-button';

const CategoryProductThumb = ({ product }: any) => {
  return (
    <>
      <Col
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={3}
        className="mb-3 product-list-images"
        id={product?.product_url}
      >
        <Link
          className="main-product main-product-thumb mx-auto position-relative product-list-price"
          key={product.id}
          href={{
            pathname: `/buy/product/` + product?.product_url,
          }}
          // href={`/product/` + product?.product_url}
        >
          {product?.sale_prices?.overall_discount_percentage !== 0 && (
            <div className="end-saless">
              <button className="end-season-btn">End of Season Sale</button>
            </div>
          )}

          <div className="product-image-new ">
            {/* <Image
              src={product?.image}
              alt={product?.product_name}
              loading="lazy"
            /> */}
            <ImageComponent
              src={product?.image}
              alt={product?.product_name}
              width={100}
              height={100}
            />
          </div>
          <div className="product-box-item">
            <p className="product-names1">{product?.product_name}</p>
            {/* <h5 className="product-names-desc">{product?.description}</h5> */}

            {product?.sale_prices?.overall_discount_percentage !== 0 && (
              <p className="product-offers">
                {product?.sale_prices?.overall_discount_percentage}% Off Save ₹
                {(
                  parseFloat(
                    product?.sale_prices?.strike_rate.replace(/,/g, ''),
                  ) - parseFloat(product?.sale_prices?.price.replace(/,/g, ''))
                ).toFixed(2)}
              </p>
            )}

            {product?.stock_status == 'coming_soon' ? (
              <div className="product-footer-section">
                <div>
                  {product?.sale_prices?.strike_rate === '0.00' ? (
                    <>
                      <p className="product-prices-rate">
                        ₹ {product?.sale_prices?.price}
                      </p>
                    </>
                  ) : (
                    <p className="product-prices">
                      ₹ {product?.sale_prices?.price}
                      <br />
                      <del className="product-prices-strick">
                        ₹{product?.sale_prices?.strike_rate}
                      </del>
                    </p>
                  )}
                </div>

                {/* <div className="add-list-cart ">
                    <CartButton product={product} cartNew={true} cartAdd={true} />
                  </div> */}
              </div>
            ) : (
              <div
                className="product-footer"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {product?.sale_prices?.strike_rate === '0.00' ? (
                    <>
                      <p className="product-prices">
                        ₹ {product?.sale_prices?.price}
                      </p>
                    </>
                  ) : (
                    <p className="product-prices-amount">
                      ₹ {product?.sale_prices?.price}
                      <br />
                      <del className="product-prices-strick">
                        ₹{product?.sale_prices?.strike_rate}
                      </del>
                    </p>
                  )}
                </div>

                <div className="add-list-cart ">
                  <CartButton product={product} cartNew={true} cartAdd={true} />
                </div>
              </div>
            )}

            <div className="cont-sont">
              {product?.stock_status == 'coming_soon' && (
                <div className="add-sonn-item">
                  <h5 className="coming-soon-cart">Coming Soon</h5>
                </div>
              )}
            </div>
          </div>
        </Link>
      </Col>
    </>
  );
};

export default CategoryProductThumb;
