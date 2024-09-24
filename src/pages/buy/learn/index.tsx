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
import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
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
  location: Yup.string().required('Location is required'),
  customer_designation: Yup.string().required(
    'Customer designation is required',
  ),
  is_agree: Yup.boolean().required('Please agree'),
  pincode: Yup.number().required('Pin code is required'),
});

const Learn = (props: any) => {
  const { meta } = props;
  const router = useRouter();
  // const { siteInfo }: any = useSiteInfo();
  // const siteName = siteInfo.site_name || 'IKTARAA';
  const formik: any = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: (values: any) => {
      values.is_agree = values.is_agree ? 1 : 0;
      values.customer_category = 'learn';
      handleLearnForm(values);
    },
  });

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

  const metaTags = {
    title: meta.title,
    keywords: meta.keywords,
    description: meta.description,
    image: meta.image,
  };
  return (
    <>
      <MetaTags meta={metaTags} />
      {/* <Head>
        <title> Learn | {siteName} </title>
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
                <div className="heaingCtr mb-3">Learn</div>
                <div className="subHeadCtr mb-4">Dear Guest,</div>
                <p className="content">
                  We are in the process of launching a Digital Platform
                  specifically designed for Music Education Industry. It will
                  enable the learner to connect with a teacher close to their
                  neighbourhood who adopts a standard and approach to music
                  teaching of the highest standards and integrates modern
                  approach with traditional values.
                </p>
                <p className="content mt-3">
                  If you are teacher, you can register yourself or your school
                  to offer your services and share your knowledge with students
                  and connect with peers to know on the current trends in Music
                  education and also understand a bouquet of services offered by
                  us to help you grow yourself and your business.
                </p>
              </Col>
              <Col md={6}>
                <div className="privacypolicyFormCtr">
                  <h2 className="mb-3 text-center">Get in touch</h2>
                  <form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Form.Group
                        as={Col}
                        md={12}
                        lg={6}
                        className="mb-3"
                        controlId="name"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          isInvalid={formik.errors.name}
                          name="name"
                          placeholder="Enter Name"
                        />
                        {formik.errors.name ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md={12}
                        lg={6}
                        className="mb-3"
                        controlId="email"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          isInvalid={formik.errors.email}
                          // isInvalid={formik.errors.email}
                          name="email"
                          type="email"
                          placeholder="Enter email"
                        />
                        {formik.errors.email ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md={12}
                        lg={6}
                        className="mb-3"
                        controlId="mobile_no"
                      >
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
                      <Form.Group
                        as={Col}
                        md={12}
                        lg={6}
                        className="mb-3"
                        controlId="location"
                      >
                        <Form.Label>Location / City</Form.Label>
                        <Form.Control
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.location}
                          isInvalid={formik.errors.location}
                          name="location"
                          type="text"
                          placeholder="Enter Location/City"
                        />
                        {formik.errors.location ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.location}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md={12}
                        lg={6}
                        className="mb-3"
                        controlId="pincode"
                      >
                        <Form.Label>Pin-code</Form.Label>
                        <Form.Control
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.pincode}
                          isInvalid={formik.errors.pincode}
                          name="pincode"
                          type="number"
                          placeholder="Enter Pincode"
                        />
                        {formik.errors.pincode ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.pincode}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group
                        controlId="customer_designation"
                        as={Col}
                        md={12}
                        lg={6}
                        key={`inline-${'radio'}`}
                        className="mb-3"
                      >
                        <p className="mb-2 text-black">I am a</p>
                        <Form.Check
                          inline
                          label="Teacher"
                          isInvalid={formik.errors.customer_designation}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={'teacher'}
                          name="customer_designation"
                          type={'radio'}
                          id={`inline-${'radio'}-1`}
                        />
                        <Form.Check
                          inline
                          label="Student"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.errors.customer_designation}
                          name="customer_designation"
                          type={'radio'}
                          value={'student'}
                          id={`inline-${'radio'}-2`}
                        />
                        {formik.errors.customer_designation &&
                        formik.touched.customer_designation ? (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.customer_designation}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md={12}
                        className="mb-3"
                        controlId="is_agree"
                      >
                        <Form.Check
                          onChange={(e) => {
                            formik.setFieldValue('is_agree', e.target.checked);
                          }}
                          onBlur={formik.handleBlur}
                          value={formik.values.is_agree}
                          isInvalid={formik.errors.is_agree}
                          name="is_agree"
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
  const meta = await api.getMetaData({ page: 'learn' }).then((res: any) => {
    console.log(meta, 'meta');
    if (res.error == 0 && res.status_code == 200) {
      return {
        title: res?.data?.meta_title || ' Learn | Iktaraa',
        keywords: res?.data?.meta_keywords || '',
        description: res?.data?.meta_description || '',
        image:
          res?.data?.logo || res?.data?.meta_image || '/public/images/logo.svg',
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

export default Learn;
