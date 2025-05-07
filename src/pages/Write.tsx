import { useWriteBoard } from '@/action/post-write';
import WriteForm, { WriteFormRef } from '@/component/form/WriteForm';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

function Write() {
  const formRef = useRef<WriteFormRef>(null);
  const { mutate: writeBoard, isPending } = useWriteBoard();

  const handleSubmit = (data: { title: string; content: string }) => {
    console.log('Form submitted:', data);
    writeBoard(data);
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

  return (
    <div className="flex flex-col items-center gap-12 w-full bg-[#F9FAFA] mobile:bg-white">
      <WriteForm onSubmit={handleSubmit} ref={formRef} />
      <Button
        size="default"
        variant="default"
        className="mobile:hidden"
        onClick={handleButtonClick}
        disabled={isPending}
        text="등록하기"
      >
        {isPending ? '등록 중...' : '등록하기'}
      </Button>
    </div>
  );
}

export default Write;
