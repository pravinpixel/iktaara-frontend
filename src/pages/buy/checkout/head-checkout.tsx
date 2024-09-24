/* eslint-disable react-hooks/exhaustive-deps */
import { addToCart } from '@/redux/cart-slice';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSiteInfo } from 'src/context/SiteInfoContext';
import api from 'src/lib/api/cart';

// import { useSession } from 'next-auth/react';
import { Container, Typography } from '@mui/material';
// import { TransitionProps } from '@mui/material/transitions';

// type cartState = {
//   carts: any;
//   cart_count: number;
//   shipping_charges: any;
//   cart_total: any;
// };

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const TopBarCheckout = () => {
  const { siteInfo }: any = useSiteInfo();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  // const { status } = useSession();
  // const [open, setOpen] = useState<boolean>(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const phoneNumber = 9940046621;
  // const handleClose = () => {
  //   setOpen(false);
  // };
  useEffect(() => {
    if (!loading) {
      const fetchCartData = async () => {
        const token: string | null =
          (await window.localStorage.getItem('UUID')) || null;
        if (token && token !== null) {
          await api.getCartItems({ guest_token: token }).then((res: any) => {
            if (res?.status_code == 200) {
              dispatch(addToCart(res?.data));
              setLoading(true);
            }
          });
        }
      };
      fetchCartData();
    }
  }, [loading]);
  // const cart_count = useSelector((state: RootState) => state.cart.cart_count);

  return (
    <>
      <Container
        maxWidth={'lg'}
        sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
      >
        {' '}
        <div className="container-fluid top-bar1 d-md-block d-none">
          <div className="justify-content-between d-flex">
            <div className="d-flex flex-row flex-wrap gap-3">
              <Link href="/buy">
                <Image
                  src={'/images/logo.svg'}
                  width={180}
                  height={72}
                  alt={siteInfo?.site_name || 'iktaraa'}
                />
              </Link>
              <div className="d-flex flex-row gap-1 align-items-center justify-content-center">
                <Image
                  src={'/images/checkout-new/header_1.png'}
                  width={26}
                  height={26}
                  alt={siteInfo?.site_name || 'iktaraa'}
                />
                <Typography className="checkout-new-head">
                  Secure Checkout
                </Typography>
              </div>
            </div>

            <div className="icon-group-checkoutnew">
              <Link href={'tel:' + phoneNumber} target="_blank">
                <ul>
                  <li>
                    <div className="top-item text-center top-cart">
                      <Image
                        src="/images/checkout-new/header_2.png"
                        alt="header"
                        width={33}
                        height={33}
                      />
                    </div>
                  </li>
                  <li>
                    <Typography className="checkout-new-head1">
                      9940046621
                    </Typography>
                  </li>
                </ul>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TopBarCheckout;
