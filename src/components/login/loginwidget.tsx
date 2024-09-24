import {
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Container,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import ImageComponent from '@/utils/imageComponent';
export type ErrCallbackType = (err: { [key: string]: string }) => void;
const initialValues = { email: '', password: '' };
const formSchema = yup.object().shape({
  email: yup.string().required('Email ID is required'),
  password: yup.string().required('Password is required'),
});
const Loginwidget = (props: any) => {
  const { onclick, setPopUpType } = props;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [, setMsg] = useState<any>([]);
  const [, setErrorShow] = useState(false);
  const callbackUrl: any =
    router.query.callback || router.query.callbackUrl || router.asPath;
  console.log(callbackUrl);

  const handleFormSubmit = async (values: any) => {
    try {
      setLoading(true);
      setErrorShow(false);
      const res = await signIn('sign-in', {
        redirect: false,
        email: values.email,
        password: values.password,
        guest_token: window.localStorage.getItem('UUID'),
        callbackUrl,
      });
      if (!res?.error) {
        setLoading(false);

        window.location.replace(callbackUrl);
      } else {
        setLoading(false);
        toast.error('Invalid Email or Password', {
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
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={11} sx={{ textAlign: 'center' }}>
          <h5 className="login-heading">Login</h5>
        </Grid>
        <Grid item xs={1} sx={{ textAlign: 'end' }}>
          <div onClick={onclick} className="login-pointer">
            <CloseIcon />
          </div>
        </Grid>
      </Grid>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Typography className="login-label">
            Email ID / Phone number
          </Typography>
          <TextField
            autoComplete="off"
            id="email"
            name="email"
            InputLabelProps={{ shrink: true }}
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            placeholder="Email / Phone Number"
            fullWidth
            required
            variant="outlined"
            size="small"
            className="my-2 textfield-placeholder"
            error={errors.email ? true : false}
          />
          {errors.email && (
            <FormHelperText style={{ paddingTop: '4px' }} error>
              {errors.email}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography className="login-label">Password</Typography>
          <TextField
            autoComplete="off"
            name="password"
            InputLabelProps={{ shrink: true }}
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            placeholder="Enter Password"
            fullWidth
            required
            variant="outlined"
            size="small"
            className="my-2 textfield-placeholder"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.password && (
            <FormHelperText style={{ paddingTop: '4px' }} error>
              {errors.password}
            </FormHelperText>
          )}
        </Grid>
        <Grid
          container
          className="my-1"
          justifyContent={'center'}
          alignItems="center"
        >
          <Grid item xs={6}>
            <p
              className="login-forget-password"
              onClick={() => setPopUpType('forgot')}
            >
              Forgot Password?
            </p>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'end' }}>
            <button type="submit" className="login-button">
              {' '}
              {loading ? 'loading...' : 'Login'}
            </button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className="bottom-line1 text-center my-1">
            <p className="text-center">
              <span>OR</span>
            </p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="row social-login1 py-1">
            <div className="col-12 mb-3">
              <div
                role="button"
                // href="#!"
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
          <div className=" m-2 ">
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
      </form>
    </Container>
  );
};

export default Loginwidget;
