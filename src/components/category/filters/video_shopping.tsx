// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from 'src/redux/store';
// import { fetchProduct } from 'src/redux/category-slice';

// const VideoShopping = (props: any) => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const queryParams: any = router.query;

//   let query: any;

//   if (Object.hasOwn(router.query, 'booking')) {
//     query = router.query.booking;
//   }

//   const [status, setStatus] = useState<boolean>(
//     query != undefined ? true : false,
//   );

//   const handleUpdateRouter = (e: any) => {
//     setStatus(true);
//     queryParams['category'] = router.query.slug;
//     if (e.target.checked == true) {
//       queryParams['booking'] = 'video_shopping';
//       dispatch(fetchProduct(queryParams)).unwrap();
//     } else {
//       setStatus(false);
//       delete queryParams['booking'];
//       dispatch(fetchProduct(queryParams)).unwrap();
//     }
//   };

//   return (
//     <>
//       <div className="filter-box">
//         <div className="title py-3">Video Shopping</div>
//         <div className="filter-list">
//           <div className="form-check py-2">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               value=""
//               defaultChecked={status}
//               onCheckBoxChecked={(e: any, slug: any, name ='') => {
//                 router.push({
//                   query : makeQuery(router?.query?.[name] ?? null, e.target.checked, slug, {...router.query}, name)
//                 })
//               }}
//             />
//             <label className="form-check-label" htmlFor="flexCheckDefault">
//               Video Shopping is available
//             </label>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default VideoShopping;

import { useRouter } from 'next/router';
// import { useMemo, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from 'src/redux/store';
// import { fetchProduct } from 'src/redux/category-slice';
import FilterInputes from './inputs/filter-inputs';
import { makeQuery } from '@/lib/helper';

const VideoShopping = () => {
  const router = useRouter();

  const video = [
    {
      brand_name: 'Video Shopping is available',
      slug: 'video',
    },
  ];

  return (
    <>
      <div className="filter-box">
        <div className="title py-3">Video Shopping</div>
        <div className="filter-list">
          {video?.map((filter: any, index: any) => {
            return (
              <div
                className="form-check py-2"
                style={{ display: 'flex', gap: '10px' }}
                key={index}
              >
                <FilterInputes
                  filter={filter}
                  name="booking"
                  onCheckBoxChecked={(e: any, slug: any, name = '') => {
                    router.push(
                      {
                        query: makeQuery(
                          router?.query?.[name] ?? null,
                          e.target.checked,
                          slug,
                          { ...router.query },
                          name,
                        ),
                      },
                      undefined,
                      {
                        scroll: false,
                      },
                    );
                  }}
                />
                <label
                  className="form-check-label-checkbox"
                  htmlFor="flexCheckDefault"
                >
                  {filter.brand_name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VideoShopping;
