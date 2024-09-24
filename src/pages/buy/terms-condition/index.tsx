import React from 'react';
import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import styles from '@/theme/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import api from 'src/lib/api/home';
import MetaTags from 'src/components/common/header/MetaTags';

const TermsAndCondition = (props: any) => {
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
            <div className="realatedProdHead pt-4 mb-3">
              <h3>Terms & Condition</h3>
            </div>
            <div className="realatedProdHead mb-3">User Agreement</div>
            <div>
              <p className="privacyContent">
                The Terms and Conditions (T&C.S) contained herein along with the
                Privacy Policy and Terms of Use, form an Agreement regulating
                our relationship with regard to the use of Iktaraa (Site) by
                you.
              </p>
              <p className="privacyContent mt-3">
                Please read this Agreement carefully. You are advised to
                regularly check for any amendments or updates to the terms and
                conditions from time to time. Iktaraa may add to or change or
                update these Terms of Use, from time to time entirely at its own
                discretion. You are responsible for checking these Terms of Use
                periodically to remain in compliance with these terms. Your use
                of a Site after any amendment to the Terms of Use shall
                constitute your acceptance of these terms and you also agree to
                be bound by any such changes/revisions.
              </p>
              <p className="privacyContent mt-3">
                Any clause of terms and conditions if deemed invalid, void or
                for any reason unenforceable, shall be deemed severable and
                shall not affect the validity and enforceability of the
                remaining clauses of the terms and conditions. Definitions:
              </p>
              <p className="privacyContent mt-3">
                “Agreement” means the Terms and Conditions (T&C) contained
                herein along with the Privacy Policy and Terms of Use including
                other T&C at other portals of Iktaraa under the Iktaraa brand
                name. It will also include references to this Agreement as and
                when amended, notated, supplemented, varied or replaced. “Site”
                means the Iktaraa online shopping platform owned and operated by
                Iktaraa, which provides a venue to the users of
                OnlineIktaraa.com to buy the products listed / displayed by the
                website either by Iktaraa or by any third party vendor.
              </p>
              <p className="privacyContent mt-3">
                “Vendor” / “seller” / “affiliates” shall mean the person or any
                legal entity who offers for sale, sells, puts for auction the
                products on the OnlineIktaraa.com / website.
              </p>
              <p className="privacyContent mt-3">
                “User/You” means and includes any Customer / Buyer / You (the
                person or any legal entity) who accept the offer for sale of the
                Vendor / Seller products, through “Iktaraa” by placing its order
                on this Site.
              </p>
              <p className="privacyContent mt-3">
                “Product/s” connotes the goods, services promoted / displayed on
                the Site and offered for any use / sale.
              </p>
              <div className="realatedProdHead mt-3 ">Acceptance:</div>
              <p className="privacyContent mt-3">
                By purchasing products and/or services from the site, you agree
                to be bound by and accept this Agreement. Orders are not binding
                upon Iktaraa until accepted by Iktaraa. We reserve the right to
                refuse service to anyone. Iktaraa will indicate its acceptance
                of an order by acknowledging your order by reply email and by
                shipping the ordered items to you.
              </p>
              <div className="realatedProdHead mt-3 ">Agreement:</div>
              <p className="privacyContent mt-3">
                The agreement between you and Iktaraa is subject to the
                following terms and conditions:
              </p>
              <p className="privacyContent mt-3">
                • The User certifies that he/she is at least 18 (eighteen) years
                of age or has the consent of a parent or legal guardian to make
                the purchase on Iktaraa.
              </p>
              <p className="privacyContent mt-3">
                • These terms and conditions supersede all previous
                representations, understandings, or agreements and shall prevail
                notwithstanding any variance with any other terms of any order
                submitted. By using the Shopping services of Iktaraa you agree
                to be bound by the Terms and Conditions.
              </p>
              <p className="privacyContent mt-3">
                • All prices, unless indicated otherwise are in Indian Rupees.
              </p>
              <p className="privacyContent mt-3">
                • By indicating User’s acceptance to purchase any product or
                service offered on the site, user is obligated to complete such
                transactions. Users shall prohibit from indicating its
                acceptance to purchase products and services where it does not
                intend to complete such transactions.
              </p>
              <p className="privacyContent mt-3">
                • Any order placed for a product that is listed at an incorrect
                price may be cancelled. This shall be regardless of whether the
                order has been confirmed and/or payment levied. In the event the
                payment has been processed, the same shall be credited to your
                account and duly notified to you by email.
              </p>
              <p className="privacyContent mt-3">
                • In a credit card transaction, you must use your own credit
                card. Iktaraa will not be liable for any credit card fraud. The
                liability to use a card fraudulently will be on the user and the
                onus to ‘prove otherwise’ shall be exclusively on the user.
              </p>
              <p className="privacyContent mt-3">
                • In the event that a non-delivery occurs on account of a
                mistake by you (i.e. wrong name or address) any extra cost
                towards re-delivery shall be claimed from the User placing the
                order.
              </p>
              <p className="privacyContent mt-3">
                • Shipment/delivery time of order processing starts from the day
                of receipt of the payment/COD(Cash on Delivery)confirmed against
                the order placed with Iktaraa.The Shipment /Delivery time is an
                approximate time mentioned by Iktaraa against each product.
                Iktaraa shall not be liable for any delay / non-delivery of
                purchased goods due to the Vendors, flood, fire, wars, acts of
                God or any cause that is beyond the control of Iktaraa.
              </p>
              <p className="privacyContent mt-3">
                • The User agrees to use the services provided by Iktaraa, its
                affiliates, consultants and contracted companies, for lawful
                purposes only.
              </p>
              <p className="privacyContent mt-3">
                • The User agrees to provide authentic and true information.
                Iktaraa reserves the right to confirm and validate the
                information and other details provided by the User at any point
                of time. If upon confirmation such User details are found not to
                be true (wholly or partly), Iktaraa has the right in its sole
                discretion to reject the registration and debar the User from
                using the Services available at this website, and / or other
                affiliated websites without prior intimation whatsoever.
              </p>
              <p className="privacyContent mt-3">
                • Iktaraa will not be responsible for any damage suffered by
                users from use of the products/ services on this site. This
                without limitation includes loss of revenue/data resulting from
                delays, non-deliveries, missed deliveries, or service
                interruptions as may occur because of any act / omission of the
                Iktaraa/vendor/supplier. This disclaimer of liability also
                applies to any damages or injury caused by any failure of
                performance, error, omission, interruption, deletion, defect,
                delay in operation or transmission, computer virus,
                communication line failure, theft or destruction or unauthorized
                access to, alteration of, or use of record, whether for breach
                of contract, tortuous behavior, negligence, or under any other
                cause of action. Cancellation, on user’s request, may not be
                allowed, subject to the specific terms and conditions applicable
                to the type of product or service purchased.
              </p>
              <p className="privacyContent mt-3">
                • All order/sub orders cancelled will be refunded as per the
                payment mode selected by customer except for COD/Cheque pay
                mode, where refund shall be processed via Pay
                order/Demand-draft/Cheque/NEFT.
              </p>
              <p className="privacyContent mt-3">
                • Delivery of orders would be done address specific not person
                specific.
              </p>
              <p className="privacyContent mt-3">
                • For reported defects on products with manufacturer’s warranty
                the customer needs to contact the relevant service center of the
                manufacturer, respectively. Iktaraa shall not be held
                responsible for any refund claim in such a case from the
                customer.
              </p>
              <p className="privacyContent mt-3">
                • Iktaraa reserves the right to cancel any order placed using
                Credit Card which holds International Billing Address.
              </p>
              <p className="privacyContent mt-3">
                • Octroi charges may be levied on some products displayed on the
                site .These charges are not refundable and shall be borne by the
                customer. In the event of cancellation of the order, the Octroi
                or any other charges levied shall not be refunded.
              </p>
              <p className="privacyContent mt-3">
                • We (Iktaraa) as a merchant shall be under no liability
                whatsoever in respect of any loss or damage arising directly or
                indirectly out of the decline of authorization for any
                Transaction, on Account of the Cardholder having exceeded the
                preset limit mutually agreed by us with our acquiring bank from
                time to time.
              </p>
              <div className="realatedProdHead mt-3 ">
                Typographical Errors and Product Description:
              </div>
              <p className="privacyContent mt-3">
                OnlineIktaraa.com and its affiliates attempt to be as accurate
                as possible. However, OnlineIktaraa.com makes no warranties that
                the product description and any other content of its site are
                accurate, complete, reliable, and current or error free. The
                product offered by OnlineIktaraa.com itself is not as described
                and its sole remedy is to return in its unused condition. In the
                event a product is listed at an incorrect price or with
                incorrect information due to typographical error or error in
                pricing or product information received from our suppliers,
                Iktaraa shall have the right to refuse or cancel any orders
                placed for product listed at the incorrect price. Iktaraa shall
                have the right to refuse or cancel any such orders whether or
                not the order has been confirmed and your credit card charged.
                If your credit card has already been charged for the purchase
                and your order is cancelled, Iktaraa shall issue a credit to
                your credit card account in the amount of the charge.
              </p>
              <div className="realatedProdHead mt-3 ">
                Prohibited Activities:
              </div>
              <p className="privacyContent mt-3">
                You shall not host, display, upload, modify, publish, transmit,
                update or share any information on the Site, that
              </p>
              <p className="privacyContent mt-3">
                • belongs to another person and to which you do not have any
                right to;
              </p>
              <p className="privacyContent mt-3">
                • is grossly harmful, harassing, blasphemous, defamatory,
                obscene, pornographic, pedophilic, libelous, invasive of
                another’s privacy, hateful, or racially, ethnically
                objectionable, disparaging, relating or encouraging money
                laundering or gambling, or otherwise unlawful in any manner
                whatever;
              </p>
              <p className="privacyContent mt-3">• Harm minors in any way;</p>
              <p className="privacyContent mt-3">
                • Infringes any patent, trademark, copyright or other
                proprietary rights;
              </p>
              <p className="privacyContent mt-3">
                • Violates any law for the time being in force;
              </p>
              <p className="privacyContent mt-3">
                • Deceives or misleads the addressee about the origin of such
                messages or communicates any information which is grossly
                offensive or menacing in nature;
              </p>
              <p className="privacyContent mt-3">
                • Impersonate another person;
              </p>
              <p className="privacyContent mt-3">
                • contains software viruses or any other computer code, files or
                programs designed to interrupt, destroy or limit the
                functionality of any computer resource;
              </p>
              <p className="privacyContent mt-3">
                • threatens the unity, integrity, defense, security or
                sovereignty of India, friendly relations with foreign states, or
                public order or causes incitement to the commission of any
                cognizable offence or prevents investigation of any offence or
                is insulting any other nation.
              </p>
              <p className="privacyContent mt-3">
                Any content uploaded by you shall be subject to relevant laws
                and may disabled, or and may be subject to investigation under
                appropriate laws. Furthermore, if you are found to be in
                non-compliance with the laws and regulations, these terms, or
                the privacy policy of the Site, we may terminate your
                account/block your access to the Site and we reserve the right
                to remove any non-compliant Content uploaded by you.
              </p>
              <div className="realatedProdHead mt-3 ">
                Shipping and Handling
              </div>
              <p className="privacyContent mt-3">
                We will arrange for shipment of the products to you. Shipping
                schedules are estimates only and cannot be guaranteed. We are
                not liable for any delays in the shipments. Title and risk of
                loss and damages pass on to you upon the products delivery to
                you. In case reverse shipment cannot be arranged by us due to
                unavailability of our logistics partners, then in that case you
                may be requested to send such products through any available
                courier services. All shipping charges are to be borne by the
                customer unless authorized with Free Shipping Services. For
                warranty claims or any after Sales service, the customer has to
                ship the product to the nearby service station and the cost of
                shipping needs to be borne by the customer. Please refer to
                shipping policy for all the details. Changes and Cancellation
              </p>
              <p className="privacyContent mt-3">
                Any item additions, quantity changes or specification changes
                made to accepted orders will be modified in the order details.
                All sales are final, provided, however, item cancellations and
                quantity reductions may be made before the order is shipped. We
                may, without liability, cancel any accepted order before
                shipment if our credit department does not approve your credit
                or if there are other problems with the payment mode selected by
                you.
              </p>
              <div className="realatedProdHead mt-3 ">
                License and Website Access
              </div>
              <p className="privacyContent mt-3">
                General: OnlineIktaraa.com grants you a limited license to
                access and make personal use of this website and not to download
                (other than page caching) or modify it, or any portion of it,
                except with express written consent of www.OnlineIktaraa.com.
              </p>
              <p className="privacyContent mt-3">
                No license for commercial sale: This license does not include
                any resale or commercial use of this website or its content; any
                collection and use of any product listing, description, or
                pricing; copying of account information for the benefit of
                another merchant; or any use of data mining, or similar data
                gathering and extraction tools.
              </p>
              <p className="privacyContent mt-3">
                No reproduction: This website or any portion of this website may
                not be reproduced, duplicated, copies, sold, visited, or
                otherwise exploited for any commercial purpose without express
                written consent of Iktaraa.com.
              </p>
              <p className="privacyContent mt-3">
                No framing: You may not frame or utilize framing technologies to
                enclose any trademark, logo, or other proprietary information
                (including images, text, page layout, or form) of
                OnlineIktaraa.com and its affiliates without the express written
                consent.
              </p>
              <p className="privacyContent mt-3">
                Metatags: You may not use any metatags or any other ‘hidden
                text’ utilizing OnlineIktaraa.com’s name or trademarks without
                the express written consent of OnlineIktaraa.com. Any
                unauthorized use terminates the permission or license granted by
                Iktaraa.com.
              </p>
              <div className="realatedProdHead mt-3 ">Your Account</div>
              <p className="privacyContent mt-3">
                Protection of Your Account: As discussed further in the
                website’s privacy policy, by using this website, you agree that
                you are responsible for maintaining the confidentiality of your
                account and password and for restricting access to your
                computer, and agree to accept responsibility for all activities
                that occur under your account or password. Use of the Iktaraa
                website is available only to persons who can form legally
                binding contracts under Indian Contract Act, 1872. Persons who
                are “incompetent to contract” within the meaning of the Indian
                Contract Act, 1872 including minors, un-discharged insolvents
                etc. are not eligible to use the Iktaraa website.
              </p>
              <p className="privacyContent mt-3">
                Use by Children: As discussed further in the website Privacy
                Policy, OnlineIktaraa.com does sell products for children, but
                it sells them to adults. If you are under age of 18 years, you
                may use OnlineIktaraa.com only with involvement of a parent or
                guardian. OnlineIktaraa.com and its affiliates reserve the right
                to refuse service, terminate accounts, remove or edit content,
                or cancel orders in their sole discretion. As a minor if you
                wish to purchase an item, such purchase may be made by your
                legal guardian or parents who have registered as users of the
                Iktaraa website or can use the Iktaraa website as a Guest User.
                Iktaraa reserves the right to terminate your registration and
                refuse to provide you with access to the Iktaraa website if it
                is brought to Iktaraa’s notice or if it is discovered that you
                are under the age of 18 years. Reviews, Comments,
                Communications, and other content
              </p>
              <p className="privacyContent mt-3">
                Nature of content: Visitors to OnlineIktaraa.com may post
                reviews, comments and other content; send e-cards and other
                communications; and submit suggestions, ideas, comments,
                questions or other information, as long as the content is not
                illegal, obscene, threatening, defamatory, invasive of privacy,
                infringing of intellectual property rights to otherwise injuries
                to third party or objectionable and does not consist of or
                contains software virus, political campaigning, commercial
                solicitation, mass mailing or any form of spam.
              </p>
              <p className="privacyContent mt-3">
                False information: You may not use false email address,
                impersonate any person or entity, or otherwise mislead as to the
                origin of a card or other content. OnlineIktaraa.com reserves
                the right (but not the obligation) to remove or edit such
                content but does not regularly review posted contents.
              </p>
              <p className="privacyContent mt-3">
                Rights Granted: If you do post content or submit material and
                unless we indicate otherwise, you grant OnlineIktaraa.com and
                its affiliates a non-exclusive, royalty free, perpetual,
                irrevocable, and fully sub-licensed right to use, reproduce,
                modify, adapt, publish, translate, create derivative work from,
                distribute, and display such content throughout the world in any
                media. You grant OnlineIktaraa.com and its affiliate sites and
                sub-license the right to use the name that you submit in
                connection with such content if OnlineIktaraa.com chooses. Right
                Owned: You represent and warrant that you own all the rights or
                otherwise or control all of the rights to the content that you
                post; that the content is accurate; that the use of the content
                to supply does not violate this policy and will not cause injury
                to any person or entity and that you will indemnify
                OnlineIktaraa.com or its affiliate for all claims resulting from
                the content you supply. OnlineIktaraa.com has the right but not
                the obligation to monitor and edit or remove any activity or
                content. OnlineIktaraa.com takes no responsibility and assumes
                no liability for any content posted by you or any third party.
                Risk of LossAll items purchased from OnlineIktaraa.com are made
                pursuant to the shipment contract. This means that the risk of
                loss and title for such item passes on to you upon the products
                delivery.
              </p>
              <div className="realatedProdHead mt-3 ">
                Site Policies, Modification, and Severability:
              </div>
              <p className="privacyContent mt-3">
                review our other policies. We reserve the right to make changes
                to our website, policies, and these Terms and Conditions at any
                time. If any of these conditions shall be deemed invalid, void,
                or for any reason unenforceable, that condition shall be deemed
                severable and will not affect the validity and enforceability of
                any remaining conditions.
              </p>
              <div className="realatedProdHead mt-3 ">
                Intellectual Property Rights:
              </div>
              <p className="privacyContent mt-3">
                Copyright Protection: All content included on this site, such as
                text, graphics, logos, button icons, audio clips, digital
                downloads, data compilations and software, is the property of
                Iktaraa.com or its affiliate sites and protected by the Indian
                Copyright law. The compilation of all the content on this site
                is the exclusive property if Iktaraa.com and protected by Indian
                Copyright law. All software used in this site is the property of
                Iktaraa.com and is protected under the Indian Copyright law.
              </p>
              <div className="realatedProdHead mt-3 ">Trademarks:</div>
              <p className="privacyContent mt-3">
                Protected Marks:, Iktaraa, www.OnlineIktaraa.com, products, and
                other marks indicated on the website are trademarks of Iktaraa
                Pvt. Ltd..
              </p>
              <p className="privacyContent mt-3">
                Protected Graphics: All OnlineIktaraa.com graphics, logos, page
                headers, button icons, scripts and service names are trademarks
                of OnlineIktaraa.com. OnlineIktaraa.com’s trademarks may not be
                used in connections with any product or service that is not of
                OnlineIktaraa.com. All other trademarks not owned by
                OnlineIktaraa.com or its affiliates that appear on
                OnlineIktaraa.com or its affiliate sites are the property of
                their respective owners, who may or may not be affiliated with,
                connected to, associated with OnlineIktaraa.com or its
                affiliates. Governing Law and Jurisdiction:
              </p>
              <p className="privacyContent mt-3">
                These terms and conditions will be construed only in accordance
                with the laws of India. In respect of all matters/disputes
                arising out of, in connection with or in relation to these terms
                and conditions or any other conditions on this website, only the
                competent Courts at Chennai, Tamilnadu shall have jurisdiction,
                to the exclusion of all other courts.
              </p>
              <div className="realatedProdHead mt-3 ">
                Disclaimer of warranties and limitation of liability:
              </div>
              <p className="privacyContent mt-3">
                Iktaraa has made this service available to use as a matter of
                convenience. Iktaraa expressly disclaims any claim or liability
                arising out of uploading of any obscene, vulgar or pornographic
                images, photograph or a picture or altering or distorting the
                images available under this service in an obscene, vulgar or
                pornographic manner. Iktaraa also disclaims all warranties,
                express or implied, including, but not limited to, implied
                warranties of merchantability and fitness for a particular
                purpose. Iktaraa does not warrant that this site, its servers,
                or e-mail sent from Iktaraa is free of viruses or other harmful
                components. Iktaraa will not be liable for any damages of any
                kind arising from the use of this site, including, but not
                limited to direct, indirect, incidental, punitive, and
                consequential damages.
              </p>
              <p className="privacyContent mt-3">
                The Service(s) of Iktaraa is provided on an “as is” basis
                without warranties of any kind, whether express or implied.
                Iktaraa does not represent or warrant maintaining the
                confidentiality of information; although Iktaraa’s current
                practice is to ensure reasonable efforts to maintain such
                confidentiality. It is also clearly understood by the User that
                all warranties and after sales services, implied or express,
                take place directly between the vendors and the
                User/buyer/customer and the terms of sale by the vendor Iktaraa
                does not endorse in anyway any advertisers/ contents of
                advertisers on its web pages or other communication.
              </p>
              <p className="privacyContent mt-3">
                Iktaraa will not be responsible for any damage suffered by Users
                from use of the services on this site. This without limitation
                includes loss of revenue/data resulting from delays,
                non-deliveries, missed deliveries, or service interruptions as
                may occur because of any act / omission of the vendor. This
                disclaimer of liability also applies to any damages or injury
                caused by any failure of performance, error, omission,
                interruption, deletion, defect, delay in operation or
                transmission, computer virus, communication line failure, theft
                or destruction or unauthorized access to, alteration of, or use
                of record, whether for breach of contract, tortuous behavior,
                negligence, or under any other cause of action.
              </p>
              <p className="privacyContent mt-3">
                Iktaraa assumes no liability whatsoever for any monetary or
                other damage suffered by you on account of: The delay, failure,
                interruption, or corruption of any data or other information
                transmitted in connection with use of the Website./
              </p>
              <p className="privacyContent mt-3">
                Any interruption or errors in the operation of the Website. You
                expressly understand and agree that Iktaraa shall not be liable
                for any direct, indirect, incidental, special, consequential or
                exemplary damages, including but not limited to, damages for
                loss of profits, goodwill, use, data or other intangible losses
                (even if Iktaraa has been advised of the possibility of such
                damages) Iktaraa therefore neither endorses nor offers any
                judgment or warranty and accepts no responsibility or liability
                for the authenticity/availability of any of the
                goods/services/or for any damage, loss or harm, direct or
                consequential or any violation of local or international laws
                that may be incurred by your visit and/or transaction/s on these
                sites. User agrees and acknowledges that User shall be solely
                responsible for User’s conduct and that Iktaraa reserves the
                right to terminate your rights to use the service immediately,
                notwithstanding penal provisions under the Indian cyber laws or
                any other allied laws enacted by the government of India or any
                other statutory, legislative or regulatory authority authorized
                in this regard from time to time. In no event shall Iktaraa, its
                affiliates, employees, agents, consultants, contracted companies
                be liable for any direct, indirect, punitive, incidental,
                special or consequential damages or for any damages whatsoever
                including, without limitation, damages for loss of use, data or
                profits, arising out of or in any way connected with the use or
                performance of the Iktaraa sites/services for interrupted
                communications, delay, lost data or lost profits arising out of
                or in connection with this agreement.
              </p>
              <p className="privacyContent mt-3">
                All prices, unless indicated otherwise are in Indian Rupees. The
                availability of products is subject to change without prior
                notice at the sole discretion of Iktaraa and orders can be
                cancelled if the product goes out of stock with the
                Vendor/Seller. Iktaraa reserves the right to refuse or cancel
                any order placed for a product that is listed at an incorrect
                price which may be higher or lower than published. This shall be
                regardless of whether the order has been confirmed and/or
                payment been levied via credit card or cheque or otherwise. In
                the event the payment has been processed by Iktaraa the refund
                amount shall be credited to your credit card account and duly
                notified to you by email or sent by cheque. In a credit/debit
                card transaction, you must use a credit /debit card that is
                issued in the name of the User. Iktaraa will not be liable for
                any credit/debit card fraud because of the card being used
                fraudulently. The liability to use a credit/debit card or a net
                banking transaction fraudulently will be on the User and the
                onus to ‘prove otherwise’ shall be exclusively on the User.
              </p>
              <p className="privacyContent mt-3">
                Any request for cancellation of orders once duly placed on the
                site, shall not be entertained.
              </p>
              <p className="privacyContent mt-3">
                In the event that a non-delivery occurs on account of a mistake
                by you (i.e. wrong name or address) any extra cost incurred by
                Iktaraa for re-delivery shall be claimed from the User placing
                the order.{' '}
              </p>
              <p className="privacyContent mt-3">
                All products are duly screened and assured by Iktaraa and its
                vendors to ensure that the products are of the standard,
                quality, composition, style or model that they represent and as
                displayed on Iktaraa on behalf of the
                vendor/merchant/affiliate/merchant. All and any additional
                information/description, etc. for a product that is
                displayed/showcased on Iktaraa is on behalf of the
                vendor/merchant/affiliate/manufacturer and is as provided to
                Iktaraa. Iktaraa does not take any responsibility for any
                incorrect or error in the display/showcase of such information.{' '}
              </p>
              <p className="privacyContent mt-3">
                Presently, the service(s) of Iktaraa are being offered free.
                However, Iktaraa reserves the right to charge a fee for any or
                such facilities or freight or handling charges or shipping
                charges or statutory taxes as per the terms of the buyer/seller.
                Iktaraa and its affiliates reserve the right to cancel orders
                for the product in their sole discretion for any reason which
                can include but not limited to, the product being out of stock,
                or for any other reason without intimation to the User.{' '}
              </p>

              <div className="realatedProdHead mt-3 ">Entire Agreement:</div>
              <p className="privacyContent mt-3">
                These Terms of Service constitute the entire agreement between
                the parties with respect to the subject matter hereof and
                supersedes and replaces all prior or contemporaneous
                understandings or agreements, written or oral, regarding such
                subject matter. The clauses as above shall survive the
                termination or expiry of this agreement. This electronic record
                is generated by a computer system and does not require any
                physical or digital signatures.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </main>
    </>
  );
};

export default TermsAndCondition;
export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api
    .getMetaData({ page: 'terms-and-conditions' })
    .then((res: any) => {
      if (res.error == 0 && res.status_code == 200) {
        return {
          title: res.data.meta_title || 'Terms And Conditions | Iktaraa',
          keywords: res.data.meta_keywords,
          description: res.data.meta_description,
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
