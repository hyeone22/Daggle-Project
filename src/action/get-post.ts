import { useInfiniteQuery } from '@tanstack/react-query';
import { getBoardList } from '@/api/Board';

export const useBoardList = (isMobile: boolean) => {
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
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 방지
    enabled: true,
    gcTime: 0,
  });
};
