import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="px-[16px] tablet:px-[30px] desktop:px-[120px] bg-[#F9FAFA] mobile:bg-white">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
