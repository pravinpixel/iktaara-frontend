import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import styles from '@/theme/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import api from 'src/lib/api/home';

const MetaTags = dynamic(() => import('@/components/common/header/MetaTags'));

const HowitsWorks = (props: any) => {
  const { meta } = props;
  // const { siteInfo }: any = useSiteInfo();
  // const siteName = siteInfo.site_name || 'IKTARAA';

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
          <div className="privacyPolicyCtr">
            <div className="realatedProdHead mb-3">
              <h3>How it works</h3>
            </div>
            <div>
              <p className="privacyContent">
                Student: Find a teacher or a school close to you that practices
                High-Quality Global standards in Music education and start your
                journey of music on the right Note.
              </p>
              <p className="privacyContent mt-3">
                Teacher/Music School: Register your credentials and connect with
                our education team to understand more about the services
                provided by Iktaara to take your passion for making musicians to
                the right audience. You can also register to support and grow
                the music community by offering your expertise on the instrument
                of your mastery by being a product expert on the portal and
                earning yourself some credits.
              </p>
              <p className="privacyContent mt-3">
                Musician/Instrument Buying: Connect with our experts to navigate
                your requirements to help you choose the right product based on
                your need. The products are delivered locally through an
                experienced Music retailer close to you for any future
                service-related needs and all warranties and guarantees. You can
                also opt to video shop and experience the instrument before
                buying. You also save on your logistic costs and support your
                local store to grow and support the local musicians.
              </p>
              <p className="privacyContent mt-3">
                Instrument Retailer: If you are a store with at least 5 to 10
                years of experience and would like to become an affiliate store
                of our platform, please register here and you will be contacted
                by our Iktaara trade team.
              </p>
              <p className="privacyContent mt-3">
                Music Publisher: If you are a music publisher, or musician who
                would like to sell your work to musicians for playing on our
                platform, please register here and you will be contacted by our
                Iktaara publishing team.
              </p>
              <p className="privacyContent mt-3">
                Performing Musician: If you are a performing musician, band, or
                music orchestra and would like to list yourself for
                collaborative or performing opportunities from our platform,
                please register here and you will be contacted by our Iktaara
                services team.
              </p>
              <p className="privacyContent mt-3">
                Music Services Provider: If you provide any of the music
                services below and would like to register yourself on our
                platform for business opportunities, please register here and
                our services team will contact you.
              </p>
              <p className="privacyContent mt-3">
                <p className="mt-3">
                  • Musical Instruments and Pro Audio Rental
                </p>
                <p className="mt-3">• Musical instruments repair services</p>
                <p className="mt-3">• Piano Tuning and repair services</p>
                <p className="mt-3">
                  • Recording and music production services
                </p>
                <p className="mt-3">• Jamming and Practise rooms</p>
                <p className="mt-3">
                  • Event management related to Music concerts
                </p>
                <p className="mt-3">• Concert Halls/recital Venue services</p>
                <p className="mt-3">• Any other music-specific services</p>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api
    .getMetaData({ page: 'how-it-works' })
    .then((res: any) => {
      if (res.error == 0 && res.status_code == 200) {
        return {
          title: res?.data?.meta_title || ' How its Works | Iktaraa',
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

export default HowitsWorks;
