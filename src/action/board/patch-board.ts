import { patchBoard } from '@/api/Board';
import { CreatePostRequest } from '@/interface/api/BoardInterface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePatchBoard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePostRequest }) =>
      patchBoard(data, id),
    onSuccess: (data) => {
      // 게시글 상세 정보 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['boardDetail', data.id],
      });
      // 게시판 리스트 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['boardList'],
      });
      // 수정된 게시글 상세 페이지로 이동
      navigate(`/${data.id}`);
    },
  });
};
