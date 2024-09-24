import { toast } from 'react-toastify';
import { axiosInstance } from './base';
import { errorMessage } from '../helper';

export const AllForms = async (values: any) => {
  try {
    const response: any = await axiosInstance().post(
      '/api/customer/request',
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
