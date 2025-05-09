import { Menu, X } from 'lucide-react';
import Logo from '/public/logo.svg';
import Status from '@/assets/Status_Icons.svg';
import Profile from '@/assets/profile.svg';
import clsx from 'clsx';
import { useHeader } from '@/hooks/useHeader';
import { User } from '@/store/useAuthStore';

// StatusBar 컴포넌트
const StatusBar = () => (
  <div className="mobile:block tablet:hidden desktop:hidden h-[50px] w-full px-4">
    <div className="h-full flex items-center">
      <span className="text-lg">9:40</span>
      <div className="flex-1 flex justify-center">
        <div className="w-5 h-5 rounded-full bg-black" />
      </div>
      <img src={Status} className="w-12 h-12" alt="Status Icons" />
    </div>
  </div>
);

interface SlideMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  isLoggedIn: boolean;
  user: User | null;
  handleLoginClick: () => void;
  handleLogout: () => void;
  handleLanding: () => void;
}

// SlideMenu 컴포넌트
const SlideMenu = ({
  isOpen,
  toggleMenu,
  isLoggedIn,
  user,
  handleLoginClick,
  handleLogout,
  handleLanding,
}: SlideMenuProps) => (
  <div
    className={clsx(
      'fixed top-0 left-0 h-full w-[80%] bg-white transform transition-transform duration-300 ease-in-out z-50',
      'mobile:block tablet:hidden desktop:hidden',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    )}
  >
    <div className="px-4">
      <div className="flex flex-col">
        <div className="flex justify-end items-center pt-10 pb-4">
          <button className="cursor-pointer" onClick={toggleMenu}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-3 border-b-2 border-gray-200 py-4">
          {!isLoggedIn ? (
            <div className="w-5 h-5 rounded-full bg-gray-500" />
          ) : user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="프로필 이미지"
              className="w-5 h-5 rounded-full"
            />
          ) : (
            <img
              src={Profile}
              alt="기본 프로필 이미지"
              className="w-5 h-5 rounded-full"
            />
          )}
          <h2 className="text-lg font-bold">
            {isLoggedIn && user
              ? user.nickname || '사용자'
              : '로그인을 해주세요'}
          </h2>
        </div>
      </div>
    </div>
    <div className="px-4 pt-4">
      <ul className="space-y-4 text-base">
        <li
          className="cursor-pointer"
          onClick={isLoggedIn ? handleLogout : handleLoginClick}
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
        </li>
        <li className="cursor-pointer" onClick={handleLanding}>
          커뮤니티
        </li>
      </ul>
    </div>
  </div>
);

function Header() {
  const {
    isOpen,
    isDropdown,
    isHome,
    isLogin,
    isMobileHeaderVisible,
    isLoggedIn,
    user,
    toggleMenu,
    toggleDropdown,
    handleLogoClick,
    handleLoginClick,
    handleLogout,
    handleLanding,
  } = useHeader();

  return (
    <header className="bg-white w-full">
      <StatusBar />
      <div
        className={clsx(
          'w-full px-[16px] tablet:px-[30px] desktop:px-[120px]',
          'tablet:h-20 desktop:h-20',
          {
            'mobile:h-[50px]': isMobileHeaderVisible,
            'mobile:h-0': !isMobileHeaderVisible,
          }
        )}
      >
        <div className="h-full flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={Logo}
              className={clsx(
                'h-10 w-16 cursor-pointer',
                'mobile:hidden tablet:block desktop:block'
              )}
              alt="Daggle Logo"
              onClick={handleLogoClick}
            />
            {(isHome || isLogin) && (
              <button
                className="cursor-pointer mobile:block tablet:hidden desktop:hidden"
                onClick={toggleMenu}
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>

          {isLoggedIn ? (
            <div className="relative">
              <img
                src={Profile}
                alt="profile logo"
                className="w-6 h-6 cursor-pointer mobile:hidden"
                onClick={toggleDropdown}
              />
              {isDropdown && (
                <div className="absolute top-8 right-0 w-48 mobile:w-32 bg-white shadow-md rounded-md p-2 z-50">
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={Profile}
                      alt="profile"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-medium">
                      {user?.nickname || '사용자'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p
              className={clsx(
                'text-lg font-semibold cursor-pointer',
                'mobile:hidden tablet:block desktop:block'
              )}
              onClick={handleLoginClick}
            >
              로그인
            </p>
          )}
        </div>
      </div>

      {(isHome || isLogin) && (
        <>
          <SlideMenu
            isOpen={isOpen}
            toggleMenu={toggleMenu}
            isLoggedIn={isLoggedIn}
            user={user}
            handleLoginClick={handleLoginClick}
            handleLogout={handleLogout}
            handleLanding={handleLanding}
          />
          {isOpen && (
            <div
              className={clsx(
                'fixed inset-0 bg-[#424242] z-40',
                'mobile:block tablet:hidden desktop:hidden'
              )}
              onClick={toggleMenu}
            />
          )}
        </>
      )}
    </header>
  );
}

export default Header;
