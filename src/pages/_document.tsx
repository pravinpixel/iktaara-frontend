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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PCNXTBCC');`,
          }}
        />
         <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '8281194111914959');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=8281194111914959&ev=PageView&noscript=1"
          />
        </noscript>
      </Head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PCNXTBCC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
