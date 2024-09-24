import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/lib/api/cart';
import DashboardLayout from 'src/theme/layouts/DashboardLayout';
import * as yup from 'yup';

const initialValues = { reason: '', comment: '' };

const formSchema = yup.object().shape({
  reason: yup.number().required('Please select reason for exchange'),
  comment: yup.string().required('Comments is required'),
});

const CancelOrders = () => {
  const router = useRouter();
  const item_id: any = router.query.productid;

  const { data: session } = useSession();
  const [singleOrder, setSingleOrder] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<any>([]);

  useEffect(() => {
    api.getExchangeReason().then((res: any) => {
      if (res?.status_code === 200) {
        setState(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (item_id) {
      api
        .getCancelOrderProduct({ item_id })
        .then((res) => {
          setSingleOrder(res.data);
        })
        .catch((err) => console.log(err, 'erro'));
    }
  }, [item_id]);

  const handleCancelOrder = (values: any) => {
    const { order_id, product_id, item_id } = singleOrder;
    const u = session as unknown as any;
    const user_id: number | null = u?.user?.user_id;
    const postData = {
      customer_id: user_id,
      order_id: order_id,
      product_id: product_id,
      item_id: item_id,
      reason_id: values.reason,
      reason: values.comment,
    };
    setLoading(true);
    api.exchangeOrder(postData).then((res: any) => {
      setLoading(false);
      if (res.error === 0) {
        toast.success(res.message);
        router.replace('/dashboard/my-orders');
      } else {
        toast.error(res.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'top-center',
        });
      }
    });
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    onSubmit: handleCancelOrder,
    initialValues,
    validationSchema: formSchema,
  });

  return (
    <DashboardLayout
      active={[
        {
          link: router.asPath,
          string: 'Exchange',
        },
      ]}
    >
      <div className="address-add">
        <section className="outlet-child-1"></section>
        <section className="outlet-child-2 w-100">
          <Card className="cancel-order-card">
            <Card.Header as="h5">Exchange product</Card.Header>
            <Card.Body>
              <form className="form" onSubmit={handleSubmit}>
                <Row className="cancel-order">
                  <Col
                    lg={12}
                    sm={12}
                    className="order-img-2 d-flex flex-column border-bottom mb-3"
                  >
                    <Row className="mb-3">
                      <Col md={4}>
                        <Image
                          src={singleOrder?.image}
                          alt={singleOrder?.product_name}
                          width={167}
                          height={134}
                        />
                      </Col>
                      <Col md={8}>
                        <p className="item-detail">
                          {singleOrder?.product_name}
                        </p>
                        <section className="d-flex flex-column">
                          {/* <p className="myorders-prodname">
                            Status - {singleOrder?.status}
                          </p> */}
                          <p className="myorders-quantity">
                            QTY:{singleOrder?.quantity}
                          </p>
                          <p className="myorders-price">
                            RS.{singleOrder?.price}/-
                          </p>
                        </section>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={12} sm={12}>
                    <Form.Group
                      as={Row}
                      className="mb-3 cancel-page"
                      controlId="reason"
                    >
                      <Form.Label column sm="12" lg="4">
                        Reason for Exchange Product
                      </Form.Label>
                      <Col sm={12} lg={8}>
                        {state.map((type: any) => (
                          <div
                            key={`default-${type.id}`}
                            className="mb-3 form-check d-flex align-items-center new-radio"
                          >
                            <input
                              type="radio"
                              name="reason"
                              value={type.id}
                              id={`default-${type.id}`}
                              onChange={handleChange}
                              className={errors.reason ? 'is-invalid' : ''}
                            />
                            <label className="form-check-label mx-2">
                              {type.name}
                            </label>
                          </div>
                        ))}
                        {!!errors.reason && (
                          <p className="text-danger Mui-error">
                            {errors.reason}
                          </p>
                        )}
                      </Col>
                      <Form.Label column sm="12" lg="4">
                        Comments
                      </Form.Label>
                      <Col sm={12} lg={8}>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="comment"
                          plaintext
                          className={
                            errors.comment
                              ? 'form-control input-label is-invalid'
                              : 'form-control input-label'
                          }
                          defaultValue={values.comment}
                          onChange={handleChange}
                        />
                        {!!errors.comment && (
                          <p className="text-danger Mui-error">
                            {errors.comment}
                          </p>
                        )}
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col md={12} className="d-flex justify-content-center mt-2">
                    <button
                      type="submit"
                      className="btn bg-buynow btn-block new-cart-button w-100"
                    >
                      {loading == false ? 'Exchange product' : 'Please wait...'}
                    </button>
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default CancelOrders;
