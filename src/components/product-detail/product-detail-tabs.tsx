import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import YoutubeEmbed from '../common/youtube-embed';
import ProductAttributes from './product-attributes';
import { Image } from 'react-bootstrap';
import { Fragment, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Rating,
} from '@mui/material';
import { default as dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
const ProductDetailTab = (product: any) => {
  const attributes: any = product.product?.attributes || null;
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleAccordionToggle = () => {
    setExpanded(!expanded); // Toggle the state
  };

  return (
    <div className="row">
      <div className="col-12">
        {/* <Tabs
          defaultActiveKey="about"
          id="justify-tab-example"
          className="my-3 productDetailsTab"
          justify
        > */}
        {/* <Tab eventKey="about" title="About Product"> */}
        {/* <Row className="align-top product-detailsHead">
          <Col lg={6}>
            {product?.product?.specification == '' ? (
              <span className="m-2 text-center">No data</span>
            ) : (
              <>
                {product?.product?.feature_information ||
                product?.product?.technical_information ? (
                  <>
                  
                    <p className="product-description-title">
                      Product Description
                    </p>
                  </>
                ) : (
                  <span>NO DATA AVAILABLE</span>
                )}

                <div
                  className="paragraph-Ctr mb-2"
                  dangerouslySetInnerHTML={{
                    __html: product?.product?.specification,
                  }}
                ></div>
                <div
                  className="paragraph-Ctr mb-2"
                  dangerouslySetInnerHTML={{
                    __html: product?.product?.technical_information,
                  }}
                ></div>
                <div
                  className="paragraph-Ctr mb-2"
                  dangerouslySetInnerHTML={{
                    __html: product?.product?.feature_information,
                  }}
                ></div>
              </>
            )}
          </Col>
        </Row> */}
        {/* </Tab> */}
        {/* <Tab eventKey="sepecification" title="Product Specifications"> */}

        {attributes?.length > 0 ? (
          <Box sx={{ marginBottom: '40px' }} className="collapse-table">
            <Accordion expanded={expanded} onChange={handleAccordionToggle}>
              <AccordionSummary
                // expandIcon={<AddIcon />}
                expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
                aria-controls={`panel-${attributes.id}-content`}
                id={`panel-${attributes.id}-header`}
                style={{
                  backgroundColor: '#d4d9df',
                  paddingBlock: '0px',
                  height: '64px',
                }}
              >
                {' '}
                <p className="product-specification-title1">
                  Product Specifications
                </p>
              </AccordionSummary>
              <AccordionDetails>
                <Table bordered>
                  <tbody className="table-borderline">
                    {/* <Box className="collapse-table" sx={{ marginBottom: '40px' }}> */}
                    {attributes.map((attribute: any, index: number) => (
                      <Fragment key={attribute.id}>
                        <ProductAttributes attributes={attribute} key={index} />
                      </Fragment>
                    ))}
                    {/* </Box> */}
                  </tbody>
                </Table>
              </AccordionDetails>
            </Accordion>
          </Box>
        ) : (
          ''
        )}

        {/* </Tab> */}
        {product?.product?.videolinks.length >= 1 && (
          // <Tab eventKey="audio-video" title="Audio & Video">
          <Row className="align-items-center product-detailsHead">
            <Col md={12} className="you-tube-videos">
              {product?.product?.videolinks.map((video: any) => {
                return (
                  <Fragment key={video.id}>
                    <YoutubeEmbed url={video.url} key={video.id} />;
                  </Fragment>
                );
              })}
            </Col>
          </Row>
        )}

        {/*<Tab eventKey="reviews" title="Reviews">
              <Row className="align-items-center product-detailsHead">
                <Col md={8}>
                  <p className="paragraph-Ctr mb-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <p className="paragraph-Ctr mb-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book.Lorem Ipsum is simply dummy text
                    of the printing and typesetting industry. Lorem Ipsum has
                    been the industry's standard dummy text ever since the
                    1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book.
                  </p>
                </Col>
                <Col md={4} className="text-center">
                  <Image src={product?.image} className='lazy img-fluid' alt={product?.product_name} />
                </Col>
                  </Row> 
            </Tab>*/}
        {product?.product?.reviews?.length > 0 && (
          // <Tab eventKey="reviews" title="Reviews">
          <Row className="align-items-center product-detailsHead">
            <Col md={8}>
              {product?.product?.reviews?.map((review: any) => {
                return (
                  <Fragment key={review.id}>
                    <p className="paragraph-Ctr mb-2 d-flex align-items-end gap-2">
                      {review.first_name} {review.last_name}{' '}
                      <span className="time-ago">
                        {dayjs(review.updated_at).fromNow()}
                      </span>
                    </p>
                    <p>
                      <Rating value={review.star} className="p-none star-new" />
                    </p>
                    <p className="paragraph-Ctr mb-2">{review.comments} </p>
                    <Divider />
                  </Fragment>
                );
              })}
            </Col>
            <Col md={4} className="text-center">
              <Image
                src={product?.image}
                className="lazy img-fluid"
                alt={'product'}
              />
            </Col>
          </Row>
        )}
        {/* </Tabs> */}
      </div>
    </div>
  );
};

export default ProductDetailTab;
