import React, { FC } from 'react';
import { ButtonProps } from 'types';
import './Button.scss';

const Button: FC<ButtonProps> = ({ handler, children }) => {
  return (
    <button type="button" className="button" onClick={handler}>
      {children}
    </button>
  );
};

export default Button;
