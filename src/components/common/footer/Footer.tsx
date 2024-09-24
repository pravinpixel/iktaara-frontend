/* eslint-disable @typescript-eslint/no-use-before-define */
import api from '@/lib/api/home';
import { errorMessage } from '@/lib/helper';
import { Box, Container } from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import router from 'next/router';
import { Fragment, useRef } from 'react';
import { toast } from 'react-toastify';
import { useSiteInfo } from 'src/context/SiteInfoContext';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  email: yup.string().email('E-Mail is invalid').required('E-Mail is required'),
});

const Footer = () => {
  const { siteInfo, menus }: any = useSiteInfo();
  const emailRef = useRef<HTMLInputElement>(null);
  async function handleNewsLetterSignUp(values: any) {
    await api
      .signUpLetter(values)
      .then((res) => {
        if (res?.response?.data && res?.response?.data?.error == 1) {
          errorMessage(res.response.data);
          resetForm();
        } else {
          toast.success(res?.data?.message, {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
            position: 'top-center',
          });
          resetForm();
        }
      })
      .catch((err) => console.log(err, 'err'));
    // try {
    //   const email: any = emailRef.current?.value;
    //   const response = await api.signUpLetter(values);
    //   // toast.success(response.resmessage, {
    //   //   hideProgressBar: true,
    //   //   autoClose: 2000,
    //   //   type: 'success',
    //   //   position: 'top-center',
    //   // });
    //   resetForm();
    // } catch (error) {
    //   errorMessage(error);
    //   resetForm();
    // }
  }
  const initialValues: any = {
    email: '',
  };
  const { values, resetForm, handleChange, handleSubmit } = useFormik({
    onSubmit: handleNewsLetterSignUp,
    initialValues: initialValues,
    validationSchema: formSchema,
  });

  return (
    <>
      <section id="footer">
        <div className="footer">
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
          >
            <div className="row g-2 footer-new-change">
              <div className="col-lg-2 col-md-3 col-6">
                <p>Shop</p>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link href="/buy/category/guitars">Guitars</Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/buy/category/drums-and-percussions">
                      Drums
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/buy/category/piano-and-keyboards">Pianos</Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/buy/category/bows-and-strings">
                      Bow's and string's
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/buy/category/pro-audio">Pro Audio</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-lg-2 col-6">
                <p>Support</p>
                <ul className="list-group">
                  {/* <Link href={'/'}>
                  <li className="list-group-item">Order Information</li>
                </Link> */}
                  <li className="list-group-item">
                    <Link href={'/buy/return-cancel'}>
                      Return / Cancellation
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href={'/buy/privacy-policy'}>Privacy Policy</Link>
                  </li>
                  <li className="list-group-item">
                    <Link href={'/buy/terms-condition'}>
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href={'/buy/faq'}>FAQ</Link>
                  </li>
                  <li className="list-group-item">
                    <Link href={'https://blog.iktaraa.com/'} target="_blank">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 col-lg-2 col-sm-6 col-12">
                <p>About Us</p>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link href="/buy/who-is-iktaraa">Who is Iktaraa</Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/buy/about-us">About Iktaraa</Link>
                  </li>
                  {/* <Link href={'/team'}>
                  <li className="list-group-item">Team</li>
                </Link> */}
                  {/* <Link href={'/'}>
                  <li className="list-group-item">Our Mission</li>
                </Link> */}
                  <li className="list-group-item">
                    <Link href={'/buy/contact-us'}>Contact Us</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 col-lg-5 col-sm-6 col-12 footer-sign-up">
                <p>Sign Up for our Newsletter</p>
                {/* <p className="signup-desc">
                Stay tuned to the latest musical trends!
              </p> */}
                <ul className="list-group">
                  <li className="list-group-item">
                    Stay tuned to the latest musical trends
                  </li>
                </ul>
                <form onSubmit={handleSubmit} className="footer-sign-section">
                  <input
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={values.email}
                    ref={emailRef}
                    type="email"
                    placeholder="Enter Email ID"
                  />
                  <button type="submit">SignUp</button>
                </form>
              </div>
            </div>
          </Container>
          <hr className="footerline-item" />
          <Container
            maxWidth={'lg'}
            sx={{ maxWidth: { xl: '81% !important', lg: '81%' } }}
          >
            <div className="row g-2 ">
              <div className="new-design-div-footer">
                {menus?.map((data: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      onClick={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const path: any = {};
                        if (data.slug === 'shop-by-brand') {
                          // path.pathname = '/category/search';
                          // path.pathname = '/shopbybrand';
                          // path.query = {
                          //   brand: data.slug,
                          // };
                          path.pathname = '/buy';
                        } else {
                          path.pathname = '/buy/category/' + data.slug;
                        }
                        router.push(path);
                      }}
                      className="d-flex flex-wrap divider-style footer-pointer"
                    >
                      <span className="footer-menu-new">{data.name}</span>
                      {data.child?.map(
                        (child: any, childIndex: number, arr: any) => {
                          return (
                            <Fragment key={childIndex}>
                              <Box
                                className="d-flex align-items-center footer-pointer-new"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (data.slug === 'shop-by-brand') {
                                    // router.replace({
                                    //   pathname : '/category/search',
                                    //   query : {
                                    //     brand : child?.slug || null
                                    //   }
                                    // })
                                    router.replace(`/buy/brands/` + child.slug);
                                  } else {
                                    router.replace(
                                      `/buy/category/` +
                                        data.slug +
                                        '/' +
                                        child.slug,
                                    );
                                  }
                                }}
                              >
                                <span className="footer-category-child">
                                  {child.name}
                                </span>
                                {childIndex !== arr.length - 1 && '/'}
                              </Box>
                              {child.innerchild?.map(
                                (arr: any, ChildIndex: number) => {
                                  return (
                                    <div
                                      key={ChildIndex}
                                      className="d-flex align-items-center footer-pointer"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        router.replace(
                                          `/buy/category/` +
                                            data.slug +
                                            '/' +
                                            child.slug +
                                            '/' +
                                            arr.slug,
                                        );
                                      }}
                                    >
                                      <span className="footer-category-child">
                                        {arr.name}
                                      </span>
                                      <hr />
                                    </div>
                                  );
                                },
                              )}
                            </Fragment>
                          );
                        },
                      )}
                    </Box>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>

        <div className="footer-bottom bg-black">
          <div className="container ">
            <div className="col text-center text-light">
              <p className="copy-rights text-light">{siteInfo?.copyrights}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Footer;
