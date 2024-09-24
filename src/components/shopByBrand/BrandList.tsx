import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function BrandList({ brands }: any) {
  // const brands1 = [
  //   {
  //     id: 1,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'a',
  //   },
  //   {
  //     id: 2,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  //   {
  //     id: 3,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  //   {
  //     id: 4,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  //   {
  //     id: 5,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  //   {
  //     id: 6,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  //   {
  //     id: 7,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  //   {
  //     id: 8,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  //   {
  //     id: 9,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  //   {
  //     id: 10,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  //   {
  //     id: 11,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  //   {
  //     id: 12,
  //     image: '/images/homepage/parallax2-img6.png',
  //     title: 'b',
  //   },
  // ];
  const array = brands.slice(0, 12);
  return (
    <>
      <div className="brands-list1 ">
        <div className="brands-list">
          <div className="brands-shots">
            <ul>
              {array.map((item: any) => (
                <li key={item.id}>
                  <Link key={item.id} href={`/shopbybrand/${item.slug}`}>
                    <Image
                      className="brand-list-image"
                      src={item.brand_logo}
                      alt={item.brand_name}
                      height={180}
                      width={180}
                    />
                    <span className="text-center">{item.brand_name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
