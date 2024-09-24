import { Box, Grid } from '@mui/material';
import React from 'react';

import ImageComponent from '@/utils/imageComponent';

export default function BannerSlides(data: any) {
  return (
    <div className="banner-section-brands">
      <Grid container spacing={1.3}>
        {data?.data?.brand_details?.promo_banner_1 && (
          <Grid item xs={12} md={6}>
            {/* <Box
              sx={{
                position: 'relative',
                aspectRatio: 2.3,
                objectFit: 'content',
              }}
              className="brand-image-border"
            >
              <Image
                src={data?.data?.brand_details?.promo_banner_1}
                alt="promo-banner"
                fill
              />
            </Box> */}
            <Box className="brand-image-border">
              <ImageComponent
                src={data?.data?.brand_details?.promo_banner_1}
                alt="promo-banner2"
                aspectRatio={2.3}
                objectFit={'content'}
                type={1}
                priority={true}
              />
            </Box>
          </Grid>
        )}
        {data?.data?.brand_details?.promo_banner_2 && (
          <Grid item xs={12} md={6}>
            <Box className="brand-image-border">
              <ImageComponent
                src={data?.data?.brand_details?.promo_banner_2}
                alt="promo-banner2"
                aspectRatio={2.3}
                objectFit={'content'}
                type={1}
                priority={true}
              />
            </Box>
            {/* <Box
              sx={{
                position: 'relative',
                aspectRatio: 2.3,
                objectFit: 'content',
              }}
              className="brand-image-border"
            >
              <Image
                src={data?.data?.brand_details?.promo_banner_2}
                alt="promo-banner2"
                fill
              />
            </Box> */}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
