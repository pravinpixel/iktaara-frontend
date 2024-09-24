import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@/lib/api/product';

export const fetchProduct = createAsyncThunk(
  'category/fetch',
  async (params: any) => {
    const response: categoryPropsState = await api.getCategoryProduct(params);
    return response;
  },
);

export const loadMore = createAsyncThunk(
  'category/nextpage',
  async (params: any) => {
    const response: categoryPropsState = await api.getCategoryProduct(params);
    return response;
  },
);

type categoryPropsState = {
  products: [];
  sub_categories: [];
  from: number | string;
  to: number | string;
  total_count: number;
  meta_data: any | null;
};

type actionState = {
  type: string;
  payload: any;
};

type ProductType = [];
interface CategoryState {
  entities: any | [];
  sub_categories: any | [];
  filters: any | [];
  from: number | string;
  to: number | string;
  total_count: number;
  currentPage: number;
  perPage: number;
  queryParams: any | [];
  selectedQueryParams: any | [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  search_field: string | null;
}

const initialState = {
  entities: [],
  sub_categories: [],
  filters: [],
  from: 1,
  to: 1,
  total_count: 0,
  currentPage: 1,
  perPage: 12,
  queryParams: [],
  selectedQueryParams: [],
  loading: 'idle',
  search_field: null,
} as CategoryState;

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    preload(state, action: actionState) {
      const products = action.payload?.products || [];
      if (products.length > 0) {
        state.entities = [];
        products.map((product: ProductType) => {
          state.entities.push(product);
        });
      } else {
        state.entities = [];
      }
      const sub_categories = action.payload?.sub_categories || [];
      if (sub_categories.length > 0) {
        state.sub_categories = [];
        sub_categories.map((category: any) =>
          state.sub_categories.push(category),
        );
      }

      if (action.payload?.filters.length > 0) {
        state.filters = [];
        action.payload.filters.map((filter: any) => state.filters.push(filter));
      }
      state.from = action.payload?.from;
      state.to = action.payload?.to;
      state.total_count = action.payload?.total_count;
      state.search_field = action.payload?.search_field || null;
    },
    setSubCategories(state, action: actionState) {
      const sub_categories = action.payload.sub_categories;
      if (sub_categories?.length > 0) {
        state.sub_categories = [];
        sub_categories.map((category: any) =>
          state.sub_categories.push(category),
        );
      }
    },
    setFilterQuery(state, action: actionState) {
      if (action.payload) {
        Object.entries(action.payload).map((values) => {
          const data: any = { key: values[0], value: values[1] };
          state.selectedQueryParams.push(data);
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action: actionState) => {
      // Add user to the state array
      const {
        products = [],
        from = 0,
        to = 0,
        total_count = 0,
      } = action.payload;
      state.entities = products;
      state.from = from;
      state.to = to;
      state.total_count = total_count;
      state.search_field = null;
      // if (products?.length >= 1) {
      //   products.map((product: any) => state.entities.push(product));
      // } else {
      //   state.entities = [];
      // }
    });

    builder.addCase(loadMore.fulfilled, (state, action: actionState) => {
      // Add user to the state array
      const { products } = action.payload;
      state.entities = products ?? [];
      // products.map((product: any) => state.entities.push(product));
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.total_count = action.payload.total_count;
      state.search_field = action.payload.search_field;
      state.currentPage++;
    });
  },
});

export const categoryReducer = categorySlice.reducer;

export const { preload, setFilterQuery, setSubCategories } =
  categorySlice.actions;
