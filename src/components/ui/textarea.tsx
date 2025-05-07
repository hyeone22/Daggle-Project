import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  maxLength?: number;
  showCount?: boolean;
  isError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      maxLength = 300,
      showCount = true,
      isError = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const [count, setCount] = React.useState(0);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setCount(value.length);
      onChange?.(e);
    };

    const handleClear = () => {
      if (textareaRef.current) {
        textareaRef.current.value = '';
        setCount(0);
        const event = new Event('change', { bubbles: true });
        textareaRef.current.dispatchEvent(event);
      }
    };

    React.useEffect(() => {
      if (textareaRef.current) {
        setCount(textareaRef.current.value.length);
      }
    }, []);

    return (
      <div className="relative">
        <textarea
          className={cn(
            'flex min-h-[60px] h-80 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-[#C8C9D0]',
            className
          )}
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            textareaRef.current = node;
          }}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {count > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 w-4 h-4 border rounded-full flex items-center justify-center"
          >
            <X className="w-3 h-3 text-[#5E616E]" />
          </button>
        )}
        {showCount && (
          <div
            className={cn(
              'absolute bottom-2 right-2 text-sm',
              isError ? 'text-[#D11111]' : 'text-[#5E616E]'
            )}
          >
            {count}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
