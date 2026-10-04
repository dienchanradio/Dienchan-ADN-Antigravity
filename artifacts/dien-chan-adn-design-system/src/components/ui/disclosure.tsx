import type { DetailsHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Disclosure({
  title,
  children,
  className,
  ...props
}: DetailsHTMLAttributes<HTMLDetailsElement> & {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <details {...props} className={cn('group border-b border-border', className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-sans text-sm font-bold text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <ChevronDown
          size={17}
          className="shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="pb-4 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </details>
  );
}

export function DisclosureList({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('divide-y divide-border', className)} />;
}