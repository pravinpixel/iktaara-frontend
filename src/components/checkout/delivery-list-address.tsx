/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Radio, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { log } from 'util';
// import ShippingAddress from '../address/shipping-address';
// import MyAddress from './myaddress';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { updateBillingAddress, updateShippingAddress } from '@/redux/checkout';
import { addUser } from '@/redux/user-slice';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from 'src/lib/api/user';

const DeliveryListAddress = ({
  address,
  sameAsShipping,
  setBillingSame,
  handleFetch,
}: {
  address: any;
  title: string;
  setAddressData: any;
  sameAsShipping: any;
  setBillingSame: any;
  handleFetch: () => {};
}) => {
  const [loading, setLoading] = React.useState(true); // State for loading status
  const { status } = useSession();
  const dispatch = useDispatch();
  const [, setUser] = useState<any>(null);
  const [loagged, setLoagged] = useState<boolean>(false);
  // const handleAddAddressClick = () => {
  //   setShowShippingAddress(true);
  // };
  // const handleChange = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setSelectedValue(event.target.value);
  // };
  // const handleChange = (id: string) => {
  //   setSelectedValue(id);
  // };
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setShowShippingAddress(true);
  // };

  const handleMakeDefault = async (values: any) => {
    const body = {
      // ...values,
      customer_id: values.customer_id,
      address_id: values.id,
      is_default: values.is_default === false ? 0 : 1,
    };
    try {
      const response = await api.makeDefaultAddress(body);
      setLoading(false); // Set loading state to true when API call starts
      toast.success(response.message);

      // setAddressData(response);
      dispatch(updateShippingAddress(values));

      if (sameAsShipping) {
        setBillingSame(true);
        dispatch(updateBillingAddress(values));
      }
      handleFetch();

      // const profile = api.getMe().then((res: any) => {
      //   setUser(res.customer_data);
      //   dispatch(addUser(res.customer_data));

      //   const checkoutData = {
      //     customer_id: res?.customer_data?.id,
      //     customer_address: res?.customer_data?.customer_address,
      //     carts: cart?.carts,
      //     cart_total: cart?.cart_total,
      //     shipping_charges: cart?.shipping_charges,
      //     // shipping_address: defaultShippingAddress,
      //     // billing_address: defaultBillingAddress,
      //   };

      //   dispatch(update(checkoutData));
      //   // window.location.reload();
      //   return res.customer_data;
      // });
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setLoading(true); // Set loading state to false when API call completes
    }
  };

  useEffect(() => {
    if (loagged == false && status == 'authenticated') {
      api.getMe().then((res: any) => {
        setUser(res.customer_data);
        dispatch(addUser(res.customer_data));
        return res.customer_data;
      });
      setLoagged(true);
    }
  }, [loagged, status]);
  return (
    <section className="list-section-dalivery">
      {/* <h6 className="dalivery-title">{title}</h6> */}
      <Grid container>
        <Grid item xs={6} className="">
          {/* {address?.customer_address?.map((address: any, i: any) => {
            return ( */}
          <>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              className="address-radio"
            >
              <Radio
                // checked={selectedValue === address.id}
                // onChange={() => handleChange(address.id)}
                checked={address.is_default === 0 ? false : true}
                // onChange={(e) => {
                //   handleMakeDefault(address);
                // }}
                onChange={() => {
                  if (loading) {
                    handleMakeDefault(address);
                  }
                }}
                disabled={!loading} // Disable the radio button when loading state is true
                value={address.id}
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
              />
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Typography className="dalivery-add-name">
                  {address?.first_name}
                </Typography>
                <Box className="dalivery-box-add">
                  <Typography className="dalivery-text-name">
                    {address?.sub_category?.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ paddingLeft: '30px' }}>
              <div className="address-dalivery-box">
                <Typography className="adress-list-dalivery">
                  {address?.address_line1}
                </Typography>
              </div>
              <Typography className="Landmark-list">
                <span>Landmark:</span> {address?.address_line1}
              </Typography>
            </Box>
          </>
          {/* );
          })} */}
        </Grid>

        {/* <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box className="add-address-bg">
            <Button
              variant="outlined"
              className="addaddress-text"
              onClick={handleAddAddressClick}
            >
              + Add Address
            </Button>
          </Box>
        </Grid> */}
      </Grid>
      {/* {showShippingAddress && (
        <Dialog
          open={showShippingAddress}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Add Address</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <MyAddress />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )} */}
    </section>
  );
};

export default DeliveryListAddress;
