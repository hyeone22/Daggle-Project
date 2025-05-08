import { useInfiniteQuery } from '@tanstack/react-query';
import { getBoardList } from '@/api/Board';

/**
 * 게시글 목록을 무한 스크롤로 조회하는 훅
 *
 * @param isMobile - 모바일 환경 여부
 * @returns 게시글 목록과 관련된 상태 및 함수들을 포함한 객체
 * @property {boolean} hasNextPage - 다음 페이지 존재 여부
 * @property {boolean} isFetchingNextPage - 다음 페이지 로딩 중 여부
 * @property {function} fetchNextPage - 다음 페이지 조회 함수
 * @property {array} pages - 조회된 페이지 데이터 배열
 * @property {boolean} isLoading - 초기 로딩 상태
 * @property {boolean} isError - 에러 발생 여부
 * @property {Error} error - 발생한 에러 객체
 *
 * @example
 * ```tsx
 * const { data, hasNextPage, fetchNextPage } = useBoardList(isMobile);
 * ```
 */
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
    refetchOnWindowFocus: false,
    enabled: true,
    gcTime: 0,
  });
};
