import { Modal } from 'react-bootstrap';

const CCavenuePopup = (props: any) => {
  const { url, handleClose } = props;

  return (
    <>
      <Modal centered show={true} onHide={handleClose}>
        <Modal.Header closeButton>Process</Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          <iframe
            width={450}
            height={550}
            srcDoc={url}
            scrolling="No"
            frameBorder="0"
          ></iframe>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default CCavenuePopup;
