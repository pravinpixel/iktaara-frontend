import BrandsCategoryFilter from '@/components/category/filters/brands_category';
import BrandsFilter from '@/components/category/filters/brands_filter';
import DiscountFilter from '@/components/category/filters/discounts';
import PriceFilter from '@/components/category/filters/price_filter';
import ProductAvailability from '@/components/category/filters/product_availability';
// import RateFilter from '@/components/category/filters/rating_filter';
import React from 'react';
import { Button, Modal, Row } from 'react-bootstrap';

function CategoryFilterPopup({
  handlePopUp,
  show,
  fieldChange,
  filter,
  filters,
}: // datas,
// filterData,
{
  show: boolean;
  handlePopUp: () => void;
  datas?: any;
  fieldChange: any;
  filterData?: any;
  filter: any;
  filters: any;
}) {
  // const { filters } = useSelector((state: RootState) => state.category);
  return (
    <Modal show={show} centered onHide={handlePopUp}>
      <Modal.Header closeButton>
        <Modal.Title>Category Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body className="new-modal-body">
        <Row>
          <PriceFilter key={'price-filter'} />
          {/* <RateFilter filter={filterData} fieldChange={fieldChange} /> */}
          {Object.entries(filters).map((values) => {
            const filterMap: any = values[1];
            switch (filterMap?.key) {
              case 'brands':
                return (
                  <BrandsFilter
                    filterData={filter}
                    props={filterMap?.values}
                    key={filterMap?.key}
                    fieldChange={fieldChange}
                  />
                );
              case 'category':
                return (
                  <BrandsCategoryFilter
                    filterData={filter}
                    props={filterMap?.values}
                    key={filterMap?.key}
                    fieldChange={fieldChange}
                  />
                );
              case 'discounts':
                return (
                  <DiscountFilter
                    props={filterMap?.values}
                    key={filterMap?.key}
                    fieldChange={fieldChange}
                  />
                );
              // case 'sory_by':
              //   return (
              //     <SortByFilter
              //       props={filterMap?.values}
              //       key={filterMap?.key}
              //       fieldChange={fieldChange}
              //     />
              //   );
              // case 'video_shopping':
              //   return (
              //     <VideoShopping
              //       key={filterMap?.key}
              //       fieldChange={fieldChange}
              //     />
              //   );
              case 'product_availability':
                return (
                  <ProductAvailability
                    // filterData={filter}
                    fieldChange={fieldChange}
                    filterData={filterMap?.values}
                    key={filterMap?.key}
                  />
                );
              default:
                return <></>;
            }
          })}
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          className="btn btn-dark px-4 mx-5"
          onClick={() => handlePopUp()}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryFilterPopup;
