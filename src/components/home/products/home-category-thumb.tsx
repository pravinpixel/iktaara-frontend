/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import ProductThumbType from 'src/types/product-thumb';

type CategoryThumbProps = { product: ProductThumbType; css: string };

const HomeCategoryThumb: FC<CategoryThumbProps> = () => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-xs-12 text-center">
        <div className="product-thumb  pb-3">
          <div className="product-image">
            <img
              src="https://placehold.co/200x200"
              className="img-thumbnail"
              alt="thumbnail"
            />
          </div>
          <div className="mt-2 title">
            <p>Product Name</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCategoryThumb;
