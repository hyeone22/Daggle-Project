import Logo from '/public/logo.svg';
import Status from '@/assets/Status_Icons.svg';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

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
const DesktopLogin = () => (
  <p className="text-lg font-semibold mobile:hidden tablet:block desktop:block">
    로그인
  </p>
);

// 슬라이드 메뉴
const SlideMenu = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => (
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
          <div className="w-5 h-5 rounded-full bg-black" />
          <h2 className="text-lg font-bold">로그인해주세요 / 회원 정보</h2>
        </div>
      </div>
    </div>
    <div className="px-4 pt-4">
      <ul className="space-y-4 text-base">
        <li>로그인</li>
        <li>커뮤니티</li>
      </ul>
    </div>
  </div>
);

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 640px)'); // isMobile은 화면 너비가 640px 이하일 때 true, 그 외에는 false

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <header className="bg-white w-full">
      <StatusBar />
      <div className="h-20 mobile:h-[50px] w-full px-[16px] tablet:px-[30px] desktop:px-[120px]">
        <div className="h-full flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={Logo}
              className="h-10 w-16 cursor-pointer mobile:hidden tablet:block desktop:block"
              alt="Daggle Logo"
            />
            <MobileMenu toggleMenu={toggleMenu} />
          </div>
          <DesktopLogin />
        </div>
      </div>
      <SlideMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#424242] z-40 mobile:block tablet:hidden desktop:hidden"
          onClick={toggleMenu}
        />
      )}
    </header>
  );
}

export default Header;
