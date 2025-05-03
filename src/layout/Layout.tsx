import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="px-[16px] sm:px-[30px] lg:px-[120px]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
