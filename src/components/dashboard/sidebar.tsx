/* eslint-disable prettier/prettier */
import { Image } from 'react-bootstrap';
import Link from 'next/link';
// import { useAuth } from 'src/context/AuthContext';
import { signOut } from 'next-auth/react';
import { AuthConfig } from '../../configs/auth';
import { useRouter } from 'next/router';
// import { Tooltip } from '@mui/material';
// import { useSiteInfo } from '@/context/SiteInfoContext';

interface DashboardSidebarProps {
  active?: object[];
}

const DashboardSidebar = ({ active }: DashboardSidebarProps) => {
  // const
  const handleLogout = () => {
    signOut().then(() => {
      window.localStorage.removeItem(AuthConfig.tokenName);
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('UUID');
      window.location.replace('/buy');
    });
  };
  const router = useRouter();

  return (
    <>
      <main id="sidebar" className="sidebar">
        {/* Breadcrumbs Start */}
        <div>
          <nav aria-label="breadcrumb" className="d-flex">
            <ol className="breadcrumb ">
              <li className="breadcrumb-item">
                <Link href={'/'} className="d-flex gap-2 align-items-center">
                  <i className="fa fa-home"></i>
                  Home
                </Link>
              </li>
              {/* <Link href={'#!'} className="d-flex gap-2"> */}
              {/* <span> */}
              {active?.map((item: any, index: number) => {
                return (
                  <li className="breadcrumb-item" key={index}>
                    <Link href={item.link} className="">
                      <span>{item.string}</span>
                    </Link>
                  </li>
                );
              })}
              {/* </span> */}
              {/* </Link> */}
            </ol>
          </nav>
        </div>
        {/* Breadcrumbs End */}
        {/* Menu Bar Start */}
        <div className="new-sidebar-2">
          {/* <h5 className="profile-name">User Name</h5> */}
          <nav>
            <ul className="menu-bar d-flex flex-row flex-lg-column">
              <li>
                <Link
                  href={'/dashboard'}
                  className={
                    router.pathname == '/dashboard'
                      ? 'menu-bar-item active'
                      : 'menu-bar-item'
                  }
                >
                  <Image src="/profile/profile.png" alt="orders" />
                  <span className="text-nowrap">Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  href={'/dashboard/my-orders'}
                  className={
                    router.pathname == '/dashboard/my-orders'
                      ? 'menu-bar-item active'
                      : 'menu-bar-item'
                  }
                >
                  <Image src="/profile/orders.png" alt="orders" />
                  <span className="text-nowrap">My Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  href={'/dashboard/my-address'}
                  className={
                    router.pathname == '/dashboard/my-address'
                      ? 'menu-bar-item active'
                      : 'menu-bar-item'
                  }
                >
                  <Image src="/profile/address.png" alt="address" />
                  <span className="text-nowrap">My Address</span>
                </Link>
              </li>
              <li className="d-none d-lg-block" onClick={() => handleLogout()}>
                <Link
                  href={'#!'}
                  className="menu-bar-item"
                  // onClick={() => handleLogout()}
                >
                  <i
                    className="fa fa-sign-out d-flex align-items-center justify-content-center"
                    aria-hidden="true"
                  ></i>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Menu Bar End */}
      </main>
    </>
  );
};

export default DashboardSidebar;
