import { Container, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import Link from 'next/link';
import ImageComponent from '@/utils/imageComponent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/user';
const initialValues = { email: '' };

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-Mail is invalid')
    .required('Email ID is required'),
});
const ForgetPasswordWidget = (props: any) => {
  const { onclick, setPopUpType } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [, setMsg] = useState<any>([]);
  const [, setErrorShow] = useState(false);

  const handleFormSubmit = (values: any) => {
    setMsg([]);
    setLoading(true);
    setErrorShow(false);
    api.forgetPassword(values).then((res: any) => {
      toast.success(res?.message, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
        position: 'top-center',
      });

      setPopUpType('login');
    });
  };
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });
  return (
    <Container>
      <Grid container sx={{ py: 3 }}>
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
          <h5 className="login-heading">Forgot Password</h5>
        </Grid>
        <Grid item xs={1} sx={{ textAlign: 'end' }}>
          <div onClick={onclick} className="login-pointer d-none d-sm-flex">
            <CloseIcon />
          </div>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Typography className="login-label">
            Email ID / Phone number
          </Typography>
          <TextField
            id="email"
            name="email"
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            placeholder="thomas@gmail.com"
            fullWidth
            className="col-12 mb-3 my-2 textfield-placeholder"
            required
            variant="outlined"
            size="small"
            autoComplete="off"
            error={errors.email ? true : false}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'end' }}>
          <button
            type="submit"
            disabled={errors.email ? true : false}
            className="login-button"
          >
            {' '}
            {loading ? 'loading...' : 'Submit'}
          </button>
        </Grid>
      </form>
      <Grid item xs={12}>
        <div className=" m-4 ">
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

export default ForgetPasswordWidget;
