import { CommentSectionProps } from '@/interface/api/item/CommentItem';
import { formatDate } from '@/lib/date';

function CommentSection({
  comments,
  isLoading,
  currentUserId,
  onDeleteComment,
}: CommentSectionProps) {
  return (
    <div className="w-full bg-[#F9FAFA] border-y border-[#EEEFF1]">
      <div className="p-6 mobile:p-4 flex flex-col gap-6">
        {isLoading ? (
          <p>댓글을 불러오는 중...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span className="bg-gray-300 w-6 h-6 rounded-full"></span>
                <p className="mobile:text-sm">
                  {comment.user.nickname ?? '설정되지 않은 닉네임'}
                </p>
                {currentUserId === comment.user.id && (
                  <div className="ml-auto flex gap-1 text-[#A7A9B4] mobile:text-xs">
                    <button className="hover:underline">수정</button>
                    <span>|</span>
                    <button
                      className="hover:underline"
                      onClick={() => onDeleteComment(comment.id)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <div>{comment.content}</div>
              <p className="text-[#A7A9B4] mobile:text-xs">
                {formatDate(comment.createdAt)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-[#A7A9B4]">현재 작성된 댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
