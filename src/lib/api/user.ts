/* eslint-disable import/no-anonymous-default-export */
import { axiosInstance } from './base';

const login = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/login', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error?.response?.data;
    });
  return response;
};

const googleLogin = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/google/callback', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const otpLogin = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/login/otp', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const singup = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('api/register/customer', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const verifyAccount = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/verify/account', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const verifyPasswordToken = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/check/tokenValid', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const changePassword = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/reset/password', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const updatePassword = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/change/password', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const forgetPassword = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('api/send/password/link', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const getMe = async () => {
  const response: any = await axiosInstance()
    .get('api/customer/me')
    .then((res: any) => {
      return res.data.data;
    })
    .catch((error) => {
      return error?.response?.data;
    });
  return response;
};

const updateProfile = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/update/profile', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const requestOtp = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/generate/otp', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const verifyOtp = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/login/otp', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const addAddress = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/add/customer/address', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const updateAddress = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/update/customer/address', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};
const makeDefaultAddress = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/set/default/address', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const getAddress = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/get/customer/address', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const deleteAddress = async (datas: any) => {
  const response: any = await axiosInstance()
    .post('/api/delete/customer/address', datas, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const getStates = async () => {
  const response: any = await axiosInstance()
    .get('/api/get/states')
    .catch((error) => {
      return error.response.data;
    });
  if (response.status == '200') {
    return response.data;
  }
  return null;
};

const getCities = async () => {
  const response: any = await axiosInstance()
    .get('/api/get/cities')
    .catch((error) => {
      return error.response.data;
    });
  if (response.status == '200') {
    return response.data;
  }
  return null;
};

const getShippingAddress = async () => {
  try {
    const response = await axiosInstance().get('/api/customer/me');
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response.data);
  }
};

export default {
  singup,
  login,
  otpLogin,
  verifyAccount,
  forgetPassword,
  updateProfile,
  requestOtp,
  verifyOtp,
  verifyPasswordToken,
  googleLogin,
  getMe,
  changePassword,
  addAddress,
  getAddress,
  updateAddress,
  makeDefaultAddress,
  deleteAddress,
  getStates,
  getCities,
  updatePassword,
  getShippingAddress,
};
