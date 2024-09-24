// import ImageComponent from '@/utils/imageComponent';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
// import Link from 'next/link';
import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { Image } from 'react-bootstrap';
// import CartButton from 'src/components/common/cart-button';

const MusicAccessThumb = () => {
  const router = useRouter();
  const pianoFrom = [
    {
      title: 'DJ Headphones, controllers & accessories',
      amount: '5,500',
      image: '/images/home/access_1.webp',
      link: '/buy/category/dj-gears',

      // ClassNames: 'Piano-Beginners',
    },
    {
      title: 'Professional headphones, microphones & keyboards',
      amount: '3,500',
      image: '/images/home/access_2.webp',
      link: '/buy/category/pro-audio',

      // ClassNames: 'Keyboards-Beginners',
    },
    {
      title: 'Instrument stands, strings & cables',
      amount: '8,500',
      image: '/images/home/access_3.webp',
      link: 'https://www.iktaraa.com/buy/category/accessories',

      // ClassNames: 'Portable-keyboards',
    },
    {
      title: 'Live Audio amplifiers, mixers  & speakers',
      amount: '15,000',
      image: '/images/home/access_4.webp',
      link: '/buy/category/live-audio',

      // ClassNames: 'Musical-Keyboards',
    },
    {
      title: 'Audio equipments for content creators ',
      amount: '9,500',
      image: '/images/home/access_5.webp',
      link: 'https://www.iktaraa.com/buy/category/search?search_field=audio&category_id=0&slugs=',

      // ClassNames: 'live-musical',
    },
    {
      title: 'Softwares plugins & accessories ',
      amount: '6,600',
      image: '/images/home/access_6.webp',
      link: 'https://www.iktaraa.com/buy/category/search?search_field=software&category_id=0&slugs=',

      // ClassNames: 'KeyboardsPortable',
    },
  ];

  const handleClick = (item: any) => {
    router.push(item);
  };

  return (
    <>
      <section>
        <Grid container spacing={'16px'}>
          {pianoFrom.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div
                onClick={() => handleClick(item.link)}
                style={{
                  // backgroundImage:'url(/images/demo/static/home-accessories-bg.png)',
                  backgroundImage:
                    'linear-gradient(rgba(35,31,88,0.5), rgba(35,31,88,0.5)), url(/images/demo/static/home-accessories-bg.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  cursor: 'pointer',
                  borderRadius: '12px',
                }}
              >
                {' '}
                <Grid container className="home-access-background">
                  {/* <Image
                    src="/images/checkout-new/Base-color.png"
                    alt="banner"
                    className="category-imgbrand"
                    width={100}
                    height={100}
                  /> */}
                  <Grid item xs={8} md={8}>
                    <Box>
                      <Typography variant="h5" className="piano-titlebg">
                        {item.title}
                      </Typography>
                      <Typography variant="body1" className="piano-textbg">
                        From ₹
                        <span className="piano-amount">{item.amount}</span>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4} md={4} className="home-access-secondsec">
                    <Box
                      sx={{ display: 'flex' }}
                      className="home-access-secondsecdiv"
                    >
                      <Image
                        src={item.image}
                        alt="music"
                        width={100}
                        height={100}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
      </section>
    </>
  );
};

export default MusicAccessThumb;
