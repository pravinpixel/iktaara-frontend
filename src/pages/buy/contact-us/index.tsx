/* eslint-disable prettier/prettier */
import React from 'react';
import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import api from 'src/lib/api/home';
import MetaTags from 'src/components/common/header/MetaTags';
import styles from '@/theme/styles/Home.module.css';
import { GetServerSideProps } from 'next/types';

const ContactUs = (props: any) => {
  const { meta } = props;
  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };

  return (
    <>
      <MetaTags meta={metaTags} />
      <main className={styles.main}>
        <Header />
        <main style={{ height: '60vh' }} className="container text-just">
          <div className="privacyPolicyCtr my-4 py-4">
            <div className="realatedProdHead mb-3">Contact Us</div>
            <p className="privacyContent mt-3">
              Twelfthroot Sounds Private Limited
            </p>
            <p className="privacyContent mt-3">No. 73, Anna Salai Road,</p>
            <p className="privacyContent mt-3">Chennai, Tamil Nadu, 600002</p>
            <p className="privacyContent mt-3">
              <b>Email</b> : support@iktaraa.com
            </p>
            <p className="privacyContent mt-3">
              <b>Phone</b> : +91 9940046621
            </p>
          </div>
        </main>
        <Footer />
      </main>
    </>
  );
};

export default ContactUs;

export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api
    .getMetaData({ page: 'contact-us' })
    .then((res: any) => {
      if (res.error == 0 && res.status_code == 200) {
        return {
          title: res.data.meta_title || 'Contact Us | Iktaraa',
          keywords: res.data.meta_keywords,
          description: res.data.meta_description,
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
