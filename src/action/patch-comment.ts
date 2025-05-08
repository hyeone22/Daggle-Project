import { patchEditComment } from '@/api/Comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
      content,
    }: {
      postId: string;
      commentId: string;
      content: string;
    }) => patchEditComment(postId, commentId, content),
    onSuccess: (data, variables) => {
      // 댓글 목록 캐시 무효화
      console.log('댓글 수정 성공', data);
      queryClient.invalidateQueries({
        queryKey: ['commentList', variables.postId],
      });
    },
  });
};
