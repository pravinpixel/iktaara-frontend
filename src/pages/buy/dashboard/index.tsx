/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/user';
import { addUser } from 'src/redux/user-slice';
import DashboardLayout from 'src/theme/layouts/DashboardLayout';
import * as yup from 'yup';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const { status } = useSession();
  const [loagged, setLoagged] = useState<boolean>(false);

  useEffect(() => {
    if (loagged == false && status == 'authenticated') {
      api.getMe().then((res: any) => {
        setUser(res.customer_data);
        const param = {
          customer_id: res?.customer_data?.id ?? '',
          first_name: res?.customer_data?.first_name ?? '',
          last_name: res?.customer_data?.last_name ?? '',
          email: res?.customer_data?.email ?? '',
          mobile_no: res?.customer_data?.mobile_no ?? '',
        };
        setValues(param);
        dispatch(addUser(res.customer_data));
        return res.customer_data;
      });
      setLoagged(true);
    }
  }, [loagged, status]);

  // const stateUser = useSelector((state: RootState) => state.user);

  const formSchema = yup.object().shape({
    first_name: yup.string().required('First Name is required'),
    // last_name: yup.string().required('Last Name is required'),
    last_name: yup.string(),
    email: yup.string().required('Email is required'),
    mobile_no: yup
      .string()
      .required('Mobile Number is required')
      .matches(/^[0-9]{10}$/, 'Mobile No Must be exactly 10 digits'),
  });

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    mobile_no: '',
  };

  const handleSubmit1 = useCallback(async (event: any) => {
    // const postData = {
    //   customer_id: stateUser.id,
    //   first_name: event.currentTarget.first_name.value,
    //   last_name: event.currentTarget.last_name.value,
    //   email: event.currentTarget.email.value,
    //   mobile_no: event.currentTarget.mobile_no.value,
    // };
    // const postData = {
    //   ...event,
    // };
    await api.updateProfile(event).then((res) => {
      if (res?.status_code == 200) {
        dispatch(addUser(res.data));
        setUser(res.data);
        window.localStorage.setItem('user', JSON.stringify(res.data));
        toast.success(res.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'top-center',
        });
        setReadOnly(true);
      }
    });
  }, []);

  const {
    errors,
    touched,
    isValid,
    dirty,
    setValues,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: formSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit1,
  });
  return (
    loagged == true && (
      <>
        <DashboardLayout
          active={[
            {
              link: '/dashboard',
              string: 'Profile',
            },
          ]}
        >
          <section className="outlet-child-1" />
          <section className="outlet-child-2">
            <section className="d-flex flex-column align-items-center justify-content-center outlet-child-section outlet-child-section-5">
              <p className="myprofile-para-1 mt-2 mt-md-3 mb-3 text-center text-justify">
                Welcome, {user?.first_name ?? ''}! Enjoy your Shopping journey
                with iktaraa
                {/* {user?.first_name && user?.first_name}
                {user?.last_name && ' ' + user?.last_name} */}
              </p>
              <div className="d-flex justify-content-between w-100 myprofile-top myprofile-top-width">
                <p className="myprofile-para d-flex align-items-center">
                  {/* <img
                    src="/profile/profile.png"
                    alt="orders"
                    className="icon"
                  /> */}
                  <i className="fa-solid fa-circle-user "></i>
                  <span className="px-1">
                    {readOnly ? 'My Profile' : 'Edit profile'}{' '}
                  </span>
                </p>
                <div
                  className="edit-icon"
                  onClick={() => {
                    setReadOnly(!readOnly);
                  }}
                >
                  <i className="fa fa-edit"></i>
                  <Link href={'#!'} className="myprofile-span">
                    Edit
                  </Link>
                </div>
              </div>
              <div
                className={
                  readOnly
                    ? 'rounded profile-section'
                    : 'rounded profile-section profile-section-readonly'
                }
              >
                <Form
                  noValidate
                  onSubmit={handleSubmit}
                  name="profile-edit"
                  className="row d-flex align-items-center profile-section-form"
                >
                  <Form.Group
                    controlId="first_name"
                    className="mb-3 col-12 col-md-6"
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      className="form-control input-label"
                      disabled={readOnly}
                      required
                      placeholder="First Name"
                      isInvalid={
                        errors.first_name && touched.first_name ? true : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.first_name}
                    />
                    {errors.first_name && touched.first_name ? (
                      <Form.Control.Feedback type="invalid">
                        {errors.first_name}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    controlId="last_name"
                    className="mb-3 col-12 col-md-6"
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      className="form-control input-label"
                      disabled={readOnly}
                      required
                      placeholder="Last Name"
                      isInvalid={
                        errors.last_name && touched.last_name ? true : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.last_name || ''}
                    />
                    {errors.last_name && touched.last_name ? (
                      <Form.Control.Feedback type="invalid">
                        {errors.last_name}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-12 col-md-6"
                    controlId="email"
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="form-control input-label"
                      isInvalid={errors.email && touched.email ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.email}
                      disabled={readOnly}
                      required
                      placeholder="Enter Email"
                    />
                    {touched.email && errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-12 col-md-6"
                    controlId="mobile_no"
                  >
                    <Form.Label>Mobile no</Form.Label>
                    <Form.Control
                      isInvalid={
                        errors.mobile_no && touched.mobile_no ? true : false
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="mobile_no"
                      type="text"
                      className="form-control input-label"
                      defaultValue={values?.mobile_no}
                      disabled={readOnly}
                      required
                      placeholder="Enter Mobile Number"
                    />
                    {touched.mobile_no && errors.mobile_no && (
                      <Form.Control.Feedback type="invalid">
                        {errors.mobile_no}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <div className="col-md-12">
                    <Link
                      href={'/dashboard/update-password'}
                      className="profile-link"
                    >
                      {' '}
                      Change Password?
                    </Link>
                  </div>
                  {readOnly == true ? (
                    ''
                  ) : (
                    <div className="col-md-12 gap-2 d-flex justify-content-center text-center">
                      <button
                        disabled={!(isValid && dirty)}
                        type="submit"
                        className="editprofile-button1"
                      >
                        Save
                      </button>
                      <button
                        className="editprofile-button2 p-2"
                        onClick={() => {
                          setReadOnly(!readOnly);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </Form>
                {/* <form
                  onSubmit={handleSubmit}
                  name="profile-edit"
                  className="row d-flex align-items-center profile-section-form"
                >
                  <div className="col-md-6 profile-form">
                    <label className="form-label profile-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control input-label"
                      id="first_name"
                      name="first_name"
                      disabled={readOnly}
                      // readOnly={readOnly ? false : true}
                      placeholder="First Name"
                      required
                      defaultValue={stateUser?.first_name}
                    />
                  </div>
                  <div className="col-md-6 profile-form">
                    <label className="form-label profile-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control input-label"
                      id="last_name"
                      name="last_name"
                      // readOnly={!readOnly}
                      disabled={readOnly}
                      placeholder="Last Name"
                      defaultValue={stateUser?.last_name || ''}
                    />
                  </div>
                  <div className="col-md-6 profile-form">
                    <label className="form-label profile-label">Email</label>
                    <input
                      type="email"
                      className="form-control input-label"
                      id="email"
                      name="email"
                      readOnly={readOnly}
                      placeholder="Enter Email"
                      required
                      defaultValue={stateUser?.email}
                    />
                  </div>
                  <div className="col-md-6 profile-form">
                    <label className="form-label profile-label">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      className="form-control input-label"
                      id="mobilenumber"
                      placeholder="Enter Mobile Number"
                      readOnly={readOnly}
                      required
                      name="mobile_no"
                      defaultValue={stateUser?.mobile_no}
                    />
                  </div>
                  <div className="col-md-12">
                    <Link
                      href={'/dashboard/update-password'}
                      className="profile-link"
                    >
                      {' '}
                      Change Password?
                    </Link>
                  </div>
                  {readOnly == true ? (
                    ''
                  ) : (
                    <div className="col-md-12 gap-2 d-flex justify-content-center text-center">
                      <button type="submit" className="editprofile-button1">
                        Save
                      </button>
                      <button
                        className="editprofile-button2 p-2"
                        onClick={() => {
                          setReadOnly(!readOnly);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form> */}
              </div>
            </section>
          </section>
        </DashboardLayout>
      </>
    )
  );
};

export default Dashboard;
