import { addToCart } from '@/redux/cart-slice';
import api from 'src/lib/api/cart';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSiteInfo } from 'src/context/SiteInfoContext';
import { FormEvent } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import ImageComponent from '@/utils/imageComponent';

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

interface CartButtonType {
  product: any;
  cartNew?: boolean;
  cartAdd?: boolean;
}

const CartButton = ({
  product,
  cartNew = false,
  cartAdd = false,
}: CartButtonType) => {
  // const router = useRouter();
  const { Uuid }: any = useSiteInfo();

  const dispatch = useDispatch();

  const handleAddtoCart = (e: FormEvent) => {
    e.preventDefault();
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

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <>
      <div className="cont-sont">
        {product?.stock_status == 'in_stock' && product?.max_quantity > 0 && (
          <div className="top-item-cart">
            <BootstrapTooltip
              title={<span className="add-cart-tooltip">ADD TO CART</span>}
            >
              <div onClick={handleAddtoCart}>
                <ImageComponent
                  src="/icons/shopping-bag_1.png"
                  width={20}
                  height={20}
                  alt="shopping"
                  priority={true}
                  className={cartNew ? 'cartNew' : ''}
                />
              </div>
            </BootstrapTooltip>
            {cartAdd && (
              <p className="add-text-cart d-flex d-sm-none">ADD TO CART</p>
            )}
          </div>
        )}
        <div className="cont-sont">
          {product?.stock_status == 'coming_soon' && (
            <div className="add-sonn-item">
              <h5 className="coming-soon-cart">Coming Soon</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartButton;
