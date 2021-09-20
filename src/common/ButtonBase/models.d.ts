import React from 'react';

export interface ButtonBaseProps {
  disabled?: boolen;
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  onClick?: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent,
    ...args: any[]
  ) => void;
  onFocus?: (e?: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e?: React.FocusEvent<HTMLButtonElement>) => void;
  onKeyDown?: (e?: React.KeyboardEvent<HTMLButtonElement>) => void;
  onKeyUp?: (e?: React.KeyboardEvent<HTMLButtonElement>) => void;
}
