import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { ButtonBaseProps } from './models';

const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      disabled = false,
      type = 'button',
      children = '',
      ariaLabel,
      className,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      ...baseProps
    },
    ref
  ) => {
    const buttonClasses = classNames('button', className, {
      [`button--${disabled}`]: disabled,
    });

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>): void => {
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>): void => {
      if (onBlur) {
        onBlur(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
      if (onKeyUp) {
        onKeyUp(e);
      }
    };

    return (
      <button
        className={buttonClasses}
        disabled={disabled}
        // eslint-disable-next-line react/button-has-type
        type={type}
        ref={ref}
        aria-label={ariaLabel}
        onClick={onClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex={0}
        {...baseProps}
      >
        {children}
      </button>
    );
  }
);

export default ButtonBase;
