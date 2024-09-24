// import { useRouter } from 'next/router';
// import api from 'src/lib/api/user';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect, useState } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
// import LoginLayout from '@/theme/layouts/LoginLayout';
// import {
//   InputLabel,
//   OutlinedInput,
//   InputAdornment,
//   IconButton,
//   FormHelperText,
// } from '@mui/material';
// import FormControl from '@mui/material/FormControl';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import Head from 'next/head';
// import Alert from 'react-bootstrap/Alert';
// import Link from 'next/link';
// import { toast } from 'react-toastify';
// import * as yup from 'yup';
// import { useFormik } from 'formik';

// const requestSchema = yup.object().shape({
//   password: yup
//     .string()
//     .required('${path} is required')
//     .min(6, 'Password must be at least 6 characters')
//     .max(40, 'Password must not exceed 40 characters'),
//   confirmPassword: yup
//     .string()
//     .required('${path} is required')
//     .oneOf([yup.ref('password'), ''], 'Confirm Password does not match'),
// });

// const ResetPassword = () => {
//   const router = useRouter();
//   const [msg, setMsg] = useState<any>([]);
//   const [customer, setCustomer] = useState<number | null>(null);
//   const [errorshow, setErrorShow] = useState(false);
//   const [showPassword, setShowPassword] = useState(null);

//   const { token }: any = router.query;

//   useEffect(() => {
//     //if (token == undefined) {
//     //  router.push('/login');
//     //} else {
//     const result = api
//       .verifyPasswordToken({ token_id: token })
//       .then((res: any) => {
//         if (res.error === 0 && res.data) {
//           setCustomer(res.data?.id);
//           setErrorShow(false);
//         } else {
//           setCustomer(null);
//           setMsg(res.message);
//           setErrorShow(true);
//         }
//       });
//     //}
//   }, [token]);

//   const handleSetPassword = (values: any) => {
//     const postData: any = {
//       customer_id: customer,
//       password: values.password,
//       confirmPassword: values.confirmPassword,
//     };
//     const result = api.changePassword(postData).then((res: any) => {
//       if (res.error === 0) {
//         toast.success(res.message, {
//           hideProgressBar: true,
//           autoClose: 2000,
//           type: 'success',
//           position: 'top-center',
//         });
//         router.push('/login');
//       } else {
//         setMsg(res.message);
//         setErrorShow(true);
//         toast.error(res.message, {
//           hideProgressBar: true,
//           autoClose: 2000,
//           type: 'error',
//           position: 'top-center',
//         });
//         router.push('/forgot-password');
//       }
//     });
//   };

//   const { errors, touched, values, handleChange, handleSubmit } = useFormik({
//     initialValues: {
//       password: '',
//       confirmPassword: '',
//     },
//     validationSchema: requestSchema,
//     onSubmit: handleSetPassword,
//   });

//   const handleClickShowPassword = (value: any) => {
//     setShowPassword(value === showPassword ? null : value);
//   };
//   const handleMouseDownPassword = (
//     event: React.MouseEvent<HTMLButtonElement>,
//   ) => {
//     event.preventDefault();
//     setShowPassword(null);
//   };

//   return (
//     <>
//       <LoginLayout>
//         <Head>
//           <title>IKTARAA | Reset Password</title>
//         </Head>
//         <div className="wrapper login">
//           <Container>
//             <Row className="justify-content-center pt-4">
//               <Col className="col-md-5 col-sm-8 col-xs-12">
//                 <Card>
//                   <Card.Body>
//                     {errorshow == false ? (
//                       ''
//                     ) : (
//                       <>
//                         <Alert show={errorshow} variant={'danger'}>
//                           {msg}
//                         </Alert>
//                         <div className="form-floating mb-3 text-center">
//                           <Link
//                             href={'/forgot-password'}
//                             className="btn btn-dark"
//                           >
//                             Back To Forgot Password
//                           </Link>
//                         </div>
//                       </>
//                     )}
//                     {customer == null ? (
//                       ''
//                     ) : (
//                       <>
//                         <h5 className="title my-3 text-center">
//                           Reset Password
//                           <span className="text-end">
//                             <Link href="/">x</Link>
//                           </span>
//                         </h5>

