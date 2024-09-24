import SuccessError from '@/components/successError';
// import { useSiteInfo } from '@/context/SiteInfoContext';
import { Box, Button, Container } from '@mui/material';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import api from 'src/lib/api/home';

const MetaTags = dynamic(() => import('@/components/common/header/MetaTags'));

const Error = (props: any) => {
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
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          <SuccessError />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link href="/buy/checkout" className="link">
              <Button
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'white',
                  background: '#e34061',
                }}
                className="email-verify"
              >
                Redirect to Checkout
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api
    .getMetaData({ page: 'payment-error' })
    .then((res: any) => {
      if (res.error == 0 && res.status_code == 200) {
        return {
          title: res?.data?.meta_title || ' Payment Error | Iktaraa',
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

export default Error;
