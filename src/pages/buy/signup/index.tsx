import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Card from 'react-bootstrap/Card';
import LoginLayout from '@/theme/layouts/LoginLayout';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import api from 'src/lib/api/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { filter } from 'lodash';
import { GetServerSideProps } from 'next';
import homeApi from 'src/lib/api/home';
import MetaTags from 'src/components/common/header/MetaTags';
import Typography from '@mui/material/Typography';
import { Col, Container, Row } from 'react-bootstrap';
import { errorMessage } from '@/lib/helper';
import { GrFormClose } from 'react-icons/gr';

// interface Values {
//   firstName: string;
//   lastName: string;
//   mobile_no: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  mobile_no: '',
  password: '',
  confirmPassword: '',
};

const formSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  // lastName: yup.string().required('Last name is required'),
  lastName: yup.string(),
  email: yup
    .string()
    .email('E-Mail is invalid')
    .required('E-Mail is required')
    .matches(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, {
      message: 'Please enter valid email.',
      excludeEmptyString: false,
    }),
  mobile_no: yup
    .string()
    .matches(/^[0-9]\d{9}$/, {
      message: 'Please enter valid number.',
      excludeEmptyString: false,
    })
    .min(10, 'Invalid Mobile Number')
    .required('Mobile no is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters')
    .matches(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, {
      message: 'Use alphabets, special characters and numbers',
      excludeEmptyString: false,
    }),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), ''], 'Confirm Password does not match'),
});

const Register: FC = (props: any) => {
  const router = useRouter();
  const { meta } = props;
  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };

  const [msg, setMsg] = useState<any>([]);
  const [, setErrorShow] = useState(false);
  const [, setSuccesshow] = useState(false);

  const handleFormSubmit = async (values: any) => {
    setMsg([]);

    await api
      .singup(values)
      .then((res: any) => {
        if (res.status_code == '201') {
          setSuccesshow(true);
          setErrorShow(false);
          setMsg([...msg, res.message]);
          router.replace('/login');
          toast.success(res.message, {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
            position: 'top-center',
          });
        } else if (res.status_code == 422) {
          errorMessage(res);
          setErrorShow(true);
          setSuccesshow(false);
          filter(res.message, (value: any) => {
            setMsg([...msg, value[0]]);
          });
        } else {
          toast.error(res.message, {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
            position: 'top-center',
          });
        }
      })
      .catch((err) => console.log(err, 'err'));
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: formSchema,
  });

  const [showPassword, setShowPassword] = useState(null);
  const handleClickShowPassword = (value: any) =>
    setShowPassword(value === showPassword ? null : value);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <LoginLayout>
      <MetaTags meta={metaTags} />
      <div className="wrapper login">
        <Container>
          <Row className="justify-content-center pt-4">
            <Col className="col-lg-6 col-md-6 col-sm-10 col-xs-12">
              <Card>
                <Card.Body>
                  {/* <Alert show={successhow} variant={'success'}>
                    <ul className="error-list">
                      {msg.map((value: string, key: string) => {
                        return <li key={`error-${key}`}>{value}</li>;
                      })}
                    </ul>
                  </Alert>

                  <Alert show={errorshow} variant={'danger'}>
                    <ul className="error-list">
                      {msg.map((value: string, key: string) => {
                        return <li key={`error-${key}`}>{value}</li>;
                      })}
                    </ul>
                  </Alert> */}

                  <form className="form login-form" onSubmit={handleSubmit}>
                    <Typography
                      variant="h5"
                      align="center"
                      className="title my-3"
                    >
                      Register Here!
                      <span className="text-end">
                        <Link href="/">
                          <GrFormClose />
                        </Link>
                      </span>
                    </Typography>
                    <Row>
                      <Col className="col-md-6 col-sm-12">
                        <TextField
                          id="firstName"
                          name="firstName"
                          onBlur={handleBlur}
                          value={values.firstName}
                          onChange={handleChange}
                          label="First Name"
                          className="mb-3"
                          // required
                          fullWidth
                          variant="outlined"
                          error={
                            errors.firstName && touched?.firstName
                              ? true
                              : false
                          }
                          helperText={touched?.firstName && errors.firstName}
                        />
                      </Col>
                      <Col className="col-md-6 col-sm-12">
                        <TextField
                          id="lastName"
                          name="lastName"
                          onBlur={handleBlur}
                          value={values.lastName}
                          onChange={handleChange}
                          label="Last Name"
                          className="mb-3"
                          // required
                          fullWidth
                          variant="outlined"
                          helperText={touched?.lastName && errors.lastName}
                          error={
                            errors.lastName && touched?.lastName ? true : false
                          }
                        />
                      </Col>
                    </Row>
                    <TextField
                      id="email"
                      name="email"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      label="Email Address"
                      fullWidth
                      className="col-12 mb-3"
                      // required
                      variant="outlined"
                      helperText={touched?.email && errors.email}
                      error={errors.email && touched?.email ? true : false}
                    />

                    <TextField
                      id="mobile_no"
                      name="mobile_no"
                      onBlur={handleBlur}
                      fullWidth
                      value={values.mobile_no}
                      onChange={handleChange}
                      label="Mobile Number"
                      className="col-12 mb-3"
                      // required
                      variant="outlined"
                      helperText={touched?.mobile_no && errors.mobile_no}
                      error={
                        errors.mobile_no && touched?.mobile_no ? true : false
                      }
                    />

                    <FormControl variant="outlined" className="col-12 mb-3">
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <OutlinedInput
                        id="password"
                        name="password"
                        // required
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={showPassword === 'password' ? 'text' : 'password'}
                        endAdornment={
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
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        error={
                          errors.password && touched?.password ? true : false
                        }
                      />
                      {errors.password && touched?.password && (
                        <p className="text-danger Mui-error">
                          {errors.password}
                        </p>
                      )}
                    </FormControl>

                    <FormControl variant="outlined" className="col-12 mb-3">
                      <InputLabel htmlFor="confirmPassword">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="confirmPassword"
                        name="confirmPassword"
                        // required
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={
                          showPassword === 'confirmPassword'
                            ? 'text'
                            : 'password'
                        }
                        endAdornment={
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
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                        error={
                          errors.confirmPassword && touched?.confirmPassword
                            ? true
                            : false
                        }
                      />
                      {errors.confirmPassword && touched?.confirmPassword && (
                        <p className="text-danger Mui-error">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </FormControl>

                    <div className="mb-3 text-center">
                      <button
                        disabled={isSubmitting}
                        // disabled={!(isValid && dirty)}
                        type="submit"
                        className="btn btn-dark text-light"
                      >
                        {isSubmitting ? 'loading...' : 'Sign Up'}
                      </button>
                    </div>
                  </form>
                  <p className="text-center m-2 border-top pt-2">
                    Already have an account?{' '}
                    <Link href="/login">Login Here! </Link>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </LoginLayout>
  );
};
export default Register;
export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await homeApi
    .getMetaData({ page: 'register' })
    .then((res: any) => {
      if (res.error == 0 && res.status_code == 200) {
        return {
          title: res.data.meta_title || 'Register | Iktaraa',
          keywords: res.data.meta_keywords,
          description: res.data.meta_description,
          image:
            res?.data?.meta_image ||
            res?.data?.logo ||
            '/public/images/logo.svg',
        };
      }
      return [];
    });

  return {
    props: {
      meta: meta,
    },
  };
};
