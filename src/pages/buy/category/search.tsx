/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import api from '@/lib/api/product';
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchProduct } from 'src/redux/category-slice';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { getBrandCategory } from '@/lib/api/brands';
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Box,
} from '@mui/material';

import dynamic from 'next/dynamic';
const SidebarFilter = dynamic(() => import('src/components/category/sidebar'));
const ProductLayout = dynamic(() => import('src/theme/layouts/ProductLayout'));
const CategoryToolBarSearch = dynamic(
  () => import('@/components/category/filters/CategoryToolBarSearch'),
);
const CategoryProductThumb = dynamic(
  () => import('src/components/category/product-thumbs'),
);
const CategoryFilterPopup = dynamic(
  () => import('@/components/common/popup/categoryFilterPopup'),
);
const MetaTags = dynamic(() => import('src/components/common/header/MetaTags'));
const LoaderMenu = dynamic(() => import('src/components/category/loader-menu'));

type meta = {
  title: string;
  keywords: string | null;
  description: string | null;
  image: string | null;
  lastmodified: string | null;
};

type PropsState = {
  datas: any;
  filters: any;
  pathname?: string[];
  category?: {
    faq: any[];
    // side_filter_data:any[];
    name: string;
  };
};

const ProductSearch = (props: PropsState) => {
  const [expanded, setExpanded] = useState(0);
  const router = useRouter();
  const barndlist = String(router?.query?.brand || '')
    .split('_')
    ?.filter((s) => s);
  const brandName = router.query.search_field;

  const handleAccordionChange =
    (panel: any) => (_event: any, isExpanded: any) => {
      setExpanded(isExpanded ? panel : false);
    };
  const slug: any = router.query.slugs || null;
  const query: any = router.query?.search_field || null;
  const { filters, pathname } = props;
  const { products, from, to, total_count, meta_data } = props.datas;
  const [filterPopUp, setFilterPopup] = useState(false);
  const [wordparams, setWordParams] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [checkedBrand, setCheckedBrand] = useState<string[]>(barndlist);
  const [filter, setFilters] = useState<any>({
    availability: null,
    sub_categories: null,
    booking: null,
    discount: null,
    brand_category: null,
    sort: null,
    rating: null,
    page: 0,
    brand: router.query.brand || null,
    // to: 24,
    // from: 1,
    category: slug,
    scategory: null,
    minimum_price: null,
    maximum_price: null,
    search_field: query,
  });

  const metaTags: meta = {
    title: meta_data?.meta_title || 'Product Search',
    keywords: meta_data?.meta_keywords || null,
    description: meta_data?.meta_description || null,
    image: meta_data?.image || null,
    lastmodified: meta_data?.updated_at || null,
  };

  const handlePopUp = () => {
    setFilterPopup((state) => !state);
  };
  // const queryParams: any = router.query;
  const dispatch: any = useDispatch();
  const {
    entities,
    currentPage,
    // to: pageinationTo,
  } = useSelector((state: any) => state.category);

  // const handleFilters = (name: string, values: any) => {
  //   setFilters((state: any) => {
  //     return {
  //       ...state,
  //       ['category']: router.query.slugs,
  //       ['scategory']: null,
  //       [name]: values,
  //       search_field: query,
  //     };
  //   });
  // };

  // const fieldChange: any = (event: any, type: string) => {
  //   if (type === 'price') {
  //     handleFilters('minimum_price', event.min);
  //     handleFilters('maximum_price', event.max);
  //   } else if (type === 'sort') {
  //     handleFilters('sort', event);
  //   } else if (type === 'loadmore') {
  //     // handleFilters('to', filter.to + 24);
  //     // handleFilters('page', filter.page + 1);
  //     const page: any = pageinationTo / 24;
  //     handleFilters('page', page);
  //     // handleFilters('to', filter.to + 24);
  //   } else if (type === 'rating') {
  //     handleFilters('rating', event);
  //   } else {
  //     const { name, value, checked } = event.target;
  //     if (checked) {
  //       if (name === 'availability') {
  //         const array = filter['availability']
  //           ? [...filter['availability'].split('-'), value]
  //           : [value];
  //         const duplicate = [...new Set(array)];
  //         handleFilters('availability', duplicate.join('-'));
  //       } else {
  //         const array = filter[name]
  //           ? [...filter[name].split('_'), value]
  //           : [value];
  //         const duplicate = [...new Set(array)];
  //         handleFilters(name, duplicate.join('_'));
  //       }
  //     } else {
  //       if (name === 'availability') {
  //         const array = [...filter[name]?.split('-')];
  //         const filteredData = array.filter((item: any) => {
  //           return item !== value;
  //         });
  //         handleFilters(
  //           name,
  //           filteredData.join('-') !== '' ? filteredData.join('-') : null,
  //         );
  //       } else {
  //         const array = [...filter[name]?.split('_')];
  //         const filteredData = array.filter((item: any) => {
  //           return item !== value;
  //         });
  //         handleFilters(
  //           name,
  //           filteredData.join('_') !== '' ? filteredData.join('_') : null,
  //         );
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    const wordlist: any[] = [];
    let priceRange = '';

    Object.entries(router.query).forEach(([key, value]) => {
      if (
        key !== 'slug' &&
        key !== 'price_id' &&
        key !== 'page' &&
        key !== 'availability' &&
        key !== 'category_id'
      ) {
        if (key === 'sub_categories') {
          const label = String(value).split('-');
          label.forEach((word) => {
            wordlist.push({ key, value: word });
          });
        } else if (key === 'minimum_price') {
          priceRange = `${value}`;
        } else if (key === 'maximum_price') {
          priceRange += ` - ${value}`;
        } else {
          const label = String(value).split('_');
          label.forEach((word) => {
            wordlist.push({ key, value: word });
          });
        }
      }
    });

    if (priceRange) {
      wordlist.push({ key: 'price_range', value: `₹ ${priceRange}` });
    }

    const updateData = [
      ...props?.datas?.side_filter_data,
      ...(priceRange ? [{ key: 'price_range', value: `₹ ${priceRange}` }] : []),
    ];
    setWordParams(updateData);
  }, [router, props?.datas?.side_filter_data]);

  function handleCancelIconClick(key: string, value: string, slug: string) {
    const keyInclude = ['availability'];

    const split = keyInclude.includes(key) ? '-' : '_';

    const updatedQuery: { [key: string]: string | string[] | undefined } = {
      ...router.query,
    };

    const query: any = updatedQuery?.[key] || '';
    const arr = query?.split(split);
    const slugValue = arr.includes(slug);
    if (key === 'price_range') {
      delete updatedQuery['minimum_price'];
      delete updatedQuery['maximum_price'];
      delete updatedQuery['price_id'];
    } else if (slugValue) {
      const result = arr.filter((val: any) => {
        return val !== slug;
      });
      updatedQuery[key] = result.join(split);
    }

    if (!updatedQuery[key]) {
      delete updatedQuery[key];
    }

    router.push(
      {
        query: updatedQuery,
      },
      undefined,
      {
        scroll: false,
      },
    );
    setCheckedBrand((prevCheckedBrand) =>
      prevCheckedBrand.filter((brand) => brand !== value),
    );
    // };
  }

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setExpanded(0);
  };

  const numberOfFAQsToShow = showAll ? props?.category?.faq?.length : 5;

  const resetFilters = () => {
    setFilters({
      availability: null,
      sub_categories: null,
      booking: null,
      discount: null,
      sort: null,
      page: 0,
      rating: null,
      brand: router?.query?.brand || null,
      brand_category: null,
      // from: 1,
      // to: 24,
      category: slug,
      scategory: null,
      minimum_price: null,
      maximum_price: null,
      search_field: query,
    });
  };
  const newFiter = () => {
    // const path = new URL(process.env.NEXTAUTH_URL + router.asPath);
  };

  useEffect(() => {
    if (filter) {
      dispatch(fetchProduct(filter)).unwrap();
    }
  }, [filter]);

  useEffect(() => {
    if (products && pathname && pathname.length >= 1) {
      const productToFoucs = document.getElementById(pathname.slice(-2)[1]);
      if (productToFoucs) {
        productToFoucs.scrollIntoView();
      }
    }
  }, [pathname, router, products]);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    products && (
      <>
        <MetaTags meta={metaTags} />
        <ProductLayout>
          <div className="sticky-toolbar">
            <section className="breadcrumbs" id="breadcrumbs">
              <Container
                maxWidth={'lg'}
                sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
              >
                <div className="container-fluid">
                  <div>
                    <CategoryToolBarSearch
                      fileders={filter}
                      filter={filter}
                      fieldChange={newFiter}
                      filters={filters}
                      from={from}
                      to={to}
                      count={total_count}
                      key="categroy-toolbar"
                    ></CategoryToolBarSearch>
                  </div>
                </div>
              </Container>
              <div className="image-container-component">
                <Box className="my-profile-title product-detail-page-image breadrumbs-brandname">
                  <h5>{brandName ? brandName : 'All Products'}</h5>
                </Box>
              </div>
            </section>
          </div>
          <section id="category-list">
            <Container
              maxWidth={'lg'}
              sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
            >
              <div className="container-fluid my-2">
                <div className="row">
                  <div className="col-12 col-md-4 text-center d-flex d-md-none showing-home">
                    {/* breadcrumb */}
                  </div>
                  <div className="col-md-3 col-lg-3 col-sm-12 filter-left showing-home sticky-filter">
                    <SidebarFilter
                      handlePopUp={handlePopUp}
                      key={'category-filter'}
                      dat={props.filters}
                      filter={filter}
                      resetFilters={resetFilters}
                      fieldChange={newFiter}
                      checkedBrand={checkedBrand}
                      setCheckedBrand={setCheckedBrand}
                    ></SidebarFilter>
                  </div>
                  <div className="col-md-9 col-lg-9 col-sm-12 content filter-right showing-home">
                    <div className="product-list">
                      <div className="discount-word-count">
                        <div className="word-search-format">
                          {wordparams.map(
                            (word: any, index: any) =>
                              word.value && (
                                <div key={index} className="discount-word">
                                  <span>
                                    {word.key === 'sub_categories'
                                      ? word.value.replace(/_/g, ' ')
                                      : word.key === 'discount'
                                      ? word.value.replace(/-/g, ' ')
                                      : word.value}
                                  </span>
                                  <span
                                    className="cancel-icon"
                                    onClick={() =>
                                      handleCancelIconClick(
                                        word.key,
                                        word.value,
                                        word.slug,
                                      )
                                    }
                                  >
                                    &#x2715;
                                  </span>
                                </div>
                              ),
                          )}

                          <div
                            className="clear-all"
                            onClick={() => {
                              router.replace(
                                String(router.asPath).split('?')[0],
                              );
                              setWordParams([]);
                              setCheckedBrand([]);
                            }}
                          >
                            Clear All
                          </div>
                        </div>
                      </div>
                      <div className="product-grid">
                        <Row className="pt-4 new-respo">
                          {products?.length >= 1 ? (
                            <>
                              {products?.map((product: any) => {
                                return (
                                  <CategoryProductThumb
                                    length={entities?.length}
                                    product={product}
                                    key={`product-${product.id}`}
                                  />
                                );
                              })}
                              <LoaderMenu
                                page={currentPage}
                                fieldChange={newFiter}
                                from={from}
                                to={to}
                                total_count={total_count}
                              />
                            </>
                          ) : (
                            <section className="d-flex align-items-center justify-content-center h-100 text-center">
                              <span className="no-products-found">
                                No Products Found
                              </span>{' '}
                              &nbsp;
                            </section>
                          )}

                          {filterPopUp && (
                            <CategoryFilterPopup
                              filterData={filter}
                              filter={filter}
                              filters={filters}
                              show={filterPopUp}
                              handlePopUp={handlePopUp}
                              fieldChange={newFiter}
                            />
                          )}
                        </Row>

                        {props?.datas?.faq?.length > 0 && (
                          <section>
                            <Container
                              maxWidth={'lg'}
                              sx={{
                                maxWidth: { xl: '81% !important', lg: '81%' },
                              }}
                              className="showing-home"
                            >
                              <Grid
                                container
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                my={{ md: 3, xs: 0 }}
                                mt={{ xs: 1, md: 0 }}
                              >
                                <Grid item xs={12} mb={3}>
                                  <p className="brands-faq-title">
                                    Frequently Asked Questions
                                  </p>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  md={12}
                                  className="catogory-accordin"
                                >
                                  {props?.category?.faq
                                    ?.slice(0, numberOfFAQsToShow)
                                    .map((item: any, index: any) => (
                                      <Accordion
                                        sx={{ mb: { md: 2, xs: 1 } }}
                                        expanded={expanded === index}
                                        onChange={handleAccordionChange(index)}
                                        key={item.id}
                                        className={
                                          expanded === index
                                            ? 'selected-accordion'
                                            : 'unselected-accordion'
                                        }
                                      >
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1-content"
                                          id="panel1-header"
                                          className="accordions-selected"
                                        >
                                          <p className="brands-faq-head">
                                            {item.question}
                                          </p>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <p className="brands-faq-head-sub">
                                            {item.answer}
                                          </p>
                                        </AccordionDetails>
                                      </Accordion>
                                    ))}
                                  <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    {props?.datas?.faq?.length > 5 && (
                                      <button
                                        className="show-all-toggle-button"
                                        onClick={toggleShowAll}
                                      >
                                        {showAll ? 'View Less' : 'Load More'}
                                      </button>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Container>
                          </section>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </ProductLayout>
      </>
    )
  );
};

export const getServerSideProps = async (context: any) => {
  const queryString: any = context.query;

  const data: any = {
    ...queryString,
    search_type: 'product',
    search_field: queryString.search_field,
    category_id: queryString.category_id == 0 ? '' : queryString.category_id,
    slug: queryString?.slugs || null,
    brand: queryString?.brand || null,
    page: queryString?.page || 0,

    // to: 24,
    // from: 1,
  };

  const datas = await api.getCategoryProduct(data).then((res: any) => {
    return res;
  });

  const filters: any = [];
  await api.getFilters().then((res: any) => {
    Object?.entries(res).map(([key, values]) => {
      filters.push({ key: key, values: values });
    });
  });
  if (context.query.brand) {
    const bran = String(context.query.brand).split('_')[0];
    await getBrandCategory(bran)
      .then((res) => {
        filters.push({ key: 'category', values: res?.category });
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  }

  await api.getDynamicFilters('').then((res: any) => {
    Object.entries(res).map(([key, values]) => {
      filters.push({ key: key, values: values });
    });
  });
  return {
    props: {
      datas,
      filters: filters,
    },
  };
};

export default ProductSearch;
