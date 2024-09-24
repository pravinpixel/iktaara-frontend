/* eslint-disable @next/next/no-img-element */
import { RootState } from '@/redux/store';
import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import userapi from 'src/lib/api/user';

const CheckoutNewDelivery = ({
  expandPaymentAccordion,
  setUserData,
  setOpen,
}: {
  setDeliveryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  expandPaymentAccordion: () => void;
  setUserData: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const handleCart: () => void = () => {
  //   setDeliveryOpen(true);
  //   expandPaymentAccordion(); // Expand the payment accordion
  // };
  // const [open, setOpen] = useState<boolean>(false);
  // const [userData, setUserData] = useState<any>(null);

  const handleCart = async () => {
    expandPaymentAccordion(); // Expand the payment accordion
    try {
      const res = await userapi.getMe();
      setUserData(res);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const cartTotal = useSelector((state: RootState) => state.cart.cart_total);
  const handleClickOpen = () => {
    setOpen(true);
    // expandPaymentAccordion(); // Expand the payment accordion
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <>
      <section className="cart">
        <Box>
          <Grid container mt={{ xs: 0, sm: 2 }} mb={{ xs: 3, sm: 0 }}>
            <Grid item md={7} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Button className="checkout-new-button" onClick={handleCart}>
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            mt={{ xs: 0, sm: 2 }}
            mb={{ xs: 3, sm: 0 }}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <Grid item xs={4}>
              <p className="total-pay-item">Total to Pay</p>
              <div className="d-flex gap-2 align-items-center">
                <p className="total-pay-amout">
                  <span>₹</span>
                  {cartTotal.total}
                </p>
                <img
                  src="/images/menu/list_arrow.png"
                  style={{ width: '8px', height: '11px' }}
                  alt="list-arrow"
                />
              </div>
            </Grid>
            <Grid
              item
              xs={8}
              md={7}
              sx={{ display: 'flex', justifyContent: 'end' }}
            >
              <Button className="checkout-new-button" onClick={handleClickOpen}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* {open === true ? (
          <Dialog
            fullWidth={true}
            maxWidth={'md'}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            className="order-summary"
          >
            <ResponsiveOrderSummary />
          </Dialog>
        ) : null} */}
      </section>
    </>
  );
};

export default CheckoutNewDelivery;
