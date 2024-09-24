import Link from 'next/link';
// import { Button } from 'react-bootstrap';

const HomeParallex = () => {
  return (
    <>
      <section id="grab-deals">
        <div className="parallax text-center ">
          <div className="container-fluid parallax-wrapper">
            <h2 className="parallax-title text-white">Grab the Deals</h2>
            <div className="parallax-desc">
              <p className="  text-white">
                Explore a Melody of Deals in Our Online Store to Support and
                Inspire the World of Music Community. Find Exceptional Offers
                and Discounts, and Join us in Celebrating the Joy of Music.
                {/* Discover a symphony of savings in our online store! We're
                bringing you a sensational sale that will make your music-loving
                heart skip a beat. Don't miss out on your chance to seize
                amazing discounts and rock-bottom prices on a wide range of
                instruments. Whether you're a beginner, a seasoned pro, or
                somewhere in between, our deals will strike a harmonious chord
                with you. */}
              </p>
              <Link href="/" className="text-center text-md-left">
                <span className="bg-white  text-black parallax-explore ">
                  Explore More
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeParallex;
