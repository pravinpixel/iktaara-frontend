import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import styles from '@/theme/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import api from 'src/lib/api/home';

const MetaTags = dynamic(() => import('@/components/common/header/MetaTags'));

const KnowMore = (props: any) => {
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
      {/* <Head>
        <title> Know More | {siteName} </title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <main className={styles.main}>
        <Header />
        <main className="container text-just">
          <div className="privacyPolicyCtr">
            <div className="realatedProdHead mb-3">
              <h3>Know more</h3>
            </div>
            <div>
              <p className="privacyContent">
                Iktaraa is an initiative by the founders of the oldest Musical
                organization in India to connect Music enthusiasts with the
                world of Music on a single platform. The platform caters to
                aspirants who want to study music by helping them find the best
                and the closest teaching facility with the highest quality
                standards{' '}
                <b>
                  <Link
                    href={'/learn'}
                    target="_blank"
                    style={{
                      color: 'gray',
                    }}
                  >
                    (Learn)
                  </Link>{' '}
                </b>{' '}
                . Iktaraa has its own learning benchmarks and all affiliate
                teachers/schools can choose to adopt the same thus ensuring a
                global standard of music education for the learner.
              </p>
              <p className="privacyContent mt-3">
                The platform also connects Music stores{' '}
                <b>
                  <Link
                    href={'/'}
                    target="_blank"
                    style={{
                      color: 'gray',
                    }}
                  >
                    (Buy)
                  </Link>{' '}
                </b>{' '}
                with good reputations and musical lineage to help musicians, and
                music learners access quality music instruments in both online
                and offline environments giving the flexibility to the buyer to
                buy online and also get an option for better service and
                guidance through the nearest Music Store.
              </p>
              <p className="privacyContent mt-3">
                The digital music library{' '}
                <b>
                  <Link
                    href={'/play'}
                    target="_blank"
                    style={{
                      color: 'gray',
                    }}
                  >
                    (Play)
                  </Link>{' '}
                </b>{' '}
                offers musicians and students access to Music to download and
                play their best music with partnerships from the best music
                publishers in the world.
              </p>
              <p className="privacyContent mt-3">
                The music aspirants can also create their own world of
                performance by having their performance page
                <b>
                  <Link
                    href={'/perform'}
                    target="_blank"
                    style={{
                      color: 'gray',
                    }}
                  >
                    (Perform)
                  </Link>{' '}
                </b>{' '}
                and showcase their talent to the world. This will be done
                through a curated process with expert feedback and help to get
                the best out of the aspirant and build his/her performance
                portfolio.
              </p>
              <p className="privacyContent mt-3">
                The platform will also help music enthusiasts
                <b>
                  <Link
                    href={'/connect'}
                    target="_blank"
                    style={{
                      color: 'gray',
                    }}
                  >
                    (Connect)
                  </Link>{' '}
                </b>{' '}
                with the various services offered in the music industry, from
                finding a collaborator for a band to having an artist perform
                for an event, finding the nearest and best studio for recording
                performances to hiring venues for live music, get a music
                technician to repair your instrument to find a company that will
                rent you instruments for an event, or even find the concerts
                happening in your city and books a ticket for the same.
              </p>
              <p className="privacyContent mt-3">
                Finally, it also empowers a musician to{' '}
                <b>
                  <Link
                    href={'/upgrade'}
                    target="_blank"
                    style={{
                      color: 'gray',
                    }}
                  >
                    (Upgrade)
                  </Link>{' '}
                </b>{' '}
                his product by helping to find a new buyer for the used product.
              </p>
              <p className="privacyContent mt-3">
                The platform helps the fraternity to find opportunities and
                expand their world of Music beyond their current limitations.
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
  const meta = await api.getMetaData({ page: 'know-more' }).then((res: any) => {
    if (res.error == 0 && res.status_code == 200) {
      return {
        title: res?.data?.meta_title || ' Know More | Iktaraa',
        keywords: res?.data?.meta_keywords || '',
        description: res?.data?.meta_description || '',
        image:
          res?.data?.meta_image || res?.data?.logo || '/public/images/logo.svg',
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

export default KnowMore;
