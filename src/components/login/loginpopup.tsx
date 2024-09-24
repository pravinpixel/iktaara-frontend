import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from 'src/lib/api/home';
import CreateAccountWidget from './createAccountWidget';
import ForgetPasswordWidget from './forgetPasswordWidget';
import Loginwidget from './loginwidget';
import OtpLoginWidget from './otpLoginWidget';

const Loginpopup = (props: any) => {
  const { Close, setPopUpType, popUpType } = props;

  const [banner, setBanner] = useState<any>();
  useEffect(() => {
    if (banner == null) {
      api.getLoginBanner().then((res: any) => {
        if (res?.status_code == 200) {
          setBanner(res.data);
        }
      });
    }
  }, [banner, setBanner]);

  return (
    <section>
      <Grid container spacing={1}>
        {banner?.map((item: any) => (
          <Grid item xs={0} md={4.5} key={item.id} className="login-main">
            <Box
              sx={{
                position: 'relative',
                objectFit: 'contain',
                aspectRatio: 0.52,
              }}
            >
              <Image src={item.image} fill alt={item.title} />
            </Box>
          </Grid>
        ))}
        <Grid item xs={12} md={7.5}>
          {popUpType === 'login' ? (
            <Loginwidget onclick={Close} setPopUpType={setPopUpType} />
          ) : popUpType === 'forgot' ? (
            <ForgetPasswordWidget onclick={Close} setPopUpType={setPopUpType} />
          ) : popUpType === 'create' ? (
            <CreateAccountWidget onclick={Close} setPopUpType={setPopUpType} />
          ) : (
            <OtpLoginWidget onclick={Close} setPopUpType={setPopUpType} />
          )}
        </Grid>
      </Grid>
    </section>
  );
};

export default Loginpopup;
