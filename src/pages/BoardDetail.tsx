import { useDeleteComment } from '@/action/delete-comment';
import { useCommentList } from '@/action/get-comment';
import { useDetailBoard } from '@/action/get-detail';
import { useCommentCreate } from '@/action/post-comment';
import Comment from '@/assets/comment.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/date';
import { useAuthStore } from '@/store/useAuthStore';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BoardDetail() {
  const [commentInput, setCommentInput] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: boardDetail, isPending, error } = useDetailBoard(id || '');
  const { data: commentList, isPending: isCommentLoading } = useCommentList(
    id || ''
  );
  const { mutate: createComment } = useCommentCreate();
  console.log('data', boardDetail);
  console.log('dddd', commentList);

  const user = useAuthStore((state) => state.user);
  console.log('user', user);

  const isAuthor = (commentUserLoginId: string) => {
    return user?.id === commentUserLoginId;
  };
  const { mutate: deleteCommentMutate } = useDeleteComment();

  const handleDeleteClick = (commentId: string) => {
    if (window.confirm('정말 이 댓글을 삭제하시겠습니까?')) {
      deleteCommentMutate({ postId: boardDetail?.id || '', commentId });
    }
  };

  useEffect(() => {
    if (boardDetail && commentList) {
      console.log('게시글 상세 commentCount:', boardDetail.commentCount);
      console.log('실제 댓글 수:', commentList.length);
    }
  }, [boardDetail, commentList]);

  const handleCommentSubmit = () => {
    if (!id || !commentInput.trim()) return;

    createComment(
      {
        postId: id,
        content: commentInput,
      },
      {
        onSuccess: () => {
          setCommentInput(''); // 댓글 입력 초기화
        },
      }
    );
  };

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
            <h1 className="text-2xl mobile:text-lg font-bold">
              {boardDetail?.title}
            </h1>
            <div className="flex items-center gap-2 text-[#A7A9B4] text-base mobile:text-sm">
              <p>{boardDetail?.author.nickname ?? '닉네임 예시'}</p>
              <span>|</span>
              {boardDetail?.createdAt && (
                <p>{formatDate(boardDetail.createdAt)}</p>
              )}
            </div>
          </div>

          {/* 본문 */}
          <div className="flex flex-col w-full border-t border-[#EEEFF1] mobile:border-0">
            <div className="p-6 mobile:p-0 mobile:px-4 flex flex-col justify-between">
              <p className="whitespace-pre-wrap">{boardDetail?.content}</p>
              <div className="flex gap-2 mt-4">
                <img src={Comment} />
                <span className="text-[#474953]">
                  {boardDetail?.commentCount}개
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 댓글 리스트 */}
        <div className="w-full bg-[#F9FAFA] border-y border-[#EEEFF1]">
          <div className="p-6 mobile:p-4 flex flex-col gap-6">
            {isCommentLoading ? (
              <p>댓글을 불러오는 중...</p>
            ) : commentList && commentList.length > 0 ? (
              commentList.map((comment) => (
                <div key={comment.id} className="flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <span className="bg-gray-300 w-6 h-6 rounded-full"></span>
                    <p className="mobile:text-sm">
                      {comment.user.nickname ?? '설정되지 않은 닉네임'}
                    </p>
                    {isAuthor(comment.user.id) && (
                      <div className="ml-auto flex gap-1 text-[#A7A9B4] mobile:text-xs">
                        <button className="hover:underline">수정</button>
                        <span>|</span>
                        <button
                          className="hover:underline"
                          onClick={() => handleDeleteClick(comment.id)}
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

        {/* 댓글 입력창 */}
        <div className="p-6 mobile:p-4 flex items-center gap-2 mobile:fixed mobile:inset-x-0 mobile:bottom-0 mobile:h-24">
          <Input
            placeholder="댓글을 통해 자유롭게 의견을 나눠보세요."
            className="border-x-0 border-t-0 rounded-none shadow-none mobile:placeholder:text-sm"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <Button size="icon" text="등록" onClick={handleCommentSubmit} />
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
