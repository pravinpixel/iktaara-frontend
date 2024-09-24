import { createContext, useState, ReactNode, useContext } from 'react';
import api from '@/lib/api/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type CartValueType = {
  items: CartItem[] | [];
  loading: boolean;
  itemCount: number;
  setLoading: (value: boolean) => void;
  setItems: (value: CartItem[] | []) => void;
  addToCart: (data: AddToCartItem, errorCallback?: ErrCallbackType) => void;
  updateCart: (data: AddToCartItem, errorCallback?: ErrCallbackType) => void;
};

export type CartItem = {
  quantity: number;
  name: string;
  slug?: string;
  price: number;
  imgUrl?: string;
  id: string | number;
};

interface AddToCartItem {
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

export const defaultProvider: CartValueType = {
  items: [],
  loading: false,
  itemCount: 0,
  setLoading: () => Boolean,
  setItems: () => null,
  addToCart: () => Promise.resolve(),
  updateCart: () => Promise.resolve(),
};

type Props = {
  children: ReactNode;
};

const CartContext = createContext(defaultProvider);

export const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useState<Array<any>>(defaultProvider.items);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [itemCount, setCount] = useState<number>(0);
  const [, setTotal] = useState([]);
  const [, setShippingMethod] = useState([]);

  const handleAddToCart = async (data: AddToCartItem) => {
    setCount(itemCount + data.quantity);
    await api.addToCart(data).then(async (res: any) => {
      if (res.status_code == 200) {
        toast.success('Product added to cart successfully', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'top-center',
        });
        const carts: any = res.data.carts;
        await setItems(carts);
        window.localStorage.setItem('carts', JSON.stringify(carts));
        const cart_total: any = res.data.cart_total;
        await setTotal(cart_total);
        const shipping_charges: any = res.data.shipping_charges;
        await setShippingMethod(shipping_charges);
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

  const handleUpdateCart = () => {
    return null;
  };

  const values = {
    loading,
    itemCount,
    setLoading,
    items,
    setItems,
    addToCart: handleAddToCart,
    updateCart: handleUpdateCart,
  };
  return (
    <CartContext.Provider value={values}>
      <ToastContainer />
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
