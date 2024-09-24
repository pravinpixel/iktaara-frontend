/* eslint-disable @next/next/no-img-element */
import dayjs from 'dayjs';
import { Fragment } from 'react';

// const Ico = (index?: number) => {
//   switch (index) {
//     case 0:
//       return <LocalMallIcon />;
//     default:
//       return <></>;
//   }
// };

const Tracking = ({ tracking = [] }) => {
  return (
    <div
      className="d-flex container flex-wrap flex-md-nowrap align-items-center justify-content-center justify-content-md-between w-100 order-tracking"
      id="trackorderone"
    >
      {tracking.map((track: any, index) => {
        return (
          <Fragment key={index}>
            {track.active && (
              <>
                {index !== 0 && (
                  <section className="d-flex align-items-center justify-content-center h-100 divide">
                    <img
                      src="/images/divider.png"
                      alt="divider"
                      className="h-100 w-75"
                    />
                  </section>
                )}
                <div
                  className={
                    track.active ? 'track-active text-center' : 'text-center'
                  }
                >
                  <img
                    src={track.status_image}
                    className=""
                    alt={track.status_name}
                  />
                  <p className="myorders-orderplaced myorders-orderplaced-new">
                    {track.status_name}
                  </p>
                  {track.created_at && (
                    <section className="myorders-date text-nowrap">
                      {dayjs(track.created_at).format('hh:mm A, DD MMM YYYY')}
                    </section>
                  )}
                </div>
              </>
            )}
          </Fragment>
        );
      })}

      {/* <section className="text-center">
        <img src="/icons/profile/orders.png" className="" alt="" />
        <p className="myorders-orderplaced">In Transit</p>
        <p className="myorders-date">24-March</p>
      </section>
      <section className="d-flex align-items-center justify-content-center h-100 pb-5 ">
        <img src="/images/divider.png" alt="" className="h-100 w-75" />
      </section>
      <section className="text-center">
        <img src="/icons/profile/orders.png" className="" alt="" />
        <p className="myorders-orderplaced">Out of Delivery</p>
        <p className="myorders-date">24-March</p>
      </section>
      <section className="d-flex align-items-center justify-content-center h-100 pb-5 ">
        <img src="/images/divider.png" alt="" className="h-100 w-75" />
      </section>
      <section className="text-center">
        <img src="/icons/profile/orders.png" className="" alt="" />
        <p className="myorders-orderplaced">Delivered</p>
        <p className="myorders-date">24-March</p>
      </section> */}
    </div>
  );
};

export default Tracking;
