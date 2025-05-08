import { postBoardWrite } from '@/api/Board';
import {
  CreatePostRequest,
  CreatePostResponse,
} from '@/interface/BoardInterface';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

/**
 * 게시글 작성 기능을 제공하는 훅
 *
 * @returns 게시글 작성 관련 상태 및 함수들을 포함한 객체
 * @property {function} mutate - 게시글 작성 요청을 보내는 함수
 * @property {boolean} isPending - 요청 진행 중 여부
 * @property {boolean} isSuccess - 요청 성공 여부
 * @property {boolean} isError - 요청 실패 여부
 * @property {Error} error - 발생한 에러 객체
 */
export const useWriteBoard = () => {
  const navigate = useNavigate();
  const mutation = useMutation<CreatePostResponse, Error, CreatePostRequest>({
    mutationFn: postBoardWrite, // mutate 함수
    onSuccess: (data) => {
      console.log('게시글 등록 성공:', data);
      alert('게시글이 등록되었습니다.');
      navigate('/'); // 성공 시 페이지 이동
    },
    onError: (error: Error) => {
      console.log('ERROR', error);
      alert('게시글 등록에 실패했습니다.');
    },
  });

  return mutation;
};
