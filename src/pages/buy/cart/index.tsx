/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useRouter } from 'next/router';
// import CartItem from 'src/components/cart/cart-items';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { Col, Row, Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/home';
import { RootState } from 'src/redux/store';
// import Header from '@/components/common/header/Header';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import Footer from '@/components/common/footer/Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import TopSeller from '@/components/brands/TopSeller';
// import ProductListCollection from '@/components/categoryproduct/ProductListCollection';
import { useSiteInfo } from '@/context/SiteInfoContext';
import { axiosInstance } from '@/lib/api/base';
// import { openPopup } from '@/redux/user-slice';
import ImageComponent from '@/utils/imageComponent';
import dynamic from 'next/dynamic';
// import MetaTags from '@/components/common/header/MetaTags';
const Header = dynamic(() => import('@/components/common/header/Header'));
const Footer = dynamic(() => import('@/components/common/footer/Footer'));
const TopSeller = dynamic(() => import('@/components/brands/TopSeller'));
const ProductListCollection = dynamic(
  () => import('@/components/categoryproduct/ProductListCollection'),
);
const MetaTags = dynamic(() => import('@/components/common/header/MetaTags'));
const CartItem = dynamic(() => import('@/components/cart/cart-items'));

interface User {
  user_id: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const faq = [
  {
    id: 1,
    answer:
      'If an acoustic piano is played with the damper pedal depressed, it not only causes the sounds played on the keyboard',
    question: 'What is virtual resonance modeling (VRM)?',
  },
  {
    id: 2,
    answer:
      'To select the perfect pianica online, consider your skill level, budget, and desired features. Look for reputable brands, read customer reviews, and choose a model that aligns with your musical preferences.',
    question: 'How do I choose the right pianica online?',
  },
];

const Cart = (props: any) => {
  const phoneNumber = 9940046621;
  const { meta } = props;
  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };

  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [expanded, setExpanded] = useState(0);
  const cartTotal = useSelector((state: RootState) => state.cart.cart_total);
  const { status, data } = useSession();
  const { carts, out_of_stock, stock_staus } = useSelector(
    (state: RootState) => state.cart,
  );

  const data1: User = data?.user as unknown as User;

  const handleAccordionChange =
    (panel: any) => (event: any, isExpanded: any) => {
      setExpanded(isExpanded ? panel : false);
    };

  // if (router.isFallback) {
  //   return <h1>Loading...</h1>;
  // }

  const handleCheckOut = async () => {
    if (status == 'authenticated') {
      if (out_of_stock || stock_staus) {
        toast.info('Please remove out of stock product');
      } else {
        router.push('/buy/checkout');
      }
    } else {
      router.push('/buy/cart?login=enable&callback=/buy/checkout');
      // dispatch(openPopup());
    }
  };
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userId = data1?.user_id;
  const [topSeller, setTopSeller] = useState([]);
  const [recentlyView, setRecentlyView] = useState([]);
  const { Uuid }: any = useSiteInfo();

