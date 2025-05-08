import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useWriteBoard } from '@/action/post-write';
import { useDetailBoard } from '@/action/get-detail';

interface FormData {
  title: string;
  content: string;
}

interface WriteFormProps {
  onSubmit: (data: FormData) => void;
  onDirtyChange?: (isDirty: boolean) => void;
}

export interface WriteFormRef {
  setValue: (
    field: keyof FormData,
    value: string,
    options?: { shouldDirty?: boolean }
  ) => void;
  trigger: () => Promise<boolean>;
  getValues: () => FormData;
  formState: UseFormReturn<any>['formState'];
}

const WriteForm = forwardRef<WriteFormRef, WriteFormProps>(
  ({ onSubmit, onDirtyChange }, ref) => {
    const { id } = useParams(); // Write.tsx에서 넘겨줘도 됨
    const { data: boardDetail } = useDetailBoard(id || '');
    const {
      register,
      watch,
      formState: { errors, isDirty },
      trigger,
      getValues,
      setValue,
      reset,
      formState,
    } = useForm<FormData>({
      mode: 'onChange',
      defaultValues: boardDetail
        ? {
            title: boardDetail.title,
            content: boardDetail.content,
          }
        : {
            title: '',
            content: '',
          },
    });

    useEffect(() => {
      if (boardDetail) {
        reset(
          {
            title: boardDetail.title,
            content: boardDetail.content,
          },
          { keepDirty: false }
        );
      }
    }, [boardDetail, reset]);

    const navigate = useNavigate();
    const { mutate: writePost } = useWriteBoard();
    useImperativeHandle(ref, () => ({
      trigger,
      getValues,
      setValue,
      formState,
    }));

    const title = watch('title');
    const content = watch('content');
    const isValid = title?.length >= 1 && content?.length >= 5;

    useEffect(() => {
      onDirtyChange?.(isDirty);
    }, [isDirty, title, content, onDirtyChange]);

    const handleSubmit = async () => {
      const isValid = await trigger();
      if (isValid) {
        const formData = getValues();

        writePost({
          title: formData.title,
          content: formData.content,
        });
      }
    };

    return (
      <>
        <div className="bg-white rounded-md w-full flex flex-col justify-center items-center mt-6 mobile:mt-0">
          <div className="w-full flex flex-col justify-start p-6 gap-6 mobile:p-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChevronLeft
                  className="hidden mobile:block w-6 h-6"
                  onClick={() => navigate('/')}
                />
                <h3 className="text-[20px] mobile:text-base font-bold">
                  게시글 작성
                </h3>
              </div>
              <button
                className={clsx(
                  'text-base font-bold',
                  'mobile:block hidden',
                  isValid ? 'text-[#000]' : 'text-[#C8C9D0]'
                )}
                onClick={handleSubmit}
              >
                등록
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
                  <p className="text-sm text-[#D11111]">
                    {errors.title.message}
                  </p>
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
                  <p className="text-sm text-[#D11111]">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

WriteForm.displayName = 'WriteForm';

export default WriteForm;
