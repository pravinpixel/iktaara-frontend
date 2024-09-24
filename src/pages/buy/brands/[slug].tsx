import { Container } from '@mui/material';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { axiosInstance } from 'src/lib/api/base';
import api from 'src/lib/api/home';
const ProductLayout = dynamic(() => import('@/theme/layouts/ProductLayout'));
const Banner = dynamic(() => import('@/components/brands/Banner'));
const BrandsSection = dynamic(
  () => import('@/components/brands/BrandsSection'),
);
const BannerSlides = dynamic(() => import('@/components/brands/BannerSlides'));
const TopSeller = dynamic(() => import('@/components/brands/TopSeller'));
const ProductListView = dynamic(
  () => import('@/components/brands/ProductListView'),
);
const BrandsFaqSection = dynamic(
  () => import('@/components/brands/faqSection'),
);
const MetaTags = dynamic(() => import('@/components/common/header/MetaTags'));

export default function Brands({ meta, brandData }: any) {
  const {
    brand_details,
    top_selling_products,
    // featured_products,
    // top_category_section,
  } = brandData;

  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };

  const [brands] = useState(brandData || []);
  const [banner] = useState<any>(brand_details || []);
  const [selling] = useState(top_selling_products || []);

  return (
    <ProductLayout>
      <MetaTags meta={metaTags} />
      <Banner data={banner} />
      <Container
        maxWidth={'lg'}
        sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
      >
        <BrandsSection data={brands} />
        <BannerSlides data={brands} />
      </Container>
      <TopSeller data={selling} />
      <Container
        maxWidth={'lg'}
        sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
      >
        <ProductListView data={brands} />
        <BrandsFaqSection data={brands} />
      </Container>
    </ProductLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const dataId = {
    brand_id: ctx?.query?.slug,
  };
  const [meta, brandData] = await Promise.all([
    await api.getMetaData({ page: 'brands-page' }).then((res: any) => {
      if (res?.error == 0 && res?.status_code == 200) {
        return {
          title: res?.data?.meta_title || 'Brands | Iktaraa',
          keywords: res?.data?.meta_keywords || '',
          description: res?.data?.meta_description || '',
          image:
            res?.data?.meta_image ||
            res?.data?.logo ||
            '/public/images/logo.svg',
        };
      }
      return [];
    }),
    await axiosInstance()
      .post('/api/dynamic-brand-data', dataId)
      .then((res) => res.data?.data)
      .catch(() => {
        return {
          data: {},
        };
      }),
  ]);

  return {
    props: {
      meta,
      brandData,
    },
  };
};
