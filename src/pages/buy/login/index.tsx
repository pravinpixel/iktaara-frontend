import LoginLayout from '@/theme/layouts/LoginLayout';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { GrFormClose } from 'react-icons/gr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

export type ErrCallbackType = (err: { [key: string]: string }) => void;

const initialValues = { email: '', password: '' };

const formSchema = yup.object().shape({
  email: yup.string().required('${path} is required'),
  password: yup.string().required('${path} is required'),
});
const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<any>([]);
  const [errorshow, setErrorShow] = useState(false);
  const callbackUrl: any =
    router.query.callback || router.query.callbackUrl || '/';
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
        // router.replace(callbackUrl);
        window.location.replace(`${callbackUrl}`);
      } else {
        //setErrorShow(true);
        setLoading(false);
        //setMsg([...msg, 'invalid email or password']);
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
    <LoginLayout>
      <Head>
        <title>IKTARAA | Login</title>
      </Head>
      <div className="wrapper login">
        <div className="container">
          <div className="row justify-content-center pt-4">
            <div className="col-md-5 col-sm-8 col-xs-12">
              <div className="card">
                <div className="card-body">
                  <Alert show={errorshow} variant={'danger'}>
                    <ul className="error-list">
                      {msg.length > 0
                        ? msg.map((value: string, key: string) => {
                            return <li key={`error-${key}`}>{value}</li>;
                          })
                        : ''}
                    </ul>
                  </Alert>

                  <h5 className="text-center title my-3">
                    Login Here!
                    <span className="text-end">
                      <Link href="/">
                        <GrFormClose />
                      </Link>
                    </span>
                  </h5>
                  <form
                    className="form login-form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <TextField
                      autoComplete="off"
                      id="email"
                      name="email"
                      InputLabelProps={{ shrink: true }}
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      label="Email / Phone Number"
                      fullWidth
                      className="col-12 mb-3"
                      required
                      variant="outlined"
                      error={errors.email ? true : false}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <p className="text-end">
                      <Link href="/forgot-password">Forgot Password ?</Link>
                    </p>

                    <div className="mb-3 text-center">
                      <button type="submit" className="btn btn-dark text-light">
                        {loading ? 'loading...' : 'Sign In'}
                      </button>
                    </div>

                    <div className="bottom-line text-center my-2">
                      <p className="text-center">
                        <span>OR</span>
                      </p>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <div className="row social-login py-2">
                    <div className="col-6">
                      <Link
                        href={{
                          pathname: '/login/mobile',
                          query: {
                            callback: router.query.callback || '/',
                          },
                        }}
                        className="btn btn-dark"
                      >
                        <i className="fa-solid fa-phone"></i> Continue Via Phone
                      </Link>
                    </div>
                    <div className="col-6">
                      <div
                        role="button"
                        // href="#!"
                        className="btn btn-dark"
                        onClick={() => {
                          signIn('google', {
                            callbackUrl,
                            redirect: false,
                            guest_token: window.localStorage.getItem('UUID'),
                          });
                        }}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Login;
