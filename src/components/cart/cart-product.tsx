import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '@/redux/cart-slice';
import ImageComponent from '@/utils/imageComponent';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSiteInfo } from 'src/context/SiteInfoContext';
import api from 'src/lib/api/cart';

const CartProduct = ({ item, type }: any) => {
  const dispatch = useDispatch();
  const { Uuid }: any = useSiteInfo();

  const handleIncreement = async (event: any, item: any) => {
    const addQuantity = item.quantity;
    if (addQuantity < item.max_quantity) {
      event.preventDefault();
      dispatch(incrementQuantity({ id: item.id }));
      const data = {
        id: item.id,
        cart_id: item.cart_id,
        quantity: item.quantity + 1,
        guest_token: Uuid,
      };
      await api.updateCart(data).then((res: any) => {
        if (res.status_code == 200) {
          dispatch(addToCart(res.data));
        }
      });
    } else {
      toast.info(
        'Maximum Quantity you are allowed to Buy ' + item.max_quantity ?? '',
        {
          position: 'top-center',
        },
      );
      event.preventDefault();
    }
  };

  const handleDecreement = async (event: any, item: any) => {
    event.preventDefault();
    if (item.quantity > 1) {
      dispatch(decrementQuantity({ id: item.id }));
      const data = {
        id: item.id,
        cart_id: item.cart_id,
        quantity: item.quantity - 1,
        guest_token: Uuid,
      };
      await api.updateCart(data).then((res: any) => {
        if (res.status_code == 200) {
          dispatch(addToCart(res.data));
        }
      });
    }
  };

  const handleDelete = async (event: any, item: any) => {
    const data = {
      cart_id: item.cart_id,
      guest_token: Uuid,
    };
    dispatch(removeFromCart({ id: item.id }));
    await api.removeCart(data).then((res: any) => {
      if (res?.status_code == 200) {
        dispatch(addToCart(res.data));
      }
    });
  };

  return (
    item && (
      <>
        <Row className="pt-3 cart-top-bg1">
          <Col
            xs={7}
            md={8}
            className="d-flex flex-md-row flex-column  justify-content-md-start  align-items-md-start gap-2 img"
          >
            <div className="d-none d-md-flex">
              <Link
                href={`/buy/product/${item.product_url}`}
                style={{
                  height: '139px',
                  width: '139px',
                }}
              >
                <Image
                  src={item.image}
                  alt="cart-img"
                  height={139}
                  width={139}
                  className="steper-img"
                  style={{
                    border: '1px solid #D4D9DF',
                    objectFit: 'contain',
                  }}
                />
              </Link>
            </div>
            <div className="d-flex flex-column justify-content-between h-100 px-md-1">
              <Link
                href={`/buy/product/${item.product_url}`}
                className="productname text-md-start"
              >
                {item.product_name}
              </Link>
              {/* {item.quantity > item.max_quantity ? (
                <span>Stock Available : {item.max_quantity}</span>
              ) : item.max_quantity === 0 ? (
                <span>{item.max_quantity} Quantity Available </span>
              ) : (
                item.stock_status === 'out_of_stock' && (
                  <span>Out of stock</span>
                )
              )} */}
              <span className="amount-cartbg">
                <span>₹</span>
                {Number(
                  item?.quantity * item?.sale_prices?.price_original,
                ).toLocaleString()}
              </span>
              {!type && (
                <div
                  className="gap-1 d-flex delete-img"
                  onClick={() => {
                    handleDelete(event, item);
                  }}
                >
                  <ImageComponent
                    src="/images/banner/deete-icons.png"
                    width={13}
                    height={12}
                    alt=" delete-icon"
                    priority={true}
                  />
                  {/* <img
                    src="/images/banner/deete-icons.png"
                    alt=" delete-icon"
                  /> */}
                  <span className="delete-button">Delete</span>
                </div>
              )}
            </div>
          </Col>
          {!type ? (
            <Col
              xs={2}
              md={2}
              className="d-flex gap-2 justify-content-center mb-1 quanity-1"
            >
              <p className="quality-buttoncart">
                <i
                  className="fa-solid fa-minus quanty-icons"
                  onClick={() => {
                    handleDecreement(event, item);
                  }}
                />
                <span className="quanty-iconquantity ">{item.quantity}</span>
                <i
                  className="fa-regular fa-plus quanty-iconsbg"
                  onClick={() => {
                    handleIncreement(event, item);
                  }}
                />
              </p>
            </Col>
          ) : (
            <Col
              xs={2}
              md={2}
              className="d-flex gap-2 justify-content-center mb-1 quanity-1 pt-0"
            >
              <span className="quanty-iconquantity1">{item.quantity}</span>
            </Col>
          )}

          <Col
            xs={3}
            md={2}
            className="d-flex gap-2  justify-content-center mb-1 quanity-1"
          >
            {!type ? (
              <span className="amount-total">
                <span>₹</span>
                {Number(
                  item?.quantity * item?.sale_prices?.price_original,
                ).toLocaleString()}
              </span>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </>
    )
  );
};

export default CartProduct;
