import React from 'react';
import { Icon } from '@iconify/react';
import icons from 'assets/icons';
import './InputSearch.scss';
import { InputSearchProps } from 'types';

const InputSearch: React.FC<InputSearchProps> = ({
  placeholder,
  ref,
  type = 'text',
  handleOnChange,
  ...props
}) => {
  return (
    <div className="input-search">
      <input
        className="input-search__input"
        type={type}
        onChange={handleOnChange}
        placeholder={placeholder}
        {...props}
      />
      <Icon icon={icons.roundSearch} className="icon" />
    </div>
  );
};

export default InputSearch;
