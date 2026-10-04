import type { ReactElement } from 'react';

export type ToastActionElement = ReactElement;

export type ToastProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};