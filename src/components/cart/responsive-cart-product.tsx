import Image from 'next/image';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';

const ResponsiveCartProduct = ({ item }: any) => {
  return (
    item && (
      <>
        <Row className="cart-top-bg">
          <Col
            xs={12}
            md={8}
            className="d-flex flex-md-row flex-row  justify-content-md-start align-items-md-start align-items-center gap-2 img"
          >
            <div className="d-flex">
              <Link
                href={`/product/${item.product_url}`}
                style={{
                  height: '74px',
                  width: '65px',
                }}
              >
                <Image
                  src={item.image}
                  alt="cart-img"
                  height={74}
                  width={65}
                  className="steper-img"
                  style={{
                    // border: '1px solid #D4D9DF',
                    objectFit: 'contain',
                  }}
                />
              </Link>
            </div>
            <div className="d-flex flex-column justify-content-between h-100 px-md-1">
              <Link
                href={`/product/${item.product_url}`}
                className="productname-item text-md-start"
              >
                {item.product_name}
              </Link>
              {/* {item.quantity > item.max_quantity ? (
                <span>Stock Available : {item.max_quantity}</span>
              ) : item.max_quantity === 0 ? (
                <span>{item.max_quantity} Quantity Available </span>
              ) : (
                item.stock_status === 'out_of_stock' && (
                  <span>Out of stock</span>
                )
              )} */}
              <span className="amount-cartbg mt-1">
                <span>₹</span>
                {Number(
                  item?.quantity * item?.sale_prices?.price_original,
                ).toLocaleString()}
              </span>
              <div className="d-flex gap-2 mt-1">
                <p className="qty-text-item">
                  QTY <span>{item?.quantity}</span>
                </p>
                {/* <p className="qty-text-item">
                  COLOUR <span>BLACK</span>
                </p> */}
              </div>
              {/* <span
                className="gap-1 d-flex  delete-img mt-3"
                onClick={() => {
                  handleDelete(event, item);
                }}
              >
                <img src="/images/banner/deete-icons.png" alt="" />
                <span className="delete-button">Delete</span>
              </span> */}
            </div>
          </Col>
          {/* <Col
            xs={2}
            md={2}
            className="d-flex gap-2 justify-content-center mb-1 quanity-1"
          ></Col> */}
          <Col
            xs={3}
            md={2}
            className="d-flex flex-column gap-2  justify-content-end mb-1 quanity-1"
          >
            <span className="amount-total-item text-align-end">
              <span></span>
              {/* {Number(
                item?.quantity * item?.sale_prices?.price_original,
              ).toLocaleString()} */}
            </span>
            {/* <span className="d-flex justify-content-end align-items-end h-100">
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
            </span> */}
          </Col>
        </Row>
      </>
    )
  );
};

export default ResponsiveCartProduct;
