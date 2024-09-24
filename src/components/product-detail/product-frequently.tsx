/* eslint-disable react-hooks/exhaustive-deps */
import { addToCart } from '@/redux/cart-slice';
import ImageComponent from '@/utils/imageComponent';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Button, Grid, Link, Menu, MenuItem } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
import 'react-18-image-lightbox/style.css';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSiteInfo } from 'src/context/SiteInfoContext';
import api from 'src/lib/api/cart';
import '../../../node_modules/keen-slider/keen-slider.min.css';

interface AddToCart {
  // quantity: number;
  guest_token: string;
  products: [
    {
      id: number;
      strike_rate: number | string;
      strike_rate_original: number | string;
      price: number | string;
      price_original: number | string;
      discount: any;
      overall_discount_percentage: number | string;
    },
  ];
}

const ProductFrequently = (props: any) => {
  const dispatch = useDispatch();
  const phoneNumber = 9940046621;
  const { product } = props;
  // const attributes: any = product.product?.attributes || null;
  const { Uuid }: any = useSiteInfo();

  // const gallery: any = product?.gallery || [];
  const combo_products: any = product?.combo_products || [];

  const imageSections = [
    {
      id: 1,
      imageIcon: '/images/collections/dynamic/image 90.png',
    },
    {
      id: 2,
      imageIcon: '/images/collections/dynamic/image 91.png',
    },
    {
      id: 3,
      imageIcon: '/images/collections/dynamic/image 92.png',
    },
  ];

  // const [photoIndex, setPhotoIndex] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedProducts, setSelectedProducts] = useState<number[]>(() => {
    return combo_products.map((product: any) => product.id);
  });

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  // const goToPrevious = () =>
  //   setPhotoIndex((photoIndex + gallery.length - 1) % gallery.length);
  // const goToNext = () => setPhotoIndex((photoIndex + 1) % gallery.length);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [totalSum, setTotalSum] = useState(0);
  const checkedItemCount = selectedProducts.length;
  useEffect(() => {
    let sum = 0;
    combo_products.forEach((product: any) => {
      const formattedNumber = product?.sale_prices?.price;
      const temp = parseFloat(formattedNumber.replace(/,/g, ''));
      sum += temp || 0;
    });
    setTotalSum(sum);
  }, [combo_products]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    product: any,
  ) => {
    const isChecked = event.target.checked;
    const productId = product.id;

    if (isChecked) {
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        productId,
      ]);
    } else {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((id) => id !== productId),
      );
    }

    const formattedNumber = product?.sale_prices?.price;
    const temp = parseFloat(formattedNumber.replace(/,/g, ''));
    if (!isNaN(temp)) {
      if (isChecked) {
        setTotalSum((prevTotalSum) => prevTotalSum + temp);
      } else {
        setTotalSum((prevTotalSum) => Math.max(prevTotalSum - temp, 0));
      }
    }
  };

  const addToCartProduct = () => {
    const productsToAdd = combo_products
      .filter((product: any) => selectedProducts.includes(product.id))
      .map((comboProduct: any) => ({
        id: comboProduct.id,
        strike_rate: comboProduct?.sale_prices?.strike_rate,
        strike_rate_original: comboProduct?.sale_prices?.strike_rate_original,
        price: comboProduct?.sale_prices?.price,
        price_original: comboProduct?.sale_prices?.price_original,
        discount: comboProduct?.sale_prices?.discount,
        overall_discount_percentage:
          comboProduct?.sale_prices?.overall_discount_percentage,
      }));

    const item: AddToCart = {
      guest_token: Uuid,
      products: productsToAdd,
    };
    api.addToCartProduct(item).then((res) => {
      if (res.status_code == 200) {
        toast.success('Product added to cart successfully', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'top-center',
        });
        dispatch(addToCart(res.data));
        window.localStorage.setItem('carts', JSON.stringify(res.data));
      } else {
        toast.error('Please try again', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'top-center',
        });
      }
    });
  };

  return (
    <>
      {product?.has_video_shopping == 'yes' ? (
        <div className="product-list-description">
          <Stack direction="horizontal" gap={3}>
            <ImageComponent
              src="/images/collections/static/experience-group.png"
              width={90}
              height={90}
              alt="arrow"
              priority={true}
            />
            {/* <img src="/images/collections/static/Group 6961.png" alt="" /> */}

            <div className="paragraph-Ctr">
              <p className="true-store-title">A True In-store Experience</p>
              <div className="true-store-para">
                <p className="expert-products-title">
                  Get expert advice on choosing the right instrument.
                </p>
                <div className="number-style ">
                  Talk to our product expert at <span>&nbsp;</span>
                  <Box sx={{ display: { md: 'none', xs: 'block' } }}>
                    {/* <Link
                      href="tel:+9940046621"
                      target="_blank"
                      className="mobile-device-header1"
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
            </div>
          </Stack>
        </div>
      ) : (
        ''
      )}
      <div className="review-options">
        <h5 className="review-options-title">Reasons to choose us</h5>
        <div className="product-image-review">
          <Image
            src="/images/collections/static/Group 6962.png"
            alt={'collections'}
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
            alt={'collections'}
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
            alt={'collections'}
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
            alt={'collections'}
            width="16"
            height="16"
            className="review-contents"
          />
          {/* 24/7 support */}
          Standard warranty
        </div>
      </div>
      {combo_products.length !== 0 ? (
        <div>
          <h5 className="frequently-options-title">
            Frequently Bought Together
          </h5>
          <div className="product-selection-list-View">
            <div className="product-list-selection">
              <div className="row ">
                {combo_products.map((value: any, index: any) => (
                  <div
                    className="col-md-4 col-sm-4 col-xs-12 product-selection-row"
                    key={value.id}
                  >
                    <div className="product-list-selection-image1">
                      <div className="product-list-selection-collections">
                        <div className="checkbox-labelproduct d-block d-sm-none">
                          <Checkbox
                            {...label}
                            defaultChecked
                            onChange={(event) =>
                              handleCheckboxChange(event, value)
                            }
                            sx={{
                              color: '#E34061',
                              '&.Mui-checked': {
                                color: '#E34061',
                              },
                            }}
                          />
                        </div>
                        <div className="col-xs-12 productimage1">
                          <Image
                            src={value.image}
                            alt={'product'}
                            width="60"
                            height="60"
                          />
                        </div>
                      </div>
                      <div className="product-list-selection-addIcon">
                        {index !== imageSections.length - 1 && (
                          <Image
                            src="/images/collections/static/Group 6968.png"
                            alt={'product'}
                            width="28"
                            height="28"
                          />
                        )}
                      </div>

                      <div className="checkbox-label-product d-none d-sm-block">
                        <Checkbox
                          {...label}
                          defaultChecked
                          // checked={[selectedProducts].includes(value.id)}
                          onChange={(event) =>
                            handleCheckboxChange(event, value)
                          }
                          sx={{
                            color: '#E34061',
                            '&.Mui-checked': {
                              color: '#E34061',
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-none d-sm-block al-add-button">
              <div className="add-to-cart-button">{checkedItemCount} Items</div>
              <div className="add-to-cart-rupees">
                <span>₹</span>
                <span>{totalSum.toLocaleString('en-US')}</span>
              </div>
              <div
                className={`add-to-cart-Icon ${
                  selectedProducts.length === 0 ? 'disabled' : ''
                }`}
                onClick={() => {
                  if (selectedProducts.length > 0) {
                    addToCartProduct();
                  }
                }}
              >
                Add to Cart
              </div>
            </div>
          </div>
          {combo_products.map((value: any, index: any) => (
            <div key={index}>
              {selectedProducts.includes(value.id) ? (
                <div className="product-added-checklist ">
                  <Checkbox
                    {...label}
                    // defaultChecked
                    checked={selectedProducts.includes(value.id)}
                    disabled
                    sx={{
                      color: '#E34061',
                      '&.Mui-checked': {
                        color: '#E34061',
                      },
                    }}
                  />
                  {value?.product_name}
                  <span> ₹ {value?.sale_prices?.price}</span>
                </div>
              ) : (
                ''
              )}
            </div>
          ))}
          <div className="d-flex d-sm-none add-cart-to">
            <Grid container>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <div className="add-to-cart-button">
                  {checkedItemCount} Items ₹ <span>{totalSum}</span>
                </div>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                }}
              >
                <Button
                  className={`add-to-cart-Icon ${
                    selectedProducts.length === 0 ? 'disabled' : ''
                  }`}
                  onClick={() => {
                    if (selectedProducts.length > 0) {
                      addToCartProduct();
                    }
                  }}
                >
                  Add to Cart
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        ''
      )}
      <Row className="align-top product-detailsHead">
        <Col lg={12}>
          {product?.specification == '' ? (
            <span className="m-2 text-center">No data</span>
          ) : (
            <>
              {product?.feature_information ||
              product?.technical_information ? (
                <>
                  <p className="product-description-title">
                    Product Description
                  </p>
                </>
              ) : (
                <span>NO DATA AVAILABLE</span>
              )}

              <div
                className="paragraph-Ctr mb-2"
                dangerouslySetInnerHTML={{
                  __html: product?.specification,
                }}
              ></div>
              <div
                className="paragraph-Ctr mb-2"
                dangerouslySetInnerHTML={{
                  __html: product?.technical_information,
                }}
              ></div>
              <div
                className="paragraph-Ctr mb-2"
                dangerouslySetInnerHTML={{
                  __html: product?.feature_information,
                }}
              ></div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductFrequently;
