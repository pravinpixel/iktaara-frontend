import { Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';

const AddressList = ({ userData }: any) => {
  return (
    <>
      {/* <section>
        {userAddrData?.customer_address?.map((address: any, i: any) => {
          

          return (
            <>
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Typography className="dalivery-add-name">
                  {address?.first_name}
                </Typography>
                <Box className="dalivery-box-add">
                  <Typography className="dalivery-text-name">Home</Typography>
                </Box>
              </Box>
              <Box>
                <div className="address-dalivery-box">
                  <Typography className="adress-list-dalivery">
                    {address?.address_line1}
                  </Typography>
                </div>
                <Typography className="Landmark-list mb-3">
                  <span>Landmark:</span> {address?.address_line2}
                </Typography>
              </Box>
            </>
          );
        })}
      </section> */}
      <section className="mt-2">
        {userData?.customer_address?.map((address: any, i: number) => {
          if (address.is_default === 1) {
            return (
              <Fragment key={i}>
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <Typography className="dalivery-add-name">
                    {address.first_name}
                  </Typography>
                  <Box className="dalivery-box-add">
                    <Typography className="dalivery-text-name">Home</Typography>
                  </Box>
                </Box>
                <Box>
                  <div className="address-dalivery-box">
                    <Typography className="adress-list-dalivery">
                      {address.address_line1}
                    </Typography>
                  </div>
                  <Typography className="Landmark-list mb-3">
                    <span>Landmark:</span> {address.address_line2}
                  </Typography>
                </Box>
              </Fragment>
            );
          }
          return null; // Skip rendering if not default
        })}
      </section>
    </>
  );
};

export default AddressList;
