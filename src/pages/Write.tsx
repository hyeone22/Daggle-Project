import { useDetailBoard } from '@/action/board/get-detail';
import { usePatchBoard } from '@/action/board/patch-board';
import { useWriteBoard } from '@/action/board/post-write';
import WriteForm from '@/component/form/WriteForm';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState, ErrorState, LoadingState } from '@/utils/State';

function Write() {
  const navigate = useNavigate();
  const { id } = useParams();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isEditMode = !!id;

  // API 호출 및 상태 관리
  const { data: boardDetail, isLoading, error } = useDetailBoard(id || '');
  const { mutate: writeBoard, isPending: isWritePending } = useWriteBoard();
  const { mutate: editBoard, isPending: isEditPending } = usePatchBoard();

  // 인증 체크
  useEffect(() => {
    if (!accessToken) {
      alert('로그인이 필요합니다!');
      navigate('/login');
    }
  }, [accessToken, navigate]);

  // 상태 처리
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error as Error} />;
  if (isEditMode && !boardDetail) return <EmptyState />;

  // 폼 제출 핸들러
  const handleSubmit = (data: { title: string; content: string }) => {
    if (isEditMode && id) {
      editBoard({ id, data });
    } else {
      writeBoard(data);
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full bg-[#F9FAFA]">
      <WriteForm
        defaultValues={
          isEditMode
            ? {
                title: boardDetail?.title || '',
                content: boardDetail?.content || '',
              }
            : undefined
        }
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        isPending={isWritePending || isEditPending}
        onBack={() => navigate('/')}
      />
    </div>
  );
}

export default Write;
