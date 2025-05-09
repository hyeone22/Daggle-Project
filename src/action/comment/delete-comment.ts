import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@/api/Comment'; // deleteComment API 호출 함수

export const useDeleteComment = () => {
  const queryClient = useQueryClient(); // react-query의 queryClient 사용

  return useMutation({
    mutationFn: async ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => {
      return await deleteComment(postId, commentId); // 댓글 삭제 API 호출
    },
    onSuccess: (data, variables) => {
      // 댓글 삭제가 성공했을 때, 해당 포스트의 댓글 리스트를 invalidate 해서 새로 불러옴
      console.log('댓글 삭제 성공', data);
      queryClient.invalidateQueries({
        queryKey: ['commentList', variables.postId], // 삭제된 댓글을 반영한 새로운 데이터로 갱신
      });
      // 게시글 상세 정보도 갱신하여 댓글 수 업데이트
      queryClient.invalidateQueries({
        queryKey: ['boardDetail', variables.postId],
      });
      // 게시글 목록도 갱신하여 댓글 수 업데이트 (데스크톱/모바일)
      queryClient.invalidateQueries({
        queryKey: ['boardList'],
        exact: false,
      });
    },
    onError: (error) => {
      console.error('댓글 삭제 오류', error);
    },
  });
};
