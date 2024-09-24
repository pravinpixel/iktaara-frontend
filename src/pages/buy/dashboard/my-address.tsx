/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import DashboardLayout from 'src/theme/layouts/DashboardLayout';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import { Image } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateAddress } from 'src/redux/user-slice';
import api from 'src/lib/api/user';
import { RootState } from 'src/redux/store';
import { toast } from 'react-toastify';
import ConfrimPopup from '@/components/dashboard/confrimPopup';

const MyAddress = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const { status } = useSession();
  const [loagged, setLoagged] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);

  const stateUser = useSelector((state: RootState) => state.user);

  const handlePopUp = () => {
    setPopup((state) => !state);
  };
  const handleEdit = (address_id: number) => {
    router.replace('/dashboard/address/' + address_id);
  };

  const handleDelete = (address_id: number) => {
    const postData = {
      address_id: address_id,
      customer_id: user.id,
    };
    api.deleteAddress(postData).then((res: any) => {
      if (res.error === 0) {
        dispatch(updateAddress(res.customer_address));
      }
    });
  };

  const handleMakeDefault = async (values: any) => {
    const body = {
      // ...values,
      customer_id: values.customer_id,
      address_id: values.id,
      is_default: values.is_default === false ? 0 : 1,
    };
    try {
      const response = await api.makeDefaultAddress(body);
      toast.success(response.message);
      api.getMe().then((res: any) => {
        setUser(res.customer_data);
        dispatch(addUser(res.customer_data));
        return res.customer_data;
      });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    if (loagged == false && status == 'authenticated') {
      api.getMe().then((res: any) => {
        setUser(res.customer_data);
        dispatch(addUser(res.customer_data));
        return res.customer_data;
      });
      setLoagged(true);
    }
  }, [loagged, status]);

  return (
    <>
      <DashboardLayout
        active={[
          {
            link: '/dashboard/my-address',
            string: 'Address',
          },
        ]}
      >
        <section className="outlet-child-1"></section>
        <section className="outlet-child-2">
          <section className="d-flex flex-column justify-content-center align-items-center  outlet-child-myaddresssection">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center  w-100 myprofile-top">
                <div className="d-flex align-items-center">
                  <img src="/icons/profile/address.png" alt="" />
                  <Link
                    href="/dashboard/my-address"
                    className="myprofile-para px-1"
                  >
                    My Address
                  </Link>
                </div>
                <div>
                  <Link
                    href="/dashboard/address/add-address"
                    className="myprofile-span"
                  >
                    {' '}
                    + Add New Address
                  </Link>
                </div>
              </div>

              <div className=" rounded d-flex align-items-center justify-content-center ">
                <div className="row form address-section container">
                  {stateUser.customer_address.length == 0 ? (
                    <span className="mb-4">No Address added Yet! </span>
                  ) : (
                    stateUser.customer_address.map(
                      (address: any, addressIndex: number) => {
                        return (
                          <Fragment key={addressIndex}>
                            <div className="d-flex w-100 align-items-center">
                              <div className="d-flex flex-wrap flex-md-row flex-column justify-content-between w-100 myprofile-top ">
                                <div className="myaddress-home mb-md-0 mb-2">
                                  <Image
                                    src="/icons/profile/home-page.png"
                                    alt="home-page"
                                  />
                                  {address.address_type_id == 8 ? (
                                    <span className="myaddress-home-icon">
                                      Office
                                    </span>
                                  ) : (
                                    <span className="myaddress-home-icon">
                                      Home
                                    </span>
                                  )}

                                  <p className="myaddress-usernamer">
                                    {address.first_name} {address.last_name}
                                    {/* {address.last_name} */}
                                  </p>
                                  <p className="myaddress-details">
                                    {address.address_line1}
                                    {address.address_line2 &&
                                      ', ' + address.address_line2}
                                    {', '}
                                  </p>
                                  <span className="myaddress-details">
                                    {address.city}
                                    {', '}
                                  </span>
                                  <p className="myaddress-details-location">
                                    {address.state} - {address.post_code}
                                  </p>
                                </div>
                                <div
                                  className={
                                    'd-flex flex-column align-items-center text-start text-white my-address-2  justify-content-center gap-2 ml-5  w-100'
                                  }
                                >
                                  <div className="d-flex flex-row flex-md-column w-100 gap-2 pt-4">
                                    <div
                                      className="d-flex gap-2 align-items-center  "
                                      onClick={() => {
                                        handleEdit(address.id);
                                      }}
                                    >
                                      <i className="fa fa-edit"></i>
                                      <p>Edit</p>
                                      {/* <div className="w-100 myprofile-top myaddress-edit order-options">
                                    <Link
                                      href={'#!'}
                                      className="order-options-child"
                                    >
                                      <Image
                                        src="/icons/profile/edit.png"
                                        alt=""
                                        className="order-options-child-icon"
                                      />
                                      <span
                                        className="order-options-child-span"
                                        onClick={() => {
                                          handleEdit(address.id);
                                        }}
                                      >
                                        Edit
                                      </span>
                                    </Link>
                                    <Link
                                      href={'#!'}
                                      className="order-options-child"
                                    >
                                      <Image
                                        src="/icons/profile/delete.png"
                                        alt=""
                                        className="order-options-child-icon"
                                      />
                                      <span
                                        className="order-options-child-span"
                                        onClick={() => {
                                          handleDelete(address.id);
                                        }}
                                      >
                                        Delete
                                      </span>
                                    </Link>
                                    <Link
                                      href={'#!'}
                                      className="order-options-child"
                                    >
                                      <Image
                                        src="/icons/profile/rectangle213.png"
                                        alt=""
                                        className="order-options-child-icon"
                                      />
                                      <span
                                        className="order-options-child-span"
                                        onClick={() => {
                                          handleMakeDefault(address.id);
                                        }}
                                      >
                                        Make this a default Address
                                      </span>
                                    </Link>
                                  </div> */}
                                    </div>

                                    <div
                                      className="d-flex gap-2 w-100 align-items-center"
                                      onClick={() => {
                                        handlePopUp();
                                        // handleDelete(address.id);
                                      }}
                                    >
                                      <i className="fa-solid fa-trash"></i>
                                      <p>Delete</p>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-2  w-100">
                                    <input
                                      id="makeDefalt"
                                      type="checkbox"
                                      checked={
                                        address.is_default === 0 ? false : true
                                      }
                                      onChange={() => {
                                        handleMakeDefault(address);
                                      }}
                                    />
                                    <label htmlFor="makeDefalt">
                                      Make this a default
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {popup && (
                              <ConfrimPopup
                                handlePopup={handlePopUp}
                                show={popup}
                                content={'Are you sure to delete the Address ?'}
                                title={'Delete Address'}
                                handleSubmit={() => {
                                  handleDelete(address.id);
                                  handlePopUp();
                                }}
                              />
                            )}
                            {addressIndex !==
                            stateUser?.customer_address?.length - 1 ? (
                              <hr className="myaddress-line-one" />
                            ) : (
                              <div className="mb-3"> </div>
                            )}
                          </Fragment>
                        );
                      },
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        </section>
      </DashboardLayout>
    </>
  );
};

export default MyAddress;
