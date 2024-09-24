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
interface cheeckoutState {
  customer_id: number;
  customer_address: any;
  shipping_address: any;
  billing_address: any;
  carts: cartItem[];
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
const initialState: cheeckoutState = {
  customer_id: 0,
  customer_address: [],
  shipping_address: [],
  billing_address: [],
  carts: [cartItem],

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

const Checkout = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    update: (state, action) => {
      state.customer_id = action.payload.customer_id;
      state.carts = action.payload.carts;
      state.customer_address = action.payload.customer_address;
      state.billing_address = action.payload.billing_address || {};
      state.shipping_address = action.payload.shipping_address || {};
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
      }
    },
    removeFromCart: (state, action) => {
      const index = state.carts.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      state.carts.splice(index, 1);
    },
    updateShippingAddress: (state, action) => {
      state.shipping_address = action.payload;
    },
    updateBillingAddress: (state, action) => {
      state.billing_address = action.payload;
    },
  },
});

export const checkoutReducer = Checkout.reducer;

export const {
  update,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updateShippingAddress,
  updateBillingAddress,
} = Checkout.actions;

export const checkoutCarts = (state: cheeckoutState) => state.carts;
