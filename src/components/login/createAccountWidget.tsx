import { Container, Grid, TextField, Typography } from '@mui/material';
// import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormik } from 'formik';
import { filter } from 'lodash';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/user';
import * as yup from 'yup';
// import Alert from 'react-bootstrap/Alert';
// import { GetServerSideProps } from 'next';
// import homeApi from 'src/lib/api/home';
// import MetaTags from 'src/components/common/header/MetaTags';
import { errorMessage } from '@/lib/helper';
// import { GrFormClose } from 'react-icons/gr';
import ImageComponent from '@/utils/imageComponent';

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
  firstName: yup.string().required('First Name is required'),
  // lastName: yup.string().required('Last name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Email ID is invalid')
    .required('Email ID is required')
    .matches(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, {
      message: 'Please enter valid Email.',
      excludeEmptyString: false,
    }),
  mobile_no: yup
    .string()
    .matches(/^[0-9]\d{9}$/, {
      message: 'Please enter valid number.',
      excludeEmptyString: false,
    })
    .min(10, 'Invalid Mobile Number')
    .required('Mobile No is required'),
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
const CreateAccountWidget = (props: any) => {
  const { onclick, setPopUpType } = props;
  const [msg, setMsg] = useState<any>([]);
  const [, setErrorShow] = useState(false);
  const [, setSuccesshow] = useState(false);
  const handleFormSubmit = async (values: any) => {
    setMsg([]);

    await api
      .singup(values)
      .then((res: any) => {
        if (res?.status_code == '201') {
          setSuccesshow(true);
          setErrorShow(false);
          setMsg([...msg, res?.message]);

          setPopUpType('login');
          toast.success(res?.message, {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
            position: 'top-center',
          });
        } else if (res?.status_code == 422) {
          errorMessage(res);
          setErrorShow(true);
          setSuccesshow(false);
          filter(res.message, (value: any) => {
            setMsg([...msg, value[0]]);
          });
        } else {
          toast.error(res?.message, {
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

  // const [showPassword, setShowPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = (fieldName: string) => {
    if (fieldName === 'password') {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    } else if (fieldName === 'confirmPassword') {
      setShowConfirmPassword(
        (prevShowConfirmPassword) => !prevShowConfirmPassword,
      );
    }
  };
  // const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Grid container sx={{ py: 1 }}>
        <Grid item xs={1}>
          <div onClick={() => setPopUpType('login')} className="login-pointer">
            {/* <img
              src="/images/demo/static/login-arrow.png"
              width="15px"
              height="15px"
            /> */}
            <ImageComponent
              src="/images/demo/static/login-arrow.png"
              width={12}
              height={16}
              alt="arrow"
              priority={true}
            />
          </div>
        </Grid>
        <Grid item xs={10} sx={{ textAlign: 'center' }}>
          <h5 className="login-heading">Create Account</h5>
        </Grid>
        <Grid item xs={1} sx={{ textAlign: 'end' }}>
          <div onClick={onclick} className="login-pointer d-none d-sm-flex">
            <CloseIcon />
          </div>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography className="login-label">First Name</Typography>
            <TextField
              id="firstName"
              name="firstName"
              onBlur={handleBlur}
              value={values.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              size="small"
              className=" textfield-placeholder"
              // required
              fullWidth
              variant="outlined"
              error={errors.firstName && touched?.firstName ? true : false}
              helperText={touched?.firstName && errors.firstName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="login-label">Last Name</Typography>
            <TextField
              id="lastName"
              name="lastName"
              onBlur={handleBlur}
              value={values.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              size="small"
              // required
              className=" textfield-placeholder"
              fullWidth
              variant="outlined"
              helperText={touched?.lastName && errors.lastName}
              error={errors.lastName && touched?.lastName ? true : false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="login-label">Email ID</Typography>
            <TextField
              id="email"
              name="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              placeholder="Enter Email ID"
              fullWidth
              size="small"
              className=" textfield-placeholder"
              // required
              variant="outlined"
              helperText={touched?.email && errors.email}
              error={errors.email && touched?.email ? true : false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="login-label">Mobile Number</Typography>
            <TextField
              id="mobile_no"
              name="mobile_no"
              onBlur={handleBlur}
              fullWidth
              value={values.mobile_no}
              onChange={handleChange}
              placeholder="e.g.92239 23899"
              size="small"
              className=" textfield-placeholder"
              // required
              variant="outlined"
              helperText={touched?.mobile_no && errors.mobile_no}
              error={errors.mobile_no && touched?.mobile_no ? true : false}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography className="login-label">Password</Typography>
            <TextField
              autoComplete="off"
              name="password"
              InputLabelProps={{ shrink: true }}
              // required
              size="small"
              className="textfield-placeholder"
              fullWidth
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('password')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errors.password && touched?.password ? true : false}
            />

            {errors.password && touched?.password && (
              <p
                className="text-danger Mui-error"
                style={{ paddingTop: '4px' }}
              >
                {errors.password}
              </p>
            )}
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography className="login-label">Confirm Password</Typography>
            <TextField
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
              fullWidth
              className=" textfield-placeholder"
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('confirmPassword')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Enter Confirm Password"
              error={
                errors.confirmPassword && touched?.confirmPassword
                  ? true
                  : false
              }
            />
            {errors.confirmPassword && touched?.confirmPassword && (
              <p
                className="text-danger Mui-error"
                style={{ paddingTop: '4px' }}
              >
                {errors.confirmPassword}
              </p>
            )}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'end' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="login-button"
            >
              {' '}
              {isSubmitting ? 'loading...' : 'Register'}
            </button>
          </Grid>
        </Grid>
      </form>
      <Grid item xs={12}>
        <div className=" m-1 pt-1 ">
          <p className="text-center login-account-create">
            Already have account? 
            <span
              className="login-register"
              onClick={() => setPopUpType('login')}
            >
              Login
            </span>
          </p>
        </div>
      </Grid>
    </Container>
  );
};

export default CreateAccountWidget;
