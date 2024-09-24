import Searchcompound from '@/components/search/searchcompound';
import ImageComponent from '@/utils/imageComponent';
import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import api from 'src/lib/api/product';

// const data1 = [
//   {
//     datas: [
//       {
//         id: 1,
//         image: '/images/demo/static/guitar.png',
//         title: 'Acoustic Guitars',
//       },
//       {
//         id: 2,
//         image: '/images/demo/static/guitar.png',
//         title: 'Electric Drums',
//       },
//       {
//         id: 3,
//         image: '/images/demo/static/guitar.png',
//         title: 'Portable Keyboard',
//       },
//       {
//         id: 4,
//         image: '/images/demo/static/guitar.png',
//         title: 'Saxophone',
//       },
//       {
//         id: 5,
//         image: '/images/demo/static/guitar.png',
//         title: 'Violin Case',
//       },
//     ],
//     book: [
//       {
//         id: 1,
//         img: '/images/demo/static/search1.png',
//       },
//       {
//         id: 2,
//         img: '/images/demo/static/search2.png',
//       },
//       {
//         id: 3,
//         img: '/images/demo/static/search3.png',
//       },
//       {
//         id: 4,
//         img: '/images/demo/static/search4.png',
//       },
//       {
//         id: 5,
//         img: '/images/demo/static/search5.png',
//       },
//     ],
//     musicImage: [
//       { id: 1, image: '/images/home/home-learn.png', text: 'Learn' },
//       { id: 2, image: '/images/home/paly.png', text: 'Paly' },
//       { id: 3, image: '/images/home/perform.png', text: 'Perform' },
//       { id: 4, image: '/images/home/connect.png', text: 'Connect' },
//       { id: 5, image: '/images/home/upgrade.png', text: 'Upgrade' },
//     ],
//   },
// ];

