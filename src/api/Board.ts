import { BoardListResponse } from '@/interface/BoardInterface';

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
