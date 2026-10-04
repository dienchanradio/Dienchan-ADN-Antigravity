import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export type CardVariant = 'surface' | 'tint' | 'dark';

export function Card({
  className,
  variant = 'surface',
  ...props
}: HTMLAttributes<HTMLDivElement> & { variant?: CardVariant }) {
  return (
    <article
      {...props}
      className={cn(
        'rounded-[var(--radius)] border p-5 shadow-[0_14px_28px_rgba(1,44,78,0.08)]',
        variant === 'surface' && 'border-border bg-card text-card-foreground',
        variant === 'tint' && 'border-border bg-secondary text-secondary-foreground',
        variant === 'dark' && 'border-border bg-background text-foreground',
        className,
      )}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('mb-4 space-y-1.5', className)} />;
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className={cn(
        'font-serif text-2xl leading-none tracking-[-0.03em]',
        className,
      )}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn('text-sm leading-6 text-muted-foreground', className)}
    />
  );
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('text-sm leading-6', className)} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('mt-5 flex flex-wrap items-center gap-3', className)}
    />
  );
}