import { Comment, CommentListResponse } from '@/interface/api/Comment';
import { get, post, patch, del } from '@/lib/client';

/**
 * 게시글의 댓글 목록을 조회합니다.
 *
 * @param postId - 댓글 목록을 조회할 게시글의 ID
 * @returns Promise<CommentListResponse> - 댓글 목록과 관련 메타 정보를 포함한 응답
 * @throws {Error} API 요청이 실패한 경우 에러를 발생시킵니다.
 *
 */
export const getCommentList = async (
  postId: string
): Promise<CommentListResponse> => {
  const response = await get(`/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error('댓글 목록을 불러오는데 실패했습니다.');
  }
  const data: CommentListResponse = await response.json();
  return data;
};

/**
 * 특정 게시글에 새로운 댓글을 등록합니다.
 *
 * @param postId - 댓글을 등록할 게시글의 ID
 * @param content - 등록할 댓글의 내용
 * @returns Promise<Comment> - 등록된 댓글 정보
 * @throws {Error} API 요청이 실패한 경우 에러를 발생시킵니다.
 *
 */
export const postCreateComment = async (
  postId: string,
  content: string
): Promise<Comment> => {
  const response = await post(`/posts/${postId}/comments`, { content });
  if (!response.ok) {
    throw new Error('댓글 등록에 실패하였습니다.');
  }
  const result: Comment = await response.json();
  return result;
};

export const patchEditComment = async (
  postId: string,
  commentId: string,
  content: string
): Promise<Comment> => {
  const response = await patch(`/posts/${postId}/comments/${commentId}`, {
    content,
  });
  if (!response.ok) {
    throw new Error('댓글 수정에 실패하였습니다.');
  }
  const result: Comment = await response.json();
  return result;
};

export const deleteComment = async (
  postId: string,
  commentId: string
): Promise<void> => {
  const response = await del(`/posts/${postId}/comments/${commentId}`);
  if (!response.ok) {
    throw new Error('댓글 삭제에 실패하였습니다.');
  }
};
