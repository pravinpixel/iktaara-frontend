import { Box, Grid, Radio, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const DeliveryOPtions = ({ shippingValue }: any) => {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedValue(event.target.value);
  };
  return (
    <section className="deliveryoPtions mb-3 mt-3">
      <h6 className="dalivery-title">Delivery Options</h6>
      <Box className="dalivery-box-bg">
        <Grid container sx={{ padding: '10px' }}>
          <Grid item xs={9} md={10} className="dalivery-standard">
            <Radio
              checked={selectedValue === 'a'}
              onChange={handleChange}
              value="a"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
            <Image
              src={'/images/banner/delivery.png'}
              alt="delivery"
              width={26}
              height={28}
            />
            <div>
              <Typography className="standard-days">
                Shipping Charges
              </Typography>
              {/* <Typography variant="body1" className="arrives-data">
                Arrives between Apr 10 - 20, 2024
              </Typography> */}
            </div>
          </Grid>
          <Grid
            item
            xs={3}
            md={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" className="dalivery-free">
              ₹ {shippingValue}
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid container sx={{ padding: '10px' }}>
          <Grid item xs={10} className="dalivery-standard">
            <Radio
              checked={selectedValue === 'b'}
              onChange={handleChange}
              value="b"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'B' }}
            />
            <Image
              src={'/images/banner/fast_delivery.png'}
              alt=""
              width={34}
              height={26}
            />
            <div>
              <Typography className="standard-days">
                Express Delivery <span>. 1 days</span>
              </Typography>
              <Typography variant="body1" className="arrives-data">
                Arrives between Apr 1 - 2, 2024
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography className="dalivery-free">
              <span>₹</span>50.00
            </Typography>
          </Grid>
        </Grid> */}
      </Box>
    </section>
  );
};

export default DeliveryOPtions;
