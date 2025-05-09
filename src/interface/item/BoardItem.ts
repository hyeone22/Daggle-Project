export interface BoardHeaderProps {
  title: string;
  author: {
    id: string;
    nickname: string;
  };
  createdAt: string;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}
