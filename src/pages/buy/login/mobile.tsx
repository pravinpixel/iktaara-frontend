/* eslint-disable @typescript-eslint/no-use-before-define */
import LoginLayout from '@/theme/layouts/LoginLayout';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { GrFormClose } from 'react-icons/gr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/user';
import * as yup from 'yup';
const requestSchema = yup.object().shape({
  mobile_no: yup
    .string()
    .matches(/^[0-9]\d{9}$/, {
      message: 'Please enter valid number.',
      excludeEmptyString: false,
    })
    .min(10, 'Invalid Mobile Number')
    .required('Mobile no is required'),
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

const MobileLogin = () => {
  const router = useRouter();
  const [msg, setMsg] = useState<any>([]);
  const [mobile, setMobile] = useState<boolean>(false);
  const [, setOtp] = useState<string | null>(null);
  const [errorshow, setErrorShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [otpButtonStatus, setOtpButtonStatus] = useState<boolean>(false);
  const callbackUrl = '/';

  const inputRefs: React.MutableRefObject<HTMLInputElement | null | any>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    // Add more refs for each input field
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
      // Add more number-string mappings as needed
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
      } else {
        setErrorShow(true);
        setLoading(false);
        setMsg([...msg, 'invalid otp']);
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
        if (res.status_code == 200) {
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
          //setErrorShow(true);
          //setMsg([...msg, res.message]);
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
    console.log('eeee');
  };

  useEffect(() => {
    if (values.mobile_no == '' || errors.mobile_no) {
      setOtpButtonStatus(false);
    } else {
      setOtpButtonStatus(true);
    }
  }, [errors, values]);

  return (
    <LoginLayout>
      <Head>
        <title>IKTARAA | Login</title>
      </Head>
      <div className="wrapper login">
        <Container>
          <Row className="justify-content-center pt-4">
            <Col className="col-md-5 col-sm-8 col-xs-12">
              <Card>
                <Card.Body>
                  <Alert show={errorshow} variant={'danger'}>
                    <ul className="error-list">
                      {msg.map((value: string, key: string) => {
                        return <li key={`error-${key}`}>{value}</li>;
                      })}
                    </ul>
                  </Alert>

                  <h5 className="title my-3 text-center">
                    Login With OTP Here!
                    <span className="text-end">
                      <Link href="/">
                        <GrFormClose />
                      </Link>
                    </span>
                  </h5>

                  <form onSubmit={handleSubmit} method="post">
                    {mobile == false ? (
                      <div id="request-otp">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className={
                              errors.mobile_no
                                ? 'form-control is-invalid'
                                : 'form-control'
                            }
                            name="mobile_no"
                            defaultValue={values.mobile_no}
                            onChange={handleChange}
                            id="mobile_no"
                            required
                          />
                          <label htmlFor="mobile_no">Mobile Number </label>
                          {!!errors.mobile_no && (
                            <p className="text-danger Mui-error">
                              {errors.mobile_no}
                            </p>
                          )}
                        </div>
                        <div className="form-floating mb-3 text-center">
                          <button
                            disabled={otpButtonStatus == false ? true : false}
                            className="btn btn-dark"
                            onClick={() => {
                              handleRequestOtp(values.mobile_no);
                            }}
                          >
                            Request OTP
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="verify-otp">
                        <p className="text-center">
                          Please enter the OTP sent to
                          <span className="text-dark"> {values.mobile_no}</span>
                          .{' '}
                          <span
                            role="button"
                            // href={'#!'}
                            onClick={() => {
                              setMobile(false);
                            }}
                          >
                            Edit
                          </span>
                        </p>
                        <div
                          id="otp"
                          className="inputs d-flex flex-row justify-content-center mt-2 otp-box"
                        >
                          {inputRefs.map((ref, index) => {
                            const newValues: any = values;
                            return (
                              <input
                                key={index}
                                className="m-2 text-center form-control rounded"
                                type="text"
                                max={1}
                                maxLength={1}
                                value={newValues[numberToString(index)]}
                                id={numberToString(index)}
                                name={numberToString(index)}
                                onChange={(e) => handleInputBlur(e, index)}
                                ref={ref}
                              />
                            );
                          })}
                        </div>

                        {/* <div
                          id="otp"
                          className="inputs d-flex flex-row justify-content-center mt-2 otp-box"
                        >
                          <input
                            className="m-2 text-center form-control rounded"
                            type="text"
                            name="one"
                            minLength={1}
                            maxLength={1}
                            onChange={handleChange}
                            defaultValue={values.one}
                            id="first"
                            max="1"
                          />

                          <input
                            className="m-2 text-center form-control rounded"
                            type="text"
                            name="two"
                            minLength={1}
                            maxLength={1}
                            onChange={handleChange}
                            defaultValue={values.two}
                            id="two"
                          />
                          <input
                            className="m-2 text-center form-control rounded"
                            type="text"
                            name="three"
                            minLength={1}
                            maxLength={1}
                            onChange={handleChange}
                            defaultValue={values.three}
                            id="three"
                          />
                          <input
                            className="m-2 text-center form-control rounded"
                            type="text"
                            name="four"
                            minLength={1}
                            maxLength={1}
                            onChange={handleChange}
                            value={values.four}
                            id="four"
                          />
                          <input
                            className="m-2 text-center form-control rounded"
                            type="text"
                            name="five"
                            onChange={handleChange}
                            defaultValue={values.five}
                            id="five"
                          />
                          <input
                            className="m-2 text-center form-control rounded"
                            type="text"
                            name="six"
                            minLength={1}
                            maxLength={1}
                            onChange={handleChange}
                            defaultValue={values.six}
                            id="six"
                          />
                        </div> */}
                        <div className="form-floating mb-3 text-center">
                          <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-dark"
                            onClick={() => {
                              handleVerifyOtp();
                            }}
                          >
                            {loading ? 'Loading...' : 'Verify'}
                          </button>
                        </div>
                        <p className="text-center">
                          Not received your code?{' '}
                          <div
                            style={{
                              textDecoration: 'underline',
                            }}
                            className="cursor-pointer"
                            onClick={() => {
                              handleRequestOtp(values.mobile_no);
                            }}
                          >
                            Resend Code
                          </div>
                        </p>
                      </div>
                    )}
                  </form>
                </Card.Body>
                <Card.Footer>
                  <div className="row social-login py-2">
                    <div className="col-6">
                      <Link href="/login" className="btn btn-dark">
                        <i className="fa-solid fa-envelope"></i> Continue Via
                        Email
                      </Link>
                    </div>
                    <div className="col-6">
                      <div
                        role="button"
                        // href="#!"
                        className="btn btn-dark"
                        onClick={() =>
                          signIn('google', {
                            callbackUrl,
                            guest_token: window.localStorage.getItem('UUID'),
                          })
                        }
                      >
                        <i className="fa-brands fa-google"></i> Continue Via
                        Google
                      </div>
                    </div>
                  </div>

                  <div className=" m-2 ">
                    <p className="text-center">
                      Don't have an account?{' '}
                      <Link href="/signup">Register Here!</Link>
                    </p>
                    {/* <p className="text-center">
                      Track To Seller Log In?{' '}
                      <Link href="/signup"> Click Here!</Link>
                    </p> */}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </LoginLayout>
  );
};

export default MobileLogin;
