/* eslint-disable react-hooks/exhaustive-deps */
import { updateAddress } from '@/redux/user-slice';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  Skeleton,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { default as api, default as userapi } from 'src/lib/api/user';
import {
  updateBillingAddress,
  updateShippingAddress,
} from 'src/redux/checkout';
import * as yup from 'yup';
import { RootState } from '../../redux/store';
import AddressPopup from '../common/popup/addressPopup';
import ConfrimPopup from '../dashboard/confrimPopup';
import DeliveryListAddress from './delivery-list-address';
import MyAddress from './myaddress';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
  from_address_type: 'shipping',
  save_address: false,
  notificaton: false,
  address_type_id: 9,
  address_type: 9,
};
const formSchema = yup.object().shape({
  id: yup.number().default(0),
  first_name: yup.string().required('First Name is required'),
  email: yup.string().email().required('E-mail is required'),
  mobile_no: yup
    .string()
    .required('Mobile Number is required')
    .matches(/^[0-9]{10}$/, 'Mobile No Must be exactly 10 digits'),
  address_line1: yup.string().required('Address is required'),
  address_line2: yup.string().required('Area is required'),
  stateid: yup.number().default(1).required('Please select state'),
  city: yup.string().required('City is required'),
  post_code: yup.string().matches(/^[0-9]{6}$/, 'Must be exactly 6 digits'),
  is_default: yup.boolean().default(true),
  address_type: yup.number().default(9),
  from_address_type: yup.string().default('shipping'),
  address_type_id: yup.number().default(9),
  save_address: yup.boolean().default(true),
  notificaton: yup.boolean().default(true),
});