const SearchMain = () => {
  const router = useRouter();

  const [selectedMenu] = useState<number>(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [slug] = useState<string | null>(null);
  const [param, setParam] = useState<string | null>(null);
  const [searchData, setSearchData] = useState(null);
  const [open, setOpen] = useState(false);
  const temp = useRef(null);

  // const handleOpenDrop = () => {
  //   setsearchDrop(true);

  // const handleSearch = (event: any) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   // setParam(event.target.value);
  //   const query: string | null = event.target.value;
  //   if (query && query?.length > 3) {
  //     const data: any = {
  //       search_type: 'product',
  //       search_field: query,
  //       category_id: selectedMenu == 0 ? '' : selectedMenu,
  //     };

  //     const result = api.productSearch(data).then((res: any) => {
  //       if (res?.status_code == 200) {
  //         setLoading(false);
  //         setData(res?.data?.products);
  //       } else {
  //         setLoading(false);
  //         setData([]);
  //       }
  //     });
  //   } else {
  //     setLoading(false);
  //     setData([]);
  //   }
  // };

  function paramsToObject() {
    const UR: URLSearchParams | any = new URLSearchParams();
    UR.set('search_field', param ?? '');
    UR.set('category_id', selectedMenu);
    UR.set('slugs', slug ?? '');
    const stringUrl = UR.toString();
    const entries = UR.entries();
    const result: any = {};
    for (const [key, value] of entries) {
      if (value != 'null' && value != 'undefined') {
        result[key] = value;
      }
    }
    // return result;
    return stringUrl;
  }

  const productSearch = () => {
    const url = paramsToObject();
    if (typeof window != undefined) {
      window.location.href = `/buy/category/search?${url}`;
    }
  };

  const enterKeyPressed = (event: any) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      const url = paramsToObject();
      if (typeof window != undefined) {
        window.location.href = `/buy/category/search?${url}`;
      }
    }
  };
  const handleBackdropClick = () => {
    if (typeof window !== 'undefined') {
      const backdrop = document.querySelector('.backdrop');
      if (backdrop) {
        backdrop.classList.remove('active');
        // setOpen(false);
      }
    }
  };
  useEffect(() => {
    // if (router?.isReady) {

    //   if (temp) {
    //   }
    // }
    setOpen(false);
  }, [router]);

  useEffect(() => {
    if (param) {
      setLoading(true);
      const data: any = {
        search_type: 'product',
        search_field: param,
        category_id: null,
      };

      api
        .productSearch(data)
        .then((res: any) => {
          if (res?.status_code == 200) {
            setData(res?.data?.products);
          } else {
            setData([]);
          }
        })
        .catch(() => {
          setData([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setData([]);
    }
  }, [param]);

  // const paperStyles = {
  //   backdropFilter: 'blur(14px)',
  //   height:'100vh',
  //   // width:'1024px',
  //   position:'absolute',
  //   backgroundColor: 'rgba(104, 99, 99, 0.5)',
  //   '& .MuiAutocomplete-listbox': {
  //     '& li': { padding: 2 },
  //   },
  // };
  // useEffect(() => {
  //   setData([]);
  //   // inputRef.current.value = '';
  // }, [router]);

  // const combinedData = [...data, ...data1];

  useEffect(() => {
    if (searchData == null) {
      api.getSearchData().then((res: any) => {
        if (res?.status_code == 200) {
          setSearchData(res?.data);
        }
      });
    }
  }, [searchData, setSearchData]);
  const length = param?.length || 0;

  // useEffect(() => {
  //   const backdrops = document.querySelector('.backdrop');
  //   if (backdrops) {
  //     backdrops.classList.remove('active');
  //   }
  //   setOpen(false);
  // }, [router, document.querySelector('.backdrop')]);
  useEffect(() => {
    if (open) {
      document.body.style.position = 'fixed'; // Prevent scrolling on the body
      document.body.style.width = '100%'; // Maintain full width
      document.body.style.overflowY = 'scroll'; // Ensure vertical scrolling remains available
    } else {
      document.body.style.position = ''; // Reset position to default
      document.body.style.width = ''; // Reset width
      document.body.style.overflowY = ''; // Reset overflow
    }
  }, [open]);
  return (
    <div
      className="search-bar search-bar-new"
      style={{ border: 'none !important' }}
    >
      {open && <div className="backdrop active"></div>}

      {/* <div className={`backdrop ${isBackdropActive ? 'active' : 'inactive'}`} /> */}
      <Autocomplete
        fullWidth
        id="country-select-demo"
        className="auto-item"
        sx={{ width: '100%' }}
        options={length >= 1 ? data : []}
        filterOptions={(option) => option}
        value={{
          product_name: param || '',
        }}
        //  PaperComponent={({ children }) => <Paper style={paperStyles}>{children}</Paper>}

        // autoHighlight
        noOptionsText={
          <>
            <Box
              component="li"
              key={'search-loading'}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              className="search-drop-main"
            >
              {param?.length && param.length > 0 ? (
                <p>
                  Sorry we could not find the relevant one. Explore similar
                  products.
                </p>
              ) : (
                ''
              )}

              <Searchcompound
                data1={searchData}
                setOpen={setOpen}
                handleBackdropClick={handleBackdropClick}
              />
            </Box>
          </>
        }
        getOptionLabel={(option: any) => option.product_name}
        renderOption={(props, option: any) => {
          return (
            <>
              <div
                onClick={() => {
                  window.location.href = `/buy/product/${option.product_url}`;
                }}
                // href={`/product/${item.product_url}`}
                className="w-100"
              >
                <div className="w-100 d-flex  text-wrap">
                  <div className="search-data-main">
                    <Container sx={{ py: '15px' }}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Grid container md={8}>
                            <Grid item md={1}>
                              <Image
                                src="/images/demo/static/uparrow.png"
                                width={13}
                                height={13}
                                alt=""
                              />
                            </Grid>
                            <Grid item md={11}>
                              <h5 className="product-data-name">
                                <Highlighter
                                  highlightClassName="highlighted"
                                  searchWords={[param as any]}
                                  autoEscape={true}
                                  textToHighlight={option.product_name}
                                  highlightStyle={{
                                    backgroundColor: '#FFE034',
                                    color: '#3B4357',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'Sora',
                                    borderRadius: '4px',
                                  }}
                                />
                              </h5>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Container>
                  </div>
                </div>
              </div>
              {/* {option?.length === 0 ? (
                <Box
                  component="li"
                  key={'search-loading'}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  className="search-drop-main"
                >
                  <Searchcompound data1={data1} />
                </Box>
              ) : (
                <div key={`search-${option.id}`} className="product-scroll">
                  {option?.product_name ? (
                    <div
                      onClick={() => {
                        window.location.href = `/product/${option.product_url}`;
                      }}
                      // href={`/product/${item.product_url}`}
                      className="w-100"
                    >
                      <div className="w-100 d-flex  text-wrap">
                        <div className="search-data-main">
                          <Container sx={{ py: '15px' }}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Grid container md={8}>
                                  <Grid item md={1}>
                                    <Image
                                      src="/images/demo/static/uparrow.png"
                                      width={13}
                                      height={13}
                                      alt=""
                                    />
                                  </Grid>
                                  <Grid item md={11}>
                                    <h5 className="product-data-name">
                                      <Highlighter
                                        highlightClassName="highlighted"
                                        searchWords={[param as any]}
                                        autoEscape={true}
                                        textToHighlight={option.product_name}
                                        highlightStyle={{
                                          backgroundColor: '#FFE034',
                                          color: '#3B4357',
                                          fontSize: '14px',
                                          fontWeight: 600,
                                          fontFamily: 'Sora',
                                          borderRadius: '4px',
                                        }}
                                      />
                                    </h5>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Container>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link href="/">
                      <div className="search-data-main">
                        <Container sx={{ py: '15px' }}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container md={8}>
                                <Grid item md={1}>
                                  <Image
                                    src="/images/demo/static/uparrow.png"
                                    width={13}
                                    height={13}
                                    alt=""
                                  />
                                </Grid>
                                <Grid item md={11}>
                                  <h5 className="product-data-name">
                                    <Highlighter
                                      highlightClassName="highlighted"
                                      searchWords={[param as any]}
                                      autoEscape={true}
                                      textToHighlight={option.product_name}
                                      highlightStyle={{
                                        backgroundColor: '#FFE034',
                                        color: '#3B4357',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        fontFamily: 'Sora',
                                        borderRadius: '4px',
                                      }}
                                    />
                                  </h5>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Container>
                      </div>
                    </Link>
                  )}
                </div>
              )} */}
            </>
          );
        }}
        open={open}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              size="small"
              id="basic-url"
              autoComplete="off"
              className="search-here"
              sx={{
                '& fieldset': { border: 'none' },
              }}
              ref={temp}
              onFocus={() => {
                // if (open) {
                setOpen(true);
                // }
              }}
              onBlur={() => {
                setOpen(false);
              }}
              // onFocus={() => {
              //   // const backdrop = document.querySelector('.backdrop');
              //   // if (backdrop) {
              //   //   backdrop.classList.add('active');
              //   // }
              //   setOpen(true);
              // }}
              // onBlur={(e) => {
              //   // const backdrop = document.querySelector('.backdrop');
              //   // if (backdrop) {
              //   //   backdrop.classList.remove('active');
              //   // }
              //   setOpen(false);
              // }}
              // onBlurCapture={(e) => {
              //   // const backdrop = document.querySelector('.backdrop');
              //   // if (backdrop) {
              //   //   backdrop.classList.remove('active');
              //   // }
              //   setOpen(false);
              // }}
              placeholder="Search for musical instruments, books, accessories"
              aria-describedby="inputGroup-sizing-sm"
              // ref={inputRef}
              // defaultValue={
              //   router.query.search_field != 'null'
              //     ? router.query.search_field
              //     : ''
              // }
              onChange={(e) => {
                setParam(e.target.value);
              }}
              onKeyPress={(event) => {
                enterKeyPressed(event);
              }}
              value={param}
              // onKeyUp={() => {
              //   setLoading(true);
              // }}
              // onKeyPress={() => {
              //   enterKeyPressed(event);
              // }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress size={'small'} />}
                    <div
                      className="top-item-search text-center "
                      style={{
                        height: '35px',
                        width: '96px',
                        background: '#E34061',
                        borderRadius: '28px',
                      }}
                      aria-label="search"
                      // onClick={() => {}}
                    >
                      {/* <div className="d-flex gap-2 justify-content-center align-items-center pt-1 top-item1-div-search"> */}
                      <div
                        className="d-flex gap-2 justify-content-center align-items-center  top-item1-div-search"
                        style={{ paddingTop: '3px' }}
                      >
                        <ImageComponent
                          src="/icons/layer1.png"
                          alt="user-icon"
                          priority={true}
                          width={15}
                          height={15}
                        />
                        <span
                          // style={{ cursor: 'pointer' }}
                          style={{ cursor: 'pointer', marginTop: '3.8px' }}
                          onClick={productSearch}
                        >
                          Search
                        </span>
                      </div>
                    </div>
                  </>
                ),
              }}
            />
          </>
        )}
      />
    </div>
  );
};

export default SearchMain;
