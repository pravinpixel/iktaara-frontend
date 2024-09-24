import Image from 'next/image';
import Link from 'next/link';

const CheckOutProducts = ({ item }: any) => {
  // const dispatch = useDispatch();
  // const { Uuid }: any = useSiteInfo();

  // const handleIncreement = async (item: any) => {
  //   const data = {
  //     id: item.id,
  //     cart_id: item.cart_id,
  //     quantity: item.quantity,
  //     guest_token: Uuid,
  //   };
  //   //if (item.max_quantity > item.quantity) {
  //   await api.updateCart(data).then((res: any) => {
  //     if (res.status_code == 200) {
  //       dispatch(incrementQuantity({ id: item.id }));
  //     }
  //   });
  //   // } else {
  //   //alert('Maximum order quantity is ' + item.max_quantity);
  //   //}
  // };

  // const handleDecreement = async (item: any) => {
  //   const data = {
  //     id: item.id,
  //     cart_id: item.cart_id,
  //     quantity: item.quantity,
  //     guest_token: Uuid,
  //   };
  //   if (item.quantity > 1) {
  //     const decResult = await api.updateCart(data).then((res: any) => {
  //       if (res.status_code == 200) {
  //         dispatch(decrementQuantity({ id: item.id }));
  //       }
  //     });
  //   } else {
  //   }
  // };

  return (
    item && (
      <>
        <section className="d-flex flex-column flex-md-row  justify-content-md-start justify-content-center align-items-md-start gap-2 py-2 align-items-center  ">
          <Link
            href={`/product/${item.product_url}`}
            style={{
              height: '139px',
              width: '132px',
            }}
          >
            <Image
              src={item.image}
              alt="stepper_img"
              height={139}
              width={132}
              className="steper-img"
              style={{
                border: '1px solid lightgray',
                objectFit: 'contain',
              }}
            />
          </Link>
          <div className="d-flex flex-column justify-content-md-start justify-content-center align-items-md-start align-items-center  gap-3 text-black aart">
            <Link
              href={`/product/${item.product_url}`}
              className="prodname-new text-center text-md-start"
            >
              {item.product_name}
            </Link>
            <div
              className="d-flex align-items-center gap-2  mb-1 quanity-1"
              style={{
                height: '22px',
              }}
            >
              <p className="d-flex  gap-2">
                <span className="money">Quantity:</span>
                <span className="amount-new">{item.quantity}</span>
              </p>
              {/* <p className="d-flex">
                <i
                  className="fa-solid fa-minus quanty-icon-1"
                  onClick={() => {
                    // handleDecreement(event, item);
                  }}
                />
                <span className="quanty-icon-2 ">{item.quantity}</span>
                <i
                  className="fa-regular fa-plus quanty-icon-3"
                  onClick={() => {
                    // handleIncreement(event, item);
                  }}
                />
              </p> */}
            </div>

            <p className="d-flex  gap-2">
              <span className="money">Price:</span>
              <span className="amount-new">
                Rs. {item.sale_prices?.price}/-
              </span>
            </p>
          </div>
        </section>
      </>
    )
  );
};
export default CheckOutProducts;
