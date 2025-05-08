// 댓글 조회 API
export interface CommentUser {
  id: string;
  nickname: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
}

export type CommentListResponse = Comment[];
