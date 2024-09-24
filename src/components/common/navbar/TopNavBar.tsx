import { useSiteInfo } from '@/context/SiteInfoContext';
import { Box, Container, Grid } from '@mui/material';
// import Link from 'next/link';
import { useEffect, useState } from 'react';

import ImageComponent from '@/utils/imageComponent';
import MusicalInstruments from './sections/section-musical';
import ServicesSections from './sections/service-sections';
// import { borderBottom } from 'styled-system';

const TopNavbar = () => {
  const { menus }: any = useSiteInfo();
  const [selected, setSelected] = useState<string | null>(null);

  const handleMouseEnter = (value: string) => {
    setSelected(value);
  };

  const handleMouseLeave = () => {
    setSelected(null);
  };

  const handleMouseEnterBackDrop = () => {
    setSelected(null);
  };

  // const handleSelect = (value: string) => {
  //   setSelected(value === selected ? null : value);
  // };

  useEffect(() => {
    if (selected) {
      document.body.style.position = 'fixed'; // Prevent scrolling on the body
      document.body.style.width = '100%'; // Maintain full width
      document.body.style.overflowY = 'scroll'; // Ensure vertical scrolling remains available
    } else {
      document.body.style.position = ''; // Reset position to default
      document.body.style.width = ''; // Reset width
      document.body.style.overflowY = ''; // Reset overflow
    }
  }, [selected]);

  return (
    <>
      <Box
        sx={{
          gap: '15px',
          margin: '1px 0 0 0',
          padding: '0px 13px',
          background:
            'linear-gradient(90deg, #DA1D43 11.78%, #3C1393 48.54%, #00968A 87.58%)',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        className="d-none d-md-flex"
      >
        <Container
          maxWidth={'lg'}
          sx={{
            maxWidth: { xl: '83% !important', lg: '83%' },
            border: 'none',
            // my: 1,
            py: 1,
          }}
        >
          <Grid
            container
            display={'flex'}
            flexDirection={'row'}
            className="d-none d-md-flex"
          >
            <Grid item sm={7} md={7} lg={8.5} gap={3} display={'flex'}>
              <Box
                className={`text-white menu-white menu-right-text menu-left-arrow menu-hover-border ${
                  selected === 'MusicalInstruments'
                    ? 'menu-hover-border-option'
                    : ''
                }`}
                onMouseEnter={() => handleMouseEnter('MusicalInstruments')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="menu-right-span">Musical Instruments</span>
                {/* <img src="/images/menu/menu_arrow.png" alt="" /> */}
                <ImageComponent
                  src="/images/menu/menu_arrow1.svg"
                  width={15}
                  height={9}
                  alt="arrow"
                  priority={true}
                />
              </Box>
              {/* <Link
                href="/buy/category/books"
                className="text-white menu-white menu-right-text"
              >
                <span className="menu-right-span">Books</span>
              </Link> */}

              <Box
                sx={{ display: 'flex', alignItems: 'center' }}
                onMouseEnter={() => handleMouseEnter('Services')}
                onMouseLeave={handleMouseLeave}
                className={`menu-hover-border1 ${
                  selected === 'Services' ? 'menu-hover-border1-option' : ''
                }`}
              >
                <div className="home-menu-relative d-md-block d-none">
                  <button className="home-menu-button">NEW</button>
                </div>
                <Box
                  className={
                    'text-white menu-white menu-right-text menu-left-arrow'
                  }
                  onMouseEnter={() => handleMouseEnter('Services')}
                  // onMouseLeave={handleMouseLeave}
                >
                  <span className="menu-right-span">Services</span>
                  {/* <img src="/images/menu/menu_arrow.png" /> */}
                  <ImageComponent
                    src="/images/menu/menu_arrow1.svg"
                    width={15}
                    height={9}
                    alt="arrow"
                    priority={true}
                  />
                </Box>
              </Box>
              {/* <Box className="text-white menu-white menu-right-text">
                <span className="menu-right-span"> Season SALE!!!</span>
              </Box> */}
            </Grid>
            <Grid item sm={5} md={5} lg={3.5} gap={1} display={'flex'}>
              <ImageComponent
                src="/images/menu/menu_1.png"
                width={18}
                height={18}
                alt="arrow"
                priority={true}
                className="menu-right-image"
              />
              {/* <img src="/images/menu/menu_1.png" className="menu-right-image" /> */}
              <span className="menu-right-text">
                Launching LEARN! Find music experts nearby
              </span>
              <ImageComponent
                src="/images/demo/static/polygon.png"
                width={15}
                height={10}
                alt="arrow"
                priority={true}
                className="menu-right-content-img"
              />
              {/* <img
                src="/images/demo/static/polygon.png"
                className="menu-right-content-img"
              /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* {(selected === 'Services' || selected === 'MusicalInstruments') && (
        <div
          onMouseEnter={() => handleMouseEnter(selected)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`sectionmusic ${
              selected === 'Services' || selected === 'MusicalInstruments'
                ? 'open'
                : ''
            }`}
          >
            {selected === 'Services' ? (
              <ServicesSections closeBox={() => setSelected(null)} />
            ) : (
              <MusicalInstruments
                menus={menus}
                closeBox={() => setSelected(null)}
                setSelected={setSelected}
              />
            )}
          </div>
        </div>
      )} */}

      {(selected === 'Services' || selected === 'MusicalInstruments') && (
        <>
          <Box
            sx={{
              position: 'fixed',
              top: '21%',
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 998,
            }}
            onMouseEnter={() => handleMouseEnterBackDrop()}
            // onMouseLeave={handleMouseLeave}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              zIndex: 999,
              background: 'white',
            }}
            onMouseEnter={() => handleMouseEnter(selected)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`sectionmusic ${selected ? 'open' : ''}`}>
              {selected === 'Services' ? (
                <ServicesSections closeBox={() => setSelected(null)} />
              ) : (
                <MusicalInstruments
                  menus={menus}
                  closeBox={() => setSelected(null)}
                  setSelected={setSelected}
                />
              )}
            </div>
          </Box>
        </>
      )}
    </>
  );
};

export default TopNavbar;
