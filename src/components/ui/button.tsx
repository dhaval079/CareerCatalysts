import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground [&:not(:disabled)]:hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground [&:not(:disabled)]:hover:bg-destructive/90',
        outline:
          'border border-input [&:not(:disabled)]:hover:bg-accent [&:not(:disabled)]:hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground [&:not(:disabled)]:hover:bg-secondary/80',
        ghost:
          '[&:not(:disabled)]:hover:bg-accent [&:not(:disabled)]:hover:text-accent-foreground',
        link: 'underline-offset-4 [&:not(:disabled)]:hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={twMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
