// import FastSellingThumb from './products/home-fast-selling-thumb';
// import Slider from 'react-slick';

// const HomeFastSelling = ({ data }: any) => {
//   const settings_3 = {
//     slidesToScroll: 5,

//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           initialSlide: 3,
//         },
//       },
//       {
//         breakpoint: 800,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 500,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//     ],
//   };
//   return (
//     <>
//       <section id="fast-selling" className="pb-1 container-fluid">
//         <div className="fast-selling mt-4">
//           <div className="container-fluid">
//             <div className="row text-center">
//               <div className="col-12 my-2">
//                 <p className="text-lg-center text-dark title my-2">
//                   {data?.collection_name}
//                 </p>
//                 <p className="text-sm-center text-dark sup-title mb-4">
//                   {data?.tag_line}
//                 </p>
//               </div>
//             </div>
//             {/* <div className=""> */}
//             {/* <div
//               className="d-flex gap-4 flex-wrap w-100 justify-content-center"
//               style={{
//                 marginInline: 'auto',
//               }}
//             >
//               <div className="products-section">
//                 {data?.products?.slice(0, 12).map((product: any) => {
//                   return (
//                     <FastSellingThumb product={product} key={product.id} />
//                   );
//                 })}
//               </div>
//             </div> */}
//             <div className="product-section  mb-5 h-100 container-fluid  w-100 mx-2">
//               <Slider
//                 slidesToShow={5}
//                 autoplay
//                 dots={false} // centerMode={true}
//                 // centerPadding="10px"
//                 className="margin-auto"
//                 {...settings_3}
//               >
//                 {data?.products?.map((product: any, index: number) => {
//                   return (
//                     <FastSellingThumb
//                       product={product}
//                       key={product.id}
//                       index={index}
//                     />
//                   );
//                 })}

//                 {/* {data?.products?.map((product: any) => {
//                   return (
//                     <FastSellingThumb product={product} key={product.id} />
//                   );
//                 })} */}
//               </Slider>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HomeFastSelling;

import Slider from 'react-slick';
import FastSellingThumb from './products/home-fast-selling-thumb';

const HomeBrandOffer = ({ data }: any) => {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: false,
    // arrows: false,
    // centerMode: true,
    // centerPadding: '60px',
    // autoPlay: true,
    className: 'container-fluid  fast-selling-thumb margin-auto',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <>
      <section id="fast-selling">
        <div className="brands border-bottom">
          <div className="fast-selling  pt-4">
            <div className="container-fluid">
              <div className="row text-center">
                <div className="col-12 my-2">
                  <p className="text-lg-center text-dark title my-2">
                    {data?.collection_name}
                  </p>
                  <p className="text-sm-center text-dark sup-title mb-4">
                    {data?.tag_line}
                  </p>
                </div>
              </div>
              <div
                className="d-flex gap-4 flex-wrap w-100 justify-content-center"
                style={{
                  marginInline: 'auto',
                }}
              >
                <Slider {...settings}>
                  {/* <div className="product-section"> */}
                  {data?.products?.map((product: any) => {
                    return (
                      <FastSellingThumb product={product} key={product.id} />
                    );
                  })}
                </Slider>

                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBrandOffer;
