/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import api from 'src/lib/api/user';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { addUser } from '@/redux/user-slice';

const initialValues = {
  currentPassword: '',
  password: '',
  confirmPassword: '',
};

const formSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required()
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  password: yup
    .string()
    .required('${path} is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: yup
    .string()
    .required('${path} is required')
    .oneOf([yup.ref('password'), ''], 'Confirm Password does not match'),
});
const ChangePassword = (props: any) => {
  const { Close } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [, setUser] = useState<any>(null);
  const { status } = useSession();
  const [loagged, setLoagged] = useState<boolean>(false);

  const handleUpdate = useCallback(async (values: any) => {
    const postData = {
      // customer_id: user.id,
      ...values,
      currentPassword: values.currentPassword,
      password: values.password,
    };

    await api.updatePassword(postData).then((res) => {
      if (res.status_code == 200) {
        if (res.error === 0) {
          router.push('/');
        }
      } else {
        toast.error(res.message);
      }
    });
  }, []);

  const {
    values,
    errors,
    isValid,
    dirty,
    touched,
    handleBlur,
    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik({
    onSubmit: handleUpdate,
    initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: formSchema,
  });

  const [show, setShow] = useState(null);
  // const [show, setShow] = useState({
  //   oldPassword: false,
  //   newPassword: false,
  //   confirmPassword: false,
  // });
  const handleShowPassword = (value: any) => {
    setShow(value === show ? null : value);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (loagged == false && status == 'authenticated') {
      api.getMe().then((res: any) => {
        setUser(res.customer_data);
        setFieldValue('customer_id', res.customer_data.id);
        dispatch(addUser(res.customer_data));
        return res.customer_data;
      });
      setLoagged(true);
    }
  }, [loagged, status]);

  return (
    <Container>
      <Grid container sx={{ p: 3 }}>
        <Grid item xs={10} sx={{ textAlign: 'center' }}>
          <h5 className="profile-change-password">Change Password</h5>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'end' }}>
          <div onClick={Close} className="login-pointer">
            <CloseIcon />
          </div>
        </Grid>
      </Grid>
      <Container>
        <form autoComplete="off" onSubmit={handleSubmit} method="post">
          <Grid item xs={12}>
            <Typography className="login-label">Current Password</Typography>
            <TextField
              autoComplete="off"
              name="currentPassword"
              InputLabelProps={{ shrink: true }}
              type={show === 'currentPassword' ? 'text' : 'password'}
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Current Password"
              fullWidth
              required
              variant="outlined"
              size="small"
              className="my-2"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword('currentPassword')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {show === 'currentPassword' ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={
                errors.currentPassword && touched.currentPassword ? true : false
              }
            />
            {/* {errors.currentPassword && (
              <FormHelperText error>{errors.currentPassword}</FormHelperText>
            )} */}
            {!!errors.currentPassword && touched.currentPassword && (
              <p className="text-danger Mui-error">{errors.currentPassword}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography className="login-label">New Password</Typography>
            <TextField
              autoComplete="off"
              name="password"
              InputLabelProps={{ shrink: true }}
              type={show === 'password' ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter New Password"
              fullWidth
              required
              variant="outlined"
              size="small"
              className="my-2"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword('password')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {show === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errors.password && touched.password ? true : false}
            />
            {/* {errors.password && (
              <FormHelperText error>{errors.password}</FormHelperText>
            )} */}
            {!!errors.password && touched.password && (
              <p className="text-danger Mui-error">{errors.password}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography className="login-label">Confirm Password</Typography>
            <TextField
              autoComplete="off"
              name="confirmPassword"
              InputLabelProps={{ shrink: true }}
              type={show === 'confirmPassword' ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Confirm Password"
              fullWidth
              required
              variant="outlined"
              size="small"
              className="my-2"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword('confirmPassword')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {show === 'confirmPassword' ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={
                errors.confirmPassword && touched.confirmPassword ? true : false
              }
            />
            {/* {errors.confirmPassword && (
              <FormHelperText error>{errors.confirmPassword}</FormHelperText>
            )} */}
            {!!errors.confirmPassword && touched.confirmPassword && (
              <p className="text-danger Mui-error">{errors.confirmPassword}</p>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ textAlign: 'end' }}
            my={2}
            mb={3}
            className="checkout-validate"
          >
            <button
              type="submit"
              className="login-button"
              disabled={!(isValid && dirty)}
            >
              {' '}
              Save{' '}
            </button>
          </Grid>
        </form>
      </Container>
    </Container>
  );
};

export default ChangePassword;
