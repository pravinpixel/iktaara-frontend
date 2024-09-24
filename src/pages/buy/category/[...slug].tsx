import api from '@/lib/api/product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Row } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useSelector } from 'react-redux';
import MetaTags from 'src/components/common/header/MetaTags';
import { RootState } from 'src/redux/store';
import Api from 'src/lib/api/home';

const ProductLayout = dynamic(() => import('@/theme/layouts/ProductLayout'));
const CategoryToolBar = dynamic(() => import('@/components/category/tool-bar'));
const SidebarFilter = dynamic(() => import('@/components/category/sidebar'));
const CategoryProductThumb = dynamic(
  () => import('@/components/category/product-thumbs'),
);
const LoaderMenu = dynamic(() => import('@/components/category/loader-menu'));
const CategoryFilterPopup = dynamic(
  () => import('@/components/common/popup/categoryFilterPopup'),
);

type CategoryProps = {
  pathname?: string[];
  category: {
    products: [];
    sub_categories: [];
    from: number | string;
    to: number | string;
    total_count: number;
    meta_data: any | null;
    faq: any | null;
    side_filter_data: any | null;
    name: string;
  };
  category_slug?: string;
  filters: [];
  refresh: boolean;
  meta: any;
};

type meta = {
  title: string;
  keywords: string | null;
  description: string | null;
  image: string | null;
  lastmodified: string | null;
};

