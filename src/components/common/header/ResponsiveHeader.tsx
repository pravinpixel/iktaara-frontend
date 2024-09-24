/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import { useSiteInfo } from '@/context/SiteInfoContext';
import { addToCart } from '@/redux/cart-slice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import api from 'src/lib/api/cart';
// import SearchBar from './search-bar';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Offcanvas } from 'react-bootstrap';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Fade from '@mui/material/Fade';
// import ServicesSections from '../navbar/sections/service-sections';
import ServicesSectionsMobile from '../navbar/sections/service-section-mobile';
// import MusicalInstruments from '../navbar/sections/section-musical';
import { AuthConfig } from '@/configs/auth';
import { openPopup } from '@/redux/user-slice';
import ImageComponent from '@/utils/imageComponent';
import { signOut, useSession } from 'next-auth/react';
import MusicalInstrumentsMobile from '../navbar/sections/section-musical-mobile';
import Responsivesearch from './Responsivesearch';

const ResponsiveHeader = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const { menus }: any = useSiteInfo();
  const { siteInfo }: any = useSiteInfo();
  const [anchorEl, setAnchorEl] = useState(null);
  // const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);
  const { status } = useSession();
  const fetchCartData = async () => {
    const token = await window.localStorage.getItem('UUID');
    await api.getCartItems({ guest_token: token }).then((res: any) => {
      if (res?.status_code == 200) {
        dispatch(addToCart(res.data));
      }
    });
  };
  const handleClicks = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorEl(null);
  };
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleClosess = () => {
    setIsOpen(false); // Close the component
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleLogout = () => {
    signOut().then(() => {
      window.localStorage.removeItem(AuthConfig.tokenName);
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('UUID');
      window.location.replace('/');
    });
  };

  const handleCheckOut = async () => {
    if (status == 'authenticated') {
      router.push('/buy/profile');
    } else {
      // router.push('/?login=enable&callback=/profile');
    }
    // const currentPath = window.location.pathname + window.location.search;
    // router.push(
    //   `${currentPath}/?login=enable&callback=${encodeURIComponent(
    //     currentPath,
    //   )}`,
    // );
    dispatch(openPopup());
  };
  useEffect(() => {
    fetchCartData();
  }, []);
  return (
    <>
      {!isOpen && (
        <Container fluid className="header-width ">
          <div className="header-padding ">
            <Navbar expand="lg" className="d-md-none d-flex">
              <Navbar.Brand>
                {showOffcanvas ? (
                  <Image
                    src="/images/menu/close.png"
                    width={21}
                    height={20}
                    alt="close"
                    aria-controls="navbarResponsive"
                    onClick={() => setShowOffcanvas(false)}
                    className="menu-image"
                  />
                ) : (
                  <Image
                    src="/images/banner/menu.png"
                    width={22}
                    height={13}
                    alt="menu"
                    aria-controls="navbarResponsive"
                    onClick={() => setShowOffcanvas(true)}
                    className="menu-image"
                  />
                )}
                <Link href={'/'}>
                  <Image
                    src={'/images/logo.svg'}
                    width={114}
                    height={40}
                    alt={siteInfo?.site_name || 'iktaraa'}
                  />
                </Link>
              </Navbar.Brand>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Image
                  src={'/images/banner/search-image.png'}
                  width={21}
                  height={21}
                  alt="search"
                  onClick={handleClick}
                />
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
                        <div onClick={handleClicks}>
                          <ImageComponent
                            src="/images/demo/static/downarrow.png"
                            width={16}
                            height={8}
                            alt="user-icon"
                            priority={true}
                            className="downarrow-profile"
                          />
                          {/* <img
                            src="/images/demo/static/downarrow.png"
                            style={{
                              width: '16px',
                              height: '8px',
                              cursor: 'pointer',
                            }}
                          /> */}
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
                              <div className="header-welcome">Welcome</div>
                              <div className="header-mobile">
                                +91 92399 98239
                              </div>
                            </div>
                          </MenuItem>
                          <Link href={'/buy/profile'}>
                            <MenuItem
                              onClick={handleCloses}
                              sx={{ background: '#D4D9DF', gap: '5px' }}
                              className="home-my-orders"
                            >
                              {/* <img src="/images/demo/static/checklist.png" /> */}
                              <ImageComponent
                                src="/images/demo/static/checklist.png"
                                width={26}
                                height={25}
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
                              height={25}
                              alt="user-icon"
                              priority={true}
                            />
                            {/* <img src="/images/demo/static/signout.png" /> */}
                            Logout
                          </MenuItem>
                        </Menu>
                      </span>
                    </div>
                  </div>
                ) : (
                  <Avatar
                    src="/images/banner/avatar-img.png"
                    onClick={() => handleCheckOut()}
                    className="avatar-imag"
                  />
                )}
              </Box>

              <Offcanvas
                show={showOffcanvas}
                onHide={() => setShowOffcanvas(false)}
                placement="end"
                className="offcanvas-backgroundColor d-md-none d-flex"
              >
                <Box
                  sx={{
                    gap: '15px',
                    margin: '59px 0 0 0',
                    padding: '5px 13px',
                    // background: 'black',
                    background:
                      'linear-gradient(90deg, #DA1D43 11.78%, #3C1393 48.54%, #00968A 87.58%)',
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  className=""
                >
                  <Grid
                    container
                    display={'flex'}
                    flexDirection={'row'}
                    mt={1}
                    className=""
                  >
                    <Grid item md={12} gap={1} display={'flex'}>
                      <ImageComponent
                        src="/images/menu/menu_1.png"
                        width={15}
                        height={15}
                        alt="user-icon"
                        priority={true}
                        className="menu-right-image"
                      />
                      {/* <img
                        src="/images/menu/menu_1.png"
                        className="menu-right-image"
                      /> */}
                      <span className="menu-right-text">
                        Launching LEARN! Find music <br />
                        experts nearby
                      </span>
                    </Grid>
                  </Grid>
                </Box>
                <div>
                  <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                    className="accordion-menu"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className="accordion-res-header">
                        Musical Instruments
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="musical-accordion">
                      <MusicalInstrumentsMobile
                        menus={menus}
                        onCloseAccordion={() => setExpanded(false)}
                        setShowOffcanvas={setShowOffcanvas}
                      />
                    </AccordionDetails>
                  </Accordion>
                  {/* <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                    className="accordion-menu"
                  >
                    <AccordionSummary
                      // expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography className="accordion-res-header">
                        Books
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus
                        feugiat lectus, varius pulvinar diam eros in elit.
                        Pellentesque convallis laoreet laoreet.
                      </Typography>
                    </AccordionDetails>
                  </Accordion> */}
                  <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                    className="accordion-menu"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                      sx={{ backgroundColor: 'white' }}
                    >
                      <Typography className="accordion-res-header">
                        Services
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="res-servives-main">
                      <ServicesSectionsMobile
                        onCloseAccordion={() => setExpanded(false)}
                      />
                    </AccordionDetails>
                  </Accordion>
                  {/* <Accordion
                    expanded={expanded === 'panel4'}
                    onChange={handleChange('panel4')}
                    className="accordion-menu"
                  >
                    <AccordionSummary
                      // expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography className="accordion-res-header">
                        Season{' '}
                        <span className="accordion-res-header1">SALE!!!</span>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat
                        nisl. Integer sit amet egestas eros, vitae egestas
                        augue. Duis vel est augue.
                      </Typography>
                    </AccordionDetails>
                  </Accordion> */}
                </div>
              </Offcanvas>
            </Navbar>
          </div>
        </Container>
      )}
      {isOpen && <Responsivesearch handleClosess={handleClosess} />}
    </>
  );
};

export default ResponsiveHeader;
