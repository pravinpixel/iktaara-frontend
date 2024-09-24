/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
// import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
// import DashboardLayout from 'src/theme/layouts/DashboardLayout';
// import { Col, Form, Modal, Row } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';
// import OrderConfrimPopup from '@/components/dashboard/order-cancel-popup';
import { addUser } from '@/redux/user-slice';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import api from 'src/lib/api/cart';
import userApi from 'src/lib/api/user';
// import { Rating, Stack } from '@mui/material';
// import CustomizedSteppers from '@/components/tracking';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import OrderStepper from './order-stepper/orderStepper';
// import ReturnOrders from './ReturnOrder';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// import CloseIcon from '@mui/icons-material/Close';

const OrderList = ({ orderData }: any) => {
  const { data: session, status } = useSession();
  const [, setOrders] = useState<Array<any>>([]);
  const [sort] = useState('desc');

  // const steps = [
  //   'Order Placed',
  //   'Order Delivered',
  //   'Order Shipped',
  //   'Order Delivered',
  // ];

  // const handleTrackOrderClick = (id: any) => {
  //   setShowTrackingIndex(id);
  // };

  // const handleClose = () => {
  //   setShowTrackingIndex(null);
  // };

  const [loagged, setLoagged] = useState<boolean>(false);
  const dispatch = useDispatch();

  const u = loagged ? (session as unknown as any) : null;
  const user_id: number | null = u?.user?.user_id;

  // const handleReturnOrder = (id: any) => {
  //   setReturnId(id);
  //   setReturnOrder(true);
  // };
  // const handleReturnOrderClose = () => {
  //   setReturnOrder(false);
  // };

  const getOrders = async () => {
    await api.getOrderList({ customer_id: user_id, sort }).then((res: any) => {
      if (res?.status_code === 200) {
        setOrders(res.data);
      }
      setLoagged(true);
    });
  };

  // const handleRating: any = (
  //   name?: string | any,
  //   value?: number | string | null,
  // ) => {
  //   setRatings((state) => {
  //     return {
  //       ...state,
  //       [name]: value,
  //     };
  //   });
  // };

  useEffect(() => {
    if (loagged === false) {
      const u = session as unknown as any;

      if (u && user_id) {
        userApi.getMe().then((res: any) => {
          dispatch(addUser(res.customer_data));
          return res.customer_data;
        });

        getOrders();
      }
    }
  }, [loagged, status]);
  useEffect(() => {
    if (sort) {
      getOrders();
    }
  }, [sort]);

  // const handleCancelPopUp = useCallback(
  //   (orderId: any, type: any, single?: any | null) => {
  //     setCancelOrder(orderId);
  //     setCancelPopup(type);
  //     setSingleOrder(single);
  //     handleRating('rating', 5);
  //     handleRating('comments', null);
  //   },
  //   [],
  // );
  // const handleCancelOrder = useCallback(
  //   (popup: any, values: any) => {
  //     if (popup === 'rating') {
  //       const para = {
  //         // item_id: singleOrder.id,
  //         order_id: singleOrder.order_id,
  //         product_id: singleOrder.product_id,
  //         ...values,
  //       };
  //       if (!para.rating) {
  //         toast.error('Rating field is required');
  //         return;
  //       }

  //       const result = api.reviewOrder(para).then((res: any) => {
  //         if (res.status !== 'failed') {
  //           toast.success(res.message);
  //           handleCancelPopUp(null, null, null);
  //           // router.replace('/dashboard/my-orders');
  //         } else {
  //           toast.error(res.message, {
  //             hideProgressBar: true,
  //             autoClose: 2000,
  //             type: 'error',
  //             position: 'top-center',
  //           });
  //         }
  //       });
  //     } else if (popup === 'exchange') {
  //       router.push('/dashboard/orders/exchange/' + singleOrder.item_id);
  //       setCancelPopup(null);
  //     } else {
  //       router.push('/dashboard/orders/cancel/' + singleOrder.item_id);
  //       setCancelPopup(null);
  //     }
  //   },
  //   [cancelOrder],
  // );
  return (
    <div className="order-table-main">
      <Grid container sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Grid item xs={12} sm={9} md={9} className="orders-title-background">
          <Typography className="my-orders-title">Product </Typography>
        </Grid>
        <Grid item xs={12} sm={3} md={3} className="orders-title-background">
          <Typography className="my-orders-title" sx={{ textAlign: 'end' }}>
            Total Price
          </Typography>
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2}>
        {orderData?.items?.map((item: any) => {
          return (
            <Fragment key={`${item}`}>
              <Grid item xs={3} sm={3} md={3} mb={2}>
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: 1.17,
                    objectFit: 'contain',
                  }}
                  className="Product-order"
                >
                  <Image src={item.image} fill alt="product" />
                </Box>
              </Grid>
              <Grid item xs={7} sm={6} md={6} className="my-order-resp">
                <h5 className="orders-product-title">{item.product_name}</h5>
                <h6 className="orders-product-price">₹{item.price}</h6>
                <p className="d-flex gap-1 order-product-qty">
                  <span className="orders-product-qty-color">QTY:</span>
                  <span className="orders-product-price">{item.quantity}</span>
                  <span className="orders-product-qty-color">COLOUR:</span>
                  <span className="orders-product-price">{item.color}</span>
                </p>
              </Grid>
              <Grid
                item
                xs={2}
                sm={3}
                md={3}
                sx={{ display: 'flex', justifyContent: 'end' }}
              >
                <span className="orders-product-price">₹{item.price}</span>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </div>
  );
};

export default OrderList;
