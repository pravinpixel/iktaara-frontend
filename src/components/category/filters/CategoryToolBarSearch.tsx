import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as _ from 'lodash';
import { useRouter } from 'next/router';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// interface SortOption {
//   name: string;
//   slug: string;
// }

// interface Props {
//   sortBy: SortOption[];
// }

const CategoryToolBarSearch = ({ filters, from, to, count }: any) => {
  const router = useRouter();
  // const queryParams: any = router.query;
  const brandName = router.query.search_field;

  let sortBy: any;
  _.filter(filters, (fil: any) => {
    if (fil.key == 'sory_by') {
      sortBy = fil.values;
    }
  });

  // const handleFilterClicked = (item: any) => {
  //   queryParams['category'] = router.query.slug;
  //   queryParams['sort'] = item.slug;
  //   // dispatch(fetchProduct(queryParams)).unwrap();
  // };

  // const currentSort = router.query.sort || ''; // Get the current sort value from the query params

  // const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   const selectedSort = event.target.value as string;
  //   router.push({
  //     query: {
  //       ...router.query,
  //       sort: selectedSort,
  //     },
  //   });
  // };
  return (
    <>
      <div className="toolbar toolbar-text-item  text-light">
        <div className="row  align-items-center">
          <div className="col-12 col-sm-6 col-md-4 showing-home">
            <p className="text-start text-display-font">
              Showing {from}-{to} of {count || 0} Results
            </p>
          </div>

          <div className="col-12 col-md-4 text-center new-breadcrumb d-none d-md-flex">
            <Breadcrumb>
              <Breadcrumb.Item href="/" className="new-breadcrumb-item">
                <span className="new-breadcrum-home"> Home</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href="/buy/category/search"
                className="new-breadcrumb-item"
              >
                Search
              </Breadcrumb.Item>
              {/* <Breadcrumb.Item as="div" className="new-breadcrumb-item">
                    <span
                      role="button"
                      onClick={(e) => {
                        e.preventDefault();
                        resetFilters();
                        router.push('/category/search');
                      }}
                    >
                      Search
                    </span>
                  </Breadcrumb.Item> */}

              <Breadcrumb.Item
                className="new-breadcrumb-item breadrumbs-brandname"
                active
              >
                {brandName}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="col-12 col-sm-6 col-md-4 text-sm-end new-sort-new showing-home">
            <div className="btn-group filter-btns align-items-center">
              <div
                id="dropdownMenuReference"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-reference="parent"
                className="  filterDropdow default-sorting-text"
              >
                Default Sorting{' '}
                <KeyboardArrowDownIcon className="KeyboardArrowDownIcon" />
              </div>

              <ul
                className="dropdown-menu "
                aria-labelledby="dropdownMenuReference"
              >
                {sortBy &&
                  sortBy.map((element: any, i: number) => {
                    return (
                      <li key={i} className="new-dropdown">
                        <div
                          className="dropdown-item"
                          onClick={() => {
                            router.push({
                              query: {
                                ...router.query,
                                sort: element.slug,
                              },
                            });
                          }}
                        >
                          {' '}
                          {element.name}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          {/* <div className="col-12 col-sm-6 col-md-4 text-sm-end new-sort-new showing-home">
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="sort-select-label">Default Sorting</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={currentSort}
                onChange={() => handleSortChange}
                IconComponent={KeyboardArrowDownIcon}
                label="Default Sorting"
              >
                {sortBy &&
                  sortBy.map((element: SortOption, i: number) => (
                    <MenuItem key={i} value={element.slug}>
                      {element.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CategoryToolBarSearch;
