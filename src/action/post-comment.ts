import { postCreateComment } from '@/api/Comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCommentCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      postCreateComment(postId, content),
    onSuccess: (data, variables) => {
      console.log('댓글 등록 성공', data);
      queryClient.invalidateQueries({
        queryKey: ['commentList', variables.postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['boardDetail', variables.postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['boardList'],
      });
    },
    onError: (error) => {
      console.log('댓글 등록 실패', error);
    },
  });
};
