import ImageComponent from '@/utils/imageComponent';
import { Box, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function BrandsSection(data: any) {
  return (
    <section className="category-section">
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <h5 className="category-Piano">
            {data?.data?.brand_details?.brand_name}
          </h5>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            display: { md: 'flex', xs: 'none', sm: 'none' },
            justifyContent: 'end',
          }}
          mb={1}
        >
          <button className="share-btn">
            <ImageComponent
              src="/images/demo/static/share.png"
              width={20}
              height={20}
              alt="share"
              priority={true}
            />
            Share Page
          </button>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            display: { xs: 'flex', sm: 'flex', md: 'none' },
            justifyContent: 'end',
          }}
          mb={3}
        >
          <button className="share-btn1">
            <ImageComponent
              src="/images/demo/static/share.png"
              width={15}
              height={15}
              alt="share"
              priority={true}
            />
          </button>
        </Grid>
      </Grid>
      <Box>
        <Grid container spacing={'10px'}>
          {data?.data?.top_category_section?.map((item: any, index: number) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Link
                href={`/buy/brand-category/${data?.data?.brand_details?.slug}/${item.category_slug}`}
              >
                <Box className="home-new-begin-category">
                  <p> {item.category_name}</p>
                  <div className="arrow-image-size">
                    {/* <img
                      className="arrow-image"
                      src="/icons/vector-arrow.png"
                    /> */}
                    <ImageComponent
                      src="/icons/vector-arrow.png"
                      className="arrow-image"
                      width={11}
                      height={13}
                      alt={item.category_name}
                    />
                  </div>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
}
