import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

const secretKey = 'zaq12wsxcde34rvbgt5';

export const encryptId = (str: string) => {
  const ciphertext = AES.encrypt(str, secretKey);
  return encodeURIComponent(ciphertext.toString());
};

export const decryptId = (str: string) => {
  const decodedStr = decodeURIComponent(str);
  return AES.decrypt(decodedStr, secretKey).toString(enc.Utf8);
};