const ShippingAddress = (props: any) => {
  const {
    defaultAddress,
    sameAsShipping,
    shippingValidationError,
    setBillingSame,
    changeShippingAddress,
    user,
    handleShippingCharges,
    userAddrData,
    handleFetch,
  }: any = props;

  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<any>(null);
  const handleAddAddressClick = () => {
    setShowShippingAddress(true);
  };
  const handleClose = () => {
    setShowShippingAddress(false);
  };
  const dispatch = useDispatch();
  const checkout = useSelector((state: RootState) => state.checkout);
  const [loading, setLoading] = useState<boolean>(true);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [states, setStates] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [addressUser, setAddressUser] = useState<any>(userAddrData);
  const [popup, setPopup] = useState<boolean>(false);

  useEffect(() => {
    if (userAddrData) {
      setLoading(false);
    }
  }, [userAddrData]);
  const updateShippingInfo = async (values: any) => {
    const postData = {
      ...values,
      address_type_id: values.address_type_id,
      address_id: values.id,
      is_default: values.is_default ? 1 : 0,
      customer_id: user.id,
    };

    await userapi
      .updateAddress(postData)
      .then((res) => {
        dispatch(updateShippingAddress(values));
        handleShippingCharges(res);
        changeShippingAddress(values);
        setReadOnly(true);
        // router.push('/checkout-new');
        // window.location.reload(); // Reload the page
        // setAddressData(res);
        // setAddressDataUser(res);
        // setUserAddrData(res);
        handleFetch();
        toast.success(res?.message);
        if (sameAsShipping) {
          setBillingSame(true);

          dispatch(updateBillingAddress(values));
        }
      })
      .catch(() => {
        toast.error('Address not updated');
      });
  };

  const handlePopUp = (addressId: number) => {
    setPopup((state) => !state);
    setSelectedAddressId(addressId); // Assuming setSelectedAddressId is a state setter function to store the selected addressId
  };

  const {
    values,
    touched,
    errors,
    setFieldValue,
    setValues,
    handleBlur,
    handleChange,
    dirty,
    isValid,
    handleSubmit,
  } = useFormik({
    onSubmit: updateShippingInfo,
    initialValues,
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (checkout.shipping_address?.id?.length == 0) {
      dispatch(updateShippingAddress(defaultAddress));
    }
    !checkout.shipping_address?.mobile_no
      ? setReadOnly(false)
      : setReadOnly(true);
  }, [checkout]);

  useEffect(() => {
    if (states?.length == 0) {
      userapi.getStates().then((res: any) => {
        setStates(res?.data);
      });
    }
  }, [states]);

  useEffect(() => {
    setValues(defaultAddress);
    dispatch(updateShippingAddress(defaultAddress));
  }, [defaultAddress]);

  useEffect(() => {
    shippingValidationError(errors);
  }, [errors]);

  const handleAddressPopup = () => {
    setModalOpen((prev) => !prev);
  };

  const handleFormData = (datas: any) => {
    setValues(datas);
    dispatch(updateShippingAddress(datas));
    if (sameAsShipping) {
      setBillingSame(true);
      dispatch(updateBillingAddress(datas));
    }
    setModalOpen(false);
  };

  // const handleEditAddress = () => {
  //   setReadOnly(false);
  // };
  // const handleEditAddress = (addressId: number) => {
  //   // Find the address in userAddrData based on its ID

  //   const addressToEdit = addressUser.customer_address.find(
  //     (address: any) => address.id === addressId,
  //   );

  //   // Set the form values to the address to edit
  //   if (addressToEdit) {
  //     setValues(addressToEdit);
  //     setReadOnly(false);
  //   }
  // };

  const handleEditAddress = (addressId: number) => {
    const addressToEdit = addressUser.customer_address.find(
      (address: any) => address.id === addressId,
    );

    if (addressToEdit) {
      const updatedValues = {
        ...addressToEdit,
        address_type: addressToEdit.address_type_id, // Assuming address_type_id should be used
      };
      setValues(updatedValues);
      setReadOnly(false);
    }
  };

  const handleDelete = (address_id: number) => {
    const postData = {
      address_id: address_id,
      customer_id: user.id,
    };
    api.deleteAddress(postData).then((res: any) => {
      // setAddressUser(res);
      // setUserAddrData(res);
      handleFetch();
      handleClose();
      if (res.error === 0) {
        dispatch(updateAddress(res.customer_address));

        // router.replace('/checkout-new');
        // handleFetch();
      }
    });
  };

  useEffect(() => {
    // if (addressData) {
    //   handleFetch();
    // }
    userapi.getMe().then((res: any) => {
      setAddressUser(res);
      // const first_address: any = res?.customer_data?.customer_address[0] || [];
    });
  }, [userAddrData]);
  return (
    <>
      {loading ? (
        <Grid container>
          <Grid item xs={6}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </Grid>
        </Grid>
      ) : (
        <>
          {' '}
          {userAddrData?.customer_address?.length > 0 && (
            <div className="cart-return">
              <div className="dalivery-display">
                <h6 className="dalivery-title ">Delivery Address</h6>

                <Box className="add-address-bg">
                  <Button
                    variant="outlined"
                    className="addaddress-text"
                    onClick={handleAddAddressClick}
                  >
                    + Add Address
                  </Button>
                </Box>
              </div>

              <div className=" new-edit-padding">
                <Grid container>
                  {userAddrData?.customer_address
                    ?.slice(
                      0,
                      showAllAddresses
                        ? userAddrData?.customer_address.length
                        : 2,
                    )
                    .map((address: any, i: any) => {
                      return (
                        <Grid
                          item
                          md={6}
                          className="dalivery-standard-add"
                          key={i}
                          mt={2}
                        >
                          <>
                            <DeliveryListAddress
                              address={address}
                              title="Delivery Address"
                              sameAsShipping={sameAsShipping}
                              setBillingSame={setBillingSame}
                              handleFetch={handleFetch}
                              // handleEditAddress={handleEditAddress}
                              setAddressData={userAddrData}
                            />
                            <Box
                              sx={{
                                display: 'flex',
                                gap: '12px',
                                ml: '28px',
                                mt: 1,
                              }}
                            >
                              <Typography
                                className="dalivery-edit"
                                onClick={() => handleEditAddress(address.id)}
                              >
                                Edit
                              </Typography>

                              <Typography
                                className="dalivery-delete"
                                onClick={() => {
                                  handlePopUp(address?.id);
                                  // handleDelete(address.id);
                                }}
                              >
                                Delete
                              </Typography>
                            </Box>
                          </>
                        </Grid>
                      );
                    })}
                </Grid>
                <div style={{ marginLeft: '27px' }}>
                  {userAddrData?.customer_address?.length > 2 && (
                    <button
                      className="small-btn"
                      onClick={() => setShowAllAddresses(!showAllAddresses)}
                    >
                      {showAllAddresses ? 'View less' : 'View more'}
                    </button>
                  )}
                </div>

                {/* <div className="col-12 d-flex gap-2 align-items-center check-color-box">
              <Checkbox
                id="information"
                defaultChecked={sameAsShipping}
                onChange={(e) => {
                  setBillingSame(e.target.checked);
                }}
              />
              <span className="form-check-box ">
                Billing Address is the same as Delivery Address
              </span>
              
            </div> */}
                {/* <button className="small-btn" onClick={handleAddressPopup}>
                Choose Address
              </button> */}
              </div>
            </div>
          )}
          {!readOnly && (
            <Form className="mb-1" onSubmit={handleSubmit} method="post">
              <section className="row form-rows">
                <input type="hidden" name="id" value={values?.id} />
                <h6 className="dalivery-title">Delivery Address</h6>
                <Form.Group
                  controlId="first_name"
                  className="mb-3 col-12 col-md-6 shipping-input"
                >
                  <Form.Label className="shipping-label-name">
                    First Name
                  </Form.Label>
                  <Form.Control
                    disabled={readOnly}
                    type="text"
                    name="first_name"
                    readOnly={readOnly}
                    placeholder="Enter First  Name"
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
                  className="mb-3 col-12 col-md-6 shipping-input"
                >
                  <Form.Label className="shipping-label-name">
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    readOnly={readOnly}
                    disabled={readOnly}
                    placeholder="Enter Last  Name"
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
                <Form.Group
                  className="mb-3 col-12 col-md-6 shipping-input"
                  controlId="email"
                >
                  <Form.Label className="shipping-label-name">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    isInvalid={errors.email && touched.email ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    readOnly={readOnly}
                    disabled={readOnly}
                    placeholder="Email"
                  />
                  {touched.email && errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12 col-md-6 shipping-input"
                  controlId="mobile_no"
                >
                  <Form.Label className="shipping-label-name">
                    Mobile no
                  </Form.Label>
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
                    placeholder="Mobile no"
                  />
                  {touched.mobile_no && errors.mobile_no && (
                    <Form.Control.Feedback type="invalid">
                      {errors.mobile_no}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12 col-md-6 shipping-input"
                  controlId="address_line1"
                >
                  <Form.Label className="shipping-label-name">
                    Address
                  </Form.Label>
                  <Form.Control
                    // as={'textarea'}
                    isInvalid={
                      errors.address_line1 && touched.address_line1
                        ? true
                        : false
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // rows={3}
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
                <Form.Group
                  className="mb-3 col-12 col-md-6 shipping-input"
                  controlId="address_line2"
                >
                  <Form.Label className="shipping-label-name">Area</Form.Label>
                  <Form.Control
                    // as={'textarea'}
                    isInvalid={
                      errors.address_line2 && touched.address_line2
                        ? true
                        : false
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={readOnly}
                    // rows={3}
                    name="address_line2"
                    value={values.address_line2}
                    readOnly={readOnly}
                    placeholder="Area"
                  />
                  {touched.address_line2 && errors.address_line2 && (
                    <Form.Control.Feedback type="invalid">
                      {errors.address_line2}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3 col-12 col-md-6 shipping-input"
                  controlId="stateid"
                >
                  <Form.Label className="shipping-label-name">State</Form.Label>
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
                <Form.Group
                  className="mb-3 col-12 col-md-6 shipping-input"
                  controlId="city"
                >
                  <Form.Label className="shipping-label-name">City</Form.Label>
                  <Form.Control
                    name="city"
                    isInvalid={errors.city && touched.city ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    disabled={readOnly}
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
                  className="mb-3 col-12 col-md-6 shipping-input"
                  controlId="post_code"
                >
                  <Form.Label className="shipping-label-name">
                    Pin code
                  </Form.Label>
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
                <div className="row">
                  <div className="col-md-8 profile-form-item d-flex">
                    <div className="form-check form-check-inline dalivery-standard">
                      <FormControlLabel
                        className="form-text-check"
                        control={<Radio />}
                        label="Home"
                        id="address_type_id"
                        onChange={() => {
                          setFieldValue('address_type_id', 9);
                        }}
                        checked={values.address_type_id === 9}
                        name="address_type"
                        value={8}
                      />
                      {/* <input
                  className="form-check-input"
                  type="radio"
                  id="address_type1"
                  name="address_type_id"
                  // defaultChecked={true}
                  onChange={() => {
                    setFieldValue('address_type_id', 9);
                  }}
                  value={9}
                  checked={values.address_type_id === 9}
                /> */}
                      {/* <label className="form-check-label">Home</label> */}
                      {!!errors.address_type && (
                        <p className="text-danger Mui-error">
                          {errors.address_type}
                        </p>
                      )}
                    </div>
                    <div className="form-check form-check-inline dalivery-standard">
                      <FormControlLabel
                        className="form-text-check"
                        control={<Radio />}
                        label="Office"
                        id="address_type_id"
                        onChange={() => {
                          setFieldValue('address_type_id', 8);
                        }}
                        checked={values.address_type_id === 8}
                        name="address_type"
                        value={8}
                      />
                      {/* <input
                  className="form-check-input"
                  type="radio"
                  id="address_type_id"
                  onChange={() => {
                    setFieldValue('address_type_id', 8);
                  }}
                  checked={values.address_type_id === 8}
                  name="address_type"
                  value={8}
                />
                <label className="form-check-label">Office</label> */}
                    </div>
                  </div>
                  {/* <div className="col-md-6 profile-form">
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
            </div> */}

                  <div className="col-4 text-end checkout-validate">
                    {!checkout.shipping_address?.mobile_no ? (
                      <button
                        disabled={!(isValid && dirty)}
                        type="submit"
                        className="btn check-out custom_btn checkout-new-button "
                        // className={`btn check-out custom_btn ${
                        //   !isValid || !dirty ? 'disabled-btn' : ''
                        // }`}
                      >
                        Save
                      </button>
                    ) : readOnly ? (
                      ''
                    ) : (
                      <button
                        disabled={!(isValid && dirty)}
                        type="submit"
                        className="btn check-out custom_btn "
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </section>
            </Form>
          )}
          <div className="mb-3 col-12 d-flex gap-2 align-items-center check-color-box">
            <Checkbox
              id="information"
              defaultChecked={sameAsShipping}
              onChange={(e) => {
                setBillingSame(e.target.checked);
              }}
              sx={{ p: 0 }}
            />
            <span className="form-check-box ">
              Billing Address is the same as Delivery Address
            </span>
          </div>
        </>
      )}
      {/* <p className="shipping-title">Shipping Address</p> */}

      {/* <Link href={'/cart'}>
          <i className="fa-solid fa-angle-left text-dark" />
          <span className="text-dark px-1">Return to cart</span>
        // </Link> */}

      {/* {userAddrData?.customer_address?.map((address: any, i: any) => {
        return ( */}
      <div>
        {/* <div>{address.id}</div> */}

        {popup && (
          <ConfrimPopup
            handlePopup={handlePopUp}
            show={popup}
            content={'Are you sure to delete the Address ?'}
            title={'Delete Address'}
            handleSubmit={() => {
              handleDelete(selectedAddressId);
              handlePopUp(selectedAddressId);
            }}
          />
        )}
      </div>
      {/* );
      })} */}

      {modalOpen && (
        <AddressPopup
          handleFormData={handleFormData}
          title="Shipping address"
          handlePopup={handleAddressPopup}
          address={checkout.customer_address}
          btnPrimaryLabel="Close"
          btnSecondaryLabel="Submit"
          open={modalOpen}
        />
      )}
      {showShippingAddress && (
        <Dialog
          open={showShippingAddress}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Add Address</DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-slide-description"> */}
            <MyAddress
              handleClose={handleClose}
              setAddressData={userAddrData}
              handleFetch={handleFetch}
            />
            {/* </DialogContentText> */}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ShippingAddress;
