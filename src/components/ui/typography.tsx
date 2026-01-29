import * as React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'code';
  variant?:
    | 'display-2xl'
    | 'display-xl'
    | 'display-lg'
    | 'display-md'
    | 'display-sm'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body-lg'
    | 'body'
    | 'body-sm'
    | 'body-xs'
    | 'caption'
    | 'caption-sm'
    | 'label'
    | 'label-sm'
    | 'lead'
    | 'overline'
    | 'code'
    | 'code-sm';
}

const variantClasses: Record<NonNullable<TypographyProps['variant']>, string> = {
  'display-2xl': 'text-display-2xl',
  'display-xl': 'text-display-xl',
  'display-lg': 'text-display-lg',
  'display-md': 'text-display-md',
  'display-sm': 'text-display-sm',
  'h1': 'text-h1',
  'h2': 'text-h2',
  'h3': 'text-h3',
  'h4': 'text-h4',
  'h5': 'text-h5',
  'h6': 'text-h6',
  'body-lg': 'text-body-lg',
  'body': 'text-body',
  'body-sm': 'text-body-sm',
  'body-xs': 'text-body-xs',
  'caption': 'text-caption',
  'caption-sm': 'text-caption-sm',
  'label': 'text-label',
  'label-sm': 'text-label-sm',
  'lead': 'text-lead',
  'overline': 'text-overline',
  'code': 'text-code',
  'code-sm': 'text-code-sm',
};

const defaultElement: Record<string, TypographyProps['as']> = {
  'display-2xl': 'h1',
  'display-xl': 'h1',
  'display-lg': 'h1',
  'display-md': 'h1',
  'display-sm': 'h1',
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'h6': 'h6',
  'body-lg': 'p',
  'body': 'p',
  'body-sm': 'p',
  'body-xs': 'p',
  'caption': 'p',
  'caption-sm': 'p',
  'label': 'span',
  'label-sm': 'span',
  'lead': 'p',
  'overline': 'span',
  'code': 'code',
  'code-sm': 'code',
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as, variant = 'body', className, ...props }, ref) => {
    const Component = (as || defaultElement[variant] || 'p') as any;
    const variantClass = variantClasses[variant];

    return (
      <Component
        ref={ref}
        className={cn(variantClass, className)}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";
