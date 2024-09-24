import { axiosInstance } from './base';

export const getAllBrands = async (params: any) => {
  const response: any = await axiosInstance()
    .get('/api/get/brands', {
      params,
    })
    .then((res: any) => {
      return res;
    });
  if (response.status == '200') {
    return response.data.data;
  } else if (response.status == '500') {
  }
  return null;
};
export const getBrandsAlphabet = async (params: any) => {
  const response: any = await axiosInstance()
    .get('api/get/brands/alphabets', {
      params,
    })
    .then((res: any) => {
      return res;
    });
  if (response.status == '200') {
    return response.data.data;
  } else if (response.status == '500') {
  }
  return null;
};
export const getBrandCategory = async (brand?: string, params?: object) => {
  const response: any = await axiosInstance()
    .get('/api/get/brands/all/' + brand, {
      params,
    })
    .then((res: any) => {
      return res;
    });
  if (response.status == '200') {
    return response.data.data;
  } else if (response.status == '500') {
  }
  return null;
};
