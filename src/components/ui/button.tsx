import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[#000] text-white shadow hover:bg-[#474953] active:bg-[#5E616E] disabled:bg-[#D6D7DC] disabled:text-[#A7A9B4]',
        secondary:
          'bg-[#6025E1] text-white shadow-sm text-[16px] font-bold hover:bg-[#5522C3] active:bg-[#320397] disabled:bg-[#D6D7DC] disabled:text-[#A7A9B4]',
      },
      size: {
        default: 'w-[200px] h-[59px] px-4 py-2',
        sm: 'w-[89px] h-[52px] rounded-md px-3 text-xs',
        lg: 'w-[84px] h-[48px] rounded-md px-8',
        icon: 'w-[84px] h-[48px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  text?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, text, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {text}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
