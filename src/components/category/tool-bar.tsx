import * as _ from 'lodash';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CategoryToolBar = ({
  filters,
  from,
  to,
  count,
  brandName,
  temp,
}: any) => {
  const router = useRouter();
  const queryParams: any = router.query;

  let sortBy: any;
  _.filter(filters, (fil: any) => {
    if (fil.key == 'sory_by') {
      sortBy = fil.values;
    }
  });

  // const handleFilterClicked = (item: any) => {
  //   queryParams['category'] = router.query.slug;
  //   queryParams['sort'] = item.slug;
  // };
  const slug = queryParams?.slug[0];
  // const slug1 = queryParams?.slug[1];

  let formattedSlug = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char: any) => char.toUpperCase());
  if (slug === 'null') {
    formattedSlug = queryParams.discount
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char: string) => char.toUpperCase());
  }
  const selectedSort = sortBy?.find(
    (item: any) => item.slug === queryParams.sort,
  );
  console.log(formattedSlug);

  return (
    <>
      <div className="toolbar toolbar-text-item  text-light new-tool">
        <div className="row  align-items-center">
          <div className="col-12 col-sm-6 col-md-4 showing-home">
            <p className="text-start text-display-font">
              Showing {from}-{to} of {count || 0} Results
            </p>
          </div>

          <div className="col-12 col-md-4 text-center new-breadcrumb d-none d-md-flex">
            <Breadcrumb>
              <Breadcrumb.Item href="/buy" className="new-breadcrumb-item">
                <span className="new-breadcrum-home">Home</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={`/buy/category/${temp[0]}`}
                className="new-breadcrumb-item"
              >
                <span className="new-breadcrum-home">{formattedSlug}</span>
              </Breadcrumb.Item>
              {temp[1] && (
                <Breadcrumb.Item
                  className="new-breadcrumb-item"
                  href={`/buy/category/${temp[0]}/${temp[1]}`}
                >
                  <span className="new-breadcrum-home">{brandName}</span>
                </Breadcrumb.Item>
              )}
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
                {selectedSort ? selectedSort.name : 'Default Sorting'}
                <KeyboardArrowDownIcon className="KeyboardArrowDownIcon" />
              </div>

              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuReference"
              >
                {sortBy &&
                  sortBy.map((element: any, i: number) => {
                    return (
                      <li key={i}>
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
        </div>
      </div>
    </>
  );
};

export default CategoryToolBar;
