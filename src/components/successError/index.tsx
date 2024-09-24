/* eslint-disable @next/next/no-img-element */
import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
// import successImage from '../../../assets/images/payment-success.png';

const SuccessError = () => {
  return (
    <Container>
      <Box
        sx={{
          // background: '#e1e1ec',
          height: '450px',
          width: '450px',
          borderRadius: '20px',
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            className="text-center-cls authLogo"
            sx={{
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={'/images/image_1.png'} width={'300px'} alt="image_1" />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 10 }}>
            <img
              src={'/images/checkout-new/failure.png'}
              width={'100px'}
              height={'100px'}
              alt="failure"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: 'center',
              mt: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Sora',
                fontSize: '30px',
                fontWeight: '600',
              }}
            >
              Payment Failed
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SuccessError;
