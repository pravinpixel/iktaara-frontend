/* eslint-disable @typescript-eslint/no-use-before-define */
const nodeCCAvenue = require('node-ccavenue');
import { NextRequest } from 'next/server';
import api from 'src/lib/api/cart';

// const CCAVENUE_ACCESS_CODE = 'AVIT80KF25BP47TIPB';
// const CCAVENUE_WORKING_CODE = '61F60471C2B0CCAFD03303D308EF0F73';
// const CCAVENUE_MERCHANT_ID = '2581392';
// const CCAVENUE_ACCESS_CODE: any = process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE;
// const CCAVENUE_MERCHANT_ID: any = process.env.NEXT_PUBLIC_MERCHANT_ID;
// const CCAVENUE_WORKING_CODE: any =
//   process.env.NEXT_PUBLIC_CCAVENUE_WORKING_CODE;

const NEXT_PUBLIC_CCAVENUE_WORKING_CODE: any =
  process.env.NEXT_PUBLIC_CCAVENUE_WORKING_CODE;
const NEXT_PUBLIC_MERCHANT_ID: any = process.env.NEXT_PUBLIC_MERCHANT_ID;

export default async function handler(req: NextRequest, res: any) {
  if (req.method === 'POST') {
    const data: any = req.body;
    const ccav = new nodeCCAvenue.Configure({
      merchant_id: NEXT_PUBLIC_MERCHANT_ID,
      working_key: NEXT_PUBLIC_CCAVENUE_WORKING_CODE,
    });
    const response = redirectResponseToJson(data.encResp, ccav);
    //const response = redirectResponseToJson(data1, ccav);
    console.log(response, 'response');
    await api
      .verfiyPayment({ order_response: response })
      .then((result: any) => {
        console.log('payment-res', result);
        if (result?.error == 0) {
          res.redirect(302, `/buy/order-confirmation/${response.order_id}`);
        }

        res.redirect(302, '/buy/payment-error');
      });
  } else {
    res.redirect(302, '/');
  }
}

const redirectResponseToJson = (response: any, ccav: any) => {
  const ccavResponse: any = ccav.decrypt(response);
  const responseArray = ccavResponse.split('&');
  const stringify = JSON.stringify(responseArray);
  const removeQ = stringify.replace(/['"]+/g, '');
  const removeS = removeQ.replace(/[[\]]/g, '');
  return removeS.split(',').reduce((o: any, pair: any) => {
    pair = pair.split('=');
    return (o[pair[0]] = pair[1]), o;
  }, {});
};
