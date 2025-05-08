import { ChevronLeft } from 'lucide-react';
import { formatDate } from '@/lib/date';
import { BoardHeaderProps } from '@/interface/api/item/BoardItem';

function BoardHeader({
  title,
  author,
  createdAt,
  isAuthor,
  onEdit,
  onDelete,
  onBack,
}: BoardHeaderProps) {
  return (
    <>
      <div className="px-4">
        <ChevronLeft className="hidden mobile:block w-6 h-6" onClick={onBack} />
      </div>
      <div className="flex flex-col p-6 mobile:p-0 mobile:px-4 gap-6 mobile:gap-2">
        <h1 className="text-2xl mobile:text-lg font-bold">{title}</h1>
        <div className="flex items-center gap-2 text-[#A7A9B4] text-base mobile:text-sm">
          <p>{author.nickname ?? '닉네임 예시'}</p>
          <span>|</span>
          <p>{formatDate(createdAt)}</p>
          {isAuthor && (
            <div className="flex ml-auto gap-1 text-[#A7A9B4] mobile:text-xs">
              <button className="hover:underline" onClick={onEdit}>
                수정
              </button>
              <span>|</span>
              <button className="hover:underline" onClick={onDelete}>
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BoardHeader;
