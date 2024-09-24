import Head from 'next/head';
import { FC } from 'react';

type MetaProps = {
  meta: {
    title: string;
    description: string | null;
    keywords: string | null;
    image: string | null;
  };
};

const MetaTags: FC<MetaProps> = ({ meta }) => {
  console.log(meta, 'meta');
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        {meta?.description == null ? (
          ''
        ) : (
          <meta name="description" content={meta?.description} />
        )}
        {meta?.keywords == null ? (
          ''
        ) : (
          <meta name="keywords" content={meta?.keywords} />
        )}
        {meta?.description == null ? (
          ''
        ) : (
          <meta name="og:description" content={meta?.description} />
        )}
        {meta?.image == null ? (
          ''
        ) : (
          <meta name="og:image" content={meta?.image} />
        )}
        <meta property="og:title" content={meta?.title} />
      </Head>
    </>
  );
};

export default MetaTags;
