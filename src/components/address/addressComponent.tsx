const AddressComponent = (props: any) => {
  const { handleBtnSubmit, buttonLabel, handleFormData, addressDetails } =
    props;

  return (
    <div
      className={`col-md-12 w-100 address-component`}
      onClick={() =>
        handleFormData({
          ...addressDetails,
        })
      }
    >
      <div className="d-flex align-items-center justify-content-between">
        {buttonLabel && (
          <button className="small-btn" onClick={handleBtnSubmit}>
            {buttonLabel}
          </button>
        )}
      </div>
      <div className="address-border">
        <div>
          <p>{addressDetails.name}</p>
          <p>
            {addressDetails.address_line1
              ? `${addressDetails.address_line1},`
              : ''}
            {addressDetails.state ? `${addressDetails.state},` : ''}
            {addressDetails.city ? `${addressDetails.city}` : ''}
          </p>
          <p>{addressDetails.post_code}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressComponent;
