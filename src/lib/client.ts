import { useAuthStore } from '@/store/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.daggle.io/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export const fetchClient = async (
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const accessToken = useAuthStore.getState().accessToken;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // 토큰이 만료된 경우
    if (response.status === 401) {
      if (isRefreshing) {
        // 토큰 갱신 중인 경우, 갱신 완료 후 재요청
        return new Promise((resolve) => {
          subscribeTokenRefresh(async (token) => {
            headers.Authorization = `Bearer ${token}`;
            const retryResponse = await fetch(`${BASE_URL}${endpoint}`, {
              ...config,
              headers,
            });
            resolve(retryResponse);
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.');
        }

        // 토큰 갱신 요청
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
          throw new Error('토큰 갱신에 실패했습니다.');
        }

        const tokens = await refreshResponse.json();
        const user = useAuthStore.getState().user;

        if (!user) {
          throw new Error('사용자 정보가 없습니다.');
        }

        // 새로운 토큰으로 상태 업데이트
        useAuthStore.getState().setLogin(tokens, user);

        // 원래 요청 재시도
        headers.Authorization = `Bearer ${tokens.accessToken}`;
        const retryResponse = await fetch(`${BASE_URL}${endpoint}`, {
          ...config,
          headers,
        });

        onTokenRefreshed(tokens.accessToken);
        return retryResponse;
      } catch (error) {
        useAuthStore.getState().logout();
        throw error;
      } finally {
        isRefreshing = false;
      }
    }

    return response;
  } catch (error) {
    throw error;
  }
};

// HTTP 메서드별 헬퍼 함수
export const get = (
  endpoint: string,
  options?: FetchOptions
): Promise<Response> => fetchClient(endpoint, { ...options, method: 'GET' });

export const post = (
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<Response> =>
  fetchClient(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });

export const put = (
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<Response> =>
  fetchClient(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const patch = (
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<Response> =>
  fetchClient(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });

export const del = (
  endpoint: string,
  options?: FetchOptions
): Promise<Response> => fetchClient(endpoint, { ...options, method: 'DELETE' });
