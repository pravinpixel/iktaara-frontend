/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useCallback, useReducer } from 'react';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartButton from './cart-button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Box, Link, Menu, MenuItem, Rating } from '@mui/material';
import api from '@/lib/api/product';
import { useFormik } from 'formik';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import React from 'react';
import Image from 'next/image';

function SalesPrice(props: any) {
  const { product } = props;

  return (
    <>
      <div className="priceSection">
        <div className="d-flex flex-wrap gap-2">
          {product?.sale_prices?.strike_rate !== '0.00' && (
            <div
              className="priceSection-mrp-strike"
              style={{
                color: '#db2e2e',
                fontWeight: '600',
              }}
            >
              MRP : ₹{product?.sale_prices?.strike_rate} /-
            </div>
          )}
          {product?.sale_prices?.overall_discount_percentage !== 0 && (
            <p
              className="new-prod"
              style={{
                color: '#000',
                fontWeight: '600',
              }}
            >
              {product?.sale_prices?.overall_discount_percentage}% off
            </p>
          )}
        </div>

        <div className="priceSection-mrp-price">
          <span>₹</span>
          {product?.sale_prices?.price}
        </div>
        <div></div>
      </div>
    </>
  );
}

function StockStatus({ product }: any) {
  if (product?.stock_status == 'out_of_stock') {
    return (
      <>
        <div className="stock-comments  py-2">
          <Image
            src="/images/collections/static/Group 6975.png"
            alt={'collections'}
            width="36"
            height="36"
            className="stock-status"
          />
          Comming Soon
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="stock-comments">
          <Image
            src="/images/collections/static/Group 6975.png"
            alt={'collections'}
            width="36"
            height="36"
            className="stock-status"
          />
          In Stock &amp; Ready to ship
        </div>
      </>
    );
  }
}

enum UpdateKind {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}
interface Qtystate {
  qty: number;
}
interface QtcAction {
  type: UpdateKind;
  payload: number;
}

function updateQuantityReducer(state: Qtystate, action: QtcAction) {
  const { type, payload } = action;
  switch (type) {
    case UpdateKind.INCREASE:
      return {
        ...state,
        qty: state.qty + payload,
      };
    case UpdateKind.DECREASE:
      if (state.qty > 1) {
        return {
          ...state,
          qty: state.qty - payload,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

type PropsType = {
  product: any;
};

const ProductIntro = (props: PropsType) => {
  const phoneNumber = 9940046621;
  const { product } = props;
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state] = useReducer(updateQuantityReducer, { qty: 1 });
  //const productStatus: Boolean = product.status == 'in-stock' ? true : false;

  function handleAddToCompare(product: any) {
    const category = String(product.parent_category_slug);
    let oldProducts: any = localStorage.getItem(category) || '[]';
    oldProducts = JSON.parse(oldProducts);
    const newProduct: any = oldProducts.filter((prod: any) => {
      return prod.id !== product.id;
    });
    if (product?.attributes.length >= 1) {
      newProduct.push(product);
    }
    window.localStorage.setItem(category, JSON.stringify(newProduct));
    router.push({
      pathname: '/product/comparision',
      query: {
        category: category,
      },
    });
  }

  const handlePincodeCheck: any = useCallback((values: any) => {
    api
      .pincodeChargeCheck(values)
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error, 'Error');
      });
  }, []);

  const {} = useFormik({
    onSubmit: handlePincodeCheck,
    initialValues: {
      pincode: '',
      price: product?.sale_prices?.price_original,
      product_id: product?.id,
    },
    // validationSchema: formSchema,
  });

  return (
    <>
      <section className="breadcrumbs-singleView" id="breadcrumbs">
        <div className="row">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              {/* <i className="fa fa-home"></i> */}
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href={'/category/' + product?.category_slug}>
              {product?.category_name}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{product?.product_name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </section>
      {product && (
        <>
          <Row className="product-detailsHead justify-content-between  align-top">
            <Col md={12}>
              <Image
                src={product?.brand_logo}
                width={90}
                height={40}
                alt={product?.product_name}
                className="brands-img"
              />
            </Col>
            <Col md={12}>
              <h1 className="title">{product?.product_name}</h1>
            </Col>
            <SalesPrice product={product}></SalesPrice>
            <Col md={12}>
              {product?.ratings && (
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="ratingCtr d-flex align-items-center "
                >
                  <Rating
                    value={product?.ratings}
                    precision={0.5}
                    className="p-none"
                  />
                  <span className="mb-1">{product?.ratings}</span>
                </Stack>
              )}
            </Col>
            <Col md={12} className="d-flex justify-content-end">
              <div className="d-flex gap-1 align-items-center add-to-compare p-0  d-none">
                <div className="p-0">
                  <img src="/icons/compare-git.png" alt="" />
                </div>
                <button
                  className="compare-button p-0 "
                  onClick={() => handleAddToCompare(product)}
                >
                  Add to Compare
                </button>
              </div>
            </Col>
          </Row>

          <p
            className="paragraph-Ctr"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          ></p>

          <Row className="align-items-center product-detailsHead">
            <Col md={6}>
              <StockStatus product={product} />
            </Col>
          </Row>

          <div className="view-icon">
            <Image
              src="/images/collections/static/View.png"
              alt={'View'}
              width="29"
              height="29"
              className="view-icon-status"
            />
            {product?.views_count} views this month
          </div>
          <CartButton product={product} quantity={state.qty} />
          <div className="cart-button-bg d-flex gap-1 gap-md-3">
            <div className="cart-button-text">
              <Link href={`https://wa.me/+91${phoneNumber}`} target="_blank">
                <Image
                  src="/images/collections/static/Vector.png"
                  alt={'Vector'}
                  width="22"
                  height="22"
                  className="view-icon-status"
                />
                <span className="enquire-text">Enquire</span>
              </Link>
            </div>
            <div className="cart-button-text">
              <a href={'tel:' + phoneNumber} target="_blank">
                <Image
                  src="/images/collections/static/Union.png"
                  alt="Union"
                  width="22"
                  height="22"
                  className="view-icon-status"
                />
              </a>
              <Box sx={{ display: { md: 'block', xs: 'none' } }}>
                <span
                  className="desktop-device"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  {phoneNumber}
                </span>

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
                    <Link href={`skype:+91${phoneNumber}?call`} target="_blank">
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
        </>
      )}
    </>
  );
};

export default ProductIntro;
