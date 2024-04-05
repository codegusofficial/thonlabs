import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/ui/utils';

const typoVariants = cva('font-sans text-text', {
  variants: {
    variant: {
      default: '',
      paragraph: 'leading-relaxed [&:not(:first-child)]:mt-5 mb-0',
      h1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      inlineCode:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium',
      xs: 'text-xs font-medium',
      muted: 'text-sm text-muted-foreground',
      code: 'font-code text-emerald-200 text-sm',
    },
    state: {
      default: '',
      error: '!text-red-500',
    },
  },
  defaultVariants: {
    variant: 'default',
    state: 'default',
  },
});

export interface TypoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typoVariants> {
  as?: keyof JSX.IntrinsicElements;
}

function Typo({ className, variant, state, as = 'div', ...props }: TypoProps) {
  return React.createElement(as, {
    ...props,
    className: cn(typoVariants({ variant, state }), className),
  });
}

export { Typo, typoVariants };
