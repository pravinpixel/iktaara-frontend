import { Button, Col, Modal, Row } from 'react-bootstrap';

export interface ConfrimPopupProps {
  show: boolean;
  handlePopup?: any;
  handleSubmit?: () => void;
  content?: string;
  title?: string;
}

const ConfrimPopup = (props: ConfrimPopupProps) => {
  const { show, handleSubmit, handlePopup, content, title } = props;
  return (
    <Modal
      show={show}
      centered
      onHide={handlePopup}
      className="cancel-order-popup"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body as={Row} className="text-center cancel-order-popup-body">
        <Col md={12} className="return-title">
          {title}
        </Col>
        <Col md={12} className="cancel-content">
          {content}
        </Col>
        <Col
          md={12}
          className="w-100 d-flex justify-content-center cancel-content-footer"
        >
          <Button className="cancel-button-no" onClick={handlePopup}>
            No
          </Button>
          <Button className="cancel-button-yes" onClick={handleSubmit}>
            Yes
          </Button>
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default ConfrimPopup;
