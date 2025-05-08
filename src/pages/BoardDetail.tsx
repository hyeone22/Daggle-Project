import { useDeleteBoard } from '@/action/delete-board';
import { useDeleteComment } from '@/action/delete-comment';
import { useCommentList } from '@/action/get-comment';
import { useDetailBoard } from '@/action/get-detail';
import { useCommentCreate } from '@/action/post-comment';
import Comment from '@/assets/comment.svg';
import { useAuthStore } from '@/store/useAuthStore';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardHeader from '@/component/list/BoardHeader';
import CommentSection from '@/component/comment/CommentSection';
import CommentInput from '@/component/comment/CommentInput';
import { EmptyState, ErrorState, LoadingState } from '@/utils/State';

function BoardDetail() {
  const [commentInput, setCommentInput] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);

  // API 호출
  const {
    data: boardDetail,
    isLoading: isBoardLoading,
    error: boardError,
  } = useDetailBoard(id || '');
  const {
    data: commentList,
    isPending: isCommentLoading,
    error: commentError,
  } = useCommentList(id || '');
  const { mutate: createComment } = useCommentCreate();
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const { mutate: deleteBoardMutate } = useDeleteBoard();

  // 핸들러 함수들
  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('정말 이 댓글을 삭제하시겠습니까?')) {
      deleteCommentMutate({ postId: boardDetail?.id || '', commentId });
    }
  };

  const handleDeleteBoard = () => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      deleteBoardMutate(boardDetail?.id || '');
    }
  };

  const handleCommentSubmit = () => {
    if (!id || !commentInput.trim()) return;
    createComment(
      { postId: id, content: commentInput },
      { onSuccess: () => setCommentInput('') }
    );
  };

  // 로딩 상태 처리
  if (isBoardLoading) return <LoadingState />;

  // 에러 상태 처리
  if (boardError) return <ErrorState error={boardError as Error} />;
  if (commentError) return <ErrorState error={commentError as Error} />;

  // 데이터가 없는 경우
  if (!boardDetail) return <EmptyState />;

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      <div className="bg-white rounded-md w-full mt-6 mobile:mt-0 border border-[#EEEFF1] mobile:border-0">
        <div className="flex flex-col mobile:p-0 mobile:gap-4">
          <BoardHeader
            title={boardDetail.title}
            author={boardDetail.author}
            createdAt={boardDetail.createdAt}
            isAuthor={user?.id === boardDetail.author.id}
            onEdit={() => navigate(`/write/${boardDetail.id}`)}
            onDelete={handleDeleteBoard}
            onBack={() => navigate('/')}
          />

          {/* 본문 */}
          <div className="flex flex-col w-full border-t border-[#EEEFF1] mobile:border-0">
            <div className="p-6 mobile:p-0 mobile:px-4 flex flex-col justify-between">
              <p className="whitespace-pre-wrap">{boardDetail.content}</p>
              <div className="flex gap-2 mt-4">
                <img src={Comment} alt="comment" />
                <span className="text-[#474953]">
                  {boardDetail.commentCount}개
                </span>
              </div>
            </div>
          </div>

          <CommentSection
            comments={commentList || []}
            isLoading={isCommentLoading}
            currentUserId={user?.id || ''}
            onDeleteComment={handleDeleteComment}
            postId={boardDetail.id}
          />

          <CommentInput
            value={commentInput}
            onChange={setCommentInput}
            onSubmit={handleCommentSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
