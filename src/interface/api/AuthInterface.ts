// 로그인 Interface
interface User {
  loginId: string;
  profileImageUrl: string;
  createdAt: string; // ISO 날짜 문자열
  updatedAt: string;
  deletedAt: string;
  id: string;
  nickname: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
