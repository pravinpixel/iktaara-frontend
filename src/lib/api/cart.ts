/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { axiosInstance } from './base';

// get product based on slug
const getCartItems = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/get/cart', data)
    .then((res: any) => {
      if (res.status == 200) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};

const addToCart = async (item: any) => {
  const response: any = await axiosInstance()
    .post('/api/add/cart', item)
    .then((res: any) => {
      if (res.status == 200) {
        return res.data;
      } else {
        alert(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};

const addToCartProduct = async (item: any) => {
  const response: any = await axiosInstance()
    .post('/api/bulk-add-cart', item)
    .then((res: any) => {
      if (res.status == 200) {
        return res.data;
      } else {
        alert(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};

const updateCart = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/update/cart', data)
    .then((res: any) => {
      if (res.status == 200) {
        return res.data;
      } else {
        alert(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};

const removeCart = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/delete/cart', data)
    .then((res: any) => {
      if (res.status == 200) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
  return response;
};

const checkout = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/proceed/ccav/checkout', data)
    .then((res: any) => {
      if (res.status == 200) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
  return response;
};

const ccavenuePaymentInit = async (data: any) => {
  await axios.post(
    'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
    data,
  );
};

const verfiyPayment = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/payment/response', data)
    .then((res: any) => {
      if (res?.data || res?.response) {
        console.log(res?.data, 'paydata');
        console.log(res?.response, 'payres');

        return res?.data || res?.response?.data;
      }
    })
    .catch((error) => {
      console.log(error.response.data, 'verfiyPayment');
      return error;
    });
  return response;
};

const getOrderList = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/get/orders', data)
    .then((res: any) => {
      // if (res.status == 200) {
      return res.data;
      // }
    })
    .catch((error) => {
      console.log(error.response.data);
      return error;
    });
  return response;
};

const getOrderDetails = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/get/orderByno', data)
    .then((res: any) => {
      if (res?.status == 200) {
        return res?.data;
      }
      return res?.response;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};

const getCancelOrderProduct = async (params: { item_id: string | null }) => {
  const response: any = await axiosInstance()
    .get('api/get/order-item-detail', {
      params,
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};

const getCancelReason = async () => {
  const response: any = await axiosInstance()
    .get('/api/get/cancel/reason')
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};
const getExchangeReason = async () => {
  const response: any = await axiosInstance()
    .get('/api/exchange-reasons')
    .then((res: any) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};

const cancelOrder = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/cancel/request/orders', data)
    .then((res: any) => {
      if (res?.status == 200) {
        return res.data;
      } else {
        return res;
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};

const cancelOrderAll = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/cancel/request/all', data)
    .then((res: any) => {
      if (res?.status == 200) {
        return res.data;
      } else {
        return res;
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};

const exchangeOrder = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/order/exchange/request', data)
    .then((res: any) => {
      if (res?.status == 200) {
        return res.data;
      } else {
        return res;
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};

const reviewOrder = async (data: any) => {
  const response: any = await axiosInstance()
    .post('/api/reviews/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      if (res?.status == 201) {
        return res.data;
      } else {
        return res;
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  return response;
};
const getOrderSuccess = async (data: any) => {
  try {
    const response: any = await axiosInstance().post(
      '/api/get/orderByno',
      data,
    );
    if (response?.data?.error == 0) {
      return response.data.data;
    } else {
      return Promise.reject(response.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const getShippingCharges = async (data?: any) => {
  try {
    const response: any = await axiosInstance().post(
      '/api/get/shipping/rocket/charges',
      data,
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

const applyCodeApi = async (data: any) => {
  try {
    const response: any = await axiosInstance().post('/api/apply/coupon', data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const getShippingChargesTotal = async (data?: any) => {
  try {
    const response: any = await axiosInstance().post(
      '/api/update/cartAmount',
      data,
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
const getProceedCheckout = async (data?: any) => {
  try {
    const response: any = await axiosInstance().post(
      '/api/get/shipping/rocket/charges',
      data,
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
const getOrderFinished = async (data?: any) => {
  try {
    const response: any = await axiosInstance().post(
      '/api/get/shipping/rocket/charges',
      data,
    );
    console.log(response, 'getProceedCheckout');
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

//const getCatTotal = async () => {};

//const requestCuponCode = async () => {};

export default {
  getCartItems,
  updateCart,
  removeCart,
  checkout,
  verfiyPayment,
  //getCatTotal,
  //requestCuponCode,
  addToCartProduct,
  addToCart,
  getCancelOrderProduct,
  getOrderList,
  getOrderDetails,
  cancelOrder,
  ccavenuePaymentInit,
  getCancelReason,
  getOrderSuccess,
  getShippingCharges,
  getProceedCheckout,
  getOrderFinished,
  getShippingChargesTotal,
  reviewOrder,
  getExchangeReason,
  exchangeOrder,
  applyCodeApi,
  cancelOrderAll,
};
