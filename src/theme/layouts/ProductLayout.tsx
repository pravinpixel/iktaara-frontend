import Footer from 'src/components/common/footer/Footer';
import Header from 'src/components/common/header/Header';
import { SiteInfoProvider } from 'src/context/SiteInfoContext';

import { Provider } from 'react-redux';
import store from 'src/redux/store';

export default function ProductLayout({ children }: any) {
  //const { store, props } = wrapper.useWrappedStore({});
  // const { siteInfo }: any = useSiteInfo();
  return (
    <Provider store={store}>
      <SiteInfoProvider>
        <Header />
        <div>{children}</div>
        <Footer />
      </SiteInfoProvider>
    </Provider>
  );
}
