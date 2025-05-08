import { LoginRequest, LoginResponse } from '@/interface/api/AuthInterface';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * 로그인 API를 호출하는 함수
 *
 * @param data - 로그인에 필요한 사용자 정보
 * @param data.username - 사용자 아이디
 * @param data.password - 사용자 비밀번호
 *
 * @returns 로그인 성공 시 토큰과 사용자 정보를 포함한 응답 객체
 * @returns {Promise<LoginResponse>} LoginResponse 타입의 Promise
 *
 * @throws {Error} 로그인 실패 시 에러 발생
 */

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch('https://api.daggle.io/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('로그인에 실패했습니다.');
  }
  const result: LoginResponse = await response.json();
  return result;
};

/**
 * 로그아웃을 수행하는 함수
 *
 * 사용자의 refreshToken을 서버에 전송하여 로그아웃 처리를 합니다. 로그아웃이 성공하면,
 * 클라이언트에서 저장된 사용자 정보 및 토큰을 초기화합니다.
 *
 * @throws {Error} 로그아웃 실패 시 에러를 발생시킵니다.
 */
export const postLogout = async () => {
  const refreshToken = useAuthStore.getState().refreshToken;
  const response = await fetch('https://api.daggle.io/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    throw new Error('로그아웃에 실패했습니다.');
  }

  useAuthStore.getState().logout();
};
