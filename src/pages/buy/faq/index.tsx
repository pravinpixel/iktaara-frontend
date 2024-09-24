import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import styles from '@/theme/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import React from 'react';
import api from 'src/lib/api/home';
import MetaTags from 'src/components/common/header/MetaTags';

const WhoisIktaraa = (props: any) => {
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
          <div className="privacyPolicyCtr my-4 py-4">
            <div className="realatedProdHead">
              <h3>Frequently Asked questions</h3>
            </div>

            <div className="faq-container">
              <h2>Buying</h2>
              <details>
                <summary>How do I place an order on your website? </summary>
                <div>
                  To place an order, simply browse our website and select the
                  product(s) you wish to purchase. Add them to your cart,
                  proceed to checkout, and follow the prompts to enter your
                  shipping information and payment details. Once your order is
                  confirmed, you will receive an order confirmation email.{' '}
                </div>
              </details>
              <details>
                <summary>
                  Can I make changes to my order after it has been placed?{' '}
                </summary>
                <div>
                  Once an order has been placed, we cannot guarantee any
                  changes. However, if you need to modify your order, please
                  contact our customer support team as soon as possible. They
                  will assist you and accommodate your request if the order
                  hasn't been processed or shipped yet.{' '}
                </div>
              </details>
              <details>
                <summary>
                  Is it safe to provide my payment information on your website?{' '}
                </summary>
                <div>
                  Yes, we take the security of your payment information
                  seriously. Our website uses encryption and secure payment
                  gateways to protect your data during the checkout process. We
                  adhere to industry-standard security practices to ensure a
                  safe and secure shopping experience.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>Do you charge GST on purchases? </summary>
                <div>
                  Tax is calculated and applied based on your shipping address
                  and local tax regulations. The appropriate taxes will be added
                  to your order during the checkout process. The specific tax
                  amount will be displayed before you confirm your purchase.{' '}
                </div>
              </details>
              <details>
                <summary>
                  Can I order a product that is currently out of stock?{' '}
                </summary>
                <div>
                  If a product is listed as out of stock on our website, you may
                  not be able to order it at that time. However, you can sign up
                  for email notifications to be informed when the item is back
                  in stock. Alternatively, you can contact our customer support
                  team to inquire about availability and potential restocking
                  dates.{' '}
                </div>
              </details>
              <details>
                <summary>
                  Do you provide warranties for the products you sell?{' '}
                </summary>
                <div>
                  Yes, most of our products come with a manufacturer's warranty.
                  The warranty duration and terms may vary depending on the
                  product. Please refer to the product description or contact
                  our customer support for specific warranty information.{' '}
                </div>
              </details>
              <h2>Shipping</h2>
              <details>
                <summary>Is my Instrument safe while shipping? </summary>
                <div>
                  Absolutely. We ensure packing the product with standard
                  shipping so that you receive the product without any sort of
                  damage. In the remote case of your instrument getting damaged
                  during shipping, you are entitled to a replacement or a full
                  refund as per your preference. However please take photos and
                  video evidence if the package received is damaged. so, we will
                  be able to treat your case quickly and to your satisfaction.{' '}
                </div>
              </details>
              <h2>Order Cancellation</h2>
              <details>
                {' '}
                <summary>
                  What is the timeframe for canceling an order?{' '}
                </summary>
                <div>
                  You can request to cancel your order within 24 hours of
                  placing it. However, if your order has already been processed,
                  packed, or shipped, we may not be able to cancel it. Contact
                  our customer support team as soon as possible for assistance.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>
                  Can I make changes to my order instead of canceling it?{' '}
                </summary>
                <div>
                  If you need to make changes to your order, such as modifying
                  the quantity, adding or removing items, or changing the
                  shipping address, please contact our customer support team.
                  They will assist you in making the necessary changes, if
                  possible before the order is packed.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>
                  What if I want to cancel only a part of my order?{' '}
                </summary>
                <div>
                  If you wish to cancel only a portion of your order, please
                  contact our customer support team with the specific details of
                  the items you want to cancel. They will review your request
                  and assist you accordingly, depending on the order's status
                  and feasibility.{' '}
                </div>
              </details>
              <details>
                <summary>
                  Can I cancel an order for customized or personalized products?{' '}
                </summary>
                <div>
                  Orders for customized or personalized products may have
                  different cancellation policies due to the unique nature of
                  these items. Please contact our customer support team as soon
                  as possible to inquire about the cancellation options for your
                  specific order.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>What if I receive the order I canceled? </summary>
                <div>
                  If you receive an order that you have already canceled, please
                  contact our customer support team immediately. They will guide
                  you through the return process and ensure that you are
                  appropriately refunded.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>
                  Can I cancel an order if it is marked as "Shipped" or "Out for
                  Delivery"?{' '}
                </summary>
                <div>
                  If your order has already been marked as "Shipped" or "Out for
                  Delivery," it may be challenging to cancel it. However, please
                  contact our customer support team as soon as possible, and
                  they will assist you.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>
                  I just canceled my order. When will I receive my refund?{' '}
                </summary>
                <div>
                  If you selected Cash on Delivery, there is no amount to be
                  refunded because you haven't paid for your order. For payments
                  made via Credit Card, Debit Card, Net Banking, or Wallet you
                  will receive a refund into the source account within 15-30
                  days from the time of order cancellation.{' '}
                </div>
              </details>
              <details>
                <summary>What is iktaraa's Cancellation Policy? </summary>
                <div>
                  You can now cancel an order when it is in packed/shipped
                  status, as long as the cancel option is available on a
                  website. Any amount paid will be credited into the same
                  payment mode using which the payment was made{' '}
                </div>
              </details>
              <h2>Exchange</h2>
              <details>
                <summary>
                  Can I exchange a product if I'm not satisfied with my
                  purchase?{' '}
                </summary>
                <div>
                  Yes, we offer exchanges for products if you received any
                  defective items. You can exchange the item within 15 days of
                  delivery, provided it is in its original condition with all
                  packaging and tags intact.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>How do I initiate an exchange? </summary>
                <div>
                  To initiate an exchange, please visit the My Orders page,
                  select the desired order, click the exchange button, fill in
                  the respective details, and submit .{' '}
                </div>
              </details>
              <details>
                <summary>
                  Can I exchange an item for a different model or brand?{' '}
                </summary>
                <div>
                  No, you can't exchange an item for a different model or brand.
                  Please contact our customer support team to discuss your
                  specific exchange requirements.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>
                  Can I exchange an item if it's damaged or defective?{' '}
                </summary>
                <div>
                  If you receive a damaged or defective item, please apply for
                  an exchange of the product or contact our customer support. We
                  will arrange an exchange, and cover any shipping costs
                  associated with the exchange. Our priority is to ensure that
                  you receive a functional and high-quality product.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>How long does the exchange process take? </summary>
                <div>
                  The duration of the exchange process can vary depending on
                  factors such as your location, shipping times, and product
                  availability. We strive to process exchanges as quickly as
                  possible, and our customer support team will provide you with
                  an estimated timeline based on your specific circumstances.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>Can I exchange an item if it has been used? </summary>
                <div>
                  Generally, we only accept exchanges for items that are in
                  their original condition with all packaging and tags intact.
                  However, certain exceptions may apply for defective products
                  covered by warranty. Please contact our customer support team
                  to discuss your specific situation.{' '}
                </div>
              </details>
              <details>
                <summary>
                  What if the item I want to exchange is out of stock?{' '}
                </summary>
                <div>
                  If the item you want to exchange is out of stock, we will work
                  with you to find a suitable alternative or provide you with a
                  refund. Our customer support team will assist you in exploring
                  available options to ensure your satisfaction.{' '}
                </div>
              </details>
              <details>
                <summary>
                  Do I need to include any additional information when returning
                  an item for an exchange?{' '}
                </summary>
                <div>
                  When returning an item for an exchange, please include the
                  image of the product in its original packaging, tags, and any
                  relevant accessories. Additionally, provide a clear
                  description of the reason for the exchange and your desired
                  replacement item, if applicable. This will help us process
                  your exchange more efficiently.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>
                  If I request a replacement, when will I get it?{' '}
                </summary>
                <div>
                  Visit My Orders to check the status of your replacement. In
                  most locations, the replacement item is delivered to you at
                  the time of pick-up. In all other areas, the replacement is
                  initiated after the originally delivered item is picked up.
                  Please check the SMS & email we send you for your replacement
                  request for more details.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>Why has my Exchange request been declined? </summary>
                <div>
                  This may have happened, if the item you exchange is used, or
                  damaged, or original tags are missing. In the event that the
                  return request is declined, the user shall not be eligible for
                  a refund. For more details, please call our customer care.{' '}
                </div>
              </details>
              <h2>Change of Address</h2>
              <details>
                {' '}
                <summary>
                  Can I modify the shipping address of my order after it has
                  been placed?{' '}
                </summary>
                <div>
                  Yes, You can modify the shipping address of your order before
                  we have processed (packed) it, by updating it under 'change
                  address' option which is available under ‘My order’ section of
                  App/Website/M-site{' '}
                </div>
              </details>
              <h2>Others </h2>
              <details>
                {' '}
                <summary>Can I get guidance about products? </summary>
                <div>
                  That's just our thing! Our expert team is constantly updated
                  about products and upcoming technology. Give us a call at
                  9940046621 and we will help you go through your purchase
                  smoothly.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>
                  Can you get me a product not listed on the website?{' '}
                </summary>
                <div>
                  We absolutely will. There are a lot of products in the music
                  industry that release into the market every year. Sometimes we
                  are unable to upload certain products on the website. This
                  does not mean that we cannot find it for you. We will try our
                  best to find the product that you desire and give proper
                  alternatives in case the product you asked for has been
                  discontinued by the manufacturer.{' '}
                </div>
              </details>
              <details>
                {' '}
                <summary>
                  Are there any special offers for bulk or wholesale purchases?{' '}
                </summary>
                <div>
                  We may have special offers or pricing available for bulk or
                  wholesale purchases. If you are interested in making a bulk
                  purchase, please reach out to our customer support team or
                  sales department, and they will provide you with the necessary
                  information and assist you accordingly.{' '}
                </div>
              </details>
            </div>
          </div>
        </main>
        <Footer />
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api.getMetaData({ page: 'faq' }).then((res: any) => {
    if (res.error == 0 && res.status_code == 200) {
      return {
        title: res.data.meta_title || 'Faq | Iktaraa',
        keywords: res.data.meta_keywords,
        description: res.data.meta_description,
        image:
          res?.data?.meta_image || res?.data?.logo || '/public/images/logo.svg',
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
export default WhoisIktaraa;
