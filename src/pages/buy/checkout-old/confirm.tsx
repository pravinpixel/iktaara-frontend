import Link from 'next/link';
import Head from 'next/head';
import ProductLayout from 'src/theme/layouts/ProductLayout';

const Confirm = () => {
  return (
    <>
      <ProductLayout>
        <Head>
          <title> CheckOut | IKaraa Store</title>
          <meta name="description" content="" />
        </Head>
        <div className="container">
          <div className="row justify-content-between order-confrim">
            <div className="col-12  border-right p-5">
              <div className="text-center order-details">
                <div className="d-flex justify-content-center mb-5 flex-column align-items-center">
                  <span className="check1">
                    <i className="fa fa-check"></i>
                  </span>
                  <span className="font-weight-bold">Order Confirmed</span>
                  <small className="mt-2">
                    Thanks for your order! You should receive a shipping email
                    within a few days. We want you to love every second of
                    shopping with us!
                  </small>
                </div>
                <Link href="/" className="btn btn-dark btn-block order-button">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ProductLayout>
      ˝
    </>
  );
};

export default Confirm;
