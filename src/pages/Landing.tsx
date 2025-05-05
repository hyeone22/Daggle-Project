import BoardWrapper from '@/component/section/BoardWrapper';
import SlideWrapper from '@/component/section/SlideWrapper';

function Landing() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 py-[100px] mobile:py-0 mobile:bg-white">
      {/* 타이틀, 캐러셀 */}
      <SlideWrapper />

      {/* 게시판 리스트 */}
      <BoardWrapper />
    </div>
  );
}

export default Landing;
