/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React, {
  Fragment,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import OrderConfrimPopup from '@/components/dashboard/order-cancel-popup';
import { addUser } from '@/redux/user-slice';
import { Rating } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/cart';
import userApi from 'src/lib/api/user';
import OrderStepper from './order-stepper/orderStepper';
import ReturnOrders from './ReturnOrder';
// import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// const data = [
//   {
//     id: 1,
//     img: '/images/demo/static/a.png',
//     title:
//       'Fender 0930307006 Cutaway Electronics SA-105CE Black Acoustic Guitar',
//     price: '₹13,557',
//     qty: '1',
//     color: 'BLACK',
//     prc: '₹13,557',
//   },
//   {
//     id: 2,
//     img: '/images/demo/static/b.png',
//     title:
//       'Fender 0930307006 Cutaway Electronics SA-105CE Black Acoustic Guitar',
//     price: '₹13,557',
//     qty: '1',
//     color: 'BLACK',
//     prc: '₹13,557',
//   },
//   {
//     id: 3,
//     img: '/images/demo/static/c.png',
//     title:
//       'Fender 0930307006 Cutaway Electronics SA-105CE Black Acoustic Guitar',
//     price: '₹13,557',
//     qty: '1',
//     color: 'BLACK',
//     prc: '₹13,557',
//   },
// ];
const OrderConfirm = ({ orderData }: any) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [, setOrders] = useState<Array<any>>([]);
  const [sort] = useState('desc');
  const [cancelPopup, setCancelPopup] = useState<boolean | null | string>(
    false,
  );

  // const steps = [
  //   'Order Placed',
  //   'Order Delivered',
  //   'Order Shipped',
  //   'Order Delivered',
  // ];

  const [showTrackingIndex, setShowTrackingIndex] = useState<number | null>(
    null,
  );

  const handleTrackOrderClick = (id: any) => {
    setShowTrackingIndex(id);
  };

  const handleClose = () => {
    setShowTrackingIndex(null);
  };

  const [ratings, setRatings] = useState({
    rating: 5,
    comments: '',
  });
  const [cancelOrder, setCancelOrder] = useState<string | any>(null);
  const [singleOrder, setSingleOrder] = useState<any>(null);
  const [loagged, setLoagged] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [returnOrder, setReturnOrder] = useState<boolean>(false);
  const [returnId, setReturnId] = useState<any>(null);
  const u = loagged ? (session as unknown as any) : null;
  const user_id: number | null = u?.user?.user_id;

  const handleReturnOrder = (id: any) => {
    setReturnId(id);
    setReturnOrder(true);
  };
  const handleReturnOrderClose = () => {
    setReturnOrder(false);
  };

  const getOrders = async () => {
    await api.getOrderList({ customer_id: user_id, sort }).then((res: any) => {
      if (res?.status_code === 200) {
        setOrders(res.data);
      }
      setLoagged(true);
    });
  };

  const handleRating: any = (
    name?: string | any,
    value?: number | string | null,
  ) => {
    setRatings((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

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

  const handleCancelPopUp = useCallback(
    (orderId: any, type: any, single?: any | null) => {
      setCancelOrder(orderId);
      setCancelPopup(type);
      setSingleOrder(single);
      handleRating('rating', 5);
      handleRating('comments', null);
    },
    [],
  );
  const handleCancelOrder = useCallback(
    (popup: any, values: any) => {
      if (popup === 'rating') {
        const para = {
          // item_id: singleOrder.id,
          order_id: singleOrder.order_id,
          product_id: singleOrder.product_id,
          ...values,
        };
        if (!para.rating) {
          toast.error('Rating field is required');
          return;
        }

        api.reviewOrder(para).then((res: any) => {
          if (res.status !== 'failed') {
            toast.success(res.message);
            handleCancelPopUp(null, null, null);
            // router.replace('/dashboard/my-orders');
          } else {
            toast.error(res.message, {
              hideProgressBar: true,
              autoClose: 2000,
              type: 'error',
              position: 'top-center',
            });
          }
        });
      } else if (popup === 'exchange') {
        router.push('/buy/dashboard/orders/exchange/' + singleOrder.item_id);
        setCancelPopup(null);
      } else {
        router.push('/buy/dashboard/orders/cancel/' + singleOrder.item_id);
        setCancelPopup(null);
      }
    },
    [cancelOrder],
  );
  return (
    <div className="order-table-main">
      <Grid container>
        <Grid item xs={12} sm={12} md={12} className="orders-title-background">
          <Typography className="my-orders-title">Product </Typography>
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2}>
        {orderData?.items?.map((item: any) => {
          const date = dayjs(item.created_at);
          const deliveryDate = date.add(7, 'day');
          const formattedDate = deliveryDate.format('dddd,D MMM YYYY');
          // const deliveryDate = date.getDate() + 7;
          // date.setDate(deliveryDate);
          return (
            <Fragment key={`${item}`}>
              <Grid item xs={12} sm={3} md={3} mb={2}>
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
              <Grid item xs={12} sm={6} md={6} className="my-order-resp">
                {' '}
                <h5 className="orders-product-name">{item.product_name}</h5>
                <h6 className="orders-product-name1">{item.price}</h6>
                <p className="d-flex gap-1 order-product-qty">
                  <span className="orders-product-name3">QTY:</span>
                  <span className="orders-product-name2">{item.quantity}</span>
                  {/* <span className="orders-product-name3">COLOUR:</span>
                  <span className="orders-product-name2">{item.color}</span> */}
                </p>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                display={{ sm: 'block', xs: 'none' }}
              >
                {' '}
                <span className="mb-0 my-orders-text my-order-status">
                  Order Status
                </span>
                {/* <div className="my-orders-statuss-btn"> */}
                <button
                  style={{ textTransform: 'uppercase' }}
                  className="my-orders-status mb-1 me-4"
                >
                  {item?.status}
                </button>
                {/* </div> */}
                <br />
                <span className="mb-0 my-orders-text ">Expected Delivery</span>
                <br />
                <span className="mb-0 my-orders-text1">
                  {/* {date.toLocaleDateString()} */}
                  {formattedDate}
                </span>
                <br />
                <Box
                  className="my-order-tacking"
                  sx={{ display: 'flex', flexDirection: 'rows', gap: '10px' }}
                >
                  <span
                    className="my-orders-text-link"
                    onClick={() => handleTrackOrderClick(item?.item_id)}
                    style={{ cursor: 'pointer' }}
                  >
                    Track Order
                  </span>

                  {item.status_id == 1 ||
                  item.status_id == 2 ||
                  item.status_id == 8 ? (
                    <span
                      className="my-orders-text-link1"
                      onClick={() => {
                        handleCancelPopUp(orderData, 'cancel', item);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Cancel Order
                    </span>
                  ) : null}
                  {item.status_id === 5 && (
                    <span
                      className="my-orders-text-link1"
                      onClick={() => {
                        handleReturnOrder(item?.item_id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Return Order
                    </span>
                  )}
                </Box>
              </Grid>
              <Grid
                item
                md={3}
                sm={3}
                xs={12}
                display={{ sm: 'none', xs: 'block' }}
                sx={{ mb: 2 }}
              >
                {' '}
                <span className="mb-0 my-orders-text my-order-status">
                  Order Status
                </span>
                <div className="my-orders-statuss-btn">
                  <button
                    style={{ textTransform: 'uppercase' }}
                    className="my-orders-status mb-1 "
                  >
                    {item?.status}
                  </button>
                </div>
                <span className="mb-0 my-orders-text ">Expected Delivery</span>
                <span className="mb-0 my-orders-text1">
                  {/* {date.toLocaleDateString()} */}
                  {formattedDate}
                </span>
                <Box
                  className="my-order-tacking"
                  sx={{ display: 'flex', flexDirection: 'rows', gap: '10px' }}
                >
                  <span
                    className="my-orders-text-link"
                    onClick={() => handleTrackOrderClick(item?.item_id)}
                    style={{ cursor: 'pointer' }}
                  >
                    Track Order
                  </span>
                  {item.status_id == 1 ||
                  item.status_id == 2 ||
                  item.status_id == 8 ? (
                    <span
                      className="my-orders-text-link1"
                      onClick={() => {
                        handleCancelPopUp(orderData, 'cancel', item);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Cancel Order
                    </span>
                  ) : null}
                  {item.status_id === 5 && (
                    <span
                      className="my-orders-text-link1"
                      onClick={() => {
                        handleReturnOrder(item?.item_id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Return Order
                    </span>
                  )}
                </Box>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Grid
                  item
                  md={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {' '}
                  {showTrackingIndex === item?.item_id && (
                    <div className="my-orders-tracking mb-3">
                      {/* <Stepper
                        activeStep={1}
                        alternativeLabel
                        onClick={handleClose}
                        className="orders-stepper"
                      >
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper> */}
                      <Box onClick={handleClose}>
                        <OrderStepper tracking={item?.tracking} />
                      </Box>

                      {/* <CustomizedSteppers tracking={item.tracking} /> */}
                      {/* <Button onClick={handleClose}>Close</Button> */}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>

      {cancelPopup && (
        <OrderConfrimPopup
          title={cancelPopup === 'rating' ? 'Write a review' : ''}
          show={cancelPopup}
          handlePopup={handleCancelPopUp}
          handleSubmit={handleCancelOrder}
        >
          {cancelPopup === 'rating' ? (
            <Modal.Body
              as={Row}
              className="text-center cancel-order-popup-body"
            >
              <Col md={12} className="return-title-reviews text-start mb-2">
                Ratings
              </Col>
              <Col md={12} className="d-flex align-items-start">
                <Rating
                  name="read-only"
                  // ref={}
                  value={ratings.rating}
                  onChange={(
                    e: SyntheticEvent<Element, Event>,
                    value: number | null,
                  ) => {
                    handleRating('rating', value);
                  }}
                />
              </Col>
              <Col md={12} className="mt-2">
                <Form.Label className="d-flex align-items-start">
                  Comments
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Comments"
                  name="comments"
                  plaintext
                  value={ratings.comments}
                  onChange={(e) => {
                    handleRating('comments', e.target.value);
                  }}
                  className=" input-label review-border"
                  // className={
                  //   errors.comment
                  //     ? 'form-control input-label is-invalid'
                  //     : 'form-control input-label'
                  // }
                  // defaultValue={values.comment}
                  // onChange={handleChange}
                />
                {/* {!!errors.comment && (
                <p className="text-danger Mui-error">{errors.comment}</p>
              )} */}
              </Col>
              <Col
                md={12}
                className="w-100 d-flex justify-content-center cancel-content-footer mt-3"
              >
                <Button
                  className="cancel-button-no"
                  onClick={() => {
                    handleCancelPopUp('', null, null);
                  }}
                >
                  No
                </Button>
                <Button
                  className="cancel-button-yes"
                  onClick={() => handleCancelOrder('rating', ratings)}
                >
                  Yes
                </Button>
              </Col>
            </Modal.Body>
          ) : cancelPopup === 'exchange' ? (
            <>
              <Modal.Body
                as={Row}
                className="text-center cancel-order-popup-body"
              >
                <Col md={12} className="return-title">
                  Confirm Exchange Product
                </Col>
                <Col md={12} className="cancel-content">
                  Do you want to exchange the product?
                </Col>
                <Col
                  md={12}
                  className="w-100 d-flex justify-content-center cancel-content-footer"
                >
                  <Button
                    className="cancel-button-no"
                    onClick={() => handleCancelPopUp('', null, null)}
                  >
                    No
                  </Button>
                  <Button
                    className="cancel-button-yes"
                    onClick={() => handleCancelOrder('exchange', {})}
                  >
                    Yes
                  </Button>
                </Col>
              </Modal.Body>
            </>
          ) : (
            <>
              <Modal.Body
                as={Row}
                className="text-center cancel-order-popup-body"
              >
                <Col md={12} className="return-title">
                  Confirm Cancel Order
                </Col>
                <Col md={12} className="cancel-content">
                  Do you want to cancel the order?
                </Col>
                <Col
                  md={12}
                  className="w-100 d-flex justify-content-center cancel-content-footer"
                >
                  <Button
                    className="cancel-button-no"
                    onClick={() => handleCancelPopUp('', null, null)}
                  >
                    No
                  </Button>
                  <Button
                    className="cancel-button-yes"
                    onClick={() => handleCancelOrder('cancel', {})}
                  >
                    Yes
                  </Button>
                </Col>
              </Modal.Body>
            </>
          )}
        </OrderConfrimPopup>
      )}
      {returnOrder && (
        // <OrderConfrimPopup
        //   title={'Return Order'}
        //   show={returnOrder}
        //   handlePopup={handleReturnOrderClose}
        //   // handleSubmit={handleAllOrderCancel}
        // >
        //   <Modal.Body as={Row} className="text-center cancel-order-popup-body">
        //     <ReturnOrders item_id={returnId} />
        //   </Modal.Body>
        // </OrderConfrimPopup>
        <Dialog
          open={returnOrder}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleReturnOrderClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogActions>
            <Button
              onClick={handleReturnOrderClose}
              className="close-icon-returnorder-button"
            >
              <CloseIcon
                // sx={{ color: '#E34061' }}
                className="close-icon-returnorder"
              />
            </Button>
            {/* <Button onClick={handleClose}>Agree</Button> */}
          </DialogActions>
          <DialogTitle
            sx={{ fontFamily: 'sora', fontSize: '18px', color: '#3B4357' }}
          >
            Do you need to Return Order?
          </DialogTitle>
          <DialogContent></DialogContent>
          <ReturnOrders item_id={returnId} />
        </Dialog>
      )}
    </div>
  );
};

export default OrderConfirm;
