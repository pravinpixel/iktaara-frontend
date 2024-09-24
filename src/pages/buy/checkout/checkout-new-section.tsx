/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Dialog, Grid, Slide, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { TransitionProps } from '@mui/material/transitions';
import Image from 'next/image';
import CheckoutNewCart from './checkout-sections/checkout-new-cart';
import CheckNewPayment from './checkout-sections/checkout-new-payment';
// import CartItemSub from '@/components/cart/cart-items-sub';
import { update, updateBillingAddress } from '@/redux/checkout';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/cart';
import userApi from 'src/lib/api/user';
import { processes } from 'src/lib/ccavenue';
import { RootState } from 'src/redux/store';
import CheckoutNewDelivery from './checkout-sections/checkout-new-delivery';
// import BillingAdddress from '@/components/checkout/billing-address';
// import ShippingAddress from '@/components/checkout/shipping-address';
import { errorMessage } from '@/lib/helper';
import { addToCart } from '@/redux/cart-slice';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import cartApi from 'src/lib/api/cart';
// import DeliveryOPtions from '@/components/checkout/delivery-options';
// import AddressList from '@/components/checkout/address-list';
// import ResponsiveOrderSummary from '@/components/checkout/responsive-order-summary';
import dynamic from 'next/dynamic';

const BillingAdddress = dynamic(
  () => import('@/components/checkout/billing-address'),
);
const ShippingAddress = dynamic(
  () => import('@/components/checkout/shipping-address'),
);
const DeliveryOPtions = dynamic(
  () => import('@/components/checkout/delivery-options'),
);
const AddressList = dynamic(() => import('@/components/checkout/address-list'));
const ResponsiveOrderSummary = dynamic(
  () => import('@/components/checkout/responsive-order-summary'),
);
const CartItemSub = dynamic(() => import('@/components/cart/cart-items-sub'));

