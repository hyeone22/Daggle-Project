import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useLogout } from '@/action/post-logout';

export const useHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const isMobileHeaderVisible = isHome || isLogin;

  const { user, accessToken } = useAuthStore();
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const toggleDropdown = () => setIsDropdown((prev) => !prev);

  // 햄버거 메뉴 토글 시 프로필 드롭다운 닫기
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (isDropdown) {
      setIsDropdown(false);
    }
  };

  const handleLogoClick = () => {
    if (!isHome) {
      navigate('/');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      setIsOpen(false);
      logout();
    }
  };

  const handleLanding = () => {
    navigate('/');
    setIsOpen(false);
  };

  return {
    isOpen,
    isDropdown,
    isMobile,
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
  };
};
