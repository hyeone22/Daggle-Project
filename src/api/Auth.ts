import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
} from '@/interface/api/AuthInterface';
import { Tokens, useAuthStore } from '@/store/useAuthStore';
import { post } from '@/lib/client';

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
  const response = await post('/auth/login', data);
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
export const postLogout = async (): Promise<void> => {
  const refreshToken = useAuthStore.getState().refreshToken;
  const response = await post('/auth/logout', { refreshToken });
  if (!response.ok) {
    throw new Error('로그아웃에 실패했습니다.');
  }
  useAuthStore.getState().logout();
};

/**
 * 토큰을 갱신하는 함수
 *
 * 현재 저장된 refreshToken을 사용하여 새로운 accessToken과 refreshToken을 발급받습니다.
 *
 * @returns {Promise<Tokens>} 새로 발급받은 토큰 정보
 * @throws {Error} 토큰 갱신 실패 시 에러를 발생시킵니다.
 */
export const postToken = async (): Promise<Tokens> => {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }

  const request: RefreshTokenRequest = {
    refreshToken,
  };

  const response = await post('/auth/refresh', request);
  if (!response.ok) {
    throw new Error('토큰 갱신에 실패했습니다.');
  }

  const data: Tokens = await response.json();
  return data;
};
