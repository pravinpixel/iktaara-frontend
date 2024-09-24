import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import styles from '@/theme/styles/Home.module.css';
import { GetServerSideProps } from 'next';
import MetaTags from 'src/components/common/header/MetaTags';
import api from 'src/lib/api/home';

const PrivacyPolicy = (props: any) => {
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
              <h3>Privacy Policy</h3>
            </div>
            <div>
              <p className="privacyContent">
                Iktaraa respects the privacy of it’s users and is committed to
                protect it in all respects. This Privacy Policy provides
                succinctly the manner your data is collected and used by
                Iktaraa. You are advised to please read the Privacy Policy
                carefully. By accessing the services provided by Iktaraa you
                agree to the collection and use of your data by Iktaraa in the
                manner provided in this Privacy Policy.
              </p>
              <div className="realatedProdHead mt-3 ">We want you to</div>
              <p className="privacyContent mt-3">
                • feel comfortable using our website.
              </p>
              <p className="privacyContent mt-3">
                • feel secure and confident while submitting information to us.
              </p>
              <p className="privacyContent mt-3">
                • be aware that you may contact us with your questions or
                concerns about privacy on this site.
              </p>
              <p className="privacyContent mt-3">
                • know that by using our sites you are consenting to the
                collection of certain data.
              </p>
              <div className="realatedProdHead mt-3 ">
                What information is, or may be, collected from you?
              </div>
              <p className="privacyContent mt-3">
                We will automatically receive and collect certain anonymous
                information in standard usage logs through our Web server,
                including computer-identification information obtained from
                “cookies,” sent to your browser from a web server cookie stored
                on your hard drive an IP address, assigned to the computer which
                you use the domain server through which you access our service
                the type of computer you’re using the type of web browser you’re
                using{' '}
              </p>
            </div>
            <p className="privacyContent mt-3">
              We may collect the following personally identifiable information
              about you:
            </p>
            <p className="privacyContent mt-3">
              • Name including first and last name.
            </p>
            <p className="privacyContent mt-3">• Alternate email address.</p>
            <p className="privacyContent mt-3">
              • Mobile phone number and contact details.
            </p>
            <p className="privacyContent mt-3">• ZIP/Postal code.</p>
            <p className="privacyContent mt-3">
              • Financial information (like account or credit card numbers); and
            </p>
            <p className="privacyContent mt-3">
              • Opinions of features on our websites.
            </p>
            <p className="privacyContent mt-3">
              • Other information as per our registration process.
            </p>
            <p className="privacyContent mt-3">
              • Computer-identification information.
            </p>
            <p className="privacyContent mt-3">
              • IP address, assigned to the computer which you use.
            </p>
            <p className="privacyContent mt-3">
              • The domain server through which you access our service.
            </p>
            <p className="privacyContent mt-3">
              • The type of computer you’re using.
            </p>
            <p className="privacyContent mt-3">
              • The type of web browser you’re using.
            </p>
            <div className="realatedProdHead mt-3 ">
              We may also collect the following information:
            </div>
            <p className="privacyContent mt-3">
              • About the pages you visit/access.
            </p>
            <p className="privacyContent mt-3">
              • The links you click on our site.
            </p>
            <p className="privacyContent mt-3">
              • The number of times you access the page.
            </p>
            <p className="privacyContent mt-3">
              • The number of times you have shopped on our web site.
            </p>
            <p className="privacyContent mt-3">
              You may wish to terminate your account at any time. However, your
              information may remain stored in archive on our servers even after
              the deletion or the termination of your account.
            </p>
            <p className="privacyContent mt-3">
              Who collects the information? We will collect anonymous traffic
              information from you when you visit our site. We will collect
              personally identifiable information about you only as part of a
              voluntary registration process, on-line survey, or contest or any
              combination thereof. Our advertisers may collect anonymous traffic
              information from their own assigned cookies to your browser. The
              Site contains links to other Web sites. We are not responsible for
              the privacy practices of such Web sites which we do not own,
              manage or control.
            </p>
            <p className="privacyContent mt-3">
              How is the information used? We use your personal information to:
            </p>
            <p className="privacyContent mt-3">
              • Help us provide personalized features
            </p>
            <p className="privacyContent mt-3">
              • Tailor our sites to your interest
            </p>
            <p className="privacyContent mt-3">
              • To get in touch with you when necessary
            </p>
            <p className="privacyContent mt-3">
              • To provide the services requested by you
            </p>
            <p className="privacyContent mt-3">
              • To preserve social history as governed by existing law or policy
            </p>

            <p className="privacyContent mt-3">
              We use contact information internally to:
            </p>
            <p className="privacyContent mt-3">
              • direct our efforts for product improvement
            </p>
            <p className="privacyContent mt-3">
              • contact you as a survey respondent
            </p>
            <p className="privacyContent mt-3">
              • notify you if you win any contest; and
            </p>
            <p className="privacyContent mt-3">
              • send you promotional materials from our contest sponsors or
              advertisers
            </p>

            <p className="privacyContent mt-3">
              Generally, we use anonymous traffic information to:
            </p>
            <p className="privacyContent mt-3">
              • remind us of who you are in order to deliver to you a better and
              more personalized service from both an advertising and an
              editorial perspective;
            </p>
            <p className="privacyContent mt-3">
              • recognize your access privileges to our Websites
            </p>
            <p className="privacyContent mt-3">
              • track your entries in some of our promotions, sweepstakes and
              contests to indicate a player’s progress through the promotion and
              to track entries, submissions, and status in prize drawings
            </p>
            <p className="privacyContent mt-3">
              • make sure that you don’t see the same ad repeatedly
            </p>
            <p className="privacyContent mt-3">
              • help diagnose problems with our server
            </p>
            <p className="privacyContent mt-3">
              With whom will your information be shared? We will not use your
              financial information for any purpose other than to complete a
              transaction with you. We do not rent, sell or share your personal
              information and we will not disclose any of your personally
              identifiable information to third parties unless:
            </p>
            <p className="privacyContent mt-3">• we have your permission</p>
            <p className="privacyContent mt-3">
              • to provide products or services you’ve requested
            </p>
            <p className="privacyContent mt-3">
              • to help investigate, prevent or take action regarding unlawful
              and illegal activities, suspected fraud, potential threat to the
              safety or security of any person, violations of Iktaraa’s terms of
              use or to defend against legal claims
            </p>
            <p className="privacyContent mt-3">
              • Special circumstances such as compliance with subpoenas, court
              orders, requests/order, notices from legal authorities or law
              enforcement agencies requiring such disclosure
            </p>
            <p className="privacyContent mt-3">
              We share your information with advertisers on an aggregate basis
              only. What choices are available to you regarding collection, use
              and distribution of your information?
            </p>
            <p className="privacyContent mt-3">
              You may change your interests at any time and may opt-in or
              opt-out of any marketing / promotional / newsletters mailings.
              Iktaraa reserves the right to send you certain service related
              communication, considered to be a part of your Iktaraa account
              without offering you the facility to opt-out. You may update your
              information and change your account settings at any time.
            </p>
            <p className="privacyContent mt-3">
              Upon request, we will remove/block your personally identifiable
              information from our database, thereby canceling your
              registration. However, your information may remain stored in the
              archive on our servers even after the deletion or the termination
              of your account.
            </p>
            <p className="privacyContent mt-3">
              If we plan to use your personally identifiable information for any
              commercial purposes, we will notify you at the time we collect
              that information and allow you to opt-out of having your
              information used for those purposes. What security procedures are
              in place to protect information from loss, misuse or alteration?
            </p>
            <p className="privacyContent mt-3">
              To protect against the loss, misuse and alteration of the
              information under our control, we have in place appropriate
              physical, electronic and managerial procedures. For example, our
              servers are accessible only to authorized personnel and that your
              information is shared with respective personnel on need to know
              basis to complete the transaction and to provide the services
              requested by you. Although we will endeavor to safeguard the
              confidentiality of your personally identifiable information,
              transmissions made by means of the Internet cannot be made
              absolutely secure. By using this site, you agree that we will have
              no liability for disclosure of your information due to errors in
              transmission or unauthorized acts of third parties.
            </p>
            <div className="realatedProdHead mt-3 ">Opt-Out Policy</div>
            <p className="privacyContent mt-3">
              Please email support@iktaraa.in if you no longer wish to receive
              any information from us.
            </p>
            <div className="realatedProdHead mt-3 ">Policy updates</div>
            <p className="privacyContent mt-3">
              We reserve the right to change or update this policy at any time
              by placing a prominent notice on our site. Such changes shall be
              effective immediately upon posting to this site.
            </p>
          </div>
        </main>
        <Footer />
      </main>
    </>
  );
};

export default PrivacyPolicy;
export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api
    .getMetaData({ page: 'privacy-policy' })
    .then((res: any) => {
      if (res.error == 0 && res.status_code == 200) {
        return {
          title: res.data.meta_title || 'Privacy Policy | Iktaraa',
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
