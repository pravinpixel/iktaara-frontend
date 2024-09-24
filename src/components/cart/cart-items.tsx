import { useSelector } from 'react-redux';
import CartProduct from './cart-product';
import { RootState } from 'src/redux/store';
import { Col, Row } from 'react-bootstrap';
import { Fragment } from 'react';

const CartItem = ({ type }: any) => {
  const { carts } = useSelector((state: RootState) => state.cart);
  const cartItems: any = carts;
  return (
    cartItems && (
      <>
        <div className={`col-lg-${type === 'cart-checkout' ? '12' : '8'}`}>
          <div className="cart-itemspage d-block">
            <Row>
              <Col xs={7} md={8} className="d-flex">
                <p className="cart-text">Product Name</p>
              </Col>

              <Col xs={2} md={2} className="d-flex justify-content-center">
                <p className="cart-text">Quantity</p>
              </Col>

              {!type && (
                <Col xs={3} md={2} className="d-flex justify-content-center">
                  <p className="cart-text">Total Price</p>
                </Col>
              )}
            </Row>
          </div>

          {cartItems.map((item: any) => {
            return (
              <Fragment key={item.id}>
                <CartProduct item={item} type={type} />
              </Fragment>
            );
          })}
        </div>
      </>
    )
  );
};

export default CartItem;
