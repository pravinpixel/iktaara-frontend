/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
// import ChangePassword from '@/components/order-confirm/changePassword';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  Grid,
  Slide,
} from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import apiUser from 'src/lib/api/user';
// import OrderConfrimPopup from '@/components/dashboard/order-cancel-popup';
const OrderConfrimPopup = dynamic(
  () => import('@/components/dashboard/order-cancel-popup'),
);

import { addUser } from '@/redux/user-slice';
import ProductLayout from '@/theme/layouts/ProductLayout';
import { Rating } from '@mui/material';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import api from 'src/lib/api/cart';
import apiMeta from 'src/lib/api/home';

// import OrderCancel from '@/components/order-confirm/orderCancel';
const OrderCancel = dynamic(
  () => import('@/components/order-confirm/orderCancel'),
);

const ChangePassword = dynamic(
  () => import('@/components/order-confirm/changePassword'),
);
// import OrderConfirm from '@/components/order-confirm/orderConfirm';
const OrderConfirm = dynamic(
  () => import('@/components/order-confirm/orderConfirm'),
);
const MetaTags = dynamic(() => import('@/components/common/header/MetaTags'));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ProfileOrder = (props: any) => {
  const { meta } = props;
  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };

  const router = useRouter();
  const dispatch = useDispatch();
  // const [readOnly, setReadOnly] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const { data: session, status } = useSession();
  const [loagged, setLoagged] = useState<boolean>(false);
  // const [trackingShow, setTrackingShow] = useState(null);
  const [ratings, setRatings] = useState({
    rating: 5,
    comments: '',
  });
  const [cancelOrder, setCancelOrder] = useState<string | any>(null);
  const [singleOrder, setSingleOrder] = useState<any>(null);
  const [orders, setOrders] = useState<Array<any>>([]);
  const [cancelList, setCancelList] = useState<Array<any>>([]);
  const [sort] = useState('desc');
  const [cancelPopup, setCancelPopup] = useState<boolean | null | string>(
    false,
  );
  const [value, setValue] = React.useState(0);
  const [orderData, setOrderData] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [allOrderCancel, setAllOrderCancel] = useState<boolean>(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [loading, setLoading] = useState<boolean>(true);

  // const [userLoading, UserSetLoading] = useState<boolean>(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const u = loagged ? (session as unknown as any) : null;
  const user_id: number | null = u?.user?.user_id;

  // const inputRef: [
  //   (
  //     | ((instance: HTMLTextAreaElement | null) => void)
  //     | RefObject<HTMLTextAreaElement>
  //   ),
  //   any,
  // ] = [useRef(null), useRef(null)];

  const getOrders = async () => {
    await api.getOrderList({ customer_id: user_id, sort }).then((res: any) => {
      if (res?.status_code === 200) {
        setOrders(res.data);
      }
      setLoagged(true);
    });
  };

  const handleCancelOrderList = async () => {
    await api
      .getOrderList({ customer_id: user_id, status: 'cancel', sort })
      .then((res: any) => {
        if (res?.status_code === 200) {
          setCancelList(res.data);
        }
        setLoagged(true);
      });
  };

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
        // router.push({
        //   pathname: '/dashboard/orders/cancel/' + cancelOrder.order_no,
        //   query: {
        //     item_id: singleOrder.id,
        //     order_id: singleOrder.order_id,
        //     product_id: singleOrder.product_id,
        //   },
        // });
        router.push('/buy/dashboard/orders/cancel/' + singleOrder);
        setCancelPopup(null);
      }
    },
    [cancelOrder, singleOrder],
  );

  const handleWholeOrder = (order: any) => {
    setAllOrderCancel(true);
    setOrderData(order);
  };

  const handleWholeOrderClose = () => {
    setAllOrderCancel(false);
  };

  const handleAllOrderCancel = () => {
    router.push('/buy/dashboard/orders/cancel-all/' + orderData?.order_no);
    setAllOrderCancel(false);
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
        apiUser.getMe().then((res: any) => {
          dispatch(addUser(res.customer_data));
          return res.customer_data;
        });

        getOrders();
        handleCancelOrderList();
      }
    }
  }, [loagged, status]);

  // useEffect(() => {
  //   if (loagged == false && status == 'authenticated') {
  //     const profile = apiUser.getMe().then((res: any) => {
  //       setUser(res?.customer_data);
  //       const param = {
  //         customer_id: res?.customer_data?.id ?? '',
  //         first_name: res?.customer_data?.first_name ?? '',
  //         last_name: res?.customer_data?.last_name ?? '',
  //         email: res?.customer_data?.email ?? '',
  //         mobile_no: res?.customer_data?.mobile_no ?? '',
  //       };
  //       // setValues(param);
  //       dispatch(addUser(res?.customer_data));
  //       return res?.customer_data;
  //     });
  //     setLoagged(true);
  //   }
  // }, [loagged, status]);
  // useEffect(() => {
  //   if (sort) {
  //     getOrders();
  //     handleCancelOrderList();
  //   }
  // }, [sort]);

  // useEffect(() => {
  //   if (orders.length > 0) {
  //     setLoading(false);
  //   }
  //   if (user) {
  //     UserSetLoading(false);
  //   }
  // }, [orders, user]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (!loagged && status === 'authenticated') {
        try {
          const res = await apiUser.getMe();
          const customerData = res?.customer_data;
          setUser(customerData);
          // const param = {
          //   customer_id: customerData?.id ?? '',
          //   first_name: customerData?.first_name ?? '',
          //   last_name: customerData?.last_name ?? '',
          //   email: customerData?.email ?? '',
          //   mobile_no: customerData?.mobile_no ?? '',
          // };
          // setValues(param);
          dispatch(addUser(customerData));
          setLoagged(true);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      if (sort) {
        try {
          await getOrders();
          await handleCancelOrderList();
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [loagged, status, sort, dispatch]);
  return (
    <ProductLayout>
      <MetaTags meta={metaTags} />
      <div className="my-profile-title">
        <h5>Profile</h5>
      </div>
      <Container
        maxWidth={'lg'}
        sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
      >
        {loading ? (
          <>
            <Grid container>
              <Grid item></Grid>
              <Grid item></Grid>
            </Grid>
          </>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    className="tab-one"
                  >
                    <Tab label="Orders" {...a11yProps(0)} />
                    <Tab label="Cancelled Orders" {...a11yProps(1)} />
                  </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                  {orders.map((order: any, index: any) => {
                    const created_at = new Date(order.order_date);
                    const date = new Date(order.order_date);
                    const deliveryDate = date.getDate() + 7;
                    date.setDate(deliveryDate);

                    return (
                      <Grid
                        item
                        xs={12}
                        className="my-order-grid-box"
                        my={2}
                        key={index}
                      >
                        <Grid container spacing={2} p={2} key={index}>
                          <>
                            <Grid
                              item
                              xs={6}
                              md={2.5}
                              className="order-conform-id"
                            >
                              <h5>Order ID</h5>
                              <h6>{order?.order_no}</h6>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              md={2.5}
                              className="order-conform-id"
                            >
                              <h5>Order Date</h5>
                              <h6>
                                {dayjs(
                                  created_at,
                                  'DD-MMM-YYYY HH:mm:ss',
                                ).format('D MMM YYYY')}
                              </h6>
                            </Grid>

                            <Grid
                              item
                              xs={6}
                              md={1}
                              className="order-conform-id"
                            ></Grid>
                            <Grid
                              item
                              xs={6}
                              md={1}
                              className="order-conform-id"
                            ></Grid>

                            <Grid
                              item
                              xs={12}
                              md={5}
                              sx={{
                                display: 'flex',
                                justifyContent: {
                                  xs: 'flex-start',
                                  md: 'center',
                                },
                                alignItems: {
                                  xs: 'flex-start',
                                  md: 'center',
                                },
                                cursor: 'pointer',
                                mb: { xs: '10px', sm: '0px' },
                              }}
                              gap={1}
                            >
                              <Link
                                href={order.invoice_file}
                                target="_blank"
                                className="new-flex new-flex-new"
                              >
                                {' '}
                                <Button className="my-orders-button">
                                  Download Invoice
                                </Button>
                              </Link>
                              {order?.cancel_status === true ? (
                                <Button
                                  className="my-orders-button1"
                                  // onClick={() => {
                                  //   handleCancelPopUp(order, 'cancel');
                                  // }}
                                  onClick={() => {
                                    handleWholeOrder(order);
                                  }}
                                >
                                  Cancel Order
                                </Button>
                              ) : (
                                ''
                              )}
                            </Grid>
                          </>
                        </Grid>

                        <Grid item xs={12}>
                          <OrderConfirm orderData={order} />
                        </Grid>
                      </Grid>
                    );
                  })}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  {cancelList.map((order: any, index: any) => {
                    const created_at = new Date(order.order_date);
                    const date = new Date(order.order_date);
                    const deliveryDate = date.getDate() + 7;
                    date.setDate(deliveryDate);
                    return (
                      <Grid
                        item
                        xs={12}
                        className="my-order-grid-box"
                        my={2}
                        key={index}
                      >
                        <Grid container spacing={2} p={2} key={index}>
                          <>
                            <Grid
                              item
                              xs={6}
                              md={2.5}
                              className="order-conform-id"
                            >
                              <h5>Order ID</h5>
                              <h6>{order?.order_no}</h6>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              md={2.5}
                              className="order-conform-id"
                            >
                              <h5>Order Date</h5>
                              <h6>
                                {dayjs(
                                  created_at,
                                  'DD-MMM-YYYY HH:mm:ss',
                                ).format('D MMM YYYY')}
                              </h6>
                              {/* <h5>Order Status</h5>
                          <button style={{ textTransform: 'uppercase' }}>
                            {order?.status}
                          </button> */}
                            </Grid>

                            <Grid
                              item
                              xs={6}
                              md={1}
                              className="order-conform-id"
                            >
                              {/* <h5>Order Date</h5>
                          <h6>{created_at.toLocaleDateString()}</h6> */}
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              md={1}
                              className="order-conform-id"
                            >
                              {/* <h5>Delivery</h5>
                          <h6> {date.toLocaleDateString()}</h6> */}
                            </Grid>
                          </>
                        </Grid>

                        <Grid item xs={12}>
                          <OrderCancel orderData={order} />
                        </Grid>
                      </Grid>
                    );
                  })}
                </CustomTabPanel>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Grid item xs={12} mt={2}>
                <Card className="my-profile-card">
                  <CardMedia
                    component="div"
                    sx={{
                      backgroundColor: '#F2F6F8',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      py: 3,
                    }}
                  >
                    <Avatar
                      src="/broken-image.jpg"
                      sx={{ width: 100, height: 100 }}
                    />
                  </CardMedia>

                  <CardContent
                    className="profile-card-details"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <h5>{user?.first_name}</h5>
                    <h6>{user?.email}</h6>
                    <h6>{user?.mobile_no}</h6>
                    <h4 onClick={handleClickOpen}>Change Password</h4>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} mt={2}>
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
              <Grid item xs={12} mb={2} style={{ marginTop: '16px' }}>
                <Link href="/buy">
                  <button className="order-conform-invoice1">
                    Continue Shopping
                  </button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        )}

        {open === true ? (
          <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <ChangePassword Close={handleClose} />
          </Dialog>
        ) : null}
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
        {allOrderCancel && (
          <OrderConfrimPopup
            title={'Cancel Whole Order'}
            show={allOrderCancel}
            handlePopup={handleWholeOrderClose}
            handleSubmit={handleAllOrderCancel}
          >
            <Modal.Body
              as={Row}
              className="text-center cancel-order-popup-body"
            >
              <Col md={12} className="return-title">
                Confirm Cancel Order
              </Col>
              <Col md={12} className="cancel-content">
                Do you want to cancel the whole order?
              </Col>
              <Col
                md={12}
                className="w-100 d-flex justify-content-center cancel-content-footer"
              >
                <Button
                  className="cancel-button-no"
                  onClick={() => handleWholeOrderClose()}
                >
                  No
                </Button>
                <Button
                  className="cancel-button-yes"
                  onClick={() => handleAllOrderCancel()}
                >
                  Yes
                </Button>
              </Col>
            </Modal.Body>
          </OrderConfrimPopup>
        )}
      </Container>
    </ProductLayout>
  );
};

export default ProfileOrder;

export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await apiMeta
    .getMetaData({ page: 'profile-page' })
    .then((res: any) => {
      if (res?.error == 0 && res?.status_code == 200) {
        return {
          title: res?.data?.meta_title || 'Profile | Iktaraa',
          keywords: res?.data?.meta_keywords || '',
          description: res?.data?.meta_description || '',
          image:
            res?.data?.meta_image ||
            res?.data?.logo ||
            '/public/images/logo.svg',
        };
      }
      return [];
    });

  return {
    props: {
      meta: meta,
    },
  };
};
