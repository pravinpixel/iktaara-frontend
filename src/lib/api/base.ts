// import { AuthConfig } from '@/configs/auth';
// import store from '@/redux/store';
// import { openPopup } from '@/redux/user-slice';
import axios from 'axios';
import { signOut } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';

export const axiosInstance = () => {
  // you need to be careful in next.js for adding cookies.
  // You could be on the server or on client. this code will work for client assuming that you will be using on client side
  // I belive you are using `parser` to get cookies. get the token

  // const access_token = () =>
  //   typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  // let header: any;
  // if (access_token() !== null) {
  //   header = {
  //     Accept: 'application/json',
  //     // this is how u set in your code
  //     Authorization: `Bearer ${access_token()}`,
  //     //'X-Requested-With': 'XMLHttpRequest'
  //   };
  // } else {
  //   header = {
  //     Accept: 'application/json',
  //   };
  // }
  const axiosClient = axios.create({
    baseURL: process.env.API_END_POINT,
    // headers: header,
  });
  axiosClient.interceptors.request.use(function (config) {
    const TOKEN = () =>
      typeof window !== 'undefined'
        ? localStorage.getItem('access_token')
        : null;
    if (TOKEN()) {
      config.headers['Authorization'] = `Bearer ${TOKEN()}`;
    }
    return config;
  });

  axiosClient.interceptors.response.use(
    (response: any) => {
      return { ...response };
    },
    (error: any) => {
      if (error?.response?.data?.status_code == '401') {
        signOut().then(() => {
          const path: string =
            window.location.href.split('/').slice(3).join('/') || '';
          // store.dispatch(openPopup());
          // toast.error('Please login');
          window.location.replace(`/buy?login=enable&callback=/${path}`);
          // dispatch(openPopup())
        });

        if (error?.response) {
          return { ...error?.response };
        } else {
          return { ...error };
        }
      }
      if (error?.response) {
        return { ...error?.response };
      } else {
        return { ...error };
      }
    },
  );
  return axiosClient;
};
