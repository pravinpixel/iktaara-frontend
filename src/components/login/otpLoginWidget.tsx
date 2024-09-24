/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/user';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
// import { GrFormClose } from 'react-icons/gr';
// import dayjs, { Dayjs } from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import ImageComponent from '@/utils/imageComponent';
const requestSchema = yup.object().shape({
  mobile_no: yup
    .string()
    .matches(/^[0-9]\d{9}$/, {
      message: 'Please enter valid number.',
      excludeEmptyString: false,
    })
    .min(10, 'Invalid Mobile Number')
    .required('Mobile No is required'),
  one: yup.string().required('${path} is required'),
  two: yup.string().required('${path} is required'),
  three: yup.string().required('${path} is required'),
  four: yup.string().required('${path} is required'),
  five: yup.string().required('${path} is required'),
  six: yup.string().required('${path} is required'),
});
const initialValues = {
  mobile_no: '',
  one: '',
  two: '',
  three: '',
  four: '',
  five: '',
  six: '',
};

const OtpLoginWidget = (props: any) => {
  const { onclick, setPopUpType } = props;
  const router = useRouter();
  const [msg, setMsg] = useState<any>([]);
  const [mobile, setMobile] = useState<boolean>(false);
  const [, setOtp] = useState<string | null>(null);
  const [, setErrorShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [otpButtonStatus, setOtpButtonStatus] = useState<boolean>(false);
  const callbackUrl = '/buy';
  const inputRefs: React.MutableRefObject<HTMLInputElement | null | any>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const handleInputBlur = (e: any, currentIdx: any) => {
    const nextIdx = currentIdx + 1;
    if (nextIdx <= inputRefs.length && inputRefs?.[currentIdx]?.current) {
      handleChange(e);
      if (inputRefs[currentIdx].current.value.length > 0) {
        inputRefs[nextIdx]?.current.focus();
      } else {
      }
    }
  };
  const numberToString = (number: any) => {
    const numberMap: any = {
      0: 'one',
      1: 'two',
      2: 'three',
      3: 'four',
      4: 'five',
      5: 'six',
    };

    return numberMap[number] as string;
  };
  const handleVerify = async (values: any) => {
    const otp =
      values.one +
      '' +
      values.two +
      '' +
      values.three +
      '' +
      values.four +
      '' +
      values.five +
      '' +
      values.six;

    try {
      const callback: any = router.query.callback || '';
      setLoading(true);
      setErrorShow(false);
      const res = await signIn('otp-login', {
        redirect: false,
        phone: values.mobile_no,
        guest_token: window.localStorage.getItem('UUID'),
        otp: otp,
        callbackUrl: callback,
      });
      if (!res?.error) {
        setLoading(false);
        const callback: any = router.query.callback || '';
        router.replace(callback);
        onclick();
      } else {
        setErrorShow(true);
        setLoading(false);
        setMsg([...msg, 'invalid otp']);
        toast.error('Invalid OTP', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'top-center',
        });
      }
    } catch (error: any) {
      setLoading(false);
      setMsg(error);
    }
  };
  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: requestSchema,
    onSubmit: handleVerify,
  });
  const handleRequestOtp = async (values: any) => {
    setLoading(true);
    if (!errors.mobile_no && values.mobile != '') {
      const postData = {
        mobile_no: values,
      };
      await api.requestOtp(postData).then((res: any) => {
        if (res?.status_code == 200) {
          setMobile(true);
          setOtp(res.data.otp);
          toast.success(res.message, {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
            position: 'top-center',
          });
          setLoading(false);
        } else {
          toast.error('The selected mobile no is invalid / or exits', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
            position: 'top-center',
          });
        }
      });
    } else {
      setOtpButtonStatus(false);
    }
  };
  const handleVerifyOtp = () => {
    console.log('values');
  };

  useEffect(() => {
    if (values.mobile_no == '' || errors.mobile_no) {
      setOtpButtonStatus(false);
    } else {
      setOtpButtonStatus(true);
    }
  }, [errors, values]);

  return (
    <Container>
      <Grid container sx={{ py: 3 }}>
        <Grid item xs={10} sx={{ textAlign: 'center' }}>
          <h5 className="login-heading">OTP Login</h5>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'end' }}>
          <div onClick={onclick} className="login-pointer">
            <CloseIcon />
          </div>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit} method="post">
        {mobile == false ? (
          <div id="request-otp">
            <Grid item xs={12} mb={3}>
              <Typography className="login-label" mb={1}>
                Mobile Number
              </Typography>
              <TextField
                type="text"
                fullWidth
                name="mobile_no"
                defaultValue={values.mobile_no}
                onChange={handleChange}
                id="mobile_no"
                required
                placeholder="92838 29380"
                size="small"
                className="my-2 textfield-placeholder"
              />
              {errors.mobile_no && (
                <FormHelperText style={{ paddingTop: '4px' }} error>
                  {errors.mobile_no}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'end' }}>
              <button
                disabled={otpButtonStatus == false ? true : false}
                onClick={() => {
                  handleRequestOtp(values.mobile_no);
                }}
                type="submit"
                className="login-button"
              >
                {' '}
                Request OTP
              </button>
            </Grid>
          </div>
        ) : (
          <div className="verify-otp">
            <p className=" login-verify">
              Please enter the OTP sent to
              <span className="login-verify"> {values.mobile_no}</span>.{' '}
              <span
                role="button"
                onClick={() => {
                  setMobile(false);
                }}
                className="login-edit"
              >
                Edit
              </span>
            </p>
            <div
              id="otp"
              className="inputs d-flex flex-row justify-content-center mt-2 otp-box1"
            >
              {inputRefs.map((ref, index) => {
                const newValues: any = values;
                return (
                  <input
                    key={index}
                    className="m-2 text-center form-control "
                    type="text"
                    max={1}
                    maxLength={1}
                    value={newValues[numberToString(index)]}
                    id={numberToString(index)}
                    name={numberToString(index)}
                    onChange={(e) => handleInputBlur(e, index)}
                    ref={ref}
                    placeholder={newValues[numberToString(index)] ? '' : 'x'}
                  />
                );
              })}
            </div>

            <Grid
              container
              className="my-4"
              justifyContent={'center'}
              alignItems="center"
            >
              <Grid item xs={6}>
                <div
                  className="cursor-pointer login-resend"
                  onClick={() => {
                    handleRequestOtp(values.mobile_no);
                  }}
                >
                  Resend OTP
                </div>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'end' }}>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={() => {
                    handleVerifyOtp();
                  }}
                  className="login-button"
                >
                  {loading ? 'Loading...' : 'Validate'}
                </button>
              </Grid>
            </Grid>
          </div>
        )}
      </form>
      <Grid item xs={12}>
        <div className="bottom-line1 text-center my-2">
          <p className="text-center">
            <span>OR</span>
          </p>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="row social-login1 py-2">
          <div className="col-12 mb-3">
            <div
              role="button"
              className="btn d-flex justify-content-center align-items-center"
              onClick={() => {
                signIn('google', {
                  callbackUrl,
                  redirect: false,
                  guest_token: window.localStorage.getItem('UUID'),
                });
              }}
            >
              <ImageComponent
                src="/images/demo/static/google.png"
                width={26}
                height={26}
                alt="arrow"
                priority={true}
                className="google--icon"
              />
              {/* <img
                src="/images/demo/static/google.png"
                className="google--icon"
              />{' '} */}
              Continue with Google
            </div>
          </div>
          <div className="col-12">
            <div
              className="btn d-flex justify-content-center align-items-center"
              onClick={() => setPopUpType(null)}
            >
              <ImageComponent
                src="/images/demo/static/Vector.png"
                width={20}
                height={30}
                alt="arrow"
                priority={true}
                className="google--icon"
              />
              {/* <img
                src="/images/demo/static/Vector.png"
                className="google--icon"
              /> */}
              Continue with Phone
            </div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className=" m-3 ">
          <p className="text-center login-account-create">
            Don't have an account?{' '}
            <span
              className="login-register"
              onClick={() => setPopUpType('create')}
            >
              Register Here!
            </span>
          </p>
        </div>
      </Grid>
    </Container>
  );
};

export default OtpLoginWidget;
