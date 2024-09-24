/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { updateBillingAddress } from 'src/redux/checkout';
import AddressPopup from '../common/popup/addressPopup';
import userapi from 'src/lib/api/user';
// import DeliveryListAddress from './delivery-list-address';
import { Box, Typography } from '@mui/material';

const initialValues = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  mobile_no: '',
  address_line1: '',
  address_line2: '',
  stateid: 1,
  city: '',
  post_code: '',
  is_default: true,
  from_address_type: 'billing',
  save_address: false,
  notificaton: false,
  address_type_id: 9,
};
const formSchema = yup.object().shape({
  id: yup.number().default(0),
  first_name: yup.string().required('First Name is required'),
  // last_name: yup.string().required('Last Name is required'),
  last_name: yup.string(),
  email: yup.string().email().required('E-mail is required'),
  mobile_no: yup
    .string()
    .required('Mobile Number is required')
    .matches(/^[0-9]{10}$/, 'Mobile No Must be exactly 10 digits'),
  address_line1: yup.string().required('Address is required'),
  address_line2: yup.string().required('Area is required'),
  stateid: yup.number().default(1),
  city: yup.string().required('City is required'),
  post_code: yup
    .string()
    .required('post code is required')
    .matches(/^[0-9]{6}$/, 'Must be exactly 6 digits'),
  is_default: yup.boolean().default(true),
  address_type: yup.number().default(9),
  from_address_type: yup.string().default('shipping'),
  address_type_id: yup.number().default(9),
  save_address: yup.boolean().default(true),
  notificaton: yup.boolean().default(true),
});

