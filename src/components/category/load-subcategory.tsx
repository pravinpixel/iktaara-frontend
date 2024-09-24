// import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
// import { fetchProduct } from 'src/redux/category-slice';

const LoadSubCategory = ({ handleFilters, filter }: any) => {
  const { sub_categories }: any = useSelector(
    (state: RootState) => state.category,
  );

  const handleAddSubCategory = (scategory: any) => {
    handleFilters('scategory', scategory);
  };

  return (
    <>
      <div className="sub-categories">
        <ul>
          {sub_categories?.map((cat: any) => {
            return (
              <li
                key={`subcategory-${cat.slug}`}
                className={`sub-category ${
                  cat.slug === filter.scategory ? 'sub-category-active' : ''
                }`}
                onClick={() => {
                  handleAddSubCategory(cat.slug);
                }}
              >
                {cat.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default LoadSubCategory;
