/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import ProductLayout from '@/theme/layouts/ProductLayout';
import { Box, Container, Grid } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import api from 'src/lib/api/cart';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// import OrderList from '@/components/order-confirm/orderList';
const OrderList = dynamic(() => import('@/components/order-confirm/orderList'));

const OrderConfirmation = () => {
  const [orderDetails, setOrdersDetails] = useState<any>(null);

  const [, setLoading] = useState(true);
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const created_at = new Date(orderDetails?.order_date);
  const date = new Date(orderDetails?.order_date);
  const deliveryDate = date.getDate() + 7;
  date.setDate(deliveryDate);
  // const invoiceUrl = process.env.HOST_URL + '/storage';
  const fetch = async () => {
    setLoading(true);
    try {
      const response = await api.getOrderSuccess({
        order_no: router.query.slug,
      });
      setOrdersDetails(response);
    } catch (error) {
      setOrdersDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderConfirmation = () => {
    router.push('/buy');
  };

  // const handleCancel = () => {
  //   router.push('/buy/profile');
  // };

  const handleTrack = () => {
    router.push(`/buy/profile`);
  };

  const handleInvoice = () => {
    window.open(orderDetails?.invoice_file);
  };

  useEffect(() => {
    if (router.query.slug) {
      fetch();
    }
  }, [router]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ProductLayout>
      <Container
        maxWidth={'lg'}
        sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
      >
        {/* <div data-aos="fade-down"></div> */}

        {orderDetails && showSplash && (
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <img
              src="/images/checkout-new/spalash.png"
              className={showSplash ? 'splash-image' : ''}
              alt="spalash"
              style={{
                position: 'absolute',
                width: '50%',
                height: '35%',
                left: '400px',
                marginTop: '-29px',
              }}
            />
          </Box>
        )}
        {orderDetails ? (
          <Grid container my={{ xs: 1, sm: 3, md: 5 }} spacing={3}>
            {/* <Grid item xs={12} className="spalash-image"></Grid> */}
            <Grid item xs={12} md={9}>
              <Grid container>
                <Grid item xs={12} className="my-order-sec1">
                  <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Image
                      src="/images/demo/static/order-icon.png"
                      width={25}
                      height={25}
                      alt="logo"
                    />
                    <h5 className="my-order-congrats">
                      Congratulations! Your order is placed.
                    </h5>
                  </Box>
                  <p className="my-order-desc">
                    Thank you for shopping with Iktaraa.com.
                    <span>
                      {' '}
                      Your order number is {orderDetails?.order_no} .{' '}
                    </span>
                    <br />
                    You should receive an email shortly. If the email hasn’t
                    arrived within two minutes, please check your spam folder to
                    see if the email was routed there.
                  </p>
                </Grid>

                <Grid item xs={12} my={1}>
                  <h5 className="order-information">Order Information</h5>
                </Grid>
                {/* {orderDetails?.items?.map((itemDta: any, i: any) => {
                  const created_at = new Date(itemDta.created_at);
                  const date = new Date(itemDta.created_at);
                  const deliveryDate = date.getDate() + 7;
                  date.setDate(deliveryDate);
                  return ( */}
                <Grid item xs={12} className="order-information-border">
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3} className="order-conform-id">
                      <h5>Order ID</h5>
                      <h6>{orderDetails?.order_no} </h6>
                    </Grid>
                    <Grid item xs={6} md={3} className="order-conform-id">
                      <h5>Order Status</h5>
                      <button style={{ textTransform: 'uppercase' }}>
                        {orderDetails?.status}
                      </button>
                    </Grid>
                    <Grid item xs={6} md={3} className="order-conform-id">
                      <h5>Order Date</h5>
                      <h6> {created_at.toLocaleDateString()}</h6>
                    </Grid>
                    <Grid item xs={6} md={3} className="order-conform-id">
                      <h5>Delivery</h5>
                      <h6> {date.toLocaleDateString()}</h6>
                    </Grid>
                  </Grid>
                </Grid>
                {/* );
                })} */}

                <Grid item xs={12} my={1}>
                  <h5 className="order-information">Delivery Address</h5>
                </Grid>
                <Grid item xs={12} className="order-information-border">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} className="order-conform-id">
                      <h5>
                        {orderDetails?.shipping_name}
                        <span>HOME</span>
                      </h5>
                      <h6>
                        {orderDetails?.shipping_address_line1},
                        {orderDetails?.shipping_address_line2},
                        {orderDetails?.shipping_city},
                        {orderDetails?.shipping_state}
                        {orderDetails?.shipping_country}
                      </h6>
                      {/* <h6></h6>
                      <h6></h6>
                      <h6></h6> */}
                    </Grid>
                    <Grid item xs={12} md={6} className="order-conform-id">
                      <h5>Billing Address </h5>
                      <h6>
                        {orderDetails?.billing_address_line1},
                        {orderDetails?.billing_address_line2},
                        {orderDetails?.billing_city},
                        {orderDetails?.billing_state}
                        {orderDetails?.billing_country}
                      </h6>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} my={1}>
                  <h5 className="order-information">Payment Information</h5>
                </Grid>
                <Grid item xs={12} className="order-information-border">
                  <h5 className="my-order-visa">
                    VISA <span>ending {orderDetails?.card_name}</span>
                  </h5>
                </Grid>
                <Grid item xs={12} my={1}>
                  <h5 className="order-information">Order List</h5>
                </Grid>
                {/* {orderDetails?.items?.map((order: any, i: any) => {
                  return ( */}
                <Grid item xs={12}>
                  {/* <OrderConfirm orderData={orderDetails} /> */}
                  <OrderList orderData={orderDetails} />
                </Grid>
                {/* );
                })} */}

                <Grid
                  item
                  xs={12}
                  md={10}
                  my={2}
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'flex-end' },
                    alignItems: { xs: 'center', md: 'flex-end' },
                  }}
                >
                  <button
                    className="continue-shopping-button"
                    onClick={handleOrderConfirmation}
                  >
                    Continue Shopping
                  </button>
                </Grid>
              </Grid>
            </Grid>
            {/* {orderDetails?.items?.map((data: any, i: any) => {
              return ( */}
            <Grid item xs={12} md={3}>
              <Grid item xs={12}>
                <h5 className="order-summarys">Order Summary</h5>
              </Grid>
              <Grid container spacing={2} className="order-information-border">
                <Grid item xs={6}>
                  <h5 className="summary-title">
                    {orderDetails?.total_quantity} items
                  </h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-price">₹{orderDetails?.amount}</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-title">Sub Total</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-price">₹{orderDetails?.sub_total}</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-title">Taxes</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-price">₹{orderDetails?.tax_amount}</h5>
                </Grid>
              </Grid>
              <Grid container spacing={2} pt={1}>
                <Grid item xs={6}>
                  <h5 className="summary-title">Total Paid</h5>
                </Grid>
                <Grid item xs={6}>
                  <h5 className="summary-price">₹{orderDetails?.amount}</h5>
                </Grid>
              </Grid>
              {orderDetails?.coupon_amount > '0.00' && (
                <Grid item xs={12} my={2}>
                  <button className="order-conform-percentage">
                    <Image
                      src="/images/demo/static/percentage.png"
                      width={20}
                      height={20}
                      alt="percentage"
                      style={{ marginRight: '5px' }}
                    />
                    Saved <span>{orderDetails?.coupon_amount}</span> on this
                    order
                  </button>
                </Grid>
              )}

              <Grid item xs={12} my={2}>
                {/* <Link href={orderDetails?.invoice_file}> */}
                <button
                  className="order-conform-invoice"
                  onClick={() => handleInvoice()}
                >
                  Download Invoice
                </button>
                {/* </Link> */}
              </Grid>
              <Grid item xs={12} my={2}>
                {/* <Link href="/profile"> */}{' '}
                <button
                  className="order-conform-invoice1"
                  onClick={() => handleTrack()}
                >
                  Track Order
                </button>
                {/* </Link> */}
              </Grid>
              <Grid item xs={12} my={2}>
                <Link
                  href={`/buy/dashboard/orders/cancel-all/${orderDetails?.order_no}`}
                >
                  {' '}
                  <button
                    className="order-conform-cancel"
                    // onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                </Link>
              </Grid>
              <Grid item xs={12} my={2}>
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: 1.08,
                    objectFit: 'contain',
                    mt: 2,
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
            {/* );
            })} */}
          </Grid>
        ) : (
          'No Data found'
        )}
      </Container>
    </ProductLayout>
  );
};

export default OrderConfirmation;
