import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import clsx from 'clsx';

function Layout() {
  const { pathname } = useLocation();
  const isDetailPage = /^\/[0-9a-fA-F\-]{36}$/.test(pathname); // UUID 형식 감지

  const mainClass = clsx(
    'flex-1 bg-[#F9FAFA] mobile:bg-white tablet:px-[30px] desktop:px-[120px]',
    !isDetailPage && 'px-[16px]'
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={mainClass}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
