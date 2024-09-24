/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/user';
import { addUser } from 'src/redux/user-slice';
import * as yup from 'yup';

const initialValues = {
  first_name: '',
  last_name: '',
  address_line1: '',
  address_line2: '',
  // area: '',
  state: 1,
  city: '',
  post_code: '',
  is_default: false,
  address_type: 9,
  from_address_type: 1,
};

const formSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  // last_name: yup.string().required('Last name is required'),
  last_name: yup.string(),
  address_line1: yup.string().required('Address is required'),
  address_line2: yup.string().required('Area is required'),
  // area: yup.string().required('Area is required'),
  state: yup.number().required('State is required'),
  city: yup.string().required('City is required'),
  post_code: yup.string().required('Post code is required'),
  is_default: yup.boolean().default(false),
  address_type: yup.number().default(9),
  from_address_type: yup.number().default(1),
});

const MyAddress = ({ handleClose, handleFetch }: any) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const { status } = useSession();
  const [states, setStates] = useState<any>([]);
  const [loagged, setLoagged] = useState<boolean>(false);

  // const [addressUser, setAddressUser] = useState<any>(null);
  // const [popup, setPopup] = useState<boolean>(false);

  // const getCitiest = async (stateId: number) => {
  //   const loadCitiest = api.getCities().then((res: any) => {
  //     setCities(res.data);
  //     return res.data;
  //   });
  // };

  // const stateUser = useSelector((state: RootState) => state.user);

  const handleAddAddress = (values: any) => {
    const postData = {
      customer_id: user.id,
      address_type: values.address_type,
      name: values.first_name + ' ' + values.last_name,
      from_address_type: values.from_address_type ?? '',
      email: user.email,
      mobile_no: user.mobile_no,
      // contact_name: values.first_name + ' ' + values.last_name,
      // address: values.address_line1 + ' ' + values.area,
      first_name: values.first_name,
      last_name: values.last_name,
      address_line1: values.address_line1,
      address_line2: values.address_line2,
      state: values.stateid || 1,
      state_name: values.state,
      city: values.city,
      post_code: values.post_code,
      is_default: values.is_default ? 1 : 0,
    };
    api.addAddress(postData).then((res: any) => {
      if (res.status_code == 200) {
        toast.success(res.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'top-center',
        });
        // setAddressData(res);
        handleFetch();
        handleClose();
        // router.push('/checkout-new');
        // router.replace('/checkout-new');
        // window.location.reload();
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
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    isValid,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: handleAddAddress,
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
  }, [loagged, status, states]);

  return (
    <>
      {/* <DashboardLayout
        active={[
          {
            link: router.asPath,
            string: 'Add Address',
          },
        ]}
      > */}
      <div className="address-add">
        <section className="d-flex flex-column align-items-center justify-content-center outlet-child-myaddresssection">
          <div className="col-lg-12">
            <div className="d-flex justify-content-between w-100 myprofile-top">
              {/* <div className="d-flex align-items-center">
                <Image src="/icons/profile/address.png" alt="" />
                <Link
                  href={'/dashboard/address/add-address'}
                  className="myprofile-para px-1"
                >
                  Add Address
                </Link>
              </div> */}
              <div>
                {/* <Link
                    href={'/dashboard/address/add-address'}
                    className="myprofile-span"
                  >
                    {' '}
                    + Add New Address
                  </Link> */}
              </div>
            </div>

            <div className=" rounded d-flex align-items-center justify-content-center ">
              <div className="row form address-section container">
                <div className="d-flex w-100 align-items-center ">
                  <form className="form" noValidate onSubmit={handleSubmit}>
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
                            errors.last_name && touched.last_name ? true : false
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
                      {/* <Form.Group
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
                            className="form-control input-label"
                            value={values.address_line2}
                          />
                          {errors.address_line2 && touched.address_line2 ? (
                            <Form.Control.Feedback type="invalid">
                              {errors.address_line2}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group> */}
                      <Form.Group
                        className=" col-md-6  profile-form"
                        controlId="city"
                      >
                        <Form.Label className="form-label profile-label">
                          City
                        </Form.Label>
                        <Form.Control
                          name="city"
                          isInvalid={errors.city && touched.city ? true : false}
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
                      <div className="col-md-6 profile-form">
                        <label className="form-label profile-label">
                          State
                        </label>
                        <select
                          id="state"
                          name="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.state
                              ? 'form-control input-label input-label-new  is-invalid'
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
                        </select>
                        {!!errors.state && (
                          <p className="text-danger Mui-error">
                            {errors.state}
                          </p>
                        )}
                      </div>
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
                            errors.post_code && touched.post_code ? true : false
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
                      <div className="col-md-6  form-profile-item">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            name="is_default"
                            onChange={handleChange}
                            defaultChecked={values.is_default}
                            type="checkbox"
                          />
                          <label className="form-check-label">
                            Make this a default Address
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 profile-form-item d-flex gap-2 ">
                        <div className="radiogroup d-flex gap-2">
                          <input
                            className="radiobtn"
                            type="radio"
                            id="address_type1"
                            name="address_type"
                            defaultChecked={true}
                            onChange={handleChange}
                            value={9}
                          />
                          <label className="radiolabel">Home</label>
                        </div>
                        <div className="radiogroup d-flex gap-2">
                          <input
                            className="radiobtn"
                            type="radio"
                            id="address_type"
                            onChange={handleChange}
                            name="address_type"
                            value={8}
                          />
                          <label className="radiolabel">Office</label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-sm-center  justify-content-md-start submit-button-group  flex-wrap pt-3">
                      <Button
                        disabled={!(isValid && dirty)}
                        type="submit"
                        className="editprofile-button1 checkout-new-button"
                      >
                        Save
                      </Button>
                      {/* <button
                        disabled={!(isValid && dirty)}
                        type="submit"
                        className="editprofile-button1"
                      >
                        Save
                      </button> */}
                      <button
                        // onClick={() => {
                        //   router.replace('/cart');
                        // }}
                        onClick={handleClose}
                        type="button"
                        className="editprofile-button2 checkout-new-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* </DashboardLayout> */}
    </>
  );
};

export default MyAddress;
