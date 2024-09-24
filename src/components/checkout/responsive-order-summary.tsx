import { RootState } from '@/redux/store';
import { Button, Grid } from '@mui/material';
import Image from 'next/image';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ResponsiveOrderSummary = ({
  setMobileCart,
  setOpen,
  discountData,
  applyCoupon,
  setApplyCoupon,
  buttonClear,
  setButtonClear,
  setCouponData,
  defaultShippingAddress,
  applyCouponApi,
  charges,
  user,
}: any) => {
  const cart = useSelector((state: RootState) => state.cart);
  const cartTotal = useSelector((state: RootState) => state.cart.cart_total);

  const handleReceiveOrder = () => {
    setMobileCart(true);
    setOpen(false);
    // Scroll to the top of the parent component
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Grid item xs={12}>
            <h5 className="order-summarys">Order Summary</h5>
          </Grid>
          <div className="d-flex justify-content-between w-100 ">
            <h6 className="shipping-title">Apply Coupon</h6>
          </div>
          <Form.Group className="check-out-input w-100 d-flex gap-1 mb-3">
            <Form.Control
              type="text"
              id="coupon_code"
              placeholder="Enter Discount Coupon"
              aria-describedby="coupon_code"
              value={applyCoupon ? applyCoupon : ''}
              onChange={(e: any) => {
                const value = e.target.value;
                setApplyCoupon(value);
                if (buttonClear) {
                  // setCouponData(null);
                  setButtonClear(false);
                }
              }}
            />
            {buttonClear ? (
              <Button
                className="bg-black-button"
                onClick={async () => {
                  setApplyCoupon(null);
                  setCouponData(null);
                  setButtonClear(false);
                  charges({
                    from_type: 'shipping',
                    address: defaultShippingAddress?.id,
                  });
                  // applyCouponApi({
                  //   coupon_code: applyCoupon,
                  //   customer_id: user?.id,
                  // });
                  // setDefaultShippingAddress({
                  //   ...defaultShippingAddress,
                  //   new: Math.random(),
                  // });
                }}
              >
                Clear
              </Button>
            ) : (
              <Button
                className="bg-black-button"
                onClick={async () => {
                  await applyCouponApi({
                    coupon_code: applyCoupon,
                    customer_id: user?.id,
                  });

                  // setDefaultShippingAddress({
                  //   ...defaultShippingAddress,
                  //   new: Math.random(),
                  // });
                }}
              >
                Apply
              </Button>
            )}
          </Form.Group>
          <Grid container className="order-information-border">
            <Grid item xs={6}>
              <h5 className="summary-title1">{cart?.cart_count} Items</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 className="summary-price1">₹{cartTotal.total}</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 className="summary-title1">Sub Total</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 className="summary-price1">
                ₹{cartTotal.product_tax_exclusive_total}
              </h5>
            </Grid>
            <Grid item xs={6}>
              <h5 className="summary-title1">Taxes</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 className="summary-price1">₹{cartTotal.tax_total}</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 className="summary-title1">Shipping Charges</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 className="summary-price1">₹{cartTotal.shipping_charge}</h5>
            </Grid>
            {discountData && (
              <>
                <Grid item xs={6}>
                  <h5 className="summary-title">Discount</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-price">
                    ₹{' '}
                    {!isNaN(Number(discountData?.coupon_amount))
                      ? Number(discountData?.coupon_amount)
                      : 0}
                  </h5>
                </Grid>
              </>
            )}
          </Grid>

          <Grid container spacing={2} pt={1}>
            <Grid item xs={6}>
              <h5 className="summary-title">Total Paid</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 className="summary-price1">₹{cartTotal.total}</h5>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} my={2}>
            <button className="order-conform-percentage">
              <Image
                src="/images/demo/static/percentage.png"
                width={20}
                height={20}
                alt="percentage"
                style={{ marginRight: '5px' }}
              />
              Saved <span>₹1,200</span> on this order
            </button>
            <Grid
              item
              md={6}
              mt={2}
              sx={{ display: 'flex', justifyContent: 'end' }}
            >
              <Button
                className="checkout-new-button"
                // onClick={() => setMobileCart(true)}
                onClick={() => handleReceiveOrder()}
              >
                Next
              </Button>
            </Grid>
          </Grid> */}

          <Grid item xs={12} my={2}>
            {discountData && (
              <button className="order-conform-percentage">
                <Image
                  src="/images/demo/static/percentage.png"
                  width={20}
                  height={20}
                  alt="percentage"
                  style={{ marginRight: '5px' }}
                />
                Saved{' '}
                <span>
                  ₹{' '}
                  {!isNaN(Number(discountData?.coupon_amount))
                    ? Number(discountData?.coupon_amount)
                    : 0}
                </span>{' '}
                on this order
              </button>
            )}
            <Grid
              item
              md={6}
              mt={2}
              sx={{ display: 'flex', justifyContent: 'end' }}
            >
              <Button
                className="checkout-new-button"
                // onClick={() => setMobileCart(true)}
                onClick={() => handleReceiveOrder()}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ResponsiveOrderSummary;
