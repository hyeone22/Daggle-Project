import { getCommentList } from '@/api/Comment';
import { CommentListResponse } from '@/interface/Comment';
import { useQuery } from '@tanstack/react-query';

export const useCommentList = (postId: string) => {
  return useQuery<CommentListResponse>({
    queryKey: ['commentList', postId],
    queryFn: () => getCommentList(postId),
  });
};
