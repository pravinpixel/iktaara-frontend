import React from 'react';
// import Footer from '@/components/common/footer/Footer';
// import ResponsiveHeader from '@/components/common/header/ResponsiveHeader';
import { GetServerSideProps } from 'next';
import api from 'src/lib/api/home';
import TopBarCheckout from './head-checkout';
import dynamic from 'next/dynamic';
import CheckoutNewSection from './checkout-new-section';
const MetaTags = dynamic(() => import('@/components/common/header/MetaTags'));
const Footer = dynamic(() => import('@/components/common/footer/Footer'));
const ResponsiveHeader = dynamic(
  () => import('@/components/common/header/ResponsiveHeader'),
);

const CheckNew = (props: any) => {
  // const musicImage = [
  //   {
  //     image: '/images/home/home-learn.png',
  //     text: 'Learn',
  //   },
  //   {
  //     image: '/images/home/paly.png',
  //     text: 'Paly',
  //   },
  //   {
  //     image: '/images/home/perform.png',
  //     text: 'Perform',
  //   },
  //   {
  //     image: '/images/home/connect.png',
  //     text: 'Connect',
  //   },
  //   {
  //     image: '/images/home/upgrade.png',
  //     text: 'Upgrade',
  //   },
  //   {
  //     image: '/images/home/notified.png',
  //     text: 'Get Notified!',
  //     text1: 'Launching More',
  //   },
  // ];
  const { meta } = props;
  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };
  return (
    <>
      <header className="header-area-checkoutnew">
        <ResponsiveHeader />
        <TopBarCheckout />
      </header>
      <MetaTags meta={metaTags} />
      <CheckoutNewSection />

      <Footer />
    </>
  );
};

export default CheckNew;
export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api
    .getMetaData({ page: 'checkout-page' })
    .then((res: any) => {
      if (res?.error == 0 && res?.status_code == 200) {
        return {
          title: res?.data?.meta_title || 'Checkout | Iktaraa',
          keywords: res?.data?.meta_keywords || '',
          description: res?.data?.meta_description || '',
          image:
            res?.data?.meta_image ||
            res?.data?.logo ||
            '/public/images/logo.svg',
        };
      }
      return [];
    });

  return {
    props: {
      meta: meta,
    },
  };
};
