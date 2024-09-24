/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prettier/prettier */
import OrderConfrimPopup from '@/components/dashboard/order-cancel-popup';
import CustomizedSteppers from '@/components/tracking';
import { addUser } from '@/redux/user-slice';
import { Rating } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Fragment,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/cart';
import userApi from 'src/lib/api/user';
import DashboardLayout from 'src/theme/layouts/DashboardLayout';

const MyOrders = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Array<any>>([]);
  const [sort, setSort] = useState('desc');
  const [cancelPopup, setCancelPopup] = useState<boolean | null | string>(
    false,
  );

  const [trackingShow, setTrackingShow] = useState(null);
  const [ratings, setRatings] = useState({
    rating: 5,
    comments: '',
  });
  const [cancelOrder, setCancelOrder] = useState<string | any>(null);
  const [singleOrder, setSingleOrder] = useState<any>(null);
  const [loagged, setLoagged] = useState<boolean>(false);
  const dispatch = useDispatch();
  const u = loagged ? (session as unknown as any) : null;
  const user_id: number | null = u?.user?.user_id;

  const getOrders = async () => {
    await api.getOrderList({ customer_id: user_id, sort }).then((res: any) => {
      if (res?.status_code === 200) {
        setOrders(res.data);
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
        router.push('/dashboard/orders/exchange/' + singleOrder.item_id);
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
        router.push('/dashboard/orders/cancel/' + singleOrder.item_id);
        setCancelPopup(null);
      }
    },
    [cancelOrder],
  );
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

  return (
    <>
      <DashboardLayout
        active={[
          {
            link: '/dashboard/my-orders',
            string: 'Orders',
          },
        ]}
      >
        <div className="outlet-child-1" />
        {/* <div></div> */}
        <div className="outlet-child-2">
          <div className="d-flex flex-column align-items-center justify-content-center w-100 my-order-0">
            <div className="d-flex justify-content-between w-100 myprofile-top myprofile-top-width-2 row">
              <p className="myprofile-para col-6">
                <img src="/profile/orders.png" alt="" className="px-1" />
                My Orders
              </p>
              <div className="myprofile-cursor col-6 text-end">
                <span
                  // href={'#!'}
                  className="span"
                  onClick={() => {
                    setSort(sort === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  Sort By
                </span>
                <Image src="/images/profile/sort.png" alt="sort" />
              </div>
            </div>
            <div className=" rounded d-flex w-100 h-100 row">
              <div className="col">
                <div className="bg-white d-flex flex-column gap-2 my-ordersnew">
                  {orders.length == 0
                    ? 'No orders yet!'
                    : orders.map((order: any) => {
                        return (
                          <Fragment key={order.id}>
                            <div>
                              {order?.items.length == 0
                                ? 'No Orders'
                                : order.items.map((item: any) => {
                                    const created_at = new Date(
                                      item.created_at,
                                    );
                                    const date = new Date(item.created_at);
                                    const deliveryDate = date.getDate() + 7;
                                    date.setDate(deliveryDate);
                                    return (
                                      <Fragment key={item.product_id}>
                                        <div className="d-flex gap-2 flex-wrap my-2 flex-md-nowrap justify-content-md-between justify-content-center">
                                          <div className="d-flex gap-2 justify-content-center align-items-center align-items-md-start flex-column flex-md-row">
                                            <div
                                              className="order-img order-img-new1 cursor-pointer"
                                              role="button"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                router.replace(
                                                  '/product/' +
                                                    item.product_url,
                                                );
                                              }}
                                            >
                                              <Image
                                                src={item.image}
                                                alt={item.product_name}
                                                className="img"
                                              />
                                            </div>
                                            <div
                                              role="button"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                router.replace(
                                                  '/product/' +
                                                    item.product_url,
                                                );
                                              }}
                                              className="text-start  w-100 d-flex flex-column align-items-center align-items-md-start "
                                            >
                                              <p className="myorders-prodname myorders-prodname-new text-center text-md-start cursor-pointer  myorders-prodname-new-pexel">
                                                {item.product_name}
                                              </p>
                                              <p className="myorders-quantity">
                                                QTY: {item.quantity}
                                              </p>
                                              <p className="myorders-price myorders-price-new myorders-price-new-pexel">
                                                RS. {item.price}/-
                                              </p>
                                            </div>
                                          </div>

                                          <div className="d-flex flex-row flex-md-column  gap-2  w-100 flex-wrap flex-md-nowrap justify-content-center justify-content-start">
                                            <div className="d-flex  status-flex">
                                              <p className="myorders-status text-center text-md-start">
                                                Status
                                              </p>
                                              <p className="myorders-transit text-center text-md-start ">
                                                {item.status}
                                              </p>
                                            </div>

                                            <div className="d-flex flex-row flex-md-column  gap-3">
                                              <div className="d-flex flex-column">
                                                <p className="myorders-status">
                                                  Ordered Date
                                                </p>
                                                <p className="myorders-delivery text-center text-md-start">
                                                  {created_at.toLocaleDateString()}
                                                </p>
                                              </div>

                                              {item.status_id == 1 ||
                                              item.status_id == 2 ||
                                              item.status_id == 4 ||
                                              item.status_id == 8 ? (
                                                <div className="d-flex flex-column">
                                                  <p className="myorders-status">
                                                    Delivery Expected
                                                  </p>
                                                  <p className="myorders-delivery text-center text-md-start">
                                                    {date.toLocaleDateString()}
                                                  </p>
                                                </div>
                                              ) : (
                                                ''
                                              )}
                                            </div>
                                          </div>
                                          {/* {index === 0 ? ( */}
                                          <section
                                            className="text-start  d-flex
                                                flex-row flex-md-column gap-1 w-100 flex-wrap justify-content-center justify-content-md-start"
                                          >
                                            <Link
                                              href={order.invoice_file}
                                              target="_blank"
                                              className="new-flex new-flex-new"
                                            >
                                              <i className="fa-solid fa-file"></i>
                                              <span className="myaddress-span">
                                                Invoice{' '}
                                              </span>
                                            </Link>

                                            <>
                                              {item.status_id == 5 &&
                                                item?.reviews?.length == 0 && (
                                                  <div
                                                    className="new-flex new-flex-new new-flex-new-rating"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      handleCancelPopUp(
                                                        order,
                                                        'rating',
                                                        item,
                                                      );
                                                    }}
                                                  >
                                                    <i className="fa-solid fa-star "></i>
                                                    <span className="myaddress-span cursor-pointer">
                                                      Rating{' '}
                                                    </span>
                                                  </div>
                                                )}
                                              <div
                                                role="button"
                                                className="myaddress-cancel new-flex d-flex"
                                                onClick={() => {
                                                  setTrackingShow((state) => {
                                                    return state ===
                                                      item.item_id
                                                      ? null
                                                      : item.item_id;
                                                  });
                                                }}
                                              >
                                                <div className="d-flex align-items-center new-track-1">
                                                  <Image
                                                    src="/icons/profile/placemaker.png"
                                                    alt="placemaker"
                                                  />
                                                </div>
                                                <span className="myaddress-span">
                                                  Track Order
                                                </span>
                                              </div>

                                              {item.status_id == 1 ||
                                              item.status_id == 2 ||
                                              item.status_id == 8 ? (
                                                <div
                                                  role="button"
                                                  onClick={() => {
                                                    handleCancelPopUp(
                                                      order,
                                                      'cancel',
                                                      item,
                                                    );
                                                  }}
                                                  className="myaddress-cancel new-flex"
                                                >
                                                  <div className="d-flex align-items-center new-track-1">
                                                    <Image
                                                      src="/icons/profile/Close.png"
                                                      alt="Close"
                                                    />
                                                  </div>
                                                  <span className="myaddress-span">
                                                    Cancel Order{' '}
                                                  </span>
                                                </div>
                                              ) : null}

                                              {item.status_id == 5 && (
                                                <div
                                                  role="button"
                                                  className="myaddress-cancel new-flex"
                                                  onClick={() => {
                                                    handleCancelPopUp(
                                                      order,
                                                      'exchange',
                                                      item,
                                                    );
                                                  }}
                                                >
                                                  <div className="d-flex align-items-center new-track-1">
                                                    <Image
                                                      src="/icons/profile/return-icon.png"
                                                      alt="return"
                                                    />
                                                  </div>

                                                  <span className="myaddress-span">
                                                    Exchange Order
                                                  </span>
                                                </div>
                                              )}
                                            </>
                                          </section>
                                        </div>
                                        {trackingShow === item.item_id &&
                                          item?.tracking?.length > 0 &&
                                          item?.tracking?.[0]?.active && (
                                            <CustomizedSteppers
                                              tracking={item.tracking}
                                            />
                                          )}
                                        {trackingShow === item.item_id &&
                                          item?.merchant_shipment && (
                                            <>
                                              {item?.merchant_shipment
                                                .shipment_tracking_code !==
                                                '' &&
                                              item?.merchant_shipment
                                                .shipment_tracking_code ? (
                                                <p className="">
                                                  <span className=" myorders-delivery">
                                                    Tracking Code :{' '}
                                                  </span>{' '}
                                                  <p className="myorders-status">
                                                    {
                                                      item?.merchant_shipment
                                                        .shipment_tracking_code
                                                    }
                                                  </p>
                                                </p>
                                              ) : (
                                                ''
                                              )}
                                              {item?.merchant_shipment
                                                .shipment_tracking_message !==
                                                '' &&
                                              item?.merchant_shipment
                                                .shipment_tracking_message ? (
                                                <p className="mt-3">
                                                  <span className="myorders-delivery">
                                                    Message :{' '}
                                                  </span>{' '}
                                                  <p className=" myorders-status myorders-status-message">
                                                    {
                                                      item?.merchant_shipment
                                                        ?.shipment_tracking_message
                                                    }
                                                  </p>
                                                </p>
                                              ) : (
                                                ''
                                              )}
                                            </>
                                          )}
                                      </Fragment>
                                    );
                                  })}
                            </div>

                            <hr className="myaddress-line-one" />
                          </Fragment>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
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
      </DashboardLayout>
    </>
  );
};

export default MyOrders;
