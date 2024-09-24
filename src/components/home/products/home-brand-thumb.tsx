import ImageComponent from '@/utils/imageComponent';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const HomeBrandThumb = ({ data }: any) => {
  const router = useRouter();
  const handleImageClick = (data: any) => {
    if (data.id) {
      router.push({
        pathname: `/buy/brands/${data?.slug}`,
      });
    }
  };
  return (
    <>
      <div className="mb-1">
        <div className=" ps-1 pe-1 d-flex flex-row flex-wrap ">
          <Box
            className="home-brands-box"
            onClick={() => handleImageClick(data)}
          >
            {/* <img
              src={data.brand_logo}
              alt=""
              width={90}
              height={40}
              onClick={() => handleImageClick(data)}
            ></img> */}
            <ImageComponent
              src={data.brand_logo}
              width={100}
              height={40}
              alt="Brands"
            />
            <p className="brands-text">{data.products_count} Products</p>
          </Box>
        </div>
      </div>
    </>
  );
};

export default HomeBrandThumb;
