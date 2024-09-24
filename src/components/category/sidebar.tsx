import PriceFilter from './filters/price_filter';
import ProductAvailability from './filters/product_availability';
import SortByFilter from './filters/sory_by';
// import VideoShopping from './filters/video_shopping';
import BrandsFilter from './filters/brands_filter';
// import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { Box, Rating } from '@mui/material';
import Image from 'next/image';
import BrandsCategoryFilter from './filters/brands_category';
// import RateFilter from './filters/rating_filter';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Nav, Navbar, Offcanvas } from 'react-bootstrap';
import SubCategoryFilters from './filters/subcategory_filter';

const SidebarFilter = ({
  fieldChange,
  filter,
  checkedBrand,
  setCheckedBrand,
  temp,
  ...props
}: any) => {
  // const router = useRouter();
  // const dispatch = useDispatch<AppDispatch>();
  // const queryParams: any = router.query;

  // const handleReset = () => {
  //   queryParams['brand'] != undefined ? delete queryParams['brand'] : '';
  //   queryParams['discounts'] != undefined
  //     ? delete queryParams['discounts']
  //     : '';
  //   queryParams['availability'] != undefined
  //     ? delete queryParams['availability']
  //     : '';
  //   queryParams['booking'] != undefined ? delete queryParams['booking'] : '';
  //   queryParams['sort'] != undefined ? delete queryParams['sort'] : '';
  //   queryParams['page'] != undefined ? delete queryParams['page'] : '';
  //   queryParams['scategory'] != undefined
  //     ? delete queryParams['scategory']
  //     : '';
  //   queryParams['minimum_price'] != undefined
  //     ? delete queryParams['minimum_price']
  //     : '';
  //   queryParams['maximum_price'] != undefined
  //     ? delete queryParams['maximum_price']
  //     : '';
  //   queryParams['category'] = router.query.slug;

  //   const checkedItems: any = Array.from(
  //     document.querySelectorAll('input[type=checkbox]'),
  //   );

  //   const radioItems: any = Array.from(
  //     document.querySelectorAll('input[type=radio]'),
  //   );
  //   checkedItems.map((item: any) => {
  //     item.checked = false;
  //   });
  //   radioItems.map((item: any) => {
  //     item.checked = false;
  //   });

  //   dispatch(fetchProduct(queryParams)).unwrap();
  // };

  const [show, setShow] = useState(true);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);

  // const handleShow = () => {
  //   setShow(!show);
  // };

  const [screenSize, getDimension] = useState<any>({
    dynamicWidth: typeof window !== 'undefined' && window.innerWidth,
    dynamicHeight: typeof window !== 'undefined' && window.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    if (screenSize.dynamicWidth <= 767) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [screenSize.dynamicWidth]);

  // const path =
  //   type === 'search' && !router.query.slug
  //     ? '/category/search'
  //     : router.asPath;
  return (
    <>
      <div className="sidebar">
        <Navbar expand="sm">
          <div className=" row align-items-center sidebar-content-image">
            <span className="col-6 text-start sidebar-title d-none d-md-flex">
              <Image
                src="/images/collections/static/filter.png"
                alt="filters"
                width="14"
                height="14"
                className="image-filter-portion"
              />
              FILTERS
            </span>
            <span
              className="col-6 text-start sidebar-title d-flex d-md-none "
              aria-hidden="true"
              // onClick={() => {
              //   handlePopUp();
              // }}
              aria-controls="navbarResponsive"
              onClick={handleOffcanvasToggle}
            >
              <Image
                src="/images/collections/static/filter.png"
                alt="filters"
                width="14"
                height="14"
                className="image-filter-portion"
              />
              FILTERS
            </span>
            {/* <div className="col-6 text-end d-flex align-items-center h-100  justify-content-end gap-4"> */}
            {/* <div
              className="clear-all"
              onClick={() => {
                router.replace(String(router.asPath).split('?')[0]);
              }}
            >
              Clear All
            </div> */}
            {/* <KeyboardArrowDownIcon
              className="d-block  d-md-none"
              aria-hidden="true"
              onClick={() => {
                // handleShow();
                handlePopUp();
              }}
            /> */}
            {/* </div> */}
          </div>
          {show && (
            <div className="row">
              {/* <RateFilter /> */}
              {Object.entries(props.dat).map((values) => {
                const filterMap: any = values[1];
                switch (filterMap?.key) {
                  case 'brands':
                    return (
                      <BrandsFilter
                        filterData={filter}
                        props={filterMap?.values}
                        key={filterMap?.key}
                        fieldChange={fieldChange}
                        checkedBrand={checkedBrand}
                        setCheckedBrand={setCheckedBrand}
                      />
                    );
                  case 'sub_categories':
                    return temp ? (
                      <SubCategoryFilters
                        filterData={filter}
                        props={filterMap?.values}
                        key={filterMap?.key}
                        fieldChange={fieldChange}
                        checkedBrand={checkedBrand}
                        setCheckedBrand={setCheckedBrand}
                      />
                    ) : null;

                  case 'category':
                    return (
                      <BrandsCategoryFilter
                        filterData={filter}
                        props={filterMap?.values}
                        key={filterMap?.key}
                        fieldChange={fieldChange}
                      />
                    );
                  case 'price-filter':
                    return <PriceFilter key={filterMap?.key} />;
                  // case 'product_availability':
                  //   return <RateFilter />;
                  // case 'discounts':
                  //   return (
                  //     <DiscountFilter
                  //       props={filterMap?.values}
                  //       key={filterMap?.key}
                  //       fieldChange={fieldChange}
                  //     />
                  //   );
                  case 'sory_by':
                    return <SortByFilter key={filterMap?.key} />;

                  case 'product_availability':
                    return (
                      <ProductAvailability
                        fieldChange={fieldChange}
                        filterData={filterMap?.values}
                        key={filterMap?.key}
                      />
                    );
                  default:
                    return <></>;
                }
              })}
              {/* <PriceFilter key={'price-filter'} /> */}
            </div>
          )}
          <Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="end"
            className="offcanvas-backgroundColor img-background d-md-none d-flex"
          >
            <Offcanvas.Header>
              <p className=" Category-title-Filter">Category Filter</p>
              <div onClick={() => setShowOffcanvas(false)}>
                <Image
                  src="/images/menu/close.png"
                  width={20}
                  height={20}
                  className="colse-icone"
                  alt="colse"
                />
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column menu-top">
                <div className="row">
                  {/* <PriceFilter key={'price-filter'} />
                  <RateFilter /> */}
                  {Object.entries(props.dat).map((values) => {
                    const filterMap: any = values[1];
                    switch (filterMap?.key) {
                      case 'brands':
                        return (
                          <BrandsFilter
                            filterData={filter}
                            props={filterMap?.values}
                            key={filterMap?.key}
                            fieldChange={fieldChange}
                            checkedBrand={checkedBrand}
                            setCheckedBrand={setCheckedBrand}
                          />
                        );
                      case 'sub_categories':
                        return temp ? (
                          <SubCategoryFilters
                            filterData={filter}
                            props={filterMap?.values}
                            key={filterMap?.key}
                            fieldChange={fieldChange}
                            checkedBrand={checkedBrand}
                            setCheckedBrand={setCheckedBrand}
                          />
                        ) : null;
                      case 'category':
                        return (
                          <BrandsCategoryFilter
                            filterData={filter}
                            props={filterMap?.values}
                            key={filterMap?.key}
                            fieldChange={fieldChange}
                          />
                        );
                      case 'price-filter':
                        return <PriceFilter key={filterMap?.key} />;
                      // case 'product_availability':
                      //   return <RateFilter />;
                      // case 'discounts':
                      //   return (
                      //     <DiscountFilter
                      //       props={filterMap?.values}
                      //       key={filterMap?.key}
                      //       fieldChange={fieldChange}
                      //     />
                      //   );
                      case 'sory_by':
                        return <SortByFilter key={filterMap?.key} />;

                      case 'product_availability':
                        return (
                          <ProductAvailability
                            fieldChange={fieldChange}
                            filterData={filterMap?.values}
                            key={filterMap?.key}
                          />
                        );
                      default:
                        return <></>;
                    }
                  })}
                </div>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar>
      </div>
    </>
  );
};

export default SidebarFilter;
