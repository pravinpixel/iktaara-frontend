import { createSlice } from '@reduxjs/toolkit';

export type UserState = {
  id: number;
  customer_no: string;
  address: null;
  created_at: string;
  customer_address: AddressState[];
  dob: string;
  email: string;
  email_verified_at: string | null;
  first_name: string;
  last_name: string | null;
  mobile_no: string;
  profile_image: string | null;
  status: string;
  updated_at: string;
  isOpen: boolean; // Add isOpen property
};

export type AddressState = {
  id: number;
  customer_id: number;
  address_type_id: number;
  contact_name: string | null;
  email: string;
  mobile_no: string;
  address_line1: string;
  post_code: number;
  city: string | null;
  state: string | null;
  from_address_type: number;
};

const initialState: UserState = {
  id: 0,
  customer_no: '',
  address: null,
  created_at: '',
  customer_address: [],
  dob: '',
  email: '',
  email_verified_at: '',
  first_name: '',
  last_name: '',
  mobile_no: '',
  profile_image: '',
  status: '',
  updated_at: '',
  isOpen: false, // Set isOpen to false initially
};

// const AddressInit: AddressState = {
//   id: 0,
//   customer_id: 0,
//   address_type_id: 0,
//   contact_name: null,
//   email: '',
//   mobile_no: '',
//   address_line1: '',
//   post_code: 0,
//   city: null,
//   state: null,
//   from_address_type: 0,
// };

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, actions) {
      if (actions.payload) {
        state.id = actions.payload?.id;
        state.first_name = actions.payload?.first_name;
        state.last_name = actions.payload?.last_name;
        state.email = actions.payload?.email;
        state.mobile_no = actions.payload?.mobile_no;
        state.customer_address = actions.payload?.customer_address;
        state.profile_image = actions.payload?.profile_image;
        state.customer_no = actions.payload?.customer_no;
      }
    },
    updateUser(state, actions) {
      state = actions.payload;
    },
    addAddress(state, actions) {
      state = actions.payload;
    },
    updateAddress(state, actions) {
      state.customer_address = actions.payload;
    },
    deleteAddress(state, actions) {
      state = actions.payload;
    },
    openPopup: (state) => {
      state.isOpen = true;
    },
    closePopup: (state) => {
      state.isOpen = false;
    },
  },
});

export const userReducer = UserSlice.reducer;

export const {
  addUser,
  updateUser,
  addAddress,
  updateAddress,
  deleteAddress,
  openPopup,
  closePopup,
} = UserSlice.actions;

export const selectUser = (state: UserState) => state;
export const selectAddress = (state: UserState) => state.customer_address;
