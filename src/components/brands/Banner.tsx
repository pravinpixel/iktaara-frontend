import NewImageComponent from '@/utils/NewImageComponents';
import { useMediaQuery } from '@mui/material';
import React from 'react';

export default function Banner(data: any) {
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <div className="swpier-header-main">
      <NewImageComponent
        src={data?.data?.brand_banner}
        alt="banner"
        objectFit={'content'}
        type={1}
        aspectRatio={matches ? 6 : 3.5}
        className="category-imgbrand-1"
        priority={true}
        style={{
          // height: matches ? '300px' : '150px',
          width: '100%',
        }}
      />
      {/* <Box
        sx={{
          position: 'relative',
          aspectRatio: 6,
          objectFit: 'content',
        }}
      >
        <Image
          src={data?.data?.brand_banner}
          alt=""
          fill
          className="category-imgbrand"
        />
         <Box sx={{ position: 'absolute' }}>
          <h5 className="category-banner-titles">
            {props?.categoryDatas?.category_details?.name}
          </h5>
          <p className="category-banner-paras">
            {props?.categoryDatas?.category_details?.description}
          </p>
        </Box> 
      </Box> */}
    </div>
  );
}
