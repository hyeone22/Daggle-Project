import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CommentInputProps } from '@/interface/api/item/CommentItem';

function CommentInput({ value, onChange, onSubmit }: CommentInputProps) {
  return (
    <div className="p-6 mobile:p-4 flex items-center gap-2 mobile:fixed mobile:inset-x-0 mobile:bottom-0 mobile:h-24 mobile:border-t">
      <Input
        placeholder="댓글을 통해 자유롭게 의견을 나눠보세요."
        className="border-x-0 border-t-0 rounded-none shadow-none mobile:placeholder:text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button size="icon" text="등록" onClick={onSubmit} />
    </div>
  );
}

export default CommentInput;
