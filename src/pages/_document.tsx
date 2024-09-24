/* eslint-disable @next/next/next-script-for-ga */
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Organization',
    url: 'https://www.iktaraa.com/',
    name: 'Iktaraa',
    description:
      'Iktaraa, your trusted online source for a wide range of high-quality musical instruments. Unleash your creativity and take your music to the next level.',
    logo: 'https://www.iktaraa.com/images/logo.svg',
    image: 'https://www.iktaraa.com/images/logo.svg',
    priceRange: '₹₹',
    telephone: '+91 9940046621',
    email: 'support@iktaraa.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 73, Anna Salai Road',
      addressLocality: 'Chennai',
      addressRegion: 'CH',
      postalCode: '600002',
      addressCountry: 'IN',
    },
  };
  return (
    <Html lang="en">
      <Head>
        {process.env.NEXTAUTH_URL === 'https://www.iktaraa.com/' && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-RE0E8BFWGF"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-RE0E8BFWGF');
                `,
              }}
            ></script>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=AW-16443198809"
            ></script>

            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'AW-16443198809');
                `,
              }}
            ></script>
          </>
        )}

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "id0urf1rvb");
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
