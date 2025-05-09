import { postLogin } from '@/api/Auth';
import { LoginRequest, LoginResponse } from '@/interface/api/AuthInterface';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      // console.log('로그인 성공', data);

      // Zustand store에 로그인 정보 저장
      setLogin(
        {
          accessToken: data.tokens.accessToken,
          refreshToken: data.tokens.refreshToken,
        },
        {
          nickname: data.user.nickname,
          loginId: data.user.loginId,
          profileImageUrl: data.user.profileImageUrl,
          id: data.user.id,
        }
      );

      navigate('/'); // 성공시 메인페이지로 이동
    },
    onError: (error) => {
      console.error('error', error);
      alert('로그인에 실패하였습니다.');
    },
  });
};
