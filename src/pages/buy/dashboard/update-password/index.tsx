/* eslint-disable react-hooks/exhaustive-deps */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/user';
import { addUser } from 'src/redux/user-slice';
import DashboardLayout from 'src/theme/layouts/DashboardLayout';
import * as yup from 'yup';

const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const formSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Current Password is required')
    .min(6, 'Current Password must be at least 6 characters')
    .max(40, 'Current Password must not exceed 40 characters'),
  newPassword: yup
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
    .oneOf([yup.ref('newPassword'), ''], 'Confirm Password does not match'),
});

const ChangePassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [, setUser] = useState<any>(null);
  const { status } = useSession();
  const [loagged, setLoagged] = useState<boolean>(false);

  const handleUpdate = useCallback(async (values: any) => {
    const postData = {
      // customer_id: user.id,
      ...values,
      currentPassword: values.oldPassword,
      password: values.newPassword,
    };

    await api.updatePassword(postData).then((res) => {
      if (res.status_code == 200) {
        if (res.error === 0) {
          router.push('/dashboard');
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
    loagged == true && (
      <>
        <DashboardLayout
          active={[
            {
              link: router.asPath,
              string: 'Update password',
            },
          ]}
        >
          <section className="outlet-child-1" />
          <section className="outlet-child-2">
            <section className="d-flex flex-column align-items-center justify-content-center outlet-child-section">
              <div className="d-flex justify-content-between w-100 myprofile-top">
                <p className="myprofile-para">Change password</p>
              </div>
              <div className=" rounded profile-section ">
                <form
                  onSubmit={handleSubmit}
                  name="profile-edit"
                  className="row d-flex align-items-center profile-section-form"
                >
                  <div className="col-md-12 profile-form  ">
                    <label className="form-label" htmlFor="password">
                      Current Password
                    </label>
                    <FormControl variant="outlined" className="col-12 mb-3">
                      <TextField
                        id="password"
                        name="oldPassword"
                        size="small"
                        required
                        value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={show === 'oldPassword' ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  handleShowPassword('oldPassword');
                                }}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {show === 'oldPassword' ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={
                          errors.oldPassword && touched.oldPassword
                            ? true
                            : false
                        }
                      />
                      {!!errors.oldPassword && touched.oldPassword && (
                        <p className="text-danger Mui-error">
                          {errors.oldPassword}
                        </p>
                      )}
                    </FormControl>
                  </div>
                  <div className="col-md-6 profile-form">
                    <label className="form-label" htmlFor="password">
                      New Password
                    </label>
                    <FormControl variant="outlined" className="col-12 mb-3">
                      <TextField
                        size="small"
                        id="password"
                        name="newPassword"
                        required
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={show === 'newPassword' ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  handleShowPassword('newPassword');
                                }}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {show === 'newPassword' ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={
                          errors.newPassword && touched.newPassword
                            ? true
                            : false
                        }
                      />
                      {!!errors.newPassword && touched.newPassword && (
                        <p className="text-danger Mui-error">
                          {errors.newPassword}
                        </p>
                      )}
                    </FormControl>
                  </div>
                  <div className="col-md-6 profile-form">
                    <label className="form-label" htmlFor="password">
                      Confirm Password
                    </label>
                    <FormControl variant="outlined" className="col-12 mb-3">
                      <TextField
                        size="small"
                        id="password"
                        name="confirmPassword"
                        required
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={show === 'confirmPassword' ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  handleShowPassword('confirmPassword');
                                }}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {show === 'confirmPassword' ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        // label="Password"
                        error={
                          errors.confirmPassword && touched.confirmPassword
                            ? true
                            : false
                        }
                      />
                      {!!errors.confirmPassword && touched.confirmPassword && (
                        <p className="text-danger Mui-error">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </FormControl>
                  </div>
                  {readOnly == false ? (
                    ''
                  ) : (
                    <div className="col-md-12 text-center profile-submit ">
                      <button
                        disabled={!(isValid && dirty)}
                        type="submit"
                        className="editprofile-button1"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="editprofile-button2"
                        onClick={() => {
                          setReadOnly(!readOnly);
                          router.replace('/dashboard');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </section>
          </section>
        </DashboardLayout>
      </>
    )
  );
};

export default ChangePassword;
