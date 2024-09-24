/* eslint-disable react-hooks/exhaustive-deps */
import { openPopup } from '@/redux/user-slice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/user';

const VerifyToken = () => {
  const router = useRouter();
  const { token }: any = router.query;

  const dispatch = useDispatch();
  useEffect(() => {
    if (token == undefined) {
      router.push('/buy');
    } else {
      api.verifyAccount({ token: token }).then((res: any) => {
        if (res.status_code == 200) {
          toast?.success(res.message, {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
            position: 'top-center',
          });
          // router.push('/?login=enable');
          dispatch(openPopup());
        }
      });
    }
  }, [token]);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return <></>;
};

export default VerifyToken;
