import React from 'react';
import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import styles from '@/theme/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import api from 'src/lib/api/home';
import MetaTags from 'src/components/common/header/MetaTags';

const ReturnCancel = (props: any) => {
  const { meta } = props;
  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };

  return (
    <>
      <MetaTags meta={metaTags} />
      <main className={styles.main}>
        <Header />
        <main className="container text-just">
          <div className="privacyPolicyCtr">
            <div className="realatedProdHead mb-3 pt-4">
              <h3>Return / Cancel policy</h3>
            </div>
            <div>
              <p className="privacyContent">
                Refunds: We thank you and appreciate your purchase with us.
                Please read the policy, conditions and process carefully as they
                will give you important information and guidelines about your
                rights and obligations as our customer, concerning any purchase
                you make through us unless specifically stated otherwise on our
                product pages or readers offer advertisements. We make every
                effort to service the order/s placed with us as per the
                specifications and timelines mentioned against each product. If
                due to any reason, unavoidable circumstances or beyond the
                limitations of the merchants the order is not shipped by us then
                the order shall be cancelled and refunded. In the event the
                order/product is delivered and has been cancelled for refund due
                to product fault, delivery of wrong product, partial product,
                etc the refund is processed. If any orders are cancelled by you
                after procurement, but before being shipped by
                OnlineIktaraa.com, then OnlineIktaraa.com will charge restocking
                fee applicable as per the product category. International Books
                will attract a restocking fee of 25% of the order value. All
                other orders will attract a restocking fee of 10% of the order
                value. Refund will be made after deducting such restocking fee
                as applicable within 7-10 working days. Any charges levied as
                tax is not eligible for refund. A refund can be refused if the
                product is completely broken and unusable or with scratches or
                incomplete as per the seller claims from the customer and/or if
                the product is returned beyond the required return date or you
                have not informed us about the concern during the warranty
                period.On cancellation of an order, you are entitled to receive
                refund based on pay mode plus the shipping charges.
              </p>
              <p className="privacyContent mt-3">
                In case of returns, we will process the refund after receipt of
                the product by Iktaraa or its business partner. Refund will be
                processed based on the mode of payment of the order.
              </p>
              <p className="privacyContent mt-3">
                • Orders paid by credit/ debit card will be refunded by credit
                back to the credit/ debit card within 7 working days and the
                refund will reflect in the next statement.
              </p>
              <p className="privacyContent mt-3">
                • For all other modes of payment, we will send a refund cheque.
                The cheque will be made in favor of the name as in the “billing
                name” provided at the time of placing the order.
              </p>
              <p className="privacyContent mt-3">
                • For orders placed through Gift Certificates / Vouchers of
                Iktaraa, refund would be provided in form of a fresh Gift
                Certificate / Voucher of the same value.
              </p>
              <div className="realatedProdHead mt-3 ">
                Replacement conditions:
              </div>
              <p className="privacyContent mt-3">
                Iktaraa offers replacement guarantee for selected products sold
                on OnlineIktaraa.com, under certain conditions which are
                mentioned below.
              </p>
              <p className="privacyContent mt-3">
                • Iktaraa will replace the defective product with a brand new
                product at no extra cost. However, all freight expenses
                (Shipping) will be borne by the customer.
              </p>
              <p className="privacyContent mt-3">
                • In case customer fails to inform Iktaraa within the stipulated
                time frame (24 hours from the date of delivery), Iktaraa
                reserves the right to accept or reject such request at its
                discretion.
              </p>
              <p className="privacyContent mt-3">
                • Iktaraa will try to replace the specific product ordered.
                However, the company reserves the right to offer a refund or an
                alternate product in case the product is out of stock/
                production.
              </p>
              <p className="privacyContent mt-3">
                • The return policy is also not valid for certain products such
                as String sets, Picks, Accessories etc. Should customers come
                across any issue with such products, they are advised to contact
                customer service within 24 hours, failing which we may decide
                not take a request for replacement.
              </p>
              <p className="privacyContent mt-3">
                • Products should be returned in their original packaging along
                with the original price tags, labels and invoices.Returned
                mouthpieces incur a sterilization fee
              </p>
              <p className="privacyContent mt-3">
                • The customer has to ensure that the return packets should be
                strongly and adequately packaged so that there is no further
                damage of goods in transit. If Iktaraa receives the goods in a
                damaged condition, it holds the right to reject any warranty
                claims and any additional expenses for repairing the product
                shall be borne by the customer.{' '}
              </p>
              <p className="privacyContent mt-3">
                • The following items are nonreturnable except for defects:
                opened or used sets of strings, boxes of reeds, computer
                software, soundcards, tubes, internal earphones, earplugs,
                traditional and ethnic wind instruments, harmonicas, raw-frame
                speakers, pickups that have been installed, drumheads and
                sticks, turntable cartridges, washed or worn clothing and
                footwear, body jewelry, books, cassettes, CD’s, DVDs, and
                videos.
              </p>
              <p className="privacyContent mt-3">
                All cost of shipping for warranty claims will be borne by the
                customer. The products will be sent to the respective authorized
                centers of the manufacturers and the decision of the company
                would be final to offer a replacement or repair a particular
                part under warranty. Iktaraa shall only offer assistance in case
                of warranty claims and the customer is expected to contact the
                service centers of different manufacturers for any support on
                the product.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </main>
    </>
  );
};

export default ReturnCancel;
export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api
    .getMetaData({ page: 'return-cancel' })
    .then((res: any) => {
      if (res?.error == 0 && res?.status_code == 200) {
        return {
          title: res?.data?.meta_title || 'Return /Cancel policy | Iktaraa',
          keywords: res?.data?.meta_keywords || '',
          description: res?.data?.meta_description || '',
          image:
            res?.data?.meta_image ||
            res?.data?.logo ||
            '/public/images/logo.svg',
        };
      }
      return [];
    });

  return {
    props: {
      meta: meta,
    },
  };
};
