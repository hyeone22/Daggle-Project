import { CommentSectionProps } from '@/interface/item/CommentItem';
import { formatDate } from '@/lib/date';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEditComment } from '@/action/comment/patch-comment';

function CommentSection({
  comments,
  isLoading,
  currentUserId,
  onDeleteComment,
  postId,
}: CommentSectionProps) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const { mutate: editComment } = useEditComment();

  const handleEditClick = (comment: CommentSectionProps['comments'][0]) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditSubmit = (commentId: string) => {
    if (!editContent.trim()) return;

    editComment(
      {
        postId,
        commentId,
        content: editContent,
      },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          setEditContent('');
        },
      }
    );
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditContent('');
  };

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
                    <button
                      className="hover:underline"
                      onClick={() => handleEditClick(comment)}
                    >
                      수정
                    </button>
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
              {editingCommentId === comment.id ? (
                <div className="flex flex-col gap-4">
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="border rounded-md p-2"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="icon"
                      variant="default"
                      onClick={handleEditCancel}
                      text="취소"
                    />
                    <Button
                      size="icon"
                      onClick={() => handleEditSubmit(comment.id)}
                      text="수정"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>{comment.content}</div>
                  <p className="text-[#A7A9B4] mobile:text-xs">
                    {formatDate(comment.createdAt)}
                  </p>
                </>
              )}
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
