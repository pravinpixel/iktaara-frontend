import Footer from 'src/components/common/footer/Footer';
import Header from 'src/components/common/header/Header';
import { SiteInfoProvider } from 'src/context/SiteInfoContext';

import { Provider } from 'react-redux';
import store from 'src/redux/store';
import DashboardSidebar from 'src/components/dashboard/sidebar';

export default function DashboardLayout({ children, active = [] }: any) {
  return (
    <Provider store={store}>
      <SiteInfoProvider>
        <Header />
        <div className="wrapper container-fluid p-3 my-profile-layout d-flex flex-column">
          <div className="d-flex flex-column flex-lg-row">
            <DashboardSidebar active={active} />
            <main className="outlet">{children}</main>
          </div>
        </div>
        <Footer />
      </SiteInfoProvider>
    </Provider>
  );
}
