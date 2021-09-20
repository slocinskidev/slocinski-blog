import InputSearch from 'components/InputSearch';
import React, { FC } from 'react';
import { BaseComponentProps } from 'types';
import './SearchBar.scss';

const SearchBar: FC<BaseComponentProps> = () => {
  const [value, setValue] = React.useState<string>('');

  return (
    <header className="search-bar">
      <InputSearch
        type="text"
        handleOnChange={(e) => setValue(e.target.value)}
        placeholder={'Wyszukaj produkt'}
        value={value}
      />
    </header>
  );
};

export default SearchBar;
