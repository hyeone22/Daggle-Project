interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    nickname: string;
  };
}

export interface CommentSectionProps {
  comments: Comment[];
  isLoading: boolean;
  currentUserId: string;
  onDeleteComment: (commentId: string) => void;
}

export interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}