  const emptyCart = async () => {
    if (userId || Uuid) {
      const dataID = userId ? { customer_id: userId } : { guest_token: Uuid };
      try {
        const response = await axiosInstance().post(
          '/api/get/recent/view',
          dataID,
        );
        const resData = response;

        setRecentlyView(resData?.data?.data?.recently_viewed_products);
        return resData;
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    }
  };

  const emptyCartWithoutUser = async () => {
    try {
      const response = await axiosInstance().get('/api/top-selling-products');
      const resData = response;
      setTopSeller(resData?.data?.data?.top_selling_products);
      return resData;
    } catch (error) {
      console.error('Error fetching brand data:', error);
    }
  };

  useEffect(() => {
    emptyCart();
    emptyCartWithoutUser();
  }, [Uuid, userId]);

  return (
    <>
      <Header />
      <MetaTags meta={metaTags} />
      <div className="my-profile-title-cart">
        <h5>My Cart</h5>
      </div>
      <section className="cart">
        {carts?.length > 0 ? (
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
          >
            <div className="row my-4">
              <>
                <CartItem />
                <div className="col-md-6 offset-md-6 offset-lg-0 col-lg-4">
                  <div className="d-flex justify-content-between">
                    <p className="cart-Summary cart-sum">Order Summary</p>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="subtotal-items">{carts.length} Items </h6>
                      <h6 className="total-amount-items">
                        <span>₹</span>
                        {cartTotal.product_tax_exclusive_total}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="subtotal-items">Sub Total </h6>
                      <h6 className="total-amount-items">
                        <span>₹</span> {cartTotal.product_tax_exclusive_total}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="subtotal-items">Taxes </h6>
                      <h6 className="total-amount-items">
                        <span>₹</span> {cartTotal.tax_total}
                      </h6>
                    </div>
                    <hr />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="total-items">Total</h6>
                    <h6 className="total-amount1-items text-end">
                      <span>₹</span>
                      {cartTotal.total}
                    </h6>
                  </div>
                  <div className="d-flex flex-column cart-button ">
                    {cartTotal.total == '0.00' ? (
                      ''
                    ) : (
                      <button
                        onClick={() => {
                          handleCheckOut();
                        }}
                        className="btn bg-addtocheck p-2 btn-block"
                      >
                        Checkout
                      </button>
                    )}
                    <button
                      onClick={() => {
                        router.back();
                      }}
                      className="btn bg-buyshopping  btn-block "
                    >
                      Continue Shopping
                    </button>
                  </div>
                  <div className="cart-list-description">
                    <Stack direction="horizontal" gap={2}>
                      <div>
                        {/* <ImageComponent
                          src="/images/collections/static/Group 6961.png"
                          alt=""
                        /> */}
                        <ImageComponent
                          src="/images/collections/static/experience-group.png"
                          width={91}
                          height={91}
                          alt="share"
                          priority={true}
                        />
                      </div>
                      <div className="Cart-boxbg">
                        <p className="cart-store-title">
                          Experience In-Store Like Buying Experience
                        </p>
                        <div className="cart-store-para">
                          <p className="expert-cart-title">
                            Get expert advice on choosing the right instrument.
                          </p>
                          <div className="number-style">
                            <p className="expert-cart-title">
                              Talk to our product expert at
                            </p>
                          </div>
                          <Box sx={{ display: { md: 'none', xs: 'block' } }}>
                            {/* <Link
                              href="tel:+9940046621"
                              target="_blank"
                              className="mobile-cart"
                            > */}
                            {phoneNumber}
                            {/* </Link> */}
                          </Box>
                          <Box sx={{ display: { md: 'block', xs: 'none' } }}>
                            {/* <span
                              className="desktop-device"
                              id="basic-button"
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleClick}
                            > */}
                            {phoneNumber}
                            {/* </span> */}

                            <Menu
                              id="basic-menu"
                              className="menu-styles"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                'aria-labelledby': 'basic-button',
                              }}
                            >
                              <MenuItem onClick={handleClose}>
                                <Link
                                  href={`https://wa.me/+91${phoneNumber}`}
                                  target="_blank"
                                >
                                  <WhatsAppIcon className="wattsappIcon" />
                                </Link>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <Link
                                  href={`skype:+91${phoneNumber}?call`}
                                  target="_blank"
                                >
                                  <Image
                                    src="/images/skype.svg"
                                    alt="skype"
                                    height={35}
                                    width={35}
                                  />
                                </Link>
                              </MenuItem>
                            </Menu>
                          </Box>
                        </div>
                      </div>
                    </Stack>
                  </div>
                  <div className="review-options mb-3">
                    <p className="review-options-title">Reasons to choose us</p>
                    <div className="product-image-review">
                      <Image
                        src="/images/collections/static/Group 6962.png"
                        alt="secured_shipping"
                        width="16"
                        height="16"
                        className="review-contents"
                      />
                      {/* 100% money back warranty */}
                      Secured shipping
                    </div>
                    <div className="product-image-review">
                      <Image
                        src="/images/collections/static/Group 6962.png"
                        alt="expert_service"
                        width="16"
                        height="16"
                        className="review-contents"
                      />
                      {/* Free & fast delivery */}
                      24/7 expert service
                    </div>
                    <div className="product-image-review">
                      <Image
                        src="/images/collections/static/Group 6962.png"
                        alt="genuine_products"
                        width="16"
                        height="16"
                        className="review-contents"
                      />
                      {/* All products are the best quality */}
                      Genuine products
                    </div>
                    <div className="product-image-review">
                      <Image
                        src="/images/collections/static/Group 6962.png"
                        alt="standard_warranty"
                        width="16"
                        height="16"
                        className="review-contents"
                      />
                      {/* 24/7 support */}
                      Standard warranty
                    </div>
                  </div>
                  <div className="d-flex d-md-none mb-2">
                    <Row>
                      <Col xs={12}>
                        <h6 className="brands-cart-title">
                          Frequently Asked Questions
                        </h6>
                      </Col>
                      <Col xs={12} className="catogory-accordin">
                        {faq?.map((item: any, index: any) => (
                          <Accordion
                            sx={{ mb: 1 }}
                            expanded={expanded === index}
                            onChange={handleAccordionChange(index)}
                            key={item.id}
                            className={
                              expanded === index
                                ? 'selected-accordion'
                                : 'unselected-accordion'
                            }
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography className="brands-faq-head">
                                {item.question}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography className="brands-faq-head-sub">
                                {item.answer}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </Col>
                    </Row>
                  </div>
                </div>
              </>
            </div>
          </Container>
        ) : (
          <>
            <div className="mt-3">
              <h6 className="text-center cart-yest">
                You haven’t made a choice yet.
              </h6>
              {topSeller?.length > 0 && (
                <TopSeller
                  title="Top Sellers"
                  data={topSeller}
                  type="cart-topseller"
                />
              )}

              {recentlyView?.length > 0 && (
                <ProductListCollection
                  title="Recently Viewed"
                  data={recentlyView}
                  type="cart-topseller"
                />
              )}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Cart;
export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api.getMetaData({ page: 'cart-page' }).then((res: any) => {
    if (res?.error == 0 && res?.status_code == 200) {
      return {
        title: res?.data?.meta_title || 'Cart | Iktaraa',
        keywords: res?.data?.meta_keywords || '',
        description: res?.data?.meta_description || '',
        image:
          res?.data?.meta_image || res?.data?.logo || '/public/images/logo.svg',
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
