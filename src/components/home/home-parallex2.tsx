/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import api from 'src/lib/api/home';

type Brands = {
  title: string;
  description: string;
  brands: [];
};
const HomeParallex2 = () => {
  const [brands, setBrand] = useState<Brands | null>(null);
  // const router = useRouter();
  useEffect(() => {
    if (brands == null) {
      api.getBrands().then((res: any) => {
        if (res.status_code == 200) {
          setBrand(res.data);
        }
      });
    }
  }, [brands, setBrand]);

  return (
    <>
      <section id="grab-deals">
        <div className="parallax2 ">
          <div className="container-fluid">
            <Row className="paralexGrapCtr">
              <Col xs={6} md={12}>
                <div className="dealsContent">
                  <p className="parallax2-content ">{brands?.title}</p>
                  <p className="parallax2-subcontent">{brands?.description}</p>
                </div>
              </Col>
              <Col xs={6} md={12}>
                <Row className="gy-3 mt-0">
                  {brands?.brands.length == 0
                    ? ''
                    : brands?.brands.map((brand: any) => {
                        return (
                          <Col xs={6} sm={6} md={2} lg={2} key={brand.id}>
                            <Link
                              className="bg-light d-flex justify-content-center align-items-center"
                              role="button"
                              href={'/shopbybrand' + '/' + brand.slug}
                              // onClick={(e) => {
                              //   e.preventDefault();
                              //   // router.push('/brands/' + brand.slug);
                              //   router.push(
                              //     'category/search?brand=' + brand.slug,
                              //   );
                              // }}
                            >
                              <img
                                src={brand.brand_logo}
                                alt={brand.brand_name}
                                className="parallax2-brands-img1 w-100"
                              />
                            </Link>
                          </Col>
                        );
                      })}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeParallex2;
