import { createSlice } from '@reduxjs/toolkit';

interface cartItem {
  id: number;
  name: string;
  brand_name: string;
  hsn_code: string;
  product_url: string;
  cart_id: number;
  quantity: number;
  max_quantity: number;
  price: string | number;
  mrp_price: string | number;
}

interface shippingChargeState {
  charges: string | number;
  created_at: string;
  description: string;
  id: number;
  is_free: string;
  minimum_order_amount: string | number;
  shipping_title: string;
  status: string;
  updated_at: string;
}

const shippingChargeIntial = {
  charges: 1,
  created_at: '',
  description: '',
  id: 0,
  is_free: '',
  minimum_order_amount: 0,
  shipping_title: '',
  status: '',
  updated_at: '',
};
interface cartState {
  carts: cartItem[];
  cart_count: number;
  out_of_stock: boolean;
  stock_staus: boolean;
  shipping_charges: shippingChargeState[];
  cart_total: {
    total: number | string;
    product_tax_exclusive_total: number | string;
    product_tax_exclusive_total_without_format: number | string;
    tax_total: number | string;
    tax_percentage: number | string;
    shipping_charge: number | string;
  };
}

const cartItem = {
  id: 0,
  name: '',
  brand_name: '',
  hsn_code: '',
  product_url: '',
  cart_id: 0,
  quantity: 1,
  max_quantity: 1,
  price: 0,
  mrp_price: 0,
};

// Define the initial state using that type
const initialState: cartState = {
  carts: [cartItem],
  cart_count: 0,
  out_of_stock: false,
  stock_staus: false,
  shipping_charges: [shippingChargeIntial],
  cart_total: {
    total: 0,
    product_tax_exclusive_total: 0,
    product_tax_exclusive_total_without_format: 0,
    tax_total: 0,
    tax_percentage: 0,
    shipping_charge: 0,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartProduct: (state, action) => {
      state.carts = action.payload.carts;
      const array = [];
      const stock_status_array = [];
      action.payload.carts.filter((cart: any) => {
        if (cart.quantity === 0 || cart.stock_status === 'out_of_stock') {
          array.push(cart);
        }
        if (cart.quantity > cart.max_quantity) {
          stock_status_array.push(cart);
        }
      });

      array.length >= 1
        ? (state.out_of_stock = true)
        : (state.out_of_stock = false);
      stock_status_array.length >= 1
        ? (state.stock_staus = true)
        : (state.stock_staus = false);
      state.cart_count = action.payload.cart_count;
      state.cart_total = action.payload.cart_total;
      state.shipping_charges = action.payload.shipping_charges;
    },
    incrementQuantity: (state, action) => {
      const item: any = state.carts.find(
        (item: any) => item.id === action.payload.id,
      );
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item: any = state.carts.find(
        (item: any) => item.id === action.payload.id,
      );
      if (item.quantity >= 1) {
        item.quantity--;
        //const index = state.carts.findIndex((item: any) => item.id === action.payload.id);
        //state.carts.splice(index, 1);
      }
    },
    removeFromCart: (state, action) => {
      const index = state.carts.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      state.carts.splice(index, 1);
      state.cart_count--;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCartProduct,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;

export const selectCarts = (state: cartState) => state.carts;
export const selectCartsCount = (state: cartState) => state.cart_count;
export const selectCartTotal = (state: cartState) => state.cart_total;
