const nodeCCAvenue = require('node-ccavenue');
import { createHash, createCipheriv, createDecipheriv } from 'crypto';

const NEXT_PUBLIC_CCAVENUE_ACCESS_CODE: any =
  process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE;
const NEXT_PUBLIC_CCAVENUE_WORKING_CODE: any =
  process.env.NEXT_PUBLIC_CCAVENUE_WORKING_CODE;
const NEXT_PUBLIC_CCAVENUE_URL: any = process.env.NEXT_PUBLIC_CCAVENUE_URL;
const NEXT_PUBLIC_MERCHANT_ID: any = process.env.NEXT_PUBLIC_MERCHANT_ID;

export const processes = (orderParams: any) => {
  const ccav = new nodeCCAvenue.Configure({
    merchant_id: NEXT_PUBLIC_MERCHANT_ID,
    working_key: NEXT_PUBLIC_CCAVENUE_WORKING_CODE,
  });

  const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
  const url = `${NEXT_PUBLIC_CCAVENUE_URL}transaction/transaction.do?command=initiateTransaction&encRequest=${encryptedOrderData}&access_code=${NEXT_PUBLIC_CCAVENUE_ACCESS_CODE}&merchant_id=${NEXT_PUBLIC_MERCHANT_ID}`;

  return url;
};

function throwError(requirement: any) {
  throw new Error(`${requirement} is required to perform this action`);
}

const encrypt = (plainText: any) => {
  if (plainText) {
    const m = createHash('md5');
    m.update(NEXT_PUBLIC_CCAVENUE_WORKING_CODE);
    const key = m.digest();
    const iv =
      '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
    const cipher = createCipheriv('aes-128-cbc', key, iv);
    let encoded = cipher.update(plainText, 'utf8', 'hex');
    encoded += cipher.final('hex');
    return encoded;
  } else {
    throwError('Plain text');
    return false;
  }
};

const decrypt = (encText: any) => {
  if (encText) {
    const m = createHash('md5');
    m.update(NEXT_PUBLIC_CCAVENUE_WORKING_CODE);
    const key = m.digest();
    const iv =
      '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
    const decipher = createDecipheriv('aes-128-cbc', key, iv);
    let decoded = decipher.update(encText, 'hex', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
  } else {
    throwError('Encrypted text');
    return false;
  }
};

export const redirectResponseToJson = (response: any) => {
  if (response) {
    const ccavResponse: any = decrypt(response);
    const responseArray = ccavResponse.split('&');
    const stringify = JSON.stringify(responseArray);
    const removeQ = stringify.replace(/['"]+/g, '');
    const removeS = removeQ.replace(/[[\]]/g, '');
    return removeS.split(',').reduce((o: any, pair: any) => {
      pair = pair.split('=');
      return (o[pair[0]] = pair[1]), o;
    }, {});
  } else {
    throwError('CCAvenue encrypted response');
  }
};

export const getEncryptedOrder = (orderParams: any) => {
  if (orderParams) {
    let data = `merchant_id=${NEXT_PUBLIC_MERCHANT_ID}`;
    data += Object.entries(orderParams)
      .map(([key, value]) => `&${key}=${value}`)
      .join('');
    return encrypt(data);
  } else {
    throwError('Order Params');
  }
};
