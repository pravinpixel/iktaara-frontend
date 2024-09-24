/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import api from '@/lib/api/product';
import ProductLayout from '@/theme/layouts/ProductLayout';
import MetaTags from 'src/components/common/header/MetaTags';
import ProductImageGallery from 'src/components/product-detail/product-image-gallery';
import ProductIntro from 'src/components/product-detail/product-intro';
import ProductDetailTab from 'src/components/product-detail/product-detail-tabs';
import { Container } from '@mui/material';
import TopSeller from '@/components/brands/TopSeller';
import ProductFrequently from '@/components/product-detail/product-frequently';
import { useSession } from 'next-auth/react';
import { axiosInstance } from '@/lib/api/base';
import { useSiteInfo } from '@/context/SiteInfoContext';
import Image from 'next/image';

type Props = {
  product: any;
};
interface User {
  user_id: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
const ProductDetail = (props: Props) => {
  const { product } = props;
  const relatedProducts = product?.related_products;
  const router = useRouter();
  const { Uuid }: any = useSiteInfo();

  const { data }: any = useSession();
  const data1: User = data?.user as unknown as User;
  const userId = data1?.user_id;
  const metaTags = {
    title: product?.meta.meta_title || 'Product | Iktaraa',
    name: product?.product_name,
    keywords: product?.meta.meta_keywords,
    description: product?.meta.meta_description,
    image: product?.image || '/public/images/logo.svg',
  };

  const RecentView = async () => {
    if (userId || Uuid) {
      const dataID = userId
        ? {
            customer_id: userId,
            product_url: product?.product_url,
          }
        : {
            guest_token: Uuid,
            product_url: product?.product_url,
          };

      try {
        const response = await axiosInstance().post('/api/set/recent', dataID);
        const resData = response;
        return resData;
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    }
  };

  useEffect(() => {
    RecentView();
  }, [userId, Uuid]);
  return (
    <>
      {router.isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <MetaTags meta={metaTags} />
          <ProductLayout>
            <section className="content">
              <Container
                maxWidth={'lg'}
                sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
              >
                <div className="container-fluid">
                  <div className="row container-sticky">
                    <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-6">
                      <ProductImageGallery product={product} />
                    </div>

                    <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-6 product-detail product-sticky">
                      <ProductIntro product={product} />
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-6">
                      <ProductFrequently product={product} />
                    </div>
                    {product?.is_instrumental_category == 'no' ? (
                      ''
                    ) : (
                      <div className="seller-msg my-2 pr-3 d-none d-md-none">
                        <h3 className="want-seller-heading">
                          <span>
                            <Image
                              src="/icons/overstock-sale.png"
                              alt="overstock"
                              width={40}
                              height={40}
                            />
                          </span>
                          Want to sell yours?
                        </h3>
                        <p className="paragraph-Ctr">
                          List, sell, and get paid securely for your old musical
                          instruments, connecting with music enthusiasts at your
                          preferred price
                        </p>
                      </div>
                    )}
                  </div>
                  <ProductDetailTab product={product} />
                </div>
              </Container>
              <TopSeller title="Related Products" data={relatedProducts} />
            </section>
          </ProductLayout>
        </>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const product = await api.getProduct(params?.slug as string);
  return { props: { product } };
};

export default ProductDetail;
