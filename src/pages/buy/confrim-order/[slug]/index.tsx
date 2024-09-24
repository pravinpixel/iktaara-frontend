import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import api from 'src/lib/api/cart';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProductLayout from '@/theme/layouts/ProductLayout';

export default function Payments() {
  const [orderDetails, setOrdersDetails] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await api.getOrderSuccess({
        order_no: 'IKTARAA-ORD-001146',
      });
      setOrdersDetails(response);
    } catch (error) {
      setOrdersDetails(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (router.query.slug) {
      fetch();
    }
  }, [router]);
  return (
    <>
      <ProductLayout>
        <Head>
          <title> Order | IKaraa Store</title>
          <meta name="description" content="" />
        </Head>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center p-5"
            style={{
              height: '400px',
              width: '100%',
            }}
          >
            <Spinner />
          </div>
        ) : (
          <>
            {orderDetails ? (
              <section className="placeorder mb-5" id="placeorder">
                <section className="d-flex flex-column justify-content-center align-items-center">
                  <div className="container">
                    <div className="row ">
                      <div className="d-flex justify-content-center w-100 ">
                        {/* <div className="bg-imge ">
                      <Image src="/images/Checkmark.png" alt="" />
                    </div> */}
                      </div>
                      <div className="d-flex justify-content-center w-100 bg-placeorderHead">
                        <div>
                          <h3>Thank you {orderDetails?.shipping_name},</h3>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center w-100 placeorderContent">
                        <div>
                          <p>
                            Your order # {orderDetails?.order_no} has been
                            recieved
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-12 ">
                        <div className="d-flex mt-2  align-items-center justify-content-center  cg-box">
                          <div className="w-100 row">
                            <div className="cg-address col-lg-8 md-6 sm-12 xs-12 ">
                              <div className="flex-column mt-2">
                                <p>{orderDetails?.shipping_name} </p>
                                <p>{orderDetails?.shipping_address_line1}</p>
                                <p>
                                  {orderDetails?.shipping_city},{' '}
                                  {orderDetails.shipping_state}
                                </p>
                                <p>{orderDetails?.shipping_post_code}</p>
                              </div>
                            </div>
                            <div className=" col-lg-4 md-6 sm-12 xs-12 mt-2">
                              <div className=" order-align">
                                <span className="payment ">Order Id: </span>
                                <span className="date">
                                  {orderDetails?.order_no}
                                </span>
                              </div>
                              <div className="order-align">
                                <span className="payment">Email : </span>
                                <span className="date">
                                  {orderDetails.email}
                                </span>
                              </div>
                              <div className="order-align">
                                <span className="payment">Total Amount : </span>
                                <span className="date">
                                  Rs: {orderDetails.total_amount} /-
                                </span>
                              </div>

                              <div className="order-align">
                                <span className="payment">
                                  Transaction Id:{' '}
                                </span>
                                <span className="dateid ">
                                  {orderDetails.payment_transaction_id}
                                </span>
                              </div>
                              <div className="order-align">
                                <span className="payment">
                                  Delivery Expected :{' '}
                                </span>
                                <span className="date">
                                  {orderDetails.delivery_date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-column placeorder-button px-4 align-items-center">
                        <div className="d-flex justify-content-center w-100 placeorderview mt-5">
                          <Link
                            className="text-dark new-link"
                            href={'/dashboard/my-orders'}
                          >
                            {' '}
                            View more detailed information about your orders
                          </Link>
                        </div>
                        <div className="col-lg-4 mt-3">
                          <Link
                            href={'/'}
                            className="btn bg-Continue  btn-block new-cart-button"
                          >
                            Continue Shopping
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            ) : (
              <div
                className="d-flex justify-content-center align-items-center p-5"
                style={{
                  height: '400px',
                  width: '100%',
                }}
              >
                <h3>No Orders Found</h3>
              </div>
            )}
          </>
        )}
      </ProductLayout>
    </>
  );
}
