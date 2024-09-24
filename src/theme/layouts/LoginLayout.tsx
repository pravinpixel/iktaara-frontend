import TopBar from 'src/components/common/header/TopBar';

export default function HomeLayout({ children }: any) {
  return (
    <>
      <TopBar />
      <div className="login-page">{children}</div>
    </>
  );
}
