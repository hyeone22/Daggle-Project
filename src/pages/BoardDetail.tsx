import { useDetailBoard } from '@/action/get-detail';
import Comment from '@/assets/comment.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/date';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

function BoardDetail() {
  const { id } = useParams();
  const { data, isPending, error } = useDetailBoard(id || '');
  console.log('data', data);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      <div className="bg-white rounded-md w-full mt-6 mobile:mt-0 border border-[#EEEFF1] mobile:border-0">
        <div className="flex flex-col mobile:p-0 mobile:gap-4">
          {/* 모바일 뒤로가기 버튼 */}

          <div className="px-4">
            <ChevronLeft
              className="hidden mobile:block w-6 h-6"
              onClick={() => navigate('/')}
            />
          </div>
          {/* 정보 */}
          <div className="flex flex-col p-6 mobile:p-0 mobile:px-4 gap-6 mobile:gap-2">
            <h1 className="text-2xl mobile:text-lg font-bold">{data?.title}</h1>
            <div className="flex items-center gap-2 text-[#A7A9B4] text-base mobile:text-sm">
              <p>{data?.author.nickname}</p>
              <span>|</span>
              {data?.createdAt && <p>{formatDate(data.createdAt)}</p>}
            </div>
          </div>

          {/* 본문 */}
          <div className="flex flex-col w-full border-t border-[#EEEFF1] mobile:border-0">
            <div className="p-6 mobile:p-0 mobile:px-4 flex flex-col justify-between">
              <p className="whitespace-pre-wrap">{data?.content}</p>
              <div className="flex gap-2 mt-4">
                <img src={Comment} />
                <span className="text-[#474953]">{data?.commentCount}개</span>
              </div>
            </div>
          </div>
        </div>

        {/* 댓글 리스트 */}
        <div className="w-full bg-[#F9FAFA] border-y border-[#EEEFF1]">
          <div className="p-6 mobile:p-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span className="bg-gray-300 w-6 h-6 rounded-full"></span>
                <p className="mobile:text-sm">닉네임</p>
              </div>
              <div>본문</div>
              <p className="text-[#A7A9B4] mobile:text-xs">날짜</p>
            </div>
          </div>
        </div>

        {/* 댓글 입력창 */}
        <div className="p-6 mobile:p-4 flex items-center gap-2 mobile:fixed mobile:inset-x-0 mobile:bottom-0 mobile:h-24">
          <Input
            placeholder="댓글을 통해 자유롭게 의견을 나눠보세요."
            className="border-x-0 border-t-0 rounded-none shadow-none mobile:placeholder:text-sm"
          />
          <Button size="icon" text="등록" />
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
