import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const DeliveryAddress = () => {
  return (
    <div className="dalivery-sections">
      <h6 className="dalivery-title">Delivery Address</h6>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography className="lable-dalivery">First Name</Typography>
            <TextField
              id="firstName"
              name="firstName"
              placeholder="Enter First Name"
              size="small"
              fullWidth
              variant="outlined"
              className="input-dalivery"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="lable-dalivery">Last Name</Typography>
            <TextField
              id="lastName"
              name="lastName"
              placeholder="Enter Last Name"
              size="small"
              fullWidth
              variant="outlined"
              className="input-dalivery"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="lable-dalivery">Email ID</Typography>
            <TextField
              id="email"
              name="email"
              placeholder="Enter Email ID"
              size="small"
              fullWidth
              variant="outlined"
              className="input-dalivery"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="lable-dalivery">Mobile Number</Typography>
            <TextField
              id="number"
              name="number"
              placeholder="Enter Mobile Number"
              size="small"
              fullWidth
              variant="outlined"
              className="input-dalivery"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="lable-dalivery">Address</Typography>
            <TextField
              id="address"
              name="address"
              placeholder="Enter Address"
              size="small"
              fullWidth
              variant="outlined"
              className="input-dalivery"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="lable-dalivery">Area</Typography>
            <TextField
              id="area"
              name="area"
              placeholder="Enter Area"
              size="small"
              fullWidth
              variant="outlined"
              className="input-dalivery"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="lable-dalivery">State</Typography>
            <TextField
              id="state"
              name="state"
              placeholder="Enter State"
              size="small"
              fullWidth
              variant="outlined"
              className="input-dalivery"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="lable-dalivery">City</Typography>
            <TextField
              id="city"
              name="city"
              placeholder="Enter City"
              size="small"
              fullWidth
              variant="outlined"
              className="input-dalivery"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="lable-dalivery">Pincode</Typography>
            <TextField
              id="pincode"
              name="pincode"
              placeholder="Enter Pincode"
              size="small"
              fullWidth
              variant="outlined"
              className="input-dalivery"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="home"
              >
                <FormControlLabel
                  value="home"
                  control={<Radio />}
                  label="Home"
                  className="radio-buttons"
                />
                <FormControlLabel
                  value="office"
                  control={<Radio />}
                  label="Office"
                  className="radio-buttons"
                />
                <FormControlLabel
                  value="others"
                  control={<Radio />}
                  label="Others"
                  className="radio-buttons"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Billing Address same as Delivery Address"
                className="check-box"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </form>
      <hr />
    </div>
  );
};

export default DeliveryAddress;
