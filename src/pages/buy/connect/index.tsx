/* eslint-disable @typescript-eslint/no-use-before-define */
import Footer from '@/components/common/footer/Footer';
import HeaderBanner from '@/components/common/header/Banner';
import Header from '@/components/common/header/Header';
import { AllForms } from '@/lib/api/forms';
import { errorMessage } from '@/lib/helper';
import styles from '@/theme/styles/Home.module.css';
import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import api from 'src/lib/api/home';

const MetaTags = dynamic(() => import('@/components/common/header/MetaTags'));

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  mobile_no: Yup.string()
    .required('Phone number is required')
    .test('len', 'Max 10 allowed', (val: any) => {
      return val.toString().length <= 10 ? true : false;
    }),
  // .max(10, 'Please enter valid phone number'),
  location: Yup.string().required('Location is required'),
  is_agree: Yup.boolean().required('Please agree').isTrue(),
  description: Yup.string().required('Description is required'),
  pincode: Yup.number()
    .required('Pin code is required')
    .test('len', 'Max 6 allowed', (val: any) => {
      return val.toString().length <= 6 ? true : false;
    }),
});

const Connect = (props: any) => {
  // const { siteInfo }: any = useSiteInfo();
  // const siteName = siteInfo.site_name || 'IKTARAA';
  const { meta } = props;
  const router = useRouter();
  const formik: any = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: (values: any) => {
      values.is_agree = values.is_agree ? 1 : 0;
      values.customer_category = 'connect';
      handleLearnForm(values);
    },
  });
  const { handleSubmit } = formik;

  async function handleLearnForm(values: any) {
    try {
      await AllForms(values);
      setTimeout(() => {
        router.reload();
      }, 2000);
    } catch (error) {
      errorMessage(error);
    }
  }

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
        <main>
          <HeaderBanner />
          <div className="privacyPolicyContainer">
            <Row className="m-0 align-items-center">
              <Col md={6} className="p-3">
                <div className="heaingCtr mb-3">Connect</div>
                <div className="subHeadCtr mb-4">Dear Guest,</div>
                <p className="content">
                  We firmly believe that expanding digital outreach is the first
                  step towards the growth.
                </p>
                <p className="content mt-3">
                  If you are part of Music Industry Ecosystem, we will provide
                  you a platform to expand your horizons.
                </p>
                <p className="content mt-3">
                  If you are a budding artist, or an instrument repair
                  technician or someone who rent out Musical instruments or
                  Music studio / auditorium, we will get you connected to the
                  right clients who need your services.
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
                        <Form.Group className="mb-3" controlId="mobile_no">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mobile_no}
                            isInvalid={formik.errors.mobile_no}
                            type="number"
                            name="mobile_no"
                            placeholder="Enter Phone Number"
                          />
                          {formik.errors.mobile_no ? (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.mobile_no}
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
                      <Col md={12}>
                        <Form.Group className="mb-3" controlId="pincode">
                          <Form.Label>Pin-code</Form.Label>
                          <Form.Control
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.errors.pincode}
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
                      <Col md={12} className="mb-3">
                        <Form.Group controlId="description">
                          <Form.Label>
                            Description (Brief Details of your Interest)
                          </Form.Label>
                          <Form.Control
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.errors.description}
                            as="textarea"
                            rows={3}
                          />
                          {formik.errors.description ? (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.description}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col md={12}>
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
  const meta = await api.getMetaData({ page: 'connect' }).then((res: any) => {
    if (res.error == 0 && res.status_code == 200) {
      return {
        title: res?.data?.meta_title || 'Connect | Iktaraa',
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

export default Connect;
