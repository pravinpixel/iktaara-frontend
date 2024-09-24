/* eslint-disable import/no-anonymous-default-export */
import { toast } from 'react-toastify';
import { axiosInstance } from './base';
import { errorMessage } from '../helper';

// get product based on slug
const getProduct = async (slug: string) => {
  const response: any = await axiosInstance()
    .get('/api/get/products/by/slug/' + slug)
    .then((res: any) => {
      return res;
    });
  if (response.status == '200') {
    return response.data.data;
  } else if (response.status == '500') {
  }
  return null;
};

const getCategoryProduct = async (params: any) => {
  console.log(params, 'params');

  const slug: string = Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');

  if (slug != undefined) {
    const response: any = await axiosInstance()
      .get('/api/get/products', {
        params: params,
      })
      .then((res: any) => {
        return res;
      });
    if (response.status == 200) {
      return response.data.data;
    }
  }
  return null;
};

const getFilters = async () => {
  const response = await axiosInstance()
    .get('/api/get/filter/static/sidemenus')
    .then((res: any) => {
      return res;
    });
  if (response.status == '200') {
    return response.data.data;
  }
  return null;
};

const getDynamicFilters = async (slug: string, params?: object) => {
  const response = await axiosInstance()
    .post('/api/get/dynamic/filter/category', {
      category_slug: slug,
      ...params,
    })
    .then((res: any) => {
      return res;
    });
  if (response.status == '200') {
    return response.data.data;
  }
  return null;
};

const productSearch = async (params: any) => {
  const response = await axiosInstance()
    .post('/api/get/global/search', params)
    .then((res: any) => {
      return res;
    })
    .catch((error) => {
      return error.response.data;
    });
  if (response.status == '200') {
    return response.data;
  }
  return null;
};
const pincodeChargeCheck = async (values: any) => {
  try {
    const response: any = await axiosInstance().post(
      '/api/get/delivery',
      values,
    );
    if (response?.data.error === 0) {
      toast.success(response?.data?.message);
    } else {
      errorMessage(response.data);
    }
  } catch (error: any) {
    return Promise.reject(error?.response?.data);
  }

  // .then((res: any) => {
  //   return res;
  // });
  //   if (response.status == '200') {
  //     return response.data.data;
  //   } else if (response.status == '500') {
  //   }
  //   return null;
};

const getSearchData = async () => {
  const response: any = await axiosInstance()
    .get('/api/get/search/data')
    .catch((error) => {
      return error.response.data;
    });
  if (response.status == '200') {
    return response.data;
  }
  return null;
};

export default {
  getProduct,
  getCategoryProduct,
  getFilters,
  getDynamicFilters,
  productSearch,
  pincodeChargeCheck,
  getSearchData,
};
