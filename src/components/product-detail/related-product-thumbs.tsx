import Link from 'next/link';
import { Image } from 'react-bootstrap';

const RelatedProductThumb = ({ product }: any) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center slick-track-new main-product-related"
      // style={{ border: 'none' }}
      // key={product.id}
    >
      <div className="related ">
        <Link href={`/product/` + product?.product_url}>
          <div className="product-wrapper related-product text-center">
            <div className="product-thumb product-thumb-new">
              <div className="product-image relatedproductImg">
                <Image
                  src={product?.image}
                  alt={product?.product_name}
                  loading="lazy"
                  width={150}
                  height={150}
                />
              </div>
              <div className="mt-2 title">
                <p>{product?.product_name} </p>
              </div>
              <div className="footer mt-1">
                <div className="text-center">
                  <div className="footerpricestyle">
                    Rs. {product?.sale_prices.price}
                  </div>
                </div>
                <div className="related-explore">
                  <span className="text-white">Explore</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
    // <Col xs={6} sm={6} md={6} lg={3} className="mb-3">
    //   <Link
    //     className="main-product-related main-product  mx-auto"
    //     key={product.id}
    //     href={`/product/` + product?.product_url}
    //   >
    //     <div className="product-image-new">
    //       <Image
    //         src={product?.image}
    //         alt={product?.product_name}
    //         loading="lazy"
    //       />
    //     </div>
    //     <div className="d-flex flex-column justify-content-between h-100">
    //       <p className="product-name">{product?.product_name}</p>
    //       <div className="product-footer">
    //         <div>
    //           <button className="price-btn">
    //             Rs. {product?.sale_prices?.price}
    //           </button>

    //           {/* <CartButto product={product} cartNew={true} /> */}
    //         </div>
    //       </div>
    //     </div>
    //   </Link>
    // </Col>
  );
};

export default RelatedProductThumb;
