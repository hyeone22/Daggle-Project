import { postLogout } from '@/api/Auth';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      logout();
      navigate('/');
    },
    onError: (error) => {
      console.error('로그아웃 실패', error);
      alert('로그아웃이 실패하였습니다.');
    },
  });
};
