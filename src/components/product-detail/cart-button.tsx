import { addToCart } from '@/redux/cart-slice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSiteInfo } from 'src/context/SiteInfoContext';
import api from 'src/lib/api/cart';

interface AddToCart {
  id: number;
  quantity: number;
  guest_token: string;
  sale_prices: {
    strike_rate: number | string;
    strike_rate_original: number | string;
    price: number | string;
    price_original: number | string;
    discount: any;
    overall_discount_percentage: number | string;
  };
}

const CartButton = ({ product }: any) => {
  const router = useRouter();

  const { Uuid }: any = useSiteInfo();

  const dispatch = useDispatch();

  const addtocart = () => {
    if (product.max_quantity >= 1) {
      const item: AddToCart = {
        id: product.id,
        quantity: 1,
        guest_token: Uuid,
        sale_prices: {
          strike_rate: product.sale_prices.strike_rate,
          strike_rate_original: product.sale_prices.strike_rate_original,
          price: product.sale_prices.price,
          price_original: product.sale_prices.price_original,
          discount: product.sale_prices.discount,
          overall_discount_percentage:
            product.sale_prices.overall_discount_percentage,
        },
      };
      api.addToCart(item).then((res) => {
        if (res.status_code == 200) {
          toast.success('Product added to cart successfully', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
            position: 'top-center',
          });
          //(res.data);
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
    } else {
      toast.info(
        'Maximum Quantity you are allowed to Buy ' + product.max_quantity ?? '',
        {
          position: 'top-center',
        },
      );
    }
  };

  // const buynow = () => {
  //   if (status == 'authenticated') {
  //     if (out_of_stock || stock_staus) {
  //       toast.info('Please remove out of stock product');
  //     } else {
  //       router.replace('/checkout-new');
  //     }
  //   } else {
  //     // router.push(`/?login=enable&callback=/product/${product?.product_url}`);
  //     dispatch(openPopup());
  //   }
  //   const item: AddToCart = {
  //     id: product.id,
  //     // quantity: quantity,
  //     guest_token: Uuid,
  //     sale_prices: {
  //       strike_rate: product.sale_prices.strike_rate,
  //       strike_rate_original: product.sale_prices.strike_rate_original,
  //       price: product.sale_prices.price,
  //       price_original: product.sale_prices.price_original,
  //       discount: product.sale_prices.discount,
  //       overall_discount_percentage:
  //         product.sale_prices.overall_discount_percentage,
  //     },
  //   };
  //   const postData = api.addToCart(item).then((res) => {
  //     if (res.status_code == 200) {
  //       toast.success('Product added to cart successfully', {
  //         hideProgressBar: true,
  //         autoClose: 2000,
  //         type: 'success',
  //         position: 'top-center',
  //       });
  //       dispatch(addToCart(res.data));
  //       window.localStorage.setItem('carts', JSON.stringify(res.data));
  //       router.push('/cart');
  //     } else {
  //       toast.error('Please try again', {
  //         hideProgressBar: true,
  //         autoClose: 2000,
  //         type: 'error',
  //         position: 'top-center',
  //       });
  //     }
  //   });
  // };
  const buynow = () => {
    const item: AddToCart = {
      id: product.id,
      quantity: 1,
      guest_token: Uuid,
      sale_prices: {
        strike_rate: product.sale_prices.strike_rate,
        strike_rate_original: product.sale_prices.strike_rate_original,
        price: product.sale_prices.price,
        price_original: product.sale_prices.price_original,
        discount: product.sale_prices.discount,
        overall_discount_percentage:
          product.sale_prices.overall_discount_percentage,
      },
    };
    api.addToCart(item).then((res) => {
      if (res.status_code == 200) {
        toast.success('Product added to cart successfully', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'top-center',
        });
        dispatch(addToCart(res.data));
        window.localStorage.setItem('carts', JSON.stringify(res.data));
        router.push('/buy/cart');
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

  if (product?.stock_status == 'in_stock' && product?.max_quantity > 0) {
    return (
      <>
        <div className="cart-button">
          <Link
            href="#!"
            className="btn bg-addtocart btn-block"
            onClick={() => addtocart()}
          >
            Add to Cart
          </Link>
          <button onClick={() => buynow()} className="btn bg-buynow  btn-block">
            Buy Now
          </button>
          {/* <
           
            className="btn bg-buynow  btn-block"
            onClick={() => buynow()}
          >
            Buy Now
          </Link> */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="cart-button py-2">
          <a href="#!" className="btn bg-addtocart btn-block">
            Coming Soon
          </a>
        </div>
      </>
    );
  }
};

export default CartButton;
