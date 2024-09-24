/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import DashboardLayout from 'src/theme/layouts/DashboardLayout';
import { Form, Image } from 'react-bootstrap';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'src/lib/api/user';
import { RootState } from 'src/redux/store';
import { addUser } from 'src/redux/user-slice';

type initialValues = {
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
  area: string;
  state: number;
  city: string;
  post_code: string;
  is_default: number | boolean;
  address_type_id?: number;
  from_address_type: number | string;
};

const formSchema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  // last_name: yup.string().required('Last Name is required'),
  last_name: yup.string(),
  address_line1: yup.string().required('Address is required'),
  address_line2: yup.string().required('Area is required'),
  area: yup.string(),
  state: yup.number().required('State is required'),
  city: yup.string().required('City is required'),
  post_code: yup.string().required('Post code is required'),
  is_default: yup.boolean().default(false),
  address_type_id: yup.number().required('Address type is required'),
  from_address_type: yup.string(),
});
const MyAddress = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const { status } = useSession();
  const [states, setStates] = useState<any>([]);
  // const [, setCities] = useState<any>(null);
  const [loagged, setLoagged] = useState<boolean>(false);

  const addressId: any = router.query?.id || undefined;
  const stateUser = useSelector((state: RootState) => state.user);
  const initialValues: initialValues = {
    first_name: '',
    last_name: '',
    address_line1: '',
    address_line2: '',
    area: '',
    state: 1,
    city: '',
    post_code: '',
    is_default: false,
    address_type_id: 8,
    from_address_type: '1',
  };

  // const getCitiest = async (stateId: number) => {
  //   const loadCitiest = api.getCities().then((res: any) => {
  //     setCities(res.data);
  //     return res.data;
  //   });
  // };

  const handleUpdateAddress = (values: any) => {
    const postData = {
      customer_id: user.id,
      address_type_id: values.address_type_id,
      from_address_type: values.from_address_type,
      email: user.email,
      mobile_no: user.mobile_no,
      name: values.first_name + ' ' + values.last_name,
      first_name: values.first_name,
      last_name: values.last_name,
      address_line1: values.address_line1,
      address_line2: values.address_line2,
      // address_line2: values.area,
      stateid: values.state,
      state_name: values.state,
      city: values.city,
      post_code: values.post_code,
      address_id: addressId,
      is_default: values.is_default === false ? 0 : 1,
    };
    api.updateAddress(postData).then((res: any) => {
      if (res.error == 0) {
        toast.success(res.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'top-center',
        });
        router.replace('/dashboard/my-address');
      } else {
        toast.error(res.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'top-center',
        });
      }
    });
  };
  const {
    errors,
    touched,
    setFieldValue,
    setValues,
    values,
    isValid,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: handleUpdateAddress,
  });

  // const handleEdit = (address_id: number) => {
  //   router.replace('/dashboard/address/' + address_id);
  // };

  // const handleDelete = (address_id: number) => {
  //   const postData = {
  //     address_id: address_id,
  //     customer_id: user.id,
  //   };
  //   const result = api.deleteAddress(postData).then((res: any) => {
  //     if (res.error === 0) {
  //       dispatch(updateAddress(res.customer_address));
  //     }
  //   });
  // };

  // const handleMakeDefault = (address_id: number) => {
  //   console.log(`Make default ${address_id}`);
  // };

  useEffect(() => {
    if (states.length == 0) {
      api.getStates().then((res: any) => {
        setStates(res.data);
      });
    }
    if (loagged == false && status == 'authenticated') {
      api.getMe().then((res: any) => {
        setUser(res.customer_data);
        dispatch(addUser(res.customer_data));
        return res.customer_data;
      });
      setLoagged(true);
    }

    if (addressId) {
      const setCurrentAddress = async () => {
        const customerAddress: any = stateUser.customer_address.find(
          (address: any) => address.id == addressId,
        );
        if (customerAddress) {
          const params = {
            ...customerAddress,
            state: customerAddress.stateid || 1,
            is_default: customerAddress?.is_default === 0 ? false : true,
          };
          setValues(params);
          // values.last_name = customerAddress.last_name;
          // values.address_line1 = customerAddress.address_line1;
          // values.address_line2 = customerAddress.address_line2;
          // values.city = customerAddress.city;
          // values.state = customerAddress.stateid || 1;
          // values.area = '';
          // values.post_code = customerAddress.post_code;
          // values.is_default = customerAddress?.is_default === 0 ? false : true;
          // // values.address_type_id = customerAddress.address_type_id;
          // values.from_address_type = customerAddress.from_address_type;
        }
      };
      setCurrentAddress();
    }
  }, [loagged, status, states, addressId, stateUser]);

  return (
    <>
      <DashboardLayout
        active={[
          {
            link: router.asPath,
            string: 'Edit Address',
          },
        ]}
      >
        <div className="address-add">
          <section className="outlet-child-1"></section>
          <section className="d-flex flex-column align-items-center justify-content-center outlet-child-myaddresssection">
            <div>
              <div className="d-flex justify-content-between w-100 myprofile-top">
                <div className="d-flex align-items-center">
                  <Image src="/icons/profile/address.png" alt="address" />
                  <Link
                    href="/dashboard/address/edit-address"
                    className="myprofile-para px-1"
                  >
                    Edit Address
                  </Link>
                </div>
                <div>
                  {/* <!-- <Image src="/icons/profile/edit.png" alt=""> -->  */}
                  <Link
                    href="/dashboard/address/add-address"
                    className="myprofile-span"
                  >
                    {' '}
                    + Add New Address
                  </Link>
                </div>
              </div>
              <div className=" rounded d-flex align-items-center justify-content-center ">
                <div className="row form address-section container">
                  <div className={'d-flex w-100 align-items-center '}>
                    <Form className="form" noValidate onSubmit={handleSubmit}>
                      <div className="row">
                        <Form.Group
                          controlId="first_name"
                          className="col-md-6 profile-form"
                        >
                          <Form.Label className="form-label profile-label">
                            First Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="first_name"
                            isInvalid={
                              errors.first_name && touched.first_name
                                ? true
                                : false
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                            className="form-control input-label input-label-new"
                          />
                          {errors.first_name && touched.first_name ? (
                            <Form.Control.Feedback type="invalid">
                              {errors.first_name}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                        <Form.Group
                          controlId="last_name"
                          className="col-md-6  profile-form"
                        >
                          <Form.Label className="form-label profile-label">
                            Last Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="last_name"
                            isInvalid={
                              errors.last_name && touched.last_name
                                ? true
                                : false
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control input-label input-label-new"
                            value={values.last_name}
                          />
                          {errors.last_name && touched.last_name ? (
                            <Form.Control.Feedback type="invalid">
                              {errors.last_name}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </div>
                      <div className="row">
                        <Form.Group
                          controlId="address_line1"
                          className="col-md-12  profile-form"
                        >
                          <Form.Label className="form-label profile-label">
                            Address
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="address_line1"
                            isInvalid={
                              errors.address_line1 && touched.address_line1
                                ? true
                                : false
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control input-label input-label-new"
                            value={values.address_line1}
                          />
                          {errors.address_line1 && touched.address_line1 ? (
                            <Form.Control.Feedback type="invalid">
                              {errors.address_line1}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </div>
                      <div className="row">
                        <Form.Group
                          controlId="address_line2"
                          className="col-md-6  profile-form"
                        >
                          <Form.Label className="form-label profile-label">
                            Area
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="address_line2"
                            isInvalid={
                              errors.address_line2 && touched.address_line2
                                ? true
                                : false
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control input-label input-label-new"
                            value={values.address_line2}
                          />
                          {errors.address_line2 && touched.address_line2 ? (
                            <Form.Control.Feedback type="invalid">
                              {errors.address_line2}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                        <Form.Group
                          className=" col-md-6  profile-form"
                          controlId="city"
                        >
                          <Form.Label className="form-label profile-label">
                            City
                          </Form.Label>
                          <Form.Control
                            name="city"
                            isInvalid={
                              errors.city && touched.city ? true : false
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            className="form-control input-label input-label-new"
                          />
                          {touched.city && errors.city && (
                            <Form.Control.Feedback type="invalid">
                              {errors.city}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                      <div className="row">
                        <Form.Group
                          controlId="state"
                          className="col-md-6  profile-form"
                        >
                          <Form.Label>State</Form.Label>
                          <Form.Select
                            id="state"
                            name="state"
                            onChange={handleChange}
                            className={
                              errors.state
                                ? 'form-control input-label is-invalid input-label-new'
                                : 'form-control input-label input-label-new'
                            }
                            value={values.state}
                          >
                            {states.length == 0 ? (
                              <option>Select One</option>
                            ) : (
                              states.map((state: any) => {
                                return (
                                  <option key={state.id} value={state.id}>
                                    {state.state_name}
                                  </option>
                                );
                              })
                            )}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          controlId="Pincode"
                          className="col-md-6  profile-form"
                        >
                          <Form.Label className="form-label profile-label">
                            Pincode
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="post_code"
                            isInvalid={
                              errors.post_code && touched.post_code
                                ? true
                                : false
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control input-label input-label-new"
                            value={values.post_code}
                          />
                          {errors.post_code && touched.post_code ? (
                            <Form.Control.Feedback type="invalid">
                              {errors.post_code}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                        <div className="col-md-6 profile-form">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              name="is_default"
                              id="is_default"
                              type="checkbox"
                              onChange={(e) => {
                                setFieldValue('is_default', e.target.checked);
                              }}
                              defaultChecked={
                                values.is_default === 0 || !values.is_default
                                  ? false
                                  : true
                              }
                            />
                            <label className="form-check-label">
                              Make this a default Address
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 profile-form">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="address_type_id"
                              id="address_type_id1"
                              onChange={() => {
                                setFieldValue('address_type_id', 9);
                              }}
                              value={9}
                              checked={values.address_type_id === 9}
                              // defaultChecked={
                              //   values.from_address_type == '1' ? true : false
                              // }
                            />
                            <label className="form-check-label">Home</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="address_type_id"
                              value={8}
                              onChange={() => {
                                setFieldValue('address_type_id', 8);
                              }}
                              checked={values.address_type_id === 8}
                            />
                            <label className="form-check-label">Office</label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-sm-center  justify-content-md-start  flex-wrap submit-button-group">
                        <button
                          disabled={!(isValid && dirty)}
                          type="submit"
                          className="editprofile-button1"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            router.replace('/dashboard/my-address')
                          }
                          className="editprofile-button2"
                        >
                          Discard
                        </button>
                      </div>
                    </Form>
                    {/* <Form className="form" noValidate onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 profile-form">
                          <label className="form-label profile-label">
                            First Name
                          </label>
                          <input
                            type="text"
                            required
                            onChange={handleChange}
                            className={
                              errors.first_name
                                ? 'form-control input-label is-invalid'
                                : 'form-control input-label'
                            }
                            id="first_name"
                            name="first_name"
                            value={values.first_name}
                          />
                          {errors.first_name ? (
                            <div className="invalid-feedback">
                              {errors.first_name}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="col-md-6 profile-form">
                          <label className="form-label profile-label">
                            Last Name
                          </label>
                          <input
                            type="text"
                            required
                            onChange={handleChange}
                            className={
                              errors.last_name
                                ? 'form-control input-label is-invalid'
                                : 'form-control input-label'
                            }
                            id="last_name"
                            name="last_name"
                            value={values.last_name}
                          />
                          {errors.last_name ? (
                            <div className="invalid-feedback">
                              {errors.last_name}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 profile-form">
                          <label className="form-label profile-label">
                            Address
                          </label>
                          <input
                            type="text"
                            required
                            className={
                              errors.address_line1
                                ? 'form-control address-label-password is-invalid'
                                : 'form-control input-label'
                            }
                            onChange={handleChange}
                            id="address_line1"
                            name="address_line1"
                            value={values.address_line1}
                          />
                          {errors.address_line1 ? (
                            <div className="invalid-feedback">
                              {errors.address_line1}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 profile-form">
                          <label className="form-label profile-label">
                            Area
                          </label>
                          <input
                            type="text"
                            required
                            className={
                              errors.area
                                ? 'form-control address-label-password is-invalid'
                                : 'form-control input-label'
                            }
                            onChange={handleChange}
                            id="address_line2"
                            name="address_line2"
                            value={values.address_line2}
                          />
                          {errors.address_line2 ? (
                            <div className="invalid-feedback">
                              {errors.address_line2}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="col-md-6 profile-form">
                          <label className="form-label profile-label">
                            City
                          </label>
                          <input
                            type="text"
                            required
                            className={
                              errors.city
                                ? 'form-control address-label-password is-invalid'
                                : 'form-control input-label'
                            }
                            onChange={handleChange}
                            id="city"
                            name="city"
                            value={values.city}
                          />
                          {errors.city ? (
                            <div className="invalid-feedback">
                              {errors.city}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 profile-form">
                          <label className="form-label profile-label">
                            State
                          </label>
                          <select
                            id="state"
                            name="state"
                            onChange={handleChange}
                            className={
                              errors.state
                                ? 'form-control input-label is-invalid'
                                : 'form-control input-label'
                            }
                            value={values.state}
                          >
                            {states.length == 0 ? (
                              <option>Select One</option>
                            ) : (
                              states.map((state: any) => {
                                return (
                                  <>
                                    <option key={state.id} value={state.id}>
                                      {state.state_name}
                                    </option>
                                  </>
                                );
                              })
                            )}
                          </select>
                        </div>
                        <div className="col-md-6 profile-form">
                          <label className="form-label profile-label">
                            Pincode
                          </label>
                          <input
                            type="text"
                            required
                            className={
                              errors.post_code
                                ? 'form-control address-label-password is-invalid'
                                : 'form-control input-label'
                            }
                            onChange={handleChange}
                            id="post_code"
                            name="post_code"
                            value={values.post_code}
                          />
                          {errors.post_code ? (
                            <div className="invalid-feedback">
                              {errors.post_code}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="col-md-6 profile-form">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              name="is_default"
                              id="is_default"
                              type="checkbox"
                              onChange={(e) => {
                                setFieldValue('is_default', e.target.checked);
                              }}
                              defaultChecked={
                                values.is_default === 0 ? false : true
                              }
                            />
                            <label className="form-check-label">
                              Make this a default Address
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 profile-form">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="address_type_id"
                              id="address_type_id1"
                              onChange={() => {
                                setFieldValue('address_type_id', 9);
                              }}
                              value={9}
                              checked={values.address_type_id === 9}
                              // defaultChecked={
                              //   values.from_address_type == '1' ? true : false
                              // }
                            />
                            <label className="form-check-label">Home</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="address_type_id"
                              value={8}
                              onChange={() => {
                                setFieldValue('address_type_id', 8);
                              }}
                              checked={values.address_type_id === 8}
                            />
                            <label className="form-check-label">Office</label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-sm-center  justify-content-md-start  flex-wrap submit-button-group">
                        <button className="editprofile-button1">Save</button>
                        <button
                          type="button"
                          onClick={() => router.push('/dashboard/my-address')}
                          className="editprofile-button2"
                        >
                          Discard
                        </button>
                      </div>
                    </Form> */}
                  </div>

                  {/* <hr className="myaddress-line" />
                  <div className=" d-flex align-items-center justify-content-center mt-3">
                    <div className="row form address-section container">
                      {stateUser.customer_address.length == 0
                        ? ''
                        : stateUser.customer_address.map((address: any) => {
                            return (
                              <>
                                <div className="d-flex w-100 align-items-center">
                                  <div className="d-flex flex-wrap justify-content-between w-100 myprofile-top ">
                                    <div className="myaddress-home">
                                      <Image
                                        src="/icons/profile/home-page.png"
                                        alt=""
                                      />
                                      {address.address_type == 8 ? (
                                        <span className="myaddress-home-icon">
                                          Office
                                        </span>
                                      ) : (
                                        <span className="myaddress-home-icon">
                                          Home
                                        </span>
                                      )}

                                      <p className="myaddress-usernamer">
                                        {address.name}
                                      </p>
                                      <p className="myaddress-details">
                                        {address.address_line1}
                                      </p>
                                      <p className="myaddress-details-location">
                                        {address.city}-{address.state},
                                        {address.post_code}
                                      </p>
                                    </div>
                                    <div>
                                      <div className="w-100 myprofile-top myaddress-edit">
                                        <Link href={'#!'}>
                                          <Image
                                            src="/icons/profile/edit.png"
                                            alt=""
                                          />
                                          <span
                                            className="myaddress-edit-icon"
                                            onClick={() => {
                                              handleEdit(address.id);
                                            }}
                                          >
                                            Edit
                                          </span>
                                        </Link>
                                        <br />
                                        <Link href={'#!'}>
                                          <Image
                                            src="/icons/profile/delete.png"
                                            alt=""
                                          />
                                          <span
                                            className="myaddress-span"
                                            onClick={() => {
                                              handleDelete(address.id);
                                            }}
                                          >
                                            Delete
                                          </span>
                                        </Link>
                                        <br />
                                        <Link href={'#!'}>
                                          <Image
                                            src="/icons/profile/rectangle213.png"
                                            alt=""
                                          />
                                          <span
                                            className="myaddress-default-span"
                                            onClick={() => {
                                              handleMakeDefault(address.id);
                                            }}
                                          >
                                            Make this a default Address
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr className="myaddress-line-one" />
                              </>
                            );
                          })}
                    </div>
                  </div> */}
                  <div className="mb-4"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </>
  );
};

export default MyAddress;
