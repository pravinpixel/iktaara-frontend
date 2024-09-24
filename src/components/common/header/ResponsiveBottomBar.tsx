import ImageComponent from '@/utils/imageComponent';
import { Box, Grid } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

const ResponsiveBottomBar = () => {
  const cart_count = useSelector((state: RootState) => state.cart.cart_count);
  // const router = useRouter();

  const handleSupportClick = () => {
    document.getElementById('zsiq_float')?.click();
  };

  // const handleLogout = () => {
  //   signOut();
  //   window.localStorage.removeItem(AuthConfig.tokenName);
  //   window.localStorage.removeItem('user');
  //   window.localStorage.removeItem('UUID');
  // };

  return (
    <div className="icon-group cart-desktop d-md-none d-block">
      <Grid container>
        <Grid item xs={6} sx={{ borderRight: '1px solid #D4D9DF' }}>
          <Link href="/buy/cart" className="top-cart">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              {/* <img src="/images/banner/cart.png" alt="user-icon" /> */}
              <ImageComponent
                src="/images/banner/cart.png"
                width={20}
                height={20}
                alt="user-icon"
                priority={true}
              />
              <p className="footre-bottamtext">Cart</p>
              <span className="cart-count-badage1">
                {' '}
                {cart_count == undefined ? 0 : cart_count}
              </span>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={handleSupportClick}
          >
            <ImageComponent
              src="/images/banner/support-img.png"
              width={24}
              height={24}
              alt="user-icon"
              priority={true}
            />
            {/* <img src="/images/banner/support-img.png" alt="user-icon" /> */}
            <p className="footre-bottamtext">Support</p>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResponsiveBottomBar;
