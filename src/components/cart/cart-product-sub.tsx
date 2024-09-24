import Image from 'next/image';
import Link from 'next/link';

const CartProductSub = ({ item }: any) => {
  return (
    item && (
      <>
        <div>
          <div className="cart-checkout-sub-product mb-3 mt-2">
            <Link
              href={`/product/${item.product_url}`}
              style={{
                height: '139px',
                width: '139px',
              }}
            >
              <Image
                src={item.image}
                alt="cart-img"
                height={139}
                width={139}
                className="steper-img"
                style={{
                  border: '1px solid #D4D9DF',
                  objectFit: 'contain',
                }}
              />
            </Link>
          </div>
        </div>

        {/* <p className="d-flex flex-column justify-content-between h-100 px-md-1">
              <Link
                href={`/product/${item.product_url}`}
                className="productname text-md-start"
              >
                {item.product_name}
              </Link>
             
              <span className="amount-cartbg">
                <span>₹</span>
                {Number(
                  item?.quantity * item?.sale_prices?.price_original,
                ).toLocaleString()}
              </span>
              <span
                className="gap-1  delete-img"
                onClick={() => {
                  handleDelete(event, item);
                }}
              >
                <img src="/images/banner/deete-icons.png" alt="" />
                <span className="delete-button">Delete</span>
              </span>
            </p> */}

        {/* <Col
            xs={2}
            md={2}
            className="d-flex gap-2 justify-content-center mb-1 quanity-1"
          >
            <p className="quality-buttoncart">
              <i
                className="fa-solid fa-minus quanty-icons"
                onClick={() => {
                  handleDecreement(event, item);
                }}
              />
              <span className="quanty-iconquantity ">{item.quantity}</span>
              <i
                className="fa-regular fa-plus quanty-iconsbg"
                onClick={() => {
                  handleIncreement(event, item);
                }}
              />
            </p>
          </Col>
          <Col
            xs={3}
            md={2}
            className="d-flex gap-2  justify-content-center mb-1 quanity-1"
          >
            <span className="amount-total">
              <span>₹</span>
              {Number(
                item?.quantity * item?.sale_prices?.price_original,
              ).toLocaleString()}
            </span>
          </Col> */}
      </>
    )
  );
};

export default CartProductSub;
