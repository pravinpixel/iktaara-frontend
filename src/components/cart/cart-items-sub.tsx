import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { Fragment } from 'react';
import CartProductSub from './cart-product-sub';

const CartItemSub = () => {
  const { carts } = useSelector((state: RootState) => state.cart);
  const cartItems: any = carts;
  const cartTotal = useSelector((state: RootState) => state.cart.cart_total);

  return (
    cartItems && (
      <>
        <div
          // className={`col-lg-${
          //   type === 'cart-checkout' ? '2' : '2'
          // } cart-itemspage-section`}
          className="cart-itemspage-section d-flex flex-wrap"
        >
          {/* <div className="cart-itemspage d-block "> */}
          {/* <Row>
              <Col xs={7} md={8} className="d-flex">
                <p className="cart-text">Product Name</p>
              </Col>
              <Col xs={2} md={2} className="d-flex justify-content-center">
                <p className="cart-text">Quantity</p>
              </Col>
              <Col xs={3} md={2} className="d-flex justify-content-center">
                <p className="cart-text">Total Price</p>
              </Col>
            </Row> */}
          {/* </div> */}

          {cartItems.map((item: any) => {
            return (
              <Fragment key={item.id}>
                <CartProductSub item={item} />
              </Fragment>
            );
          })}
        </div>
        <div>
          <span className="cart-checkout-value">
            {carts?.length} Items in Cart Order Value ₹
            <span className="cart-checkout-total"> {cartTotal?.total}</span>
          </span>
        </div>
      </>
    )
  );
};

export default CartItemSub;
