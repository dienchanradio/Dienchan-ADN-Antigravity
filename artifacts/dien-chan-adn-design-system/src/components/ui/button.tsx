import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-sans text-xs font-bold uppercase tracking-[0.07em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' && 'min-h-9 px-4',
        size === 'md' && 'min-h-12 px-6',
        size === 'lg' && 'min-h-14 px-8',
        variant === 'primary' &&
          'bg-primary text-primary-foreground shadow-[0_12px_30px_rgba(207,92,120,0.19)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(207,92,120,0.3)]',
        variant === 'outline' &&
          'border border-accent/75 bg-accent/10 text-accent hover:-translate-y-0.5 hover:bg-accent/20',
        variant === 'ghost' &&
          'text-foreground hover:bg-muted hover:text-primary',
        className,
      )}
    />
  );
}