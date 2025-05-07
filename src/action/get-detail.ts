import { getBoardDetail } from '@/api/Board';
import { CreatePostResponse } from '@/interface/BoardInterface';
import { useQuery } from '@tanstack/react-query';

export const useDetailBoard = (id: string) => {
  return useQuery<CreatePostResponse>({
    queryKey: ['boardDetail', id],
    queryFn: () => getBoardDetail(id),
  });
};
