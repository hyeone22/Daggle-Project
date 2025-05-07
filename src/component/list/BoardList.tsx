import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pagination from '@/components/ui/pagination';
import Comment from '@/assets/comment.svg';
import { useBoardList } from '@/action/get-post';
import { formatDate } from '@/lib/date';
import pencil from '@/assets/pencil.svg';
import { useNavigate } from 'react-router-dom';

function BoardList() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useBoardList(isMobile);

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth <= 640;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
        // 화면 크기가 변경될 때 데이터 리셋
        refetch();
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100); // 100px 이상 스크롤되면 버튼 표시
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, refetch]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  const currentPage = data.pages[data.pages.length - 1].meta.currentPage;
  const totalPages = data.pages[0].meta.totalPages;
  const currentItems = data.pages[data.pages.length - 1].items;

  const handlePageChange = (page: number) => {
    if (page > currentPage) {
      fetchNextPage();
    }
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // 모든 페이지의 아이템을 하나의 배열로 합치기
  const allItems = data.pages.flatMap((page) => page.items);

  const handleItemClick = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div className="w-full relative">
      {isMobile ? (
        <InfiniteScroll
          dataLength={allItems.length}
          next={loadMore}
          hasMore={hasNextPage}
          scrollThreshold="100%"
          loader={
            isFetchingNextPage ? (
              <div className="text-center py-4">
                추가 게시물을 불러오는 중...
              </div>
            ) : null
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
              onClick={() => handleItemClick(item.id)}
            >
              <div className="space-y-1">
                <h3 className="text-[16px] font-medium">{item.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-[#A7A9B4] text-[16px]">
                  <p>{formatDate(item.createdAt)}</p>
                  <img src={Comment} />
                  <span>{item.commentCount}</span>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <>
          <div>
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-0 px-6 py-4 border-b cursor-pointer"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-[#A7A9B4] text-[16px]">
                    <p>{formatDate(item.createdAt)}</p>
                    <img src={Comment} />
                    <span>{item.commentCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {/* 모바일에서만 보이는 하단 글쓰기 버튼 */}
      <div
        className={`fixed bottom-6 right-6 mobile:block hidden transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button className="rounded-full w-14 h-14 shadow-lg bg-[#6025E1] flex justify-center items-center">
          <img src={pencil} className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default BoardList;
