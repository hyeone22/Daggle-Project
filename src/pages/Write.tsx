import { useDetailBoard } from '@/action/get-detail';
import { usePatchBoard } from '@/action/patch-board';
import { useWriteBoard } from '@/action/post-write';
import WriteForm, { WriteFormRef } from '@/component/form/WriteForm';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState, ErrorState, LoadingState } from '@/utils/State';

function Write() {
  const formRef = useRef<WriteFormRef>(null);
  const { mutate: writeBoard, isPending: isWritePending } = useWriteBoard();
  const { mutate: editBoard, isPending: isEditPending } = usePatchBoard();
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const { id } = useParams();
  const { data: boardDetail, isLoading, error } = useDetailBoard(id || '');
  const isEditMode = !!id;

  useEffect(() => {
    if (!accessToken) {
      const showLoginAlert = () => {
        alert('로그인이 필요합니다!');
        navigate('/login');
      };
      showLoginAlert();
    }
  }, []);

  // 수정 모드일 때 기존 데이터로 폼 초기화
  useEffect(() => {
    if (isEditMode && boardDetail && formRef.current) {
      formRef.current.setValue('title', boardDetail.title, {
        shouldDirty: false,
      });
      formRef.current.setValue('content', boardDetail.content, {
        shouldDirty: false,
      });
      // 초기화 후 isDirty를 false로 설정
      setIsFormDirty(false);
    }
  }, [isEditMode, boardDetail]);

  const handleSubmit = (data: { title: string; content: string }) => {
    if (isEditMode && id) {
      editBoard({
        id,
        data: {
          title: data.title,
          content: data.content,
        },
      });
    } else {
      writeBoard(data);
    }
  };

  const handleButtonClick = async () => {
    if (formRef.current) {
      const isValid = await formRef.current.trigger();
      if (isValid) {
        const formData = formRef.current.getValues();
        handleSubmit(formData);
      }
    }
  };

  // 로딩 상태 처리
  if (isLoading) return <LoadingState />;

  // 에러 상태 처리
  if (error) return <ErrorState error={error as Error} />;

  // 수정 모드에서 데이터가 없는 경우
  if (isEditMode && !boardDetail) return <EmptyState />;

  return (
    <div className="flex flex-col items-center gap-12 w-full bg-[#F9FAFA]">
      <WriteForm
        onSubmit={handleSubmit}
        ref={formRef}
        onDirtyChange={setIsFormDirty}
      />
      <Button
        size="default"
        variant="default"
        onClick={handleButtonClick}
        disabled={isEditMode && !isFormDirty}
        text={isEditMode ? '수정하기' : '등록하기'}
        className="mobile:hidden"
      >
        {isWritePending || isEditPending
          ? isEditMode
            ? '수정 중...'
            : '등록 중...'
          : isEditMode
            ? '수정하기'
            : '등록하기'}
      </Button>
    </div>
  );
}

export default Write;
