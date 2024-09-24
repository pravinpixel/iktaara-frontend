import { RootState } from '@/redux/store';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ResponsiveCartProduct from './responsive-cart-product';

const ResponsiveCartItem = ({ type }: any) => {
  const { carts } = useSelector((state: RootState) => state.cart);
  const cartItems: any = carts;
  return (
    cartItems && (
      <>
        <div className={`col-lg-${type === 'cart-checkout' ? '12' : '8'}`}>
          <h6 className="reviewcart-title">Review Cart</h6>

          {cartItems.map((item: any) => {
            return (
              <Fragment key={item.id}>
                <ResponsiveCartProduct item={item} />
              </Fragment>
            );
          })}
        </div>
      </>
    )
  );
};

export default ResponsiveCartItem;
