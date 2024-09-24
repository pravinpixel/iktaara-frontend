// import AddressComponent from '@/components/address/addressComponent';
import React from 'react';
// import api from '@/lib/api/user';
import { Modal } from 'react-bootstrap';
// import ShippingAddress from '@/components/address/shipping-address';

const AddressPopup = (props: any) => {
  const { open, title, handlePopup, handleFormData, address } = props;

  return (
    <div>
      <Modal centered show={open} onHide={handlePopup}>
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          {address.length == 0
            ? ''
            : address?.map((singleAddress: any, addressIndex: number) => {
                return (
                  <div
                    className={`col-md-12 w-100 address-component`}
                    onClick={() => handleFormData(singleAddress)}
                    key={addressIndex}
                  >
                    <div className="address-border">
                      <div>
                        <p>{singleAddress.first_name}</p>
                        <p>
                          {singleAddress.address_line1
                            ? `${singleAddress.address_line1},`
                            : ''}
                        </p>
                        <p>
                          {singleAddress.state ? `${singleAddress.state},` : ''}
                          {singleAddress.city ? `${singleAddress.city}` : ''}
                        </p>
                        <p>{singleAddress.post_code}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddressPopup;
