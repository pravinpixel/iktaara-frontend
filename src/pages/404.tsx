import { useSiteInfo } from '@/context/SiteInfoContext';
import { Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';

const NotFound = () => {
  const { siteInfo }: any = useSiteInfo();
  const siteName = siteInfo.site_name || 'IKTARAA';
  return (
    <>
      <Head>
        <title> 404 | {siteName} </title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="error-rightsection">
        <div className="vstack justify-content-center text-center h-100  error-top-padding gap-1">
          <div className="heading-section-error ">
            <Typography variant="h5">404</Typography>
          </div>
          <div className="error-ooops">NotFound</div>
          <Typography variant="body1" className="error-text">
            The resource requested cannot be found on this server
          </Typography>
        </div>
      </section>
    </>
  );
};

export default NotFound;
