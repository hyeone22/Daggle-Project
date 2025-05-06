import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';

export default function WriteForm() {
  return (
    <div className="bg-white rounded-md w-full flex flex-col justify-center items-center mt-6 mobile:mt-0">
      <div className="w-full flex flex-col justify-start p-6 gap-6 mobile:pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChevronLeft className="hidden mobile:block w-6 h-6" />
            <h3 className="text-[20px] mobile:text-base font-bold">
              게시글 작성
            </h3>
          </div>
          <span className="hidden mobile:block text-base font-bold text-[#6025E1]">
            등록
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <Input placeholder="제목을 입력해주세요." />
          <Textarea placeholder="내용을 입력해주세요." />
        </div>
      </div>
    </div>
  );
}
