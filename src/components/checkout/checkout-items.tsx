import { useSelector } from 'react-redux';
import CheckOutProducts from './checkout-product';
import { RootState } from 'src/redux/store';
import { Fragment } from 'react';
const CheckOutItems = () => {
  const { carts } = useSelector((state: RootState) => state.cart);
  const cartItems: any = carts;
  return (
    cartItems && (
      <>
        <div className="d-flex justify-content-between w-100 mb-2">
          <p className="order-title">Order Summary</p>
        </div>
        {cartItems.map((item: any, index: number) => {
          return (
            <Fragment key={index}>
              <CheckOutProducts item={item} key={item.id} />
              {<hr className="my-2" />}
            </Fragment>
          );
        })}
      </>
    )
  );
};

export default CheckOutItems;
