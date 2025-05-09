import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { FormData, WriteFormProps } from '@/interface/item/WriteItem';

function WriteForm({
  defaultValues,
  onSubmit,
  isEditMode,
  isPending,
  onBack,
}: WriteFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: defaultValues || {
      title: '',
      content: '',
    },
  });

  const title = watch('title');
  const content = watch('content');
  const isValid = title?.length >= 1 && content?.length >= 5;
  const isButtonEnabled = (isEditMode ? isDirty : true) && isValid;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-md w-full flex flex-col justify-center items-center mt-6 mobile:mt-0"
    >
      <div className="w-full flex flex-col justify-start p-6 gap-6 mobile:p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChevronLeft
              className="hidden mobile:block w-6 h-6 cursor-pointer"
              onClick={onBack}
            />
            <h3 className="text-[20px] mobile:text-base font-bold">
              {isEditMode ? '게시글 수정' : '게시글 작성'}
            </h3>
          </div>
          <button
            type="submit"
            className={clsx(
              'text-base font-bold mobile:block hidden',
              isButtonEnabled ? 'text-[#000]' : 'text-[#C8C9D0]'
            )}
            disabled={!isButtonEnabled}
          >
            {isPending
              ? isEditMode
                ? '수정 중...'
                : '등록 중...'
              : isEditMode
                ? '수정'
                : '등록'}
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Input
              placeholder="제목을 입력해주세요."
              className={clsx(
                'border',
                errors.title &&
                  isDirty &&
                  'border-[#D11111] border-2 focus:border-red-500'
              )}
              {...register('title', {
                required: '최소 1자 이상 입력해주세요.',
                minLength: {
                  value: 1,
                  message: '최소 1자 이상 입력해주세요.',
                },
              })}
            />
            {errors.title && isDirty && (
              <p className="text-sm text-[#D11111]">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="내용을 입력해주세요."
              className={clsx(
                'border',
                errors.content &&
                  isDirty &&
                  'border-[#D11111] border-2 focus:border-red-500'
              )}
              isError={errors.content && isDirty}
              {...register('content', {
                required: '내용을 입력해주세요.',
                minLength: {
                  value: 5,
                  message: '최소 5자 이상 입력해주세요.',
                },
              })}
            />
            {errors.content && isDirty && (
              <p className="text-sm text-[#D11111]">{errors.content.message}</p>
            )}
          </div>
        </div>
      </div>
      <Button
        type="submit"
        size="default"
        variant="default"
        className="mobile:hidden"
        disabled={!isButtonEnabled}
        text={
          isPending
            ? isEditMode
              ? '수정 중...'
              : '등록 중...'
            : isEditMode
              ? '수정하기'
              : '등록하기'
        }
      />
    </form>
  );
}

export default WriteForm;
