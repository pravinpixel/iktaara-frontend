/* eslint-disable import/no-anonymous-default-export */
import { axiosInstance } from './base';

// get product based on slug
const getCategoryProductList = async (slug: string) => {
  const response: any = await axiosInstance()
    .get('/api/get/products?category=' + slug)
    .then((res: any) => {
      return res;
    });
  if (response.status == '200') {
    return response.data.data;
  } else if (response.status == '500') {
  }
  return null;
};

const getFilters = async () => {
  return null;
};
export default { getCategoryProductList, getFilters };
