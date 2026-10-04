import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id?: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-xs font-bold text-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <span className="text-xs text-destructive">{error}</span>
      ) : hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  );
}

export function TextInput({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
}) {
  const input = (
    <input
      {...props}
      id={id}
      className={cn(
        'min-h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20',
        error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
        className,
      )}
    />
  );

  return label ? (
    <Field id={id} label={label} hint={hint} error={error}>
      {input}
    </Field>
  ) : (
    input
  );
}