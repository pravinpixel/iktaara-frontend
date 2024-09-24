/* eslint-disable react-hooks/exhaustive-deps */
import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import ChangePassword from '@/components/order-confirm/changePassword';
import OrderCancel from '@/components/order-confirm/orderCancel';
import { addUser } from '@/redux/user-slice';
import {
  Avatar,
  Box,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  Grid,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/cart';
import apiUser from 'src/lib/api/user';
import * as yup from 'yup';
const initialValues = { reason: '', comment: '' };

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const formSchema = yup.object().shape({
  reason: yup.number().required('Please select reason for cancel'),
  comment: yup.string().required('Comments is required'),
});

const CancelOrders = () => {
  const router = useRouter();
  const order_no: any = router.query.orderid;

  const { status } = useSession();
  const [singleOrder, setSingleOrder] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [loagged, setLoagged] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    api.getCancelReason().then((res: any) => {
      if (res?.status_code === 200) {
        setState(res.data);
      }
    });

    // if (order.length == 0) {
    //   if (u && user_id) {
    //     const getOrders = async () => {
    //       const result = await api
    //         .getOrderDetails({ customer_id: user_id, order_no: orderId })
    //         .then((res: any) => {
    //           if (res?.error === 0) {

    //             setOrder(res.data);
    //           }
    //         });
    //     };
    //     getOrders();
    //   }
    // }
  }, []);
  // const fetch = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await api.getOrderSuccess({
  //       order_no: router.query.slug,
  //     });
  //     setOrdersDetails(response);
  //   } catch (error) {
  //     setOrdersDetails(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    if (order_no) {
      api
        .getOrderSuccess({ order_no })
        .then((res) => {
          setSingleOrder(res);
        })
        .catch((err) => console.log(err, 'erro'));
    }
  }, [order_no]);

  const handleCancelOrder = (values: any) => {
    const postData = {
      // customer_id: user_id,
      order_id: order_no,

      cancel_reason_id: values.reason,
      cancel_comment: values.comment,
    };
    setLoading(true);
    api.cancelOrderAll(postData).then((res: any) => {
      setLoading(false);
      if (res.error === 0) {
        toast.success(res.message);
        router.replace('/buy/profile');
      } else {
        toast.error(res.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'top-center',
        });
      }
    });
  };

  const [open, setOpen] = useState<boolean>(false);
  const created_at = singleOrder?.order_date;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    onSubmit: handleCancelOrder,
    initialValues,
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (loagged == false && status == 'authenticated') {
      apiUser.getMe().then((res: any) => {
        setUser(res?.customer_data);
        // const param = {
        //   customer_id: res?.customer_data?.id ?? '',
        //   first_name: res?.customer_data?.first_name ?? '',
        //   last_name: res?.customer_data?.last_name ?? '',
        //   email: res?.customer_data?.email ?? '',
        //   mobile_no: res?.customer_data?.mobile_no ?? '',
        // };
        dispatch(addUser(res?.customer_data));
        return res?.customer_data;
      });
      setLoagged(true);
    }
  }, [loagged, status]);
  return (
    // <DashboardLayout
    //   active={[
    //     {
    //       link: router.asPath,
    //       string: 'Cancel orders',
    //     },
    //   ]}
    // >
    <>
      {' '}
      <Header />
      <div className="my-profile-title">
        <h5>Orders</h5>
      </div>
      <section className="orders-cancel-sections">
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} sm={7}>
              <div className="d-flex gap-1 align-items-center order-back">
                <Image
                  src="/icons/arrow-icons.png"
                  alt="user-icon"
                  width={6}
                  height={12}
                />
                <Link href="/buy/profile">
                  <span className="cancel-order-back">Back</span>
                </Link>
              </div>
              <div className="cancel-order-item">
                <h6 className="cancel-ordertitle">Cancel Order</h6>
              </div>
              <form className="form" onSubmit={handleSubmit}>
                <Grid item xs={12} className="my-order-grid-box" my={2}>
                  <Grid container spacing={2} p={2}>
                    <>
                      <Grid item xs={6} md={2.5} className="order-conform-id">
                        <h5>Order ID</h5>
                        <h6>{singleOrder?.order_no}</h6>
                      </Grid>
                      <Grid item xs={6} md={2.5} className="order-conform-id">
                        <h5>Order Date</h5>
                        <h6>
                          {dayjs(created_at, 'DD-MMM-YYYY HH:mm:ss').format(
                            'D MMM YYYY',
                          )}
                          {/* {singleOrder?.order_date} */}
                        </h6>
                        {/* <h5>Order Status</h5>
                            <button style={{ textTransform: 'uppercase' }}>
                              {order?.status}
                            </button> */}
                      </Grid>

                      <Grid item xs={6} md={1} className="order-conform-id">
                        {/* <h5>Order Date</h5>
                            <h6>{created_at.toLocaleDateString()}</h6> */}
                      </Grid>
                      <Grid item xs={6} md={1} className="order-conform-id">
                        {/* <h5>Delivery</h5>
                            <h6> {date.toLocaleDateString()}</h6> */}
                      </Grid>
                    </>
                  </Grid>

                  <Grid item xs={12}>
                    <OrderCancel orderData={singleOrder} type="all" />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={12} mt={1}>
                    {/* <h6 className="reason-ordertitle">
                      Reason for Cancellation
                    </h6>
                    <div>
                      {state.map((type: any) => (
                        <div
                          key={`default-${type.id}`}
                          className="mb-3 d-flex align-items-center new-radio"
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            id={`default-${type.id}`}
                            name="address_type"
                            defaultChecked={true}
                            onChange={handleChange}
                            value={type.id}
                          />
                          <p className="form-check-label reason-text-item mx-2">
                            {type.name}
                          </p>
                        </div>
                      ))}
                      {!!errors.reason && (
                        <p className="text-danger Mui-error">{errors.reason}</p>
                      )}
                    </div> */}
                    <Form.Group
                      as={Row}
                      className="mb-3 cancel-page"
                      controlId="reason"
                    >
                      <Form.Label
                        column
                        sm="12"
                        lg="12"
                        className="reason-ordertitle"
                      >
                        Reason for Cancellation
                      </Form.Label>
                      <Col sm={12} lg={12}>
                        {state.map((type: any, index: number) => (
                          <div
                            key={`default-${type.id}`}
                            // className="mb-3 form-check d-flex align-items-center new-radio"
                            className={`mb-3 radiogroup ps-0 ${
                              index === 0 ? 'first-radio' : ''
                            }`}
                          >
                            <input
                              className="radiobtn"
                              type="radio"
                              name="reason"
                              value={type.id}
                              id={`default-${type.id}`}
                              onChange={handleChange}
                            />
                            <label className="form-check-label reason-text-item mx-2 new-radio-button">
                              {type.name}
                            </label>
                          </div>
                        ))}
                        {!!errors.reason && (
                          <p className="text-danger Mui-error">
                            {errors.reason}
                          </p>
                        )}
                      </Col>
                      <Form.Label
                        column
                        sm="12"
                        lg="12"
                        className="reason-ordertitle"
                      >
                        Comments
                      </Form.Label>
                      <Col sm={12} lg={8}>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="comment"
                          plaintext
                          className={
                            errors.comment
                              ? 'form-control input-label is-invalid'
                              : 'form-control input-label'
                          }
                          defaultValue={values.comment}
                          onChange={handleChange}
                        />
                        {!!errors.comment && (
                          <p className="text-danger Mui-error">
                            {errors.comment}
                          </p>
                        )}
                      </Col>
                    </Form.Group>
                  </Grid>
                </Grid>
                {/* <Grid container>
                  <Grid item xs={8} mt={1}>
                    <h6 className="reason-ordertitle">Comments</h6>
                    <div>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="comment"
                        placeholder="Enter First Name"
                        plaintext
                        className={
                          errors.comment
                            ? 'form-control input-label is-invalid'
                            : 'form-control input-label'
                        }
                        defaultValue={values.comment}
                        onChange={handleChange}
                      />
                      {!!errors.comment && (
                        <p className="text-danger Mui-error">
                          {errors.comment}
                        </p>
                      )}
                    </div>
                  </Grid>
                </Grid> */}
                <Grid container>
                  <Grid item md={8}>
                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-block new-cart-button-item mb-3"
                      >
                        {loading == false ? 'Cancel order' : 'Please wait...'}
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12} md={4} sm={5}>
              <Grid item xs={12} mt={3}>
                <Card className="my-profile-card">
                  <CardMedia
                    component="div"
                    sx={{
                      backgroundColor: '#F2F6F8',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      py: 3,
                      borderRadius: '8px',
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
                    <h6>{user?.email} </h6>
                    <h6>{user?.mobile_no} </h6>

                    <h4 onClick={handleClickOpen}>Change Password</h4>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} my={2}>
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: 0.96,
                    objectFit: 'contain',
                  }}
                >
                  <Image
                    src="/images/demo/static/order-conf.png"
                    fill
                    alt="icon"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} my={2}>
                <Link href="/buy">
                  <button className="order-conform-invoice1">
                    Continue Shopping
                  </button>
                </Link>
              </Grid>
            </Grid>
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
          </Grid>
        </Container>
      </section>
      <Footer />
    </>

    // </DashboardLayout>
  );
};

export default CancelOrders;
