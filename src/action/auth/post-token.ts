import { postToken } from '@/api/Auth';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';

export const useRefresh = () => {
  const user = useAuthStore((state) => state.user);
  const setLogin = useAuthStore((state) => state.setLogin);

  return useMutation({
    mutationFn: postToken,
    onSuccess: (data) => {
      if (!user) {
        throw new Error('사용자 정보가 없습니다.');
      }
      setLogin(
        {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
        user
      );
    },
    onError: (error) => {
      // 토큰 갱신 실패 시 로그아웃 처리
      useAuthStore.getState().logout();
      console.error('토큰 갱신 실패:', error);
    },
  });
};
