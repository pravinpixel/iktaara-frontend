import AllBrands from '@/components/shopByBrand/AllBrands';
import BrandList from '@/components/shopByBrand/BrandList';
import { getAllBrands } from '@/lib/api/brands';
import { getBrandsAlphabet } from '@/lib/api/brands';
import ProductLayout from '@/theme/layouts/ProductLayout';
import { GetServerSideProps } from 'next';
import React from 'react';

type BrandProps = {
  brands: any;
  brandsAlpha: any;
};

const ShopByBrand = ({ brands, brandsAlpha }: BrandProps) => {
  return (
    <div className="shop-brands-top">
      <ProductLayout>
        <div className="shop-brands text-center">
          <h2>Shop from the Top Brands</h2>
        </div>
        <BrandList brands={brands} />
        <AllBrands brandsAlpha={brandsAlpha} />
      </ProductLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const brands = await getAllBrands({ page: 'brands' }).then((res: any) => {
    return res;
  });
  const brandsAlpha = await getBrandsAlphabet({ page: 'alpha' }).then(
    (res: any) => {
      return res;
    },
  );

  return {
    props: {
      brands,
      brandsAlpha,
    },
  };
};

export default ShopByBrand;