// type cartState = {
//   carts: any;
//   cart_count: number;
//   shipping_charges: any;
//   cart_total: any;
// };

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CheckoutNewSection = () => {
  // const { meta } = props;
  // const metaTags = {
  //   title: meta?.title,
  //   keywords: meta?.keywords,
  //   description: meta?.description,
  //   image: meta?.image,
  // };
  const dispatch = useDispatch();
  const [, setCurrentUser] = useState<number>(0);
  const [user, setUser] = useState<any>([]);
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(true);
  const [, setShippingError] = useState<any>([]);
  const [, setBillingError] = useState<any>([]);
  const [, setLoading] = useState<boolean>(false);
  const [, setApiLoading] = useState<boolean>(true);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState<any>([]);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState<any>([]);
  const [shippingAddress, setShippingAddress] = useState<any>([]);
  const [updateBillingInfo, setUpdateBillingInfo] = useState<boolean>(false);
  const [applyCoupon, setApplyCoupon] = useState(null);
  const [couponData, setCouponData]: any = useState(null);
  const [buttonClear, setButtonClear]: any = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const checkout = useSelector((state: RootState) => state.checkout);
  const cartTotal = useSelector((state: RootState) => state.cart.cart_total);
  const [open, setOpen] = useState<boolean>(false);
  const [mobileCart, setMobileCart] = useState<boolean>(false);
  const [mobilepay, setMobilePay] = useState<boolean>(false);
  const [mobileDelivery, setMobileDelivery] = useState<boolean>(true);

  const handleDeliveryCheckout = () => {
    setMobileCart(false);
    setMobileDelivery(true);
    setMobilePay(false);
  };
  const handleCartCheckout = () => {
    setMobileCart(true);
    setMobileDelivery(false);
    setMobilePay(false);
  };

  const handlePaymentCheckout = () => {
    setMobilePay(true);
    setMobileDelivery(false);
    setMobileCart(false);
  };
  type UserAddressData = {
    customer_address?: any; // Adjust the type as per your actual data structure
  };

  const [userAddrData, setUserAddrData] = useState<UserAddressData | null>(
    null,
  );

  // const [addressDataDefault, setAddressDataDefault] = useState<any>(null);
  const [addressDataUser, setAddressDataUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  // const handleClickOpen = () => {
  //   setOpen(true);
  //   // expandPaymentAccordion(); // Expand the payment accordion
  // };

  const handleClose = () => {
    setOpen(false);
  };
  const NEXT_PUBLIC_MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL;

  const handleCheckOut = async () => {
    setLoading(true);
    const data = {
      shipping_address: checkout.shipping_address,
      billing_address: checkout.billing_address,
      customer_id: user?.id,
      cart_items: cart.carts,
      shipping_charge: cartTotal.shipping_charge,
      cart_total: {
        ...cartTotal,
        coupone_code: couponData?.coupon_code,
        coupon_amount: couponData?.coupon_amount,
      },
    };

    const response: any = await api.checkout(data).then((res: any) => {
      if (res?.status_code == 200) {
        const orderParams = {
          order_id: res.data?.order_info?.order_no,
          currency: 'INR',
          amount: res.data.order_info.amount,
          redirect_url: encodeURIComponent(
            // `https://iktaraa.com/api/payment/ccavenue`,
            `${NEXT_PUBLIC_MAIN_URL}api/payment/ccavenue`,
          ),
          billing_name: res.data?.order_info.billing_name,
          billing_tel: res.data?.order_info.billing_mobile_no,
          billing_email: res.data?.order_info.billing_email,
          billing_address: res.data?.order_info.billing_address_line1,
          billing_area: res.data?.order_info.billing_address_line2,
          billing_city: res.data?.order_info.billing_city,
          billing_zip: res.data?.order_info.billing_post_code,
          billing_state: res.data?.order_info.billing_state,
          billing_country: 'India',
        };
        const url = processes(orderParams);
        return url;
      } else {
        setLoading(false);
      }
    });
    if (response != undefined) {
      window.location.replace(response);
    }
    return false;
  };

  // const paymentValidation = () => {
  //   if (
  //     Object.keys(shippingError).length == 0 &&
  //     Object.keys(billingError).length == 0
  //   ) {
  //     handleCheckOut();
  //   } else {
  //   }
  //   return false;
  // };

  const shippingValidationError = (error: any) => {
    setShippingError(error);
  };

  const billingValidationError = (error: any) => {
    setBillingError(error);
  };

  const setBillingSame = (status: boolean) => {
    setUpdateBillingInfo(status);
    setSameAsShipping(status);
    if (sameAsShipping) {
      dispatch(updateBillingAddress(shippingAddress));
    }
  };

  const updateShippingAddress = (data: any) => {
    setShippingAddress(data);
  };
  const shipCharge = async (data: any) => {
    await cartApi
      .getShippingChargesTotal(data)
      .then((res) => {
        dispatch(addToCart(res?.data?.data));
        setApiLoading(false);
      })

      .catch(() => {
        setApiLoading(false);
      })
      .finally(() => {
        setApiLoading(false);
      });
  };
  const charges = async (data: any, da = null) => {
    setApiLoading(true);
    await cartApi
      .getShippingCharges(data)
      .then(async (res: any) => {
        const param = {
          coupon_data: da,
          customer_id: user.id,
          shipping_id: res?.data?.data?.flat_charge,
          type: 'flat',
        };
        await shipCharge(param);
      })
      .catch(() => {
        setApiLoading(false);
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  const applyCouponApi = async (data: any) => {
    setApiLoading(true);
    await cartApi
      .applyCodeApi(data)
      .then(async (res: any) => {
        if (res?.status === 'error') {
          toast.error(res?.message);
          setCouponData(null);
          setApplyCoupon(null);
        } else {
          charges(
            {
              from_type: 'shipping',
              address: defaultShippingAddress?.id,
            },
            res?.coupon_info,
          );
          setCouponData(res);
          setButtonClear(true);
        }

        // charges(
        //   {
        //     from_type: 'shipping',
        //     address: defaultShippingAddress?.id,
        //   },
        //   res?.coupon_info,
        // );

        // const
      })
      .catch((error: any) => {
        setApiLoading(false);
        errorMessage(error);
        setCouponData(null);
        setApplyCoupon(null);
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  useEffect(() => {
    if (defaultShippingAddress?.length !== 0 && user) {
      charges({
        from_type: 'shipping',
        address: defaultShippingAddress?.id,
      });
      setCouponData(null);
      setApplyCoupon(null);
    }
  }, [defaultShippingAddress]);

  const handleFetch = () => {
    userApi.getMe().then((res: any) => {
      setUserAddrData(res?.customer_data);
      setCurrentUser(res?.id);
      const first_address =
        res?.customer_data?.customer_address.find(
          (address: any) => address.is_default,
        ) || {};

      setDefaultShippingAddress({
        id: first_address?.id || 0,
        first_name: first_address?.first_name || '',
        last_name: first_address?.last_name || '',
        address_type: first_address.address_type,
        // email: res?.customer_data?.email,
        // mobile_no: res?.customer_data?.mobile_no,api/update/customer/address
        email: first_address?.email,
        mobile_no: first_address?.mobile_no,
        address_line1: first_address?.address_line1 || '',
        address_line2: first_address?.address_line2 || '',
        stateid: first_address?.stateid || 1,
        city: first_address?.city || '',
        post_code: first_address?.post_code || '',
        is_default: first_address?.is_default || true,
        address_type_id: first_address?.address_type_id || 9,
        from_address_type: 'shipping',
        save_address: false,
        notificaton: false,
      });
      setDefaultBillingAddress({
        id: first_address?.id || 0,
        first_name: first_address?.first_name || '',
        last_name: first_address?.last_name || '',
        email: first_address?.email,
        mobile_no: first_address?.mobile_no,
        address_line1: first_address?.address_line1 || '',
        address_line2: first_address?.address_line2 || '',
        stateid: first_address?.stateid || 1,
        city: first_address?.city || '',
        post_code: first_address?.post_code || '',
        is_default: first_address?.is_default || true,
        address_type_id: first_address?.address_type_id || 9,
        from_address_type: 'billing',
        save_address: false,
        notificaton: false,
      });

      const checkoutData = {
        customer_id: res?.customer_data?.id,
        customer_address: res?.customer_data?.customer_address,
        carts: cart?.carts,
        cart_total: cart?.cart_total,
        shipping_charges: cart?.shipping_charges,
        shipping_address: defaultShippingAddress,
        billing_address: defaultBillingAddress,
      };

      setUser(res?.customer_data);
      dispatch(update(checkoutData));
    });
  };

  useEffect(() => {
    handleFetch();
  }, [addressDataUser]);

  useEffect(() => {
    setCouponData(null);
    setApplyCoupon(null);
  }, [defaultBillingAddress]);

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const [, setDeliveryOpen] = useState(false);

  // const handleChange =
  //   (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? panel : false);
  //   };
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (
        (panel === 'panel2' || panel === 'panel3') &&
        userAddrData?.customer_address.length === 0
      ) {
        return; // Do not allow opening panel2 or panel3 if customer_address is empty
      }
      if (panel === 'panel2' || panel === 'panel3') {
        if (expanded === 'panel1') {
          return; // Do not allow opening panel2 or panel3 if panel1 is expanded
        }
      }
      if (panel === 'panel3') {
        if (expanded === 'panel1' || 'panel2') {
          return; // Do not allow opening panel2 or panel3 if panel1 is expanded
        }
      }
      setExpanded(isExpanded ? panel : false);
    };

  const handleExpandPaymentAccordion = () => {
    setExpanded('panel3');
  };

  const handleExpandPaymentAccordionDelivery = () => {
    if (userAddrData?.customer_address?.length > 0) {
      setExpanded('panel2');
    }
  };
  const handleReview = () => {
    setExpanded('panel2');
  };
  const handleEdit = () => {
    setExpanded('panel1');
  };

  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
        >
          <Grid container my={2} spacing={3}>
            <Grid item xs={12} md={9}>
              <div>
                <Accordion
                  expanded={expanded === 'panel1'}
                  onChange={handleChange('panel1')}
                  className="accordion-checkout-new"
                >
                  {expanded !== 'panel1' ? (
                    <AccordionSummary
                      //   expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      className="accordion-checkout-new-summary-newdiv"
                    >
                      <Box
                        className="accordion-checkout-new-box"
                        sx={{ width: '100%' }}
                      >
                        <Box className="accordion-checkout-new-box1-newdiv">
                          <Typography className="accordion-checkout-new-box1-text">
                            <Image
                              src="/images/checkout-new/tick_icon1.png"
                              alt="tick"
                              width={17}
                              height={11}
                            />
                          </Typography>
                        </Box>
                        <Typography className="accordion-checkout-new-text-newdiv">
                          Delivery
                        </Typography>
                        <Typography
                          sx={{ textAlign: 'end', width: '100%' }}
                          className="checkout-edit"
                          onClick={() => {
                            handleEdit();
                          }}
                        >
                          Edit
                        </Typography>
                      </Box>
                    </AccordionSummary>
                  ) : (
                    <AccordionSummary
                      //   expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      className="accordion-checkout-new-summary"
                    >
                      <Box className="accordion-checkout-new-box">
                        <Box className="accordion-checkout-new-box1">
                          <Typography className="accordion-checkout-new-box1-text">
                            1
                          </Typography>
                        </Box>
                        <Typography className="accordion-checkout-new-text">
                          Delivery
                        </Typography>
                      </Box>
                    </AccordionSummary>
                  )}

                  <AccordionDetails className="accordion-details">
                    <ShippingAddress
                      user={user}
                      handleShippingCharges={(res: any) => {
                        charges(
                          {
                            from_type: 'shipping',
                            address: res?.customer_address[0].id,
                          },
                          couponData,
                        );
                      }}
                      defaultAddress={defaultShippingAddress}
                      handleFetch={handleFetch}
                      sameAsShipping={sameAsShipping}
                      shippingValidationError={shippingValidationError}
                      changeShippingAddress={updateShippingAddress}
                      setBillingSame={setBillingSame}
                      userAddrData={userAddrData}
                      setAddressDataUser={setAddressDataUser}
                    />
                    <BillingAdddress
                      defaultAddress={defaultBillingAddress}
                      sameAsShipping={sameAsShipping}
                      shippingAddress={shippingAddress}
                      updateBillingInfo={updateBillingInfo}
                      billingValidationError={billingValidationError}
                      userAddrData={userAddrData}
                      handleFetch={handleFetch}
                    />
                    <DeliveryOPtions
                      shippingValue={cartTotal.shipping_charge}
                    />
                    <CheckoutNewDelivery
                      setDeliveryOpen={setDeliveryOpen}
                      expandPaymentAccordion={
                        handleExpandPaymentAccordionDelivery
                      }
                      setUserData={setUserData}
                      setOpen={setOpen}
                    />
                  </AccordionDetails>
                </Accordion>

                {expanded !== 'panel1' && <AddressList userData={userData} />}

                <Accordion
                  expanded={expanded === 'panel2'}
                  onChange={handleChange('panel2')}
                  className="accordion-checkout-new"
                >
                  {expanded !== 'panel2' && expanded === 'panel3' ? (
                    <AccordionSummary
                      //   expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                      className="accordion-checkout-new-summary-newdiv"
                    >
                      <Box
                        className="accordion-checkout-new-box"
                        sx={{ width: '100%' }}
                      >
                        <Box className="accordion-checkout-new-box1-newdiv">
                          <Typography className="accordion-checkout-new-box1-text">
                            <Image
                              src="/images/checkout-new/tick_icon1.png"
                              alt="tick"
                              width={17}
                              height={11}
                            />
                          </Typography>
                        </Box>
                        <Typography
                          className="accordion-checkout-new-text-newdiv"
                          sx={{ width: '100%' }}
                        >
                          Review Cart
                        </Typography>
                        <Typography
                          sx={{ textAlign: 'end', width: '100%' }}
                          className="checkout-edit"
                          onClick={() => {
                            handleReview();
                          }}
                        >
                          Review
                        </Typography>
                      </Box>
                    </AccordionSummary>
                  ) : (
                    <AccordionSummary
                      //   expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                      className="accordion-checkout-new-summary"
                    >
                      <Box className="accordion-checkout-new-box">
                        <Box className="accordion-checkout-new-box1">
                          {' '}
                          <Typography className="accordion-checkout-new-box1-text">
                            2
                          </Typography>
                        </Box>
                        <Typography className="accordion-checkout-new-text">
                          Review Cart
                        </Typography>
                      </Box>
                    </AccordionSummary>
                  )}

                  <AccordionDetails className="accordion-details">
                    <CheckoutNewCart
                      // setOpen={setOpen}
                      expandPaymentAccordion={handleExpandPaymentAccordion}
                      setMobilePay={setMobilePay}
                    />
                  </AccordionDetails>
                </Accordion>
                {/* {expanded !== 'panel2'  && <CartItemSub />} */}
                {expanded !== 'panel2' && expanded === 'panel3' && (
                  <CartItemSub />
                )}
                <Accordion
                  expanded={expanded === 'panel3'}
                  onChange={handleChange('panel3')}
                  className="accordion-checkout-new"
                >
                  <AccordionSummary
                    //   expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    className="accordion-checkout-new-summary"
                  >
                    <Box className="accordion-checkout-new-box">
                      <Box className="accordion-checkout-new-box1">
                        {' '}
                        <Typography className="accordion-checkout-new-box1-text">
                          3
                        </Typography>
                      </Box>
                      <Typography className="accordion-checkout-new-text">
                        Payment Options
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CheckNewPayment />
                    <Grid container mt={2}>
                      <Grid item md={6}>
                        {/* <Box className="checkout-new-button-box"> */}
                        <Button
                          className="checkout-new-button"
                          onClick={() => {
                            handleCheckOut();
                          }}
                        >
                          Next
                        </Button>
                        {/* </Box> */}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Grid>
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
                  <h5 className="summary-title">{cart?.cart_count} Items</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-price">
                    ₹{cartTotal.product_tax_exclusive_total}
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-title">Sub Total</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-price">
                    ₹{cartTotal.product_tax_exclusive_total}
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-title">Taxes</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-price">₹ {cartTotal.tax_total}</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-title">Shipping Charge</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-price">
                    ₹ {cartTotal.shipping_charge}
                  </h5>
                </Grid>

                {couponData && (
                  <>
                    <Grid item xs={6}>
                      <h5 className="summary-title">Discount</h5>
                    </Grid>
                    <Grid item xs={6}>
                      <h5 className="summary-price">
                        ₹{' '}
                        {!isNaN(Number(couponData?.coupon_amount))
                          ? Number(couponData?.coupon_amount)
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
                  <h5 className="summary-price">₹{cartTotal.total}</h5>
                </Grid>
              </Grid>
              {couponData && (
                <Grid item xs={12} my={2}>
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
                      {!isNaN(Number(couponData?.coupon_amount))
                        ? Number(couponData?.coupon_amount)
                        : 0}
                    </span>{' '}
                    on this order
                  </button>
                </Grid>
              )}

              {/* <Grid item xs={12} my={2}>
              <button className="order-conform-invoice">
                Download Invoice
              </button>
            </Grid>
            <Grid item xs={12} my={2}>
              <button className="order-conform-invoice1">Track Order</button>
            </Grid>
            <Grid item xs={12} my={2}>
              <button className="order-conform-cancel">Cancel</button>
            </Grid> */}
              <Grid item xs={12} my={2}>
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: 1.08,
                    objectFit: 'contain',
                  }}
                >
                  <Image
                    src="/images/demo/static/order-conf1.png"
                    fill
                    alt="icon"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Box className="checkoutbox-accordion">
          <Grid container>
            <Grid item xs={4}>
              <Box
                className="accordion-checkoutnewbox"
                onClick={() => handleDeliveryCheckout()}
                sx={{ cursor: 'pointer' }}
              >
                {mobileCart ? (
                  <Box className="accordion-checkoutnewbox2">
                    <Typography className="accordion-checkout-newbox1text">
                      <Image
                        src="/images/checkout-new/tick_icon.png"
                        alt="tick"
                        width={17}
                        height={11}
                      />
                    </Typography>
                  </Box>
                ) : (
                  <Box className="accordion-checkoutnewbox1">
                    <Typography className="accordion-checkout-newbox1text">
                      1
                    </Typography>
                  </Box>
                )}

                <Typography className="accordion-checkoutnewtext">
                  Delivery
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                className="accordion-checkoutnewbox"
                onClick={() => handleCartCheckout()}
                sx={{ cursor: 'pointer' }}
              >
                {mobilepay && (
                  <Box className="accordion-checkoutnewbox2">
                    <Typography className="accordion-checkout-newbox1text">
                      <Image
                        src="/images/checkout-new/tick_icon.png"
                        alt="tick"
                        width={17}
                        height={11}
                      />
                    </Typography>
                  </Box>
                )}
                {mobileCart && !mobilepay && (
                  <Box className="accordion-checkoutnewbox2">
                    <Typography className="accordion-checkout-newbox1text">
                      2
                    </Typography>
                  </Box>
                )}

                {!mobileCart && !mobilepay && (
                  <Box className="accordion-checkoutnewbox1">
                    <Typography className="accordion-checkout-newbox1text">
                      2
                    </Typography>
                  </Box>
                )}

                <Typography className="accordion-checkoutnewtext">
                  Review Cart
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                className="accordion-checkoutnewbox"
                onClick={() => handlePaymentCheckout()}
                sx={{ cursor: 'pointer' }}
              >
                {mobilepay ? (
                  <Box className="accordion-checkoutnewbox2">
                    <Typography className="accordion-checkout-newbox1text">
                      3
                    </Typography>
                  </Box>
                ) : (
                  <Box className="accordion-checkoutnewbox1">
                    <Typography className="accordion-checkout-newbox1text">
                      3
                    </Typography>
                  </Box>
                )}

                <Typography className="accordion-checkoutnewtext">
                  Payment
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Container>
          {!mobileCart && !mobilepay && mobileDelivery && (
            <Box>
              <ShippingAddress
                user={user}
                handleShippingCharges={(res: any) => {
                  charges(
                    {
                      from_type: 'shipping',
                      address: res?.customer_address[0].id,
                    },
                    couponData,
                  );
                }}
                defaultAddress={defaultShippingAddress}
                handleFetch={handleFetch}
                sameAsShipping={sameAsShipping}
                shippingValidationError={shippingValidationError}
                changeShippingAddress={updateShippingAddress}
                setBillingSame={setBillingSame}
                userAddrData={userAddrData}
                setAddressDataUser={setAddressDataUser}
              />
              <BillingAdddress
                defaultAddress={defaultBillingAddress}
                sameAsShipping={sameAsShipping}
                shippingAddress={shippingAddress}
                updateBillingInfo={updateBillingInfo}
                billingValidationError={billingValidationError}
                userAddrData={userAddrData}
                handleFetch={handleFetch}
              />
              <DeliveryOPtions shippingValue={cartTotal.shipping_charge} />

              <CheckoutNewDelivery
                setDeliveryOpen={setDeliveryOpen}
                expandPaymentAccordion={handleExpandPaymentAccordionDelivery}
                setUserData={setUserData}
                setOpen={setOpen}
              />
            </Box>
          )}

          {mobileCart && !mobilepay && (
            <Box>
              <CheckoutNewCart
                // setOpen={setOpen}
                expandPaymentAccordion={handleExpandPaymentAccordion}
                setMobilePay={setMobilePay}
              />
            </Box>
          )}
          {mobilepay && (
            <Box>
              <CheckNewPayment />
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
                  <Button
                    className="checkout-new-button"
                    onClick={() => {
                      handleCheckOut();
                    }}
                  >
                    Next
                  </Button>
                  {/* </Box> */}
                </Grid>
              </Grid>
            </Box>
          )}

          {open === true ? (
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
              <ResponsiveOrderSummary
                setMobileCart={setMobileCart}
                setOpen={setOpen}
                discountData={couponData}
                applyCoupon={applyCoupon}
                setApplyCoupon={setApplyCoupon}
                buttonClear={buttonClear}
                setButtonClear={setButtonClear}
                setCouponData={setCouponData}
                user={user}
                defaultShippingAddress={defaultShippingAddress}
                applyCouponApi={applyCouponApi}
                charges={charges}
              />
            </Dialog>
          ) : null}
        </Container>
      </Box>
    </>
  );
};

export default CheckoutNewSection;
