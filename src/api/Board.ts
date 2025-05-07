import {
  BoardListResponse,
  CreatePostRequest,
  CreatePostResponse,
} from '@/interface/BoardInterface';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * 게시글 목록을 조회하는 API 함수
 *
 * @param page - 조회할 페이지 번호 (기본값: 1)
 * @param limit - 한 페이지당 게시글 수 (기본값: 10)
 * @returns 게시글 목록과 메타데이터를 포함한 응답 객체
 * @throws {Error} API 요청이 실패한 경우 에러를 발생시킵니다.
 *
 * @example
 * ```ts
 * const boardList = await getBoardList(1, 10);
 * console.log(boardList.data); // 게시글 목록
 * console.log(boardList.meta); // 페이지네이션 메타데이터
 * ```
 */
export const getBoardList = async (
  page: number = 1,
  limit: number = 10
): Promise<BoardListResponse> => {
  const response = await fetch(
    `https://api.daggle.io/api/posts?page=${page}&limit=${limit}`,
    {}
  );

  if (!response.ok) {
    throw new Error('게시글 목록을 불러오는데 실패했습니다.');
  }

  return response.json();
};

/**
 * 새로운 게시글을 생성하는 API 함수
 *
 * @param data - 생성할 게시글의 제목과 내용
 * @returns 생성된 게시글 정보를 포함한 응답 객체
 * @throws {Error} API 요청이 실패한 경우 에러를 발생시킵니다.
 *
 * @example
 * ```ts
 * const newPost = await postBoardWrite({
 *   title: '제목',
 *   content: '내용'
 * });
 * console.log(newPost); // 생성된 게시글 정보
 * ```
 */
export const postBoardWrite = async (
  data: CreatePostRequest
): Promise<CreatePostResponse> => {
  const response = await fetch(`https://api.daggle.io/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('게시글 생성에 실패했습니다.');
  }

  const result: CreatePostResponse = await response.json();
  return result;
};

/**
 * 게시글 상세 정보를 조회하는 API
 * @param id - 게시글 ID
 * @returns 게시글 상세 정보
 * @throws API 호출 실패 시 에러 발생
 * @example
 * const { data } = await getBoardDetail("1");
 * 게시글 생성 Response와 타입이 같음
 */
export const getBoardDetail = async (
  id: string
): Promise<CreatePostResponse> => {
  const accessToken = useAuthStore.getState().accessToken;
  const response = await fetch(`https://api.daggle.io/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('게시글 상세 정보를 불러오는데 실패했습니다.');
  }

  return response.json();
};
