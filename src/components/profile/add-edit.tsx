import Link from 'next/link';
import React from 'react';
import { Image } from 'react-bootstrap';

// export interface AddEditAddressProps {
//   type?: string;
//   handleSubmit?: () => void;
// }

const AddEditAddress = () => {
  return (
    <>
      <section className="outlet-child-1"></section>
      <section className="outlet-child-2">
        <section className="d-flex flex-column align-items-center justify-content-center outlet-child-myaddresssection">
          <div>
            <div className="d-flex justify-content-between w-100 myprofile-top">
              <div>
                <Image
                  src="../assets//icons/profile/address.png"
                  alt="address"
                />
                <Link href="/dashboard/my-address" className="myprofile-para">
                  My Address
                </Link>
              </div>
              <div>
                <Link href={'/dashboard/address'} className="myprofile-span">
                  {' '}
                  + Add New Address
                </Link>
              </div>
            </div>

            <div className=" rounded d-flex align-items-center justify-content-center ">
              <div className="row form address-section container">
                <div className="d-flex w-100 align-items-center">
                  <div className="d-flex flex-wrap justify-content-between w-100 myprofile-top ">
                    <div className="myaddress-home">
                      <Image
                        src="../assets//icons/profile/home-page.png"
                        alt="home-page"
                      />
                      <span className="myaddress-home-icon">Home</span>
                      <p className="myaddress-usernamer">User Name</p>
                      <p className="myaddress-details">
                        Address 1,Main Address Street
                      </p>
                      <p className="myaddress-details-location">
                        Location-000000,State
                      </p>
                    </div>
                    <div>
                      <div className="w-100 myprofile-top myaddress-edit">
                        <a href="../profile/my-editaddress.html">
                          <Image
                            src="../assets//icons/profile/edit.png"
                            alt="edit"
                          />
                          <span className="myaddress-edit-icon">Edit</span>
                        </a>
                        <br />
                        <Image
                          src="../assets//icons/profile/delete.png"
                          alt="delete"
                        />
                        <span className="myaddress-span">Delete</span>
                        <br />
                        <Image
                          src="../assets//icons/profile/rectangle213.png"
                          alt="rectangle"
                        />
                        <span className="myaddress-default-span">
                          Make this a default Address
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="myaddress-line-one" />
                <div className="d-flex flex-wrap justify-content-between w-100 myprofile-top">
                  <div className="myaddress-home">
                    <Image
                      src="../assets//icons/profile/home-page.png"
                      alt="home-page"
                    />
                    <span className="myaddress-home-icon">Home</span>
                    <p className="myaddress-usernamer">User Name</p>
                    <p className="myaddress-details">
                      Address 1,Main Address Street
                    </p>
                    <p className="myaddress-details-location">
                      Location-000000,State
                    </p>
                  </div>
                  <div>
                    <div className="w-100 myprofile-top myaddress-edit">
                      <a href="../profile/my-editaddress.html">
                        <Image
                          src="../assets//icons/profile/edit.png"
                          alt="edit"
                        />
                        <span className="myaddress-edit-icon">Edit</span>{' '}
                      </a>
                      <br />
                      <Image
                        src="../assets//icons/profile/delete.png"
                        alt="Delete"
                      />
                      <span className="myaddress-span">Delete</span>
                      <br />
                      <Image
                        src="../assets//icons/profile/rectangle213.png"
                        alt="rectangle"
                      />
                      <span className="myaddress-default-span">
                        Make this a default Address
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default AddEditAddress;
