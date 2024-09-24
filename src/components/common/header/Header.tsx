import { FC } from 'react';
import TopNavBar from '../navbar/TopNavBar';
import './Header.module.css';
import TopBar2 from './TopBar2';
import ResponsiveHeader from './ResponsiveHeader';

type HeaderProps = { isFixed?: boolean; className?: string; show?: boolean };

const Header: FC<HeaderProps> = ({ show = true }) => {
  return (
    <>
      {/* <TopBar /> */}

      <header className="header-area new-responsive-header">
        <ResponsiveHeader />
        {/* <Responsivesearch menus={menus} type={'fullwidth'} /> */}
        <TopBar2 />
        {show && <TopNavBar />}
      </header>
    </>
  );
};

export default Header;
