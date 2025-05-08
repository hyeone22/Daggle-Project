import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 사용자 정보 인터페이스
 */
export interface User {
  id: string;
  nickname: string;
  loginId: string;
  profileImageUrl: string;
}

/**
 * 토큰 정보 인터페이스
 */
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * 인증 관련 상태와 액션을 정의한 인터페이스
 */
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setLogin: (tokens: Tokens, user: User) => void;
  logout: () => void;
  initializeFromStorage: () => void;
}

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;

/**
 * Zustand를 사용한 인증 상태 전역 스토어
 * persist 미들웨어를 통해 상태를 localStorage에 저장함
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      /**
       * 로그인 성공 시 호출되는 함수
       * 사용자 정보와 토큰을 상태에 저장하고 로그인 상태로 전환
       *
       * @param tokens - accessToken, refreshToken 포함 객체
       * @param user - 로그인한 사용자 정보
       */
      setLogin: (tokens: Tokens, user: User) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user,
        });
      },

      /**
       * 로그아웃 시 호출되는 함수
       * 상태를 초기화하고 로그인 상태를 false로 변경
       */
      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        });
      },

      /**
       * 앱 초기 구동 시 localStorage에서 저장된 값을 불러와 상태를 복원하는 함수
       * 유효한 데이터가 있을 경우 로그인 상태로 간주함
       */
      initializeFromStorage: () => {
        const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        const userData = localStorage.getItem(STORAGE_KEYS.USER);

        if (accessToken && refreshToken && userData) {
          try {
            const user = JSON.parse(userData);
            set({
              accessToken,
              refreshToken,
              user,
            });
          } catch {
            // 사용자 데이터 파싱 실패 시 해당 항목 삭제
            localStorage.removeItem(STORAGE_KEYS.USER);
          }
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 key 이름
      /**
       * 상태 중에서 저장할 항목을 지정
       * accessToken, refreshToken, user 정보만 저장됨
       */
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