//                         <form onSubmit={handleSubmit} method="post" noValidate>
//                           <FormControl
//                             variant="outlined"
//                             className="col-12 mb-3"
//                           >
//                             <InputLabel htmlFor="password">Password</InputLabel>
//                             <OutlinedInput
//                               id="password"
//                               name="password"
//                               required
//                               value={values.password}
//                               onChange={handleChange}
//                               type={
//                                 showPassword === 'password'
//                                   ? 'text'
//                                   : 'password'
//                               }
//                               endAdornment={
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={() =>
//                                       handleClickShowPassword('password')
//                                     }
//                                     onMouseDown={handleMouseDownPassword}
//                                     edge="end"
//                                   >
//                                     {showPassword === 'password' ? (
//                                       <VisibilityOff />
//                                     ) : (
//                                       <Visibility />
//                                     )}
//                                   </IconButton>
//                                 </InputAdornment>
//                               }
//                               label="Password"
//                               error={errors.password ? true : false}
//                             />
//                             <FormHelperText error>
//                               {errors.password ? errors.password : ' '}
//                             </FormHelperText>
//                           </FormControl>

//                           <FormControl
//                             variant="outlined"
//                             className="col-12 mb-3"
//                           >
//                             <InputLabel htmlFor="confirmPassword">
//                               Confirm Password
//                             </InputLabel>
//                             <OutlinedInput
//                               id="confirmPassword"
//                               name="confirmPassword"
//                               required
//                               value={values.confirmPassword}
//                               onChange={() => handleChange('confirmPassword')}
//                               type={
//                                 showPassword === 'confirmPassword'
//                                   ? 'text'
//                                   : 'password'
//                               }
//                               endAdornment={
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={() =>
//                                       handleClickShowPassword('confirmPassword')
//                                     }
//                                     onMouseDown={handleMouseDownPassword}
//                                     edge="end"
//                                   >
//                                     {showPassword === 'confirmPassword' ? (
//                                       <VisibilityOff />
//                                     ) : (
//                                       <Visibility />
//                                     )}
//                                   </IconButton>
//                                 </InputAdornment>
//                               }
//                               label="Confirm Password"
//                               error={errors.confirmPassword ? true : false}
//                             />
//                             <FormHelperText error>
//                               {errors.confirmPassword
//                                 ? errors.confirmPassword
//                                 : ' '}
//                             </FormHelperText>
//                           </FormControl>

//                           <div className="form-floating mb-3 text-center">
//                             <button type="submit" className="btn btn-dark">
//                               Update
//                             </button>
//                           </div>
//                         </form>
//                       </>
//                     )}
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </LoginLayout>
//     </>
//   );
// };

// export default ResetPassword;

import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';
import apis from 'src/lib/api/home';
import api from 'src/lib/api/user';
import * as yup from 'yup';
// import ProductLayout from '@/theme/layouts/ProductLayout';
import dynamic from 'next/dynamic';

const ProductLayout = dynamic(() => import('@/theme/layouts/ProductLayout'));
const requestSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), ''], 'Confirm Password does not match'),
});
const ResetPassword = (props: any) => {
  const { onclick, setPopUpType } = props;
  const router = useRouter();
  const [msg, setMsg] = useState<any>([]);
  const [customer, setCustomer] = useState<number | null>(null);
  const [errorshow, setErrorShow] = useState(false);
  const [showPassword, setShowPassword] = useState(null);
  const [banner, setBanner] = useState<any>();
  const { token }: any = router.query;
  useEffect(() => {
    //if (token == undefined) {
    //  router.push('/login');
    //} else {
    api.verifyPasswordToken({ token_id: token }).then((res: any) => {
      if (res?.error === 0 && res?.data) {
        setCustomer(res?.data?.id);
        setErrorShow(false);
      } else {
        setCustomer(null);
        setMsg(res?.message);
        setErrorShow(true);
      }
    });
    //}
  }, [token]);
  const handleSetPassword = (values: any) => {
    const postData: any = {
      customer_id: customer,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    api.changePassword(postData).then((res: any) => {
      if (res.error === 0) {
        toast.success(res.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'top-center',
        });
        router.push('/');
        // dispatch(openPopup());
        // setPopUpType('login');
      } else {
        setMsg(res.message);
        setErrorShow(true);
        toast.error(res.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'top-center',
        });
        router.push('/?login=enable');
        // setPopUpType('forgot');
      }
    });
  };

  const { errors, touched, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: requestSchema,
    onSubmit: handleSetPassword,
  });

  const handleClickShowPassword = (value: any) => {
    setShowPassword(value === showPassword ? null : value);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setShowPassword(null);
  };
  useEffect(() => {
    if (banner == null) {
      apis.getLoginBanner().then((res: any) => {
        if (res.status_code == 200) {
          setBanner(res.data);
        }
      });
    }
  }, [banner, setBanner]);

  return (
    <ProductLayout>
      <Grid
        container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        my={2}
      >
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} my={5} pt={{ xs: 2, md: 8 }}>
            {banner?.map((item: any) => (
              <Grid item xs={0} md={4.5} key={item.id}>
                <Box
                  sx={{
                    position: 'relative',
                    objectFit: 'contain',
                    aspectRatio: 0.62,
                  }}
                >
                  <Image
                    // src="/images/demo/static/login-banner.png"
                    src={item.image}
                    fill
                    alt={item.title}
                  />
                </Box>
              </Grid>
            ))}
            <Grid item xs={12} md={7.5}>
              <Container>
                <Grid container sx={{ py: 3 }}>
                  <Grid item xs={11} sx={{ textAlign: 'center' }}>
                    <h5 className="login-heading">Reset Password</h5>
                  </Grid>
                  <Grid item xs={1} sx={{ textAlign: 'end' }}>
                    <div onClick={onclick} className="login-pointer">
                      <CloseIcon />
                    </div>
                  </Grid>
                </Grid>
                {errorshow === false ? (
                  ''
                ) : (
                  <>
                    <Alert show={errorshow} variant={'danger'}>
                      {msg}
                    </Alert>
                    <Grid item xs={12} sx={{ textAlign: 'end' }}>
                      <button
                        type="submit"
                        className="login-button"
                        onClick={() => setPopUpType('forgot')}
                      >
                        {' '}
                        Back To Forgot Password
                      </button>
                    </Grid>
                  </>
                )}
                {customer === null ? (
                  ''
                ) : (
                  <form onSubmit={handleSubmit} method="post" noValidate>
                    <Grid item xs={12}>
                      <Typography>Password</Typography>
                      <TextField
                        autoComplete="off"
                        name="password"
                        InputLabelProps={{ shrink: true }}
                        // required
                        size="small"
                        fullWidth
                        className="my-2 textfield-placeholder"
                        value={values.password}
                        onChange={handleChange}
                        type={showPassword === 'password' ? 'text' : 'password'}
                        placeholder="Enter Password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                  handleClickShowPassword('password')
                                }
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword === 'password' ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={
                          errors.password && touched?.password ? true : false
                        }
                      />
                      {errors.password && (
                        <FormHelperText style={{ paddingTop: '4px' }} error>
                          {errors.password}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} my={2}>
                      <Typography> Confirm Password</Typography>
                      <TextField
                        autoComplete="off"
                        name="confirmPassword"
                        InputLabelProps={{ shrink: true }}
                        // required
                        size="small"
                        className="my-2 textfield-placeholder"
                        fullWidth
                        value={values.confirmPassword}
                        onChange={handleChange}
                        type={
                          showPassword === 'confirmPassword'
                            ? 'text'
                            : 'password'
                        }
                        placeholder="Enter Confirm Password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                  handleClickShowPassword('confirmPassword')
                                }
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword === 'confirmPassword' ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={
                          errors.confirmPassword && touched?.confirmPassword
                            ? true
                            : false
                        }
                      />
                      {errors.confirmPassword && (
                        <FormHelperText style={{ paddingTop: '4px' }} error>
                          {errors.confirmPassword}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'end' }}>
                      <button type="submit" className="login-button">
                        {' '}
                        Update
                      </button>
                    </Grid>
                  </form>
                )}
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ProductLayout>
  );
};

export default ResetPassword;
