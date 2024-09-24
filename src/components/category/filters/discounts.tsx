import { useRouter } from 'next/router';
import FilterInputes from './inputs/filter-inputs';
// import { fetchProduct } from 'src/redux/category-slice';
import { makeQuery } from '@/lib/helper';

const DiscountFilter = (props: any) => {
  // const { fieldChange } = props;
  const discounds = props.props || [];
  const router = useRouter();
  // const dispatch = useDispatch<AppDispatch>();
  // const queryParams: any = router.query;
  // const [discount, setDiscount] = useState<string[]>([]);

  // const handleCheckBoxchecked = (e: any, slug: string) => {
  //   queryParams['category'] = router.query.slug;
  //   let selected: any = discount;
  //   if (e.target.checked == true) {
  //     selected.push(slug);
  //     setDiscount(selected);
  //   } else {
  //     selected = discount.filter((item: any) => item != slug);
  //     setDiscount(selected);
  //     if (selected.length == 0) {
  //       delete queryParams['discounts'];
  //     }
  //   }
  //   queryParams['discounts'] = discount.join('-');
  //   dispatch(fetchProduct(queryParams)).unwrap();
  // };

  return (
    <>
      <div className="filter-box">
        <div className="title">Discounts</div>
        <div className="filter-list">
          {discounds.map((filter: any, index: any) => {
            return (
              <div
                className="form-check pt-2 form-brands-main"
                key={index}
                style={{ display: 'flex', gap: '10px', fontSize: '18px' }}
              >
                <FilterInputes
                  filter={filter}
                  name="discount"
                  className="discount-border"
                  onCheckBoxChecked={(e: any, slug: any, name = '') => {
                    router.push(
                      {
                        query: makeQuery(
                          router?.query?.[name] ?? null,
                          e.target.checked,
                          slug,
                          { ...router.query, page: 1 },
                          name,
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
                  {filter.collection_name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DiscountFilter;
