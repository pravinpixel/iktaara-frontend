import React from 'react';
import { Box, Button, Grid } from '@mui/material';
// import CartItem from '@/components/cart/cart-items';
// import ResponsiveCartItem from '@/components/cart/responsive-cart-item';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const CartItem = dynamic(() => import('@/components/cart/cart-items'));
const ResponsiveCartItem = dynamic(
  () => import('@/components/cart/responsive-cart-item'),
);

const CheckoutNewCart = ({
  // setOpen,
  expandPaymentAccordion,
  setMobilePay,
}: {
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  expandPaymentAccordion: () => void;
  setMobilePay: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleCart: () => void = () => {
    // setOpen(true);
    expandPaymentAccordion(); // Expand the payment accordion
    setMobilePay(true);
  };
  const cartTotal = useSelector((state: RootState) => state.cart.cart_total);

  return (
    <>
      <section className="cart">
        <Box>
          <Grid container sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Grid item md={12}>
              <CartItem type="cart-checkout" />
            </Grid>
          </Grid>
          <Grid container sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <Grid item md={12}>
              <ResponsiveCartItem type="cart-checkout" />
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item xs={4} sx={{ display: { xs: 'block', sm: 'none' } }}>
              <p className="total-pay-item">Total to Pay</p>
              <div className="d-flex gap-2 align-items-center">
                <p className="total-pay-amout">
                  <span>₹</span>
                  {cartTotal.total}
                </p>
                <Image
                  src="/images/menu/list_arrow.png"
                  alt="arrow"
                  width={8}
                  height={11}
                />
              </div>
            </Grid>
            <Grid
              xs={8}
              md={7}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'end', sm: 'start' },
                mb: { xs: '20px', md: '0px' },
              }}
            >
              {/* <Box className="checkout-new-button-box"> */}
              <Button className="checkout-new-button" onClick={handleCart}>
                Next
              </Button>
              {/* </Box> */}
            </Grid>
          </Grid>
        </Box>
      </section>
    </>
  );
};

export default CheckoutNewCart;
