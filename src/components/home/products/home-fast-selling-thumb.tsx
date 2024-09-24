import ImageComponent from '@/utils/imageComponent';
import Link from 'next/link';
// import { Image } from 'react-bootstrap';
import CartButton from 'src/components/common/cart-button';

const FastSellingThumb = ({ product, type }: any) => {
  return (
    <div className="home-fast-relative home-fast-wid ">
      {product?.sale_prices?.overall_discount_percentage !== 0 && (
        <div className="home-fast-absolute">
          <button className="home-fast-button">
            {product?.sale_prices?.overall_discount_percentage}% OFF
          </button>
        </div>
      )}

      <Link
        className={
          type === 'cart-topseller'
            ? 'main-product my-4 main-product-new new-product-design main-products-max cart-seller-new'
            : `main-product my-4 main-product-new new-product-design main-products-max`
        }
        key={product.id}
        href={`/buy/product/` + product?.product_url}
        style={{ borderRadius: '6px' }}
      >
        <div className="product-image-new1 mt-3">
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
        <div className="d-flex flex-column  h-100">
          <p className="product-name-brand">{product?.brand_name}</p>
          <p className="product-name">{product?.product_name}</p>
          <p className="product-name1"> ₹ {product?.sale_prices?.price}</p>
          <div className="product-footer-new">
            {product?.sale_prices?.strike_rate !== '0.00' && (
              <p className="actual-price actual-price-2">
                <span> ₹ {product?.sale_prices?.strike_rate}</span>
              </p>
            )}
            <div>
              <div>
                <CartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FastSellingThumb;