const Category = (props: CategoryProps) => {
  const { meta } = props;
  const brandName = props?.category?.name;
  const temp = props?.category_slug;
  const productListRef = useRef<HTMLDivElement>(null);
  // const sub_categories = [
  //   {
  //     id: 21,
  //     name: 'Acoustic Guitar',
  //     slug: 'acoustic-guitars-guitars',
  //   },
  //   {
  //     id: 22,
  //     name: 'Classical Guitar',
  //     slug: 'classical-guitars-guitars',
  //   },
  //   {
  //     id: 25,
  //     name: 'Electric Guitar',
  //     slug: 'electric-guitars-guitars',
  //   },
  //   {
  //     id: 26,
  //     name: 'Bass Guitar',
  //     slug: 'bass-guitars-guitars',
  //   },
  //   {
  //     id: 55,
  //     name: 'Mandolin',
  //     slug: 'mandolins-guitars',
  //   },
  //   {
  //     id: 57,
  //     name: 'Ukulele',
  //     slug: 'ukuleles-guitars',
  //   },
  //   {
  //     id: 170,
  //     name: 'Processors & Pedals',
  //     slug: 'processors-pedals-guitars',
  //   },
  //   {
  //     id: 168,
  //     name: 'Guitar Amps',
  //     slug: 'guitar-amps-guitars',
  //   },
  //   {
  //     id: 169,
  //     name: 'Guitar Accessories',
  //     slug: 'guitar-accessories-guitars',
  //   },
  // ];
  // const updateData = [
  //   ...props.filters,
  //   { key: 'sub_category', values: sub_categories },
  // ];

  const router = useRouter();

  const barndlist = String(router.query?.brand || '')
    .split('_')
    ?.filter((s) => s);
  const [expanded, setExpanded] = useState(0);
  const [wordparams, setWordParams] = useState<string[]>([]);
  const [checkedBrand, setCheckedBrand] = useState<string[]>(barndlist);
  const [showAll, setShowAll] = useState(false);
  const handleAccordionChange =
    (panel: any) => (_event: any, isExpanded: any) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [filterPopUp, setFilterPopup] = useState(false);
  const { filters, pathname } = props;
  const { products, from, to, total_count, meta_data } = props.category;
  const brand: any = router.query?.brand ?? null;
  const [filter, setFilters] = useState<any>({
    product_availability: null,
    rating: null,
    booking: null,
    discount: null,
    sort: null,
    page: 0,
    brand: brand?.split('_')?.[0] ?? null,
    category: router.query.slug?.[0] ?? null,
    scategory: router.query.slug?.[1] ?? null,
    sscategory: router.query.slug?.[2] ?? null,
    minimum_price: null,
    maximum_price: null,
  });

  const metaTags = {
    title: meta?.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };

  // const metaTags: meta = {
  //   title: meta_data.meta_title || 'Category | Iktaraa',
  //   keywords: meta_data.meta_keywords || null,
  //   description: meta_data.meta_description || null,
  //   image: meta_data.image || '/public/images/logo.svg',
  //   lastmodified: meta_data.updated_at || null,
  // };
  const toggleShowAll = () => {
    setShowAll(!showAll);
    setExpanded(0);
  };

  const numberOfFAQsToShow = showAll ? props?.category?.faq?.length : 5;

  const newFiter = () => {
    // const path = new URL(process.env.NEXTAUTH_URL + router.asPath);
  };

  // const fieldChange: any = (event: any, type: string) => {
  //   if (type === 'price') {
  //     handleFilters('minimum_price', event.min);
  //     handleFilters('maximum_price', event.max);
  //   } else if (type === 'sort') {
  //     handleFilters('sort', event);
  //   } else if (type === 'rating') {
  //     handleFilters('rating', event);
  //   } else if (type === 'loadmore') {
  //     // handleFilters('to', filter.to + 12);
  //     const page: any = pageinationTo / 24;
  //     handleFilters('page', page);
  //   } else if (type === 'rating') {
  //     handleFilters('rating', event);
  //   } else {
  //     const { name, value, checked } = event.target;
  //     if (checked) {
  //       const array = filter[name]
  //         ? [...filter[name].split('_'), value]
  //         : [value];
  //       const duplicate = [...new Set(array)];
  //       handleFilters(name, duplicate.join('_'));
  //     } else {
  //       const array = filter[name].split('_');
  //       const filteredData = array.filter((item: any) => {
  //         return item !== value;
  //       });
  //       handleFilters(
  //         name,
  //         filteredData.join('_') !== '' ? filteredData.join('_') : null,
  //       );
  //     }
  //   }
  // };

  const handlePopUp = () => {
    setFilterPopup((state) => !state);
  };

  const resetFilters = () => {
    setFilters({
      product_availability: null,
      brand: brand,
      booking: null,
      discount: null,
      sort: null,
      rating: null,
      page: 0,
      from: null,
      to: null,
      category: router.query.slug?.[0] ?? null,
      scategory: router.query.slug?.[1] ?? null,
      sscategory: router.query.slug?.[2] ?? null,
      minimum_price: null,
      maximum_price: null,
    });
  };

  // const handleFilters = (name: string, values: any) => {
  //   if (name === 'scategory') {
  //     setFilters((state: any) => {
  //       return {
  //         ...state,
  //         ['category']: slug[0],
  //         [name]: values,
  //       };
  //     });
  //   } else {
  //     setFilters((state: any) => {
  //       return {
  //         ...state,
  //         ['category']: router.query.slug?.[0],
  //         ['scategory']: router.query.slug?.[1] ?? null,
  //         [name]: values,
  //       };
  //     });
  //   }
  // };

  const queryParams: any = router.query;

  // const dispatch: any = useDispatch();
  const { entities, currentPage } = useSelector((state: RootState) => {
    return state.category;
  });

  useEffect(() => {
    if (products && pathname && pathname.length >= 1) {
      const focusId: any = pathname.slice(-1)[0];
      const productToFoucs = document.getElementById(focusId);

      if (productToFoucs) {
        productToFoucs.scrollIntoView();
      }
    }
  }, [pathname, router, products]);

  useEffect(() => {
    const wordlist: any[] = [];
    let priceRange = '';

    Object.entries(router.query).forEach(([key, value]) => {
      if (
        key !== 'slug' &&
        key !== 'price_id' &&
        key !== 'page' &&
        key !== 'sort'
      ) {
        if (key === 'availability') {
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
      ...props.category.side_filter_data,
      ...(priceRange ? [{ key: 'price_range', value: `₹ ${priceRange}` }] : []),
    ];
    setWordParams(updateData);
  }, [router, props?.category?.side_filter_data]);

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

  //   const scrollToTop = () => {
  //   if (productListRef.current) {
  //     productListRef.current.scrollIntoView({ behavior: 'smooth' });
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // };

  // useEffect(() => {
  //   if (productListRef.current) {
  //     productListRef.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //       inline: 'nearest',
  //     });

  //   }
  // }, [products]);

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
                    <CategoryToolBar
                      fileders={filter}
                      filter={filter}
                      fieldChange={newFiter}
                      filters={filters}
                      from={from}
                      to={to}
                      count={total_count}
                      key="categroy-toolbar"
                      brandName={brandName}
                      temp={temp}
                    ></CategoryToolBar>
                  </div>
                </div>
              </Container>
              <div className="image-container-component">
                <Box className="my-profile-title product-detail-page-image">
                  <h5>{brandName}</h5>
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
                  <div className="col-12 col-md-4 text-center d-flex d-md-none showing-home ">
                    <Breadcrumb>
                      <Breadcrumb.Item
                        href="/buy"
                        className="new-breadcrumb-item"
                      >
                        <span className="new-breadcrum-home"> Home</span>
                      </Breadcrumb.Item>
                      {queryParams?.slug?.map(
                        (query: string, index: number) => {
                          const link: string =
                            index > 0
                              ? '/category/' + queryParams?.slug?.join('/')
                              : '/category/' + query;
                          let label = query?.replaceAll('-', ' ');
                          // Check if the slug contains "null" and use the discount value
                          if (query === 'null') {
                            label = queryParams.discount.replaceAll('-', ' ');
                          }

                          return (
                            <Breadcrumb.Item
                              key={index}
                              className="new-breadcrumb-item"
                              active
                            >
                              <Link href={link}>
                                {label?.[0].toUpperCase() +
                                  label.substring(1).toString()}
                              </Link>
                            </Breadcrumb.Item>
                          );
                        },
                      )}
                    </Breadcrumb>
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
                      temp={props?.category_slug?.length === 1 ? 'yes' : ''}
                    ></SidebarFilter>
                  </div>
                  <div className="col-md-9 col-lg-9 col-sm-12 content filter-right showing-home fiter-scroll-main">
                    <div className="product-list" ref={productListRef}>
                      <div className="discount-word-count">
                        <div className="word-search-format">
                          {wordparams.map(
                            (word: any, index: any) =>
                              word.value && (
                                <div key={index} className="discount-word">
                                  <span>
                                    {word.key === 'availability'
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
                              {/* <button onClick={scrollToTop}>Scroll to Top</button> */}
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

                        {props?.category?.faq?.length > 0 && (
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
                                    {props?.category?.faq?.length > 5 && (
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

// export const getServerSideProps = async (context: any) => {
//   const queryString: any = {
//     ...context.query,
//   };
//   if (context.query.slug.length === 1) {
//     queryString['category'] = context.query.slug[0];
//     queryString['page'] = queryString['page'] ? queryString['page'] : 0;
//   } else if (context.query.slug.length === 2) {
//     queryString['category'] = context.query.slug?.[0] ?? null;
//     queryString['page'] = queryString['page'] ? queryString['page'] : 0;
//     queryString['scategory'] = context.query.slug?.[1] ?? null;
//   } else if (context.query.slug.length === 3) {
//     queryString['category'] = context.query.slug?.[0] ?? null;
//     queryString['page'] = queryString['page'] ? queryString['page'] : 0;
//     queryString['scategory'] = context.query.slug?.[1] ?? null;
//     queryString['sscategory'] = context.query.slug?.[2] ?? null;
//   }
//   const { slug, price_id, ...q } = queryString;

//   const category: any = await api.getCategoryProduct(q);
//   const filters: any = [];
//   await api.getFilters().then((res: any) => {
//     Object?.entries(res).map(([key, values]) => {
//       filters.push({ key: key, values: values });
//     });
//   });
//   await api.getDynamicFilters(context.query.slug).then((res: any) => {
//     Object.entries(res).map(([key, values]) => {
//       filters.push({ key: key, values: values });
//     });
//   });
//   return {
//     props: {
//       category,
//       filters: filters,
//       refresh: true,
//       category_slug: context.query.slug,
//     },
//   };
// };

export const getServerSideProps = async (context: any) => {
  const queryString: any = {
    ...context.query,
  };

  const meta = await Api.getMetaData({ page: 'category' }).then((res: any) => {
    if (res?.error == 0 && res?.status_code == 200) {
      return {
        title: res?.data?.meta_title || ' Cartegory | Iktaraa',
        keywords: res?.data?.meta_keywords || '',
        description: res?.data?.meta_description || '',
        image:
          res?.data?.meta_image || res?.data?.logo || '/public/images/logo.svg',
      };
    }
    return [];
  });

  if (context.query.slug.length === 1) {
    queryString['category'] = context.query.slug[0];
    queryString['page'] = queryString['page'] ? queryString['page'] : 0;
  } else if (context.query.slug.length === 2) {
    queryString['category'] = context.query.slug?.[0] ?? null;
    queryString['page'] = queryString['page'] ? queryString['page'] : 0;
    queryString['scategory'] = context.query.slug?.[1] ?? null;
  } else if (context.query.slug.length === 3) {
    queryString['category'] = context.query.slug?.[0] ?? null;
    queryString['page'] = queryString['page'] ? queryString['page'] : 0;
    queryString['scategory'] = context.query.slug?.[1] ?? null;
    queryString['sscategory'] = context.query.slug?.[2] ?? null;
  }

  const { ...q } = queryString;

  const categoryPromise = api.getCategoryProduct(q);
  const filtersPromise = api.getFilters();
  const dynamicFiltersPromise = api.getDynamicFilters(context.query.slug);

  const [category, filtersResponse, dynamicFiltersResponse] = await Promise.all(
    [categoryPromise, filtersPromise, dynamicFiltersPromise],
  );

  const filters: any = [];
  Object.entries(filtersResponse).forEach(([key, values]) => {
    filters.push({ key: key, values: values });
  });
  Object.entries(dynamicFiltersResponse).forEach(([key, values]) => {
    filters.push({ key: key, values: values });
  });

  return {
    props: {
      category,
      filters: filters,
      refresh: true,
      category_slug: context.query.slug,
      meta: meta,
    },
  };
};

export default Category;
