import { useRouter } from 'next/router';

// import { useDispatch } from 'react-redux';
// import { AppDispatch } from 'src/redux/store';
import { makeQuery } from '@/lib/helper';
import FilterInputes from './inputs/filter-inputs';

interface Brand {
  name: string;
  slug: string;
}

const SubCategoryFilters = (props: any) => {
  console.log(props);

  const { setCheckedBrand, checkedBrand } = props;
  const sub_category = props.props || [];
  const router = useRouter();
  // const queryParams: any = router.query;

  const handleCheckboxClick = (slug: string) => {
    console.log(slug);

    if (!checkedBrand.includes(slug)) {
      setCheckedBrand([...checkedBrand, slug]);
    } else {
      setCheckedBrand(checkedBrand.filter((item: any) => item !== slug));
    }
  };

  return (
    <>
      <div className="filter-box">
        <div className="title">Sub Categories</div>
        <div className="filter-list">
          {sub_category.map((filter: Brand, index: number) => {
            return (
              <div
                className="form-check pt-2 form-brands-main"
                key={index}
                style={{ display: 'flex', gap: '10px', fontSize: '18px' }}
              >
                <FilterInputes
                  key={index}
                  filter={filter}
                  name="filter_category_slug"
                  className="discount-border"
                  id={`filter_category_slug-${filter.slug}`}
                  checked={checkedBrand?.includes(filter.slug)}
                  onCheckBoxChecked={(e: any, slug: any, name = '') => {
                    handleCheckboxClick(slug);
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
                        scroll: true,
                      },
                    );
                  }}
                />
                <label
                  className="form-check-label-checkbox"
                  htmlFor={`brand-${filter.slug}`}
                >
                  {filter.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SubCategoryFilters;
