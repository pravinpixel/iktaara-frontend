/* eslint-disable @typescript-eslint/no-use-before-define */
import Footer from '@/components/common/footer/Footer';
import HeaderBanner from '@/components/common/header/Banner';
import Header from '@/components/common/header/Header';
import { useSiteInfo } from '@/context/SiteInfoContext';
import { AllForms } from '@/lib/api/forms';
import { errorMessage } from '@/lib/helper';
import styles from '@/theme/styles/Home.module.css';
import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from 'src/lib/api/home';

const MetaTags = dynamic(() => import('@/components/common/header/MetaTags'));

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  location: Yup.string().required('Location is required'),
  pincode: Yup.number()
    .required('Pin code is required')
    .test('len', 'Max 10 allowed', (val: any) => {
      return val.toString().length <= 6 ? true : false;
    }),
  is_agree: Yup.boolean().required('Please agree').isTrue(),
});

const Perform = (props: any) => {
  const { meta } = props;
  // const { siteInfo }: any = useSiteInfo();
  // const siteName = siteInfo.site_name || 'IKTARAA';
  const router = useRouter();

  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };

  const formik: any = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: (values: any) => {
      values.is_agree = values.is_agree ? 1 : 0;
      values.customer_category = 'perform';
      handleLearnForm(values);
    },
  });
  const { handleSubmit } = formik;

  async function handleLearnForm(values: any) {
    try {
      const response: any = await AllForms(values);
      toast.success(response?.message);
      setTimeout(() => {
        router.reload();
      }, 2000);
    } catch (error) {
      errorMessage(error);
    }
  }

  return (
    <>
      <MetaTags meta={metaTags} />
      {/* <Head>
        <title> Perform | {siteName} </title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <main className={styles.main}>
        <Header />
        <main>
          <HeaderBanner />
          <div className="privacyPolicyContainer">
            <Row className="m-0 align-items-center">
              <Col md={6} className="p-3">
                <div className="heaingCtr mb-3">Perform</div>
                <div className="subHeadCtr mb-4">Dear Guest,</div>
                <p className="content">
                  We are building a Digital Platform that will empower you to
                  show-case your talent to the world. Join us for some feedback
                  and Critical assessment and help you talent reach the right
                  audience.
                </p>
                <p className="content mt-3">
                  If you are a music publisher, it will provide you a unique
                  opportunity to ‘Sell’ your content and get rewarded.
                </p>
                <p className="content mt-3">
                  Connect with us to understand how this will work and reach out
                  to musicians who need music to share the joy with the wider
                  world Register Yourself!
                </p>
              </Col>
              <Col md={6}>
                <div className="privacypolicyFormCtr">
                  <h2 className="mb-3 text-center">Get in touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={12} lg={6}>
                        <Form.Group controlId="name" className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            isInvalid={formik.errors.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                          />
                          {formik.errors.name ? (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.name}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col md={12} lg={6}>
                        <Form.Group controlId="email" className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            isInvalid={formik.errors.email}
                            placeholder="Enter email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />
                          {formik.errors.email ? (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.email}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col md={12} lg={6}>
                        <Form.Group controlId="location" className="mb-3">
                          <Form.Label>Location / City</Form.Label>
                          <Form.Control
                            type="text"
                            name="location"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.location}
                            isInvalid={formik.errors.location}
                            placeholder="Enter Location/City"
                          />
                          {formik.errors.location ? (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.location}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col md={12} lg={6}>
                        <Form.Group className="mb-3" controlId="pincode">
                          <Form.Label>Pin-code</Form.Label>
                          <Form.Control
                            value={formik.values.pincode}
                            isInvalid={formik.errors.pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="number"
                            placeholder="Enter Pincode"
                          />
                          {formik.errors.pincode ? (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.pincode}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group controlId="is-agree" className="mb-3">
                          <Form.Group controlId="is_agree" className="mb-3">
                            <Form.Check
                              name="is_agree"
                              onBlur={formik.handleBlur}
                              value={formik.values.is_agree}
                              isInvalid={formik.errors.is_agree}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  'is_agree',
                                  e.target.checked,
                                );
                              }}
                              type="checkbox"
                              label="I agree to receive further updates through mail. I understand that signing up here does not
                            guarantee any additional business for me."
                            />
                            {formik.errors.is_agree ? (
                              <Form.Control.Feedback type="invalid">
                                {formik.errors.is_agree}
                              </Form.Control.Feedback>
                            ) : null}
                          </Form.Group>
                        </Form.Group>
                      </Col>
                      <Col md={12} className="text-center">
                        <Button type="submit" className="sendMailBtn">
                          <i className="fa fa-envelope"></i>Send
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </main>
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const meta = await api.getMetaData({ page: 'perform' }).then((res: any) => {
    if (res.error == 0 && res.status_code == 200) {
      return {
        title: res?.data?.meta_title || 'Perform | Iktaraa',
        keywords: res?.data?.meta_keywords || '',
        description: res?.data?.meta_description || '',
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
export default Perform;
