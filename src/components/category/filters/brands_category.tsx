import { makeQuery } from '@/lib/helper';
import { useRouter } from 'next/router';
import FilterInputes from './inputs/filter-inputs';

const BrandsCategoryFilter = (props: any) => {
  // const { fieldChange } = props;
  const brands = props.props || [];
  const router = useRouter();
  // const dispatch = useDispatch<AppDispatch>();
  // const queryParams: any = router.query;
  // const [brand, setBrand] = useState<string[]>([]);

  // const handleCheckBoxbrand = (e: any, slug: string) => {
  //   queryParams['category'] = router.query.slug;
  //   let selected: any = brand;
  //   if (e.target.checked == true) {
  //     selected.push(slug);
  //     setBrand(selected);
  //   } else {
  //     selected = brand.filter((item: any) => item != slug);
  //     setBrand(selected);
  //     if (selected.length == 0) {
  //       delete queryParams['brand'];
  //     }
  //   }
  //   queryParams['brand'] = brand.join('-');
  //   dispatch(fetchProduct(queryParams)).unwrap();
  // };

  return (
    <>
      {brands?.length >= 1 && (
        <div className="filter-box">
          <div className="title">Brand Category</div>
          <div className="filter-list">
            {brands.map((filter: any, index: any) => {
              return (
                <div
                  className="form-check py-2 form-brands-main"
                  key={index}
                  style={{ display: 'flex', gap: '10px', fontSize: '18px' }}
                >
                  <FilterInputes
                    filter={filter}
                    name="brand_category"
                    onCheckBoxChecked={(e: any, slug: any, name = '') => {
                      router.push(
                        {
                          query: makeQuery(
                            router?.query?.[name] ?? null,
                            e.target.checked,
                            slug,
                            { ...router.query },
                            name,
                          ),
                        },
                        undefined,
                        {
                          scroll: false,
                        },
                      );
                    }}
                    // onCheckBoxChecked={fieldChange}
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
          </div>
        </div>
      )}
    </>
  );
};
export default BrandsCategoryFilter;
