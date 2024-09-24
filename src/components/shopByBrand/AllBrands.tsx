import React, { useState } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function AllBrands({ brandsAlpha }: any) {
  const [showText, setShowText] = useState(false);

  const handleToggleText = () => {
    setShowText(!showText);
  };

  // const brandsalphs = {
  //   A: [
  //     { id: 1, title: 'A1', image: '/images/homepage/parallax2-img6.png' },
  //     { id: 2, title: 'A2', image: '/images/homepage/parallax2-img6.png' },
  //     { id: 3, title: 'A1', image: '/images/homepage/parallax2-img6.png' },
  //     { id: 4, title: 'A2', image: '/images/homepage/parallax2-img6.png' },
  //   ],
  //   B: [
  //     { id: 1, title: 'B1', image: '/images/homepage/parallax2-img5.png' },
  //     { id: 2, title: 'B2', image: '/images/homepage/parallax2-img5.png' },
  //   ],
  //   C: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   D: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   E: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   F: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   G: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   H: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   I: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   J: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   K: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   L: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   M: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   N: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   O: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   P: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   Q: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   R: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   S: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   T: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   U: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   V: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   W: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   X: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   Y: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  //   Z: [
  //     { id: 1, title: 'C1', image: '/images/homepage/parallax2-img4.png' },
  //     { id: 2, title: 'C2', image: '/images/homepage/parallax2-img4.png' },
  //   ],
  // };

  return (
    <>
      {!showText && (
        <div className="text-center">
          <Button className="brands-button" onClick={handleToggleText}>
            VIEW ALL BRANDS
          </Button>
        </div>
      )}

      {showText && (
        <>
          <div className="shop-brands-view text-center">
            <h2>Our Large Inventory of Brands</h2>
          </div>
          <div className="brands-list-ftntion">
            <ul
              className="nav nav-tabs justify-content-center"
              id="myTab"
              role="tablist"
            >
              {brandsAlpha &&
                Object.keys(brandsAlpha).map((brandkey, i) => (
                  <li className="nav-item" role="presentation" key={i}>
                    <button
                      className={`nav-link ${brandkey == 'A' ? 'active' : ''}`}
                      id={`${brandkey}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${brandkey}`}
                      type="button"
                      role="tab"
                      aria-controls={`${brandkey}`}
                      aria-selected="true"
                    >
                      {brandkey}
                    </button>
                  </li>
                ))}
            </ul>
            <div className="tab-content" id="myTabContent">
              {brandsAlpha &&
                Object.entries(brandsAlpha).map((brnItems, i) => (
                  <div
                    className={`tab-pane fade ${
                      brnItems[0] == 'A' ? 'active show' : ''
                    } `}
                    id={brnItems[0]}
                    role="tabpanel"
                    aria-labelledby={`${brnItems[0]}-tab`}
                    key={i}
                  >
                    <div className="brands-intab">
                      <ul>
                        {Array.isArray(brnItems[1]) &&
                        brnItems[1].length > 0 ? (
                          brnItems[1].map((item: any) => (
                            <li key={item.id}>
                              <Link
                                key={item.id}
                                href={`/shopbybrand/${item.slug}`}
                              >
                                <Image
                                  className="brand-list-image"
                                  src={item.image}
                                  alt={item.title}
                                  height={150}
                                  width={150}
                                />
                                <span className="text-center">
                                  {item.title}
                                </span>
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li>No Brands Available</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="text-center">
            <Button className="brands-button" onClick={handleToggleText}>
              Show Less
            </Button>
          </div>
        </>
      )}
    </>
  );
}
