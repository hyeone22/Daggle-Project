import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pagination from '@/components/ui/pagination';
import Comment from '@/assets/comment.svg';
import {
  useDesktopBoardList,
  useMobileBoardList,
} from '@/action/board/get-post';
import { formatDate } from '@/lib/date';
import pencil from '@/assets/pencil.svg';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { EmptyState, ErrorState, LoadingState } from '@/utils/State';

function BoardList() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 모바일/데스크탑 분기 처리
  const mobileQuery = useMobileBoardList(isMobile);
  const desktopQuery = useDesktopBoardList(currentPage);

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth <= 640;
      setIsMobile(newIsMobile);
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 데스크탑 페이지네이션 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 모바일 무한스크롤 처리
  const loadMore = () => {
    if (mobileQuery.hasNextPage && !mobileQuery.isFetchingNextPage) {
      mobileQuery.fetchNextPage();
    }
  };

  if (isMobile) {
    if (mobileQuery.isLoading) return <LoadingState />;
    if (mobileQuery.error)
      return <ErrorState error={mobileQuery.error as Error} />;
    if (!mobileQuery.data) return <EmptyState />;

    const allItems = mobileQuery.data.pages.flatMap((page) => page.items);

    return (
      <div className="w-full relative">
        <InfiniteScroll
          dataLength={allItems.length}
          next={loadMore}
          hasMore={!!mobileQuery.hasNextPage}
          loader={
            <div className="text-center py-4">추가 게시물을 불러오는 중...</div>
          }
          endMessage={
            <div className="text-center py-4 text-gray-500">
              모든 게시물을 불러왔습니다.
            </div>
          }
        >
          {allItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start gap-2 px-6 py-4 border-b cursor-pointer"
              onClick={() => navigate(`/${item.id}`)}
            >
              <div className="space-y-1">
                <h3 className="text-[16px] font-medium">{item.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-[#A7A9B4] text-[16px]">
                  <p>{formatDate(item.createdAt)}</p>
                  <img src={Comment} alt="comment" />
                  <span>{item.commentCount}</span>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
        {/* 모바일 글쓰기 버튼 */}
        <div
          className={clsx(
            'fixed bottom-6 right-6 transition-opacity duration-300',
            {
              'opacity-100': isVisible,
              'opacity-0 pointer-events-none': !isVisible,
            }
          )}
        >
          <button
            className="rounded-full w-14 h-14 shadow-lg bg-[#6025E1] flex justify-center items-center"
            onClick={() => navigate('/write')}
          >
            <img src={pencil} alt="write" className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  // 데스크탑 뷰
  if (desktopQuery.isLoading) return <LoadingState />;
  if (desktopQuery.error)
    return <ErrorState error={desktopQuery.error as Error} />;
  if (!desktopQuery.data) return <EmptyState />;

  return (
    <div className="w-full relative">
      <div>
        {desktopQuery.data.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-0 px-6 py-4 border-b cursor-pointer"
            onClick={() => navigate(`/${item.id}`)}
          >
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{item.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-[#A7A9B4] text-[16px]">
                <p>{formatDate(item.createdAt)}</p>
                <img src={Comment} alt="comment" />
                <span>{item.commentCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={desktopQuery.data.meta.currentPage}
        totalPages={desktopQuery.data.meta.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default BoardList;
