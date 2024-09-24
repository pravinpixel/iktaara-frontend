import Link from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
// import LoginLayout from '@/theme/layouts/LoginLayout';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import Head from 'next/head';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import api from 'src/lib/api/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
const LoginLayout = dynamic(() => import('@/theme/layouts/LoginLayout'));
const initialValues = { email: '' };

const formSchema = yup.object().shape({
  email: yup.string().email('E-Mail is invalid').required('E-Mail is required'),
});

const ForgetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<any>([]);
  const [errorshow, setErrorShow] = useState(false);

  const handleFormSubmit = (values: any) => {
    setMsg([]);
    setLoading(true);
    setErrorShow(false);
    api.forgetPassword(values).then((res: any) => {
      toast.error(res.message, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
        position: 'top-center',
      });
      router.push('/login');
    });
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

  return (
    <LoginLayout>
      <Head>
        <title>IKTARAA | Forgot Password</title>
      </Head>
      <div className="wrapper login">
        <Container>
          <Row className="justify-content-center pt-4">
            <Col className="col-md-5 col-sm-8 col-xs-12">
              <Card>
                <Card.Body>
                  <Alert show={errorshow} variant={'danger'}>
                    <ul className="error-list">
                      {msg.map((value: string, key: string) => {
                        return <li key={`error-${key}`}>{value}</li>;
                      })}
                    </ul>
                  </Alert>

                  <Typography
                    variant="h5"
                    align="center"
                    className="title my-3"
                  >
                    Forgot Password!
                    <span className="text-end">
                      <Link href="/">x</Link>
                    </span>
                  </Typography>

                  <form
                    className="form login-form mt-3"
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      id="email"
                      name="email"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      label="Email ID"
                      fullWidth
                      className="col-12 mb-3"
                      required
                      variant="outlined"
                      error={errors.email ? true : false}
                      helperText={errors.email}
                    />

                    <div className="mb-3 text-center">
                      <button
                        type="submit"
                        disabled={errors.email ? true : false}
                        className="btn btn-dark text-light"
                      >
                        {loading ? 'loading...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </LoginLayout>
  );
};

export default ForgetPassword;
