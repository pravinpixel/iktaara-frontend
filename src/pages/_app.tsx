/* eslint-disable react-hooks/exhaustive-deps */
import ResponsiveBottomBar from '@/components/common/header/ResponsiveBottomBar';
import '@/theme/styles/custom.css';
import '@/theme/styles/globals.css';
import '@/theme/styles/style.css';
import { Box } from '@mui/material';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState, type ReactElement, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { SiteInfoProvider, useSiteInfo } from 'src/context/SiteInfoContext';
import store from 'src/redux/store';
import GoogleAnalytics from '../components/common/google-analytics';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const url: any = process.env.NEXT_PUBLIC_MAIN_URL
    ? String(process.env.NEXT_PUBLIC_MAIN_URL).slice(0, -1)
    : '';
  const [previewUrl, setPreviewUrl] = useState([]);
  const canicialPath = url + router.asPath;

  const { siteInfo }: any = useSiteInfo();

  const handleSupportClick = () => {
    document.getElementById('zsiq_float')?.click();
  };

  useEffect(() => {
    router.events.on('beforeHistoryChange', (e) => {
      const routerPath = String(e).split('/');
      if (routerPath.includes('product')) {
        const path = String(e)
          .split('?')[0]
          .split('/')
          .pop()
          ?.replaceAll('#', '')
          .replaceAll('!', '');
        const filteredValue: any = [...new Set([...previewUrl, path])];
        setPreviewUrl(filteredValue);
      }
    });
  }, [router]);
  return getLayout(
    <SessionProvider>
      <Provider store={store}>
        <SiteInfoProvider>
          <Head>
            <title>{siteInfo?.site_name || 'IKtaraa'}</title>
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/images/apple-touch-icon.png"
            />
            <link rel="canonical" href={canicialPath} />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/images/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/images/favicon-16x16.png"
            />
            <meta
              name="google-signin-client_id"
              content="1037890068490-mr32ctk9tg8ke0ce8evob17frr8bs1ds.apps.googleusercontent.com"
            ></meta>
            <meta
              name="google-site-verification"
              content="eMICda-pwvICatbfzD5Z32yPqg1iee8WuStW41FU70k"
            />
          </Head>
          <Script
            id="bootstrap-cdn"
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          />
          <Script id="zsiqchat" strategy="lazyOnload">
            {`
    var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "siqe5feee29e90a578d01002ee05b3a1450547dd29dedd6372855d317fc7fd566d6d8d6a1d80c29b21a55f1444c3b17311b", values:{},ready:function(){}};
    var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zoho.in/widget";
    t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
    `}
          </Script>
          <Box
            onClick={handleSupportClick}
            sx={{
              position: 'fixed',
              zIndex: '10000000000000000',
              right: -15,
              bottom: '3%',
              py: 2,
              px: 3,
              textOrientation: 'sideways',
              writingMode: 'vertical-lr',
              cursor: 'pointer',
              direction: 'ltr',
              '@media (max-width: 767px)': {
                display: 'none',
              },
            }}
          >
            <Image
              src="/images/demo/static/support.png"
              width={62}
              height={60}
              alt="user-icon"
            />
          </Box>

          <main
            className={`${
              router.pathname === '/login' ||
              router.pathname === '/signup' ||
              router.pathname === '/forgot-password' ||
              router.pathname === '/login/mobile' ||
              router.pathname === '/404' ||
              router.pathname === '/reset-password'
                ? 'responsive-bottom'
                : 'responsive-bottom-1'
            }`}
          >
            <ToastContainer position="top-center" />
            <Component {...pageProps} pathname={previewUrl} />
            <ResponsiveBottomBar />
          </main>
          <GoogleAnalytics />
        </SiteInfoProvider>
      </Provider>
      <NextNProgress
        color="radial-gradient(ellipse farthest-corner at right bottom, #DA1D43 0%, #DA1D43 8%, #DA1D43 30%, #DA1D43 40%, transparent 80%),
        radial-gradient(ellipse farthest-corner at left top, #DA1D43 0%, #DA1D43 8%, #DA1D43 25%, #DA1D43 5%, #DA1D43 100%)"
        showOnShallow={false}
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        options={{ showSpinner: false }}
      />
    </SessionProvider>,
  );
};

export default App;
