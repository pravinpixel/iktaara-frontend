/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { errorMessage } from '@/lib/helper';
import { addToCart } from '@/redux/cart-slice';
import { update, updateBillingAddress } from '@/redux/checkout';
import Link from 'next/link';
import { GetServerSideProps } from 'next/types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BillingAdddress from 'src/components/checkout/billing-address';
import CheckOutItems from 'src/components/checkout/checkout-items';
import ShippingAddress from 'src/components/checkout/shipping-address';
import MetaTags from 'src/components/common/header/MetaTags';
import { default as api, default as cartApi } from 'src/lib/api/cart';
import homeApi from 'src/lib/api/home';
import userApi from 'src/lib/api/user';
import { processes } from 'src/lib/ccavenue';
import { RootState } from 'src/redux/store';
import ProductLayout from 'src/theme/layouts/ProductLayout';

export default function Checkout(props: any) {
  const { meta } = props;
  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };
  const dispatch = useDispatch();
  const [active] = useState(null);
  const [, setCurrentUser] = useState<number>(0);
  const [user, setUser] = useState<any>([]);
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(true);
  const [shippingError, setShippingError] = useState<any>([]);
  const [billingError, setBillingError] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiLoading, setApiLoading] = useState<boolean>(true);
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

  const paymentValidation = () => {
    if (
      Object.keys(shippingError).length == 0 &&
      Object.keys(billingError).length == 0
    ) {
      handleCheckOut();
    } else {
    }
    return false;
  };

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

  useEffect(() => {
    userApi.getMe().then((res: any) => {
      setCurrentUser(res?.id);
      const first_address: any = res?.customer_data?.customer_address[0] || [];

      setDefaultShippingAddress({
        id: first_address?.id || 0,
        first_name: first_address?.first_name || '',
        last_name: first_address?.last_name || '',
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
        email: res?.customer_data?.email,
        mobile_no: res?.customer_data?.mobile_no,
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
        customer_id: res.customer_data.id,
        customer_address: res.customer_data.customer_address,
        carts: cart.carts,
        cart_total: cart.cart_total,
        shipping_charges: cart.shipping_charges,
        shipping_address: defaultShippingAddress,
        billing_address: defaultBillingAddress,
      };
      setUser(res.customer_data);
      dispatch(update(checkoutData));
    });
  }, []);

  useEffect(() => {
    setCouponData(null);
    setApplyCoupon(null);
  }, [defaultBillingAddress]);

  return (
    <ProductLayout>
      <MetaTags meta={metaTags} />
      <section className="breadcrumbs" id="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="fa fa-home" />
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/cart">Cart</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <div className="wrapper container-fluid check-out mb-4">
        {/* <div className="d-flex align-items-center flex-md-nowrap flex-wrap container justify-content-center stepper">
          <section className="stepper-1 ">Cart</section>
          <img className="px-2" src="/images/divider.png" />
          <section className="stepper-2 active text-center">
            Place Order
          </section>
          <img className="px-2" src="/images/divider.png" />
          <section className="stepper-3">Payment</section>
        </div> */}
        <section className="w-100 container-fluid  d-flex justify-content-center check-out align-items-center gap-4 stepper-new">
          <span className="stepper-1 ">Cart</span>
          <img src="/images/divider.png" alt="divider" />
          <span className="stepper-1 active">Place Order</span>
          <img src="/images/divider.png" alt="divider" />
          <span className="stepper-1">Payment</span>
          {/* <div className="d-flex align-items-center container  stepper w-100">
            <span className="stepper-1 active px-5">Cart</span>
            <img className="px-5" src="/images/divider.png" />
            <span className="stepper-2 px-5">Place Order</span>
            <img className="px-5" src="/images/divider.png" />
            <span className="stepper-3 px-5">Payment</span>
          </div> */}
        </section>
        {/* Steps */}

        <div className="row">
          {/* Shipping Address */}

          <div className="col-md-5 col-sm-12 place-out-cart">
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
              sameAsShipping={sameAsShipping}
              shippingValidationError={shippingValidationError}
              changeShippingAddress={updateShippingAddress}
              setBillingSame={setBillingSame}
            />
            <BillingAdddress
              defaultAddress={defaultBillingAddress}
              sameAsShipping={sameAsShipping}
              shippingAddress={shippingAddress}
              updateBillingInfo={updateBillingInfo}
              billingValidationError={billingValidationError}
            />
          </div>

          <div className="col-md-7 col-sm-12 rounded orderSummery px-md-5 py-3">
            <CheckOutItems />
            <section className="py-2 shipping">
              <div className="d-flex justify-content-between w-100 ">
                <p className="shipping-title">Shipping</p>
              </div>

              <Form.Group className="checkout-shipping-group">
                {/* <Form.Check
                  type="radio"
                  id={'shipping'}
                  name="shipping"
                  label={'Express Shipping'}
  /> */}
                {/* <div className={`d-flex flex-row justify-content-between rounded  p-2 ${active=="Express"?"bg-white":""} align-items-center`}>
                <Form.Check
                  checked
                  className='m-0'
                  value={"Express"}
                  type="radio"
                  id={'address'}
                  onChange={(e)=>{

                  }}
                  
                  color='black'
                  name="address"
                  label={'Express Shipping '}
                />
                <span>000000</span>
              </div> */}
                <div
                  className={`d-flex flex-row justify-content-between rounded-3 px-3 ${
                    !(active == 'Standard') ? 'bg-white' : ''
                  } align-items-center`}
                >
                  <Form.Check
                    checked
                    type="radio"
                    id={'address'}
                    value={'Standard'}
                    className="mt-3"
                    // onSelect={(e)=>{
                    //   setActive(e.target.value)
                    //                     }}
                    color="black"
                    name="address"
                    label={'Standard Shipping '}
                  />
                  {/* <span>000000</span> */}
                </div>
                <br />
              </Form.Group>
              <div className="d-flex justify-content-between w-100 ">
                <p className="shipping-title">Apply Code</p>
              </div>
              <Form.Group className="coupon-input w-100 d-flex">
                <Form.Control
                  type="text"
                  id="coupon_code"
                  placeholder="Enter Coupon Code"
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
                    className="bg-black"
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
                    className="bg-black"
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
              <hr className="mt-4" />

              <div className="d-flex align-items-center justify-content-between">
                <p className="shipping-sub-content shipping-sub-content-one ">
                  Sub Total
                </p>
                <p className="shipping-sub-content-total mx-2">
                  Rs. {cartTotal.product_tax_exclusive_total}
                </p>
              </div>

              <div className="d-flex align-items-center justify-content-between ">
                <p className="shipping-sub-content shipping-sub-content-two">
                  Taxes
                </p>
                <p className="shipping-sub-content-total mx-2">
                  Rs. {cartTotal.tax_total}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between ">
                <p className="shipping-sub-content shipping-sub-content-two">
                  Shipping Charges
                </p>
                <p className="shipping-sub-content-total mx-2">
                  Rs. {cartTotal.shipping_charge}
                </p>
              </div>

              {/* {couponData && (
                <div className="d-flex align-items-center justify-content-between">
                  <p className="shipping-sub-content shipping-sub-content-one ">
                    Grand Total{' '}
                  </p>
                  <p className="shipping-sub-content-total mx-2">
                    {couponData?.coupon_info?.coupon_applied_amount}
                  </p>
                </div>
              )} */}
              {couponData && (
                <div className="d-flex align-items-center justify-content-between">
                  <p className="shipping-sub-content shipping-sub-content-one ">
                    Discount Code{' '}
                    <span style={{}}>({couponData?.coupon_code})</span>
                  </p>
                  <p className="shipping-sub-content-total mx-2">
                    <span
                      style={
                        {
                          // textDecoration: 'line-through',
                        }
                      }
                    >
                      Rs.{' '}
                      {!isNaN(Number(couponData?.coupon_amount))
                        ? Number(couponData?.coupon_amount)
                        : 0}{' '}
                    </span>
                    {/* {couponData?.coupon_info?.coupon_type?.discount_type ===
                    'percentage' ? (
                      <>
                        {!isNaN(
                          Number(
                            couponData?.coupon_info?.coupon_type
                              ?.discount_value,
                          ),
                        )
                          ? Number(
                              couponData?.coupon_info?.coupon_type
                                ?.discount_value,
                            )
                          : 0}{' '}
                        %
                      </>
                    ) : (
                      <span
                        style={{
                          textDecoration: 'line-through',
                        }}
                      >
                        Rs.{' '}
                        {!isNaN(
                          Number(
                            couponData?.coupon_info?.coupon_type
                              ?.discount_value,
                          ),
                        )
                          ? Number(
                              couponData?.coupon_info?.coupon_type
                                ?.discount_value,
                            )
                          : 0}{' '}
                      </span>
                    )} */}
                  </p>
                </div>
              )}
            </section>
            <hr />
            <section className="d-flex justify-content-between total">
              <p className="shipping-title shipping-title-new-1">Total</p>
              <p className="shipping-sub-content-total mx-2">
                {' '}
                Rs. {cartTotal.total}
              </p>
            </section>
            <section className="text-md-end text-center my-4">
              {Object.keys(shippingError).length == 0 &&
              Object.keys(billingError).length == 0 ? (
                <Link
                  // type='button'
                  href={'#!'}
                  className="btn custom_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!loading || !apiLoading) {
                      paymentValidation();
                    }
                  }}
                >
                  {loading || apiLoading ? 'Loading ...' : 'Place Order'}
                </Link>
              ) : (
                <>
                  <Link
                    href={'/'}
                    className="btn custom_btn disabled"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Place Order
                  </Link>
                  <br />
                  <p className="text-danger">
                    *Kindly update the shipping address in order to proceed with
                    the payment.{' '}
                  </p>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await homeApi
    .getMetaData({ page: 'checkout-page' })
    .then((res: any) => {
      if (res?.error == 0 && res?.status_code == 200) {
        return {
          title: res?.data?.meta_title || 'Checkout Page | Iktaraa',
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
