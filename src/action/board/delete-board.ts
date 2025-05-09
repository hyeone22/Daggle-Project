import { deleteBoard } from '@/api/Board';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => deleteBoard(id),
    onSuccess: () => {
      // 게시판 리스트 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['boardList'],
      });
      navigate('/');
    },
    onError: (error) => {
      console.error('게시글이 삭제되지 않았습니다.', error);
    },
  });
};