const BillingAdddress = (props: any) => {
  const {
    defaultAddress,
    sameAsShipping,
    billingValidationError,
    updateBillingInfo,
  }: any = props;

  const dispatch = useDispatch();

  const checkout = useSelector((state: RootState) => state.checkout);
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [states, setStates] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const updateBilling = (values: any) => {
    dispatch(updateBillingAddress(values));

    if (values.id != 0) {
      setReadOnly(true);
    }
  };

  const {
    values,
    touched,
    errors,
    errors: billingErrors,
    setValues,
    handleBlur: handleBlur,
    handleChange: handleChange,
    handleSubmit,
  } = useFormik({
    onSubmit: updateBilling,
    initialValues,
    validationSchema: formSchema,
  });

  useEffect(() => {
    setValues(defaultAddress);
    if (checkout.billing_address.id?.length == 0) {
      dispatch(updateBillingAddress(defaultAddress));
    }
    checkout.billing_address.id == 0 ? setReadOnly(false) : setReadOnly(true);
  }, []);

  useEffect(() => {
    if (states?.length == 0) {
      userapi.getStates().then((res: any) => {
        setStates(res?.data);
      });
    }
  }, [states]);

  useEffect(() => {
    dispatch(updateBillingAddress(defaultAddress));
    if (sameAsShipping) {
      setValues(checkout.billing_address);
    } else {
      setValues(defaultAddress);
    }
  }, [defaultAddress, sameAsShipping]);

  useEffect(() => {
    checkout.billing_address.id == 0 ? setReadOnly(false) : setReadOnly(true);
    if (sameAsShipping) {
      setValues(checkout.shipping_address);
      dispatch(updateBillingAddress(checkout.shipping_address));
    }
    if (updateBillingInfo) {
      setValues(checkout.shipping_address);
      dispatch(updateBillingAddress(checkout.shipping_address));
    }
  }, [sameAsShipping, updateBillingInfo]);

  useEffect(() => {
    billingValidationError(billingErrors);
  }, [billingErrors]);

  const handleAddressPopup = () => {
    setModalOpen((prev) => !prev);
  };

  const handleFormData = (datas: any) => {
    setValues(datas);
    dispatch(updateBillingAddress(datas));
    setModalOpen(false);
  };

  const handleEditAddress = () => {
    setReadOnly(false);
  };

  return (
    <>
      <section className=" billing-check">
        {!sameAsShipping && (
          <>
            <div className="row ">
              <div className="col-12 ">
                {/* {userAddrData?.customer_address?.map((address: any, i: any) => {
                  return (
                    <DeliveryListAddress
                      address={address}
                      key={i}
                      title="Delivery Address"
                    />
                  );
                })} */}
              </div>
            </div>

            <form className="mb-5 row" onSubmit={handleSubmit} method="post">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '20px',
                  mb: 2,
                }}
              >
                <h6 className="dalivery-title">Billing Address</h6>
                <Box
                  sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}
                >
                  <Typography
                    className="dalivery-edit-bill"
                    onClick={() => handleEditAddress()}
                    sx={{ mt: { xs: '11px', md: '0px' } }}
                  >
                    Edit
                  </Typography>

                  {/* <Typography className="dalivery-delete">Delete</Typography> */}
                </Box>
              </Box>

              <Form.Group
                className="mb-3 col-12 col-md-6"
                controlId="first_name"
              >
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  readOnly={readOnly}
                  disabled={readOnly}
                  placeholder="First Name"
                  isInvalid={
                    errors.first_name && touched.first_name ? true : false
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                />
                {errors.first_name && touched.first_name ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.first_name}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <Form.Group
                className="mb-3 col-12 col-md-6"
                controlId="last_name"
              >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  readOnly={readOnly}
                  disabled={readOnly}
                  placeholder="Last Name"
                  isInvalid={
                    errors.last_name && touched.last_name ? true : false
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                />
                {errors.last_name && touched.last_name ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.last_name}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3 col-12 col-md-6" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  isInvalid={errors.email && touched.email ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={readOnly}
                  value={values.email}
                  readOnly={readOnly}
                  placeholder="Email Address"
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
                  value={values.mobile_no}
                  readOnly={readOnly}
                  disabled={readOnly}
                  placeholder="Mobile number"
                />
                {touched.mobile_no && errors.mobile_no && (
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile_no}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="address_line1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  isInvalid={
                    errors.address_line1 && touched.address_line1 ? true : false
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="address_line1"
                  value={values.address_line1}
                  readOnly={readOnly}
                  placeholder="Address"
                />
                {touched.address_line1 && errors.address_line1 && (
                  <Form.Control.Feedback type="invalid">
                    {errors.address_line1}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-3 col-6 " controlId="address_line2">
                <Form.Label>Area</Form.Label>
                <Form.Control
                  isInvalid={
                    errors.address_line2 && touched.address_line2 ? true : false
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={readOnly}
                  name="address_line2"
                  value={values.address_line2}
                  readOnly={readOnly}
                  placeholder="Address"
                />
                {touched.address_line2 && errors.address_line2 && (
                  <Form.Control.Feedback type="invalid">
                    {errors.address_line2}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-3 col-12 col-md-4" controlId="stateid">
                <Form.Label>State</Form.Label>
                <Form.Select
                  aria-label="State"
                  name="stateid"
                  disabled={readOnly}
                  onChange={handleChange}
                  value={values.stateid}
                  placeholder="Select State"
                >
                  {states?.length == 0 ? (
                    <option>Select One</option>
                  ) : (
                    states?.map((state: any) => {
                      return (
                        <option
                          key={state.id}
                          value={state.id}
                          selected={state.id == values?.stateid}
                        >
                          {state.state_name}
                        </option>
                      );
                    })
                  )}
                </Form.Select>
                {touched.stateid && errors.stateid && (
                  <Form.Control.Feedback type="invalid">
                    {errors.stateid}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-3 col-12 col-md-4" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  isInvalid={errors.city && touched.city ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  readOnly={readOnly}
                  placeholder="City"
                />
                {touched.city && errors.city && (
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3 col-12 col-md-4"
                controlId="post_code"
              >
                <Form.Label>Pin code</Form.Label>
                <Form.Control
                  isInvalid={
                    touched.post_code && errors.post_code ? true : false
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="post_code"
                  value={values.post_code}
                  readOnly={readOnly}
                  placeholder="Postal code"
                />{' '}
                {touched.post_code && errors.post_code && (
                  <Form.Control.Feedback type="invalid">
                    {errors.post_code}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              {/* <div className="col-12 text-end">
                  {checkout.billing_address.id == 0 ? (
                    <button type="submit" className="btn check-out custom_btn">
                      Save
                    </button>
                  ) : readOnly == true ? (
                    ''
                  ) : (
                    <button type="submit" className="btn check-out custom_btn">
                      Update
                    </button>
                  )}
                </div> */}
              <div className="col-12 text-end">
                {checkout.billing_address.id === 0 ? (
                  <button type="submit" className="btn check-out custom_btn">
                    Save
                  </button>
                ) : readOnly ? (
                  ''
                ) : (
                  <button type="submit" className="btn check-out custom_btn">
                    Update
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </section>
      {modalOpen && (
        <AddressPopup
          handleFormData={handleFormData}
          title="Billing address"
          handlePopup={handleAddressPopup}
          address={checkout.customer_address}
          btnPrimaryLabel="Close"
          btnSecondaryLabel="Submit"
          open={modalOpen}
        />
      )}
    </>
  );
};

export default BillingAdddress;
