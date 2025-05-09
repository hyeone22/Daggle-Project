import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getBoardList } from '@/api/Board';

// 데스크탑용 일반 페이지네이션 훅
export const useDesktopBoardList = (page: number) => {
  return useQuery({
    queryKey: ['boardList', 'desktop', page],
    queryFn: () => getBoardList(page),
  });
};

export const useMobileBoardList = (isMobile: boolean) => {
  return useInfiniteQuery({
    queryKey: ['boardList', isMobile],
    queryFn: ({ pageParam = 1 }) => getBoardList(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage < lastPage.meta.totalPages) {
        return lastPage.meta.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    enabled: isMobile, // isMobile이 true일 때만 쿼리 실행
  });
};
