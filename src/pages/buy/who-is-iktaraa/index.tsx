import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import styles from '@/theme/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import React from 'react';
import api from 'src/lib/api/home';
import MetaTags from 'src/components/common/header/MetaTags';

const WhoisIktaraa = (props: any) => {
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
        <main className="container text-just">
          <div className="privacyPolicyCtr my-4 py-4">
            <div className="realatedProdHead">
              <h3>Who is iktaraa?</h3>
            </div>
            <p className="privacyContent mb-4 pb-4">
              Iktaraa is an initiative by the founder of Musee musical, the
              oldest music organization in India, to connect music enthusiasts
              with the world of music on a single platform
            </p>
          </div>
        </main>
        <Footer />
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api.getMetaData({ page: 'about-us' }).then((res: any) => {
    if (res.error == 0 && res.status_code == 200) {
      return {
        title: res.data.meta_title,
        keywords: res.data.meta_keywords,
        description: res.data.meta_description,
        image: res.data.logo,
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
export default WhoisIktaraa;
