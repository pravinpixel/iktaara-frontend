import { Image } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
export default function Payments() {
  return (
    <>
      <section className="placeorder mb-5" id="placeorder">
        <section className="d-flex flex-column justify-content-center align-items-center">
          <div className="container">
            <div className="row ">
              <div className="d-flex justify-content-center w-100 ">
                <div className="bg-imge ">
                  <Image src="/images/Checkmark.png" alt="Checkmark" />
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 bg-placeorderHead">
                <div>
                  <h3>Thank you John Deo,</h3>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 placeorderContent">
                <div>
                  <p>Your order # IKT0001 has been recieved</p>
                </div>
              </div>
              <div className="col-lg-12 ">
                <div className="d-flex mt-2  align-items-center justify-content-center  cg-box">
                  <div className="w-100 row">
                    <div className="cg-address col-lg-8 md-6 sm-12 xs-12 ">
                      <div className="flex-column mt-2">
                        <p>John Deo </p>
                        <p>Address 1,</p>
                        <p>Street, City, Pincode.</p>
                        <p>1234567890</p>
                      </div>
                    </div>
                    <div className=" col-lg-4 md-6 sm-12 xs-12 mt-2">
                      <div className="d-flex  justify-content-start align-items-center  gap-4 ">
                        <span className="payment ">Order Id</span>
                        <span className="date">IKTARAA-ORD-000300</span>
                      </div>
                      <div className="d-flex  justify-content-start align-items-center  gap-4 mt-1">
                        <span className="payment">Transaction Id</span>
                        <span className="dateid ">356076110865</span>
                      </div>
                      <div className="d-flex  justify-content-start align-items-center gap-4 mt-1">
                        <span className="payment">Delivery Expected</span>
                        <span className="date">12/05/2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="wrapper container-fluid placeorder">
              <div className="row justify-content">
                <div className="col-lg-12 bg-box">
                  <div className="d-flex container-fluid">
                    <div className="bg-order">
                      <h4>Order Summary</h4>
                      <div className="d-flex justify-content-between orderimg">
                        <Image src="/images/cartimg1.png" alt="" />
                        <div className="row">
                          <div className="lorem-order ">Lorem Ipsum</div>
                          <div className="ipsum-order">Lorem Ipsum</div>
                          <div className="qty-order">QTY : 1</div>
                        </div>
                      </div>
                      
                    </div>
                    <div className='total'>
                      <div className="d-flex justify-content-between ">
                        <span className="bgsubtotal">Sub Total </span>
                        <span className="bgtotal-amount">
                        8000
                        </span>
                      </div>
                      <div className="d-flex justify-content-between  mt-3">
                        <span className="bgsubtotal">Shipping</span>
                        <span className="bgtotal-amount">
                        00000
                        </span>
                      </div>
                      <div className="d-flex justify-content-between  mt-3">
                        <span className="bgsubtotal">Taxes</span>
                        <span className="bgtotal-amount">
                        00000
                        </span>
                      </div>
                      <div className="d-flex justify-content-between  mt-3">
                        <span className="bgtotal">Total</span>
                        <span className="bgtotal-amount">
                        8000
                        </span>
                      </div>
                  <div>
                    </div>
                   
                  </div>
                  
             
                </div>
              </div>
            </div>
            </div> */}
              <div className="d-flex flex-column placeorder-button p-4 align-items-center">
                <div className="d-flex justify-content-center w-100 placeorderview mt-5">
                  <p>View more detailed information about your orders</p>
                </div>
                <div className="col-lg-4 mt-3">
                  <button className="btn bg-Continue  btn-block new-cart-button">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
