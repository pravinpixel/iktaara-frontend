/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Backdrop, Box, Container, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Highlighter from 'react-highlight-words';
import api from 'src/lib/api/product';
const data1 = [
  {
    id: 1,
    image: '/images/demo/static/guitar.png',
    title: 'Acoustic Guitars',
  },
  {
    id: 2,
    image: '/images/demo/static/guitar.png',
    title: 'Electric Drums',
  },
  {
    id: 3,
    image: '/images/demo/static/guitar.png',
    title: 'Portable Keyboard',
  },
  {
    id: 4,
    image: '/images/demo/static/guitar.png',
    title: 'Saxophone',
  },
  {
    id: 5,
    image: '/images/demo/static/guitar.png',
    title: 'Violin Case',
  },
];
const book = [
  {
    id: 1,
    img: '/images/demo/static/search1.png',
  },
  {
    id: 2,
    img: '/images/demo/static/search2.png',
  },
  {
    id: 3,
    img: '/images/demo/static/search3.png',
  },
  {
    id: 4,
    img: '/images/demo/static/search4.png',
  },
  {
    id: 5,
    img: '/images/demo/static/search5.png',
  },
];
const musicImage = [
  { id: 1, image: '/images/home/home-learn.png', text: 'Learn' },
  { id: 2, image: '/images/home/paly.png', text: 'Paly' },
  { id: 3, image: '/images/home/perform.png', text: 'Perform' },
  { id: 4, image: '/images/home/connect.png', text: 'Connect' },
  { id: 5, image: '/images/home/upgrade.png', text: 'Upgrade' },
];
export function DataContainer(props: any) {
  const { datas, loading, type, param, isSectionVisible } = props;
  let items: any | null = null;
  if (datas?.length > 0) {
    items = datas;
  }
  return (
    <>
      <div className="list-group search-data" id="search-container">
        <div>
          {isSectionVisible === true ? (
            <div key={'search-loading'} className="search-drop-main">
              <h5>Popular Choices</h5>
              <div className="circle-section">
                <Grid container>
                  <Grid item xs={12} md={10}>
                    <Grid container>
                      {data1?.map((item: any) => (
                        <Grid item md={2} key={item.id}>
                          <div className="search-circle">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <h6 className="search-names">{item.title}</h6>
                        </Grid>
                      ))}

                      <Grid item md={2}>
                        <div className="search-circle">
                          <img
                            alt="search"
                            src="/images/demo/static/rightArrow.png"
                          />
                        </div>
                        <h6 className="search-names">View All</h6>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <h5 className="border-title">Top Seller Books</h5>
              <div className="rectangle-section">
                <Grid container my={2}>
                  <Grid item xs={12} md={10}>
                    <Grid container spacing={2}>
                      {book.map((item: any) => (
                        <Grid item md={2} key={item.id}>
                          <div className="rectangle-sec-border">
                            <Box
                              sx={{
                                position: 'relative',
                                objectFit: 'contain',
                                aspectRatio: 0.68,
                              }}
                            >
                              <Image src={item.img} fill alt="img-book" />
                            </Box>
                          </div>
                        </Grid>
                      ))}

                      <Grid
                        item
                        md={2}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}
                      >
                        <div className="search-circle1">
                          <img
                            src="/images/demo/static/rightArrow.png"
                            alt="search"
                          />
                        </div>
                        <h6 className="search-names">View All</h6>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <h5 className="border-title">services</h5>
              <div className="services-sectionss">
                <Grid container>
                  <Grid item xs={12} md={8} mb={1}>
                    <Grid container spacing={2}>
                      {musicImage.map((item: any) => (
                        <Grid item md={2} key={item.id}>
                          <Box
                            sx={{
                              position: 'relative',
                              aspectRatio: 1,
                              objectFit: 'contain',
                            }}
                          >
                            <Image src={item.image} fill alt={item.text} />
                          </Box>
                          <h6 className="service-text">{item.text}</h6>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          ) : (
            ''
          )}
          {loading && items == null ? (
            <div key={'search-loading'} className="search-drop-main">
              <p>
                Sorry we could not find the relevant one. Explore similar
                products.
              </p>
              <h5>Popular Choices</h5>
              <div className="circle-section">
                <Grid container>
                  <Grid item xs={12} md={10}>
                    <Grid container>
                      {data1?.map((item: any) => (
                        <Grid item md={2} key={item.id}>
                          <div className="search-circle">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <h6 className="search-names">{item.title}</h6>
                        </Grid>
                      ))}

                      <Grid item md={2}>
                        <div className="search-circle">
                          <img
                            src="/images/demo/static/rightArrow.png"
                            alt="search"
                          />
                        </div>
                        <h6 className="search-names">View All</h6>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <h5 className="border-title">Top Seller Books</h5>
              <div className="rectangle-section">
                <Grid container my={2}>
                  <Grid item xs={12} md={10}>
                    <Grid container spacing={2}>
                      {book.map((item: any) => (
                        <Grid item md={2} key={item.id}>
                          <div className="rectangle-sec-border">
                            <Box
                              sx={{
                                position: 'relative',
                                objectFit: 'contain',
                                aspectRatio: 0.68,
                              }}
                            >
                              <Image src={item.img} fill alt="img-book" />
                            </Box>
                          </div>
                        </Grid>
                      ))}

                      <Grid
                        item
                        md={2}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}
                      >
                        <div className="search-circle1">
                          <img
                            src="/images/demo/static/rightArrow.png"
                            alt="search"
                          />
                        </div>
                        <h6 className="search-names">View All</h6>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <h5 className="border-title">services</h5>
              <div className="services-sectionss">
                <Grid container>
                  <Grid item xs={12} md={8} mb={1}>
                    <Grid container spacing={2}>
                      {musicImage.map((item: any) => (
                        <Grid item md={2} key={item.id}>
                          <Box
                            sx={{
                              position: 'relative',
                              aspectRatio: 1,
                              objectFit: 'contain',
                            }}
                          >
                            <Image src={item.image} fill alt={item.text} />
                          </Box>
                          <h6 className="service-text">{item.text}</h6>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          ) : loading == true ? (
            <li
              key={'search-loading'}
              className="list-group-item list-group-item-action"
            >
              Loading ...
            </li>
          ) : (
            items?.map((item: any) => {
              return (
                <div key={`search-${item.id}`} className="product-scroll">
                  {item?.product_name ? (
                    <div
                      onClick={() => {
                        window.location.href = `/product/${item.product_url}`;
                      }}
                      // href={`/product/${item.product_url}`}
                      className="w-100"
                    >
                      <div className="w-100 d-flex  text-wrap">
                        {type === 'responsive' ? (
                          <div className="w-80">
                            <label>{item.product_name}</label>
                            <p>
                              Home | {item.parent_category_name} |{' '}
                              {item.category_name} | {item.brand_name} |{' '}
                              {item.product_name}
                            </p>
                          </div>
                        ) : (
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
                                        alt="arrow"
                                      />
                                    </Grid>
                                    <Grid item md={11}>
                                      <h5 className="product-data-name">
                                        <Highlighter
                                          highlightClassName="highlighted"
                                          searchWords={[param]}
                                          autoEscape={true}
                                          textToHighlight={item.product_name}
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
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link href="/">
                      <Image
                        src={item.image}
                        width={100}
                        height={100}
                        alt={item.product_name}
                        className="w-20 bg-white text-center"
                      />
                      {item.product_name}
                      <span>
                        Home | {item.parent_category_name} |{' '}
                        {item.category_name} | {item.brand_name} |{' '}
                        {item.product_name}
                      </span>
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

const SearchBar = (props: { type: string | null; menus: any }) => {
  const router = useRouter();
  const { type }: any = props;
  const [selectedMenu] = useState<number>(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [slug] = useState<string | null>(null);
  const [param, setParam] = useState<string | null>(null);
  const inputRef = useRef<any>();
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const handleClose = () => {
    setIsBoxOpen(false);
  };
  // const handleOpenDrop = () => {
  //   setsearchDrop(true);
  // };
  const handleFormControlClick = () => {
    setIsBoxOpen(!isBoxOpen);
    setIsSectionVisible(true);
    // setsearchDrop(true);
  };
  const handleSearch = (event: any) => {
    event.preventDefault();
    setLoading(true);
    setParam(event.target.value);
    const query: string | null = event.target.value;
    if (query && query?.length > 3) {
      const data: any = {
        search_type: 'product',
        search_field: query,
        category_id: selectedMenu == 0 ? '' : selectedMenu,
      };
      api.productSearch(data).then((res: any) => {
        if (res?.status_code == 200) {
          setLoading(false);
          setData(res?.data?.products);
        } else {
          setLoading(false);
          setData([]);
        }
      });
    } else {
      setLoading(false);
      setData([]);
    }
  };

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

  // const productSearch = () => {
  //   const url = paramsToObject(param);
  //   if (typeof window != undefined) {
  //     window.location.href = `/category/search?${url}`;
  //   }
  // };

  const enterKeyPressed = (event: any) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      const url = paramsToObject();
      if (typeof window != undefined) {
        window.location.href = `/category/search?${url}`;
      }
    }
  };

  useEffect(() => {
    setData([]);
    inputRef.current.value = '';
  }, [router]);
  return (
    // <Backdrop
    //   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //   open={searchDrop}
    //   onClick={handleCloseDrop}
    // >
    <div className="search-bar search-bar-new">
      <Form>
        <InputGroup
          className={`border-2 d-flex ${
            type === 'responsive' ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <InputGroup.Text
            id="inputGroup-sizing-lg"
            className={
              type === 'responsive'
                ? 'home-search-2 bg-dark text-light d-flex justify-content-center w-100 '
                : ' text-light home-search new-class-search'
            }
          >
            {type === 'responsive' ? (
              <NavDropdown.Item
                as={Link}
                href={router.asPath}
                className="d-flex justify-content-center home-search-2 bg-transparent"
              >
                <i className="fas text-white font-light fa-search w-100 "></i>
              </NavDropdown.Item>
            ) : (
              <>
                <div
                  className="top-item-search text-center"
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
                  <div className="d-flex gap-2 justify-content-center align-items-center top-item1-div-search">
                    <img src="/icons/layer1.png" alt="user-icon" />
                    <span>Search</span>
                  </div>
                </div>
              </>
            )}
          </InputGroup.Text>
          <Form.Control
            id="basic-url"
            autoComplete="off"
            className="search-here"
            placeholder="Search for musical instruments, books, accessories"
            aria-describedby="inputGroup-sizing-sm"
            ref={inputRef}
            defaultValue={
              router.query.search_field != 'null'
                ? router.query.search_field
                : ''
            }
            onChange={() => {
              handleSearch(event);
              setLoading(true);
              setIsSectionVisible(false);
            }}
            onKeyUp={() => {
              setLoading(true);
              setIsSectionVisible(false);
            }}
            onKeyPress={() => {
              enterKeyPressed(event);
              setIsSectionVisible(false);
            }}
            onClick={handleFormControlClick}
          />
        </InputGroup>

        {isBoxOpen && (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isBoxOpen}
            onClick={handleClose}
          >
            <DataContainer
              datas={data}
              loading={loading}
              type={type}
              param={param}
              isSectionVisible={isSectionVisible}
            />
          </Backdrop>
        )}
      </Form>
    </div>
    // </Backdrop>
  );
};

export default SearchBar;
