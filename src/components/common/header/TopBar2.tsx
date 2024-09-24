/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import { useSiteInfo } from 'src/context/SiteInfoContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { addToCart } from '@/redux/cart-slice';
import api from 'src/lib/api/cart';
import { signOut, useSession } from 'next-auth/react';
import { Container, Dialog, Menu, MenuItem, Slide } from '@mui/material';
import Loginpopup from '@/components/login/loginpopup';
import { TransitionProps } from '@mui/material/transitions';
import { useRouter } from 'next/router';
import { AuthConfig } from '@/configs/auth';
import SearchMain from '@/components/search/searchMain';
import { closePopup, openPopup } from '@/redux/user-slice';
import ImageComponent from '@/utils/imageComponent';
import userapi from 'src/lib/api/user';

// type cartState = {
//   carts: any;
//   cart_count: number;
//   shipping_charges: any;
//   cart_total: any;
// };

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TopBar2 = () => {
  const { siteInfo }: any = useSiteInfo();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { status } = useSession();
  const [, setOpen] = useState<boolean>(false);
  const [popUpType, setPopUpType] = useState('login');
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const [user, setUser] = useState<any>(null);

  const isOpen = useSelector((state: any) => state.user.isOpen);

  const handleClosePopup = () => {
    dispatch(closePopup());
  };
  // const handleCloseDrop = () => {
  //   setsearchDrop(false);
  // };
  // const handleOpen = () => {
  //   setsearchDrop(true);
  // };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloses = () => {
    setAnchorEl(null);
    // signOut();
  };

  const handleLogout = () => {
    signOut().then(() => {
      window.localStorage.removeItem(AuthConfig.tokenName);
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('UUID');
      window.location.replace('/');
    });
  };

  useEffect(() => {
    const { login, create, forgot } = router.query;
    if (login === 'enable') {
      // Perform your logic here, such as enabling the login
      dispatch(openPopup());
      setOpen(true);
    }
    if (create === 'enable') {
      // Perform your logic here, such as enabling the login
      setOpen(true);
    }
    if (forgot === 'enable') {
      setOpen(true);
    }
  }, [router.query]);

  const handleClickOpen = () => {
    dispatch(openPopup());

    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const cart_count = useSelector((state: RootState) => state.cart.cart_count);

  // Other state and effect hooks...

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

  useEffect(() => {
    if (status === 'authenticated') {
      userapi.getMe().then((res: any) => {
        setUser(res?.customer_data);
      });
    }
  }, [status]);

  // useEffect(() => {
  //   if(popUpType === 'login'){
  //     setOpen(true)
  //   }
  // },[popUpType])

  return (
    <>
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleCloseDrop}
      > */}
      <Container
        maxWidth={'lg'}
        sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
      >
        {' '}
        <div className="container-fluid top-bar1 d-md-block d-none">
          <div className="justify-content-between d-flex align-items-center">
            <div className="logo">
              <Link href="/">
                <Image
                  src={'/images/logo.svg'}
                  width={189}
                  height={72}
                  alt={siteInfo?.site_name || 'iktaraa'}
                />
              </Link>
            </div>
            {/* <SearchBar menus={menus} type={'fullwidth'} /> */}
            <SearchMain />
            <div className="icon-group">
              <ul className="topbar-login-space">
                <li>
                  <Link href="/buy/cart">
                    <div className="top-item-cart1 text-center top-cart">
                      {/* <img
                        src="/icons/shopping-bag_1.png"
                        alt=""
                        className="shopping-cart-image-portion"
                      /> */}
                      <ImageComponent
                        src="/icons/shopping-bag_1.png"
                        width={20}
                        height={20}
                        alt="share"
                        priority={true}
                        className="shopping-cart-image-portion"
                      />
                      {/* <img src="/icons/header-cart.png" alt="" /> */}

                      {/* <i className="fa-solid fa-cart-shopping" /> */}
                      <span className="cart-count-badage">
                        {' '}
                        {cart_count == undefined ? 0 : cart_count}{' '}
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  {status == 'authenticated' ? (
                    <div
                      className="top-item1 text-center"
                      style={{
                        height: '40px',
                        width: '73px',
                        background: '#E34061',
                        borderRadius: '28px',
                        padding: '2px',
                      }}
                    >
                      <div className="d-flex gap-2 justify-content-start align-items-center ">
                        <Link href="/buy/profile">
                          <Image
                            src="/images/demo/static/Profilee.png"
                            alt="user-icon"
                            width={35}
                            height={35}
                            className="Profilee-item"
                            // style={{ width: '35px', height: '35px' }}
                          />
                        </Link>
                        <span>
                          <div onClick={handleClick}>
                            <ImageComponent
                              src="/images/demo/static/downarrow.png"
                              width={16}
                              height={8}
                              alt="user-icon"
                              priority={true}
                              className="downarrow-profile"
                            />
                          </div>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloses}
                            className="home-header-menu"
                            elevation={0}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                            <MenuItem
                              onClick={handleCloses}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'Flex-start',
                                textAlign: 'start',
                                alignItems: 'flex-start',
                                padding: '4px',
                              }}
                            >
                              <div className="header-box">
                                <div className="header-welcome">
                                  {' '}
                                  {user?.first_name}
                                </div>
                                <div className="header-mobile">
                                  {user?.mobile_no}
                                </div>
                              </div>
                            </MenuItem>
                            <Link href={'/buy/profile'}>
                              <MenuItem
                                onClick={handleCloses}
                                sx={{ background: '#D4D9DF', gap: '5px' }}
                                className="home-my-orders"
                              >
                                <ImageComponent
                                  src="/images/demo/static/checklist.png"
                                  width={26}
                                  height={26}
                                  alt="user-icon"
                                  priority={true}
                                />
                                My Orders
                              </MenuItem>
                            </Link>
                            <MenuItem
                              // onClick={handleCloses}
                              sx={{ gap: '5px' }}
                              className="home-logout"
                              onClick={() => handleLogout()}
                            >
                              <ImageComponent
                                src="/images/demo/static/signout.png"
                                width={26}
                                height={26}
                                alt="user-icon"
                                priority={true}
                              />
                              Logout
                            </MenuItem>
                          </Menu>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div onClick={handleClickOpen}>
                      {/* <div className="top-item text-center">
                      <img src="/icons/header-guest.png" alt="user-icon" />
                    </div> */}
                      <div
                        className="top-item1 text-center"
                        style={{
                          height: '40px',
                          width: '103px',
                          background: '#E34061',
                          borderRadius: '28px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div className="d-flex gap-2 justify-content-center align-items-center top-item1-div">
                          <ImageComponent
                            src="/icons/login.png"
                            width={20}
                            height={15}
                            alt="Login-icon"
                            priority={true}
                          />
                          {/* <img src="/icons/login.png" alt="user-icon" /> */}
                          <span>Login</span>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
                {/* <li>
                <div className="top-item text-center">
                  <img src="/icons/header-phone.png" alt="" />
                  {/* <i className="fa-solid fa-phone" /> 
                </div>
              </li>
              <li>
                <div className="top-item text-center">
                  <img src="/icons/header-chat.png" alt="" />
                  {/* <i className="fa-solid fa-message" /> 
                  {/* <i className="fa-solid fa-comment" /> 
                </div>
              </li> */}
              </ul>
            </div>
          </div>
        </div>
        {isOpen === true ? (
          <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClosePopup}
            aria-describedby="alert-dialog-slide-description"
            className="login"
          >
            <Loginpopup
              Close={handleClosePopup}
              setOpen={setOpen}
              setPopUpType={setPopUpType}
              popUpType={popUpType}
            />
          </Dialog>
        ) : null}
      </Container>
      {/* </Backdrop> */}
    </>
  );
};

export default TopBar2;
