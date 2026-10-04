import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function BrandMark({
  className,
  size = 'md',
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & {
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <img
      {...props}
      className={cn(
        'rounded-full object-contain mix-blend-multiply',
        size === 'sm' && 'h-10 w-10',
        size === 'md' && 'h-16 w-16',
        size === 'lg' && 'h-24 w-24',
        className,
      )}
      src={props.src ?? `${import.meta.env.BASE_URL}logo.png`}
      alt={props.alt ?? 'Diện Chẩn Boutique'}
    />
  );
}

export function Eyebrow({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        'font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent',
        className,
      )}
    >
      {children}
    </p>
  );
}