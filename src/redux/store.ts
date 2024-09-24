import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { cartReducer } from './cart-slice';
import { categoryReducer } from './category-slice';
import { userReducer } from './user-slice';
import { checkoutReducer } from './checkout';

export const reducer = combineReducers({
  cart: cartReducer,
  category: categoryReducer,
  user: userReducer,
  checkout: checkoutReducer,
});

const store = configureStore({
  reducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
