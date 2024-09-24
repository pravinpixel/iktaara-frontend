import React from 'react';
import { Box, Grid } from '@mui/material';
import Image from 'next/image';

const CheckNewPayment = () => {
  return (
    <>
      <section>
        <Box>
          <Grid container sx={{ minHeight: { xs: '500px', sm: '0px' } }}>
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              sx={{
                display: { xs: 'flex', sm: 'flex' },
                alignItems: { xs: 'center', sm: 'unset' },
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  display: { xs: 'flex', sm: 'contents' },
                  justifyContent: { xs: 'center', sm: 'unset' },
                }}
              >
                <Grid item xs={12} sm={7} md={6}>
                  <Box
                    sx={{
                      position: 'relative',
                      objectFit: 'contain',
                      aspectRatio: 3.06,
                    }}
                  >
                    {' '}
                    <Image
                      src="/images/checkout-new/payment_1.png"
                      fill
                      alt="payment"
                    ></Image>
                  </Box>
                </Grid>
                <Grid
                  item
                  md={6}
                  sx={{
                    display: 'flex',
                    // alignItems: 'flex-start',
                    // justifyContent: 'center',
                  }}
                  className="checkout-new-payment"
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: '10px',
                    }}
                  >
                    {' '}
                    <Image
                      src="/images/checkout-new/payment_2.png"
                      width={33}
                      height={21}
                      alt="payment"
                    ></Image>
                    <Image
                      src="/images/checkout-new/payment_3.png"
                      width={33}
                      height={21}
                      alt="payment"
                    ></Image>
                    <Image
                      src="/images/checkout-new/payment_6.png"
                      width={33}
                      height={21}
                      alt="payment"
                    ></Image>
                    <Image
                      src="/images/checkout-new/payment_5.png"
                      width={33}
                      height={21}
                      alt="payment"
                    ></Image>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </section>
    </>
  );
};

export default CheckNewPayment;
