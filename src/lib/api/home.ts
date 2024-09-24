/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { axiosInstance } from './base';
// get product based on slug
const getTopMenu = async () => {
  const response: any = await axiosInstance()
    .get('/api/get/topMenu')
    .catch((error) => {
      return error.response.data;
    });
  if (response.status == '200') {
    return response.data.data;
  }
  return null;
};

const getTopNotification = async () => {
  const response: any = await axiosInstance()
    .get('/api/get/topbar')
    .catch((error) => {
      return error.response.data;
    });
  if (response.status == '200') {
    return response.data;
  }
  return null;
};

const getBrands = async () => {
  const response: any = await axiosInstance()
    .get('/api/get/home/brands')
    .catch((error) => {
      return error.response.data;
    });
  if (response.status == '200') {
    return response.data;
  }
  return null;
};

// const newSever = axios.create({
//   baseURL: process.env.API_END_POINT,
// });

const signUpLetter = async (datas: any) => {
  return await axios
    .post(`${process.env.API_END_POINT}/api/subscribe/newsletter`, datas)
    .then((res) => res)
    .catch((err) => err);
};

const getMetaData = async (params: any) => {
  try {
    const response: any = await axiosInstance().post('/api/get/meta', params);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data);
  }
};

const getLoginBanner = async () => {
  const response: any = await axiosInstance()
    .get('/api/login-banners')
    .catch((error) => {
      return error.response.data;
    });
  if (response.status == '200') {
    return response.data;
  }
  return null;
};

export default {
  getTopMenu,
  getTopNotification,
  getBrands,
  signUpLetter,
  getMetaData,
  getLoginBanner,
};
