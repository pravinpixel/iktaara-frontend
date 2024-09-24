import { useRouter } from 'next/router';

import { makeQuery } from '@/lib/helper';
import FilterInputes from './inputs/filter-inputs';

const ProductAvailability = (props: any) => {
  const { filterData } = props;

  const router = useRouter();
  // const dispatch = useDispatch<AppDispatch>();
  // const queryParams: any = router.query;
  // let value: any = [];
  // let params: any = [];
  // if (Object.hasOwn(router.query, 'product_availability')) {
  // let query: any = router.query.product_availability;
  // query = query.trim().split('-');
  // params = query.filter((e: any) => e != '');
  // }

  const availability = Object.entries(filterData).map(([key, value]) => {
    return {
      slug: key,
      name: value,
    };
  });

  // const [, setInStock] = useState<boolean>(
  //   params.includes('in_stock') ? true : false,
  // );
  // const [, setCommingSoon] = useState<boolean>(
  //   params.includes('coming_soon') ? true : false,
  // );

  // const ProductAvailablity = [
  //   { brand_name: 'In stock', slug: 'in-stock' },
  //   { brand_name: 'Up coming', slug: 'coming-soon' },
  // ];

  // const handleUpdateRouter = (e: any, type: string) => {
  //   queryParams['category'] = router.query.slug;
  //   if (e.target.checked == true) {
  //     type == 'in-stock' ? setInStock(true) : setCommingSoon(true);
  //     if (!params.includes(type)) {
  //       if (params > 0) {
  //         value.push(type);
  //       } else {
  //         value.push(...params, type);
  //       }
  //     } else {
  //       value = params;
  //     }
  //     queryParams['product_availability'] = value.join('-');
  //   } else {
  //     delete queryParams['product_availability'];
  //     setInStock(false);
  //     setCommingSoon(false);
  //     value = params.filter((e: any) => {
  //       return e != type;
  //     });
  //   }
  //   dispatch(setFilterQuery({ availability: value }));
  //   dispatch(fetchProduct(queryParams)).unwrap();
  // };

  // const ProductAvailability = [
  //   {
  //     name: 'In Stock',
  //     slug: 'in_stock',
  //   },
  //   {
  //     name: 'Up Coming',
  //     slug: 'coming_soon',
  //   },
  // ];
  return (
    <div className="filter-box">
      <div className="title">Product Availability</div>
      <div className="filter-list">
        {availability?.map((filter: any, index: any) => {
          return (
            <div
              className="form-check pt-2 form-brands-main"
              key={index}
              style={{ display: 'flex', gap: '10px', fontSize: '18px' }}
            >
              <FilterInputes
                filter={filter}
                name="availability"
                className="discount-border"
                split="-"
                onCheckBoxChecked={(e: any, slug: any, name = '') => {
                  router.push(
                    {
                      query: makeQuery(
                        router?.query?.[name] ?? null,
                        e.target.checked,
                        slug,
                        { ...router.query, page: 1 },
                        name,
                        '-',
                      ),
                    },
                    undefined,
                    {
                      scroll: false,
                    },
                  );
                }}
              />
              <label
                className="form-check-label-checkbox"
                htmlFor="flexCheckDefault"
              >
                {filter.name}
              </label>
            </div>
          );
        })}
        {/* <div className="form-check py-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="product_availability"
              value={'in_stock'}
              defaultChecked={inStock}
              onChange={(event) => {
                setInStock((prevCheck) => !prevCheck);
                // handleUpdateRouter(event, 'in_stock');
                fieldChange(event);
              }}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              In Stock
            </label>
          </div>
          <div className="form-check py-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="product_availability"
              value={'coming_soon'}
              defaultChecked={commingSoon}
              onChange={(event) => {
                setCommingSoon((prevCheck) => !prevCheck);
                // handleUpdateRouter(event, 'coming_soon');
                fieldChange(event);
              }}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Up Coming
            </label>
          </div> */}
      </div>
    </div>
  );
};

export default ProductAvailability;
