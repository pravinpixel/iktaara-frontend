import React from 'react';
import { Modal } from 'react-bootstrap';

export interface OrderConfrimPopopProps {
  show: boolean | string | null;
  handlePopup?: any;
  handleSubmit?: any;
  title?: string;
  children: React.ReactNode;
}
const OrderConfrimPopup = ({
  show,
  handlePopup,
  title,
  children,
}: OrderConfrimPopopProps) => {
  return (
    <Modal
      show={show ? true : false}
      centered
      onHide={handlePopup}
      className="cancel-order-popup"
    >
      <Modal.Header closeButton>{title}</Modal.Header>
      {children}
    </Modal>
  );
};

export default OrderConfrimPopup;
