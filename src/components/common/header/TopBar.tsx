import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import api from 'src/lib/api/home';

const TopBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const phoneNumber = 9940046621;
  const [loading, setLoading] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [content, setContent] = useState<string | null>(null);
  const router = useRouter();
  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   arrows: false,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   speed: 10000,
  //   autoplaySpeed: 1,
  // };

  useEffect(() => {
    if (!loading) {
      api.getTopNotification().then((res: any) => {
        if (res?.status_code == 200) {
          setContent(res.data[0]?.content);
          setLoading(true);
        }
      });
    }
  }, [loading]);

  return (
    <>
      <section
        className={`${
          router.pathname === '/login' ||
          router.pathname === '/signup' ||
          router.pathname === '/forgot-password' ||
          router.pathname === '/login/mobile' ||
          router.pathname === '/reset-password'
            ? 'top-bar'
            : 'top-bar-new'
        }`}
      >
        <Container
          fluid
          className="scc d-flex align-items-center justify-content-center w-100 flex-md-row flex-column"
        >
          <div className="animo-1"></div>
          <div className="animo text-center"> {content}</div>
          <div className="animo-2">
            Call us :
            <Link
              href="tel:+9940046621"
              target="_blank"
              className="d-md-none mobile-device-header"
            >
              {phoneNumber}
            </Link>
            {matches && (
              <>
                <span
                  className="desktop-device matches"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  {phoneNumber}
                </span>
                <Menu
                  id="basic-menu"
                  className="menu-styles"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      href={`https://wa.me/+91${phoneNumber}`}
                      target="_blank"
                    >
                      <WhatsAppIcon className="wattsappIcon" />
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href={`skype:+91${phoneNumber}?call`} target="_blank">
                      <Image
                        src="/images/skype.svg"
                        alt="skype"
                        height={35}
                        width={35}
                      />
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Container>
        {/* <div fluid className="w-100">
            <p className="scrolling-text">{content}</p>
          </div> */}

        {/* <Container fluid>
            <Slider {...settings} cssEase="linear">
              {new Array(1000).fill(content).map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </Slider>
          </Container> */}
        {/* <Row className="w-100">
            <Col
              md={8}
              className="text-center text-md-end top-bar-text animatio"
            >
              {content}
            </Col>
            <Col
              md={3}
              className="text-center text-md-end top-bar-text animatio"
            >
              Call us : 7845273444
            </Col>
          </Row> */}
        {/* <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-evenly'}
          >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>{content}</Typography>
            </Box>
            <Box>
              <Typography>Call us : 7845273444</Typography>
            </Box>
          </Stack> */}
      </section>
    </>
  );
};

export default TopBar;
