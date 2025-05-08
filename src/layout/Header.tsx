import { useLogout } from '@/action/post-logout';
import Logo from '/public/logo.svg';
import Status from '@/assets/Status_Icons.svg';
import Profile from '@/assets/profile.svg';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useAuthStore } from '@/store/useAuthStore';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 모바일 Status
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

// 햄버거 버튼
const MobileMenu = ({ toggleMenu }: { toggleMenu: () => void }) => (
  <button
    className="cursor-pointer mobile:block tablet:hidden desktop:hidden"
    onClick={toggleMenu}
  >
    <Menu className="w-5 h-5" />
  </button>
);

// 로그인 버튼
const DesktopLogin = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <p
      className="text-lg font-semibold mobile:hidden tablet:block desktop:block cursor-pointer"
      onClick={handleClick}
    >
      로그인
    </p>
  );
};

// 슬라이드 메뉴
const SlideMenu = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;
  const { mutate: logout } = useLogout();

  const handleLogin = () => {
    navigate('/login');
    toggleMenu();
  };

  const handleLogout = () => {
    const confirmed = confirm('로그아웃 하시겠습니까?');
    if (confirmed) {
      toggleMenu();
      logout(); // mutation 호출 -> 로그아웃 -> 홈으로 이동
    }
  };

  const handleLanding = () => {
    navigate('/');
    toggleMenu();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-[80%] bg-white transform transition-transform duration-300 ease-in-out z-50 mobile:block tablet:hidden desktop:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
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
          {isLoggedIn ? (
            <li className="cursor-pointer" onClick={handleLogout}>
              로그아웃
            </li>
          ) : (
            <li className="cursor-pointer" onClick={handleLogin}>
              로그인
            </li>
          )}
          <li className="cursor-pointer" onClick={handleLanding}>
            커뮤니티
          </li>
        </ul>
      </div>
    </div>
  );
};

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  const isMobileHeaderVisible = isHome || isLogin;

  const { user } = useAuthStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const handleClick = () => {
    setIsDropdown((prev) => !prev);
  };

  const handleLogoClick = () => {
    if (!isHome) {
      navigate('/'); // /로 이동
    }
  };

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
        <div className="h-full flex justify-between items-center ">
          <div className="flex items-center">
            <img
              src={Logo}
              className="h-10 w-16 cursor-pointer mobile:hidden tablet:block desktop:block"
              alt="Daggle Logo"
              onClick={handleLogoClick}
            />
            {(isHome || isLogin) && <MobileMenu toggleMenu={toggleMenu} />}
          </div>
          {isLoggedIn ? (
            <div className="relative">
              <img
                src={Profile}
                alt="profile logo"
                className="w-6 h-6 cursor-pointer"
                onClick={handleClick}
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
            <DesktopLogin />
          )}
        </div>
      </div>
      {(isHome || isLogin) && (
        <>
          <SlideMenu isOpen={isOpen} toggleMenu={toggleMenu} />
          {isOpen && (
            <div
              className="fixed inset-0 bg-[#424242] z-40 mobile:block tablet:hidden desktop:hidden"
              onClick={toggleMenu}
            />
          )}
        </>
      )}
    </header>
  );
}

export default Header;
