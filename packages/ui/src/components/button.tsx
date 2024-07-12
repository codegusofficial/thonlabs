import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../core/utils';
import { IconType } from 'react-icons';

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold 
  transition-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
  disabled:pointer-events-none disabled:opacity-50 select-none`,
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        opposite: 'bg-foreground text-secondary shadow hover:bg-foreground/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'text-text hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        linkGhost:
          'text-zinc-500 hover:bg-accent hover:text-accent-foreground hover:text-zinc-600 dark:hover:text-zinc-300',
        success: 'bg-success shadow-sm hover:bg-success/90',
        info: 'bg-info shadow-sm hover:bg-info/90',
      },
      size: {
        xs: 'py-1 px-2 text-xs gap-1',
        sm: 'py-1.5 px-3 text-sm gap-1',
        md: 'px-4 py-2 text-base gap-1.5',
        lg: 'py-4 px-6 text-base gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

const buttonIconVariants = cva('', {
  variants: {
    iconSize: {
      xs: 'w-3 h-3',
      sm: 'w-3.5 h-3.5',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: IconType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, disabled, children, icon, ...props },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), {
          'pointer-events-none opacity-50': loading || disabled,
        })}
        ref={ref}
        {...props}
      >
        {icon &&
          icon({ className: cn(buttonIconVariants({ iconSize: size })) })}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants, buttonIconVariants };
